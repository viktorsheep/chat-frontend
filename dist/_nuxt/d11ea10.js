(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{193:function(e,t,n){"use strict";var r=n(1),o=n(97),c=n.n(o),f=n(275),l=n.n(f);r.default.use(c.a,{locale:l.a})},196:function(e,t,n){"use strict";(function(e){var r=n(7),o=n(3),c=(n(27),n(97));t.a=function(t,n){var f=t.app,l=f.$auth.strategy.token.get(),d=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(n){var o,d,content,data,h,v;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return d=!1,content={},data=void 0!==n.data?n.data:{},h={Authorization:l},void 0!==n.headers&&(v=n.headers.contentType,h["Content-Type"]="formData"===v?"multipart/form-data":"application/x-www-form-urlencoded"),void 0!==n.baseURL?f.$axios.setBaseURL(n.baseURL):f.$axios.setBaseURL(f.$config.baseURL),t.next=8,f.$axios((o={method:n.method,url:n.url},Object(r.a)(o,"get"===n.method?"params":"data",data),Object(r.a)(o,"headers",h),o)).then((function(e){200!==e.status&&201!==e.status||("message"in n&&"success"in n.message&&Object(c.Notification)({type:"success",message:n.message.success}),content.data=e.data),d=!0})).catch((function(e){Object(c.Notification)({type:"error",dangerouslyUseHTMLString:!0,message:"Sorry, Something went wrong. <br /> Error : "+e.response.status})})).then((function(){void 0!==n.baseURL&&f.$axios.setBaseURL("production"===e.env.APP_ENV?e.env.PUBLIC_URL+e.env.BASE_URL:e.env.LOCAL_URL+e.env.BASE_URL)}));case 8:return t.abrupt("return",{success:d,content:content});case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();n("sender",d)}}).call(this,n(164))},197:function(e,t,n){"use strict";n(11),n(16);t.a=function(e,t){e.app;t("cg",(function(param){console.group(param.title),"error"!==param.type?param.logs.forEach((function(e){console.log(e)})):console.error(param.logs),console.groupEnd()}))}},236:function(e,t,n){var content=n(338);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(24).default)("b7e08482",content,!0,{sourceMap:!1})},237:function(e,t,n){var content=n(340);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(24).default)("178f2201",content,!0,{sourceMap:!1})},238:function(e,t,n){var content=n(342);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(24).default)("024f6cba",content,!0,{sourceMap:!1})},239:function(e,t,n){var content=n(344);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(24).default)("1a1f7c10",content,!0,{sourceMap:!1})},240:function(e,t,n){var content=n(346);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(24).default)("272053c3",content,!0,{sourceMap:!1})},241:function(e,t,n){var content=n(348);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(24).default)("dc6317d2",content,!0,{sourceMap:!1})},242:function(e,t,n){var content=n(350);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(24).default)("568c20eb",content,!0,{sourceMap:!1})},243:function(e,t,n){var content=n(352);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(24).default)("254d09c3",content,!0,{sourceMap:!1})},244:function(e,t,n){var content=n(354);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(24).default)("22914c7a",content,!0,{sourceMap:!1})},245:function(e,t,n){var content=n(356);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(24).default)("6f05e5bf",content,!0,{sourceMap:!1})},277:function(e,t,n){"use strict";n(21),n(15),n(20),n(28),n(16),n(29);var r=n(7),o=(n(139),n(11),n(49),n(18));function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var l={middleware:"auth",data:function(){return{eventSource:null}},computed:f({},Object(o.c)({settings:"settings/settings",theme:"settings/theme",pages:"pages/pages",notifications:"notifications/notifications"})),watch:{"$route.params":{handler:function(e,t){if(null!==this.eventSource&&(this.eventSource.close(),console.log("event close")),"id"in e&&0!==this.pages.length){var n=f({},this.pages.find((function(p){return p.id===parseInt(e.id)})));this.setupStream(n.page_id),console.log("event start",n.page_id)}},deep:!0}},mounted:function(){},methods:f(f({},Object(o.b)({updateNotification:"notifications/updateNotification"})),{},{handleDropdownCommand:function(e){var t=this;"logout"===e&&this.$auth.logout().then((function(e){console.log(t.$auth.loggedIn),t.$router.push("/")}))},setupStream:function(e){var t=this;null!==EventSource?(this.eventSource=new EventSource("".concat(this.$config.baseURL,"noti/").concat(e)),this.eventSource.addEventListener("message",(function(e){""!==e.data&&e.data!==t.notifications&&"undefined"!==e.data&&(console.log(e.data===t.notifications),t.updateNotification(e.data),t.$root.$emit("new-message",e.data),console.log("event",e),console.log("event data",e.data),console.log("event notifications",t.notifications))}),!1),this.eventSource.addEventListener("error",(function(e){e.readyState===EventSource.CLOSED&&(console.log("Event was closed"),console.log(EventSource))}),!1)):console.log("Sorry, your browser does not support server-sent events...")}})},d=(n(337),n(339),n(341),n(10)),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-container",{staticStyle:{height:"100vh"}},[n("el-aside",{staticClass:"aside",staticStyle:{"background-color":"#1f91f2"},attrs:{width:"250px"}},[n("div",{staticStyle:{background:"#0003",height:"50px","line-height":"50px","padding-top":"10px"}},[n("Logo")],1),e._v(" "),3===e.$auth.user.user_role_id?n("NavUser"):n("NavAdmin")],1),e._v(" "),n("el-container",[n("el-header",{class:"header "+("light"===e.settings.visualMode?"":"dark")},[1===e.$auth.user.user_role_id?n("span",{staticStyle:{color:"#e6a23c",float:"left"}},[e._v("Super Admin  ")]):e._e(),e._v(" "),n("ElmDropdownTopBarPage"),e._v("\n\n        "+e._s(e.$auth.user.name)+"\n        "),n("ElmDropdownLightDarkSwitcher"),e._v(" "),n("ElmDropdownLogout")],1),e._v(" "),n("el-main",{class:"main "+e.theme},[n("Nuxt")],1)],1)],1)],1)}),[],!1,null,"68fbf114",null);t.a=component.exports;installComponents(component,{Logo:n(458).default,NavUser:n(459).default,NavAdmin:n(461).default,ElmDropdownTopBarPage:n(462).default,ElmDropdownLightDarkSwitcher:n(463).default,ElmDropdownLogout:n(464).default})},278:function(e,t,n){"use strict";n(31),n(165);var r={auth:"guest",computed:{pageName:function(){var e=this.$route.path.split("/");return e[2]}}},o=(n(355),n(10)),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{width:"100%",height:"100vh",background:"#1f91f2"}},[n("el-row",{attrs:{gutter:0}},[n("el-col",{attrs:{span:24,offset:0}},[n("div",{staticClass:"page-name"},[n("div",{staticClass:"title"},[e._v("\n          Welcome "),"login"===e.pageName?n("span",[e._v("back")]):e._e(),e._v(" to Ekballo Chat!\n        ")]),e._v(" "),n("div",{staticClass:"sub-title"},[e._v("\n          Please continue to "+e._s(e.pageName)+"\n        ")])])])],1),e._v(" "),n("el-row",{attrs:{gutter:0}},[n("el-col",{attrs:{span:4,offset:10}},[n("div",{staticClass:"wrap"},[n("Nuxt")],1)])],1)],1)}),[],!1,null,"5459741a",null);t.a=component.exports},285:function(e,t,n){n(286),e.exports=n(287)},311:function(e,t,n){"use strict";n.r(t),t.default=function(e){e.$auth.loggedIn&&(e.$auth.loggedIn&&1===e.$auth.user.user_role_id?e.redirect("/admin/dashboard"):e.redirect("/pages"))}},312:function(e,t,n){"use strict";n.r(t),t.default=function(e){e.$auth.loggedIn&&(e.$auth.loggedIn&&1===e.$auth.user.user_role_id?e.redirect("/admin/dashboard"):e.redirect("/pages"))}},330:function(e,t,n){var content=n(331);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(24).default)("c3ae2b30",content,!0,{sourceMap:!1})},331:function(e,t,n){var r=n(23),o=n(235),c=n(332),f=n(333),l=n(334),d=n(335),h=n(336),v=r(!1),m=o(c),x=o(f),w=o(l),O=o(d),y=o(h);v.push([e.i,'@font-face{font-family:"Nunito";font-style:normal;font-weight:400;src:url('+m+') format("woff2");unicode-range:U+0460-052f,U+1c80-1c88,U+20b4,U+2de0-2dff,U+a640-a69f,U+fe2e-fe2f}@font-face{font-family:"Nunito";font-style:normal;font-weight:400;src:url('+x+') format("woff2");unicode-range:U+0400-045f,U+0490-0491,U+04b0-04b1,U+2116}@font-face{font-family:"Nunito";font-style:normal;font-weight:400;src:url('+w+') format("woff2");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01a0-01a1,U+01af-01b0,U+1ea0-1ef9,U+20ab}@font-face{font-family:"Nunito";font-style:normal;font-weight:400;src:url('+O+') format("woff2");unicode-range:U+0100-024f,U+0259,U+1e??,U+2020,U+20a0-20ab,U+20ad-20cf,U+2113,U+2c60-2c7f,U+a720-a7ff}@font-face{font-family:"Nunito";font-style:normal;font-weight:400;src:url('+y+') format("woff2");unicode-range:U+00??,U+0131,U+0152-0153,U+02bb-02bc,U+02c6,U+02da,U+02dc,U+2000-206f,U+2074,U+20ac,U+2122,U+2191,U+2193,U+2212,U+2215,U+feff,U+fffd}',""]),e.exports=v},332:function(e,t,n){e.exports=n.p+"fonts/Nunito-400-cyrillic-ext1.ea59f4e.woff2"},333:function(e,t,n){e.exports=n.p+"fonts/Nunito-400-cyrillic2.905568d.woff2"},334:function(e,t,n){e.exports=n.p+"fonts/Nunito-400-vietnamese3.6fcc161.woff2"},335:function(e,t,n){e.exports=n.p+"fonts/Nunito-400-latin-ext4.6463a96.woff2"},336:function(e,t,n){e.exports=n.p+"fonts/Nunito-400-latin5.6c056c5.woff2"},337:function(e,t,n){"use strict";n(236)},338:function(e,t,n){var r=n(23)(!1);r.push([e.i,"body{font-family:Nunito,sans-serif;color:#454545;font-size:16px;margin:0}",""]),e.exports=r},339:function(e,t,n){"use strict";n(237)},340:function(e,t,n){var r=n(23)(!1);r.push([e.i,"",""]),e.exports=r},341:function(e,t,n){"use strict";n(238)},342:function(e,t,n){var r=n(23)(!1);r.push([e.i,".aside[data-v-68fbf114]{background:#1f91f2;background:linear-gradient(135deg,#1f91f2,#00549c)}.header[data-v-68fbf114]{line-height:60px;text-align:right;background:#eee;transition:all .3s ease-in-out;color:#777}.header.dark[data-v-68fbf114]{background:#454545;background:linear-gradient(135deg,#454545,#333);color:#ccc}.main[data-v-68fbf114]{background:#fff;transition:all .3s ease-in-out;max-height:calc(100vh - 60px);overflow-y:auto}.main.dark[data-v-68fbf114]{background:linear-gradient(135deg,#777,#3b3b3b);box-shadow:inset 10px 0 20px rgba(0,0,0,.15)}",""]),e.exports=r},343:function(e,t,n){"use strict";n(239)},344:function(e,t,n){var r=n(23)(!1);r.push([e.i,".logo[data-v-98d2e930]{color:#fff;color:#1f91f2;height:20px;line-height:20px;padding:10px;text-align:center;font-weight:900;font-size:20px;text-transform:uppercase;border-radius:8px}.logo .second[data-v-98d2e930]{display:inline-block;padding:5px 10px;background:#1f91f2;border-radius:4px;color:#fff;margin-top:-5px}",""]),e.exports=r},345:function(e,t,n){"use strict";n(240)},346:function(e,t,n){var r=n(23)(!1);r.push([e.i,".wrap-contacts[data-v-f07c11fe]{height:40px;line-height:40px;color:#fff;width:calc(100% - 40px);margin-left:10px;padding:0 10px;border-radius:8px;margin-bottom:5px;margin-top:10px;cursor:pointer;font-weight:bolder;transition:all .2s ease-in-out;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.wrap-contacts[data-v-f07c11fe]:hover{background:rgba(0,0,0,.1);padding-left:20px;padding-right:0}.wrap-contacts[data-v-f07c11fe]:first-of-type{margin-top:20px}.wrap-contacts.active[data-v-f07c11fe]{background:#fff;color:#1f91f2}",""]),e.exports=r},347:function(e,t,n){"use strict";n(241)},348:function(e,t,n){var r=n(23)(!1);r.push([e.i,'.wrap-conversations[data-v-1f0c878b]{height:calc(100vh - 100px)}.wrap-fb-user[data-v-1f0c878b]{height:80px;line-height:80px;padding-left:15px;padding-right:10px;color:#999;border-bottom:1px solid #f5f5f5;cursor:pointer;position:relative}.wrap-fb-user[data-v-1f0c878b],.wrap-fb-user[data-v-1f0c878b]:before{background:#fff;transition:all .2s ease-in-out}.wrap-fb-user[data-v-1f0c878b]:before{content:"";width:5px;height:60px;position:absolute;border-radius:0 5px 5px 0;left:-5px;top:10px}.wrap-fb-user[data-v-1f0c878b]:hover{background:#fafafa;padding-left:20px}.wrap-fb-user[data-v-1f0c878b]:hover:before{background:#ccc;left:0}.wrap-fb-user.unread[data-v-1f0c878b]{color:#777;font-weight:bolder}.wrap-fb-user.active[data-v-1f0c878b]{background:#f5f5f5;padding-left:20px}.wrap-fb-user.active[data-v-1f0c878b]:before{left:0;background:#1f91f2}.wrap-fb-user .name[data-v-1f0c878b]{float:left;width:100px;height:26px;line-height:26px;margin-top:10px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.wrap-fb-user .count[data-v-1f0c878b]{width:20px;height:20px;line-height:20px;text-align:center;margin-top:10px;float:right;color:#fff;background:#f56c6c;border-radius:11px;font-weight:bolder;bottom:10px}.wrap-fb-user .count[data-v-1f0c878b],.wrap-fb-user .time[data-v-1f0c878b]{font-size:10px;position:absolute;right:10px}.wrap-fb-user .time[data-v-1f0c878b]{top:10px;height:26px;line-height:26px;color:#ccc}.wrap-fb-user .snippet[data-v-1f0c878b]{width:calc(100% - 30px);height:44px;line-height:44px;font-size:14px;color:#999;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.wrap-fb-user.dark[data-v-1f0c878b]{color:#777;background:#454545;border-bottom:1px solid #777}.wrap-fb-user.dark .name[data-v-1f0c878b]{color:#ccc}.btn-back[data-v-1f0c878b]{width:calc(100% - 40px);margin-left:20px;margin-bottom:7px}.btn-back.dark[data-v-1f0c878b]{background:#454545;border-color:#454545}',""]),e.exports=r},349:function(e,t,n){"use strict";n(242)},350:function(e,t,n){var r=n(23)(!1);r.push([e.i,".wrap-admin-nav[data-v-516369cf]{padding:10px}.wrap-admin-nav a[data-v-516369cf]{display:block;color:#fff;text-decoration:none;text-transform:uppercase;letter-spacing:1px;font-weight:600;transition:all .3s ease-in-out;height:40px;line-height:40px;padding:0 10px;border-radius:8px;margin-bottom:2px;font-size:12px}.wrap-admin-nav a[data-v-516369cf]:hover{padding-left:15px;color:#1f91f2;background:#fff;letter-spacing:3px;font-size:14px}",""]),e.exports=r},351:function(e,t,n){"use strict";n(243)},352:function(e,t,n){var r=n(23)(!1);r.push([e.i,".comp[data-v-4956d691]{display:inline-block;width:50px;text-align:center;cursor:pointer;transition:all .3s ease-in-out}.comp[data-v-4956d691]:hover{color:#1f91f2}",""]),e.exports=r},353:function(e,t,n){"use strict";n(244)},354:function(e,t,n){var r=n(23)(!1);r.push([e.i,".comp[data-v-5096f6b8]{display:inline-block;width:50px;text-align:center;transition:all .3s ease-in-out;cursor:pointer}.comp[data-v-5096f6b8]:hover{color:#f56c6c}",""]),e.exports=r},355:function(e,t,n){"use strict";n(245)},356:function(e,t,n){var r=n(23)(!1);r.push([e.i,".page-name[data-v-5459741a]{margin-top:180px;text-align:center;margin-bottom:20px;color:#eee}.page-name .title[data-v-5459741a]{text-transform:uppercase;font-weight:700;margin-bottom:10px}.wrap[data-v-5459741a]{padding:20px;background:#fff;border-radius:10px}",""]),e.exports=r},357:function(e,t,n){"use strict";n.r(t);var r=n(3),o=(n(27),n(49),"message/"),c={add:function(e,t){var n=this;return Object(r.a)(regeneratorRuntime.mark((function r(){var c,f,param,l;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return c=e.commit,f=t.pageId,param=t.param,l={method:"post",url:"".concat(o,"add/").concat(f),data:param,message:{success:"Facebook page added."}},r.next=5,n.$sender(l).then((function(e){e.success&&c("ADD",e.content.data)}));case 5:case"end":return r.stop()}}),r)})))()},browse:function(e,t){var n=this;return Object(r.a)(regeneratorRuntime.mark((function r(){var c,f;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return c=e.commit,f={method:"get",url:"".concat(o,"browse/").concat(t)},console.log("id",t),r.next=5,n.$sender(f).then((function(e){console.log(e),e.success&&c("SET",{id:t,data:e.content.data})}));case 5:case"end":return r.stop()}}),r)})))()},edit:function(e,param){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,c={method:"put",url:"".concat(o).concat(param.id,"/edit"),data:param,message:{success:"Facebook page edited."}},n.next=4,t.$sender(c).then((function(e){e.success&&r("EDIT",e.content.data)}));case 4:case"end":return n.stop()}}),n)})))()}};t.default=c},358:function(e,t,n){"use strict";n.r(t),t.default={messages:function(e){return function(t){return e.messages[t]}},messageAll:function(e){return e.messages}}},359:function(e,t,n){"use strict";n.r(t);var r=n(7),o=n(79);n(40),n(21),n(15),n(20),n(11),n(28),n(16),n(29);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}t.default={ADD:function(e,t){var n=t.id,param=t.param;e.pages[n].push(param)},EDIT:function(e,t){e.messages=Object(o.a)(e.pages.map((function(e){return e.id!==t.id?e:f(f({},e),t)})))},SET:function(e,t){var n=t.id,data=t.data;e.messages[n]=data}}},360:function(e,t,n){"use strict";n.r(t),t.default=function(){return{messages:{0:[]}}}},361:function(e,t,n){"use strict";n.r(t),t.default={updateNotification:function(e,data){(0,e.commit)("UPDATE",data)}}},362:function(e,t,n){"use strict";n.r(t),t.default={notifications:function(e){return e.notifications}}},363:function(e,t,n){"use strict";n.r(t),t.default={UPDATE:function(e,t){e.notifications=t}}},364:function(e,t,n){"use strict";n.r(t),t.default=function(){return{notifications:""}}},365:function(e,t,n){"use strict";n.r(t);var r=n(3),o=(n(49),n(27),"page/"),c={add:function(e,param){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,c={method:"post",url:"".concat(o,"add"),data:param,message:{success:"Facebook page added."}},n.next=4,t.$sender(c).then((function(e){e.success&&r("ADD",e.content.data)}));case 4:case"end":return n.stop()}}),n)})))()},browse:function(e,param){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,c={method:"get",url:"".concat(o,"browse").concat(null!==param?"?with_token=true":""),data:param},n.next=4,t.$sender(c).then((function(e){e.success&&r("SET",e.content.data)}));case 4:case"end":return n.stop()}}),n)})))()},edit:function(e,param){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,c={method:"put",url:"".concat(o).concat(param.id,"/edit"),data:param,message:{success:"Facebook page edited."}},n.next=4,t.$sender(c).then((function(e){e.success&&r("EDIT",e.content.data)}));case 4:case"end":return n.stop()}}),n)})))()}};t.default=c},366:function(e,t,n){"use strict";n.r(t),t.default={pages:function(e){return e.pages}}},367:function(e,t,n){"use strict";n.r(t);var r=n(7),o=n(79);n(40),n(21),n(15),n(20),n(11),n(28),n(16),n(29);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}t.default={ADD:function(e,param){e.pages.push(param)},EDIT:function(e,t){e.pages=Object(o.a)(e.pages.map((function(e){return e.id!==t.id?e:f(f({},e),t)})))},SET:function(e,param){e.pages=param}}},368:function(e,t,n){"use strict";n.r(t),t.default=function(){return{pages:[]}}},369:function(e,t,n){"use strict";n.r(t),t.default={toggleVisualMode:function(e){var t=e.commit;t("TOGGLE_VISUAL_MODE")}}},370:function(e,t,n){"use strict";n.r(t),t.default={settings:function(e){return e.settings},theme:function(e){return e.settings.visualMode}}},371:function(e,t,n){"use strict";n.r(t),t.default={TOGGLE_VISUAL_MODE:function(e){e.settings.visualMode="light"===e.settings.visualMode?"dark":"light"}}},372:function(e,t,n){"use strict";n.r(t),t.default=function(){return{settings:{visualMode:"light"}}}},373:function(e,t,n){"use strict";n.r(t);var r=n(3),o=(n(49),n(27),"user/"),c={add:function(e,param){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,c={method:"post",url:"".concat(o,"add"),data:param,message:{success:"User Added"}},n.next=4,t.$sender(c).then((function(e){e.success&&r("ADD",e.content.data)}));case 4:case"end":return n.stop()}}),n)})))()},users:function(e,param){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,c={method:"get",url:"".concat(o,"users"),data:param},n.next=4,t.$sender(c).then((function(e){e.success&&r("SET",e.content.data)}));case 4:case"end":return n.stop()}}),n)})))()},search:function(e,param){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,c={method:"post",url:"".concat(o,"search"),data:param},n.next=4,t.$sender(c).then((function(e){e.success&&(console.log(e),r("SET",e.content.data))}));case 4:case"end":return n.stop()}}),n)})))()},edit:function(e,param){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,c={method:"put",url:"".concat(o).concat(param.id,"/edit"),data:param,message:{success:"Facebook page edited."}},n.next=4,t.$sender(c).then((function(e){e.success&&r("EDIT",e.content.data)}));case 4:case"end":return n.stop()}}),n)})))()},roles:function(e,param){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,t.$sender({method:"get",url:"".concat(o,"roles")}).then((function(e){e.success&&r("SET_ROLES",e.content.data)}));case 3:case"end":return n.stop()}}),n)})))()}};t.default=c},374:function(e,t,n){"use strict";n.r(t),t.default={users:function(e){return e.users},roles:function(e){return e.roles}}},375:function(e,t,n){"use strict";n.r(t);var r=n(7),o=n(79);n(40),n(21),n(15),n(20),n(11),n(28),n(16),n(29);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}t.default={ADD:function(e,param){e.users.push(param)},EDIT:function(e,t){e.pages=Object(o.a)(e.users.map((function(e){return e.id!==t.id?e:f(f({},e),t)})))},SET:function(e,param){e.users=param},SET_ROLES:function(e,param){e.roles=param}}},376:function(e,t,n){"use strict";n.r(t),t.default=function(){return{users:[],roles:[]}}},396:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=396},458:function(e,t,n){"use strict";n.r(t);var r={},o=(n(343),n(10)),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)}),[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"logo"},[e._v("\n  Ekballo\n  "),n("span",{staticClass:"second"},[e._v("\n    Chat\n  ")])])}],!1,null,"98d2e930",null);t.default=component.exports},459:function(e,t,n){"use strict";n.r(t);n(21),n(15),n(28),n(16),n(29);var r=n(3),o=n(7),c=(n(27),n(20),n(11),n(139),n(18));function f(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var d={data:function(){return{ap:[],visibility:{contactNav:!1},loading:{userPages:!1},data:{userPages:[]}}},fetch:function(){this.getPages(),this.api().getUserPages(this.$auth.user.id)},computed:l(l({},Object(c.c)({pages:"pages/pages"})),{},{activePages:function(){return this.pages.filter((function(p){return p.is_active}))}}),watch:{pages:{handler:function(e,t){this.ap=this.pages.filter((function(p){return p.is_active&&null!==p.access_token}))},deep:!0}},mounted:function(){console.log("mp",this.$route.params),"id"in this.$route.params&&this.handlePageClick(this.$route.params.id)},methods:l(l({},Object(c.b)({getPages:"pages/browse"})),{},{handlePageClick:function(p){this.visibility.contactNav=!0,this.$router.push("/pages/"+p)},handleNavClosed:function(){this.visibility.contactNav=!1},api:function(){var e=this;return{getUserPages:function(t){return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.loading.userPages=!0,r={method:"get",url:"user/page/get/"+t},n.next=4,e.$sender(r).then((function(t){e.loading.userPages=!1,e.data.userPages=t.content.data}));case 4:case"end":return n.stop()}}),n)})))()}}},helper:function(){var e=this;return{getPageName:function(t){var n=e.pages.find((function(p){return p.id===t}));return"undefined"!==n?n:{name:"Page"}}}}})},h=(n(345),n(10)),component=Object(h.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{"margin-top":"10px"}},[e.visibility.contactNav?e._e():n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading.userPages,expression:"loading.userPages"}],staticStyle:{"min-height":"calc(100vh - 80px)"},attrs:{"element-loading-text":"Loading pages...","element-loading-background":"rgba(0, 0, 0, 0.5)"}},e._l(e.data.userPages,(function(p){return n("div",{key:p.id,class:"wrap-contacts "+(p.page_id===parseInt(e.$route.query.page)?"active":""),on:{click:function(t){return e.handlePageClick(p.page_id)}}},[e._v("\n      "+e._s(e.helper().getPageName(p.page_id)?e.helper().getPageName(p.page_id).name:"")+"\n    ")])})),0),e._v(" "),e.visibility.contactNav?n("NavContacts",{on:{navClosed:function(t){return e.handleNavClosed()}}}):e._e()],1)}),[],!1,null,"f07c11fe",null);t.default=component.exports;installComponents(component,{NavContacts:n(460).default})},460:function(e,t,n){"use strict";n.r(t);n(21),n(15),n(28),n(29);var r=n(3),o=n(7),c=(n(27),n(139),n(11),n(40),n(16),n(20),n(31),n(73),n(18));function f(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var d={data:function(){return{loaded:{messages:!1},conversations:[],clone:[],activeId:0,sender_id:0,unread_message:0,snippets:[],notification:{sound:"",audio:""},key:0}},computed:l(l({},Object(c.c)({pages:"pages/pages",theme:"settings/theme"})),{},{currentPage:function(){var e={},data=this.$route.params.id;return void 0!==data&&(e=l({},this.pages.find((function(p){return p.id===parseInt(data)})))),console.log("x",this.$route.params.id,this.pages),e}}),watch:{conversations:function(e,t){var n=this;0===this.clone.length?(this.clone=e,console.log("o clone",this.clone)):(e.map((function(t){return n.clone.forEach((function(e){void 0!==e.unread&&t.id===e.id&&(t.unread=e.unread),t.snippet!==e.snippet&&t.id===e.id&&n.$route.params.psid!==t.senders.data[0].id&&(t.unread="!")})),e})),this.clone=e,console.log("n clone",this.clone),this.key++)},currentPage:function(e,q){e.id!==q.id&&(console.log(e,q),this.getFbConversations())}},mounted:function(){var e=this;this.$root.$on("new-message",(function(t){e.getNewMessage(t)})),this.configSound()},methods:{configSound:function(){this.audio=new Audio("/notification-sound.wav")},handleCloseNav:function(){this.conversations=[],this.$router.push("/pages/"),this.$emit("navClosed")},getNewMessage:function(e){var t=JSON.parse(e);this.sender_id=t.entry[0].messaging[0].sender.id,this.$route.params.psid!==this.sender_id&&(this.getFbConversations(!0),this.unread_message++)},getFbConversations:function(){var e=arguments,t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.length>0&&void 0!==e[0]&&e[0]||(t.loaded.messages=!1),n.next=4,t.$sender({method:"get",url:"".concat(t.currentPage.page_id,"/conversations"),data:{},headers:{contentType:"application/json"}}).then((function(e){t.conversations=e.content.data.data,t.audio.play(),t.loaded.messages=!0})).catch((function(e){t.$cg({title:"Facebook get conversations error",type:"error",logs:e})}));case 4:case"end":return n.stop()}}),n)})))()},userProfile:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$sender({method:"get",url:"".concat(e.currentPage.page_id),data:{},headers:{contentType:"application/json"}}).then((function(e){console.log(e)}));case 2:case"end":return t.stop()}}),t)})))()},handleConversationClick:function(e){var t=this;e.unread="",this.clone.map((function(n){return n.id===e.id&&(n.unread=""),t.clone})),this.key++,this.activeId=e.id;var n=e.participants.data.filter((function(p){return p.id!==t.currentPage.page_id+""}));if(this.$route.params.psid===n[0].id){var r=this.$createElement;this.$notify({message:r("i",{style:"color: teal"},"You click the same conversation.")})}else this.$router.replace("/pages/"+this.currentPage.id+"/"+e.id+"/"+n[0].id)},convertRelativeTime:function(e){var t=(new Date).getTime(),n=new Date(e).getTime(),r=Math.floor((t-n)/1e3);return r<1?"0s":r<60?"".concat(r,"s"):r<3600?"".concat(Math.floor(r/60),"m"):r<86400?"".concat(Math.floor(r/3600),"h"):r<604800?"".concat(Math.floor(r/86400),"d"):void 0}}},h=d,v=(n(347),n(10)),component=Object(v.a)(h,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:!e.loaded.messages,expression:"!loaded.messages"}],staticStyle:{"margin-top":"-10px"},attrs:{"element-loading-background":"rgb(238, 238, 238)"}},[n("div",{key:e.key,staticClass:"wrap-conversations"},e._l(e.clone,(function(t){return n("div",{key:t.id,class:"wrap-fb-user "+(t.unread_count>0?"unread":"")+" "+(t.id===e.activeId?"active":"")+" "+e.theme,on:{click:function(n){return e.handleConversationClick(t)}}},[n("span",{staticClass:"name"},[e._v("\n        "+e._s(t.senders.data[0].name)+"\n      ")]),e._v(" "),n("div",{staticClass:"time"},[e._v("\n        "+e._s(e.convertRelativeTime(t.updated_time))+"\n      ")]),e._v(" "),void 0!==t.unread&&""!==t.unread?n("span",{staticClass:"count"},[e._v("\n        "+e._s(t.unread)+"\n      ")]):e._e(),e._v(" "),n("div",{staticStyle:{clear:"both"}}),e._v(" "),n("div",{staticClass:"snippet"},[e._v("\n        "+e._s(t.snippet)+"\n      ")])])})),0),e._v(" "),n("el-button",{class:"btn-back "+e.theme,attrs:{type:"default",size:"small"},on:{click:e.handleCloseNav}},[e._v("\n    Back\n  ")])],1)}),[],!1,null,"1f0c878b",null);t.default=component.exports},461:function(e,t,n){"use strict";n.r(t);var r={data:function(){return{navs:[{index:1,name:"dashboard",to:"/admin/dashboard"},{index:2,name:"users",to:"/admin/users"},{index:3,name:"pages",to:"/admin/pages"},{index:4,name:"settings",to:"/admin/settings"}]}}},o=(n(349),n(10)),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrap-admin-nav"},e._l(e.navs,(function(nav){return n("NuxtLink",{key:nav.index,attrs:{to:nav.to}},[e._v("\n    "+e._s(nav.name)+"\n  ")])})),1)}),[],!1,null,"516369cf",null);t.default=component.exports},462:function(e,t,n){"use strict";n.r(t);var r=n(3),o=(n(43),n(27),{data:function(){return{retrieved:!1,page:{},userPage:{},loading:!1}},watch:{"$route.query":function(e,t){void 0!==e.page&&this.getPageName()}},mounted:function(){var e=this;void 0!==this.$route.query.page&&this.getPageName(),this.$root.$on("PageJoined",(function(data){console.log(data),e.getPageName()})),this.$root.$on("PageChanged",(function(p){e.userPage=p}))},methods:{getPageName:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={method:"get",url:"page/".concat(e.$route.query.page,"/view")},t.next=3,e.$sender(n).then((function(t){e.page=t.content.data,e.checkUserPageExists(e.page.id)}));case 3:case"end":return t.stop()}}),t)})))()},checkUserPageExists:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={method:"get",url:"user/page/exists/".concat(e)},n.next=3,t.$sender(r).then((function(e){t.userPage=e.content.data,t.retrieved=!0}));case 3:case"end":return n.stop()}}),n)})))()},handlePageDropdownCommand:function(e){"leavePage"===e&&this.leavePage()},leavePage:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(e.page),n={method:"put",url:"user/page/edit/".concat(e.$route.query.page),message:{success:"You have left ".concat(e.page.name)}},t.next=4,e.$sender(n).then((function(t){e.$router.push("/pages")}));case 4:case"end":return t.stop()}}),t)})))()}}}),c=n(10),component=Object(c.a)(o,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("span",{staticStyle:{float:"left"}},[e._v("\n  "+e._s(e.page.name)+"\n")])}),[],!1,null,null,null);t.default=component.exports},463:function(e,t,n){"use strict";n.r(t);n(21),n(15),n(20),n(11),n(28),n(16),n(29);var r=n(7),o=n(18);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var l={computed:f({},Object(o.c)({settings:"settings/settings"})),methods:f(f({},Object(o.b)({toggleVisualMode:"settings/toggleVisualMode"})),{},{handleClick:function(){this.toggleVisualMode()}})},d=(n(351),n(10)),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:"comp "+e.settings.visualMode,on:{click:e.handleClick}},[n("i",{class:"el-icon-"+("light"===e.settings.visualMode?"sunny":"moon")})])}),[],!1,null,"4956d691",null);t.default=component.exports},464:function(e,t,n){"use strict";n.r(t);var r={methods:{handleClick:function(){var e=this;this.$auth.logout().then((function(t){console.log(e.$auth.loggedIn),e.$router.push("/")}))}}},o=(n(353),n(10)),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"comp",on:{click:e.handleClick}},[n("i",{staticClass:"el-icon-switch-button"})])}),[],!1,null,"5096f6b8",null);t.default=component.exports},55:function(e,t,n){"use strict";var r={layout:"app",props:["error"],mounted:function(){console.error(this.error)}},o=n(10),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container",staticStyle:{"text-align":"center"}},[n("h1",{staticStyle:{"font-size":"48px",margin:"50px auto",color:"#F56C6C","margin-top":"100px"}},[n("i",{class:404===e.error.statusCode?"el-icon-document-delete":"el-icon-error"})]),e._v(" "),n("h1",{staticStyle:{"font-size":"46px",margin:"0 auto",color:"#ccc"}},[e._v("\n    Toink!\n    "),n("br"),e._v("\n    "+e._s(404===e.error.statusCode?"Page not found.":"An error occurred.")+"\n  ")]),e._v(" "),n("h1",{staticStyle:{"font-size":"60px",margin:"50px auto",color:"#ccc"}},[e._v("\n    "+e._s(e.error.statusCode)+"\n  ")]),e._v(" "),n("p",{staticStyle:{color:"#999"}},[e._v("\n    "+e._s(e.error.message)+"\n  ")]),e._v(" "),n("NuxtLink",{attrs:{to:"/"}},[n("el-button",{attrs:{type:"primary",icon:"el-icon-s-home"}},[e._v("\n      Back to Home\n    ")])],1)],1)}),[],!1,null,null,null);t.a=component.exports}},[[285,21,2,22]]]);