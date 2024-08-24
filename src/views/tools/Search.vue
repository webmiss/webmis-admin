<template>
  <div class=".wm-search_body">
    <div class="flex">
      <wm-input placeholder="输入关键字" width="210px" height="32px" lineHeight="32px" maxlength="32" icon="ui ui_search" iconAlign="right" padding="0 40px 0 10px" margin="0 5px 0 0"></wm-input>
      <wm-button effect="plain">重置</wm-button>
      <wm-button effect="plain" icon="ui ui_arrow_right" padding="0 4px" @click="seaShow=true"></wm-button>
    </div>
    <!-- Content -->
    <div class="wm-search" :style="{visibility:seaShow?'inherit':'hidden'}">
      <wm-popup height="100%" :width="width" v-model:show="seaShow" position="right" bgColor="#FFF">
        <div class="wm-search_title flex">
          <h2>{{ title }}</h2>
          <i class="ui ui_close" @click="close"></i>
        </div>
        <div class="wm-search_ct">
          <slot></slot>
        </div>
        <div class="wm-search_bottom">
          <wm-button effect="text" @click="reset()">重 置</wm-button>
          <wm-button effect="dark" type="primary" icon="ui ui_search" padding="0 16px 0 8px" @click="search()">搜 索</wm-button>
        </div>
      </wm-popup>
    </div>
  </div>
  
</template>

<style lang="less" scoped>
.wm-search{position: absolute; top: 50px; right: 0; width: 100%; height: calc(100% - 50px);}
.wm-search_title{padding: 8px 16px; height: 32px; line-height: 32px;}
.wm-search_title h2{font-size: 16px;}
.wm-search_title i{cursor: pointer; width: 32px; height: 32px; text-align: center; border-radius: 50%;}
.wm-search_title i:hover{color: @Primary; background-color: @Minor8;}
.wm-search_ct{height: calc(100% - 96px); border: @LighterBorder 1px solid;}
.wm-search_bottom{padding: 8px 16px; height: 32px; line-height: 32px; text-align: center;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
/* 组件 */
import wmMain from '@/components/container/main.vue'
import wmPopup from '@/components/popup/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'

@Options({
  components: { wmMain, wmPopup, wmInput, wmButton },
  props: {
    show: {type: Boolean, default: false},    // 是否显示
    title: {type: String, default: '搜索'},   // 标题
    width: {type: String, default: '360px'},  // 宽
  }
})
export default class Search extends Vue {
  // 参数
  show!: boolean;
  title!: string;
  width!: string;
  // 变量
  seaShow: boolean = false;

  /* 创建成功 */
  created(): void {
    this.$watch('show', (val:boolean)=>{
      this.seaShow = val;
    }, { deep: true });
    this.$watch('seaShow', (val:boolean)=>{
      this.$emit('update:show', val);
    }, { deep: true });
  }

  /* 搜索 */
  search(): void {
    this.$emit('search');
  }

  /* 重置 */
  reset(): void {
    this.$emit('reset');
  }

  /* 关闭 */
  close(): void {
    this.$emit('update:show', false);
  }

}
</script>