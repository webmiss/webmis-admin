<template>
  <ul class="wm-radio">
    <template v-for="(v,k) in list" :key="k">
      <li class="flex disabled" v-if="v.disabled">
        <span class="checked"></span>
        <span class="label">{{ v.label }}</span>
      </li>
      <li class="enabled" v-else @click.stop="clickRadio(k)">
        <span class="checked" :class="v.value==value?'active':''"></span>
        <span class="label">{{ v.label }}</span>
      </li>
    </template>
  </ul>
</template>

<style lang="less" scoped>
.wm-radio{line-height: 26px;}
.wm-radio li{display: inline-block; cursor: pointer; padding: 5px; margin: 0 4px; line-height: 16px;}
.wm-radio li span{float: left;}
.wm-radio .checked{position: relative; display: inline-flex; width: 16px; height: 16px; border: @BorderColor 1px solid; border-radius: 50%; box-sizing: border-box; background-color: #FFF; transition: @Transition;}
.wm-radio .label{display: inline-flex; padding-left: 6px;}
/* 选中 */
.wm-radio .active{border-color: @Primary; background-color: @Primary;}
.wm-radio .active::after{content: ""; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -60%); width: 6px; height: 6px; background-color: #FFF; border-radius: 50%;}
/* 禁用 */
.wm-radio .disabled{cursor: not-allowed;}
.wm-radio .disabled .checked{border-color: @BaseBorder; background-color: #DADCDF;}
.wm-radio .disabled:hover .checked{border-color: rgba(0,0,0,0.2);}
.wm-radio .disabled .active{border-color: rgba(0,0,0,0.2);}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
  components: { },
  props: {
    value: {default: ''},                 // 默认值
    options: {type: Array, default: []},  // 数据: [{label:'男', value:'男', disabled: true},{label:'女', value:'女'}]
  }
})
export default class Radio extends Vue {

  // 参数
  value!: any;
  options!: any;
  // 变量
  list: Array<any>=[];

  /* 创建成功 */
  created(): void {
    // 监听
    this.$watch('options', (val:any)=>{
      this.list = val;
    }, { deep: true });
  }
  /* 创建完成 */
  public mounted(): void {
    this.list = this.options;
  }

  /* 点击选择 */
  clickRadio(k: number): void {
    for(let i in this.list) {
      this.list[k].checked = k.toString()==i;
    }
    this.$emit('update:value', this.list[k].value);
    this.$emit('update:options', this.list);
  }

}
</script>