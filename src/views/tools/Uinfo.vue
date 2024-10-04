<template>
  <wm-dialog v-model:show="uinfoShow" :title="langs.uinfo_title" width="560px" bottom="40px" @close="Close()">
    <wm-main>
      <wm-table-form>
        <tr>
          <td class="label">{{ langs.uinfo_nickname }}</td>
          <td colspan="2">
            <wm-input v-model:value="form.nickname" :placeholder="langs.uinfo_nickname_placeholder" maxlength="16"></wm-input>
          </td>
        </tr>
        <tr>
          <td class="label">{{ langs.uinfo_name }}</td>
          <td>
            <wm-input v-model:value="form.name" maxlength="16" disabled></wm-input>
          </td>
          <td>
            <wm-radio v-model:value="form.gender" :options="genderData"></wm-radio>
          </td>
        </tr>
        <tr>
          <td class="label">{{ langs.uinfo_birthday }}</td>
          <td colspan="2">
            <wm-date-picker v-model:value="form.birthday" :maxDate="maxDate"></wm-date-picker>
          </td>
        </tr>
        <tr>
          <td class="label">{{ langs.uinfo_department }}</td>
          <td colspan="2">
            <wm-input v-model:value="form.department" maxlength="16"></wm-input>
          </td>
        </tr>
        <tr>
          <td class="label">{{ langs.uinfo_position }}</td>
          <td colspan="2">
            <wm-input v-model:value="form.position" maxlength="16"></wm-input>
          </td>
        </tr>
      </wm-table-form>
    </wm-main>
    <template #bottom>
      <wm-button effect="dark" type="primary" @click="subUinfo()">{{ langs.confirm }}</wm-button>
    </template>
  </wm-dialog>
</template>

<style lang="less" scoped>
.wm-table_form .label{width: 60px;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '@/library/ui'
import Request from '@/library/request'
import Time from '@/library/time'
/* 组件 */
import wmMain from '@/components/container/main.vue'
import wmDialog from '@/components/dialog/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmTableForm from '@/components/table/form.vue'
import wmRadio from '@/components/form/radio/index.vue'
import wmDatePicker from '@/components/datepicker/index.vue'

@Options({
  components: { wmMain, wmDialog, wmInput, wmButton, wmTableForm, wmRadio, wmDatePicker },
  props: {
    show: {type: Boolean, default: false},   // 是否显示
  }
})
export default class Uinfo extends Vue {
  // 参数
  show!: boolean;
  // 状态
  private store: any = useStore();
  state: any = this.store.state;
  // 语言
  langs: any = {};
  // 变量
  uinfoShow: boolean = false;
  form: any = {nickname: '', name: '', gender: '', birthday: '', department:'', position:''}
  maxDate: string = Time.Date('Y/m/d');
  genderData: Array<any> = [];

  /* 创建成功 */
  created(): void {
    this.$watch('show', (val:boolean)=>{
      this.uinfoShow = val;
      if(val) {
        this.langs = this.state.langs;
        // 默认值
        const uinfo: any = this.state.uinfo;
        this.form.nickname = uinfo.nickname || '';
        this.form.name = uinfo.name || '';
        this.form.birthday = uinfo.birthday&&uinfo.birthday!='1970-01-01'?uinfo.birthday:Time.Date('Y/m/d');
        this.form.department = uinfo.department || '';
        this.form.position = uinfo.position || '';
        // 性别
        this.form.gender = uinfo.gender || '';
        this.genderData = [
          {label: this.langs.null, value: ''},
          {label: this.langs.uinfo_gender_boy, value: '男'},
          {label: this.langs.uinfo_gender_girl, value: '女'},
        ];
      }
    }, { deep: true });
  }

  /* 提交 */
  subUinfo(): void {
    this.Close();
    // 请求
    const load: any = Ui.Loading();
    Request.Post('user/change_uinfo?lang='+this.state.lang, {token: this.state.token, uinfo: this.form}, (res:any)=>{
      load.clear();
      const d: any = res.data;
      if(d.code==0) {
        this.state.uinfo.nickname = this.form.nickname;
        this.state.uinfo.name = this.form.name;
        this.state.uinfo.gender = this.form.gender;
        this.state.uinfo.birthday = this.form.birthday;
        this.state.uinfo.department = this.form.department;
        this.state.uinfo.position = this.form.position;
      }
      Ui.Toast(d.msg);
    });
  }

  /* 关闭 */
  Close(): void {
    this.$emit('update:show', false);
  }

}
</script>