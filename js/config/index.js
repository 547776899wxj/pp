// 	 * - 'develop': 开发版 开发工具浏览;
// 	 * - 'trial': 体验版;
// 	 * - 'release': 正式版; */
// 	envVersion?: 'develop' | 'trial' | 'release';
export const VERSION = '3.0.0';
var domain; // 第三方设置

const extConfig = {};


domain = 'https://pp.hoshiibuy.com'
// domain = 'http://192.168.0.145:8202';
// #ifdef H5
	domain = '/rest'; 
// #endif

// #ifdef MP-WEIXIN
	domain = 'https://pp.hoshiibuy.com';
// #endif
/* QQ地图KEY */

export const QQ_MAP_WX_KEY = 'TJIBZ-CTY3W-G5ERW-OCRQK-UWUGV-FZBAZ';

export const DOMAIN = domain;
// 静态文件路径
export const DOMAIN_STATIC = 'https://pp.hoshiibuy.com/static';

export const LOGIN_PAGE = '/pages/login/login';
/*首页页面地址*/

export const INDEX_PAGE = '/pages/auction/specialsshow';
/*跳转登录页面 时间间隔 毫秒*/

export const NAVI_LOGIN_PAGE_TIME_SPACE = 500;
/* 要求授权登录的页面--可以是目录或者具体页面 */

export const CLAIM_AUTH_LOGIN_PAGES = ['/pages/user/'];
/* 要求授权登录的接口--可以是目录或者具体接口 */

export const CLAIM_AUTH_LOGIN_API = ['/rest/v4/user/'];
/**tabbar 页面**/

/*请求响应*/

export const response = {
  code: {
    SUCCESS: 0,

    /*无效token/未登录*/
    INVALID_TOKEN: 20000,

    /*退出登录*/
    LOGIN_OUT: 20001
  }
};
