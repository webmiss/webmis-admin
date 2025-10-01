<template>
  <wmDialog v-model:show="infoShow" :title="title" width="620px" bottom="40px" @close="close()">
    <wmMain>
      <wmTableForm>
        <tr>
          <td class="label"><span class="red_dot">仓库</span></td>
          <td>
            <wmSelect v-model:value="form.wms_co_id" :options="selectAll.partner_name" :disabled="form.tp=='edit'" />
          </td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">类型</span></td>
          <td>
            <wmSelect v-model:value="form.type" :options="selectAll.type_name" />
          </td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">店铺</span></td>
          <td>
            <wmSelect v-model:value="form.shop_id" :options="selectAll.shop_name" />
          </td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">买断店铺</span></td>
          <td>
            <wmSelect v-model:value="form.shop_to" :options="selectAll.shop_to_name" />
          </td>
        </tr>
        <tr>
          <td class="label">备注</td>
          <td>
            <wmInput v-model:value="form.remark" type="textarea" height="160px" />
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
import { ref, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../../library/ui';
import Request from '../../../library/request';
/* 组件 */
import wmMain from '../../../components/container/main.vue';
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
});
const emit = defineEmits(['update:show', 'submit']);
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
// 变量
const infoShow = ref(false);
const form = ref({tp:'', id:'', type:<any>'', wms_co_id:<any>'', shop_id:<any>'', shop_to:<any>'', remark:''});
// 全部分类
const selectAll = ref({type_name: [], partner_name: [], shop_name: [], shop_to_name: []});

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
  if(val){
    form.value.tp = props.data.tp || '';
    form.value.id = props.data.id || '';
    form.value.remark = props.data.remark || '';
    // 选项
    getSelect();
  }
},{ deep: true });

/* 选项 */
const getSelect = (): void => {
  Request.Post('erp_order_inout/get_select?lang='+state.lang, {
    token: state.token,
  }, (res:any)=>{
    const {code, msg, data}: any = res.data;
    if(code==0) {
      // 类型、分仓、店铺、买断店铺
      selectAll.value.type_name = data.type_name;
      selectAll.value.partner_name = data.partner_name;
      selectAll.value.shop_name = data.shop_name;
      selectAll.value.shop_to_name = data.shop_to_name;
      if(props.data.tp=='edit') {
        nextTick(()=>{
          form.value.type = [parseInt(props.data.type)];
          form.value.wms_co_id = [parseInt(props.data.wms_co_id)];
          form.value.shop_id = [parseInt(props.data.shop_id)];
          form.value.shop_to = [parseInt(props.data.shop_to)];
        });
      }
    } else Ui.Toast(msg);
  });
}

/* 验证 */
const verify = (form: any): any => {
  if(!form.type || form.type.length==0) return Ui.Toast('请选择类型');
  if(!form.wms_co_id || form.wms_co_id.length==0) return Ui.Toast('请选择仓库');
  if(!form.shop_id || form.shop_id.length==0) return Ui.Toast('请选择店铺');
  if(!form.shop_to || form.shop_to.length==0) return Ui.Toast('请选择买断店铺');
  return form;
}

/* 提交 */
const submit = (): void => {
  // 验证
  const data = verify(form.value);
  if(!data) return;
  // 请求
  const load: any = Ui.Loading();
  Request.Post('erp_order_inout/save?lang='+state.lang, {
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
