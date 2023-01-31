<template>
  <div class="wm-select" :style="{width: width}">
    <div class="wm-select_input" :style="{height: height, lineHeight: 'calc('+height+' - 2px)'}" @click="checked=!checked;seaKey('')">
      <!-- Clear -->
      <div class="wm-select_clear_body" v-if="text&&clearable">
        <span class="wm-select_clear" @click.stop="selectClear()"></span>
      </div>
      <!-- Arrow -->
      <div class="wm-select_input_ico" :style="{transform: checked?'rotate(-180deg)':'rotate(0deg)'}">
        <i class="ui ui_arrow_down"></i>
      </div>
      <!-- Value -->
      <wm-input :value="text" @update:value="seaKey($event)" :placeholder="placeholder" :readonly="true" />
    </div>
    <div class="wm-select_body" v-if="checked">
      <span class="wm-select_arrow"></span>
      <!-- Search -->
      <div v-if="search" class="wm-select_sea">
        <wm-input :value="seaVal" @update:value="seaKey($event)" height="32px" />
      </div>
      <!-- List -->
      <ul v-if="dataList.length>0" class="wm-select_list scrollbar" :style="{maxHeight: maxHeight}">
        <template v-for="(v,k) in dataList" :key="k">
          <li v-if="v.disabled" class="flex nowrap wm-select_disabled" style="cursor: not-allowed;">
            <span class="label"><span v-if="v.checked" class="active"></span>{{v.label}}</span>
            <span class="info">{{v.info || ''}}</span>
          </li>
          <li v-else class="flex nowrap" :class="v.checked?'wm-select_active':''" @click="selectClick(v.value)">
            <span class="label"><span v-if="v.checked" class="active"></span>{{v.label}}</span>
            <span class="info">{{v.info || ''}}</span>
          </li>
        </template>
      </ul>
      <div v-else class="null"></div>
      <!-- List End -->
    </div>
  </div>
</template>

<style lang="less" scoped>
.wm-select{position: relative; font-size: 14px;}
.wm-select_input{position: relative; width: 100%;}
.wm-select_input input{cursor: pointer; width: 100%; height: 100%; padding: 0 30px 0 10px; display: flex; box-sizing: border-box; border-radius: 4px; border: @BorderColor 1px solid; background-color: #FFF;}
.wm-select_input input:focus{outline: none;}
.wm-select_input input:hover{border-color: @BorderHover;}
.wm-select_input_ico{cursor: pointer; position: absolute; z-index: 1; width: 30px; height: 100%; line-height: 32px; right: 0; text-align: center; transition-duration: .3s;}
.wm-select_input_ico i{font-size: 12px; color: @IconColor;}

.wm-select_clear_body{display: none; position: absolute; z-index: 2; width: 30px; height: 80%; top: 10%; right: 1px; text-align: center;}
.wm-select_clear{position: absolute; cursor: pointer; top: 50%; right: 6px; transform: translateY(-50%); width: 16px; height: 16px; background-color: @Danger; border-radius: 50%; opacity: .8;}
.wm-select_clear:hover{opacity: 1;}
.wm-select_clear::after,.wm-select_clear::before{content: ''; position: absolute; width: 50%; height: 0.1rem; background-color: #FFF; left: 50%; top: 50%; transform-origin: center;}
.wm-select_clear::after{transform: translate(-50%, -50%) rotate(45deg);}
.wm-select_clear::before{transform: translate(-50%, -50%) rotate(-45deg);}
.wm-select_input:hover .wm-select_clear_body{display: block;}

.wm-select_body{position: absolute; z-index: 9999; width: 100%; margin-top: 8px; padding: 8px 0; box-sizing: border-box; border: @BorderColor 1px solid; border-radius: 4px; background-color: #FFF; box-shadow: 0 0 10px rgba(0,0,0,.16);}
.wm-select_arrow{position: absolute; width: 10px; height: 10px; top: -5px; left: 50%; transform: translateX(-50%);}
.wm-select_arrow::before{content: ''; position: absolute; width: 10px; height: 10px; border: @BorderColor 1px solid; border-right-color: transparent; border-bottom-color: transparent; background-color: #FFF; transform: rotate(45deg); box-sizing: border-box;}
.wm-select_sea{padding: 4px 8px;}
.wm-select_list{overflow-y: auto;}
.wm-select_list li{cursor: pointer; line-height: 32px; padding: 0 10px 0 20px;}
.wm-select_list li:hover{background-color: @Minor;}
.wm-select_list .info{color: @Info; font-size: 12px;}
.wm-select_list .active{position: relative;}
.wm-select_list .active::after{content: ""; position: absolute; left: -12px; top: 4px; width: 4px; height: 8px; border: 2px solid @Primary; border-left: 0; border-top: 0; transform: rotate(45deg);}
.wm-select_active .label{color: @Primary; font-weight: bold;}
.wm-select_disabled{color: @Disabled;}
.wm-select_disabled .active::after{border-color: @Disabled;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import wmInput from '../input/index.vue'
export default defineComponent({
  name:'Select',
  components: {wmInput},
  props: {
    value: {default:''},                            //默认选择
    data: {type:Array, default:[]},                 //数据: [{label:'Option1', value:'option1', disabled: true},{label:'Option2', value:'option2'}]
    width: {type:String, default:'100%'},           //宽度
    height: {type:String, default:'32px'},          //高度
    placeholder: {type:String, default:'请选择'},   //提示信息
    maxHeight: {type:String, default:'160px'},      //最大高度
    clearable: {type: Boolean, default: false},     //一键清空
    search: {type: Boolean, default: false},        //搜索
    multiple: {type: Boolean, default: false},      //多选
  },
  data(){
    const checked: boolean = false;
    const text: string = '';
    const seaVal: any = '';
    const dataList: any = [];
    return {checked, text, seaVal, dataList}
  },
  watch:{
    value(val: any){
      this.selectInit();
    },
    data(val: any){
      this.selectInit();
    }
  },
  mounted(){
    // 默认值
    this.dataList = this.data;
    this.selectInit();
    // 阻止穿透
    const obj: any = document.getElementsByClassName('wm-select');
    for(let i=0; i<obj.length; i++){
      obj[i].addEventListener('click',(event: any)=>{
        event.stopPropagation();
      });
    }
    // 监听外部
    document.addEventListener('click',()=>{ this.checked = false; });
  },
  methods:{
    
    /* 默认值 */
    selectInit(){
      setTimeout(()=>{
        for(let v of this.data as any){
          // 多选
          if(this.multiple) v.checked = this.value.indexOf(v.value)!=-1;
          // 单选
          else v.checked = v.value==this.value;
        }
        this.selectDisplay();
      }, 400);
    },

    /* 选择 */
    selectClick(val: string){
      if(!this.multiple) this.checked = false;
      for(let v of this.data as any){
        if(v.value==val) v.checked=!v.checked;
        else if(!this.multiple) v.checked=false;
      }
      this.selectDisplay();
    },

    /* 清除 */
    selectClear(){
      for(let v of this.data as any) v.checked=false;
      this.text = '';
      this.selectDisplay();
    },

    /* 显示值 */
    selectDisplay(){
      let label: Array<string> = [];
      let value: Array<string> = [];
      for(let v of this.data as any){
        if(v.checked){
          label.push(v.label);
          value.push(v.value);
        }
      }
      this.text = label.join(',');
      this.$emit('update:value', this.multiple?value:value.join(','));
    },

    /* 搜索 */
    seaKey(v: any){
      if(!v) return this.dataList = this.data;
      const reg =new RegExp(v.toLowerCase());
      const list: any = [];
      let label: string;
      for(let v of this.data as any){
        label = v.label.toLowerCase();
        if(reg.test(label)) list.push(v);
      }
      this.dataList = list;
    },

  },
});
</script>