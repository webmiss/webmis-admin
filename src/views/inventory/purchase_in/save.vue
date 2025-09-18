<template>
  <wmDialog v-model:show="infoShow" :title="title" width="620px" bottom="40px" @close="close()">
    <wmMain>
      <wmTableForm>
        <tr>
          <td class="label"><span class="red_dot">采购仓库</span></td>
          <td>
            <wmSelect v-model:value="form.wms_co_id" :options="selectAll.partner_name" :disabled="form.tp=='edit'" />
          </td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">采购类型</span></td>
          <td>
            <wmSelect v-model:value="form.type" :options="selectAll.type_name" />
          </td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">品牌</span></td>
          <td>
            <wmSelect v-model:value="form.brand" :options="selectAll.brand_name" />
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
const form = ref({tp:'', id:'', type:<any>'', wms_co_id:<any>'', brand:<any>'', remark:''});
// 全部分类
const selectAll = ref({type_name: [], partner_name: [], brand_name: []});

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
  Request.Post('erp_purchase_in/get_select?lang='+state.lang, {
    token: state.token,
  }, (res:any)=>{
    const {code, msg, data}: any = res.data;
    if(code==0) {
      // 类型、分仓
      selectAll.value.type_name = data.type_name;
      selectAll.value.partner_name = data.partner_name;
      selectAll.value.brand_name = data.brand_name;
      if(props.data.tp=='edit') {
        nextTick(()=>{
          form.value.type = [parseInt(props.data.type)];
          form.value.wms_co_id = [parseInt(props.data.wms_co_id)];
          form.value.brand = [props.data.brand];
        });
      }
    } else Ui.Toast(msg);
  });
}

/* 验证 */
const verify = (form: any): any => {
  if(!form.wms_co_id || form.wms_co_id.length==0) return Ui.Toast('请选择采购仓库');
  if(!form.type || form.type.length==0) return Ui.Toast('请选择采购类型');
  if(!form.brand || form.brand.length==0) return Ui.Toast('请选择品牌');
  return form;
}

/* 提交 */
const submit = (): void => {
  // 验证
  const data = verify(form.value);
  if(!data) return;
  // 请求
  const load: any = Ui.Loading();
  Request.Post('erp_purchase_in/save?lang='+state.lang, {
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
