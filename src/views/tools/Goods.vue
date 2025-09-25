<template>
  <div ref="GoodsDirect" class="wm-goods_body flex" :style="{visibility:show?'inherit':'hidden'}">
    <div class="wm-goods_left scrollbar">
      <div class="search">
        <wmInput v-model:value="seaKey" @keyup.enter="search()" @iconClick="search()" :placeholder="state.langs.sku_id" maxlength="32" icon="ui ui_search" iconAlign="right" padding="0 40px 0 10px" margin="0 5px 0 0"></wmInput>
      </div>
      <div class="img"
        :style="{backgroundImage: list.info.img?'url('+list.info.img+'&x-oss-process=image/resize,h_260)':''}"
        @click="list.info.img?imgView([{label:list.info.sku_id, value:list.info.img, other:{'颜色及规格':list.info.properties_value, '标签价':list.info.sale_price+'元', '吊牌价':list.info.market_price+'W'}}]):''"
        :title="list.info.img?'预览图片':'请上传封面图'"
      >
        <i class="ui ui_image" v-if="!list.info.img"></i>
      </div>
      <ul class="info">
        <li class="flex">
          <span class="name">商品编码</span>
          <span class="value"><b>{{ list.info.sku_id || '-' }}</b></span>
        </li>
        <li class="flex">
          <span class="name">创建时间</span>
          <span class="value">{{ list.info.ctime || '-' }}</span>
        </li>
        <li class="flex">
          <span class="name">更新时间</span>
          <span class="value">{{ list.info.utime || '-' }}</span>
        </li>
        <li class="flex">
          <span class="name">商品名称</span>
          <span class="value">{{ list.info.name || '-' }}</span>
        </li>
        <li class="flex">
          <span class="name">颜色及规格</span>
          <span class="value">{{ list.info.properties_value || '-' }}</span>
        </li>
        <li class="flex">
          <span class="name">暗码</span>
          <span class="value">{{ list.info.short_name || '-' }}</span>
        </li>
        <li class="flex">
          <span class="name">款式编码</span>
          <span class="value">{{ list.info.i_id || '-' }}</span>
        </li>
        <li class="flex">
          <span class="name">标签价(元)</span>
          <b class="value">{{ list.info.sale_price!='0.00'?priceEncode(list.info.sale_price):'0.00' }}</b>
        </li>
        <li class="flex">
          <span class="name">吊牌价(W)</span>
          <b class="value">{{ list.info.market_price!='0.00'?priceEncode(list.info.market_price):'0.00' }}</b>
        </li>
        <li class="flex">
          <span class="name">单位</span>
          <span class="value">{{ list.info.unit || '' }}</span>
        </li>
        <li class="flex">
          <span class="name">重量</span>
          <span class="value">{{ list.info.weight || '-' }}</span>
        </li>
        <li class="flex">
          <span class="name">折扣</span>
          <b class="value">{{ list.info.ratio || '-' }}</b>
        </li>
        <li class="flex">
          <span class="name">标签</span>
          <span class="value">{{ list.info.labels || '-' }}</span>
        </li>
        <li class="flex">
          <span class="name">分类</span>
          <span class="value">{{ list.info.category || '-' }}</span>
        </li>
        <li class="flex">
          <span class="name">品牌</span>
          <span class="value">{{ list.info.brand || '-' }}</span>
        </li>
        <li class="flex">
          <span class="name">采购员</span>
          <span class="value">{{ list.info.owner || '-' }}</span>
        </li>
      </ul>
    </div>
    <div class="wm-goods_right">

      <!-- 导航 -->
      <div class="wm-goods_right_top flex">
        <ul class="tabs flex">
          <li v-for="(v,k) in tabs.list" :key="k" :class="v.value==tabs.active?'active':''" @click="changeTabs(v.value)">{{ v.label }}</li>
        </ul>
        <div class="close" @click="close()">
          <i class="ui ui_close"></i>
        </div>
      </div>

      <!-- 货品信息 -->
      <div class="wm-goods_right_ct" v-if="tabs.active=='info'">
        <!-- 货品流向 -->
        <div class="box direct">
          <div class="box_top flex">
            <h2>货品流向</h2>
            <div class="total scrollbar">
              <div class="total_info">
                {{ state.langs.goods_stock }}: <b>{{ list.direct.total.total || '0' }}</b>&nbsp;&nbsp;
                {{ state.langs.goods_num_in }}( <b>{{ list.direct.total.num_in || '0' }}</b> )
                {{ state.langs.goods_num_out }}( <b>{{ list.direct.total.num_out || '0' }}</b> )
                {{ state.langs.goods_allocate }}( <b>{{ list.direct.total.allocate || '0' }}</b> )
                {{ state.langs.goods_num_order }}( <b>{{ list.direct.total.num_order || '0' }}</b> )
                {{ state.langs.goods_num_refund }}( <b>{{ list.direct.total.num_refund || '0' }}</b> )
                {{ state.langs.goods_other_out }}( <b>{{ list.direct.total.other_out || '0' }}</b> )
                {{ state.langs.goods_other_in }}( <b>{{ list.direct.total.other_in || '0' }}</b> )
              </div>
            </div>
            <ul class="time flex">
              <li v-for="(v,k) in days" :key="k" :class="v.value==form.times?'active':''" @click="changeDay(v.value)">{{ v.label }}</li>
              <li class="line">|</li>
              <li @click="goodsDirectExport()">导出</li>
            </ul>
          </div>
          <div class="box_ct scrollbar">
            <wmTable :isCheckbox="false" :columns="list.direct.columns" :options="list.direct.data" >
              <template #index="d">
                <div class="tCenter color2">{{list.direct.data.length-d.index}}</div>
              </template>
              <template #id="d">
                <div class="tCenter">{{ d.pid }}</div>
              </template>
              <template #ctime="d">
                <div class="tCenter">
                  <wmTag size="medium" :title="'创建: '+d.ctime+'\n更新: '+d.utime+'\n单号: '+d.pid+'\n制单: '+d.creator+', 审核: '+d.operator+'\n备注: '+d.remark">{{ d.ctime.substr(0,10) }}</wmTag>
                </div>
              </template>
              <template #type="d">
                <div class="tCenter type">
                  <span v-if="d.type=='6'" class="type_warning">其它退</span>
                  <span v-else-if="d.type=='5'" class="type_success">其它出</span>
                  <span v-else-if="d.type=='4'" class="type_warning">售后</span>
                  <span v-else-if="d.type=='3'" class="type_success">发货</span>
                  <span v-else-if="d.type=='2'" class="type_info">调拨</span>
                  <span v-else-if="d.type=='1'" class="type_danger">采退</span>
                  <span v-else-if="d.type=='0'" class="type_primary">入库</span>
                  <span v-else-if="d.type=='-1'" class="type_info">资料</span>
                </div>
              </template>
              <template #sale_price="d">
                <div class="tRight">
                  <template v-if="d.sale_price>0">
                    <span v-if="d.ratio!='1.00' || d.ratio_sale!='1.00'">
                      <del>{{ priceEncode(d.sale_price) }}</del> <b>{{ priceEncode(d.sale_price*(d.ratio<1?d.ratio:d.ratio_sale)) }}</b>
                    </span>
                    <b v-else>{{ priceEncode(d.sale_price) }}</b>
                  </template>
                  <span v-else>-</span>
                </div>
              </template>
              <template #market_price="d">
                <div class="tRight">
                  <template v-if="d.market_price>0">
                    <span v-if="d.ratio!='1.00' || d.ratio_market!='1.00'">
                      <del>{{ priceEncode(d.market_price) }}</del> <b>{{ priceEncode(d.market_price*(d.ratio<1?d.ratio:d.ratio_market)) }}</b>
                    </span>
                    <b v-else>{{ priceEncode(d.market_price) }}</b>
                  </template>
                  <span v-else>-</span>
                </div>
              </template>
              <template #ratio="d">
                <div class="tCenter">
                  <b v-if="d.ratio<1">{{ d.ratio }}</b>
                  <span v-else>{{ d.ratio }}</span>
                </div>
              </template>
              <template #state="d">
                <div class="tCenter">
                  <span v-if="d.state=='0'" class="c_danger">进行中</span>
                  <span v-else-if="d.state=='1'" class="c_success">完成</span>
                </div>
              </template>
            </wmTable>
          </div>
        </div>
        <!-- 分仓库存 -->
        <div class="box stock">
          <div class="box_top flex">
            <h2>分仓库存</h2>
          </div>
          <div class="box_ct scrollbar">
            <wmTable :isCheckbox="false" :columns="list.stock.columns" :options="list.stock.data" >  
            </wmTable>
          </div>
        </div>
        <!-- 操作日志 -->
        <div class="box logs">
          <div class="box_top flex">
            <h2>操作日志</h2>
          </div>
          <div class="box_ct scrollbar">
            <wmTable :isCheckbox="false" :columns="list.logs.columns" :options="list.logs.data" >
              <template #operator="d">
                <div :title="'ID: '+d.operator_id">{{ d.operator_name }}</div>
              </template>
            </wmTable>
          </div>
        </div>
      </div>
      <!-- 货品信息 End -->

      <!-- 封面图 -->
      <div class="wm-goods_img_body scrollbar" v-else-if="tabs.active=='img'">
        <ul ref="imgContent" class="wm-goods_img_list flex_left">
          <li v-for="(v,k) in list.imgs" :key="k">
            <div class="img_body">
              <div class="img"
                :style="{backgroundImage: v.img?'url('+v.img+'&x-oss-process=image/resize,h_160)':''}"
                @click="v.img?imgViews(k):imgFile(k)"
                :title="v.img?'预览图片':'重新上传'"
              >
                <i class="ui ui_image" v-if="!v.img"></i>
                <div class="load" v-if="!v.state" :style="{backgroundImage: 'linear-gradient(to right, rgb(85, 153, 85), rgb(85, 153, 85) '+v.loaded+', rgba(0, 0, 0, 0.08) '+v.loaded+', rgba(0, 0, 0, 0.08) 100%)'}"></div>
                <div class="close" v-if="v.img" @click.stop="imgRemove(k)" title="删除封面图"><i class="ui ui_close"></i></div>
              </div>
              <div class="name" title="货品信息">
                <b class="an" @click="goodsInfo(k)">{{ k }}</b>
              </div>
            </div>
          </li>
          <li>
            <div class="img_body">
              <div class="img" @click="imgFiles()" title="批量上传: 以商品编码命名的图片">
                <i class="ui ui_upload"></i>
              </div>
              <div class="name">
                <span class="an" @click="imgFiles()">批量上传</span>
                <span>|</span>
                <span class="clear" @click="list.imgs={}">清空</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 封面图 End -->

      <!-- 摄象头 -->
      <div class="wm-goods_right_ct wm-goods_photo_body" v-else-if="tabs.active=='photo'">
        <div class="photo_tools flex">
          <span @click="photo.screen=!photo.screen">横屏/竖屏</span>
          <span @click="photo.camera=!photo.camera">翻转画面</span>
        </div>
        <!-- 拍照 -->
        <div class="photo_button" @click.stop="photoSave()">拍照上传</div>
        <!-- 视频 -->
        <video id="GoodsVideo" class="barcode"></video>
        <video id="GoodsPhotoVideo" :style="{width: photo.screen?'100%':'', height: !photo.screen?'100%':'', transform:'translate(-50%, -50%) scaleX('+(photo.camera?1:-1)+')'}" class="center" autoplay></video>
        <canvas id="GoodsPhotoCanvas" class="center"></canvas>
      </div>
      <!-- 摄象头 End -->

    </div>

    <!-- 图片预览 -->
    <wmImgView v-model:show="imgShow" :index="imgIndex" :options="imgData"></wmImgView>

  </div>
  
</template>

<style lang="less" scoped>
/* 样式 */
.type span{display: block; padding: 0 8px; line-height: 26px; border: #FFF 1px solid; border-radius: 2px;}
.type_primary{background-color: #FFF; color: @Primary;}
.type_info{background-color: @Info6; color: @BrandText;}
.type_success{background-color: @Success6; color: @Success;}
.type_warning{background-color: @Warning6; color: @Warning;}
.type_danger{background-color: #FFF; color: @Danger;}
/* 内容 */
.wm-goods_body{position: fixed; z-index: 1000; width: 100%; height: 100%; background-color: #F2F4F8; opacity: 0; transition: @Transition;}
.wm-goods_body .img{cursor: pointer; background-position: center; background-repeat: no-repeat; background-size: cover;}
.wm-goods_left{overflow-y: auto; padding: 0 16px; width: 280px; height: 100%; background-color: #FFF; border-right: #F2F4F8 1px solid; box-sizing: border-box;}
.wm-goods_left .search{padding: 8px 0; line-height: 40px;}
.wm-goods_left .img{width: 100%; height: 250px; line-height: 250px; text-align: center; background-color: #F8F8F8; border-radius: 4px;}
.wm-goods_left .img i{font-size: 48px; color: @IconColor;}
.wm-goods_left .info{overflow: hidden; padding: 8px 0;}
.wm-goods_left .info li{padding: 4px 0; line-height: 24px;}
.wm-goods_left .info .name{color: @SecondaryText; font-size: 13px;}
.wm-goods_left .info .value{color: @BrandText; font-size: 15px;}
.wm-goods_right{width: calc(100% - 280px); height: 100%;}
.wm-goods_right_top{position: relative; padding: 8px 10px; height: 40px; line-height: 40px; background-color: #FFF;}
.wm-goods_right_top::before{content: ''; position: absolute; bottom: 0; margin-left: -10px; width: 100%; height: 2px; background-color: rgba(0, 0, 0, 0.1);}
.wm-goods_right_top .tabs{user-select: none;}
.wm-goods_right_top .tabs li{position: relative; cursor: pointer; padding: 0 16px;}
.wm-goods_right_top .tabs li:hover{color: @Primary;}
.wm-goods_right_top .tabs .active{color: @Primary; font-weight: bold;}
.wm-goods_right_top .tabs .active::before{content: ''; position: absolute; bottom: -7px; margin-left: -16px; width: 100%; height: 2px; background-color: @Primary;}
.wm-goods_right_top .close{cursor: pointer; width: 40px; line-height: 40px; text-align: center;}
.wm-goods_right_top .close:hover{color: @Primary;}
/* 货品信息 */
.wm-goods_right_ct{padding: 10px; height: calc(100% - 56px - 20px);}
.wm-goods_right_ct .box{padding: 10px; padding-top: 0px; background-color: #FFF; border-radius: 4px;}
.wm-goods_right_ct .box_top{padding: 8px 0; line-height: 32px;}
.wm-goods_right_ct .box_top h2{font-size: 16px; font-weight: bold;}
.wm-goods_right_ct .box_top .total{overflow: hidden; overflow-x: auto; width: calc(100% - 64px - 360px); height: 32px; color: @Info;}
.wm-goods_right_ct .box_top .total_info{white-space: nowrap;}
.wm-goods_right_ct .box_top .total b{color: @BrandText;}
.wm-goods_right_ct .box_top .time{user-select: none; overflow: hidden;}
.wm-goods_right_ct .box_top .time li{cursor: pointer; padding: 0 8px; margin: 0 5px; text-align: center; border-radius: 4px;}
.wm-goods_right_ct .box_top .time li:hover{color: @Primary; background-color: @Primary6;}
.wm-goods_right_ct .box_top .time .active{color: @Primary; font-weight: bold; background-color: @Primary6;}
.wm-goods_right_ct .box_top .time .line{cursor: default; color: @Info;}
.wm-goods_right_ct .box_ct{overflow: auto; height: calc(100% - 48px);}
.wm-goods_right_ct .direct{width: calc(100% - 20px); height: calc(60% - 15px);}
.wm-goods_right_ct .stock{float: left; margin-top: 10px; width: calc(40% - 20px - 5px); height: calc(40% - 15px);}
.wm-goods_right_ct .logs{float: right; margin-top: 10px; width: calc(60% - 20px - 5px); height: calc(40% - 15px);}
/* 封面图 */
.wm-goods_img_body{overflow-y: auto; padding: 10px; width: calc(100% - 20px); height: calc(100% - 56px - 20px);}
.wm-goods_img_list{overflow: hidden;}
.wm-goods_img_list li{width: calc(100% / 6); padding: 10px 0; text-align: center;}
.wm-goods_img_list .img_body{margin: 0 auto; width: 160px; border: #FFF 1px solid; background-color: #FFF; text-align: center; border-radius: 4px; box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);}
.wm-goods_img_list .img{position: relative; height: 160px; line-height: 160px; background-color: #F8F8F8; border-radius: 4px 4px 0 0;}
.wm-goods_img_list .img:hover .close{display: block;}
.wm-goods_img_list .img i{font-size: 36px; color: @IconColor;}
.wm-goods_img_list .name{user-select: none; line-height: 40px;}
.wm-goods_img_list .name span{padding: 4px; color: @Info;}
.wm-goods_img_list .name .an{cursor: pointer; color: @Primary;}
.wm-goods_img_list .name .clear{cursor: pointer; color: @Danger;}
.wm-goods_img_list .load{position: absolute; z-index: 1; width: 100%; height: 3px; bottom: 0;}
.wm-goods_img_list .close{display: none; position: absolute; top: -8px; right: -8px; width: 20px; height: 20px; line-height: 20px; border-radius: 50%; background-color: @Danger; text-align: center;}
.wm-goods_img_list .close i{font-size: 14px; color: #FFF;}
/* 摄象头 */
.wm-goods_photo_body{overflow: hidden; position: relative; background-color: @Minor2;}
.wm-goods_photo_body::before{content: '无法调用摄像头'; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%) ; color: #999;}
.wm-goods_photo_body canvas{display: none;}
.wm-goods_photo_body .photo_button{cursor: pointer; position: absolute; opacity: 0.8; z-index: 11; left: 50%; bottom: 16px; transform: translateX(-50%); width: 160px; height: 48px; line-height: 48px; color: #FFF; background-color: @Primary; text-align: center; border-radius: 24px;}
.wm-goods_photo_body .photo_button:hover{opacity: 1; background-color: @Primary1;}
.wm-goods_photo_body .photo_tools{user-select: none; position: absolute; top: 16px; right: 16px; z-index: 12; padding: 8px 16px; line-height: 32px; background-color: rgba(0, 0, 0, .7); color: #FFF; border-radius: 32px;}
.wm-goods_photo_body .photo_tools span{cursor: pointer; padding: 0 16px;}
.wm-goods_photo_body .photo_tools span:hover{color: @Minor;}
.wm-goods_photo_body .barcode{position: absolute; z-index: 11; left: 10px; top: 10px; width: 160px; border: #000 4px solid; background-color: #000;}
</style>

<script setup lang="ts">
import { ref, watch, getCurrentInstance, nextTick } from 'vue';
import { useStore } from 'vuex';
import { BrowserMultiFormatReader } from '@zxing/library'
/* UI组件 */
import Ui from '../../library/ui';
import Request from '../../library/request';
import Format from '../../library/format';
import Files from '../../library/files';
import Times from '../../library/time';
import Html from '../../library/html';
import Util from '../../library/utils';
/* 组件 */
import wmTable from '../../components/table/index.vue';
import wmInput from '../../components/form/input/index.vue';
import wmImgView from '../../components/image/view.vue';
import wmTag from '../../components/tag/index.vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},   // 是否显示
});
const { proxy } = getCurrentInstance() as any ;
const emit = defineEmits(['update:show']);
// 状态
const store = useStore();
const state = store.state;
// 变量
const seaKey = ref('');
const tabs = ref({active: 'info', list: [{label: '货品信息', value: 'info'}, {label: '封面图', value: 'img'}, {label: '拍照上传', value: 'photo'}]});
const days = ref([{label: '3个月', value: '3'}, {label: '6个月', value: '6'}, {label: '1年', value: '12'}, {label: '2年', value: '24'}, {label: '3年', value: '36'}]);
const imgShow = ref(false);
const imgIndex = ref(0);
const imgData = ref([]);
const priceEncode: Function = Format.priceEncode;
/* 数据 */
const form = ref({times: '24', sku_id: ''});
const list = ref({
  // 货品信息
  info: <any>{},
  // 货品流向
  direct: {columns: [
    {title: '序号', index: 'index', slot: 'index', textAlign: 'center', width: '40px'},
    {title: 'ID', slot: 'id', textAlign: 'center', width: '80px'},
    {title: '单据日期', index: 'ctime', slot: 'ctime', textAlign: 'center'},
    {title: '类型', index: 'type', slot: 'type', textAlign: 'center'},
    {title: '仓库', index: 'warehouse'},
    {title: '标签价(元)', index: 'sale_price', slot: 'sale_price', textAlign: 'right'},
    {title: '吊牌价(W)', index: 'market_price', slot: 'market_price', textAlign: 'right'},
    {title: '数量', index: 'num', textAlign: 'center', class: 'tCenter'},
    {title: '折扣', index: 'ratio', slot: 'ratio', textAlign: 'center', class: 'tCenter'},
    {title: '品牌', index: 'brand', textAlign: 'center', class: 'tCenter'},
    {title: '采购员', index: 'owner', textAlign: 'center', class: 'tCenter'},
    {title: '状态', index: 'state', slot: 'state', textAlign: 'center'},
    {title: '备注', index: 'remark'},
  ], total:<any>{}, data: []},
  // 分仓库存
  stock: {columns: [
    {title: '时间', index: 'utime', textAlign: 'center', class: 'color1', width: '160px', minWidth: '160px'},
    {title: '仓库ID', index: 'wms_co_id', textAlign: 'center', class: 'tCenter', width: '120px', minWidth: '120px'},
    {title: '分仓名称', index: 'wms_co_name'},
    {title: '库存', index: 'num', textAlign: 'center', class: 'tCenter'},
  ], data: []},
  // 操作日志
  logs: {columns: [
    {title: '时间', index: 'ctime', textAlign: 'center', class: 'color1', width: '160px', minWidth: '160px'},
    {title: '操作员', index: 'operator', slot: 'operator'},
    {title: '内容', index: 'content'}
  ], data: []},
  // 封面图
  imgs: <any>{},
});
// 拍照
const photo = ref({
  screen: false,          // 横屏、竖屏
  camera: true,           // 翻转画面
  isTrue: false,          // 摄像头
  video: <any>null,       // 视频
  canvas: <any>null,      // 画布
  context: <any>null,     // 内容
  codeReader: <any>null,  // 扫描
});

/* 监听 */
watch(()=>props.show, (val:Boolean)=>{
  if(val) {
    // 显示
    proxy.$refs.GoodsDirect.style.opacity = '1';
    // 流向
    if(state.goods.sku_id) goodsInfo(state.goods.sku_id);
    // 监听窗口
    Html.addEvent('resize', imgWidht);
    if(tabs.value.active=='img') {
      imgWidht();
      Html.observer(proxy.$refs.imgContent, (res: any)=>{
        imgWidht();
      });
    };
    // 拍照
    if(tabs.value.active=='photo') photoOpen();
  } else {
    // 移除
    Html.removeEvent('resize', imgWidht);
    // 关闭摄像头
    photoClose();
  }
});
watch(()=>tabs.value.active, (val:string)=>{
  if(val=='photo') photoOpen();
  else photoClose();
});

/* 搜索 */
const search = (): void => {
  if(!seaKey.value) return Ui.Toast(state.langs.sku_id);
  const key: string = Util.LTrim(seaKey.value.toUpperCase(), '0');
  goodsInfo(key);
  seaKey.value = '';
}

/* 切换导航 */
const changeTabs = (val: string): void => {
  tabs.value.active = val;
  if(val=='img') nextTick(imgWidht);
}

/* 切换时间 */
const changeDay = (val: string): void => {
  // 重置
  list.value.direct.total = {};
  list.value.direct.data = [];
  list.value.stock.data = [];
  list.value.logs.data = [];
  // 流向
  form.value.times = val;
  goodsDirect();
}

/* 货品信息 */
const goodsInfo = (sku_id: any): void => {
  // 重置
  list.value.info = {};
  list.value.direct.total = {};
  list.value.direct.data = [];
  list.value.stock.data = [];
  list.value.logs.data = [];
  // 资料
  const load: any = Ui.Loading();
  Request.Post('erp_goods/info?lang='+state.lang, {
    token: state.token,
    sku_id: sku_id,
  }, (res: any)=>{
    load.clear();
    const d = res.data;
    if (d.code == 0) {
      list.value.info = d.data;
      form.value.sku_id = d.data.sku_id;
      list.value.imgs[d.data.sku_id] = {loaded:'0%', state:d.data.img?1:0, img:d.data.img};
      goodsDirect();
    } else {
      Ui.Toast(d.msg);
    }
  });
}
/* 货品流向 */
const goodsDirect = (): void => {
  if(!form.value.sku_id) return Ui.Toast(state.langs.sku_id);
  // 流向
  const load: any = Ui.Loading();
  Request.Post('erp_goods/direct?lang='+state.lang, {
    token: state.token,
    sku_id: form.value.sku_id,
    time: form.value.times,
  }, (res: any)=>{
    load.clear();
    const {code, msg, data} = res.data;
    if (code == 0) {
      list.value.direct.total = data.total;
      list.value.direct.data = data.list;
    } else {
      Ui.Toast(msg);
    }
  });
  // 分仓
  Request.Post('erp_goods/stock?lang='+state.lang, {
    token: state.token,
    sku_id: form.value.sku_id,
  }, (res: any)=>{
    const {code, msg, data} = res.data;
    if (code == 0) {
      list.value.stock.data = data;
    } else {
      Ui.Toast(msg);
    }
  });
  // 日志
  Request.Post('erp_goods/logs?lang='+state.lang, {
    token: state.token,
    sku_id: form.value.sku_id,
    time: form.value.times,
  }, (res: any)=>{
    const {code, msg, data} = res.data;
    if (code == 0) {
      list.value.logs.data = data;
    } else {
      Ui.Toast(msg);
    }
  });
}
/* 导出流向 */
const goodsDirectExport = (): void => {
  // 请求
  const load: any = Ui.Loading();
  Request.Post('erp_goods/direct_export?lang='+state.lang, {
    token: state.token,
    sku_id: form.value.sku_id,
    time: form.value.times,
  }, (res: any)=>{
    load.clear();
    const {code, msg, data} = res.data;
    if (code == 0) {
      Files.Down(data.path+data.filename, data.filename);
    } else {
      Ui.Toast(msg);
    }
  });
}

/* 封面图-内容宽度 */
const imgWidht = (): void => {
  if(tabs.value.active!='img') return;
  let content: any = proxy.$refs.imgContent;
  let w: number = parseFloat(Html.getPropertyValue(content, 'width').replace('px', ''));
  const n: number = Math.ceil(w/160)-(w<768?1:2);
  let item: any = content.children;
  for(let v of item) v.style.width = 'calc(100% / '+n+')';
}

/* 封面图-选择文件(批量) */
const imgFiles = (): void => {
  // 选择文件
  Files.Select({multiple: 'multiple'}, (fileObj:any)=>{
    for(let i=0; i<fileObj.length; i++) {
      let obj = fileObj[i];
      let name: string = obj.name;
      let arr: Array<string> = name.split('.');
      let sku_id: string = arr[0];
      list.value.imgs[sku_id] = {loaded:'0%', state:0, img:''};
      // 压缩并上传
      imgCompress(sku_id, obj);
    }
  });
}
/* 封面图-选择文件(单个) */
const imgFile = (sku_id: any): void => {
  // 选择文件
  Files.Select({}, (fileObj:any)=>{
    list.value.imgs[sku_id].state = 0;
    list.value.imgs[sku_id].loaded = '0%';
    imgCompress(sku_id, fileObj);
  });
}
/* 封面图-压缩 */
const imgCompress = (sku_id: string, fileObj: any): void => {
  // 转Base64
  Files.FileToBase64(fileObj, (base64: any)=>{
    Files.ImageCompress(base64, {width:1024, height:1024, type:fileObj.type}, (imgBase64: any)=>{
      imgUpload(sku_id, imgBase64, fileObj.type);
    });
  });
}
/* 封面图-上传 */
const imgUpload = (sku_id: string, imgBase64: string, type: string): void => {
  Ui.Toast('正在上传');
  Files.Base64ToFile(imgBase64, sku_id+'.'+Files.GetTypeExt(type), (file:any)=>{
    // 数据
    let form: any = new FormData();
    form.append('token', state.token);
    form.append('sku_id', sku_id);
    form.append('file', file);
    Request.Post('erp_goods/up_img?lang='+state.lang, form, (res: any)=>{
      const d = res.data;
      if(d.code==0) {
        let img: string = d.data.oss_url+d.data.file+'?'+Times.Time();
        list.value.imgs[sku_id].img = img;
        if(form.value.sku_id==sku_id) list.value.info.img = img;
      }
      Ui.Toast(d.msg);
    }, ()=>{},{
      // 表单方式
      headers: {"Content-Type": "multipart/form-data;charset=utf-8"},
      onUploadProgress:(event: any)=>{
        let complete = (event.loaded/event.total*100 | 0);
        if(complete<100){
          list.value.imgs[sku_id].loaded = complete+'%';
        }else if(event.upload) {
          list.value.imgs[sku_id].state = 1;
          list.value.imgs[sku_id].loaded = '100%';
        }
      }
    });
  });
}
/* 封面图-删除 */
const imgRemove = (sku_id: any): void => {
  Ui.Toast('正在删除');
  Request.Post('erp_goods/remove_img?lang='+state.lang, {
    token: state.token,
    sku_id: sku_id,
  }, (res: any)=>{
    const d = res.data;
    if(d.code==0) {
      list.value.imgs[sku_id].img = '';
      if(form.value.sku_id==sku_id) list.value.info.img = '';
    }
    Ui.Toast(d.msg);
  });
}

/* 摄像头-打开 */
const photoOpen = (): void => {
  nextTick(()=>{
    photo.value.video =  document.getElementById('GoodsPhotoVideo');
    photo.value.canvas = document.getElementById('GoodsPhotoCanvas');
    photo.value.context = photo.value.canvas.getContext('2d');
    // 检测
    if (navigator.mediaDevices === undefined || navigator.mediaDevices.getUserMedia === undefined) return Ui.Toast('浏览器不支持调用摄像头!');
    const getUserMedia: any = (navigator as any).webkitGetUserMedia || (navigator as any).mozGetUserMedia || (navigator as any).getUserMedia;
    if (!getUserMedia) return Ui.Toast('浏览器不支持调用摄像头!');
    // 启动扫描
    startScan();
    // 调用摄像头
    navigator.mediaDevices.getUserMedia({video:
      {width:{ideal:1920}, height:{ideal:1080}, frameRate:{ideal: 30}}
    }).then((stream:any)=>{
      photo.value.video.srcObject = stream;
      photo.value.video.onloadedmetadata = ()=>{
        // photo.value.video.play();
      }
      photo.value.isTrue = true;
    }).catch((err:any)=>{
      photo.value.isTrue = false;
      return Ui.Toast('无法访问摄像头!');
    });
  });
}

/* 扫描条码 */
const startScan = async (): Promise<void> => {
  photo.value.codeReader = new BrowserMultiFormatReader();
  const devices: any = await photo.value.codeReader.listVideoInputDevices();
  const backCamera: any = devices.find((device: any) => 
    device.label.includes('back') || devices.length === 1
  );
  photo.value.codeReader.decodeFromVideoDevice(backCamera.deviceId, 'GoodsVideo', (res: any, err: any)=>{
    if(res) {
      console.log(res.text);
      goodsInfo(res.text);
      // photo.value.codeReader.reset();
    }
  });
}

/* 摄象头-拍照上传 */
const photoSave = (): void => {
  if(!form.value.sku_id) return Ui.Toast(state.langs.sku_id);
  // 画图
  const width: number = photo.value.video.videoWidth*3;
  const height: number = photo.value.video.videoHeight*3;
  photo.value.canvas.width = width
  photo.value.canvas.height = height;
  // 反转
  if(!photo.value.camera){
    photo.value.context.translate(width, 0);
    photo.value.context.scale(-1, 1);
  }
  // 图片
  photo.value.context.drawImage(photo.value.video, 0, 0, width, height);
  const base64: any = photo.value.canvas.toDataURL('image/jpeg');
  // 压缩上传
  Files.ImageCompress(base64, {width:1024, height:1024}, (imgBase64: any)=>{
    console.log(imgBase64);
    Ui.Toast('正在开发');
    // imgUpload(form.value.sku_id, imgBase64, 'image/jpeg');
  });
}

/* 摄象头-关闭 */
const photoClose = (): void => {
  if(photo.value.isTrue) {
    photo.value.isTrue = false;
    photo.value.video.srcObject.getTracks()[0].stop();
    photo.value.codeReader.reset();
  }
  photo.value.video = null;
  photo.value.canvas = null;
  photo.value.context = null;
}

/* 图片预览 */
const imgView = (data: any): void => {
  imgShow.value = true;
  imgIndex.value = 0;
  imgData.value = data;
}
/* 图片预览-多图 */
const imgViews = (sku_id: any): void => {
  let imgs: any = list.value.imgs;
  let i: number = 0;
  let data: any = [];
  for(let index in imgs) {
    if(imgs[index].img) {
      data.push({label: index, value: imgs[index].img});
      if(sku_id==index) imgIndex.value = i;
      i++;
    }
  }
  imgShow.value = true;
  imgData.value = data;
}

/* 关闭 */
const close = (): void => {
  // 隐藏
  emit('update:show', false);
  (proxy.$refs.GoodsDirect as any).style.opacity = '0';
}

</script>