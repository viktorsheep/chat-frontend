(window.webpackJsonp=window.webpackJsonp||[]).push([[11,5],{462:function(e,t,n){var content=n(464);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(27).default)("e52b05e4",content,!0,{sourceMap:!1})},463:function(e,t,n){"use strict";n(462)},464:function(e,t,n){var r=n(26)(!1);r.push([e.i,".el-form-item .el-form-item__label[data-v-fec41d82],.el-form-item__label[data-v-fec41d82]{padding-bottom:0!important}",""]),e.exports=r},466:function(e,t,n){var content=n(477);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(27).default)("bef24634",content,!0,{sourceMap:!1})},471:function(e,t,n){"use strict";n.r(t);var r=n(465),o={props:{reset:{type:Boolean,default:!1},editData:{type:Object,default:function(){return null}},editMode:{type:Boolean,default:!1}},data:function(){return{form:{name:"",page_id:"",url:"",contact_person:"",access_token:"",is_active:!1},rules:{name:[{required:!0,message:"Please input the Page's name",trigger:"blur"}],page_id:[{required:!0,message:"Page ID is required.",trigger:"blur"}],url:[{required:!0,message:"Page URL is required.",trigger:"blur"}],contact_person:[{required:!0,message:"Contact person is required.",trigger:"blur"}]}}},watch:{form:{handler:function(e,t){this.$emit("formChanged",e)},deep:!0},editMode:{handler:function(e,t){e&&null!==this.editData&&(this.form=r.a(this.editData))}},reset:{handler:function(e,t){!0===e&&(this.$refs.form.resetFields(),this.$emit("formReset"))}}},mounted:function(){this.editMode&&null!==this.editData&&(this.form=r.a(this.editData))},methods:{}},l=(n(463),n(10)),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-form",{ref:"form",attrs:{"label-position":"right",model:e.form,rules:e.rules}},[n("el-form-item",{attrs:{prop:"name"}},[n("el-input",{attrs:{placeholder:"Page Name"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),n("el-form-item",{attrs:{prop:"page_id"}},[n("el-input",{attrs:{placeholder:"Page ID"},model:{value:e.form.page_id,callback:function(t){e.$set(e.form,"page_id",t)},expression:"form.page_id"}})],1),e._v(" "),n("el-form-item",{attrs:{prop:"url"}},[n("el-input",{attrs:{placeholder:"Page URL"},model:{value:e.form.url,callback:function(t){e.$set(e.form,"url",t)},expression:"form.url"}})],1),e._v(" "),n("el-form-item",{attrs:{prop:"contact_person"}},[n("el-input",{attrs:{placeholder:"Contact Person"},model:{value:e.form.contact_person,callback:function(t){e.$set(e.form,"contact_person",t)},expression:"form.contact_person"}})],1),e._v(" "),e.editMode?e._e():n("el-form-item",{attrs:{prop:"access_token"}},[n("el-input",{attrs:{placeholder:"Access Token"},model:{value:e.form.access_token,callback:function(t){e.$set(e.form,"access_token",t)},expression:"form.access_token"}})],1),e._v(" "),n("el-form-item",[e._v("\n    Active   : "),n("el-switch",{model:{value:e.form.is_active,callback:function(t){e.$set(e.form,"is_active",t)},expression:"form.is_active"}})],1)],1)}),[],!1,null,"fec41d82",null);t.default=component.exports},474:function(e,t,n){var r=n(7),o=n(284).values;r({target:"Object",stat:!0},{values:function(e){return o(e)}})},475:function(e,t,n){"use strict";var r=n(7),o=n(198).charAt,l=n(36),c=n(67),d=n(15);r({target:"String",proto:!0,forced:!0},{at:function(e){var t=d(l(this)),n=t.length,r=c(e),f=r>=0?r:n+r;return f<0||f>=n?void 0:o(t,f)}})},476:function(e,t,n){"use strict";n(466)},477:function(e,t,n){var r=n(26)(!1);r.push([e.i,".wrap-at[data-v-20622775]{height:40px;position:relative;text-align:center}.wrap-at span[data-v-20622775]{display:inline-block;height:40px;line-height:40px}.wrap-at .control[data-v-20622775]{position:absolute;top:0;width:100%;height:40px;line-height:40px;opacity:0;transition:all .2s ease-in-out}.wrap-at:hover .control[data-v-20622775]{opacity:1}",""]),e.exports=r},498:function(e,t,n){"use strict";n.r(t);n(21),n(16),n(20),n(34),n(17),n(35);var r=n(3),o=n(9),l=(n(25),n(11),n(474),n(475),n(465)),c=n(24);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m={layout:"app",middleware:"auth",data:function(){return{conf:{form:{page:{reset:!1}}},data:{current:{accessToken:"",atID:0,atTemp:""},form:{edit:{id:"",name:"",page_id:"",url:"",contact_person:"",is_active:!1},page:{name:"",page_id:"",url:"",contact_person:"",is_active:!1}}},state:{mode:{edit:!1},disabled:{btn:{addPage:!0}},visibility:{drawer:!1,dialog:{accessToken:!1,at:{edit:!1}}},loading:{dialog:{at:!1}}}}},fetch:function(){this.browsePages()},computed:f({},Object(c.c)({pages:"pages/pages"})),watch:{"state.visibility.dialog.at.edit":{handler:function(e,t){e?this.data.current.atTemp=this.data.current.accessToken:e||this.data.current.atTemp===this.data.current.accessToken||(this.data.current.accessToken=this.data.current.atTemp,this.data.current.atTemp="")}},"data.form.page":{handler:function(e,t){var n=l.a(e);delete n.is_active;var r=Object.values(n).every((function(e){return""!==e}));this.state.disabled.btn.addPage=!r},deep:!0}},methods:f(f({},Object(c.b)({browsePages:"pages/browse",addPage:"pages/add",editPage:"pages/edit"})),{},{handle:function(){var e=this;return{drawer:{open:function(p){!0===e.state.visibility.drawer?e.state.visibility.drawer=!1:e.state.visibility.drawer=!0},closed:function(){e.state.mode.edit=!1,e.conf.form.page.reset=!0}},dialog:{close:function(){},open:function(t){e.state.visibility.dialog.accessToken=!0,e.api().at.get(t.id)},button:{click:{close:function(){e.state.visibility.dialog.accessToken=!1},cancel:function(){e.state.visibility.dialog.at.edit=!1},update:function(){e.state.visibility.dialog.at.edit?e.api().at.update():e.state.visibility.dialog.at.edit=!0}}}},page:{save:function(){e.state.mode.edit?e.editPage(e.data.form.page):e.addPage(e.data.form.page),e.state.visibility.drawer=!1},edit:function(t){e.data.form.edit=l.a(t),e.state.mode.edit=!0,e.handle().drawer.open()}},event:{formChanged:function(form){e.data.form.page=l.a(form)}}}},api:function(){var e=this;return{at:{get:function(t){return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.state.loading.dialog.at=!0,n.next=3,e.$sender({method:"get",url:"page/".concat(t,"/access_token/get")}).then((function(n){e.data.current.atID=t,e.state.loading.dialog.at=!1,e.data.current.accessToken=n.content.data.access_token}));case 3:case"end":return n.stop()}}),n)})))()},update:function(){return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.state.loading.dialog.at=!0,t.next=3,e.$sender({method:"put",url:"page/".concat(e.data.current.atID,"/access_token/update"),data:{access_token:e.data.current.accessToken},message:{success:"Access token is updated."}}).then((function(t){console.log(t),e.state.visibility.dialog.at.edit=!1,e.state.loading.dialog.at=!1}));case 3:case"end":return t.stop()}}),t)})))()}}}},helper:function(){}})},v=(n(476),n(10)),component=Object(v.a)(m,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-row",[n("el-col",{staticStyle:{"text-align":"right"},attrs:{span:24}},[n("el-button",{attrs:{type:"primary",plain:"",size:"small"},on:{click:function(t){e.handle().drawer.open()}}},[e._v("\n        Add Page\n      ")])],1)],1),e._v(" "),n("el-row",{staticStyle:{"margin-top":"20px"}},[n("el-col",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.pages}},[n("el-table-column",{attrs:{prop:"name",label:"Name",width:"180"}}),e._v(" "),n("el-table-column",{attrs:{prop:"contact_person",label:"Contact Person"}}),e._v(" "),n("el-table-column",{attrs:{prop:"page_id",label:"Page ID",width:"100"}}),e._v(" "),n("el-table-column",{attrs:{prop:"url",label:"URL"}}),e._v(" "),n("el-table-column",{attrs:{label:"Access Token",width:"120",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("div",{staticClass:"wrap-at"},[n("span",[e._v("\n                ***********\n              ")]),e._v(" "),n("div",{staticClass:"control"},[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){e.handle().dialog.open(t.row)}}},[e._v("\n                  Get Token\n                ")])],1)])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"is_active",label:"Status",width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[n("i",{class:e.row.is_active?"el-icon-success":"el-icon-remove",style:"color: #"+(e.row.is_active?"67C23A":"909399")})]}}])}),e._v(" "),n("el-table-column",{attrs:{width:"80",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"warning",icon:"el-icon-edit",size:"mini",circle:"",plain:""},on:{click:function(n){e.handle().page.edit(t.row)}}})]}}])})],1)],1)],1),e._v(" "),n("el-drawer",{attrs:{"with-header":!1,visible:e.state.visibility.drawer},on:{"update:visible":function(t){return e.$set(e.state.visibility,"drawer",t)},closed:function(t){e.handle().drawer.closed()}}},[n("div",{staticStyle:{padding:"0 20px"}},[n("div",{staticStyle:{height:"calc(100vh - 70px)"}},[n("h3",[e._v("Add Page")]),e._v(" "),n("FormAdminPages",{attrs:{"edit-data":e.data.form.edit,"edit-mode":e.state.mode.edit,reset:e.conf.form.page.reset},on:{formChanged:function(t){var n;(n=e.handle().event).formChanged.apply(n,arguments)},formReset:function(t){e.conf.form.page.reset=!1}}})],1),e._v(" "),n("div",{staticStyle:{height:"50px","line-height":"50px","text-align":"right"}},[n("el-button",{attrs:{type:"default",size:"small"},on:{click:function(t){e.state.visibility.drawer=!1}}},[e._v("\n          Cancel\n        ")]),e._v(" "),n("el-button",{attrs:{type:e.state.mode.edit?"warning":"primary",size:"small",disabled:e.state.disabled.btn.addPage},on:{click:function(t){e.handle().page.save()}}},[e._v("\n          "+e._s(e.state.mode.edit?"Edit":"Add")+"\n        ")])],1)])]),e._v(" "),n("el-dialog",{attrs:{title:"Access Token",visible:e.state.visibility.dialog.accessToken,width:"70%"},on:{"update:visible":function(t){return e.$set(e.state.visibility.dialog,"accessToken",t)}}},[n("div",[n("el-input",{attrs:{placeholder:"Access Token",disabled:!e.state.visibility.dialog.at.edit,size:"normal",clearable:""},model:{value:e.data.current.accessToken,callback:function(t){e.$set(e.data.current,"accessToken",t)},expression:"data.current.accessToken"}},[e.state.visibility.dialog.at.edit?e._e():n("el-button",{attrs:{slot:"append",icon:"el-icon-document-copy",type:"primary"},slot:"append"})],1)],1),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(t){e.handle().dialog.button.click.update()}}},[e._v("\n        Update "+e._s(e.state.visibility.dialog.at.edit?"":"Token")+"\n      ")]),e._v(" "),n("el-button",{attrs:{size:"mini"},on:{click:function(t){e.state.visibility.dialog.at.edit?e.handle().dialog.button.click.cancel():e.handle().dialog.button.click.close()}}},[e._v("\n        "+e._s(e.state.visibility.dialog.at.edit?"Cancel":"Close")+"\n      ")])],1)])],1)}),[],!1,null,"20622775",null);t.default=component.exports;installComponents(component,{FormAdminPages:n(471).default})}}]);