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
            textAlign: v.textAlign,
          }">{{ v.title }}</td>
        </tr>
      </thead>
      <tbody class="wm-table_list">
        <tr v-for="(data, k) in options" :key="k">
          <td class="checkbox" v-if="isCheckbox" :class="data.checked?'active':''">
            <wm-checkBox :options="{label:'', value:data.id, checked:data.checked, disabled:data.disabled}" margin="0" @checkbox="Checkbox"></wm-checkBox>
          </td>
          <td v-for="(v, n) in columns" :key="n" :title="data[v.index]" :class="data.checked?'active':''">
            <slot v-if="v.slot" v-bind="data" :name="v.slot" :index="k">{{ data[v.index] || '-' }}</slot>
            <span v-else>{{ data[v.index] || '-' }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="less" scoped>
.wm-table_body{overflow: hidden;}
.wm-table{width: 100%; border-collapse: collapse;}
.wm-table .checkbox{width: 24px; text-align: center; position: sticky; z-index: 10; left: 0;}
.wm-table .checkbox::after,.wm-table .checkbox::before{content: ''; position: absolute; width: 1px; height: 100%;}
.wm-table .checkbox::after{left: -1px; top: 0; background-color: #ECECEC;}
.wm-table .checkbox::before{right: -1px; top: 0; background-color: #ECECEC;}
.wm-table td{padding: 4px 8px; height: 32px; line-height: 20px; white-space: nowrap; border: #FFF 1px solid;}
.wm-table_title td{background-color: #F2F4F8; color: @Minor4; font-weight: bold;}
.wm-table_list tr:nth-child(odd) td{background-color: #FFF;}
.wm-table_list tr:nth-child(even) td{background-color: #F2F6FA;}
.wm-table_list tr:hover td{background-color: #EAF0F4;}
.wm-table_list tr:last-child td{border-bottom-color: #F2F2F2;}
.wm-table_list tr td.active{background: #D7E3EE;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
/* 组件 */
import wmCheckBox from '@/components/form/checkbox/index.vue'

@Options({
  components: { wmCheckBox },
  props: {
    columns: {type: Array, default: []},          // 字段: [{title: '名称', width: '30px', index: 'title', slot: 'title', textAlign: 'right'}]
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
  checkboxAll(): void {
    this.checkbox.checked = !this.checkbox.checked;
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

}
</script>