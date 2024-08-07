<template>
  <!-- Login -->
  <login></login>

  <!-- Main -->
  <div class="app_main flex">
    <!-- MenusAll -->
    <div class="app_menus_all" :style="{visibility:menus.show&&state.isLogin?'inherit':'hidden'}">
      <wm-popup height="100%" width="940px" v-model:show="menus.show" position="left" bgColor="#FFF" :time="600">
        <div class="menus_body flex">
          <!-- MenusLeft -->
          <div class="menus_left">
            <div class="m1">最近访问</div>
            <div class="m2 flex_left active">
              <i class="icons icon_home"></i>三级菜单
            </div>
            <div class="m2 flex_left">
              <i class="icons icon_web"></i>三级菜单
            </div>
            <div class="m1">推荐功能</div>
            <div class="m2 flex_left active">
              <i class="icons icon_home"></i>个人信息
            </div>
            <div class="m2 flex_left">
              <i class="icons icon_web"></i>修改密码
            </div>
          </div>
          <!-- MenusRight -->
          <div class="menus_right">
            <div class="m_top flex">
              <div class="search">
                <i class="ui ui_search"></i>
                <input type="text" class="input" placeholder="请输入菜单功能">
              </div>
              <i class="ui ui_close" @click="menus.show=false"></i>
            </div>
            <div class="menus_ct scrollbar">
              <ul>
                <li>
                  <div class="title">+ 系统管理</div>
                  <div class="m flex_left" :class="tabs.active=='/SysMenus'?'active':''" @click="MenusClick('菜单管理', '/SysMenus', true)">
                    <i class="icons icon_web"></i>菜单管理
                  </div>
                  <div class="m flex_left" :class="tabs.active=='/SysUser'?'active':''" @click="MenusClick('系统用户', '/SysUser', true)">
                    <i class="icons icon_web"></i>系统用户
                  </div>
                </li>
                <li>
                  <div class="title">+ 二级菜单</div>
                  <div class="m flex_left"><i class="icons icon_web"></i>菜单名称1</div>
                  <div class="m flex_left"><i class="icons icon_web"></i>菜单名称</div>
                  <div class="m flex_left"><i class="icons icon_web"></i>菜单名称</div>
                </li>
                <li>
                  <div class="title">+ 二级菜单</div>
                  <div class="m flex_left"><i class="icons icon_web"></i>菜单名称2</div>
                  <div class="m flex_left"><i class="icons icon_web"></i>菜单名称</div>
                  <div class="m flex_left"><i class="icons icon_web"></i>菜单名称</div>
                  <div class="m flex_left"><i class="icons icon_web"></i>菜单名称</div>
                </li>
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
        <div class="logo" @click="menus.show=!menus.show" :style="{backgroundImage:'url('+require('./assets/logo.svg')+')'}"></div>
        <div class="logo_text" v-if="is_menus">WebMIS ERP</div>
      </div>
      <!-- Search -->
      <div class="app_search" v-if="is_menus">
        <i class="ui ui_search"></i>
        <input type="text" class="input" placeholder="请输入菜单功能">
      </div>
      <!-- Menus -->
      <div class="app_menus scrollbar" :style="{height: 'calc(100% - '+(is_menus?'152px':'98px')+')',}">
        <div class="m" v-if="!is_menus">
          <i class="icons icon_home"></i>
        </div>
        <div class="m1 flex" v-else>
          <span>二级菜单</span>
          <i class="arrow ui ui_arrow_up"></i>
        </div>
        <ul class="m2" v-if="is_menus">
          <li class="flex_left" :class="tabs.active=='/SysMenus'?'active':''" @click="MenusClick('菜单管理', '/SysMenus')">
            <i class="icons icon_web"></i>菜单管理
          </li>
          <li class="flex_left" :class="tabs.active=='/SysUser'?'active':''" @click="MenusClick('系统用户', '/SysUser')">
            <i class="icons icon_work"></i>系统用户
          </li>
        </ul>
      </div>
      <!-- Copy -->
      <div class="app_copy">2024&copy; WebMIS 3.0</div>
    </div>
    <!-- Left End -->
     <!-- Right -->
    <div class="app_right" :style="{width: is_menus?'calc(100% - 240px)':'calc(100% - 56px)'}">
      <!-- UserInfo -->
      <div class="app_user_info_body" :style="{visibility:uinfo.show&&state.isLogin?'inherit':'hidden'}">
        <wm-popup height="100%" width="280px"  v-model:show="uinfo.show" position="right" bgColor="#FFF">
          <div class="app_user_info scrollbar">
            <div class="img" :style="{backgroundImage: 'url(https://cszbvip.oss-cn-guangzhou.aliyuncs.com/user/img/1.jpg?1721955717)'}"><i class="ui ui_image"></i></div>
            <div class="user"><h2>klingsoul@163.com</h2><p>账号ID: 100001871689</p></div>
            <ul class="info">
              <li class="flex"><span class="name">昵称</span><span class="value">管理员</span></li>
              <li class="flex"><span class="name">部门</span><span class="value">信息技术部</span></li>
              <li class="flex"><span class="name">职务</span><span class="value">软件开发</span></li>
              <li class="flex"><span class="name">姓名</span><span class="value">张三</span></li>
            </ul>
            <ul class="tools">
              <li>基本信息</li>
              <li>修改密码</li>
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
          <!-- <li @click="MenusClick('/SysUser')">系统用户<span class="close"><i class="ui ui_close"></i></span></li> -->
        </ul>
        <ul class="app_tools flex">
          <li class="msg" title="消息"><i class="ui ui_message"></i></li>
          <li class="user" title="用户信息" @click="uinfo.show=!uinfo.show">
            <i class="ui ui_user" v-if="uinfo.show"></i>
            <div class="img" v-else :style="{backgroundImage: 'url(https://cszbvip.oss-cn-guangzhou.aliyuncs.com/user/img/1.jpg?1721955717)'}"></div>
          </li>
        </ul>
        <!-- <ul class="app_tabs_time">
          <li class="time">更新时间：<b>2024/07/23 09:03:48</b></li>
          <li class="refresh"><i class="ui ui_refresh"></i></li>
        </ul> -->
      </div>
      <!-- Content -->
      <div class="app_content">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="$route.name" />
          </keep-alive>
        </router-view>
        <!-- <router-view></router-view> -->
      </div>
    </div>
    <!-- Right End -->
  </div>
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
