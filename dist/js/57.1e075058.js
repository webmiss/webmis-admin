"use strict";(self["webpackChunkwebmis_vue"]=self["webpackChunkwebmis_vue"]||[]).push([[57],{7108:function(e,t,a){a.d(t,{Z:function(){return U}});var l=a(6252),i=a(3577),s=a(9963);const c=e=>((0,l.dD)("data-v-71d1f079"),e=e(),(0,l.Cn)(),e),d={key:0,class:"wm-cascader_clear_body"},r=c((()=>(0,l._)("i",{class:"ui ui_arrow_down"},null,-1))),n=[r],o=["placeholder","value"],h={key:0,class:"wm-cascader_body flex"},u=c((()=>(0,l._)("span",{class:"wm-cascader_arrow"},null,-1))),m=c((()=>(0,l._)("li",null,"暂无数据",-1))),w=[m],p={key:0,class:"wm-cascader_disabled",style:{cursor:"not-allowed"}},k={key:0,class:"ui ui_arrow_right"},g=["onClick"],b={key:0,class:"ui ui_arrow_right"},y={key:0,class:"wm-cascader_disabled",style:{cursor:"not-allowed"}},f={key:0,class:"ui ui_arrow_right"},v=["onClick"],_={key:0,class:"ui ui_arrow_right"},x={key:0,class:"wm-cascader_disabled",style:{cursor:"not-allowed"}},C={key:0,class:"ui ui_arrow_right"},D=["onClick"],Z={key:0,class:"ui ui_arrow_right"},W={key:0,class:"wm-cascader_disabled",style:{cursor:"not-allowed"}},H={key:0,class:"ui ui_arrow_right"},S=["onClick"],I={key:0,class:"ui ui_arrow_right"};function L(e,t,a,c,r,m){return(0,l.wg)(),(0,l.iD)("div",{class:"wm-cascader",style:(0,i.j5)({width:e.width})},[(0,l._)("div",{class:"wm-cascader_input",style:(0,i.j5)({height:e.height,lineHeight:e.height}),onClick:t[1]||(t[1]=t=>e.show=!e.show)},[e.keys.length>0&&e.clearable?((0,l.wg)(),(0,l.iD)("div",d,[(0,l._)("span",{class:"wm-cascader_clear",onClick:t[0]||(t[0]=(0,s.iM)((t=>e.clear()),["stop"]))})])):(0,l.kq)("",!0),(0,l._)("div",{class:"wm-cascader_input_ico",style:(0,i.j5)({transform:e.show?"rotate(-180deg)":"rotate(0deg)"})},n,4),(0,l._)("input",{type:"text",readonly:"",placeholder:e.placeholder,value:e.text,style:(0,i.j5)({borderColor:e.show?"#6FB737":"",boxShadow:e.show?"0 0 4px rgba(0,0,0,.1)":""})},null,12,o)],4),e.show?((0,l.wg)(),(0,l.iD)("div",h,[u,0==e.dataList.length?((0,l.wg)(),(0,l.iD)("ul",{key:0,class:"wm-cascader_list scrollbar",style:(0,i.j5)({width:e.maxWidth,maxHeight:e.maxHeight})},w,4)):((0,l.wg)(),(0,l.iD)("ul",{key:1,class:"wm-cascader_list scrollbar",style:(0,i.j5)({width:e.maxWidth,maxHeight:e.maxHeight})},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.dataList,((t,a)=>((0,l.wg)(),(0,l.iD)(l.HY,{key:a},[t.disabled?((0,l.wg)(),(0,l.iD)("li",p,[(0,l._)("span",null,(0,i.zw)(t.label),1),t.children?((0,l.wg)(),(0,l.iD)("i",k)):(0,l.kq)("",!0)])):((0,l.wg)(),(0,l.iD)("li",{key:1,class:(0,i.C_)(t.checked?"wm-cascader_active":""),onClick:(0,s.iM)((t=>e.selectClick("1",[a,-1,-1,-1])),["stop"])},[(0,l._)("span",null,(0,i.zw)(t.label),1),t.children?((0,l.wg)(),(0,l.iD)("i",b)):(0,l.kq)("",!0)],10,g))],64)))),128))],4)),e.k1>=0&&e.dataList[e.k1].children?((0,l.wg)(),(0,l.iD)("ul",{key:2,class:"wm-cascader_list scrollbar",style:(0,i.j5)({width:e.maxWidth,maxHeight:e.maxHeight})},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.dataList[e.k1].children,((t,a)=>((0,l.wg)(),(0,l.iD)(l.HY,{key:a},[t.disabled?((0,l.wg)(),(0,l.iD)("li",y,[(0,l._)("span",null,(0,i.zw)(t.label),1),t.children?((0,l.wg)(),(0,l.iD)("i",f)):(0,l.kq)("",!0)])):((0,l.wg)(),(0,l.iD)("li",{key:1,class:(0,i.C_)(t.checked?"wm-cascader_active":""),onClick:t=>e.selectClick("2",[e.k1,a,-1,-1])},[(0,l._)("span",null,(0,i.zw)(t.label),1),t.children?((0,l.wg)(),(0,l.iD)("i",_)):(0,l.kq)("",!0)],10,v))],64)))),128))],4)):(0,l.kq)("",!0),e.k2>=0&&e.dataList[e.k1].children[e.k2].children?((0,l.wg)(),(0,l.iD)("ul",{key:3,class:"wm-cascader_list scrollbar",style:(0,i.j5)({width:e.maxWidth,maxHeight:e.maxHeight})},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.dataList[e.k1].children[e.k2].children,((t,a)=>((0,l.wg)(),(0,l.iD)(l.HY,{key:a},[t.disabled?((0,l.wg)(),(0,l.iD)("li",x,[(0,l._)("span",null,(0,i.zw)(t.label),1),t.children?((0,l.wg)(),(0,l.iD)("i",C)):(0,l.kq)("",!0)])):((0,l.wg)(),(0,l.iD)("li",{key:1,class:(0,i.C_)(t.checked?"wm-cascader_active":""),onClick:t=>e.selectClick("3",[e.k1,e.k2,a,-1])},[(0,l._)("span",null,(0,i.zw)(t.label),1),t.children?((0,l.wg)(),(0,l.iD)("i",Z)):(0,l.kq)("",!0)],10,D))],64)))),128))],4)):(0,l.kq)("",!0),e.k3>=0&&e.dataList[e.k1].children[e.k2].children[e.k3].children?((0,l.wg)(),(0,l.iD)("ul",{key:4,class:"wm-cascader_list scrollbar",style:(0,i.j5)({width:e.maxWidth,maxHeight:e.maxHeight})},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.dataList[e.k1].children[e.k2].children[e.k3].children,((t,a)=>((0,l.wg)(),(0,l.iD)(l.HY,{key:a},[t.disabled?((0,l.wg)(),(0,l.iD)("li",W,[(0,l._)("span",null,(0,i.zw)(t.label),1),t.children?((0,l.wg)(),(0,l.iD)("i",H)):(0,l.kq)("",!0)])):((0,l.wg)(),(0,l.iD)("li",{key:1,class:(0,i.C_)(t.checked?"wm-cascader_active":""),onClick:t=>e.selectClick("4",[e.k1,e.k2,e.k3,a])},[(0,l._)("span",null,(0,i.zw)(t.label),1),t.children?((0,l.wg)(),(0,l.iD)("i",I)):(0,l.kq)("",!0)],10,S))],64)))),128))],4)):(0,l.kq)("",!0)])):(0,l.kq)("",!0)],4)}a(7658);var j=(0,l.aZ)({name:"Cascader",props:{keys:{type:Array,default:[]},values:{type:Array,default:[]},data:{type:Array,default:[]},width:{type:String,default:"100%"},height:{type:String,default:"32px"},placeholder:{type:String,default:"请选择"},maxWidth:{type:String,default:"180px"},maxHeight:{type:String,default:"180px"},clearable:{type:Boolean,default:!1},checkStrictly:{type:Boolean,default:!1}},data(){const e=!1,t="",a=null;let l=-1,i=-1,s=-1,c=-1,d={key:[],label:[],value:[]};return{show:e,text:t,dataList:a,k1:l,k2:i,k3:s,k4:c,res:d}},watch:{keys(e){const t=e.length;0==t&&this.selectClear(this.dataList),t>0&&(this.k1=e[0],this.selectChechked(e[0],this.dataList)),t>1&&(this.k2=e[1],this.selectChechked(e[1],this.dataList[e[0]].children)),t>2&&(this.k3=e[2],this.selectChechked(e[2],this.dataList[e[0]].children[e[1]].children)),t>3&&(this.k4=e[3],this.selectChechked(e[3],this.dataList[e[0]].children[e[1]].children[e[2]].children)),this.getValue()},data(e){this.dataList=e}},mounted(){this.dataList=this.data;const e=document.getElementsByClassName("wm-cascader");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(e=>{e.stopPropagation()}));document.addEventListener("click",(()=>{this.show=!1}))},methods:{selectClick(e,t){this.k1=t[0],this.k2=t[1],this.k3=t[2],this.k4=t[3];const a=this.dataList;"1"==e?this.selectRouter(this.k1,a):"2"==e?this.selectRouter(this.k2,a[this.k1].children):"3"==e?this.selectRouter(this.k3,a[this.k1].children[this.k2].children):"4"==e&&this.selectRouter(this.k4,a[this.k1].children[this.k2].children[this.k3].children)},selectRouter(e,t){for(let a in t)a==e?(t[a].checked=!0,this.checkStrictly?t[e].children&&this.selectClear(t[e].children):t[e].children||(this.show=!1),this.getValue(),setTimeout((()=>{this.$emit("update:keys",this.res.key)}),400)):(t[a].checked=!1,t[a].children&&this.selectClear(t[a].children))},selectChechked(e,t){for(let a in t)t[a].checked=a==e},selectClear(e){for(let t in e)e[t].checked=!1,e[t].children&&this.selectClear(e[t].children)},getValue(){this.res={key:[],label:[],value:[]},setTimeout((()=>{this.selectValue(this.dataList),this.text=this.res.label.join("/"),this.$emit("update:labels",this.res.label),this.$emit("update:values",this.res.value)}),200)},selectValue(e){for(let t in e)e[t].checked&&(this.res.key.push(t),this.res.label.push(e[t].label),this.res.value.push(e[t].value)),e[t].children&&this.selectValue(e[t].children)},clear(){this.k1=-1,this.k2=-1,this.k3=-1,this.k4=-1,this.text="",this.$emit("update:value",[]),this.selectClear(this.dataList)}}}),q=a(8118);const z=(0,q.Z)(j,[["render",L],["__scopeId","data-v-71d1f079"]]);var U=z},7356:function(e,t,a){a.d(t,{Z:function(){return p}});var l=a(6252),i=a(3577);const s={class:"wm-checkbox"},c={key:0,class:"disabled"},d=["value"],r={class:"label"},n=["value"],o={class:"label"};function h(e,t,a,h,u,m){return(0,l.wg)(),(0,l.iD)("ul",s,[e.disabled?((0,l.wg)(),(0,l.iD)("li",c,[(0,l._)("span",{class:(0,i.C_)(["checked",e.show?"active":""])},[(0,l._)("input",{type:"checkbox",class:"checkbox",value:e.value},null,8,d)],2),(0,l._)("span",r,(0,i.zw)(e.label),1)])):((0,l.wg)(),(0,l.iD)("li",{key:1,class:"enabled",onClick:t[0]||(t[0]=t=>e.$emit("update:checked",this.show=!this.show))},[(0,l._)("span",{class:(0,i.C_)(["checked",e.show?"active":""])},[(0,l._)("input",{type:"checkbox",class:"checkbox",value:e.value},null,8,n)],2),(0,l._)("span",o,(0,i.zw)(e.label),1)]))])}var u=(0,l.aZ)({name:"Checkbox",props:{value:{default:""},label:{type:String,default:""},checked:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},watch:{checked(e){this.show=e}},data(){const e=!1;return{show:e}},mounted(){this.show=this.checked},methods:{}}),m=a(8118);const w=(0,m.Z)(u,[["render",h],["__scopeId","data-v-41b9d7d9"]]);var p=w},7880:function(e,t,a){a.d(t,{Z:function(){return n}});var l=a(6252);const i={ref:"form"};function s(e,t,a,s,c,d){return(0,l.wg)(),(0,l.iD)("div",i,[(0,l.WI)(e.$slots,"default")],512)}var c=(0,l.aZ)({name:"Form",props:{labelWidth:{type:String,default:"90px"},labelHeight:{type:String,default:"40px"}},mounted(){this.init()},methods:{init(){const e=this.$refs.form,t=e.getElementsByTagName("label");e.getElementsByClassName("wm-form_item_body");for(let a=0;a<t.length;a++)t[a].style.width=this.labelWidth,t[a].style.height=this.labelHeight}}}),d=a(8118);const r=(0,d.Z)(c,[["render",s]]);var n=r},8165:function(e,t,a){a.d(t,{Z:function(){return n}});var l=a(6252),i=a(3577);function s(e,t,a,s,c,d){return(0,l.wg)(),(0,l.iD)("div",{class:"wm-form_item",style:(0,i.j5)({margin:e.margin})},["none"!=e.label?((0,l.wg)(),(0,l.iD)("label",{key:0,class:"wm-form_item_label",style:(0,i.j5)({height:e.height})},(0,i.zw)(e.label),5)):(0,l.kq)("",!0),(0,l._)("div",{class:"wm-form_item_body",style:(0,i.j5)({height:e.height})},[(0,l.WI)(e.$slots,"default",{},void 0,!0)],4)],4)}var c=(0,l.aZ)({name:"FormItem",props:{type:{type:String,default:"label"},label:{type:String,default:""},height:{type:String,default:"40px"}},data(){const e="";return{margin:e}},mounted(){"label"==this.type?this.margin="8px 0":"botton"==this.type&&(this.margin="24px 0")}}),d=a(8118);const r=(0,d.Z)(c,[["render",s],["__scopeId","data-v-20c2801c"]]);var n=r},3371:function(e,t,a){a.d(t,{Z:function(){return p}});var l=a(6252),i=a(3577),s=a(9963);const c={class:"wm-radio"},d={key:0,class:"disabled"},r={class:"label"},n=["onClick"],o={class:"label"};function h(e,t,a,h,u,m){return(0,l.wg)(),(0,l.iD)("ul",c,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.data,((t,a)=>((0,l.wg)(),(0,l.iD)(l.HY,{key:a},[t.disabled?((0,l.wg)(),(0,l.iD)("li",d,[(0,l._)("span",{class:(0,i.C_)(["checked",t.value==e.value?"active":""])},null,2),(0,l._)("span",r,(0,i.zw)(t.label),1)])):((0,l.wg)(),(0,l.iD)("li",{key:1,class:"enabled",onClick:(0,s.iM)((a=>e.$emit("update:value",t.value)),["stop"])},[(0,l._)("span",{class:(0,i.C_)(["checked",t.value==e.value?"active":""])},null,2),(0,l._)("span",o,(0,i.zw)(t.label),1)],8,n))],64)))),128))])}var u=(0,l.aZ)({name:"Radio",props:{value:{default:""},data:{type:Array,default:[]}},methods:{}}),m=a(8118);const w=(0,m.Z)(u,[["render",h],["__scopeId","data-v-48bf10dd"]]);var p=w},2938:function(e,t,a){a.d(t,{Z:function(){return n}});var l=a(6252),i=a(3577);function s(e,t,a,s,c,d){return(0,l.wg)(),(0,l.iD)("div",{class:"wm-main",style:(0,i.j5)({width:"calc(100% - "+2*e.padding+"px)",height:"calc(100% - "+2*e.padding+"px)",padding:e.padding+"px",backgroundColor:e.bgColor})},[(0,l.WI)(e.$slots,"default",{},void 0,!0)],4)}var c=(0,l.aZ)({name:"Main",props:{padding:{type:Number,default:16},bgColor:{type:String,default:"transparent"}}}),d=a(8118);const r=(0,d.Z)(c,[["render",s],["__scopeId","data-v-c0afaaee"]]);var n=r},4617:function(e,t,a){a.r(t),a.d(t,{default:function(){return L}});var l=a(6252);function i(e,t,a,i,s,c){const d=(0,l.up)("wm-img"),r=(0,l.up)("wm-img-upload"),n=(0,l.up)("wm-form-item"),o=(0,l.up)("wm-input"),h=(0,l.up)("wm-select"),u=(0,l.up)("wm-cascader"),m=(0,l.up)("wm-radio"),w=(0,l.up)("wm-checkbox-group"),p=(0,l.up)("wm-switch"),k=(0,l.up)("wm-tinymce"),g=(0,l.up)("wm-button"),b=(0,l.up)("wm-form"),y=(0,l.up)("wm-main");return(0,l.wg)(),(0,l.j4)(y,{bgColor:"#FFF"},{default:(0,l.w5)((()=>[(0,l.Wm)(b,null,{default:(0,l.w5)((()=>[(0,l.Wm)(n,{label:"Upload",height:"auto"},{default:(0,l.w5)((()=>[(0,l.Wm)(r,{width:200,height:200,url:e.upload.url,param:e.upload.param,onUpload:t[0]||(t[0]=t=>e.upImg(t,"logo"))},{default:(0,l.w5)((()=>[(0,l.Wm)(d,{width:"80px",height:"80px",radius:"50%",url:e.form.logo},null,8,["url"])])),_:1},8,["url","param"])])),_:1}),(0,l.Wm)(n,{label:"Input"},{default:(0,l.w5)((()=>[(0,l.Wm)(o,{value:e.form.input,"onUpdate:value":t[1]||(t[1]=t=>e.form.input=t),width:"240px",clearable:""},null,8,["value"])])),_:1}),(0,l.Wm)(n,{label:"Select"},{default:(0,l.w5)((()=>[(0,l.Wm)(h,{value:e.form.select,"onUpdate:value":t[2]||(t[2]=t=>e.form.select=t),width:"240px",multiple:"",clearable:"",data:e.select},null,8,["value","data"])])),_:1}),(0,l.Wm)(n,{label:"Cascader"},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{value:e.form.cascader,width:"240px","onUpdate:value":t[3]||(t[3]=t=>e.form.cascader=t),data:e.cascader,clearable:""},null,8,["value","data"])])),_:1}),(0,l.Wm)(n,{label:"Radio"},{default:(0,l.w5)((()=>[(0,l.Wm)(m,{value:e.form.radio,"onUpdate:value":t[4]||(t[4]=t=>e.form.radio=t),data:e.radio},null,8,["value","data"])])),_:1}),(0,l.Wm)(n,{label:"Checkbox"},{default:(0,l.w5)((()=>[(0,l.Wm)(w,{value:e.form.checkbox,"onUpdate:value":t[5]||(t[5]=t=>e.form.checkbox=t),data:e.checkbox},null,8,["value","data"])])),_:1}),(0,l.Wm)(n,{label:"Switch"},{default:(0,l.w5)((()=>[(0,l.Wm)(p,{value:e.form.switch,"onUpdate:value":t[6]||(t[6]=t=>e.form.switch=t)},null,8,["value"])])),_:1}),(0,l.Wm)(n,{label:"none",height:"auto"},{default:(0,l.w5)((()=>[(0,l.Wm)(k,{value:e.form.tinymce,"onUpdate:value":t[7]||(t[7]=t=>e.form.tinymce=t),menubar:!0,height:280,upload:e.tinymce.upload},null,8,["value","upload"])])),_:1}),(0,l.Wm)(n,{type:"botton"},{default:(0,l.w5)((()=>[(0,l.Wm)(g,{onClick:t[8]||(t[8]=t=>e.onSubmit())},{default:(0,l.w5)((()=>[(0,l.Uk)("保存设置")])),_:1})])),_:1})])),_:1})])),_:1})}var s=a(3907),c=a(4940),d=a(9464),r=a(2260),n=a(5751),o=a(2938),h=a(7880),u=a(8165),m=a(3512),w=a(8306),p=a(9233),k=a(4719),g=a(4507),b=a(7108),y=a(3371),f=a(3577);function v(e,t,a,i,s,c){const d=(0,l.up)("wm-checkbox");return(0,l.wg)(),(0,l.iD)("ul",{class:"wm-checkbox_group",style:(0,f.j5)({margin:e.margin})},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.data,((t,a)=>((0,l.wg)(),(0,l.iD)("li",{key:a,style:(0,f.j5)({width:e.width,height:e.height,lineHeight:e.height})},[(0,l.Wm)(d,{label:t.label,checked:t.checked,"onUpdate:checked":t=>e.getValue(a,t),disabled:t.disabled},null,8,["label","checked","onUpdate:checked","disabled"])],4)))),128))],4)}a(7658);var _=a(7356),x=(0,l.aZ)({name:"CheckboxGroup",components:{wmCheckbox:_.Z},props:{value:{default:[]},data:{type:Array,default:[]},width:{type:String,default:"auto"},height:{type:String,default:"26px"},margin:{type:String,default:"4px 0"}},data(){const e=!1;return{show:e}},watch:{data(e){this.getValue()}},mounted(){this.getValue()},methods:{getValue(e,t){let a=[];const l=this.data;for(let i in this.data)i==e&&(l[i].checked=t),l[i].checked&&a.push(l[i].value);this.$emit("update:value",a)}}}),C=a(8118);const D=(0,C.Z)(x,[["render",v],["__scopeId","data-v-2063ceaf"]]);var Z=D,W=a(9150),H=a(3079),S=(0,l.aZ)({components:{wmMain:o.Z,wmForm:h.Z,wmFormItem:u.Z,wmInput:m.Z,wmButton:w.Z,wmImg:p.Z,wmImgUpload:k.Z,wmSelect:g.Z,wmCascader:b.Z,wmRadio:y.Z,wmCheckboxGroup:Z,wmSwitch:W.Z,wmTinymce:H.Z},data(){const e=(0,s.oR)(),t=e.state,a={url:"sys_config/upimg",param:{name:"logo",token:n.Z.getItem("token")}},l={logo:"",input:"",select:["option1","option3"],cascader:[],radio:"无",checkbox:[],switch:!0,tinymce:"<b>测试</b>"},i=[{label:"Option1",info:"opt1",value:"option1",checked:!0},{label:"Option2",info:"opt2",value:"option2",disabled:!0},{label:"Option3",info:"opt3",value:"option3"}],c=[{label:"菜单A",value:"1",children:[{label:"子菜单1",value:"3"},{label:"子菜单2",value:"4"}]},{label:"菜单B",value:"2",disabled:!0}],d=[{label:"男",value:"男"},{label:"女",value:"女"},{label:"无",value:"无",disabled:!0}],r=[{label:"游戏",value:1},{label:"购物",value:2},{label:"其他",value:3,checked:!0,disabled:!0}],o={upload:{url:"/demo/tinymce/upImg",width:640}};return{state:t,upload:a,form:l,select:i,cascader:c,radio:d,checkbox:r,tinymce:o}},mounted(){n.Z.getItem("token")&&this.loadData()},methods:{loadData(){const e=(0,c.Z)();(0,r.Z)("sys_config/list",{token:n.Z.getItem("token")},(t=>{e.clear();const a=t.data;if(0!=a.code)return(0,d.Z)(a.msg);setTimeout((()=>{this.form.tinymce="<b>测试1</b>",this.form.select="option2",this.form.cascader=[0,1],setTimeout((()=>{this.form.tinymce="<b>测试2</b>",setTimeout((()=>{this.form.tinymce="<b>测试3</b>"}),1e3)}),1e3)}),3e3)}))},onSubmit(){const e=JSON.stringify(this.form);return console.log(e),(0,d.Z)("请查看Console日志记录！")},upImg(e,t){return 0==e.code&&(this.form.logo=e.img),(0,d.Z)(e.msg)}}});const I=(0,C.Z)(S,[["render",i]]);var L=I}}]);