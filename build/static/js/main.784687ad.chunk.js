(this.webpackJsonpsuyao=this.webpackJsonpsuyao||[]).push([[0],{33:function(e,t,a){e.exports=a(64)},38:function(e,t,a){},39:function(e,t,a){},40:function(e,t,a){},64:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(26),l=a.n(c),o=(a(38),a(39),a(40),a(3)),s=a(2);a(6),a(31);a(63);var u=a(8),i=a(9),m=function(){function e(){var t=this;Object(u.a)(this,e),this.getStar=function(e,a){return isNaN(e)||isNaN(a)||e<0||a<0?(console.error("SuyaoMap.getStar error: month is ".concat(e,", day is ").concat(a)),null):t.map[e-1][a-1]},this.getChart=function(e){for(var a=new Array(27),n=t.stars.indexOf(e),r=0;r<t.stars.length;r++)a[(r+27+13-n)%27]=t.stars[r];var c=["\u6210","\u574f","\u53cb","\u4eb2","\u80ce","\u8363","\u8870","\u5b89","\u5371","\u6210","\u574f","\u53cb","\u4eb2","\u547d","\u8363","\u8870","\u5b89","\u5371","\u6210","\u574f","\u53cb","\u4eb2","\u4e1a","\u8363","\u8870","\u5b89","\u5371"];a=a.map((function(e,t){return{star:e,secret:c[t]}}));var l=["\u8fdc","\u8fdc","\u8fdc","\u8fdc","\u8fdc","\u4e2d","\u4e2d","\u4e2d","\u4e2d","\u8fd1","\u8fd1","\u8fd1","\u8fd1","\u547d","\u8fd1","\u8fd1","\u8fd1","\u8fd1","\u4e2d","\u4e2d","\u4e2d","\u4e2d","\u8fdc","\u8fdc","\u8fdc","\u8fdc","\u8fdc"];return a=a.map((function(e,t){return Object(o.a)(Object(o.a)({},e),{},{distance:l[t]})}))},this.getStarArray=function(){return t.stars},this.stars=Array.from("\u89d2\u4ea2\u6c10\u623f\u5fc3\u5c3e\u7b95\u6597\u5973\u865a\u5371\u5ba4\u58c1\u594e\u5a04\u80c3\u6602\u6bd5\u89dc\u53c2\u4e95\u9b3c\u67f3\u661f\u5f20\u7ffc\u8f78"),this.keys=Array.from("\u7ffc\u89d2\u6c10\u5fc3\u7b95\u5973\u5ba4\u5a04\u6602\u89dc\u9b3c\u661f"),this.map=this.keys.map((function(e,a){return t.renderMap(e)}))}return Object(i.a)(e,[{key:"renderMap",value:function(e){var t=this.stars.findIndex((function(t){return t===e})),a=14,n=new Array(30);n[14]=e;for(var r=0;r<a;r++)n[13-r]=this.stars[(t-r-1+27)%27];a=15;for(var c=0;c<a;c++)n[15+c]=this.stars[(t+c+1)%27];return n}}]),e}();var p=function(e){var t=e.star,a=(e.relation,(new m).getChart(t));return r.a.createElement("table",{className:"table-auto text-center"},r.a.createElement("thead",{className:["bg-blue-500","bg-opacity-75","text-gray-100"].join(" ")},r.a.createElement("tr",null,a.map((function(e){var t=["x-4","py-2"];return"\u547d"===e.distance&&t.push("bg-green-600"),r.a.createElement("th",{key:e.star,className:t.join(" ")},e.star)})))),r.a.createElement("tbody",{className:"bg-green-500 bg-opacity-25 "},r.a.createElement("tr",null,a.map((function(e){var t=["bg-gray-100","border","x-4","py-2"];return"\u547d"===e.secret&&(t.push("bg-green-600"),t.push("text-gray-100")),["\u4e1a","\u80ce"].includes(e.secret)&&t.push("text-purple-600"),r.a.createElement("td",{key:e.star,className:t.join(" ")},e.secret)}))),r.a.createElement("tr",null,a.map((function(e){var t=["border","px-4","py-2","bg-green-600"];return"\u547d"===e.distance&&(t.push("bg-green-600"),t.push("text-gray-100")),"\u8fd1"===e.distance&&(t.push("bg-opacity-75"),t.push("text-gray-100")),"\u4e2d"===e.distance&&(t.push("bg-opacity-50"),t.push("text-gray-100")),"\u8fdc"===e.distance&&(t.push("bg-opacity-25"),t.push("text-gray-100")),r.a.createElement("td",{key:e.star,className:t.join(" ")},e.distance)})))))},d=a(32),g=a(10),h=a.n(g);function f(e){var t=e.date,a=new m,n=new d.a(t),c=n.lunar,l=a.getStar(c.month,c.date);return r.a.createElement("div",{className:"border p-3 block w-24 h-24 text-center"},r.a.createElement("p",null,r.a.createElement("span",{style:{fontSize:"18px"}},n.date),r.a.createElement("br",null),r.a.createElement("span",{style:{fontSize:"12px"}},1==c.date?c.lunarMonth:c.lunarDate),r.a.createElement("br",null),r.a.createElement("span",{style:{fontSize:"12px"}},l)))}var v=function(e){var t=Object(n.useState)(h()()),a=Object(s.a)(t,2),c=a[0],l=a[1],o=Object(n.useState)(c.format("YYYY")),u=Object(s.a)(o,2),i=u[0],m=u[1],p=Object(n.useState)(c.format("M")-1),d=Object(s.a)(p,2),g=d[0],v=d[1],y=h()(c).startOf("month").startOf("week");return console.log(y.format("YYYYMMDD")),console.log("currentYear",i),console.log("currentMonth",g),r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("select",{value:i,onChange:function(e){var t=e.currentTarget.value,a=h()(c).year(t);m(t),l(a)}},function(){for(var e=[],t=1900;t<=2050;t++)e.push(t);return e}().map((function(e){return r.a.createElement("option",{key:e,value:e},e,"\u5e74")}))),r.a.createElement("select",{value:g,onChange:function(e){var t=e.currentTarget.value,a=h()(c).month(t);v(t),l(a)}},function(){for(var e=[],t=0;t<12;t++)e.push(t);return e}().map((function(e){return r.a.createElement("option",{key:e,value:e},e+1,"\u6708")})))),r.a.createElement("div",{className:"grid grid-cols-7 divide-x divide-green-200",style:{width:"42rem"}},["\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u65e5"].map((function(e){return r.a.createElement("div",{className:"text-center bg-blue-500 text-white",style:{width:"6rem"}},e)})),new Array(42).fill("").map((function(e){return y.add(1,"days"),r.a.createElement(f,{date:y.toDate()})}))))};var y=function(e){var t=new m,a=Object(n.useState)("\u89dc"),c=Object(s.a)(a,2),l=c[0],o=c[1];return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"grid grid-cols-6 gap-4"},r.a.createElement("div",null,r.a.createElement("label",null,"\u5bbf\u66dc\uff1a"),r.a.createElement("select",{value:l,onChange:function(e){console.log("e",e),o(e.currentTarget.value)}},t.getStarArray().map((function(e){return r.a.createElement("option",{key:e,value:e},e)})))),r.a.createElement("div",null,r.a.createElement("label",null,"\u519c\u5386\uff1a"),r.a.createElement("input",{type:"text",placeholder:"4-2",onChange:function(e){console.log("e",e);var a=e.currentTarget.value;if(console.log("dateStr",a),a.match(/^\d+-\d+$/)){console.log("matched",a);var n=a.split("-");o(t.getStar(n[0],n[1]))}}})),r.a.createElement("div",{className:"col-span-6"},r.a.createElement(p,{star:l}))),r.a.createElement(v,null))};var E=function(){return r.a.createElement(y,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[33,1,2]]]);
//# sourceMappingURL=main.784687ad.chunk.js.map