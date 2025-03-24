<template>
  <div class="wm-page_body">
    <div class="wm-page flex_center">
      <div v-html="state.langs.page_total(total, pageNum, num)"></div>
      <div class="wm-page_num flex">
        <!-- Prev -->
        <span class="disabled" v-if="total==0 || pageNum<=1" :style="{borderRadius: radius}"><i class="ui ui_arrow_left"></i></span>
        <span v-else @click="toPage(1)" :style="{borderRadius: radius}"><i class="ui ui_arrow_left"></i></span>
        <!-- Page -->
         <template v-if="total>0">
          <span v-for="(v, k) in list" :key="k" :class="v==pageNum?'active':''" @click="toPage(v)" :style="{borderRadius: radius}">
            <b>{{ v }}</b>
          </span>
        </template>
        <span v-else class="disabled">{{ total }}</span>
        <!-- Next -->
        <span class="disabled" v-if="total==0 || pageNum>=num" :style="{borderRadius: radius}"><i class="ui ui_arrow_right"></i></span>
        <span v-else @click="toPage(num)" :style="{borderRadius: radius}"><i class="ui ui_arrow_right"></i></span>
      </div>
      <div class="wm-page_tools flex">
        <span>{{ state.langs.page_limit }}</span>
        <span>
          <wmSelect :value="[limit]" @update:value="selectChange($event)" width="80px" height="28px" position="top" :options="limitList"></wmSelect>
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

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import wmSelect from '../form/select/index.vue';
import Format from '.././../library/format';

/* 参数 */
const props = defineProps({
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
});
const emit = defineEmits(['update:page', 'update:limit', 'pageData']);
// 状态
const store = useStore();
const state = store.state;
// 变量
const num = ref(0);
const pageNum = ref(0);
const list = ref(<any>[]);

/* 监听 */
watch(()=>props.total, (val: number)=>{
  if(val>=0) init();
},{ deep: true });

/* 初始化 */
const init = (): void => {
  // 默认值
  pageNum.value = props.page;
  // 分页
  num.value = Math.ceil(props.total/props.limit);
  toPage(props.page, false);
}

/* 翻页 */
const toPage = (n: number, isStatus: boolean=true): void => {
  // 边界
  let page: number = n;
  if(n<1) page = 1;
  else if(n>num.value) page = num.value;
  // 中间
  let data: Array<number> = [];
  const nx = Format.Fixed(props.maxPage/2, 0);
  const start = n-nx>=1?n-nx:1;
  if(num.value>props.maxPage){
    for(let i=0; i<props.maxPage; i++){
      if(n+nx<=num.value) data.push(start+i);
      else data.push(start+i-(n+nx-num.value));
    }
  } else {
    for(let i=0; i<num.value; i++) data.push(i+1);
  }
  list.value = data;
  pageNum.value = page;
  if(isStatus){
    emit('update:page', page);
    emit('pageData', {total: props.total, page: page, num: num, limit: props.limit});
  }
}

/* 选择页码 */
const selectChange = (val: any): void => {
  emit('update:limit', val[0]);
}

</script>
