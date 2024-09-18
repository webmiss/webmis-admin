<template>
  <div class="app_total flex">
    <div class="total scrollbar">
      文件夹: <b>{{ list.data.dirNum || 0 }}</b>&nbsp;&nbsp;
      文件: <b>{{ list.data.fileNum || 0 }}</b>&nbsp;&nbsp;
      大小: <b>{{ list.data.size || 0 }}</b>&nbsp;&nbsp;
    </div>
    <div class="refresh flex">
      <span class="time">{{ total.time }}</span>
      <i class="ui ui_refresh" @click="loadData()"></i>
    </div>
  </div>
  <!-- Action -->
  <div class="app_action flex">
    <div class="flex">
      <wm-button effect="text" type="primary" padding="0 8px" v-if="list.path=='/'">根目录</wm-button>
      <wm-button effect="text" type="primary" padding="0 8px" v-else @click="backDir()">返回上级</wm-button>
      <span class="line">|</span>
      <wm-button effect="text" type="primary" padding="0 8px" v-if="!list.check" @click="selectAll(true)">全选</wm-button>
      <wm-button effect="text" type="primary" padding="0 8px" v-else @click="selectAll(false)">全不选</wm-button>
      <span class="line">|</span>
      <span class="text">{{ list.path }}</span>
    </div>
    <div class="flex">
      <wm-button icon="ui ui_add" padding="0 16px 0 8px" @click="mkdirData()">新建文件夹</wm-button>
      <wm-button icon="ui ui_edit" padding="0 16px 0 8px" @click="renameData()">重命名</wm-button>
      <wm-button effect="plain" type="danger" icon="ui ui_del" padding="0 16px 0 8px" @click="removeData()">删除</wm-button>
      <span class="line">|</span>
      <wm-button effect="dark" type="primary" icon="ui ui_upload" padding="0 16px 0 8px" @click="upData()">上传</wm-button>
    </div>
  </div>
  <!-- Action End -->
  <!-- Content -->
  <div class="app_ct none_search file_body scrollbar">
    <ul class="flex_left" v-if="list.data.folder.length!=0 || list.data.files.length!=0">
      <!-- 文件夹 -->
      <li v-for="(v,k) in list.data.folder" :key="'dir'+k" :class="v.check?'file_active':'file_state'">
        <div class="file_center">
          <div class="file_click" @click="v.check=!v.check"><i class="check"></i></div>
          <div class="file">
            <div class="file_ct" @click="openFolder(v.name)">
              <i class="ui ui_folder"></i>
            </div>
            <div class="name nowrap" :title="v.name">{{ v.name }}</div>
          </div>
        </div>
      </li>
      <!-- 文件 -->
      <li v-for="(v,k) in list.data.files" :key="'file'+k" :class="v.check?'file_active':'file_state'">
        <div class="file_center">
          <div class="file_click" @click="v.check=!v.check"><i class="check"></i></div>
          <div class="file">
            <div class="file_ct" @click="openFile(v.name)">
              <div class="file_img bgImg" v-if="isImg(v.ext)" :style="{backgroundImage:'url('+list.url+list.data.path+v.name+')'}"></div>
              <i class="ui ui_file" v-else></i>
            </div>
            <div class="name nowrap" :title="v.name">{{ v.name }}</div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="null"></div>
  </div>

  <!-- 新建文件夹 -->
  <action-mkdir v-model:show="mkdir.show" :data="mkdir.data" @submit="mkdirSubmit($event)"></action-mkdir>
  <!-- 重命名 -->
  <action-rename v-model:show="rename.show" :data="rename.data" @submit="renameSubmit($event)"></action-rename>
  <!-- 删除 -->
  <action-remove v-model:show="remove.show" :data="remove.data" @submit="removeSubmit($event)"></action-remove>
  <!-- 下载 -->
  <action-down v-model:show="down.show" :data="down.data" @submit="downSubmit($event)"></action-down>
  <!-- 上传 -->
  <action-up v-model:show="up.show" :data="up.data" @submit="upSubmit($event)"></action-up>
  <!-- 图片预览 -->
  <wm-img-view v-model:show="imgView.show" :index="imgView.index" :options="imgView.imgs"></wm-img-view>

</template>

<style lang="less" scoped>
/* 列表 */
.file_body{overflow-y: auto;}
.file_body ul{overflow: hidden; width: 100%;}
.file_body li{box-sizing: border-box; padding: 5px 16px;}
.file_center{position: relative; width: 128px; margin: 0 auto;}
.file{width: 128px; height: 128px; border: #FFF 1px solid; border-radius: 5px;}
.file:hover{background-color: #F2F4F6;}
.file .name{line-height: 24px; text-align: center; padding: 8px 5px;}
/* 选择 */
.check{position: absolute; left: 6px; top: 6px; width: 18px; height: 18px; background-color: #24292E; border-radius: 50%;}
.check:after{content: ""; position: absolute; width: 4px; height: 6px; border: 2px solid #fff; border-left: 0; border-top: 0; left: 6px; top: 4px; transform-origin: center; transform: rotate(45deg) scaleY(1);}
.file_click{position: absolute; z-index: 10; opacity: 0; color: @Minor; width: 32px; height: 32px; line-height: 32px; font-size: 20px; text-align: center;}
.file_state:hover .file_click{opacity: 0.7;}
.file_active .file_click{opacity: 1;}
.file_active .file_click .check{background-color: @Minor;}
.file_active:hover .file_click{opacity: 1;}
.file_active .file{border-color: @Minor; background-color: #F2F4F6;}
/* 文件夹 */
.file_ct{cursor: pointer; width: 100%; height: 84px; line-height: 84px; text-align: center;}
.file_ct .ui{font-size: 64px; color: #A9B9C6;}
.file_ct .ui_folder{color: #FFD65D;}
.file_ct .ui_folder{color: #FFD65D;}
.folder_null{position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); color: #999;}
/* 图片 */
.file_img{width: 100%; height: 100%; background-color: #F2F4F6;}
.file_img.bgImg{background-size: contain;}
</style>

<script lang="ts" src="./index.ts"></script>