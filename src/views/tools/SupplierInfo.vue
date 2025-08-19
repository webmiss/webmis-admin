<template>
<wmDialog v-model:show="infoShow" :title="title" width="740px" @close="close()">
  <wmMain>
    <wmTableForm>
      <tr>
        <td class="label">供应商名称</td>
        <td>{{ infoData.name || '-' }}</td>
        <td class="label">状态</td>
        <td>
          <span v-if="infoData.state=='1'" class="c_success">正常</span>
          <span v-else-if="infoData.state=='0'" class="c_danger">禁用</span>
          <span v-else>-</span>
        </td>
      </tr>
      <tr>
        <td class="label">手机号码</td>
        <td>
          <b v-if="infoData.tel">{{ infoData.tel || '-' }}</b>
          <span v-else>-</span>
        </td>
        <td class="label">供应商ID</td>
        <td>{{ infoData.supplier_id || '-' }}</td>
      </tr>
      <tr>
        <td class="label">创建时间</td>
        <td class="c_info">{{ infoData.ctime || '-' }}</td>
        <td class="label">修改时间</td>
        <td class="c_info">{{ infoData.utime || '-' }}</td>
      </tr>
      <tr>
        <td class="label">开户银行</td>
        <td>{{ infoData.depositbank || '-' }}</td>
        <td class="label">身份证号</td>
        <td>{{ infoData.id_card || '-' }}</td>
      </tr>
      <tr>
        <td class="label">账户名称</td>
        <td>{{ infoData.bankacount || '-' }}</td>
        <td class="label">银行卡号</td>
        <td>{{ infoData.acountnumber || '-' }}</td>
      </tr>
      <tr>
        <td class="label">支付宝姓名</td>
        <td>{{ infoData.alipay_name || '-' }}</td>
        <td class="label">支付宝账号</td>
        <td>{{ infoData.alipay_id || '-' }}</td>
      </tr>
    </wmTableForm>
  </wmMain>
</wmDialog>
</template>

<style lang="less" scoped></style>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../library/ui';
import Request from '../../library/request';
/* 组件 */
import wmMain from '../../components/container/main.vue';
import wmDialog from '../../components/dialog/index.vue';
import wmTableForm from '../../components/table/form.vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},        // 是否显示
  title: {type: String, default: ''},           // 标题
  data: {type: Object, default: {}}             // 数据
});
const emit = defineEmits(['update:show']);
// 状态
const store = useStore();
const state = store.state;
const langs = state.langs;
// 变量
const infoShow = ref(false);
const infoData = ref(<any>{});

/* 监听 */
watch(()=>props.show, (val:boolean)=>{
  infoShow.value = val;
  if(val) supplierInfo(props.data.supplier_name);
});

/* 供应商信息 */
const supplierInfo = (name:string): void => {
  if(!name) return Ui.Toast('请输入供应商名称');
  // 请求
  infoData.value = {};
  const load: any = Ui.Loading();
  Request.Post('erp_base_supplier/get_info?lang='+state.lang, {
    token: state.token,
    name: name,
  }, (res:any)=>{
    load.clear();
    const {code, msg, data}: any = res.data;
    if(code==0) infoData.value=data;
    else Ui.Toast(msg);
  });
}

/* 关闭 */
const close = (): void => {
  emit('update:show', false);
}

</script>
  