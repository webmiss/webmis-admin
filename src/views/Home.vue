<template>
  <div class="index_body" :class="full_screen?'full_screen':''">
    <div class="index_title">
      <h1>&lt; 实时数据大屏 &gt;</h1>
      <i class="ui" :class="!full_screen?'ui_video_fullscreen':'ui_video_fullscreen_exit'" @click="full_screen=!full_screen"></i>
    </div>
    <!-- Tools -->
    <div class="index_tools bg flex">
      <div class="city flex">
        <span>区域: </span>
        <span class="time">时段: </span>
      </div>
      <ul class="day">
        <li class="active">今日</li>
        <li>昨日</li>
        <li>近7天</li>
        <li>近1月</li>
        <li>自定义</li>
        <li class="line">|</li>
        <li>导出</li>
      </ul>
    </div>
    <!-- Content -->
    <div class="index_ct flex">
      <!-- Left -->
      <div class="index_left">
        <div class="index_chart bg">Left</div>
      </div>
      <!-- Right -->
      <div class="index_right">
        <div class="index_chart bg">Right</div>
      </div>
    </div>
    <!-- Content End -->
  </div>
</template>

<style lang="less" scoped>
.index_body{position: relative; top: 0; left: 0; padding: 16px; width: calc(100% - 32px); height: calc(100% - 32px); overflow: hidden; color: @Minor6; background: -webkit-radial-gradient(20% 30% ,farthest-corner,#0064C8,#0054A8,#00458A,#00284F);}
.full_screen{position: absolute;}
.index_body .bg{background-color: rgba(0, 0, 0, 0.4);}
.index_body .bg::before{opacity: 0.8; content: ""; position: absolute; left: 50%; top: 0; transform: translateX(-50%); width: 60%; height: 1px; background-image: linear-gradient(to right, rgba(0, 100, 200, 0), #0064C8, #595, #0064C8, rgba(0, 100, 200, 0));}
.index_body .bg::after{opacity: 0.6; content: ""; position: absolute; left: 50%; bottom: 0; zoom: 0.8; transform: translateX(-50%); width: 90%; height: 1px; background-image: linear-gradient(to right, rgba(0, 100, 200, 0), #EFA31E, #761354, #6AD177, rgba(0, 100, 200, 0));}
/* Title */
.index_title{overflow: hidden;}
.index_title h1{position: relative; line-height: 64px; font-size: 24px; color: #FFF; text-align: center;}
.index_title i{cursor: pointer; position: absolute; top: 16px; right: 16px; width: 40px; line-height: 40px; font-size: 20px; text-align: center; border-radius: 50%;}
.index_title i:hover{color: #FFF; background-color: rgba(0, 0, 0, 0.2);}
/* Tools */
.index_tools{position: relative; padding: 8px 16px; line-height: 32px; border-radius: 4px;}
.index_tools .city{white-space: nowrap;}
.index_tools .city span{padding: 0 8px;}
.index_tools .active{font-weight: bold;}
.index_tools .day{white-space: nowrap;}
.index_tools .day li{cursor: pointer; display: inline-block; padding: 0 8px;}
.index_tools .day li:hover{color: #FFF; font-weight: bold;}
.index_tools .day .line{cursor: default;}
.index_tools .day .line:hover{font-weight: normal;}
/* Content */
.index_ct{height: calc(100% - 122px); margin-top: 10px;}
.index_left{width: 360px;}
.index_right{width: calc(100% - 370px);}
.index_chart{position: relative; overflow: hidden; padding: 16px; border-radius: 4px;}
</style>

<script lang="ts" src="./Home.ts"></script>