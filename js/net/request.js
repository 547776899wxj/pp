/*获取请求Options*/
const getReqOptions = options => {
  let data = options.data || {};
  data._m_token = uni.$session.getToken();
  data._version = uni.$config.VERSION;
  let header = {
    "content-type": "application/x-www-form-urlencoded",
    'Accept': 'application/json'
  };
  Object.assign(header, options.header);
  header.m_token = uni.$session.getToken();
  const method = options.method || 'POST';
  let reqOptions = {};
  Object.assign(reqOptions, options);
  reqOptions.data = data;
  reqOptions.header = header;
  reqOptions.url = options.url;
  reqOptions.method = method;
  return reqOptions;
};
/*发送请求*/


export const sendrequest = options => {
  let requestOptions = getReqOptions(options);
  const time = new Date().getTime()
  return new Promise((resolve, reject) => {
    uni.request({ ...requestOptions,

      success(res) {
		  // console.log('request url:',options.url)
		  const retime = new Date().getTime() - time
		  // console.log('request response time:'+retime+'ms')
        // try{
        let {
          data,
          statusCode = 200
        } = res;

        if (statusCode == 200) {
          if (data.success) {
            resolve(data);
          } else {
            if (!data.code) {
              data.code = 10000;
            }

            reject(data);
          }
        } else {
          reject({
            code: statusCode,
            message: data.message
          });
        } // }
        // catch(err){
        //     reject({code:-1000,errmessage:err});
        // }

      },

      fail(err) {
		  
		// console.log('fail res:',JSON.stringify(err))
        reject({
          code: -999,
          message: err.errMsg
        });
      }

    });
  });
};