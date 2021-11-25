/*错误信息提示*/
export const showError = title => uni.showToast({
  title,
  icon: 'none',
  duration:1500
});
/*信息提示*/

export const showToast = title => uni.showToast({
  title,
  icon: 'none',
  duration:1500
});
/*成功操作提示*/

export const showSuccess = title => uni.showToast({
  title,
  duration:1500
});
/*取消确认提示框*/

export const confirm = content => {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '提示',
      content,

      success(res) {
        if (res.confirm) {
          resolve();
        } else {
          reject();
        }
      }

    });
  });
};
/*单按钮-确认提示框*/

export const alert = content => {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '提示',
      showCancel: false,
      content,

      success(res) {
        resolve();
      }

    });
  });
};