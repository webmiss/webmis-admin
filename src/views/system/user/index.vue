<template>
  <!-- Total -->
  <wmTotal :time="total.time" @refresh="loadData()">
    <span v-html="langs.sys_user_total(page.total)"></span>
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
      <wmSearch v-model:show="sea.show" v-model:keys="sea.key" :columns="sea.columns" @keyup.enter="page.num=1;loadData()" @search="page.num=1;loadData()" @reset="resetData()">
        <template #time="d">
          <wmDatePicker v-model:value="sea.time" range :maxDate="sea.maxDate" :placeholder="d.label"></wmDatePicker>
        </template>
        <template #type="d">
          <!-- <wmSelect v-model:value="sea.type" :options="selectAll.type_name" :placeholder="d.label" clearable></wmSelect> -->
           {{ selectAll.type_name || '123' }}
        </template>
        <template #role="d">
          <wmSelect v-model:value="sea.role" :options="selectAll.role_name" :placeholder="d.label" clearable></wmSelect>
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
          <wmTag :title="'注册: '+d.rtime+'\n更新: '+d.utime+'\n登录: '+d.ltime+'\n备注: '+d.remark">{{ d.ltime.substr(0, 10) }}</wmTag>
        </div>
      </template>
      <template #type="d">
        <div class="tCenter">{{ d.type_name || '-' }}</div>
      </template>
      <template #img="d">
        <div class="flex_center">
          <wmImg v-model:img="d.img"></wmImg>
        </div>
      </template>
      <template #uname="d">
        {{ d.uname || d.tel || d.email }}
      </template>
      <template #status="d">
        <div class="tCenter">
          <span :class="d.status?'c_success':'c_danger'">{{ d.status?langs.enable:langs.disable }}</span>
        </div>
      </template>
      <template #action="d">
        <div class="tCenter">
          <wmButton v-if="isAction('save')" @click="saveData('copy', d)">{{ langs.copy }}</wmButton>
          <span v-else>-</span>
        </div>
      </template>
      <template #perm="d">
        <div class="tCenter" v-if="isAction('save')">
          <wmButton v-if="d.perm" effect="text" type="danger" padding="0 8px" @click="saveData('edit', d)">私有</wmButton>
          <wmButton v-else-if="d.role" effect="text" type="primary" padding="0 8px" @click="saveData('edit', d)">{{ d.role_name }}</wmButton>
          <wmButton v-else effect="text" type="info" padding="0 8px" @click="saveData('edit', d)">设置</wmButton>
        </div>
        <div class="tCenter" v-else>-</div>
      </template>
      <template #gender="d">
        <div class="tCenter">{{ d.gender || '-' }}</div>
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
import Time from '../../../library/time';
/* 组件 */
import wmButton from '../../../components/form/button/index.vue';
import wmTable from '../../../components/table/index.vue';
import wmTag from '../../../components/tag/index.vue';
import wmPage from '../../../components/page/index.vue';
import wmDatePicker from '../../../components/datepicker/index.vue';
import wmSelect from '../../../components/form/select/index.vue';
import wmImg from '../../../components/image/index.vue';
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
  show: false, key: '', placeholder:'Fid、名称、接口等',
  time: <any>[Time.Date('Y/m/d', Time.StrToTime('-1 year')), Time.Date('Y/m/d')], maxDate: Time.Date('Y/m/d'),
  columns:[
    {label: langs.select, value: '', slot: 'time'},
    {label: langs.sys_user_type, value: '', slot: 'type'},
    {label: langs.sys_user_role, value: '', slot: 'role'},
    {label: langs.status, value: '', slot: 'status'},
    {label: langs.sys_user_uname, value: '', name: 'uname'},
    {label: langs.sys_user_nickname, value: '', name: 'nickname'},
    {label: langs.sys_user_department, value: '', name: 'department'},
    {label: langs.sys_user_position, value: '', name: 'position'},
    {label: langs.sys_user_name, value: '', name: 'name'},
    {label: langs.remark, value: '', name: 'remark'},
  ],
  type: '', role: '', status: '',
});
// 列表
const total = ref({time: '', list: {}});
const list = ref({columns: [
  {title: 'UID', index: 'id', slot: 'id', order: '', width: '80px', minWidth: '60px', textAlign: 'center'},
  {title: langs.date, index: 'date', slot: 'date', width: '120px', minWidth: '110px', textAlign: 'center'},
  {title: langs.sys_user_type, index: 'type', slot: 'type', order: '', width: '80px', minWidth: '80px', textAlign: 'center'},
  {title: langs.sys_user_image, index: 'img', slot: 'img', width: '60px', minWidth: '60px', textAlign: 'center'},
  {title: langs.sys_user_uname, index: 'uname', slot: 'uname', order: '', width: '120px'},
  {title: langs.status, index: 'status', slot: 'status', width: '60px', textAlign: 'center'},
  {title: langs.action, index: 'action', slot: 'action', width: '60px', textAlign: 'center'},
  {title: langs.sys_user_perm, index: 'perm', slot: 'perm', width: '120px', textAlign: 'center'},
  {title: langs.sys_user_nickname, index: 'nickname'},
  {title: langs.sys_user_department, index: 'department'},
  {title: langs.sys_user_position, index: 'position'},
  {title: langs.sys_user_name, index: 'name'},
  {title: langs.sys_user_gender, index: 'gender', slot: 'gender', textAlign: 'center'},
  {title: langs.sys_user_birthday, index: 'birthday'},
  {title: langs.remark, index: 'remark'},
], data: [], num: 0, total: 0, order: ''});
const page = ref({total: 0, num:1, limit: 100});
// 添加&编辑、删除、导出
const save = ref({show: false, title: '添加/编辑', type: '', data: {}});
const del = ref({show: false, title: '删除', data: <any>[]});
const exp = ref({show: false, title: '导出', num: 0});
// 全部分类
const selectAll = ref({type_name: <any>[], role_name: <any>[], status_name: <any>[]});

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
  Request.Post('sys_user/list?lang=' + state.lang, {
    token: state.token,
    data: getWhere(),
    page: page.value.num,
    limit: page.value.limit,
    order: list.value.order,
  }, (res: any) => {
    load.clear();
    const {code, msg, time, data}: any = res.data;
    if (code === 0) {
      total.value.time = time;
      list.value.data = data;
      clearSelect();
    } else Ui.Toast(msg);
  });
  // 统计
  page.value.total = 0;
  Request.Post('sys_user/total?lang='+state.lang, {
    token: state.token,
    data: getWhere(),
  }, (res:any)=>{
    const {code, msg, time, data}: any = res.data;
    if(code==0) {
      total.value.time = time;
      page.value.total = data.total;
    } else Ui.Toast(msg);
  });
}
/* 搜索条件 */
const getWhere = (): object => {
  const data: any = {
    key: sea.value.key,
    stime: typeof sea.value.time[0]=='string'?sea.value.time[0]:Time.Date('Y/m/d', sea.value.time[0]),
    etime: typeof sea.value.time[1]=='string'?sea.value.time[1]:Time.Date('Y/m/d', sea.value.time[1]),
    type: sea.value.type,
    role: sea.value.role,
    status: sea.value.status,
  };
  for(let v of sea.value.columns) if(v.name) data[v.name] = v.value;
  return data;
}
/* 选中状态 */
const selectState = (n:number, t:number): void => {
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
  // 条件
  sea.value.key = '';
  sea.value.type = '';
  sea.value.role = '';
  sea.value.status = '';
  for(let v of sea.value.columns) v.value='';
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

/* 添加&编辑 */
const saveData = (type: string, data?: any): void => {
  save.value.show = true;
  save.value.type = type;
  if(type=='add') {
    save.value.title = langs.add;
    save.value.data = {};
  } else if(type=='edit') {
    save.value.title = langs.edit+'( '+(data.uname || data.tel || data.email || '')+' )';
    save.value.data = data;
  } else if(type=='copy') {
    save.value.title = langs.copy;
    data.id = '';
    data.uname = '';
    data.tel = '';
    data.email = '';
    save.value.data = data;
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
  Request.Post('sys_user/get_select?lang='+state.lang, {
    token: state.token,
  }, (res:any)=>{
    const {code, msg, data}: any = res.data;
    if(code==0) {
      selectAll.value.type_name = data.type_name;
      selectAll.value.role_name = data.role_name;
      selectAll.value.status_name = data.status_name;
      // 加载
      isLoad.value = true;
      loadData();
    } else Ui.Toast(msg);
  });
}

</script>