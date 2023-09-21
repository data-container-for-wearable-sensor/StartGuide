"use strict";(self.webpackChunktestlab_tutoriala=self.webpackChunktestlab_tutoriala||[]).push([[172],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>d});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=p(r),f=a,d=s["".concat(c,".").concat(f)]||s[f]||m[f]||o;return r?n.createElement(d,i(i({ref:t},u),{},{components:r})):n.createElement(d,i({ref:t},u))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=f;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[s]="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},2545:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var n=r(7462),a=(r(7294),r(3905));const o={},i="Introduction",l={unversionedId:"intro/index",id:"intro/index",title:"Introduction",description:"\u3053\u306e\u30b5\u30a4\u30c8\u306e\u76ee\u7684",source:"@site/docs/intro/index.md",sourceDirName:"intro",slug:"/intro/",permalink:"/testlab-tutorial/docs/intro/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",next:{title:"\u30b3\u30f3\u30c6\u30ca\u30d5\u30a9\u30fc\u30de\u30c3\u30c8:\u57fa\u790e\u77e5\u8b58",permalink:"/testlab-tutorial/docs/spec_guide/"}},c={},p=[{value:"\u3053\u306e\u30b5\u30a4\u30c8\u306e\u76ee\u7684",id:"\u3053\u306e\u30b5\u30a4\u30c8\u306e\u76ee\u7684",level:2},{value:"\u30b3\u30f3\u30c6\u30ca\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u306e\u76ee\u7684",id:"\u30b3\u30f3\u30c6\u30ca\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u306e\u76ee\u7684",level:2}],u={toc:p},s="wrapper";function m(e){let{components:t,...o}=e;return(0,a.kt)(s,(0,n.Z)({},u,o,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"introduction"},"Introduction"),(0,a.kt)("h2",{id:"\u3053\u306e\u30b5\u30a4\u30c8\u306e\u76ee\u7684"},"\u3053\u306e\u30b5\u30a4\u30c8\u306e\u76ee\u7684"),(0,a.kt)("p",null,"Start Guide of Container Format \u306f\u3001\u30b3\u30f3\u30c6\u30ca\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u3092\u7406\u89e3\u3057\u6d3b\u7528\u3059\u308b\u305f\u3081\u306e\u521d\u5fc3\u8005\u5411\u3051\u306e\u30ac\u30a4\u30c9\u3067\u3059\u3002",(0,a.kt)("br",{parentName:"p"}),"\n","\u3053\u306e\u30ac\u30a4\u30c9\u3067\u306f\u30b3\u30f3\u30c6\u30ca\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\uff08IEC63434)\u306b\u95a2\u5fc3\u3092\u6301\u3064\u65b9\u304c\u3001\u30b3\u30f3\u30c6\u30ca\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u306e\u76ee\u7684\u3092\u7406\u89e3\u3057\u305f\u3046\u3048\u3067\u3001\n\u6280\u8853\u7684\u306a\u57fa\u790e\u77e5\u8b58\u3092\u7372\u5f97\u3057\u52b9\u679c\u7684\u306b\u30b3\u30f3\u30c6\u30ca\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u6280\u8853\u3092\u6d3b\u7528\u3059\u308b\u305f\u3081\u306b\u3001\u91cd\u8981\u306a\u60c5\u5831\u3068\u5b66\u7fd2\u7d20\u6750\u3092\u63d0\u4f9b\u3057\u307e\u3059\u3002"),(0,a.kt)("p",null,"\u3053\u306e\u30ac\u30a4\u30c9\u5185\u306b\u306f\u5927\u304d\u304f\u4e8c\u3064\u306e\u8a71\u984c\u306e\u8aac\u660e\u304c\u3042\u308a\u307e\u3059\u3002"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u30b3\u30f3\u30c6\u30ca\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u306e\u8aac\u660e:",(0,a.kt)("br",{parentName:"p"}),"\n","\u30b3\u30f3\u30c6\u30ca\u30d5\u30a9\u30fc\u30de\u30c3\u30c8(IEC63430)\u304c\u89e3\u6c7a\u3059\u308b\u8ab2\u984c\u3001\u30b3\u30f3\u30c6\u30ca\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u306e\u6982\u5ff5\u3084\u4ed5\u7d44\u307f\u306e\u7406\u89e3\u3092\u6df1\u3081\u308b\u305f\u3081\u306e\u30c9\u30ad\u30e5\u30e1\u30f3\u30c8\u3092\u63d0\u4f9b\u3057\u307e\u3059\u3002")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u30c6\u30b9\u30c8\u30e9\u30dc\u30b7\u30b9\u30c6\u30e0\u306e\u8aac\u660e:",(0,a.kt)("br",{parentName:"p"}),"\n","\u30b3\u30f3\u30c6\u30ca\u3092\u5229\u6d3b\u7528\u3059\u308b\u30b7\u30b9\u30c6\u30e0\u306e\u4f8b\u3068\u3057\u3066\u3001\u30c6\u30b9\u30c8\u30e9\u30dc\u30b7\u30b9\u30c6\u30e0\u3092\u7d39\u4ecb\u3057\u307e\u3059\u3002\n\u30c6\u30b9\u30c8\u30e9\u30dc\u30b7\u30b9\u30c6\u30e0\u3092\u984c\u6750\u306b\u305d\u306e\u52d5\u4f5c\u624b\u9806\u3092\u30c1\u30e5\u30fc\u30c8\u30ea\u30a2\u30eb\u3068\u3057\u3066\u63d0\u4f9b\u3057\u307e\u3059\u3002"))),(0,a.kt)("h2",{id:"\u30b3\u30f3\u30c6\u30ca\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u306e\u76ee\u7684"},"\u30b3\u30f3\u30c6\u30ca\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u306e\u76ee\u7684"),(0,a.kt)("p",null,"\u300c\u30b3\u30f3\u30c6\u30ca\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u300d(IEC 63430)\u306f\u3001\u56fd\u969b\u56e3\u4f53\u306e IEC(International Electrotechnical Commission)\u3067\u73fe\u5728\u6a19\u6e96\u5316\u304c\u9032\u3081\u3089\u308c\u3066\u3044\u308b\u30c7\u30fc\u30bf\u306e\u5171\u901a\u69cb\u9020\u306e\u898f\u683c\u3067\u3059\u3002",(0,a.kt)("br",{parentName:"p"}),"\n","\u30bb\u30f3\u30b5\u30c7\u30fc\u30bf\u306e\u3088\u3046\u306a\u30d9\u30f3\u30c0\u3054\u3068\u306b\u7570\u306a\u308b\u69cb\u9020\u3092\u6301\u3064\u30c7\u30fc\u30bf\u306b\u5bfe\u3057\u3066\u3001\u30c7\u30fc\u30bf\u30ec\u30d9\u30eb\u306e\u6a19\u6e96\u30a4\u30f3\u30bf\u30fc\u30d5\u30a7\u30a4\u30b9\u3068\u306a\u308a\u307e\u3059\u3002"),(0,a.kt)("p",null,"\u30b3\u30f3\u30c6\u30ca\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u3067\u306e\u30c7\u30fc\u30bf\u306e\u6a19\u6e96\u5316\uff08\u5171\u901a\u5316\uff09\u306b\u3088\u3063\u3066\u3001\u30b7\u30b9\u30c6\u30e0\u69cb\u7bc9\u306b\u5927\u304d\u306a\u30e1\u30ea\u30c3\u30c8\u304c\u3042\u308a\u307e\u3059\u3002"),(0,a.kt)("p",null,"\u4ee5\u4e0b\u304c\u30b3\u30f3\u30c6\u30ca\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u306e\u30e1\u30ea\u30c3\u30c8\u3092\u8868\u3057\u305f\u30a4\u30e1\u30fc\u30b8\u3067\u3059\u3002\n",(0,a.kt)("img",{alt:"VisionOfContainerFormat",src:r(1311).Z,width:"1094",height:"431"})),(0,a.kt)("p",null,"\u307b\u304b\u306b\u3082\u4ee5\u4e0b\u306e\u3088\u3046\u306a\u30e1\u30ea\u30c3\u30c8\u304c\u3042\u308a\u307e\u3059\u3002"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u591a\u6570\u306e\u30d9\u30f3\u30c0\u30fc\u306e\u30bb\u30f3\u30b5\u3092\u7d44\u307f\u5408\u308f\u305b\u305f\u67d4\u8edf\u306a\u30b5\u30fc\u30d3\u30b9\u306e\u5b9f\u73fe"),(0,a.kt)("li",{parentName:"ul"},"\u30d5\u30ec\u30ad\u30b7\u30d6\u30eb\u306a\u30bb\u30f3\u30b5\u306e\u5897\u6e1b\u3084\u5909\u66f4\u3078\u306e\u5bfe\u5fdc"),(0,a.kt)("li",{parentName:"ul"},"\u6a19\u6e96\u898f\u683c\u306b\u3088\u308b\u958b\u767a\u30b3\u30b9\u30c8\u524a\u6e1b\u3084\u30d9\u30f3\u30c0\u30ed\u30c3\u30af\u30a4\u30f3\u306e\u6392\u9664")))}m.isMDXComponent=!0},1311:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/container_format_vison-630642b04b7673cb6e2227b1204672bd.png"}}]);