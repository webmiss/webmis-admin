<template>
  <wmDialog v-model:show="infoShow" :title="title || langs.download" width="420px" bottom="40px" @close="close()">
    <wmMain lineHeight="60px">
      <b>{{ data.filename }}</b>
    </wmMain>
    <template #bottom>
      <wmButton height="40px" padding="0 32px" @click="submit()">{{ langs.confirm }}</wmButton>
    </template>
  </wmDialog>
</template>

<style lang="less" scoped>
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../../library/ui';
import Request from '../../../library/request';
import Files from '../../../library/files';
/* 组件 */
import wmMain from '../../../components/container/main.vue';
import wmDialog from '../../../components/dialog/index.vue';
import wmButton from '../../../components/form/button/index.vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},      // 是否显示
  title: {type: String, default: ''},         // 标题
  data: {type: Object, default: {}},          // 数据
});
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

/* 提交 */
const submit = (): void => {
  // 请求
  const load: any = Ui.Loading();
  Request.Post('sys_file/down?lang='+state.lang, {
    token: state.token,
    path: props.data.path,
    filename: props.data.filename,
  }, (res:any)=>{
    load.clear();
    Files.DownBlob(res.data, props.data.filename);
    // 事件
    emit('submit', true);
  },()=>{
    Ui.Toast(langs.network_err);
  },{
    responseType:'blob',
  });
}

/* 关闭 */
const close = (): void => {
  emit('update:show', false);
}

</script>