<template>
  <!-- Login -->
  <!-- <div class="app_login">
    <div class="center">Login</div>
  </div> -->

  <!-- Main -->
  <div class="app_main flex">
    <!-- MenusAll -->
    <div class="app_menus_all" :style="{visibility:menus.show?'inherit':'hidden'}">
      <wm-popup ref="menusData" height="100%" width="940px"  v-model:show="menus.show" position="left" bgColor="#FFF">
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
                  <div class="title">+ 二级菜单</div>
                  <div class="m flex_left active"><i class="icons icon_web"></i>菜单名称</div>
                  <div class="m flex_left"><i class="icons icon_web"></i>菜单名称</div>
                  <div class="m flex_left"><i class="icons icon_web"></i>菜单名称</div>
                  <div class="m flex_left"><i class="icons icon_web"></i>菜单名称</div>
                  <div class="m flex_left"><i class="icons icon_web"></i>菜单名称</div>
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
    <div class="app_left">
      <div class="app_on"><i class="ui ui_arrow_left"></i></div>
      <!-- Logo -->
      <div class="app_logo flex">
        <div class="logo" @click="menus.show=!menus.show" :style="{backgroundImage:'url('+require('./assets/logo.svg')+')'}"></div>
        <div class="logo_text">WebMIS 3.0</div>
      </div>
      <!-- Search -->
      <div class="app_search">
        <i class="ui ui_search"></i>
        <input type="text" class="input" placeholder="请输入菜单功能">
      </div>
      <!-- Menus -->
      <div class="app_menus scrollbar">
        <div class="m1 flex">二级菜单<i class="ui ui_arrow_up"></i></div>
        <div class="m2 flex_left active">
          <i class="icons icon_home"></i>
          三级菜单
        </div>
        <div class="m2 flex_left">
          <i class="icons icon_web"></i>
          三级菜单
        </div>
        <div class="m2 flex_left">
          <i class="icons icon_work"></i>
          三级菜单
        </div>
        <div class="m1 flex">二级菜单<i class="ui ui_arrow_down"></i></div>
        <div class="m1 flex">二级菜单<i class="ui ui_arrow_down"></i></div>
      </div>
      <!-- Copy -->
      <div class="app_copy">&copy; WebMIS 2024</div>
    </div>
    <!-- Left End -->
     <!-- Right -->
    <div class="app_right">
      <!-- Tabs -->
      <div class="app_tabs_body flex">
        <ul class="app_tabs flex_left">
          <li class="home active">首页</li>
          <li>菜单管理<span class="close"><i class="ui ui_close"></i></span></li>
          <li>系统用户<span class="close"><i class="ui ui_close"></i></span></li>
        </ul>
        <ul class="app_tools flex">
          <li class="msg" title="消息"><i class="ui ui_message"></i></li>
          <li class="user" title="用户信息"><i class="ui ui_user"></i></li>
        </ul>
        <!-- <ul class="app_tabs_time">
          <li class="time">更新时间：<b>2024/07/23 09:03:48</b></li>
          <li class="refresh"><i class="ui ui_refresh"></i></li>
        </ul> -->
      </div>
      <!-- Content -->
      <div class="app_content">
        <div class="app_total">统计: 123</div>
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
