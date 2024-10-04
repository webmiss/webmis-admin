<template>
  <div ref="formSelect" class="wm-select" tabindex="2" :class="show?'show':''"
    @click="show=true"
    :style="{
      width: width,
      height: height,
      lineHeight: height,
      pointerEvents: disabled?'none':'auto',
      opacity: disabled?'0.5':'1',
  }">
    <!-- Content -->
    <div class="wm-select_body" :style="{
      width: bodyWidth,
      top: position=='bottom'?'calc('+height+' + 10px)':'',
      bottom: position=='top'?'calc('+height+' + 10px)':'',
      visibility: show?'inherit':'hidden',
      opacity: show?'1':'0',
    }">
      <span :class="position+'_arrow'"></span>
      <div class="wm-select_search" v-if="seaList.length>=seaMinLength">
        <wm-input :value="seaVal" @update:value="seaKey($event)" :placeholder="seaPlaceholder || state.langs.keyword"></wm-input>
      </div>
      <!-- List -->
      <ul class="wm-select_list scrollbar" :style="{height: bodyHeight, maxHeight: bodyMaxHeight}">
        <template v-if="seaList.length>0&&seaDisplay">
          <li class="flex" v-for="(v, k) in seaList" :key="k" :class="v.checked?'active':''"
            @click.stop="selectClick(k)"
            :style="{
              lineHeight: listHeight,
              display: v.display||typeof v.display=='undefined'?'block':'none',
          }">
            <span class="label">{{ v.label }}</span>
            <span class="info" v-if="v.info">{{ v.info }}</span>
          </li>
        </template>
        <li class="null" v-else></li>
      </ul>
      <!-- List End -->
    </div>
    <!-- Clear -->
    <div class="wm-select_clear_body" v-if="value&&clearable" :style="{width: height, height: height}" @click.stop="clear()">
      <div class="wm-select_clear" :style="{width: 'calc('+height+' / 2)', height: 'calc('+height+' / 2)'}"></div>
    </div>
    <!-- Icon -->
    <i class="wm-select_arrow ui ui_arrow_down" :style="{transform: show?'rotate(180deg)':'rotate(0deg)'}"></i>
    <!-- Value -->
    <div class="wm-select_value" :class="labelName?'':'none'">{{ labelName || placeholder || state.langs.select }}</div>
  </div>
</template>

<style lang="less" scoped>
.wm-select{cursor: pointer; position: relative;}
.wm-select_arrow{position: absolute; z-index: 2; width: 32px; height: 100%; top: 0; right: 0; text-align: center; font-size: 12px; transition: @Transition;}
.wm-select.show .wm-select_value{border-color: @Primary;}
.wm-select_value{overflow: hidden; position: relative; width: 100%; height: 100%; padding: 0 32px 0 10px; text-align: left; box-sizing: border-box; border: @BaseBorder 1px solid; border-radius: 4px; background-color: #FFF;}
.wm-select_value::after{content: ''; position: absolute; z-index: 1; top: 0; right: 0; width: 32px; height: 100%; background-color: #FFF;}
.wm-select_value:hover{border-color: @Primary;}
.wm-select_value.none{color: @SecondaryText;}
.wm-select_body{position: absolute; z-index: 999; min-width: 80px; left: 50%; transform: translateX(-50%); background-color: #FFF; box-shadow: 0 0 12px rgba(0,0,0,0.2); border-radius: 4px; transition: @Transition;}
.wm-select_body .top_arrow{position: absolute; bottom: 5px; left: calc(50% - 5px); transform: translateX(-50%);}
.wm-select_body .top_arrow::before{content: ''; position: absolute; width: 10px; height: 10px; border: @BorderColor 1px solid; border-left-color: transparent; border-top-color: transparent; background-color: #FFF; transform: rotate(45deg); box-sizing: border-box;}
.wm-select_body .bottom_arrow{position: absolute; top: -5px; left: calc(50% - 5px); transform: translateX(-50%);}
.wm-select_body .bottom_arrow::before{content: ''; position: absolute; width: 10px; height: 10px; border: @BorderColor 1px solid; border-right-color: transparent; border-bottom-color: transparent; background-color: #FFF; transform: rotate(45deg); box-sizing: border-box;}
.wm-select_search{padding: 8px 8px 0 8px; background-color: #FFF;}
.wm-select_list{user-select: none; overflow: hidden; overflow-y: auto; padding: 4px 0;}
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
.wm-select_clear_body{cursor: pointer; position: absolute; z-index: 10; top: 0; right: 0;}
.wm-select_clear{user-select: none; position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background-color: @Danger; border-radius: 50%;}
.wm-select_clear::after,.wm-select_clear::before{content: ''; position: absolute; width: 50%; height: 0.1rem; background-color: #FFF; left: 50%; top: 50%; transform-origin: center;}
.wm-select_clear::after{transform: translate(-50%, -50%) rotate(45deg);}
.wm-select_clear::before{transform: translate(-50%, -50%) rotate(-45deg);}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from 'vuex';
import wmInput from '@/components/form/input/index.vue'
@Options({
  components: { wmInput },
  props: {
    value: {default: ''},                                   // 默认值
    options: {type: Array, default: []},                    // 数据: [{label:'男', value:'男', disabled: true},{label:'女', value:'女'}]
    multiple: {type: Boolean, default: false},              // 是否多选
    width: {type: String, default: '100%'},                 // 宽
    height: {type: String, default: '40px'},                // 高
    position: {type: String, default: 'bottom'},            // 位置: top、bottom
    placeholder: {type: String, default: ''},               // 提示
    bodyWidth: {type: String, default: '100%'},             // 内容宽
    bodyHeight: {type: String, default: 'auto'},            // 内容高
    bodyMaxHeight: {type: String, default: '320px'},        // 内容最大高度限制
    listHeight: {type: String, default: '40px'},            // 列表高
    seaMinLength: {type: Number, default: 5},               // 搜索最小值
    seaPlaceholder: {type: String, default: ''},            // 搜索提示
    clearable: {type: Boolean, default: false},             // 一键清空
    disabled: {type: Boolean, default: false},              // 禁用
  }
})
export default class Select extends Vue {

  // 参数
  value!: any;
  options!: any;
  multiple!: boolean;
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
  clearable!: boolean;
  disabled!: boolean;
  // 状态
  store: any = useStore();
  state: any = this.store.state;
  // 变量
  show: boolean = false;
  selectObj: any = null;
  seaVal: string = '';
  seaList: Array<any> = [];
  seaDisplay: boolean = true;
  labelName: string = '';

  /* 创建成功 */
  created(): void {
    // 监听
    this.$watch('value', (val:Array<any>)=>{
      if(!val) return this.clear();
      // 勾选默认值
      for(let i in this.seaList) {
        if(val.includes(this.seaList[i].value)) this.selectClick(i, false);
      }
    }, { deep: true });
    this.$watch('options', (val:Array<any>)=>{
      this.seaList = val || [];
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
    this.selectObj.addEventListener('focusout', ()=>{
      this.show = false;
    });
    // 列表数据
    this.seaList = this.options;
  }

  /* 搜索 */
  seaKey(key: any): void {
    let label: string, n: number=0;
    const reg =new RegExp(key.toLowerCase());
    for(let i in this.seaList){
      label = this.seaList[i].label.toLowerCase();
      if(reg.test(label)){
        n++;
        this.seaList[i].display = true;
      }else{
        this.seaList[i].display = false;
      }
    }
    this.seaDisplay = n>0;
  }

  /* 选择 */
  selectClick(k: any, isStatus: boolean=true): void {
    let labs: Array<any> = [];
    let vals: Array<any> = [];
    let data: Array<any> = [];
    for(let i in this.seaList) {
      // 多选
      if(this.multiple){
        if(i==k) this.seaList[k].checked = !this.seaList[k].checked;
        if(this.seaList[i].checked) {
          labs.push(this.seaList[i].label);
          vals.push(this.seaList[i].value);
          data.push(this.seaList[i]);
        }
      }else{
        // 单选
        if(i==k){
          labs.push(this.seaList[i].label);
          vals.push(this.seaList[i].value);
          data.push(this.seaList[i]);
          this.seaList[i].checked = true;
        }else{
          this.seaList[i].checked = false;
        }
      }
    }
    // 事件
    this.labelName = labs.join(',');
    if(isStatus){
      this.$emit('update:value', vals);
      this.$emit('data', data);
    }
    // 单选隐藏
    if(!this.multiple){
      this.show = false;
    }
  }

  /* 清空 */
  clear(): void {
    this.labelName = '';
    this.$emit('update:value', '');
  }

}
</script>