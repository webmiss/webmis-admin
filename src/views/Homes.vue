<template>
  <div class="index_body" :class="full_screen?'full_screen':''">
    <!-- Title -->
    <div class="index_title">
      <h1>实时数据大屏</h1>
      <div class="flex_left time" @click="loadData()">
        <i class="ui ui_refresh"></i>
        <span>更新时间: {{ total.time || '-' }}</span>
      </div>
      <i class="full ui" :class="!full_screen?'ui_video_fullscreen':'ui_video_fullscreen_exit'" @click="full_screen=!full_screen;loadData()"></i>
    </div>
    <!-- Tools -->
    <div class="index_tools bg line_top flex">
      <div class="city flex">
        <span>区域: <b @click="setCustomTime('other')">{{ form.wms_co_name }}</b></span>
        <span class="time">时段: <b @click="setCustomTime('other')">{{ total.stime || '-' }}</b> 至 <b @click="setCustomTime('other')">{{ total.etime || '-' }}</b></span>
      </div>
      <ul class="day">
        <li :class="customTimeActive=='today'?'active':''" @click="setCustomTime('today')">今日</li>
        <li :class="customTimeActive=='yesterday'?'active':''" @click="setCustomTime('yesterday')">昨日</li>
        <li :class="customTimeActive=='week'?'active':''" @click="setCustomTime('week')">近7天</li>
        <li :class="customTimeActive=='month'?'active':''" @click="setCustomTime('month')">近1月</li>
        <li :class="customTimeActive=='other'?'active':''" @click="setCustomTime('other')">自定义</li>
        <li class="line">|</li>
        <li @click="exportData()">导出</li>
      </ul>
    </div>
    <!-- Content -->
    <div class="index_ct flex">
      <!-- Left -->
      <div class="index_left">
        <div class="index_chart bg line_top c1">
          <wmChartPie type="stack" theme="classicDark" :html="`<p style='font-size: 16px;'>主仓库存</p><b style='font-size: 24px;'>${total.stock}</b>`" :value="chartPie"></wmChartPie>
        </div>
        <div class="index_chart bg line_top c2 scrollbar">
          <ul class="c2_list">
            <li class="flex" v-for="v in chartPie">
              <span class="title">{{ v.label }}</span>
              <span class="num">{{ v.value }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- Right -->
      <div class="index_right">
        <div class="index_chart bg line_top line_bottom c3">
          <ul class="c3_list">
            <li>
              <div :class="chartActive=='in'?'active':''" @click="chickChart('in')">
                <span class="title line_bottom">采购入库</span>
                <h2>{{ total.now.in_num || 0 }}</h2>
                <span class="ratio">同比上期&nbsp;&nbsp;<span v-html="total.old.in_num?getRatio(total.now.in_num, total.old.in_num):0"></span></span>
              </div>
            </li>
            <li>
              <div :class="chartActive=='out'?'active':''" @click="chickChart('out')">
                <span class="title">采购退货</span>
                <h2>{{ total.now.out_num || 0 }}</h2>
                <span class="ratio">同比上期&nbsp;&nbsp;<span v-html="total.old.out_num?getRatio(total.now.out_num, total.old.out_num):0"></span></span>
              </div>
            </li>
            <li>
              <div :class="chartActive=='allocate_out'?'active':''" @click="chickChart('allocate_out')">
                <span class="title">调拨出</span>
                <h2>{{ total.now.allocate_out_num || 0 }}</h2>
                <span class="ratio">同比上期&nbsp;&nbsp;<span v-html="total.old.allocate_out_num?getRatio(total.now.allocate_out_num, total.old.allocate_out_num):0"></span></span>
              </div>
            </li>
            <li>
              <div :class="chartActive=='allocate_in'?'active':''" @click="chickChart('allocate_in')">
                <span class="title">调拨入</span>
                <h2>{{ total.now.allocate_in_num || 0 }}</h2>
                <span class="ratio">同比上期&nbsp;&nbsp;<span v-html="total.old.allocate_in_num?getRatio(total.now.allocate_in_num, total.old.allocate_in_num):0"></span></span>
              </div>
            </li>
            <li>
              <div :class="chartActive=='order'?'active':''" @click="chickChart('order')">
                <span class="title">销售出仓</span>
                <h2>{{ total.now.order_num || 0 }}</h2>
                <span class="ratio">同比上期&nbsp;&nbsp;<span v-html="total.old.order_num?getRatio(total.now.order_num, total.old.order_num):0"></span></span>
              </div>
            </li>
            <li>
              <div :class="chartActive=='refund'?'active':''" @click="chickChart('refund')">
                <span class="title">售后退货</span>
                <h2>{{ total.now.refund_num || 0 }}</h2>
                <span class="ratio">同比上期&nbsp;&nbsp;<span v-html="total.old.refund_num?getRatio(total.now.refund_num, total.old.refund_num):0"></span></span>
              </div>
            </li>
          </ul>
        </div>
        <div class="index_chart bg line_top line_bottom c4">
          <wmChartInterval v-if="chartInterval.length>0" theme="classicDark" :value="chartInterval"></wmChartInterval>
          <span v-else class="center null"></span>
        </div>
      </div>
    </div>
    <!-- Content End -->
  </div>
  <!-- 自定义 -->
  <wmDialog v-model:show="infoShow" title="自定义" width="480px" bottom="40px" @close="close()">
    <wmMain>
      <wmTableForm>
        <tr>
          <td class="label"><span class="red_dot">时间</span></td>
          <td>
            <wmDatePicker v-model:value="form.time" range :maxDate="form.maxDate"></wmDatePicker>
          </td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">主仓</span></td>
          <td>
            <wmSelect v-model:value="form.wms_co_id" :options="selectAll.partner_name" />
          </td>
        </tr>
      </wmTableForm>
    </wmMain>
    <template #bottom>
      <wmButton height="40px" padding="0 32px" @click="submit()">{{ langs.confirm }}</wmButton>
    </template>
  </wmDialog>
</template>

<style lang="less" scoped>
.index_body{position: relative; top: 0; left: 0; padding: 16px; width: calc(100% - 32px); height: calc(100% - 32px); overflow: hidden; color: @Minor6; background: -webkit-radial-gradient(20% 30% ,farthest-corner,#0064C8,#0054A8,#00458A,#172E8C);}
.index_body.full_screen{position: absolute;}
.index_body .bg{background-color: rgba(0, 0, 0, 0.4);}
.index_body .line_top::before{opacity: 0.9; content: ""; position: absolute; left: 50%; top: 0; transform: translateX(-50%); width: 60%; height: 1px; background-image: linear-gradient(to right, rgba(0, 100, 200, 0), #0064C8, #595, #172E8C, rgba(0, 100, 200, 0));}
.index_body .line_bottom::after{opacity: 0.8; content: ""; position: absolute; left: 50%; bottom: 0; zoom: 0.8; transform: translateX(-50%); width: 90%; height: 1px; background-image: linear-gradient(to right, rgba(0, 100, 200, 0), #EFA31E, #761354, #6AD177, rgba(0, 100, 200, 0));}
/* Title */
.index_title{overflow: hidden;}
.index_title h1{position: relative; line-height: 64px; font-size: 24px; color: #FFF; text-align: center;}
.index_title .time{cursor: pointer; position: absolute; top: 32px; left: 16px; line-height: 40px; text-align: center;}
.index_title .time i{width: 32px;}
.index_title .full{cursor: pointer; position: absolute; top: 32px; right: 16px; width: 40px; line-height: 40px; font-size: 20px; text-align: center; border-radius: 50%;}
.index_title .full:hover{color: #FFF; background-color: rgba(0, 0, 0, 0.2);}
/* Tools */
.index_tools{position: relative; padding: 8px 16px; line-height: 32px; border-radius: 4px;}
.index_tools .city{white-space: nowrap;}
.index_tools .city b{cursor: pointer;}
.index_tools .city b:hover{color: @Minor;}
.index_tools .city span{padding: 0 8px;}
.index_tools .active{font-weight: bold;}
.index_tools .day{white-space: nowrap;}
.index_tools .day li{cursor: pointer; display: inline-block; padding: 0 8px;}
.index_tools .day li:hover{color: @Minor;}
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
.c3_list li{cursor: pointer; display: inline-block; padding: 0 8px; width: calc(100% / 6); box-sizing: border-box;}
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
import { ref, onMounted, onActivated, nextTick } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Ui from '../library/ui';
import Request from '../library/request';
import Time from '../library/time';
/* UI组件 */
import wmMain from '../components/container/main.vue';
import wmDialog from '../components/dialog/index.vue';
import wmTableForm from '../components/table/form.vue';
import wmSelect from '../components/form/select/index.vue';
import wmDatePicker from '../components/datepicker/index.vue';
import wmButton from '../components/form/button/index.vue';
import wmChartPie from '../components/chart/pie.vue';
import wmChartInterval from '../components/chart/interval.vue';

// 是否加载
const isLoad = ref(false);
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
// 全屏
const full_screen = ref(false);
// 图表
const chartPie = ref(<any>[]);
const chartActive = ref('allocate_out');
const chartInterval = ref(<any>[]);
// 统计
const customTimeActive = ref('today');
const total = ref({time: '', stime:'', etime:'', stock:0, now: <any>{}, old: <any>{}, list: <any>[]});
// 表单
const infoShow = ref(false);
const form = ref({
  time: <any>[Time.Date('Y/m/d'), Time.Date('Y/m/d')], maxDate: Time.Date('Y/m/d'),
  wms_co_id: [], wms_co_name: '全部',
});
// 全部分类
const selectAll = ref({partner_name: <any>[]});

/* 创建完成 */
onMounted(()=>{
  if(state.token) isLoad.value = true;
});
onActivated(()=>{
  if(isLoad && state.isLogin){
    getSelect();
    loadData();
  }
});

/* 选项 */
const getSelect = (): void => {
  Request.Post('index/get_select?lang='+state.lang, {
    token: state.token,
  }, (res:any)=>{
    const {code, msg, data}: any = res.data;
    if(code==0){
      selectAll.value.partner_name = data.partner_name;
    } else Ui.Toast(msg);
  });
}

/* 加载数据 */
const loadData = (): void => {
  // 仓库名称
  if(form.value.wms_co_id.length>0) form.value.wms_co_name = getPartnerName(form.value.wms_co_id[0]);
  // 库存
  total.value.time = '';
  total.value.stock = 0;
  Request.Post('index/stock?lang=' + state.lang, {
    token: state.token,
  }, (res: any) => {
    const {code, msg, time, data}: any = res.data;
    if(code===0){
      chartPie.value = data;
      total.value.time = time;
      for(let v of data) total.value.stock += parseInt(v.value);
    } else Ui.Toast(msg);
  });
  // 入库、采退、调拨出、调拨入、订单、售后
  const model: Array<string> = ['in', 'out', 'allocate_out', 'allocate_in', 'order', 'refund'];
  total.value.stime = '';
  total.value.etime = '';
  for(let tp of model){
    total.value.now[tp+'_num'] = 0;
    total.value.old[tp+'_num'] = 0;
    total.value.list[tp] = [];
    chartInterval.value = [];
    Request.Post('index/list?lang=' + state.lang+'&type='+tp, {
      token: state.token,
      wms_co_id: form.value.wms_co_id,
      stime: typeof form.value.time[0]=='string'?form.value.time[0]:Time.Date('Y/m/d',form.value.time[0]),
      etime: typeof form.value.time[1]=='string'?form.value.time[1]:Time.Date('Y/m/d', form.value.time[1]),
    }, (res: any) => {
      const {code, msg, time, data}: any = res.data;
      if(code===0){
        total.value.time = time;
        total.value.stime = data.stime;
        total.value.etime = data.etime;
        total.value.now[tp+'_num'] = data.total_now[tp+'_num'];
        total.value.old[tp+'_num'] = data.total_old[tp+'_num'];
        total.value.list[tp] = data.list;
        if(chartActive.value===tp) chickChart(chartActive.value);
      } else Ui.Toast(msg);
    });
  }
}
/* 自定义时间 */
const setCustomTime = (type: string): void => {
  customTimeActive.value = type;
  switch(type){
    case 'today': form.value.time = [Time.Date('Y/m/d'), Time.Date('Y/m/d')]; break;
    case 'yesterday': form.value.time = [Time.Date('Y/m/d', Time.StrToTime('-1 day')), Time.Date('Y/m/d', Time.StrToTime('-1 day'))]; break;
    case 'week': form.value.time = [Time.Date('Y/m/d', Time.StrToTime('-6 day')), Time.Date('Y/m/d')]; break;
    case 'month': form.value.time = [Time.Date('Y/m/d', Time.StrToTime('-27 day')), Time.Date('Y/m/d')]; break;
    default: infoShow.value = true; return;
  }
  // 加载数据
  loadData();
}

/* 图表 */
const chickChart = (name: string): void => {
  nextTick(()=>{
    chartActive.value = name;
    chartInterval.value = total.value.list[name];
  });
}

/* 比例 */
const getRatio = (now: number, old: number): string => {
  const ratio: number = (now-old)/old*100;
  return ratio>0?'<b style="color: #FF6600;">'+ratio.toFixed(1)+'%</b>':'<b style="color: #6AD177;">'+ratio.toFixed(1)+'%</b>'
}

/* 仓库名称 */
const getPartnerName = (wms_co_id: string): string => {
  for(let v of selectAll.value.partner_name){
    if(wms_co_id==v.value) return v.label;
  }
  return '全部';
}

/* 导出 */
const exportData = (): void => {
  Ui.Toast('暂不支持!');
}

/* 提交 */
const submit = (): void => {
  loadData();
  getPartnerName(form.value.wms_co_id[0]);
  close();
}

/* 关闭 */
const close = (): void => {
  infoShow.value = false;
}

</script>