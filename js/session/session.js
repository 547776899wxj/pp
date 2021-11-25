export const init = () => {
  getToken();
  getUserId();
  getMobile()
  getUserPeopleStatus()
  getUserBankCardStatus()
};
export const getToken = () => {
  if (!uni.$data.session.token) {
    uni.$data.session.token = getSession('token');
  }

  return uni.$data.session.token;
};
export const setToken = token => {
  uni.$data.session.token = token;
  setSession('token', token);
};
export const getUserId = () => {
  if (!uni.$data.session.userId) {
    uni.$data.session.userId = getSession('userId');
  }

  return uni.$data.session.userId;
};
export const setUserId = userId => {
  uni.$data.session.userId = userId;
  setSession('userId', userId);
};

export const getMobile = () => {
  if (!uni.$data.session.mobile) {
    uni.$data.session.mobile = getSession('mobile');
  }

  return uni.$data.session.mobile;
};
export const setMobile = mobile => {
  uni.$data.session.mobile = mobile;
  setSession('mobile', mobile);
};

export const getUserPeopleStatus = () => {
  if (!uni.$data.session.userPeopleStatus) {
    uni.$data.session.userPeopleStatus = getSession('userPeopleStatus');
  }

  return uni.$data.session.userPeopleStatus;
};
export const setUserPeopleStatus = userPeopleStatus => {
  uni.$data.session.userPeopleStatus = userPeopleStatus;
  setSession('userPeopleStatus', userPeopleStatus);
};

export const getUserBankCardStatus = () => {
  if (!uni.$data.session.userBankCardStatus) {
    uni.$data.session.userBankCardStatus = getSession('userBankCardStatus');
  }

  return uni.$data.session.userBankCardStatus;
};
export const setUserBankCardStatus = userBankCardStatus => {
  uni.$data.session.userBankCardStatus = userBankCardStatus;
  setSession('userBankCardStatus', userBankCardStatus);
};

export const loginOUt = () =>{
	setToken('');
	setUserId('');
	setUserBankCardStatus('');
	setUserPeopleStatus('');
	setLockLotSet();
}

function setSession(key, value) {
  uni.setStorageSync('m_' + key, value);
}

function getSession(key) {
  return uni.getStorageSync('m_' + key);
}
export const setLockLotSet = () =>{
	uni.setStorageSync('lockLotSet','')
}
export const lockLotId = (auctionId,lotId) =>{
	const  arr = uni.getStorageSync('lockLotSet'+auctionId)||''
	const lockLotSet = arr.split(',')
	lockLotSet.push(lotId)
	uni.setStorageSync('lockLotSet'+auctionId,lockLotSet.join(','))
}
export const checkLotId = (auctionId,lotId) =>{
	const  val = uni.getStorageSync('lockLotSet'+auctionId)|| ''
	return val.indexOf(lotId)>=0
}


export const getIosCkVersion = () => {
  if (!uni.$data.session.iosCkVersion) {
    uni.$data.session.iosCkVersion = getSession('iosCkVersion');
  }

  return uni.$data.session.iosCkVersion;
};
export const setIosCkVersion = iosCkVersion => {
  uni.$data.session.iosCkVersion = iosCkVersion;
  setSession('iosCkVersion', iosCkVersion);
};