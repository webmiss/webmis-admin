<template>
  <ul class="wm-tabs" :style="{height: height, lineHeight: height}">
    <li v-for="(v, k) in columns" :key="k" :class="v.checked?'active':''" :style="{padding: padding, margin: margin}" @click="tabClick(k)">{{ v.label }}</li>
  </ul>
  <template v-for="(v, k) in columns" :key="k">
    <div class="wm-tabs_body" v-if="v.checked" :style="{padding: bodyPadding}">
      <slot v-bind="v" :name="v.slot" :index="k"></slot>
    </div>
  </template>
</template>

<style lang="less" scoped>
.wm-tabs{width: 100%; border-bottom: @LighterBorder 2px solid; box-sizing: border-box;}
.wm-tabs li{cursor: pointer; position: relative; float: left; white-space: nowrap;}
.wm-tabs li:hover{color: @Primary;}
.wm-tabs .active{color: @Primary;}
.wm-tabs .active::after{content: ''; position: absolute; left: 0; bottom: 0; width: 100%; height: 2px; background-color: @Primary; border-radius: 2px;}
.wm-tabs_body{padding: 16px 0;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from 'vuex';
/* 组件 */
import Ui from '@/library/ui'

@Options({
  components: {},
  props: {
    columns: {type: Array, default: []},              // 字段: [{label: '基本信息', value: 'base', slot: 'base', checked: true}]
    height: {type: String, default: '40px'},          // 高度
    padding: {type: String, default: '0 8px'},        // 内部间距
    margin: {type: String, default: '0 8px 0 0'},     // 外部间距
    bodyPadding: {type: String, default: '16px 0'},   // 内容间距
  }
})
export default class Tabs extends Vue {

  // 参数
  columns!: Array<any>;
  height!: string;
  padding!: string;
  margin!: string;
  bodyPadding!: string;
  // 状态
  private store: any = useStore();
  private state: any = this.store.state;
  // 变量
  checkbox: any = {checked: false, partially: false, value:'', data:{label:'', value:'all'}};

  /* 创建成功 */
  created(): void {
  }

  /* 切换 */
  tabClick(k: any): void {
    const list: Array<any> = this.state.menusAction;
    for(let v of this.columns) {
      v.checked = false;
    }
    this.columns[k].checked = true;
  }

}
</script>