(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/address"],{2399:function(e,t,s){"use strict";s.r(t);var n=s("e616"),d=s.n(n);for(var a in n)"default"!==a&&function(e){s.d(t,e,(function(){return n[e]}))}(a);t["default"]=d.a},"31ec":function(e,t,s){"use strict";(function(e){s("27ea");n(s("66fd"));var t=n(s("53ae"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,s("543d")["createPage"])},"53ae":function(e,t,s){"use strict";s.r(t);var n=s("6586"),d=s("2399");for(var a in d)"default"!==a&&function(e){s.d(t,e,(function(){return d[e]}))}(a);s("8467");var r,u=s("f0c5"),c=Object(u["a"])(d["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);t["default"]=c.exports},6586:function(e,t,s){"use strict";var n;s.d(t,"b",(function(){return d})),s.d(t,"c",(function(){return a})),s.d(t,"a",(function(){return n}));var d=function(){var e=this,t=e.$createElement;e._self._c},a=[]},8467:function(e,t,s){"use strict";var n=s("8ef3"),d=s.n(n);d.a},"8ef3":function(e,t,s){},e616:function(e,t,s){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s={data:function(){return{addressList:[],needBackAddressId:!1}},onLoad:function(e){var t=e.needBackAddressId;this.needBackAddressId=t},onShow:function(){this.getAllAddress()},methods:{getAllAddress:function(){var t=this;e.$api.getAllAddress().then((function(e){e.success&&(t.addressList=e.rows||[])}))},goToAdd:function(t){var s="/pages/user/address/add";t&&(s+="?addressId="+t),e.navigateTo({url:s})},delAddress:function(t){var s=this;e.showModal({title:"温馨提示",content:"确认删除此条收货地址吗?",success:function(n){n.confirm&&e.$api.deleteAddress({addressId:t}).then((function(t){t.success&&(e.$toast.showToast("删除成功"),s.getAllAddress())}))}})},updateDefaultStatus:function(t){var s=this,n=this.addressList[t];if(1!=n.addressDefaultStatus){var d={addressId:n.addressId};e.$api.setDefaultAddress(d).then((function(e){s.getAllAddress(),s.$forceUpdate()})).catch((function(t){e.$toast.showError(t.message)}))}},chooseAddress:function(t){if(this.needBackAddressId){var s=getCurrentPages(),n=s[s.length-2];n.$vm.addressId=t,e.navigateBack()}}}};t.default=s}).call(this,s("543d")["default"])}},[["31ec","common/runtime","common/vendor"]]]);