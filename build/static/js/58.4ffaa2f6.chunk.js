"use strict";(self.webpackChunknla=self.webpackChunknla||[]).push([[58],{5785:function(e,s,a){a.r(s),a.d(s,{default:function(){return E}});var i=a(2791),n=a(5861),c=(a(4942),a(1413)),l=a(885),A=a(7757),t=a.n(A),r=a(4569),o=a.n(r),d=a(6871),m=a(3504),h=a(7228),p=a.p+"static/media/video_login_page.fcc74cbc2de4c28a765d.mp4",x=(a(4896),a(5987)),j=a(1694),v=a.n(j),u=a(162),g=a(184),N=["bsPrefix","variant","animation","size","as","className"],y=i.forwardRef((function(e,s){var a=e.bsPrefix,i=e.variant,n=e.animation,l=e.size,A=e.as,t=void 0===A?"div":A,r=e.className,o=(0,x.Z)(e,N);a=(0,u.vE)(a,"spinner");var d="".concat(a,"-").concat(n);return(0,g.jsx)(t,(0,c.Z)((0,c.Z)({ref:s},o),{},{className:v()(r,d,l&&"".concat(d,"-").concat(l),i&&"text-".concat(i))}))}));y.displayName="Spinner";var f=y,w=function(){var e=(0,d.s0)(),s=(0,i.useState)(!1),a=(0,l.Z)(s,2),c=a[0],A=a[1],r=(0,i.useState)(""),x=(0,l.Z)(r,2),j=x[0],v=x[1],u=(0,i.useState)(""),N=(0,l.Z)(u,2),y=N[0],w=N[1],E=(0,i.useState)({username:"",password:""}),M=(0,l.Z)(E,2),P=(M[0],M[1],function(){var s=(0,n.Z)(t().mark((function s(){var a,i,n,c,l;return t().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,A(!0),a={headers:{"Content-Type":"application/json"}},s.next=5,o().post("https://nla-backend.herokuapp.com/api/login",{username:j,password:y},a);case 5:i=s.sent,200===(n=i.data).code&&(e("/dashboard"),localStorage.setItem("auth",JSON.stringify(n.data)),A(!1)),s.next=15;break;case 10:s.prev=10,s.t0=s.catch(0),A(!1),console.log("Error",s.t0.response),alert(null===s.t0||void 0===s.t0||null===(c=s.t0.response)||void 0===c||null===(l=c.data)||void 0===l?void 0:l.msg);case 15:case"end":return s.stop()}}),s,null,[[0,10]])})));return function(){return s.apply(this,arguments)}}());return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("header",{className:"container-fluid",children:(0,g.jsxs)("div",{className:"row align-items-center",children:[(0,g.jsx)("div",{className:"col-lg-5 col-md-6 col-4",children:(0,g.jsx)("div",{className:"nla_logo",children:(0,g.jsx)(m.rU,{to:"/login",children:(0,g.jsx)("img",{src:h,alt:"Northlight Analytics Logo",className:"img-fluid"})})})}),(0,g.jsx)("div",{className:"col-lg-7 col-md-6 col-8",children:(0,g.jsx)("div",{className:"theme-title",children:(0,g.jsxs)("h1",{className:"mb-0",children:["NORTHLIGHT ",(0,g.jsx)("span",{children:"GAZELLE"})]})})})]})}),(0,g.jsx)("div",{className:"container-fluid",children:(0,g.jsxs)("div",{className:"row align-items-center login-wrapper",children:[(0,g.jsx)("div",{className:"col-lg-5 col-md-6 px-0",children:(0,g.jsx)("div",{className:"nla_login-sidebar",children:(0,g.jsx)("div",{className:"ratio ratio-1x1",children:(0,g.jsx)("video",{id:"myVideo",poster:"",width:"300",height:"150",autoPlay:!0,loop:!0,muted:!0,children:(0,g.jsx)("source",{src:p,type:"video/mp4"})})})})}),(0,g.jsx)("div",{className:"col-lg-7 col-md-6 px-0",children:(0,g.jsxs)("div",{className:"nla_login_data_wrapper",children:[(0,g.jsxs)("div",{className:"login-form",children:[(0,g.jsx)("h4",{className:"pb-3",children:(0,g.jsx)("strong",{children:"Analyze business, discover strategies."})}),(0,g.jsx)("p",{children:"A path breaking analytics platform that harmonizes advanced analytics and business decision making."}),(0,g.jsx)("div",{className:"login-form-block",children:(0,g.jsx)("form",{onSubmit:function(e){e.preventDefault(),P()},children:(0,g.jsxs)("div",{className:"row align-items-center",children:[(0,g.jsx)("div",{className:"col-lg-12 col-md-12",children:(0,g.jsx)("input",{type:"text",className:"form-control",placeholder:"Username",name:"username",onChange:function(e){return v(e.currentTarget.value)},required:!0})}),(0,g.jsx)("div",{className:"col-lg-12 col-md-12",children:(0,g.jsx)("input",{type:"password",className:"form-control",placeholder:"Password",name:"password",onChange:function(e){return w(e.currentTarget.value)},required:!0})}),(0,g.jsx)("div",{className:"col-6 nla_top-spacing",children:(0,g.jsx)("button",{type:"submit",className:"btn btn-primary",style:{width:"166.81px"},children:!0===c?(0,g.jsx)(g.Fragment,{children:(0,g.jsx)(f,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true"})}):"Login"})}),(0,g.jsx)("div",{className:"col-6 text-end nla_top-spacing",children:(0,g.jsx)("a",{href:"",className:"nla_forgot_psw",children:"Forgot Password?"})})]})})})]}),(0,g.jsx)("div",{className:"login_footer_wrapper",children:(0,g.jsx)("div",{className:"login_footer",children:(0,g.jsxs)("div",{className:"row align-items-center",children:[(0,g.jsx)("div",{className:"col-lg-4 col-md-4",children:(0,g.jsx)("div",{className:"nla_help_and_support",children:(0,g.jsxs)("a",{href:"#",children:[(0,g.jsx)("i",{className:"fa-solid fa-circle-question"})," Help & Support"]})})}),(0,g.jsx)("div",{className:"col-lg-8 col-md-8 text-end",children:(0,g.jsx)("div",{className:"nla_help_and_support",children:(0,g.jsx)("p",{className:"mb-0",children:"\xa9 2022 NorthLight Analytic Partners | Confidential and Proprietary"})})})]})})})]})})]})})]})},E=function(){return(0,g.jsx)(g.Fragment,{children:(0,g.jsx)(w,{})})}},4896:function(){},7228:function(e){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAACSCAMAAACDvNQbAAAC/VBMVEUAAAAUHjkRExj///8Aud8AreoAvNwAut4Ar+kAovQAvtsAs+UAqusAqu8CmvQAqPIAvdwAxdQAmf0A0MoAw9cAwtcAv9kAuOEAyNL///8At+AAq+kAm/8A0sgAwtb///8Az8oAoPcAnfQAsuUAzM0AydEAtOQAsuUApPEApvIAmv7///8Az8wAzs0AqvAApvQAm/e5ubkAytAAnf0A1Mf///8AteMAsOcAoPgAnPf///8Ax9IAwNkAtOEAsOcAvdwAq+0DoPX///8Ay88AxNUArOsAzM4AxtQAqO5eXl8VHiAA0ckAx9P///8AwNkAt+MrLy8aIiP////09PT///91dXYWGxuysrIA08gAydJtbW0Aw9UAwtgAz8v///9XV1cGjdz///80Nzv///8Ays+rq6tFRUUApPMAo/T///8Ax9IAud8AtOQAqfIApfH////V1dUA0cr///8A1cUA1cb///+1tbVbW1v09PaFhYXi4uJ2dnaOjpRLS0wA1MYAxdUwMDD8/P48QEMAu96VlZUA0sl8fHz///+ioqL////////Z2dnh4eH///////////91df+RkZH39/jExMT///9JSUqlpqb+///////6+/wAo+2BgYMA18Pk5OTW1v/s7OwBg6WZmZnx8vSCgojj4+PQ2dnp6emMjI1nZ2fl5uvy8vL+/v/t7fHKysuenp6cnJx/f4JRUVT4+Pzg4ODV1djj4+W0tLQAXFwAgpoAhqusrLD6/P3V1dUA1sTW1tff39+/v7/Pz9lqam3W1tb////x8fHDw8Pq6urL0NEA0ceioqUAcG4AWFkAd6vw8/cA0Mivr6/u/f3W3uQA0s/ExMbb5f8AzMYAz8gAxb/KysoAm6AA0u0Ayd0Af60UX+q1tbWws/gApZuzs7MApabw8Pi/v8UA1sQA1cUAxcAAmKh5pvRvvd8AzsUAVVoA1sTV1eoAsKXW1v8AnJSbnPYAx9mOjv+6uroAjoUAurQAy890xMQAqLwA9PRDtPj///+V7JiUAAAA/nRSTlMAAwb7fVWGgFkpjmdLRRc6i6cFz5yakXi083RPENeg9swgGmTCtmtiNzMK58jFQS4UuLkN27ltXiMdg6yWcFyISCbRu6VRv6o9GwnRrbCTciQP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"}}]);
//# sourceMappingURL=58.4ffaa2f6.chunk.js.map