(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{504:function(e,t,n){"use strict";n.r(t);n(21),n(15),n(20),n(11),n(28),n(16),n(29);var r=n(3),o=n(7),c=(n(27),n(19));function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}var d={layout:"app",data:function(){return{loading:{wrap:!0,messages:!1},selectedPage:null}},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(c.c)({theme:"settings/theme"})),mounted:function(){void 0!==this.$route.params.id?this.setPageOn(this.$route.params.id):(this.selectedPage=null,this.loading.wrap=!1)},methods:{setPageOn:function(e){this.checkIfPageExists(e)},checkIfPageExists:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.loading.wrap=!0,r={method:"get",url:"user/page/exists/".concat(e)},n.next=4,t.$sender(r).then((function(e){t.selectedPage=e.content.data,t.loading.wrap=!1}));case 4:case"end":return n.stop()}}),n)})))()}}},f=d,h=n(10),component=Object(h.a)(f,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading.wrap,expression:"loading.wrap"}],attrs:{"element-loading-text":"Retrieving Information...","element-loading-background":"light"===e.theme?"rgba(255,255,255,0.5)":"rgba(0, 0, 0, 0.5)"}},[null===e.selectedPage?n("el-empty",{attrs:{description:"Select one of the page at the right side to get started."}}):"Does not exists."===e.selectedPage?n("el-empty",{attrs:{description:"You are not joined to this page. Join now to send prayers."}},[n("el-button",{attrs:{type:"primary",size:"mini",disabled:e.disabled.btnJoin},on:{click:e.handleJoinClick}},[e._v("\n      Join\n    ")])],1):e._e()],1)}),[],!1,null,null,null);t.default=component.exports}}]);