<template>

  <!-- Login -->
  <login ref="Login" v-model:show="state.isLogin"></login>
  <!-- Uinfo -->
  <uinfo v-model:show="state.isUinfo"></uinfo>
  <!-- Passwd -->
  <passwd v-model:show="state.isPasswd"></passwd>

  <!-- Main -->
  <div class="app_main flex">
    <!-- MenusAll -->
    <div class="app_menus_all" :style="{visibility:menus.show&&state.isLogin?'inherit':'hidden'}">
      <wm-popup height="100%" width="900px" v-model:show="menus.show" position="left" bgColor="#FFF" :time="600">
        <div class="menus_body flex">
          <!-- MenusLeft -->
          <div class="menus_left">
            <div class="m1">最近访问</div>
            <ul class="m2" v-if="menus.tmpList.length>0">
              <li class="flex_left" v-for="(v,k) in menus.tmpList" :key="k" @click="MenusClick(v.label, v.url, true)">
                <i v-if="v.icon" :class="v.icon"></i>
                <span :style="{paddingLeft:v.icon?'':'8px'}">{{ v.label }}</span>
              </li>
            </ul>
            <div class="null" v-else></div>
            <div class="m1">推荐功能</div>
            <ul class="m2">
              <li class="flex_left" @click="state.isUinfo=true">
                <i class="ui ui_user"></i>
                <span :style="{paddingLeft:''}">基础信息</span>
              </li>
              <li class="flex_left" @click="state.isPasswd=true">
                <i class="ui ui_safety"></i>
                <span :style="{paddingLeft:''}">修改密码</span>
              </li>
            </ul>
          </div>
          <!-- MenusRight -->
          <div class="menus_right">
            <div class="m_top flex">
              <div class="search">
                <i class="ui ui_search"></i>
                <input type="text" class="input" v-model="menus.key" @input="MenusSearch()" placeholder="请输入菜单功能">
              </div>
              <i class="ui ui_close" @click="menus.show=false"></i>
            </div>
            <div class="menus_ct scrollbar">
              <div class="null center" v-if="menus.key&&menus.seaList.length==0"></div>
              <ul v-else>
                <template v-for="(v1,k1) in menus.list" :key="k1">
                  <template v-if="v1.children">
                    <template v-for="(v2,k2) in v1.children" :key="k2">
                      <li v-if="v2.children&&(v2.display||typeof v2.display=='undefined')">
                        <div class="title">{{ v2.label }}</div>
                        <template v-for="(v3,k3) in v2.children" :key="k3">
                          <div v-if="v3.display||typeof v3.display=='undefined'" class="m flex_left" :class="tabs.active==v3.value.url?'active':''" @click="MenusClick(v3.label, v3.value.url, true)">
                            <i v-if="v3.icon" :class="v3.icon"></i>
                            <span :style="{paddingLeft: v3.icon?'':'10px'}">{{ v3.label }}</span>
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
      </wm-popup>
    </div>
    <!-- Left -->
    <div class="app_left" :style="{width: is_menus?'240px':'56px'}">
      <div class="app_on" @click="MenusShow()"><i class="ui" :class="is_menus?'ui_arrow_left':'ui_arrow_right'"></i></div>
      <!-- Logo -->
      <div class="app_logo flex">
        <div class="logo" @click="menus.show=!menus.show;uinfo.show=false" :style="{backgroundImage:'url('+require('./assets/logo.svg')+')'}"></div>
        <div class="logo_text" v-if="is_menus">WebMIS 3.0</div>
      </div>
      <!-- Search -->
      <div class="app_search" v-if="is_menus">
        <i class="ui ui_search"></i>
        <input type="text" class="input" v-model="menus.key" @input="MenusSearch()" placeholder="请输入菜单功能">
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
              <i :class="v1.icon" :title="v1.label" @click="MenusShow()"></i>
            </div>
            <template v-if="v1.children&&is_menus">
              <template v-for="(v2,k2) in v1.children" :key="k2">
                <div class="m1 flex" @click="v2.show=!v2.show">
                  <span>{{ v2.label }}</span>
                  <i class="ui ui_arrow_up" :style="{transform: v2.show?'rotate(0deg)':'rotate(180deg)'}"></i>
                </div>
                <ul class="m2" v-if="v2.children&&v2.show">
                  <li class="flex_left" v-for="(v3,k3) in v2.children" :key="k3" :class="tabs.active==v3.value.url?'active':''" @click="MenusClick(v3.label, v3.value.url)">
                    <i v-if="v3.icon" :class="v3.icon"></i>
                    <span :style="{paddingLeft: v3.icon?'':'16px'}">{{ v3.label }}</span>
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
      <div class="app_user_info_body" :style="{visibility:uinfo.show&&state.isLogin?'inherit':'hidden'}">
        <wm-popup height="100%" width="320px" v-model:show="uinfo.show" position="right" bgColor="#FFF">
          <div class="app_user_info scrollbar">
            <div class="img" :style="{backgroundImage: state.uinfo.img?'url('+state.uinfo.img+')':'none'}" @click="userUpImg()">
              <div class="img_load">更新头像</div>
              <i class="ui ui_image" v-if="!state.uinfo.img"></i>
            </div>
            <div class="user"><h2>{{ state.uinfo.uname || '-' }}</h2><p>账号ID: {{ state.uinfo.uid || '-' }}</p></div>
            <ul class="info">
              <li class="flex"><span class="name">昵称</span><span class="value">{{ state.uinfo.nickname || '-' }}</span></li>
              <li class="flex"><span class="name">部门</span><span class="value">{{ state.uinfo.department || '-' }}</span></li>
              <li class="flex"><span class="name">职务</span><span class="value">{{ state.uinfo.position || '-' }}</span></li>
              <li class="flex"><span class="name">姓名</span><span class="value">{{ state.uinfo.name || '-' }}</span></li>
            </ul>
            <ul class="tools">
              <li @click="state.isUinfo=true">基本信息</li>
              <li @click="state.isPasswd=true">修改密码</li>
            </ul>
          </div>
          <div class="app_user_close" @click="logout()">退出登录</div>
        </wm-popup>
      </div>
      <!-- Tabs -->
      <div class="app_tabs_body flex">
        <ul class="app_tabs flex_left">
          <li class="home" :class="tabs.active=='/'?'active':''" @click="MenusClick('首页', '/')">首页</li>
          <li v-for="(v,k) in tabs.list" :key="k" @click="MenusClick(v.name, v.url)" :class="tabs.active==v.url?'active':''">
            {{ v.name }}<span class="close" @click.stop="MenusClose(v.url)"><i class="ui ui_close"></i></span>
          </li>
        </ul>
        <ul class="app_tools flex">
          <li class="msg" title="消息"><i class="ui ui_message"></i></li>
          <li class="user" title="用户信息" @click="uinfo.show=!uinfo.show;menus.show=false">
            <i class="ui ui_user" v-if="!state.uinfo.img || uinfo.show"></i>
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

<script lang="ts" src="./App.ts"></script>
