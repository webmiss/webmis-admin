import { Options, Vue } from 'vue-class-component';

@Options({
  components: {},
})
export default class Base extends Vue {

  /* 输出到控制台 */
  protected Print(...val:any): void {
    console.log(...val);
  }

}