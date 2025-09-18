<template>
  <wmDialog v-model:show="infoShow" :title="title" width="1240px" bottom="40px" overflow="hidden auto" @close="close()">
    <wmMain paddingX="32px" paddingY="0">
      <wmTabs v-model:value="tabIndex" :columns="tabs">
        <!-- 商品信息 -->
        <template #base>
          <div class="print_goods" ref="printGoods">
            <div class="title">{{ info.title }}</div>
            <div class="info">
              <span>日期: <b>{{ info.ctime?info.ctime.substr(0, 10):'-' }}</b>&nbsp;&nbsp;&nbsp;&nbsp;单号: <b>{{ info.id || '-' }}</b></span>
              <span>签字: ________________________________</span>
            </div>
            <table class="total">
              <tbody>
                <tr>
                  <td class="ct" colspan="4">
                    <span v-if="info.cost_price">成本价(元): <b>{{ priceEncode(info.cost_price) }}</b>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span v-if="info.sale_price">标签价(元): <b>{{ priceEncode(info.sale_price) }}</b>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span v-if="info.purchase_price">采购价(W): <b>{{ priceEncode(info.purchase_price) }}</b>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span v-if="info.market_price">吊牌价(W): <b>{{ priceEncode(info.market_price) }}</b>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span v-if="info.num">数量: <b>{{ info.num || '0' }}</b>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </td>
                </tr>
                <tr v-if="info.level || info.level_time">
                  <td class="label">场次</td>
                  <td>{{ info.level || '-' }}</td>
                  <td class="label">时段</td>
                  <td>{{ info.level_time || '-' }}</td>
                </tr>
                <tr v-if="info.shop_name || info.shop_to_name">
                  <td class="label">店铺名称</td>
                  <td>{{ info.shop_name || '-' }}</td>
                  <td class="label">买断店铺</td>
                  <td>{{ info.shop_to_name || '-' }}</td>
                </tr>
                <tr>
                  <td class="label">制单员</td>
                  <td>{{ info.creator_name || '-' }}</td>
                  <td class="label">审核人</td>
                  <td>{{ info.operator_name || '-' }}</td>
                </tr>
                <tr>
                  <td class="label">制单时间</td>
                  <td>{{ info.ctime || '-' }}</td>
                  <td class="label">审核时间</td>
                  <td>{{ info.utime || '-' }}</td>
                </tr>
                <tr>
                  <td class="label">备注</td>
                  <td colspan="3">{{ info.remark || '-' }}</td>
                </tr>
              </tbody>
            </table>
            <div class="other">{{ copy }}</div>
            <div class="title">商品明细</div>
            <table class="list">
              <thead class="columns">
                <tr>
                  <td>序号</td>
                  <td v-for="v in columns" v-show="v.checked">{{ v.label }}</td>
                </tr>
              </thead>
              <tbody v-if="data.length>0">
                <tr v-for="(d,k) in data">
                  <td style="text-align: center;">{{ k+1 }}</td>
                  <template v-for="v in columns">
                    <td v-if="v.checked" :style="{textAlign: v.textAlign}">
                      <template v-if="v.price&&d[v.value]>0">
                        <span v-if="d['ratio']!='1.00'">
                          <del>{{ priceEncode(d[v.value]*d['num']) }}</del> <b>{{ priceEncode(d[v.value]*d['num']*d['ratio']) }}</b>
                        </span>
                        <b v-else>{{ priceEncode(d[v.value]*d['num']) }}</b>
                      </template>
                      <span v-else>{{ d[v.value] }}</span>
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
            <div class="other">{{ copy }}</div>
          </div>
        </template>
        <!-- 商品信息 End -->
        <!-- 商品字段 -->
        <template #field>
          <wmAlert>提醒: 勾选需要打印字段</wmAlert>
          <ul class="print_field">
            <li v-for="v in columns">
              <wm-checkbox :options="v"></wm-checkbox>
            </li>
          </ul>
        </template>
        <!-- 商品字段 End -->
      </wmTabs>
    </wmMain>
    <template #bottom>
      <wmButton height="40px" padding="0 32px" @click="submit()">{{ langs.print }}</wmButton>
    </template>
  </wmDialog>
</template>

<style lang="less" scoped>
/* 商品信息 */
.print_goods{overflow: hidden; padding: 16px 0; font-size: 14px;}
.print_goods .ct{text-align: center;}
.print_goods .other{line-height: 40px; color: #666; text-align: center;}
.print_goods .title{line-height: 40px; padding-top: 20px; font-size: 21px; font-weight: bold; text-align: center;}
.print_goods .info{line-height: 32px; display: flex; justify-content: space-between; flex-wrap: wrap;}
.print_goods .total{overflow: hidden; width: 100%; border-collapse: collapse; box-sizing: border-box; border-radius: 4px;}
.print_goods .total td{line-height: 24px; padding: 8px; border: #DADCDF 1px solid;}
.print_goods .total .label{text-align: right; color: #666;}
.print_goods .list{overflow: hidden; width: 100%; border-collapse: collapse; box-sizing: border-box; border-radius: 4px;}
.print_goods .list td{line-height: 24px; padding: 4px 8px; border: #DADCDF 1px solid;}
.print_goods .columns{background-color: #F2F2F2; text-align: center; font-weight: bold; white-space: nowrap;}
.print_goods tbody tr:nth-child(odd) td{background-color: #FFF;}
.print_goods tbody tr:nth-child(even) td{background-color: #F2F4F6;}
/* 字段 */
.print_field{overflow: hidden; padding: 16px 10px;}
.print_field li{padding: 4px 0;}
.print_field li:hover{background-color: #F2F4F6;}
</style>

<script setup lang="ts">
import { ref, watch, getCurrentInstance} from 'vue';
import { useStore } from "vuex";
import printJS from "print-js";
/* JS组件 */
import Env from '../../config/Env';
import Format from '../../library/format';
/* 组件 */
import wmMain from '../../components/container/main.vue';
import wmAlert from '../../components/alert/index.vue';
import wmDialog from '../../components/dialog/index.vue';
import wmTabs from '../../components/tabs/index.vue';
import wmButton from '../../components/form/button/index.vue';
import wmCheckbox from '../../components/form/checkbox/index.vue';

/* 参数 */
const props = defineProps({
  show: { type: Boolean, default: false },    // 是否显示
  title: { type: String, default: '打印' },   // 标题
  info: { type: Object, default: {} },        // 信息
  columns: { type: Array<any>, default: [] },      // 字段
  data: { type: Array<any>, default: [] },         // 数据
});
const { proxy } = getCurrentInstance() as any ;
const emit = defineEmits(['update:show']);
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
const copy = Env.title+' v'+Env.version+' '+Env.copy;
const priceEncode: Function = Format.priceEncode;
// 变量
const infoShow = ref(false);
// Tabs
const tabIndex = ref('base');
const tabs = ref([
  {label: '打印内容', value: 'base', slot: 'base'},
  {label: '商品字段', value: 'field', slot: 'field'},
]);

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
},{ deep: true });

/* 提交 */
const submit = (): void => {
  printJS({printable: proxy.$refs.printGoods, type: "html", scanStyles: false, css: "/print/goods.css"});
}

/* 关闭 */
const close = (): void => {
  emit('update:show', false);
}

</script>