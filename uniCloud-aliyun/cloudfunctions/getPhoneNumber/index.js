'use strict';
exports.main = async (event, context) => {
  // event里包含着客户端提交的参数
  const res = await uniCloud.getPhoneNumber({
      appid: '__UNI__C740F77', // 替换成自己开通一键登录的应用的DCloud appid，使用callFunction方式调用时可以不传（会自动取当前客户端的appid），如果使用云函数URL化的方式访问必须传此参数
      provider: 'univerify',
      apiKey: '389a24d42e6f931f41539668c4a3a710', // 在开发者中心开通服务并获取apiKey
      apiSecret: '6e41527a4e004323e0311f326e0f52b8', // 在开发者中心开通服务并获取apiSecret
      access_token: event.access_token,
      openid: event.openid
  })

  console.log(res); // res里包含手机号
  // 执行用户信息入库等操作，正常情况下不要把完整手机号返回给前端
  // 如果数据库在uniCloud上，可以直接入库
  // 如果数据库不在uniCloud上，可以通过 uniCloud.httpclient API，将手机号通过http方式传递给其他服务器的接口，详见：https://uniapp.dcloud.net.cn/uniCloud/cf-functions?id=httpclient
  return {
    code: 0,
    message: '获取手机号成功',
	phoneNumber:res.phoneNumber
  }
}
