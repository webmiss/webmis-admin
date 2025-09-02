<template>
  <wmDialog v-model:show="infoShow" :title="title" width="800px" bottom="40px" @close="close()">
    <wmMain>
      <wmTableForm>
        <tr>
          <td class="label">供应商ID</td>
          <td>
            <wmInput v-model:value="form.supplier_id" :disabled="form.type=='edit'" />
          </td>
          <td class="label"><span class="red_dot">供应商名称</span></td>
          <td>
            <wmInput v-model:value="form.name" :disabled="form.type=='edit'" />
          </td>
        </tr>
        <tr>
          <td class="label">区域</td>
          <td>
            <wm-select v-model:value="form.city" :options="selectAll.city_name"/>
          </td>
          <td class="label">手机号码</td>
          <td>
            <wmInput v-model:value="form.tel" />
          </td>
        </tr>
        <tr>
          <td class="label">状态</td>
          <td colspan="3">
            <wmSwitch v-model:value="form.status"></wmSwitch>
          </td>
        </tr>
        <tr>
          <td class="label">开户银行</td>
          <td colspan="3">
            <wmInput v-model:value="form.depositbank" />
          </td>
        </tr>
        <tr>
          <td class="label">账户名称</td>
          <td>
            <wmInput v-model:value="form.bankacount" />
          </td>
          <td class="label">银行卡号</td>
          <td>
            <wmInput v-model:value="form.acountnumber" />
          </td>
        </tr>
        <tr>
          <td class="label">支付宝姓名</td>
          <td>
            <wmInput v-model:value="form.alipay_name" />
          </td>
          <td class="label">支付宝账号</td>
          <td>
            <wmInput v-model:value="form.alipay_id" />
          </td>
        </tr>
        <tr>
          <td class="label">备注</td>
          <td colspan="3">
            <wmInput v-model:value="form.remark" placeholder="备注" type="textarea" height="80px"/>
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
import wmSwitch from '../../../components/form/switch/index.vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},        // 是否显示
  title: {type: String, default: ''},           // 标题
  data: {type: Object, default: {}}
});
const emit = defineEmits(['update:show', 'submit']);
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
// 变量
const infoShow = ref(false);
const form = ref({
  type: '', id: '', city:<any>'', tel: '', supplier_id: '', name: '', status: false,
  depositbank: '', bankacount: '', acountnumber: '',
  alipay_name: '', alipay_id: '', remark: '',
});
// 全部分类
const selectAll = ref({city_name:[], state_name:[]});

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
  if(val){
    form.value.type = props.data.type || '';
    form.value.id = props.data.id || '';
    form.value.tel = props.data.tel || '';
    form.value.supplier_id = props.data.supplier_id || '';
    form.value.name = props.data.name || '';
    form.value.status = typeof props.data.status!='undefined'?props.data.status:true;
    form.value.depositbank = props.data.depositbank || '';
    form.value.bankacount = props.data.bankacount || '';
    form.value.acountnumber = props.data.acountnumber || '';
    form.value.alipay_name = props.data.alipay_name || '';
    form.value.alipay_id = props.data.alipay_id || '';
    form.value.remark = props.data.remark || '';
    // 选项
    getSelect();
  }
},{ deep: true });

/* 选项 */
const getSelect = (): void => {
  Request.Post('erp_base_supplier/get_select?lang='+state.lang, {
    token: state.token,
  }, (res:any)=>{
    const {code, msg, data}: any = res.data;
    if(code==0) {
      // 分仓
      selectAll.value.city_name = data.city_name;
      nextTick(()=>{
        form.value.city = props.data.city?[props.data.city]:'';
      });
    } else Ui.Toast(msg);
  });
}

/* 验证 */
const verify = (form: any) => {
  if(form.name.length<2) return Ui.Toast('请输入供应商名称');
  return form;
}

/* 提交 */
const submit = (): void => {
  // 验证
  const data = verify(form.value);
  if(!data) return;
  // 请求
  const load: any = Ui.Loading();
  Request.Post('erp_base_supplier/save?lang='+state.lang, {
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
