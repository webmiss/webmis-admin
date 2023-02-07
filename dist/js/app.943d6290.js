(function(){"use strict";var e={7830:function(e,t,s){var n=s(2367);const i="",a=n.Z.getItem("language")||"",o=a?JSON.parse(a):"";let l,r;o&&"python"==o.name?"dev"==i?(l="http://localhost:9010/",r="ws://localhost:9011/"):(l="https://python.webmis.vip/",r="wss://python.webmis.vip/wss"):o&&"java"==o.name?"dev"==i?(l="http://localhost:9020/",r="ws://localhost:9020/websocket"):(l="https://java.webmis.vip/",r="wss://java.webmis.vip/websocket"):o&&"go"==o.name?"dev"==i?(l="http://localhost:9030/",r="ws://localhost:9031/websocket"):(l="https://go.webmis.vip/",r="wss://go.webmis.vip/websocket"):o&&"phalcon"==o.name?"dev"==i?(l="http://localhost:9040/",r="ws://localhost:9041/websocket"):(l="https://phalcon.webmis.vip/",r="wss://phalcon.webmis.vip/websocket"):"dev"==i?(l="http://localhost:9000/",r="ws://localhost:9001/"):(l="https://php.webmis.vip/",r="wss://php.webmis.vip/wss");const u=new Date;t["Z"]={title:"WebMIS",version:"1.0.0",copy:"Copyright © WebMIS.vip "+u.getFullYear(),baseUrl:l,apiUrl:l+"admin/",tinymceKey:"dm9pn8sfmiyaalv1r49hvf8ww9x8denshvuhp1tf7z51k6jj",token:"",request:{headers:{"Content-Type":"application/json;charset=utf-8"},responseType:"json",timeout:1e4},statusBar:{height:48,color:"#333",bgColor:"#FFF"},update:{start:!0,bg:"#24292E",logoBg:"#FFFFFF",loading:"#6FB737",loaded:"#000000",copy:"#666666",msgColor:"#999999",butColor:"#FFFFFF",butBg:"#6FB737",butText:"下载并安装"},upIosUrl:"itms-apps://itunes.apple.com/cn/app/tao-bao-sui-shi-sui-xiang/id387682726?mt=8",login:{start:!0,api:"user/token",uinfo:"uinfo",time:3e4},amap:{start:!0,jsapi_key:"d956f0c3e15489a1b5bf291e5d133c8a"},socket:{type:"admin",start:!1,server:r,time:3e3,heartbeat:1e4},msg:{content:"content",browser:!1}}},2367:function(e,t){t["Z"]={setItem(e,t){return window.localStorage.setItem(e,t)},getItem(e){return window.localStorage.getItem(e)},removeItem(e){return window.localStorage.removeItem(e)},clear(){return window.localStorage.clear()}}},5783:function(e,t,s){var n=s(7830),i=s(196);t["Z"]=(e,t={},s,a,o)=>{"http"==e.substring(0,4)||(e="/"==e.substring(0,1)?n.Z.baseUrl+e.substring(1):n.Z.apiUrl+e);const l={headers:o&&o.headers?o.headers:n.Z.request.headers,responseType:o&&o.responseType?o.responseType:n.Z.request.responseType,timeout:n.Z.request.timeout};o&&o.onUploadProgress&&(l.onUploadProgress=o.onUploadProgress),i.ZP.post(e,t,l).then(s).catch(a)}},8907:function(e,t){t["Z"]=(e=6e4,t=.1)=>{let s=document.getElementsByClassName("wm-ui_load")[0];s&&document.body.removeChild(s);let n=document.createElement("div");n.setAttribute("class","wm-ui_load"),n.setAttribute("style",`background-color: rgba(0,0,0,${t})`),n.innerHTML='<span><i class="ui ui_loading"></i></span>',document.body.appendChild(n);const i=setTimeout((()=>{s=document.getElementsByClassName("wm-ui_load")[0],s&&document.body.removeChild(s)}),e);return{clear:()=>{setTimeout((()=>{try{document.body.removeChild(n)}catch(e){}clearTimeout(i)}),300)}}}},760:function(e,t,s){s(7658);var n=s(194);t["Z"]=(e,t)=>{t=t||"",n.Z.$router.push({path:e,query:t})}},6492:function(e,t){t["Z"]=(e="提示",t="primary",s=3e3)=>{let n=document.createElement("div");n.setAttribute("class","wm-ui_toast"),n.innerHTML='<span class="'+t+'">'+e+"</span>",document.body.appendChild(n),setTimeout((()=>{n.style.opacity="1",n.style.top="10%"}),100),setTimeout((()=>{document.body.removeChild(n)}),s)}},929:function(e,t,s){var n=s(6492);t["Z"]=(e,t,s=!1)=>{let i=!1,a="";const o={uname:/^[a-zA-Z][a-zA-Z0-9\_\@\-\*\&]{4,15}$/,tel:/^[1]\d{10}$/,email:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,vcode:/^\d{4}$/,passwd:/^[a-zA-Z0-9|_|@|-|*|&]{6,16}$/};switch(e){case"uname":i=o.uname.test(t),a=i?"":"用户名英文开头5~16位！";break;case"tel":i=o.tel.test(t),a=i?"":"手机号码错误！";break;case"email":i=o.email.test(t),a=i?"":"邮箱帐号错误！";break;case"vcode":i=o.vcode.test(t),a=i?"":"验证码4位！";break;case"passwd":i=o.passwd.test(t),a=i?"":"密码为6~16位字符！";break}return a&&s&&(0,n.Z)(a),!!i||a}},194:function(e,t,s){s.d(t,{Z:function(){return Qe}});var n=s(9963),i=s(6252),a=s(3577);const o=e=>((0,i.dD)("data-v-6d5290ce"),e=e(),(0,i.Cn)(),e),l={id:"app"},r={class:"language"},u={class:"language_text"},c={class:"language_box"},d=o((()=>(0,i._)("div",{class:"arrow"},null,-1))),p={class:"language_list"},h=["onClick"],m={class:"login_body"},g={class:"login_ct"},f={class:"login_title"},v={class:"login_input"},y={class:"login_input"},b={class:"login_input"},w={class:"login_copy nowrap"},_={class:"app_body"},k={class:"app_top flex"},C={class:"flex"},S={class:"title"},Z={class:"app_top_sea flex"},I=o((()=>(0,i._)("i",{class:"ui ui_search ico"},null,-1))),x={class:"box scrollbar"},P={class:"list"},L=["onClick"],A=["onClick"],D={key:2,class:"null"},T={class:"flex"},j=o((()=>(0,i._)("ul",{class:"app_top_tools flex"},[(0,i._)("li",null,[(0,i._)("i",{class:"ui ui_data"})]),(0,i._)("li",null,[(0,i._)("i",{class:"ui ui_message"})])],-1))),F={class:"app_top_user"},O=o((()=>(0,i._)("span",{class:"img"},[(0,i._)("i",{class:"ui ui_user"})],-1))),N={class:"box"},z={class:"info"},U={class:"nowrap"},B={class:"list"},H={class:"app_ct flex"},$={class:"app_left"},W={class:"app_menus_body scrollbar"},E={class:"app_menus"},M={class:"ico"},q={class:"title"},J={class:"app_menus_list scrollbar"},R={key:0},Y=o((()=>(0,i._)("li",{class:"class"},"最近浏览",-1))),K=["onClick"],V=o((()=>(0,i._)("li",{class:"class"},"公共菜单",-1))),G={key:1},Q={class:"class"},X=["onClick"],ee={class:"app_copy"},te={class:"app_right"};function se(e,t,o,se,ne,ie){const ae=(0,i.up)("wm-input"),oe=(0,i.up)("wm-button"),le=(0,i.up)("router-view");return(0,i.wg)(),(0,i.iD)("div",l,[(0,i.wy)((0,i._)("div",{class:"login_bg bgImg bgcover",style:(0,a.j5)({backgroundImage:"url("+s(5917)+")"})},[(0,i._)("div",r,[(0,i._)("div",u,"语言: "+(0,a.zw)(e.language.list[e.language.num].val),1),(0,i._)("div",c,[d,(0,i._)("ul",p,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.language.list,((t,s)=>((0,i.wg)(),(0,i.iD)(i.HY,{key:s},[e.language.list[e.language.num].val!=t.val?((0,i.wg)(),(0,i.iD)("li",{key:0,onClick:t=>e.Language(s)},(0,a.zw)(t.val),9,h)):(0,i.kq)("",!0)],64)))),128))])])]),(0,i._)("div",m,[(0,i._)("div",{class:"login_logo ctCenter bgImg",style:(0,a.j5)({backgroundImage:"url("+s(9574)+")"})},null,4),(0,i._)("div",g,[(0,i._)("h2",f,(0,a.zw)(e.info.title),1),(0,i._)("div",v,[(0,i.Wm)(ae,{value:e.login.uname,height:"40px","onUpdate:value":t[0]||(t[0]=t=>e.login.uname=t),placeholder:"请输入手机号码"},null,8,["value"])]),(0,i._)("div",y,[(0,i.Wm)(ae,{value:e.login.passwd,height:"40px","onUpdate:value":t[1]||(t[1]=t=>e.login.passwd=t),type:"password",placeholder:"密码"},null,8,["value"])]),(0,i._)("div",b,[(0,i.Wm)(oe,{type:"primary",width:"100%",height:"40px",margin:"0",onClick:t[2]||(t[2]=t=>e.loginSub()),disabled:e.login.dis},{default:(0,i.w5)((()=>[(0,i.Uk)((0,a.zw)(e.login.subText),1)])),_:1},8,["disabled"])])]),(0,i._)("div",w,(0,a.zw)(e.info.copy)+"  版本："+(0,a.zw)(e.info.version),1)])],4),[[n.F8,!1===e.state.isLogin]]),(0,i.wy)((0,i._)("div",_,[(0,i._)("div",k,[(0,i._)("div",C,[(0,i._)("div",{class:"app_top_logo flex",onClick:t[3]||(t[3]=t=>e.menusClick([0,0,0]))},[(0,i._)("span",{class:"logo bgImg",style:(0,a.j5)({backgroundImage:"url("+s(9574)+")"})},null,4),(0,i._)("span",S,(0,a.zw)(e.info.title),1)]),(0,i._)("div",Z,[I,(0,i.wy)((0,i._)("input",{type:"text",placeholder:"搜索菜单名称","onUpdate:modelValue":t[4]||(t[4]=t=>e.sea.key=t),onInput:t[5]||(t[5]=t=>e.seaInput())},null,544),[[n.nr,e.sea.key]]),(0,i._)("div",x,[(0,i._)("ul",P,[!e.sea.key&&e.menusLately.length>0?((0,i.wg)(!0),(0,i.iD)(i.HY,{key:0},(0,i.Ko)(e.menusLately,((t,s)=>((0,i.wg)(),(0,i.iD)("li",{key:s,onClick:s=>e.menusClick(t.pos)},(0,a.zw)(t.label),9,L)))),128)):((0,i.wg)(!0),(0,i.iD)(i.HY,{key:1},(0,i.Ko)(e.sea.list,((t,s)=>(0,i.wy)(((0,i.wg)(),(0,i.iD)("li",{key:s,onClick:s=>e.menusClick(t.value)},(0,a.zw)(t.label),9,A)),[[n.F8,t.show]]))),128)),e.sea.isData?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("li",D))])])])]),(0,i._)("div",T,[j,(0,i._)("div",F,[O,(0,i._)("div",N,[(0,i._)("div",z,[(0,i._)("h2",U,(0,a.zw)(e.state.uInfo.nickname||"会员昵称"),1),(0,i._)("p",null,"账号: "+(0,a.zw)(e.state.uInfo.uname)+" ID:"+(0,a.zw)(e.state.uInfo.uid),1)]),(0,i._)("ul",B,[(0,i._)("li",{onClick:t[6]||(t[6]=t=>e.menusClick([0],"/UserInfo"))},"基本信息"),(0,i._)("li",{onClick:t[7]||(t[7]=t=>e.menusClick([0],"/UserPasswd"))},"修改密码")]),(0,i._)("div",{class:"logout",onClick:t[8]||(t[8]=t=>e.logout())},"退出登录")])])])]),(0,i._)("div",H,[(0,i._)("div",$,[(0,i._)("div",W,[(0,i._)("ul",E,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.state.menus,((s,o)=>((0,i.wg)(),(0,i.iD)("li",{class:(0,a.C_)(["m1",e.menusPos[0]==o?"active":""]),key:o},[(0,i._)("div",{class:"flex_left",onClick:t[9]||(t[9]=t=>e.sea.show=!e.sea.show)},[(0,i._)("span",M,[(0,i._)("i",{class:(0,a.C_)(s.icon)},null,2)]),(0,i._)("span",q,(0,a.zw)(s.label),1)]),(0,i.wy)((0,i._)("div",J,[0==o?((0,i.wg)(),(0,i.iD)("ul",R,[Y,((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.menusLately,((t,s)=>((0,i.wg)(),(0,i.iD)("li",{key:s,onClick:s=>e.menusClick(t.pos)},(0,a.zw)(t.label),9,K)))),128)),V,(0,i._)("li",{onClick:t[10]||(t[10]=t=>e.menusClick([0,0,0]))},"工作台"),(0,i._)("li",{onClick:t[11]||(t[11]=t=>e.menusClick([0],"/UserInfo"))},"基本信息"),(0,i._)("li",{onClick:t[12]||(t[12]=t=>e.menusClick([0],"/UserPasswd"))},"修改密码")])):s.children?((0,i.wg)(),(0,i.iD)("ul",G,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(s.children,((t,s)=>((0,i.wg)(),(0,i.iD)(i.HY,{key:s},[(0,i._)("li",Q,(0,a.zw)(t.label),1),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(t.children,((t,n)=>((0,i.wg)(),(0,i.iD)("li",{key:n,class:(0,a.C_)(e.menusPos[0]==o&&e.menusPos[1]==s&&e.menusPos[2]==n?"active":""),onClick:t=>e.menusClick([o,s,n])},(0,a.zw)(t.label),11,X)))),128))],64)))),128))])):(0,i.kq)("",!0)],512),[[n.F8,e.sea.show]])],2)))),128))])]),(0,i._)("div",ee,"© "+(0,a.zw)(e.info.version),1)]),(0,i._)("div",te,[(0,i.Wm)(le,null,{default:(0,i.w5)((({Component:t})=>[(0,i.Wm)(n.uT,{name:e.transitionName},{default:(0,i.w5)((()=>[((0,i.wg)(),(0,i.j4)(i.Ob,{include:e.state.keepAlive},[((0,i.wg)(),(0,i.j4)((0,i.LL)(t),{class:"view"}))],1032,["include"]))])),_:2},1032,["name"])])),_:1})])])],512),[[n.F8,!0===e.state.isLogin]])])}s(7658),s(541);var ne=s(3907),ie=s(7830),ae=s(6492),oe=s(2367),le=s(5783),re=(e=1)=>{Qe.$router.goBack(-e)},ue=e=>{document.addEventListener("plusready",e,!1)},ce=e=>{try{const t=plus.webview.currentWebview();plus.key.addEventListener("backbutton",(()=>{t.canBack(e)}))}catch(t){return(0,ae.Z)("Android返回键")}},de=(e,t,s=!1)=>{ie.Z.msg.browser&&window.Notification&&"denied"!==Notification.permission&&Notification.requestPermission((function(s){new Notification(e,{body:t})}));const n="title"==ie.Z.msg.content?e:t;if((0,ae.Z)(n),!s)return;const i=oe.Z.getItem("token")||"";if(!i)return(0,ae.Z)("请先登录!");(0,le.Z)("Usermain/baiduAudio",{token:i,text:n},(e=>{const t=e.data;if(0!=t.code)return(0,ae.Z)(t.msg);const s=new Audio;s.src=t.url;try{if("iOS"==plus.os.name){let e=plus.ios.importClass("AVAudioSession"),t=e.sharedInstance();t.setCategoryerror("AVAudioSessionCategoryPlayback",null),t.setActiveerror("YES",null);let s=plus.ios.importClass("AVSpeechSynthesizer"),i=plus.ios.importClass("AVSpeechUtterance"),a=plus.ios.import("AVSpeechSynthesisVoice"),o=new s,l=a.voiceWithLanguage("zh-CN"),r=i.speechUtteranceWithString(n);r.setVoice(l),o.speakUtterance(r)}else s.play()}catch(i){s.play()}}))},pe={router(e,t){"msg"==t.type?this.msg(e,t):"notify"==t.type&&this.notify(e,t)},msg(e,t){const s=oe.Z.getItem("voice");de(t.data.title,t.data.content,!!s)},notify(e,t){console.log(e,t)}};const he=null,me=null,ge=null;var fe={state:he,socketInterval:me,heartbeatInterval:ge,start(){this.state=Qe.$store.state,clearInterval(this.socketInterval),this.socketInterval=setInterval((()=>{!this.state.isLogin||this.state.socket&&1==this.state.socket.readyState||this.start()}),ie.Z.socket.time);const e=oe.Z.getItem("token");if(!e)return!1;ie.Z.socket.start&&this.socketOpen(e)},socketOpen(e){this.state.socket=new WebSocket(ie.Z.socket.server+"?type="+ie.Z.socket.type+"&token="+e),this.state.socket.onopen=()=>{console.log("Socket开启"),clearInterval(this.heartbeatInterval),this.heartbeatInterval=setInterval((()=>{try{this.state.socket.send(JSON.stringify({type:""}))}catch(e){this._closeMsg()}}),ie.Z.socket.heartbeat)},this.state.socket.onclose=()=>{console.log("Socket关闭"),this._closeMsg()},this.state.socket.onmessage=e=>{const t=JSON.parse(e.data);if(0!=t.code)return(0,ae.Z)(t.msg);pe.router(this.state.socket,t)}},_closeMsg(){this.state.socket&&(this.state.socket.close(),this.state.socket=null)}};const ve=null,ye=null;var be={state:ve,tokenInterval:ye,init(){this.state=Qe.$store.state,this.setSize(),window.onresize=()=>{this.setSize()},this.setApp(),ie.Z.login.start&&(this.tokenState(1),clearInterval(this.tokenInterval),this.tokenInterval=setInterval((()=>{this.tokenState(0)}),ie.Z.login.time)),ie.Z.socket.start&&fe.start()},setSize(){this.state.width=document.body.offsetWidth,this.state.height=document.body.offsetHeight},tokenState(e){const t=oe.Z.getItem("token");t?(0,le.Z)(ie.Z.login.api,{token:t,uinfo:e},(e=>{const t=e.data;0==t.code?(this.state.isLogin=!0,t[ie.Z.login.uinfo]&&(this.state.uInfo=t[ie.Z.login.uinfo])):((0,ae.Z)(t.msg),this.logout())}),(()=>{(0,ae.Z)("请检测网络!")})):this.logout()},logout(){this.state.isLogin=!1,this.state.uInfo={},oe.Z.setItem("token",""),ie.Z.socket.start&&this.state.socket&&this.state.socket.close()},setApp(){ue((()=>{plus.screen.lockOrientation("portrait-primary"),plus.navigator.setStatusBarStyle("dark"),plus.navigator.setStatusBarBackground("#FFFFFF"),this.state.statusHeight=plus.navigator.getStatusbarHeight(),setTimeout((()=>{plus.navigator.closeSplashscreen()}),300),document.addEventListener("uistylechange",(()=>{this.state.mode=plus.navigator.getUiStyle()}),!1);let e=0;ce((t=>{t.canBack?(this.state.scan&&this.state.scan.close(),re(1)):(e>0&&plus.runtime.quit(),(0,ae.Z)("再按一次退出应用!"),e++,setTimeout((()=>{e=0}),2e3))}))}))}},we=s(8907),_e=s(929),ke=s(760),Ce=s(8549),Se=s(9269);const Ze={class:"wm-popover"},Ie={key:0,class:"wm-popover_top_body"},xe={class:"wm-popover_top"},Pe={class:"tip_body"},Le={key:1,class:"wm-popover_bottom_body"},Ae={class:"wm-popover_bottom"},De={class:"tip_body"},Te={key:2,class:"wm-popover_left_body"},je={class:"wm-popover_left"},Fe={class:"tip_body"},Oe={key:3,class:"wm-popover_right_body"},Ne={class:"wm-popover_right"},ze={class:"tip_body"};function Ue(e,t,s,n,o,l){return(0,i.wg)(),(0,i.iD)("div",Ze,["top"==e.type?((0,i.wg)(),(0,i.iD)("div",Ie,[(0,i._)("div",xe,[(0,i._)("div",Pe,[(0,i._)("div",{class:(0,a.C_)(["tip","tip_"+e.effect])},[(0,i._)("div",{style:(0,a.j5)({width:e.width})},[(0,i.WI)(e.$slots,"body",{},void 0,!0)],4)],2)]),(0,i._)("div",{class:(0,a.C_)(["arrow","arrow_"+e.effect])},null,2)]),(0,i.WI)(e.$slots,"reference",{},void 0,!0)])):(0,i.kq)("",!0),"bottom"==e.type?((0,i.wg)(),(0,i.iD)("div",Le,[(0,i.WI)(e.$slots,"reference",{},void 0,!0),(0,i._)("div",Ae,[(0,i._)("div",{class:(0,a.C_)(["arrow","arrow_"+e.effect])},null,2),(0,i._)("div",De,[(0,i._)("div",{class:(0,a.C_)(["tip","tip_"+e.effect])},[(0,i._)("div",{style:(0,a.j5)({width:e.width})},[(0,i.WI)(e.$slots,"body",{},void 0,!0)],4)],2)])])])):(0,i.kq)("",!0),"left"==e.type?((0,i.wg)(),(0,i.iD)("div",Te,[(0,i._)("div",je,[(0,i._)("div",{class:(0,a.C_)(["arrow","arrow_"+e.effect])},null,2),(0,i._)("div",Fe,[(0,i._)("div",{class:(0,a.C_)(["tip","tip_"+e.effect])},[(0,i._)("div",{style:(0,a.j5)({width:e.width})},[(0,i.WI)(e.$slots,"body",{},void 0,!0)],4)],2)])]),(0,i.WI)(e.$slots,"reference",{},void 0,!0)])):(0,i.kq)("",!0),"right"==e.type?((0,i.wg)(),(0,i.iD)("div",Oe,[(0,i.WI)(e.$slots,"reference",{},void 0,!0),(0,i._)("div",Ne,[(0,i._)("div",{class:(0,a.C_)(["arrow","arrow_"+e.effect])},null,2),(0,i._)("div",ze,[(0,i._)("div",{class:(0,a.C_)(["tip","tip_"+e.effect])},[(0,i._)("div",{style:(0,a.j5)({width:e.width})},[(0,i.WI)(e.$slots,"body",{},void 0,!0)],4)],2)])])])):(0,i.kq)("",!0)])}var Be=(0,i.aZ)({name:"Popover",props:{type:{type:String,default:"top"},width:{type:String,default:"160px"},effect:{type:String,default:"plain"}}}),He=s(3744);const $e=(0,He.Z)(Be,[["render",Ue],["__scopeId","data-v-f19ef02a"]]);var We=$e,Ee=(0,i.aZ)({name:"APP",components:{wmInput:Ce.Z,wmButton:Se.Z,wmPopover:We},data(){const e=(0,ne.oR)(),t=e.state,s=this.$router,n="",i={title:ie.Z.title,version:ie.Z.version,copy:ie.Z.copy},a={uname:"",passwd:"",subText:"登 录",dis:!1},o={show:!1,key:"",isData:!0,list:[]},l=[0,0,0],r=[],u=[],c={num:0,list:[{name:"php",val:"PHP( 8.1.7 )"},{name:"phalcon",val:"PHP( Phalcon4 )"},{name:"python",val:"Python3( Flask )"},{name:"java",val:"Java( SpringBoot )"},{name:"go",val:"GoLang( Gin )"}]};return{state:t,router:s,transitionName:n,info:i,login:a,menusChildren:r,sea:o,menusPos:l,menusLately:u,language:c}},watch:{$route(e,t){"/"==e.path&&"/"==t.path||(this.transitionName=this.router.isBack?"slide-right":"slide-left",this.router.isBack=!1)},isLogin(e){e||(this.login.passwd="")}},computed:{mode(){return this.state.mode},isLogin(){return this.state.isLogin}},mounted(){setTimeout((()=>{be.init()}),400),this.login.uname=oe.Z.getItem("uname"),this._enter(),oe.Z.getItem("token")&&(this.getMenus(),this.menusSetLately()),this.setLanguage()},methods:{Language(e){let t=this.language.list[e];t.index=e,oe.Z.setItem("language",JSON.stringify(t)),window.location.href=""},setLanguage(){const e=oe.Z.getItem("language"),t=e?JSON.parse(e):this.language.list[0];this.language.num=t.index||0},loginSub(){let e=this.login.uname,t=this.login.passwd,s=(0,_e.Z)("passwd",t);if(!0!==(0,_e.Z)("uname",e)&&!0!==(0,_e.Z)("email",e)&&!0!==(0,_e.Z)("tel",e))return(0,ae.Z)("请输入手机号码");if(!0!==s)return(0,ae.Z)(s);this.login.subText="正在登录",this.login.dis=!0;const n=(0,we.Z)();(0,le.Z)("user/login",{uname:e,passwd:t},(e=>{n.clear(),this.login.subText="登 录",this.login.dis=!1;const t=e.data;0==t.code?(this.state.isLogin=!0,this.state.uInfo=t.uinfo,oe.Z.setItem("token",t.token),oe.Z.setItem("uname",t.uinfo.uname),oe.Z.setItem("uinfo",JSON.stringify(t.uinfo)),oe.Z.removeItem("menusPos"),this.getMenus(),this.menusSetLately(),this.$router.replace({path:"/refresh"})):(this.state.isLogin=!1,this.state.uInfo={},oe.Z.setItem("token",""),(0,ae.Z)(t.msg))}),(()=>{n.clear(),(0,ae.Z)("网络加载失败!"),this.login.subText="登 录",this.login.dis=!1}))},logout(){this.state.isLogin=!1,this.state.uInfo={},oe.Z.setItem("token",""),ie.Z.socket.start&&this.state.socket&&this.state.socket.close()},_enter(){document.onkeydown=e=>{let t=e||window.event||arguments.callee.caller.arguments[0];t&&13==t.keyCode&&!this.state.isLogin&&this.loginSub()}},getMenus(){(0,le.Z)("sys_menus/getMenusPerm",{token:oe.Z.getItem("token")},(e=>{let t=e.data;if(0==t.code){this.state.menus=t.menus;let e=[],s=oe.Z.getItem("menusPos");e=s?JSON.parse(s):this.menusPos,this.menusClick(e);let n=[];for(let t in this.state.menus)if(this.state.menus[t].children)for(let e in this.state.menus[t].children)if(this.state.menus[t].children[e].children)for(let s in this.state.menus[t].children[e].children){let i=this.state.menus[t].children[e].children[s];n.push({label:i.label,en:i.en,value:[t,e,s],show:!0})}this.sea.list=n}}),(()=>{this.logout()}))},menusClick(e,t="/"){if(this.menusPos=e,oe.Z.setItem("menusPos",JSON.stringify(e)),this.menusChildren=this.state.menus[e[0]].children||[],this.state.menuTitle[0]=this.state.menus[e[0]].label,0==e[0])return(0,ke.Z)(t);if(!this.menusChildren[e[1]]||!this.menusChildren[e[1]].children)return;let s=this.menusChildren[e[1]].children[e[2]];this.state.menuAction=s.value.action,this.state.menuTitle[1]=this.menusChildren[e[1]].label,this.state.menuTitle[2]=s.label,this.sea.show=!1,this.menusSetLately({label:s.label,pos:e}),(0,ke.Z)(s.value.url)},menusSetLately(e=null){let t=oe.Z.getItem("menusLately");if(t=t?JSON.parse(t):[],e){for(let s in t)(JSON.stringify(t[s])==JSON.stringify(e)||parseInt(s)>=9)&&t.splice(s,1);t.unshift(e),oe.Z.setItem("menusLately",JSON.stringify(t))}this.menusLately=t},seaInput(){const e=new RegExp(this.sea.key.toLowerCase());let t,s,n=!1,i=!1;for(let a in this.sea.list)t=this.sea.list[a].label.toLowerCase(),s=this.sea.list[a].en.toLowerCase(),i=e.test(t)||e.test(s),this.sea.list[a].show=i,i&&(n=i);this.sea.isData=n}}});const Me=(0,He.Z)(Ee,[["render",se],["__scopeId","data-v-6d5290ce"]]);var qe=Me,Je=s(2201);const Re=[{path:"/",name:"home",component:()=>s.e(686).then(s.bind(s,7686))},{path:"/refresh",name:"Refresh",component:()=>s.e(720).then(s.bind(s,4720))},{path:"/demo",name:"Demo",meta:{keepAlive:!1},component:()=>s.e(409).then(s.bind(s,9409))},{path:"/UserInfo",name:"UserInfo",component:()=>s.e(266).then(s.bind(s,5266))},{path:"/UserPasswd",name:"UserPasswd",component:()=>s.e(644).then(s.bind(s,3644))},{path:"/SysFileManage",name:"SysFileManage",component:()=>Promise.all([s.e(651),s.e(52)]).then(s.bind(s,180))},{path:"/SysUser",name:"SysUser",component:()=>Promise.all([s.e(651),s.e(567),s.e(429)]).then(s.bind(s,9846))},{path:"/SysRole",name:"SysRole",component:()=>Promise.all([s.e(651),s.e(567),s.e(790)]).then(s.bind(s,2830))},{path:"/SysMenus",name:"SysMenus",component:()=>Promise.all([s.e(651),s.e(567),s.e(565),s.e(67)]).then(s.bind(s,603))},{path:"/ApiMenus",name:"ApiMenus",component:()=>Promise.all([s.e(651),s.e(567),s.e(122)]).then(s.bind(s,7205))},{path:"/ApiRole",name:"ApiRole",component:()=>Promise.all([s.e(651),s.e(567),s.e(250)]).then(s.bind(s,5838))},{path:"/SysConfig",name:"SysConfig",component:()=>Promise.all([s.e(29),s.e(565),s.e(907)]).then(s.bind(s,7532))},{path:"/SysHelp",name:"SysHelp",component:()=>s.e(437).then(s.bind(s,3437))},{path:"/News",name:"News",component:()=>Promise.all([s.e(651),s.e(567),s.e(29),s.e(288)]).then(s.bind(s,8461))},{path:"/NewsClass",name:"NewsClass",component:()=>Promise.all([s.e(651),s.e(567),s.e(764)]).then(s.bind(s,112))}],Ye=(0,Je.p7)({history:(0,Je.PO)("/"),routes:Re});Ye.goBack=function(e){this.isBack=!0,this.go(e)};var Ke=Ye,Ve=(0,ne.MT)({state:{mode:"light",width:0,height:0,statusHeight:0,scan:null,isLogin:"",uInfo:{},system:{},geolocation:{},socket:null,menus:[],menuAction:[],menuTitle:[],keepAlive:["Home"]},getters:{actionShow:e=>t=>{let s=!1;return e.menuAction.map((e=>{e["action"]==t&&(s=!0)})),s}},mutations:{},actions:{},modules:{}});document.body.ontouchstart=()=>{try{"iOS"!=plus.os.name&&document.createElement("audio")}catch(e){document.createElement("audio")}};const Ge=(0,n.ri)(qe).use(Ve).use(Ke).mount("#app");var Qe=Ge},9269:function(e,t,s){s.d(t,{Z:function(){return c}});var n=s(6252),i=s(3577);const a=["disabled"];function o(e,t,s,o,l,r){return(0,n.wg)(),(0,n.iD)("button",{class:(0,i.C_)(["wm-button",e.effect+"_"+e.type]),style:(0,i.j5)({width:e.icon?e.height:e.width,height:e.height,lineHeight:"calc("+e.height+" - 2px)",padding:e.icon?"0":e.padding,margin:e.margin,borderRadius:e.radius}),disabled:e.disabled},[e.icon?((0,n.wg)(),(0,n.iD)("i",{key:0,class:(0,i.C_)(e.icon)},null,2)):(0,n.kq)("",!0),(0,n.WI)(e.$slots,"default",{},void 0,!0)],14,a)}var l=(0,n.aZ)({name:"Botton",props:{effect:{type:String,default:"dark"},type:{type:String,default:"default"},width:{type:String,default:"auto"},height:{type:String,default:"32px"},padding:{type:String,default:"0 20px"},margin:{type:String,default:"0 4px"},radius:{type:String,default:"2px"},icon:{type:String,default:""},disabled:{type:Boolean,default:!1}}}),r=s(3744);const u=(0,r.Z)(l,[["render",o],["__scopeId","data-v-76834c74"]]);var c=u},8549:function(e,t,s){s.d(t,{Z:function(){return h}});var n=s(6252),i=s(3577),a=s(9963);const o={key:0,class:"wm-input_clear_body"},l=["value","maxlength","minlength","placeholder","disabled","readonly"],r=["value","type","maxlength","minlength","placeholder","disabled","readonly"];function u(e,t,s,u,c,d){return(0,n.wg)(),(0,n.iD)("div",{class:"wm-input_body",style:(0,i.j5)({width:e.width,maxWidth:e.maxWidth})},[e.value&&e.clearable?((0,n.wg)(),(0,n.iD)("div",o,[(0,n._)("span",{class:"wm-input_clear",onClick:t[0]||(t[0]=(0,a.iM)((t=>e.$emit("update:value","")),["stop"]))})])):(0,n.kq)("",!0),e.bottonText?((0,n.wg)(),(0,n.iD)("div",{key:1,class:"wm-input_botton",onClick:t[1]||(t[1]=(0,a.iM)((t=>e.$emit("update:bottom",!0)),["stop"]))},(0,i.zw)(e.bottonText),1)):(0,n.kq)("",!0),"textarea"==e.type?((0,n.wg)(),(0,n.iD)("textarea",{key:2,class:"wm-input",value:e.value,maxlength:e.maxlength,minlength:e.minlength,placeholder:e.placeholder,style:(0,i.j5)({height:e.height,lineHeight:"calc("+e.lineHeight+" - 2px)",padding:e.padding,textAlign:e.align,borderRadius:e.borderRadius,backgroundColor:e.bgColor}),disabled:e.disabled,readonly:e.readonly,onInput:t[2]||(t[2]=t=>e.$emit("update:value",t.target.value))},null,44,l)):((0,n.wg)(),(0,n.iD)("input",{key:3,class:"wm-input",value:e.value,type:e.type,maxlength:e.maxlength,minlength:e.minlength,placeholder:e.placeholder,style:(0,i.j5)({height:e.height,lineHeight:"calc("+e.lineHeight+" - 2px)",padding:e.padding,textAlign:e.align,borderRadius:e.borderRadius,backgroundColor:e.bgColor}),disabled:e.disabled,readonly:e.readonly,onInput:t[3]||(t[3]=t=>e.$emit("update:value",t.target.value))},null,44,r))],4)}var c=(0,n.aZ)({name:"Input",props:{value:{default:""},type:{type:String,default:"text"},maxlength:{type:String,default:""},minlength:{type:String,default:""},placeholder:{type:String,default:"请输入"},width:{type:String,default:"100%"},maxWidth:{type:String,default:"auto"},height:{type:String,default:"32px"},lineHeight:{type:String,default:"20px"},padding:{type:String,default:"10px 10px"},align:{type:String,default:""},borderRadius:{type:String,default:"4px"},bgColor:{type:String,default:""},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},clearable:{type:Boolean,default:!1},bottonText:{type:String,default:""}},mounted(){},methods:{}}),d=s(3744);const p=(0,d.Z)(c,[["render",u],["__scopeId","data-v-c252a1ae"]]);var h=p},9574:function(e,t,s){e.exports=s.p+"img/logo.a84da44e.svg"},5917:function(e,t,s){e.exports=s.p+"img/bg.b483ae4c.jpg"}},t={};function s(n){var i=t[n];if(void 0!==i)return i.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,s),a.exports}s.m=e,function(){var e=[];s.O=function(t,n,i,a){if(!n){var o=1/0;for(c=0;c<e.length;c++){n=e[c][0],i=e[c][1],a=e[c][2];for(var l=!0,r=0;r<n.length;r++)(!1&a||o>=a)&&Object.keys(s.O).every((function(e){return s.O[e](n[r])}))?n.splice(r--,1):(l=!1,a<o&&(o=a));if(l){e.splice(c--,1);var u=i();void 0!==u&&(t=u)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[n,i,a]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){s.f={},s.e=function(e){return Promise.all(Object.keys(s.f).reduce((function(t,n){return s.f[n](e,t),t}),[]))}}(),function(){s.u=function(e){return"js/"+e+"."+{29:"5d0fae49",52:"6b0e0cbc",67:"0ef6feae",122:"d193516f",250:"13966fef",266:"e6f36e36",288:"7d7f852b",409:"b38c8592",429:"1abb82de",437:"67eab53d",565:"8781eccd",567:"d77ba464",644:"93a5a6dc",651:"9e929dd7",686:"2dd0df0d",720:"87aae5a9",764:"5a394f6d",790:"e2b6bfc3",907:"95df7a22"}[e]+".js"}}(),function(){s.miniCssF=function(e){return"css/"+e+"."+{52:"e0ed875d",67:"f4899c4c",122:"24ae4629",250:"205055c8",266:"78f97c62",288:"34398b8d",409:"df9cb539",429:"41adba8b",437:"2b85a9dc",644:"352f8543",686:"640fc876",764:"1893991f",790:"205055c8",907:"65cfe160"}[e]+".css"}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="webmis-vue:";s.l=function(n,i,a,o){if(e[n])e[n].push(i);else{var l,r;if(void 0!==a)for(var u=document.getElementsByTagName("script"),c=0;c<u.length;c++){var d=u[c];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==t+a){l=d;break}}l||(r=!0,l=document.createElement("script"),l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.setAttribute("data-webpack",t+a),l.src=n),e[n]=[i];var p=function(t,s){l.onerror=l.onload=null,clearTimeout(h);var i=e[n];if(delete e[n],l.parentNode&&l.parentNode.removeChild(l),i&&i.forEach((function(e){return e(s)})),t)return t(s)},h=setTimeout(p.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=p.bind(null,l.onerror),l.onload=p.bind(null,l.onload),r&&document.head.appendChild(l)}}}(),function(){s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){s.p="/"}(),function(){var e=function(e,t,s,n){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css";var a=function(a){if(i.onerror=i.onload=null,"load"===a.type)s();else{var o=a&&("load"===a.type?"missing":a.type),l=a&&a.target&&a.target.href||t,r=new Error("Loading CSS chunk "+e+" failed.\n("+l+")");r.code="CSS_CHUNK_LOAD_FAILED",r.type=o,r.request=l,i.parentNode.removeChild(i),n(r)}};return i.onerror=i.onload=a,i.href=t,document.head.appendChild(i),i},t=function(e,t){for(var s=document.getElementsByTagName("link"),n=0;n<s.length;n++){var i=s[n],a=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(a===e||a===t))return i}var o=document.getElementsByTagName("style");for(n=0;n<o.length;n++){i=o[n],a=i.getAttribute("data-href");if(a===e||a===t)return i}},n=function(n){return new Promise((function(i,a){var o=s.miniCssF(n),l=s.p+o;if(t(o,l))return i();e(n,l,i,a)}))},i={143:0};s.f.miniCss=function(e,t){var s={52:1,67:1,122:1,250:1,266:1,288:1,409:1,429:1,437:1,644:1,686:1,764:1,790:1,907:1};i[e]?t.push(i[e]):0!==i[e]&&s[e]&&t.push(i[e]=n(e).then((function(){i[e]=0}),(function(t){throw delete i[e],t})))}}(),function(){var e={143:0};s.f.j=function(t,n){var i=s.o(e,t)?e[t]:void 0;if(0!==i)if(i)n.push(i[2]);else{var a=new Promise((function(s,n){i=e[t]=[s,n]}));n.push(i[2]=a);var o=s.p+s.u(t),l=new Error,r=function(n){if(s.o(e,t)&&(i=e[t],0!==i&&(e[t]=void 0),i)){var a=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;l.message="Loading chunk "+t+" failed.\n("+a+": "+o+")",l.name="ChunkLoadError",l.type=a,l.request=o,i[1](l)}};s.l(o,r,"chunk-"+t,t)}},s.O.j=function(t){return 0===e[t]};var t=function(t,n){var i,a,o=n[0],l=n[1],r=n[2],u=0;if(o.some((function(t){return 0!==e[t]}))){for(i in l)s.o(l,i)&&(s.m[i]=l[i]);if(r)var c=r(s)}for(t&&t(n);u<o.length;u++)a=o[u],s.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return s.O(c)},n=self["webpackChunkwebmis_vue"]=self["webpackChunkwebmis_vue"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=s.O(void 0,[998],(function(){return s(194)}));n=s.O(n)})();