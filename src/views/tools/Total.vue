<template>
  <div class="tools-total">
    <div class="tools-total_body flex">
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
  </div>
</template>

<style lang="less" scoped>
/* 统计 */
.tools-total{padding: 6px 8px 2px; height: 32px; line-height: 32px; color: @RegularText; background-color: #FFF;}
.tools-total b{color: @BrandText;}
.tools-total_body{padding: 0 4px 0 16px; background-color: @Primary6; border-radius: 16px;}
.tools-total_ct{overflow: hidden; overflow-x: auto; width: calc(100% - 200px); height: 32px; border-radius: 4px;}
.tools-total_info{zoom: 0.9; white-space: nowrap;}
.tools-total_refresh{width: 190px;}
.tools-total_refresh .time{padding: 0 8px;}
.tools-total_refresh i{cursor: pointer; width: 32px; height: 32px; text-align: center; border-radius: 50%;}
.tools-total_refresh i:hover{color: @Primary; background-color: #FFF;}
</style>

<script setup lang="ts">

/* 参数 */
// @ts-ignore
const props = defineProps({
  time: {type: String, default: ''},    // 时间
});
const emit = defineEmits(['refresh']);

/* 刷新 */
const refresh = (): void =>{
  emit('refresh');
}

</script>