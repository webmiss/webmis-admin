<template>
  <!-- Total -->
  <wmTotal :time="total.time" @refresh="loadData()">
    数量 <b>{{ total.list.num }}</b>
  </wmTotal>
  <!-- Action -->
  <div class="app_action flex">
    <div class="app_action_tools scrollbar">
      <wmAction :columns="[
        {action: 'save', slot: 'add', is_action: true},
        {action: 'del', slot: 'del', is_action: true},
        {action: 'line', slot: 'line'},
        {action: 'export', slot: 'export', is_action: true},
      ]">
        <template #add>
          <wmButton effect="dark" type="primary" icon="ui ui_add" padding="0 16px 0 8px" @click="saveData('add')">{{ langs.add }}</wmButton>
        </template>
        <template #del>
          <wmButton effect="plain" type="danger" icon="ui ui_del" padding="0 16px 0 8px" :disabled="list.num==0" @click="delData()">{{ langs.del }}({{ list.num }})</wmButton>
        </template>
        <template #line>
          <span class="line">|</span>
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
        <template #city="d">
          <wmSelect v-model:value="sea.city" :options="selectAll.city_name" :placeholder="d.label" clearable multiple></wmSelect>
        </template>
        <template #status="d">
          <wmSelect v-model:value="sea.status" :options="selectAll.status_name" :placeholder="d.label" clearable></wmSelect>
        </template>
        <template #istrue="d">
          <wmSelect v-model:value="sea.istrue" :options="selectAll.pay_info" :placeholder="d.label" clearable></wmSelect>
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
          <wmTag :title="'创建: '+d.ctime+'\n更新: '+d.utime+'\n操作员: '+d.operator_name">{{ d.utime.substr(0, 10) }}</wmTag>
        </div>
      </template>
      <template #status="d">
        <div class="tCenter">
          <span class="c_primary" v-if="d.status">正常</span>
          <span class="c_danger" v-else>禁用</span>
        </div>
      </template>
      <template #action="d">
        <div class="tCenter">
          <wmButton v-if="isAction('save')" @click="saveData('edit', d)">{{ langs.edit }}</wmButton>
          <span v-else>-</span>
        </div>
      </template>
      <template #city="d">
        <div class="tCenter">{{ d.city }}</div>
      </template>
      <template #tel="d">
        <div>{{ telEncode(d.tel) }}</div>
      </template>
      <template #acountnumber="d">
        <div>{{ cardEncode(d.acountnumber) }}</div>
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
  <actionExport v-model:show="exp.show" :data="getWhere()" :order="list.order" :num="exp.num" @submit="exportSubmit($event)"></actionExport>
</template>

<style lang="less" scoped>
</style>

<script setup lang="ts">
import { ref, onMounted, onActivated, nextTick } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Ui from '../../../library/ui';
import Request from '../../../library/request';
import Permission from '../../../library/permission';
import Time from '../../../library/time';
import Util from "../../../library/utils";
import Format from '../../../library/format';
/* 组件 */
import wmButton from '../../../components/form/button/index.vue';
import wmTable from '../../../components/table/index.vue';
import wmTag from '../../../components/tag/index.vue';
import wmPage from '../../../components/page/index.vue';
import wmDatePicker from '../../../components/datepicker/index.vue';
import wmSelect from '../../../components/form/select/index.vue';
/* 统计、动作、搜索、更新、删除、导出 */
import wmTotal from '../../tools/Total.vue';
import wmAction from '../../tools/Action.vue';
import wmSearch from '../../tools/Search.vue';
import actionSave from './save.vue';
import actionDel from './del.vue';
import actionExport from './export.vue';

// 是否加载
const isLoad = ref(false);
const tableList = ref();
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
const isAction = Permission.isAction;
const telEncode = Format.telEncode;
const cardEncode = Format.cardEncode;
// 搜索
const sea = ref({
  show: false, key: '', placeholder: '姓名、电话、收款信息',
  time: <any>[Time.Date('Y/m/d', Time.StrToTime('-3 year')), Time.Date('Y/m/d')], maxDate: Time.Date('Y/m/d'),
  customTime: {active:'', list:[
    { label: '今天', value: 'today' },
    { label: '昨天', value: 'yesterday' },
    { label: '3个月', value: 'month' },
    { label: '近1年', value: 'year' },
  ]},
  columns: [
    { label: '', value: '', slot: 'customTime' },
    { label: langs.select, value: '', slot: 'time' },
    { label: '区域', value: '', slot: 'city' },
    { label: '状态', value: '', slot: 'status' },
    { label: '收款信息', value: '', slot: 'istrue' },
    { label: '供应商ID, 多条空格分离', value: '', name: 'supplier_id' },
    { label: '供应商名称', value: '', name: 'name' },
    { label: '手机号码', value: '', name: 'tel' },
    { label: '开户银行', value: '', name: 'depositbank' },
    { label: '账户名称', value: '', name: 'bankacount' },
    { label: '银行卡号', value: '', name: 'acountnumber' },
    { label: '支付宝姓名', value: '', name: 'alipay_name' },
    { label: '支付宝账号', value: '', name: 'alipay_id' },
    { label: '备注', value: '', name: 'remark' },
  ],
  city: '', status: '', istrue: '',
});
// 列表
const total = ref({ time: '', list: { num: 0 } });
const list = ref({ columns: [
  { title: 'ID', slot: 'id', width: '100px', textAlign: 'center' },
  { title: langs.date, index: 'date', slot: 'date', width: '90px', textAlign: 'center' },
  { title: '供应商ID', index: 'supplier_id', order: '', width: '80px' },
  { title: '供应商名称', index: 'name', order: '', width: '120px' },
  { title: langs.status, slot: 'status', textAlign: 'center', width: '60px', minWidth: '60px' },
  { title: langs.action, slot: 'action', textAlign: 'center', width: '60px', minWidth: '60px' },
  { title: '手机号码', index: 'tel', slot: 'tel' },
  { title: '区域', slot: 'city', textAlign: 'center', width: '60px' },
  { title: '开户银行', index: 'depositbank' },
  { title: '账户名称', index: 'bankacount' },
  { title: '银行卡号', index: 'acountnumber', slot: 'acountnumber' },
  { title: '支付宝姓名', index: 'alipay_name' },
  { title: '支付宝账号', index: 'alipay_id' },
  { title: '备注', index: 'remark' },
], data: [], num: 0, total: 0, order: '' });
const page = ref({ total: 0, num: 1, limit: 100 });
// 添加&编辑、删除、导出
const save = ref({ show: false, title: '添加/编辑', data: <any>{} });
const del = ref({ show: false, title: '删除', data: <any>[] });
const exp = ref({ show: false, title: '导出', num: 0 });
// 全部分类
const selectAll = ref({ city_name: [], status_name: [], pay_info: [{ label: '有', value: '1' }, { label: '无', value: '2' }] });

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
  Request.Post('erp_base_supplier/list?lang=' + state.lang, {
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
  Request.Post('erp_base_supplier/total?lang=' + state.lang, {
    token: state.token,
    data: getWhere(),
  }, (res: any) => {
    const {code, msg, data, time}: any = res.data;
    if(code===0){
      total.value.time = time;
      page.value.total = data.total;
      total.value.list.num = data.total;
    } else Ui.Toast(msg);
  });
}
/* 搜索条件 */
const getWhere = (): object => {
  const data: any = {
    key: sea.value.key,
    stime: typeof sea.value.time[0]==='string'?sea.value.time[0]:Time.Date('Y/m/d', sea.value.time[0]),
    etime: typeof sea.value.time[1]==='string'?sea.value.time[1]:Time.Date('Y/m/d', sea.value.time[1]),
    city: sea.value.city,
    status: sea.value.status,
    istrue: sea.value.istrue,
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
  sea.value.time = [Time.Date('Y/m/d', Time.StrToTime('-3 year')), Time.Date('Y/m/d')];
  sea.value.customTime.active = '';
  // 条件
  sea.value.key = '';
  sea.value.city = '';
  sea.value.status = '';
  sea.value.istrue = '';
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

/* 添加&编辑 */
const saveData = (type: string, data: any = {}): void => {
  save.value.show = true;
  save.value.data = data;
  save.value.data.type = type;
  if(type==='add'){
    save.value.title = langs.add;
  } else if(type==='edit'){
    save.value.title = langs.edit + '( ' + data.id + ' )';
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

/* 复制 */
const Copy = (name: string, val: string) => {
  const data: any = tableList.value.getData();
  let sku_id: string = '';
  for(let i in data) sku_id += data[i][name] + ' ';
  if(sku_id) Util.CopyText(sku_id);
  else Util.CopyText(val);
}

/* 选项 */
const getSelect = (): void => {
  Request.Post('erp_base_supplier/get_select?lang=' + state.lang, {
    token: state.token,
  }, (res: any) => {
    const {code, msg, data}: any = res.data;
    if(code===0){
      selectAll.value.city_name = data.city_name;
      selectAll.value.status_name = data.status_name;
      // 加载
      isLoad.value = true;
    } else Ui.Toast(msg);
  });
}

</script>