import{d as r,n,i as t,H as c,t as _,o as d,_ as f}from"./index-DBm1KP3k.js";const m={class:"tools-total flex"},p={class:"tools-total_ct scrollbar"},h={class:"tools-total_info"},u={class:"tools-total_refresh flex"},v={class:"time"},x=r({__name:"Total",props:{time:{type:String,default:""}},emits:["refresh"],setup(e,{emit:o}){const a=o,l=()=>{a("refresh")};return(i,s)=>(d(),n("div",m,[t("div",p,[t("div",h,[c(i.$slots,"default",{},void 0,!0)])]),t("div",u,[t("span",v,_(e.time||"0000/00/00 00:00:00"),1),t("i",{class:"ui ui_refresh",onClick:s[0]||(s[0]=k=>l())})])]))}}),S=f(x,[["__scopeId","data-v-f9667772"]]);export{S as w};
