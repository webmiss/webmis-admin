<template>
  <wm-popup class="wm-dialog_body" ref="Popup" :show="show" @update:show="$emit('update:show',$event)" :bgClose="bgClose">
    <div class="wm-dialog" :style="{width:width, height:height, backgroundColor:bgColor, borderRadius:radius}">
      <!-- Title -->
      <div class="wm-dialog_title">
        <div class="wm-dialog_close" @click="$emit('update:show', false)"></div>
        <div class="title" :style="{textAlign:titleAlign}">{{title}}</div>
      </div>
      <!-- Header -->
      <div v-if="header>0" class="flex_center" :style="{height: header+'px'}">
        <slot name="header"></slot>
      </div>
      <!-- Tabs -->
      <ul class="wm-tabs_list wm-dialog_tabs" v-if="tabs.length>0">
        <li v-for="(v,k) in tabs" :key="k" :class="v.name==active?'active':''" @click="tabsClick(v.name)">{{v.label}}</li>
      </ul>
      <div v-if="tabs.length>0" ref="DialogBody" class="wm-dialog_body scrollbar">
        <div ref="DialogContent" class="wm-dialog_content">
          <div class="wm-tabs_body" v-for="(v,k) in tabs" :key="k" v-show="v.name==active">
            <slot :name="v.name"></slot>
          </div>
        </div>
      </div>
      <!-- Content -->
      <div v-else ref="DialogBody"  class="wm-dialog_body scrollbar">
        <div ref="DialogContent" class="wm-dialog_content">
          <slot></slot>
        </div>
      </div>
      <!-- Footer -->
      <div v-if="footer>0" class="wm-dialog_footer" :style="{height:footer+'px', textAlign:footerAlign}">
        <slot name="footer"></slot>
      </div>
    </div>
  </wm-popup>
</template>

<style lang="less" scoped>
.wm-dialog{padding-bottom: 8px; box-sizing: border-box; box-shadow: 0 0 8px rgba(0,0,0,.4);}
.wm-dialog_title{position: relative; height: 40px; font-size: 14px; font-weight: 700; padding: 0 8px; text-align: center;}
.wm-dialog_title .title{line-height: 40px; user-select: none;}
.wm-dialog_close{cursor: pointer; position: absolute; right: 8px; top: 4px; width: 32px; height: 32px; border-radius: 50%;}
.wm-dialog_close:hover::after,.wm-dialog_close:hover::before{background-color: @Primary;}
.wm-dialog_close::after,.wm-dialog_close::before{content: ''; position: absolute; width: 12px; height: 1.6px; background-color: #666; left: 50%; top: 50%; transform-origin: center;}
.wm-dialog_close::after{transform: rotate(45deg); margin-left: -16%;}
.wm-dialog_close::before{transform: rotate(-45deg); margin-left: -16%;}
.wm-dialog_tabs{margin: 0 16px;}
.wm-dialog_footer{padding: 10px 0; border-top: #F2F2F2 1px solid;}
/* 滚动条 */
.wm-dialog_body{overflow: auto; width: 100%; height: calc(100% - 40px - 60px);}
/* 内容 */
.wm-dialog_content{padding: 10px 16px;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex';
import wmPopup from '../popup/index.vue'
import wmTabs from '../tabs/index.vue'
import HtmlObserve from '../../library/html/observe'
export default defineComponent({
  name: 'Dialog',
  components: {wmPopup,wmTabs},
  props: {
    show: {type: Boolean, default: false},          //是否显示
    title: {type: String, default: ''},             //标题
    width: {type: String, default: '420px'},        //宽
    height: {type: String, default: 'auto'},        //高
    radius: {type: String, default: '4px'},         //圆角
    header: {type: Number, default: 0},             //头部高度
    footer: {type: Number, default: 32},            //底部高度
    margin: {type: Number, default: 16},            //上下边距
    titleAlign: {type: String, default: 'center'},  //标题对齐方式
    footerAlign: {type: String, default: 'center'}, //底部对齐方式
    bgColor: {type: String, default: '#FFF'},       //内容背景颜色
    bgClose: {type: Boolean, default: false},       //点击背景关闭
    tabsActive: {type: String, default: ''},        //Tabs-默认选择
    tabs: {type:Array, default:[]},                 //Tabs-数据: [{label:'Tab1', name:'tab1'},{label:'Tab2', name:'tab2'}]
  },
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    let active: string = '';
    return {state, active};
  },
  watch:{
    show(val){
      if(!val){
        (this.$refs.Popup as any).close();
      }else{
        this.autoHeight();
      }
    },
  },
  mounted(){
    this.active = this.tabsActive;
  },
  methods:{

    /* 监听高度 */
    autoHeight(){
      HtmlObserve(this.$refs.DialogBody, ()=>{
        this.changeHeight();
      });
    },
    changeHeight(){
      setTimeout(()=>{
        let body: any = this.$refs.DialogBody;
        let content: any = this.$refs.DialogContent;
        let val: string = getComputedStyle(content).getPropertyValue('height');
        let bh: number = this.state.height;
        let th: number = 40+8+this.margin*2;
        if(this.header>0) th += this.header;
        if(this.tabs.length>0) th += 40;
        if(this.footer>0) th += this.footer+20;
        let h: number = parseInt(val.replace(/(px)/g, ''))+th;
        if(h>(bh-20)) body.style.height = bh-th+'px';
        else body.style.height = '';
      }, 300);
    },

    /* Tabs */
    tabsClick(name: string){
      this.active = name;
      this.$emit('update:tabsActive', name);
    },

  },
});
</script>