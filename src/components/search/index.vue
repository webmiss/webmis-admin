<template>
  <div class="wm-search">
    <div class="wm-search_title flex">
      <h2>搜索</h2>
      <span @click="$emit('update:show', false)"><i class="ui ui_arrow_left"></i></span>
    </div>
    <div class="wm-search_body scrollbar">
      <ul class="wm-search_form">
        <slot></slot>
      </ul>
      <div class="wm-search_button">
        <wm-button type="primary" @click="$emit('update:submit')" height="32px">搜 索</wm-button>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.wm-search{position: relative; height: 100%; font-size: 14px;}
.wm-search li{position: relative;}
.wm-search .line::before{content: ''; position: absolute; width: 100%; height: 0.5px; background-color: #E2E2E2;}
.wm-search_title{line-height: 32px; padding: 4px; background-image: linear-gradient(172deg, @Minor, #FFF); box-sizing: border-box;}
.wm-search_title h2{font-size: 14px; padding-left: 10px; font-weight: 600;}
.wm-search_title span{cursor: pointer; width: 32px; height: 32px; line-height: 32px; text-align: center; border-radius: 50%;}
.wm-search_title span i{font-size: 12px; color: @Info;}
.wm-search_title span:hover i{color: @Primary;}
.wm-search_body{overflow-y: auto; height: calc(100% - 48px);}
.wm-search_form{padding: 8px 16px;}
.wm-search_form li{padding: 5px 0;}
.wm-search_button{text-align: center; padding-bottom: 16px;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import wmButton from '../form/button/index.vue'
export default defineComponent({
  name:'Search',
  components: {wmButton},
  props: {
    show: {type:Boolean, default:false},    //是否显示
  },
});
</script>