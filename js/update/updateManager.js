// 组件 navigator 关闭当前小程序 最低版本 2.1.0

/**
 * 在小程序所有入口页 必须先调用checkLastVersion检查是否有新版更新
 * ps：checkLastVersion().then(()=>{
        //已经是新版本，
    }).catch(()=>{
        //不是新版本，内置跳转到更新页面
    })
 *
 */

/**
 * 检查是否最新版本
 * @returns {Promise<>}
 */
export const checkLastVersion = () => {
  return new Promise((resolve, reject) => {
    const updateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      if (res.hasUpdate) {
        console.log("检查到有新版本，跳转到更新页面");
        reject();
        uni.$toast.alert('已有新版本发布').then(() => {
          updateApp();
        });
      } else {
        console.log("当前版已经是最新版");
        resolve();
      }
    });
  });
};
/**
 * 更新小程序
 * @returns {Promise<boolean>}
 */

export const updateApp = () => {
  return new Promise((resolve, reject) => {
    const updateManager = uni.getUpdateManager();
    updateManager.onUpdateReady(function () {
      console.log("执行强制成功"); //强制更新

      updateManager.applyUpdate();
      resolve();
    });
    updateManager.onUpdateFailed(function () {
      console.log("获取更新内容失败"); //更新失败

      uni.showToast({
        title: '更新失败',
        icon: 'none'
      });
      reject();
    });
  });
};