<template>
  <wmDialog v-model:show="infoShow" :title="title" width="900px" bottom="40px" overflow="hidden auto" @close="close()">
    <wmMain>
      <wmTableForm>
        <tr>
          <td class="label"><span class="red_dot">商品编码</span></td>
          <td>
            <wmInput v-model:value="form.sku_id" :placeholder="form.type=='edits'?'原始':''" :disabled="true" />
          </td>
          <td class="label"><span class="red_dot">标签</span></td>
          <td>
            <wmSelect v-model:value="form.labels" :options="selectAll.labels" :placeholder="form.type=='edits'?'原始':''" />
          </td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">商品名称</span></td>
          <td>
            <wmInput v-model:value="form.name" :placeholder="form.type=='edits'?'原始':''" />
          </td>
          <td class="label"><span class="red_dot">商品分类</span></td>
          <td>
            <wmSelect v-model:value="form.category" :options="selectAll.category" :placeholder="form.type=='edits'?'原始':''" />
          </td>
        </tr>
        <tr>
          <td class="label">颜色及规格</td>
          <td>
            <wmInput v-model:value="form.properties_value" :placeholder="form.type=='edits'?'原始':''" />
          </td>
          <td class="label"><span class="red_dot">品牌</span></td>
          <td>
            <wmSelect v-model:value="form.brand" :options="selectAll.brand" :placeholder="form.type=='edits'?'原始':''" />
          </td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">成本价(元)</span></td>
          <td>
            <wmInput v-model:value="form.cost_price" :placeholder="form.type=='edits'?'原始':''" />
          </td>
          <td class="label"><span class="red_dot">标签价(元)</span></td>
          <td>
            <wmInput v-model:value="form.sale_price" :placeholder="form.type=='edits'?'原始':''" />
          </td>
        </tr>
        <tr>
          <td class="label">采购价(w)</td>
          <td>
            <wmInput v-model:value="form.purchase_price" :placeholder="form.type=='edits'?'原始':''" />
          </td>
          <td class="label">吊牌价(w)</td>
          <td>
            <wmInput v-model:value="form.market_price" :placeholder="form.type=='edits'?'原始':''" />
          </td>
        </tr>
        <tr>
          <td class="label">供应链价(元)</td>
          <td>
            <wmInput v-model:value="form.supply_price" :placeholder="form.type=='edits'?'原始':''" />
          </td>
          <td class="label">人民币采购价</td>
          <td>
            <wmInput v-model:value="form.supplier_price" :placeholder="form.type=='edits'?'原始':''" />
          </td>
        </tr>
        <tr>
          <td class="label">参照价(元)</td>
          <td>
            <wmInput v-model:value="form.other_price" :placeholder="form.type=='edits'?'原始':''" />
          </td>
          <td class="label">其它价格1</td>
          <td>
            <wmInput v-model:value="form.other_price1" :placeholder="form.type=='edits'?'原始':''" />
          </td>
        </tr>
        <tr>
          <td class="label">单位</td>
          <td>
            <wmInput v-model:value="form.unit" :placeholder="form.type=='edits'?'原始':''" />
          </td>
          <td class="label">重量</td>
          <td>
            <wmInput v-model:value="form.weight" :placeholder="form.type=='edits'?'原始':''" />
          </td>
        </tr>
        <tr>
          <td class="label">库存</td>
          <td>
            <wmInput v-model:value="form.num" :placeholder="form.type=='edits'?'原始':''" />
          </td>
          <td class="label">折扣</td>
          <td>
            <wmInput v-model:value="form.ratio" :placeholder="form.type=='edits'?'原始':''" />
          </td>
        </tr>
        <tr>
          <td class="label">暗码</td>
          <td>
            <wmInput v-model:value="form.short_name" :placeholder="form.type=='edits'?'原始':''" />
          </td>
          <td class="label">款式编码</td>
          <td>
            <wmInput v-model:value="form.i_id" :placeholder="form.type=='edits'?'原始':''" />
          </td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">采购员</span></td>
          <td>
            <wmInput v-model:value="form.owner" :placeholder="form.type=='edits'?'原始':''" />
          </td>
          <td class="label"><span class="red_dot">供应商</span></td>
          <td>
            <wmInput v-model:value="form.supplier_name" @iconClick="supplierInfo(form.supplier_name)" :placeholder="form.type=='edits'?'原始':''" icon="ui ui_search" iconAlign="right" padding="0 40px 0 10px" />
          </td>
        </tr>
      </wmTableForm>
    </wmMain>
    <template #bottom>
      <wmButton height="40px" padding="0 32px" @click="submit()">{{ langs.confirm }}</wmButton>
    </template>
  </wmDialog>
  <!-- 供应商信息 -->
  <SupplierInfo v-model:show="supplier.show" :title="supplier.title" :data="supplier.data"></SupplierInfo>
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
import SupplierInfo from '../../tools/SupplierInfo.vue';

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
  type:'', ids:[],
  sku_id:'', name:'', properties_value:'', short_name:'', unit:'', weight:'', num:'', ratio:'', owner:'', i_id:'', supplier_name:'',
  cost_price:'', supply_price:'', sale_price:'', supplier_price:'', purchase_price:'', market_price:'', other_price:'', other_price1:'',
  labels:<any>'', category:<any>'', brand:<any>'',
});
// 全部分类
const selectAll = ref({labels:[], category:[], brand:[]});
// 供应商
const supplier = ref({show: false, title: '供应商信息', data:{}});

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
  if(val){
    form.value.type = props.data.type || '';
    form.value.ids = props.data.ids || [];
    form.value.sku_id = props.data.sku_id || '';
    form.value.name = props.data.name || '';
    form.value.properties_value = props.data.properties_value || '';
    form.value.short_name = props.data.short_name || '';
    form.value.cost_price = props.data.cost_price || '';
    form.value.supply_price = props.data.supply_price || '';
    form.value.sale_price = props.data.sale_price || '';
    form.value.purchase_price = props.data.purchase_price || '';
    form.value.supplier_price = props.data.supplier_price || '';
    form.value.market_price = props.data.market_price || '';
    form.value.other_price = props.data.other_price || '';
    form.value.other_price1 = props.data.other_price1 || '';
    form.value.unit = props.data.unit || '';
    form.value.weight = props.data.weight || '';
    form.value.num = typeof props.data.num!='undefined'?props.data.num:'';
    form.value.ratio = props.data.ratio || '';
    form.value.brand = props.data.brand || '';
    form.value.owner = props.data.owner || '';
    form.value.i_id = props.data.i_id || '';
    form.value.supplier_name = props.data.supplier_name || '';
    // 选项
    getSelect();
  }
},{ deep: true });

/* 选项 */
const getSelect = (): void => {
  Request.Post('erp_goods_info/get_select?lang='+state.lang, {
    token: state.token,
  }, (res:any)=>{
    const {code, msg, data}: any = res.data;
    if(code==0) {
      // 标签、分类
      selectAll.value.labels = data.labels;
      selectAll.value.category = data.category;
      selectAll.value.brand = data.brand;
      nextTick(()=>{
        form.value.labels = props.data.labels?[props.data.labels]:'';
        form.value.category = props.data.category?[props.data.category]:'';
        form.value.brand = props.data.brand?[props.data.brand]:'';
      });
    } else Ui.Toast(msg);
  });
}

/* 供应商信息 */
const supplierInfo = (supplier_name:string): void => {
  if(!supplier_name) return Ui.Toast('请输入供应商名称');
  supplier.value.show = true;
  supplier.value.data = {supplier_name: supplier_name};
}

/* 验证 */
const verify = (form: any): any => {
  if(form.ids.length==0) return Ui.Toast('请选择');
  return form;
}

/* 提交 */
const submit = (): void => {
  // 验证
  const data = verify(form.value);
  if(!data) return;
  // 请求
  const load: any = Ui.Loading();
  Request.Post('erp_goods_info/save?lang='+state.lang, {
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
