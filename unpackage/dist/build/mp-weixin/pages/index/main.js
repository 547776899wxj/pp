(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/main"],{"0b45":function(t,e,o){"use strict";o.r(e);var n=o("e6fb"),i=o("fc01");for(var a in i)"default"!==a&&function(t){o.d(e,t,(function(){return i[t]}))}(a);o("5bcf");var u,r=o("f0c5"),s=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);e["default"]=s.exports},"248e":function(t,e,o){"use strict";(function(t){o("27ea");n(o("66fd"));var e=n(o("0b45"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},5007:function(t,e,o){"use strict";o.r(e);var n=o("d3ee"),i=o("5f76");for(var a in i)"default"!==a&&function(t){o.d(e,t,(function(){return i[t]}))}(a);o("92ec");var u,r=o("f0c5"),s=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);e["default"]=s.exports},"52e9":function(t,e,o){},"53ee":function(t,e,o){},"5bcf":function(t,e,o){"use strict";var n=o("52e9"),i=o.n(n);i.a},"5f76":function(t,e,o){"use strict";o.r(e);var n=o("e08f"),i=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a},"92ec":function(t,e,o){"use strict";var n=o("53ee"),i=o.n(n);i.a},d3ee:function(t,e,o){"use strict";var n;o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement;t._self._c},a=[]},e08f:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{menuData:[{id:1,url:"/pages/index/index",type:1},{id:2,url:"/pages/goods/list",type:1},{id:3,url:"/pages/auction/index",type:2},{id:4,url:"/pages/order/order",type:2},{id:5,url:"/pages/user/index",type:2}],model:{currentTabbar:1}}},created:function(){var e=t.getStorageSync("curbar");""!=e&&(this.model.currentTabbar=e,this.$forceUpdate())},methods:{onTabbarClick:function(e){console.log(e+"1");var o=this.menuData[e-1];(2!=o.type||this.isLogin())&&(t.switchTab({url:o.url}),t.setStorageSync("curbar",e))},isLogin:function(){var e=t.$session.getToken();if(e){var o=t.$session.getUserPeopleStatus();if(1==o)return!0;t.navigateTo({url:"../login/realname"})}else t.navigateTo({url:"../login/login"})}}};e.default=o}).call(this,o("543d")["default"])},e6fb:function(t,e,o){"use strict";var n;o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){e.stopPropagation(),t.showNewUserCoupon=!0})},a=[]},e921:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(o("5007"));function i(t){return t&&t.__esModule?t:{default:t}}var a={data:function(){return{swiperList:[{id:0,type:"image",url:"../../static/img/example/banner@2x.png"},{id:1,type:"image",url:"../../static/img/example/banner@2x.png"}],auction:{},auctionLotList:[],leftGoods:[],rightGoods:[],shopNotice:"",dotStyle:!0,showPackImg:!1,redEnvelopeMoney:"",auctionCoupon:"",showNewUserCoupon:!1,quli:[],topCategoryNav:[],popularRecommend:[],lastAuctionTime:0,hours:0,minute:0,second:0,goodsTitle:"",auctionTimeId:"",auctionHour:0}},onShow:function(){t.$utils.setTabBarOrderNum(),this.initPageData()},watch:{lastAuctionTime:function(t){if(t>0){var e=parseInt(t/60/60),o=t%3600,n=parseInt(o/60),i=o%60+"";this.hours=e>10?e:"0"+e,this.minute=n>10?n:"0"+n,this.second=i.length>1?i:"0"+i}else this.hours=0,this.minute=0,this.second=0,clearInterval(this.auctionTimeId),this.auctionTimeId=""}},methods:{initPageData:function(){this.getSwiperImage(),this.getJsonConfig(),this.getLateLyAuction(),this.hasNewUserPackage(),this.getSaleMaxGoods()},clickToSearchImg:function(){var t={detail:{value:this.goodsTitle}};this.searchGoods(t)},searchGoods:function(e){var o=e.detail.value;t.reLaunch({url:"/pages/goods/list?goodsTitle="+o})},categoryClick:function(e){var o=this.topCategoryNav[e];o.isToTabbar?(o.goodsCategoryId&&t.setStorageSync("goodsCategoryId",o.goodsCategoryId),t.switchTab({url:o.navUrl})):t.navigateTo({url:o.navUrl})},getSwiperImage:function(){var e=this;t.$api.getSwiperImage().then((function(t){e.swiperList=t.rows,e.shopNotice=t.shopNotice}))},getJsonConfig:function(){var e=this;t.$api.getJsonConfig().then((function(t){var o=JSON.parse(t.data),n=o.quli,i=o.topCategoryNav,a=o.popularRecommend;e.quli=n.rows||[],e.topCategoryNav=i.rows||[],e.popularRecommend=a.rows||[]}))},getLateLyAuction:function(){var e=this;t.$api.getLateLyAuction().then((function(t){var o=t.auctionLotList;t.auction;e.auctionLotList=o,e.auction=t.auction,t.auction&&e.handlerAuction()}))},handlerAuction:function(){var e=this.auction.auctionBeginTime,o=new Date,n=t.$utils.strToDate(e),i=parseInt((n.getTime()-o.getTime())/1e3);if(this.lastAuctionTime=i,i>0){var a=this;this.auctionTimeId||(this.auctionTimeId=setInterval((function(){a.lastAuctionTime-=1}),1e3))}var u=n.getHours();this.auctionHour=u},hasNewUserPackage:function(){var e=this;t.$api.getNewUserActivity().then((function(t){var o=t.activity,n=t.activityReceiveUser,i=void 0===n?{}:n,a=t.redEnvelopeMoney,u=void 0===a?0:a,r=t.auctionVipCoupon;null===i&&(i={}),o&&1==i.activityReceiveUserStatus?e.showPackImg=!0:e.showPackImg=!1,console.log("asdf",e.showPackImg),e.auctionCoupon=r,e.redEnvelopeMoney=u}))},getSaleMaxGoods:function(){var e=this;t.$api.getSaleMaxGoods().then((function(t){var o=t.rows||[],n=[],i=[];if(o&&o.length>0)for(var a=0;a<o.length;a++)a%2==0?n.push(o[a]):i.push(o[a]);e.leftGoods=n,e.rightGoods=i}))},receiveNewUserPackage:function(){var e=this;if(t.$auth.isLogin()){var o=this.redEnvelopeMoney,n=this.auctionCoupon,i={redEnvelope:o>0?1:0,auctionVipCoupon:n?1:0};t.$api.receviceNewUserActivity(i).then((function(o){t.$toast.alert("领取成功"),e.showPackImg=!1,e.hideModal()})).catch((function(o){t.$toast.alert(o.message),e.hideModal()}))}else t.navigateTo({url:"/pages/login/login"})},toAuction:function(){t.switchTab({url:"/pages/auction/index"})},hideModal:function(t){this.showNewUserCoupon=!1},toMessage:function(){t.navigateTo({url:"/pages/user/message"})},toGoodsDetail:function(e){console.log("goodsId:"+e),e&&t.navigateTo({url:"/pages/goods/goodsdetail?goodsId="+e})},goToGoodsList:function(){t.switchTab({url:"/pages/goods/list"})}},components:{tabbar:n.default}};e.default=a}).call(this,o("543d")["default"])},fc01:function(t,e,o){"use strict";o.r(e);var n=o("e921"),i=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a}},[["248e","common/runtime","common/vendor"]]]);