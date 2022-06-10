"use strict";(self.webpackChunknla=self.webpackChunknla||[]).push([[958],{58063:function(e,n,t){t.r(n),t.d(n,{default:function(){return a}});var o,r=t(97357);function a(e){if((!o&&0!==o||e)&&r.Z){var n=document.createElement("div");n.style.position="absolute",n.style.top="-9999px",n.style.width="50px",n.style.height="50px",n.style.overflow="scroll",document.body.appendChild(n),o=n.offsetWidth-n.clientWidth,document.body.removeChild(n)}return o}},88958:function(e,n,t){t.d(n,{Z:function(){return Oe}});var o=t(70885),r=t(45987),a=t(1413),i=t(81694),s=t.n(i),l=t(3070),c=t(97357),u=t(78376),d=t(36382),f=t(58063),v=t(28633),h=t(39007),m=t(73201),g=t(91683),p=t(33690),b=t(72791);function y(e){void 0===e&&(e=(0,u.Z)());try{var n=e.activeElement;return n&&n.nodeName?n:null}catch(t){return e.body}}var Z=t(53189),E=t(92899),k=t(54164),x=t(55746),w=t(52803),N=t(42982),C=t(4942),R=t(15671),j=t(43144),O=t(75427);var T,F=(0,t(71306).PB)("modal-open"),S=function(){function e(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=n.ownerDocument,o=n.handleContainerOverflow,r=void 0===o||o,a=n.isRTL,i=void 0!==a&&a;(0,R.Z)(this,e),this.handleContainerOverflow=r,this.isRTL=i,this.modals=[],this.ownerDocument=t}return(0,j.Z)(e,[{key:"getScrollbarWidth",value:function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document,n=e.defaultView;return Math.abs(n.innerWidth-e.documentElement.clientWidth)}(this.ownerDocument)}},{key:"getElement",value:function(){return(this.ownerDocument||document).body}},{key:"setModalAttributes",value:function(e){}},{key:"removeModalAttributes",value:function(e){}},{key:"setContainerStyle",value:function(e){var n={overflow:"hidden"},t=this.isRTL?"paddingLeft":"paddingRight",o=this.getElement();e.style=(0,C.Z)({overflow:o.style.overflow},t,o.style[t]),e.scrollBarWidth&&(n[t]="".concat(parseInt((0,O.Z)(o,t)||"0",10)+e.scrollBarWidth,"px")),o.setAttribute(F,""),(0,O.Z)(o,n)}},{key:"reset",value:function(){var e=this;(0,N.Z)(this.modals).forEach((function(n){return e.remove(n)}))}},{key:"removeContainerStyle",value:function(e){var n=this.getElement();n.removeAttribute(F),Object.assign(n.style,e.style)}},{key:"add",value:function(e){var n=this.modals.indexOf(e);return-1!==n?n:(n=this.modals.length,this.modals.push(e),this.setModalAttributes(e),0!==n||(this.state={scrollBarWidth:this.getScrollbarWidth(),style:{}},this.handleContainerOverflow&&this.setContainerStyle(this.state)),n)}},{key:"remove",value:function(e){var n=this.modals.indexOf(e);-1!==n&&(this.modals.splice(n,1),!this.modals.length&&this.handleContainerOverflow&&this.removeContainerStyle(this.state),this.removeModalAttributes(e))}},{key:"isTopModal",value:function(e){return!!this.modals.length&&this.modals[this.modals.length-1]===e}}]),e}(),D=S,B=t(90183),L=t(58865),A=t(80184),M=["show","role","className","style","children","backdrop","keyboard","onBackdropClick","onEscapeKeyDown","transition","backdropTransition","autoFocus","enforceFocus","restoreFocus","restoreFocusOptions","renderDialog","renderBackdrop","manager","container","onShow","onHide","onExit","onExited","onExiting","onEnter","onEntering","onEntered"];function P(e){var n=(0,L.Z)(),t=e||function(e){return T||(T=new D({ownerDocument:null==e?void 0:e.document})),T}(n),o=(0,b.useRef)({dialog:null,backdrop:null});return Object.assign(o.current,{add:function(){return t.add(o.current)},remove:function(){return t.remove(o.current)},isTopModal:function(){return t.isTopModal(o.current)},setDialogRef:(0,b.useCallback)((function(e){o.current.dialog=e}),[]),setBackdropRef:(0,b.useCallback)((function(e){o.current.backdrop=e}),[])})}var H=(0,b.forwardRef)((function(e,n){var t=e.show,r=void 0!==t&&t,a=e.role,i=void 0===a?"dialog":a,s=e.className,l=e.style,u=e.children,d=e.backdrop,f=void 0===d||d,v=e.keyboard,m=void 0===v||v,p=e.onBackdropClick,N=e.onEscapeKeyDown,C=e.transition,R=e.backdropTransition,j=e.autoFocus,O=void 0===j||j,T=e.enforceFocus,F=void 0===T||T,S=e.restoreFocus,D=void 0===S||S,L=e.restoreFocusOptions,H=e.renderDialog,W=e.renderBackdrop,I=void 0===W?function(e){return(0,A.jsx)("div",Object.assign({},e))}:W,K=e.manager,z=e.container,V=e.onShow,U=e.onHide,$=void 0===U?function(){}:U,_=e.onExit,q=e.onExited,G=e.onExiting,J=e.onEnter,Q=e.onEntering,X=e.onEntered,Y=function(e,n){if(null==e)return{};var t,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,M),ee=(0,B.Z)(z),ne=P(K),te=(0,x.Z)(),oe=(0,w.Z)(r),re=(0,b.useState)(!r),ae=(0,o.Z)(re,2),ie=ae[0],se=ae[1],le=(0,b.useRef)(null);(0,b.useImperativeHandle)(n,(function(){return ne}),[ne]),c.Z&&!oe&&r&&(le.current=y()),C||r||ie?r&&ie&&se(!1):se(!0);var ce=(0,h.Z)((function(){if(ne.add(),me.current=(0,E.Z)(document,"keydown",ve),he.current=(0,E.Z)(document,"focus",(function(){return setTimeout(de)}),!0),V&&V(),O){var e=y(document);ne.dialog&&e&&!(0,Z.Z)(ne.dialog,e)&&(le.current=e,ne.dialog.focus())}})),ue=(0,h.Z)((function(){var e;(ne.remove(),null==me.current||me.current(),null==he.current||he.current(),D)&&(null==(e=le.current)||null==e.focus||e.focus(L),le.current=null)}));(0,b.useEffect)((function(){r&&ee&&ce()}),[r,ee,ce]),(0,b.useEffect)((function(){ie&&ue()}),[ie,ue]),(0,g.Z)((function(){ue()}));var de=(0,h.Z)((function(){if(F&&te()&&ne.isTopModal()){var e=y();ne.dialog&&e&&!(0,Z.Z)(ne.dialog,e)&&ne.dialog.focus()}})),fe=(0,h.Z)((function(e){e.target===e.currentTarget&&(null==p||p(e),!0===f&&$())})),ve=(0,h.Z)((function(e){m&&27===e.keyCode&&ne.isTopModal()&&(null==N||N(e),e.defaultPrevented||$())})),he=(0,b.useRef)(),me=(0,b.useRef)(),ge=C;if(!ee||!(r||ge&&!ie))return null;var pe=Object.assign({role:i,ref:ne.setDialogRef,"aria-modal":"dialog"===i||void 0},Y,{style:l,className:s,tabIndex:-1}),be=H?H(pe):(0,A.jsx)("div",Object.assign({},pe,{children:b.cloneElement(u,{role:"document"})}));ge&&(be=(0,A.jsx)(ge,{appear:!0,unmountOnExit:!0,in:!!r,onExit:_,onExiting:G,onExited:function(){se(!0),null==q||q.apply(void 0,arguments)},onEnter:J,onEntering:Q,onEntered:X,children:be}));var ye=null;if(f){var Ze=R;ye=I({ref:ne.setBackdropRef,onClick:fe}),Ze&&(ye=(0,A.jsx)(Ze,{appear:!0,in:!!r,children:ye}))}return(0,A.jsx)(A.Fragment,{children:k.createPortal((0,A.jsxs)(A.Fragment,{children:[ye,be]}),ee)})}));H.displayName="Modal";var W=Object.assign(H,{Manager:D}),I=t(61120);function K(e,n){for(;!Object.prototype.hasOwnProperty.call(e,n)&&null!==(e=(0,I.Z)(e)););return e}function z(){return z="undefined"!==typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,n,t){var o=K(e,n);if(o){var r=Object.getOwnPropertyDescriptor(o,n);return r.get?r.get.call(arguments.length<3?e:t):r.value}},z.apply(this,arguments)}var V=t(60136),U=t(31129),$=t(6755);var _=t(13808);function q(e,n){return e.replace(new RegExp("(^|\\s)"+n+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}var G,J=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",Q=".sticky-top",X=".navbar-toggler",Y=function(e){(0,V.Z)(t,e);var n=(0,U.Z)(t);function t(){return(0,R.Z)(this,t),n.apply(this,arguments)}return(0,j.Z)(t,[{key:"adjustAndStore",value:function(e,n,t){var o=n.style[e];n.dataset[e]=o,(0,O.Z)(n,(0,C.Z)({},e,"".concat(parseFloat((0,O.Z)(n,e))+t,"px")))}},{key:"restore",value:function(e,n){var t=n.dataset[e];void 0!==t&&(delete n.dataset[e],(0,O.Z)(n,(0,C.Z)({},e,t)))}},{key:"setContainerStyle",value:function(e){var n=this;z((0,I.Z)(t.prototype),"setContainerStyle",this).call(this,e);var o,r,a=this.getElement();if(r="modal-open",(o=a).classList?o.classList.add(r):(0,$.Z)(o,r)||("string"===typeof o.className?o.className=o.className+" "+r:o.setAttribute("class",(o.className&&o.className.baseVal||"")+" "+r)),e.scrollBarWidth){var i=this.isRTL?"paddingLeft":"paddingRight",s=this.isRTL?"marginLeft":"marginRight";(0,_.Z)(a,J).forEach((function(t){return n.adjustAndStore(i,t,e.scrollBarWidth)})),(0,_.Z)(a,Q).forEach((function(t){return n.adjustAndStore(s,t,-e.scrollBarWidth)})),(0,_.Z)(a,X).forEach((function(t){return n.adjustAndStore(s,t,e.scrollBarWidth)}))}}},{key:"removeContainerStyle",value:function(e){var n=this;z((0,I.Z)(t.prototype),"removeContainerStyle",this).call(this,e);var o,r,a=this.getElement();r="modal-open",(o=a).classList?o.classList.remove(r):"string"===typeof o.className?o.className=q(o.className,r):o.setAttribute("class",q(o.className&&o.className.baseVal||"",r));var i=this.isRTL?"paddingLeft":"paddingRight",s=this.isRTL?"marginLeft":"marginRight";(0,_.Z)(a,J).forEach((function(e){return n.restore(i,e)})),(0,_.Z)(a,Q).forEach((function(e){return n.restore(s,e)})),(0,_.Z)(a,X).forEach((function(e){return n.restore(s,e)}))}}]),t}(D);var ee=t(72709),ne=t(66543),te=(0,ne.Z)("modal-body"),oe=b.createContext({onHide:function(){}}),re=t(10162),ae=["bsPrefix","className","contentClassName","centered","size","fullscreen","children","scrollable"],ie=b.forwardRef((function(e,n){var t=e.bsPrefix,o=e.className,i=e.contentClassName,l=e.centered,c=e.size,u=e.fullscreen,d=e.children,f=e.scrollable,v=(0,r.Z)(e,ae);t=(0,re.vE)(t,"modal");var h="".concat(t,"-dialog"),m="string"===typeof u?"".concat(t,"-fullscreen-").concat(u):"".concat(t,"-fullscreen");return(0,A.jsx)("div",(0,a.Z)((0,a.Z)({},v),{},{ref:n,className:s()(h,o,c&&"".concat(t,"-").concat(c),l&&"".concat(h,"-centered"),f&&"".concat(h,"-scrollable"),u&&m),children:(0,A.jsx)("div",{className:s()("".concat(t,"-content"),i),children:d})}))}));ie.displayName="ModalDialog";var se=ie,le=(0,ne.Z)("modal-footer"),ce=t(52007),ue=t.n(ce),de=["className","variant"],fe={"aria-label":ue().string,onClick:ue().func,variant:ue().oneOf(["white"])},ve=b.forwardRef((function(e,n){var t=e.className,o=e.variant,i=(0,r.Z)(e,de);return(0,A.jsx)("button",(0,a.Z)({ref:n,type:"button",className:s()("btn-close",o&&"btn-close-".concat(o),t)},i))}));ve.displayName="CloseButton",ve.propTypes=fe,ve.defaultProps={"aria-label":"Close"};var he=ve,me=["closeLabel","closeVariant","closeButton","onHide","children"],ge=b.forwardRef((function(e,n){var t=e.closeLabel,o=e.closeVariant,i=e.closeButton,s=e.onHide,l=e.children,c=(0,r.Z)(e,me),u=(0,b.useContext)(oe),d=(0,h.Z)((function(){null==u||u.onHide(),null==s||s()}));return(0,A.jsxs)("div",(0,a.Z)((0,a.Z)({ref:n},c),{},{children:[l,i&&(0,A.jsx)(he,{"aria-label":t,variant:o,onClick:d})]}))}));ge.defaultProps={closeLabel:"Close",closeButton:!1};var pe=ge,be=["bsPrefix","className"],ye=b.forwardRef((function(e,n){var t=e.bsPrefix,o=e.className,i=(0,r.Z)(e,be);return t=(0,re.vE)(t,"modal-header"),(0,A.jsx)(pe,(0,a.Z)((0,a.Z)({ref:n},i),{},{className:s()(o,t)}))}));ye.displayName="ModalHeader",ye.defaultProps={closeLabel:"Close",closeButton:!1};var Ze,Ee=ye,ke=(Ze="h4",b.forwardRef((function(e,n){return(0,A.jsx)("div",(0,a.Z)((0,a.Z)({},e),{},{ref:n,className:s()(e.className,Ze)}))}))),xe=(0,ne.Z)("modal-title",{Component:ke}),we=["bsPrefix","className","style","dialogClassName","contentClassName","children","dialogAs","aria-labelledby","aria-describedby","aria-label","show","animation","backdrop","keyboard","onEscapeKeyDown","onShow","onHide","container","autoFocus","enforceFocus","restoreFocus","restoreFocusOptions","onEntered","onExit","onExiting","onEnter","onEntering","onExited","backdropClassName","manager"],Ne={show:!1,backdrop:!0,keyboard:!0,autoFocus:!0,enforceFocus:!0,restoreFocus:!0,animation:!0,dialogAs:se};function Ce(e){return(0,A.jsx)(ee.Z,(0,a.Z)((0,a.Z)({},e),{},{timeout:null}))}function Re(e){return(0,A.jsx)(ee.Z,(0,a.Z)((0,a.Z)({},e),{},{timeout:null}))}var je=b.forwardRef((function(e,n){var t=e.bsPrefix,i=e.className,y=e.style,Z=e.dialogClassName,E=e.contentClassName,k=e.children,x=e.dialogAs,w=e["aria-labelledby"],N=e["aria-describedby"],C=e["aria-label"],R=e.show,j=e.animation,O=e.backdrop,T=e.keyboard,F=e.onEscapeKeyDown,S=e.onShow,D=e.onHide,B=e.container,L=e.autoFocus,M=e.enforceFocus,P=e.restoreFocus,H=e.restoreFocusOptions,I=e.onEntered,K=e.onExit,z=e.onExiting,V=e.onEnter,U=e.onEntering,$=e.onExited,_=e.backdropClassName,q=e.manager,J=(0,r.Z)(e,we),Q=(0,b.useState)({}),X=(0,o.Z)(Q,2),ee=X[0],ne=X[1],te=(0,b.useState)(!1),ae=(0,o.Z)(te,2),ie=ae[0],se=ae[1],le=(0,b.useRef)(!1),ce=(0,b.useRef)(!1),ue=(0,b.useRef)(null),de=(0,v.Z)(),fe=(0,o.Z)(de,2),ve=fe[0],he=fe[1],me=(0,m.Z)(n,he),ge=(0,h.Z)(D),pe=(0,re.SC)();t=(0,re.vE)(t,"modal");var be=(0,b.useMemo)((function(){return{onHide:ge}}),[ge]);function ye(){return q||(e={isRTL:pe},G||(G=new Y(e)),G);var e}function Ze(e){if(c.Z){var n=ye().getScrollbarWidth()>0,t=e.scrollHeight>(0,u.Z)(e).documentElement.clientHeight;ne({paddingRight:n&&!t?(0,f.default)():void 0,paddingLeft:!n&&t?(0,f.default)():void 0})}}var Ee=(0,h.Z)((function(){ve&&Ze(ve.dialog)}));(0,g.Z)((function(){(0,d.Z)(window,"resize",Ee),null==ue.current||ue.current()}));var ke=function(){le.current=!0},xe=function(e){le.current&&ve&&e.target===ve.dialog&&(ce.current=!0),le.current=!1},Ne=function(){se(!0),ue.current=(0,p.Z)(ve.dialog,(function(){se(!1)}))},je=function(e){"static"!==O?ce.current||e.target!==e.currentTarget?ce.current=!1:null==D||D():function(e){e.target===e.currentTarget&&Ne()}(e)},Oe=(0,b.useCallback)((function(e){return(0,A.jsx)("div",(0,a.Z)((0,a.Z)({},e),{},{className:s()("".concat(t,"-backdrop"),_,!j&&"show")}))}),[j,_,t]),Te=(0,a.Z)((0,a.Z)({},y),ee);Te.display="block";return(0,A.jsx)(oe.Provider,{value:be,children:(0,A.jsx)(W,{show:R,ref:me,backdrop:O,container:B,keyboard:!0,autoFocus:L,enforceFocus:M,restoreFocus:P,restoreFocusOptions:H,onEscapeKeyDown:function(e){T||"static"!==O?T&&F&&F(e):(e.preventDefault(),Ne())},onShow:S,onHide:D,onEnter:function(e,n){e&&Ze(e),null==V||V(e,n)},onEntering:function(e,n){null==U||U(e,n),(0,l.ZP)(window,"resize",Ee)},onEntered:I,onExit:function(e){null==ue.current||ue.current(),null==K||K(e)},onExiting:z,onExited:function(e){e&&(e.style.display=""),null==$||$(e),(0,d.Z)(window,"resize",Ee)},manager:ye(),transition:j?Ce:void 0,backdropTransition:j?Re:void 0,renderBackdrop:Oe,renderDialog:function(e){return(0,A.jsx)("div",(0,a.Z)((0,a.Z)({role:"dialog"},e),{},{style:Te,className:s()(i,t,ie&&"".concat(t,"-static")),onClick:O?je:void 0,onMouseUp:xe,"aria-label":C,"aria-labelledby":w,"aria-describedby":N,children:(0,A.jsx)(x,(0,a.Z)((0,a.Z)({},J),{},{onMouseDown:ke,className:Z,contentClassName:E,children:k}))}))}})})}));je.displayName="Modal",je.defaultProps=Ne;var Oe=Object.assign(je,{Body:te,Header:Ee,Title:xe,Footer:le,Dialog:se,TRANSITION_DURATION:300,BACKDROP_TRANSITION_DURATION:150})}}]);
//# sourceMappingURL=958.df971118.chunk.js.map