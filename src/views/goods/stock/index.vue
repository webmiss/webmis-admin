<template>
  <!-- Total -->
  <wmTotal :time="total.time" @refresh="loadData()">
    <span v-html="langs.goods_stock_total(total.list.stock)"></span>
  </wmTotal>
  <!-- Action -->
  <div class="app_action flex">
    <div class="app_action_tools scrollbar">
      <wmAction :columns="[
        { action: 'save', slot: 'add', is_action: true },
        { action: 'save', slot: 'edit', is_action: true },
        { action: 'del', slot: 'del', is_action: true },
        { action: 'line', slot: 'line' },
        { action: 'export', slot: 'export', is_action: true },
        { action: 'export', slot: 'export_part', is_action: true },
      ]">
        <template #add>
          <wmButton effect="dark" type="primary" icon="ui ui_add" padding="0 16px 0 8px" @click="saveData('add')">{{ langs.add }}</wmButton>
        </template>
        <template #edit>
          <wmButton effect="plain" type="primary" icon="ui ui_edit" padding="0 16px 0 8px" :disabled="list.num==0" @click="saveData('edits')">{{ langs.edit }}</wmButton>
        </template>
        <template #del>
          <wmButton effect="plain" type="danger" icon="ui ui_del" padding="0 16px 0 8px" :disabled="list.num==0" @click="delData()">{{ langs.del }}({{ list.num }})</wmButton>
        </template>
        <template #line>
          <span class="line" v-if="isAction('save')">|</span>
        </template>
        <template #export>
          <wmButton effect="plain" icon="ui ui_export" padding="0 16px 0 8px" :disabled="!page.total" @click="exportData(page.total)">{{ langs.export }}({{ page.total }})</wmButton>
        </template>
        <template #export_part>
          <wmButton effect="plain" icon="ui ui_export" padding="0 16px 0 8px" :disabled="exp_part.num==0" @click="exportPartData()">导出选择({{ exp_part.num }})</wmButton>
        </template>
      </wmAction>
    </div>
    <div class="app_action_search flex">
      <!-- Search -->
      <wmSearch v-model:show="sea.show" v-model:keys="sea.key" :columns="sea.columns" :placeholder="sea.placeholder" @keyup.enter="page.num=1;loadData()" @search="page.num=1;loadData()" @reset="resetData()">
        <template #customTime="d">
          <ul class="custom_time flex_center">
            <li v-for="v in sea.customTime.list" :key="v.value" @click="setCustomTime(v.value)" :class="{ active: sea.customTime.active===v.value }">{{ v.label }}</li>
          </ul>
        </template>
        <template #time="d">
          <wmDatePicker v-model:value="sea.time" range :maxDate="sea.maxDate" :placeholder="d.label"></wmDatePicker>
        </template>
        <template #category	="d">
          <wmSelect v-model:value="sea.category	" :options="selectAll.category	" :placeholder="d.label" clearable multiple></wmSelect>
        </template>
        <template #wms_co_id="d">
          <wmSelect v-model:value="sea.wms_co_id" :options="selectAll.partner_name" :placeholder="d.label" clearable multiple></wmSelect>
        </template>
        <template #service>
          <wmCheckbox :options="is_service"></wmCheckbox>
        </template>
        <template #num="d">
          <div class="flex">
            <wmInput v-model:value="sea.num1" width="49%" :placeholder="d.label1" />
            <wmInput v-model:value="sea.num2" width="49%" :placeholder="d.label2" />
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
    <wmTable ref="tableList" overflow="auto" :columns="list.columns" :options="list.data" @orderBy="orderBy"
      @partially="selectState">
      <template #id="d">
        <div class="tCenter">{{ d.id }}</div>
      </template>
      <template #date="d">
        <div class="tCenter">
          <wmTag :title="'创建: ' + d.ctime + '\n更新: ' + d.utime">{{ d.utime.substr(0, 10) }}</wmTag>
        </div>
      </template>
      <template #category="d">
        <div class="tCenter">{{ d.category || '-' }}</div>
      </template>
      <template #sku_id="d">
        <div class="copy">{{ d.sku_id }}<span @click="Copy('sku_id', d.sku_id)">复</span></div>
      </template>
      <template #num="d">
        <div class="tCenter">{{ d.num }}</div>
      </template>
      <template #in="d">
        <div class="tCenter" :class="d.in==='进行中'?'c_danger':'c_success'">{{ d.in }}</div>
      </template>
      <template #allocate="d">
        <div class="tCenter" :class="d.allocate==='调拨中'?'c_danger':'c_success'">{{ d.allocate }}</div>
      </template>
      <template #order="d">
        <div class="tCenter" :class="d.order==='进行中'?'c_danger':'c_success'">{{ d.order }}</div>
      </template>
      <template #refund="d">
        <div class="tCenter" :class="d.refund==='进行中'?'c_danger':'c_success'">{{ d.refund }}</div>
      </template>
      <template #out="d">
        <div class="tCenter" :class="d.out==='进行中'?'c_danger':'c_success'">{{ d.out }}</div>
      </template>
      <template #action="d">
        <div class="tCenter">
          <wmButton v-if="isAction('save')" @click="saveData('edit', d)">{{ langs.edit }}</wmButton>
        </div>
      </template>
      <template #view="d">
        <div class="tCenter">
          <wmButton type="primary" effect="text" padding="0 4px" @click="state.goods.show=true; state.goods.sku_id=d.sku_id">{{ langs.flow }}</wmButton>
        </div>
      </template>
      <template #wms_co_id="d">
        <div class="tCenter">
          <wmLabel :options="dayDiff(d.utime)">{{ d.wms_co_id }}</wmLabel>
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
  <actionExport v-model:show="exp.show" :data="getWhere()" :order="list.order" :num="exp.num" @submit="exportSubmit($event)"></actionExport>
  <actionPartExport v-model:show="exp_part.show" :data="exp_part.data" :num="exp_part.num" @submit="exportPartSubmit($event)"></actionPartExport>
</template>

<style lang="less" scoped></style>

<script setup lang="ts">
import { ref, onMounted, onActivated, nextTick } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Ui from '../../../library/ui';
import Request from '../../../library/request';
import Time from '../../../library/time';
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
import wmCheckbox from '../../../components/form/checkbox/index.vue';
import wmLabel from '../../../components/container/label.vue';
/* 统计、动作、搜索、更新、删除、导出 */
import wmTotal from '../../tools/Total.vue';
import wmAction from '../../tools/Action.vue';
import wmSearch from '../../tools/Search.vue';
import actionSave from './save.vue';
import actionDel from './del.vue';
import actionExport from './export.vue';
import actionPartExport from './export_part.vue';

// 是否加载
const isLoad = ref(false);
const tableList = ref();
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
const isAction = Permission.isAction;
// 搜索
const sea = ref({
  show: false, key: '', placeholder: '商品编码',
  time: <any>[Time.Date('Y/m/d', Time.StrToTime('-1 year')), Time.Date('Y/m/d')], maxDate: Time.Date('Y/m/d'),
  customTime: {active:'', list:[
    { label: '近7天', value: 'week' },
    { label: '近30天', value: 'month' },
    { label: '近1年', value: 'year' },
    { label: '近2年', value: 'twoYear' },
  ]},
  columns: [
    { label: '', value: '', slot: 'customTime'},
    { label: langs.select, value: '', slot: 'time' },
    { label: '分类', value: '', slot: 'category' },
    { label: '分仓', value: '', slot: 'wms_co_id' },
    { label: '客服仓', value: '', slot: 'service' },
    { label: '商品编码, 多条空格分离', value: '', name: 'sku_id' },
    { label1: langs.goods_stock_num1, label2: langs.goods_stock_num2, value: '', slot: 'num' },
    { label: '采购员', value: '', name: 'owner' },
  ],
  wms_co_id: '', num1: '', num2: '', category: '', owner: ''
});
// 列表
const total = ref({ time: '', list: { stock: 0 } });
const list = ref({
  columns: [
    { title: 'ID', index: 'id', slot: 'id', width: '100px', textAlign: 'center' },
    { title: langs.date, index: 'date', slot: 'date', width: '90px', textAlign: 'center' },
    { title: '商品分类', index: 'category', order: '', slot: 'category', width: '120px', textAlign: 'center' },
    { title: langs.goods_sku_id, index: 'sku_id', order: '', slot: 'sku_id', width: '150px', textAlign: 'center' },
    { title: '库存', index: 'num', slot: 'num', order: '', textAlign: 'center', width: '60px' },
    { title: '入库', slot: 'in', width: '80px', textAlign: 'center' },
    { title: '调拨', slot: 'allocate', width: '80px', textAlign: 'center' },
    { title: '发货', slot: 'order', width: '80px', textAlign: 'center' },
    { title: '售后', slot: 'refund', width: '80px', textAlign: 'center' },
    { title: '采退', slot: 'out', width: '80px', textAlign: 'center' },
    { title: langs.action, slot: 'action', textAlign: 'center', width: '40px' },
    { title: langs.view, slot: 'view', textAlign: 'center', width: '40px' },
    { title: '仓库ID', slot: 'wms_co_id', width: '120px', minWidth: '120px', textAlign: 'center' },
    { title: '仓库名称', index: 'wms_co_name' },
    { title: '采购员', index: 'owner', order: '' },
  ], data: [], num: 0, total: 0, order: ''
});
const page = ref({ total: 0, num: 1, limit: 100 });
// 添加&编辑、删除、导出
const save = ref({ show: false, title: '添加/编辑', data: <any>{} });
const del = ref({ show: false, title: '删除', data: <any>[] });
const exp = ref({ show: false, title: '导出', num: 0 });
const exp_part = ref({ show: false, title: '导出选择', num: 0, data: <any>[], ids: <any>[] });
const is_service = ref({ label: '全部客服仓', value: 'is_sku', checked: false });
// 全部分类
const selectAll = ref({ category: [], partner_name: [] });

/* 创建完成 */
onMounted(() => {
  if(state.token) getSelect();
});
onActivated(() => {
  if(isLoad && state.isLogin) loadData();
});

/* 加载数据 */
const loadData = (): void => {
  sea.value.show = false;
  // 列表
  list.value.data = [];
  const load: any = Ui.Loading();
  Request.Post('erp_goods_stock/list?lang=' + state.lang, {
    token: state.token,
    data: getWhere(),
    page: page.value.num,
    limit: page.value.limit,
    order: list.value.order,
  }, (res: any) => {
    load.clear();
    const { code, msg, data, time }: any = res.data;
    if(code===0){
      total.value.time = time;
      list.value.data = data;
      clearSelect();
    } else Ui.Toast(msg);
  });
  // 统计
  page.value.total = 0;
  total.value.list.stock = 0;
  Request.Post('erp_goods_stock/total?lang=' + state.lang, {
    token: state.token,
    data: getWhere(),
  }, (res: any) => {
    const { code, msg, data, time }: any = res.data;
    if(code===0){
      total.value.time = time;
      page.value.total = data.total;
      total.value.list.stock = data.stock;
    } else Ui.Toast(msg);
  });
}
/* 搜索条件 */
const getWhere = (): object => {
  const data: any = {
    key: sea.value.key,
    stime: typeof sea.value.time[0]==='string'?sea.value.time[0]:Time.Date('Y/m/d', sea.value.time[0]),
    etime: typeof sea.value.time[1]==='string'?sea.value.time[1]:Time.Date('Y/m/d', sea.value.time[1]),
    wms_co_id: sea.value.wms_co_id,
    num1: sea.value.num1,
    num2: sea.value.num2,
    category: sea.value.category,
    owner: sea.value.owner,
    is_service: is_service.value.checked,
  };
  for(let v of sea.value.columns) if(v.name) data[v.name] = v.value;
  return data;
}
/* 选中状态 */
const selectState = (n: number, t: number): void => {
  list.value.num = n;
  list.value.total = t;
  // 导出部分
  exp_part.value.ids = [];
  exp_part.value.num = n;
  const data: Array<any> = tableList.value.getData();
  for(let v of data){
    exp_part.value.ids.push(v.id);
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
  sea.value.time = [Time.Date('Y/m/d', Time.StrToTime('-1 year')), Time.Date('Y/m/d')];
  sea.value.customTime.active = '';
  // 条件
  sea.value.key = '';
  sea.value.wms_co_id = '';
  sea.value.num1 = '';
  sea.value.num2 = '';
  sea.value.category = '';
  sea.value.owner = '';
  for(let v of sea.value.columns) v.value = '';
  // 其它
  list.value.order = '';
  page.value.num = 1;
  // 加载
  loadData();
}
/* 清除勾选 */
const clearSelect = (): void => {
  nextTick(() => {
    list.value.num = 0;
    tableList.value.checkboxAll(false);
  });
}
/* 自定义时间 */
const setCustomTime = (type: string): void => {
  sea.value.customTime.active = type;
  switch(type){
    case 'week': sea.value.time = [Time.Date('Y/m/d', Time.StrToTime('-6 day')), Time.Date('Y/m/d')]; break;
    case 'month': sea.value.time = [Time.Date('Y/m/d', Time.StrToTime('-1 month')), Time.Date('Y/m/d')]; break;
    case 'year': sea.value.time = [Time.Date('Y/m/d', Time.StrToTime('-1 year')), Time.Date('Y/m/d')]; break;
    case 'twoYear': sea.value.time = [Time.Date('Y/m/d', Time.StrToTime('-2 year')), Time.Date('Y/m/d')]; break;
  }
}

/* 添加&编辑 */
const saveData = (type: string, data: any = {}): void => {
  save.value.show = true;
  save.value.data = { type: type };
  if(type==='add'){
    save.value.title = langs.add;
    save.value.data.wms_co_id = '';
    save.value.data.sku_id = '';
    save.value.data.num = '';
  }else if(type==='edit'){
    save.value.title = langs.edit + '( ' + data.sku_id + ' )';
    save.value.data.ids = [data.id];
    save.value.data.wms_co_id = [parseInt(data.wms_co_id)];
    save.value.data.sku_id = data.sku_id;
    save.value.data.num = data.num;
  }else if(type==='edits'){
    // ID
    const data: Array<any> = tableList.value.getData();
    let ids: Array<number> = [];
    let sku: Array<string> = [];
    let wms: Array<any> = [];
    for(let v of data){
      ids.push(v.id);
      sku.push(v.sku_id);
      wms.push(parseInt(v.wms_co_id));
    }
    // 默认值
    save.value.title = langs.edits;
    save.value.data.ids = ids;
    save.value.data.wms_co_id = wms;
    save.value.data.sku_id = sku.join(' ');
    save.value.data.num = '';
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
/* 导出部分 */
const exportPartData = (): void => {
  exp_part.value.show = true;
  exp_part.value.data = getWhere();
  exp_part.value.data.ids = exp_part.value.ids;
}
/* 导出部分-回调 */
const exportPartSubmit = (val: boolean): void => {
  if(!val) return;
  exp_part.value.show = false;
  clearSelect();
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
  Request.Post('erp_goods_stock/get_select?lang=' + state.lang, {
    token: state.token,
  }, (res: any) => {
    const { code, msg, data }: any = res.data;
    if(code===0){
      selectAll.value.category = data.category;
      selectAll.value.partner_name = data.partner_name;
      // 加载
      isLoad.value = true;
    } else Ui.Toast(msg);
  });
}

</script>
