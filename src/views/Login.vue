<template>
  <div class="wm-login_popup" :style="{visibility:login.show?'inherit':'hidden'}">
    <wm-popup height="100%" width="100%" v-model:show="login.show" position="top" :time="600">
      <div class="wm-login_bg"></div>
      <div class="wm-login_mask"></div>
      <div class="wm-login_body">
        <div class="wm-login_ct">
          <div class="wm-login_logo" :style="{backgroundImage:'url('+require('../assets/logo.svg')+')'}"></div>
          <div class="wm-login_form" v-if="!login.is_passwd">
            <i class="ui ui_user ico"></i>
            <input type="text" class="input" v-model="login.uname" @keyup.enter="clickLogin()" maxlength="32" placeholder="用户名 / 手机号码 / 邮箱">
          </div>
          <div class="wm-login_form" v-else-if="login.is_passwd&&!login.is_safety">
            <i class="ui ui_safety ico"></i>
            <input ref="loginPasswd" type="password" class="input" v-model="login.passwd" @keyup.enter="clickLogin()" maxlength="32" placeholder="请输入密码">
          </div>
          <div class="wm-login_form" v-else-if="login.is_safety">
            <i class="ui ui_safety ico"></i>
            <img class="vcode" :src="login.vcode_url" alt="点击刷新" @click="changeVcode()" />
            <input ref="loginVcode" type="text" class="input" v-model="login.vcode" @keyup.enter="clickLogin()" maxlength="4" placeholder="验证码">
          </div>
          <div class="wm-login_text">
            <span v-if="login.uname" @click="clearUser()" class="change">切换用户</span>
            <span v-else>&copy;2024 webmis.vip{{ login.uname }}</span>
          </div>
        </div>
      </div> 
    </wm-popup>
  </div>
</template>

<style lang="less" scoped>
.wm-login_popup{position: fixed; z-index: 99; width: calc(100% + 1px); height: calc(100% + 1px); left: 0; top: 0;}
.wm-login_bg{position: absolute; z-index: 1; width: 100%; height: 100%; background-image: url(../assets/bg.jpg); background-position: center; background-size: cover; background-repeat: no-repeat;}
.wm-login_mask{position: absolute; z-index: 2; width: 100%; height: 100%; background: -webkit-radial-gradient(50% 20% ,farthest-corner,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.8),#020408);}
.wm-login_body{position: absolute; z-index: 3; width: 100%; height: 100%; color: @Minor6;}
.wm-login_ct{position: absolute; min-width: 300px; left: 50%; top: 50%; transform: translate(-50%, -60%);}
.wm-login_logo{margin: 48px auto; width: 160px; height: 160px; background-color: rgba(0,0,0,0.7); border-radius: 50%; background-repeat: no-repeat; background-position: center; background-size: 60%;}
.wm-login_logo:hover{background-color: rgba(0,0,0,0.8);}
.wm-login_form{position: relative;}
.wm-login_form input{width: 100%; padding: 0 16px 0 48px; height: 48px; line-height: 48px; color: @Minor8; font-size: 16px; border: transparent 1px solid; background-color: rgba(0,0,0,0.5); border-radius: 8px; box-sizing: border-box;}
.wm-login_form input:hover{border-color: @Minor; background-color: rgba(0,0,0,0.8);}
.wm-login_form input:focus{border-color: @Minor; background-color: rgba(0,0,0,0.8);}
.wm-login_form .ico{position: absolute; width: 48px; line-height: 48px; color: @Minor5; font-size: 20px; text-align: center;}
.wm-login_form .vcode{cursor: pointer; position: absolute; height: 40px; top: 50%; right: 4px; transform: translateY(-50%); border-radius: 4px;}
.wm-login_text{text-align: center; line-height: 64px;}
.wm-login_text span{padding: 8px 16px; color: @Minor6;}
.wm-login_text .change{cursor: pointer; border-radius: 4px;}
.wm-login_text .change:hover{background-color: rgba(0,0,0,0.3);}
</style>

<script lang="ts" src="./Login.ts"></script>
