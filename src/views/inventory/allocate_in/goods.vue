<template>
  <wmDialog v-model:show="infoShow" :title="title" width="calc(100% - 40px)" maxWidth="1800px" overflow="auto" top="56px" bottom="0px" @close="close()">
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
          <p :class="Object.keys(level).length==0?'none':''">
            标签价: <b>{{ priceEncode(goods.sale_price) }}</b> 元&nbsp;&nbsp;
            吊牌价: <b>{{ priceEncode(goods.market_price) }}</b> W&nbsp;&nbsp;
            数量: <b>{{ goods.num }}</b>
          </p>
          <p class="level" v-if="Object.keys(level).length!=0">
            <template v-for="(v,k) in level">
              {{ k }}( <b>{{ parseInt((v/goods.num*100).toString()) }}%</b>,<b>{{ v }}</b> )&nbsp;&nbsp;
            </template>
          </p>
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
          <div class="copy c_primary">
            {{ d.sku_id }}<span @click="goodsCopy('sku_id', d.sku_id)">复</span>
          </div>
        </template>
        <template #short_name="d">
          <div class="tCenter">{{ d.short_name || '-' }}</div>
        </template>
        <template #i_id="d">
          <div class="tCenter">{{ d.i_id || '-' }}</div>
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
        <template #owner="d">
          <div class="tCenter">{{ d.owner || '-' }}</div>
        </template>
        <template #view="d">
          <div class="tCenter">
            <wmButton type="primary" effect="text" padding="0 4px" @click="state.goods.show=true;state.goods.sku_id=d.sku_id">{{ langs.goods_flow }}</wmButton>
          </div>
        </template>
        <template #action="d">
          <div class="tCenter">
            <span v-if="d.state==0" class="c_danger">调拨中</span>
            <span v-else-if="d.state==1" class="c_success">完成</span>
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
    { title: '序号', slot: 'index', width: '40px', minWidth: '30px', textAlign: 'center' },
    { title: langs.img, slot: 'img', width: '60px', textAlign: 'center' },
    { title: '商品编码', slot: 'sku_id', index: 'sku_id', order: '', width: '120px', minWidth: '120px' },
    { title: '暗码', slot: 'short_name', index: 'short_name', order: '', textAlign: 'center', width: '80px' },
    {title: '款式编码', slot: 'i_id', index: 'i_id', order: '', textAlign: 'center', width: '80px'},
    { title: '商品名称', index: 'name', order: '', width: '80px' },
    { title: '颜色及规格', index: 'properties_value', order: '' },
    { title: '标签价(元)', slot: 'sale_price', index: 'sale_price', order: '', textAlign: 'center', width: '100px' },
    { title: '吊牌价(W)', slot: 'market_price', index: 'market_price', order: '', textAlign: 'center', width: '100px' },
    { title: '单位', slot: 'unit', textAlign: 'center', width: '60px' },
    { title: '重量', slot: 'weight', index: 'weight', order: '', textAlign: 'center', width: '60px' },
    { title: '数量', slot: 'num', index: 'num', order: '', textAlign: 'center', width: '60px', minWidth: '60px' },
    { title: '折扣', slot: 'ratio', index: 'ratio', order: '', textAlign: 'center', width: '60px', minWidth: '60px' },
    { title: '标签', slot: 'labels', index: 'labels', order: '', textAlign: 'center', width: '60px' },
    { title: '分类', slot: 'category', index: 'category', order: '', textAlign: 'center', width: '80px' },
    { title: '采购员', slot: 'owner', index: 'owner', order: '', textAlign: 'center', width: '80px' },
    { title: '查看', slot: 'view', textAlign: 'center', width: '60px', minWidth: '60px' },
    { title: '状态', slot: 'action', index: 'state', order: '', textAlign: 'center', width: '60px', minWidth: '60px' },
    {title: '时间', slot: 'utime', index: 'utime', order: '', textAlign: 'center', width: '60px', minWidth: '60px'},
    {title: '操作员', slot: 'operator_name', index: 'operator_name', order: '', textAlign: 'center', width: '60px', minWidth: '60px'},
  ], list: <any>[],
  sale_price: 0, market_price: 0, num: 0,
  print: 0, total: 0,
});
// 图片预览
const imgShow = ref(false);
const imgIndex = ref(0);
const imgData = ref([]);
// 层级
const level = ref({});
const levelData = ref({
  // 瑞丽库房
  11846851: {
    '翡翠-手镯': { '9万以下': [0, 90000], '9-35万': [90000, 350000], '35-70万': [350000, 700000], '70-120万': [700000, 1200000], '120万以上': 1200000 },
    '翡翠-挂件': { '7.5千以下': [0, 7500], '7.5千-2.5万': [7500, 25000], '2.5-7.5万': [25000, 75000], '7.5-25万': [75000, 250000], '25万上': 250000 },
  },
  // 平洲库房
  11959456: {
    '翡翠-手镯': { '6万以下': [0, 60000], '6-20万': [60000, 200000], '20-60万': [200000, 600000], '60-132万': [600000, 1320000], '132万上': 1320000 },
    '翡翠-挂件': { '1.3万以下': [0, 13000], '1.3-3万': [13000, 30000], '3-7.5万': [30000, 75000], '7.5-25万': [75000, 250000], '25万上': 250000 },
  },
  // 中缅库房
  14377940: {
    '翡翠-手镯': { '100以下': [0, 100], '100-1000': [100, 1000], '1千-1万': [1000, 10000], '1万上': 10000 },
    '翡翠-挂件': { '100以下': [0, 100], '100-1000': [100, 1000], '1千-1万': [1000, 10000], '1万上': 10000 },
  },
  // 四会库房
  11961469: {
    '翡翠-挂件': { '1.3万以下': [0, 13000], '1.3-3万': [13000, 30000], '3-7.5万': [30000, 75000], '7.5-25万': [75000, 250000], '25万上': 250000 },
  },
});
// 操作
const diff = ref({ show: false, title: '对比调拨单' });

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
  Request.Post('erp_purchase_allocate_in/goods_list?lang=' + state.lang, {
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
// 统计价格
const goodsTotal = (): void => {
  const list: Array<any> = goods.value.list;
  goods.value.sale_price = 0;
  goods.value.market_price = 0;
  goods.value.num = 0;
  let num: number = 0;
  let ratio: number = 0;
  level.value = {};
  let tmp: any = {};
  for (let v of list) {
    num = parseInt(v.num);
    ratio = parseFloat(v.ratio);
    goods.value.sale_price += parseFloat(v.sale_price) * num * ratio;
    goods.value.market_price += parseFloat(v.market_price) * num * ratio;
    goods.value.num += num;
    // 层级
    tmp = {};
    if(levelData.value[v.go_co_id] && levelData.value[v.go_co_id][v.category]) {
      tmp = levelData.value[v.go_co_id][v.category];
    }else if(levelData.value[v.link_co_id] && levelData.value[v.link_co_id][v.category]){
      tmp = levelData.value[v.link_co_id][v.category];
    }
    let n: number = 0;
    const price: number = parseFloat(v.sale_price);
    for (let k in tmp) {
      if (typeof tmp[k] == 'object') n = price >= tmp[k][0] && price < tmp[k][1] ? num : 0;
      else n = price >= tmp[k] ? num : 0;
      level.value[k] = level.value[k] ? level.value[k] + n : n;
    }
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
