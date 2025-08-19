<template>
  <wmDialog v-model:show="infoShow" :title="title" width="640px" bottom="40px" @close="close()">
    <wmMain>
      <wmTableForm>
        <tr v-if="form.type=='add'">
          <td class="label">分仓</td>
          <td>
            <wmSelect v-model:value="form.wms_co_id" :options="selectAll.partner_name"/>
          </td>
        </tr>
        <tr>
          <td class="label">商品编码</td>
          <td>
            <wmInput v-model:value="form.sku_id" placeholder="商品编码, 多条空格分离" type="textarea" height="160px" :disabled="form.type!='add'"/>
          </td>
        </tr>
        <tr>
          <td class="label">库存</td>
          <td>
            <wmInput v-model:value="form.num" placeholder="库存数量" />
          </td>
        </tr>
        <tr>
          <td class="label">备注</td>
          <td>
            <wmInput v-model:value="form.remark" placeholder="日志备注" />
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
  data: {type: Object, default: {}}
});
const emit = defineEmits(['update:show', 'submit']);
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
// 变量
const infoShow = ref(false);
const form = ref({type: '', ids: [], wms_co_id: '', sku_id: '', num: '0', remark: ''});
// 全部分类
const selectAll = ref({partner_name:[]});

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
  if(val){
    form.value.type = props.data.type || '';
    form.value.ids = props.data.ids || [];
    form.value.sku_id = props.data.sku_id || '';
    form.value.num = props.data.num;
    // 选项
    getSelect();
  }
},{ deep: true });

/* 选项 */
const getSelect = (): void => {
  Request.Post('erp_goods_stock/get_select?lang='+state.lang, {
    token: state.token,
  }, (res:any)=>{
    const {code, msg, data}: any = res.data;
    if(code==0) {
      // 分仓
      selectAll.value.partner_name = data.partner_name;
      nextTick(()=>{
        form.value.wms_co_id = props.data.wms_co_id || [];
      });
    } else Ui.Toast(msg);
  });
}

/* 验证 */
const verify = (form: any): any => {
  if(form.type=='add' && form.wms_co_id.length==0) return Ui.Toast('请选择分仓');
  if(!form.sku_id) return Ui.Toast('请输入商品编码');
  if(isNaN(form.num) || form.num<0) return Ui.Toast('请输入库存');
  return form;
}

/* 提交 */
const submit = (): void => {
  // 验证
  const data = verify(form.value);
  if(!data) return;
  // 请求
  const load: any = Ui.Loading();
  Request.Post('erp_goods_stock/save?lang='+state.lang, {
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
