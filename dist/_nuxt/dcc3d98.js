(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{193:function(e,t,n){"use strict";var r=n(0),o=n(67),c=n.n(o),f=n(277),l=n.n(f);r.default.use(c.a,{locale:l.a})},196:function(e,t,n){"use strict";(function(e){var r=n(3),o=(n(16),n(67));t.a=function(t,n){var c=t.app,f=c.$auth.strategy.token.get(),l=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n){var r,content,data,l,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=!1,content={},data=void 0!==n.data?n.data:{},l={Authorization:f},void 0!==n.headers&&(d=n.headers.contentType,l["Content-Type"]="formData"===d?"multipart/form-data":"application/x-www-form-urlencoded"),void 0!==n.baseURL&&c.$axios.setBaseURL(n.baseURL),t.next=8,c.$axios({method:n.method,url:n.url,data:data,headers:l}).then((function(e){200!==e.status&&201!==e.status||("message"in n&&"success"in n.message&&Object(o.Notification)({type:"success",message:n.message.success}),content.data=e.data),r=!0})).catch((function(e){Object(o.Notification)({type:"error",dangerouslyUseHTMLString:!0,message:"Sorry, Something went wrong. <br /> Error : "+e.response.status})})).then((function(){void 0!==n.baseURL&&c.$axios.setBaseURL("production"===e.env.APP_ENV?e.env.PUBLIC_URL+e.env.BASE_URL:e.env.LOCAL_URL+e.env.BASE_URL)}));case 8:return t.abrupt("return",{success:r,content:content});case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();n("sender",l)}}).call(this,n(164))},197:function(e,t,n){"use strict";n(9),n(19);t.a=function(e,t){e.app;t("cg",(function(param){console.group(param.title),"error"!==param.type?param.logs.forEach((function(e){console.log(e)})):console.error(param.logs),console.groupEnd()}))}},198:function(e,t,n){"use strict";var r=n(79),o=n(67);t.a=function(e,t){e.app;t("FbInit",(function(param){var e=!0;return r.load().then((function(){console.group("Facebook SDK loaded."),console.log("FB SDK Info Provided : "+(void 0!==param)),void 0===param&&console.log("Using default SDK info."),r.init({appId:void 0!==param?param.appId:0x5a9505e792fb7,version:void 0!==param?param.version:"v14.0"}),console.log("Facebook SDK initiated."),console.groupEnd()})).catch((function(t){console.group("Facebook SDK Load Error."),console.error(t),console.groupEnd(),Object(o.Notification)({type:"error",dangerouslyUseHTMLString:!0,message:"Sorry, Something went wrong while connecting to Facebook."}),e=!1})),e}))}},238:function(e,t,n){var content=n(340);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(36).default)("b7e08482",content,!0,{sourceMap:!1})},239:function(e,t,n){var content=n(342);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(36).default)("178f2201",content,!0,{sourceMap:!1})},240:function(e,t,n){var content=n(344);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(36).default)("1a1f7c10",content,!0,{sourceMap:!1})},241:function(e,t,n){var content=n(346);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(36).default)("3e6bcc2f",content,!0,{sourceMap:!1})},245:function(e,t,n){var content=n(356);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(36).default)("ce654a4a",content,!0,{sourceMap:!1})},246:function(e,t,n){var content=n(358);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(36).default)("568c20eb",content,!0,{sourceMap:!1})},247:function(e,t,n){var content=n(360);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(36).default)("6f05e5bf",content,!0,{sourceMap:!1})},279:function(e,t,n){"use strict";var r={middleware:"auth",mounted:function(){this.$FbInit()},methods:{handleDropdownCommand:function(e){var t=this;"logout"===e&&this.$auth.logout().then((function(e){console.log(t.$auth.loggedIn),t.$router.push("/")}))}}},o=(n(339),n(341),n(10)),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-container",{staticStyle:{height:"100vh"}},[n("el-aside",{staticStyle:{"background-color":"#1f91f2"},attrs:{width:"250px"}},[n("div",{staticStyle:{background:"#0003",height:"50px","line-height":"50px","padding-top":"10px"}},[n("Logo")],1),e._v(" "),3===e.$auth.user.user_role_id?n("NavUser"):e._e(),e._v(" "),1===e.$auth.user.user_role_id?n("NavAdmin"):e._e()],1),e._v(" "),n("el-container",[n("el-header",{staticStyle:{"line-height":"60px","text-align":"right",background:"#eee"}},[1===e.$auth.user.user_role_id?n("span",{staticStyle:{color:"#E6A23C",float:"left"}},[e._v("Super Admin  ")]):e._e(),e._v(" "),n("ElmDropdownTopBarPage"),e._v(" "),n("el-dropdown",{staticStyle:{cursor:"pointer"},attrs:{trigger:"click"},on:{command:e.handleDropdownCommand}},[n("span",{staticClass:"el-dropdown-link"},[n("span",[e._v(e._s(e.$auth.user.name))]),e._v(" "),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{attrs:{disabled:""}},[e._v("\n              Profile\n            ")]),e._v(" "),n("el-dropdown-item",{attrs:{disabled:""}},[e._v("\n              Preferences\n            ")]),e._v(" "),n("el-dropdown-item",{attrs:{divided:"",command:"logout"}},[e._v("\n              Logout\n            ")])],1)],1)],1),e._v(" "),n("el-main",{staticStyle:{background:"white"}},[n("Nuxt")],1)],1)],1)],1)}),[],!1,null,null,null);t.a=component.exports;installComponents(component,{Logo:n(453).default,NavUser:n(454).default,NavAdmin:n(456).default,ElmDropdownTopBarPage:n(457).default})},280:function(e,t,n){"use strict";n(23),n(165);var r={auth:"guest",computed:{pageName:function(){var e=this.$route.path.split("/");return e[2]}}},o=(n(359),n(10)),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{width:"100%",height:"100vh",background:"#1f91f2"}},[n("el-row",{attrs:{gutter:0}},[n("el-col",{attrs:{span:24,offset:0}},[n("div",{staticClass:"page-name"},[n("div",{staticClass:"title"},[e._v("\n          Welcome "),"login"===e.pageName?n("span",[e._v("back")]):e._e(),e._v(" to Ekballo Chat!\n        ")]),e._v(" "),n("div",{staticClass:"sub-title"},[e._v("\n          Please continue to "+e._s(e.pageName)+"\n        ")])])])],1),e._v(" "),n("el-row",{attrs:{gutter:0}},[n("el-col",{attrs:{span:4,offset:10}},[n("div",{staticClass:"wrap"},[n("Nuxt")],1)])],1)],1)}),[],!1,null,"5459741a",null);t.a=component.exports},286:function(e,t,n){n(287),e.exports=n(288)},312:function(e,t,n){"use strict";n.r(t),t.default=function(e){e.$auth.loggedIn&&(e.$auth.loggedIn&&1===e.$auth.user.user_role_id?e.redirect("/admin/dashboard"):e.redirect("/message"))}},313:function(e,t,n){"use strict";n.r(t),t.default=function(e){e.$auth.loggedIn&&(e.$auth.loggedIn&&1===e.$auth.user.user_role_id?e.redirect("/admin/dashboard"):e.redirect("/message"))}},332:function(e,t,n){var content=n(333);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(36).default)("c3ae2b30",content,!0,{sourceMap:!1})},333:function(e,t,n){var r=n(35),o=n(237),c=n(334),f=n(335),l=n(336),d=n(337),v=n(338),h=r(!1),m=o(c),x=o(f),w=o(l),_=o(d),y=o(v);h.push([e.i,'@font-face{font-family:"Nunito";font-style:normal;font-weight:400;src:url('+m+') format("woff2");unicode-range:U+0460-052f,U+1c80-1c88,U+20b4,U+2de0-2dff,U+a640-a69f,U+fe2e-fe2f}@font-face{font-family:"Nunito";font-style:normal;font-weight:400;src:url('+x+') format("woff2");unicode-range:U+0400-045f,U+0490-0491,U+04b0-04b1,U+2116}@font-face{font-family:"Nunito";font-style:normal;font-weight:400;src:url('+w+') format("woff2");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01a0-01a1,U+01af-01b0,U+1ea0-1ef9,U+20ab}@font-face{font-family:"Nunito";font-style:normal;font-weight:400;src:url('+_+') format("woff2");unicode-range:U+0100-024f,U+0259,U+1e??,U+2020,U+20a0-20ab,U+20ad-20cf,U+2113,U+2c60-2c7f,U+a720-a7ff}@font-face{font-family:"Nunito";font-style:normal;font-weight:400;src:url('+y+') format("woff2");unicode-range:U+00??,U+0131,U+0152-0153,U+02bb-02bc,U+02c6,U+02da,U+02dc,U+2000-206f,U+2074,U+20ac,U+2122,U+2191,U+2193,U+2212,U+2215,U+feff,U+fffd}',""]),e.exports=h},334:function(e,t,n){e.exports=n.p+"fonts/Nunito-400-cyrillic-ext1.ea59f4e.woff2"},335:function(e,t,n){e.exports=n.p+"fonts/Nunito-400-cyrillic2.905568d.woff2"},336:function(e,t,n){e.exports=n.p+"fonts/Nunito-400-vietnamese3.6fcc161.woff2"},337:function(e,t,n){e.exports=n.p+"fonts/Nunito-400-latin-ext4.6463a96.woff2"},338:function(e,t,n){e.exports=n.p+"fonts/Nunito-400-latin5.6c056c5.woff2"},339:function(e,t,n){"use strict";n(238)},340:function(e,t,n){var r=n(35)(!1);r.push([e.i,"body{font-family:Nunito,sans-serif;color:#454545;font-size:16px;margin:0}",""]),e.exports=r},341:function(e,t,n){"use strict";n(239)},342:function(e,t,n){var r=n(35)(!1);r.push([e.i,"",""]),e.exports=r},343:function(e,t,n){"use strict";n(240)},344:function(e,t,n){var r=n(35)(!1);r.push([e.i,".logo[data-v-98d2e930]{color:#fff;color:#1f91f2;height:20px;line-height:20px;padding:10px;text-align:center;font-weight:900;font-size:20px;text-transform:uppercase;border-radius:8px}.logo .second[data-v-98d2e930]{display:inline-block;padding:5px 10px;background:#1f91f2;border-radius:4px;color:#fff;margin-top:-5px}",""]),e.exports=r},345:function(e,t,n){"use strict";n(241)},346:function(e,t,n){var r=n(35)(!1);r.push([e.i,".wrap-contacts[data-v-5021eb3e]{height:40px;line-height:40px;color:#fff;width:calc(100% - 40px);margin-left:10px;padding:0 10px;border-radius:8px;margin-bottom:5px;margin-top:10px;cursor:pointer;font-weight:bolder;transition:all .2s ease-in-out;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.wrap-contacts[data-v-5021eb3e]:hover{background:rgba(0,0,0,.1);padding-left:20px;padding-right:0}.wrap-contacts[data-v-5021eb3e]:first-of-type{margin-top:20px}.wrap-contacts.active[data-v-5021eb3e]{background:#fff;color:#1f91f2}",""]),e.exports=r},355:function(e,t,n){"use strict";n(245)},356:function(e,t,n){var r=n(35)(!1);r.push([e.i,'.wrap-conversations[data-v-01621b32]{height:calc(100vh - 100px)}.wrap-fb-user[data-v-01621b32]{height:80px;line-height:80px;padding-left:15px;padding-right:10px;color:#999;border-bottom:1px solid #f5f5f5;cursor:pointer;position:relative}.wrap-fb-user[data-v-01621b32],.wrap-fb-user[data-v-01621b32]:before{background:#fff;transition:all .2s ease-in-out}.wrap-fb-user[data-v-01621b32]:before{content:"";width:5px;height:60px;position:absolute;border-radius:0 5px 5px 0;left:-5px;top:10px}.wrap-fb-user[data-v-01621b32]:hover{background:#fafafa;padding-left:20px}.wrap-fb-user[data-v-01621b32]:hover:before{background:#ccc;left:0}.wrap-fb-user.unread[data-v-01621b32]{color:#777;font-weight:bolder}.wrap-fb-user.active[data-v-01621b32]{background:#f5f5f5;padding-left:20px}.wrap-fb-user.active[data-v-01621b32]:before{left:0;background:#1f91f2}.wrap-fb-user .name[data-v-01621b32]{float:left;width:100px;height:26px;line-height:26px;margin-top:10px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.wrap-fb-user .count[data-v-01621b32]{width:20px;height:20px;line-height:20px;text-align:center;margin-top:10px;float:right;color:#fff;background:#f56c6c;border-radius:11px;font-weight:bolder;bottom:10px}.wrap-fb-user .count[data-v-01621b32],.wrap-fb-user .time[data-v-01621b32]{font-size:10px;position:absolute;right:10px}.wrap-fb-user .time[data-v-01621b32]{top:10px;height:26px;line-height:26px;color:#ccc}.wrap-fb-user .snippet[data-v-01621b32]{width:calc(100% - 30px);height:44px;line-height:44px;font-size:14px;color:#999;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.btn-back[data-v-01621b32]{width:calc(100% - 40px);margin-left:20px;margin-bottom:7px}',""]),e.exports=r},357:function(e,t,n){"use strict";n(246)},358:function(e,t,n){var r=n(35)(!1);r.push([e.i,".wrap-admin-nav[data-v-516369cf]{padding:10px}.wrap-admin-nav a[data-v-516369cf]{display:block;color:#fff;text-decoration:none;text-transform:uppercase;letter-spacing:1px;font-weight:600;transition:all .3s ease-in-out;height:40px;line-height:40px;padding:0 10px;border-radius:8px;margin-bottom:2px;font-size:12px}.wrap-admin-nav a[data-v-516369cf]:hover{padding-left:15px;color:#1f91f2;background:#fff;letter-spacing:3px;font-size:14px}",""]),e.exports=r},359:function(e,t,n){"use strict";n(247)},360:function(e,t,n){var r=n(35)(!1);r.push([e.i,".page-name[data-v-5459741a]{margin-top:180px;text-align:center;margin-bottom:20px;color:#eee}.page-name .title[data-v-5459741a]{text-transform:uppercase;font-weight:700;margin-bottom:10px}.wrap[data-v-5459741a]{padding:20px;background:#fff;border-radius:10px}",""]),e.exports=r},361:function(e,t,n){"use strict";n.r(t);var r=n(3),o=(n(16),n(55),"message/"),c={add:function(e,t){var n=this;return Object(r.a)(regeneratorRuntime.mark((function r(){var c,f,param,l;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return c=e.commit,f=t.pageId,param=t.param,l={method:"post",url:"".concat(o,"add/").concat(f),data:param,message:{success:"Facebook page added."}},r.next=5,n.$sender(l).then((function(e){e.success&&c("ADD",e.content.data)}));case 5:case"end":return r.stop()}}),r)})))()},browse:function(e,t){var n=this;return Object(r.a)(regeneratorRuntime.mark((function r(){var c,f;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return c=e.commit,f={method:"get",url:"".concat(o,"browse/").concat(t)},console.log(t),r.next=5,n.$sender(f).then((function(e){console.log(e),e.success&&c("SET",{id:t,data:e.content.data})}));case 5:case"end":return r.stop()}}),r)})))()},edit:function(e,param){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,c={method:"put",url:"".concat(o).concat(param.id,"/edit"),data:param,message:{success:"Facebook page edited."}},n.next=4,t.$sender(c).then((function(e){e.success&&r("EDIT",e.content.data)}));case 4:case"end":return n.stop()}}),n)})))()}};t.default=c},362:function(e,t,n){"use strict";n.r(t),t.default={messages:function(e){return function(t){return e.messages[t]}},messageAll:function(e){return e.messages}}},363:function(e,t,n){"use strict";n.r(t);var r=n(12),o=n(81);n(45),n(26),n(18),n(25),n(9),n(37),n(19),n(38);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}t.default={ADD:function(e,t){var n=t.id,param=t.param;e.pages[n].push(param)},EDIT:function(e,t){e.messages=Object(o.a)(e.pages.map((function(e){return e.id!==t.id?e:f(f({},e),t)})))},SET:function(e,t){var n=t.id,data=t.data;e.messages[n]=data}}},364:function(e,t,n){"use strict";n.r(t),t.default=function(){return{messages:{0:[]}}}},365:function(e,t,n){"use strict";n.r(t);var r=n(3),o=(n(55),n(16),"page/"),c={add:function(e,param){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,c={method:"post",url:"".concat(o,"add"),data:param,message:{success:"Facebook page added."}},n.next=4,t.$sender(c).then((function(e){e.success&&r("ADD",e.content.data)}));case 4:case"end":return n.stop()}}),n)})))()},browse:function(e,param){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,c={method:"get",url:"".concat(o,"browse").concat(null!==param?"?with_token=true":""),data:param},n.next=4,t.$sender(c).then((function(e){e.success&&r("SET",e.content.data)}));case 4:case"end":return n.stop()}}),n)})))()},edit:function(e,param){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,c={method:"put",url:"".concat(o).concat(param.id,"/edit"),data:param,message:{success:"Facebook page edited."}},n.next=4,t.$sender(c).then((function(e){e.success&&r("EDIT",e.content.data)}));case 4:case"end":return n.stop()}}),n)})))()}};t.default=c},366:function(e,t,n){"use strict";n.r(t),t.default={pages:function(e){return e.pages}}},367:function(e,t,n){"use strict";n.r(t);var r=n(12),o=n(81);n(45),n(26),n(18),n(25),n(9),n(37),n(19),n(38);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}t.default={ADD:function(e,param){e.pages.push(param)},EDIT:function(e,t){e.pages=Object(o.a)(e.pages.map((function(e){return e.id!==t.id?e:f(f({},e),t)})))},SET:function(e,param){e.pages=param}}},368:function(e,t,n){"use strict";n.r(t),t.default=function(){return{pages:[]}}},369:function(e,t,n){"use strict";n.r(t);var r=n(3),o=(n(55),n(16),"user/"),c={add:function(e,param){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,c={method:"post",url:"".concat(o,"add"),data:param,message:{success:"User Added"}},n.next=4,t.$sender(c).then((function(e){e.success&&r("ADD",e.content.data)}));case 4:case"end":return n.stop()}}),n)})))()},users:function(e,param){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,c={method:"get",url:"".concat(o,"users"),data:param},n.next=4,t.$sender(c).then((function(e){e.success&&r("SET",e.content.data)}));case 4:case"end":return n.stop()}}),n)})))()},edit:function(e,param){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,c={method:"put",url:"".concat(o).concat(param.id,"/edit"),data:param,message:{success:"Facebook page edited."}},n.next=4,t.$sender(c).then((function(e){e.success&&r("EDIT",e.content.data)}));case 4:case"end":return n.stop()}}),n)})))()},roles:function(e,param){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,t.$sender({method:"get",url:"".concat(o,"roles")}).then((function(e){e.success&&r("SET_ROLES",e.content.data)}));case 3:case"end":return n.stop()}}),n)})))()}};t.default=c},370:function(e,t,n){"use strict";n.r(t),t.default={users:function(e){return e.users},roles:function(e){return e.roles}}},371:function(e,t,n){"use strict";n.r(t);var r=n(12),o=n(81);n(45),n(26),n(18),n(25),n(9),n(37),n(19),n(38);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}t.default={ADD:function(e,param){e.users.push(param)},EDIT:function(e,t){e.pages=Object(o.a)(e.users.map((function(e){return e.id!==t.id?e:f(f({},e),t)})))},SET:function(e,param){e.users=param},SET_ROLES:function(e,param){e.roles=param}}},372:function(e,t,n){"use strict";n.r(t),t.default=function(){return{users:[],roles:[]}}},391:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=391},453:function(e,t,n){"use strict";n.r(t);var r={},o=(n(343),n(10)),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)}),[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"logo"},[e._v("\n  Ekballo\n  "),n("span",{staticClass:"second"},[e._v("\n    Chat\n  ")])])}],!1,null,"98d2e930",null);t.default=component.exports},454:function(e,t,n){"use strict";n.r(t);n(26),n(18),n(37),n(19),n(38);var r=n(31),o=n(3),c=n(12),f=(n(16),n(25),n(9),n(23),n(63),n(199),n(43));function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(c.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v={data:function(){return{ap:[],visibility:{contactNav:!1},loading:{userPages:!1},data:{userPages:[]}}},fetch:function(){this.getPages(),console.log("hi fetch"),this.api().getUserPages(this.$auth.user.id)},computed:d(d({},Object(f.c)({pages:"pages/pages"})),{},{activePages:function(){return this.pages.filter((function(p){return p.is_active}))}}),watch:{pages:{handler:function(e,t){this.ap=this.pages.filter((function(p){return p.is_active&&null!==p.access_token}))},deep:!0}},mounted:function(){},methods:d(d({},Object(f.b)({getPages:"pages/browse"})),{},{handlePageClick:function(p){p.page_id!==parseInt(this.$route.query.page)&&this.$router.replace({query:d(d({},this.$route.query),{},{page:p.page_id})}),this.visibility.contactNav=!0;var e=this.helper().getPageName(p.page_id);this.$root.$emit("PageChanged",e)},handleNavClosed:function(){this.visibility.contactNav=!1},api:function(){var e=this;return{getUserPages:function(t){return Object(o.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log("hi here"),e.loading.userPages=!0,r={method:"get",url:"user/page/get/"+t},n.next=5,e.$sender(r).then((function(t){e.loading.userPages=!1,console.log(t.content.data),e.data.userPages=t.content.data}));case 5:case"end":return n.stop()}}),n)})))()}}},helper:function(){var e=this;return{getPageName:function(t){var n=e.pages.find((function(p){return 1===p.id}));return console.log(Object(r.a)(n)),n}}}})},h=(n(345),n(10)),component=Object(h.a)(v,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{"margin-top":"10px"}},[e.visibility.contactNav?e._e():n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading.userPages,expression:"loading.userPages"}],staticStyle:{"min-height":"calc(100vh - 80px)"},attrs:{"element-loading-text":"Loading pages...","element-loading-background":"rgba(0, 0, 0, 0.5)"}},e._l(e.data.userPages,(function(p){return n("div",{key:p.id,class:"wrap-contacts "+(p.page_id===parseInt(e.$route.query.page)?"active":""),on:{click:function(t){return e.handlePageClick(p)}}},[e._v("\n      "+e._s(e.helper().getPageName(p.page_id).name)+"\n    ")])})),0),e._v(" "),void 0!==e.$route.query.page&&e.visibility.contactNav?n("NavContacts",{on:{navClosed:function(t){return e.handleNavClosed()}}}):e._e()],1)}),[],!1,null,"5021eb3e",null);t.default=component.exports;installComponents(component,{NavContacts:n(455).default})},455:function(e,t,n){"use strict";n.r(t);n(26),n(18),n(37),n(19),n(38);var r=n(3),o=n(12),c=(n(16),n(199),n(9),n(23),n(63),n(25),n(79)),f=n(43);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v={data:function(){return{loaded:{messages:!1},conversations:[],activeId:0}},computed:d(d({},Object(f.c)({pages:"pages/pages"})),{},{currentPage:function(){var e=this,t={};return void 0!==this.$route.query.page&&(t=d({},this.pages.find((function(p){return p.id===parseInt(e.$route.query.page)})))),console.log(t),t}}),watch:{currentPage:function(e,q){e.id!==q.id&&this.getFbConversations()}},mounted:function(){this.getFbConversations()},methods:{handleCloseNav:function(){this.conversations=[];var e=this.$route.query;delete e.mid,console.log(e),this.$router.replace({query:{}}),this.$emit("navClosed")},getFbConversations:function(){var e=arguments,t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.length>0&&void 0!==e[0]&&e[0],t.conversations=[],r||(t.loaded.messages=!1),n.next=5,c.api("/".concat(t.currentPage.page_id),"get",{fields:"conversations{unread_count,subject,snippet,senders,can_reply,message_count,updated_time,participants}",access_token:t.currentPage.access_token}).then((function(e){t.conversations=[],t.conversations=e.conversations.data,console.group("conversations"),console.log(t.conversations),console.groupEnd(),t.loaded.messages=!0})).catch((function(e){console.log("error"),console.log(e)}));case 5:case"end":return n.stop()}}),n)})))()},userProfile:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t.currentPage),e.next=3,c.api("/".concat(t.currentPage.page_id),"GET",{access_token:t.currentPage.access_token});case 3:return n=e.sent,console.log(n),e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})))()},handleConversationClick:function(e){var t=this;this.activeId=e.id;var n=e.participants.data.filter((function(p){return p.id!==t.currentPage.page_id+""}));console.log(n[0].id),void 0!==this.$route.query.mid&&this.$route.query.mid===e.id||this.$router.replace({query:d(d({},this.$route.query),{},{mid:e.id,psid:n[0].id})})},convertRelativeTime:function(e){var t=(new Date).getTime(),n=new Date(e).getTime(),r=Math.floor((t-n)/1e3);return r<1?"0s":r<60?"".concat(r,"s"):r<3600?"".concat(Math.floor(r/60),"m"):r<86400?"".concat(Math.floor(r/3600),"h"):r<604800?"".concat(Math.floor(r/86400),"d"):void 0}}},h=v,m=(n(355),n(10)),component=Object(m.a)(h,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:!e.loaded.messages,expression:"!loaded.messages"}],staticStyle:{"margin-top":"-10px"},attrs:{"element-loading-background":"rgb(238, 238, 238)"}},[n("div",{staticClass:"wrap-conversations"},e._l(e.conversations,(function(t){return n("div",{key:t.id,class:"wrap-fb-user "+(t.unread_count>0?"unread":"")+" "+(t.id===e.activeId?"active":""),on:{click:function(n){return e.handleConversationClick(t)}}},[n("span",{staticClass:"name"},[e._v("\n        "+e._s(t.senders.data[0].name)+"\n      ")]),e._v(" "),n("div",{staticClass:"time"},[e._v("\n        "+e._s(e.convertRelativeTime(t.updated_time))+"\n      ")]),e._v(" "),t.unread_count>0?n("span",{staticClass:"count"},[e._v("\n        "+e._s(t.unread_count)+"\n      ")]):e._e(),e._v(" "),n("div",{staticStyle:{clear:"both"}}),e._v(" "),n("div",{staticClass:"snippet"},[e._v("\n        "+e._s(t.snippet)+"\n      ")])])})),0),e._v(" "),n("el-button",{staticClass:"btn-back",attrs:{type:"default",size:"small"},on:{click:e.handleCloseNav}},[e._v("\n    Back\n  ")])],1)}),[],!1,null,"01621b32",null);t.default=component.exports},456:function(e,t,n){"use strict";n.r(t);var r={data:function(){return{navs:[{index:1,name:"dashboard",to:"/admin/dashboard"},{index:2,name:"users",to:"/admin/users"},{index:3,name:"pages",to:"/admin/pages"},{index:4,name:"settings",to:"/admin/settings"}]}}},o=(n(357),n(10)),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrap-admin-nav"},e._l(e.navs,(function(nav){return n("NuxtLink",{key:nav.index,attrs:{to:nav.to}},[e._v("\n    "+e._s(nav.name)+"\n  ")])})),1)}),[],!1,null,"516369cf",null);t.default=component.exports},457:function(e,t,n){"use strict";n.r(t);var r=n(3),o=(n(44),n(16),{data:function(){return{retrieved:!1,page:{},userPage:{},loading:!1}},watch:{"$route.query":function(e,t){void 0!==e.page&&this.getPageName()}},mounted:function(){var e=this;void 0!==this.$route.query.page&&this.getPageName(),this.$root.$on("PageJoined",(function(data){console.log(data),e.getPageName()})),this.$root.$on("PageChanged",(function(p){e.userPage=p}))},methods:{getPageName:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={method:"get",url:"page/".concat(e.$route.query.page,"/view")},t.next=3,e.$sender(n).then((function(t){e.page=t.content.data,e.checkUserPageExists(e.page.id)}));case 3:case"end":return t.stop()}}),t)})))()},checkUserPageExists:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={method:"get",url:"user/page/exists/".concat(e)},n.next=3,t.$sender(r).then((function(e){t.userPage=e.content.data,t.retrieved=!0}));case 3:case"end":return n.stop()}}),n)})))()},handlePageDropdownCommand:function(e){"leavePage"===e&&this.leavePage()},leavePage:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(e.page),n={method:"put",url:"user/page/edit/".concat(e.$route.query.page),message:{success:"You have left ".concat(e.page.name)}},t.next=4,e.$sender(n).then((function(t){e.$router.push("/message")}));case 4:case"end":return t.stop()}}),t)})))()}}}),c=n(10),component=Object(c.a)(o,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("span",{staticStyle:{float:"left"}},[e._v("\n  "+e._s(e.page.name)+"\n")])}),[],!1,null,null,null);t.default=component.exports},54:function(e,t,n){"use strict";var r={layout:"app",props:["error"],mounted:function(){console.error(this.error)}},o=n(10),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container",staticStyle:{"text-align":"center"}},[n("h1",{staticStyle:{"font-size":"48px",margin:"50px auto",color:"#F56C6C","margin-top":"100px"}},[n("i",{class:404===e.error.statusCode?"el-icon-document-delete":"el-icon-error"})]),e._v(" "),n("h1",{staticStyle:{"font-size":"46px",margin:"0 auto",color:"#ccc"}},[e._v("\n    Toink!\n    "),n("br"),e._v("\n    "+e._s(404===e.error.statusCode?"Page not found.":"An error occurred.")+"\n  ")]),e._v(" "),n("h1",{staticStyle:{"font-size":"60px",margin:"50px auto",color:"#ccc"}},[e._v("\n    "+e._s(e.error.statusCode)+"\n  ")]),e._v(" "),n("p",{staticStyle:{color:"#999"}},[e._v("\n    "+e._s(e.error.message)+"\n  ")]),e._v(" "),n("NuxtLink",{attrs:{to:"/"}},[n("el-button",{attrs:{type:"primary",icon:"el-icon-s-home"}},[e._v("\n      Back to Home\n    ")])],1)],1)}),[],!1,null,null,null);t.a=component.exports}},[[286,21,3,22]]]);