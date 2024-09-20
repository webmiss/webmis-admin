<template>
  <div class="flex">
    <template v-for="(v,k) in columns" :key="k">
      <slot v-bind="v" :name="v.slot" :index="k" v-if="v.is_action?isAction(v.action):true"></slot>
    </template>
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
    columns: {type: Array, default: []},    // 字段: [{action: 'add', slot: 'add', is_action: true}]
  }
})
export default class Action extends Vue {

  // 参数
  columns!: Array<any>;
  // 状态
  private store: any = useStore();
  private state: any = this.store.state;
  // 变量
  checkbox: any = {checked: false, partially: false, value:'', data:{label:'', value:'all'}};

  /* 是否有权限 */
  isAction(action: string): boolean {
    const list: Array<any> = this.state.menusAction;
    for(let v of list) {
      if(v['action']==action) return true;
    }
    return false;
  }

}
</script>