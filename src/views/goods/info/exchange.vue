<template>
  <wmDialog v-model:show="infoShow" :title="title" width="480px" bottom="40px" @close="close()">
    <wmAlert>提醒: 将替换符合条件 <b>{{ num }}</b> 条数据</wmAlert>
    <wmMain>
      <wmTableForm>
        <tr>
          <td class="label"><span class="red_dot">换算价格</span></td>
          <td>
            <wmSelect v-model:value="form.from_price" :options="selectAll.from_price" />
          </td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">换算成</span></td>
          <td>
            <wmSelect v-model:value="form.to_price" :options="selectAll.to_price" />
          </td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">换算比率</span></td>
          <td>
            <wmInput v-model:value="form.rate" placeholder='例如: 1.1' />
          </td>
        </tr>
      </wmTableForm>
    </wmMain>
    <template #bottom>
      <wmButton height="40px" padding="0 32px" @click="submit()">{{ langs.confirm }}</wmButton>
    </template>
  </wmDialog>
</template>

<style lang="less" scoped></style>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../../library/ui';
import Request from '../../../library/request';
/* 组件 */
import wmMain from '../../../components/container/main.vue';
import wmAlert from '../../../components/alert/index.vue';
import wmDialog from '../../../components/dialog/index.vue';
import wmTableForm from '../../../components/table/form.vue';
import wmSelect from '../../../components/form/select/index.vue';
import wmInput from '../../../components/form/input/index.vue';
import wmButton from '../../../components/form/button/index.vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},        // 是否显示
  title: {type: String, default: ''},           // 标题
  data: {type: Object, default: {}},            // 数据
  num: {type: Number, default: 0},              // 数量
});
const emit = defineEmits(['update:show', 'submit']);
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
// 变量
const infoShow = ref(false);
const form = ref({from_price:'', to_price:'', rate:''});
// 全部分类
const selectAll = ref({
  from_price:[{label:'采购价', value:'purchase_price'}],
  to_price:[{label:'人民币采购价', value:'supplier_price'}, {label:'成本价', value:'cost_price'}],
});

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
},{ deep: true });

/* 验证 */
const verify = (form: any): any => {
  if(!form.from_price || form.from_price.length==0) return Ui.Toast('请选择换算价格');
  if(!form.to_price || form.to_price.length==0) return Ui.Toast('请选择换算成价格');
  if(!form.rate || isNaN(parseFloat(form.rate))) return Ui.Toast('请输入换算比例');
  return form;
}

/* 提交 */
const submit = (): void => {
  // 验证
  const data = verify(form.value);
  if(!data) return;
  // 请求
  const load: any = Ui.Loading();
  Request.Post('erp_goods_info/exchange?lang='+state.lang, {
    token: state.token,
    data: props.data,
    form: data,
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
