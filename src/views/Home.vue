<template>
  <div class="index_body" :class="full_screen?'full_screen':''">
    <div class="index_title">
      <h1>实时数据大屏</h1>
      <i class="ui" :class="!full_screen?'ui_video_fullscreen':'ui_video_fullscreen_exit'" @click="full_screen=!full_screen"></i>
    </div>
    <!-- Tools -->
    <div class="index_tools bg line_top flex">
      <div class="city flex">
        <span>区域: <b>全部</b></span>
        <span class="time">时段: <b>2024/07/29</b> 至 <b>2024/07/29</b></span>
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
        <div class="index_chart bg line_top c1">
          <wm-chart-pie type="stack" :value="[{label: 'n1', value: 100}, {label: 'n2', value: 200}]" :height="328" />
        </div>
        <div class="index_chart bg line_top c2">c2</div>
      </div>
      <!-- Right -->
      <div class="index_right">
        <div class="index_chart bg line_top line_bottom c3">
          <ul class="c3_list">
            <li>
              <div class="active">
                <span class="title line_bottom">采购入库</span>
                <h2>8920</h2>
                <span class="ratio">同比上期&nbsp;&nbsp;<b class="up">12%</b></span>
              </div>
            </li>
            <li>
              <div>
                <span class="title">采购退货</span>
                <h2>720</h2>
                <span class="ratio">同比上期&nbsp;&nbsp;<b class="down">32%</b></span>
              </div>
            </li>
            <li>
              <div>
                <span class="title">调拨出</span>
                <h2>5960</h2>
                <span class="ratio">同比上期&nbsp;&nbsp;<b class="up">8%</b></span>
              </div>
            </li>
            <li>
              <div>
                <span class="title">调拨入</span>
                <h2>5810</h2>
                <span class="ratio">同比上期&nbsp;&nbsp;<b class="down">8%</b></span>
              </div>
            </li>
            <li>
              <div>
                <span class="title">销售出仓</span>
                <h2>2343</h2>
                <span class="ratio">同比上期&nbsp;&nbsp;<b class="up">5%</b></span>
              </div>
            </li>
          </ul>
        </div>
        <div class="index_chart bg line_top line_bottom c4">c4</div>
      </div>
    </div>
    <!-- Content End -->
  </div>
</template>

<style lang="less" scoped>
.index_body{position: relative; top: 0; left: 0; padding: 16px; width: calc(100% - 32px); height: calc(100% - 32px); overflow: hidden; color: @Minor6; background: -webkit-radial-gradient(20% 30% ,farthest-corner,#0064C8,#0054A8,#00458A,#00284F);}
.full_screen{position: absolute;}
.index_body .bg{background-color: rgba(0, 0, 0, 0.4);}
.index_body .line_top::before{opacity: 0.9; content: ""; position: absolute; left: 50%; top: 0; transform: translateX(-50%); width: 60%; height: 1px; background-image: linear-gradient(to right, rgba(0, 100, 200, 0), #0064C8, #595, #0064C8, rgba(0, 100, 200, 0));}
.index_body .line_bottom::after{opacity: 0.8; content: ""; position: absolute; left: 50%; bottom: 0; zoom: 0.8; transform: translateX(-50%); width: 90%; height: 1px; background-image: linear-gradient(to right, rgba(0, 100, 200, 0), #EFA31E, #761354, #6AD177, rgba(0, 100, 200, 0));}
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
.index_chart.c1{height: 328px;}
.index_chart.c2{margin-top: 10px; height: calc(100% - 402px);}
.index_chart.c3{height: 120px;}
.index_chart.c4{margin-top: 10px; height: calc(100% - 194px);}
.c3_list{white-space: nowrap; text-align: center;}
.c3_list li{cursor: pointer; display: inline-block; padding: 0 8px; width: 20%; box-sizing: border-box;}
.c3_list li div{padding: 8px 0; border-radius: 8px;}
.c3_list li div:hover{background-color: rgba(0, 100, 200, 0.8);}
.c3_list li div:hover .ratio{background-color: transparent;}
.c3_list .active{background-color: rgba(0, 100, 200, 0.8);}
.c3_list .active .ratio{background-color: transparent;}
.c3_list .active:hover .ratio{background-color: transparent;}
.c3_list li h2{line-height: 48px; font-size: 32px;}
.c3_list li .title{position: relative; display: inline-block; line-height: 28px; padding: 0 16px; border-radius: 14px; background-color: transparent;}
.c3_list li .ratio{display: inline-block; line-height: 28px; padding: 0 12px 0 16px; background-color: rgba(0, 0, 0, 0.2); border-radius: 14px;}
.c3_list li .ratio .up{color: #FF6600;}
.c3_list li .ratio .down{color: #6AD177;}
</style>

<script lang="ts" src="./Home.ts"></script>