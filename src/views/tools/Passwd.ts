import { Options, Vue } from 'vue-class-component';
import { useStore } from 'vuex';
/* UI组件 */
import Ui from '@/library/ui'
/* 组件 */
import wmMain from '@/components/container/main.vue'
import wmDialog from '@/components/dialog/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'

@Options({
  components: { wmMain, wmDialog, wmInput, wmButton },
  props: {
    padding: {type: Number, default: 16},             //边距
    bgColor: {type: String, default: 'transparent'},  //背景颜色
  }
})
export default class Passwd extends Vue {
  // 参数
  padding!: number;
  bgColor!: String;
  // 状态
  store: any = useStore();
  state: any = this.store.state;
  // 变量
  time: any;
  form: any = {tel:'', vcode: '', text:'获取验证码', num:60}

  /* 创建完成 */
  mounted(): void {
  }

  /* 获取验证码 */
  getVcode(): void {
    Ui.Toast('发送成功!');
    clearInterval(this.time);
    this.time = setInterval(()=>{
      this.form.num--;
      this.form.text = this.form.num+'秒后重试';
      if(this.form.num<=0) {
        clearInterval(this.time);
        this.form.num = 60;
        this.form.text = '重新发送';
      }
      console.log(this.form.num);
    }, 1000);
  }

}