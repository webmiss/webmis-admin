<template>
  <wmDialog v-model:show="infoShow" :title="title" width="calc(100% - 40px)" maxWidth="1366px" overflow="auto" top="56px" bottom="0px" :bgClose="false" @close="close()">
    <template #top>
      <!-- 工具栏 -->
      <div class="goods_info flex">
        <ul class="goods_info_tools flex">
          <li>
            <wmInput v-model:value="goods.key" @keyup.enter="goodsSearch()" @iconClick="goodsSearch()" placeholder="调拨单号,多个空格分离" maxlength="32" icon="ui ui_search" iconAlign="right" padding="0 40px 0 10px"></wmInput>
          </li>
          <li>
            <wmButton type="primary" effect="text" padding="0 4px" @click="form.show=true;formData(form.key)">选择调拨单</wmButton>
          </li>
        </ul>
        <div class="goods_info_total scrollbar" style="max-width: calc(100% - 600px);">
          调出数: <b>{{ num }}</b> &nbsp;&nbsp;
          调入数: <b>{{ goods.out_num }}</b> &nbsp;&nbsp;
          标签价: <b>{{ priceEncode(goods.sale_price) }}</b> 元&nbsp;&nbsp;
          吊牌价: <b>{{ priceEncode(goods.market_price) }}</b> W&nbsp;&nbsp;
          数量: <b>{{ goods.num }}</b>
        </div>
      </div>
      <!-- 工具栏 End -->
    </template>
    <wmMain paddingY="4px">
      <!-- 商品资料 -->
      <wmTable ref="tableList" :columns="goods.columns" :options="goods.list" @orderBy="orderBy">
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
        <template #action="d">
          <div class="tCenter">
            <span v-if="d.status==0" class="c_danger">进行中</span>
            <span v-else-if="d.status==1" class="c_success">完成</span>
          </div>
        </template>
        <template #view="d">
          <div class="tCenter">
            <wmButton type="primary" effect="text" padding="0 4px" @click="state.goods.show=true;state.goods.sku_id=d.sku_id">{{ langs.flow }}</wmButton>
          </div>
        </template>
        <template #type_name="d">
          <div class="tCenter type">
            <span v-if="d.type=='6'" class="type_warning">{{ d.type_name || '-' }}</span>
            <span v-else-if="d.type=='5'" class="type_success">{{ d.type_name || '-' }}</span>
            <span v-else-if="d.type=='4'" class="type_warning">{{ d.type_name || '-' }}</span>
            <span v-else-if="d.type=='3'" class="type_success">{{ d.type_name || '-' }}</span>
            <span v-else-if="d.type=='2'" class="type_info">{{ d.type_name || '-' }}</span>
            <span v-else-if="d.type=='1'" class="type_danger">{{ d.type_name || '-' }}</span>
            <span v-else-if="d.type=='0'" class="type_primary">{{ d.type_name || '-' }}</span>
            <span v-else-if="d.type=='-1'" class="type_info">{{ d.type_name || '-' }}</span>
          </div>
        </template>
        <template #owner="d">
          <div class="tCenter">{{ d.owner || '-' }}</div>
        </template>
      </wmTable>
      <!-- 商品资料 End -->
    </wmMain>
  </wmDialog>
  <!-- 图片预览 -->
  <wmImgView v-model:show="imgShow" :index="imgIndex" :options="imgData"></wmImgView>
  <!-- 选择调拨单 -->
  <wmDialog v-model:show="form.show" title="选择调拨单" width="calc(100% - 40px)" maxWidth="1280px" overflow="auto" top="56px" bottom="40px" @close="form.show=false">
    <template #top>
      <!-- 工具栏 -->
      <div class="goods_info flex">
        <ul class="goods_info_tools flex">
          <li>
            <wmInput v-model:value="form.key" @keyup.enter="formSearch()" @iconClick="formSearch()" placeholder="单号、商品编码、备注" maxlength="32" icon="ui ui_search" iconAlign="right" padding="0 40px 0 10px"></wmInput>
          </li>
        </ul>
        <div class="goods_info_total scrollbar" style="max-width: calc(100% - 600px);">
          调出数: <b>{{ num }}</b>&nbsp;&nbsp;
          调入数: <b>{{ form.num }}</b> &nbsp;&nbsp;
          差异: <b>{{ num-form.num>0?num-form.num:form.num-num }}</b>
        </div>
      </div>
      <!-- 工具栏 End -->
    </template>
    <wmMain paddingY="4px">
      <!-- List -->
      <wmTable ref="formList" overflow="auto" :columns="form.columns" :options="form.list" @partially="selectState">
        <template #id="d">
          <div class="tCenter">{{ d.id }}</div>
        </template>
        <template #date="d">
          <div class="tCenter">
            <wmTag :title="'创建: '+d.ctime+'\n更新: '+d.utime+'\n制单: '+d.creater_name+', 审核: '+d.operator_name+'\n备注: '+d.remark">{{ d.utime.substr(0, 10) }}</wmTag>
          </div>
        </template>
        <template #type="d">
          <div class="tCenter">{{ d.type_name }}</div>
        </template>
        <template #num="d">
          <div class="tCenter">{{ d.num }}</div>
        </template>
        <template #total="d">
          <div class="tCenter">{{ d.total }}</div>
        </template>
        <template #status="d">
          <div v-if="d.status=='0'" class="flex_center status0">{{ d.status_name }}</div>
          <div v-else-if="d.status=='1'" class="flex_center status1">{{ d.status_name }}</div>
          <div v-else-if="d.status=='2'" class="flex_center status2">{{ d.status_name }}</div>
          <div v-else class="tCenter">{{ d.status_name }}</div>
        </template>
      </wmTable>
      <!-- List End -->
    </wmMain>
    <template #bottom>
      <wmButton height="40px" padding="0 32px" @click="formSubmit()">{{ langs.confirm }}</wmButton>
    </template>
  </wmDialog>
</template>

<style lang="less" scoped>
.status0,.status1,.status2{padding: 0 10px; border-radius: 2px;}
.status0{background-color: @Info6; color: @Info;}
.status1{background-color: @Warning6; color: @Warning;}
.status2{background-color: @Minor; color: #FFF;}
/* 类型 */
.type span{display: block; padding: 0 8px; line-height: 26px; border: #FFF 1px solid; border-radius: 2px;}
.type_primary{background-color: #FFF; color: @Primary;}
.type_info{background-color: @Info6; color: @BrandText;}
.type_success{background-color: @Success6; color: @Success;}
.type_warning{background-color: @Warning6; color: @Warning;}
.type_danger{background-color: #FFF; color: @Danger;}
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
import wmTag from '../../../components/tag/index.vue';
import wmInput from '../../../components/form/input/index.vue';
import wmButton from '../../../components/form/button/index.vue';
import wmImg from '../../../components/image/index.vue';
import wmImgView from '../../../components/image/view.vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},        // 是否显示
  title: {type: String, default: ''},           // 标题
  num: {type: Number, default: 0},            // 数量
  data: {type: Array, default: []},             // 数据
});
const emit = defineEmits(['update:show', 'submit']);
const tableList = ref();
const formList = ref();
/* 状态 */
const store = useStore();
const state = store.state;
const langs: any = state.langs;
const priceEncode: Function = Format.priceEncode;
/* 变量 */
const infoShow = ref(false);
let diffList = ref(<any>[]);
/* 货品 */
const goods = ref({
  key: '', order: '', columns: [
    { title: '序号', slot: 'index', width: '40px', minWidth: '30px', textAlign: 'center' },
    { title: langs.img, slot: 'img', width: '60px', textAlign: 'center' },
    { title: '商品编码', slot: 'sku_id', index: 'sku_id', width: '120px', minWidth: '120px' },
    { title: '款式编码', slot: 'i_id', index: 'i_id', textAlign: 'center', width: '80px' },
    { title: '标签价(元)', slot: 'sale_price', index: 'sale_price', textAlign: 'center', width: '100px' },
    { title: '吊牌价(W)', slot: 'market_price', index: 'market_price', textAlign: 'center', width: '100px' },
    { title: '单位', slot: 'unit', textAlign: 'center', width: '60px' },
    { title: '重量', slot: 'weight', index: 'weight', textAlign: 'center', width: '60px' },
    { title: '数量', slot: 'num', index: 'num', textAlign: 'center', width: '60px', minWidth: '60px' },
    { title: '状态', slot: 'action', index: 'status', textAlign: 'center', width: '60px', minWidth: '60px' },
    { title: '查看', slot: 'view', textAlign: 'center', width: '60px', minWidth: '60px' },
    { title: '类型', slot: 'type_name', textAlign: 'center', width: '60px' },
    { title: '采购员', slot: 'owner', textAlign: 'center', width: '60px' },
    { title: '仓库', index: 'warehouse' },
  ], list: <any>[],
  sale_price: 0, market_price: 0, num: 0, out_num: 0,
});
/* 表单 */
const form = ref({
  show: false, key: '', order: '', columns: [
    { title: '单号', index: 'id', slot: 'id', width: '100px', textAlign: 'center' },
    { title: langs.date, index: 'date', slot: 'date', width: '90px', textAlign: 'center' },
    { title: '类型', slot: 'type', width: '80px', minWidth: '80px', textAlign: 'center' },
    { title: '调出仓', index: 'go_co_name' },
    { title: '调入仓', index: 'link_co_name' },
    { title: '数量', slot: 'num', textAlign: 'center' },
    { title: '条数', slot: 'total', textAlign: 'center' },
    { title: '状态', slot: 'status', width: '80px', minWidth: '80px', textAlign: 'center' },
    { title: '制单员', index: 'creater_name', textAlign: 'center' },
    { title: '备注', index: 'remark' },
  ], list: <any>[], total: 0, num: 0,
});
/* 图片预览 */
const imgShow = ref(false);
const imgIndex = ref(0);
const imgData = ref([]);

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
  if(val){
    // 列表数据
    diffList.value = [];
    for(let id of props.data){
      Request.Post('erp_purchase_allocate_out/goods_list?lang=' + state.lang, {
      token: state.token,
      id: id,
    }, (res: any) => {
      const {code, msg, data}: any = res.data;
      if(code===0){
        // 是否存在
        for(let v of data){
          diffList.value.push(v);
        }
      } else Ui.Toast(msg);
    });
    }
  }
},{ deep: true });

/* 排序 */
const orderBy = (val: string): void => {
  goods.value.order = val;
  goodsList(goods.value.key);
}

/* 搜索 */
const goodsSearch = (): void => {
  const key: string = Util.LTrim(goods.value.key.trim().toUpperCase(), '0');
  goodsList(key);
}

/* 数据 */
const goodsList = (key: string): void => {
  goods.value.list = [];
  goods.value.out_num = 0;
  // 查询
  const ids: Array<string> = key.split(' ');
  for(let id of ids){
    const load: any = Ui.Loading();
    Request.Post('erp_purchase_allocate_out/goods_list?lang=' + state.lang, {
      token: state.token,
      id: id,
    }, (res: any) => {
      load.clear();
      const {code, msg, data}: any = res.data;
      if(code===0){
        // 是否存在
        for(let v of data){
          goods.value.out_num += v.num;
          if(!inArray(v.sku_id)){
            // 商品
            goods.value.list.push({'sku_id': v.sku_id});
            // 流向
            goodsDirect(v.sku_id);
          }
        }
      } else Ui.Toast(msg);
    });
  }
}
/* 是否存在 */
const inArray = (sku_id: string=''): boolean => {
  for(let v of diffList.value as any){
    if(sku_id===v.sku_id) return true;
  }
  return false;
}
/* 查询流向 */
const goodsDirect = (sku_id: string): void => {
  Request.Post('goods/direct?lang='+state.lang, {
    token: state.token,
    sku_id: sku_id,
    time: 24,
  }, (res: any)=>{
    const {code, msg, data} = res.data;
    if(code===0){
      if(data.list.length===0) return;
      for(let i in goods.value.list){
        if(goods.value.list[i].sku_id==data.list[0].sku_id){
          goods.value.list[i]=data.list[0];
          // 统计
          getTotal();
        }
      }
    } else {
      Ui.Toast(msg);
    }
  });
}
/* 统计 */
const getTotal = (): void => {
  goods.value.sale_price = 0;
  goods.value.market_price = 0;
  goods.value.num = 0;
  for(let v of goods.value.list){
    goods.value.sale_price += v.sale_price*v.num;
    goods.value.market_price += v.market_price*v.num;
    goods.value.num += v.num;
  }
}

/* 选择调拨单*/
const formSearch = (): void => {
  const key: string = Util.LTrim(form.value.key.trim().toUpperCase(), '0');
  form.value.key = '';
  formData(key);
}
/* 选择调拨单-数据 */
const formData = (key: string): void => {
  // 列表
  form.value.list = [];
  const load: any = Ui.Loading();
  Request.Post('erp_purchase_allocate_out/list?lang=' + state.lang, {
    token: state.token,
    data: {
      key: key,
    },
    page: 1,
    limit: 30,
    order: '',
  }, (res: any) => {
    load.clear();
    const {code, msg, data, time}: any = res.data;
    if(code===0){
      form.value.list = data;
      nextTick(()=>{
        formList.value.checkboxAll(false);
      });
    } else Ui.Toast(msg);
  });
}
/* 选择入库单-选中状态 */
const selectState = (n: number, t: number): void => {
  form.value.total = n;
  form.value.num = 0;
  const data: Array<any> = formList.value.getData();
    for(let v of data){
      form.value.num += parseInt(v.num);
    }
}
/* 选择调拨单-确认 */
const formSubmit = (): void => {
  const list: Array<any> = formList.value.getData();
  if(list.length==0) return Ui.Toast('请选择调拨单');
  let ids: Array<any> = [];
  for(let v of list) ids.push(v.id);
  form.value.show = false;
  goods.value.key = ids.join(' ');
  goodsSearch();
}

/* 商品-图片 */
const goodsView = (img: string): void => {
  let data: any = [];
  let i: number = 0;
  for(let v of goods.value.list){
    if(!v.img) continue;
    if(v.img===img) imgIndex.value = i;
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

/* 关闭 */
const close = (): void => {
  diffList.value = [];
  goods.value.key = '';
  goods.value.list = [];
  goods.value.num = 0;
  goods.value.out_num = 0;
  goods.value.sale_price = 0;
  goods.value.market_price = 0;
  emit('update:show', false);
}

</script>
