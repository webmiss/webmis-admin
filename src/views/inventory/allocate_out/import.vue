<template>
  <wmDialog v-model:show="infoShow" :title="title" width="720px" top="56px" bottom="40px" overflow="hidden auto" @close="close()">
    <template #top>
      <!-- 工具栏 -->
      <div class="goods_info flex">
        <ul class="goods_info_tools flex">
          <li><wmInput v-model:value="goods.key" @keyup.enter="goodsSearch()" @textClick="goodsImp()" text="选择文件" textColor="#0064C8" placeholder="商品编码，多条空格分隔" width="320px" padding="0 40px 0 10px"></wmInput></li>
          <li><wmButton type="danger" effect="text" padding="0 4px" @click="goodsRemove('all')">清空</wmButton></li>
        </ul>
        <div class="goods_info_total">
          数量: <b>{{ goods.num }}</b>
        </div>
      </div>
      <!-- 工具栏 End -->
    </template>
    <wmMain paddingY="4px">
      <!-- 商品资料 -->
      <wmTable ref="tableList" :columns="goods.columns" :options="goods.list" :isCheckbox="false">
        <template #index="d">
          <div class="tCenter">{{ d.index + 1 }}</div>
        </template>
        <template #num="d">
          <div class="tCenter">{{ d.num }}</div>
        </template>
        <template #action="d">
          <div class="flex_center">
            <wmButton type="danger" effect="text" padding="0 4px" @click="goodsRemove('one', d.index)">{{ langs.remove }}</wmButton>
          </div>
        </template>
        <template #view="d">
          <div class="flex_center">
            <wmButton type="primary" effect="text" padding="0 4px" @click="state.goods.show=true;state.goods.sku_id=d.sku_id">{{ langs.flow }}</wmButton>
          </div>
        </template>
        <template #status="d">
          <div class="flex_center">
            <span v-if="d.status===true" class="c_success">可用</span>
            <span v-else-if="d.status===false" class="c_danger">{{ d.status_name }}</span>
            <span v-else class="c_info">-</span>
          </div>
        </template>
      </wmTable>
    </wmMain>
    <template #bottom>
      <wmButton height="40px" padding="0 32px" @click="submit()">{{ langs.confirm }}</wmButton>
    </template>
  </wmDialog>
  <!-- 移除 -->
  <wmDialog v-model:show="remove.show" :title="remove.title" width="360px" bottom="40px" :isClose="true">
    <wmMain lineHeight="60px">{{ remove.info }}</wmMain>
    <template #bottom>
      <wmButton effect="dark" type="danger" height="40px" @click="goodsRemoveSub()">{{ langs.confirm }}</wmButton>
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
import Util from '../../../library/utils';
import Files from '../../../library/files';
import { read as xlsxRead, utils as xlsxUtils } from "xlsx";
/* 组件 */
import wmMain from '../../../components/container/main.vue';
import wmDialog from '../../../components/dialog/index.vue';
import wmTable from '../../../components/table/index.vue';
import wmInput from '../../../components/form/input/index.vue';
import wmButton from '../../../components/form/button/index.vue';

/* 参数 */
const props = defineProps({
    show: { type: Boolean, default: false },        // 是否显示
    title: { type: String, default: '' },           // 标题
    data: { type: Object, default: {} },            // 数据
  });
const emit = defineEmits(['update:show', 'submit']);
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
// 变量
const infoShow = ref(false);
// 货品
const goods = ref({
  key: '', columns: [
    {title: '序号', slot: 'index', width: '40px', minWidth: '40px', textAlign: 'center'},
    {title: '商品编码', index: 'sku_id'},
    {title: '数量', slot: 'num', textAlign: 'center', width: '80px', minWidth: '80px'},
    {title: '操作', slot: 'action', textAlign: 'center', width: '80px', minWidth: '80px'},
    {title: '查看', slot: 'view', textAlign: 'center', width: '60px', minWidth: '60px'},
    {title: '状态', slot: 'status', textAlign: 'center', width: '80px'},
  ], list: <any>[], num: 0,
});
// 添加
const add = ref({
  show: false, title: '新增商品',
  cost_price: '0.00', supply_price: '0.00', sale_price: '0.00', purchase_price: '0.00', supplier_price: '0.00', market_price: '0.00', weight: '0.00', unit: '个',
  sku_id: '', labels: '', name: '', category: '', properties_value: '', brand: '', short_name: '', i_id: '', owner: '', supplier_name: '',
});
// 移除
const remove = ref({show: false, type: '', title: '移除', info: '', index: 0});

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
},{ deep: true });

/* 搜索 */
const goodsSearch = (): void => {
  const key: string = goods.value.key.trim().toUpperCase();
  if(key.length===0) return;
  const sku: Array<string> = key.split(' ');
  for(let sku_id of sku){
    sku_id = Util.LTrim(sku_id, '0');
    if(is_sku(sku_id)){
      Ui.Toast('[ ' + sku_id + ' ]已存在!'); continue;
    }
    // 追加
    goods.value.list.unshift({sku_id: sku_id, num: 1});
  }
  goods.value.key = '';
  // 统计
  goodsTotal();
}

/* 商品资料-导入 */
const goodsImp = (): void => {
  Files.Select({ mimeType: [] }, (fileObj: any) => {
    Files.FileToBase64(fileObj, (base64: any) => {
      const workbook: any = xlsxRead(base64, { type: 'binary' });
      const name: string = workbook.SheetNames[0];
      const arr: any = xlsxUtils.sheet_to_json(workbook.Sheets[name], { raw: false });
      if(arr.length > 3000) return Ui.Toast('不能超过3000条');
      // 商品资料
      let sku_id: string = '';
      for(let v of arr){
        if(!v['商品编码'] || !v['数量']){
          Ui.Toast('必须存在“商品编码”、“数量”'); continue;
        }
        sku_id = Util.LTrim(Util.Trim(v['商品编码']).toUpperCase(), '0');
        if(is_sku(sku_id)){
          Ui.Toast('[ ' + sku_id + ' ]已存在!'); continue;
        }
        // 追加
        goods.value.list.push({
          sku_id: sku_id,
          num: v['数量'],
        });
      }
      // 统计价格
      goodsTotal();
    }, 'blob');
  });
}
/* 商品资料-是否存在 */
const is_sku = (sku_id: string): boolean => {
  for(let v of goods.value.list){
    if(sku_id===v.sku_id) return true;
  }
  return false;
}
/* 商品资料-统计 */
const goodsTotal = (): void => {
  const list: Array<any> = goods.value.list;
  goods.value.num = 0;
  for(let v of list){
    goods.value.num += parseInt(v.num);
  }
}

/* 商品资料-移除 */
const goodsRemove = (type: string, index: number = 0): void => {
  if(goods.value.list.length===0) return Ui.Toast('无商品资料!');
  remove.value.show = true;
  remove.value.type = type;
  if(type==='all'){
    remove.value.title = '清空';
    remove.value.info = '移除全部资料';
  } else if(type==='one'){
    remove.value.title = '移除';
    remove.value.info = goods.value.list[index].sku_id;
    remove.value.index = index;
  }
}
/* 商品资料-移除确认 */
const goodsRemoveSub = (): void => {
  remove.value.show = false;
  if(remove.value.type==='all') goods.value.list = [];
  else if(remove.value.type==='one') goods.value.list.splice(remove.value.index, 1);
  // 统计价格
  goodsTotal();
}

/* 提交 */
const submit = (): void => {
  if(goods.value.list.length<1) return Ui.Toast('暂无导入数据!');
  // 请求
  const load: any = Ui.Loading();
  Request.Post('erp_purchase_allocate_out/goods_safety?lang=' + state.lang, {
    token: state.token,
    go_co_id: props.data.go_co_id,
    link_co_id: props.data.link_co_id,
    data: goods.value.list,
  }, (res: any) => {
    load.clear();
    const {code, msg, data}: any = res.data;
    if(code===0){
      emit('submit', goods.value.list);
      goods.value.num = 0;
      goods.value.list = [];
      close();
    } else if(code===5000){
      Ui.Toast(msg);
      goods.value.list = data || [];
    } else Ui.Toast(msg);
  });
}

/* 关闭 */
const close = (): void => {
  emit('update:show', false);
}

</script>
