<template>
  <div class="wm-page_body">
    <div class="wm-page flex_center">
      <div v-html="state.langs.page_total(total, pageNum, num)"></div>
      <div class="wm-page_num flex">
        <!-- Prev -->
        <span class="disabled" v-if="pageNum<=1" :style="{borderRadius: radius}"><i class="ui ui_arrow_left"></i></span>
        <span v-else @click="toPage(1)" :style="{borderRadius: radius}"><i class="ui ui_arrow_left"></i></span>
        <!-- Page -->
         <template v-if="total>0">
          <span v-for="(v, k) in list" :key="k" :class="v==pageNum?'active':''" @click="toPage(v)" :style="{borderRadius: radius}">
            <b>{{ v }}</b>
          </span>
        </template>
        <span v-else class="disabled">{{ total }}</span>
        <!-- Next -->
        <span class="disabled" v-if="pageNum>=num" :style="{borderRadius: radius}"><i class="ui ui_arrow_right"></i></span>
        <span v-else @click="toPage(num)" :style="{borderRadius: radius}"><i class="ui ui_arrow_right"></i></span>
      </div>
      <div class="wm-page_tools flex">
        <span>{{ state.langs.page_limit }}</span>
        <span>
          <wm-select :value="selectVal" @update:value="selectChange($event)" width="80px" height="28px" position="top" :options="limitList"></wm-select>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wm-page_body{position: relative; width: 100%; height: 100%;}
.wm-page{position: absolute; width: 100%; left: 50%; top: 50%; transform: translate(-50%, -50%); height: 28px; line-height: 28px;}
.wm-page_info{margin: 0 4px;}
.wm-page_num{user-select: none; margin: 0 8px; text-align: center;}
.wm-page_num i{font-size: 12px;}
.wm-page_num span{cursor: pointer; margin: 0 4px; padding: 0 8px; min-width: 12px; height: 28px; color: @Minor2; font-size: 14px;}
.wm-page_num span:hover{color: @Primary; background-color: @BaseFill;}
.wm-page_num .active{color: #FFF; background-color: @Primary;}
.wm-page_num .active:hover{color: #FFF; background: linear-gradient(@Primary, @Primary1);}
.wm-page_num .disabled{cursor: not-allowed; color: @DisabledText;}
.wm-page_num .disabled:hover{color: @Danger;}
.wm-page_tools{margin: 0 4px;}
.wm-page_tools span{padding: 0 4px;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from 'vuex';
import wmSelect from '@/components/form/select/index.vue'
import Format from '@/library/format'
@Options({
  components: { wmSelect },
  props: {
    total: {default: 0},                      // 总条数
    page: {type: Number, default: 1},         // 当前页码
    maxPage: {type: Number, default: 11},     // 显示页数
    limit: {type: Number, default: 100},      // 每页条数
    limitList: {type: Array, default: [       // 条数选择
      {label: '100', value: 100},
      {label: '200', value: 200},
      {label: '300', value: 300},
      {label: '500', value: 500},
    ]},
    radius: {type: String, default: '14px'},  // 显示页数
  }
})
export default class Page extends Vue {

  // 参数
  total!: any;
  page!: number;
  limit!: number;
  limitList!: Array<any>;
  maxPage!: number;
  radius!: string;
  // 状态
  private store: any = useStore();
  state: any = this.store.state;
  // 变量
  num: number = 0;
  pageNum: number = 0;
  list: Array<any> = [];
  selectVal: Array<any> = [];

  /* 创建成功 */
  created(): void {
    // 监听
    this.$watch('total', (val:number)=>{
      this.init();
    }, { deep: true });
    this.$watch('page', (val:number)=>{
      this.init();
    }, { deep: true });
  }

  /* 创建完成 */
  public mounted(): void {
    this.init();
  }

  /* 初始化 */
  init(): void {
    // 默认值
    this.pageNum = this.page;
    this.selectVal = [this.limit];
    // 分页
    this.num = Math.ceil(this.total/this.limit);
    this.toPage(this.page, false);
  }

  /* 翻页 */
  toPage(n: number, isStatus: boolean=true): void {
    // 边界
    let page: number = n;
    if(n<1) page = 1;
    else if(n>this.num) page = this.num;
    // 中间
    let list: Array<number> = [];
    const nx = Format.Fixed(this.maxPage/2, 0);
    const start = n-nx>=1?n-nx:1;
    if(this.num>this.maxPage){
      for(let i=0; i<this.maxPage; i++){
        if(n+nx<=this.num) list.push(start+i);
        else list.push(start+i-(n+nx-this.num));
      }
    } else {
      for(let i=0; i<this.num; i++) list.push(i+1);
    }
    this.list = list;
    this.pageNum = page;
    if(isStatus){
      this.$emit('update:page', page);
      this.$emit('pageData', {total: this.total, page: page, num: this.num, limit: this.limit});
    }
    
  }

  /* 选择页码 */
  selectChange(val: any): void {
    this.$emit('update:limit', val[0]);
    this.$nextTick(()=>{
      this.init();
    });
  }

}
</script>