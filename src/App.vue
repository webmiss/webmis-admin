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
            <li title="消息" @click="msgData()">
              <span class="redNum">{{ state.msg.num }}</span>
              <i class="ui ui_message"></i>
            </li>
          </ul>
          <!-- User -->
          <div class="app_top_user">
            <span class="img" v-if="state.uInfo.img" :style="{backgroundImage: 'url('+state.uInfo.img+')'}"></span>
            <span v-else class="img"><i class="ui ui_user"></i></span>
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
              <li class="m1" v-for="(m1,k1) in state.menus" :key="k1">
                <div :class="menusPos[0]==k1?'active':''" @click="sea.show=!sea.show">
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

    <!-- Msg -->
    <wm-popup ref="Msg" v-model:show="state.msg.show">
      <div class="app_msg_body flex">
        <div class="app_msg_left">
          <!-- Search -->
          <div class="sea">
            <div class="sea_ico"><i class="ui ui_search"></i></div>
            <input type="text" class="input" placeholder="搜索联系人" v-model="state.msg.key" @input="msgInput()" />
            <div class="sea_body scrollbar" v-if="state.msg.key">
              <ul class="sea_list" v-if="state.msg.seaList.length>0">
                <li class="flex" v-for="(v,k) in state.msg.seaList" :key="k" @click="msgSeaClick(v)">
                  <div class="img" :style="{backgroundImage: v.img?'url('+v.img+')':''}">
                    <i class="ui ui_image" v-if="!v.img"></i>
                  </div>
                  <div class="name nowrap">{{ v.name }}</div>
                </li>
              </ul>
              <div class="null" v-else></div>
            </div>
          </div>
          <!-- List -->
          <div class="user_body scrollbar">
            <ul class="user_list" v-if="state.msg.list.length>0">
              <li class="flex" v-for="(v,k) in state.msg.list" :key="k" :class="v.fid===state.msg.fid?'active':''" @click="msgClick(v)">
                <div class="img" :style="{backgroundImage: v.img?'url('+v.img+')':''}">
                  <span class="redNum" v-if="v.num>0">{{ v.num }}</span>
                  <i class="ui ui_image" v-if="!v.img"></i>
                </div>
                <div class="info">
                  <div class="flex">
                    <div class="name nowrap">{{ v.title }}</div>
                    <div class="time">{{ getMsgDate(v.time) }}</div>
                  </div>
                  <div class="text nowrap">{{ v.msg }}</div>
                </div>
              </li>
            </ul>
            <div class="null" v-else></div>
          </div>
          <!-- List End -->
        </div>
        <div class="app_msg_right">
          <!-- Title -->
          <div class="app_msg_title">
            <span>{{ state.msg.title }}</span>
            <span class="close" @click="$refs.Msg.close()"><i class="ui ui_close"></i></span>
          </div>
          <!-- MsgList -->
          <div class="app_msg_list scrollbar">
            <template v-for="(v1,k1) in state.msg.list" :key="k1">
              <div class="msg_null" v-if="v1.fid==state.msg.fid&&v1.list.length==0">暂无新消息</div>
              <template v-else>
                <div v-for="(v, k) in v1.list" :key="k" v-show="v1.fid==state.msg.fid">
                  <!-- Time -->
                  <div class="time">{{ getMsgTime(v.time, v1.list[k+1]?v1.list[k+1].time:v.time) }}</div>
                  <!-- Msg Left -->
                  <div class="msg_left flex_left" v-if="v.uid!=state.uInfo.uid">
                    <div class="img" :style="{backgroundImage: v.img?'url('+v.img+')':''}">
                      <i class="ui ui_image" v-if="!v.img"></i>
                    </div>
                    <div class="msg_body flex_left">
                      <div class="content">
                        <span class="arrow"></span>
                        <span>{{ v.msg }}</span>
                      </div>
                    </div>
                  </div>
                  <!-- Msg Right -->
                  <div class="msg_right flex_right" v-else>
                    <div class="msg_body flex_right">
                      <div class="content">
                        <span class="arrow"></span>
                        <span>{{ v.msg }}</span>
                      </div>
                    </div>
                    <div class="img" :style="{backgroundImage: v.img?'url('+v.img+')':''}">
                      <i class="ui ui_image" v-if="!v.img"></i>
                    </div>
                  </div>
                </div>
              </template>
            </template>
            <div id="msgBottom"></div>
          </div>
          <!-- MsgTool -->
          <ul class="app_msg_tool flex_left">
            <li title="正在开发"><i class="ui ui_image" /></li>
            <li title="正在开发"><i class="ui ui_folder" /></li>
          </ul>
          <!-- MsgSend -->
          <div class="app_msg_send flex">
            <div class="msg">
              <wm-input v-model:value="state.msg.content" type="textarea" height="80px" maxlength="128" bgColor="#EEE" placeholder="输入内容" @keyup.enter="msgSub()" />
            </div>
            <div class="send">
              <wm-button width="80px" height="80px" radius="4px" @click="msgSub()">发送</wm-button>
            </div>
          </div>
        </div>
      </div>
    </wm-popup>
    <!-- Msg End -->
    
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
#app{overflow: hidden;}
/* Language */
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
