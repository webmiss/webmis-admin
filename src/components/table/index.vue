<template>
  <div class="wm-table_body scrollbar" :style="{
    height: height,
    overflow: overflow,
  }">
    <table class="wm-table" :style="{width: width, height: options.length==0?height:''}">
      <thead class="wm-table_title">
        <tr>
          <td class="checkbox" v-if="isCheckbox">
            <wmCheckBox v-model:value="checkbox.value" :partially="checkbox.partially" :options="checkbox.data" margin="0" @checkbox="checkboxAll()"></wmCheckBox>
          </td>
          <td v-for="(v, k) in columns" :key="k" :style="{
            width: v.width,
            minWidth: v.minWidth,
            maxWidth: v.maxWidth?v.maxWidth+' !important':'',
            textAlign: v.textAlign
          }">
            {{ v.title }}
            <div class="order_body" v-if="['', 'ASC', 'DESC'].includes(v.order)" @click="OrderBy(k, v.index, v.order)">
              <div class="order">
                <i class="ui ui_arrow_up" :class="v.order=='DESC'?'active':''"></i>
                <i class="ui ui_arrow_down" :class="v.order=='ASC'?'active':''"></i>
              </div>
            </div>
          </td>
        </tr>
      </thead>
      <tbody class="wm-table_list">
        <template v-if="options.length>0">
          <tr v-for="(d, k) in options" :key="k">
            <td class="checkbox" v-if="isCheckbox" :class="d.checked?'active':''">
              <wm-checkBox :options="{label:'', value:d.id, checked:d.checked, disabled:d.disabled}" margin="0" @checkbox="Checkbox"></wm-checkBox>
            </td>
            <template v-if="typeof d.display=='undefined' || d.display">
              <td v-for="(v, n) in columns" :key="n" :title="d[v.index]" :class="[d.checked?'active':'', v.class?v.class: '']">
                <slot v-if="v.slot" v-bind="d" :name="v.slot" :index="k"></slot>
                <span v-else>{{ d[v.index] || '-' }}</span>
              </td>
            </template>
          </tr>
        </template>
        <slot v-else-if="options.length==0&&isSlot"></slot>
        <tr v-else>
          <td class="null" :colspan="columns.length+(isCheckbox?1:0)"></td>
        </tr>
      </tbody>
      <tr v-if="isBottom">
        <td :colspan="columns.length+(isCheckbox?1:0)" style="padding: 0;">
          <slot name="bottom"></slot>
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="less" scoped>
.wm-table_body{overflow: visible;}
.wm-table{width: 100%; border-collapse: collapse;}
.wm-table .checkbox{width: 24px; text-align: center; position: sticky; z-index: 1; left: 0;}
.wm-table .checkbox::after,.wm-table .checkbox::before{content: ''; position: absolute; width: 1px; height: 100%;}
.wm-table .checkbox::after{left: -1px; top: 0; border-left: #F4F6F8 1px solid;}
.wm-table .checkbox::before{right: -1px; top: 0; border-right: @Primary5 1px solid;}
.wm-table td{padding: 4px; height: 40px; line-height: 1; white-space: nowrap; border: #FFF 1px solid; box-sizing: border-box;}
.wm-table_title{position: sticky; z-index: 2; top: 0;}
.wm-table_title::after{content: ''; position: absolute; top: -1px; width: 100%; height: 2px; background-color: #F4F6F8;}
.wm-table_title td{position: relative; background-color: #F4F6F8; color: @Minor4; font-weight: bold; font-size: 12px;}
.wm-table_title .order_body{cursor: pointer; position: absolute; right: 0; top: 0; width: 16px; height: 100%; background-color: #F4F6F8;}
.wm-table_title .order_body:hover{background-color: #FFF; color: @Primary;}
.wm-table_title .order{position: absolute; width: 100%; height: 16px; left: 50%; top: 50%; transform: translate(-50%, -50%);}
.wm-table_title .order i{float: left; width: 100%; height: 50%; line-height: 10px; font-size: 12px; zoom: 0.8; text-align: center;}
.wm-table_title .order .active{color: @Primary;}
.wm-table_list tr:nth-child(odd) td{background-color: #FFF;}
.wm-table_list tr:nth-child(even) td{background-color: #F4F6F8;}
.wm-table_list tr:hover td{background-color: #EAF0F4;}
.wm-table_list tr:last-child td{border-bottom-color: #F4F6F8;}
.wm-table_list tr td.active{background: #D7E3EE;}
.wm-table_list .null{height: 160px;}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';
import wmCheckBox from '../form/checkbox/index.vue';

/* 参数 */
const props = defineProps({
    columns: {type: Array<any>, default: []},       // 字段: [{title: '名称', index: 'title', slot: 'title', width: '40px', minWidth: '30px', maxWidth: '120px', textAlign: 'right'}]
    options: {type: Array<any>, default: []},       // 数据: [{id: 1, title: '系统', remark: '', checked:true, }]
    width: {type: String, default: '100%'},         // 宽
    height: {type: String, default: '100%'},        // 高
    overflow: {type: String, default: ''},          // 滚动条
    isCheckbox: {type: Boolean, default: true},     // 是否多选
    isSlot: {type: Boolean, default: false},        // 是否自定义表体
    isBottom: {type: Boolean, default: false},      // 是否底部内容
  });
const emit = defineEmits(['partially', 'orderBy']);
// 变量
const checkbox = ref({checked: false, partially: false, value:'', data:{label:'', value:'all', checked:false}});

/* 监听 */
watch(()=>props.columns, (val: Array<any>)=>{
  partially();
},{ deep: true });



/* 全选、全不选 */
const checkboxAll = (status: boolean | string = ''): void => {
  if(props.options.length==0) return ;
  checkbox.value.checked = typeof status=='boolean'?status:!checkbox.value.checked;
  for(let i in props.options) {
    if(!props.options[i].disabled) props.options[i].checked = checkbox.value.checked;
  }
  partially();
}

/* 勾选 */
const Checkbox = (label: any, value: any): void => {
  for(let i in props.options) {
    if(props.options[i].id==value){
      props.options[i].checked=!props.options[i].checked;
      break;
    }
  }
  partially();
}

/* 局部选中 */
const partially = (): void => {
  let n: number = 0;
  const t: number = props.options.length;
  for(let i in props.options) {
    if(props.options[i].checked) n++;
  }
  // 状态
  if(t>0 && t==n){
    checkbox.value.checked = true;
    checkbox.value.value = 'all';
    checkbox.value.partially = false;
    checkbox.value.data.checked = true;
  }else if(t>0 && n>0) {
    checkbox.value.checked = true;
    checkbox.value.value = 'all';
    checkbox.value.partially = true;
    checkbox.value.data.checked = true;
  } else {
    checkbox.value.checked = false;
    checkbox.value.value = 'other';
    checkbox.value.partially = false;
    checkbox.value.data.checked = false;
  }
  emit('partially', n, t);
}

/* 获取数据 */
const getData = (): Array<any> => {
  let data: Array<any> = [];
  let tmp: Object = {};
  for(let i in props.options) {
    if(props.options[i].checked){
      tmp = props.options[i];
      tmp['index'] = parseInt(i);
      data.push(tmp);
    }
  }
  return data;
}

/* 排序 */
const OrderBy = (k:number, index: string, order: string): void => {
  if(order=='ASC') order = 'DESC';
  else if(order=='DESC') order = '';
  else order = 'ASC';
  props.columns[k].order = order;
  emit('orderBy', order?index+' '+order:'');
}

/* 外部函数 */
defineExpose({  
  checkboxAll,
  getData,
});

</script>
