<template>
  <wmDialog v-model:show="infoShow" :title="title" width="680px" bottom="40px" @close="close()">
    <wmMain>
      <wmTableForm>
        <tr>
          <td class="label"><span class="red_dot">调出仓库</span></td>
          <td colspan="3">
            <wmSelect v-model:value="form.go_co_id" :options="selectAll.go_co_name" :disabled="form.tp=='edit'" />
          </td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">调入仓库</span></td>
          <td colspan="3">
            <wmSelect v-model:value="form.link_co_id" :options="selectAll.link_co_name" />
          </td>
        </tr>
        <tr>
          <td class="label"><span class="red_dot">类型</span></td>
          <td colspan="3">
            <wmSelect v-model:value="form.type" :options="selectAll.type_name" />
          </td>
        </tr>
        <tr v-show="form.link_co_id[0]=='14377940'&&form.type[0]=='24'">
          <td class="label"><span class="red_dot">入库日期</span></td>
          <td>
            <wmInput v-model:value="form.in_time" />
          </td>
          <td class="label"><span class="red_dot">品质</span></td>
          <td>
            <wmSelect v-model:value="form.quality" :options="selectAll.quality_name" />
          </td>
        </tr>
        <tr>
          <td class="label">备注</td>
          <td colspan="3">
            <wmInput v-model:value="form.remark" type="textarea" height="160px" />
          </td>
        </tr>
      </wmTableForm>
    </wmMain>
    <template #bottom>
      <wmButton height="40px" padding="0 32px" @click="submit()">{{ langs.confirm }}</wmButton>
    </template>
  </wmDialog>
</template>

<style lang="less" scoped></style>
<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../../library/ui';
import Request from '../../../library/request';
import Time from '../../../library/time';
/* 组件 */
import wmMain from '../../../components/container/main.vue';
import wmDialog from '../../../components/dialog/index.vue';
import wmTableForm from '../../../components/table/form.vue';
import wmSelect from '../../../components/form/select/index.vue';
import wmInput from '../../../components/form/input/index.vue';
import wmButton from '../../../components/form/button/index.vue';

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
const form = ref({tp:'', id:'', type:<any>'', go_co_id:<any>'', link_co_id:<any>'', quality:<any>'', in_time: '', remark:''});
// 全部分类
const selectAll = ref({type_name: [], go_co_name: [], link_co_name: [], quality_name: []});

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
  if(val){
    form.value.tp = props.data.tp || '';
    form.value.id = props.data.id || '';
    form.value.in_time = props.data.in_time || Time.Date('Y/m/d');
    form.value.remark = props.data.remark || '';
    // 选项
    getSelect();
  }
},{ deep: true });

/* 选项 */
const getSelect = (): void => {
  Request.Post('erp_purchase_allocate_out/get_select?lang='+state.lang, {
    token: state.token,
  }, (res:any)=>{
    const {code, msg, data}: any = res.data;
    if(code==0) {
      // 类型、分仓、店铺、买断店铺
      selectAll.value.type_name = data.type_name;
      selectAll.value.go_co_name = data.go_co_name;
      selectAll.value.link_co_name = data.link_co_name;
      selectAll.value.quality_name = data.quality_name;
      if(props.data.tp=='edit') {
        nextTick(()=>{
          form.value.go_co_id = [parseInt(props.data.go_co_id)];
          form.value.link_co_id = [parseInt(props.data.link_co_id)];
          form.value.type = [props.data.level];
          form.value.quality = [parseInt(props.data.quality)];
        });
      }
    } else Ui.Toast(msg);
  });
}

/* 验证 */
const verify = (form: any): any => {
  if(!form.go_co_id || form.go_co_id.length==0) return Ui.Toast('请选择调出仓库');
  if(!form.link_co_id || form.link_co_id.length==0) return Ui.Toast('请选择调入仓库');
  if(form.go_co_id[0]==form.link_co_id[0]) return Ui.Toast('请选择调入仓库');
  if(!form.type || form.type.length==0) return Ui.Toast('请选择类型');
  if(props.data.level=='24' && (!form.in_time || form.in_time.length==0)) return Ui.Toast('填写入库日期');
  if(props.data.level=='24' && (!form.quality || form.quality.length==0)) return Ui.Toast('请选择品质');
  return form;
}

/* 提交 */
const submit = (): void => {
  // 验证
  const data = verify(form.value);
  if(!data) return;
  // 请求
  const load: any = Ui.Loading();
  Request.Post('erp_purchase_allocate_out/save?lang='+state.lang, {
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
