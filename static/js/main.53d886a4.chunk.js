(this.webpackJsonpsketck=this.webpackJsonpsketck||[]).push([[3],{33:function(e,s,t){"use strict";t.d(s,"a",(function(){return C})),t.d(s,"c",(function(){return S})),t.d(s,"b",(function(){return M}));var i=t(21),l=t(31),a=t(57),r=t.n(a),d=(t(80),t(15)),f=t(4),n=t(19),o=t(58),m=["modelList"],c=["pictureList"],u=["keepingTime"],j=["pictureFilter"],g=["modelFilter"],p={modelList:[],pictureList:[],keepingTime:5,pictureFilter:{isX:!0,isY:!0},modelFilter:{isMale:!1,isFemale:!1,isClothes:!0,isBody:!1,isHeader:!1,isHandsFeet:!1,isStill:!1}},h=Object(i.a)()({state:Object(f.a)(Object(f.a)({},p),{},{modelList:o}),reducers:{init:function(){return p},initModelList:Object(n.a)((function(e){return Object(f.a)(Object(f.a)({},e),{},{modelList:p.modelList})})),setModelList:Object(n.a)((function(e,s){return Object(f.a)(Object(f.a)({},e),{},{modelList:s})})),onToggleModelList:function(e,s){var t=e.modelList,i=Object(d.a)(e,m),l=t.some((function(e){return e.imgUrl===s.imgUrl}));return t=l?t.filter((function(e){return e.imgUrl!==s.imgUrl})):t.concat([s]),Object(f.a)(Object(f.a)({},i),{},{modelList:t})},setPictureList:Object(n.a)((function(e,s){return Object(f.a)(Object(f.a)({},e),{},{pictureList:s})})),initPictureList:Object(n.a)((function(e){return Object(f.a)(Object(f.a)({},e),{},{pictureList:p.pictureList})})),onTogglePictureList:function(e,s){var t=e.pictureList,i=Object(d.a)(e,c),l=t.some((function(e){return e.imgUrl===s.imgUrl}));return t=l?t.filter((function(e){return e.imgUrl!==s.imgUrl})):t.concat([s]),Object(f.a)(Object(f.a)({},i),{},{pictureList:t})},setKeepingTime:function(e,s){e.keepingTime;var t=Object(d.a)(e,u);return Object(f.a)(Object(f.a)({},t),{},{keepingTime:s})},setPictureFilter:function(e,s){var t=e.pictureFilter,i=Object(d.a)(e,j);return Object(f.a)(Object(f.a)({},i),{},{pictureFilter:Object(f.a)(Object(f.a)({},t),s)})},setModelFilter:function(e,s){var t=e.modelFilter,i=Object(d.a)(e,g);return Object(f.a)(Object(f.a)({},i),{},{modelFilter:Object(f.a)(Object(f.a)({},t),s)})}}}),b={},F={runtime:Object(i.a)()({state:b,reducers:{init:function(){return b},set:Object(n.a)((function(e,s){var t=s.name,i=s.value;void 0===i?delete e[t]:e[t]=i}))}}),dynamics:h},H=t(59),O=t.n(H),y=function(){var e={key:"sketch-persist",storage:r.a,stateReconciler:O.a};return{persistConfig:e,store:Object(i.b)({redux:{middlewares:[]},models:F,plugins:[Object(l.a)(e)]}),persistor:Object(l.b)()}}(),C=y.persistConfig,S=y.store,M=y.persistor},44:function(e,s,t){"use strict";t.d(s,"b",(function(){return a})),t.d(s,"a",(function(){return r}));var i={};var l=function(e){return i[e]||(i[e]=new Promise((function(s,t){var l=document.createElement("script");l.type="text/javascript",l.async=!0,l.src=e,l.addEventListener("load",(function(){return s()}),!1),l.addEventListener("error",(function(){document.head.removeChild(l),delete i[e],t()}),!1),document.head.appendChild(l)}))),i[e]};function a(){for(var e=arguments.length,s=new Array(e),t=0;t<e;t++)s[t]=arguments[t];window._hmt.push(["_trackPageview"].concat(s))}function r(){for(var e=arguments.length,s=new Array(e),t=0;t<e;t++)s[t]=arguments[t];console.log(s),window._hmt.push(["_trackEvent"].concat(s))}window._hmt=window._hmt||[],window._hmt.push(["_setAutoPageview",!1]),l("https://hm.baidu.com/hm.js?".concat("d47623ddc00ae8b91bef5e96a47110d2"))},45:function(e,s,t){"use strict";var i=t(4),l=t(15),a=t(38),r=t.n(a),d=(t(0),t(56)),f=t.n(d),n=t(6),o=["className"],m=function(e){var s=e.className,t=Object(l.a)(e,o);return Object(n.jsx)("div",Object(i.a)({className:r()(f.a.root,s)},t))};s.a=m},56:function(e,s,t){e.exports={root:"BlockLoading_root__2iXJb"}},58:function(e){e.exports=JSON.parse('[{"imgUrl":"035-y&491&654.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":true,"isFemale":false,"isHeader":false,"isHandsFeet":false,"mdId":"md04","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"011-y&410&716.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":false,"isFemale":true,"isHeader":false,"isHandsFeet":false,"mdId":"md02","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"022-x&786&692.jpg","isX":true,"isY":false,"isClothes":true,"isBody":false,"isMale":true,"isFemale":false,"isHeader":false,"isHandsFeet":false,"mdId":"md03","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"045-y&598&709.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":true,"isFemale":false,"isHeader":false,"isHandsFeet":false,"mdId":"md05","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"105-x&1136&724.jpg","isX":true,"isY":false,"isClothes":true,"isBody":false,"isMale":false,"isFemale":true,"isHeader":false,"isHandsFeet":false,"mdId":"md09","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"116-x&727&703.jpg","isX":true,"isY":false,"isClothes":true,"isBody":false,"isMale":false,"isFemale":true,"isHeader":false,"isHandsFeet":false,"mdId":"md10","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"152-y&520&708.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":true,"isFemale":false,"isHeader":false,"isHandsFeet":false,"mdId":"md13","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"177-y&832&961.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":false,"isFemale":true,"isHeader":false,"isHandsFeet":false,"mdId":"md15","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"196-y&729&1096.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":true,"isFemale":false,"isHeader":false,"isHandsFeet":false,"mdId":"md17","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"189-y&627&1000.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":false,"isFemale":true,"isHeader":false,"isHandsFeet":false,"mdId":"md16","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"203-y&640&786.jpg","isX":false,"isY":true,"isClothes":false,"isBody":false,"isMale":false,"isFemale":false,"isHeader":false,"isHandsFeet":true,"mdId":"md18","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"232-x&663&531.jpg","isX":true,"isY":false,"isClothes":false,"isBody":false,"isMale":false,"isFemale":false,"isHeader":false,"isHandsFeet":true,"mdId":"md19","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"401-y&898&1420.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":false,"isFemale":true,"isHeader":false,"isHandsFeet":false,"mdId":"md22","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"271-y&688&1000.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":true,"isFemale":false,"isHeader":true,"isHandsFeet":false,"mdId":"md20","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"594-y&848&1407.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":false,"isFemale":true,"isHeader":false,"isHandsFeet":false,"mdId":"md37","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"633-x&1708&1185.jpg","isX":true,"isY":false,"isClothes":true,"isBody":false,"isMale":false,"isFemale":true,"isHeader":false,"isHandsFeet":false,"mdId":"md40","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"669-y&980&1470.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":false,"isFemale":true,"isHeader":true,"isHandsFeet":false,"mdId":"md43","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"918-y&980&1470.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":false,"isFemale":true,"isHeader":true,"isHandsFeet":false,"mdId":"md45","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"778-y&980&1470.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":false,"isFemale":true,"isHeader":true,"isHandsFeet":false,"mdId":"md44","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"953-y&980&1470.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":true,"isFemale":false,"isHeader":true,"isHandsFeet":false,"mdId":"md46","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"1360-y&980&1470.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":false,"isFemale":true,"isHeader":true,"isHandsFeet":false,"mdId":"md48","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"1300-y&980&1470.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":true,"isFemale":false,"isHeader":true,"isHandsFeet":false,"mdId":"md47","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"1423-y&980&1470.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":true,"isFemale":false,"isHeader":false,"isHandsFeet":false,"isHalf":true,"mdId":"md49","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"1501-y&980&1470.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":true,"isFemale":false,"isHeader":true,"isHandsFeet":false,"isHalf":false,"mdId":"md51","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"1459-y&980&1470.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":false,"isFemale":true,"isHeader":false,"isHandsFeet":false,"isHalf":true,"mdId":"md50","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"1874-y&980&1470.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":false,"isFemale":true,"isHeader":true,"isHandsFeet":false,"isHalf":false,"mdId":"md52","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"2258-y&980&1470.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":false,"isFemale":true,"isHeader":false,"isHandsFeet":false,"isHalf":false,"mdId":"md54","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"2216-y&980&1470.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":true,"isFemale":false,"isHeader":false,"isHandsFeet":false,"isHalf":false,"mdId":"md53","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"2316-y&980&1470.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":true,"isFemale":false,"isHeader":false,"isHandsFeet":false,"isHalf":false,"mdId":"md55","selected":false,"isStill":false,"from":"md1"},{"imgUrl":"2451-y&980&1470.jpg","isX":false,"isY":true,"isClothes":true,"isBody":false,"isMale":false,"isFemale":true,"isHeader":false,"isHandsFeet":false,"isHalf":false,"mdId":"md56","selected":false,"isStill":false,"from":"md1"}]')},76:function(e,s,t){},82:function(e,s,t){"use strict";t.r(s);var i=t(40),l=t(32),a=t.n(l),r=t(0),d=t.n(r),f=t(20),n=t.n(f),o=t(41),m=(t(76),function(e){e&&e instanceof Function&&t.e(11).then(t.bind(null,158)).then((function(s){var t=s.getCLS,i=s.getFID,l=s.getFCP,a=s.getLCP,r=s.getTTFB;t(e),i(e),l(e),a(e),r(e)}))}),c=t(55),u=t(4),j=t(43),g=t(3),p=[{name:"SKETCH",page:"home",component:d.a.lazy((function(){return Promise.all([t.e(0),t.e(2),t.e(6)]).then(t.bind(null,161))}))},{name:"MODELS",page:"models",component:d.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(9)]).then(t.bind(null,159))}))},{name:"CONTENTS",page:"contents",component:d.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(10)]).then(t.bind(null,163))}))},{name:"SKETCH",page:"view",component:d.a.lazy((function(){return Promise.all([t.e(0),t.e(2),t.e(8)]).then(t.bind(null,162))}))},{name:"demo",page:"demo",component:d.a.lazy((function(){return Promise.all([t.e(0),t.e(7)]).then(t.bind(null,160))}))}];var h=function(e){var s=arguments.length>1&&void 0!==arguments[1]&&arguments[1];console.log(e);var t=Object(r.useRef)(document.title);Object(r.useEffect)((function(){e&&(document.title=e)}),[e]),Object(r.useEffect)((function(){return function(){s||(document.title=t.current)}}),[])},b=t(35),F=t(45),H=t(44),O=t(6),y=new b.QueryClient({defaultOptions:{queries:{refetchOnWindowFocus:"true"===Object({NODE_ENV:"production",PUBLIC_URL:"https://www.eightfeet.cn/sketch",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BD_STATISTISC:"d47623ddc00ae8b91bef5e96a47110d2",REACT_APP_MPATH_M1:"http://www.eightfeet.cn/md1/assets/",REACT_APP_MPATH_M2:"https://www.eightfeet.cn/md2/",REACT_APP_MPATH_M3:"https://www.eightfeet.cn/md3/",REACT_APP_NAME:"\u9875\u9762\u540d\u79f0",REACT_APP_SKETCH_URL:"."}).REACT_APP_PRO}}}),C=function(e){var s=e.component,t=e.name;return h(t,!0),Object(r.useEffect)((function(){setTimeout((function(){return Object(H.b)(document.title)}),1e3)}),[]),Object(O.jsx)(s,{})};var S=function(){return Object(O.jsx)(b.QueryClientProvider,{client:y,children:Object(O.jsx)(j.a,{children:Object(O.jsx)(d.a.Suspense,{fallback:Object(O.jsx)(F.a,{style:{width:"100vw",height:"100vh"}}),children:Object(O.jsx)(g.d,{children:Object(O.jsxs)(g.b,{path:"/",element:Object(O.jsx)(g.a,{}),children:[p.map((function(e){var s=e.page,t=e.name,i=e.path,l=e.component,a={key:s,element:Object(O.jsx)(C,{name:t,component:l})};return"home"===s?a.index=!0:a.path=i||s,Object(O.jsx)(g.b,Object(u.a)({},a))})),Object(O.jsx)(g.b,{path:"*",element:Object(O.jsx)("div",{children:"\u9875\u9762\u4e0d\u5b58\u5728"})})]})})})})})},M=t(33),v=t(52),U=t.n(v),_=t(60),w=t.n(_);function B(){return(B=Object(i.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.a.render(Object(O.jsx)(d.a.StrictMode,{children:Object(O.jsx)(o.a,{store:M.c,children:Object(O.jsx)(c.a,{persistor:M.b,loading:null,children:Object(O.jsx)(S,{})})})}),document.getElementById("root"));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}U.a.extend(w.a),function(){B.apply(this,arguments)}(),m()}},[[82,4,5]]]);