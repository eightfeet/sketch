(this.webpackJsonpsketck=this.webpackJsonpsketck||[]).push([[3],{100:function(e,t,n){"use strict";n.r(t);var i=n(24),r=n(12),c=n.n(r),o=n(0),a=n.n(o),u=n(23),s=n.n(u),d=n(45),l=(n(80),function(e){e&&e instanceof Function&&n.e(11).then(n.bind(null,154)).then((function(t){var n=t.getCLS,i=t.getFID,r=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),i(e),r(e),c(e),o(e)}))}),f=n(59),m=n(5),b=n(46),w=n(3),p=[{name:"SKETCH",page:"home",component:a.a.lazy((function(){return Promise.all([n.e(1),n.e(2),n.e(6)]).then(n.bind(null,155))}))},{name:"MODELS",page:"models",component:a.a.lazy((function(){return Promise.all([n.e(0),n.e(8)]).then(n.bind(null,156))}))},{name:"CONTENTS",page:"contents",component:a.a.lazy((function(){return Promise.all([n.e(0),n.e(10)]).then(n.bind(null,159))}))},{name:"SKETCH",page:"view",component:a.a.lazy((function(){return Promise.all([n.e(1),n.e(9)]).then(n.bind(null,158))}))},{name:"demo",page:"demo",component:a.a.lazy((function(){return Promise.all([n.e(2),n.e(7)]).then(n.bind(null,157))}))}];var h=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];console.log(e);var n=Object(o.useRef)(document.title);Object(o.useEffect)((function(){e&&(document.title=e)}),[e]),Object(o.useEffect)((function(){return function(){t||(document.title=n.current)}}),[])},j=n(38),O=n(47),v=n(48),_=n(6),g=new j.QueryClient({defaultOptions:{queries:{refetchOnWindowFocus:"true"===Object({NODE_ENV:"production",PUBLIC_URL:"https://www.eightfeet.cn/sketch",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_NAME:"\u9875\u9762\u540d\u79f0",REACT_APP_SKETCH_URL:".",REACT_APP_MPATH_M1:"http://www.eightfeet.cn/md1/assets/",REACT_APP_MPATH_M2:"https://www.eightfeet.cn/md2/",REACT_APP_MPATH_M3:"https://www.eightfeet.cn/md3/"}).REACT_APP_PRO}}}),T=function(e){var t=e.component,n=e.name;return h(n,!0),Object(o.useEffect)((function(){setTimeout((function(){return Object(v.b)(document.title)}),1e3)}),[]),Object(_.jsx)(t,{})};var E=function(){return Object(_.jsx)(j.QueryClientProvider,{client:g,children:Object(_.jsx)(b.a,{children:Object(_.jsx)(a.a.Suspense,{fallback:Object(_.jsx)(O.a,{style:{width:"100vw",height:"100vh"}}),children:Object(_.jsx)(w.d,{children:Object(_.jsxs)(w.b,{path:"/",element:Object(_.jsx)(w.a,{}),children:[p.map((function(e){var t=e.page,n=e.name,i=e.path,r=e.component,c={key:t,element:Object(_.jsx)(T,{name:n,component:r})};return"home"===t?c.index=!0:c.path=i||t,Object(_.jsx)(w.b,Object(m.a)({},c))})),Object(_.jsx)(w.b,{path:"*",element:Object(_.jsx)("div",{children:"\u9875\u9762\u4e0d\u5b58\u5728"})})]})})})})})},P=n(14),L=n(36),A=n(56),C=n.n(A),S=n(64),y=n.n(S);function x(){return(x=Object(i.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s.a.render(Object(_.jsx)(a.a.StrictMode,{children:Object(_.jsx)(d.a,{store:P.c,children:Object(_.jsx)(f.a,{persistor:P.b,loading:null,children:Object(_.jsx)(E,{})})})}),document.getElementById("root"));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}C.a.extend(y.a),Object(L.d)(),Object(L.c)(),function(){x.apply(this,arguments)}(),l()},14:function(e,t,n){"use strict";n.d(t,"a",(function(){return T})),n.d(t,"c",(function(){return E})),n.d(t,"b",(function(){return P}));var i=n(25),r=n(35),c=n(61),o=n.n(c),a=(n(84),n(22)),u=n(5),s=n(20),d=["modelList"],l=["pictureList"],f=["keepingTime"],m={modelList:[],pictureList:[],keepingTime:5},b=Object(i.a)()({state:m,reducers:{init:function(){return m},initModelList:Object(s.a)((function(e){return Object(u.a)(Object(u.a)({},e),{},{modelList:m.modelList})})),setModelList:Object(s.a)((function(e,t){return Object(u.a)(Object(u.a)({},e),{},{modelList:t})})),onToggleModelList:function(e,t){var n=e.modelList,i=Object(a.a)(e,d),r=n.some((function(e){return e.imgUrl===t.imgUrl}));return n=r?n.filter((function(e){return e.imgUrl!==t.imgUrl})):n.concat([t]),Object(u.a)(Object(u.a)({},i),{},{modelList:n})},setPictureList:Object(s.a)((function(e,t){return Object(u.a)(Object(u.a)({},e),{},{pictureList:t})})),initPictureList:Object(s.a)((function(e){return Object(u.a)(Object(u.a)({},e),{},{pictureList:m.pictureList})})),onTogglePictureList:function(e,t){var n=e.pictureList,i=Object(a.a)(e,l),r=n.some((function(e){return e.imgUrl===t.imgUrl}));return n=r?n.filter((function(e){return e.imgUrl!==t.imgUrl})):n.concat([t]),Object(u.a)(Object(u.a)({},i),{},{pictureList:n})},setKeepingTime:function(e,t){e.keepingTime;var n=Object(a.a)(e,f);return Object(u.a)(Object(u.a)({},n),{},{keepingTime:t})}}}),w={},p={runtime:Object(i.a)()({state:w,reducers:{init:function(){return w},set:Object(s.a)((function(e,t){var n=t.name,i=t.value;void 0===i?delete e[n]:e[n]=i}))}}),dynamics:b},h=n(32),j=n(62),O=n(63),v=n.n(O),_=Object(h.parse)(window.location.search).jwt,g=function(){var e,t="tourist";_&&(t=null===(e=Object(j.a)(_))||void 0===e?void 0:e.sub);var n={key:"byhealth-training-".concat(t),storage:o.a,stateReconciler:v.a};return{persistConfig:n,store:Object(i.b)({redux:{middlewares:[]},models:p,plugins:[Object(r.a)(n)]}),persistor:Object(r.b)()}}(),T=g.persistConfig,E=g.store,P=g.persistor},36:function(e,t,n){"use strict";n.d(t,"e",(function(){return s})),n.d(t,"d",(function(){return d})),n.d(t,"c",(function(){return l})),n.d(t,"b",(function(){return f})),n.d(t,"a",(function(){return m}));var i=n(24),r=n(12),c=n.n(r),o=n(21),a=n(14),u=n(32),s=(Object(u.parse)(window.location.hash.split("?")[1]||"").t,function(e){return"".concat(e/31.25,"rem")}),d=function(){var e=0,t=function(){var t=Object(i.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e&&window.clearTimeout(e),e=window.setTimeout(Object(i.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(window.location.hash.indexOf("#/studying")>=0)){e.next=5;break}return e.next=3,Object(o.b)(a.a);case 3:t=e.sent,a.c.dispatch({type:o.a,key:a.a.key,payload:t});case 5:a.b.persist();case 6:case"end":return e.stop()}}),e)}))),50);case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return"undefined"!==typeof window&&window.addEventListener&&(window.addEventListener("visibilitychange",t,!1),window.addEventListener("focus",t,!1),window.addEventListener("showpage",t,!1)),function(){window.removeEventListener("visibilitychange",t),window.removeEventListener("focus",t),window.removeEventListener("showpage",t)}},l=function(){var e=function(e){a.b.pause(),a.b.flush()};return"undefined"!==typeof window&&window.addEventListener&&window.addEventListener("blur",e,!1),function(){window.removeEventListener("blur",e)}};function f(e){var t=new window.Date;return new Date(1e3*(t.getTime()/1e3+60*e))}function m(e){var t=new Date,n=e.getTime()-t.getTime(),i=parseInt("".concat(n/1e3),0),r=Math.floor(i/86400),c=Math.floor((i-24*r*60*60)/3600),o=Math.floor((i-24*r*60*60-3600*c)/60),a=Math.floor(i-24*r*60*60-3600*c-60*o);return(c>=10?c:"0"+c)+":"+(o>=10?o:"0"+o)+":"+(a>=10?a:"0"+a)}},47:function(e,t,n){"use strict";var i=n(5),r=n(22),c=n(42),o=n.n(c),a=(n(0),n(60)),u=n.n(a),s=n(6),d=["className"],l=function(e){var t=e.className,n=Object(r.a)(e,d);return Object(s.jsx)("div",Object(i.a)({className:o()(u.a.root,t)},n))};t.a=l},48:function(e,t,n){"use strict";n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return o}));var i={};var r=function(e){return i[e]||(i[e]=new Promise((function(t,n){var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.addEventListener("load",(function(){return t()}),!1),r.addEventListener("error",(function(){document.head.removeChild(r),delete i[e],n()}),!1),document.head.appendChild(r)}))),i[e]};function c(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];window._hmt.push(["_trackPageview"].concat(t))}function o(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];console.log(t),window._hmt.push(["_trackEvent"].concat(t))}window._hmt=window._hmt||[],window._hmt.push(["_setAutoPageview",!1]),r("https://hm.baidu.com/hm.js?".concat(Object({NODE_ENV:"production",PUBLIC_URL:"https://www.eightfeet.cn/sketch",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_NAME:"\u9875\u9762\u540d\u79f0",REACT_APP_SKETCH_URL:".",REACT_APP_MPATH_M1:"http://www.eightfeet.cn/md1/assets/",REACT_APP_MPATH_M2:"https://www.eightfeet.cn/md2/",REACT_APP_MPATH_M3:"https://www.eightfeet.cn/md3/"}).REACT_APP_BD_STATISTISC))},60:function(e,t,n){e.exports={root:"BlockLoading_root__2iXJb"}},80:function(e,t,n){}},[[100,4,5]]]);