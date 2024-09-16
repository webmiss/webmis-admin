import { Options } from 'vue-class-component';
import { useStore } from 'vuex';
import Base from '../../../service/Base'
/* JS组件 */
import Ui from '@/library/ui'
import Request from '@/library/request'
/* 组件 */
import wmButton from '@/components/form/button/index.vue'
import wmImgView from '@/components/image/view.vue'
/* 下载 */
import actionDown from './down.vue'

/* 网站目录 */
@Options({
  components: {
    wmButton, wmImgView,
    actionDown
  },
})
export default class SysFileManage extends Base {

  // 状态
  private store: any = useStore();
  private state: any = this.store.state;
  // 列表
  total: any = {time: '', list: {}};
  list: any = {url: '', path: '/', check: false, data: {dirNum: 0, fileNum: 0, size: 0, folder: [], files: []}};
  // 下载
  down: any = {show: false, data:{path: '', filename: ''}};
  // 图片预览
  imgView: any = {show: false, imgs: [], index: 0};

  /* 创建成功 */
  public created(): void {
    // 加载
    if(this.state.token) this.loadData();
  }

  /* 创建完成 */
  public mounted(): void {
  }
  activated(): void {
  }

  /* 加载数据 */
  loadData(): void {
    // 请求
    const load: any = Ui.Loading();
    Request.Post('sys_file/list', {
      token: this.state.token,
      path: this.list.path,
    }, (res:any)=>{
      load.clear();
      const d: any = res.data;
      if(d.code==0) {
        this.total.time = d.time;
        this.list.check = false;
        this.list.url = d.data.url;
        this.list.data = d.data.list;
      }else{
        Ui.Toast(d.msg);
      }
    });
  }

  /* 全选/不选 */
  selectAll(check: boolean): void {
    this.list.check = check;
    // 文件夹
    const folder = this.list.data.folder;
    for(let i in folder) folder[i].check=check;
    // 文件
    const files = this.list.data.files;
    for(let i in files) files[i].check=check;
  }

  /* 返回上级 */
  backDir(): void {
    const data: any = this.list.path.split("/").filter((d: any)=>d);
    if(data.length<=1){
      this.list.path = '/';
    }else{
      this.list.path = '/';
      for(let i=0; i<data.length-1; i++){
        this.list.path += data[i]+'/';
      }
    }
    // 加载数据
    this.loadData();
  }

  /* 打开文件夹 */
  openFolder(name: string): void {
    this.list.path += name+'/';
    // 加载数据
    this.loadData();
  }

  /* 打开文件 */
  openFile(filename: string): void {
    const ext = this.getExt(filename);
    // 下载
    if(!this.isImg(ext)) {
      this.down.show = true;
      this.down.data = {path: this.list.path, filename: filename};
    }
    // 图片
    let index: number = 0;
    let imgs: Array<any> = [];
    let i: number = 0;
    for(let v of this.list.data.files) {
      if(this.isImg(v.ext)) {
        if(filename==v.name) index=i;
        imgs.push({
          label: v.name,
          value: this.list.url+this.list.path+v.name,
          size: v.size,
        });
      }
      i++;
    }
    // 预览
    if(imgs.length>0) {
      this.imgView.show = true;
      this.imgView.index = index;
      this.imgView.imgs = imgs;
    }
  }

  /* 删除-回调 */
  downSubmit(val: boolean): void {
    if(!val) return;
    this.down.show = false;
    this.loadData();
  }

  /* 获取后缀 */
  getExt(filename: string): string {
    const index1 = filename.lastIndexOf('.')+1;
    const index2 = filename.length;
    return filename.substring(index1,index2);
  }

  /* 是否图片 */
  isImg(ext: string): boolean {
    const arr = ['png','jpg','jpeg','gif','svg'];
    const index = arr.indexOf(ext);
    return index>=0?true:false;
  }

}