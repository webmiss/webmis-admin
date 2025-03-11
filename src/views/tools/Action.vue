<template>
  <ul class="action_tools">
    <li v-for="(v,k) in columns" :key="k">
      <slot v-bind="v" :name="v.slot" :index="k" v-if="v.is_action?isAction(v.action):true"></slot>
    </li>
  </ul>
</template>

<style lang="less" scoped>
.action_tools{display: flex; flex-wrap: nowrap;}
.action_tools li{position: relative; white-space: nowrap;}
</style>

<script setup lang="ts">
import { useStore } from 'vuex';

/* 参数 */
const props = defineProps({
  columns: {type: Array<any>, default: []},    // 字段: [{action: 'add', slot: 'add', is_action: true}]
});
// 状态
const store = useStore();
const state = store.state;

/* 是否有权限 */
const isAction = (action: string): boolean => {
  const list: Array<any> = state.menusAction;
  for(let v of list) {
    if(v['action']==action) return true;
  }
  return false;
}

</script>