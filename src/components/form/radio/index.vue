<template>
  <ul class="wm-radio">
    <template v-for="(v,k) in list" :key="k">
      <li class="flex disabled" v-if="v.disabled" :style="{margin:margin, padding:padding}">
        <span class="wm-radio_checked"></span>
        <span v-if="v.label" class="wm-radio_label">{{ v.label }}</span>
        <slot v-else></slot>
      </li>
      <li class="enabled" v-else @click.stop="clickRadio(k)" :style="{margin:margin, padding:padding}">
        <span class="wm-radio_checked" :class="v.value===value?'active':''"></span>
        <span v-if="v.label" class="wm-radio_label">{{ v.label }}</span>
        <slot v-else></slot>
      </li>
    </template>
  </ul>
</template>

<style lang="less" scoped>
.wm-radio{line-height: 26px; display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap;}
.wm-radio li{display: flex; justify-content: center; align-items: center; cursor: pointer; line-height: 16px;}
.wm-radio li span{float: left;}
.wm-radio_checked{position: relative; display: inline-flex; width: 16px; height: 16px; border: @BorderColor 1px solid; border-radius: 50%; box-sizing: border-box; background-color: #FFF; transition: @Transition;}
.wm-radio_label{display: inline-flex; padding-left: 6px;}
/* 选中 */
.wm-radio .active{border-color: @Primary; background-color: @Primary;}
.wm-radio .active::after{content: ""; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -60%); width: 6px; height: 6px; background-color: #FFF; border-radius: 50%;}
/* 禁用 */
.wm-radio .disabled{cursor: not-allowed;}
.wm-radio .disabled .checked{border-color: @BaseBorder; background-color: #DADCDF;}
.wm-radio .disabled:hover .checked{border-color: rgba(0,0,0,0.2);}
.wm-radio .disabled .active{border-color: rgba(0,0,0,0.2);}
</style>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

/* 参数 */
const props = defineProps({
  value: {default: ''},                       // 默认值
  options: {type: Array<any>, default: []},   // 数据: [{label:'男', value:'男', disabled: true},{label:'女', value:'女'}]
  margin: {type: String, default: '4px 4px'},   // 外部间距
  padding: {type: String, default: '4px'},      // 内部间距
});
const emit = defineEmits(['update:value', 'update:options']);
// 变量
const list = ref(<any>[]);

/* 监听 */
watch(()=>props.options, (val: any)=>{
  list.value = val
},{ deep: true });

/* 创建完成 */
onMounted(()=>{
  list.value = props.options;
});


/* 点击选择 */
const clickRadio = (k: number): void => {
  for(let i in list.value) {
    list.value[k].checked = k.toString()==i;
  }
  emit('update:value', list.value[k].value);
  emit('update:options', list);
}

</script>