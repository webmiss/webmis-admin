<template>
  <!-- Login -->
  <Login ref="userLogin" :show="!state.isLogin"></Login>
  <!-- Socket -->
  <Socket v-if="state.isLogin"></Socket>
  <!-- Uinfo -->
  <uinfo v-model:show="state.isUinfo" v-if="state.isLogin"></uinfo>
  <!-- Passwd -->
  <passwd v-model:show="state.isPasswd" v-if="state.isLogin"></passwd>
  <!-- Msg -->
  <msg v-model:show="msgShow" v-if="state.isLogin"></msg>
  <!-- Tools -->
  <Goods v-model:show="state.goods.show" v-if="state.isLogin"></Goods>
  <Print v-model:show="state.print.show" v-if="state.isLogin"></Print>

  <!-- Main -->
  <div class="app_main flex">
    <!-- MenusAll -->
    <div class="app_menus_all" :style="{visibility:menusShow&&state.isLogin?'inherit':'hidden'}">
      <wmPopup height="100%" width="900px" v-model:show="menusShow" position="left" bgColor="#FFF" :time="600">
        <div class="menus_body flex">
          <!-- MenusLeft -->
          <div class="menus_left">
            <div class="m1">{{ state.langs.menus_recent }}</div>
            <ul class="m2" v-if="menus.tmpList.length>0">
              <li class="flex_left" v-for="(v,k) in menus.tmpList" :key="k" @click="MenusClick(v.label, v.url, true)">
                <i v-if="v.icon" :class="v.icon"></i>
                <span :style="{paddingLeft:v.icon?'':'8px'}">{{ v.label }}</span>
              </li>
            </ul>
            <div class="null" v-else></div>
            <div class="m1">{{ state.langs.menus_recommend }}</div>
            <ul class="m2">
              <li class="flex_left" @click="state.isUinfo=true">
                <i class="ui ui_user"></i>
                <span :style="{paddingLeft:''}">{{ state.langs.uinfo_title }}</span>
              </li>
              <li class="flex_left" @click="state.isPasswd=true">
                <i class="ui ui_safety"></i>
                <span :style="{paddingLeft:''}">{{ state.langs.passwd_title }}</span>
              </li>
            </ul>
          </div>
          <!-- MenusRight -->
          <div class="menus_right">
            <div class="m_top flex">
              <div class="search">
                <i class="ui ui_search"></i>
                <input type="text" class="input" v-model="menus.key" @input="MenusSearch()" :placeholder="state.langs.menus_placeholder">
              </div>
              <i class="ui ui_close" @click="menusShow=false"></i>
            </div>
            <div class="menus_ct scrollbar">
              <div class="null center" v-if="menus.key&&menus.seaList.length==0"></div>
              <ul v-else>
                <template v-for="(v1,k1) in menus.list" :key="k1">
                  <template v-if="v1.children">
                    <template v-for="(v2,k2) in v1.children" :key="k2">
                      <li v-if="v2.children&&(v2.display||typeof v2.display=='undefined')">
                        <div class="title">{{ v2.langs[state.lang] }}</div>
                        <template v-for="(v3,k3) in v2.children" :key="k3">
                          <div v-if="v3.display||typeof v3.display=='undefined'" class="m flex_left" :class="tabs.active==v3.value.url?'active':''" @click="MenusClick(v3.langs[state.lang], v3.value.url, true)">
                            <i v-if="v3.icon" :class="v3.icon"></i>
                            <span :style="{paddingLeft: v3.icon?'':'10px'}">{{ v3.langs[state.lang] }}</span>
                          </div>
                        </template>
                      </li>
                    </template>
                  </template>
                </template>
              </ul>
            </div>
          </div>
          <!-- MenusRight End -->
        </div>
      </wmPopup>
    </div>
    <!-- Left -->
    <div class="app_left" :style="{width: is_menus?'240px':'56px'}">
      <div class="app_on" @click="MenusShow()"><i class="ui" :class="is_menus?'ui_arrow_left':'ui_arrow_right'"></i></div>
      <!-- Logo -->
      <div class="app_logo flex">
        <div class="logo" :title="title" @click="menusShow=!menusShow;uinfoShow=false"></div>
        <div class="logo_text" v-if="is_menus">{{ title }}</div>
      </div>
      <!-- Search -->
      <div class="app_search" v-if="is_menus">
        <i class="ui ui_search"></i>
        <input type="text" class="input" v-model="menus.key" @input="MenusSearch()" :placeholder="state.langs.menus_placeholder">
      </div>
      <!-- Menus -->
      <div class="app_menus scrollbar" :style="{height: 'calc(100% - '+(is_menus?'152px':'98px')+')',}">
        <!-- Search Menus -->
        <div class="null center" v-if="menus.key&&menus.seaList.length==0"></div>
        <ul class="m2" v-else-if="menus.key&&menus.seaList.length>0&&is_menus">
          <li class="flex_left" v-for="(v,k) in menus.seaList" :key="k" :class="tabs.active==v.url?'active':''" @click="MenusClick(v.label, v.url)">
            <i v-if="v.icon" :class="v.icon"></i>
            <span :style="{paddingLeft: v.icon?'':'16px'}">{{ v.label }}</span>
          </li>
        </ul>
        <template v-else>
          <!-- LeftMenus -->
          <template v-for="(v1,k1) in menus.list" :key="k1">
            <div class="m" v-if="!is_menus">
              <i :class="v1.icon" :title="v1.langs[state.lang]" @click="menusShow=!menusShow;uinfoShow=false"></i>
            </div>
            <template v-if="v1.children&&is_menus">
              <template v-for="(v2,k2) in v1.children" :key="k2">
                <div class="m1 flex" @click="v2.show=!v2.show">
                  <span>{{ v2.langs[state.lang] }}</span>
                  <i class="ui ui_arrow_up" :style="{transform: v2.show?'rotate(0deg)':'rotate(180deg)'}"></i>
                </div>
                <ul class="m2" v-if="v2.children&&v2.show">
                  <li class="flex_left" v-for="(v3,k3) in v2.children" :key="k3" :class="tabs.active==v3.value.url?'active':''" @click="MenusClick(v3.langs[state.lang], v3.value.url)">
                    <i v-if="v3.icon" :class="v3.icon"></i>
                    <span :style="{paddingLeft: v3.icon?'':'16px'}">{{ v3.langs[state.lang] }}</span>
                  </li>
                </ul>
              </template>
            </template>
          </template>
          <!-- LeftMenus End -->
        </template>
      </div>
      <!-- Copy -->
      <div class="app_copy">{{ copy }}</div>
    </div>
    <!-- Left End -->
     <!-- Right -->
    <div class="app_right" :style="{width: is_menus?'calc(100% - 240px)':'calc(100% - 56px)'}">
      <!-- UserInfo -->
      <div class="app_user_info_body" :style="{visibility:uinfoShow&&state.isLogin?'inherit':'hidden'}">
        <wmPopup height="100%" width="360px" v-model:show="uinfoShow" position="right" bgColor="#FFF">
          <div class="app_user_info scrollbar">
            <div class="img" :style="{backgroundImage: state.uinfo.img?'url('+state.uinfo.img+')':'none'}" @click="userUpImg()">
              <div class="img_load">{{ state.langs.uinfo_img }}</div>
              <i class="ui ui_image" v-if="!state.uinfo.img"></i>
            </div>
            <div class="user"><h2>{{ state.uinfo.uname || '-' }}</h2><p>ID: {{ state.uinfo.uid || '-' }}</p></div>
            <ul class="info">
              <li class="flex"><span class="name">{{ state.langs.uinfo_nickname }}</span><span class="value">{{ state.uinfo.nickname || '-' }}</span></li>
              <li class="flex"><span class="name">{{ state.langs.uinfo_department }}</span><span class="value">{{ state.uinfo.department || '-' }}</span></li>
              <li class="flex"><span class="name">{{ state.langs.uinfo_position }}</span><span class="value">{{ state.uinfo.position || '-' }}</span></li>
              <li class="flex"><span class="name">{{ state.langs.uinfo_name }}</span><span class="value">{{ state.uinfo.name || '-' }}</span></li>
            </ul>
            <ul class="tools">
              <li @click="state.isUinfo=true">{{ state.langs.uinfo_title }}</li>
              <li @click="state.isPasswd=true">{{ state.langs.passwd_title }}</li>
            </ul>
          </div>
          <div class="app_user_close" @click="logout()">{{ state.langs.logout }}</div>
        </wmPopup>
      </div>
      <!-- Tabs -->
      <div class="app_tabs_body flex">
        <ul class="app_tabs flex_left">
          <li class="home" :class="tabs.active=='/'?'active':''" @click="MenusClick(state.langs.home, '/')">{{ state.langs.home }}</li>
          <li v-for="(v,k) in tabs.list" :key="k" @click="MenusClick(v.name, v.url)" :class="tabs.active==v.url?'active':''">
            {{ v.name }}<span class="close" @click.stop="MenusClose(v.url)"><i class="ui ui_close"></i></span>
          </li>
        </ul>
        <ul class="app_tools flex">
          <li class="goods" title="货品查询" @click="state.goods.show=true">
            <i class="icons icon_stock1"></i>
          </li>
          <li class="print" title="打印标签" @click="state.print.show=true">
            <i class="icons icon_print"></i>
          </li>
          <li class="msg" title="消息" @click="msgShow=true;menusShow=false;uinfoShow=false">
            <span class="redNum" v-if="state.msg.num>0">{{ state.msg.num }}</span>
            <i class="ui ui_message"></i>
          </li>
          <li class="user" title="用户信息" @click="uinfoShow=!uinfoShow;menusShow=false">
            <i class="ui ui_user" v-if="!state.uinfo.img || uinfoShow"></i>
            <div class="img" v-else :style="{backgroundImage: 'url('+state.uinfo.img+')'}"></div>
          </li>
        </ul>
      </div>
      <!-- Content -->
      <div class="app_body">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="$route.name" />
          </keep-alive>
        </router-view>
      </div>
    </div>
    <!-- Right End -->
  </div>
  <!-- Main END -->
</template>

<style lang="less">
/* 表单缩放问题 */
@media only screen and (min-device-width : 320px) and (max-device-width : 1024px) {
  select:focus, textarea:focus, input:focus { font-size: 16px !important; }
}
/* 样式 */
@import url('./assets/style/icon.less');
@import url('./assets/style/ui.less');
@import url('./assets/style/app.less');
</style>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router'; 
/* UI组件 */
import Env from './config/Env';
import Request from './library/request';
import Storage from './library/storage';
import Ui from './library/ui';
import Files from './library/files';
/* 组件 */
import wmPopup from './components/popup/index.vue';
/* Tools */
import Login from './views/tools/UserLogin.vue';
import Socket from './views/tools/Socket.vue';
import Uinfo from './views/tools/Uinfo.vue';
import Passwd from './views/tools/Passwd.vue';
import Msg from './views/tools/Msg.vue';
import Goods from './views/tools/Goods.vue';
import Print from './views/tools/Prints.vue';

const emit = defineEmits(['update:show', 'close']);
const userLogin = ref();
// 变量
const store = useStore();
const state = store.state;
const route = useRoute();
const router = useRouter();
// 配置
const title: string = Env.title+' '+Env.version;
const copy: string = Env.copy;
// 用户、消息
const uinfoShow = ref(false);
const msgShow = ref(false);
// 菜单
const menusShow = ref(false);
const tabs = ref({active:'/', list:<any>[]});
const menus = ref({
  key:'',
  list:<any>[], seaList:<any>[], tmpList:<any>[],
});
const is_menus = ref(true);

/* 监听 */
watch(()=>state.isLogin, (isLogin: boolean)=>{
  if(isLogin) MenusList();
},{ deep: true });
watch(()=>route.path, (path: string)=>{
  if(state.isLogin) {
    tabs.value.active = path;
    MenusList();
  }
},{ deep: true });

/* 加载完成 */
onMounted(()=>{
  tabs.value.active = route.path;
  // 左侧菜单
  is_menus.value = Storage.getItem('IsMenus')?true:false;
});

/* 获取菜单 */
const MenusList = (): void => {
  // 请求
  Request.Post('sys_menus/get_menus_perm', {token: state.token}, (res:any)=>{
    const {code, msg, data}: any = res.data;
    if(code==0) {
      menus.value.list = data;
      // 导航
      const tmp: any = Storage.getItem('MenusTabs') || '';
      tabs.value.list = tmp?JSON.parse(tmp):[];
      // 最近访问
      const menusTmp: any = Storage.getItem('MenusTmp');
      menus.value.tmpList.value = menusTmp?JSON.parse(menusTmp):[];
      // 点击当前页
      let title: string = '';
      for(let v1 of data) {
        if(!v1.children) continue;
        for(let v2 of v1.children) {
          if(!v2.children) continue;
          for(let v3 of v2.children) {
            if(v3.value.url==tabs.value.active) {
              title=v3.langs[state.lang]; break;
            }
          }
        }
      }
      if(title && tabs.value.active) MenusClick(title, tabs.value.active);
    }else{
      Ui.Toast(msg);
    }
  });
}

/* 菜单-显示/隐藏 */
const MenusShow = (): void => {
  if(is_menus.value){
    is_menus.value = false;
    Storage.setItem('IsMenus', '');
  }else{
    is_menus.value = true;
    Storage.setItem('IsMenus', '1');
  }
}
/* 菜单-搜索 */
const MenusSearch = (): void => {
  const key: string = menus.value.key;
  const reg =new RegExp(key.toLowerCase());
  const list: any = menus.value.list;
  let tmp:any, label: string, en: string, display: boolean;
  let keys: Array<any> = [];
  menus.value.seaList = [];
  // 一级
  for(const k1 in list) {
    // 二级
    if(!list[k1].children) continue;
    for(const k2 in list[k1].children) {
      // 三级
      if(!list[k1].children[k2].children) continue;
      for(const k3 in list[k1].children[k2].children) {
        // 是否显示
        if(key.length>0) {
          tmp = list[k1].children[k2].children[k3];
          label = tmp.langs[state.lang].toLowerCase();
          en = tmp.en.toLowerCase();
          display = reg.test(label) || reg.test(en);
          // 结果
          if(display) {
            keys.push([k1, k2]);
            menus.value.seaList.push({label:tmp.langs[state.lang], icon:tmp.icon, url:tmp.value.url});
          }
        } else {
          display = true;
        }
        // 赋值
        list[k1].children[k2].display = true;
        list[k1].children[k2].children[k3].display = display;
      }
    }
  }
  // 隐藏二级菜单
  if(!key) return;
  for(const k1 in list) {
    if(!list[k1].children) continue;
    for(const k2 in list[k1].children) {
      let is_true: boolean = false;
      for(const i in keys) {
        if(keys[i][0]==k1&&keys[i][1]==k2) {
          is_true = true;
          continue;
        }
      }
      list[k1].children[k2].display = is_true;
    }
  }
}
/* 菜单-切换 */
const MenusClick = (name: string, url: string, isShow: boolean=false): void => {
  // 是加载菜单
  if(menus.value.list.length==0) return;
  // 隐藏菜单
  if(isShow) {
    menusShow.value = false;
    uinfoShow.value = false;
  }
  // 是否首页
  if(url!='/') {
    // 是否存在
    let inArr: Boolean = false;
    const list: any = tabs.value.list;
    for (const k in list) {
      if(list[k].url==url){
        inArr=true; break;
      }
    }
    // 追加、缓存
    if(!inArr) tabs.value.list.push({name: name, url: url});
    Storage.setItem('MenusTabs', JSON.stringify(tabs.value.list));
  }
  // 数据
  const list: any = menus.value.list;
  let tmp: any={}, data: any, action: Array<any> = [];
  for(const k1 in list) {
    if(!list[k1].children) continue;
    for(const k2 in list[k1].children) {
      if(!list[k1].children[k2].children) continue;
      for(const k3 in list[k1].children[k2].children) {
        tmp = list[k1].children[k2].children[k3];
        if(tmp.value.url==url){
          data = {label:tmp.langs[state.lang], icon:tmp.icon, url:tmp.value.url};
          action = tmp.value.action;
          break;
        }
      }
    }
  }
  // 最近访问
  if(data) {
    tmp = Storage.getItem('MenusTmp');
    tmp = tmp?JSON.parse(tmp):[];
    for(let i in tmp) {
      if(tmp[i].url==url || parseInt(i)>=9) tmp.splice(i, 1);
    }
    tmp.unshift(data);
    menus.value.tmpList = tmp;
    Storage.setItem('MenusTmp', JSON.stringify(tmp));
  }
  // 动作菜单
  if(action) {
    state.menusAction = action;
  }
  // 跳转
  const resolved = router.resolve(url);
  if(resolved.matched.length>0) router.push({path: url});
  else return Ui.Toast('该页面不存在!');
}
/* 菜单-关闭 */
const MenusClose = (url: string): void => {
  const list: any = tabs.value.list;
  for (const k in list) {
    if(list[k].url==url){
      list.splice(k, 1);
      // 跳转
      if(tabs.value.active==url){
        let i: number = parseInt(k)-1;
        if(i<0) MenusClick(state.langs.home, '/');
        else MenusClick(list[i.toString()].name, list[i.toString()].url);
      }
      break;
    }
  }
  // 缓存
  Storage.setItem('MenusTabs', JSON.stringify(tabs.value.list));
}

/* 上传头像 */
const userUpImg = (): void => {
  // 选择文件
  Files.Select({}, (fileObj:any)=>{
    // 转Base64
    Files.FileToBase64(fileObj, (base64: any)=>{
      // 压缩图片
      Files.ImageCompress(base64, {width:200, height:200, type:fileObj.type}, (imgBase64: any)=>{
        // 请求
        Request.Post('user/upimg', {token: state.token, base64:imgBase64}, (res:any)=>{
          const d = res.data;
          if(d.code==0){
            // 更新用户信息
            userLogin.value.verifyToken(true);
          }
          return Ui.Toast(d.msg);
        });
      }, (err: string)=>{
        Ui.Toast(err);
      });
    })
  }, (err: string)=>{
    Ui.Toast(err);
  });
}

/* 退出登录 */
const logout = (): void => {
  // 隐藏
  uinfoShow.value = false;
  menusShow.value = false;
  // 清除
  tabs.value.list = [];
  userLogin.value.logout();
}

</script>
