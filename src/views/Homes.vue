<template>
  <div class="index_body" :class="full_screen?'full_screen':''">
    <div class="index_title">
      <h1>实时数据大屏</h1>
      <i class="ui" :class="!full_screen?'ui_video_fullscreen':'ui_video_fullscreen_exit'" @click="full_screen=!full_screen;loadData()"></i>
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
          <wmChartPie type="stack" theme="classicDark" html="<span style='font-size: 18px;'>库存</span>" :value="chartPie"></wmChartPie>
        </div>
        <div class="index_chart bg line_top c2 scrollbar">
          <ul class="c2_list">
            <li class="flex"><div class="title">瑞丽库房</div><div class="num">7890</div></li>
            <li class="flex"><div class="title">平洲库房</div><div class="num">3495</div></li>
            <li class="flex"><div class="title">缅甸库房</div><div class="num">4056</div></li>
          </ul>
        </div>
      </div>
      <!-- Right -->
      <div class="index_right">
        <div class="index_chart bg line_top line_bottom c3">
          <ul class="c3_list">
            <li>
              <div :class="chartActive=='c1'?'active':''" @click="chickChart('c1')">
                <span class="title line_bottom">采购入库</span>
                <h2>8920</h2>
                <span class="ratio">同比上期&nbsp;&nbsp;<b class="up">12%</b></span>
              </div>
            </li>
            <li>
              <div :class="chartActive=='c2'?'active':''" @click="chickChart('c2')">
                <span class="title">采购退货</span>
                <h2>720</h2>
                <span class="ratio">同比上期&nbsp;&nbsp;<b class="down">32%</b></span>
              </div>
            </li>
            <li>
              <div :class="chartActive=='c3'?'active':''" @click="chickChart('c3')">
                <span class="title">调拨出</span>
                <h2>5960</h2>
                <span class="ratio">同比上期&nbsp;&nbsp;<b class="up">8%</b></span>
              </div>
            </li>
            <li>
              <div :class="chartActive=='c4'?'active':''" @click="chickChart('c4')">
                <span class="title">调拨入</span>
                <h2>5810</h2>
                <span class="ratio">同比上期&nbsp;&nbsp;<b class="down">8%</b></span>
              </div>
            </li>
            <li>
              <div :class="chartActive=='c5'?'active':''" @click="chickChart('c5')">
                <span class="title">销售出仓</span>
                <h2>2343</h2>
                <span class="ratio">同比上期&nbsp;&nbsp;<b class="up">5%</b></span>
              </div>
            </li>
          </ul>
        </div>
        <div class="index_chart bg line_top line_bottom c4">
          <wmChartInterval type="dodge" theme="classicDark" :value="chartInterval"></wmChartInterval>
        </div>
      </div>
    </div>
    <!-- Content End -->
  </div>
</template>

<style lang="less" scoped>
.index_body{position: relative; top: 0; left: 0; padding: 16px; width: calc(100% - 32px); height: calc(100% - 32px); overflow: hidden; color: @Minor6; background: -webkit-radial-gradient(20% 30% ,farthest-corner,#0064C8,#0054A8,#00458A,#172E8C);}
.full_screen{position: absolute;}
.index_body .bg{background-color: rgba(0, 0, 0, 0.4);}
.index_body .line_top::before{opacity: 0.9; content: ""; position: absolute; left: 50%; top: 0; transform: translateX(-50%); width: 60%; height: 1px; background-image: linear-gradient(to right, rgba(0, 100, 200, 0), #0064C8, #595, #172E8C, rgba(0, 100, 200, 0));}
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
.index_ct{position: relative; height: calc(100% - 120px); margin-top: 10px;}
.index_left{width: 360px; height: 100%;}
.index_right{width: calc(100% - 370px); height: 100%;}
.index_chart{position: relative; overflow: hidden; padding: 16px; border-radius: 4px;}
.index_chart.c1{height: 328px;}
.index_chart.c2{margin-top: 10px; height: calc(100% - 400px); overflow: hidden; overflow-y: auto;}
.index_chart.c3{height: 120px;}
.index_chart.c4{margin-top: 10px; height: calc(100% - 192px);}

.c2_list{overflow: hidden;}
.c2_list li{line-height: 40px; padding: 0 8px; border-bottom: rgba(0, 0, 0, 0.2) 1px solid; border-radius: 4px;}
.c2_list li:hover{background-color: @Primary;}
.c2_list .title{width: calc(100% - 80px);}
.c2_list .num{width: 80px; text-align: right;}

.c3_list{white-space: nowrap; text-align: center;}
.c3_list li{cursor: pointer; display: inline-block; padding: 0 8px; width: 20%; box-sizing: border-box;}
.c3_list li div{padding: 8px 0; border-radius: 8px;}
.c3_list li div:hover{background-color: @Primary;}
.c3_list li div:hover .ratio{background-color: transparent;}
.c3_list .active{background-color: @Primary;}
.c3_list .active .ratio{background-color: transparent;}
.c3_list .active:hover .ratio{background-color: transparent;}
.c3_list li h2{line-height: 48px; font-size: 32px;}
.c3_list li .title{position: relative; display: inline-block; line-height: 28px; padding: 0 16px; border-radius: 14px; background-color: transparent;}
.c3_list li .ratio{display: inline-block; line-height: 28px; padding: 0 12px 0 16px; background-color: rgba(0, 0, 0, 0.2); border-radius: 14px;}
.c3_list li .ratio .up{color: #FF6600;}
.c3_list li .ratio .down{color: #6AD177;}
</style>

<script setup lang="ts">
import { ref, watch, onMounted, onActivated } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import wmChartPie from '../components/chart/pie.vue';
import wmChartInterval from '../components/chart/interval.vue';

// 是否加载
const isLoad = ref(false);
// 状态
const store = useStore();
const state = store.state;
// 全屏
const full_screen = ref(false);
// 图表
const chartActive = ref('c1');
const chartPie = ref([{}]);
const chartInterval = ref([]);

/* 监听 */
watch(()=>state.isLogin, (isLogin: boolean)=>{
  if(isLogin) loadData();
},{ deep: true });

/* 创建完成 */
onMounted(()=>{
  if(state.token) isLoad.value = true;
});
onActivated(()=>{
  if(isLoad) loadData();
});

/* 加载数据 */
const loadData = (): void => {
  // 图表数据
  chartPie.value = [
    {label: 'n1', value: 90},
    {label: 'n2', value: 200},
    {label: 'n3', value: 120},
  ];
  chickChart(chartActive.value);
}

/* 图表 */
const chickChart = (name: string): void => {
  const data: any = {
    c1: [
      {label: 'n1', value: 100},
      {label: 'n2', value: 50},
      {label: 'n3', value: 110},
      {label: 'n4', value: 360},
      {label: 'n5', value: 240},
      {label: 'n6', value: 120},
    ],
    c2: [
      {label: 'n1', value: 300},
      {label: 'n2', value: 200},
      {label: 'n3', value: 450},
    ],
    c3: [
      {label: 'n1', value: 100},
      {label: 'n2', value: 200},
      {label: 'n3', value: 150},
      {label: 'n4', value: 280},
      {label: 'n5', value: 120},
      {label: 'n6', value: 80},
    ],
    c4: [
      {label: 'n1', value: 60},
      {label: 'n2', value: 30},
      {label: 'n3', value: 180},
      {label: 'n4', value: 260},
      {label: 'n5', value: 210},
    ],
    c5: [
      {label: 'n1', value: 80},
      {label: 'n2', value: 210},
      {label: 'n3', value: 110},
    ],
  };
  chartActive.value = name;
  chartInterval.value = data[name];
}

</script>