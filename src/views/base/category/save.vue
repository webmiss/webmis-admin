<template>
  <wmDialog v-model:show="infoShow" :title="title" width="720px" bottom="40px" @close="close()">
    <wmAlert>提示: 请认证填写如下信息</wmAlert>
    <wmMain>
      <wmTableForm>
        <tr>
          <td class="label"><span class="red_dot">{{ langs.status }}</span></td>
          <td colspan="3">
            <wmSwitch v-model:value="form.state"></wmSwitch>
          </td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">{{ langs.name }}</span></td>
          <td>
            <wmInput v-model:value="form.name" maxlength="16"></wmInput>
          </td>
          <td class="label"><span class="red_dot">排序</span></td>
          <td style="width: 30%;">
            <wmInput v-model:value="form.sort" maxlength="4"></wmInput>
          </td>
        </tr>
        <tr>
          <td class="label">{{ langs.remark }}</td>
          <td colspan="3">
            <wmInput v-model:value="form.remark" type="textarea" :height="'160px'" maxlength="32"></wmInput>
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
.wm-table_form .label{width: 70px;}
.wm-table_form .action{width: 60px; text-align: center;}
</style>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../../library/ui';
import Request from '../../../library/request';
/* 组件 */
import wmMain from '../../../components/container/main.vue';
import wmAlert from '../../../components/alert/index.vue';
import wmDialog from '../../../components/dialog/index.vue';
import wmInput from '../../../components/form/input/index.vue';
import wmButton from '../../../components/form/button/index.vue';
import wmSwitch from '../../../components/form/switch/index.vue';
import wmTableForm from '../../../components/table/form.vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},        // 是否显示
  title: {type: String, default: ''},           // 标题
  data: {type: Object, default: {}},            // 数据
});
const emit = defineEmits(['update:show', 'submit']);
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
// 变量
const infoShow = ref(false);
// 数据
const form = ref({id: 0, state: true, name: '', sort:'0', remark: ''});
// 全部分类
const selectAll = ref({city_name: <any>[], class_name: <any>[]});

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
  if(val){
    // 默认值
    form.value.id = props.data.id || 0;
    form.value.state = typeof props.data.state!='undefined'?props.data.state:true;
    form.value.name = props.data.name || '';
    form.value.sort = props.data.sort || '0';
    form.value.remark = props.data.remark || '';
  }
},{ deep: true });

/* 验证 */
const verify = (form: any): any => {
  if(form.name.length<2 || form.name.length>16) return Ui.Toast('名称2～16字符!');
  if(isNaN(form.sort)) return Ui.Toast('请输入排序数字');
  return form;
}

/* 提交 */
const submit = (): void => {
  // 验证
  const data = verify(form.value);
  if(!data) return;
  // 请求
  const load: any = Ui.Loading();
  Request.Post('erp_base_category/save?lang='+state.lang, {
    token: state.token,
    data: data,
  }, (res:any)=>{
    load.clear();
    const {code, msg}: any = res.data;
    Ui.Toast(msg);
    emit('submit', code==0);
  });
}

/* 关闭 */
const close = (): void => {
  emit('update:show', false);
}

</script>