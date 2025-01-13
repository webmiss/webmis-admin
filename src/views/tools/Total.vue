<template>
  <div class="tools-total flex">
    <div class="tools-total_ct scrollbar">
      <div class="tools-total_info">
        <slot></slot>
      </div>
    </div>
    <div class="tools-total_refresh flex">
      <span class="time">{{ time || '0000/00/00 00:00:00' }}</span>
      <i class="ui ui_refresh" @click="refresh()"></i>
    </div>
  </div>
</template>

<style lang="less" scoped>
/* 统计 */
.tools-total{padding: 8px 16px; height: 32px; line-height: 32px; color: @RegularText; background-color: #FFF; border-radius: 4px;}
.tools-total b{color: @BrandText;}
.tools-total_ct{overflow: hidden; overflow-x: auto; padding: 0 16px; width: calc(100% - 232px); height: 32px; background-color: @Primary6; border-radius: 4px;}
.tools-total_info{white-space: nowrap;}
.tools-total_refresh .time{padding: 0 8px;}
.tools-total_refresh i{cursor: pointer; width: 32px; height: 32px; text-align: center; border-radius: 50%;}
.tools-total_refresh i:hover{color: @Primary; background-color: @Minor8;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from 'vuex';

@Options({
  components: {},
  props: {
    time: {type: String, default: ''},    // 时间
  }
})
export default class Total extends Vue {

  // 参数
  time!: string;
  // 状态
  private store: any = useStore();
  state: any = this.store.state;

  /* 刷新 */
  refresh(): void {
    this.$emit('refresh');
  }

}
</script>