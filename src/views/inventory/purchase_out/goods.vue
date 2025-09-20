<template>
  <wmDialog v-model:show="infoShow" :title="title" width="calc(100% - 40px)" top="56px" :bottom="data.status==0?'40px':'0px'" overflow="auto" :bgClose="false" @close="close()">
    <template #top>
      <!-- 工具栏 -->
      <div class="goods_info flex">
        <ul class="goods_info_tools flex">
          <li>
            <wmInput v-model:value="goods.key" @keyup.enter="goodsSearch()" @iconClick="goodsSearch()" :placeholder="state.langs.sku_id" maxlength="32" icon="ui ui_search" iconAlign="right" padding="0 40px 0 10px"></wmInput>
          </li>
          <template v-if="data.status==0">
            <li>
              <wmCheckbox :options="goods.is_sku"></wmCheckbox>
            </li>
            <li v-if="isAction('save')">
              <wmButton type="danger" effect="text" padding="0 4px" @click="goodsRemove('part')">移除</wmButton>
            </li>
            <li>|</li>
            <li v-if="isAction('goods_imp')">
              <wmButton type="primary" effect="text" padding="0 4px" @click="importData()">导入</wmButton>
            </li>
            <li>|</li>
          </template>
          <li>
            <wmButton type="primary" effect="text" padding="0 4px" @click="goodsPrint()">打印标签({{ goods.print }})</wmButton>
          </li>
        </ul>
        <div class="goods_info_total scrollbar" style="max-width: calc(100% - 630px);">
          标签价: <b>{{ priceEncode(goods.sale_price) }}</b> 元&nbsp;&nbsp;
          吊牌价: <b>{{ priceEncode(goods.market_price) }}</b> W&nbsp;&nbsp;
          数量: <b>{{ goods.num }}</b>
        </div>
      </div>
      <!-- 工具栏 End -->
    </template>
    <wmMain paddingY="4px">
      <!-- 商品资料 -->
      <wmTable ref="tableList" :columns="goods.columns" :options="goods.list" @orderBy="orderBy" @partially="selectState" :maxLen="100">
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
          <div class="copy" :class="d.is_date?'c_danger':'c_primary'">
            {{ d.sku_id }}<span @click="goodsCopy('sku_id', d.sku_id)">复</span>
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
          <div class="tCenter">
            <wmInput v-if="data.status==0&&d.loading!=0" v-model:value="d.num"  @update:blur="goodsNum($event, d.id, d.sku_id)" inputAlign="center"></wmInput>
            <span v-else><b>{{ d.num || '-' }}</b></span>
          </div>
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
          <div v-if="d.brand!=data.brand" class="flex_center status2">{{ d.brand || '>' }}</div>
          <div v-else class="tCenter">{{ d.brand || '>' }}</div>
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
          <div class="flex_center">
            <template v-if="data.status==0">
              <wmButton type="warning" effect="text" padding="0 4px" v-if="d.loading==0">加载中</wmButton>
              <wmButton type="success" effect="text" padding="0 4px" v-else-if="d.loading==1" @click="goodsAddData([{id:d.id, sku_id:d.sku_id, num:d.num}])">刷新</wmButton>
              <wmButton type="danger" effect="text" padding="0 4px" v-if="d.loading!=0" @click="goodsRemove('one', d)">移除</wmButton>
            </template>
            <template v-else>
              <span v-if="d.status==0" class="c_danger">待退货</span>
              <span v-else-if="d.status==1" class="c_success">完成</span>
            </template>
          </div>
        </template>
        <template #utime="d">
          <div class="tCenter color1" :title="'创建: '+d.ctime+'\n更新: '+d.utime">{{ d.ctime?d.ctime.substr(11,8):'-' }}</div>
        </template>
        <template #operator_name="d">
          <div class="tCenter color1">{{ d.operator_name || '-' }}</div>
        </template>
      </wmTable>
      <!-- 商品资料 End -->
    </wmMain>
    <template #bottom>
      <wmButton v-if="data.status==0" type="primary" height="40px" padding="0 32px" @click="explodeData()">
        按品牌拆分( <span v-for="(v,k) in exp.info">{{ k }}: <b>{{ v }}</b></span> )
      </wmButton>
    </template>
  </wmDialog>
  <!-- 移除 -->
  <wmDialog v-model:show="goods.remove.show" :title="goods.remove.title" width="360px" bottom="40px" :isClose="true">
    <wmMain lineHeight="60px">
      {{ goods.remove.info }}
    </wmMain>
    <template #bottom>
      <wmButton effect="dark" type="danger" height="40px" padding="0 32px" @click="goodsRemoveSub()">{{ langs.confirm }}</wmButton>
    </template>
  </wmDialog>
  <!-- 拆分 -->
  <wmDialog v-model:show="exp.show" :title="exp.title" width="480px" bottom="40px" :isClose="true">
    <wmMain lineHeight="60px">
      <span v-for="(v,k) in exp.info">{{ k }}: <b>{{ v }}</b></span>
    </wmMain>
    <template #bottom>
      <wmButton type="primary" height="40px" padding="0 32px" @click="explodeSub()">{{ langs.confirm }}</wmButton>
    </template>
  </wmDialog>
  <!-- Action -->
  <actionImport v-model:show="imp.show" :title="imp.title" :data="{wms_co_id: props.data.wms_co_id}" @submit="importSubmit($event)"></actionImport>
  <!-- 图片预览 -->
  <wmImgView v-model:show="imgShow" :index="imgIndex" :options="imgData"></wmImgView>
</template>

<style lang="less" scoped>
.status0,.status1,.status2{padding: 0 10px; border-radius: 2px;}
.status0{background-color: @Info6; color: @Info;}
.status1{background-color: @Warning6; color: @Warning;}
.status2{background-color: @Danger; color: #FFF;}
</style>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../../library/ui';
import Request from '../../../library/request';
import Format from '../../../library/format';
import Util from '../../../library/utils';
import Permission from '../../../library/permission';
/* 组件 */
import wmMain from '../../../components/container/main.vue';
import wmDialog from '../../../components/dialog/index.vue';
import wmTable from '../../../components/table/index.vue';
import wmInput from '../../../components/form/input/index.vue';
import wmButton from '../../../components/form/button/index.vue';
import wmCheckbox from '../../../components/form/checkbox/index.vue';
import wmImg from '../../../components/image/index.vue';
import wmImgView from '../../../components/image/view.vue';
import actionImport from './import.vue';

/* 参数 */
const props = defineProps({
  show: { type: Boolean, default: false },        // 是否显示
  title: { type: String, default: '' },           // 标题
  data: { type: Object, default: {} },            // 数据
});
const emit = defineEmits(['update:show', 'submit']);
const tableList = ref();
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
const priceEncode: Function = Format.priceEncode;
const isAction: Function = Permission.isAction;
// 变量
const infoShow = ref(false);
let time: any = null;
let timeData: any = [];
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
    {title: '单位', slot: 'unit', textAlign: 'center', width: '60px', minWidth: '60px'},
    {title: '重量', slot: 'weight', index: 'weight', order: '', textAlign: 'center', width: '60px', minWidth: '60px'},
    {title: '数量', slot: 'num', index: 'num', order: '', textAlign: 'center', width: '60px', minWidth: '60px'},
    {title: '折扣', slot: 'ratio', index: 'ratio', order: '', textAlign: 'center', width: '60px', minWidth: '60px'},
    {title: '标签', slot: 'labels', index: 'labels', order: '', textAlign: 'center', width: '80px'},
    {title: '分类', slot: 'category', index: 'category', order: '', textAlign: 'center', width: '80px'},
    {title: '品牌', slot: 'brand', index: 'brand', order: '', textAlign: 'center', width: '80px', minWidth: '80px'},
    {title: '采购员', slot: 'owner', index: 'owner', order: '', textAlign: 'center', width: '80px'},
    {title: '查看', slot: 'view', textAlign: 'center', width: '60px', minWidth: '60px'},
    {title: '操作', slot: 'action', textAlign: 'center', width: '60px', minWidth: '60px'},
    {title: '时间', slot: 'utime', index: 'utime', order: '', textAlign: 'center', width: '60px', minWidth: '60px'},
    {title: '操作员', slot: 'operator_name', index: 'operator_name', order: '', textAlign: 'center', width: '60px', minWidth: '60px'},
  ], list: <any>[],
  cost_price: 0, sale_price: 0, purchase_price: 0, market_price: 0, num: 0,
  print: 0, total: 0,
  is_sku: {label: '校对商品', value: 'is_sku', checked: true},
  remove: {show: false, type: '', title: '', info: '', data: <any>[]},
  refresh: false,
});
// 动作
const imp = ref({show: false, title: '导入'});
const exp = ref({show: false, title: '拆分', info:{}});
// 图片预览
const imgShow = ref(false);
const imgIndex = ref(0);
const imgData = ref([]);

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
  if(val) {
    // 重置
    goods.value.key = '';
    goods.value.refresh = false;
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
  if(props.data.status == 0) {
    if(key.length == 0) return;
    goodsAdd([{ sku_id: key, num: 1 }]);
  } else {
    goodsList(key);
  }
}

/* 商品-列表 */
const goodsList = (key: string=''): void => {
  // 重置
  goods.value.list = [];
  goodsTotal(false);
  // 加载
  const load: any = Ui.Loading();
  Request.Post('erp_purchase_out/goods_list?lang=' + state.lang, {
    token: state.token,
    id: props.data.id,
    order: goods.value.order,
    sku_id: key,
  }, (res: any) => {
    load.clear();
    const {code, msg, data}: any = res.data;
    if(code == 0) {
      goods.value.list = data;
      clearSelect();
      // 统计价格
      goodsTotal(false);
    } else Ui.Toast(msg);
  });
}
/* 商品资料-统计 */
const goodsTotal = (refresh: boolean): void => {
  const list: Array<any> = goods.value.list;
  goods.value.cost_price = 0;
  goods.value.sale_price = 0;
  goods.value.purchase_price = 0;
  goods.value.market_price = 0;
  goods.value.num = 0;
  const index: number = list.length - 1;
  const sku_tmp: string = index >= 0 ? list[index].sku_id : '';
  let num: number = 0;
  let ratio: number = 0;
  exp.value.info = {};
  for(let v of list) {
    if(!v.ratio) continue;
    num = parseInt(v.num);
    ratio = parseFloat(v.ratio);
    goods.value.cost_price += parseFloat(v.cost_price) * num * ratio;
    goods.value.sale_price += parseFloat(v.sale_price) * num * ratio;
    goods.value.purchase_price += parseFloat(v.purchase_price) * num * ratio;
    goods.value.market_price += parseFloat(v.market_price) * num * ratio;
    goods.value.num += num;
    // 标记编码
    v.is_date = v.labels!='缅甸'&&sku_tmp.substring(0, 7)!=v.sku_id.substring(0, 7);
    // 品牌
    exp.value.info[v.brand] = exp.value.info[v.brand]?exp.value.info[v.brand]+1:num;
  }
  // 刷新
  if(refresh) goods.value.refresh = true;
}

/* 商品-添加 */
const goodsAdd = (data: Array<any>, type: string=''): void => {
  for(let d of data) {
    // 是否校对
    const is_sku: boolean = goodsIsSku(d.sku_id);
    if(goods.value.is_sku.checked && is_sku) return Ui.Toast('[ ' + d.sku_id + ' ]已存在', 5000, 'danger');
    // 已存在
    if(is_sku) {
      for(let v of goods.value.list) {
        if(v.sku_id == d.sku_id) {
          v.num += parseInt(d.num);
          d.num = v.num;
          Ui.Toast('[ ' + d.sku_id + ' ]数量 ' + v.num + ' ');
        }
      }
    } else {
      goods.value.list.unshift({id: 's'+d.sku_id, sku_id: d.sku_id, num: d.num, loading: 0});
    }
  }
  // 导入
  if(type==='import') {
    goodsAddData(data);
  } else {
    // 延迟请求
    timeData.push(data[0]);
    clearTimeout(time);
    time = setTimeout(()=>{
      goodsAddData(timeData);
      timeData = [];
    }, 800);
  }
}
/* 商品-是否存在 */
const goodsIsSku = (sku_id: string): boolean => {
  let res: boolean = false;
  for(let v of goods.value.list) {
    if(v.sku_id == sku_id) res = true;
  }
  return res;
}
/* 商品-添加数据 */
const goodsAddData = (data: Array<any>): void => {
  let tmp: any = data;
  Request.Post('erp_purchase_out/goods_add?lang=' + state.lang, {
    token: state.token,
    id: props.data.id,
    ctime: props.data.ctime,
    wms_co_id: props.data.wms_co_id,
    data: data,
  }, (res: any) => {
    const {code, msg, data, err}: any = res.data;
    if(code===0) {
      // 全部更新
      goodsUpdate(data);
      goodsTotal(true);
    } else if(code===5000) {
      Ui.Toast(msg, 5000, 'danger');
      // 部分更新
      if(data && data.length>0) goodsUpdate(data);
      if(err && err.length>0) {
        const list: any = goods.value.list;
        for(let sku_id of err) {
          for(let i in list) if(sku_id==list[i].sku_id) list[i].loading=1;
        }
      }
    } else {
      if(msg) Ui.Toast(msg);
      else goodsUpdate(tmp, true);
    }
  }, () => {
    goodsUpdate(tmp, true);
  });
}
/* 商品-更新数据 */
const goodsUpdate = (data: Array<any>, isLoad: boolean=false): void => {
  if(data.length == 0) return;
  const list: any = goods.value.list;
  for(let k in data) {
    // 品牌
    if(data[k].brand!=props.data.brand) Ui.Toast('[ '+data[k].sku_id+' ]品牌为“'+data[k].brand+'”不等于“'+props.data.brand+'”', 5000, 'danger');
    // 覆盖数据
    for(let i in list) {
      if(list[i].sku_id == data[k].sku_id) {
        if(isLoad) list[i].loading = 1;
        else list[i] = data[k];
        continue;
      }
    }
  }
}

/* 商品-数量 */
const goodsNum = (e: any, id: string, sku_id: string): void => {
  const num: number = parseInt(e);
  if(num.toString() == 'NaN') return Ui.Toast('请输入数字');
  // 更新
  for(let v of goods.value.list) {
    if(v.sku_id == sku_id) v.num = num;
  }
  // 请求
  Request.Post('erp_purchase_out/goods_num?lang=' + state.lang, {
    token: state.token,
    id: id,
    num: num,
    sku_id: sku_id,
    pid: props.data.id,
    ctime: props.data.ctime,
    wms_co_id: props.data.wms_co_id,
  }, (res: any) => {
    const {code, msg}: any = res.data;
    if(code == 0) {
      Ui.Toast(msg);
      // 统计价格
      goodsTotal(true);
    } else Ui.Toast(msg, 5000, 'danger');
  });
}

/* 商品-移除 */
const goodsRemove = (type: string, row: any = {}): void => {
  goods.value.remove.type = type;
  goods.value.remove.data = [];
  if(type == 'one') {
    goods.value.remove.show = true;
    goods.value.remove.title = '移除" ' + row.sku_id + ' "';
    goods.value.remove.info = '是否移除单条数据?';
    goods.value.remove.data = [{ index: row.index, id: row.id, sku_id: row.sku_id, num: row.num }];
  } else if(type=='part') {
    const list: Array<any> = tableList.value.getData();
    if(list.length==0) return Ui.Toast('请选择数据');
    goods.value.remove.show = true;
    goods.value.remove.title = '移除选中';
    goods.value.remove.info = '是否移除选中数据?';
    for(let v of list) {
      goods.value.remove.data.unshift({ index: v.index, id: v.id, sku_id: v.sku_id, num: v.num });
    }
  }
}
/* 商品-移除提交 */
const goodsRemoveSub = (): void => {
  goods.value.remove.show = false;
  const data = goods.value.remove.data;
  const list = goods.value.list;
  let sku: Array<any> = [];
  for(let v of data) {
    // 未加载
    if(v.id.toString().substring(0, 1) == 's') {
      list.splice(v.index, 1);
      // 统计价格
      goodsTotal(true);
      continue;
    }
    sku.push({ index: v.index, id: v.id, sku_id: v.sku_id, num: v.num });
  }
  // 清理明细
  if(sku.length == 0) return;
  const load: any = Ui.Loading();
  Request.Post('erp_purchase_out/goods_remove?lang=' + state.lang, {
    token: state.token,
    id: props.data.id,
    ctime: props.data.ctime,
    wms_co_id: props.data.wms_co_id,
    data: sku,
  }, (res: any) => {
    load.clear();
    const {code, msg}: any = res.data;
    if(code == 0) {
      // 移除
      if(goods.value.remove.type == 'all') goods.value.list = [];
      else for(let v of sku) list.splice(v.index, 1);
      // 统计价格
      goodsTotal(true);
    } else {
      Ui.Toast(msg, 5000, 'danger');
    }
  });
}

/* 导入 */
const importData = (): void => {
  imp.value.show = true;
  imp.value.title = '导入';
}
/* 导入-回调 */
const importSubmit = (data: Array<any>): void => {
  if(data.length<1) return;
  goodsAdd(data, 'import');
}

/* 拆分 */
const explodeData = () => {
  exp.value.show = true;
  exp.value.title = '按品牌拆分';
}
const explodeSub = () => {
  exp.value.show = false;
  const load: any = Ui.Loading();
  Request.Post('erp_purchase_out/explode?lang=' + state.lang, {
    token: state.token,
    id: props.data.id,
  }, (res: any) => {
    load.clear();
    const {code, msg}: any = res.data;
    Ui.Toast(msg);
    if(code == 0) {
      // 刷新
      goods.value.refresh = true;
      close();
    }
  });
}

/* 商品-图片 */
const goodsView = (img: string): void => {
  let data: any = [];
  let i: number = 0;
  for(let v of goods.value.list) {
    if(!v.img) continue;
    if(v.img == img) imgIndex.value = i;
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
  for(let i in list) sku_id += list[i][name] + ' ';
  if(sku_id) Util.CopyText(sku_id);
  else Util.CopyText(val);
}

/* 商品-打印标签 */
const goodsPrint = (): void => {
  if(goods.value.print <= 0) return Ui.Toast('请选择!');
  const list: Array<any> = tableList.value.getData();
  let sku: Array<any> = [];
  for(let v of list) {
    sku.push({ sku_id: v.sku_id });
  }
  if(sku.length == 0) return Ui.Toast('请选择!');
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
  // 验证
  for(let v of goods.value.list) {
    // 品牌控制
    if(v.brand!=props.data.brand) Ui.Toast('[ '+v.sku_id+' ]品牌为“'+v.brand+'”不等于“'+props.data.brand+'”', 5000, 'danger');
    // 加载状态
    if(v.loading==0 || v.loading==1) return Ui.Toast('['+v.sku_id+']未加载完成!');
  }
  // 更新价格
  if(goods.value.refresh) {
    const load: any = Ui.Loading();
    Request.Post('erp_purchase_out/goods_price?lang=' + state.lang, {
      token: state.token,
      id: props.data.id,
      ctime: props.data.ctime,
    }, (res: any) => {
      load.clear();
      const {code, msg}: any = res.data;
      if(code!==0) Ui.Toast(msg, 5000, 'danger');
      // 事件
      emit('update:show', false);
      emit('submit', goods.value.refresh);
    });
  } else {
    // 事件
    emit('update:show', false);
    emit('submit', goods.value.refresh);
  }
}

</script>
