<template>
  <ul class="wm-checkbox">
    <li v-if="options.disabled" class="disabled" :style="{margin:margin, padding:padding}">
      <span class="checkbox" :class="options.checked?'active':''">
        <i class="partially" v-if="partially"></i>
        <i class="all" v-else></i>
      </span>
      <span v-if="options.label" class="label">{{ options.label }}</span>
      <slot v-else></slot>
    </li>
    <li v-else :style="{margin:margin, padding:padding}" @click.stop="clickCheckbox()">
      <span class="checkbox" :class="options.checked||value===options.value?'active':''">
        <i class="partially" v-if="partially"></i>
        <i class="all" v-else></i>
      </span>
      <span v-if="options.label" class="label">{{ options.label }}</span>
      <slot v-else></slot>
    </li>
  </ul>
</template>

<style lang="less" scoped>
.wm-checkbox{display: flex; white-space: nowrap; height: 24px; line-height: 24px; font-weight: normal; color: rgba(0,0,0,0.7);}
.wm-checkbox li{display: flex; justify-content: flex-start; align-items: center; cursor: pointer; padding: 5px; margin: 0 4px; line-height: 16px;}
.wm-checkbox li:hover .checkbox{border-color: @Primary;}
.wm-checkbox li:hover .label{color: #000;}
.wm-checkbox span{float: left;}
.wm-checkbox .checkbox{position: relative; display: inline-flex; width: 16px; height: 16px; border: @BorderColor 1px solid; border-radius: 2px; box-sizing: border-box; background-color: #FFF; transition: @Transition;}
.wm-checkbox .label{padding-left: 6px;}
.wm-checkbox .active{border-color: @Primary; background-color: @Primary;}
.wm-checkbox .active .all{content: ''; position: absolute; left: 50%; top: 50%; transform: translate(-40%, -70%) rotate(45deg); width: 4px; height: 8px; border: #FFF 2px solid; border-left: none; border-top: none;}
.wm-checkbox .active .partially{content: ''; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -70%); width: 8px; height: 2px; background-color: #FFF;}
.wm-checkbox .disabled{cursor: not-allowed;}
.wm-checkbox .disabled .checkbox{border-color: @BaseBorder; background-color: #DADCDF;}
.wm-checkbox .disabled:hover .checkbox{border-color: rgba(0,0,0,0.2);}
.wm-checkbox .disabled .active{border-color: rgba(0,0,0,0.2);}
</style>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

/* 参数 */
const props = defineProps({
  value: {type: String, default: ''},           // 默认值
  options: {type: Object, default: {}},         // 数据: {label:'北京市', value:1, disabled: true}
  partially: {type: Boolean, default: false},   // 局部选中
  margin: {type: String, default: '4px 4px'},   // 外部间距
  padding: {type: String, default: '4px'},      // 内部间距
});
const emit = defineEmits(['update:value', 'checkbox']);
// 变量
const list = ref({});

/* 监听 */
watch(()=>props.options, (val: any)=>{
  list.value = val
},{ deep: true });

/* 创建完成 */
onMounted(()=>{
  list.value = props.options;
});

/* 点击选择 */
const clickCheckbox = (): void => {
  const data: any = list.value;
  // 勾选、取消
  data.checked = !data.checked;
  // 事件
  emit('update:value', data.checked?data.value:'');
  emit('checkbox', data.label, data.value);
}

</script>