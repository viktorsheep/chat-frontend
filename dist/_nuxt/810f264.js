(window.webpackJsonp=window.webpackJsonp||[]).push([[15,7],{481:function(e,r,t){"use strict";t.r(r);var o={layout:"auth",data:function(){var e=this;return{form:{name:"",email:"",password:"",password_confirmation:""},rules:{name:[{required:!0,message:"Please enter you name",trigger:"blur"}],email:[{required:!0,message:"Please enter you email address",trigger:"blur"},{type:"email",message:"Please enter a valid email address",trigger:"blur"}],password:[{validator:function(r,t,o){""===t?o(new Error("Please input the password")):(""!==e.form.password_confirmation&&e.$refs.form.validateField("checkPass"),o())},trigger:"blur"}],password_confirmation:[{validator:function(r,t,o){""===t?o(new Error("Please input the password again")):t!==e.form.password?o(new Error("Passwords doesn't match!")):o()},trigger:"blur"}]}}},methods:{onSubmit:function(){var e=this;this.$refs.form.validate((function(r){if(!r)return!1;alert("submit!"),e.$sender({method:"post",url:"auth/register",data:e.form,message:{success:"You are registered! Login again to continue."}}).then((function(r){e.$router.push("/auth/login")})).catch((function(r){e.$cg({type:"error",title:"Register Error",logs:r}),e.$notify.error({title:"Sorry, something went wrong.",message:"We couldn't register you."})}))}))},validateOne:function(e,r,t){""===r?t(new Error("Please input the password")):(""!==this.form.password_confirmation&&this.$refs.form.validateField("checkPass"),t())}}},n=t(6),component=Object(n.a)(o,(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px","label-position":"top",inline:!1,size:"medium"}},[t("el-form-item",{attrs:{label:"",prop:"name"}},[t("el-input",{attrs:{placeholder:"Your Name"},model:{value:e.form.name,callback:function(r){e.$set(e.form,"name",r)},expression:"form.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"",prop:"email"}},[t("el-input",{attrs:{placeholder:"Your Email"},model:{value:e.form.email,callback:function(r){e.$set(e.form,"email",r)},expression:"form.email"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"",prop:"password"}},[t("el-input",{attrs:{type:"password",placeholder:"Your Password"},model:{value:e.form.password,callback:function(r){e.$set(e.form,"password",r)},expression:"form.password"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"",prop:"password_confirmation"}},[t("el-input",{attrs:{type:"password",placeholder:"Confirm Your Password"},model:{value:e.form.password_confirmation,callback:function(r){e.$set(e.form,"password_confirmation",r)},expression:"form.password_confirmation"}})],1),e._v(" "),t("el-form-item",{staticStyle:{"text-align":"center"}},[t("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("\n      Register\n    ")])],1)],1)}),[],!1,null,null,null);r.default=component.exports},514:function(e,r,t){"use strict";t.r(r);var o={layout:"auth",auth:"guest"},n=t(6),component=Object(n.a)(o,(function(){var e=this.$createElement;return(this._self._c||e)("FormAuthRegister")}),[],!1,null,null,null);r.default=component.exports;installComponents(component,{FormAuthRegister:t(481).default})}}]);