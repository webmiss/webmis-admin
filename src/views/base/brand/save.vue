<template>
  <wmDialog v-model:show="infoShow" :title="title" width="720px" bottom="40px" @close="close()">
    <wmAlert>提示: 请认证填写如下信息</wmAlert>
    <wmMain>
      <wmTableForm>
        <tr>
          <td class="label"><span class="red_dot">{{ langs.status }}</span></td>
          <td colspan="3">
            <wmSwitch v-model:value="form.status"></wmSwitch>
          </td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">分类</span></td>
          <td>
            <wmSelect v-model:value="form.class" :options="selectAll.class_name"></wmSelect>
          </td>
          <td class="label"><span class="red_dot">排序</span></td>
          <td style="width: 30%;">
            <wmInput v-model:value="form.sort" maxlength="4"></wmInput>
          </td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">{{ langs.name }}</span></td>
          <td colspan="3">
            <wmInput v-model:value="form.name" maxlength="16"></wmInput>
          </td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">值</span></td>
          <td colspan="3">
            <wmInput v-model:value="form.value" maxlength="32"></wmInput>
          </td>
        </tr>
        <tr>
          <td class="label">编码正则</td>
          <td colspan="3">
            <wmInput v-model:value="form.rule" maxlength="128"></wmInput>
          </td>
        </tr>
        <tr>
          <td class="label">{{ langs.remark }}</td>
          <td colspan="3">
            <wmInput v-model:value="form.remark" type="textarea" :height="'80px'" maxlength="32"></wmInput>
          </td>
        </tr>
      </wmTableForm>
    </wmMain>
    <template #bottom>
      <wmButton height="40px" padding="0 32px" @click="submit()">{{ langs.confirm }}</wmButton>
    </template>
  </wmDialog>
</template>

<style lang="less" scoped>
.wm-table_form .label{width: 70px;}
.wm-table_form .action{width: 60px; text-align: center;}
</style>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../../library/ui';
import Request from '../../../library/request';
/* 组件 */
import wmMain from '../../../components/container/main.vue';
import wmAlert from '../../../components/alert/index.vue';
import wmDialog from '../../../components/dialog/index.vue';
import wmInput from '../../../components/form/input/index.vue';
import wmButton from '../../../components/form/button/index.vue';
import wmSwitch from '../../../components/form/switch/index.vue';
import wmTableForm from '../../../components/table/form.vue';
import wmSelect from '../../../components/form/select/index.vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},        // 是否显示
  title: {type: String, default: ''},           // 标题
  data: {type: Object, default: {}},            // 数据
});
const emit = defineEmits(['update:show', 'submit']);
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
// 变量
const infoShow = ref(false);
// 数据
const form = ref({id: 0, status: true, class:<any>'', sort:'0', name: '', value: '', rule: '', remark: ''});
// 全部分类
const selectAll = ref({city_name: <any>[], class_name: <any>[]});

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
  if(val){
    // 默认值
    form.value.id = props.data.id || 0;
    form.value.status = typeof props.data.status!='undefined'?props.data.status:true;
    form.value.sort = props.data.sort || '0';
    form.value.name = props.data.name || '';
    form.value.value = props.data.value || '';
    form.value.rule = props.data.rule || '';
    form.value.remark = props.data.remark || '';
    // 选项
    getSelect();
  }
},{ deep: true });

/* 选项 */
const getSelect = (): void => {
  form.value.class = [];
  Request.Post('erp_base_brand/get_select?lang='+state.lang, {
    token: state.token,
  }, (res:any)=>{
    const {code, msg, data}: any = res.data;
    if(code==0) {
      selectAll.value.class_name = data.class_name;
      // 默认值
      nextTick(()=>{
        form.value.class = typeof props.data.class!='undefined'?[props.data.class]:'';
      });
    } else Ui.Toast(msg);
  });
}

/* 验证 */
const verify = (form: any): any => {
  if(form.class.length<1) return Ui.Toast('请选择分类');
  if(isNaN(form.sort)) return Ui.Toast('请输入排序数字');
  if(form.name.length<2 || form.name.length>16) return Ui.Toast('名称2～16字符!');
  if(form.value.length<2 || form.value.length>64) return Ui.Toast('值2～64字符!');
  return form;
}

/* 提交 */
const submit = (): void => {
  // 验证
  const data = verify(form.value);
  if(!data) return;
  // 请求
  const load: any = Ui.Loading();
  Request.Post('erp_base_brand/save?lang='+state.lang, {
    token: state.token,
    data: data,
  }, (res:any)=>{
    load.clear();
    const {code, msg}: any = res.data;
    Ui.Toast(msg);
    emit('submit', code==0);
  });
}

/* 关闭 */
const close = (): void => {
  emit('update:show', false);
}

</script>