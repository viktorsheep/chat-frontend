(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{484:function(e,t,r){var content=r(506);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(26).default)("d90cca90",content,!0,{sourceMap:!1})},505:function(e,t,r){"use strict";r(484)},506:function(e,t,r){var n=r(25)(!1);n.push([e.i,".list-userpages[data-v-2ca351c0]{border:1px solid #ccc;padding:10px;border-radius:4px;margin-bottom:10px;height:60px;position:relative;transition:all .3s ease-in-out;cursor:pointer}.list-userpages.unassociated[data-v-2ca351c0]{height:30px;line-height:30px}.list-userpages.unassociated .control[data-v-2ca351c0]{top:9px}.list-userpages .pagename[data-v-2ca351c0]{font-weight:bolder;margin-bottom:20px}.list-userpages .control[data-v-2ca351c0]{position:absolute;right:0;top:25px;text-align:center;width:100px;height:30px;opacity:0;transition:all .3s ease-in-out}.list-userpages[data-v-2ca351c0]:hover{background:#eee}.list-userpages:hover .control[data-v-2ca351c0]{opacity:1}",""]),e.exports=n},515:function(e,t,r){"use strict";r.r(t);r(22),r(15),r(30),r(31);var n=r(3),o=r(7),c=(r(18),r(9),r(17),r(21),r(86),r(27),r(203),r(55),r(200),r(20));function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v={layout:"app",data:function(){return{visibility:{drawer:!1,dialog:{userPages:!1},notAssociated:!1},loading:{userPages:!1},data:{user:{name:"",email:"",password:"",password_confirmation:"",is_active:!1,is_confirmed:!0,user_role_id:3,pages:[]},userPages:[],userID:0,pages:{selected:[],hideInactive:!1},search:{term:""},text:{is_active:"Inactive",hideInactive:"Hide Inactive Pages"}}}},fetch:function(){this.getUsers(),this.getRoles(),this.getPages({with_token:!0})},computed:d(d({},Object(c.c)({users:"users/users",roles:"users/roles",pages:"pages/pages"})),{},{pagesNotAssociated:function(){var e=[];return this.data.userPages.forEach((function(t){e.push(t.page_id)})),this.pages.filter((function(p){return!e.includes(p.id)}))}}),watch:{data:{handler:function(e,t){!0===e.pages.hideInactive?e.text.hideInactive="Show Inactive Pages":e.text.hideInactive="Hide Inactive Pages"},deep:!0}},methods:d(d({},Object(c.b)({getUsers:"users/users",searchUser:"users/search",getRoles:"users/roles",getPages:"pages/browse",addUser:"users/add"})),{},{handle:function(){var e=this;return{user:function(){return{add:function(){e.data.user.password_confirmation=e.data.user.password,0===e.data.user.pages.length&&delete e.data.user.pages,e.addUser(e.data.user)},search:function(){""!==e.data.search.term?e.searchUser({name:e.data.search.term}):e.getUsers()},view:function(t){e.visibility.dialog.userPages=!0,e.api().getUserPages(t)},delete:function(){},pages:function(){return{del:function(t,r){e.api().delUserPages(t,r)},add:function(t,r){e.api().addUserPages(t,r)}}}}},addUser:function(){e.data.user.password_confirmation=e.data.user.password,0===e.data.user.pages.length&&delete e.data.user.pages,e.addUser(e.data.user)},isActiveChanged:function(t){e.data.user.is_active?e.data.text.is_active="Active":e.data.text.is_active="Inactive"},drawer:function(){return{closed:function(){}}},close:function(){return{dialog:function(){e.visibility.notAssociated=!1,e.visibility.dialog.userPages=!1}}}}},api:function(){var e=this;return{getUserPages:function(t){return Object(n.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e.loading.userPages=!0,n={method:"get",url:"user/page/get/"+t},e.data.userID=t,r.next=5,e.$sender(n).then((function(t){e.loading.userPages=!1,e.data.userPages=t.content.data}));case 5:case"end":return r.stop()}}),r)})))()},delUserPages:function(t,r){var o=this;return Object(n.a)(regeneratorRuntime.mark((function n(){var c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.loading.userPages=!0,c={method:"delete",url:"user/page/delete/"+t},n.next=4,e.$sender(c).then((function(t){e.loading.userPages=!1,o.getUserPages(r)}));case 4:case"end":return n.stop()}}),n)})))()},addUserPages:function(t,r){var o=this;return Object(n.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.loading.userPages=!0,n.next=3,e.$sender({method:"post",url:"user/page/add/".concat(t,"/").concat(r)}).then((function(t){e.loading.userPages=!1,e.visibility.notAssociated=!1,o.getUserPages(r)}));case 3:case"end":return n.stop()}}),n)})))()}}},helper:function(){var e=this;return{getPageName:function(t){return e.pages.find((function(p){return p.id===t}))}}}})},h=(r(505),r(11)),component=Object(h.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-row",{staticStyle:{"margin-bottom":"20px"},attrs:{gutter:20}},[r("el-col",{attrs:{span:12,offset:0}},[r("b",[e._v("TOTAL USERS :")]),e._v(" "+e._s(e.users.length)+"\n    ")]),e._v(" "),r("el-col",{attrs:{span:6}},[r("el-input",{attrs:{placeholder:"Search user",size:"small",clearable:""},on:{change:function(t){e.handle().user().search()}},model:{value:e.data.search.term,callback:function(t){e.$set(e.data.search,"term",t)},expression:"data.search.term"}})],1),e._v(" "),r("el-col",{staticStyle:{"text-align":"right"},attrs:{span:6,offset:0}},[r("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:function(t){e.visibility.drawer=!0}}},[e._v("\n        Add User\n      ")])],1)],1),e._v(" "),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:24}},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.users}},[r("el-table-column",{attrs:{label:"Name",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(t.row.name)+"\n          ")]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"email",label:"Email Address"}}),e._v(" "),r("el-table-column",{attrs:{label:"Status",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("i",{class:e.row.is_active?"el-icon-success":"el-icon-remove",style:"color: #"+(e.row.is_active?"67C23A":"909399")})]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"created_at",label:"Joined At",width:"180"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-tooltip",{attrs:{effect:"dark",content:"User's associated pages",placement:"top","open-delay":500}},[r("el-button",{attrs:{type:"primary",icon:"el-icon-document",circle:""},on:{click:function(r){e.handle().user().view(t.row.id)}}})],1)]}}])})],1),e._v(" "),r("el-drawer",{attrs:{"with-header":!1,visible:e.visibility.drawer},on:{"update:visible":function(t){return e.$set(e.visibility,"drawer",t)},closed:function(t){e.handle().drawer().closed()}}},[r("el-row",{attrs:{gutter:0}},[r("el-col",{staticStyle:{padding:"0 20px",height:"calc(100vh - 70px)"},attrs:{span:24,offset:0}},[r("h3",[e._v("Add User")]),e._v(" "),r("el-form",{attrs:{"label-position":"top","label-width":"100px",model:e.data.user}},[r("el-form-item",[r("el-input",{attrs:{placeholder:"Name"},model:{value:e.data.user.name,callback:function(t){e.$set(e.data.user,"name",t)},expression:"data.user.name"}})],1),e._v(" "),r("el-form-item",[r("el-input",{attrs:{placeholder:"Email"},model:{value:e.data.user.email,callback:function(t){e.$set(e.data.user,"email",t)},expression:"data.user.email"}})],1),e._v(" "),r("el-form-item",[r("el-input",{attrs:{placeholder:"User Password",size:"normal","show-password":""},model:{value:e.data.user.password,callback:function(t){e.$set(e.data.user,"password",t)},expression:"data.user.password"}})],1),e._v(" "),r("el-form-item",[r("el-switch",{attrs:{"active-text":e.data.text.is_active,"inactive-color":"red"},on:{change:function(t){e.handle().isActiveChanged()}},model:{value:e.data.user.is_active,callback:function(t){e.$set(e.data.user,"is_active",t)},expression:"data.user.is_active"}})],1),e._v(" "),r("el-divider",{attrs:{direction:"horizontal","content-position":"center"}},[e._v("\n                Pages\n              ")]),e._v(" "),r("el-alert",{staticStyle:{"margin-bottom":"20px"},attrs:{title:"Select the pages to add the user as a member of the page(s).","show-icon":"",type:"info",closable:!1}}),e._v(" "),r("div",{staticStyle:{"margin-bottom":"20px"}},[r("el-switch",{attrs:{"active-text":e.data.text.hideInactive},model:{value:e.data.pages.hideInactive,callback:function(t){e.$set(e.data.pages,"hideInactive",t)},expression:"data.pages.hideInactive"}})],1),e._v(" "),r("div",{staticStyle:{"max-height":"340px",overflow:"auto"}},[r("el-checkbox-group",{model:{value:e.data.user.pages,callback:function(t){e.$set(e.data.user,"pages",t)},expression:"data.user.pages"}},e._l(e.pages,(function(p){return r("div",{key:p.id,style:"margin-bottom: 10px; "+(!p.is_active&&e.data.pages.hideInactive?"display: none;":"")},[r("el-checkbox",{staticStyle:{width:"100%"},attrs:{label:p.id,value:p.id,border:"",disabled:!p.is_active}},[e._v("\n                      "+e._s(p.name)+"\n                    ")])],1)})),0)],1)],1)],1)],1),e._v(" "),r("div",{staticStyle:{height:"50px","line-height":"50px","text-align":"right",padding:"0 10px"}},[r("el-button",{attrs:{type:"default",size:"small"},on:{click:function(t){e.visibility.drawer=!1}}},[e._v("\n            Cancel\n          ")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.handle().addUser()}}},[e._v("\n            Add\n          ")])],1)],1)],1)],1),e._v(" "),r("el-dialog",{attrs:{title:"User's Associated Pages",visible:e.visibility.dialog.userPages,width:"50%"},on:{"update:visible":function(t){return e.$set(e.visibility.dialog,"userPages",t)},closed:function(t){e.handle().close().dialog()}}},[r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading.userPages,expression:"loading.userPages"}]},[e.visibility.notAssociated?e._e():r("el-card",{staticStyle:{"margin-bottom":"20px"}},[r("div",{attrs:{slot:"header"},slot:"header"},[e._v("\n          Associated Pages\n        ")]),e._v(" "),r("div",{staticStyle:{"max-height":"calc(100vh - 600px)","overflow-y":"auto"}},e._l(e.data.userPages,(function(t){return r("div",{key:t.id,staticClass:"list-userpages"},[r("div",{staticClass:"pagename"},[e._v("\n              "+e._s(e.helper().getPageName(t.page_id).name)+"\n              "),r("i",{class:"el-icon-"+(t.is_joined?"success":"remove"),style:"color: #"+(t.is_joined?"67C23A":"909399")+";"})]),e._v(" "),t.is_joined?r("div",[r("b",[e._v("Joined at ")]),e._v(e._s(t.joined_date)+"\n            ")]):r("div",[r("b",[e._v("Left at ")]),e._v(e._s(t.left_date)+"\n            ")]),e._v(" "),r("div",{staticClass:"control"},[r("el-button",{attrs:{type:"danger",size:"small",icon:"el-icon-error"},on:{click:function(r){e.handle().user().pages().del(t.id,t.user_id)}}})],1)])})),0)]),e._v(" "),e.visibility.notAssociated?e._e():r("div",[r("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",plain:""},on:{click:function(t){e.visibility.notAssociated=!0}}},[r("i",{staticClass:"el-icon-plus"}),e._v("\n          Add Page\n        ")])],1),e._v(" "),e.visibility.notAssociated?r("el-card",{staticClass:"box-card"},[r("div",{attrs:{slot:"header"},slot:"header"},[e._v("\n          Other Pages\n          "),r("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{plain:"",type:"text"},on:{click:function(t){e.visibility.notAssociated=!1}}},[e._v("\n            Back\n          ")])],1),e._v(" "),r("div",{staticStyle:{"max-height":"calc(100vh - 500px)","overflow-y":"auto","margin-bottom":"20px"}},e._l(e.pagesNotAssociated,(function(t){return r("div",{key:t.id,staticClass:"list-userpages unassociated"},[r("div",{staticClass:"pagename"},[e._v("\n              "+e._s(t.name)+"\n            ")]),e._v(" "),r("div",{staticClass:"control"},[r("el-button",{attrs:{type:"success",size:"small",icon:"el-icon-plus"},on:{click:function(r){e.handle().user().pages().add(t.id,e.data.userID)}}},[e._v("\n                Add\n              ")])],1)])})),0)]):e._e()],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.visibility.dialog.userPages=!1}}},[e._v("Close")])],1)])],1)}),[],!1,null,"2ca351c0",null);t.default=component.exports}}]);