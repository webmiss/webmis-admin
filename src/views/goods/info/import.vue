<template>
  <wmDialog v-model:show="infoShow" :title="title" width="calc(100% - 40px)" top="56px" bottom="40px" overflow="hidden auto" @close="close()">
    <template #top>
      <!-- 工具栏 -->
      <div class="goods_info flex">
        <ul class="goods_info_tools flex">
          <li><wmInput v-model:value="goods.key" @keyup.enter="goodsSearch()" @iconClick="goodsSearch()" :placeholder="state.langs.sku_id" maxlength="32" icon="ui ui_search" iconAlign="right" padding="0 40px 0 10px"></wmInput></li>
          <li><wmCheckbox :options="goods.price"></wmCheckbox></li>
          <li>|</li>
          <li><wmButton type="primary" effect="text" padding="0 4px" @click="add.show = true">添加</wmButton></li>
          <li><wmButton type="primary" effect="text" padding="0 4px" @click="goodsImp()">导入</wmButton></li>
          <li>|</li>
          <li><wmButton type="danger" effect="text" padding="0 4px" @click="goodsRemove('part')">移除</wmButton></li>
          <li>|</li>
          <li><wmButton type="primary" effect="text" padding="0 4px" @click="goodsPrint()">打印标签</wmButton></li>
        </ul>
        <div class="goods_info_total scrollbar" style="max-width: calc(100% - 620px);">
          成本价: <b>{{ priceEncode(goods.cost_price) }}</b> 元&nbsp;&nbsp;
          标签价: <b>{{ priceEncode(goods.sale_price) }}</b> 元&nbsp;&nbsp;
          采购价: <b>{{ priceEncode(goods.purchase_price) }}</b> W&nbsp;&nbsp;
          吊牌价: <b>{{ priceEncode(goods.market_price) }}</b> W&nbsp;&nbsp;
          数量: <b>{{ goods.list.length }}</b> 条
        </div>
      </div>
      <!-- 工具栏 End -->
    </template>
    <wmMain paddingY="4px">
      <!-- 商品资料 -->
      <wmTable ref="tableList" :columns="goods.columns" :options="goods.list" :maxLen="100">
        <template #index="d">
          <div class="tCenter">{{ d.index + 1 }}</div>
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
        <template #cost_price="d">
          <div class="tRight" v-if="d.cost_price>0&&d.status!=1">***</div>
          <div class="tRight" v-else>{{ d.cost_price>0?priceEncode(d.cost_price):d.cost_price }}</div>
        </template>
        <template #supply_price="d">
          <div class="tRight">{{ d.supply_price>0?priceEncode(d.supply_price):'-' }}</div>
        </template>
        <template #sale_price="d">
          <div class="tRight">{{d.sale_price>0?priceEncode(goods.price.checked?d.price:d.sale_price):'-'}}</div>
        </template>
        <template #purchase_price="d">
          <div class="tRight" v-if="d.purchase_price>0&&d.status!=1">***</div>
          <div class="tRight" v-else>{{ d.purchase_price>0?priceEncode(d.purchase_price):d.purchase_price }}</div>
        </template>
        <template #supplier_price="d">
          <div class="tRight">{{ d.supplier_price > 0?priceEncode(d.supplier_price):'-' }}</div>
        </template>
        <template #market_price="d">
          <div class="tRight">{{ d.market_price > 0?priceEncode(d.market_price):'-' }}</div>
        </template>
        <template #unit="d">
          <div class="tCenter">{{ d.unit || '-' }}</div>
        </template>
        <template #weight="d">
          <div class="tCenter">{{ d.weight || '-' }}</div>
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
        <template #supplier_name="d">
          <div class="tCenter" v-if="d.supplier_name&&d.status!=1">***</div>
          <div class="tCenter" v-else>{{ d.supplier_name }}</div>
        </template>
        <template #owner="d">
          <div class="tCenter">{{ d.owner || '-' }}</div>
        </template>
        <template #action="d">
          <div class="tCenter">
            <wmButton type="danger" effect="text" padding="0 4px" @click="goodsRemove('one', d.index)">{{ langs.remove }}</wmButton>
          </div>
        </template>
        <template #status="d">
          <div class="tCenter">
            <span v-if="d.status==0" class="c_info">检测中</span>
            <span v-else-if="d.status==1" class="c_success">可用</span>
            <span v-else-if="d.status==2" class="c_danger">存在</span>
            <span v-else-if="d.status==3" class="c_warning">已入库</span>
            <span v-else-if="d.status==4" class="c_info">已发货</span>
          </div>
        </template>
      </wmTable>
    </wmMain>
    <template #bottom>
      <wmButton height="40px" padding="0 32px" @click="goodsUpload()">上传资料</wmButton>
    </template>
  </wmDialog>
  <!-- 添加 -->
  <wmDialog
    v-model:show="add.show" :title="add.title" width="820px" bottom="40px" :isClose="true">
    <wmMain>
      <wmTableForm>
        <tr>
          <td class="label"><span class="red_dot">商品编码</span></td>
          <td><wmInput v-model:value="add.sku_id" /></td>
          <td class="label"><span class="red_dot">标签</span></td>
          <td><wmSelect v-model:value="add.labels" :options="selectAll.labels" /></td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">商品名称</span></td>
          <td><wmInput v-model:value="add.name" /></td>
          <td class="label"><span class="red_dot">商品分类</span></td>
          <td><wmSelect v-model:value="add.category" :options="selectAll.category" />
          </td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">颜色及规格</span></td>
          <td><wmInput v-model:value="add.properties_value" /></td>
          <td class="label"><span class="red_dot">品牌</span></td>
          <td><wmSelect v-model:value="add.brand" :options="selectAll.brand" /></td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">成本价(元)</span></td>
          <td><wmInput v-model:value="add.cost_price" /></td>
          <td class="label"><span class="red_dot">标签价(元)</span></td>
          <td><wmInput v-model:value="add.sale_price" /></td>
        </tr>
        <tr>
          <td class="label">采购价(w)</td>
          <td><wmInput v-model:value="add.purchase_price" /></td>
          <td class="label">吊牌价(w)</td>
          <td><wmInput v-model:value="add.market_price" /></td>
        </tr>
        <tr>
          <td class="label">供应链价(元)</td>
          <td><wmInput v-model:value="add.supply_price" /></td>
          <td class="label">人民币采购价</td>
          <td><wmInput v-model:value="add.supplier_price" /></td>
        </tr>
        <tr>
          <td class="label">单位</td>
          <td><wmInput v-model:value="add.unit" /></td>
          <td class="label">重量</td>
          <td><wmInput v-model:value="add.weight" /></td>
        </tr>
        <tr>
          <td class="label">暗码</td>
          <td><wmInput v-model:value="add.short_name" /></td>
          <td class="label">款式编码</td>
          <td><wmInput v-model:value="add.i_id" /></td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">采购员</span></td>
          <td><wmInput v-model:value="add.owner" /></td>
          <td class="label"><span class="red_dot">供应商</span></td>
          <td><wmInput v-model:value="add.supplier_name" /></td>
        </tr>
      </wmTableForm>
    </wmMain>
    <template #bottom>
      <wmButton height="40px" padding="0 32px" @click="goodsAdd()">{{ langs.confirm }}</wmButton>
    </template>
  </wmDialog>
  <!-- 移除 -->
  <wmDialog v-model:show="remove.show" :title="remove.title" width="360px" bottom="40px" :isClose="true">
    <wmMain lineHeight="60px">{{ remove.info }}</wmMain>
    <template #bottom>
      <wmButton effect="dark" type="danger" height="40px" @click="goodsRemoveSub()">{{ langs.confirm }}</wmButton>
    </template>
  </wmDialog>
  <!-- 上传 -->
  <wmDialog v-model:show="imp.show" :title="imp.title" width="480px" bottom="40px" :isClose="true">
    <wm-alert>提醒: 无法覆盖已入库、已发货状态, 如需修改请联系维护人员</wm-alert>
    <wmMain paddingY="32px" textAlign="center">
      可用( <b class="c_success">{{ imp.s1 }}</b> )&nbsp;&nbsp; 存在(
      <b class="c_danger">{{ imp.s2 }}</b> )&nbsp;&nbsp; 已入库(
      <b class="c_warning">{{ imp.s3 }}</b> )&nbsp;&nbsp; 已发货(
      <b class="c_info">{{ imp.s4 }}</b> )&nbsp;&nbsp;
    </wmMain>
    <template #bottom>
      <wmButton effect="dark" height="40px" @click="submit()">{{ langs.confirm }}</wmButton>
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
import Format from '../../../library/format';
import Util from '../../../library/utils';
import Files from '../../../library/files';
import { read as xlsxRead, utils as xlsxUtils } from "xlsx";
/* 组件 */
import wmMain from '../../../components/container/main.vue';
import wmAlert from '../../../components/alert/index.vue';
import wmDialog from '../../../components/dialog/index.vue';
import wmTable from '../../../components/table/index.vue';
import wmTableForm from '../../../components/table/form.vue';
import wmSelect from '../../../components/form/select/index.vue';
import wmInput from '../../../components/form/input/index.vue';
import wmButton from '../../../components/form/button/index.vue';
import wmCheckbox from '../../../components/form/checkbox/index.vue';

/* 参数 */
const props = defineProps({
    show: { type: Boolean, default: false },        // 是否显示
    title: { type: String, default: '' },           // 标题
    selectList: { type: Object, default: {} },
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
  key: '', columns: [
    {title: '序号', slot: 'index', width: '40px', minWidth: '30px', textAlign: 'center'},
    {title: '商品编码', slot: 'sku_id', width: '160px'},
    {title: '暗码', slot: 'short_name', textAlign: 'center'},
    {title: '款式编码', slot: 'i_id', textAlign: 'center'},
    {title: '商品名称', index: 'name'},
    {title: '颜色及规格', index: 'properties_value'},
    {title: '成本价(元)', slot: 'cost_price', textAlign: 'center'},
    {title: '供应链价(元)', slot: 'supply_price', textAlign: 'center'},
    {title: '标签价(元)', slot: 'sale_price', textAlign: 'center'},
    {title: '采购价(W)', slot: 'purchase_price', textAlign: 'center'},
    {title: '人民币采购价(元)', slot: 'supplier_price', textAlign: 'center'},
    {title: '吊牌价(W)', slot: 'market_price', textAlign: 'center'},
    {title: '单位', slot: 'unit', minWidth: '60px', textAlign: 'center'},
    {title: '重量', slot: 'weight', minWidth: '60px', textAlign: 'center'},
    {title: '标签', slot: 'labels', textAlign: 'center'},
    {title: '分类', slot: 'category', textAlign: 'center'},
    {title: '品牌', slot: 'brand', textAlign: 'center'},
    {title: '供应商', slot: 'supplier_name', textAlign: 'center'},
    {title: '采购员', slot: 'owner', textAlign: 'center'},
    {title: '操作', slot: 'action', width: '60px', minWidth: '60px', textAlign: 'center'},
    {title: '状态', slot: 'status', width: '80px', minWidth: '80px', textAlign: 'center'},
  ], list: <any>[],
  price: { label: '调整价格', value: 'price', checked: false },
  cost_price: 0, sale_price: 0, purchase_price: 0, market_price: 0
});
// 添加、移除、导入
const add = ref({
  show: false, title: '新增商品',
  cost_price: '0.00', supply_price: '0.00', sale_price: '0.00', purchase_price: '0.00', supplier_price: '0.00', market_price: '0.00', weight: '0.00', unit: '个',
  sku_id: '', labels: '', name: '', category: '', properties_value: '', brand: '', short_name: '', i_id: '', owner: '', supplier_name: '',
});
const remove = ref({show: false, type: '', title: '移除', info: '', data: <any>[]});
const imp = ref({show: false, refresh: false, title: '上传资料', s0: 0, s1: 0, s2: 0, s3: 0, s4: 0});
// 全部分类
const selectAll = ref({labels: [], category: [], brand: []});

/* 监听 */
watch(()=>props.show,(val: boolean)=>{
  infoShow.value = val;
  if(val){
    // 是否刷新
    imp.value.refresh = false;
    // 选项
    getSelect();
  }
},{ deep: true });

/* 选项 */
const getSelect =(): void => {
  Request.Post('erp_goods_info/get_select?lang=' + state.lang, {
    token: state.token,
  },(res: any) => {
    const {code, msg, data}: any = res.data;
    if(code===0){
      // 标签、分类、品牌
      selectAll.value.labels = data.labels;
      selectAll.value.category = data.category;
      selectAll.value.brand = data.brand;
    } else Ui.Toast(msg);
  });
}

/* 搜索 */
const goodsSearch =(): void => {
  const key: string = goods.value.key;
  const reg = new RegExp(key.trim().toUpperCase());
  goods.value.key = '';
  const list: any = goods.value.list;
  for(let v of list) v.display = reg.test(v.sku_id);
}

/* 商品资料-添加 */
const goodsAdd =(): void => {
  const d: any = add.value;
  // 是否存在
  if(!d.sku_id) return Ui.Toast('请输入商品编码');
  const sku_id: any = Util.Trim(d.sku_id).toUpperCase();
  for(let v of goods.value.list){
    if(sku_id===v.sku_id) return Ui.Toast('[ ' + sku_id + ' ]已存在!');
  }
  // 验证
  if(!d.name) return Ui.Toast('请输入商品名称');
  if(!d.labels || d.labels.length===0) return Ui.Toast('请选择标签');
  if(!d.category || d.category.length===0) return Ui.Toast('请选择分类');
  if(!d.brand || d.brand.length===0) return Ui.Toast('请选择品牌');
  if(!d.properties_value || d.properties_value.length<2) return Ui.Toast('请输入颜色及规格');
  if(!d.cost_price || isNaN(parseFloat(d.cost_price))) return Ui.Toast('请输入成本价');
  if(!d.sale_price || isNaN(parseFloat(d.sale_price))) return Ui.Toast('请输入标签价');
  if(!d.owner) return Ui.Toast('采购员');
  if(!d.supplier_name) return Ui.Toast('供应商');
  // 追加
  add.value.show = false;
  let id: string = 'id_1';
  if(goods.value.list.length>0){
    const tmp: any = goods.value.list.at(-1);
    const arr: any = tmp.id.split('_');
    if(arr.length===2) id='id_'+(parseInt(arr[1])+1);
  }
  goods.value.list.push({
    id: id,
    sku_id: sku_id,
    i_id: d.i_id,
    name: d.name,
    properties_value: d.properties_value,
    short_name: d.short_name,
    cost_price: d.cost_price,
    supply_price: d.supply_price,
    sale_price: d.sale_price,
    price: goodsPrice(parseFloat(d.sale_price)),
    purchase_price: d.purchase_price,
    supplier_price: d.supplier_price,
    market_price: d.market_price,
    unit: d.unit,
    weight: d.weight,
    labels: d.labels[0],
    category: d.category[0],
    brand: d.brand[0],
    supplier_name: d.supplier_name,
    owner: d.owner,
    status: '0',
    display: true,
  });
  // 统计价格、商品状态
  goodsTotal();
  goodsStatus([sku_id]);
}

/* 商品资料-导入 */
const goodsImp =(): void => {
  Files.Select({ mimeType: [] },(fileObj: any) => {
    Files.FileToBase64(fileObj,(base64: any) => {
      const workbook: any = xlsxRead(base64, { type: 'binary' });
      const name: string = workbook.SheetNames[0];
      const arr: any = xlsxUtils.sheet_to_json(workbook.Sheets[name], { raw: false });
      if(arr.length > 3000) return Ui.Toast('不能超过3000条');
      // 商品资料
      goods.value.list = [];
      let id: number = 0;
      let sku_id: string = '';
      let sku: Array<string> = [];
      for(let v of arr){
        if(!v['商品编码'] || !v['款式编码'] || !v['品牌']) continue;
        // 调整价格
        let sale_price: string = v['基本售价'] || v['标签价'] || 0;
        let price: number = sale_price?goodsPrice(parseFloat(sale_price)):0;
        // 数据
        id++;
        sku_id = Util.Trim(v['商品编码']).toUpperCase();
        sku.push(sku_id);
        goods.value.list.push({
          id: 'id_'+id,
          sku_id: sku_id,
          i_id: v['款式编码'],
          name: v['商品名称'] || '',
          properties_value: v['颜色及规格'] || '',
          short_name: v['暗码'] || '',
          cost_price: v['成本价'] || 0,
          supply_price: v['供应链价'] || 0,
          sale_price: sale_price,
          price: price,
          purchase_price: v['采购价'] || 0,
          supplier_price: v['人民币采购价'] || 0,
          market_price: v['吊牌价'] || 0,
          unit: v['单位'] || '',
          weight: v['重量'] || 0,
          labels: v['商品标签'] || v['标签'] || '',
          category: v['分类'] || '',
          brand: v['品牌'] || '',
          supplier_name: v['供应商名称'] || v['供应商'] || '',
          owner: v['采购员'] || '',
          status: '0',
          display: true,
        });
      }
      // 统计价格
      goodsTotal();
      // 商品状态
      goodsStatus(sku);
    }, 'blob');
  });
}
/* 商品资料-价格调整 */
const goodsPrice =(price: number): number => {
  return Math.round(price/10)*10;
}
/* 商品资料-统计 */
const goodsTotal =(): void => {
  const list: Array<any> = goods.value.list;
  goods.value.cost_price = 0;
  goods.value.sale_price = 0;
  goods.value.purchase_price = 0;
  goods.value.market_price = 0;
  for(let v of list){
    goods.value.cost_price += parseFloat(v.cost_price);
    goods.value.sale_price += parseFloat(v.sale_price);
    goods.value.purchase_price += parseFloat(v.purchase_price);
    goods.value.market_price += parseFloat(v.market_price);
  }
}
/* 商品资料-状态 */
const goodsStatus =(sku: Array<string>): void => {
  if(sku.length===0) return;
  // 请求
  const load: any = Ui.Loading();
  Request.Post('erp_goods_info/status?lang=' + state.lang, {
    token: state.token,
    sku: sku,
  },(res: any) => {
    load.clear();
    const {code, msg, data}: any = res.data;
    if(code===0){
      const list: Array<any> = goods.value.list;
      for(let k in data){
        for(let v of list){
          if(v.sku_id===k) v.status = data[k];
        }
      }
    } else Ui.Toast(msg);
  });
}

/* 商品资料-移除 */
const goodsRemove =(type: string, index: number = 0): void => {
  remove.value.type = type;
  remove.value.data = [];
  if(type==='part'){
    const list: Array<any> = tableList.value.getData();
    if(list.length==0) return Ui.Toast('请选择数据');
    remove.value.show = true;
    remove.value.title = '清空';
    remove.value.info = '是否移除选中数据?';
    for(let v of list){
      remove.value.data.unshift({ index: v.index });
    }
  } else if(type = 'one'){
    remove.value.show = true;
    remove.value.title = '移除';
    remove.value.info = goods.value.list[index].sku_id;
    remove.value.data.unshift({ index: index });
  }
}
/* 商品资料-移除确认 */
const goodsRemoveSub =(): void => {
  remove.value.show = false;
  // 数据
  const list = goods.value.list;
  const data = remove.value.data;
  for(let v of data) list.splice(v.index, 1);
  // 清除
  clearSelect();
  remove.value.data = [];
  // 统计价格
  goodsTotal();
}

/* 商品资料-打印标签 */
const goodsPrint =(): void => {
  let list: Array<any> = goods.value.list;
  let sku: Array<any> = [];
  for(let v of list){
    if(v.status===0 || v.status===1) return Ui.Toast('请先上传商品资料!');
    sku.push({ sku_id: v.sku_id });
  }
  if(sku.length===0) return Ui.Toast('请添加或导入商品资料!');
  state.print.sku = sku;
  state.print.show = true;
}

/* 商品资料-上传 */
const goodsUpload =() => {
  if(goods.value.list.length===0) return Ui.Toast('请添加或导入商品资料!');
  // 状态
  imp.value.s0 = imp.value.s1 = imp.value.s2 = imp.value.s3 = imp.value.s4 = 0;
  let list: Array<any> = goods.value.list;
  for(let v of list){
    if(v.status===0) imp.value.s0++;
    else if(v.status===1) imp.value.s1++;
    else if(v.status===2) imp.value.s2++;
    else if(v.status===3) imp.value.s3++;
    else if(v.status===4) imp.value.s4++;
  }
  // 验证
  if(imp.value.s0 > 0) return Ui.Toast('该状态不可用!');
  imp.value.show = true;
}

/* 提交 */
const submit =(): void => {
  // 商品资料
  let data: Array<any> = [];
  let list: Array<any> = goods.value.list;
  for(let v of list){
    if(v.status != 3 && v.status != 4) data.push(v);
  }
  if(data.length===0) return Ui.Toast('无可上传商品资料!');
  // 请求
  imp.value.show = false;
  imp.value.refresh = true;
  const load: any = Ui.Loading();
  Request.Post('erp_goods_info/import?lang=' + state.lang, {
    token: state.token,
    data: data,
    price: goods.value.price.checked,
  },(res: any) => {
    load.clear();
    const {code, msg}: any = res.data;
    Ui.Toast(msg);
    if(code===0){
      let sku: Array<string> = [];
      for(let v of data) sku.push(v.sku_id);
      goodsStatus(sku);
    }
  });
}

/* 商品-复制 */
const goodsCopy = (name: string, val: string) => {
  const list: Array<any> = tableList.value.getData();
  let sku_id: string = '';
  for(let i in list) sku_id += list[i][name] + ' ';
  if(sku_id) Util.CopyText(sku_id);
  else Util.CopyText(val);
}

/* 清除勾选 */
const clearSelect = (): void => {
  nextTick(()=>{
    tableList.value.checkboxAll(false);
  });
}

/* 关闭 */
const close =(): void => {
  emit('update:show', false);
  emit('submit', imp.value.refresh);
}

</script>
