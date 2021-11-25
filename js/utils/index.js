var _statusHeight;

import * as onShareAppMessage from './onShareAppMessage';
import * as socket from './socket';
import * as format from './format';
import * as cache from './cache';
import * as dir from './localDir';
import * as md5 from './md5';
import * as au from './au';
import * as mathUtil from './mathUtil';
import * as date from './date'

module.exports = { ...onShareAppMessage,
  ...socket,
  ...format,
  ...cache,
  ...dir,
  ...md5,
  ...au,
  ...mathUtil,
  date,
	blobToDataURI: (blob, callback) => {
	   var reader = new FileReader();
	   reader.readAsDataURL(blob);
	   reader.onload = function (e) {
		   var img = e.target.result.replace(/^data:image\/\w+;base64,/, "");//去掉base64位头部
		   callback(img);
	   }
	},
	/** 监听白屏 并且重新加载项目 **/
	blankScreenWatchAndRelunch: (pageObj, containerId, relunchPath)=>{
		// 判断是不是ios，是否发生白屏
		uni.getSystemInfo({
			success: (res) => {
				if (res.platform == 'ios') {
					const query = uni.createSelectorQuery().in(pageObj);
					var isRecovery = true;
					query
						.select(containerId)
						.boundingClientRect(data => {
							isRecovery = false;
						})
						.exec();
                        var timer = setTimeout(() => {
                            if (isRecovery) {
                                uni.reLaunch({
                                    url:relunchPath
                                })
                                clearTimeout(timer);
                                timer = null;
                            }
                        }, 500)
					
				}
			},
		})
	},
  /**设置页面navi**/
  setSystemNavi: pageObj => {
    let info = uni.getMenuButtonBoundingClientRect();

    if (!_statusHeight) {
      uni.getSystemInfo({
        success: res => {
          var info = uni.getMenuButtonBoundingClientRect();
          _statusHeight = res.statusBarHeight;
          let navBottom = info.bottom - info.height - res.statusBarHeight;
          pageObj.setData({
            navHeight: info.height,
            navTop: info.top,
            navBottom: navBottom,
            statusHeight: _statusHeight
          });
        },

        fail(err) {
          console.log(err);
        }

      });
    } else {
      let navBottom = info.bottom - info.height - _statusHeight;
      pageObj.setData({
        navHeight: info.height,
        navTop: info.top,
        navBottom: navBottom,
        statusHeight: _statusHeight
      });
    }
  },

  /* 跳转平台端 */
  toPlatform(path = 'pages/user/index', data = {}) {
    uni.$auth.checkLogin().then(() => {
      let token, openToken;
      token = uni.$session.getToken();
      openToken = uni.$session.getOpenToken();

      if (token) {
        data.token = token;
      }

      if (openToken) {
        data.openToken = openToken;
      } // if (wx.$config.DOMAIN.indexOf('test') >= 0 || wx.$config.DOMAIN.indexOf('demo') >= 0) {
      //   data = {}
      // }


      if (path.indexOf('/') === 0) {
        path = path.substr(1);
      }

      data.redirectUrl = path;
      console.log('path', path);
      console.log('data', JSON.stringify(data));
      uni.navigateToMiniProgram({
        appId: uni.$config.PLAT_MINIGRAM_APP_ID,
        path,
        envVersion: uni.$config.ENV,
        extraData: data,

        success(res) {// 打开成功
        }

      });
    });
  },

  /*默认头像*/
  defaultAvatar: (url, isShop = false) => {
    if (url && url.indexOf('http') === 0) {
      return url;
    }

    return url ? `${uni.$config.IMAGE_DOMAIN + url}` : `/img/${isShop ? 'sj' : ''}touxiang@3x.png`;
  },

  /* 随机数 */
  getRandom: () => Date.now().toString(16),

  /* 是否纯数字 */
  isNumber: v => /^[0-9]+$/.test(v),

  /* 输入绑定 */
  inputBind: (e, pageObj) => {
    const key = e.currentTarget.dataset.keyname;
    const value = e.detail.value;
    pageObj.setData({
      [key]: value
    });
  },

  /* 拨打电话 */
  callTel: phoneNumber => {
    uni.makePhoneCall({
      phoneNumber: phoneNumber
    });
  },

  /* 扫码二维码 */
  scanQr: () => {
    return new Promise((resolve, reject) => {
      uni.scanCode({
        onlyFromCamera: true,

        success(res) {
          console.log('scanQr', res);
          resolve(res);
        },

        fail(err) {
          reject();
        }

      });
    });
  },

  /* 保存图片 */
  saveImageToPhoto: filePath => {
    uni.getSetting({
      success(info) {
        if (info.authSetting && info.authSetting['scope.writePhotosAlbum']) {
          uni.showLoading({
            title: '请稍后'
          });
          uni.saveImageToPhotosAlbum({
            filePath,

            success(res) {
              uni.$toast.showError('图片已保存到相册，赶紧晒一下吧~');
            },

            fail() {
              uni.hideLoading();
            }

          });
        } else {
          uni.authorize({
            scope: 'scope.writePhotosAlbum',

            success() {
              uni.showLoading({
                title: '请稍后'
              });
              uni.saveImageToPhotosAlbum({
                filePath,

                success(res) {
                  uni.$toast.showError('图片已保存到相册，赶紧晒一下吧~');
                },

                fail() {
                  uni.hideLoading();
                }

              });
            },

            fail() {
              uni.showModal({
                title: '请打开授权保存图片',
                showCancel: false,

                success() {
                  uni.openSetting();
                }

              });
            }

          });
        }
      }

    });
  },

  /* 获取当前定位 */
  getLocation: ({
    authTipMsg = '需要获取您的地理位置，请确认授权，否则地图功能将无法使用'
  } = {}) => {
    return new Promise((resolve, reject) => {
      uni.getLocation({
        type: 'gcj02',

        success(res) {
          resolve(res);
        },

        fail(err) {
          uni.getSetting({
            success: function (res) {
              var statu = res.authSetting;

              if (!statu['scope.userLocation']) {
                uni.showModal({
                  title: '是否授权当前位置',
                  content: authTipMsg,
                  success: function (tip) {
                    if (tip.confirm) {
                      uni.openSetting({
                        success: function (data) {
                          if (data.authSetting["scope.userLocation"] === true) {
                            //授权成功之后，再调用chooseLocation选择地方
                            uni.getLocation({
                              type: 'gcj02',

                              success(res) {
                                resolve(res);
                              },

                              fail(err) {
                                reject(err);
                              }

                            });
                          } else {
                            uni.$toast.showError('授权失败'); // reject('授权失败')
                          }
                        },

                        fail(err) {
                          // reject(err)
                          uni.$toast.alert('打开设置失败,请点击右上角···打开定位设置');
                        }

                      });
                    }
                  }
                });
              } else {
                uni.getLocation({
                  type: 'gcj02',

                  success(res) {
                    resolve(res);
                  },

                  fail(err) {
                    reject(err);
                  }

                });
              }
            },
            fail: function (err) {
              uni.$toast.showError('调用授权窗口失败');
              reject(err);
            }
          });
        }

      });
    });
  },

  /** 计算两个经纬度的距离(千米) */
  getDistance: (lat1, lng1, lat2, lng2) => {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // EARTH_RADIUS;

    s = Math.round(s * 10000) / 10000;
    return s;
  },

  /** 检查网络 */
  checkNet: () => {
    return new Promise((resolve, reject) => {
      uni.getNetworkType({
        success: function (res) {
          console.log('getNetworkType', res);

          if (res.networkType == 'none') {
            reject();
          } else {
            resolve();
          }
        },

        fail() {
          reject();
        }

      });
    });
  },

  /** 网络变化 */
  onNetStatusChange: () => {
    return new Promise((resolve, reject) => {
      uni.onNetworkStatusChange(function (res) {
        console.log(res);

        if (res.networkType == "none") {
          reject();
        } else {
          resolve();
        }
      });
    });
  },

  /*十六进制转RGB*/
  colorRgb: sColor => {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/; // 如果是16进制颜色

    if (sColor && reg.test(sColor)) {
      //处理六位的颜色值
      var sColorChange = [];

      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }

      return {
        r: sColorChange[0],
        g: sColorChange[1],
        b: sColorChange[2]
      };
    }

    return;
  },
  //设置未付款订单数量
  setTabBarOrderNum: () => {
  	if (uni.$auth.isLogin()) {
  		uni.$api.getWaitPayOrderNum().then(res => {
  			if(res.success && res.num > 0) {
  				var text = ""
  				if (res.num > 99) {
  					text = "99+"
  				} else {
  					text = res.num+""
  				}
  				uni.setTabBarBadge({
  					index: 3,
  					text: text
  				})
  			} else {
  				uni.removeTabBarBadge({
  					index: 3
  				})
  			}
  		})
  	}
  },
  getByteLen: (val) => {
	  var len = 0;
	  for (var i = 0; i < val.length; i++) {
		  var a = val.charAt(i);
		  if (a.match(/[^\x00-\xff]/ig) != null) {
			len += 2;
		  }
		  else {
			len += 1;
		  }
	  }
	  return len;
  }
};