<template>
  <wmDialog v-model:show="infoShow" :title="title" width="calc(100% - 40px)" top="56px" bottom="0px" overflow="auto" @close="close()">
    <template #top>
      <!-- 工具栏 -->
      <div class="goods_info flex">
        <ul class="goods_info_tools flex">
          <li>
            <wmInput v-model:value="goods.key" @keyup.enter="goodsSearch()" @iconClick="goodsSearch()" :placeholder="state.langs.sku_id" maxlength="32" icon="ui ui_search" iconAlign="right" padding="0 40px 0 10px"></wmInput>
          </li>
          <li>
            <wmButton type="primary" effect="text" padding="0 4px" @click="goodsPrint()">打印标签({{ goods.print }})</wmButton>
          </li>
        </ul>
        <div class="goods_info_total scrollbar" style="max-width: calc(100% - 600px);">
          标签价: <b>{{ priceEncode(goods.sale_price) }}</b> 元&nbsp;&nbsp;
          吊牌价: <b>{{ priceEncode(goods.market_price) }}</b> W&nbsp;&nbsp;
          数量: <b>{{ goods.num }}</b>
        </div>
      </div>
      <!-- 工具栏 End -->
    </template>
    <wmMain paddingY="4px">
      <!-- 商品资料 -->
      <wmTable ref="tableList" :columns="goods.columns" :options="goods.list" @orderBy="orderBy" @partially="selectState">
        <template #index="d">
          <div class="tCenter">{{ goods.list.length-d.index }}</div>
        </template>
        <template #img="d">
          <div class="flex_center">
            <span @click="d.img?goodsView(d.img):''">
              <wmImg :img="d.img?d.img+'&x-oss-process=image/resize,h_40':''" :isView="false"></wmImg>
            </span>
          </div>
        </template>
        <template #sku_id="d">
          <div class="copy">
            <b>{{ d.sku_id }}</b><span @click="goodsCopy('sku_id', d.sku_id)">复</span>
          </div>
        </template>
        <template #short_name="d">
          <div class="tCenter">{{ d.short_name || '-' }}</div>
        </template>
        <template #i_id="d">
          <div class="tCenter">{{ d.i_id || '-' }}</div>
        </template>
        <template #supply_price="d">
          <div class="tRight">
            <template v-if="d.supply_price>0">
              <span v-if="d.ratio!='1.00'">
                <del>{{ priceEncode(d.supply_price) }}</del> <b>{{ priceEncode(d.supply_price*d.ratio) }}</b>
              </span>
              <b v-else>{{ priceEncode(d.supply_price) }}</b>
            </template>
            <span v-else>-</span>
          </div>
        </template>
        <template #sale_price="d">
          <div class="tRight">
            <template v-if="d.sale_price>0">
              <span v-if="d.ratio!='1.00'">
                <del>{{ priceEncode(d.sale_price) }}</del> <b>{{ priceEncode(d.sale_price*d.ratio) }}</b>
              </span>
              <b v-else>{{ priceEncode(d.sale_price) }}</b>
            </template>
            <span v-else>-</span>
          </div>
        </template>
        <template #market_price="d">
          <div class="tRight">
            <template v-if="d.market_price>0">
              <span v-if="d.ratio!='1.00'">
                <del>{{ priceEncode(d.market_price) }}</del> <b>{{ priceEncode(d.market_price*d.ratio) }}</b>
              </span>
              <b v-else>{{ priceEncode(d.market_price) }}</b>
            </template>
            <span v-else>-</span>
          </div>
        </template>
        <template #unit="d">
          <div class="tCenter">{{ d.unit || '-' }}</div>
        </template>
        <template #weight="d">
          <div class="tCenter">{{ d.weight || '-' }}</div>
        </template>
        <template #num="d">
          <div class="tCenter"><b>{{ d.num || '-' }}</b></div>
        </template>
        <template #ratio="d">
          <div class="tCenter">{{ d.ratio || '-' }}</div>
        </template>
        <template #labels="d">
          <div class="tCenter">{{ d.labels || '-' }}</div>
        </template>
        <template #category="d">
          <div class="tCenter">{{ d.category || '-' }}</div>
        </template>
        <template #brand="d">
          <div class="tCenter">{{ d.brand || '-' }}</div>
        </template>
        <template #owner="d">
          <div class="tCenter">{{ d.owner || '-' }}</div>
        </template>
        <template #view="d">
          <div class="tCenter">
            <wmButton type="primary" effect="text" padding="0 4px" @click="state.goods.show=true;state.goods.sku_id=d.sku_id">{{ langs.flow }}</wmButton>
          </div>
        </template>
        <template #action="d">
          <div class="tCenter">
            <span v-if="d.status==0" class="c_danger">待入库</span>
            <span v-else-if="d.status==1" class="c_success">完成</span>
          </div>
        </template>
        <template #utime="d">
          <div class="tCenter color1" :title="'创建: '+d.ctime+'\n更新: '+d.utime">{{ d.ctime.substr(11,8) }}</div>
        </template>
        <template #operator_name="d">
          <div class="tCenter color1">{{ d.operator_name || '-' }}</div>
        </template>
      </wmTable>
      <!-- 商品资料 End -->
    </wmMain>
  </wmDialog>
  <!-- 图片预览 -->
  <wmImgView v-model:show="imgShow" :index="imgIndex" :options="imgData"></wmImgView>
</template>

<style lang="less" scoped>
</style>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../../library/ui';
import Request from '../../../library/request';
import Format from '../../../library/format';
import Util from "../../../library/utils";
/* 组件 */
import wmMain from '../../../components/container/main.vue';
import wmDialog from '../../../components/dialog/index.vue';
import wmTable from '../../../components/table/index.vue';
import wmInput from '../../../components/form/input/index.vue';
import wmButton from '../../../components/form/button/index.vue';
import wmImg from '../../../components/image/index.vue';
import wmImgView from '../../../components/image/view.vue';

/* 参数 */
const props = defineProps({
  show: { type: Boolean, default: false },        // 是否显示
  title: { type: String, default: '' },           // 标题
  data: { type: Object, default: {} }
});
const emit = defineEmits(['update:show', 'submit']);
const tableList = ref();
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
const priceEncode: Function = Format.priceEncode;
// 变量
const infoShow = ref(false);
// 货品
const goods = ref({
  key: '', order: '', columns: [
    {title: '序号', slot: 'index', width: '40px', minWidth: '30px', textAlign: 'center'},
    {title: langs.img, slot: 'img', width: '60px', textAlign: 'center'},
    {title: '商品编码', slot: 'sku_id', index: 'sku_id', order: '', width: '150px', minWidth: '150px'},
    {title: '暗码', slot: 'short_name', index: 'short_name', order: '', textAlign: 'center', width: '80px'},
    {title: '款式编码', slot: 'i_id', index: 'i_id', order: '', textAlign: 'center', width: '80px'},
    {title: '商品名称', index: 'name', order: '', width: '80px'},
    {title: '颜色及规格', index: 'properties_value', order: ''},
    {title: '供应链价(元)', slot: 'supply_price', index: 'supply_price', order: '', textAlign: 'center', width: '100px'},
    {title: '标签价(元)', slot: 'sale_price', index: 'sale_price', order: '', textAlign: 'center', width: '100px'},
    {title: '吊牌价(W)', slot: 'market_price', index: 'market_price', order: '', textAlign: 'center', width: '100px'},
    {title: '单位', slot: 'unit', textAlign: 'center', width: '60px'},
    {title: '重量', slot: 'weight', index: 'weight', order: '', textAlign: 'center', width: '60px'},
    {title: '数量', slot: 'num', index: 'num', order: '', textAlign: 'center', width: '60px', minWidth: '60px'},
    {title: '折扣', slot: 'ratio', index: 'ratio', order: '', textAlign: 'center', width: '60px', minWidth: '60px'},
    {title: '标签', slot: 'labels', index: 'labels', order: '', textAlign: 'center', width: '80px'},
    {title: '分类', slot: 'category', index: 'category', order: '', textAlign: 'center', width: '80px'},
    {title: '品牌', slot: 'brand', index: 'brand', order: '', textAlign: 'center', width: '80px', minWidth: '80px'},
    {title: '采购员', slot: 'owner', index: 'owner', order: '', textAlign: 'center', width: '80px'},
    {title: '查看', slot: 'view', textAlign: 'center', width: '60px', minWidth: '60px'},
    {title: '状态', slot: 'action', index: 'status', order: '', textAlign: 'center', width: '60px', minWidth: '60px'},
    {title: '时间', slot: 'utime', index: 'utime', order: '', textAlign: 'center', width: '60px', minWidth: '60px'},
    {title: '操作员', slot: 'operator_name', index: 'operator_name', order: '', textAlign: 'center', width: '60px', minWidth: '60px'},
  ], list: <any>[],
  cost_price: 0, sale_price: 0, purchase_price: 0, market_price: 0, num: 0,
  print: 0, total: 0,
});
// 图片预览
const imgShow = ref(false);
const imgIndex = ref(0);
const imgData = ref([]);

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
  if(val) {
    // 列表
    goodsList();
  }
},{ deep: true });

/* 选中状态 */
const selectState = (n: number, t: number): void => {
  goods.value.print = n;
  goods.value.total = t;
}
/* 排序 */
const orderBy = (val: string): void => {
  goods.value.order = val;
  goodsList();
}

/* 搜索 */
const goodsSearch = (): void => {
  const key: string = Util.LTrim(goods.value.key.trim().toUpperCase(), '0');
  goods.value.key = '';
  goodsList(key);
}

/* 商品-列表 */
const goodsList = (key: string=''): void => {
  // 重置
  goods.value.list = [];
  goodsTotal();
  // 加载
  const load: any = Ui.Loading();
  Request.Post('erp_purchase_in_push/goods_list?lang=' + state.lang, {
    token: state.token,
    id: props.data.id,
    order: goods.value.order,
    sku_id: key,
  }, (res: any) => {
    load.clear();
    const {code, msg, data}: any = res.data;
    if (code == 0) {
      goods.value.list = data;
      clearSelect();
      // 统计价格
      goodsTotal();
    } else Ui.Toast(msg);
  });
}
/* 商品资料-统计 */
const goodsTotal = (): void => {
  const list: Array<any> = goods.value.list;
  goods.value.cost_price = 0;
  goods.value.sale_price = 0;
  goods.value.purchase_price = 0;
  goods.value.market_price = 0;
  goods.value.num = 0;
  let num: number = 0;
  let ratio: number = 0;
  for (let v of list) {
    num = parseInt(v.num);
    ratio = parseFloat(v.ratio);
    goods.value.cost_price += parseFloat(v.cost_price) * num * ratio;
    goods.value.sale_price += parseFloat(v.sale_price) * num * ratio;
    goods.value.purchase_price += parseFloat(v.purchase_price) * num * ratio;
    goods.value.market_price += parseFloat(v.market_price) * num * ratio;
    goods.value.num += num;
  }
}

/* 商品-图片 */
const goodsView = (img: string): void => {
  let data: any = [];
  let i: number = 0;
  for (let v of goods.value.list) {
    if (!v.img) continue;
    if (v.img == img) imgIndex.value = i;
    data.push({ label: v.sku_id, value: v.img, other: { '颜色及规格': v.properties_value, '标签价': v.sale_price + '元', '吊牌价': v.market_price + 'W' } });
    i++;
  }
  imgShow.value = true;
  imgData.value = data;
}

/* 商品-复制 */
const goodsCopy = (name: string, val: string) => {
  const list: Array<any> = tableList.value.getData();
  let sku_id: string = '';
  for (let i in list) sku_id += list[i][name] + ' ';
  if (sku_id) Util.CopyText(sku_id);
  else Util.CopyText(val);
}

/* 商品-打印标签 */
const goodsPrint = (): void => {
  if (goods.value.print <= 0) return Ui.Toast('请选择!');
  const list: Array<any> = tableList.value.getData();
  let sku: Array<any> = [];
  for (let v of list) {
    sku.push({ sku_id: v.sku_id });
  }
  if (sku.length == 0) return Ui.Toast('请选择!');
  state.print.sku = sku;
  state.print.show = true;
}

/* 清除勾选 */
const clearSelect = (): void => {
  nextTick(()=>{
    tableList.value.checkboxAll(false);
  });
}

/* 关闭 */
const close = (): void => {
  emit('update:show', false);
}

</script>
