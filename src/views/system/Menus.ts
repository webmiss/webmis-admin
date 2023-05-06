import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Loading from '@/library/ui/loading'
import Toast from '@/library/ui/toast'
import Post from '@/library/request/post'
import Storage from '@/library/Storage'
import DownFile from '@/library/down/file'
/* UI组件 */
import wmSearch from '@/components/search/index.vue'
import wmMain from '@/components/main/index.vue'
import wmRow from '@/components/main/row/index.vue'
import wmTable from '@/components/table/index.vue'
import wmTableForm from '@/components/table/form.vue'
import wmTableOrder from '@/components/table/order.vue'
import wmCheckbox from '@/components/form/checkbox/index.vue'
import wmDialog from '@/components/dialog/index.vue'
import wmAdd from '@/components/action/add/index.vue'
import wmClose from '@/components/action/close/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmCascader from '@/components/form/cascader/index.vue'
import wmPage from '@/components/page/index.vue'
import wmTag from '@/components/tag/index.vue'

/* 系统菜单 */
export default defineComponent({
  components: {wmSearch,wmMain,wmRow,wmTable,wmTableForm,wmTableOrder,wmCheckbox,wmDialog,wmAdd,wmClose,wmInput,wmButton,wmCascader,wmPage,wmTag},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    const getters: any = store.getters;
    // 分页
    const page: any = {list:[], page:1, limit:10000, total:0};
    // 搜索、排序、添加、编辑、删除
    const sea: any = {show:false, form:{}};
    const oby: any = {name:'', list:{id:'', fid:'', title:'', en:'', utime:'', url:'', controller:''}};
    const add: any = {show:false, form:{}};
    const edit: any = {show:false, id:'', form:{}};
    const del: any = {show:false, ids:''};
    // 权限
    const perm: any = {show:false, id:'', title:'权限', list:[]};
    // 联动菜单
    let keys: any = [];
    const menus: any = {keys:[], values:[], data:[]};
    return {state, getters, page, sea, oby, add, edit, del, perm, keys, menus};
  },
  mounted(){
    // 加载数据
    if(Storage.getItem('token')){
      this.loadData();
      this.getMenus();
    }
  },
  methods:{

    /* 加载数据 */
    loadData(){
      this.page.list = [];
      this.page.total = 0;
      const load: any = Loading();
      Post('sys_menus/list',{
        token: Storage.getItem('token'),
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code==0){
          this.page.list = d.list;
          this.page.total = d.total;
          this.subSea('title');
        }else return Toast(d.msg);
      });
    },

    /* 搜索 */
    subSea(name: string){
      let key: string = this.sea.form[name];
      const d: any = this.page.list;
      let reg: any = new RegExp(key);
      // 一级
      for(let k1 in d){
        if(reg.test(d[k1][name])){
          d[k1].show=true;
        }else{
          d[k1].show=false;
        }
        // 二级
        if(!d[k1].children) continue;
        for(let k2 in d[k1].children){
          if(reg.test(d[k1].children[k2][name])){
            d[k1].show=true;
            d[k1].children[k2].show=true;
          }else{
            d[k1].children[k2].show=false;
          }
          // 三级
          if(!d[k1].children[k2].children) continue;
          for(let k3 in d[k1].children[k2].children){
            if(reg.test(d[k1].children[k2].children[k3][name])){
              d[k1].show=true;
              d[k1].children[k2].show=true;
              d[k1].children[k2].children[k3].show=true;
            }else{
              d[k1].children[k2].children[k3].show=false;
            }
          }
        }
      }

    },

    /* 排序 */
    OrderBy(name: string, val: string){
      for(let i in this.oby.list) this.oby.list[i] = i==name?val:'';
      this.oby.name = val?name+' '+ val:'';
      this.loadData();
    },

    /* 验证 */
    Verify(form: any){
      if(!form.title || form.title.length<2) return Toast('名称大于2个字符');
      return form;
    },

    /* 添加 */
    subAdd(){
      // 验证
      const form = this.Verify(this.add.form);
      if(!form) return;
      // FID
      form.fid = this.menus.values.length>0?this.menus.values.at(-1):'';
      // 提交
      this.add.show = false;
      const load: any = Loading();
      Post('sys_menus/add',{
        token: Storage.getItem('token'),
        data: JSON.stringify(form),
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code===0){
          this.loadData();
          this.getMenus();
        }
        return Toast(d.msg);
      });
    },

    /* 编辑 */
    editData(row: any){
      this.edit.show = true;
      // 默认值
      this.edit.id = row.id;
      this.edit.form.fid = row.fid;
      this.edit.form.title = row.title;
      this.edit.form.en = row.en;
      this.edit.form.url = row.url;
      this.edit.form.ico = row.ico;
      this.edit.form.sort = row.sort;
      this.edit.form.controller = row.controller;
      // 联动菜单
      this.menus.keys = this.getKeys();
    },
    /* 获取键名 */
    getKeys(){
      const fid = this.edit.form.fid;
      const d: any = this.menus.data;
      let keys: any = [];
      if(fid==0) return keys;
      // 一级
      for(let k1 in d){
        if(fid==d[k1].value){ keys=[k1]; break; }
        // 二级
        if(!d[k1].children) continue;
        for(let k2 in d[k1].children){
          if(fid==d[k1].children[k2].value){ keys=[k1, k2]; break; }
          // 三级
          if(!d[k1].children[k2].children) continue;
          for(let k3 in d[k1].children[k2].children){
            if(fid==d[k1].children[k2].children[k3].value){ keys=[k1, k2, k3]; break; }
          }
        }
      }
      return keys;
    },
    subEdit(){
      // 验证
      const form = this.Verify(this.edit.form);
      if(!form) return;
      // FID
      form.fid = this.menus.values.length>0?this.menus.values.at(-1):'';
      // 提交
      this.edit.show = false;
      const load: any = Loading();
      Post('sys_menus/edit',{
        token: Storage.getItem('token'),
        id: this.edit.id,
        data: JSON.stringify(form),
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code===0){
          this.loadData();
          this.getMenus();
        }
        return Toast(d.msg);
      });
    },

    /* 删除 */
    delData(id: string){
      this.del.show = true;
      this.del.ids = id;
    },
    subDel(){
      this.del.show = false;
      // 提交
      const load: any = Loading();
      Post('sys_menus/del',{
        token: Storage.getItem('token'),
        data: this.del.ids
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

    /* 全部菜单 */
    getMenus(){
      Post('sys_menus/getMenusAll',{
        token: Storage.getItem('token'),
      },(res: any)=>{
        const d = res.data;
        if(d.code===0) this.menus.data = d.menus;
      });
    },
    getFid(){
      let fid: number = 0;
      const pos: any = this.menus.value;
      const n: number = pos.length;
      const data: any = this.menus.data;
      if(n==1) fid = data[pos[0]].value;
      if(n==2) fid = data[pos[0]].children[pos[1]].value;
      if(n==3) fid = data[pos[0]].children[pos[1]].children[pos[2]].value;
      if(n==4) fid = data[pos[0]].children[pos[1]].children[pos[2]].children[pos[3]].value;
      return fid;
    },

    /* 动作权限 */
    permData(id: number, title: string, controller: string, data: string){
      this.perm.show = true;
      this.perm.id = id;
      this.perm.title = title + ': ' + controller;
      this.perm.list = data;
    },
    subPerm(){
      // 过滤
      const list = this.perm.list;
      const data = [];
      for(let i in list){
        if(list[i].action && list[i].perm) data.push(list[i]);
      }
      // 提交
      this.perm.show = false;
      const load: any = Loading();
      Post('sys_menus/perm',{
        token: Storage.getItem('token'),
        id: this.perm.id,
        data: JSON.stringify(data)
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },
    /* 追加 */
    permAdd(){
      const list = this.perm.list;
      if(list.length>0) list.push({name:'', action:'', perm:list[list.length-1].perm*2});
      else this.perm.list = [{name:'', action:'', perm:1}];
    },
    /* 删除 */
    permRemove(key: number){
      const list = this.perm.list;
      list.splice(key, 1);
    },

    /* 导出 */
    exportData(){
      const load: any = Loading();
      Post('sys_menus/export',{
        token: Storage.getItem('token'),
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code==0){
          DownFile(d.path+d.filename, d.filename);
          (this.$refs.Table as any).setCheck(false);
        }
        Toast(d.msg);
      });
    },

  },
});