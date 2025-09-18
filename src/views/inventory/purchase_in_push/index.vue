<template>
  <!-- Total -->
  <wmTotal :time="total.time" @refresh="loadData()">
    标签金额: <b>{{ priceEncode(total.list.sale_price) }}</b> 元&nbsp;&nbsp;
    吊牌金额: <b>{{ priceEncode(total.list.market_price) }}</b> W&nbsp;&nbsp;
    数量: <b>{{ total.list.num }}</b>&nbsp;&nbsp;
  </wmTotal>
  <!-- Action -->
  <div class="app_action flex">
    <div class="app_action_tools scrollbar">
      <wmAction :columns="[
        {action: 'push', slot: 'push', is_action: true},
        {action: 'line', slot: 'line'},
        {action: 'export', slot: 'export', is_action: true},
        {action: 'diff', slot: 'diff', is_action: false},
      ]">
        <template #push>
          <wmButton effect="dark" type="primary" icon="ui ui_safety" padding="0 16px 0 8px" :disabled="push.data.length==0" @click="pushData()">{{ push.title }}({{ push.data.length }})</wmButton>
        </template>
        <template #line>
          <span class="line" v-if="isAction('push')">|</span>
        </template>
        <template #export>
          <wmButton effect="plain" icon="ui ui_export" padding="0 16px 0 8px" :disabled="exp.data.length==0" @click="exportData()">{{ langs.export }}({{ exp.num }})</wmButton>
        </template>
        <template #diff>
          <wmButton effect="plain" icon="ui ui_safety" padding="0 16px 0 8px" :disabled="diff.data.length == 0" @click="diffData()" >对比({{ diff.num }})</wmButton>
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
        <template #wms_co_id="d">
          <wmSelect v-model:value="sea.wms_co_id" :options="selectAll.partner_name" :placeholder="d.label" clearable multiple></wmSelect>
        </template>
        <template #type="d">
          <wmSelect v-model:value="sea.type" :options="selectAll.type_name" :placeholder="d.label" clearable></wmSelect>
        </template>
        <template #status="d">
          <wmSelect v-model:value="sea.status" :options="selectAll.status_name" :placeholder="d.label" clearable></wmSelect>
        </template>
        <template #brand="d">
          <wmSelect v-model:value="sea.brand" :options="selectAll.brand_name" :placeholder="d.label" clearable></wmSelect>
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
          <wmTag :title="'创建: '+d.ctime+'\n更新: '+d.utime+'\n制单: '+d.creator_name+', 审核: '+d.operator_name+'\n备注: '+d.remark">{{ d.utime.substr(0, 10) }}</wmTag>
        </div>
      </template>
      <template #type="d">
        <div class="tCenter">{{ d.type_name }}</div>
      </template>
      <template #brand="d">
        <div class="tCenter">{{ d.brand }}</div>
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
        <div v-if="d.status=='0'" class="flex_center status0">{{ d.status_name }}</div>
        <div v-else-if="d.status=='1'" class="flex_center status1">{{ d.status_name }}</div>
        <div v-else-if="d.status=='2'" class="flex_center status2">{{ d.status_name }}</div>
        <div v-else class="tCenter">{{ d.status_name }}</div>
      </template>
      <template #action="d">
        <div class="tCenter">
          <wmButton type="danger" effect="text" @click="revokeData(d.id, d.brand, d.num)" v-if="isAction('revoke')&&d.state=='1'">撤回</wmButton>
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
  <actionPush v-model:show="push.show" :title="push.title" :info="push.info" :data="push.data" @submit="pushSubmit($event)"></actionPush>
  <actionRevoke v-model:show="revoke.show" :title="revoke.title" :info="revoke.info" :data="revoke.data" @submit="revokeSubmit($event)"></actionRevoke>
  <actionExport v-model:show="exp.show" :data="exp.data" :num="exp.num" @submit="exportSubmit($event)"></actionExport>
  <actionDiff v-model:show="diff.show" :title="diff.title" :data="diff.data" :num="diff.num"></actionDiff>
  <actionGoods v-model:show="goods.show" :title="goods.title" :data="goods.data"></actionGoods>
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
/* 动作 */
import wmTotal from '../../tools/Total.vue';
import wmAction from '../../tools/Action.vue';
import wmSearch from '../../tools/Search.vue';
import PrintGoods from '../../tools/PrintGoods.vue';
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
  show: false, key: '', placeholder: 'ID、品牌、操作员、备注',
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
    { label: '仓库名称', value: '', slot: 'wms_co_id' },
    { label: '入库类型', value: '', slot: 'type' },
    { label: '状态', value: '', slot: 'status' },
    { label: '品牌', value: '', slot: 'brand' },
    { label: '单号, 多条空格分离', value: '', name: 'id' },
    { label: '商品编码, 多条空格分离', value: '', name: 'sku_id' },
    { label: '制单员', value: '', name: 'creator_name' },
    { label: '操作员', value: '', name: 'operator_name' },
    { label: '备注', value: '', name: 'remark' },
  ],
  type: '', wms_co_id: '', brand: '', status: '',
});
// 列表
const total = ref({ time: '', list: { num: 0, cost_price: 0, sale_price: 0, purchase_price: 0, market_price: 0 } });
const list = ref({ columns: [
  { title: '单号', slot: 'id', textAlign: 'center', width: '100px' },
  { title: langs.date, slot: 'date', textAlign: 'center', width: '90px' },
  { title: '类型', slot: 'type', index: 'type', order: '', textAlign: 'center', width: '80px', minWidth: '80px' },
  { title: '入库仓库', index: 'wms_co_name', width: '200px' },
  { title: '品牌', slot: 'brand', index: 'brand', order: '', textAlign: 'center', width: '80px', minWidth: '80px' },
  { title: '标签总额(元)', slot: 'sale_price', index: 'sale_price', order: '', textAlign: 'center', width: '100px' },
  { title: '吊牌总额(W)', slot: 'market_price', index: 'market_price', order: '', textAlign: 'center', width: '100px' },
  { title: '数量', slot: 'num', index: 'num', order: '', textAlign: 'center', width: '60px' },
  { title: '条数', slot: 'total', index: 'total', order: '', textAlign: 'center', width: '60px' },
  { title: '状态', slot: 'status', width: '80px', minWidth: '80px', textAlign: 'center' },
  { title: langs.action, slot: 'action', textAlign: 'center', width: '40px' },
  { title: '商品', slot: 'goods', textAlign: 'center', width: '40px' },
  { title: langs.review, slot: 'print', textAlign: 'center', width: '40px' },
  { title: '制单员', index: 'creator_name', textAlign: 'center', width: '100px' },
  { title: '操作员', index: 'operator_name', textAlign: 'center', width: '100px' },
  { title: '备注', index: 'remark' },
], data: <any>[], num: 0, total: 0, order: '' });
const page = ref({ total: 0, num: 1, limit: 100 });
// 操作
const push = ref({ show: false, title: '确认入库', info: '', num: 0, data: <any>[] });
const revoke = ref({ show: false, title: '撤回', info: '', data: <any>[] });
const exp = ref({ show: false, title: '导出', num: 0, data: <any>[] });
const diff = ref({ show: false, title: '对比', num: 0, data: <any>[] });
const goods = ref({ show: false, title: '商品', data: <any>{} });
const print = ref({ show: false, title: '入库单', info: {}, columns:<any>[], data: <any>[] });
// 全部分类
const selectAll = ref({ partner_name: [], brand_name: [], type_name: [], status_name: [] });

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
  Request.Post('erp_purchase_in_push/list?lang=' + state.lang, {
    token: state.token,
    data: getWhere(),
    page: page.value.num,
    limit: page.value.limit,
    order: list.value.order,
  }, (res: any) => {
    load.clear();
    const {code, msg, data, time}: any = res.data;
    if (code == 0) {
      total.value.time = time;
      list.value.data = data;
      nextTick(() => clearSelect())
    } else Ui.Toast(msg);
  });
  // 统计
  page.value.total = 0;
  total.value.list.num = 0;
  total.value.list.cost_price = 0;
  total.value.list.sale_price = 0;
  total.value.list.purchase_price = 0;
  total.value.list.market_price = 0;
  Request.Post('erp_purchase_in_push/total?lang=' + state.lang, {
    token: state.token,
    data: getWhere(),
  }, (res: any) => {
    const {code, msg, data, time}: any = res.data;
    if (code == 0) {
      total.value.time = time;
      page.value.total = data.total;
      total.value.list.cost_price = data.cost_price;
      total.value.list.sale_price = data.sale_price;
      total.value.list.purchase_price = data.purchase_price;
      total.value.list.market_price = data.market_price;
      total.value.list.num = data.num;
    } else Ui.Toast(msg);
  });
}
/* 搜索条件 */
const getWhere = (): object => {
  const data: any = {
    key: sea.value.key,
    stime: typeof sea.value.time[0] == 'string' ? sea.value.time[0] : Time.Date('Y/m/d', sea.value.time[0]),
    etime: typeof sea.value.time[1] == 'string' ? sea.value.time[1] : Time.Date('Y/m/d', sea.value.time[1]),
    wms_co_id: sea.value.wms_co_id,
    type: sea.value.type,
    status: sea.value.status,
    brand: sea.value.brand,
  };
  for (let v of sea.value.columns) if (v.name) data[v.name] = v.value;
  return data;
}
/* 选中状态 */
const selectState = (n: number, t: number): void => {
  list.value.num = n;
  list.value.total = t;
  // 推送、导出
  const data: Array<any> = tableList.value.getData();
  push.value.data = [];
  push.value.num = 0;
  exp.value.data = [];
  exp.value.num = 0;
  diff.value.data = [];
  diff.value.num = 0;
  for (let v of data) {
    if (v.status == 1) {
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
  sea.value.wms_co_id = '';
  sea.value.type = '';
  sea.value.status = '';
  sea.value.brand = '';
  for (let v of sea.value.columns) v.value = '';
  // 其它
  list.value.order = '';
  page.value.num = 1;
  // 加载
  loadData();
}
/* 清除勾选 */
const clearSelect = (): void => {
  nextTick(()=>{
    tableList.value.checkboxAll(false);
  });
}
/* 自定义时间 */
const setCustomTime = (type: string): void => {
  sea.value.customTime.active = type;
  switch(type) {
    case 'today': sea.value.time = [Time.Date('Y/m/d'), Time.Date('Y/m/d')]; break;
    case 'yesterday': sea.value.time = [Time.Date('Y/m/d', Time.StrToTime('-1 day')), Time.Date('Y/m/d', Time.StrToTime('-1 day'))]; break;
    case 'month': sea.value.time = [Time.Date('Y/m/d', Time.StrToTime('-3 month')), Time.Date('Y/m/d')]; break;
    case 'year': sea.value.time = [Time.Date('Y/m/d', Time.StrToTime('-1 year')), Time.Date('Y/m/d')]; break;
  }
}

/* 推送 */
const pushData = (): void => {
  push.value.show = true;
  push.value.info = '单号:[ <b>' + push.value.data.join(',') + '</b> ]&nbsp;&nbsp;&nbsp;&nbsp;数量: <b>' + push.value.num + '</b>';
}
/* 推送-回调 */
const pushSubmit = (val: boolean): void => {
  if (!val) return;
  push.value.show = false;
  loadData();
}

/* 撤回 */
const revokeData = (id: number, brand: string, num: number): void => {
  revoke.value.show = true;
  revoke.value.data = [id];
  revoke.value.info = '单号: <b>' + id + '</b>&nbsp;&nbsp;品牌: <b>' + brand + '</b>&nbsp;&nbsp;数量: <b>' + num + '</b>';
}
/* 撤回-回调 */
const revokeSubmit = (val: boolean): void => {
  if (!val) return;
  revoke.value.show = false;
  loadData();
}

/* 导出 */
const exportData = (): void => {
  exp.value.show = true;
}
/* 导出-回调 */
const exportSubmit = (val: boolean): void => {
  if (!val) return;
  exp.value.show = false;
  clearSelect();
}

/* 对比 */
const diffData = (): void => {
  diff.value.show = true;
}

/* 商品 */
const goodsData = (row: any): void => {
  goods.value.show = true;
  goods.value.title = row.wms_co_name + '( ' + row.id + ' )';
  goods.value.data.id = row.id;
  goods.value.data.ctime = row.ctime;
  goods.value.data.utime = row.utime;
  goods.value.data.wms_co_id = row.wms_co_id;
}

/* 打印 */
const printData = (row: any): void => {
  print.value.show = true;
  // 信息
  print.value.info = {
    title: '[入库] '+row.wms_co_name,
    id: row.id,
    cost_price: row.cost_price,
    sale_price: row.sale_price,
    purchase_price: row.purchase_price,
    market_price: row.market_price,
    num: row.num,
    ctime: row.ctime,
    utime: row.utime,
    creator_name: row.creator_name,
    operator_name: row.operator_name,
    remark: row.remark,
  };
  // 字段
  print.value.columns = [
    { 'label': '商品编码', value: 'sku_id', checked: true, textAlign: 'center' },
    { 'label': '商品名称', value: 'name', checked: true, textAlign: 'center' },
    { 'label': '颜色及规格', value: 'properties_value', checked: true },
    { 'label': '成本金额(元)', value: 'cost_price', checked: false, price: true, textAlign: 'right' },
    { 'label': '标签金额(元)', value: 'sale_price', checked: true, price: true, textAlign: 'right' },
    { 'label': '采购金额(W)', value: 'purchase_price', checked: false, price: true, textAlign: 'right' },
    { 'label': '吊牌金额(W)', value: 'market_price', checked: true, price: true, textAlign: 'right' },
    { 'label': '数量', value: 'num', checked: true, textAlign: 'center' },
    { 'label': '折扣', value: 'ratio', checked: true, textAlign: 'center' },
    { 'label': '单位', value: 'unit', checked: true, textAlign: 'center' },
    { 'label': '重量', value: 'weight', checked: true, textAlign: 'center' },
    { 'label': '标签', value: 'labels', checked: false, textAlign: 'center' },
    { 'label': '商品分类', value: 'category', checked: false, textAlign: 'center' },
    { 'label': '品牌', value: 'brand', checked: true, textAlign: 'center' },
    { 'label': '采购员', value: 'owner', checked: true, textAlign: 'center' },
    { 'label': '供应商', value: 'supplier_name', checked: false, textAlign: 'center' },
    { 'label': '制单员', value: 'operator_name', checked: true, textAlign: 'center' },
    { 'label': '创建时间', value: 'ctime', checked: true, textAlign: 'center' },
    { 'label': '更新时间', value: 'ctime', checked: false, textAlign: 'center' },
  ];
  // 明细
  const load: any = Ui.Loading();
  Request.Post('erp_purchase_in_push/goods_list?lang=' + state.lang, {
    token: state.token,
    id: row.id,
    ctime: row.ctime,
    utime: row.utime,
    wms_co_id: row.wms_co_id,
  }, (res: any) => {
    load.clear();
    const {code, msg, data}: any = res.data;
    if (code == 0) {
      print.value.data = data;
    } else Ui.Toast(msg);
  });
}

/* 选项 */
const getSelect = (): void => {
  Request.Post('erp_purchase_in_push/get_select?lang=' + state.lang, {
    token: state.token,
  }, (res: any) => {
    const {code, msg, data}: any = res.data;
    if (code == 0) {
      // 分仓、品牌、类型、状态
      selectAll.value.partner_name = data.partner_name;
      selectAll.value.brand_name = data.brand_name;
      selectAll.value.type_name = data.type_name;
      selectAll.value.status_name = data.status_name;
      // 加载
      isLoad.value = true;
    } else Ui.Toast(msg);
  });
}

</script>
