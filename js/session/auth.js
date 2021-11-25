var _session_key;


/*登录成功 */
export const loginSuccess = e => {
	var {
		token = '',
			userId = '',
			mobile = '',
			userPeopleStatus = '',
			userBankCardStatus = '',
	} = e || {};
	uni.$session.setToken(token);
	uni.$session.setUserId(userId);
	uni.$session.setMobile(mobile);
	uni.$session.setUserPeopleStatus(userPeopleStatus);
	uni.$session.setUserBankCardStatus(userBankCardStatus);
};


/*退出登录 */
export const loginOut = () => {
	uni.$session.setToken('');
	uni.$session.setUserId('');
	uni.$session.setMobile('');
	uni.$session.setUserPeopleStatus('');
	uni.$session.setUserBankCardStatus('');
};

/* 是否登录 */
export const isLogin = () => {
	return uni.$session.getToken() ? true : false;
};
/**
 * 检查是否登录-未登录-跳转登录
 * @param e {autoGoLoginPage=true}
 */

export const checkLogin = ({
	autoGoLoginPage = true,
	loginQuery = ''
} = {}) => {
	return new Promise((resolve, reject) => {
		if (isLogin()) {
			resolve();
		} else {
			if (autoGoLoginPage) toLogin(loginQuery);
			reject();
		}
	});
};
/* 跳转登录页 */

export const toLogin = query => {
	return uni.selfNavigateTo({
		url: uni.$config.LOGIN_PAGE + '?' + query
	});
};
/* 确保微信session可用 */

export const promiseWxSession = () => {
	return new Promise((resolve, reject) => {
		uni.checkSession({
			success() {
				resolve();
			},

			fail() {
				getOpenTokenAuth().then(() => {
					resolve();
				}).catch(() => {
					reject();
				});
			}

		});
	});
};
/* 确保openToken存在 */

export const promiseOpenToken = () => {
	return new Promise((resolve, reject) => {
		if (uni.$session.getOpenToken()) {
			resolve();
		} else {
			getOpenTokenAuth().then(() => {
				resolve();
			}).catch(() => {
				reject();
			});
		}
	});
};
/*微信code换取获取openToken */

export const getOpenTokenAuth = () => {
	return new Promise((resolve, reject) => {
		if (typeof uni.login === 'function') {
			uni.login({
				success: function(res) {
					console.log("res", res);
					uni.$api.getWxCode({
						"code": res.code,
						'clientType': uni.$config.CLIENT_TYPE
					}).then(json => {
						let {
							session_key,
							openToken = ''
						} = json;
						_session_key = session_key;
						uni.$session.setOpenToken(openToken);
						resolve(json);
					}).catch(err => {
						reject(err);
					});
				}
			});
		} else {
			resolve()
		}

	});
};
/* openToken登录 */
// export const openTokenLogin = ({recUserId=''}) =>{

export const userClientCodeLogin = ({
	recUserId = ''
} = {}) => {
	return new Promise((resolve, reject) => {
		uni.login({
			success: function(res) {
				console.log("res", res);
				uni.$api.userClientCodeLogin({
					"code": res.code,
					'recUserId': recUserId
				}).then(json => {
					let {
						session_key,
						openToken = '',
						token = ''
					} = json;
					_session_key = session_key;
					uni.$session.setOpenToken(openToken);

					if (token) {
						loginSuccess(json);
					}

					resolve(json);
				}).catch(err => {
					reject(err);
				});
			}
		});
	});
};
/* openToken登录 - 携带推荐人ID */
// export const openTokenLoginWithRecUserId = () =>{

export const userClientCodeLoginWithRecUserId = () => {
	return userClientCodeLogin({
		recUserId: uni.$data.share.recUserId
	});
};
/* 解析手机号码 */

export const getMobileAuth = e => {
	let {
		saveToken = true
	} = e;
	return new Promise((resolve, reject) => {
		uni.checkSession({
			success: function() {
				var ency = e.detail.encryptedData;
				var iv = e.detail.iv;
				var sessionkey = _session_key;

				if (e.detail.errMsg.indexOf('getPhoneNumber:fail') >= 0) {
					console.log("用户拒绝授权");
					reject('用户拒绝授权');
				} else {
					//同意授权
					uni.$api.wxLoginRegister({
						'clientType': uni.$config.CLIENT_TYPE,
						'encryptedData': ency,
						'sessionkey': sessionkey,
						'iv': iv,
						nickName: e.nickName || '',
						avatarUrl: e.avatarUrl || ''
					}).then(res => {
						console.log("解密成功~~~~~~~将解密的号码保存到本地~~~~~~~~");
						if (saveToken) loginSuccess(res);
						resolve(res);
					}).catch(err => {
						reject('接口请求失败');
					});
				}
			},
			fail: function() {
				console.log("session_key 已经失效，需要重新执行登录流程");
				getOpenTokenAuth();
				reject('session_key 已经失效');
			}
		});
	});
};
/* 验证手机号码 */

export const validateMobileAuth = e => {
	let {
		saveToken = true
	} = e;
	return new Promise((resolve, reject) => {
		uni.checkSession({
			success: function() {
				var ency = e.detail.encryptedData;
				var iv = e.detail.iv;
				var sessionkey = _session_key;

				if (e.detail.errMsg.indexOf('getPhoneNumber:fail') >= 0) {
					console.log("用户拒绝授权");
					reject('用户拒绝授权');
				} else {
					//同意授权
					uni.$api.wxValidateMobile({
						'clientType': uni.$config.CLIENT_TYPE,
						'encryptedData': ency,
						'sessionkey': sessionkey,
						'iv': iv
					}).then(res => {
						resolve(res);
					}).catch(err => {
						reject(err);
					});
				}
			},
			fail: function() {
				console.log("session_key 已经失效，需要重新执行登录流程");
				getOpenTokenAuth();
				reject('session_key 已经失效');
			}
		});
	});
};
/* 解析手机号码-登录-推荐人 */

export const getMobileAuthWithRecUserId = e => {
	let {
		saveToken = true
	} = e;
	return new Promise((resolve, reject) => {
		uni.checkSession({
			success: function() {
				var ency = e.detail.encryptedData;
				var iv = e.detail.iv;
				var sessionkey = _session_key;

				if (e.detail.errMsg.indexOf('getPhoneNumber:fail') >= 0) {
					console.log("用户拒绝授权");
					reject('用户拒绝授权');
				} else {
					//同意授权
					uni.$api.wxLoginRegister({
						'clientType': uni.$config.CLIENT_TYPE,
						'encryptedData': ency,
						'sessionkey': sessionkey,
						'iv': iv,
						'recUserId': uni.$data.share.recUserId || '',
						nickName: e.nickName || '',
						avatarUrl: e.avatarUrl || ''
					}).then(res => {
						console.log("解密成功~~~~~~~将解密的号码保存到本地~~~~~~~~");
						if (saveToken) loginSuccess(res);
						resolve(res);
					}).catch(err => {
						reject('接口请求失败');
					});
				}
			},
			fail: function() {
				console.log("session_key 已经失效，需要重新执行登录流程");
				getOpenTokenAuth();
				reject('session_key 已经失效');
			}
		});
	});
};
/* 解析手机号码-登录-推荐店铺 */

export const getMobileAuthWithShopId = e => {
	let {
		saveToken = true
	} = e;
	return new Promise((resolve, reject) => {
		uni.checkSession({
			success: function() {
				var ency = e.detail.encryptedData;
				var iv = e.detail.iv;
				var sessionkey = _session_key;

				if (e.detail.errMsg.indexOf('getPhoneNumber:fail') >= 0) {
					console.log("用户拒绝授权");
					reject('用户拒绝授权');
				} else {
					//同意授权
					uni.$api.wxLoginRegister({
						'clientType': uni.$config.CLIENT_TYPE,
						'encryptedData': ency,
						'sessionkey': sessionkey,
						'iv': iv,
						'recShopId': uni.$data.share.recShopId || '',
						nickName: e.nickName || '',
						avatarUrl: e.avatarUrl || ''
					}).then(res => {
						console.log("解密成功~~~~~~~将解密的号码保存到本地~~~~~~~~");
						if (saveToken) loginSuccess(res);
						resolve(res);
					}).catch(err => {
						reject('接口请求失败');
					});
				}
			},
			fail: function() {
				console.log("session_key 已经失效，需要重新执行登录流程");
				getOpenTokenAuth();
				reject('session_key 已经失效');
			}
		});
	});
}; 
export const isLoginAndCheckPeopleStatus = e =>{
	var token = uni.$session.getToken();
	if(!token){
		uni.redirectTo({
			url:"/pages/login/login"
		})
		return false;
	}
	var userPeopleStatus = uni.$session.getUserPeopleStatus();
	
	if(userPeopleStatus !=1){
		uni.redirectTo({
			url:"/pages/login/realname"
		})
		return false;
	}
	return true;
}
// /* 终端切换-获取token*/
// export const clientChange = (e) =>{
//   let data = {
//     sourceClientType: e.sourceClientType,
//     sourceMobile: e.sourceMobile,
//     sourceToken: e.sourceToken,
//     targetClientCode: e.targetClientCode,
//     targetClientType: e.targetClientType,
//   }
//   wx.$api.clientChange(data).then(res =>{
//     this.loginSuccess(res)
//   })
// }
