"use strict";(self["webpackChunkwebmis_vue"]=self["webpackChunkwebmis_vue"]||[]).push([[843],{6260:function(t,e,n){var i=n(6492);e["Z"]=(t,e)=>{try{let n=plus.camera.getCamera();n.captureImage((function(e){plus.io.resolveLocalFileSystemURL(e,(function(e){e.file((e=>{t(e)}))}),(()=>(0,i.Z)("读取拍照失败!")))}),e)}catch(n){const e=document.createElement("input");e.setAttribute("type","file"),e.setAttribute("style","display: none"),document.body.appendChild(e),e.click(),e.onchange=()=>{t(e.files[0])}}}},336:function(t,e,n){n.d(e,{Z:function(){return a}});var i=(t,e,n)=>{let i=e.width||0,a=e.height||0,o=e.cut||!0,r=e.quality||.8,l=e.ext||"jpg";const s={jpg:"image/jpeg",png:"image/png",gif:"image/gif"};let u=1,d=1,c=0,h=0,p=1,g=u/d,f=document.createElement("canvas"),m=f.getContext("2d"),y=new Image;y.src=t,y.onload=function(){const t=this;g=t.width/t.height,i>0&&0==a?(u=i<t.width?i:t.width,d=i<t.width?Math.round(i/g):Math.round(t.width/g),i=u,a=d):0==i&&a>0?(u=a<t.height?Math.round(a*g):Math.round(t.height*g),d=a<t.height?a:t.height,i=u,a=d):0==i&&0==a?(u=t.width,d=t.height,i=u,a=d):(p=i/a,g>p?i<t.width?(u=o?Math.round(a*g):i,d=o?a:Math.round(i/g)):(u=o?Math.round(t.height*g):t.width,d=o?t.height:Math.round(t.width/g)):a<t.height?(u=o?i:Math.round(a*g),d=o?Math.round(i/g):a):(u=o?t.width:Math.round(t.height*g),d=o?Math.round(t.width/g):t.height)),f.width=i,f.height=a,c=Math.round(i-u)/2,h=Math.round(a-d)/2,m.drawImage(this,c,h,u,d);let e=f.toDataURL(s[l],r);n(e)}},a=(t,e,n)=>{try{let a=new plus.io.FileReader;a.readAsDataURL(t),a.onloadend=function(){e.ext||("image/jpeg"==t.type?e.ext="jpg":"image/png"==t.type?e.ext="png":"image/gif"==t.type&&(e.ext="gif")),i(this.result,e,n)}}catch(a){let o=new FileReader;o.readAsDataURL(t),o.onloadend=function(){e.ext||("image/jpeg"==t.type?e.ext="jpg":"image/png"==t.type?e.ext="png":"image/gif"==t.type&&(e.ext="gif")),i(this.result,e,n)}}}},4054:function(t,e,n){n.d(e,{Z:function(){return S}});var i=n(6252),a=n(3577),o=n(9963);const r=t=>((0,i.dD)("data-v-595033e1"),t=t(),(0,i.Cn)(),t),l={key:0,class:"wm-select_clear_body"},s=r((()=>(0,i._)("i",{class:"ui ui_arrow_down"},null,-1))),u=[s],d=["placeholder","value"],c={key:0,class:"wm-select_body"},h=r((()=>(0,i._)("span",{class:"wm-select_arrow"},null,-1))),p={key:0,class:"wm-select_sea"},g={key:0,class:"nowrap wm-select_disabled",style:{cursor:"not-allowed"}},f=["onClick"],m={key:2,class:"null"};function y(t,e,n,r,s,y){const v=(0,i.up)("wm-input");return(0,i.wg)(),(0,i.iD)("div",{class:"wm-select",style:(0,a.j5)({width:t.width})},[(0,i._)("div",{class:"wm-select_input",style:(0,a.j5)({height:t.height,lineHeight:t.height}),onClick:e[1]||(e[1]=e=>{t.checked=!t.checked,t.seaKey("")})},[t.value&&t.clearable?((0,i.wg)(),(0,i.iD)("div",l,[(0,i._)("span",{class:"wm-select_clear",onClick:e[0]||(e[0]=(0,o.iM)((e=>t.$emit("update:value","")),["stop"]))})])):(0,i.kq)("",!0),(0,i._)("div",{class:"wm-select_input_ico",style:(0,a.j5)({transform:t.checked?"rotate(-180deg)":"rotate(0deg)"})},u,4),(0,i._)("input",{type:"text",readonly:"",placeholder:t.placeholder,value:t.text,style:(0,a.j5)({borderColor:t.checked?"#595":"",boxShadow:t.checked?"0 0 10px rgba(0,0,0,.16)":""})},null,12,d)],4),t.checked?((0,i.wg)(),(0,i.iD)("div",c,[h,t.search?((0,i.wg)(),(0,i.iD)("div",p,[(0,i.Wm)(v,{value:t.seaVal,"onUpdate:value":e[2]||(e[2]=e=>t.seaKey(e)),height:"32px"},null,8,["value"])])):(0,i.kq)("",!0),t.dataList.length>0?((0,i.wg)(),(0,i.iD)("ul",{key:1,class:"wm-select_list scrollbar",style:(0,a.j5)({maxHeight:t.maxHeight})},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(t.dataList,((e,n)=>((0,i.wg)(),(0,i.iD)(i.HY,{key:n},[e.disabled?((0,i.wg)(),(0,i.iD)("li",g,(0,a.zw)(e.label),1)):((0,i.wg)(),(0,i.iD)("li",{key:1,class:(0,a.C_)(["nowrap",e.value==t.value?"wm-select_active":""]),onClick:n=>t.selectClick(e.value)},(0,a.zw)(e.label),11,f))],64)))),128))],4)):((0,i.wg)(),(0,i.iD)("div",m))])):(0,i.kq)("",!0)],4)}n(7658);var v=n(2613),w=(0,i.aZ)({name:"Select",components:{wmInput:v.Z},props:{value:{default:""},data:{type:Array,default:[]},width:{type:String,default:"100%"},height:{type:String,default:"32px"},placeholder:{type:String,default:"请选择"},maxHeight:{type:String,default:"160px"},clearable:{type:Boolean,default:!1},search:{type:Boolean,default:!1}},data(){const t=!1,e="",n=null,i="";return{checked:t,text:e,dataList:n,seaVal:i}},watch:{value(t){this.selectDisplay(t)},data(t){this.dataList=t,this.selectDisplay(this.value)}},mounted(){this.dataList=this.data,this.selectDisplay(this.value);const t=document.getElementsByClassName("wm-select");for(let e=0;e<t.length;e++)t[e].addEventListener("click",(t=>{t.stopPropagation()}));document.addEventListener("click",(()=>{this.checked=!1}))},methods:{selectClick(t){this.checked=!1,this.selectDisplay(t),this.$emit("update:value",t)},selectDisplay(t){const e=this.data;if(""==t)return this.text="";for(let n in e)if(e[n]["value"]==t)return this.text=e[n]["label"]},seaKey(t){if(!t)return this.dataList=this.data;const e=new RegExp(t.toLowerCase()),n=this.data,i=[];let a;for(let o in n)a=n[o].label.toLowerCase(),e.test(a)&&i.push(n[o]);this.dataList=i}}}),b=n(3744);const k=(0,b.Z)(w,[["render",y],["__scopeId","data-v-595033e1"]]);var S=k},2021:function(t,e,n){n.d(e,{Z:function(){return c}});var i=n(6252),a=n(3577);const o=["title"],r={key:1,class:"wm-img_null"};function l(t,e,n,l,s,u){return(0,i.wg)(),(0,i.iD)("div",{ref:"img",class:"wm-img",title:t.title},[t.url?((0,i.wg)(),(0,i.iD)("div",{key:0,style:(0,a.j5)({backgroundImage:"url("+t.url+")",backgroundSize:t.size})},null,4)):((0,i.wg)(),(0,i.iD)("div",r,[(0,i._)("i",{class:"ui ui_image",style:(0,a.j5)({fontSize:t.icoSize})},null,4)]))],8,o)}var s=(0,i.aZ)({name:"Img",props:{url:{type:String,default:""},size:{type:String,default:"cover"},width:{type:String,default:"90px"},height:{type:String,default:"40px"},radius:{type:String,default:"0px"},title:{type:String,default:""},icoSize:{type:String,default:"32px"}},mounted(){const t=this.$refs.img;t.style.width=this.width,t.style.height=this.height,t.style.lineHeight=this.height,t.style.borderRadius=this.radius}}),u=n(3744);const d=(0,u.Z)(s,[["render",l],["__scopeId","data-v-58f643d0"]]);var c=d},5451:function(t,e,n){n.d(e,{Z:function(){return g}});var i=n(6252);const a=["title"];function o(t,e,n,o,r,l){return(0,i.wg)(),(0,i.iD)("div",{class:"wm-upload",onClick:e[0]||(e[0]=e=>t.upImage()),title:t.title},[(0,i.WI)(t.$slots,"default",{},void 0,!0)],8,a)}var r=n(8907),l=n(6492),s=n(5783),u=n(6260),d=n(336),c=(0,i.aZ)({name:"ImgUpLoad",props:{url:{type:String,default:""},width:{type:Number,default:200},height:{type:Number,default:200},param:{type:Object,default:{}},title:{type:String,default:"上传图片"}},methods:{upImage(){(0,u.Z)((t=>{(0,d.Z)(t,{width:this.width,height:this.height},(t=>{if(!this.url)return(0,l.Z)("上传Url地址为空!");const e=(0,r.Z)();this.param.base64=t,(0,s.Z)(this.url,this.param,(t=>{e.clear();const n=t.data;return this.$emit("upload",n),(0,l.Z)(n.msg)}))}))}))}}}),h=n(3744);const p=(0,h.Z)(c,[["render",o],["__scopeId","data-v-7b9eb3da"]]);var g=p},9628:function(t,e,n){n.d(e,{Z:function(){return d}});var i=n(6252),a=n(3577);const o={class:"wm-switch_body"};function r(t,e,n,r,l,s){return(0,i.wg)(),(0,i.iD)("div",o,[(0,i._)("span",{ref:"Switch",class:(0,a.C_)(["wm-switch",t.show?"active":"inactive"]),onClick:e[0]||(e[0]=e=>{t.click()})},[(0,i._)("span",{ref:"SwitchCursor",class:"wm-switch_cursor",style:(0,a.j5)({left:t.show?"18px":"2px"})},null,4)],2)])}var l=(0,i.aZ)({name:"Switch",props:{value:{type:Boolean,default:!1}},data(){const t=!1;return{show:t}},watch:{value(t){this.show=t}},mounted(){this.show=this.value},methods:{click(){this.show=!this.show,this.$emit("update:value",this.show)}}}),s=n(3744);const u=(0,s.Z)(l,[["render",r],["__scopeId","data-v-6aeaa570"]]);var d=u},8288:function(t,e,n){n.d(e,{Z:function(){return P}});var i=n(6252);function a(t,e,n,a,o,r){const l=(0,i.up)("editor");return(0,i.wg)(),(0,i.j4)(l,{"api-key":t.key,init:t.defInit,modelValue:t.content,"onUpdate:modelValue":e[0]||(e[0]=e=>t.content=e)},null,8,["api-key","init","modelValue"])}var o=["onActivate","onAddUndo","onBeforeAddUndo","onBeforeExecCommand","onBeforeGetContent","onBeforeRenderUI","onBeforeSetContent","onBeforePaste","onBlur","onChange","onClearUndos","onClick","onContextMenu","onCopy","onCut","onDblclick","onDeactivate","onDirty","onDrag","onDragDrop","onDragEnd","onDragGesture","onDragOver","onDrop","onExecCommand","onFocus","onFocusIn","onFocusOut","onGetContent","onHide","onInit","onKeyDown","onKeyPress","onKeyUp","onLoadContent","onMouseDown","onMouseEnter","onMouseLeave","onMouseMove","onMouseOut","onMouseOver","onMouseUp","onNodeChange","onObjectResizeStart","onObjectResized","onObjectSelected","onPaste","onPostProcess","onPostRender","onPreProcess","onProgressState","onRedo","onRemove","onReset","onSaveContent","onSelectionChange","onSetAttrib","onSetContent","onShow","onSubmit","onUndo","onVisualAid"],r=function(t){return-1!==o.map((function(t){return t.toLowerCase()})).indexOf(t.toLowerCase())},l=function(t,e,n){Object.keys(e).filter(r).forEach((function(i){var a=e[i];"function"===typeof a&&("onInit"===i?a(t,n):n.on(i.substring(2),(function(t){return a(t,n)})))}))},s=function(t,e,n,a){var o=t.modelEvents?t.modelEvents:null,r=Array.isArray(o)?o.join(" "):o;(0,i.YP)(a,(function(e,i){n&&"string"===typeof e&&e!==i&&e!==n.getContent({format:t.outputFormat})&&n.setContent(e)})),n.on(r||"change input undo redo",(function(){e.emit("update:modelValue",n.getContent({format:t.outputFormat}))}))},u=function(t,e,n,i,a,o){i.setContent(o()),n.attrs["onUpdate:modelValue"]&&s(e,n,i,a),l(t,n.attrs,i)},d=0,c=function(t){var e=Date.now(),n=Math.floor(1e9*Math.random());return d++,t+"_"+n+d+String(e)},h=function(t){return null!==t&&"textarea"===t.tagName.toLowerCase()},p=function(t){return"undefined"===typeof t||""===t?[]:Array.isArray(t)?t:t.split(" ")},g=function(t,e){return p(t).concat(p(e))},f=function(t){return null===t||void 0===t},m=function(){return{listeners:[],scriptId:c("tiny-script"),scriptLoaded:!1}},y=function(){var t=m(),e=function(t,e,n,i){var a=e.createElement("script");a.referrerPolicy="origin",a.type="application/javascript",a.id=t,a.src=n;var o=function(){a.removeEventListener("load",o),i()};a.addEventListener("load",o),e.head&&e.head.appendChild(a)},n=function(n,i,a){t.scriptLoaded?a():(t.listeners.push(a),n.getElementById(t.scriptId)||e(t.scriptId,n,i,(function(){t.listeners.forEach((function(t){return t()})),t.scriptLoaded=!0})))},i=function(){t=m()};return{load:n,reinitialize:i}},v=y(),w=function(){return"undefined"!==typeof window?window:n.g},b=function(){var t=w();return t&&t.tinymce?t.tinymce:null},k={apiKey:String,cloudChannel:String,id:String,init:Object,initialValue:String,inline:Boolean,modelEvents:[String,Array],plugins:[String,Array],tagName:String,toolbar:[String,Array],modelValue:String,disabled:Boolean,tinymceScriptSrc:String,outputFormat:{type:String,validator:function(t){return"html"===t||"text"===t}}},S=n(2262),C=function(){return C=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var a in e=arguments[n],e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t},C.apply(this,arguments)},_=function(t,e,n,i){return t(i||"div",{id:e,ref:n})},x=function(t,e,n){return t("textarea",{id:e,visibility:"hidden",ref:n})},D=(0,i.aZ)({props:k,setup:function(t,e){var n=t.init?C({},t.init):{},a=(0,S.BK)(t),o=a.disabled,r=a.modelValue,l=a.tagName,s=(0,S.iH)(null),d=null,p=t.id||c("tiny-vue"),m=t.init&&t.init.inline||t.inline,y=!!e.attrs["onUpdate:modelValue"],w=!0,k=t.initialValue?t.initialValue:"",D="",Z=function(t){return y?function(){return(null===r||void 0===r?void 0:r.value)?r.value:""}:function(){return t?k:D}},j=function(){var i=Z(w),a=C(C({},n),{readonly:t.disabled,selector:"#"+p,plugins:g(n.plugins,t.plugins),toolbar:t.toolbar||n.toolbar,inline:m,setup:function(a){d=a,a.on("init",(function(n){return u(n,t,e,a,r,i)})),"function"===typeof n.setup&&n.setup(a)}});h(s.value)&&(s.value.style.visibility=""),b().init(a),w=!1};(0,i.YP)(o,(function(t){var e;null!==d&&("function"===typeof(null===(e=d.mode)||void 0===e?void 0:e.set)?d.mode.set(t?"readonly":"design"):d.setMode(t?"readonly":"design"))})),(0,i.YP)(l,(function(t){var e;y||(D=d.getContent()),null===(e=b())||void 0===e||e.remove(d),(0,i.Y3)((function(){return j()}))})),(0,i.bv)((function(){if(null!==b())j();else if(s.value&&s.value.ownerDocument){var e=t.cloudChannel?t.cloudChannel:"6",n=t.apiKey?t.apiKey:"no-api-key",i=f(t.tinymceScriptSrc)?"https://cdn.tiny.cloud/1/"+n+"/tinymce/"+e+"/tinymce.min.js":t.tinymceScriptSrc;v.load(s.value.ownerDocument,i,j)}})),(0,i.Jd)((function(){null!==b()&&b().remove(d)})),m||((0,i.dl)((function(){w||j()})),(0,i.se)((function(){var t;y||(D=d.getContent()),null===(t=b())||void 0===t||t.remove(d)})));var I=function(t){var e;D=d.getContent(),null===(e=b())||void 0===e||e.remove(d),n=C(C({},n),t),(0,i.Y3)((function(){return j()}))};return e.expose({rerender:I}),function(){return m?_(i.h,p,s,t.tagName):x(i.h,p,s)}}}),Z=D,j=n(7830),I=n(6492),M=n(2367),L=n(5783),E=n(336),A=(0,i.aZ)({name:"TinyMCE",components:{Editor:Z},props:{value:{type:String,default:""},upload:{default:{url:"",width:0,height:0,param:{}}},height:{type:Number,default:480},language:{type:String,default:"zh_CN"},menubar:{type:Boolean,default:!1},plugins:{type:String,default:"advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount"},toolbar:{type:String,default:"undo redo | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | table image media | removeformat | preview help"}},data(){const t=j.Z.tinymceKey,e="",n={language:this.language,width:"100%",height:this.height,menubar:this.menubar,branding:!1,elementpath:!1,plugins:this.plugins,toolbar:this.toolbar,toolbar_items_size:"small",images_upload_handler:(t,e,n)=>{this.upImg(t,e,n)},content_style:"img {max-width:100%;}"};return{key:t,content:e,defInit:n}},watch:{value(t){this.content=t},content(t){this.$emit("update:value",t)}},mounted(){},methods:{upImg(t,e,n){if(""==this.upload.url)return(0,I.Z)("无上传地址!");const i=t.blob();(0,E.Z)(i,{width:this.upload.width,height:this.upload.height},(t=>{const i={token:M.Z.getItem("token"),base64:t},a=this.upload.param||{};for(let e in a)i[e]=a[e];(0,L.Z)(this.upload.url,i,(t=>{const n=t.data;return 0==n.code?e(n.img):e(""),(0,I.Z)(n.msg)}),n)}))}}}),U=n(3744);const B=(0,U.Z)(A,[["render",a],["__scopeId","data-v-208fa616"]]);var P=B}}]);