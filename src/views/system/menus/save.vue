<template>
  <wm-dialog v-model:show="infoShow" :title="title" width="720px" bottom="40px" :overflow="tabIndex=='action'||tabIndex=='langs'?'hidden auto':'hidden'" @close="close()">
    <wm-main>
      <wm-tabs v-model:value="tabIndex" :columns="tabs">
        <!-- 基本信息 -->
        <template #base>
          <wm-table-form>
            <tr>
              <td class="label">{{ langs.status }}</td>
              <td colspan="3">
                <wm-switch v-model:value="form.status"></wm-switch>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.sys_menus_fid }}</td>
              <td colspan="3">
                <wm-cascader v-model:value="form.fid" :options="menusAll" clearable></wm-cascader>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.sys_menus_title }}</td>
              <td>
                <wm-input v-model:value="form.title" maxlength="16"></wm-input>
              </td>
              <td class="label">{{ langs.sys_menus_en }}</td>
              <td>
                <wm-input v-model:value="form.en" maxlength="16"></wm-input>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.sys_menus_url }}</td>
              <td colspan="3">
                <wm-input v-model:value="form.url" maxlength="32"></wm-input>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.sys_menus_controller }}</td>
              <td colspan="3">
                <wm-input v-model:value="form.controller" maxlength="32"></wm-input>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.sys_menus_ico }}</td>
              <td>
                <wm-input v-model:value="form.ico" maxlength="32"></wm-input>
              </td>
              <td class="label">{{ langs.sys_menus_sort }}</td>
              <td>
                <wm-input v-model:value="form.sort" :placeholder="langs.sys_menus_sort_placeholder" maxlength="32"></wm-input>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.remark }}</td>
              <td colspan="3">
                <wm-input v-model:value="form.remark" type="textarea" :height="'80px'" maxlength="32"></wm-input>
              </td>
            </tr>
          </wm-table-form>
        </template>
        <!-- 基本信息 End -->
        <!-- 动作菜单 -->
        <template #action>
          <wm-table-form>
            <tr class="title">
              <td>{{ langs.name }}</td>
              <td>{{ langs.action }}</td>
              <td>{{ langs.sys_menus_perm }}</td>
              <td class="action">
                <wm-button effect="text" type="primary" @click="actionAdd()">{{ langs.add }}</wm-button>
              </td>
            </tr>
            <tr v-for="(v,k) in form.action" :key="k">
              <td>
                <wm-input v-model:value="v.name" maxlength="32"></wm-input>
              </td>
              <td>
                <wm-input v-model:value="v.action" maxlength="32"></wm-input>
              </td>
              <td>
                <wm-input v-model:value="v.perm" maxlength="32"></wm-input>
              </td>
              <td class="action">
                <wm-button effect="text" type="danger" @click="actionRemove(k)">{{ langs.remove }}</wm-button>
              </td>
            </tr>
          </wm-table-form>
        </template>
        <!-- 动作菜单 End -->
        <!-- 语言包 -->
        <template #langs>
          <wm-table-form>
            <tr>
              <td class="label">{{ langs.sys_menus_en_us }}</td>
              <td>
                <wm-input v-model:value="form.en_US" maxlength="32"></wm-input>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.sys_menus_zh_cn }}</td>
              <td>
                <wm-input v-model:value="form.zh_CN" maxlength="32"></wm-input>
              </td>
            </tr>
          </wm-table-form>
        </template>
        <!-- 语言包 End -->
      </wm-tabs>
    </wm-main>
    <template #bottom>
      <wm-button height="40px" padding="0 32px" @click="submit()">{{ langs.confirm }}</wm-button>
    </template>
  </wm-dialog>
</template>

<style lang="less" scoped>
.wm-table_form .label{width: 70px;}
.wm-table_form .action{width: 60px; text-align: center;}
</style>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../../library/ui'
import Request from '../../../library/request'
/* 组件 */
import wmMain from '../../../components/container/main.vue'
import wmDialog from '../../../components/dialog/index.vue'
import wmInput from '../../../components/form/input/index.vue'
import wmButton from '../../../components/form/button/index.vue'
import wmSwitch from '../../../components/form/switch/index.vue'
import wmCascader from '../../../components/form/cascader/index.vue'
import wmTableForm from '../../../components/table/form.vue'
import wmTabs from '../../../components/tabs/index.vue'

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},        // 是否显示
  title: {type: String, default: ''},           // 标题
  data: {type: Object, default: []},            // 数据
});
const emit = defineEmits(['update:show', 'submit']);
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
// 变量
const infoShow = ref(false);
// Tabs
const tabIndex = ref('base');
const tabs = ref([
  {label: langs.info, value: 'base', slot: 'base'},
  {label: langs.action, value: 'action', slot: 'action'},
  {label: langs.sys_menus_lang, value: 'langs', slot: 'langs'},
]);
// 数据
const form = ref({
  id: 0, fid: <any>[], status: true, title: '', en: '', ico: '', sort: '0', url: '', controller: '', remark:'', action:<any>[],
  en_US: '', zh_CN: '',
});
// 全部分类
const fid = ref(<any>[]);
const menusAll = ref(<any>[]);

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
  if(val){
    // 默认值
    form.value.id = props.data.id || 0;
    form.value.status = typeof props.data.status!='undefined'?props.data.status:true;
    form.value.title = props.data.title || '';
    form.value.en = props.data.en || '';
    form.value.ico = props.data.ico || '';
    form.value.sort = props.data.sort || '0';
    form.value.url = props.data.url || '';
    form.value.controller = props.data.controller || '';
    form.value.remark = props.data.remark || '';
    form.value.action = props.data.action || [];
    form.value.en_US = props.data.en_US || '';
    form.value.zh_CN = props.data.zh_CN || '';
    // Fid
    if(typeof props.data.fid != 'undefined') getFid(props.data.fid);
    else form.value.fid = [];
  }
},{ deep: true });

/* 创建完成 */
onMounted(()=>{
  if(state.token) getMenus();
});


/* 获取Fid */
const getFid = (fid: number): void => {
  // 一级
  for(let v1 of menusAll.value) {
    if(v1.value==fid) { form.value.fid = [v1.value]; break; }
    if(!v1.children) continue;
    // 二级
    for(let v2 of v1.children) {
      if(v2.value==fid) { form.value.fid = [v1.value, v2.value]; break; }
      if(!v2.children) continue;
      // 三级
      for(let v3 of v2.children) {
        if(v3.value==fid) { form.value.fid = [v1.value, v2.value, v3.value]; break; }
        if(!v3.children) continue;
        // 四级
        for(let v4 of v3.children) {
          if(v4.value==fid) { form.value.fid = [v1.value, v2.value, v3.value, v4.value]; break; }
        }
      }
    }
  }
}

/* 动作菜单-添加 */
const actionAdd = (): void => {
  const action: Array<any> = form.value.action;
  if(action.length>0) action.push({name:'', action:'', perm:action[action.length-1].perm*2});
  else form.value.action = [{name:'', action:'', perm:1}];
}
/* 动作菜单-移除 */
const actionRemove = (k: number): void => {
  const action: Array<any> = form.value.action;
    action.splice(k, 1);
}

/* 验证 */
const verify = (form: any): any => {
  if(form.title.length<2 || form.title.length>32) return Ui.Toast(langs.sys_menus_verify_title);
  return form;
}

/* 提交 */
const submit = (): void => {
  // 验证
  const data = verify(form.value);
  if(!data) return;
  // 请求
  const load: any = Ui.Loading();
  Request.Post('sys_menus/save?lang='+state.lang, {
    token: state.token,
    data: data,
  }, (res:any)=>{
    load.clear();
    const d: any = res.data;
    Ui.Toast(d.msg);
    if(d.code==0) getMenus();
    emit('submit', d.code==0);
  });
}

/* 全部菜单 */
const getMenus = (): void => {
  Request.Post('sys_menus/get_menus_all?lang='+state.lang, {
    token: state.token,
  }, (res:any)=>{
    const d: any = res.data;
    if(d.code==0) menusAll.value = d.data;
    else Ui.Toast(d.msg);
  });
}

/* 关闭 */
const close = (): void => {
  emit('update:show', false);
}

</script>