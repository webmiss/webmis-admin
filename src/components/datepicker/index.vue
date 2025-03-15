<template>
  <div :style="{width: width, height: height}">
    <VueDatePicker
      v-model="date"
      mode="range"
      :format="format"
      :range="range"
      :placeholder="placeholder"
      :locale="language"
      :day-names="dayName"
      :enable-time-picker="isTime"
      :text-input="isText"
      :multi-calendars="isMulti"
      :min-date="minDate"
      :max-date="maxDate"
      auto-apply
    ></VueDatePicker>
  </div>
</template>

<style lang="less">
.dp__input{vertical-align: middle; height: 40px;}
</style>

<script setup lang="ts">
import { ref, onMounted, watch, getCurrentInstance } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

/* 参数 */
const props = defineProps({
    value: {type: [String, Array<any>], default: ''},         // 日期: '2024-01-01'、['2024-01-01', '2024-01-31']
    range: {type: Boolean, default: false},                   // 范围选择
    format: {type: String, default: 'yyyy/MM/dd'},            // 格式: yyyy-MM-dd HH:mm:ss
    isTime: {type: Boolean, default: false},                  // 时间选择
    isText: {type: Boolean, default: true},                   // 文本输入
    isMulti: {type: Boolean, default: false},                 // 双日期面板
    minDate: {type: String, default: ''},                     // 禁用过去
    maxDate: {type: String, default: ''},                     // 禁用未来
    width: {type: String, default: '100%'},                   // 宽
    height: {type: String, default: '40px'},                  // 高
    placeholder: {type: String, default: '请选择日期'},       // 提示
    language: {type: String, default: 'zh-CN'},               // 语言
    dayName: {type: Array<string>, default: ['一', '二', '三', '四', '五', '六', '日']},
});
const { proxy } = getCurrentInstance() as any ;
const emit = defineEmits(['update:value']);
/* 变量 */
const date = ref();

/* 监听 */
watch(()=>props.value, (val: any)=>{
  if(val) {
    date.value = val;
    emit('update:value', val);
  }
},{ deep: true });
watch(date, (val: any)=>{
  if(val) {
    emit('update:value', val);
  }
},{ deep: true });

/* 创建完成 */
onMounted(()=>{
  date.value = props.value;
});

</script>