(self["webpackChunkwebmis_vue"]=self["webpackChunkwebmis_vue"]||[]).push([[899],{1589:function(e,t,a){var n=a(1400),l=a(6244),u=a(6135),r=Array,o=Math.max;e.exports=function(e,t,a){for(var i=l(e),c=n(t,i),s=n(void 0===a?i:a,i),d=r(o(s-c,0)),m=0;c<s;c++,m++)u(d,m,e[c]);return d.length=m,d}},6135:function(e,t,a){"use strict";var n=a(4948),l=a(3070),u=a(9114);e.exports=function(e,t,a){var r=n(t);r in e?l.f(e,r,u(0,a)):e[r]=a}},3111:function(e,t,a){var n=a(1702),l=a(4488),u=a(1340),r=a(1361),o=n("".replace),i="["+r+"]",c=RegExp("^"+i+i+"*"),s=RegExp(i+i+"*$"),d=function(e){return function(t){var a=u(l(t));return 1&e&&(a=o(a,c,"")),2&e&&(a=o(a,s,"")),a}};e.exports={start:d(1),end:d(2),trim:d(3)}},863:function(e,t,a){var n=a(1702);e.exports=n(1..valueOf)},1361:function(e){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},9653:function(e,t,a){"use strict";var n=a(9781),l=a(7854),u=a(1702),r=a(4705),o=a(8052),i=a(2597),c=a(9587),s=a(7976),d=a(2190),m=a(7593),f=a(7293),p=a(8006).f,h=a(1236).f,v=a(3070).f,b=a(863),w=a(3111).trim,g="Number",k=l[g],_=k.prototype,y=l.TypeError,x=u("".slice),Z=u("".charCodeAt),I=function(e){var t=m(e,"number");return"bigint"==typeof t?t:W(t)},W=function(e){var t,a,n,l,u,r,o,i,c=m(e,"number");if(d(c))throw y("Cannot convert a Symbol value to a number");if("string"==typeof c&&c.length>2)if(c=w(c),t=Z(c,0),43===t||45===t){if(a=Z(c,2),88===a||120===a)return NaN}else if(48===t){switch(Z(c,1)){case 66:case 98:n=2,l=49;break;case 79:case 111:n=8,l=55;break;default:return+c}for(u=x(c,2),r=u.length,o=0;o<r;o++)if(i=Z(u,o),i<48||i>l)return NaN;return parseInt(u,n)}return+c};if(r(g,!k(" 0o1")||!k("0b1")||k("+0x1"))){for(var N,C=function(e){var t=arguments.length<1?0:k(I(e)),a=this;return s(_,a)&&f((function(){b(a)}))?c(Object(t),a,C):t},S=n?p(k):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),D=0;S.length>D;D++)i(k,N=S[D])&&!i(C,N)&&v(C,N,h(k,N));C.prototype=_,_.constructor=C,o(l,g,C,{constructor:!0})}},2458:function(e,t,a){"use strict";a.d(t,{Z:function(){return h}});var n=a(6252),l=a(3577),u={class:"wm-checkbox"},r={key:0,class:"disabled"},o=["value"],i={class:"label"},c=["value"],s={class:"label"};function d(e,t,a,d,m,f){var p=this;return(0,n.wg)(),(0,n.iD)("ul",u,[e.disabled?((0,n.wg)(),(0,n.iD)("li",r,[(0,n._)("span",{class:(0,l.C_)(["checked",e.show?"active":""])},[(0,n._)("input",{type:"checkbox",class:"checkbox",value:e.value},null,8,o)],2),(0,n._)("span",i,(0,l.zw)(e.label),1)])):((0,n.wg)(),(0,n.iD)("li",{key:1,class:"enabled",onClick:t[0]||(t[0]=function(t){return e.$emit("update:checked",p.show=!p.show)})},[(0,n._)("span",{class:(0,l.C_)(["checked",e.show?"active":""])},[(0,n._)("input",{type:"checkbox",class:"checkbox",value:e.value},null,8,c)],2),(0,n._)("span",s,(0,l.zw)(e.label),1)]))])}var m=(0,n.aZ)({name:"Checkbox",props:{value:{default:""},label:{type:String,default:""},checked:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},watch:{checked:function(e){this.show=e}},data:function(){var e=!1;return{show:e}},mounted:function(){this.show=this.checked},methods:{}}),f=a(3744);const p=(0,f.Z)(m,[["render",d],["__scopeId","data-v-da8e3fd0"]]);var h=p},6675:function(e,t,a){"use strict";a.d(t,{Z:function(){return c}});var n=a(6252),l={ref:"form"};function u(e,t,a,u,r,o){return(0,n.wg)(),(0,n.iD)("div",l,[(0,n.WI)(e.$slots,"default")],512)}var r=(0,n.aZ)({name:"Form",props:{labelWidth:{type:String,default:"90px"},labelHeight:{type:String,default:"40px"}},mounted:function(){this.init()},methods:{init:function(){for(var e=this.$refs.form,t=e.getElementsByTagName("label"),a=(e.getElementsByClassName("wm-form_item_body"),0);a<t.length;a++)t[a].style.width=this.labelWidth,t[a].style.height=this.labelHeight}}}),o=a(3744);const i=(0,o.Z)(r,[["render",u]]);var c=i},7685:function(e,t,a){"use strict";a.d(t,{Z:function(){return c}});var n=a(6252),l=a(3577);function u(e,t,a,u,r,o){return(0,n.wg)(),(0,n.iD)("div",{class:"wm-form_item",style:(0,l.j5)({margin:e.margin})},["none"!=e.label?((0,n.wg)(),(0,n.iD)("label",{key:0,class:"wm-form_item_label",style:(0,l.j5)({height:e.height})},(0,l.zw)(e.label),5)):(0,n.kq)("",!0),(0,n._)("div",{class:"wm-form_item_body",style:(0,l.j5)({height:e.height})},[(0,n.WI)(e.$slots,"default",{},void 0,!0)],4)],4)}var r=(0,n.aZ)({name:"FormItem",props:{type:{type:String,default:"label"},label:{type:String,default:""},height:{type:String,default:"40px"}},data:function(){var e="";return{margin:e}},mounted:function(){"label"==this.type?this.margin="8px 0":"botton"==this.type&&(this.margin="24px 0")}}),o=a(3744);const i=(0,o.Z)(r,[["render",u],["__scopeId","data-v-20c2801c"]]);var c=i},4395:function(e,t,a){"use strict";a.d(t,{Z:function(){return h}});var n=a(6252),l=a(3577),u=a(9963),r={class:"wm-radio"},o={key:0,class:"disabled"},i={class:"label"},c=["onClick"],s={class:"label"};function d(e,t,a,d,m,f){return(0,n.wg)(),(0,n.iD)("ul",r,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.data,(function(t,a){return(0,n.wg)(),(0,n.iD)(n.HY,{key:a},[t.disabled?((0,n.wg)(),(0,n.iD)("li",o,[(0,n._)("span",{class:(0,l.C_)(["checked",t.value==e.value?"active":""])},null,2),(0,n._)("span",i,(0,l.zw)(t.label),1)])):((0,n.wg)(),(0,n.iD)("li",{key:1,class:"enabled",onClick:(0,u.iM)((function(a){return e.$emit("update:value",t.value)}),["stop"])},[(0,n._)("span",{class:(0,l.C_)(["checked",t.value==e.value?"active":""])},null,2),(0,n._)("span",s,(0,l.zw)(t.label),1)],8,c))],64)})),128))])}var m=(0,n.aZ)({name:"Radio",props:{value:{default:""},data:{type:Array,default:[]}},methods:{}}),f=a(3744);const p=(0,f.Z)(m,[["render",d],["__scopeId","data-v-48bf10dd"]]);var h=p},6448:function(e,t,a){"use strict";a.d(t,{Z:function(){return c}});var n=a(6252),l=a(3577);function u(e,t,a,u,r,o){return(0,n.wg)(),(0,n.iD)("div",{class:"wm-main",style:(0,l.j5)({width:"calc(100% - "+2*e.padding+"px)",height:"calc(100% - "+2*e.padding+"px)",padding:e.padding+"px"})},[(0,n.WI)(e.$slots,"default",{},void 0,!0)],4)}a(9653);var r=(0,n.aZ)({name:"Main",props:{padding:{type:Number,default:10}}}),o=a(3744);const i=(0,o.Z)(r,[["render",u],["__scopeId","data-v-52e76285"]]);var c=i},1270:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return U}});var n=a(6252),l=(0,n.Uk)("保存设置");function u(e,t,a,u,r,o){var i=(0,n.up)("wm-img"),c=(0,n.up)("wm-img-upload"),s=(0,n.up)("wm-form-item"),d=(0,n.up)("wm-input"),m=(0,n.up)("wm-select"),f=(0,n.up)("wm-cascader"),p=(0,n.up)("wm-radio"),h=(0,n.up)("wm-checkbox-group"),v=(0,n.up)("wm-switch"),b=(0,n.up)("wm-tinymce"),w=(0,n.up)("wm-button"),g=(0,n.up)("wm-form"),k=(0,n.up)("wm-main");return(0,n.wg)(),(0,n.j4)(k,null,{default:(0,n.w5)((function(){return[(0,n.Wm)(g,null,{default:(0,n.w5)((function(){return[(0,n.Wm)(s,{label:"Upload",height:"auto"},{default:(0,n.w5)((function(){return[(0,n.Wm)(c,{width:200,height:200,url:e.upload.url,param:e.upload.param,onUpload:t[0]||(t[0]=function(t){return e.upImg(t,"logo")})},{default:(0,n.w5)((function(){return[(0,n.Wm)(i,{width:"80px",height:"80px",radius:"50%",url:e.form.logo},null,8,["url"])]})),_:1},8,["url","param"])]})),_:1}),(0,n.Wm)(s,{label:"Input"},{default:(0,n.w5)((function(){return[(0,n.Wm)(d,{value:e.form.input,"onUpdate:value":t[1]||(t[1]=function(t){return e.form.input=t}),width:"240px",clearable:""},null,8,["value"])]})),_:1}),(0,n.Wm)(s,{label:"Select"},{default:(0,n.w5)((function(){return[(0,n.Wm)(m,{value:e.form.select,"onUpdate:value":t[2]||(t[2]=function(t){return e.form.select=t}),width:"240px",clearable:"",data:e.select},null,8,["value","data"])]})),_:1}),(0,n.Wm)(s,{label:"Cascader"},{default:(0,n.w5)((function(){return[(0,n.Wm)(f,{value:e.form.cascader,width:"240px","onUpdate:value":t[3]||(t[3]=function(t){return e.form.cascader=t}),data:e.cascader,clearable:""},null,8,["value","data"])]})),_:1}),(0,n.Wm)(s,{label:"Radio"},{default:(0,n.w5)((function(){return[(0,n.Wm)(p,{value:e.form.radio,"onUpdate:value":t[4]||(t[4]=function(t){return e.form.radio=t}),data:e.radio},null,8,["value","data"])]})),_:1}),(0,n.Wm)(s,{label:"Checkbox"},{default:(0,n.w5)((function(){return[(0,n.Wm)(h,{value:e.form.checkbox,"onUpdate:value":t[5]||(t[5]=function(t){return e.form.checkbox=t}),data:e.checkbox},null,8,["value","data"])]})),_:1}),(0,n.Wm)(s,{label:"Switch"},{default:(0,n.w5)((function(){return[(0,n.Wm)(v,{value:e.form.switch,"onUpdate:value":t[6]||(t[6]=function(t){return e.form.switch=t})},null,8,["value"])]})),_:1}),(0,n.Wm)(s,{label:"none",height:"auto"},{default:(0,n.w5)((function(){return[(0,n.Wm)(b,{value:e.form.tinymce,"onUpdate:value":t[7]||(t[7]=function(t){return e.form.tinymce=t}),menubar:!0,height:280,upload:e.tinymce.upload},null,8,["value","upload"])]})),_:1}),(0,n.Wm)(s,{type:"botton"},{default:(0,n.w5)((function(){return[(0,n.Wm)(w,{onClick:t[8]||(t[8]=function(t){return e.onSubmit()})},{default:(0,n.w5)((function(){return[l]})),_:1})]})),_:1})]})),_:1})]})),_:1})}a(8862);var r=a(3907),o=a(8907),i=a(6492),c=a(5783),s=a(2367),d=a(6448),m=a(6675),f=a(7685),p=a(3826),h=a(8650),v=a(2021),b=a(5451),w=a(890),g=a(7247),k=a(4395),_={class:"wm-checkbox_group"};function y(e,t,a,l,u,r){var o=(0,n.up)("wm-checkbox");return(0,n.wg)(),(0,n.iD)("ul",_,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.data,(function(t,a){return(0,n.wg)(),(0,n.iD)("li",{key:a},[(0,n.Wm)(o,{label:t.label,checked:t.checked,"onUpdate:checked":function(t){return e.getValue(a,t)},disabled:t.disabled},null,8,["label","checked","onUpdate:checked","disabled"])])})),128))])}var x=a(2458),Z=(0,n.aZ)({name:"CheckboxGroup",components:{wmCheckbox:x.Z},props:{value:{default:[]},data:{type:Array,default:[]}},data:function(){var e=!1;return{show:e}},mounted:function(){this.getValue()},methods:{getValue:function(e,t){var a=[],n=this.data;for(var l in this.data)l==e&&(n[l].checked=t),n[l].checked&&a.push(n[l].value);this.$emit("update:value",a)}}}),I=a(3744);const W=(0,I.Z)(Z,[["render",y],["__scopeId","data-v-77426be2"]]);var N=W,C=a(229),S=a(8288),D=(0,n.aZ)({components:{wmMain:d.Z,wmForm:m.Z,wmFormItem:f.Z,wmInput:p.Z,wmButton:h.Z,wmImg:v.Z,wmImgUpload:b.Z,wmSelect:w.Z,wmCascader:g.Z,wmRadio:k.Z,wmCheckboxGroup:N,wmSwitch:C.Z,wmTinymce:S.Z},data:function(){var e=(0,r.oR)(),t=e.state,a={url:"sys_config/upimg",param:{name:"logo",token:s.Z.getItem("token")}},n={logo:"",input:"",select:"option1",cascader:[],radio:"无",checkbox:[],switch:!0,tinymce:"<b>测试</b>"},l=[{label:"Option1",value:"option1",disabled:!0},{label:"Option2",value:"option2"}],u=[{label:"菜单A",value:"1",children:[{label:"子菜单1",value:"3"},{label:"子菜单2",value:"4"}]},{label:"菜单B",value:"2",disabled:!0}],o=[{label:"男",value:"男"},{label:"女",value:"女"},{label:"无",value:"无",disabled:!0}],i=[{label:"游戏",value:1},{label:"购物",value:2},{label:"其他",value:3,checked:!0,disabled:!0}],c={upload:{url:"/demo/tinymce/upImg",width:640}};return{state:t,upload:a,form:n,select:l,cascader:u,radio:o,checkbox:i,tinymce:c}},mounted:function(){s.Z.getItem("token")&&this.loadData()},methods:{loadData:function(){var e=this,t=(0,o.Z)();(0,c.Z)("sys_config/list",{token:s.Z.getItem("token")},(function(a){t.clear();var n=a.data;if(0!=n.code)return(0,i.Z)(n.msg);setTimeout((function(){e.form.tinymce="<b>测试1</b>",e.form.select="option2",e.form.cascader=[0,1],setTimeout((function(){e.form.tinymce="<b>测试2</b>",setTimeout((function(){e.form.tinymce="<b>测试3</b>"}),1e3)}),1e3)}),3e3)}))},onSubmit:function(){var e=JSON.stringify(this.form);return console.log(e),(0,i.Z)("请查看Console日志记录！")},upImg:function(e,t){return 0==e.code&&(this.form.logo=e.img),(0,i.Z)(e.msg)}}});const E=(0,I.Z)(D,[["render",u]]);var U=E}}]);