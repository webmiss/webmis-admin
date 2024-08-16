import { Options, Vue } from 'vue-class-component';
import { useStore } from 'vuex';
import wmMain from '@/components/container/main.vue'
import wmDialog from '@/components/dialog/index.vue'

@Options({
  components: { wmMain, wmDialog },
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
}