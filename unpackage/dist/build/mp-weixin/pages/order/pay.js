(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/pay"],{"435a":function(e,t,n){},"9fdd":function(e,t,n){"use strict";var a=n("435a"),r=n.n(a);r.a},ad19:function(e,t,n){"use strict";n.r(t);var a=n("e034"),r=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=r.a},c13c:function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}));var r=function(){var e=this,t=e.$createElement,n=(e._self._c,e.detailList.length>0?e.getMoneyForYuan(e.order.orderPayMoney):null),a=e.detailList.length>0?e.getMoneyForFen(e.order.orderPayMoney):null,r=e.getMoneyForYuan(e.order.orderPayMoney),o=e.getMoneyForFen(e.order.orderPayMoney);e._isMounted||(e.e0=function(t){t.stopPropagation(),e.form.payCheck=!e.form.payCheck}),e.$mp.data=Object.assign({},{$root:{m0:n,m1:a,m2:r,m3:o}})},o=[]},de5e:function(e,t,n){"use strict";(function(e){n("27ea");a(n("66fd"));var t=a(n("e90e"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},e034:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{checkPayRule:!1,orderId:"",detailList:[],userBalance:{},order:{},orderMoneyType:2,channelData:[],outPayTime:0,payTimeId:"",hours:0,minute:0,second:0,form:{payCheck:!1,orderId:"",payId:"",channelType:"",mode:1}}},onLoad:function(e){this.orderId=e.orderId,this.form.orderId=this.orderId,this.initPayChannel(),this.initPageData()},watch:{outPayTime:function(e){if(e>0){var t=parseInt(e/60/60),n=e%3600,a=parseInt(n/60),r=n%60+"";this.hours=t>0?t:"",this.minute=a>0?a:"",this.second=r.length>1?r:"0"+r}else this.hours=0,this.minute=0,this.second=0,clearInterval(this.payTimeId)}},methods:{myBack:function(){e.switchTab({url:"/pages/index/main"})},checkClick:function(){this.form.payCheck=!this.form.payCheck},toAgreement:function(){e.navigateTo({url:"/pages/login/agreement/agreement?agreementId=3"})},initPayChannel:function(){var t=this;e.$api.getPayChannel({}).then((function(e){t.channelData=e.data}))},onChannelSelect:function(e){this.channelData.map((function(t){return t.payId==e.payId?t.channelCheck=1==t.channelCheck?0:1:t.channelCheck=0,t}))},initPageData:function(){var t=this;if(this.orderId)var n={orderId:this.orderId};e.$api.getOrderPayPageInfo(n).then((function(n){if(n.success){var a=n.detailList,r=n.userBalance,o=n.order,i=n.outPayTime;t.detailList=a,t.userBalance=r,t.order=o,t.outPayTime=i;var s=t;i>0&&(s.payTimeId=setInterval((function(){s.outPayTime-=1}),1e3))}else e.$toast.showError(n.message)}))},getMoneyForYuan:function(e){if(!e)return"0.";var t=e+"";return t.indexOf(".")>=0?t.substring(0,t.lastIndexOf(".")+1):t+"."},getMoneyForFen:function(e){if(!e)return"00";var t=e+"";return t.indexOf(".")>=0?t.substring(t.lastIndexOf(".")+1,t.length):"00"},orderPay:function(){if(""!=this.form.orderId)if(this.form.payCheck){var t=this.channelData.find((function(e){return 1==e.channelCheck}));if(t){this.form.payId=t.payId,this.form.channelType=t.channelType;var n=this;e.$api.appPay(this.form).then((function(t){console.log(JSON.stringify(t.data));var a=!1;if(t.hasOwnProperty("data")&&t.data.hasOwnProperty("package")&&t.data.package.indexOf("test_")>=0&&(a=!0),a)e.$api.testPay({timeStamp:t.data.timeStamp,nonceStr:t.data.nonceStr,package:t.data.package,paySign:t.data.paySign}).then((function(t){t.success?(e.$toast.showToast("测试支付成功"),setTimeout((function(){e.switchTab({url:"/pages/order/order"})}),400)):e.$toast.showError("测试支付失败！")}));else if(n.form.channelType<4){var r="wxpay";switch(n.form.channelType){case 2:r="wxpay";break;case 3:r="alipay";break}e.requestPayment({provider:r,orderInfo:t.orderInfo,success:function(t){console.log("success:"+JSON.stringify(t)),e.switchTab({url:"/pages/order/order"})},fail:function(t){console.log("fail:"+JSON.stringify(t)),e.$toast.showToast(JSON.stringify(t))}})}}))}else e.$toast.showToast("请选择支付方式")}else e.$toast.showError("请勾选同意支付协议！");else e.$toast.showError("订单编号不能为空！")}}};t.default=n}).call(this,n("543d")["default"])},e90e:function(e,t,n){"use strict";n.r(t);var a=n("c13c"),r=n("ad19");for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);n("9fdd");var i,s=n("f0c5"),c=Object(s["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);t["default"]=c.exports}},[["de5e","common/runtime","common/vendor"]]]);