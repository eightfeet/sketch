(this.webpackJsonpsketck=this.webpackJsonpsketck||[]).push([[4],{33:function(e,t,n){"use strict";n.d(t,"a",(function(){return P})),n.d(t,"c",(function(){return T})),n.d(t,"b",(function(){return A}));var c,i=n(21),r=n(31),o=n(57),a=n.n(o),u=(n(79),n(15)),s=n(5),l=n(19);!function(e){e["\u6a2a\u5411"]="X",e["\u7ad6\u5411"]="Y",e["\u7740\u8863"]="Clothes",e["\u4eba\u4f53"]="Body",e["\u7537\u6027"]="Male",e["\u5973\u6027"]="Female",e["\u5934\u50cf"]="Header",e["\u624b\u8db3"]="HandsFeet",e["\u534a\u8eab"]="Half",e["\u7ec4\u5408"]="Group",e["\u9759\u7269"]="Still",e["\u89c6\u9891"]="Video",e["\u7ed3\u6784"]="Structure"}(c||(c={}));var d=["modelList"],m=["pictureList"],b=["keepingTime"],f=["pictureFilter"],j=["modelFilter"],p={modelList:[],pictureList:[],keepingTime:5,pictureFilter:[],modelFilter:[c.\u7740\u8863]},O=Object(i.a)()({state:p,reducers:{init:function(){return p},initModelList:Object(l.a)((function(e){return Object(s.a)(Object(s.a)({},e),{},{modelList:p.modelList})})),setModelList:Object(l.a)((function(e,t){return Object(s.a)(Object(s.a)({},e),{},{modelList:t})})),onToggleModelList:function(e,t){var n=e.modelList,c=Object(u.a)(e,d),i=n.some((function(e){return e.imgUrl===t.imgUrl}));return n=i?n.filter((function(e){return e.imgUrl!==t.imgUrl})):n.concat([t]),Object(s.a)(Object(s.a)({},c),{},{modelList:n})},setPictureList:Object(l.a)((function(e,t){return Object(s.a)(Object(s.a)({},e),{},{pictureList:t})})),initPictureList:Object(l.a)((function(e){return Object(s.a)(Object(s.a)({},e),{},{pictureList:p.pictureList})})),onTogglePictureList:function(e,t){var n=e.pictureList,c=Object(u.a)(e,m),i=n.some((function(e){return e.imgUrl===t.imgUrl}));return n=i?n.filter((function(e){return e.imgUrl!==t.imgUrl})):n.concat([t]),Object(s.a)(Object(s.a)({},c),{},{pictureList:n})},setKeepingTime:function(e,t){e.keepingTime;var n=Object(u.a)(e,b);return Object(s.a)(Object(s.a)({},n),{},{keepingTime:t})},setPictureFilter:function(e,t){e.pictureFilter;var n=Object(u.a)(e,f);return Object(s.a)(Object(s.a)({},n),{},{pictureFilter:t})},setModelFilter:function(e,t){e.modelFilter;var n=Object(u.a)(e,j);return Object(s.a)(Object(s.a)({},n),{},{modelFilter:t})}}}),h={},g={runtime:Object(i.a)()({state:h,reducers:{init:function(){return h},set:Object(l.a)((function(e,t){var n=t.name,c=t.value;void 0===c?delete e[n]:e[n]=c}))}}),dynamics:O},_=n(58),v=n.n(_),w=function(){var e={key:"sketch-persist",storage:a.a,stateReconciler:v.a};return{persistConfig:e,store:Object(i.b)({redux:{middlewares:[]},models:g,plugins:[Object(r.a)(e)]}),persistor:Object(r.b)()}}(),P=w.persistConfig,T=w.store,A=w.persistor},44:function(e,t,n){"use strict";var c=n(5),i=n(15),r=n(38),o=n.n(r),a=(n(0),n(56)),u=n.n(a),s=n(6),l=["className"],d=function(e){var t=e.className,n=Object(i.a)(e,l);return Object(s.jsx)("div",Object(c.a)({className:o()(u.a.root,t)},n))};t.a=d},46:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return o}));var c={};var i=function(e){return c[e]||(c[e]=new Promise((function(t,n){var i=document.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.addEventListener("load",(function(){return t()}),!1),i.addEventListener("error",(function(){document.head.removeChild(i),delete c[e],n()}),!1),document.head.appendChild(i)}))),c[e]};function r(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];window._hmt.push(["_trackPageview"].concat(t))}function o(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];console.log(t),window._hmt.push(["_trackEvent"].concat(t))}window._hmt=window._hmt||[],window._hmt.push(["_setAutoPageview",!1]),i("https://hm.baidu.com/hm.js?".concat("537cc4de3499d360a49e5a9ee06272cb"))},56:function(e,t,n){e.exports={root:"BlockLoading_root__2iXJb"}},75:function(e,t,n){},81:function(e,t,n){"use strict";n.r(t);var c=n(42),i=n(32),r=n.n(i),o=n(0),a=n.n(o),u=n(20),s=n.n(u),l=n(41),d=(n(75),function(e){e&&e instanceof Function&&n.e(13).then(n.bind(null,160)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),c(e),i(e),r(e),o(e)}))}),m=n(55),b=n(5),f=n(43),j=n(3),p=[{name:"SKETCH",page:"home",component:a.a.lazy((function(){return Promise.all([n.e(0),n.e(3),n.e(2),n.e(10)]).then(n.bind(null,161))}))},{name:"MODELS",page:"models",component:a.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(8)]).then(n.bind(null,164))}))},{name:"CONTENTS",page:"contents",component:a.a.lazy((function(){return Promise.all([n.e(0),n.e(9),n.e(1),n.e(12)]).then(n.bind(null,165))}))},{name:"SKETCH",page:"view",component:a.a.lazy((function(){return Promise.all([n.e(0),n.e(3),n.e(2),n.e(11)]).then(n.bind(null,162))}))},{name:"demo",page:"demo",component:a.a.lazy((function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,163))}))}];var O=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];console.log(e);var n=Object(o.useRef)(document.title);Object(o.useEffect)((function(){e&&(document.title=e)}),[e]),Object(o.useEffect)((function(){return function(){t||(document.title=n.current)}}),[])},h=n(36),g=n(44),_=n(46),v=n(6),w=new h.QueryClient({defaultOptions:{queries:{refetchOnWindowFocus:"true"===Object({NODE_ENV:"production",PUBLIC_URL:"https://www.eightfeet.cn/sketch",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_MPATH_M1:"http://www.eightfeet.cn/md1/assets/",REACT_APP_MPATH_M2:"https://www.eightfeet.cn/md2/",REACT_APP_MPATH_M3:"https://www.eightfeet.cn/md3/",REACT_APP_BD_STATISTISC:"537cc4de3499d360a49e5a9ee06272cb",REACT_APP_NAME:"\u9875\u9762\u540d\u79f0",REACT_APP_SKETCH_URL:".",REACT_APP_MPATH_M4:"https://www.eightfeet.cn/md4/",REACT_APP_MPATH_M5:"https://www.eightfeet.cn/md5/"}).REACT_APP_PRO}}}),P=function(e){var t=e.component,n=e.name;return O(n,!0),Object(o.useEffect)((function(){setTimeout((function(){return Object(_.b)(document.title)}),1e3)}),[]),Object(v.jsx)(t,{})};var T=function(){return Object(v.jsx)(h.QueryClientProvider,{client:w,children:Object(v.jsx)(f.a,{children:Object(v.jsx)(a.a.Suspense,{fallback:Object(v.jsx)(g.a,{style:{width:"100vw",height:"100vh"}}),children:Object(v.jsx)(j.d,{children:Object(v.jsxs)(j.b,{path:"/",element:Object(v.jsx)(j.a,{}),children:[p.map((function(e){var t=e.page,n=e.name,c=e.path,i=e.component,r={key:t,element:Object(v.jsx)(P,{name:n,component:i})};return"home"===t?r.index=!0:r.path=c||t,Object(v.jsx)(j.b,Object(b.a)({},r))})),Object(v.jsx)(j.b,{path:"*",element:Object(v.jsx)("div",{children:"\u9875\u9762\u4e0d\u5b58\u5728"})})]})})})})})},A=n(33),E=n(45),L=n.n(E),C=n(59),x=n.n(C);function S(){return(S=Object(c.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s.a.render(Object(v.jsx)(a.a.StrictMode,{children:Object(v.jsx)(l.a,{store:A.c,children:Object(v.jsx)(m.a,{persistor:A.b,loading:null,children:Object(v.jsx)(T,{})})})}),document.getElementById("root"));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}L.a.extend(x.a),function(){S.apply(this,arguments)}(),d()}},[[81,5,6]]]);