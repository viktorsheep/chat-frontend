(window.webpackJsonp=window.webpackJsonp||[]).push([[14,5],{474:function(e,r,t){"use strict";t.r(r);var o=t(3),n=(t(27),t(42),{data:function(){return{form:{email:"",password:""},rules:{email:[{required:!0,message:"Please enter you email address",trigger:"blur"},{type:"email",message:"Please enter a valid email address",trigger:"blur"}],password:[{required:!0,message:"Please enter your password",trigger:"blur"}]}}},methods:{handleLogin:function(e){var r=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),t.prev=1,t.next=4,r.$auth.loginWith("backend",{data:{email:r.form.email,password:r.form.password}}).then((function(e){console.log(e),r.$axios.setHeader("Authorization",e.data.access_token),r.$auth.setUserToken(e.data.access_token).then((function(e){console.log(r.$auth.user),r.$router.push("".concat(1===r.$auth.user.user_role_id?"/admin/dashboard":"/pages")),r.$message({showClose:!0,message:"Welcome back ".concat(r.$auth.user.name,"."),type:"success"})})),console.log(r.$auth.loggedIn)}));case 4:t.next=10;break;case 6:t.prev=6,t.t0=t.catch(1),r.$cg({title:"Login Error",type:"error",logs:t.t0}),r.$message({message:"Your email or password is incorrect",type:"error"});case 10:case"end":return t.stop()}}),t,null,[[1,6]])})))()}}}),l=t(10),component=Object(l.a)(n,(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px","label-position":"top",inline:!1,size:"medium"}},[t("el-form-item",{attrs:{label:"",prop:"email"}},[t("el-input",{attrs:{placeholder:"Your Email"},model:{value:e.form.email,callback:function(r){e.$set(e.form,"email",r)},expression:"form.email"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"",prop:"password"}},[t("el-input",{attrs:{placeholder:"Your Password","show-password":""},model:{value:e.form.password,callback:function(r){e.$set(e.form,"password",r)},expression:"form.password"}})],1),e._v(" "),t("el-form-item",{staticStyle:{"text-align":"center"}},[t("el-button",{attrs:{type:"primary"},on:{click:e.handleLogin}},[e._v(" Login ")])],1)],1)}),[],!1,null,null,null);r.default=component.exports},501:function(e,r,t){"use strict";t.r(r);var o={layout:"auth",middleware:"memberOnly",mounted:function(){}},n=t(10),component=Object(n.a)(o,(function(){var e=this.$createElement;return(this._self._c||e)("FormAuthLogin")}),[],!1,null,null,null);r.default=component.exports;installComponents(component,{FormAuthLogin:t(474).default})}}]);