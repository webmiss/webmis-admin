import{d as M,u as Y,r as b,w as j,c as W,a as i,e as F,f as m,h as Z,i as o,t as x,b as f,j as R,k as O,l as U,m as L,U as k,R as B,o as A,_ as q,F as tt,T,y as et,z as at,n as K,C as lt,s as st,D as ot,x as nt}from"./index-DBm1KP3k.js";import{w as it,a as ut,f as dt,b as rt,c as mt,d as vt,e as pt,P as ft}from"./index-Bb0WFh3g.js";import{w as wt}from"./Total-DasP4GI6.js";const ct={class:"label"},xt={class:"label"},gt={class:"label"},bt={class:"label"},ht={class:"label"},yt=M({__name:"save",props:{show:{type:Boolean,default:!1},title:{type:String,default:""},data:{type:Object,default:[]}},emits:["update:show","submit"],setup(y,{emit:S}){const v=y,$=S,l=Y().state,p=l.langs,n=b(!1),_=b("base"),c=b([{label:p.info,value:"base",slot:"base"},{label:p.content,value:"content",slot:"content"}]),e=b({id:0,status:!0,type:[],title:"",name:"",remark:"",content:""}),s=b([{label:"PC版",value:0},{label:"手机版",value:1}]);j(()=>v.show,g=>{n.value=g,g&&(e.value.id=v.data.id||0,e.value.status=typeof v.data.status<"u"?v.data.status:!0,e.value.type=typeof v.data.type<"u"?[parseInt(v.data.type)]:[],e.value.title=v.data.title||"",e.value.name=v.data.name||"",e.value.remark=v.data.remark||"",e.value.content=v.data.content||"")});const u=g=>g.title.length<2||g.title.length>32?k.Toast(p.web_html_verify_title):g.name.length<2||g.name.length>16?k.Toast(p.web_html_verify_name):g,D=()=>{const g=u(e.value);if(!g)return;const r=k.Loading();B.Post("web_html/save?lang="+l.lang,{token:l.token,data:g},w=>{r.clear();const P=w.data;k.Toast(P.msg),$("submit",P.code==0)})},h=()=>{$("update:show",!1)};return(g,r)=>(A(),W(F,{show:n.value,"onUpdate:show":r[7]||(r[7]=w=>n.value=w),title:y.title,width:"800px",bottom:"40px",overflow:_.value=="perm"?"hidden auto":"hidden",onClose:r[8]||(r[8]=w=>h())},{bottom:i(()=>[m(L,{height:"40px",padding:"0 32px",onClick:r[6]||(r[6]=w=>D())},{default:i(()=>[U(x(f(p).confirm),1)]),_:1})]),default:i(()=>[m(O,{paddingY:"0"},{default:i(()=>[m(it,{value:_.value,"onUpdate:value":r[5]||(r[5]=w=>_.value=w),columns:c.value},{base:i(()=>[m(Z,null,{default:i(()=>[o("tr",null,[o("td",ct,x(f(p).status),1),o("td",null,[m(ut,{value:e.value.status,"onUpdate:value":r[0]||(r[0]=w=>e.value.status=w)},null,8,["value"])])]),o("tr",null,[o("td",xt,x(f(p).web_html_type),1),o("td",null,[m(dt,{value:e.value.type,"onUpdate:value":r[1]||(r[1]=w=>e.value.type=w),options:s.value},null,8,["value","options"])])]),o("tr",null,[o("td",gt,x(f(p).web_html_title),1),o("td",null,[m(R,{value:e.value.title,"onUpdate:value":r[2]||(r[2]=w=>e.value.title=w),maxlength:"32"},null,8,["value"])])]),o("tr",null,[o("td",bt,x(f(p).web_html_name),1),o("td",null,[m(R,{value:e.value.name,"onUpdate:value":r[3]||(r[3]=w=>e.value.name=w),maxlength:"16"},null,8,["value"])])]),o("tr",null,[o("td",ht,x(f(p).remark),1),o("td",null,[m(R,{value:e.value.remark,"onUpdate:value":r[4]||(r[4]=w=>e.value.remark=w),type:"textarea",height:"120px",maxlength:"32"},null,8,["value"])])])]),_:1})]),content:i(()=>r[9]||(r[9]=[])),_:1},8,["value","columns"])]),_:1})]),_:1},8,["show","title","overflow"]))}}),_t=q(yt,[["__scopeId","data-v-fdf44273"]]),kt=["innerHTML"],$t=M({__name:"del",props:{show:{type:Boolean,default:!1},title:{type:String,default:""},data:{type:Array,default:[]}},emits:["update:show","submit"],setup(y,{emit:S}){const v=y,$=S,l=Y().state,p=l.langs,n=b(!1);j(()=>v.show,e=>{n.value=e},{deep:!0});const _=()=>{const e=k.Loading();B.Post("web_html/del?lang="+l.lang,{token:l.token,data:v.data},s=>{e.clear();const u=s.data;k.Toast(u.msg),$("submit",u.code==0)})},c=()=>{$("update:show",!1)};return(e,s)=>(A(),W(F,{show:n.value,"onUpdate:show":s[1]||(s[1]=u=>n.value=u),title:y.title||f(p).del,width:"360px",bottom:"40px",onClose:s[2]||(s[2]=u=>c())},{bottom:i(()=>[m(L,{effect:"dark",type:"danger",height:"40px",onClick:s[0]||(s[0]=u=>_())},{default:i(()=>[U(x(f(p).confirm),1)]),_:1})]),default:i(()=>[m(O,{lineHeight:"60px"},{default:i(()=>[o("span",{innerHTML:f(p).del_warn(y.data.length)},null,8,kt)]),_:1})]),_:1},8,["show","title"]))}}),Tt=["innerHTML"],St=M({__name:"export",props:{show:{type:Boolean,default:!1},title:{type:String,default:""},num:{type:Number,default:0},data:{type:Object,default:{}},order:{type:String,default:""}},emits:["update:show","submit"],setup(y,{emit:S}){const v=y,$=S,l=Y().state,p=l.langs,n=b(!1);j(()=>v.show,e=>{n.value=e},{deep:!0});const _=()=>{const e=k.Loading();B.Post("web_html/export?lang="+l.lang,{token:l.token,data:v.data,order:v.order},s=>{e.clear();const u=s.data;k.Toast(u.msg),u.code==0&&tt.Down(u.data.path+u.data.filename,u.data.filename),$("submit",u.code==0)})},c=()=>{$("update:show",!1)};return(e,s)=>(A(),W(F,{show:n.value,"onUpdate:show":s[1]||(s[1]=u=>n.value=u),title:y.title||f(p).export,width:"360px",bottom:"40px",onClose:s[2]||(s[2]=u=>c())},{bottom:i(()=>[m(L,{height:"40px",padding:"0 32px",onClick:s[0]||(s[0]=u=>_())},{default:i(()=>[U(x(f(p).confirm),1)]),_:1})]),default:i(()=>[m(O,{lineHeight:"60px"},{default:i(()=>[o("span",{innerHTML:f(p).export_warn(y.num)},null,8,Tt)]),_:1})]),_:1},8,["show","title"]))}}),Ct=["innerHTML"],Dt={class:"app_action flex"},Ut={class:"app_action_tools scrollbar"},Lt={class:"app_action_search flex"},At={class:"app_ct"},Bt={class:"tCenter"},Pt={class:"tCenter"},Ht={class:"tCenter"},Mt={key:1,class:"c_info"},Yt={class:"tCenter"},Wt={class:"app_page"},It=M({__name:"index",setup(y){const S=b(!1),v=b(),C=Y().state,l=C.langs,p=ft.isAction,n=b({show:!1,key:"",placeholder:"名称、备注",time:[T.Date("Y/m/d",T.StrToTime("-3 year")),T.Date("Y/m/d")],maxDate:T.Date("Y/m/d"),columns:[{label:l.web_html_title,value:"",name:"title"},{label:l.web_html_name,value:"",name:"name"}]}),_=b({time:"",list:{}}),c=b({columns:[{title:"ID",index:"id",slot:"id",order:"",width:"80px",minWidth:"60px",textAlign:"center"},{title:l.web_html_type,index:"type",slot:"type",order:"",width:"80px",minWidth:"80px",textAlign:"center"},{title:l.web_html_title,index:"title",order:"",width:"200px",minWidth:"160px"},{title:l.web_html_name,index:"name",order:"",width:"120px",minWidth:"120px"},{title:l.action,slot:"action",textAlign:"center",width:"40px"},{title:l.status,index:"status",slot:"status",width:"60px",textAlign:"center"},{title:l.ctime,index:"ctime",order:"",width:"160px",minWidth:"160px"},{title:l.utime,index:"utime",order:"",width:"160px",minWidth:"160px"},{title:l.remark,index:"remark"}],data:[],num:0,total:0,order:""}),e=b({total:0,num:1,limit:100}),s=b({show:!1,type:"",title:"添加/编辑",data:{}}),u=b({show:!1,title:"删除",data:[]}),D=b({show:!1,title:"导出",num:0});et(()=>{S.value=!0}),at(()=>{S&&h()});const h=()=>{n.value.show=!1,c.value.data=[];const d=k.Loading();B.Post("web_html/list?lang="+C.lang,{token:C.token,data:g(),page:e.value.num,limit:e.value.limit,order:c.value.order},t=>{d.clear();const{code:a,msg:H,time:I,data:N}=t.data;a===0?(_.value.time=I,c.value.data=N,V()):k.Toast(H)}),e.value.total=0,B.Post("web_html/total?lang="+C.lang,{token:C.token,data:g()},t=>{const{code:a,msg:H,time:I,data:N}=t.data;a==0?(_.value.time=I,e.value.total=N.total):k.Toast(H)})},g=()=>{const d={key:n.value.key,stime:typeof n.value.time[0]=="string"?n.value.time[0]:T.Date("Y/m/d",n.value.time[0]),etime:typeof n.value.time[1]=="string"?n.value.time[1]:T.Date("Y/m/d",n.value.time[1])};for(let t of n.value.columns)t.name&&(d[t.name]=t.value);return d},r=(d,t)=>{c.value.num=d,c.value.total=t},w=d=>{c.value.order=d,h()},P=()=>{n.value.time=[T.Date("Y/m/d",T.StrToTime("-3 year")),T.Date("Y/m/d")],n.value.key="";for(let d of n.value.columns)d.value="";c.value.order="",e.value.num=1,h()},V=()=>{ot(()=>{v.value.checkboxAll(!1)})},z=(d,t)=>{s.value.show=!0,s.value.type=d,d=="add"?(s.value.title=l.add,s.value.data={}):d=="edit"&&(s.value.title=l.edit+"( "+t.title+" )",s.value.data=t)},E=d=>{d&&(s.value.show=!1,h())},G=()=>{u.value.show=!0;const d=v.value.getData();let t=[];for(let a of d)t.push(a.id);u.value.data=t},J=d=>{d&&(u.value.show=!1,h())},Q=d=>{D.value.show=!0,D.value.num=d},X=d=>{d&&(D.value.show=!1,V())};return(d,t)=>(A(),K(st,null,[m(wt,{time:_.value.time,onRefresh:t[0]||(t[0]=a=>h())},{default:i(()=>[o("span",{innerHTML:f(l).sys_menus_total(e.value.total)},null,8,Ct)]),_:1},8,["time"]),o("div",Dt,[o("div",Ut,[m(rt,{columns:[{action:"save",slot:"add",is_action:!0},{action:"del",slot:"del",is_action:!0},{action:"line",slot:"line"},{action:"export",slot:"export",is_action:!0}]},{add:i(()=>[m(L,{effect:"dark",type:"primary",icon:"ui ui_add",padding:"0 16px 0 8px",onClick:t[1]||(t[1]=a=>z("add"))},{default:i(()=>[U(x(f(l).add),1)]),_:1})]),del:i(()=>[m(L,{effect:"plain",type:"danger",icon:"ui ui_del",padding:"0 16px 0 8px",disabled:c.value.num==0,onClick:t[2]||(t[2]=a=>G())},{default:i(()=>[U(x(f(l).del)+"("+x(c.value.num)+")",1)]),_:1},8,["disabled"])]),line:i(()=>t[20]||(t[20]=[o("span",{class:"line"},"|",-1)])),export:i(()=>[m(L,{effect:"plain",icon:"ui ui_export",padding:"0 16px 0 8px",disabled:!e.value.total,onClick:t[3]||(t[3]=a=>Q(e.value.total))},{default:i(()=>[U(x(f(l).export)+"("+x(e.value.total)+")",1)]),_:1},8,["disabled"])]),_:1})]),o("div",Lt,[m(mt,{show:n.value.show,"onUpdate:show":t[4]||(t[4]=a=>n.value.show=a),keys:n.value.key,"onUpdate:keys":t[5]||(t[5]=a=>n.value.key=a),columns:n.value.columns,onKeyup:t[6]||(t[6]=lt(a=>h(),["enter"])),onSearch:t[7]||(t[7]=a=>h()),onReset:t[8]||(t[8]=a=>P())},null,8,["show","keys","columns"])])]),o("div",At,[m(vt,{ref_key:"tableList",ref:v,overflow:"auto",columns:c.value.columns,options:c.value.data,onOrderBy:w,onPartially:r,height:"calc(100% - 58px)"},{id:i(a=>[o("div",Bt,x(a.id),1)]),type:i(a=>[o("div",Pt,x(a.type_name),1)]),action:i(a=>[o("div",Ht,[f(p)("save")?(A(),W(L,{key:0,onClick:H=>z("edit",a)},{default:i(()=>[U(x(f(l).edit),1)]),_:2},1032,["onClick"])):(A(),K("span",Mt,t[21]||(t[21]=[o("i",{class:"ui ui_safety"},null,-1)])))])]),status:i(a=>[o("div",Yt,[o("span",{class:nt(a.status?"c_success":"c_danger")},x(a.status?f(l).enable:f(l).disable),3)])]),_:1},8,["columns","options"])]),o("div",Wt,[m(pt,{total:e.value.total,"onUpdate:total":t[9]||(t[9]=a=>e.value.total=a),page:e.value.num,"onUpdate:page":[t[10]||(t[10]=a=>e.value.num=a),t[11]||(t[11]=a=>h())],limit:e.value.limit,"onUpdate:limit":[t[12]||(t[12]=a=>e.value.limit=a),t[13]||(t[13]=a=>{e.value.num=1,h()})]},null,8,["total","page","limit"])]),m(_t,{show:s.value.show,"onUpdate:show":t[14]||(t[14]=a=>s.value.show=a),title:s.value.title,data:s.value.data,onSubmit:t[15]||(t[15]=a=>E(a))},null,8,["show","title","data"]),m($t,{show:u.value.show,"onUpdate:show":t[16]||(t[16]=a=>u.value.show=a),data:u.value.data,onSubmit:t[17]||(t[17]=a=>J(a))},null,8,["show","data"]),m(St,{show:D.value.show,"onUpdate:show":t[18]||(t[18]=a=>D.value.show=a),data:g(),order:c.value.order,num:D.value.num,onSubmit:t[19]||(t[19]=a=>X(a))},null,8,["show","data","order","num"])],64))}}),Ft=q(It,[["__scopeId","data-v-e262351a"]]);export{Ft as default};
