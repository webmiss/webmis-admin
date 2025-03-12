<template>
  <wm-dialog v-model:show="infoShow" :title="title || langs.export" width="360px" bottom="40px" @close="close()">
    <wm-main lineHeight="60px">
      <span v-html="langs.export_warn(num)"></span>
    </wm-main>
    <template #bottom>
      <wm-button height="40px" padding="0 32px" @click="submit()">{{ langs.confirm }}</wm-button>
    </template>
  </wm-dialog>
</template>

<style lang="less" scoped>
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../../library/ui'
import Request from '../../../library/request'
import Files from '../../../library/files'
/* 组件 */
import wmMain from '../../../components/container/main.vue'
import wmDialog from '../../../components/dialog/index.vue'
import wmButton from '../../../components/form/button/index.vue'

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},      // 是否显示
  title: {type: String, default: ''},         // 标题
  num: {type: Number, default: 0},            // 数量
  data: {type: Object, default: {}},          // 数据
  order: {type: String, default: ''},         // 排序
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
  Request.Post('sys_menus/export?lang='+state.lang, {
    token: state.token,
    data: props.data,
    order: props.order,
  }, (res:any)=>{
    load.clear();
    const d: any = res.data;
    Ui.Toast(d.msg);
    if(d.code==0){
      Files.Down(d.data.path+d.data.filename, d.data.filename);
    }
    // 事件
    emit('submit', d.code==0);
  });
}

/* 关闭 */
const close = (): void => {
  emit('update:show', false);
}

</script>
