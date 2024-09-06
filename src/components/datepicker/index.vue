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

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import Time from '@/library/time'
@Options({
  components: { VueDatePicker },
  props: {
    value: {default: ''},                                     // 日期: '2024-01-01'、['2024-01-01', '2024-01-31']
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
    dayName: {type: Array, default: ['一', '二', '三', '四', '五', '六', '日']},
  }
})
export default class DatePicker extends Vue {

  // 参数
  value!: any;
  range!: boolean;
  format!: string;
  isTime!: boolean;
  isText!: boolean;
  isMulti!: boolean;
  minDate!: string;
  maxDate!: string;
  width!: string;
  height!: string;
  placeholder!: string;
  language!: string;
  dayName!: Array<string>;
  // 变量
  date: string='';

  /* 创建成功 */
  created(): void {
    // 监听
    this.$watch('value', (val:any)=>{
      if(val) {
        this.date = val;
        this.$emit('update:value', val);
      }
    }, { deep: true });
    this.$watch('date', (val:any)=>{
      if(val) this.$emit('update:value', val);
    }, { deep: true });
  }
  /* 创建完成 */
  public mounted(): void {
    this.date = this.value;
  }

}
</script>