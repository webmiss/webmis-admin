<template>
  <!-- Total -->
  <wmTotal :time="total.time" @refresh="loadData()">
    标签金额: <b>{{ priceEncode(total.list.sale_price) }}</b> 元&nbsp;&nbsp;
    吊牌金额: <b>{{ priceEncode(total.list.market_price) }}</b> W&nbsp;&nbsp;
    数量: <b>{{ total.list.num }}</b>&nbsp;&nbsp;
    <span v-if="total.list.operator">操作数量: <b>{{ total.list.operator.num }}</b></span>
  </wmTotal>
  <!-- Action -->
  <div class="app_action flex">
    <div class="app_action_tools scrollbar">
      <wmAction :columns="[
        {action: 'save', slot: 'add', is_action: true},
        {action: 'del', slot: 'del', is_action: true},
        {action: 'line', slot: 'line1'},
        {action: 'push', slot: 'push', is_action: true},
        {action: 'line', slot: 'line2'},
        {action: 'export', slot: 'export', is_action: true},
        {action: 'diff', slot: 'diff', is_action: false},
      ]">
        <template #add>
          <wmButton effect="dark" type="primary" icon="ui ui_add" padding="0 16px 0 8px" @click="saveData('add')">{{ langs.add }}</wmButton>
        </template>
        <template #del>
          <wmButton effect="plain" type="danger" icon="ui ui_del" padding="0 16px 0 8px" :disabled="del.data.length==0" @click="delData()">{{ langs.del }}({{ del.data.length }})</wmButton>
        </template>
        <template #line1>
          <span class="line" v-if="isAction('save')">|</span>
        </template>
        <template #push>
          <wmButton effect="plain" type="primary" icon="ui ui_safety" padding="0 16px 0 8px" :disabled="push.data.length==0" @click="pushData()">{{ push.title }}({{ push.data.length }})</wmButton>
        </template>
        <template #line2>
          <span class="line" v-if="isAction('push')">|</span>
        </template>
        <template #export>
          <wmButton effect="plain" icon="ui ui_export" padding="0 16px 0 8px" :disabled="exp.data.length==0" @click="exportData()">{{ langs.export }}({{ exp.num }})</wmButton>
        </template>
        <template #diff>
          <wmButton effect="plain" icon="ui ui_safety" padding="0 16px 0 8px" :disabled="diff.data.length==0" @click="diffData()" >对比({{ diff.num }})</wmButton>
        </template>
      </wmAction>
    </div>
    <div class="app_action_search flex">
      <!-- Search -->
      <wmSearch v-model:show="sea.show" v-model:keys="sea.key" :columns="sea.columns" :placeholder="sea.placeholder" @keyup.enter="page.num=1;loadData()" @search="page.num=1;loadData()" @reset="resetData()">
        <template #customTime="d">
          <ul class="custom_time flex_center">
            <li v-for="v in sea.customTime.list" :key="v.value" @click="setCustomTime(v.value)" :class="{active: sea.customTime.active===v.value}">{{ v.label }}</li>
          </ul>
        </template>
        <template #time="d">
          <wmDatePicker v-model:value="sea.time" range :maxDate="sea.maxDate" :placeholder="d.label"></wmDatePicker>
        </template>
        <template #type="d">
          <wmSelect v-model:value="sea.type" :options="selectAll.type_name" :placeholder="d.label" clearable></wmSelect>
        </template>
        <template #go_co_id="d">
          <wmSelect v-model:value="sea.go_co_id" :options="selectAll.go_co_name" :placeholder="d.label" clearable multiple></wmSelect>
        </template>
        <template #link_co_id="d">
          <wmSelect v-model:value="sea.link_co_id" :options="selectAll.link_co_name" :placeholder="d.label" clearable multiple></wmSelect>
        </template>
        <template #status="d">
          <wmSelect v-model:value="sea.status" :options="selectAll.status_name" :placeholder="d.label" clearable></wmSelect>
        </template>
      </wmSearch>
      <!-- Search End -->
    </div>
  </div>
  <!-- Action End -->
  <!-- Content -->
  <div class="app_ct">
    <!-- List -->
   <wmTable ref="tableList" overflow="auto" :columns="list.columns" :options="list.data" @orderBy="orderBy" @partially="selectState">
      <template #id="d">
        <div class="tCenter">{{ d.id }}</div>
      </template>
      <template #date="d">
        <div class="tCenter">
          <wmTag :title="'创建: '+d.ctime+'\n更新: '+d.utime+'\n制单: '+d.creater_name+', 审核: '+d.operator_name+'\n备注: '+d.remark">{{ d.ctime.substr(0, 10) }}</wmTag>
        </div>
      </template>
      <template #type="d">
        <div class="tCenter">{{ d.type_name }}</div>
      </template>
      <template #sale_price="d">
        <div class="tRight">{{ d.sale_price>0?priceEncode(d.sale_price):'-' }}</div>
      </template>
      <template #market_price="d">
        <div class="tRight">{{ d.market_price>0?priceEncode(d.market_price):'-' }}</div>
      </template>
      <template #num="d">
        <div class="tCenter">{{ d.num }}</div>
      </template>
      <template #total="d">
        <div class="tCenter">{{ d.total }}</div>
      </template>
      <template #status="d">
        <div v-if="d.status=='0'" class="flex_center status0">
          <wmLabel :options="dayDiff(d.ctime)">{{ d.state_name }}</wmLabel>
        </div>
        <div v-else-if="d.status=='1'" class="flex_center status1">
          <wmLabel :options="dayDiff(d.ctime)">{{ d.state_name }}</wmLabel>
        </div>
        <div v-else-if="d.status=='2'" class="flex_center status2">{{ d.status_name }}</div>
        <div v-else class="tCenter">{{ d.status_name }}</div>
      </template>
      <template #action="d">
        <div class="tCenter">
          <wmButton @click="saveData('edit', d)" v-if="isAction('save')&&d.status=='0'">{{ langs.edit }}</wmButton>
          <wmButton type="danger" effect="text" @click="revokeData(d.id, d.go_co_name, d.link_co_name, d.num)" v-else-if="isAction('save')&&d.status=='1'">撤回</wmButton>
          <span class="c_info" v-else><i class="ui ui_safety"></i></span>
        </div>
      </template>
      <template #goods="d">
        <div class="tCenter">
          <wmButton type="primary" effect="text" padding="0 4px" @click="goodsData(d)">商品</wmButton>
        </div>
      </template>
      <template #print="d">
        <div class="tCenter">
          <wmButton type="primary" effect="text" padding="0 4px" @click="printData(d)" :disabled="d.num==0">{{ langs.print }}</wmButton>
        </div>
      </template>
    </wmTable>
    <!-- List End -->
  </div>
  <!-- Page -->
  <div class="app_page">
    <wmPage v-model:total="page.total" v-model:page="page.num" @update:page="loadData()" v-model:limit="page.limit" @update:limit="page.num=1;loadData()"></wmPage>
  </div>
  <!-- Action -->
  <actionSave v-model:show="save.show" :title="save.title" :data="save.data" @submit="saveSubmit($event)"></actionSave>
  <actionDel v-model:show="del.show" :data="del.data" @submit="delSubmit($event)"></actionDel>
  <actionPush v-model:show="push.show" :title="push.title" :info="push.info" :data="push.data" @submit="pushSubmit($event)"></actionPush>
  <actionRevoke v-model:show="revoke.show" :title="revoke.title" :info="revoke.info" :data="revoke.data" @submit="revokeSubmit($event)"></actionRevoke>
  <actionExport v-model:show="exp.show" :data="exp.data" :num="exp.num" @submit="exportSubmit($event)"></actionExport>
  <actionDiff v-model:show="diff.show" :title="diff.title" :data="diff.data" :num="diff.num"></actionDiff>
  <actionGoods v-model:show="goods.show" :title="goods.title" :data="goods.data" @submit="goodsSubmit($event)"></actionGoods>
  <PrintGoods v-model:show="print.show" :title="print.title" :info="print.info" :columns="print.columns" :data="print.data"></PrintGoods>
</template>

<style lang="less" scoped>
.status0,.status1,.status2{padding: 0 10px; border-radius: 2px;}
.status0{background-color: @Info6; color: @Info;}
.status1{background-color: @Warning6; color: @Warning;}
.status2{background-color: @Minor; color: #FFF;}
</style>

<script setup lang="ts">
import { ref, onMounted, onActivated, nextTick } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Ui from '../../../library/ui';
import Request from '../../../library/request';
import Permission from '../../../library/permission';
import Time from '../../../library/time';
import Format from '../../../library/format';
/* 组件 */
import wmButton from '../../../components/form/button/index.vue';
import wmTable from '../../../components/table/index.vue';
import wmTag from '../../../components/tag/index.vue';
import wmPage from '../../../components/page/index.vue';
import wmDatePicker from '../../../components/datepicker/index.vue';
import wmSelect from '../../../components/form/select/index.vue';
import wmLabel from '../../../components/container/label.vue';
/* 动作 */
import wmTotal from '../../tools/Total.vue';
import wmAction from '../../tools/Action.vue';
import wmSearch from '../../tools/Search.vue';
import PrintGoods from '../../tools/PrintGoods.vue';
import actionSave from './save.vue';
import actionDel from './del.vue';
import actionPush from './push.vue';
import actionRevoke from './revoke.vue';
import actionExport from './export.vue';
import actionGoods from './goods.vue';
import actionDiff from './diff.vue';

// 是否加载
const isLoad = ref(false);
const tableList = ref();
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
const isAction = Permission.isAction;
const priceEncode: Function = Format.priceEncode;
// 搜索
const sea = ref({
  show: false, key: '', placeholder: 'ID、操作员、备注',
  time: <any>[Time.Date('Y/m/d', Time.StrToTime('-1 month')), Time.Date('Y/m/d')], maxDate: Time.Date('Y/m/d'),
  customTime: {active:'', list:[
    { label: '今天', value: 'today' },
    { label: '昨天', value: 'yesterday' },
    { label: '3个月', value: 'month' },
    { label: '近1年', value: 'year' },
  ]},
  columns: [
    { label: '', value: '', slot: 'customTime'},
    { label: langs.select, value: '', slot: 'time' },
    { label: '类型', value: '', slot: 'type' },
    { label: '调出仓', value: '', slot: 'go_co_id' },
    { label: '调入仓', value: '', slot: 'link_co_id' },
    { label: '状态', value: '', slot: 'status' },
    { label: '单号, 多条空格分离', value: '', name: 'id' },
    { label: '商品编码, 多条空格分离', value: '', name: 'sku_id' },
    { label: '制单员', value: '', name: 'creater_name' },
    { label: '操作员', value: '', name: 'operator_name' },
    { label: '备注', value: '', name: 'remark' },
  ],
  type: '', go_co_id: '', link_co_id: '', status: '',
});
// 列表
const total = ref({ time: '', list: { num: 0, sale_price: 0, market_price: 0, operator:<any>'' } });
const list = ref({ columns: [
  { title: '单号', index: 'id', slot: 'id', width: '100px', textAlign: 'center' },
  { title: langs.date, index: 'date', slot: 'date', width: '90px', textAlign: 'center' },
  { title: '类型', slot: 'type', width: '80px', minWidth: '80px', textAlign: 'center' },
  { title: '调出仓', index: 'go_co_name' },
  { title: '调入仓', index: 'link_co_name' },
  { title: '标签总额(元)', slot: 'sale_price', textAlign: 'center' },
  { title: '吊牌总额(W)', slot: 'market_price', textAlign: 'center' },
  { title: '数量', slot: 'num', textAlign: 'center' },
  { title: '条数', slot: 'total', textAlign: 'center' },
  { title: '状态', slot: 'status', width: '80px', minWidth: '80px', textAlign: 'center' },
  { title: langs.action, slot: 'action', textAlign: 'center', width: '40px' },
  { title: '商品', slot: 'goods', textAlign: 'center', width: '40px' },
  { title: langs.review, slot: 'print', textAlign: 'center', width: '40px' },
  { title: '制单员', index: 'creater_name', textAlign: 'center' },
  { title: '操作员', index: 'operator_name', textAlign: 'center' },
  { title: '备注', index: 'remark' },
], data: [], num: 0, total: 0, order: '' });
const page = ref({ total: 0, num: 1, limit: 100 });
// 操作
const save = ref({ show: false, title: '添加/编辑', data: <any>{} });
const del = ref({ show: false, title: '删除', data: <any>[] });
const push = ref({ show: false, title: '确认调拨', info: '', num: 0, data: <any>[] });
const revoke = ref({ show: false, title: '撤回', info: '', data: <any>[] });
const exp = ref({ show: false, title: '导出', num: 0, data: <any>[] });
const diff = ref({ show: false, title: '对比', num: 0, data: <any>[] });
const goods = ref({ show: false, title: '商品', data: <any>{} });
const print = ref({ show: false, title: '调拨单', info: {}, columns:<any>[], data: <any>[] });
// 全部分类
const selectAll = ref({ type_name: [], go_co_name: [], link_co_name: [], status_name: [] });

/* 创建完成 */
onMounted(()=>{
  if(state.token) getSelect();
});
onActivated(()=>{
  if(isLoad && state.isLogin) loadData();
});

/* 加载数据 */
const loadData = (): void => {
  sea.value.show = false;
  // 列表
  list.value.data = [];
  const load: any = Ui.Loading();
  Request.Post('erp_purchase_allocate_out/list?lang=' + state.lang, {
    token: state.token,
    data: getWhere(),
    page: page.value.num,
    limit: page.value.limit,
    order: list.value.order,
  }, (res: any) => {
    load.clear();
    const {code, msg, data, time}: any = res.data;
    if(code===0){
      total.value.time = time;
      list.value.data = data;
      clearSelect();
    } else Ui.Toast(msg);
  });
  // 统计
  page.value.total = 0;
  total.value.list.num = 0;
  total.value.list.sale_price = 0;
  total.value.list.market_price = 0;
  total.value.list.operator = '';
  Request.Post('erp_purchase_allocate_out/total?lang=' + state.lang, {
    token: state.token,
    data: getWhere(),
  }, (res: any) => {
    const {code, msg, data, time}: any = res.data;
    if(code===0){
      total.value.time = time;
      page.value.total = data.total;
      total.value.list.sale_price = data.sale_price;
      total.value.list.market_price = data.market_price;
      total.value.list.num = data.num;
      total.value.list.operator = data.operator;
    } else Ui.Toast(msg);
  });
}
/* 搜索条件 */
const getWhere = (): object => {
  const data: any = {
    key: sea.value.key,
    stime: typeof sea.value.time[0]==='string'?sea.value.time[0]:Time.Date('Y/m/d', sea.value.time[0]),
    etime: typeof sea.value.time[1]==='string'?sea.value.time[1]:Time.Date('Y/m/d', sea.value.time[1]),
    type: sea.value.type,
    go_co_id: sea.value.go_co_id,
    link_co_id: sea.value.link_co_id,
    status: sea.value.status,
  };
  for(let v of sea.value.columns) if(v.name) data[v.name] = v.value;
  return data;
}
/* 选中状态 */
const selectState = (n: number, t: number): void => {
  list.value.num = n;
  list.value.total = t;
  // 删除、推送、导出
  const data: Array<any> = tableList.value.getData();
  del.value.data = [];
  push.value.data = [];
  push.value.num = 0;
  exp.value.data = [];
  exp.value.num = 0;
  diff.value.data = [];
  diff.value.num = 0;
  for(let v of data){
    if(v.status==0){
      del.value.data.push(v.id);
      push.value.data.push(v.id);
      push.value.num += parseInt(v.num);
    }
    exp.value.data.push(v.id);
    exp.value.num += parseInt(v.num);
    diff.value.data.push(v.id);
    diff.value.num += parseInt(v.num);
  }
}
/* 排序 */
const orderBy = (val: string): void => {
  list.value.order = val;
  loadData();
}
/* 重置条件 */
const resetData = (): void => {
  // 时间
  sea.value.time = [Time.Date('Y/m/d', Time.StrToTime('-1 month')), Time.Date('Y/m/d')];
  sea.value.customTime.active = '';
  // 条件
  sea.value.key = '';
  sea.value.type = '';
  sea.value.go_co_id = '';
  sea.value.link_co_id = '';
  sea.value.status = '';
  for(let v of sea.value.columns) v.value = '';
  // 其它
  list.value.order = '';
  page.value.num = 1;
  // 加载
  loadData();
}
/* 清除勾选 */
const clearSelect = (): void => {
  nextTick(()=>{
    list.value.num = 0;
    tableList.value.checkboxAll(false);
  });
}
/* 自定义时间 */
const setCustomTime = (type: string): void => {
  sea.value.customTime.active = type;
  switch(type){
    case 'today': sea.value.time = [Time.Date('Y/m/d'), Time.Date('Y/m/d')]; break;
    case 'yesterday': sea.value.time = [Time.Date('Y/m/d', Time.StrToTime('-1 day')), Time.Date('Y/m/d', Time.StrToTime('-1 day'))]; break;
    case 'month': sea.value.time = [Time.Date('Y/m/d', Time.StrToTime('-3 month')), Time.Date('Y/m/d')]; break;
    case 'year': sea.value.time = [Time.Date('Y/m/d', Time.StrToTime('-1 year')), Time.Date('Y/m/d')]; break;
  }
}

/* 更新 */
const saveData = (type: string, data: any = {}): void => {
  save.value.show = true;
  save.value.data = data;
  save.value.data.tp = type;
  if(type==='add'){
    save.value.title = langs.add;
  }else if(type==='edit'){
    save.value.title = langs.edit + '( ' + data.id + ' )';
    save.value.data.id = data.id;
    save.value.data.level = data.level;
  }
}
/* 添加&编辑-回调 */
const saveSubmit = (val: boolean): void => {
  if(!val) return;
  save.value.show = false;
  loadData();
}

/* 删除 */
const delData = (): void => {
  del.value.show = true;
  const data: Array<any> = tableList.value.getData();
  let ids: Array<number> = [];
  for(let v of data) ids.push(v.id);
  del.value.data = ids;
}
/* 删除-回调 */
const delSubmit = (val: boolean): void => {
  if(!val) return;
  del.value.show = false;
  loadData();
}

/* 推送 */
const pushData = (): void => {
  if(push.value.num<=0) return Ui.Toast('请核对商品数量');
  push.value.show = true;
  push.value.info = '单号:[ <b>' + push.value.data.join(',') + '</b> ]&nbsp;&nbsp;&nbsp;&nbsp;数量: <b>' + push.value.num + '</b>';
}
/* 推送-回调 */
const pushSubmit = (val: boolean): void => {
  if(!val) return;
  push.value.show = false;
  loadData();
}

/* 撤回 */
const revokeData = (id: number, go_co_name: string, link_co_name: string, num: number): void => {
  revoke.value.show = true;
  revoke.value.data = [id];
  revoke.value.info = '单号: <b>' + id + '</b>&nbsp;&nbsp;[ <b>' + go_co_name + '</b> > <b>' + link_co_name + '</b> ]&nbsp;&nbsp;数量: <b>' + num + '</b>';
}
/* 撤回-回调 */
const revokeSubmit = (val: boolean): void => {
  if(!val) return;
  revoke.value.show = false;
  loadData();
}

/* 导出 */
const exportData = (): void => {
  exp.value.show = true;
}
/* 导出-回调 */
const exportSubmit = (val: boolean): void => {
  if(!val) return;
  exp.value.show = false;
  clearSelect();
}

/* 对比 */
const diffData = (): void => {
  diff.value.show = true;
  diff.value.title = '对比调拨入( '+diff.value.data.join(',')+' )';
}

/* 商品 */
const goodsData = (row: any): void => {
  goods.value.show = true;
  goods.value.title = '[ ' + row.id + ' ] ' + row.go_co_name + ' > ' + row.link_co_name;
  goods.value.data.id = row.id;
  goods.value.data.ctime = row.ctime;
  goods.value.data.utime = row.utime;
  goods.value.data.go_co_id = row.go_co_id;
  goods.value.data.link_co_id = row.link_co_id;
  goods.value.data.type = row.type;
  goods.value.data.status = row.status;
}
/* 商品-回调 */
const goodsSubmit = (val: boolean): void => {
  if(!val) return;
  goods.value.show = false;
  loadData();
}

/* 打印 */
const printData = (row: any): void => {
  print.value.show = true;
  // 信息
  print.value.info = {
    title: '[调拨] '+row.go_co_name + ' > ' + row.link_co_name,
    id: row.id,
    sale_price: row.sale_price,
    market_price: row.market_price,
    level: row.type_name,
    level_time: row.type_info,
    num: row.num,
    ctime: row.ctime,
    utime: row.utime,
    creater_name: row.creater_name,
    operator_name: row.operator_name,
    remark: row.remark,
  };
  // 字段
  print.value.columns = [
    { 'label': '商品编码', value: 'sku_id', checked: true, textAlign: 'center' },
    { 'label': '商品名称', value: 'name', checked: true, textAlign: 'center' },
    { 'label': '颜色及规格', value: 'properties_value', checked: true },
    { 'label': '成本价(元)', value: 'cost_price', checked: true, price: true, textAlign: 'right' },
    { 'label': '标签金额(元)', value: 'sale_price', checked: true, price: true, textAlign: 'right' },
    { 'label': '吊牌金额(W)', value: 'market_price', checked: true, price: true, textAlign: 'right' },
    { 'label': '数量', value: 'num', checked: true, textAlign: 'center' },
    { 'label': '折扣', value: 'ratio', checked: true, textAlign: 'center' },
    { 'label': '单位', value: 'unit', checked: true, textAlign: 'center' },
    { 'label': '重量', value: 'weight', checked: true, textAlign: 'center' },
    { 'label': '标签', value: 'labels', checked: true, textAlign: 'center' },
    { 'label': '商品分类', value: 'category', checked: false, textAlign: 'center' },
    { 'label': '制单员', value: 'operator_name', checked: true, textAlign: 'center' },
    { 'label': '创建时间', value: 'ctime', checked: true, textAlign: 'center' },
    { 'label': '更新时间', value: 'ctime', checked: false, textAlign: 'center' },
  ];
  // 明细
  const load: any = Ui.Loading();
  Request.Post('erp_purchase_allocate_out/goods_list?lang=' + state.lang, {
    token: state.token,
    id: row.id,
    ctime: row.ctime,
    utime: row.utime,
    wms_co_id: row.wms_co_id,
  }, (res: any) => {
    load.clear();
    const {code, msg, data}: any = res.data;
    if(code===0){
      print.value.data = data;
    } else Ui.Toast(msg);
  });
}

/* 日期比较 */
const dayDiff = (t: string): object => {
  let old:number = Time.StrToTime(t);
  let now:number = Time.StrToTime(Time.Date('Y-m-d')+' 23:59:59');
  let d: number = Math.ceil((now-old)/(3600*24));
  let content: string = '';
  let color: string = '';
  let bgColor: string = '';
  if(d===1){
    content = '今天';
    color = '#FFF';
    bgColor = '#67C23A';
  } else if(d===2){
    content = '昨天';
    color = '#67C23A';
    bgColor = '#E1F3D8';
  } else if(d===3){
    content = d+'天';
    color = '#F56C6C';
    bgColor = '#FDE2E2';
  } else if(d>=4){
    content = d+'天';
    color = '#FFF';
    bgColor = '#F56C6C';
  } else {
    content = '其它';
    color = '#FFF';
    bgColor = '#606266';
  }
  return {content:content, color: color, bgColor: bgColor};
}

/* 选项 */
const getSelect = (): void => {
  Request.Post('erp_purchase_allocate_out/get_select?lang=' + state.lang, {
    token: state.token,
  }, (res: any) => {
    const {code, msg, data}: any = res.data;
    if(code===0){
      selectAll.value.type_name = data.type_name;
      selectAll.value.go_co_name = data.go_co_name;
      selectAll.value.link_co_name = data.link_co_name;
      selectAll.value.status_name = data.status_name;
      // 加载
      isLoad.value = true;
    } else Ui.Toast(msg);
  });
}

</script>
