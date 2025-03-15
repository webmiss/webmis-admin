<template>
  <wmDialog v-model:show="infoShow" :title="title" width="800px" bottom="40px" :overflow="tabIndex=='perm'?'hidden auto':'hidden'" @close="close()">
    <wmMain paddingY="0">
      <wmTabs v-model:value="tabIndex" :columns="tabs">
        <!-- 基本信息 -->
        <template #base>
          <wmTableForm>
            <tr>
              <td class="label">{{ langs.status }}</td>
              <td>
                <wmSwitch v-model:value="form.status"></wmSwitch>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.web_html_type }}</td>
              <td>
                <wmSelect v-model:value="form.type" :options="selectType"></wmSelect>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.web_html_title }}</td>
              <td>
                <wmInput v-model:value="form.title" maxlength="32"></wmInput>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.web_html_name }}</td>
              <td>
                <wmInput v-model:value="form.name" maxlength="16"></wmInput>
              </td>
            </tr>
            <tr>
              <td class="label">{{ langs.remark }}</td>
              <td>
                <wmInput v-model:value="form.remark" type="textarea" height="120px" maxlength="32"></wmInput>
              </td>
            </tr>
          </wmTableForm>
        </template>
        <!-- 基本信息 End -->
         <!-- 内容 -->
        <template #content>
          <!-- <wm-tinymce v-model:value="form.content" :language="state.lang=='zh_CN'?state.lang:''" :upload="upload" :height="480"></wm-tinymce> -->
        </template>
        <!-- 内容 End -->
      </wmTabs>
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
import { ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '../../../library/ui';
import Request from '../../../library/request';
/* 组件 */
import wmMain from '../../../components/container/main.vue';
import wmDialog from '../../../components/dialog/index.vue';
import wmInput from '../../../components/form/input/index.vue';
import wmButton from '../../../components/form/button/index.vue';
import wmSwitch from '../../../components/form/switch/index.vue';
import wmSelect from '../../../components/form/select/index.vue';
import wmTableForm from '../../../components/table/form.vue';
import wmTabs from '../../../components/tabs/index.vue';
// import wmTinymce from '../../../components/tinymce/index.vue'

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},        // 是否显示
  title: {type: String, default: ''},           // 标题
  data: {type: Object, default: []},            // 数据
});
const emit = defineEmits(['update:show', 'submit']);
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
// 变量
const infoShow = ref(false);
// Tabs
const tabIndex = ref('base');
const tabs = ref([
  {label: langs.info, value: 'base', slot: 'base'},
  {label: langs.content, value: 'content', slot: 'content'},
]);
// 数据
const form = ref({id: 0, status: true, type: <any>[], title: '', name: '', remark: '', content: ''});
// 全部分类
const selectType = ref([{label: 'PC版', value: 0}, {label: '手机版', value: 1}]);

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  infoShow.value = val;
  if(val){
    // 默认值
    form.value.id = props.data.id || 0;
    form.value.status = typeof props.data.status!='undefined'?props.data.status:true;
    form.value.type = typeof props.data.type!='undefined'?[parseInt(props.data.type)]:[];
    form.value.title = props.data.title || '';
    form.value.name = props.data.name || '';
    form.value.remark = props.data.remark || '';
    form.value.content = props.data.content || '';
  }
});

/* 上传文件 */
const upload = (blobInfo:any, progress:any): any => {
  return new Promise((resolve, reject) => {
    const fileObj = blobInfo.blob();
    console.log(fileObj);
    resolve('img_url');
  })
}

/* 验证 */
const verify = (form: any): any => {
  if(form.title.length<2 || form.title.length>32) return Ui.Toast(langs.web_html_verify_title);
  if(form.name.length<2 || form.name.length>16) return Ui.Toast(langs.web_html_verify_name);
  return form;
}

/* 提交 */
const submit = (): void => {
  // 验证
  const data = verify(form.value);
  if(!data) return;
  // 请求
  const load: any = Ui.Loading();
  Request.Post('web_html/save?lang='+state.lang, {
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