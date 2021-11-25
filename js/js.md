## JS使用说明

## 1.1 引用
app.js引入
```js
//app.js
wx.$config = require('./js/config/index.js')
wx.$toast = require('./js/ui/toast.js')
wx.$session = require('./js/session/storage')
wx.$request = require('./js/net/request')
wx.$api = require('./js/service/api')
wx.$auth = require('./js/session/auth')
wx.$utils = require('./js/util')
require('./js/admin/nav')

App({
    onLaunch(options) {
        console.log("config",wx.$config)
        wx.$session.onLaunchStore()
        //获取本次登录openToken,
        wx.$auth.getOpenTokenAuth()
    },
    globalData: {
    }
})
```
## 1.2 用法
```js
//1.使用配置文件 - 远程图片domain
var IMAGE_DOMAIN = wx.$config.IMAGE_DOMAIN

//2.使用util - 时间格式化
var time = wx.$utils.formatTime(new Date())



```

## 2.1 配置文件 config/index.js
### 2.1.1 属性
| 属性 | 类型 |  说明 |
| :------- | :------ | :------ |
| PAY_CHANNEL | Number | 支付渠道 |
| DOMAIN | String | 接口请求domain |
| IMAGE_DOMAIN | String | 远程图片domain |
| IS_DEBUG | Boolean | 是否调试模式 |
| LOGIN_PAGE | String | 登录页面地址 |
| NAVI_LOGIN_PAGE_TIME_SPACE | Number | 跳转登录页面 时间间隔 毫秒 |
| tabbarPage | Array | tabbar页面地址数组 |
| CLIENT_TYPE | Number | 终端类型: 1:用户端 2:商家端 3:平台端 4:服务类端 |
| response | Object | 接口请求响应，详见配置文件内容 |
## 2.2 UI扩展 ui/toast.js
```js
/*错误信息提示*/
export const showError = title => wx.showToast({title,icon: 'none'})
/*信息提示*/
export const showToast = title => wx.showToast({title,icon: 'none'})
/*成功操作提示*/
export const showSuccess = title => wx.showToast({title})
/*取消确认提示框*/
export const confirm = content => {
  return new Promise((resolve,reject) => {
    wx.showModal({
      title:'提示',
      content,
      success(res){
        if(res.confirm){
          resolve()
        }else{
          reject()
        }
      }
    })
  })
}
/*单按钮-确认提示框*/
export const alert = content => {
  return new Promise((resolve,reject) => {
    wx.showModal({
      title:'提示',
      showCancel:false,
      content,
      success(res){
          resolve()
      }
    })
  })
}
```
## 2.3 权限页面跳转 admin/nav.js
通用页面跳转   
wx.selfNavigateTo()  
1.如果跳转的页面地址是以'/pages/user/'开头并且未登录，将自动跳转登录页

### 2.3.1 参数
| 属性 | 必填 | 类型 |  说明 |
| :------- |:------- | :------ | :------ |
| url | 是 | String | 页面地址 |
| events | 否 | Object | 页面间通信接口，用于监听被打开页面发送到当前页面的数据(navigateTo才能使用) |
| redirect | 否 | Boolean | 是否页面重定向 |
### 2.3.2 返回 
返回类型 Promise


## 2.4 session本地存储 session/storage.js
### 2.4.1 方法
```js
isLogin //是否登录
getToken //获取token
setToken //设置token
getUserId //获取用户编号
setUserId //设置用户编号
getOpenToken //获取openToken
setOpenToken //设置openToken
getMobile //获取手机号码
setMobile //设置手机号码
```

## 2.5 授权权限 session/auth.js
### 2.5.1 方法
```js
loginSuccess //登录成功
loginOut //退出登录
getOpenTokenAuth //微信code换取获取openToken
getMobileAuth //解析手机号码
registerAuth //手机号码注册
loginAuth //openToken登录
clientChange //终端切换-获取token
```

## 2.6 发送网络请求 net/request.js
如果请求的接口是'/rest/v1/user'开头并且未登录将自动跳转登录页面

## 2.7 发送接口请求 service/api.js
## 2.8 通用utils  util.js
