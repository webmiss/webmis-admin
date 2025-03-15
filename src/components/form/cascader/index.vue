<template>
  <div ref="formCascader" class="wm-cascader" tabindex="2" :class="show?'show':''"
    @click="show=true"
    :style="{
      width: width,
      height: height,
      lineHeight: height,
  }">
    <!-- Clear -->
    <div class="wm-cascader_clear_body" v-if="labelName&&clearable" :style="{width: height, height: height}" @click.stop="clear()">
      <div class="wm-cascader_clear" :style="{width: 'calc('+height+' / 2)', height: 'calc('+height+' / 2)'}"></div>
    </div>
    <!-- Icon -->
    <i class="wm-cascader_arrow ui ui_arrow_down" :style="{transform: show?'rotate(180deg)':'rotate(0deg)'}"></i>
    <!-- Value -->
    <div class="wm-cascader_value" :class="labelName?'':'none'">{{ labelName || placeholder || state.langs.select }}</div>
    <!-- List -->
    <div class="wm-cascader_body flex_left" :style="{visibility: show?'inherit':'hidden', opacity: show?'1':'0'}">
      <div class="arrow" :style="{left: 'calc('+bodyMinWidth+' - 5px)', transform: 'translateX(calc(-'+bodyMinWidth+' / 2))'}"></div>
      <!-- One Menus -->
      <ul class="wm-cascader_list" :style="{width: 'calc(100% / '+level+')', minWidth: bodyMinWidth}">
        <li v-for="(v,k) in listData" :key="k" :class="v.checked?'active':''" @click.stop="selectClick('1', [k, -1, -1, -1])">
          <span>{{ v.label }}</span>
          <i class="ui ui_arrow_right" v-if="v.children&&v.children.length>0"></i>
        </li>
      </ul>
      <!-- Two Menus -->
      <ul v-if="k1>=0 && listData[k1].children" class="wm-cascader_list" :style="{width: 'calc(100% / '+level+')', minWidth: bodyMinWidth}">
        <li v-for="(v,k) in listData[k1].children" :key="k" :class="v.checked?'active':''" @click.stop="selectClick('2', [k1, k, -1, -1])">
          <span>{{ v.label }}</span>
          <i class="ui ui_arrow_right" v-if="v.children&&v.children.length>0"></i>
        </li>
      </ul>
      <!-- Three Menus -->
      <ul v-if="k2>=0 && listData[k1].children[k2].children" class="wm-cascader_list" :style="{width: 'calc(100% / '+level+')', minWidth: bodyMinWidth}">
        <li v-for="(v,k) in listData[k1].children[k2].children" :key="k" :class="v.checked?'active':''" @click.stop="selectClick('3', [k1, k2, k, -1])">
          <span>{{ v.label }}</span>
          <i class="ui ui_arrow_right" v-if="v.children&&v.children.length>0"></i>
        </li>
      </ul>
      <!-- Four Menus -->
      <ul v-if="k3>=0 && listData[k1].children[k2].children[k3].children" class="wm-cascader_list" :style="{width: 'calc(100% / '+level+')', minWidth: bodyMinWidth}">
        <li v-for="(v,k) in listData[k1].children[k2].children[k3].children" :key="k" :class="v.checked?'active':''" @click.stop="selectClick('4', [k1, k2, k3, k])">
          <span>{{ v.label }}</span>
          <i class="ui ui_arrow_right" v-if="v.children&&v.children.length>0"></i>
        </li>
      </ul>
      <!-- Menus End -->
    </div>
    <!-- List End -->
  </div>
</template>

<style lang="less" scoped>
.wm-cascader{cursor: pointer; position: relative;}
.wm-cascader_arrow{position: absolute; z-index: 2; width: 32px; height: 100%; top: 0; right: 0; text-align: center; font-size: 12px; transition: @Transition;}
.wm-cascader.show .wm-cascader_value{border-color: @Primary;}
.wm-cascader_value{overflow: hidden; position: relative; width: 100%; height: 100%; padding: 0 32px 0 10px; text-align: left; box-sizing: border-box; border: @BaseBorder 1px solid; border-radius: 4px; background-color: #FFF;}
.wm-cascader_value::after{content: ''; position: absolute; z-index: 1; top: 0; right: 0; width: 32px; height: 100%; background-color: #FFF;}
.wm-cascader_value:hover{border-color: @Primary;}
.wm-cascader_value.none{color: @SecondaryText;}
.wm-cascader_body{position: absolute; z-index: 999; width: 100%; margin-top: 8px; border-radius: 4px; transition: @Transition;}
.wm-cascader_body .arrow{position: absolute; top: -5px;}
.wm-cascader_body .arrow::before{content: ''; position: absolute; width: 10px; height: 10px; border: @BorderColor 1px solid; border-right-color: transparent; border-bottom-color: transparent; background-color: #FFF; transform: rotate(45deg); box-sizing: border-box;}
.wm-cascader_list{user-select: none; padding: 8px 0; box-sizing: border-box; background-color: #FFF; box-shadow: 0 0 4px rgba(0,0,0,0.2);}
.wm-cascader_list li{position: relative; cursor: pointer; white-space: nowrap; line-height: 40px;}
.wm-cascader_list li:hover{color: @Primary;}
.wm-cascader_list span{display: block; padding-left: 16px;}
.wm-cascader_list i{position: absolute; width: 32px; height: 32px; line-height: 32px; right: 0; top: 50%; transform: translateY(-50%); font-size: 12px; text-align: center; border-radius: 2px;}
.wm-cascader_list .active{color: @Primary;}
.wm-cascader_clear_body{cursor: pointer; position: absolute; z-index: 10; top: 0; right: 0;}
.wm-cascader_clear{user-select: none; position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background-color: @Danger; border-radius: 50%;}
.wm-cascader_clear::after,.wm-cascader_clear::before{content: ''; position: absolute; width: 50%; height: 0.1rem; background-color: #FFF; left: 50%; top: 50%; transform-origin: center;}
.wm-cascader_clear::after{transform: translate(-50%, -50%) rotate(45deg);}
.wm-cascader_clear::before{transform: translate(-50%, -50%) rotate(-45deg);}
</style>

<script setup lang="ts">
import { ref, watch, onMounted, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';

/* 参数 */
const props = defineProps({
    value: {type: Array<any>, default: ''},                 // 默认值
    options: {type: Array<any>, default: []},               // 数据: [{label:'一级菜单', value:'m1', children: []}]
    multiple: {type: Boolean, default: false},              // 是否多选
    width: {type: String, default: '100%'},                 // 宽
    height: {type: String, default: '40px'},                // 高
    placeholder: {type: String, default: ''},               // 提示
    level: {type: Number, default: 3},                      // 菜单级数
    bodyMinWidth: {type: String, default: '160px'},         // 内容最小高度
    clearable: {type: Boolean, default: false},             // 一键清空
});
const { proxy } = getCurrentInstance() as any ;
const emit = defineEmits(['update:value', 'data']);
// 状态
const store = useStore();
const state = store.state;
// 变量
const show = ref(false);
const selectObj = ref();
const listData = ref(<any>[]);
const k1 = ref(-1);
const k2 = ref(-1);
const k3 = ref(-1);
const k4 = ref(-1);
const labelName = ref('');

/* 监听 */
watch(()=>props.value, (val: Array<any>)=>{
  let level: string = '';
  let k1: number = -1;
  let k2: number = -1;
  let k3: number = -1;
  let k4: number = -1;
  // 一级
  listData.value.forEach((v1: any, i1: number)=>{
    if(val[0]==v1.value) { level='1'; k1=i1; }
    // 二级
    if(v1.children) {
      v1.children.forEach((v2: any, i2: number)=>{
        if(val[1]==v2.value) { level='2'; k2=i2; }
        // 三级
        if(v2.children) {
          v2.children.forEach((v3: any, i3: number)=>{
            if(val[2]==v3.value) { level='3'; k3=i3; }
            // 四级
            if(v3.children) {
              v3.children.forEach((v4: any, i4: number)=>{
                if(val[3]==v4.value) { level='4'; k4=i4; }
              });
            }
          });
        }
      });
    }
  });
  if(level) selectClick(level, [k1, k2, k3, k4], false);
  else clear();
});
watch(()=>props.options, (val: Array<any>)=>{
  listData.value = val;
});

/* 创建完成 */
onMounted(()=>{
  init();
});

/* 初始化 */
const init = (): void => {
  // 失去焦点
  selectObj.value = proxy.$refs.formCascader;
  selectObj.value.addEventListener('focusout', ()=>{
    show.value = false;
  });
}

/* 选择 */
const selectClick = (level: string, pos: Array<number>, isStatus: boolean=true): void => {
  let labels: Array<any> = [];
  let values: Array<any> = [];
  // 位置
  k1.value = pos[0];
  k2.value = pos[1];
  k3.value = pos[2];
  k4.value = pos[3];
  // 层级
  if(level=='1') {
    // 清除、选中
    selectClear(listData.value);
    listData.value[k1.value].checked = true;
    // 数据
    labels = [listData.value[k1.value].label];
    values = [listData.value[k1.value].value];
  } else if(level=='2') {
    // 清除、选中
    selectClear(listData.value[k1.value].children);
    listData.value[k1.value].checked = true;
    listData.value[k1.value].children[k2.value].checked = true;
    // 数据
    labels = [
      listData.value[k1.value].label,
      listData.value[k1.value].children[k2.value].label,
    ];
    values = [
      listData.value[k1.value].value,
      listData.value[k1.value].children[k2.value].value,
    ];
  } else if(level=='3') {
    // 清除、选中
    selectClear(listData.value[k1.value].children[k2.value].children);
    listData.value[k1.value].checked = true;
    listData.value[k1.value].children[k2.value].checked = true;
    listData.value[k1.value].children[k2.value].children[k3.value].checked = true;
    // 数据
    labels = [
      listData.value[k1.value].label,
      listData.value[k1.value].children[k2.value].label,
      listData.value[k1.value].children[k2.value].children[k3.value].label,
    ];
    values = [
      listData.value[k1.value].value,
      listData.value[k1.value].children[k2.value].value,
      listData.value[k1.value].children[k2.value].children[k3.value].value,
    ];
  } else if(level=='4') {
    // 清除、选中
    selectClear(listData.value[k1.value].children[k2.value].children[k3.value].children);
    listData.value[k1.value].checked = true;
    listData.value[k1.value].children[k2.value].checked = true;
    listData.value[k1.value].children[k2.value].children[k3.value].checked = true;
    listData.value[k1.value].children[k2.value].children[k3.value].children[k4.value].checked = true;
    // 数据
    labels = [
      listData.value[k1.value].label,
      listData.value[k1.value].children[k2.value].label,
      listData.value[k1.value].children[k2.value].children[k3.value].label,
      listData.value[k1.value].children[k2.value].children[k3.value].children[k4.value].label,
    ];
    values = [
      listData.value[k1.value].value,
      listData.value[k1.value].children[k2.value].value,
      listData.value[k1.value].children[k2.value].children[k3.value].value,
      listData.value[k1.value].children[k2.value].children[k3.value].children[k4.value].value,
    ];
  }
  // 事件
  labelName.value = labels.join(' > ');
  if(isStatus){
    emit('update:value', values);
    emit('data', listData.value);
  }
}

/* 清空下级 */
const selectClear = (data: any): void => {
  for(let i in data){
    data[i].checked = false;
    if(data[i].children) selectClear(data[i].children);
  }
}

/* 清空 */
const clear = (): void => {
  k1.value= -1;
  k2.value= -1;
  k3.value= -1;
  k4.value= -1;
  labelName.value = '';
  emit('update:value', '');
  selectClear(listData.value);
}

</script>