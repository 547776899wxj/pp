const tabbarPageListeners = [];
/* APP lunch */

export const init = ({
  memberStatus = 0
}) => {
  uni.$data.memberStatus = memberStatus;
  tabbarChanged(memberStatus);
};
/* 切换tabbar */

export const tabbarChanged = data => {
  for (let i = 0; i < tabbarPageListeners.length; i++) {
    let tabbar = tabbarPageListeners[i];
    console.log('tabbar change', tabbar);
    tabbar.onShowTabbarChange(data);
  }
};
/* 注册tabbar监听 */

export const watchThemeChange = page => {
  if (tabbarPageListeners.indexOf(page) < 0) {
    tabbarPageListeners.push(page);
  }
};
/* 取消tabbar监听 */

export const unWatchThemeChange = page => {
  const index = tabbarPageListeners.indexOf(page);

  if (index > -1) {
    tabbarPageListeners.splice(index, 1);
  }
};