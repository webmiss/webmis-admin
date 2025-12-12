<template>
  <!-- Total -->
  <wmTotal :time="total.time" @refresh="loadData()">
    成本金额: <b>{{ priceEncode(total.list.cost_price) }}</b> 元&nbsp;&nbsp;
    标签金额: <b>{{ priceEncode(total.list.sale_price) }}</b> 元&nbsp;&nbsp;
    采购金额: <b>{{ priceEncode(total.list.purchase_price) }}</b> W&nbsp;&nbsp;
    吊牌金额: <b>{{ priceEncode(total.list.market_price) }}</b> W&nbsp;&nbsp;
    库存: <b>{{ total.list.num }}</b>
  </wmTotal>
  <!-- Action -->
  <div class="app_action flex">
    <div class="app_action_tools scrollbar">
      <wmAction :columns="[
        {action: 'import', slot: 'import', is_action: true},
        {action: 'save', slot: 'edit', is_action: true},
        {action: 'del', slot: 'del', is_action: true},
        {action: 'line', slot: 'line1'},
        {action: 'exchange', slot: 'exchange', is_action: true},
        {action: 'line', slot: 'line2'},
        {action: 'export', slot: 'export', is_action: true},
      ]">
        <template #import>
          <wmButton effect="dark" type="primary" icon="ui ui_add" padding="0 16px 0 8px" @click="importData()">{{ langs.add }}</wmButton>
        </template>
        <template #edit>
          <wmButton effect="plain" type="primary" icon="ui ui_edit" padding="0 16px 0 8px" :disabled="list.num==0" @click="saveData('edits')">{{ langs.edits }}</wmButton>
        </template>
        <template #del>
          <wmButton effect="plain" type="danger" icon="ui ui_del" padding="0 16px 0 8px" :disabled="list.num==0" @click="delData()">{{ langs.del }}({{ list.num }})</wmButton>
        </template>
        <template #line1>
          <span class="line" v-if="isAction('import')">|</span>
        </template>
        <template #exchange>
          <wmButton effect="plain" icon="ui ui_edit" padding="0 16px 0 8px" :disabled="!page.total" @click="exchangeData()">{{ exc.title }}({{ page.total }})</wmButton>
        </template>
        <template #line2>
          <span class="line" v-if="isAction('exchange')">|</span>
        </template>
        <template #export>
          <wmButton effect="plain" icon="ui ui_export" padding="0 16px 0 8px" :disabled="!page.total" @click="exportData(page.total)">{{ langs.export }}({{ page.total }})</wmButton>
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
        <template #labels="d">
          <wmSelect v-model:value="sea.labels" :options="selectAll.labels" :placeholder="d.label" clearable multiple></wmSelect>
        </template>
        <template #category="d">
          <wmSelect v-model:value="sea.category" :options="selectAll.category" :placeholder="d.label" clearable multiple></wmSelect>
        </template>
        <template #num="d">
          <div class="flex">
            <wmInput v-model:value="sea.num1" width="49%" :placeholder="d.label1"/>
            <wmInput v-model:value="sea.num2" width="49%" :placeholder="d.label2"/>
          </div>
        </template>
        <template #cost_price="d">
          <div class="flex">
            <wmInput v-model:value="sea.cost_price1" width="49%" :placeholder="d.label1"/>
            <wmInput v-model:value="sea.cost_price2" width="49%" :placeholder="d.label2"/>
          </div>
        </template>
        <template #supply_price="d">
          <div class="flex">
            <wmInput v-model:value="sea.supply_price1" width="49%" :placeholder="d.label1"/>
            <wmInput v-model:value="sea.supply_price2" width="49%" :placeholder="d.label2"/>
          </div>
        </template>
        <template #sale_price="d">
          <div class="flex">
            <wmInput v-model:value="sea.sale_price1" width="49%" :placeholder="d.label1"/>
            <wmInput v-model:value="sea.sale_price2" width="49%" :placeholder="d.label2"/>
          </div>
        </template>
        <template #purchase_price="d">
          <div class="flex">
            <wmInput v-model:value="sea.purchase_price1" width="49%" :placeholder="d.label1"/>
            <wmInput v-model:value="sea.purchase_price2" width="49%" :placeholder="d.label2"/>
          </div>
        </template>
        <template #supplier_price="d">
          <div class="flex">
            <wmInput v-model:value="sea.supplier_price1" width="49%" :placeholder="d.label1"/>
            <wmInput v-model:value="sea.supplier_price2" width="49%" :placeholder="d.label2"/>
          </div>
        </template>
        <template #market_price="d">
          <div class="flex">
            <wmInput v-model:value="sea.market_price1" width="49%" :placeholder="d.label1"/>
            <wmInput v-model:value="sea.market_price2" width="49%" :placeholder="d.label2"/>
          </div>
        </template>
        <template #weight="d">
          <div class="flex">
            <wmInput v-model:value="sea.weight1" width="49%" :placeholder="d.label1"/>
            <wmInput v-model:value="sea.weight2" width="49%" :placeholder="d.label2"/>
          </div>
        </template>
      </wmSearch>
      <!-- Search End -->
    </div>
  </div>
  <!-- Action End -->
  <!-- Content -->
  <div class="app_ct">
    <!-- List -->
   <wm-table ref="tableList" overflow="auto" :columns="list.columns" :options="list.data" @orderBy="orderBy" @partially="selectState">
      <template #id="d">
        <div class="tCenter">{{ d.id }}</div>
      </template>
      <template #date="d">
        <div class="tCenter">
          <wmTag :title="'创建: '+d.ctime+'\n更新: '+d.utime">{{ d.utime=='1970-01-01 08:00:00'?d.ctime.substr(0, 10):d.utime.substr(0, 10) }}</wmTag>
        </div>
      </template>
      <template #img="d">
        <div class="flex_center">
          <span @click="d.img?goodsView(d.img):''">
            <wmImg :img="d.img?d.img+'&x-oss-process=image/resize,h_40':''" :isView="false"></wmImg>
          </span>
        </div>
      </template>
      <template #sku_id="d">
        <div class="copy"><b>{{ d.sku_id }}</b><span @click="Copy('sku_id', d.sku_id)">复</span></div>
      </template>
      <template #short_name="d">
        <div class="tCenter">{{ d.short_name || '-' }}</div>
      </template>
      <template #i_id="d">
        <div class="tCenter">{{ d.i_id || '-' }}</div>
      </template>
      <template #cost_price="d">
        <div class="tRight">
          <b v-if="d.cost_price==='-'">***</b>
          <span v-else-if="d.ratio!='1.00' || d.ratio_cost!='1.00'">
            <del>{{ priceEncode(d.cost_price) }}</del> <b>{{ priceEncode(d.cost_price*(d.ratio<1?d.ratio:d.ratio_cost)) }}</b>
          </span>
          <b v-else>{{ d.cost_price>0?priceEncode(d.cost_price):'-' }}</b>
        </div>
      </template>
      <template #supply_price="d">
        <div class="tRight">
          <b v-if="d.supply_price==='-'">***</b>
          <span v-else-if="d.ratio!='1.00' || d.ratio_supply!='1.00'">
            <del>{{ priceEncode(d.supply_price) }}</del> <b>{{ priceEncode(d.supply_price*(d.ratio<1?d.ratio:d.ratio_supply)) }}</b>
          </span>
          <b v-else>{{ d.supply_price>0?priceEncode(d.supply_price):'-' }}</b>
        </div>
      </template>
      <template #sale_price="d">
        <div class="tRight">
          <span v-if="d.ratio!='1.00' || d.ratio_sale!='1.00'">
            <del>{{ priceEncode(d.sale_price) }}</del> <b>{{ priceEncode(d.sale_price*(d.ratio<1?d.ratio:d.ratio_sale)) }}</b>
          </span>
          <b v-else>{{ d.sale_price>0?priceEncode(d.sale_price):'-' }}</b>
        </div>
      </template>
      <template #purchase_price="d">
        <div class="tRight">
          <b v-if="d.purchase_price==='-'">***</b>
          <span v-else-if="d.ratio!='1.00' || d.ratio_purchase!='1.00'">
            <del>{{ priceEncode(d.purchase_price) }}</del> <b>{{ priceEncode(d.purchase_price*(d.ratio<1?d.ratio:d.ratio_purchase)) }}</b>
          </span>
          <b v-else>{{ d.purchase_price>0?priceEncode(d.purchase_price):'-' }}</b>
        </div>
      </template>
      <template #supplier_price="d">
        <div class="tRight">
          <span v-if="d.ratio!='1.00' || d.ratio_supplier!='1.00'">
            <del>{{ priceEncode(d.supplier_price) }}</del> <b>{{ priceEncode(d.supplier_price*(d.ratio<1?d.ratio:d.ratio_supplier)) }}</b>
          </span>
          <b v-else>{{ d.supplier_price>0?priceEncode(d.supplier_price):'-' }}</b>
        </div>
      </template>
      <template #market_price="d">
        <div class="tRight">
          <span v-if="d.ratio!='1.00' || d.ratio_market!='1.00'">
            <del>{{ priceEncode(d.market_price) }}</del> <b>{{ priceEncode(d.market_price*(d.ratio<1?d.ratio:d.ratio_market)) }}</b>
          </span>
          <b v-else>{{ d.market_price>0?priceEncode(d.market_price):'-' }}</b>
        </div>
      </template>
      <template #other_price="d">
        <div class="tRight">{{ d.other_price>0?priceEncode(d.other_price):'-' }}</div>
      </template>
      <template #unit="d">
        <div class="tCenter">{{ d.unit || '-' }}</div>
      </template>
      <template #weight="d">
        <div class="tCenter">{{ d.weight || '-' }}</div>
      </template>
      <template #ratio="d">
        <div class="tCenter" :class="d.ratio<1?'c_danger':'c_info'">{{ d.ratio }}</div>
      </template>
      <template #action="d">
        <div class="tCenter">
          <wmButton @click="saveData('edit', d)" v-if="isAction('save')">{{ langs.edit }}</wmButton>
          <span v-else>-</span>
        </div>
      </template>
      <template #view="d">
        <div class="tCenter">
          <wmButton type="primary" effect="text" padding="0 4px" @click="state.goods.show=true;state.goods.sku_id=d.sku_id">{{ langs.flow }}</wmButton>
        </div>
      </template>
      <template #num="d">
        <div class="tCenter"><b>{{ d.num }}</b></div>
      </template>
      <template #supplier_name="d">
        <div class="tCenter">{{ d.supplier_name==='-'?'***':d.supplier_name }}</div>
      </template>
    </wm-table>
    <!-- List End -->
  </div>
  <!-- Page -->
  <div class="app_page">
    <wmPage v-model:total="page.total" v-model:page="page.num" @update:page="loadData()" v-model:limit="page.limit" @update:limit="page.num=1;loadData()"></wmPage>
  </div>
  <!-- Action -->
  <actionSave v-model:show="save.show" :title="save.title" :data="save.data" @submit="saveSubmit($event)"></actionSave>
  <actionDel v-model:show="del.show" :data="del.data" @submit="delSubmit($event)"></actionDel>
  <actionExport v-model:show="exp.show" :data="getWhere()" :order="list.order" :num="exp.num" @submit="exportSubmit($event)"></actionExport>
  <actionImport v-model:show="imp.show" :title="imp.title" @submit="importSubmit($event)"></actionImport>
  <actionExchange v-model:show="exc.show" :title="exc.title" :data="getWhere()" :num="page.total" @submit="exchangeSubmit($event)"></actionExchange>
  <!-- 图片预览 -->
  <wmImgView v-model:show="imgView.show" :index="imgView.index" :options="imgView.imgs"></wmImgView>
</template>

<style lang="less" scoped>
</style>

<script setup lang="ts">
import { ref, onMounted, onActivated, nextTick } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Ui from '../../../library/ui';
import Request from '../../../library/request';
import Time from '../../../library/time';
import Format from '../../../library/format';
import Util from "../../../library/utils";
import Permission from '../../../library/permission';
/* 组件 */
import wmInput from '../../../components/form/input/index.vue';
import wmButton from '../../../components/form/button/index.vue';
import wmTable from '../../../components/table/index.vue';
import wmTag from '../../../components/tag/index.vue';
import wmPage from '../../../components/page/index.vue';
import wmDatePicker from '../../../components/datepicker/index.vue';
import wmSelect from '../../../components/form/select/index.vue';
import wmImg from '../../../components/image/index.vue';
import wmImgView from '../../../components/image/view.vue';
/* 统计、动作、搜索、更新、删除、导出 */
import wmTotal from '../../tools/Total.vue';
import wmAction from '../../tools/Action.vue';
import wmSearch from '../../tools/Search.vue';
import actionSave from './save.vue';
import actionDel from './del.vue';
import actionExport from './export.vue';
import actionImport from './import.vue';
import actionExchange from './exchange.vue';

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
  show: false, key: '', placeholder: '商品编码',
  time: <any>[Time.Date('Y/m/d', Time.StrToTime('-1 month')), Time.Date('Y/m/d')], maxDate: Time.Date('Y/m/d'),
  customTime: {active:'', list:[
    { label: '今天', value: 'today' },
    { label: '昨天', value: 'yesterday' },
    { label: '3个月', value: 'month' },
    { label: '近1年', value: 'year' },
  ]},
  columns: [
    {label: '', value: '', slot: 'customTime'},
    {label: langs.select, value: '', slot: 'time'},
    {label: '标签', value: '', slot: 'labels'},
    {label: '商品分类', value: '', slot: 'category'},
    {label: '商品编码, 多条空格分离', value: '', name: 'sku_id'},
    {label: '暗码, 多条空格分离', value: '', name: 'short_name'},
    {label: '款式编码, 多条空格分离', value: '', name: 'i_id'},
    {label: '供应商', value: '', name: 'supplier_name'},
    {label1: '开始库存', label2: '例如: -1', value: '', slot: 'num'},
    {label1: '成本价', label2: '例如: 0.00', value: '', slot: 'cost_price'},
    {label1: '供应链价', label2: '例如: 0.00', value: '', slot: 'supply_price'},
    {label1: '标签价', label2: '例如: 0.00', value: '', slot: 'sale_price'},
    {label1: '采购价', label2: '例如: 0.00', value: '', slot: 'purchase_price'},
    {label1: '人民币采购价', label2: '例如: 0.00', value: '', slot: 'supplier_price'},
    {label1: '吊牌价', label2: '例如: 0.00', value: '', slot: 'market_price'},
    {label1: '重量', label2: '例如: 0.00', value: '', slot: 'weight'},
    {label: '商品名称', value: '', name: 'name'},
    {label: '颜色及规格', value: '', name: 'properties_value'},
    {label: '品牌', value: '', name: 'brand'},
    {label: '采购员', value: '', name: 'owner'},
  ],
  labels: '', category: '', num1: '', num2: '', weight1: '', weight2: '',
  cost_price1: '', cost_price2: '', supply_price1: '', supply_price2: '', sale_price1: '', sale_price2: '', purchase_price1: '', purchase_price2: '', supplier_price1: '', supplier_price2: '', market_price1: '', market_price2: '',
});
// 列表
const total = ref({time: '', list: {num: 0, cost_price: 0, sale_price: 0, purchase_price: 0, market_price: 0}});
const list = ref({columns: [
  {title: 'ID', index: 'id', slot: 'id', width: '100px', textAlign: 'center'},
  {title: langs.date, index: 'date', slot: 'date', width: '90px', textAlign: 'center'},
  {title: langs.img, slot: 'img', width: '60px', textAlign: 'center'},
  {title: '商品编码', index: 'sku_id', slot: 'sku_id', order: '', width: '150px', minWidth: '150px', textAlign: 'center'},
  {title: '暗码', index: 'short_name', slot: 'short_name', order: '', textAlign: 'center'},
  {title: '款式编码', index: 'i_id', slot: 'i_id', order: '', textAlign: 'center'},
  {title: '商品名称', index: 'name', textAlign: 'center'},
  {title: '颜色及规格', index: 'properties_value', textAlign: 'center'},
  {title: '成本价(元)', slot: 'cost_price', textAlign: 'center'},
  {title: '供应链价(元)', slot: 'supply_price', textAlign: 'center'},
  {title: '标签价(元)', slot: 'sale_price', textAlign: 'center'},
  {title: '采购价(W)', slot: 'purchase_price', textAlign: 'center'},
  {title: '人民币采购价(元)', slot: 'supplier_price', textAlign: 'center'},
  {title: '吊牌价(W)', slot: 'market_price', textAlign: 'center'},
  {title: '参照价(元)', slot: 'other_price', textAlign: 'center'},
  {title: '单位', slot: 'unit', textAlign: 'center'},
  {title: '重量', slot: 'weight', textAlign: 'center'},
  {title: '折扣', slot: 'ratio', textAlign: 'center'},
  {title: langs.action, slot: 'action', textAlign: 'center', width: '40px'},
  {title: langs.view, slot: 'view', textAlign: 'center', width: '40px'},
  {title: '库存', slot: 'num', textAlign: 'center'},
  {title: '仓库名称', index: 'wms_co_name', order: '', textAlign: 'center'},
  {title: '标签', index: 'labels', textAlign: 'center'},
  {title: '商品分类', index: 'category', textAlign: 'center'},
  {title: '品牌', index: 'brand', textAlign: 'center'},
  {title: '供应商', slot: 'supplier_name', textAlign: 'center'},
  {title: '采购员', index: 'owner', textAlign: 'center'},
], data: <any>[], num: 0, total: 0, order: ''});
const page = ref({total: 0, num: 1, limit: 100});
// 添加&编辑、删除、导出、导入
const save = ref({show: false, title: '添加/编辑', data: <any>{}});
const del = ref({show: false, title: '删除', data: <any>[]});
const exp = ref({show: false, title: '导出', num: 0});
const imp = ref({show: false, title: '导入'});
const exc = ref({show: false, title: '汇率换算'});
// 全部分类
const selectAll = ref({labels: <any>[], category: <any>[]});
// 图片预览
const imgView = ref({show: false, index:0, imgs:[]});

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
  Request.Post('erp_goods_info/list?lang=' + state.lang, {
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
  Request.Post('erp_goods_info/total?lang=' + state.lang, {
    token: state.token,
    data: getWhere(),
  }, (res: any) => {
    const {code, msg, data, time}: any = res.data;
    if(code===0){
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
    stime: typeof sea.value.time[0]==='string'?sea.value.time[0]:Time.Date('Y/m/d', sea.value.time[0]),
    etime: typeof sea.value.time[1]==='string'?sea.value.time[1]:Time.Date('Y/m/d', sea.value.time[1]),
    labels: sea.value.labels,
    category: sea.value.category,
    num1: sea.value.num1,
    num2: sea.value.num2,
    cost_price1: sea.value.cost_price1,
    cost_price2: sea.value.cost_price2,
    supply_price1: sea.value.supply_price1,
    supply_price2: sea.value.supply_price2,
    sale_price1: sea.value.sale_price1,
    sale_price2: sea.value.sale_price2,
    purchase_price1: sea.value.purchase_price1,
    purchase_price2: sea.value.purchase_price2,
    supplier_price1: sea.value.supplier_price1,
    supplier_price2: sea.value.supplier_price2,
    market_price1: sea.value.market_price1,
    market_price2: sea.value.market_price2,
    weight1: sea.value.weight1,
    weight2: sea.value.weight2,
  };
  for(let v of sea.value.columns) if(v.name) data[v.name] = v.value;
  return data;
}
/* 选中状态 */
const selectState = (n: number, t: number): void => {
  list.value.num = n;
  list.value.total = t;
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
  sea.value.labels = '';
  sea.value.category = '';
  sea.value.num1 = '';
  sea.value.num2 = '';
  sea.value.cost_price1 = '';
  sea.value.cost_price2 = '';
  sea.value.supply_price1 = '';
  sea.value.supply_price2 = '';
  sea.value.sale_price1 = '';
  sea.value.sale_price2 = '';
  sea.value.purchase_price1 = '';
  sea.value.purchase_price2 = '';
  sea.value.supplier_price1 = '';
  sea.value.supplier_price2 = '';
  sea.value.market_price1 = '';
  sea.value.market_price2 = '';
  sea.value.weight1 = '';
  sea.value.weight2 = '';
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
  save.value.data.type = type;
  if(type==='edit'){
    save.value.title = langs.edit + '( ' + data.sku_id + ' )';
    save.value.data.ids = [data.id];
  } else if(type==='edits'){
    // ID
    const data: Array<any> = tableList.value.getData();
    let ids: Array<number> = [];
    let sku: Array<number> = [];
    for(let v of data){
      ids.push(v.id);
      sku.push(v.sku_id);
    }
    // 默认值
    save.value.title = langs.edits;
    save.value.data.ids = ids;
    save.value.data.sku_id = sku.join(',');
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

/* 导出 */
const exportData = (num: number): void => {
  exp.value.show = true;
  exp.value.num = num;
}
/* 导出-回调 */
const exportSubmit = (val: boolean): void => {
  if(!val) return;
  exp.value.show = false;
  clearSelect();
}

/* 导入 */
const importData = (): void => {
  imp.value.show = true;
  imp.value.title = '商品资料';
}
/* 导入-回调 */
const importSubmit = (val: boolean): void => {
  if(!val) return;
  loadData();
}

/* 汇率换算 */
const exchangeData = (): void => {
  exc.value.show = true;
}
/* 汇率换算-回调 */
const exchangeSubmit = (val: boolean): void => {
  if(!val) return;
  exc.value.show = false;
  loadData();
}

/* 商品图片 */
const goodsView = (img: string): void => {
  let data: any = [];
  let i: number = 0;
  for(let v of list.value.data){
    if(!v.img) continue;
    if(v.img===img) imgView.value.index = i;
    data.push({label: v.sku_id, value: v.img, other: { '颜色及规格': v.properties_value, '标签价': v.sale_price + '元', '吊牌价': v.market_price + 'W' } });
    i++;
  }
  imgView.value.show = true;
  imgView.value.imgs = data;
}

/* 复制 */
const Copy = (name: string, val: string): void => {
  const data: any = tableList.value.getData();
  let sku_id: string = '';
  for(let i in data){
    sku_id += data[i][name] + ' ';
  }
  if(sku_id) Util.CopyText(sku_id);
  else Util.CopyText(val);
}

/* 选项 */
const getSelect = (): void => {
  Request.Post('erp_goods_info/get_select?lang=' + state.lang, {
    token: state.token,
  }, (res: any) => {
    const {code, msg, data}: any = res.data;
    if(code===0){
      selectAll.value.labels = data.labels;
      selectAll.value.category = data.category;
      // 加载
      isLoad.value = true;
    } else Ui.Toast(msg);
  });
}

</script>