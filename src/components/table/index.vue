<template>
  <div class="wm-table_body scrollbar" :style="{
    width: width,
    height: height,
    overflowX: overflowX,
    overflowY: overflowY,
  }">
    <table class="wm-table">
      <thead class="wm-table_title">
        <tr>
          <td v-for="(v, k) in columns" :key="k" :style="{
            width: v.width,
            textAlign: v.textAlign,
          }">{{ v.title }}</td>
        </tr>
      </thead>
      <tbody class="wm-table_list">
        <tr v-for="(v1, k1) in listData" :key="k1">
          <td v-for="(v2, k2) in v1" :key="k2">{{ v2 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="less" scoped>
.wm-table_body{overflow: hidden;}
.wm-table{width: 100%; border-collapse: collapse;}
.wm-table td{padding: 4px 8px; height: 32px; line-height: 20px; white-space: nowrap; border: #FFF 1px solid;}
.wm-table_title td{background-color: #F2F2F2;}
.wm-table_list tr:nth-child(odd){background-color: #FFF;}
.wm-table_list tr:nth-child(even){background-color: #F6F8FA;}
.wm-table_list tr:hover{background-color: #EAF0F4;}
.wm-table_list tr:last-child td{border-bottom-color: #F2F2F2;}
.wm-table_list .active{background: #D7E3EE;}
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
    columns: {type: Array, default: []},          // 字段: [{title: '名称', width: '30px', index: 'title', slot: 'title', textAlign: 'right'}]
    listData: {type: Array, default: []},         // 字段: [{id: 1, title: '系统', remark: ''}]
    width: {type: String, default: '100%'},       // 宽
    height: {type: String, default: '100%'},      // 高
    overflowX: {type: String, default: 'auto'},   // 滚动条: x轴
    overflowY: {type: String, default: 'auto'},   // 滚动条: y轴
  }
})
export default class Table extends Vue {

  // 参数
  columns!: Array<any>;
  listData!: Array<any>;
  width!: string;
  height!: string;
  overflowX!: any;
  overflowY!: any;
  // 变量
  // listData: any = [];

  /* 创建成功 */
  created(): void {
    this.$watch('listData', (val: Array<any>)=>{
      // this.listData = val;
    }, { deep: true });
  }


}
</script>