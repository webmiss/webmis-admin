<template>
  <div class="wm-switch_body">
    <span ref="Switch" class="wm-switch" :class="show?'active':'inactive'" @click="click();">
      <span ref="SwitchCursor" class="wm-switch_cursor" :style="{left: show?'18px':'2px'}"></span>
    </span>
  </div>
</template>

<style lang="less" scoped>
.wm-switch_body{height: 20px; padding: 0 4px;}
.wm-switch{display: inline-block; position: relative; cursor: pointer; width: 36px; height: 20px; border-radius: 10px; transition: @Transition;}
.wm-switch.active{background-color: @Primary;}
.wm-switch.inactive{background-color: @BorderColor;}
.wm-switch_cursor{position: absolute; width: 16px; height: 16px; background-color: #FFF; border-radius: 50%; top: 50%; transform: translate(0,-50%); transition: @Transition;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Switch',
  props: {
    value: {type: Boolean, default: false},   //值
  },
  data(){
    const show: Boolean = false;
    return {show};
  },
  watch:{
    value(val: any){
      this.show = val;
    }
  },
  mounted(){
    // 初始化
    this.show = this.value;
  },
  methods:{

    /* 选择 */
    click(){
      // 事件
      this.show=!this.show
      this.$emit('update:value', this.show);
    },
    
  }
});
</script>