<template>
  <div class="app_total flex">
    <div class="total scrollbar">
      文件夹: <b>{{ total.list.total || 0 }}</b>&nbsp;&nbsp;
      文件: <b>{{ total.list.total || 0 }}</b>&nbsp;&nbsp;
      大小: <b>{{ total.list.total || 0 }}</b>&nbsp;&nbsp;
    </div>
    <div class="refresh flex">
      <span class="time">{{ total.time }}</span>
      <i class="ui ui_refresh" @click="loadData()"></i>
    </div>
  </div>
  <!-- Action -->
  <div class="app_action flex">
    123
  </div>
  <!-- Action End -->
  <!-- Content -->
  <div class="app_ct none_search">
    123
  </div>
</template>

<style lang="less" scoped>

</style>

<script lang="ts" src="./index.ts"></script>