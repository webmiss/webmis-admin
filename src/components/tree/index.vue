<template>
  <div class="wm-tree_body" :style="{width: width}">
    <!-- One -->
    <div class="wm-tree" v-for="(v1, k1) in listData" :key="k1">
      <div class="wm-tree_content flex_left" :style="{padding: padding, paddingLeft: '4px'}" @click="v1.display=!v1.display">
        <i :class="v1.children?'ui ui_arrow_right':''" :style="{transform: v1.display?'rotate(90deg)':'rotate(0deg)'}"></i>
        <wm-checkBox :partially="v1.children&&v1.checked&&v1.partially" @update:value="selectClick($event, '1', [k1, -1, -1, -1])" :options="{label:'', value:v1.value, checked:v1.checked, disabled:v1.disabled}"></wm-checkBox>
        <span class="label">{{ v1.label }}</span>
      </div>
      <!-- two -->
      <template v-if="v1.children&&v1.display">
        <div class="wm-tree" v-for="(v2, k2) in v1.children" :key="k2">
          <div class="wm-tree_content flex_left" :style="{padding: padding, paddingLeft: '20px'}" @click="v2.display=!v2.display">
            <i :class="v2.children?'ui ui_arrow_right':''" :style="{transform: v2.display?'rotate(90deg)':'rotate(0deg)'}"></i>
            <wm-checkBox :partially="v2.children&&v2.checked&&v2.partially" @update:value="selectClick($event, '2', [k1, k2, -1, -1])" :options="{label:'', value:v2.value, checked:v2.checked, disabled:v2.disabled}"></wm-checkBox>
            <span class="label">{{ v2.label }}</span>
          </div>
          <!-- three -->
          <template v-if="v2.children&&v2.display">
            <div class="wm-tree" v-for="(v3, k3) in v2.children" :key="k3">
              <div class="wm-tree_content flex_left" :style="{padding: padding, paddingLeft: '36px'}" @click="v3.display=!v3.display">
                <i :class="v3.children?'ui ui_arrow_right':''" :style="{transform: v3.display?'rotate(90deg)':'rotate(0deg)'}"></i>
                <wm-checkBox :partially="v3.children&&v3.checked&&v3.partially" @update:value="selectClick($event, '3', [k1, k2, k3, -1])" :options="{label:'', value:v3.value, checked:v3.checked, disabled:v3.disabled}"></wm-checkBox>
                <span class="label">{{ v3.label }}</span>
              </div>
              <!-- four -->
              <template v-if="v3.children&&v3.display">
                <div class="wm-tree" v-for="(v4, k4) in v3.children" :key="k4">
                  <div class="wm-tree_content flex_left" :style="{padding: padding, paddingLeft: '52px'}">
                    <i></i>
                    <wm-checkBox @update:value="selectClick($event, '4', [k1, k2, k3, k4])" :options="{label:'', value:v4.value, checked:v4.checked, disabled:v4.disabled}"></wm-checkBox>
                    <span class="label">{{ v4.label }}</span>
                  </div>
                </div>
              </template>
              <!-- four End -->
            </div>
          </template>
          <!-- three End -->
        </div>
      </template>
      <!-- two End -->
    </div>
    <!-- One End -->
  </div>
</template>

<style lang="less" scoped>
.wm-tree_body{color: @BrandText;}
.wm-tree{display: inline;}
.wm-tree_content{position: relative; cursor: pointer; height: 24px; line-height: 24px;}
.wm-tree_content:hover{background-color: @PageBackground;}
.wm-tree_content i{width: 16px; font-size: 10px; text-align: center; transition: @Transition;}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';
import wmCheckBox from '../form/checkbox/index.vue';

/* 参数 */
const props = defineProps({
    options: {type: Array, default: []},                    // 数据: [{label:'一级菜单', value:'m1', checked: true, children: []}]
    width: {type: String, default: '100%'},                 // 宽
    padding: {type: String, default: '2px 0'},              // 内部间距
    level: {type: Number, default: 3},                      // 菜单级数
  });
const emit = defineEmits(['update:value', 'data']);
// 变量
const listData = ref(<any>[]);

/* 监听 */
watch(()=>props.options, (val: Array<any>)=>{
  listData.value = val;
  setPartially();
},{ deep: true });

/* 选择 */
const selectClick = (val: string, level: string, pos: Array<number>, isStatus: boolean=true): void => {
  let d1: any, d2: any, d3: any, d4: any;
  // 层级
  if(level=='1') {
    // 选中
    d1 = listData.value[pos[0]];
    d1.checked = val?true:false;
    // 勾选下级
    if(d1.children) nextChecked(d1.children, val?true:false);
  } else if(level=='2') {
    // 选中
    d2 = listData.value[pos[0]].children[pos[1]];
    d2.checked = val?true:false;
    // 勾选下级
    if(d2.children) nextChecked(d2.children, val?true:false);
    // 勾选上级
    d1 = listData.value[pos[0]];
    prevChecked(d1);
  } else if(level=='3') {
    // 选中
    d3 = listData.value[pos[0]].children[pos[1]].children[pos[2]];
    d3.checked = val?true:false;
    // 勾选下级
    if(d3.children) nextChecked(d3.children, val?true:false);
    // 勾选上级
    d1 = listData.value[pos[0]];
    d2 = listData.value[pos[0]].children[pos[1]];
    prevChecked(d2);
    prevChecked(d1);
  } else if(level=='4') {
    // 选中、
    d4 = listData.value[pos[0]].children[pos[1]].children[pos[2]].children[pos[3]];
    d4.checked = val?true:false;
    // 勾选上级
    d1 = listData.value[pos[0]];
    d2 = listData.value[pos[0]].children[pos[1]];
    d3 = listData.value[pos[0]].children[pos[1]].children[pos[2]];
    prevChecked(d3);
    prevChecked(d2);
    prevChecked(d1);
  }
  // 部分选择
  setPartially();
  // 事件
  if(isStatus) {
    emit('update:value', getData());
    emit('data', listData.value);
  }
}
/* 勾选上级 */
const prevChecked = (d: any): void => {
  let n: number = checkedNum(d.children);
  if(n==0){
    d.checked = false;
  } else if(n==d.children.length){
    d.checked = true;
  } else {
    d.checked = true;
  }
}

/* 勾选下级 */
const nextChecked = (data: any, checked: boolean): void => {
  for(let i in data){
    data[i].checked = checked;
    if(data[i].children) nextChecked(data[i].children, checked);
  }
}

/* 部分选择 */
const setPartially = (): void => {
  let n1:boolean=false, n2:boolean=false, n3:boolean=false, n4:boolean=false;
  // 一级
  for(let v1 of listData.value) {
    n1 = v1['children']?isPartially(v1['children']):false;
    v1['partially'] = v1['checked']&&n1?true:false;
    if(!v1['children']) continue;
    // 二级
    for(let v2 of v1['children']) {
      n2 = v2['children']?isPartially(v2['children']):false;
      v2['partially'] = v2['checked']&&n2?true:false;
      if(!v2['children']) continue;
      // 三级
      for(let v3 of v2['children']) {
        n3 = v3['children']?isPartially(v3['children']):false;
        v3['partially'] = v3['checked']&&n3?true:false;
        if(!v3['children']) continue;
      }
    }
  }
}
/* 是否选择 */
const isPartially = (d: any): boolean => {
  let res: boolean=false;
  for(let v of d) {
    if(v['children']) {
      res = isPartially(v['children']);
      if(res) return res;
    } else {
      let n: number = checkedNum(d);
      if(n!=d.length) return true;
    }
  }
  return res;
}
/* 获取选中数量 */
const checkedNum = (data: any): number => {
  let n: number = 0;
  for(let v of data) if(v.checked) n++;
  return n; 
}

/* 获取数据 */
const getData = (): Array<string> => {
  let values: Array<string> = [];
  for(let v1 of listData.value) {
    if(v1.checked) values.push(v1.value);
    if(!v1.children) continue;
    for(let v2 of v1.children) {
      if(v2.checked) values.push(v2.value);
      if(!v2.children) continue;
      for(let v3 of v2.children) {
        if(v3.checked) values.push(v3.value);
        if(!v3.children) continue;
        for(let v4 of v3.children) {
          if(v4.checked) values.push(v4.value);
        }
      }
    }
  }
  return values;
}

/* 清空 */
const clear = (): void => {
  // $emit('update:value', '');
  nextChecked(listData, false);
}

</script>