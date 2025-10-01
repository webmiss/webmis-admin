<template>
  <!-- Total -->
  <wmTotal :time="total.time" @refresh="loadData()">
    销售总额: <b>{{ priceEncode(total.list.sale_price_out) }}</b> 元/  <b>{{ priceEncode(total.list.market_price_out) }}</b> W/ <b>{{ total.list.out_num }}</b> 件&nbsp;&nbsp;
    退货总额: <b>{{ priceEncode(total.list.sale_price_in) }}</b> 元/  <b>{{ priceEncode(total.list.market_price_in) }}</b> W/ <b>{{ total.list.in_num }}</b> 件&nbsp;&nbsp;
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
        <template #shop_id="d">
          <wmSelect v-model:value="sea.shop_id" :options="selectAll.shop_name" :placeholder="d.label" clearable multiple></wmSelect>
        </template>
        <template #shop_to="d">
          <wmSelect v-model:value="sea.shop_to" :options="selectAll.shop_to_name" :placeholder="d.label" clearable multiple></wmSelect>
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
          <wmTag :title="'创建: '+d.ctime+'\n更新: '+d.utime+'\n制单: '+d.creater_name+', 审核: '+d.operator_name+'\n备注: '+d.remark">{{ d.utime.substr(0, 10) }}</wmTag>
        </div>
      </template>
      <template #type="d">
        <div class="tCenter">
          <span :class="d.type==0?'c_success':'c_danger'">{{ d.type_name }}</span>
        </div>
      </template>
      <template #sale_price="d">
        <div class="tRight">{{ d.sale_price>0?priceEncode(d.sale_price):'-' }}</div>
      </template>
      <template #market_price="d">
        <div class="tRight">{{ d.market_price>0?priceEncode(d.market_price):'-' }}</div>
      </template>
      <template #num="d">
        <div class="tCenter">{{ d.num || '-' }}</div>
      </template>
      <template #total="d">
        <div class="tCenter">{{ d.total || '-' }}</div>
      </template>
      <template #status="d">
        <div v-if="d.status=='0'" class="flex_center status0">{{ d.status_name }}</div>
        <div v-else-if="d.status=='1'" class="flex_center status1">{{ d.status_name }}</div>
        <div v-else class="tCenter">{{ d.status_name }}</div>
      </template>
      <template #action="d">
        <div class="tCenter">
          <wmButton @click="saveData('edit', d)" v-if="isAction('save')&&d.status=='0'">{{ langs.edit }}</wmButton>
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
  <actionExport v-model:show="exp.show" :data="exp.data" :num="exp.num" @submit="exportSubmit($event)"></actionExport>
  <actionGoods v-model:show="goods.show" :title="goods.title" :data="goods.data" @submit="goodsSubmit($event)"></actionGoods>
  <PrintGoods v-model:show="print.show" :title="print.title" :info="print.info" :columns="print.columns" :data="print.data"></PrintGoods>
</template>

<style lang="less" scoped>
.status0,.status1,.status2{padding: 0 10px; border-radius: 2px;}
.status0{background-color: @Info6; color: @Info;}
.status1{background-color: @Minor; color: #FFF;}
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
import actionSave from './save.vue';
import actionDel from './del.vue';
import actionPush from './push.vue';
import actionExport from './export.vue';
import actionGoods from './goods.vue';

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
    { label: '仓库名称', value: '', slot: 'wms_co_id' },
    { label: '类型', value: '', slot: 'type' },
    { label: '店铺名称', value: '', slot: 'shop_id' },
    { label: '买断店铺', value: '', slot: 'shop_to' },
    { label: '状态', value: '', slot: 'status' },
    { label: '单号, 多条空格分离', value: '', name: 'id' },
    { label: '商品编码, 多条空格分离', value: '', name: 'sku_id' },
    { label: '制单员', value: '', name: 'creater_name' },
    { label: '操作员', value: '', name: 'operator_name' },
    { label: '备注', value: '', name: 'remark' },
  ],
  type: '', shop_id: '', shop_to: '', wms_co_id: '', status: '',
});
// 列表
const total = ref({ time: '', list: { sale_price_out: 0, market_price_out: 0, out_num: 0, sale_price_in: 0, market_price_in: 0, in_num: 0 } });
const list = ref({ columns: [
  { title: '单号', index: 'id', slot: 'id', textAlign: 'center', width: '100px' },
  { title: langs.date, index: 'date', slot: 'date', textAlign: 'center', width: '90px' },
  { title: '仓库', index: 'wms_co_name', width: '200px' },
  { title: '类型', slot: 'type', textAlign: 'center', width: '60px', minWidth: '60px' },
  { title: '店铺名称', index: 'shop_name', width: '200px' },
  { title: '买断店铺', index: 'shop_to_name', width: '200px' },
  { title: '标签总额(元)', slot: 'sale_price', textAlign: 'center', width: '100px' },
  { title: '吊牌总额(W)', slot: 'market_price', textAlign: 'center', width: '100px' },
  { title: '数量', slot: 'num', textAlign: 'center', width: '60px' },
  { title: '条数', slot: 'total', textAlign: 'center', width: '60px' },
  { title: '状态', slot: 'status', width: '80px', minWidth: '80px', textAlign: 'center' },
  { title: langs.action, slot: 'action', textAlign: 'center', width: '40px' },
  { title: '商品', slot: 'goods', textAlign: 'center', width: '40px' },
  { title: langs.review, slot: 'print', textAlign: 'center', width: '40px' },
  { title: '制单员', index: 'creator_name', textAlign: 'center', width: '100px' },
  { title: '操作员', index: 'operator_name', textAlign: 'center', width: '100px' },
  { title: '备注', index: 'remark' },
], data: [], num: 0, total: 0, order: '' });
const page = ref({ total: 0, num: 1, limit: 100 });
// 操作
const save = ref({ show: false, title: '添加/编辑', data: <any>{} });
const del = ref({ show: false, title: '删除', data: <any>[] });
const push = ref({ show: false, title: '确认生效', info: '', num: 0, data: <any>[] });
const exp = ref({ show: false, title: '导出', num: 0, data: <any>[] });
const goods = ref({ show: false, title: '商品', data: <any>{} });
const print = ref({ show: false, title: '其他出入库', info: {}, columns:<any>[], data: <any>[] });
// 全部分类
const selectAll = ref({ type_name: [], shop_name: [], shop_to_name: [], partner_name: [], status_name: [] });

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
  Request.Post('erp_order_inout/list?lang=' + state.lang, {
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
  total.value.list.sale_price_out = 0;
  total.value.list.market_price_out = 0;
  total.value.list.out_num = 0;
  total.value.list.sale_price_in = 0;
  total.value.list.market_price_in = 0;
  total.value.list.in_num = 0;
  Request.Post('erp_order_inout/total?lang=' + state.lang, {
    token: state.token,
    data: getWhere(),
  }, (res: any) => {
    const {code, msg, data, time}: any = res.data;
    if (code == 0) {
      total.value.time = time;
      page.value.total = data.total;
      total.value.list.sale_price_out = data.sale_price_out;
      total.value.list.market_price_out = data.market_price_out;
      total.value.list.out_num = data.out_num;
      total.value.list.sale_price_in = data.sale_price_in;
      total.value.list.market_price_in = data.market_price_in;
      total.value.list.in_num = data.in_num;
    } else Ui.Toast(msg);
  });
}
/* 搜索条件 */
const getWhere = (): object => {
  const data: any = {
    key: sea.value.key,
    stime: typeof sea.value.time[0] == 'string' ? sea.value.time[0] : Time.Date('Y/m/d', sea.value.time[0]),
    etime: typeof sea.value.time[1] == 'string' ? sea.value.time[1] : Time.Date('Y/m/d', sea.value.time[1]),
    type: sea.value.type,
    shop_id: sea.value.shop_id,
    shop_to: sea.value.shop_to,
    wms_co_id: sea.value.wms_co_id,
    status: sea.value.status,
  };
  for (let v of sea.value.columns) if (v.name) data[v.name] = v.value;
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
  for (let v of data) {
    if (v.status == 0) {
      del.value.data.push(v.id);
      push.value.data.push(v.id);
      push.value.num += parseInt(v.num);
    }
    exp.value.data.push(v.id);
    exp.value.num += parseInt(v.num);
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
  sea.value.shop_id = '';
  sea.value.shop_to = '';
  sea.value.wms_co_id = '';
  sea.value.status = '';
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

/* 更新 */
const saveData = (type: string, data: any = {}): void => {
  save.value.show = true;
  save.value.data = data;
  save.value.data.tp = type;
  if (type == 'add') {
    save.value.title = langs.add;
  } else if (type == 'edit') {
    save.value.title = langs.edit + '( ' + data.id + ' )';
    save.value.data.id = data.id;
  }
}
/* 添加&编辑-回调 */
const saveSubmit = (val: boolean): void => {
  if (!val) return;
  save.value.show = false;
  loadData();
}

/* 删除 */
const delData = (): void => {
  del.value.show = true;
  const data: Array<any> = tableList.value.getData();
  let ids: Array<number> = [];
  for (let v of data) ids.push(v.id);
  del.value.data = ids;
}
/* 删除-回调 */
const delSubmit = (val: boolean): void => {
  if (!val) return;
  del.value.show = false;
  loadData();
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

/* 商品 */
const goodsData = (row: any): void => {
  goods.value.show = true;
  goods.value.title = row.type_name + ' > ' + row.wms_co_name + '( ' + row.id + ' )';
  goods.value.data.id = row.id;
  goods.value.data.type = row.type;
  goods.value.data.ctime = row.ctime;
  goods.value.data.utime = row.utime;
  goods.value.data.wms_co_id = row.wms_co_id;
  goods.value.data.shop_id = row.shop_id;
  goods.value.data.shop_to = row.shop_to;
  goods.value.data.status = row.status;
}
/* 商品-回调 */
const goodsSubmit = (val: boolean): void => {
  if (!val) return;
  goods.value.show = false;
  loadData();
}

/* 打印 */
const printData = (row: any): void => {
  print.value.show = true;
  // 信息
  print.value.info = {
    title: '[其它'+(row.type==0?'出':'入')+'] '+row.wms_co_name,
    id: row.id,
    sale_price: row.sale_price,
    market_price: row.market_price,
    shop_name: row.shop_name,
    shop_to_name: row.shop_to_name,
    num: row.num,
    ctime: row.ctime,
    utime: row.utime,
    creater_name: row.creator_name,
    operator_name: row.operator_name,
    remark: row.remark,
  };
  // 字段
  print.value.columns = [
    { 'label': '商品编码', value: 'sku_id', checked: true, textAlign: 'center' },
    { 'label': '商品名称', value: 'name', checked: true, textAlign: 'center' },
    { 'label': '颜色及规格', value: 'properties_value', checked: true },
    { 'label': '标签金额(元)', value: 'sale_price', checked: true, price: true, textAlign: 'right' },
    { 'label': '吊牌金额(W)', value: 'market_price', checked: true, price: true, textAlign: 'right' },
    { 'label': '数量', value: 'num', checked: true, textAlign: 'center' },
    { 'label': '折扣', value: 'ratio', checked: true, textAlign: 'center' },
    { 'label': '单位', value: 'unit', checked: true, textAlign: 'center' },
    { 'label': '重量', value: 'weight', checked: true, textAlign: 'center' },
    { 'label': '标签', value: 'labels', checked: false, textAlign: 'center' },
    { 'label': '商品分类', value: 'category', checked: false, textAlign: 'center' },
    { 'label': '品牌', value: 'brand', checked: true, textAlign: 'center' },
    { 'label': '采购员', value: 'owner', checked: true, textAlign: 'center' },
    { 'label': '制单员', value: 'operator_name', checked: true, textAlign: 'center' },
    { 'label': '创建时间', value: 'ctime', checked: true, textAlign: 'center' },
    { 'label': '更新时间', value: 'ctime', checked: false, textAlign: 'center' },
  ];
  // 明细
  const load: any = Ui.Loading();
  Request.Post('erp_order_inout/goods_list?lang=' + state.lang, {
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
  Request.Post('erp_order_inout/get_select?lang=' + state.lang, {
    token: state.token,
  }, (res: any) => {
    const {code, msg, data}: any = res.data;
    if (code == 0) {
      // 类型、店铺、买断、分仓、状态
      selectAll.value.type_name = data.type_name;
      selectAll.value.shop_name = data.shop_name;
      selectAll.value.shop_to_name = data.shop_to_name;
      selectAll.value.partner_name = data.partner_name;
      selectAll.value.status_name = data.status_name;
      // 加载
      isLoad.value = true;
    } else Ui.Toast(msg);
  });
}

</script>