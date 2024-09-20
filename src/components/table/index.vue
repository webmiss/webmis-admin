<template>
  <div class="wm-table_body scrollbar" :style="{
    height: height,
    overflowX: overflowX,
    overflowY: overflowY,
  }">
    <table class="wm-table" :style="{width: width}">
      <thead class="wm-table_title">
        <tr>
          <td class="checkbox" v-if="isCheckbox">
            <wm-checkBox v-model:value="checkbox.value" :partially="checkbox.partially" :options="checkbox.data" margin="0" @checkbox="checkboxAll()"></wm-checkBox>
          </td>
          <td v-for="(v, k) in columns" :key="k" :style="{
            width: v.width,
            minWidth: v.minWidth,
            maxWidth: v.maxWidth?v.maxWidth+' !important':'',
            textAlign: v.textAlign
          }">
            {{ v.title }}
            <div class="order_body" v-if="['', 'asc', 'desc'].includes(v.order)" @click="OrderBy(k, v.index, v.order)">
              <div class="order">
                <i class="ui ui_arrow_up" :class="v.order=='desc'?'active':''"></i>
                <i class="ui ui_arrow_down" :class="v.order=='asc'?'active':''"></i>
              </div>
            </div>
          </td>
        </tr>
      </thead>
      <tbody class="wm-table_list">
        <template v-if="options.length>0">
          <tr v-for="(data, k) in options" :key="k">
            <td class="checkbox" v-if="isCheckbox" :class="data.checked?'active':''">
              <wm-checkBox :options="{label:'', value:data.id, checked:data.checked, disabled:data.disabled}" margin="0" @checkbox="Checkbox"></wm-checkBox>
            </td>
            <td v-for="(v, n) in columns" :key="n" :title="data[v.index]" :class="data.checked?'active':''">
              <slot v-if="v.slot" v-bind="data" :name="v.slot" :index="k"></slot>
              <span v-else>{{ data[v.index] || '-' }}</span>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td class="null" :colspan="columns.length+(isCheckbox?1:0)"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="less" scoped>
.wm-table_body{overflow: hidden;}
.wm-table{width: 100%; border-collapse: collapse;}
.wm-table .checkbox{width: 24px; text-align: center; position: sticky; z-index: 1; left: 0;}
.wm-table .checkbox::after,.wm-table .checkbox::before{content: ''; position: absolute; width: 1px; height: 100%;}
.wm-table .checkbox::after{left: -1px; top: 0; border-left: #F4F6F8 1px solid;}
.wm-table .checkbox::before{right: -1px; top: 0; border-right: @Primary5 1px solid;}
.wm-table td{padding: 4px 8px; height: 40px; line-height: 1; white-space: nowrap; border: #FFF 1px solid; box-sizing: border-box;}
.wm-table_title{position: sticky; z-index: 2; top: 0;}
.wm-table_title::after{content: ''; position: absolute; top: -1px; width: 100%; height: 1px; background-color: #F4F6F8;}
.wm-table_title td{position: relative; background-color: #F4F6F8; color: @Minor4; font-weight: bold; font-size: 12px;}
.wm-table_title .order_body{cursor: pointer; position: absolute; right: 0; top: 0; width: 16px; height: 100%; background-color: #F4F6F8;}
.wm-table_title .order_body:hover{background-color: #FFF; color: @Primary;}
.wm-table_title .order{position: absolute; width: 100%; height: 16px; left: 50%; top: 50%; transform: translate(-50%, -50%);}
.wm-table_title .order i{float: left; width: 100%; height: 50%; line-height: 10px; font-size: 12px; zoom: 0.8; text-align: center;}
.wm-table_title .order .active{color: @Primary;}
.wm-table_list tr:nth-child(odd) td{background-color: #FFF;}
.wm-table_list tr:nth-child(even) td{background-color: #F4F6F8;}
.wm-table_list tr:hover td{background-color: #EAF0F4;}
.wm-table_list tr:last-child td{border-bottom-color: #F2F2F2;}
.wm-table_list tr td.active{background: #D7E3EE;}
.wm-table_list .null{height: 160px;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
/* 组件 */
import wmCheckBox from '@/components/form/checkbox/index.vue'

@Options({
  components: { wmCheckBox },
  props: {
    columns: {type: Array, default: []},          // 字段: [{title: '名称', index: 'title', slot: 'title', width: '40px', minWidth: '30px', maxWidth: '120px', textAlign: 'right'}]
    options: {type: Array, default: []},          // 数据: [{id: 1, title: '系统', remark: '', checked:true, }]
    width: {type: String, default: '100%'},       // 宽
    height: {type: String, default: '100%'},      // 高
    overflowX: {type: String, default: 'auto'},   // 滚动条: x轴
    overflowY: {type: String, default: 'auto'},   // 滚动条: y轴
    isCheckbox: {type: Boolean, default: true},   // 是否多选
  }
})
export default class Table extends Vue {

  // 参数
  columns!: Array<any>;
  options!: Array<any>;
  width!: string;
  height!: string;
  overflowX!: any;
  overflowY!: any;
  isCheckbox!: boolean;
  // 变量
  checkbox: any = {checked: false, partially: false, value:'', data:{label:'', value:'all'}};

  /* 创建成功 */
  created(): void {
    this.$watch('columns', (val: Array<any>)=>{
      this.partially();
    }, { deep: true });
  }

  /* 全选、全不选 */
  checkboxAll(status: boolean | string = ''): void {
    if(this.options.length==0) return ;
    this.checkbox.checked = typeof status=='boolean'?status:!this.checkbox.checked;
    for(let i in this.options) {
      if(!this.options[i].disabled) this.options[i].checked = this.checkbox.checked;
    }
    this.partially();
  }

  /* 勾选 */
  Checkbox(label: any, value: any): void {
    for(let i in this.options) {
      if(this.options[i].id==value){
        this.options[i].checked=!this.options[i].checked;
        break;
      }
    }
    this.partially();
  }

  /* 局部选中 */
  partially(): void {
    let n: number = 0;
    const t: number = this.options.length;
    for(let i in this.options) {
      if(this.options[i].checked) n++;
    }
    // 状态
    if(t>0 && t==n){
      this.checkbox.checked = true;
      this.checkbox.value = 'all';
      this.checkbox.partially = false;
      this.checkbox.data.checked = true;
    }else if(t>0 && n>0) {
      this.checkbox.checked = true;
      this.checkbox.value = 'all';
      this.checkbox.partially = true;
      this.checkbox.data.checked = true;
    } else {
      this.checkbox.checked = false;
      this.checkbox.value = 'other';
      this.checkbox.partially = false;
      this.checkbox.data.checked = false;
    }
    this.$emit('partially', n, t);
  }

  /* 获取数据 */
  getData(): Array<any> {
    let data: Array<any> = [];
    for(let i in this.options) {
      if(this.options[i].checked) data.push(this.options[i]);
    }
    return data;
  }

  /* 排序 */
  OrderBy(k:number, index: string, order: string): void {
    if(order=='asc') order = 'desc';
    else if(order=='desc') order = '';
    else order = 'asc';
    this.columns[k].order = order;
    this.$emit('orderBy', order?index+' '+order:'');
  }

}
</script>