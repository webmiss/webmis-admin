import { Options } from 'vue-class-component';
import { useStore } from 'vuex';
import Base from '../../../service/Base'
/* JS组件 */
import Ui from '@/library/ui'
import Request from '@/library/request'
/* 组件 */
import wmButton from '@/components/form/button/index.vue'
import wmImgView from '@/components/image/view.vue'
/* 动作 */
import wmTotal from '../../tools/Total.vue'
import actionMkdir from './mkdir.vue'
import actionRename from './rename.vue'
import actionRemove from './remove.vue'
import actionDown from './down.vue'
import actionUpload from './upload.vue'

/* 网站目录 */
@Options({
  components: {
    wmButton, wmImgView,
    wmTotal, actionMkdir, actionRename, actionRemove, actionDown, actionUpload
  },
})
export default class SysFileManage extends Base {

  // 状态
  private store: any = useStore();
  state: any = this.store.state;
  // 语言
  langs: any = this.state.langs;
  // 列表
  total: any = {time: '', list: {}};
  list: any = {url: '', path: '/', check: false, data: {dirNum: 0, fileNum: 0, size: 0, folder: [], files: []}};
  // 新建文件夹、重命名、删除、下载、上传
  mkdir: any = {show: false, data:{path: '', name: ''}};
  rename: any = {show: false, data:{path: '', name: '', rename: ''}};
  remove: any = {show: false, data:{path: '', names: []}};
  down: any = {show: false, data:{path: '', filename: ''}};
  upload: any = {show: false, data:{url: '', path: '', files: []}};
  // 图片预览
  imgView: any = {show: false, imgs: [], index: 0};

  /* 创建成功 */
  public created(): void {
    // 加载
    if(this.state.token) this.loadData();
  }

  /* 创建完成 */
  activated(): void {
    // 加载
    if(this.state.token) this.loadData();
  }

  /* 加载数据 */
  loadData(): void {
    // 请求
    const load: any = Ui.Loading();
    Request.Post('sys_file/list?lang='+this.state.lang, {
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
      return ;
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
        i++;
      }
    }
    // 预览
    if(imgs.length>0) {
      this.imgView.show = true;
      this.imgView.index = index;
      this.imgView.imgs = imgs;
    }
  }

  /* 新建文件夹 */
  mkdirData(): void {
    this.mkdir.show = true;
    this.mkdir.data.path = this.list.path;
  }
  /* 新建文件夹-回调 */
  mkdirSubmit(val: boolean): void {
    if(!val) return;
    this.mkdir.show = false;
    this.loadData();
  }

  /* 重命名 */
  renameData(): void {
    // 文件名
    const names: any = this.getCheckName();
    if(!names) return Ui.Toast(this.langs.select);
    // 数据
    this.rename.show = true;
    this.rename.data.path = this.list.path;
    this.rename.data.name = names[0];
    this.rename.data.rename = names[0];
  }
  /* 重命名-回调 */
  renameSubmit(val: boolean): void {
    if(!val) return;
    this.rename.show = false;
    this.loadData();
  }

  /* 删除 */
  removeData(): void {
    // 文件名
    const names: any = this.getCheckName();
    if(!names) return Ui.Toast(this.langs.select);
    // 数据
    this.remove.show = true;
    this.remove.data.path = this.list.path;
    this.remove.data.names = names;
  }
  /* 删除-回调 */
  removeSubmit(val: boolean): void {
    if(!val) return;
    this.remove.show = false;
    this.loadData();
  }

  /* 下载-回调 */
  downSubmit(val: boolean): void {
    if(!val) return;
    this.down.show = false;
    this.loadData();
  }

  /* 上传 */
  uploadData(): void {
    // 数据
    this.upload.show = true;
    this.upload.data.url = this.list.url;
    this.upload.data.path = this.list.path;
  }
  /* 上传-回调 */
  uploadSubmit(val: boolean): void {
    if(!val) return;
    this.loadData();
  }

  /* 获取后缀 */
  getExt(filename: string): string {
    const index1 = filename.lastIndexOf('.')+1;
    const index2 = filename.length;
    return filename.substring(index1,index2);
  }

  /* 获取选中 */
  getCheckName(): Array<any> | boolean {
    let name = [];
    // 文件夹
    for(let v of this.list.data.folder) if(v.check) name.push(v.name);
    // 文件
    for(let v of this.list.data.files) if(v.check) name.push(v.name);
    // 返回
    return name.length>0?name:false;
  }

  /* 是否图片 */
  isImg(ext: string): boolean {
    const arr = ['png','jpg','jpeg','gif','svg'];
    const index = arr.indexOf(ext);
    return index>=0?true:false;
  }

  /* 是否存在 */
  isExist(name: string): boolean {
    // 文件夹
    for(let v of this.list.data.folder){
      if(v.name==name) return true;
    }
    // 文件
    for(let v of this.list.data.files){
      if(v.name==name) return true;
    }
    return false;
  }

}