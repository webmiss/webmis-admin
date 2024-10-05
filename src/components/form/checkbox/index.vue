<template>
  <ul class="wm-checkbox">
    <li v-if="options.disabled" class="disabled" :style="{margin:margin, padding:padding}">
      <span class="checkbox" :class="options.checked?'active':''">
        <i class="partially" v-if="partially"></i>
        <i class="all" v-else></i>
      </span>
      <span class="label" v-if="options.label">{{ options.label }}</span>
    </li>
    <li v-else :style="{margin:margin, padding:padding}" @click.stop="clickCheckbox()">
      <span class="checkbox" :class="options.checked||value==options.value?'active':''">
        <i class="partially" v-if="partially"></i>
        <i class="all" v-else></i>
      </span>
      <span class="label" v-if="options.label">{{ options.label }}</span>
    </li>
  </ul>
</template>

<style lang="less" scoped>
.wm-checkbox{white-space: nowrap; height: 24px; line-height: 24px; font-weight: normal; color: rgba(0,0,0,0.7);}
.wm-checkbox li{display: inline-block; cursor: pointer; padding: 5px; margin: 0 4px; line-height: 16px;}
.wm-checkbox li:hover .checkbox{border-color: @Primary;}
.wm-checkbox li:hover .label{color: #000;}
.wm-checkbox span{float: left;}
.wm-checkbox .checkbox{position: relative; display: inline-flex; width: 16px; height: 16px; border: @BorderColor 1px solid; border-radius: 2px; box-sizing: border-box; background-color: #FFF; transition: @Transition;}
.wm-checkbox .label{padding-left: 8px;}
.wm-checkbox .active{border-color: @Primary; background-color: @Primary;}
.wm-checkbox .active .all{content: ''; position: absolute; left: 50%; top: 50%; transform: translate(-40%, -70%) rotate(45deg); width: 4px; height: 8px; border: #FFF 2px solid; border-left: none; border-top: none;}
.wm-checkbox .active .partially{content: ''; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -70%); width: 8px; height: 2px; background-color: #FFF;}
.wm-checkbox .disabled{cursor: not-allowed;}
.wm-checkbox .disabled .checkbox{border-color: @BaseBorder; background-color: #DADCDF;}
.wm-checkbox .disabled:hover .checkbox{border-color: rgba(0,0,0,0.2);}
.wm-checkbox .disabled .active{border-color: rgba(0,0,0,0.2);}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
  components: { },
  props: {
    value: {type: String, default: ''},           // 默认值
    options: {type: Object, default: {}},         // 数据: {label:'北京市', value:1, disabled: true}
    partially: {type: Boolean, default: false},   // 局部选中
    margin: {type: String, default: '0 4px'},     // 外部间距
    padding: {type: String, default: '4px'},      // 内部间距
  }
})
export default class CheckBox extends Vue {

  // 参数
  value!: any;
  options!: any;
  partially!: boolean;
  margin!: string;
  padding!: string;
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
  clickCheckbox(): void {
    const data: any = this.list;
    // 勾选、取消
    data.checked = !data.checked;
    // 事件
    this.$emit('update:value', data.checked?data.value:'');
    this.$emit('checkbox', data.label, data.value);
  }

}
</script>