<template>
  <wmDialog v-model:show="infoShow" :title="title || langs.rename" width="420px" bottom="40px" @close="close()">
    <wmMain lineHeight="60px">
      <wmTableForm>
        <tr>
          <td class="label">{{ langs.name }}</td>
          <td>
            <wmInput v-model:value="data.name" maxlength="32"></wmInput>
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
</style>

<script setup lang="ts">
import { ref, watch, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../../library/ui';
import Request from '../../../library/request';
/* 组件 */
import wmMain from '../../../components/container/main.vue';
import wmDialog from '../../../components/dialog/index.vue';
import wmButton from '../../../components/form/button/index.vue';
import wmTableForm from '../../../components/table/form.vue';
import wmInput from '../../../components/form/input/index.vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},          // 是否显示
  title: {type: String, default: ''},             // 标题
  data: {type: Object, default: {}},              // 数据
});
const { proxy } = getCurrentInstance() as any ;
const emit = defineEmits(['update:show', 'submit']);
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
// 变量
const infoShow = ref(false);

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
},{ deep: true });

/* 验证 */
const verify = (form: any): any => {
  if(form.name.length<2 || form.name.length>32) return Ui.Toast(langs.sys_file_verify_name);
  if((proxy.$parent as any).isExist(form.name)) return Ui.Toast(langs.sys_file_verify_name_exist);
  return form;
}

/* 提交 */
const submit = (): void =>{
  // 验证
  const form = verify(props.data);
  if(!form) return;
  // 请求
  const load: any = Ui.Loading();
  Request.Post('sys_file/rename?lang='+state.lang, {
    token: state.token,
    path: form.path,
    rename: form.rename,
    name: form.name,
  }, (res:any)=>{
    load.clear();
    const {code}: any = res.data;
    // 事件
    emit('submit', code==0);
  });
}

/* 关闭 */
const close = (): void => {
  emit('update:show', false);
}

</script>