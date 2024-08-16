<template>
  <div class="wm-login_popup" :style="{visibility:login.show?'inherit':'hidden'}">
    <wm-popup v-model:show="login.show" width="100%" height="100%" position="top" :time="600">
      <div class="wm-login_bg" :class="login.bg"></div>
      <div class="wm-login_mask"></div>
      <div class="wm-login_body">
        <div class="wm-login_ct">
          <div class="wm-login_logo" :style="{backgroundImage:'url('+(login.uname&&login.uname==login.local_uname&&login.img?login.img:require('@/assets/logo.svg'))+')', backgroundSize:login.uname&&login.uname==login.local_uname&&login.img?'100%':'60%'}"></div>
          <div class="wm-login_form" v-if="!login.is_passwd">
            <i class="ui ui_user ico"></i>
            <input ref="loginUname" type="text" class="input" v-model="login.uname" @keyup.enter="clickLogin()" maxlength="32" placeholder="用户名 / 手机号码 / 邮箱">
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
          <div class="wm-login_bottom">
            <span v-if="login.uname" class="flex">
              <i class="ui ui_arrow_left" @click="clearUser()"></i>
              <i class="ui ui_arrow_right" @click="clickLogin()"></i>
            </span>
            <span v-else>{{ copy }}</span>
          </div>
        </div>
      </div> 
    </wm-popup>
  </div>
</template>

<style lang="less" scoped>
.wm-login_popup{position: fixed; z-index: 9999; width: calc(100% + 1px); height: calc(100% + 1px); left: 0; top: 0;}
.wm-login_bg{position: absolute; z-index: 1; width: 100%; height: 100%; background-color: #323438; background-position: center; background-size: cover; background-repeat: no-repeat; transition: All 3s ease-in-out;}
.wm-login_bg.bg0{background-image: url('../../assets/bg/0.jpg');}
.wm-login_bg.bg1{background-image: url('../../assets/bg/1.jpg');}
.wm-login_bg.bg2{background-image: url('../../assets/bg/2.jpg');}
.wm-login_bg.bg3{background-image: url('../../assets/bg/3.jpg');}
.wm-login_bg.bg4{background-image: url('../../assets/bg/4.jpg');}
.wm-login_bg.bg5{background-image: url('../../assets/bg/5.jpg');}
.wm-login_bg.bg6{background-image: url('../../assets/bg/6.jpg');}
.wm-login_bg.bg7{background-image: url('../../assets/bg/7.jpg');}
.wm-login_bg.bg8{background-image: url('../../assets/bg/8.jpg');}
.wm-login_bg.bg9{background-image: url('../../assets/bg/9.jpg');}
.wm-login_mask{position: absolute; z-index: 2; width: 100%; height: 100%; background: -webkit-radial-gradient(50% 30% ,farthest-corner,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.9));}
.wm-login_body{position: absolute; z-index: 3; width: 100%; height: 100%; color: @Minor6;}
.wm-login_ct{position: absolute; min-width: 300px; left: 50%; top: 50%; transform: translate(-50%, -60%);}
.wm-login_logo{margin: 48px auto; width: 160px; height: 160px; border: rgba(0,0,0,0.8) 1px solid; background-color: rgba(0,0,0,0.7); border-radius: 50%; background-repeat: no-repeat; background-position: center; transition: All 0.5s ease-in-out;}
.wm-login_logo:hover{border-color: @Minor; background-color: rgba(0,0,0,0.7);}
.wm-login_form{position: relative;}
.wm-login_form input{width: 100%; padding: 0 16px 0 48px; height: 48px; line-height: 48px; color: @Minor8; font-size: 16px; border: transparent 1px solid; background-color: rgba(0,0,0,0.7); border-radius: 8px; box-sizing: border-box;}
.wm-login_form input:hover{border-color: @Minor; background-color: rgba(0,0,0,0.8);}
.wm-login_form input:focus{border-color: @Minor; background-color: rgba(0,0,0,0.8);}
.wm-login_form .ico{position: absolute; width: 48px; line-height: 48px; color: @Minor5; font-size: 20px; text-align: center;}
.wm-login_form .vcode{cursor: pointer; position: absolute; height: 40px; top: 50%; right: 4px; transform: translateY(-50%); border-radius: 4px;}
.wm-login_bottom{text-align: center; line-height: 64px; text-shadow: 0 0 2px rgba(0,0,0,0.3);}
.wm-login_bottom span{display: inline-block; line-height: 40px; padding: 0 16px; color: @Minor6;}
.wm-login_bottom i{cursor: pointer; display: inline-block; width: 40px; margin: 0 8px; border-radius: 50%;}
.wm-login_bottom i:hover{background-color: rgba(0,0,0,0.8); color: @Minor;}
</style>

<script lang="ts" src="./Login.ts"></script>
