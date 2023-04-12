<template>
  <table class="wm-table">
    <tbody class="wm-table_top">
      <slot name="top"></slot>
    </tbody>
    <tbody class="wm-table_title" v-if="isTitle">
      <td width="24" class="checkbox" v-if="isCheckbox">
        <wm-checkbox v-model:checked="show"></wm-checkbox>
      </td>
      <slot name="title"></slot>
    </tbody>
    <tbody ref="wmTable" class="wm-table_list">
      <slot :data="data"></slot>
    </tbody>
  </table>
</template>

<style lang="less">
.wm-table{width: 100%; border-collapse: collapse; box-sizing: border-box; border-radius: 4px;}
.wm-table .checkbox{position: relative;}
.wm-table .wm-checkbox{position: absolute; top: 50%; transform: translateY(-50%);}
.wm-table td{position: relative; padding: 4px 8px; line-height: 28px; border: #FFF 1px solid;}
.wm-table_top td{line-height: 24px; text-align: center; padding: 10px 0;}
.wm-table_title{position: relative; font-size: 12px; font-weight: 600; color: #606266; background-color: #F2F2F2;}
.wm-table_list tr:nth-child(odd){background-color: #FFF;}
.wm-table_list tr:nth-child(even){background-color: #F8F8F8;}
.wm-table_list tr:hover{background-color: #ECF0F1;}
.wm-table_list tr:last-child td{border-bottom-color: #F2F2F2;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import wmCheckbox from '../form/checkbox/index.vue'
export default defineComponent({
  name:'Table',
  components: {wmCheckbox},
  props: {
    data: {type:Array, default:[]},             //数据: [{id:val},{id:val}]
    isTitle: {type: Boolean, default: true},    //显示标题
    isCheckbox: {type: Boolean, default: true}, //显示多选框
  },
  data(){
    const show: Boolean = false;
    return {show};
  },
  watch: {
    show(val){
      this.setCheck(val);
    },
  },
  methods:{

    /* 全选&不选 */
    setCheck(type: boolean){
      this.show = type;
      const obj = (this.$refs.wmTable as any).querySelectorAll('.wm-table_checkbox .checked');
      for(let i=0; i<obj.length; i++){
        if(type) obj[i].classList.add("active");
        else obj[i].classList.remove("active");
      }
    },

    /* 获取选中值 */
    getVals(){
      let vals: any = [];
      const obj: any = (this.$refs.wmTable as any).querySelectorAll('.wm-table_checkbox .active');
      if(obj.length==0) return '';
      for(let i=0; i<obj.length; i++){
        vals.push(obj[i].querySelector('input').value);
      }
      return vals;
    },

    /* 获取单条 */
    getRow(name: string='id'){
      let row = {};
      // 是否选择
      const obj: any = (this.$refs.wmTable as any).querySelector('.wm-table_checkbox .active');
      if(!obj) return '';
      // 获取数据
      const val: any = obj.querySelector('input').value;
      const data: any = this.data;
      for(let v of data){
        if(v[name] && v[name]==val){
          row = v;
          break;
        }
      }
      return row;
    },

    /* 获取多条 */
    getData(name: string='id'){
      let row = [];
      // 是否选择
      const obj: any = (this.$refs.wmTable as any).querySelectorAll('.wm-table_checkbox .active');
      if(!obj) return '';
      // 获取数据
      for(let x=0; x<obj.length; x++){
        let val: any = obj[x].querySelector('input').value;
        let data: any = this.data;
        for(let v of data){
          if(v[name] && v[name]==val) row.push(v);
        }
      }
      return row;
    },

  },
});
</script>