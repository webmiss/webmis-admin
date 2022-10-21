<template>
  <div id="app">

    <!-- Login -->
    <div v-show="state.isLogin===false" class="login_bg bgImg bgcover" :style="{backgroundImage:'url('+require('./assets/bg.jpg')+')'}">
      <div class="language">
        <div class="language_text">语言: {{language.list[language.num].val}}</div>
        <div class="language_box">
          <div class="arrow"></div>
          <ul class="language_list">
            <template v-for="(v,k) in language.list" :key="k">
              <li v-if="language.list[language.num].val!=v.val" @click="Language(k)">{{v.val}}</li>
            </template>
          </ul>
        </div>
      </div>
      <div class="login_body">
        <div class="login_logo ctCenter bgImg" :style="{backgroundImage:'url('+require('./assets/logo.svg')+')'}"></div>
        <div class="login_ct">
          <h2 class="login_title">{{info.title}}</h2>
          <div class="login_input">
            <wm-input :value="login.uname" height="40px" @update:value="login.uname=$event" placeholder="请输入手机号码" />
          </div>
          <div class="login_input">
            <wm-input :value="login.passwd" height="40px" @update:value="login.passwd=$event" type="password" placeholder="密码" />
          </div>
          <div class="login_input">
            <wm-button type="primary" width="100%" height="40px" margin="0" @click="loginSub()" :disabled="login.dis">{{login.subText}}</wm-button>
          </div>
        </div>
        <div class="login_copy nowrap">{{info.copy}}&nbsp;&nbsp;版本：{{info.version}}</div>
      </div>
    </div>
    <!-- Login End -->

    <!-- Main -->
    <div class="app_body" v-show="state.isLogin===true">
      <!-- Top -->
      <div class="app_top flex">
        <!-- Logo -->
        <div class="flex">
          <div class="app_top_logo flex" @click="menusClick([0,0,0])">
            <span class="logo bgImg" :style="{backgroundImage:'url('+require('./assets/logo.svg')+')'}"></span>
            <span class="title">{{info.title}}</span>
          </div>
          <!-- Search -->
          <div class="app_top_sea flex">
            <i class="ui ui_search ico"></i>
            <input type="text" placeholder="搜索菜单名称" v-model="sea.key" @input="seaInput()" />
            <div class="box scrollbar">
              <ul class="list">
                <template  v-if="!sea.key && menusLately.length>0">
                  <li v-for="(v,k) in menusLately" :key="k" @click="menusClick(v.pos)">{{ v.label }}</li>
                </template>
                <template v-else>
                  <li v-for="(m,k) in sea.list" :key="k" v-show="m.show" @click="menusClick(m.value)">{{ m.label }}</li>
                </template>
                <li v-if="!sea.isData" class="null"></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="flex">
          <!-- Tools -->
          <ul class="app_top_tools flex">
            <li><i class="ui ui_data"></i></li>
            <li><i class="ui ui_message"></i></li>
          </ul>
          <!-- User -->
          <div class="app_top_user">
            <span class="img">
              <i class="ui ui_user"></i>
            </span>
            <div class="box">
              <div class="info">
                <h2 class="nowrap">{{state.uInfo.nickname || '会员昵称'}}</h2>
                <p>账号: {{state.uInfo.uname}} ID:{{state.uInfo.uid}}</p>
              </div>
              <ul class="list">
                <li @click="menusClick([0],'/UserInfo')">基本信息</li>
                <li @click="menusClick([0],'/UserPasswd')">修改密码</li>
              </ul>
              <div class="logout" @click="logout()">退出登录</div>
            </div>
          </div>
          <!-- User End -->
        </div>
      </div>
      <!-- Top End -->
      <!-- Body -->
      <div class="app_ct flex">
        <div class="app_left">
          <!-- Menus -->
          <div class="app_menus_body scrollbar">
            <ul class="app_menus">
              <li class="m1" v-for="(m1,k1) in state.menus" :key="k1" :class="menusPos[0]==k1?'active':''">
                <div class="flex_left" @click="sea.show=!sea.show">
                  <span class="ico"><i :class="m1.icon"></i></span>
                  <span class="title">{{m1.label}}</span>
                </div>
                <div class="app_menus_list scrollbar" v-show="sea.show">
                  <ul v-if="k1==0">
                    <li class="class">最近浏览</li>
                    <li v-for="v,k in menusLately" :key="k" @click="menusClick(v.pos)">{{ v.label }}</li>
                    <li class="class">公共菜单</li>
                    <li @click="menusClick([0,0,0])">工作台</li>
                    <li @click="menusClick([0],'/UserInfo')">基本信息</li>
                    <li @click="menusClick([0],'/UserPasswd')">修改密码</li>
                  </ul>
                  <ul v-else-if="m1.children">
                    <template v-for="(m2,k2) in m1.children" :key="k2">
                      <li class="class">{{ m2.label }}</li>
                      <li v-for="(m3,k3) in m2.children" :key="k3" :class="menusPos[0]==k1 && menusPos[1]==k2 && menusPos[2]==k3?'active':''" @click="menusClick([k1,k2,k3])">{{ m3.label }}</li>
                    </template>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <!-- Copy -->
          <div class="app_copy">&copy; {{ info.version }}</div>
        </div>
        <div class="app_right">
          <router-view v-slot="{ Component }">
            <transition :name="transitionName">
              <keep-alive :include="state.keepAlive">
                <component :is="Component" class="view" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>
      <!-- Body End -->
    </div>
    <!-- Main End -->
    
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
<style lang="less" scoped>
.language{position: absolute; padding: 10px 0; top: 16px; right: 16px;}
.language_text{cursor: pointer; width: 200px; line-height: 40px; text-align: center; border-radius: 20px; color: #CCC; border-radius: 20px; background-color: rgba(0,0,0,.7);}
.language_text:hover{color: @Primary;}
.language_box{display: none; position: absolute; z-index: 1; width: 200px; left: 50%; transform: translate(-50%, 0); margin-left: -4px;}
.language_box .arrow{position: absolute; top: -6px; left: 50%; transform: translate(-50%, 0); width: 0px; height: 0px; border: 8px solid; border-color: transparent; border-bottom-color: rgba(0,0,0,.7);}
.language_list{position: absolute; padding: 4px; width: 100%; top: 9px; border-radius: 4px; color: #FFF; background-color: rgba(0,0,0,.7);}
.language_list li{cursor: pointer; line-height: 40px; padding: 0 16px; border-radius: 4px;}
.language_list li:hover{background-color: @Primary;}
.language_list .active{background-color: @Primary;}
.language:hover .language_box{display: block;}
</style>

<script lang="ts" src="./App.ts"></script>
