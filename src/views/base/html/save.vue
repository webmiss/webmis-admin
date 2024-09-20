<template>
  <wm-dialog v-model:show="infoShow" :title="title" width="800px" bottom="40px" :overflow="tabIndex=='perm'?'hidden auto':'hidden'" @close="close()">
    <wm-main paddingY="0">
      <wm-tabs v-model:value="tabIndex" :columns="tabs">
        <!-- 基本信息 -->
        <template #base>
          <wm-table-form>
            <tr>
              <td class="label">状态</td>
              <td>
                <wm-switch v-model:value="form.status"></wm-switch>
              </td>
            </tr>
            <tr>
              <td class="label">类型</td>
              <td>
                <wm-select v-model:value="form.type" :options="selectType"></wm-select>
              </td>
            </tr>
            <tr>
              <td class="label">标题</td>
              <td>
                <wm-input v-model:value="form.title" placeholder="请输入标题" maxlength="32"></wm-input>
              </td>
            </tr>
            <tr>
              <td class="label">名称</td>
              <td>
                <wm-input v-model:value="form.name" placeholder="请输入名称" maxlength="16"></wm-input>
              </td>
            </tr>
            <tr>
              <td class="label">备注</td>
              <td>
                <wm-input v-model:value="form.remark" type="textarea" height="120px" placeholder="备注信息" maxlength="32"></wm-input>
              </td>
            </tr>
          </wm-table-form>
        </template>
        <!-- 基本信息 End -->
         <!-- 内容 -->
        <template #content>
          <wm-tinymce v-model:value="form.content" :upload="upload" :height="480"></wm-tinymce>
        </template>
        <!-- 内容 End -->
      </wm-tabs>
    </wm-main>
    <template #bottom>
      <wm-button height="40px" padding="0 32px" @click="submit()">确 认</wm-button>
    </template>
  </wm-dialog>
</template>

<style lang="less" scoped>
.wm-table_form .label{width: 70px;}
.wm-table_form .action{width: 60px; text-align: center;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '@/library/ui'
import Request from '@/library/request'
/* 组件 */
import wmMain from '@/components/container/main.vue'
import wmDialog from '@/components/dialog/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmSwitch from '@/components/form/switch/index.vue'
import wmSelect from '@/components/form/select/index.vue'
import wmTableForm from '@/components/table/form.vue'
import wmTabs from '@/components/tabs/index.vue'
import wmTinymce from '@/components/tinymce/index.vue'

@Options({
  components: { wmMain, wmDialog, wmInput, wmButton, wmSwitch, wmSelect, wmTableForm, wmTabs, wmTinymce },
  props: {
    show: {type: Boolean, default: false},        // 是否显示
    title: {type: String, default: ''},           // 标题
    data: {default: []},                          // 数据
  }
})
export default class ActionSave extends Vue {
  // 参数
  show!: boolean;
  title!: string;
  data!: any;
  // 状态
  store: any = useStore();
  state: any = this.store.state;
  // 变量
  infoShow: boolean = false;
  // Tabs
  tabIndex: string = 'base';
  tabs: Array<any> = [
    {label: '基本信息', value: 'base', slot: 'base'},
    {label: '内容', value: 'content', slot: 'content'},
  ];
  // 数据
  form: any = {id: 0, status: true, type: [], title: '', name: '', remark: '', content: ''}
  // 全部分类
  selectType: Array<any> = [{label: 'PC版', value: 0}, {label: '手机版', value: 1}];

  /* 创建成功 */
  created(): void {
    this.$watch('show', (val:boolean)=>{
      this.infoShow = val;
      if(val){
        // 默认值
        this.form.id = this.data.id || 0;
        this.form.status = typeof this.data.status!='undefined'?this.data.status:true;
        this.form.type = typeof this.data.type!='undefined'?[this.data.type]:[];
        this.form.title = this.data.title || '';
        this.form.name = this.data.name || '';
        this.form.remark = this.data.remark || '';
        this.form.content = this.data.content || '';
      }
    }, { deep: true });
  }
  /* 创建完成 */
  public mounted(): void {
  }

  /* 验证 */
  verify(form: any): any {
    if(form.title.length<2 || form.title.length>32) return Ui.Toast('标题2～32字符');
    if(form.name.length<2 || form.name.length>16) return Ui.Toast('名称2～16字符');
    return form;
  }

  /* 上传文件 */
  upload(blobInfo:any, progress:any): any {
    return new Promise((resolve, reject) => {
      const fileObj = blobInfo.blob();
      console.log(fileObj);
      resolve('img_url');
    })
  }

  /* 提交 */
  submit(): void {
    // 验证
    const form = this.verify(this.form);
    if(!form) return;
    // 请求
    const load: any = Ui.Loading();
    Request.Post('web_html/save', {
      token: this.state.token,
      data: form,
    }, (res:any)=>{
      load.clear();
      const d: any = res.data;
      Ui.Toast(d.msg);
      this.$emit('submit', d.code==0);
    });
  }

  /* 关闭 */
  close(): void {
    this.$emit('update:show', false);
  }

}
</script>