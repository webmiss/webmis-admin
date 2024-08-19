<template>

</template>

<style lang="less" scoped>
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
  components: {},
  props: {
    padding: {type: Number, default: 16},             // 边距
    bgColor: {type: String, default: 'transparent'},  // 背景颜色
    overflowX: {type: String, default: 'auto'},       // 背景颜色
    overflowY: {type: String, default: 'auto'},       // 背景颜色
  }
})
export default class Button extends Vue {
  // 参数
  padding!: number;
  bgColor!: String;
  overflowX!: any;
  overflowY!: any;
}
</script>