<template>
  <div class="wm-dialog_body" :style="{visibility:is_show?'inherit':'hidden'}">
    <wm-popup ref="Popup" v-model:show="is_show" width="100%" height="100%" position="top" :time="600" @click="clickBG()">
      <div class="wm-dialog">测试</div>
    </wm-popup>
  </div>
</template>
  
<style>
.wm-dialog_body{position: fixed; z-index: 999; width: calc(100% + 1px); height: calc(100% + 1px); left: 0; top: 0;}
.wm-dialog{position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);}
</style>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import wmPopup from '@/components/popup/index.vue'

@Options({
  components: { wmPopup },
  props: {
    show: {type: Boolean, default: false},        // 是否显示
    width: {type: String, default: '320px'},       // 内容宽度
    height: {type: String, default: 'auto'},      // 内容高度
  }
})
export default class Dialog extends Vue {
  // 参数
  show!: Boolean;
  width!: String;
  height!: String;
  // 变量
  is_show: Boolean = false;

  /* 创建成功 */
  created(): void {
    // 监听
    this.$watch('$props', (props:any)=>{
      // this.$emit('update:show', props.show);
      this.is_show = props.show;
      console.log('show', props.show);
    }, { deep: true });
    this.$watch('$props', (props:any)=>{

    }, { deep: true });
  }

  /* 创建完成 */
  mounted(): void {
    console.log('Dialog');
  }

  /* 点击背景 */
  clickBG(): void {
    (this.$refs.Popup as any).close();
    console.log('clickBG');
  }

}
</script>
  