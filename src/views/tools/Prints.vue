<template>
  <div ref="GoodsPrint" class="wm-print_body flex" :style="{ visibility: show ? 'inherit' : 'hidden' }">
    <div class="wm-print_left scrollbar">
      <div class="search">
        <wmInput v-model:value="seaKey" @input="templateSearch()" @iconClick="templateSearch()" :placeholder="state.langs.print_template" maxlength="32" icon="ui ui_search" iconAlign="right" padding="0 40px 0 10px" margin="0 5px 0 0"></wmInput>
      </div>
      <ul class="template">
        <template v-for="(v, k) in list.template" :key="k">
          <li :class="k==list.active?'active':''" @click="templateChange(k)" v-if="v.display">
            <h2>{{ v.label }}</h2>
            <div class="info">{{ v.info }}</div>
            <i class="ui ui_arrow_right"></i>
          </li>
        </template>
      </ul>
    </div>
    <div class="wm-print_right">
      <!-- 导航 -->
      <div class="wm-print_right_top flex">
        <ul class="tools flex">
          <li class="an" @click="printSelect()">全选/全不选</li>
          <li>
            <wmInput v-model:value="sku_id" @keyup.enter="search()" @iconClick="search()" placeholder="商品编码, 多条空格分离" icon="ui ui_search" iconAlign="right" padding="0 40px 0 10px" margin="0 5px 0 0"></wmInput>
          </li>
          <li>
            <wmButton effect="dark" height="40px" @click="printSubmit()" :disabled="list.num==0">{{ state.langs.print }}( {{ list.num }} )</wmButton>
          </li>
          <li class="an" @click="goodsImport()">导入文件</li>
          <li class="clear" @click="clear()">清空</li>
        </ul>
        <div class="close" @click="close()">
          <i class="ui ui_close"></i>
        </div>
      </div>

      <!-- 打印内容 -->
      <div class="wm-print_right_ct">
        <div ref="printBarcode" class="print_body flex_left">
          <div class="print_item" v-for="(v, k) in list.sku" :key="k" :class="v.checked?'':'none'" @click="v.checked = !v.checked;printNum();">
            <!-- 瑞丽市场部(手镯) -->
            <div v-if="list.active == 'rlscb_sz'" :class="list.active" class="print_box" :style="{width: list.template[list.active].width, height: list.template[list.active].height}">
              <div class="select" :class="v.checked ? 'checked' : ''"></div>
              <div class="body">
                <div class="barcode" :style="{ backgroundColor: !v.barcode ? '#F2F4F8' : '' }">
                  <img v-if="v.barcode" :src="v.barcode" :alt="v.sku_id" style="height: 36px;" />
                </div>
                <div class="sku_id">{{ v.sku_id }}</div>
                <div class="properties_value">{{ v.properties_value || '-' }}</div>
                <div class="sale_price">￥{{ v.sale_price?Math.round(v.sale_price*100)/100:'0.00' }}</div>
              </div>
            </div>
            <!-- 瑞丽市场部(挂件) -->
            <div v-if="list.active == 'rlscb_gj'" :class="list.active" class="print_box" :style="{width: list.template[list.active].width, height: list.template[list.active].height}">
              <div class="select" :class="v.checked ? 'checked' : ''"></div>
              <div class="body">
                <div class="barcode" :style="{ backgroundColor: !v.barcode ? '#F2F4F8' : '' }">
                  <img v-if="v.barcode" :src="v.barcode" :alt="v.sku_id" style="height: 32px;" />
                </div>
                <div class="sku_id">{{ v.sku_id }}</div>
                <div class="properties_value">{{ v.properties_value || '-' }}</div>
                <div class="sale_price">￥{{ v.sale_price?Math.round(v.sale_price*100)/100:'0.00' }}</div>
              </div>
            </div>
            <!-- 平洲市场部(标签) -->
            <div v-if="list.active == 'pzscb_sz'" :class="list.active" class="print_box" :style="{width: list.template[list.active].width, height: list.template[list.active].height}">
              <div class="select" :class="v.checked ? 'checked' : ''"></div>
              <div class="body">
                <div class="barcode" :style="{ backgroundColor: !v.barcode ? '#F2F4F8' : '' }">
                  <img v-if="v.barcode" :src="v.barcode" :alt="v.sku_id" style="height: 32px" />
                </div>
                <div class="sku_id">{{ v.sku_id }}</div>
                <div class="properties_value">{{ v.properties_value || '-' }}</div>
                <div class="sale_price">￥{{ v.sale_price?Math.round(v.sale_price*100)/100:'0.00' }}</div>
              </div>
            </div>
            <!-- 模板 End -->
          </div>
        </div>
      </div>
      <!-- 打印内容 End -->
    </div>
  </div>
</template>

<style lang="less" scoped>
/* 内容 */
.wm-print_body{position: fixed; z-index: 1000; width: 100%; height: 100%; background-color: #f2f4f8; opacity: 0; transition: @Transition;}
.wm-print_body .img{cursor: pointer; background-position: center; background-repeat: no-repeat; background-size: cover;}
.wm-print_left{overflow-y: auto; padding: 0 16px; width: 280px; height: 100%; background-color: #fff; border-right: #f2f4f8 1px solid; box-sizing: border-box;}
.wm-print_left .search{padding: 8px 0; line-height: 40px;}
.wm-print_left .template{overflow: hidden;}
.wm-print_left .template li{cursor: pointer; position: relative; margin: 8px 0; padding: 8px 10px; border: @LightBorder 1px solid; background-color: @Minor8; border-radius: 4px;}
.wm-print_left .template li:hover{border-color: @Primary; background-color: @Primary5;}
.wm-print_left .template h2{line-height: 24px; font-size: 16px; font-weight: bold;}
.wm-print_left .template .info{color: @Info;}
.wm-print_left .template .active{border-color: @Primary; background-color: @Primary5;}
.wm-print_left .template .active i{display: block;}
.wm-print_left .template i{display: none; position: absolute; top: 50%; right: 0; transform: translateY(-50%); width: 28px; height: 28px; line-height: 28px; text-align: center; color: @Primary;}
.wm-print_right{width: calc(100% - 280px); height: 100%;}
.wm-print_right_top{position: relative; padding: 8px 10px; height: 40px; line-height: 40px; background-color: #fff;}
.wm-print_right_top::before{content: ""; position: absolute; bottom: 0; margin-left: -10px; width: 100%; height: 2px; background-color: rgba(0, 0, 0, 0.1);}
.wm-print_right_top .close{cursor: pointer; width: 40px; line-height: 40px; text-align: center;}
.wm-print_right_top .close:hover{color: @Primary;}
.wm-print_right_top .tools{overflow: hidden;}
.wm-print_right_top .tools li{padding: 0 8px;}
.wm-print_right_top .tools .an{cursor: pointer; color: @Primary;}
.wm-print_right_top .tools .clear{cursor: pointer; color: @Danger;}
/* 货品信息 */
.wm-print_right_ct{padding: 10px; height: calc(100% - 56px - 20px); overflow: auto;}
.wm-print_right_list{overflow: hidden; width: 100%;}
.wm-print_right_list li{width: calc(100% / 6); padding: 10px 0;}
/* 打印标签 */
.print_body{overflow: hidden; width: 100%;}
.print_item{width: calc(100% / 6); padding: 10px 0;}
.print_item .select{cursor: pointer; position: absolute; z-index: 1; top: -8px; right: -8px; width: 20px; height: 20px; background-color: #fff; border-radius: 50%; box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);}
.print_item .select.checked{background-color: @Minor;}
.print_item .select.checked::before{content: ""; position: absolute; top: 5px; left: 5px; width: 8px; height: 4px; border-left: #fff 2px solid; border-bottom: #fff 2px solid; transform: rotate(-45deg);}
.print_box{cursor: pointer; user-select: none; position: relative; page-break-inside: avoid; margin: 0 auto; border: #fff 1px solid; background-color: #fff; text-align: center; border-radius: 4px; box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);}
.print_box .body{position: relative;}
.print_box::before{content: ''; position: absolute; z-index: 100; left: 0; top: calc(50% - 1px); width: 100%; height: 1px; border-bottom: #CCC 1px dashed;}

/* 瑞丽市场部(手镯) */
.rlscb_sz{position: relative; text-align: center;}
.rlscb_sz .body{left: 2mm; width: calc(100% - 2mm); height: 100%;}
.rlscb_sz .body div{position: absolute; width: 100%; left: 50%; transform: translate(-50%, -50%);}
.rlscb_sz .barcode{height: 40px; top: calc(50% - 6px);}
.rlscb_sz .sku_id{top: calc(50% + 20px); font-size: 13px;}
.rlscb_sz .properties_value{top: calc(50% + 40px); font-size: 12px; zoom: 0.9;}
.rlscb_sz .sale_price{top: calc(50% + 50px); font-size: 14px; font-weight: bold;}
/* 瑞丽市场部(挂件) */
.rlscb_gj{position: relative; text-align: center;}
.rlscb_gj .body{left: 2mm; width: calc(100% - 2mm); height: 100%;}
.rlscb_gj .body div{position: absolute; width: 100%; left: 50%; transform: translate(-50%, -50%);}
.rlscb_gj .barcode{height: 32px; top: calc(50% - 10px);}
.rlscb_gj .sku_id{top: calc(50% + 16px); font-size: 13px;}
.rlscb_gj .properties_value{top: calc(50% + 35px); font-size: 12px; zoom: 0.9;}
.rlscb_gj .sale_price{top: calc(50% + 50px); font-size: 16px; font-weight: bold;}
/* 平洲市场部(标签) */
.pzscb_sz{position: relative; text-align: center;}
.pzscb_sz .body{left: 2mm; width: calc(100% - 2mm); height: 100%;}
.pzscb_sz .body div{position: absolute; width: 100%; left: 50%; transform: translate(-50%, -50%);}
.pzscb_sz .barcode{height: 32px; top: calc(50% - 6px);}
.pzscb_sz .sku_id{top: calc(50% + 20px); font-size: 13px;}
.pzscb_sz .properties_value{top: calc(50% + 40px); font-size: 12px; zoom: 0.9;}
.pzscb_sz .sale_price{top: calc(50% + 50px); font-size: 16px; font-weight: bold;}
</style>

<script setup lang="ts">
import { ref, watch, getCurrentInstance, nextTick} from 'vue';
import { useStore } from "vuex";
/* UI组件 */
import Ui from "../../library/ui";
import Request from "../../library/request";
import Storage from "../../library/storage";
import Files from "../../library/files";
import Util from '../../library/utils';
import { read as xlsxRead, utils as xlsxUtils } from "xlsx";
import Html from "../../library/html";
import printJS from "print-js";
/* 组件 */
import wmInput from "../../components/form/input/index.vue";
import wmButton from "../../components/form/button/index.vue";
import Time from '../../library/time';

/* 参数 */
const props = defineProps({
  show: { type: Boolean, default: false }, // 是否显示
});
const { proxy } = getCurrentInstance() as any ;
const emit = defineEmits(['update:show']);
// 状态
const store = useStore();
const state = store.state;
// 变量
const seaKey = ref('');
const sku_id = ref('');
// 数据
const list = ref({
  active: "rlscb",
  checked: false,
  num: 0,
  sku: <any>[],
  template: {
    rlscb_sz: {display: true, label: "瑞丽市场部(手镯)", info: "3.6cm x 3.6cm", width: "3.4cm", height: "3.4cm"},
    rlscb_gj: {display: true, label: "瑞丽市场部(挂件)", info: "3.6cm x 3.6cm", width: "3.4cm", height: "3.4cm"},
    pzscb_sz: {display: true, label: "平洲市场部(标签)", info: "3.6cm x 3.6cm", width: "3.4cm", height: "3.4cm"},
  },
});

/* 监听 */
watch(()=>props.show, (val:Boolean)=>{
  if(val) {
    // 显示
    proxy.$refs.GoodsPrint.style.opacity = "1";
    // 默认模板
    const tp: string | null = Storage.getItem("printTemplate");
    list.value.active = tp ? tp : "pzscb_sz";
    // 监听窗口、内容
    Html.addEvent("resize", printWidht);
    Html.observer(proxy.$refs.printBarcode, (res: any) => {
      printNum();
      printWidht();
    });
    // 默认数据
    if (state.print.sku.length > 0) {
      let sku: Array<string> = [];
      list.value.sku = [];
      for (let v of state.print.sku) {
        v.checked = true;
        v.barcode = "";
        sku.push(v.sku_id);
        list.value.sku.push(v);
      }
      state.print.sku = [];
      goodsInfo(sku);
    }
  } else {
    // 移除
    Html.removeEvent("resize", printWidht);
  }
});

/* 模板-搜索 */
const templateSearch = (): void => {
  let data = list.value.template;
  const reg = new RegExp(seaKey.value.toLowerCase());
  for (let k in data) {
    data[k].display = seaKey.value?reg.test(data[k].label):true;
  }
}

/* 模板-切换 */
const templateChange = (name: any): void => {
  list.value.active = name;
  Storage.setItem("printTemplate", name);
  printWidht();
}

/* 搜索 */
const search = (): void => {
  if (!sku_id.value) return Ui.Toast(state.langs.sku_id);
  const arr: Array<string> = sku_id.value.trim().toUpperCase().split(' ');
  for(let i in arr) {
    arr[i] = Util.LTrim(arr[i], '0');
  }
  goodsInfo(arr);
  sku_id.value = "";
}

/* 商品-信息 */
const goodsInfo = (sku: Array<string>): void => {
  // 追加
  for (let sku_id of sku) {
    if (inArray(sku_id)) continue;
    list.value.sku.push({ checked: false, sku_id: sku_id, barcode: "" });
  }
  // 查询
  Request.Post("erp_goods/barcode?lang="+state.lang, {
    token: state.token,
    sku: sku,
  },(res: any) => {
    const {code, msg, data} = res.data;
    if (code == 0) {
      for (let sku_id in data) goodsContent(sku_id, data[sku_id]);
    } else Ui.Toast(msg);
  });
}
/* 是否存在 */
const inArray = (sku_id: string): boolean => {
  for (let v of list.value.sku) if (v.sku_id == sku_id) return true;
  return false;
}
/* 替换内容 */
const goodsContent = (sku_id: string, d: any): boolean => {
  for (let v of list.value.sku) {
    if (v.sku_id == sku_id) {
      v.barcode = d.barcode;
      if (!v.name) v.name = d.name;
      if (!v.short_name) v.short_name = d.short_name;
      if (!v.properties_value) v.properties_value = d.properties_value;
      if (!v.purchase_price) v.purchase_price = d.purchase_price;
      if (!v.sale_price) v.sale_price = d.sale_price;
      if (!v.market_price) v.market_price = d.market_price;
      if (!v.unit) v.unit = d.unit;
      if (!v.weight) v.weight = d.weight;
      if (!v.ratio) v.ratio = d.ratio;
      if (!v.brand) v.brand = d.brand;
      if (!v.owner) v.owner = d.owner;
      if (!v.i_id) v.i_id = d.i_id;
      // 是否商品资料
      if(d.is_goods) v.checked = true;
      else {
        v.checked = false;
        Ui.Toast('[ '+sku_id+' ]无商品资料');
      }
      return true;
    }
  }
  return false;
}

/* 商品-导入 */
const goodsImport = (): void => {
  // 选择文件
  Files.Select({ mimeType: [] }, (fileObj: any) => {
    Files.FileToBase64(fileObj, (base64: string) => {
      const workbook: any = xlsxRead(base64, { type: "binary" });
      const name: string = workbook.SheetNames[0];
      const arr: any = xlsxUtils.sheet_to_json(workbook.Sheets[name], {raw: false});
      let sku: Array<string> = [];
      let tmp: any = {};
      let sku_id: string = '';
      list.value.sku = [];
      for (let v of arr) {
        if (!v["商品编码"]) continue;
        sku_id = v["商品编码"].trim().toUpperCase();
        sku.push(sku_id);
        tmp = { checked: false, sku_id: sku_id, barcode: "" };
        if (v["暗码"]) tmp.short_name = v["暗码"];
        if (v["颜色及规格"]) tmp.short_name = v["颜色及规格"];
        if (v["基本售价"]) tmp.sale_price = v["基本售价"];
        if (v["吊牌价"]) tmp.market_price = v["吊牌价"];
        list.value.sku.push(tmp);
      }
      if (sku.length > 0) goodsInfo(sku);
    }, "blob");
  });
}

/* 打印-内容宽度 */
const printWidht = (): void => {
  if (list.value.sku.length < 1) return Ui.Toast(state.langs.sku_id);
  let content: any = proxy.$refs.printBarcode;
  let item: any = document.getElementsByClassName("print_item");
  let first: any = document.getElementsByClassName("print_box")[0];
  let w: number = parseFloat(
    Html.getPropertyValue(content, "width").replace("px", "")
  );
  let w1: number = parseFloat(
    Html.getPropertyValue(first, "width").replace("px", "")
  );
  const n: number = Math.ceil(w/w1) - (w<768?1:2);
  for (let v of item) v.style.width = "calc(100% / " + n + ")";
}

/* 打印-全选 */
const printSelect = (): void => {
  const checked: boolean = !list.value.checked;
  for (let v of list.value.sku) v.checked = checked;
  list.value.checked = checked;
}

/* 打印-数量 */
const printNum = (): void => {
  let num: number = 0;
  for (let v of list.value.sku) if (v.checked) num++;
  list.value.num = num;
}

/* 打印-确认 */
const printSubmit = (): void => {
  if (list.value.num < 1) return Ui.Toast(state.langs.select);
  // 记录
  Request.Post("erp_goods/barcode_print?lang="+state.lang, {
    token: state.token,
    template: list.value.active,
    num: list.value.num,
  }, (res: any) => {
    const d = res.data;
  });
  // 重置
  let item: any = document.getElementsByClassName("print_item");
  for (let v of item) v.style.width = "100%";
  nextTick(()=>{
    printJS({printable: proxy.$refs.printBarcode, type: "html", scanStyles: false, css: '/print/barcode.css?t='+Time.Time()});
  });
}

/* 清空 */
const clear = (): void => {
  list.value.sku = [];
}

/* 关闭 */
const close = (): void => {
  emit("update:show", false);
  proxy.$refs.GoodsPrint.style.opacity = "0";
}

</script>
