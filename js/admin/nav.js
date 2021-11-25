let lastLoginNaviTime = 0;
/*通用页面跳转*/

uni.selfNavigateTo = ({
  url = '',
  events = {},
  redirect = false,
  relunch = false
} = {}) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject('跳转链接不能为空');
      return;
    }
    /**防止登录重复跳转**/


    if (url == uni.$config.LOGIN_PAGE) {
      let nowTime = new Date().getTime();

      if (nowTime - lastLoginNaviTime <= uni.$config.NAVI_LOGIN_PAGE_TIME_SPACE) {
        reject('重复跳转登录页面');
        return;
      }

      lastLoginNaviTime = nowTime;
    }
    /**登录拦截器 **/


    for (const index in uni.$config.CLAIM_AUTH_LOGIN_PAGES) {
      let claim = uni.$config.CLAIM_AUTH_LOGIN_PAGES[index];
      let nowTime = new Date().getTime();

      if (url.startsWith(claim)) {
        if (!uni.$auth.isLogin()) {
          uni.navigateTo({
            url: uni.$config.LOGIN_PAGE + '?redirectUrl=' + encodeURIComponent(url)
          });
          lastLoginNaviTime = nowTime;
          reject('跳转登录页面');
          return;
        }
      }
    }

    if (relunch) {
      uni.reLaunch({
        url: url
      });
      return;
    } //是否跳转tabbar页面


    let surl = url;
    let tIndex = surl.indexOf('?');

    if (tIndex > 0) {
      surl = surl.substring(0, tIndex);
    }

    if (uni.$config.tabbarPage.indexOf(surl) >= 0) {
      if (tIndex > 0) {
        let queryString = url.substring(tIndex + 1, url.length);

        if (queryString) {
          console.log('传递参数', queryString);
          let paramjson = {};
          let param = queryString.split('&');

          for (let i = 0; i < param.length; i++) {
            var p = param[i].split('=');

            if (p.length == 2) {
              paramjson[p[0]] = p[1];
            }
          }

          console.log('传递参数 json', paramjson);
          uni.$data.tabbarPageQuery[surl] = paramjson;
        }
      }

      uni.switchTab({
        url: surl,

        success(res) {
          resolve(res);
        },

        fail(err) {
          reject(err);
        }

      });
    } else {
      //是否重定向
      if (redirect) {
        uni.redirectTo({
          url,

          success(res) {
            resolve(res);
          },

          fail(err) {
            reject(err);
          }

        });
      } else {
        uni.navigateTo({
          url,
          events,

          success(res) {
            resolve(res);
          },

          fail(err) {
            reject(err);
          }

        });
      }
    }
  });
};