(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{513:function(e,t,n){"use strict";n.r(t);n(19),n(14),n(18),n(10),n(25),n(15),n(26);var r=n(3),o=n(5),l=(n(22),n(13));function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var h={layout:"app",data:function(){return{loading:{wrap:!0,messages:!1},selectedPage:null}},computed:d({},Object(l.c)({theme:"settings/theme",navIsCollapsed:"settings/navIsCollapsed",isMobile:"settings/isMobile"})),mounted:function(){void 0!==this.$route.params.id?this.setPageOn(this.$route.params.id):(this.selectedPage=null,this.loading.wrap=!1)},methods:d(d({},Object(l.b)({toggleNavCollapse:"settings/toggleNavCollapse"})),{},{setPageOn:function(e){this.checkIfPageExists(e)},checkIfPageExists:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.loading.wrap=!0,r={method:"get",url:"user/page/exists/".concat(e)},n.next=4,t.$sender(r).then((function(e){t.selectedPage=e.content.data,t.loading.wrap=!1}));case 4:case"end":return n.stop()}}),n)})))()},handleNavCollapse:function(){this.isMobile&&!this.navIsCollapsed&&this.toggleNavCollapse()}})},f=n(6),component=Object(f.a)(h,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading.wrap,expression:"loading.wrap"}],staticStyle:{"min-width":"300px"},attrs:{"element-loading-text":"Retrieving Information...","element-loading-background":"light"===e.theme?"rgba(255,255,255,0.5)":"rgba(0, 0, 0, 0.5)"},on:{click:function(t){return e.handleNavCollapse()}}},[null===e.selectedPage?n("el-empty",{attrs:{description:"Select one of the page at the right side to get started."}}):"Does not exists."===e.selectedPage?n("el-empty",{attrs:{description:"You are not joined to this page. Join now to send prayers."}},[n("el-button",{attrs:{type:"primary",size:"mini",disabled:e.disabled.btnJoin},on:{click:e.handleJoinClick}},[e._v("\n      Join\n    ")])],1):e._e()],1)}),[],!1,null,null,null);t.default=component.exports}}]);