<template>
  <div class="wm-tabs">
    <ul class="wm-tabs_list">
      <li v-for="(v,k) in data" :key="k" :class="v.value==active?'active':''" @click="$emit('update:active', v.value)">{{v.label}}</li>
    </ul>
    <div class="wm-tabs_body" v-for="(v,k) in data" :key="k" v-show="v.value==active">
      <slot :name="v.value"></slot>
    </div>
  </div>
</template>

<style lang="less">
.wm-tabs{overflow: hidden;}
.wm-tabs_list{height: 40px; border-bottom: #F2F2F2 2px solid; display: flex; justify-content: flex-start; flex-wrap: wrap; box-sizing: border-box;}
.wm-tabs_list li{cursor: pointer; height: 38px; line-height: 40px; padding: 0 16px; border-bottom: #F2F2F2 2px solid;}
.wm-tabs_list li:hover{color: @Primary;}
.wm-tabs_list .active{border-bottom: @Primary 2px solid; color: @Primary; font-weight: bold;}
.wm-tabs_body{overflow: hidden;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name:'Tabs',
  props: {
    active: {type:String, default:''},  //默认选择
    data: {type:Array, default:[]},     //数据: [{label:'Tab1', value:'tab1'},{label:'Tab2', value:'tab2'}]
  },
});
</script>