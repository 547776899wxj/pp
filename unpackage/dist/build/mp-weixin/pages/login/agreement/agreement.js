(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/agreement/agreement"],{"34b6":function(e,t,n){"use strict";n.r(t);var a=n("51a0"),r=n.n(a);for(var u in a)"default"!==u&&function(e){n.d(t,e,(function(){return a[e]}))}(u);t["default"]=r.a},"48ec":function(e,t,n){"use strict";var a=n("cb32"),r=n.n(a);r.a},"51a0":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{agreementId:"",agreementInfo:{}}},onLoad:function(e){e.agreementId&&(this.agreementId=e.agreementId,this.fetchData())},methods:{fetchData:function(){var t=this;e.$api.getAgreement({id:this.agreementId}).then((function(n){t.agreementInfo=n.data||{},t.agreementInfo&&t.agreementInfo.agreementContent&&(t.agreementInfo.agreementContent=e.$utils.formatRichTextImage(t.agreementInfo.agreementContent))}))}}};t.default=n}).call(this,n("543d")["default"])},6341:function(e,t,n){"use strict";(function(e){n("27ea");a(n("66fd"));var t=a(n("f012"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},7933:function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return a}));var r=function(){var e=this,t=e.$createElement;e._self._c},u=[]},cb32:function(e,t,n){},f012:function(e,t,n){"use strict";n.r(t);var a=n("7933"),r=n("34b6");for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);n("48ec");var o,c=n("f0c5"),f=Object(c["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);t["default"]=f.exports}},[["6341","common/runtime","common/vendor"]]]);