(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{"6b7b":function(t,a,e){"use strict";e.r(a);var n=e("ea04"),o=e.n(n);for(var u in n)"default"!==u&&function(t){e.d(a,t,(function(){return n[t]}))}(u);a["default"]=o.a},"6e23":function(t,a,e){"use strict";e.r(a);var n=e("fc42"),o=e("6b7b");for(var u in o)"default"!==u&&function(t){e.d(a,t,(function(){return o[t]}))}(u);e("895c");var c,r=e("f0c5"),i=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],c);a["default"]=i.exports},"7a04":function(t,a,e){},"895c":function(t,a,e){"use strict";var n=e("7a04"),o=e.n(n);o.a},ea04:function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,a=this.CustomBar,e=this.bgImage,n="height:".concat(a,"px;padding-top:").concat(t,"px;");return this.bgImage&&(n="".concat(n,"background-image:url(").concat(e,");")),n}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},backMethod:{type:String,default:""},delta:{type:[Number,String],default:1},bgImage:{type:String,default:""},rightUrl:{type:String,default:""},pageClassR:{type:String,default:""}},methods:{BackPage:function(){console.log("BackPage"),console.log(this.backMethod),""!=this.backMethod?(console.log("backMethod:",this.backMethod),this.$emit(this.backMethod)):t.navigateBack({delta:Number(this.delta)})},goToUrl:function(){t.navigateTo({url:this.rightUrl})}}};a.default=e}).call(this,e("543d")["default"])},fc42:function(t,a,e){"use strict";var n;e.d(a,"b",(function(){return o})),e.d(a,"c",(function(){return u})),e.d(a,"a",(function(){return n}));var o=function(){var t=this,a=t.$createElement;t._self._c},u=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6e23"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);