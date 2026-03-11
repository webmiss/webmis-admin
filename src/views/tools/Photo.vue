<template>
  <div ref="PhotoView" class="wm-photo_body" :style="{visibility:show?'inherit':'hidden'}" @scroll="Scroll">
    <!-- 搜索 -->
    <div class="wm-photo_search flex">
      <ul class="wm-photo_tools flex">
        <li class="search">
          <i class="ui ui_search" @click="search()"></i>
          <input v-model="seaKey" type="text" placeholder="圈口、颜色，多个空格分隔" style="width: 220px; padding: 0 40px 0 10px;" @keyup.enter="search()">
        </li>
        <li class="link" :class="form.category==='手镯'?'active':''" @click="changeCategory('手镯')">手镯</li>
        <li class="link" :class="form.category==='挂件'?'active':''" @click="changeCategory('挂件')">挂件</li>
        <li class="line"></li>
        <li class="link" :class="form.time==='1'?'active':''" @click="changeTime('1')">近1月</li>
        <li class="link" :class="form.time==='3'?'active':''" @click="changeTime('3')">近3月</li>
        <li class="link" :class="form.time==='6'?'active':''" @click="changeTime('3')">近6月</li>
        <li class="link" :class="form.time==='12'?'active':''" @click="changeTime('12')">近1年</li>
        <li class="line"></li>
        <li class="text">价格区间</li>
        <li style="padding: 0;">
          <input v-model="form.price1" type="text" placeholder="最低价" style="width: 90px; padding: 0 10px;" @keyup.enter="search()">
        </li>
        <li style="padding: 0;">至</li>
        <li style="padding: 0;">
          <input v-model="form.price2" type="text" placeholder="最高价" style="width: 90px; padding: 0 10px;" @keyup.enter="search()">
        </li>
        <li class="line"></li>
        <li class="link" style="padding: 0 8px;" @click="OrderBy('utime')">
          时间
          <div class="order">
            <i class="ui ui_arrow_up" :class="order.utime=='DESC'?'active':''"></i>
            <i class="ui ui_arrow_down" :class="order.utime=='ASC'?'active':''"></i>
          </div>
        </li>
        <li class="link" style="padding: 0 8px;" @click="OrderBy('sale_price')">
          价格
          <div class="order">
            <i class="ui ui_arrow_up" :class="order.sale_price=='DESC'?'active':''"></i>
            <i class="ui ui_arrow_down" :class="order.sale_price=='ASC'?'active':''"></i>
          </div>
        </li>
        <li class="link" style="padding: 0 8px;" @click="OrderBy('stock')">
          库存
          <div class="order">
            <i class="ui ui_arrow_up" :class="order.stock=='DESC'?'active':''"></i>
            <i class="ui ui_arrow_down" :class="order.stock=='ASC'?'active':''"></i>
          </div>
        </li>
      </ul>
      <div class="close" @click="close()">
        <i class="ui ui_close"></i>
      </div>
    </div>
    <!-- 列表 -->
    <ul class="wm-photo_list" v-if="page.list.length>0">
      <li v-for="v in page.list">
        <div class="info" @click="v.img?goodsView(v.img):''">
          <div class="sku_id flex">
            <b>{{ v.sku_id }}</b>
            <span @click.stop="state.goods.show=true;state.goods.sku_id=v.sku_id">流向</span>
          </div>
          <div class="other">
            <p>{{ v.properties_value }}</p>
          </div>
        </div>
        <img :src="v.img+'&x-oss-process=image/resize,h_320'" :alt="v.sku_id">
        <div class="price flex">
          <span>￥<b>{{ formatPrice(v.sale_price) }}</b></span>
          <span>{{ v.stock }}件</span>
        </div>
      </li>
    </ul>
    <div class="null" v-else></div>
    <!-- 列表 End -->
  </div>
  <!-- 图片预览 -->
  <wmImgView v-model:show="imgView.show" :index="imgView.index" :options="imgView.imgs"></wmImgView>
</template>

<style lang="less" scoped>
/* 内容 */
.wm-photo_body{overflow-y: auto; position: fixed; z-index: 999; width: 100%; min-width: 1280px; height: 100%; color: #FFF; background-color: rgba(0,0,0,0.9); opacity: 0; transition: @Transition;}
.wm-photo_body .img{position: relative; background-position: center; background-repeat: no-repeat; background-size: cover;}
.wm-photo_body .null{height: calc(100% - 60px); display: flex; justify-content: center; align-items: center;}
/* 搜索 */
.wm-photo_search{position: sticky; z-index: 99; top: 0; padding: 10px 16px; width: calc(100% - 32px); height: 36px; line-height: 36px; background-color: #222; border-top: #000 1px solid; border-bottom: #000 1px solid;}
.wm-photo_search input{height: 36px; background-color: #55555575; border: #000 1px solid; color: #FFF; border-radius: 4px; box-sizing: border-box;}
.wm-photo_search input:focus{outline: none; border-color: @Minor; box-shadow: none;}
.wm-photo_search .close{cursor: pointer; width: 36px; height: 36px; background-color: #55555575; border-radius: 50%; display: flex; justify-content: center; align-items: center; transition: @Transition;}
.wm-photo_search .close:hover{background-color: @Minor;}
.wm-photo_tools{overflow: hidden;}
.wm-photo_tools li{position: relative; margin: 0 8px; padding: 0 4px;}
.wm-photo_tools .search i{cursor: pointer; position: absolute; right: 0; width: 40px; height: 36px; text-align: center; font-size: 20px;}
.wm-photo_tools .search i:hover{color: @Minor;}
.wm-photo_tools .link{cursor: pointer; color: #FFF;}
.wm-photo_tools .link:hover{color: @Minor;}
.wm-photo_tools .link.active{color: @Minor; font-weight: bold;}
.wm-photo_tools .text{color: #999;}
.wm-photo_tools .line::before{content:''; position: absolute; top: 50%; transform: translateY(-50%); width: 1px; height: 60%; background-color: #000;}
.wm-photo_tools .order{zoom: 0.9; position: absolute; top: 50%; right: -8px; transform: translateY(-50%); width: 16px; height: 16px; display: flex; justify-content: flex-start; flex-wrap: wrap;}
.wm-photo_tools .order i{width: 100%; height: 8px; line-height: 8px; font-size: 10px; text-align: center; color: #999;}
.wm-photo_tools .order i.active{color: @Minor;}
/* 列表 */
.wm-photo_list{overflow: hidden; padding: 16px; width: calc(100% - 40px); display: flex; justify-content: flex-start; flex-wrap: wrap;}
.wm-photo_list li{overflow: hidden; position: relative; background-color: #222; margin: 8px; width: calc(100%/8 - 20px); border-radius: 8px; box-sizing: border-box;}
.wm-photo_list li:hover .info{display: block;}
.wm-photo_list img{width: 100%;}
.wm-photo_list .info{display: none; cursor: pointer; position: absolute; width: 100%; height: calc(100% - 48px); background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%);}
.wm-photo_list .info .sku_id{position: absolute; top: 0; width: calc(100% - 20px); line-height: 40px; padding: 0 10px;}
.wm-photo_list .info .sku_id b{font-size: 16px;}
.wm-photo_list .info .sku_id span{font-size: 14px; color: #FFF;}
.wm-photo_list .info .sku_id span:hover{color: @Minor;}
.wm-photo_list .info .other{position: absolute; bottom: 0; width: calc(100% - 20px); padding: 4px 10px;}
.wm-photo_list .info .other p{line-height: 24px;}
.wm-photo_list .price{padding: 0 10px; height: 48px; line-height: 48px;}
.wm-photo_list .price b{font-size: 16px;}

/* 响应式布局 */
@media screen and ( max-width: 1920px ){
  .wm-photo_list li{width: calc(100%/6 - 16px);}
}
@media screen and ( max-width: 1600px ){
  .wm-photo_list li{width: calc(100%/5 - 16px);}
}
@media screen and ( max-width: 1366px ){
  .wm-photo_list li{width: calc(100%/4 - 16px);}
}
@media screen and ( max-width: 1280px ){
  .wm-photo_list li{width: calc(100%/4 - 16px);}
}
@media screen and ( max-width: 1024px ){
  .wm-photo_list li{width: calc(100%/3 - 16px);}
}
@media screen and ( max-width: 640px ){
  .wm-photo_list li{width: calc(100%/2 - 16px);}
}
@media screen and ( max-width: 320px ){
  .wm-photo_list li{width: calc(100%/1 - 16px);}
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../library/ui';
import Request from '../../library/request';
import Format from '../../library/format';
/* 组件 */
import wmImgView from '../../components/image/view.vue';

/* 参数 */
// @ts-ignore
const props = defineProps({
  show: {type: Boolean, default: false},          // 是否显示
  lower: {type: Number, default: 120},            // 底部距离
  loading: {type: Boolean, default: false},       // 加载中
  finished: {type: Boolean, default: false},      // 已完成
});
const emit = defineEmits(['update:show']);
// 状态
const store = useStore();
const state = store.state;
// 变量
const PhotoView = ref(null);
const seaKey = ref('');
const is_loading = ref(false);
const is_finished = ref(false);
/* 数据 */
const page = ref({total:0, num:1, limit:50, list:<any>[]});
const form = ref({key:'', price1:'', price2:'', category:'', time:'1'});
const order = ref({utime:'DESC', sale_price:'', stock:'DESC'});
// 图片预览
const imgView = ref({show: false, index:0, imgs:[]});

/* 监听 */
watch(()=>props.show, (val:Boolean)=>{
  if(val){
    // 显示
    (PhotoView.value as any).style.opacity = '1';
    // 刷新
    onRefresh();
  }
});

/* 刷新 */
const onRefresh = (): void => {
  page.value.num = 1;
  is_loading.value = false;
  is_finished.value = false;
  LoadData();
}

/* 滚动 */
const Scroll = (): void => {
  const el: any = PhotoView.value;
  const isBottom: boolean = el.scrollTop+el.clientHeight >= el.scrollHeight-props.lower;
  if(isBottom && !is_loading.value && !is_finished.value) {
    is_loading.value = true;
    page.value.num++;
    LoadData();
  }
}

/* 搜索 */
const search = (): void => {
  form.value.key = seaKey.value.trim();
  // 刷新
  onRefresh();
}

/* 切换分类 */
const changeCategory = (name: string): void => {
  if(form.value.category==='') form.value.category = name;
  else form.value.category = form.value.category===name?'':name;
  // 刷新
  onRefresh();
}

/* 切换时间 */
const changeTime = (name: string): void => {
  if(form.value.time==='') form.value.time = name;
  else form.value.time = form.value.time===name?'':name;
  // 刷新
  onRefresh();
}

/* 排序 */
const OrderBy = (name: string): void => {
  let obj: any = order.value
  if(obj[name]==='ASC') obj[name] = 'DESC';
  else if(obj[name]==='DESC') obj[name] = '';
  else obj[name] = 'ASC';
  // 刷新
  onRefresh();
}

/* 加载数据 */
const LoadData = (): void => {
  if(page.value.num===1) page.value.list=[];
  const load: any = Ui.Loading();
  Request.Post('goods/img_list?lang='+state.lang, {
    token: state.token,
    data: form.value,
    page: page.value.num,
    limit: page.value.limit,
    order: order.value,
  }, (res:any)=>{
    load.clear();
    const {code, data} = res.data;
    if(code===0) {
      if(page.value.num===1) {
        page.value.list = data;
      } else {
        page.value.list = page.value.list.concat(data);
        is_loading.value = false;
        if(data.length===0) is_finished.value = true;
      }
    }
  }, ()=>load.clear());
}

/* 价格 */
const formatPrice = (val: number): string => {
  return Format.priceEncode(val.toString());
}

/* 预览图片 */
const goodsView = (img: string): void => {
  let data: any = [];
  let i: number = 0;
  for(let v of page.value.list){
    if(!v.img) continue;
    if(v.img===img) imgView.value.index = i;
    data.push({label: v.sku_id, value: v.img, other: { '颜色及规格': v.properties_value, '标签价': formatPrice(v.sale_price) + '元' } });
    i++;
  }
  imgView.value.show = true;
  imgView.value.imgs = data;
}

/* 关闭 */
const close = (): void => {
  // 隐藏
  emit('update:show', false);
  (PhotoView.value as any).style.opacity = '0';
}

</script>