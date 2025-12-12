<template>
  <!-- Total -->
  <wmTotal :time="total.time" @refresh="loadData()">
    <span v-html="langs.sys_role_total(page.total)"></span>
  </wmTotal>
  <!-- Action -->
  <div class="app_action flex">
    <div class="app_action_tools scrollbar">
      <wmAction :columns="[
        {action: 'save', slot: 'add', is_action: true},
        {action: 'del', slot: 'del', is_action: true},
        {action: 'line', slot: 'line1'},
        {action: 'export', slot: 'export', is_action: true},
      ]">
        <template #add>
          <wmButton effect="dark" type="primary" icon="ui ui_add" padding="0 16px 0 8px" @click="saveData('add')">{{ langs.add }}</wmButton>
        </template>
        <template #del>
          <wmButton effect="plain" type="danger" icon="ui ui_del" padding="0 16px 0 8px" :disabled="list.num==0" @click="delData()">{{ langs.del }}({{ list.num }})</wmButton>
        </template>
        <template #line1>
          <span class="line">|</span>
        </template>
        <template #export>
          <wmButton effect="plain" icon="ui ui_export" padding="0 16px 0 8px" :disabled="!page.total" @click="exportData(page.total)">{{ langs.export }}({{ page.total }})</wmButton>
        </template>
      </wmAction>
    </div>
    <div class="app_action_search flex">
      <!-- Search -->
      <wmSearch v-model:show="sea.show" v-model:keys="sea.key" :columns="sea.columns" @keyup.enter="page.num=1;loadData()" @search="page.num=1;loadData()" @reset="resetData()">
        <template #city="d">
          <wmSelect v-model:value="sea.city" :options="selectAll.city_name" :placeholder="d.label" clearable multiple></wmSelect>
        </template>
        <template #class="d">
          <wmSelect v-model:value="sea.class" :options="selectAll.class_name" :placeholder="d.label" clearable multiple></wmSelect>
        </template>
        <template #fid="d">
          <wmSelect v-model:value="sea.fid" :options="selectAll.org_name" :placeholder="d.label" clearable multiple></wmSelect>
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
          <wmTag :title="'创建: '+d.ctime+'\n更新: '+d.utime">{{ d.utime.substr(0, 10) }}</wmTag>
        </div>
      </template>
      <template #city="d">
        <div class="tCenter">{{ d.city }}</div>
      </template>
      <template #class="d">
        <div class="tCenter">{{ d.class || '-' }}</div>
      </template>
      <template #shop_id="d">
        <div class="tCenter"><b>{{ d.shop_id }}</b></div>
      </template>
      <template #fid="d">
        <div class="tCenter">{{ d.org_name || '-' }}</div>
      </template>
      <template #sort="d">
        <div class="tCenter">{{ d.sort }}</div>
      </template>
      <template #status="d">
        <div class="tCenter">
          <span :class="d.status?'c_success':'c_danger'">{{ d.status?langs.enable:langs.disable }}</span>
        </div>
      </template>
      <template #action="d">
        <div class="tCenter">
          <wmButton v-if="isAction('save')" @click="saveData('edit', d)">{{ langs.edit }}</wmButton>
          <span v-else>-</span>
        </div>
      </template>
      <template #creator_name="d">
        <div class="tCenter">{{ d.creator_name }}</div>
      </template>
      <template #operator_name="d">
        <div class="tCenter">{{ d.operator_name }}</div>
      </template>
    </wmTable>
    <!-- List End -->
  </div>
  <!-- Page -->
  <div class="app_page">
    <wmPage v-model:total="page.total" v-model:page="page.num" @update:page="loadData()" v-model:limit="page.limit" @update:limit="page.num=1;loadData()"></wmPage>
  </div>
  <!-- Save -->
  <actionSave v-model:show="save.show" :title="save.title" :data="save.data" @submit="saveSubmit($event)"></actionSave>
  <!-- Del -->
  <actionDel v-model:show="del.show" :data="del.data" @submit="delSubmit($event)"></actionDel>
  <!-- Export -->
  <actionExport v-model:show="exp.show" :data="getWhere()" :order="list.order" :num="exp.num" @submit="exportSubmit($event)"></actionExport>
</template>

<style lang="less" scoped>
.table .icon i{display: inline-block; width: 32px; height: 32px; line-height: 32px; text-align: center; font-size: 20px;}
</style>

<script setup lang="ts">
import { ref, onMounted, onActivated, nextTick } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Ui from '../../../library/ui';
import Request from '../../../library/request';
import Permission from '../../../library/permission';
/* 组件 */
import wmButton from '../../../components/form/button/index.vue';
import wmTable from '../../../components/table/index.vue';
import wmTag from '../../../components/tag/index.vue';
import wmPage from '../../../components/page/index.vue';
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
// 搜索
const sea = ref({
  show: false, key: '', placeholder: '名称、备注',
  columns: [
    {label: '城市', value: '', slot: 'city'},
    {label: '分类', value: '', slot: 'class'},
    {label: '事业部', value: '', slot: 'fid'},
    {label: '状态', value: '', slot: 'status'},
    {label: langs.name, value: '', name: 'name'},
    {label: '制单员', value: '', name: 'creator_name'},
    {label: '操作员', value: '', name: 'operator_name'},
    {label: langs.remark, value: '', name: 'remark'},
  ],
  city: '', class: '', fid: '', status: '',
});
// 列表
const total = ref({time: '', list: {}});
const list = ref({columns: [
  {title: 'ID', index: 'id', slot: 'id', order: '', width: '80px', minWidth: '60px', textAlign: 'center'},
  {title: langs.date, slot: 'date', textAlign: 'center', width: '120px', minWidth: '110px'},
  {title: '城市', index: 'city', slot: 'city', order: '', textAlign: 'center', width: '60px', minWidth: '60px'},
  {title: '分类', slot: 'class', index: 'class', order: '', textAlign: 'center', width: '60px', minWidth: '60px'},
  {title: '店铺ID', slot: 'shop_id', index: 'shop_id', order: '', width: '100px', minWidth: '100px'},
  {title: langs.name, index: 'name', order: '', width: '120px', minWidth: '80px'},
  {title: '所属', index: 'fid', slot: 'fid', order: '', textAlign: 'center', width: '80px', minWidth: '60px'},
  {title: '排序', slot: 'sort', textAlign: 'center', width: '60px', minWidth: '60px'},
  {title: langs.status, index: 'status', slot: 'status', width: '60px', textAlign: 'center'},
  {title: langs.action, slot: 'action', textAlign: 'center', width: '90px'},
  {title: '制单员', slot: 'creator_name', textAlign: 'center', width: '90px'},
  {title: '操作员', slot: 'operator_name', textAlign: 'center', width: '90px'},
  {title: langs.remark, index: 'remark'},
], data: [], num: 0, total: 0, order: ''});
const page = ref({total: 0, num: 1, limit: 100});
// 动作
const save = ref({show: false, title: '添加/编辑', data: {}});
const del = ref({show: false, title: '删除', data: <any>[]});
const exp = ref({show: false, title: '导出', num: 0});
// 全部分类
const selectAll = ref({city_name: <any>[], class_name: <any>[], org_name: <any>[], status_name: <any>[]});

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
  Request.Post('erp_base_shop/list?lang=' + state.lang, {
    token: state.token,
    data: getWhere(),
    page: page.value.num,
    limit: page.value.limit,
    order: list.value.order,
  }, (res: any) => {
    load.clear();
    const { code, msg, time, data }: any = res.data;
    if(code===0){
      total.value.time = time;
      list.value.data = data;
      clearSelect();
    } else Ui.Toast(msg);
  });
  // 统计
  page.value.total = 0;
  Request.Post('erp_base_shop/total?lang=' + state.lang, {
    token: state.token,
    data: getWhere(),
  }, (res: any) => {
    const { code, msg, time, data }: any = res.data;
    if(code===0){
      total.value.time = time;
      page.value.total = data.total;
    } else Ui.Toast(msg);
  });
}
/* 搜索条件 */
const getWhere = (): object => {
  const data: any = {
    key: sea.value.key,
    city: sea.value.city,
    class: sea.value.class,
    fid: sea.value.fid,
    status: sea.value.status,
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
  // 条件
  sea.value.key = '';
  sea.value.city = '';
  sea.value.class = '';
  sea.value.fid = '';
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

/* 添加&编辑 */
const saveData = (type: string, data: any = {}): void => {
  save.value.show = true;
  save.value.data = data;
  if(type==='add'){
    save.value.title = langs.add;
  } else if(type==='edit'){
    save.value.title = langs.edit + '( ' + data.name + ' )';
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

/* 选项 */
const getSelect = (): void => {
  Request.Post('erp_base_shop/get_select?lang=' + state.lang, {
    token: state.token,
  }, (res: any) => {
    const { code, msg, data }: any = res.data;
    if(code===0){
      selectAll.value.city_name = data.city_name;
      selectAll.value.class_name = data.class_name;
      selectAll.value.org_name = data.org_name;
      selectAll.value.status_name = data.status_name;
      // 加载
      isLoad.value = true;
    } else Ui.Toast(msg);
  });
}

</script>