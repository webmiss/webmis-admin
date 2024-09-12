<template>
  <div class="wm-switch" :class="disabled?'disabled':(value?'active':'')" @click="!disabled?clickSwitch():''">
    <div class="circle" :class="value?'right':'left'"></div>
  </div>
</template>

<style lang="less" scoped>
.wm-switch{cursor: pointer; position: relative; width: 40px; height: 20px; border-radius: 10px; background-color: #00000040; transition: @Transition;}
.wm-switch:hover{background-color: #00000050;}
.wm-switch .circle{position: absolute; width: 16px; height: 16px; background-color: #FFF; top: 50%; transform: translateY(-50%); border-radius: 50%; transition: @Transition;}
.wm-switch .left{left: 2px;}
.wm-switch .right{left: calc(100% - 18px);}
.wm-switch.active{background-color: @Primary;}
.wm-switch.disabled{cursor: not-allowed; background-color: #00000020;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
  components: { },
  props: {
    value: {type: Boolean, default: false},       // 默认值
    disabled: {type: Boolean, default: false},    // 是否禁用
  }
})
export default class Switch extends Vue {

  // 参数
  value!: any;
  disabled!: any;

  /* 创建成功 */
  created(): void {
  }

  /* 点击选择 */
  clickSwitch(): void {
    this.$emit('update:value', !this.value);
  }

}
</script>