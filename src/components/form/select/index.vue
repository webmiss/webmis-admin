<template>
  <div ref="formSelect" class="wm-select" tabindex="2" :class="show?'wm-select_show':''" :style="{width: width, height: height, lineHeight: height}" @click="openSelect()">
    <!-- Content -->
    <div class="wm-select_body" :style="{
      width: bodyWidth,
      top: position=='bottom'?'calc('+height+' + 10px)':'',
      bottom: position=='top'?'calc('+height+' + 10px)':'',
    }">
      <span :class="position+'_arrow'"></span>
      <div class="wm-select_search" v-if="options.length>=seaMinLength">
        <wm-input :value="seaVal"  @update:value="seaKey($event)" :placeholder="seaPlaceholder"></wm-input>
      </div>
      <!-- List -->
      <ul class="wm-select_list scrollbar" :style="{height: bodyHeight, maxHeight: bodyMaxHeight}">
        <template v-if="options.length>0&&isDisplay">
          <li class="flex" v-for="(v, k) in options" :key="k" :class="v.checked?'active':''" :style="{
            lineHeight: listHeight,
            display: v.display?'block':'none',
          }">
            <span class="label">{{ v.label }}</span>
            <span class="info" v-if="v.info">{{ v.info }}</span>
          </li>
        </template>
        <li class="null" v-else></li>
      </ul>
      <!-- List End -->
    </div>
    <!-- Icon -->
    <i class="arrow ui ui_arrow_down" :style="{transform: show?'rotate(180deg)':'rotate(0deg)'}"></i>
    <!-- Value -->
    <div class="wm-select_value" :class="value?'':'none'">{{ value || placeholder }}</div>
  </div>
</template>

<style lang="less" scoped>
.wm-select{cursor: pointer; position: relative;}
.wm-select .arrow{position: absolute; width: 24px; height: 100%; right: 0; text-align: center; font-size: 12px; transition: @Transition;}
.wm-select_show .wm-select_value{border-color: @Primary;}
.wm-select_value{overflow: hidden; width: 100%; height: 100%; padding: 0 24px 0 10px; text-align: left; box-sizing: border-box; border: @BaseBorder 1px solid; border-radius: 4px; background-color: #FFF;}
.wm-select_value:hover{border-color: @Primary;}
.wm-select_value.none{color: @SecondaryText;}
.wm-select_body{position: absolute; z-index: 999; min-width: 80px; left: 50%; transform: translateX(-50%); border: @BaseBorder 1px solid; background-color: #FFF; box-shadow: 0 0 12px rgba(0,0,0,0.2); border-radius: 4px;}
.wm-select_body .top_arrow{position: absolute; bottom: 5px; left: calc(50% - 5px); transform: translateX(-50%);}
.wm-select_body .top_arrow::before{content: ''; position: absolute; width: 10px; height: 10px; border: @BorderColor 1px solid; border-left-color: transparent; border-top-color: transparent; background-color: #FFF; transform: rotate(45deg); box-sizing: border-box;}
.wm-select_body .bottom_arrow{position: absolute; top: -5px; left: calc(50% - 5px); transform: translateX(-50%);}
.wm-select_body .bottom_arrow::before{content: ''; position: absolute; width: 10px; height: 10px; border: @BorderColor 1px solid; border-right-color: transparent; border-bottom-color: transparent; background-color: #FFF; transform: rotate(45deg); box-sizing: border-box;}
.wm-select_search{padding: 8px 8px 0 8px; background-color: #FFF;}
.wm-select_list{user-select: none; overflow: hidden; overflow-y: auto; padding: 8px 0;}
.wm-select_list li{position: relative; white-space: nowrap; padding: 0 8px; height: 40px; line-height: 40px;}
.wm-select_list li:hover{background-color: #F4F6F8;}
.wm-select_list li:hover .label{color: @Primary;}
.wm-select_list li:hover .info{background-color: #F4F6F8;}
.wm-select_list .label{float: left; color: @Text; padding: 0 16px;}
.wm-select_list .info{float: right; position: absolute; right: 0; height: 100%; padding: 0 10px; font-size: 12px; color: @RegularText; background-color: #FFF;}
.wm-select_list .null{height: 120px; line-height: 120px;}
.wm-select_list .null:hover{cursor: default; background-color: #FFF;}
.wm-select_list .active{background-color: #F4F6F8;}
.wm-select_list .active::after{content: ''; position: absolute; left: 10px; top: 50%; transform: translateY(-65%) rotate(45deg); width: 4px; height: 8px; border: @Primary 2px solid; border-left: none; border-top: none;}
.wm-select_list .active .label{color: @Primary;}
.wm-select_list .active .info{background-color: #F4F6F8;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import wmInput from '@/components/form/input/index.vue'
@Options({
  components: { wmInput },
  props: {
    value: {type: String, default: ''},                     // 默认值
    options: {type: Array, default: []},                    // 数据: [{label:'男', value:'男', disabled: true},{label:'女', value:'女'}]
    width: {type: String, default: '100%'},                 // 宽
    height: {type: String, default: '40px'},                // 高
    position: {type: String, default: 'bottom'},            // 位置: top、bottom
    placeholder: {type: String, default: '请选择'},         // 提示
    bodyWidth: {type: String, default: '100%'},             // 内容宽
    bodyHeight: {type: String, default: 'auto'},            // 内容高
    bodyMaxHeight: {type: String, default: '320px'},        // 内容最大高度限制
    listHeight: {type: String, default: '40px'},            // 列表高
    seaMinLength: {type: Number, default: 5},               // 搜索最小值
    seaPlaceholder: {type: String, default: '输入关键字'},  // 搜索提示

  }
})
export default class Select extends Vue {

  // 参数
  value!: any;
  options!: any;
  width!: string;
  height!: string;
  position!: string;
  placeholder!: string;
  bodyWidth!: string;
  bodyHeight!: string;
  bodyMaxHeight!: string;
  listHeight!: string;
  seaMinLength!: number;
  seaPlaceholder!: string;
  // 变量
  show: boolean = false;
  selectObj: any = null;
  isDisplay: boolean = true;
  seaVal: string = '';

  /* 创建成功 */
  created(): void {
    // 监听
    this.$watch('total', (val:number)=>{
      this.init();
    }, { deep: true });
    this.$watch('options', (val:number)=>{
      console.log(val);
    }, { deep: true });
  }

  /* 创建完成 */
  public mounted(): void {
    this.init();
  }

  /* 初始化 */
  init(): void {
    // 失去焦点
    this.selectObj = this.$refs.formSelect;
    this.selectObj.addEventListener('blur', ()=>{
      this.show = false;
    });
    
  }

  /* 打开 */
  openSelect(): void {
    this.show = true;
  }

  /* 搜索 */
  seaKey(key: any): void {
    let label: string;
    const reg =new RegExp(key.toLowerCase());
    for(let i in this.options as any){
      label = this.options[i].label.toLowerCase();
      this.options[i].display = reg.test(label);
    }
    this.$emit('update:options', this.options);
    console.log(key, this.options);
  }

}
</script>