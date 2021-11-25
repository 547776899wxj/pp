const themeListeners = [];
/* APP lunch */

export const init = data => {
  uni.$data.theme = data;
  themeChanged(data);
};
/* 切换主题 */

export const themeChanged = theme => {
  themeListeners.forEach(listener => {
    listener(theme);
  });
};
/* 注册主题切换监听 */

export const watchThemeChange = listener => {
  if (themeListeners.indexOf(listener) < 0) {
    themeListeners.push(listener);
  }
};
/* 取消主题切换监听 */

export const unWatchThemeChange = listener => {
  const index = themeListeners.indexOf(listener);

  if (index > -1) {
    themeListeners.splice(index, 1);
  }
};
export const getThemeMainColor = () => {
  return uni.$data.theme.mainColor;
};
export const getStyleThemeFirstBt = () => {
  return uni.$data.theme.firstBtn;
};