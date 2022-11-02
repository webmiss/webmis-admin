<template>
  <div>
    <!-- 地址栏 -->
    <div class="app_addr flex">
      <div class="addr flex">
        <span>{{ state.menuTitle[1] }}</span>
        <span><i class="ui ui_arrow_right" /></span>
        <span class="link" @click="$router.replace({path:'/refresh'})">{{ state.menuTitle[2] }}</span>
      </div>
      <div class="app_addr_more flex">
        <span class="info">文件夹( <b>{{ lists.dirNum }}</b> )&nbsp;&nbsp;文件( <b>{{ lists.fileNum }}</b> )&nbsp;&nbsp;大小( <b>{{ lists.size }}</b> )</span>
        <span class="reload" title="刷新" @click="loadData()"><i class="ui ui_refresh" /></span>
      </div>
    </div>
    <!-- 内容 -->
    <div class="app_content mtop10 flex">
      <div class="app_ct_right">
        <!-- 动作菜单 -->
        <div class="app_action_body flex">
          <ul class="app_action_list flex_left">
            <li>
              <wm-button type="info" effect="text" padding="0 4px" v-if="info.path=='/'">根目录</wm-button>
              <wm-button type="primary" effect="text" padding="0 4px" v-else @click="backDir()">返回上级</wm-button>
            </li>
            <li class="line">|</li>
            <li>
              <wm-button type="primary" effect="text" padding="0 2px" @click="selectAll()">全选</wm-button>
            </li>
            <li class="line">|</li>
            <li>{{ info.path }}</li>
          </ul>
          <ul class="app_action_list flex_left">
            <li v-if="getters.actionShow('mkdir')"><wm-button effect="plain" height="28px" @click="folder.show=true">新建文件夹</wm-button></li>
            <li v-if="getters.actionShow('rename')"><wm-button effect="plain" height="28px" @click="renameData()">重命名</wm-button></li>
            <li v-if="getters.actionShow('remove')"><wm-button type="danger" effect="plain" height="28px" @click="delData()">删除</wm-button></li>
            <li class="line">|</li>
            <li v-if="getters.actionShow('upload')"><wm-button type="primary" height="28px" @click="uploadData()">上传</wm-button></li>
          </ul>
          
        </div>
        <!-- 动作菜单 End -->
        <!-- 上传进度 -->
        <div class="file_load" :style="{backgroundImage: 'linear-gradient(to right, #595, #595 '+info.loaded+', #F2F2F2 '+info.loaded+', #F2F2F2 100%)'}">
          <span class="text" :style="{width:info.loaded}">{{info.loaded!='0%'&&info.loaded!='100%'?info.loaded:''}}</span>
        </div>
        <!-- 列表 -->
        <div class="file_body scrollbar">
          <ul class="flex_left" v-if="lists.folder.length!=0 || lists.files.length!=0">
            <!-- 文件夹 -->
            <li v-for="(val,key) in lists.folder" :key="'dir'+key" :class="val.check?'file_active':'file_state'">
              <div class="file_center">
                <div class="file_click" @click="val.check=!val.check"><i class="check"></i></div>
                <div class="file" @click="openFolder(val.name)">
                  <div class="file_ct">
                    <i class="ui ui_folder"></i>
                  </div>
                  <div class="name nowrap" :title="val.name">{{ val.name }}</div>
                </div>
              </div>
            </li>
            <!-- 文件 -->
            <li v-for="(val,key) in lists.files" :key="'file'+key" :class="val.check?'file_active':'file_state'">
              <div class="file_center">
                <div class="file_click" @click="val.check=!val.check"><i class="check"></i></div>
                <div class="file" @click="openFile(val.name)">
                  <div class="file_ct">
                    <div class="file_img bgImg" v-if="isImg(val.ext)" :style="{backgroundImage:'url('+info.url+lists.path+val.name+')'}"></div>
                    <i class="ui ui_file" v-else></i>
                  </div>
                  <div class="name nowrap" :title="val.name">{{ val.name }}</div>
                </div>
              </div>
            </li>
          </ul>
          <div v-else class="folder_null">文件夹为空</div>
        </div>
        <!-- 列表 End -->
      </div>
    </div>
    <!-- 内容 End -->

    <!-- 新建文件夹 -->
    <wm-dialog title="新建文件夹" width="400px" v-model:show="folder.show">
      <wm-form class="form">
        <wm-form-item label="名称">
          <wm-input v-model:value="folder.form.name" width="90%" placeholder="文件夹名称" />
        </wm-form-item>
      </wm-form>
      <template #footer>
        <wm-button type="primary" @click="subDir()">确 认</wm-button>
      </template>
    </wm-dialog>
    <!-- 新建文件夹 End -->

    <!-- 重命名 -->
    <wm-dialog title="重命名" width="400px" v-model:show="rename.show">
      <wm-form class="form">
        <wm-form-item label="名称">
          <wm-input v-model:value="rename.form.name" width="90%" placeholder="重命名的名称" />
        </wm-form-item>
      </wm-form>
      <template #footer>
        <wm-button type="primary" @click="subRename()">确 认</wm-button>
      </template>
    </wm-dialog>
    <!-- 重命名 End -->

    <!-- 上传 -->
    <wm-uploader class="hide" ref="Uploader" :url="upload.url" :name="upload.name" :param="upload.param" @progress="upProgress"></wm-uploader>

    <!-- 下载 -->
    <wm-dialog title="下载文件" width="400px" v-model:show="down.show">
      <wm-row>{{down.filename}}</wm-row>
      <template #footer>
        <wm-button type="primary" @click="downFile()">确 认</wm-button>
      </template>
    </wm-dialog>
    <!-- 下载 End -->

    <!-- 删除 -->
    <wm-dialog title="删除" width="360px" v-model:show="del.show">
      <wm-row>是否删除已选择文件夹或文件？</wm-row>
      <template #footer>
        <wm-button type="danger" @click="subDel()">彻底删除</wm-button>
      </template>
    </wm-dialog>
    <!-- 删除 End -->

    <!-- 图片预览 -->
    <wm-img-view ref="imgShow" v-model:show="imgView.show"></wm-img-view>

  </div>
</template>

<style lang="less" scoped>
/* 进度条 */
.file_load{width: 100%; height: 3px; line-height: 3px; font-size: 12px; background-color: #F2F2F2;}
.file_load span{display: inline-block;}
.file_load .text{position: absolute; padding-top: 10px; text-align: right;}

/* 列表 */
.file_body{overflow-y: auto; height: calc(100% - 80px); padding: 10px 16px;}
.file_body ul{overflow: hidden; width: 100%;}
.file_body li{width: 10%; box-sizing: border-box; padding: 5px 0;}
.file_center{position: relative; width: 128px; margin: 0 auto;}
.file{width: 128px; height: 128px; border: #FFF 1px solid; border-radius: 5px;}
.file:hover{background-color: #F2F4F6;}
.file .name{line-height: 24px; text-align: center; padding: 8px 5px;}

/* 选择 */
.check{position: absolute; width: 18px; height: 18px; margin: 10px 0 0 -10px; background-color: #24292E; border-radius: 50%;}
.check:after{content: ""; position: absolute; width: 4px; height: 6px; border: 2px solid #fff; border-left: 0; border-top: 0; left: 6px; top: 4px; transform-origin: center; transform: rotate(45deg) scaleY(1);}

.file_click{position: absolute; z-index: 10; opacity: 0; color: @Primary; width: 40px; height: 40px; line-height: 40px; font-size: 20px; text-align: center;}
.file_state:hover .file_click{opacity: 0.7;}
.file_active .file_click{opacity: 1;}
.file_active .file_click .check{background-color: @Primary;}
.file_active:hover .file_click{opacity: 1;}
.file_active .file{border-color: @Primary; background-color: #F2F4F6;}

/* 文件夹 */
.file_ct{width: 100%; height: 84px; line-height: 84px; text-align: center;}
.file_ct .ui{font-size: 64px; color: #A9B9C6;}
.file_ct .ui_folder{color: #FFD65D;}
.file_ct .ui_folder{color: #FFD65D;}
.folder_null{position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); color: #999;}

/* 图片 */
.file_img{width: 100%; height: 100%; background-color: #F2F4F6;}
.file_img.bgImg{background-size: contain;}


/* 响应式布局 */
@media screen and ( max-width: 1600px ){
  .file_body li{width: 12.5%;}
}
@media screen and ( max-width: 1400px ){
  .file_body li{width: 14.2%;}
}
@media screen and ( max-width: 1280px ){
  .file_body li{width: 16.6%;}
}
@media screen and ( max-width: 1024px ){
  .file_body li{width: 20%;}
}
@media screen and ( max-width: 980px ){
  .file_body li{width: 25%;}
}
@media screen and ( max-width: 768px ){
  .file_body li{width: 33%;}
}
@media screen and ( max-width: 540px ){
  .file_body li{width: 50%;}
}
@media screen and ( max-width: 420px ){
  .file_body li{width: 100%;}
}
</style>

<script lang="ts" src="./FileManage.ts"></script>
