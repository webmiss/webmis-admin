import{d as z,g as W,u as O,r as U,w as V,c as N,a as r,b as h,e as E,f,h as X,i as o,t as g,j as Y,k as q,l as B,U as T,R as M,o as p,m as F,F as Z,n as S,p as A,q as de,s as R,v as J,x as K,_ as ee,y as re,z as fe}from"./index-DBm1KP3k.js";import{w as pe}from"./view-CY-Etfwp.js";import{w as me}from"./Total-DasP4GI6.js";const ce={class:"label"},ve=z({__name:"mkdir",props:{show:{type:Boolean,default:!1},title:{type:String,default:""},data:{type:Object,default:{}}},emits:["update:show","submit"],setup(w,{emit:L}){const x=w,{proxy:b}=W(),_=L,t=O().state,u=t.langs,i=U(!1);V(()=>x.show,s=>{i.value=s},{deep:!0});const $=s=>s.name.length<2||s.name.length>32?T.Toast(u.sys_file_verify_name):b.$parent.isExist(s.name)?T.Toast(u.sys_file_verify_name_exist):s,k=()=>{const s=$(x.data);if(!s)return;const n=T.Loading();M.Post("sys_file/mkdir?lang="+t.lang,{token:t.token,path:s.path,name:s.name},m=>{n.clear();const{code:c}=m.data;_("submit",c==0)})},d=()=>{_("update:show",!1)};return(s,n)=>(p(),N(E,{show:i.value,"onUpdate:show":n[2]||(n[2]=m=>i.value=m),title:w.title||h(u).mkdir,width:"420px",bottom:"40px",onClose:n[3]||(n[3]=m=>d())},{bottom:r(()=>[f(E,{height:"40px",padding:"0 32px",onClick:n[1]||(n[1]=m=>k())},{default:r(()=>[B(g(h(u).confirm),1)]),_:1})]),default:r(()=>[f(q,{lineHeight:"60px"},{default:r(()=>[f(X,null,{default:r(()=>[o("tr",null,[o("td",ce,g(h(u).folder),1),o("td",null,[f(Y,{value:w.data.name,"onUpdate:value":n[0]||(n[0]=m=>w.data.name=m),maxlength:"32"},null,8,["value"])])])]),_:1})]),_:1})]),_:1},8,["show","title"]))}}),he={class:"label"},we=z({__name:"rename",props:{show:{type:Boolean,default:!1},title:{type:String,default:""},data:{type:Object,default:{}}},emits:["update:show","submit"],setup(w,{emit:L}){const x=w,{proxy:b}=W(),_=L,t=O().state,u=t.langs,i=U(!1);V(()=>x.show,s=>{i.value=s},{deep:!0});const $=s=>s.name.length<2||s.name.length>32?T.Toast(u.sys_file_verify_name):b.$parent.isExist(s.name)?T.Toast(u.sys_file_verify_name_exist):s,k=()=>{const s=$(x.data);if(!s)return;const n=T.Loading();M.Post("sys_file/rename?lang="+t.lang,{token:t.token,path:s.path,rename:s.rename,name:s.name},m=>{n.clear();const{code:c}=m.data;_("submit",c==0)})},d=()=>{_("update:show",!1)};return(s,n)=>(p(),N(E,{show:i.value,"onUpdate:show":n[2]||(n[2]=m=>i.value=m),title:w.title||h(u).rename,width:"420px",bottom:"40px",onClose:n[3]||(n[3]=m=>d())},{bottom:r(()=>[f(F,{height:"40px",padding:"0 32px",onClick:n[1]||(n[1]=m=>k())},{default:r(()=>[B(g(h(u).confirm),1)]),_:1})]),default:r(()=>[f(q,{lineHeight:"60px"},{default:r(()=>[f(X,null,{default:r(()=>[o("tr",null,[o("td",he,g(h(u).name),1),o("td",null,[f(Y,{value:w.data.name,"onUpdate:value":n[0]||(n[0]=m=>w.data.name=m),maxlength:"32"},null,8,["value"])])])]),_:1})]),_:1})]),_:1},8,["show","title"]))}}),ge=["innerHTML"],_e=z({__name:"remove",props:{show:{type:Boolean,default:!1},title:{type:String,default:""},data:{type:Object,default:{}}},emits:["update:show","submit"],setup(w,{emit:L}){const x=w,b=L,C=O().state,t=C.langs,u=U(!1);V(()=>x.show,d=>{u.value=d},{deep:!0});const i=d=>d.names.length<1?T.Toast(t.select):d,$=()=>{const d=i(x.data);if(!d)return;const s=T.Loading();M.Post("sys_file/remove?lang="+C.lang,{token:C.token,path:d.path,data:d.names},n=>{s.clear();const{code:m,msg:c}=n.data;T.Toast(c),b("submit",m==0)})},k=()=>{b("update:show",!1)};return(d,s)=>(p(),N(E,{show:u.value,"onUpdate:show":s[1]||(s[1]=n=>u.value=n),title:w.title||h(t).del,width:"360px",bottom:"40px",onClose:s[2]||(s[2]=n=>k())},{bottom:r(()=>[f(F,{effect:"dark",type:"danger",height:"40px",onClick:s[0]||(s[0]=n=>$())},{default:r(()=>[B(g(h(t).confirm),1)]),_:1})]),default:r(()=>[f(q,{lineHeight:"60px"},{default:r(()=>[o("span",{innerHTML:h(t).del_warn(w.data.names.length)},null,8,ge)]),_:1})]),_:1},8,["show","title"]))}}),xe=z({__name:"down",props:{show:{type:Boolean,default:!1},title:{type:String,default:""},data:{type:Object,default:{}}},emits:["update:show","submit"],setup(w,{emit:L}){const x=w,b=L,C=O().state,t=C.langs,u=U(!1);V(()=>x.show,k=>{u.value=k},{deep:!0});const i=()=>{const k=T.Loading();M.Post("sys_file/down?lang="+C.lang,{token:C.token,path:x.data.path,filename:x.data.filename},d=>{k.clear(),Z.DownBlob(d.data,x.data.filename),b("submit",!0)},()=>{T.Toast(t.network_err)},{responseType:"blob"})},$=()=>{b("update:show",!1)};return(k,d)=>(p(),N(E,{show:u.value,"onUpdate:show":d[1]||(d[1]=s=>u.value=s),title:w.title||h(t).download,width:"420px",bottom:"40px",onClose:d[2]||(d[2]=s=>$())},{bottom:r(()=>[f(F,{height:"40px",padding:"0 32px",onClick:d[0]||(d[0]=s=>i())},{default:r(()=>[B(g(h(t).confirm),1)]),_:1})]),default:r(()=>[f(q,{lineHeight:"60px"},{default:r(()=>[o("b",null,g(w.data.filename),1)]),_:1})]),_:1},8,["show","title"]))}}),ke={class:"file_up_top flex_center"},ye={class:"file_up_body scrollbar"},be={key:0,class:"file_up_list"},$e={class:"img"},Ce={key:1,class:"ui ui_image"},Se={class:"text nowrap"},Te=["onClick"],Ue={key:1,class:"null"},Be=z({__name:"upload",props:{show:{type:Boolean,default:!1},title:{type:String,default:""},data:{type:Object,default:{}}},emits:["update:show","submit"],setup(w,{emit:L}){const x=w,b=L,C=O().state,t=C.langs,u=U(!1),i=U([]);V(()=>x.show,c=>{u.value=c,c&&(i.value=x.data.files)},{deep:!0});const $=()=>{let c=0;Z.Select({multiple:!0,mimeType:[]},y=>{for(let v of y)d(v.name)||(c=i.value.length,i.value.push({path:x.data.path,name:v.name,state:0,load:0}),k(c,v))})},k=(c,y)=>{let v=new FormData;v.append("token",C.token),v.append("path",x.data.path),v.append("file",y),M.Post("sys_file/upload?lang="+C.lang,v,I=>{const{code:P}=I.data;P==0?(i[c].state=1,b("submit",!0)):(i[c].state=2,b("submit",!1))},()=>{T.Toast(t.network_err)},{headers:{"Content-Type":"multipart/form-data;charset=utf-8"},onUploadProgress:I=>{let P=I.loaded/I.total*100|0;i[c].load=P}})},d=c=>{for(let y of i.value)if(y.name==c)return!0;return!1},s=c=>{i.value.splice(c,1)},n=()=>{i.value.length!=0&&i.value.splice(0,i.value.length)},m=()=>{b("update:show",!1)};return(c,y)=>(p(),S("div",{class:"file_up",style:A({visibility:u.value?"inherit":"hidden"})},[f(de,{height:"100%",width:"320px",show:u.value,"onUpdate:show":y[2]||(y[2]=v=>u.value=v),position:"right",bgColor:"#F2F4F8",onClose:y[3]||(y[3]=v=>m())},{default:r(()=>[o("div",ke,[f(F,{effect:"text",type:"primary",padding:"0 8px",onClick:y[0]||(y[0]=v=>$())},{default:r(()=>[B(g(h(t).sys_file_select_file),1)]),_:1}),y[4]||(y[4]=o("span",null,"|",-1)),f(F,{effect:"text",type:"danger",padding:"0 8px",onClick:y[1]||(y[1]=v=>n()),disabled:i.value.length==0},{default:r(()=>[B(g(h(t).clear),1)]),_:1},8,["disabled"])]),o("div",ye,[i.value.length>0?(p(),S("ul",be,[(p(!0),S(R,null,J(i.value,(v,I)=>(p(),S("li",{class:"flex",key:I},[o("div",{class:"load",style:A({width:v.load+"%"})},null,4),o("div",$e,[v.state==1?(p(),S("div",{key:0,style:A({backgroundImage:"url("+w.data.url+v.path+v.name+")"})},null,4)):(p(),S("i",Ce))]),o("div",Se,g(v.name),1),o("i",{class:K(["ui close",v.state==1?"ui_close":"ui_more"]),title:"移除",onClick:P=>s(I)},null,10,Te)]))),128))])):(p(),S("div",Ue))])]),_:1},8,["show"])],4))}}),De=ee(Be,[["__scopeId","data-v-80878edf"]]),Fe=["innerHTML"],Le={class:"app_action flex"},Ie={class:"flex"},je={class:"text"},He={class:"flex"},Ne={class:"app_ct none_search file_body scrollbar"},Pe={key:0,class:"flex_left"},ze={class:"file_center"},Oe=["onClick"],Me={class:"file"},Ee=["onClick"],Ve=["title"],Ae={class:"file_center"},Re=["onClick"],qe={class:"file"},Ge=["onClick"],Je={key:1,class:"ui ui_file"},Ke=["title"],Qe={key:1,class:"null"},We=z({__name:"index",setup(w){const L=U(!1),b=O().state,_=b.langs,C=U({time:"",list:{}}),t=U({url:"",path:"/",check:!1,data:{path:"",dirNum:0,fileNum:0,size:0,folder:[],files:[]}}),u=U({show:!1,data:{path:"",name:""}}),i=U({show:!1,data:{path:"",name:"",rename:""}}),$=U({show:!1,data:{path:"",names:[]}}),k=U({show:!1,data:{path:"",filename:""}}),d=U({show:!1,data:{url:"",path:"",files:[]}}),s=U({show:!1,imgs:[],index:0});re(()=>{L.value=!0}),fe(()=>{L&&n()});const n=()=>{const l=T.Loading();M.Post("sys_file/list?lang="+b.lang,{token:b.token,path:t.value.path},e=>{l.clear();const{code:a,msg:D,time:j,data:H}=e.data;a==0?(C.value.time=j,t.value.check=!1,t.value.url=H.url,t.value.data=H.list):T.Toast(D)})},m=l=>{t.value.check=l;const e=t.value.data.folder;for(let D in e)e[D].check=l;const a=t.value.data.files;for(let D in a)a[D].check=l},c=()=>{const l=t.value.path.split("/").filter(e=>e);if(l.length<=1)t.value.path="/";else{t.value.path="/";for(let e=0;e<l.length-1;e++)t.value.path+=l[e]+"/"}n()},y=l=>{t.value.path+=l+"/",n()},v=l=>{const e=ue(l);if(!G(e)){k.value.show=!0,k.value.data={path:t.value.path,filename:l};return}let a=0,D=[],j=0;for(let H of t.value.data.files)G(H.ext)&&(l==H.name&&(a=j),D.push({label:H.name,value:t.value.url+t.value.path+H.name,size:H.size}),j++);D.length>0&&(s.value.show=!0,s.value.index=a,s.value.imgs=D)},I=()=>{u.value.show=!0,u.value.data.path=t.value.path},P=l=>{l&&(u.value.show=!1,n())},te=()=>{const l=Q();if(!l)return T.Toast(_.select);i.value.show=!0,i.value.data.path=t.value.path,i.value.data.name=l[0],i.value.data.rename=l[0]},ae=l=>{l&&(i.value.show=!1,n())},se=()=>{const l=Q();if(!l)return T.Toast(_.select);$.value.show=!0,$.value.data.path=t.value.path,$.value.data.names=l},le=l=>{l&&($.value.show=!1,n())},ne=l=>{l&&(k.value.show=!1,n())},oe=()=>{d.value.show=!0,d.value.data.url=t.value.url,d.value.data.path=t.value.path},ie=l=>{l&&n()},ue=l=>{const e=l.lastIndexOf(".")+1,a=l.length;return l.substring(e,a)},Q=()=>{let l=[];for(let e of t.value.data.folder)e.check&&l.push(e.name);for(let e of t.value.data.files)e.check&&l.push(e.name);return l.length>0?l:!1},G=l=>["png","jpg","jpeg","gif","svg"].indexOf(l)>=0;return(l,e)=>(p(),S(R,null,[f(me,{time:C.value.time,onRefresh:e[0]||(e[0]=a=>n())},{default:r(()=>[o("span",{innerHTML:h(_).sys_file_total(t.value.data.dirNum,t.value.data.fileNum,t.value.data.size)},null,8,Fe)]),_:1},8,["time"]),o("div",Le,[o("div",Ie,[t.value.path=="/"?(p(),N(F,{key:0,effect:"text",type:"primary",padding:"0 8px",disabled:""},{default:r(()=>[B(g(h(_).sys_file_rootdir),1)]),_:1})):(p(),N(F,{key:1,effect:"text",type:"primary",padding:"0 8px",onClick:e[1]||(e[1]=a=>c())},{default:r(()=>[B(g(h(_).sys_file_back),1)]),_:1})),e[19]||(e[19]=o("span",{class:"line"},"|",-1)),t.value.check?(p(),N(F,{key:3,effect:"text",type:"primary",padding:"0 8px",onClick:e[3]||(e[3]=a=>m(!1))},{default:r(()=>[B(g(h(_).select_not),1)]),_:1})):(p(),N(F,{key:2,effect:"text",type:"primary",padding:"0 8px",onClick:e[2]||(e[2]=a=>m(!0))},{default:r(()=>[B(g(h(_).select_all),1)]),_:1})),e[20]||(e[20]=o("span",{class:"line"},"|",-1)),o("span",je,g(t.value.path),1)]),o("div",He,[f(F,{icon:"ui ui_add",padding:"0 16px 0 8px",onClick:e[4]||(e[4]=a=>I())},{default:r(()=>[B(g(h(_).mkdir),1)]),_:1}),f(F,{icon:"ui ui_edit",padding:"0 16px 0 8px",onClick:e[5]||(e[5]=a=>te())},{default:r(()=>[B(g(h(_).rename),1)]),_:1}),f(F,{effect:"plain",type:"danger",icon:"ui ui_del",padding:"0 16px 0 8px",onClick:e[6]||(e[6]=a=>se())},{default:r(()=>[B(g(h(_).del),1)]),_:1}),e[21]||(e[21]=o("span",{class:"line"},"|",-1)),f(F,{effect:"dark",type:"primary",icon:"ui ui_upload",padding:"0 16px 0 8px",onClick:e[7]||(e[7]=a=>oe())},{default:r(()=>[B(g(h(_).upload),1)]),_:1})])]),o("div",Ne,[t.value.data.folder.length!=0||t.value.data.files.length!=0?(p(),S("ul",Pe,[(p(!0),S(R,null,J(t.value.data.folder,(a,D)=>(p(),S("li",{key:"dir"+D,class:K(a.check?"file_active":"file_state")},[o("div",ze,[o("div",{class:"file_click",onClick:j=>a.check=!a.check},e[22]||(e[22]=[o("i",{class:"check"},null,-1)]),8,Oe),o("div",Me,[o("div",{class:"file_ct",onClick:j=>y(a.name)},e[23]||(e[23]=[o("i",{class:"ui ui_folder"},null,-1)]),8,Ee),o("div",{class:"name nowrap",title:a.name},g(a.name),9,Ve)])])],2))),128)),(p(!0),S(R,null,J(t.value.data.files,(a,D)=>(p(),S("li",{key:"file"+D,class:K(a.check?"file_active":"file_state")},[o("div",Ae,[o("div",{class:"file_click",onClick:j=>a.check=!a.check},e[24]||(e[24]=[o("i",{class:"check"},null,-1)]),8,Re),o("div",qe,[o("div",{class:"file_ct",onClick:j=>v(a.name)},[G(a.ext)?(p(),S("div",{key:0,class:"file_img bgImg",style:A({backgroundImage:"url("+t.value.url+t.value.data.path+a.name+")"})},null,4)):(p(),S("i",Je))],8,Ge),o("div",{class:"name nowrap",title:a.name},g(a.name),9,Ke)])])],2))),128))])):(p(),S("div",Qe))]),f(ve,{show:u.value.show,"onUpdate:show":e[8]||(e[8]=a=>u.value.show=a),data:u.value.data,onSubmit:e[9]||(e[9]=a=>P(a))},null,8,["show","data"]),f(we,{show:i.value.show,"onUpdate:show":e[10]||(e[10]=a=>i.value.show=a),data:i.value.data,onSubmit:e[11]||(e[11]=a=>ae(a))},null,8,["show","data"]),f(_e,{show:$.value.show,"onUpdate:show":e[12]||(e[12]=a=>$.value.show=a),data:$.value.data,onSubmit:e[13]||(e[13]=a=>le(a))},null,8,["show","data"]),f(xe,{show:k.value.show,"onUpdate:show":e[14]||(e[14]=a=>k.value.show=a),data:k.value.data,onSubmit:e[15]||(e[15]=a=>ne(a))},null,8,["show","data"]),f(De,{show:d.value.show,"onUpdate:show":e[16]||(e[16]=a=>d.value.show=a),data:d.value.data,onSubmit:e[17]||(e[17]=a=>ie(a))},null,8,["show","data"]),f(pe,{show:s.value.show,"onUpdate:show":e[18]||(e[18]=a=>s.value.show=a),index:s.value.index,options:s.value.imgs},null,8,["show","index","options"])],64))}}),et=ee(We,[["__scopeId","data-v-f901b70a"]]);export{et as default};
