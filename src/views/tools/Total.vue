<template>
  <div class="app_total flex">
    <div class="total scrollbar">
      <slot></slot>
    </div>
    <div class="refresh flex">
      <span class="time">{{ time }}</span>
      <i class="ui ui_refresh" @click="refresh()"></i>
    </div>
  </div>
</template>

<style lang="less" scoped>
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