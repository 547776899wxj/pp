(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/collection"],{"0393":function(t,n,e){"use strict";e.r(n);var r=e("3866"),o=e.n(r);for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);n["default"]=o.a},"0680":function(t,n,e){"use strict";var r=e("e4bb"),o=e.n(r);o.a},"0bf9":function(t,n,e){"use strict";e.r(n);var r=e("379a"),o=e("f0ef");for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);e("0680");var a,i=e("f0c5"),c=Object(i["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);n["default"]=c.exports},"0f64":function(t,n,e){"use strict";var r;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return r}));var o=function(){var t=this,n=t.$createElement;t._self._c},u=[]},"379a":function(t,n,e){"use strict";var r;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return r}));var o=function(){var t=this,n=t.$createElement;t._self._c},u=[]},3866:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={props:{list:Array,loading:{type:Boolean,default:!1}},data:function(){return{}},watch:{list:function(t){this.$forceUpdate()}},methods:{}};n.default=r},"605e":function(t,n,e){"use strict";(function(t){e("27ea");r(e("66fd"));var n=r(e("0bf9"));function r(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"64d3":function(t,n,e){"use strict";var r=e("ddcb"),o=e.n(r);o.a},"6ac7":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=u(e("8802")),o=u(e("ed14"));function u(t){return t&&t.__esModule?t:{default:t}}function a(t){return s(t)||f(t)||c(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t,n){if(t){if("string"===typeof t)return l(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?l(t,n):void 0}}function f(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function s(t){if(Array.isArray(t))return l(t)}function l(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}var d={components:{listempty:r.default,nomore:o.default},data:function(){return{list:{rows:[],pageCount:0,total:0},pageNumber:1,loading:!1,isReturn:!1}},onLoad:function(){this.fetchData()},onShow:function(){this.isReturn&&(this.pageNumber=0,this.list.rows=[],this.fetchData())},onReachBottom:function(){this.loading||this.pageNumber>this.list.pageCount||this.list.rows.length>=this.list.total||this.fetchData()},methods:{fetchData:function(){var n=this;this.loading=!0,t.$api.getCollectGoods({pageNumber:this.pageNumber}).then((function(t){var e;console.log("res",t),(e=n.list.rows).push.apply(e,a(t.rows)),n.list.pageCount=t.pageCount,n.list.total=t.total,n.pageNumber++,n.loading=!1})).catch((function(e){n.loading=!1,t.$toast.showError(e.message)}))},handleCollect:function(n){var e=this,r=e.list.rows[n].goodsId;t.$toast.confirm("确定要取消收藏吗").then((function(){t.$api.collectGoods({goodsId:r}).then((function(r){t.$toast.showSuccess("操作成功"),e.list.rows.splice(n,1)})).catch((function(n){t.$toast.showError(n.message)}))}))},toGoodsDetail:function(n){n&&(this.isReturn=!0,t.navigateTo({url:"/pages/goods/goodsdetail?goodsId="+n}))}}};n.default=d}).call(this,e("543d")["default"])},8802:function(t,n,e){"use strict";e.r(n);var r=e("d6df"),o=e("0393");for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);e("afd5");var a,i=e("f0c5"),c=Object(i["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);n["default"]=c.exports},afd5:function(t,n,e){"use strict";var r=e("be82"),o=e.n(r);o.a},be82:function(t,n,e){},c35f:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={props:{pageCount:Number,pageNumber:Number},data:function(){return{}},methods:{}};n.default=r},d6df:function(t,n,e){"use strict";var r;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return r}));var o=function(){var t=this,n=t.$createElement;t._self._c},u=[]},ddcb:function(t,n,e){},e4bb:function(t,n,e){},e642:function(t,n,e){"use strict";e.r(n);var r=e("c35f"),o=e.n(r);for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);n["default"]=o.a},ed14:function(t,n,e){"use strict";e.r(n);var r=e("0f64"),o=e("e642");for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);e("64d3");var a,i=e("f0c5"),c=Object(i["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);n["default"]=c.exports},f0ef:function(t,n,e){"use strict";e.r(n);var r=e("6ac7"),o=e.n(r);for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);n["default"]=o.a}},[["605e","common/runtime","common/vendor"]]]);