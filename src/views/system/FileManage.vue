<template>
  <wm-main :padding="0">
    <!-- 地址栏 -->
    <div class="app_addr flex">
      <div class="addr flex">
        <span>{{ state.menuTitle[1] }}</span>
        <span><i class="ui ui_arrow_right" /></span>
        <span class="link" @click="$router.replace({path:'/refresh'})">{{ state.menuTitle[2] }}</span>
      </div>
      <div class="app_addr_more flex">
        <span class="info">&nbsp;</span>
        <span class="reload" title="刷新" @click="loadData()"><i class="ui ui_refresh" /></span>
      </div>
    </div>
    <!-- 内容 -->
    <div class="app_content mtop10 flex">
      <div class="app_ct_right">
        <!-- 动作菜单 -->
        <div class="app_action_body flex">
          <ul class="app_action_list flex_left">
            <li v-if="getters.actionShow('upload')" @click="uploadData()"><wm-button type="primary">上传</wm-button></li>
            <li v-if="getters.actionShow('mkdir')" @click="folder.show=true"><wm-button effect="plain">新建文件夹</wm-button></li>
            <li v-if="getters.actionShow('rename')" @click="renameData()"><wm-button effect="plain">重命名</wm-button></li>
            <li v-if="getters.actionShow('remove')" @click="delData()"><wm-button type="danger" effect="plain">删除</wm-button></li>
          </ul>
          <ul class="app_action_list flex_left">
            <li><wm-button type="primary" effect="text" padding="0 4px">导出</wm-button></li>
            <li class="line">|</li>
            <li><wm-button type="primary" effect="text" padding="0 4px">打印</wm-button></li>
          </ul>
        </div>
        <!-- 动作菜单 End -->
        <!-- List -->
        
        <!-- List End -->
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

  </wm-main>
</template>

<style lang="less" scoped>
// .folder_null{position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); color: #999;}
// /* 信息 */
// .file_path{line-height: 20px; padding: 16px;}
// .file_path a{color: #333; user-select: none;}
// .file_path a:hover{color: @Primary;}
// .file_path .path{color: #999;}
// .file_path .path span{padding: 5px 8px;}
// .file_path .info{position: absolute; right: 16px; color: #999; background-color: #FFF; font-size: 12px;}
// .file_load{width: 100%; height: 2px; line-height: 2px; font-size: 12px; background-color: #F2F4F6;}
// .file_load span{display: inline-block;}
// .file_load .text{position: absolute; padding-top: 10px; text-align: right;}

// /* 列表 */
// .file_body{padding: 16px;}
// .file_body ul{overflow: hidden;}
// .file_body li{position: relative; float: left; margin: 5px;}
// .file{width: 128px; height: 128px; border: #FFF 1px solid; border-radius: 5px;}
// .file:hover{background-color: #F2F4F6;}
// .file .name{line-height: 24px; text-align: center; padding: 8px 5px;}

// /* 选择 */
// .check{position: absolute; width: 18px; height: 18px; margin: 10px 0 0 -10px; background-color: #24292E; border-radius: 50%;}
// .check:after{content: ""; position: absolute; width: 4px; height: 6px; border: 2px solid #fff; border-left: 0; border-top: 0; left: 6px; top: 4px; transform-origin: center; transform: rotate(45deg) scaleY(1);}

// .file_click{position: absolute; z-index: 10; opacity: 0; color: @Primary; width: 40px; height: 40px; line-height: 40px; font-size: 20px; text-align: center;}
// .file_state:hover .file_click{opacity: 0.7;}
// .file_active .file_click{opacity: 1;}
// .file_active .file_click .check{background-color: @Primary;}
// .file_active:hover .file_click{opacity: 1;}
// .file_active .file{border-color: @Primary; background-color: #F2F4F6;}

// /* 文件夹 */
// .file_ct{width: 100%; height: 84px; line-height: 84px; text-align: center;}
// .file_ct .ui{font-size: 64px; color: #A9B9C6;}
// .file_ct .ui_folder{color: #FFD65D;}
// .file_ct .ui_folder{color: #FFD65D;}

// /* 图片 */
// .file_img{width: 100%; height: 100%; background-color: #F2F4F6;}
// .file_img.bgImg{background-size: contain;}
</style>

<script lang="ts" src="./FileManage.ts"></script>
