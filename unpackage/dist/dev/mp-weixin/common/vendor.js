(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // ??????atob??????????????????????????????????????????`const Base64 = {atob};Base64.atob('xxxx')`??????????????????
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('?????????????????????????????????????????????????????????' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context????????????
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// ??????????????????
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime ??????????????? uni ???????????????????????????????????? uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // ???????????? $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // ?????????????????????????????????????????????????????????__id__???????????????????????????mp-weixin??????navigateTo???AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// ?????? api ???????????????
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue ??? false ???????????????????????????????????????????????????????????????????????????
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// ??????????????????
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// ???????????? key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}????????????????????? key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// ???????????? returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// ??????????????? api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// ?????? api ??????????????????
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// ?????? api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // ?????? Vue.prototype ???????????????
    } catch (e) {
      if (Object({"VUE_APP_NAME":"????????????","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('?????? Vue ??? data ???????????????????????? data ???????????????????????? data ?????????????????? vm ??????????????????????????????????????????????????????', data);
      }
    }
  } else {
    try {
      // ??? data ?????????
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // ????????????????????? render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // ?????????????????????????????????????????????
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // ??????????????????????????? $slots ??? props??????????????? vueSlots ????????? $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO ???????????? mpvue ??? mp ??????
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for ???????????????????????????', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent ????????????????????? event ??????
  if (isCustom) {// ???????????????
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// ???????????????????????? event ??? detail ??????
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent ?????????????????????
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // ???????????? scoped slots ??????????????????????????????????????????
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('?????????????????????');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // ????????? web-view ?????? dataset ?????????
  if (!eventOpts) {
    return console.warn('?????????????????????');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao ?????????????????? scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // ??????????????????????????????????????????????????????????????????????????????
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var messages = {};

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // ???????????????????????????getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// ?????????????????????????????????????????????????????? onShow ??? onLaunch ??????
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// ?????? ???2.2.3 ????????????????????? 2.3.0 ??? nextTick ??????
          console.error('?????????????????????????????????????????? ?????????????????????-??????-????????????-????????????????????? ?????????`2.3.0`??????');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm ???????????? globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // ??????????????? globalData
  appOptions.globalData = vm.$options.globalData || {};
  // ??? methods ?????????????????? getApp() ???
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // ??????????????????(????????????:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // ??????????????????
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO ???????????? for ?????? scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail ?????????,value ?????????(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // ?????? multipleSlots ??????????????? bug??????????????????????????? ??? u-list?????????????????????
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // ??????????????????
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // ????????? vue ??????
        this.$vm = new VueComponent(options);

        // ??????$slots,$scopedSlots???????????????????????????$slots???
        initSlots(this.$vm, properties.vueSlots);

        // ???????????? setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // ????????? props ???????????? true????????????????????? false ????????? created,ready ??????, ??? attached ?????????
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // ?????? mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 266:
/*!***********************************************!*\
  !*** D:/yjy/??????/??????/????????????/static/json/area.json ***!
  \***********************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"areaname\":\"??????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":110101},{\"areaname\":\"?????????\",\"id\":110102},{\"areaname\":\"?????????\",\"id\":110105},{\"areaname\":\"?????????\",\"id\":110106},{\"areaname\":\"????????????\",\"id\":110107},{\"areaname\":\"?????????\",\"id\":110108},{\"areaname\":\"????????????\",\"id\":110109},{\"areaname\":\"?????????\",\"id\":110111},{\"areaname\":\"?????????\",\"id\":110112},{\"areaname\":\"?????????\",\"id\":110113},{\"areaname\":\"?????????\",\"id\":110114},{\"areaname\":\"?????????\",\"id\":110115},{\"areaname\":\"?????????\",\"id\":110116},{\"areaname\":\"?????????\",\"id\":110117},{\"areaname\":\"?????????\",\"id\":110118},{\"areaname\":\"?????????\",\"id\":110119}],\"id\":110100}],\"id\":110000},{\"areaname\":\"??????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":120101},{\"areaname\":\"?????????\",\"id\":120102},{\"areaname\":\"?????????\",\"id\":120103},{\"areaname\":\"?????????\",\"id\":120104},{\"areaname\":\"?????????\",\"id\":120105},{\"areaname\":\"?????????\",\"id\":120106},{\"areaname\":\"?????????\",\"id\":120110},{\"areaname\":\"?????????\",\"id\":120111},{\"areaname\":\"?????????\",\"id\":120112},{\"areaname\":\"?????????\",\"id\":120113},{\"areaname\":\"?????????\",\"id\":120114},{\"areaname\":\"?????????\",\"id\":120115},{\"areaname\":\"????????????\",\"id\":120116},{\"areaname\":\"?????????\",\"id\":120117},{\"areaname\":\"?????????\",\"id\":120118},{\"areaname\":\"?????????\",\"id\":120119}],\"id\":120100},{\"areaname\":\"??????\",\"childArea\":[],\"id\":120225}],\"id\":120000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":130102},{\"areaname\":\"?????????\",\"id\":130104},{\"areaname\":\"?????????\",\"id\":130105},{\"areaname\":\"????????????\",\"id\":130107},{\"areaname\":\"?????????\",\"id\":130108},{\"areaname\":\"?????????\",\"id\":130109},{\"areaname\":\"?????????\",\"id\":130110},{\"areaname\":\"?????????\",\"id\":130111},{\"areaname\":\"?????????\",\"id\":130121},{\"areaname\":\"?????????\",\"id\":130123},{\"areaname\":\"?????????\",\"id\":130125},{\"areaname\":\"?????????\",\"id\":130126},{\"areaname\":\"?????????\",\"id\":130127},{\"areaname\":\"?????????\",\"id\":130128},{\"areaname\":\"?????????\",\"id\":130129},{\"areaname\":\"?????????\",\"id\":130130},{\"areaname\":\"?????????\",\"id\":130131},{\"areaname\":\"?????????\",\"id\":130132},{\"areaname\":\"???  ???\",\"id\":130133},{\"areaname\":\"?????????\",\"id\":130183},{\"areaname\":\"?????????\",\"id\":130184},{\"areaname\":\"?????????\",\"id\":139001}],\"id\":130100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":130202},{\"areaname\":\"?????????\",\"id\":130203},{\"areaname\":\"?????????\",\"id\":130204},{\"areaname\":\"?????????\",\"id\":130205},{\"areaname\":\"?????????\",\"id\":130207},{\"areaname\":\"?????????\",\"id\":130208},{\"areaname\":\"????????????\",\"id\":130209},{\"areaname\":\"???  ???\",\"id\":130223},{\"areaname\":\"?????????\",\"id\":130224},{\"areaname\":\"?????????\",\"id\":130225},{\"areaname\":\"?????????\",\"id\":130227},{\"areaname\":\"?????????\",\"id\":130229},{\"areaname\":\"?????????\",\"id\":130281},{\"areaname\":\"?????????\",\"id\":130283}],\"id\":130200},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":130302},{\"areaname\":\"????????????\",\"id\":130303},{\"areaname\":\"????????????\",\"id\":130304},{\"areaname\":\"?????????\",\"id\":130306},{\"areaname\":\"?????????????????????\",\"id\":130321},{\"areaname\":\"?????????\",\"id\":130322},{\"areaname\":\"?????????\",\"id\":130324}],\"id\":130300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":130402},{\"areaname\":\"?????????\",\"id\":130403},{\"areaname\":\"?????????\",\"id\":130404},{\"areaname\":\"????????????\",\"id\":130406},{\"areaname\":\"?????????\",\"id\":130421},{\"areaname\":\"?????????\",\"id\":130423},{\"areaname\":\"?????????\",\"id\":130424},{\"areaname\":\"?????????\",\"id\":130425},{\"areaname\":\"???  ???\",\"id\":130426},{\"areaname\":\"???  ???\",\"id\":130427},{\"areaname\":\"?????????\",\"id\":130428},{\"areaname\":\"?????????\",\"id\":130429},{\"areaname\":\"???  ???\",\"id\":130430},{\"areaname\":\"?????????\",\"id\":130431},{\"areaname\":\"?????????\",\"id\":130432},{\"areaname\":\"?????????\",\"id\":130433},{\"areaname\":\"???  ???\",\"id\":130434},{\"areaname\":\"?????????\",\"id\":130435},{\"areaname\":\"?????????\",\"id\":130481}],\"id\":130400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":130502},{\"areaname\":\"?????????\",\"id\":130503},{\"areaname\":\"?????????\",\"id\":130521},{\"areaname\":\"?????????\",\"id\":130522},{\"areaname\":\"?????????\",\"id\":130523},{\"areaname\":\"?????????\",\"id\":130524},{\"areaname\":\"?????????\",\"id\":130525},{\"areaname\":\"???  ???\",\"id\":130526},{\"areaname\":\"?????????\",\"id\":130527},{\"areaname\":\"?????????\",\"id\":130528},{\"areaname\":\"?????????\",\"id\":130529},{\"areaname\":\"?????????\",\"id\":130530},{\"areaname\":\"?????????\",\"id\":130531},{\"areaname\":\"?????????\",\"id\":130532},{\"areaname\":\"???  ???\",\"id\":130533},{\"areaname\":\"?????????\",\"id\":130534},{\"areaname\":\"?????????\",\"id\":130535},{\"areaname\":\"?????????\",\"id\":130581},{\"areaname\":\"?????????\",\"id\":130582}],\"id\":130500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":130602},{\"areaname\":\"?????????\",\"id\":130603},{\"areaname\":\"?????????\",\"id\":130604},{\"areaname\":\"?????????\",\"id\":130606},{\"areaname\":\"?????????\",\"id\":130607},{\"areaname\":\"?????????\",\"id\":130608},{\"areaname\":\"?????????\",\"id\":130609},{\"areaname\":\"?????????\",\"id\":130623},{\"areaname\":\"?????????\",\"id\":130624},{\"areaname\":\"?????????\",\"id\":130626},{\"areaname\":\"???  ???\",\"id\":130627},{\"areaname\":\"?????????\",\"id\":130628},{\"areaname\":\"?????????\",\"id\":130630},{\"areaname\":\"?????????\",\"id\":130631},{\"areaname\":\"???  ???\",\"id\":130633},{\"areaname\":\"?????????\",\"id\":130634},{\"areaname\":\"???  ???\",\"id\":130635},{\"areaname\":\"?????????\",\"id\":130636},{\"areaname\":\"?????????\",\"id\":130637},{\"areaname\":\"?????????\",\"id\":130681},{\"areaname\":\"?????????\",\"id\":130683},{\"areaname\":\"????????????\",\"id\":130684},{\"areaname\":\"?????????\",\"id\":139002}],\"id\":130600},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":130702},{\"areaname\":\"?????????\",\"id\":130703},{\"areaname\":\"?????????\",\"id\":130705},{\"areaname\":\"????????????\",\"id\":130706},{\"areaname\":\"?????????\",\"id\":130708},{\"areaname\":\"?????????\",\"id\":130709},{\"areaname\":\"?????????\",\"id\":130721},{\"areaname\":\"?????????\",\"id\":130722},{\"areaname\":\"?????????\",\"id\":130723},{\"areaname\":\"?????????\",\"id\":130724},{\"areaname\":\"?????????\",\"id\":130725},{\"areaname\":\"???  ???\",\"id\":130726},{\"areaname\":\"?????????\",\"id\":130727},{\"areaname\":\"?????????\",\"id\":130728},{\"areaname\":\"?????????\",\"id\":130730},{\"areaname\":\"?????????\",\"id\":130731},{\"areaname\":\"?????????\",\"id\":130732}],\"id\":130700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":130802},{\"areaname\":\"?????????\",\"id\":130803},{\"areaname\":\"??????????????????\",\"id\":130804},{\"areaname\":\"?????????\",\"id\":130821},{\"areaname\":\"?????????\",\"id\":130822},{\"areaname\":\"?????????\",\"id\":130823},{\"areaname\":\"?????????\",\"id\":130824},{\"areaname\":\"?????????\",\"id\":130825},{\"areaname\":\"?????????????????????\",\"id\":130826},{\"areaname\":\"?????????????????????\",\"id\":130827},{\"areaname\":\"??????????????????????????????\",\"id\":130828}],\"id\":130800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":130902},{\"areaname\":\"?????????\",\"id\":130903},{\"areaname\":\"???  ???\",\"id\":130921},{\"areaname\":\"???  ???\",\"id\":130922},{\"areaname\":\"?????????\",\"id\":130923},{\"areaname\":\"?????????\",\"id\":130924},{\"areaname\":\"?????????\",\"id\":130925},{\"areaname\":\"?????????\",\"id\":130926},{\"areaname\":\"?????????\",\"id\":130927},{\"areaname\":\"?????????\",\"id\":130928},{\"areaname\":\"???  ???\",\"id\":130929},{\"areaname\":\"?????????????????????\",\"id\":130930},{\"areaname\":\"?????????\",\"id\":130981},{\"areaname\":\"?????????\",\"id\":130982},{\"areaname\":\"?????????\",\"id\":130983},{\"areaname\":\"?????????\",\"id\":130984}],\"id\":130900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":131002},{\"areaname\":\"?????????\",\"id\":131003},{\"areaname\":\"?????????\",\"id\":131022},{\"areaname\":\"?????????\",\"id\":131023},{\"areaname\":\"?????????\",\"id\":131024},{\"areaname\":\"?????????\",\"id\":131025},{\"areaname\":\"?????????\",\"id\":131026},{\"areaname\":\"?????????????????????\",\"id\":131028},{\"areaname\":\"?????????\",\"id\":131081},{\"areaname\":\"?????????\",\"id\":131082}],\"id\":131000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":131102},{\"areaname\":\"?????????\",\"id\":131103},{\"areaname\":\"?????????\",\"id\":131121},{\"areaname\":\"?????????\",\"id\":131122},{\"areaname\":\"?????????\",\"id\":131123},{\"areaname\":\"?????????\",\"id\":131124},{\"areaname\":\"?????????\",\"id\":131125},{\"areaname\":\"?????????\",\"id\":131126},{\"areaname\":\"???  ???\",\"id\":131127},{\"areaname\":\"?????????\",\"id\":131128},{\"areaname\":\"?????????\",\"id\":131182}],\"id\":131100},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":131221},{\"areaname\":\"?????????\",\"id\":131222},{\"areaname\":\"??????\",\"id\":131223}],\"id\":131200}],\"id\":130000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":140105},{\"areaname\":\"?????????\",\"id\":140106},{\"areaname\":\"????????????\",\"id\":140107},{\"areaname\":\"????????????\",\"id\":140108},{\"areaname\":\"????????????\",\"id\":140109},{\"areaname\":\"?????????\",\"id\":140110},{\"areaname\":\"?????????\",\"id\":140121},{\"areaname\":\"?????????\",\"id\":140122},{\"areaname\":\"?????????\",\"id\":140123},{\"areaname\":\"?????????\",\"id\":140181}],\"id\":140100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"???  ???\",\"id\":140202},{\"areaname\":\"???  ???\",\"id\":140203},{\"areaname\":\"?????????\",\"id\":140211},{\"areaname\":\"?????????\",\"id\":140212},{\"areaname\":\"?????????\",\"id\":140221},{\"areaname\":\"?????????\",\"id\":140222},{\"areaname\":\"?????????\",\"id\":140223},{\"areaname\":\"?????????\",\"id\":140224},{\"areaname\":\"?????????\",\"id\":140225},{\"areaname\":\"?????????\",\"id\":140226},{\"areaname\":\"?????????\",\"id\":140227}],\"id\":140200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"???  ???\",\"id\":140302},{\"areaname\":\"???  ???\",\"id\":140303},{\"areaname\":\"???  ???\",\"id\":140311},{\"areaname\":\"?????????\",\"id\":140321},{\"areaname\":\"???  ???\",\"id\":140322}],\"id\":140300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"???  ???\",\"id\":140402},{\"areaname\":\"???  ???\",\"id\":140411},{\"areaname\":\"?????????\",\"id\":140421},{\"areaname\":\"?????????\",\"id\":140423},{\"areaname\":\"?????????\",\"id\":140424},{\"areaname\":\"?????????\",\"id\":140425},{\"areaname\":\"?????????\",\"id\":140426},{\"areaname\":\"?????????\",\"id\":140427},{\"areaname\":\"?????????\",\"id\":140428},{\"areaname\":\"?????????\",\"id\":140429},{\"areaname\":\"???  ???\",\"id\":140430},{\"areaname\":\"?????????\",\"id\":140431},{\"areaname\":\"?????????\",\"id\":140481}],\"id\":140400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"???  ???\",\"id\":140502},{\"areaname\":\"?????????\",\"id\":140521},{\"areaname\":\"?????????\",\"id\":140522},{\"areaname\":\"?????????\",\"id\":140524},{\"areaname\":\"?????????\",\"id\":140525},{\"areaname\":\"?????????\",\"id\":140581}],\"id\":140500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":140602},{\"areaname\":\"?????????\",\"id\":140603},{\"areaname\":\"?????????\",\"id\":140621},{\"areaname\":\"???  ???\",\"id\":140622},{\"areaname\":\"?????????\",\"id\":140623},{\"areaname\":\"?????????\",\"id\":140624}],\"id\":140600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":140702},{\"areaname\":\"?????????\",\"id\":140721},{\"areaname\":\"?????????\",\"id\":140722},{\"areaname\":\"?????????\",\"id\":140723},{\"areaname\":\"?????????\",\"id\":140724},{\"areaname\":\"?????????\",\"id\":140725},{\"areaname\":\"?????????\",\"id\":140726},{\"areaname\":\"???  ???\",\"id\":140727},{\"areaname\":\"?????????\",\"id\":140728},{\"areaname\":\"?????????\",\"id\":140729},{\"areaname\":\"?????????\",\"id\":140781}],\"id\":140700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":140802},{\"areaname\":\"?????????\",\"id\":140821},{\"areaname\":\"?????????\",\"id\":140822},{\"areaname\":\"?????????\",\"id\":140823},{\"areaname\":\"?????????\",\"id\":140824},{\"areaname\":\"?????????\",\"id\":140825},{\"areaname\":\"???  ???\",\"id\":140826},{\"areaname\":\"?????????\",\"id\":140827},{\"areaname\":\"???  ???\",\"id\":140828},{\"areaname\":\"?????????\",\"id\":140829},{\"areaname\":\"?????????\",\"id\":140830},{\"areaname\":\"?????????\",\"id\":140881},{\"areaname\":\"?????????\",\"id\":140882}],\"id\":140800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":140902},{\"areaname\":\"?????????\",\"id\":140921},{\"areaname\":\"?????????\",\"id\":140922},{\"areaname\":\"???  ???\",\"id\":140923},{\"areaname\":\"?????????\",\"id\":140924},{\"areaname\":\"?????????\",\"id\":140925},{\"areaname\":\"?????????\",\"id\":140926},{\"areaname\":\"?????????\",\"id\":140927},{\"areaname\":\"?????????\",\"id\":140928},{\"areaname\":\"?????????\",\"id\":140929},{\"areaname\":\"?????????\",\"id\":140930},{\"areaname\":\"?????????\",\"id\":140931},{\"areaname\":\"?????????\",\"id\":140932},{\"areaname\":\"?????????\",\"id\":140981}],\"id\":140900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":141002},{\"areaname\":\"?????????\",\"id\":141021},{\"areaname\":\"?????????\",\"id\":141022},{\"areaname\":\"?????????\",\"id\":141023},{\"areaname\":\"?????????\",\"id\":141024},{\"areaname\":\"???  ???\",\"id\":141025},{\"areaname\":\"?????????\",\"id\":141026},{\"areaname\":\"?????????\",\"id\":141027},{\"areaname\":\"???  ???\",\"id\":141028},{\"areaname\":\"?????????\",\"id\":141029},{\"areaname\":\"?????????\",\"id\":141030},{\"areaname\":\"???  ???\",\"id\":141031},{\"areaname\":\"?????????\",\"id\":141032},{\"areaname\":\"???  ???\",\"id\":141033},{\"areaname\":\"?????????\",\"id\":141034},{\"areaname\":\"?????????\",\"id\":141081},{\"areaname\":\"?????????\",\"id\":141082}],\"id\":141000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":141102},{\"areaname\":\"?????????\",\"id\":141121},{\"areaname\":\"?????????\",\"id\":141122},{\"areaname\":\"??????\",\"id\":141123},{\"areaname\":\"??????\",\"id\":141124},{\"areaname\":\"?????????\",\"id\":141125},{\"areaname\":\"?????????\",\"id\":141126},{\"areaname\":\"??????\",\"id\":141127},{\"areaname\":\"?????????\",\"id\":141128},{\"areaname\":\"?????????\",\"id\":141129},{\"areaname\":\"?????????\",\"id\":141130},{\"areaname\":\"?????????\",\"id\":141181},{\"areaname\":\"?????????\",\"id\":141182}],\"id\":141100}],\"id\":140000},{\"areaname\":\"??????????????????\",\"childArea\":[{\"areaname\":\"???????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":150102},{\"areaname\":\"?????????\",\"id\":150103},{\"areaname\":\"?????????\",\"id\":150104},{\"areaname\":\"?????????\",\"id\":150105},{\"areaname\":\"???????????????\",\"id\":150121},{\"areaname\":\"????????????\",\"id\":150122},{\"areaname\":\"???????????????\",\"id\":150123},{\"areaname\":\"????????????\",\"id\":150124},{\"areaname\":\"?????????\",\"id\":150125}],\"id\":150100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":150202},{\"areaname\":\"????????????\",\"id\":150203},{\"areaname\":\"?????????\",\"id\":150204},{\"areaname\":\"?????????\",\"id\":150205},{\"areaname\":\"??????????????????\",\"id\":150206},{\"areaname\":\"?????????\",\"id\":150207},{\"areaname\":\"???????????????\",\"id\":150221},{\"areaname\":\"?????????\",\"id\":150222},{\"areaname\":\"???????????????????????????\",\"id\":150223}],\"id\":150200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":150302},{\"areaname\":\"?????????\",\"id\":150303},{\"areaname\":\"?????????\",\"id\":150304}],\"id\":150300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":150402},{\"areaname\":\"????????????\",\"id\":150403},{\"areaname\":\"?????????\",\"id\":150404},{\"areaname\":\"??????????????????\",\"id\":150421},{\"areaname\":\"????????????\",\"id\":150422},{\"areaname\":\"????????????\",\"id\":150423},{\"areaname\":\"?????????\",\"id\":150424},{\"areaname\":\"???????????????\",\"id\":150425},{\"areaname\":\"????????????\",\"id\":150426},{\"areaname\":\"????????????\",\"id\":150428},{\"areaname\":\"?????????\",\"id\":150429},{\"areaname\":\"?????????\",\"id\":150430}],\"id\":150400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":150502},{\"areaname\":\"?????????????????????\",\"id\":150521},{\"areaname\":\"?????????????????????\",\"id\":150522},{\"areaname\":\"?????????\",\"id\":150523},{\"areaname\":\"?????????\",\"id\":150524},{\"areaname\":\"?????????\",\"id\":150525},{\"areaname\":\"????????????\",\"id\":150526},{\"areaname\":\"???????????????\",\"id\":150581}],\"id\":150500},{\"areaname\":\"???????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":150602},{\"areaname\":\"????????????\",\"id\":150603},{\"areaname\":\"????????????\",\"id\":150621},{\"areaname\":\"????????????\",\"id\":150622},{\"areaname\":\"???????????????\",\"id\":150623},{\"areaname\":\"????????????\",\"id\":150624},{\"areaname\":\"?????????\",\"id\":150625},{\"areaname\":\"?????????\",\"id\":150626},{\"areaname\":\"???????????????\",\"id\":150627}],\"id\":150600},{\"areaname\":\"???????????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":150702},{\"areaname\":\"???????????????\",\"id\":150703},{\"areaname\":\"?????????\",\"id\":150721},{\"areaname\":\"?????????????????????????????????\",\"id\":150722},{\"areaname\":\"??????????????????\",\"id\":150723},{\"areaname\":\"?????????????????????\",\"id\":150724},{\"areaname\":\"???????????????\",\"id\":150725},{\"areaname\":\"??????????????????\",\"id\":150726},{\"areaname\":\"??????????????????\",\"id\":150727},{\"areaname\":\"????????????\",\"id\":150781},{\"areaname\":\"????????????\",\"id\":150782},{\"areaname\":\"????????????\",\"id\":150783},{\"areaname\":\"???????????????\",\"id\":150784},{\"areaname\":\"?????????\",\"id\":150785}],\"id\":150700},{\"areaname\":\"???????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":150802},{\"areaname\":\"?????????\",\"id\":150821},{\"areaname\":\"?????????\",\"id\":150822},{\"areaname\":\"???????????????\",\"id\":150823},{\"areaname\":\"???????????????\",\"id\":150824},{\"areaname\":\"???????????????\",\"id\":150825},{\"areaname\":\"????????????\",\"id\":150826}],\"id\":150800},{\"areaname\":\"???????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":150902},{\"areaname\":\"?????????\",\"id\":150921},{\"areaname\":\"?????????\",\"id\":150922},{\"areaname\":\"?????????\",\"id\":150923},{\"areaname\":\"?????????\",\"id\":150924},{\"areaname\":\"?????????\",\"id\":150925},{\"areaname\":\"?????????????????????\",\"id\":150926},{\"areaname\":\"?????????????????????\",\"id\":150927},{\"areaname\":\"?????????????????????\",\"id\":150928},{\"areaname\":\"????????????\",\"id\":150929},{\"areaname\":\"?????????\",\"id\":150981}],\"id\":150900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"???????????????\",\"id\":152201},{\"areaname\":\"????????????\",\"id\":152202},{\"areaname\":\"?????????????????????\",\"id\":152221},{\"areaname\":\"?????????????????????\",\"id\":152222},{\"areaname\":\"????????????\",\"id\":152223},{\"areaname\":\"?????????\",\"id\":152224}],\"id\":152200},{\"areaname\":\"???????????????\",\"childArea\":[{\"areaname\":\"???????????????\",\"id\":152501},{\"areaname\":\"???????????????\",\"id\":152502},{\"areaname\":\"????????????\",\"id\":152522},{\"areaname\":\"???????????????\",\"id\":152523},{\"areaname\":\"???????????????\",\"id\":152524},{\"areaname\":\"??????????????????\",\"id\":152525},{\"areaname\":\"??????????????????\",\"id\":152526},{\"areaname\":\"????????????\",\"id\":152527},{\"areaname\":\"?????????\",\"id\":152528},{\"areaname\":\"????????????\",\"id\":152529},{\"areaname\":\"?????????\",\"id\":152530},{\"areaname\":\"?????????\",\"id\":152531}],\"id\":152500},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"???????????????\",\"id\":152921},{\"areaname\":\"???????????????\",\"id\":152922},{\"areaname\":\"????????????\",\"id\":152923}],\"id\":152900}],\"id\":150000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":210102},{\"areaname\":\"?????????\",\"id\":210103},{\"areaname\":\"?????????\",\"id\":210104},{\"areaname\":\"?????????\",\"id\":210105},{\"areaname\":\"?????????\",\"id\":210106},{\"areaname\":\"????????????\",\"id\":210111},{\"areaname\":\"?????????\",\"id\":210112},{\"areaname\":\"????????????\",\"id\":210113},{\"areaname\":\"?????????\",\"id\":210114},{\"areaname\":\"?????????\",\"id\":210115},{\"areaname\":\"?????????\",\"id\":210123},{\"areaname\":\"?????????\",\"id\":210124},{\"areaname\":\"?????????\",\"id\":210181}],\"id\":210100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":210202},{\"areaname\":\"?????????\",\"id\":210203},{\"areaname\":\"????????????\",\"id\":210204},{\"areaname\":\"????????????\",\"id\":210205},{\"areaname\":\"?????????\",\"id\":210206},{\"areaname\":\"????????????\",\"id\":210207},{\"areaname\":\"????????????\",\"id\":210211},{\"areaname\":\"????????????\",\"id\":210212},{\"areaname\":\"?????????\",\"id\":210213},{\"areaname\":\"????????????\",\"id\":210214},{\"areaname\":\"?????????\",\"id\":210224},{\"areaname\":\"????????????\",\"id\":210281},{\"areaname\":\"?????????\",\"id\":210283}],\"id\":210200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":210302},{\"areaname\":\"?????????\",\"id\":210303},{\"areaname\":\"?????????\",\"id\":210304},{\"areaname\":\"?????????\",\"id\":210311},{\"areaname\":\"?????????\",\"id\":210321},{\"areaname\":\"?????????????????????\",\"id\":210323},{\"areaname\":\"?????????\",\"id\":210381}],\"id\":210300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":210402},{\"areaname\":\"?????????\",\"id\":210403},{\"areaname\":\"?????????\",\"id\":210404},{\"areaname\":\"?????????\",\"id\":210411},{\"areaname\":\"?????????\",\"id\":210421},{\"areaname\":\"?????????????????????\",\"id\":210422},{\"areaname\":\"?????????????????????\",\"id\":210423}],\"id\":210400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":210502},{\"areaname\":\"?????????\",\"id\":210503},{\"areaname\":\"?????????\",\"id\":210504},{\"areaname\":\"?????????\",\"id\":210505},{\"areaname\":\"?????????????????????\",\"id\":210521},{\"areaname\":\"?????????????????????\",\"id\":210522}],\"id\":210500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":210602},{\"areaname\":\"?????????\",\"id\":210603},{\"areaname\":\"?????????\",\"id\":210604},{\"areaname\":\"?????????????????????\",\"id\":210624},{\"areaname\":\"?????????\",\"id\":210681},{\"areaname\":\"?????????\",\"id\":210682}],\"id\":210600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":210702},{\"areaname\":\"?????????\",\"id\":210703},{\"areaname\":\"?????????\",\"id\":210711},{\"areaname\":\"?????????\",\"id\":210726},{\"areaname\":\"???  ???\",\"id\":210727},{\"areaname\":\"?????????\",\"id\":210781},{\"areaname\":\"?????????\",\"id\":210782}],\"id\":210700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":210802},{\"areaname\":\"?????????\",\"id\":210803},{\"areaname\":\"????????????\",\"id\":210804},{\"areaname\":\"?????????\",\"id\":210811},{\"areaname\":\"?????????\",\"id\":210881},{\"areaname\":\"????????????\",\"id\":210882}],\"id\":210800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":210902},{\"areaname\":\"?????????\",\"id\":210903},{\"areaname\":\"?????????\",\"id\":210904},{\"areaname\":\"????????????\",\"id\":210905},{\"areaname\":\"?????????\",\"id\":210911},{\"areaname\":\"????????????????????????\",\"id\":210921},{\"areaname\":\"?????????\",\"id\":210922}],\"id\":210900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":211002},{\"areaname\":\"?????????\",\"id\":211003},{\"areaname\":\"?????????\",\"id\":211004},{\"areaname\":\"????????????\",\"id\":211005},{\"areaname\":\"????????????\",\"id\":211011},{\"areaname\":\"?????????\",\"id\":211021},{\"areaname\":\"?????????\",\"id\":211081}],\"id\":211000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":211102},{\"areaname\":\"????????????\",\"id\":211103},{\"areaname\":\"?????????\",\"id\":211104},{\"areaname\":\"?????????\",\"id\":211122}],\"id\":211100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":211202},{\"areaname\":\"?????????\",\"id\":211204},{\"areaname\":\"?????????\",\"id\":211221},{\"areaname\":\"?????????\",\"id\":211223},{\"areaname\":\"?????????\",\"id\":211224},{\"areaname\":\"????????????\",\"id\":211281},{\"areaname\":\"?????????\",\"id\":211282}],\"id\":211200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":211302},{\"areaname\":\"?????????\",\"id\":211303},{\"areaname\":\"?????????\",\"id\":211321},{\"areaname\":\"?????????\",\"id\":211322},{\"areaname\":\"?????????????????????????????????\",\"id\":211324},{\"areaname\":\"?????????\",\"id\":211381},{\"areaname\":\"?????????\",\"id\":211382}],\"id\":211300},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":211402},{\"areaname\":\"?????????\",\"id\":211403},{\"areaname\":\"?????????\",\"id\":211404},{\"areaname\":\"?????????\",\"id\":211421},{\"areaname\":\"?????????\",\"id\":211422},{\"areaname\":\"?????????\",\"id\":211481}],\"id\":211400}],\"id\":210000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":220102},{\"areaname\":\"?????????\",\"id\":220103},{\"areaname\":\"?????????\",\"id\":220104},{\"areaname\":\"?????????\",\"id\":220105},{\"areaname\":\"?????????\",\"id\":220106},{\"areaname\":\"?????????\",\"id\":220112},{\"areaname\":\"?????????\",\"id\":220113},{\"areaname\":\"?????????\",\"id\":220122},{\"areaname\":\"?????????\",\"id\":220182},{\"areaname\":\"?????????\",\"id\":220183}],\"id\":220100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":220202},{\"areaname\":\"?????????\",\"id\":220203},{\"areaname\":\"?????????\",\"id\":220204},{\"areaname\":\"?????????\",\"id\":220211},{\"areaname\":\"?????????\",\"id\":220221},{\"areaname\":\"?????????\",\"id\":220281},{\"areaname\":\"?????????\",\"id\":220282},{\"areaname\":\"?????????\",\"id\":220283},{\"areaname\":\"?????????\",\"id\":220284}],\"id\":220200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":220302},{\"areaname\":\"?????????\",\"id\":220303},{\"areaname\":\"?????????\",\"id\":220322},{\"areaname\":\"?????????????????????\",\"id\":220323},{\"areaname\":\"????????????\",\"id\":220381},{\"areaname\":\"?????????\",\"id\":220382}],\"id\":220300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":220402},{\"areaname\":\"?????????\",\"id\":220403},{\"areaname\":\"?????????\",\"id\":220421},{\"areaname\":\"?????????\",\"id\":220422}],\"id\":220400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":220502},{\"areaname\":\"????????????\",\"id\":220503},{\"areaname\":\"?????????\",\"id\":220521},{\"areaname\":\"?????????\",\"id\":220523},{\"areaname\":\"?????????\",\"id\":220524},{\"areaname\":\"????????????\",\"id\":220581},{\"areaname\":\"?????????\",\"id\":220582}],\"id\":220500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":220602},{\"areaname\":\"?????????\",\"id\":220605},{\"areaname\":\"?????????\",\"id\":220621},{\"areaname\":\"?????????\",\"id\":220622},{\"areaname\":\"????????????????????????\",\"id\":220623},{\"areaname\":\"?????????\",\"id\":220681}],\"id\":220600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":220702},{\"areaname\":\"?????????????????????????????????\",\"id\":220721},{\"areaname\":\"?????????\",\"id\":220722},{\"areaname\":\"?????????\",\"id\":220723},{\"areaname\":\"?????????\",\"id\":220781}],\"id\":220700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":220802},{\"areaname\":\"?????????\",\"id\":220821},{\"areaname\":\"?????????\",\"id\":220822},{\"areaname\":\"?????????\",\"id\":220881},{\"areaname\":\"?????????\",\"id\":220882}],\"id\":220800},{\"areaname\":\"????????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":222401},{\"areaname\":\"?????????\",\"id\":222402},{\"areaname\":\"?????????\",\"id\":222403},{\"areaname\":\"?????????\",\"id\":222404},{\"areaname\":\"?????????\",\"id\":222405},{\"areaname\":\"?????????\",\"id\":222406},{\"areaname\":\"?????????\",\"id\":222424},{\"areaname\":\"?????????\",\"id\":222426}],\"id\":222400}],\"id\":220000},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":230102},{\"areaname\":\"?????????\",\"id\":230103},{\"areaname\":\"?????????\",\"id\":230104},{\"areaname\":\"?????????\",\"id\":230108},{\"areaname\":\"?????????\",\"id\":230109},{\"areaname\":\"?????????\",\"id\":230110},{\"areaname\":\"?????????\",\"id\":230111},{\"areaname\":\"?????????\",\"id\":230112},{\"areaname\":\"?????????\",\"id\":230113},{\"areaname\":\"?????????\",\"id\":230123},{\"areaname\":\"?????????\",\"id\":230124},{\"areaname\":\"???  ???\",\"id\":230125},{\"areaname\":\"?????????\",\"id\":230126},{\"areaname\":\"?????????\",\"id\":230127},{\"areaname\":\"?????????\",\"id\":230128},{\"areaname\":\"?????????\",\"id\":230129},{\"areaname\":\"?????????\",\"id\":230183},{\"areaname\":\"?????????\",\"id\":230184}],\"id\":230100},{\"areaname\":\"???????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":230202},{\"areaname\":\"?????????\",\"id\":230203},{\"areaname\":\"?????????\",\"id\":230204},{\"areaname\":\"????????????\",\"id\":230205},{\"areaname\":\"???????????????\",\"id\":230206},{\"areaname\":\"????????????\",\"id\":230207},{\"areaname\":\"????????????????????????\",\"id\":230208},{\"areaname\":\"?????????\",\"id\":230221},{\"areaname\":\"?????????\",\"id\":230223},{\"areaname\":\"?????????\",\"id\":230224},{\"areaname\":\"?????????\",\"id\":230225},{\"areaname\":\"?????????\",\"id\":230227},{\"areaname\":\"?????????\",\"id\":230229},{\"areaname\":\"?????????\",\"id\":230230},{\"areaname\":\"?????????\",\"id\":230231},{\"areaname\":\"?????????\",\"id\":230281}],\"id\":230200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":230302},{\"areaname\":\"?????????\",\"id\":230303},{\"areaname\":\"?????????\",\"id\":230304},{\"areaname\":\"?????????\",\"id\":230305},{\"areaname\":\"????????????\",\"id\":230306},{\"areaname\":\"?????????\",\"id\":230307},{\"areaname\":\"?????????\",\"id\":230321},{\"areaname\":\"?????????\",\"id\":230381},{\"areaname\":\"?????????\",\"id\":230382}],\"id\":230300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":230402},{\"areaname\":\"?????????\",\"id\":230403},{\"areaname\":\"?????????\",\"id\":230404},{\"areaname\":\"?????????\",\"id\":230405},{\"areaname\":\"?????????\",\"id\":230406},{\"areaname\":\"?????????\",\"id\":230407},{\"areaname\":\"?????????\",\"id\":230421},{\"areaname\":\"?????????\",\"id\":230422}],\"id\":230400},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":230502},{\"areaname\":\"?????????\",\"id\":230503},{\"areaname\":\"????????????\",\"id\":230505},{\"areaname\":\"?????????\",\"id\":230506},{\"areaname\":\"?????????\",\"id\":230521},{\"areaname\":\"?????????\",\"id\":230522},{\"areaname\":\"?????????\",\"id\":230523},{\"areaname\":\"?????????\",\"id\":230524}],\"id\":230500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":230602},{\"areaname\":\"?????????\",\"id\":230603},{\"areaname\":\"????????????\",\"id\":230604},{\"areaname\":\"?????????\",\"id\":230605},{\"areaname\":\"?????????\",\"id\":230606},{\"areaname\":\"?????????\",\"id\":230621},{\"areaname\":\"?????????\",\"id\":230622},{\"areaname\":\"?????????\",\"id\":230623},{\"areaname\":\"??????????????????????????????\",\"id\":230624}],\"id\":230600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":230702},{\"areaname\":\"?????????\",\"id\":230703},{\"areaname\":\"?????????\",\"id\":230704},{\"areaname\":\"?????????\",\"id\":230705},{\"areaname\":\"?????????\",\"id\":230706},{\"areaname\":\"?????????\",\"id\":230707},{\"areaname\":\"?????????\",\"id\":230708},{\"areaname\":\"????????????\",\"id\":230709},{\"areaname\":\"?????????\",\"id\":230710},{\"areaname\":\"????????????\",\"id\":230711},{\"areaname\":\"????????????\",\"id\":230712},{\"areaname\":\"?????????\",\"id\":230713},{\"areaname\":\"????????????\",\"id\":230714},{\"areaname\":\"?????????\",\"id\":230715},{\"areaname\":\"????????????\",\"id\":230716},{\"areaname\":\"?????????\",\"id\":230722},{\"areaname\":\"?????????\",\"id\":230781}],\"id\":230700},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":230803},{\"areaname\":\"?????????\",\"id\":230804},{\"areaname\":\"?????????\",\"id\":230805},{\"areaname\":\"???  ???\",\"id\":230811},{\"areaname\":\"?????????\",\"id\":230822},{\"areaname\":\"?????????\",\"id\":230826},{\"areaname\":\"?????????\",\"id\":230828},{\"areaname\":\"?????????\",\"id\":230881},{\"areaname\":\"?????????\",\"id\":230882},{\"areaname\":\"?????????\",\"id\":230883}],\"id\":230800},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":230902},{\"areaname\":\"?????????\",\"id\":230903},{\"areaname\":\"????????????\",\"id\":230904},{\"areaname\":\"?????????\",\"id\":230921}],\"id\":230900},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":231002},{\"areaname\":\"?????????\",\"id\":231003},{\"areaname\":\"?????????\",\"id\":231004},{\"areaname\":\"?????????\",\"id\":231005},{\"areaname\":\"?????????\",\"id\":231025},{\"areaname\":\"????????????\",\"id\":231081},{\"areaname\":\"?????????\",\"id\":231083},{\"areaname\":\"?????????\",\"id\":231084},{\"areaname\":\"?????????\",\"id\":231085},{\"areaname\":\"?????????\",\"id\":231086}],\"id\":231000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":231102},{\"areaname\":\"?????????\",\"id\":231121},{\"areaname\":\"?????????\",\"id\":231123},{\"areaname\":\"?????????\",\"id\":231124},{\"areaname\":\"?????????\",\"id\":231181},{\"areaname\":\"???????????????\",\"id\":231182}],\"id\":231100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":231202},{\"areaname\":\"?????????\",\"id\":231221},{\"areaname\":\"?????????\",\"id\":231222},{\"areaname\":\"?????????\",\"id\":231223},{\"areaname\":\"?????????\",\"id\":231224},{\"areaname\":\"?????????\",\"id\":231225},{\"areaname\":\"?????????\",\"id\":231226},{\"areaname\":\"?????????\",\"id\":231281},{\"areaname\":\"?????????\",\"id\":231282},{\"areaname\":\"?????????\",\"id\":231283}],\"id\":231200},{\"areaname\":\"??????????????????\",\"childArea\":[{\"areaname\":\"???????????????\",\"id\":232701},{\"areaname\":\"?????????\",\"id\":232702},{\"areaname\":\"?????????\",\"id\":232703},{\"areaname\":\"?????????\",\"id\":232704},{\"areaname\":\"?????????\",\"id\":232721},{\"areaname\":\"?????????\",\"id\":232722},{\"areaname\":\"?????????\",\"id\":232723}],\"id\":232700}],\"id\":230000},{\"areaname\":\"??????\",\"childArea\":[{\"areaname\":\"??????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":310101},{\"areaname\":\"?????????\",\"id\":310104},{\"areaname\":\"?????????\",\"id\":310105},{\"areaname\":\"?????????\",\"id\":310106},{\"areaname\":\"?????????\",\"id\":310107},{\"areaname\":\"?????????\",\"id\":310108},{\"areaname\":\"?????????\",\"id\":310109},{\"areaname\":\"?????????\",\"id\":310110},{\"areaname\":\"?????????\",\"id\":310112},{\"areaname\":\"?????????\",\"id\":310113},{\"areaname\":\"?????????\",\"id\":310114},{\"areaname\":\"????????????\",\"id\":310115},{\"areaname\":\"?????????\",\"id\":310116},{\"areaname\":\"?????????\",\"id\":310117},{\"areaname\":\"?????????\",\"id\":310118},{\"areaname\":\"?????????\",\"id\":310120},{\"areaname\":\"?????????\",\"id\":310151}],\"id\":310100}],\"id\":310000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":320102},{\"areaname\":\"?????????\",\"id\":320104},{\"areaname\":\"?????????\",\"id\":320105},{\"areaname\":\"?????????\",\"id\":320106},{\"areaname\":\"?????????\",\"id\":320111},{\"areaname\":\"?????????\",\"id\":320113},{\"areaname\":\"????????????\",\"id\":320114},{\"areaname\":\"?????????\",\"id\":320115},{\"areaname\":\"?????????\",\"id\":320116},{\"areaname\":\"?????????\",\"id\":320117},{\"areaname\":\"?????????\",\"id\":320118}],\"id\":320100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":320202},{\"areaname\":\"?????????\",\"id\":320203},{\"areaname\":\"?????????\",\"id\":320204},{\"areaname\":\"?????????\",\"id\":320205},{\"areaname\":\"?????????\",\"id\":320206},{\"areaname\":\"?????????\",\"id\":320211},{\"areaname\":\"?????????\",\"id\":320213},{\"areaname\":\"?????????\",\"id\":320214},{\"areaname\":\"?????????\",\"id\":320281},{\"areaname\":\"?????????\",\"id\":320282}],\"id\":320200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":320302},{\"areaname\":\"?????????\",\"id\":320303},{\"areaname\":\"?????????\",\"id\":320305},{\"areaname\":\"?????????\",\"id\":320311},{\"areaname\":\"?????????\",\"id\":320312},{\"areaname\":\"???  ???\",\"id\":320321},{\"areaname\":\"???  ???\",\"id\":320322},{\"areaname\":\"?????????\",\"id\":320324},{\"areaname\":\"?????????\",\"id\":320381},{\"areaname\":\"?????????\",\"id\":320382}],\"id\":320300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":320402},{\"areaname\":\"?????????\",\"id\":320404},{\"areaname\":\"????????????\",\"id\":320405},{\"areaname\":\"?????????\",\"id\":320411},{\"areaname\":\"?????????\",\"id\":320412},{\"areaname\":\"?????????\",\"id\":320413},{\"areaname\":\"?????????\",\"id\":320481}],\"id\":320400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????????????????\",\"id\":320505},{\"areaname\":\"?????????\",\"id\":320506},{\"areaname\":\"?????????\",\"id\":320507},{\"areaname\":\"?????????\",\"id\":320508},{\"areaname\":\"?????????\",\"id\":320509},{\"areaname\":\"??????\",\"id\":320510},{\"areaname\":\"?????????\",\"id\":320581},{\"areaname\":\"????????????\",\"id\":320582},{\"areaname\":\"?????????\",\"id\":320583},{\"areaname\":\"?????????\",\"id\":320585}],\"id\":320500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":320602},{\"areaname\":\"?????????\",\"id\":320611},{\"areaname\":\"?????????\",\"id\":320612},{\"areaname\":\"?????????\",\"id\":320621},{\"areaname\":\"?????????\",\"id\":320623},{\"areaname\":\"?????????\",\"id\":320681},{\"areaname\":\"?????????\",\"id\":320682},{\"areaname\":\"?????????\",\"id\":320684}],\"id\":320600},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":320703},{\"areaname\":\"?????????\",\"id\":320706},{\"areaname\":\"?????????\",\"id\":320707},{\"areaname\":\"?????????\",\"id\":320722},{\"areaname\":\"?????????\",\"id\":320723},{\"areaname\":\"?????????\",\"id\":320724}],\"id\":320700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":320802},{\"areaname\":\"?????????\",\"id\":320803},{\"areaname\":\"?????????\",\"id\":320804},{\"areaname\":\"?????????\",\"id\":320811},{\"areaname\":\"????????????\",\"id\":320812},{\"areaname\":\"?????????\",\"id\":320813},{\"areaname\":\"?????????\",\"id\":320826},{\"areaname\":\"?????????\",\"id\":320830},{\"areaname\":\"?????????\",\"id\":320831}],\"id\":320800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":320902},{\"areaname\":\"?????????\",\"id\":320903},{\"areaname\":\"?????????\",\"id\":320904},{\"areaname\":\"?????????\",\"id\":320921},{\"areaname\":\"?????????\",\"id\":320922},{\"areaname\":\"?????????\",\"id\":320923},{\"areaname\":\"?????????\",\"id\":320924},{\"areaname\":\"?????????\",\"id\":320925},{\"areaname\":\"?????????\",\"id\":320981}],\"id\":320900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":321002},{\"areaname\":\"?????????\",\"id\":321003},{\"areaname\":\"?????????\",\"id\":321012},{\"areaname\":\"?????????\",\"id\":321023},{\"areaname\":\"?????????\",\"id\":321081},{\"areaname\":\"?????????\",\"id\":321084}],\"id\":321000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":321102},{\"areaname\":\"?????????\",\"id\":321111},{\"areaname\":\"?????????\",\"id\":321112},{\"areaname\":\"?????????\",\"id\":321181},{\"areaname\":\"?????????\",\"id\":321182},{\"areaname\":\"?????????\",\"id\":321183}],\"id\":321100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":321202},{\"areaname\":\"?????????\",\"id\":321203},{\"areaname\":\"?????????\",\"id\":321204},{\"areaname\":\"?????????\",\"id\":321281},{\"areaname\":\"?????????\",\"id\":321282},{\"areaname\":\"?????????\",\"id\":321283}],\"id\":321200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":321302},{\"areaname\":\"?????????\",\"id\":321311},{\"areaname\":\"?????????\",\"id\":321322},{\"areaname\":\"?????????\",\"id\":321323},{\"areaname\":\"?????????\",\"id\":321324}],\"id\":321300}],\"id\":320000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":330102},{\"areaname\":\"?????????\",\"id\":330103},{\"areaname\":\"?????????\",\"id\":330104},{\"areaname\":\"?????????\",\"id\":330105},{\"areaname\":\"?????????\",\"id\":330106},{\"areaname\":\"?????????\",\"id\":330108},{\"areaname\":\"?????????\",\"id\":330109},{\"areaname\":\"?????????\",\"id\":330110},{\"areaname\":\"?????????\",\"id\":330111},{\"areaname\":\"?????????\",\"id\":330122},{\"areaname\":\"?????????\",\"id\":330127},{\"areaname\":\"?????????\",\"id\":330182},{\"areaname\":\"?????????\",\"id\":330185}],\"id\":330100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":330203},{\"areaname\":\"?????????\",\"id\":330204},{\"areaname\":\"?????????\",\"id\":330205},{\"areaname\":\"?????????\",\"id\":330206},{\"areaname\":\"?????????\",\"id\":330211},{\"areaname\":\"?????????\",\"id\":330212},{\"areaname\":\"?????????\",\"id\":330225},{\"areaname\":\"?????????\",\"id\":330226},{\"areaname\":\"?????????\",\"id\":330281},{\"areaname\":\"?????????\",\"id\":330282},{\"areaname\":\"?????????\",\"id\":330283}],\"id\":330200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":330302},{\"areaname\":\"?????????\",\"id\":330303},{\"areaname\":\"?????????\",\"id\":330304},{\"areaname\":\"?????????\",\"id\":330305},{\"areaname\":\"?????????\",\"id\":330324},{\"areaname\":\"?????????\",\"id\":330326},{\"areaname\":\"?????????\",\"id\":330327},{\"areaname\":\"?????????\",\"id\":330328},{\"areaname\":\"?????????\",\"id\":330329},{\"areaname\":\"?????????\",\"id\":330381},{\"areaname\":\"?????????\",\"id\":330382}],\"id\":330300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":330402},{\"areaname\":\"?????????\",\"id\":330411},{\"areaname\":\"?????????\",\"id\":330421},{\"areaname\":\"?????????\",\"id\":330424},{\"areaname\":\"?????????\",\"id\":330481},{\"areaname\":\"?????????\",\"id\":330482},{\"areaname\":\"?????????\",\"id\":330483}],\"id\":330400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":330502},{\"areaname\":\"?????????\",\"id\":330503},{\"areaname\":\"?????????\",\"id\":330521},{\"areaname\":\"?????????\",\"id\":330522},{\"areaname\":\"?????????\",\"id\":330523}],\"id\":330500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":330602},{\"areaname\":\"?????????\",\"id\":330603},{\"areaname\":\"?????????\",\"id\":330604},{\"areaname\":\"?????????\",\"id\":330624},{\"areaname\":\"?????????\",\"id\":330681},{\"areaname\":\"?????????\",\"id\":330683}],\"id\":330600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":330702},{\"areaname\":\"?????????\",\"id\":330703},{\"areaname\":\"?????????\",\"id\":330723},{\"areaname\":\"?????????\",\"id\":330726},{\"areaname\":\"?????????\",\"id\":330727},{\"areaname\":\"?????????\",\"id\":330781},{\"areaname\":\"?????????\",\"id\":330782},{\"areaname\":\"?????????\",\"id\":330783},{\"areaname\":\"?????????\",\"id\":330784}],\"id\":330700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":330802},{\"areaname\":\"?????????\",\"id\":330803},{\"areaname\":\"?????????\",\"id\":330822},{\"areaname\":\"?????????\",\"id\":330824},{\"areaname\":\"?????????\",\"id\":330825},{\"areaname\":\"?????????\",\"id\":330881}],\"id\":330800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":330902},{\"areaname\":\"?????????\",\"id\":330903},{\"areaname\":\"?????????\",\"id\":330921},{\"areaname\":\"?????????\",\"id\":330922}],\"id\":330900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":331002},{\"areaname\":\"?????????\",\"id\":331003},{\"areaname\":\"?????????\",\"id\":331004},{\"areaname\":\"?????????\",\"id\":331021},{\"areaname\":\"?????????\",\"id\":331022},{\"areaname\":\"?????????\",\"id\":331023},{\"areaname\":\"?????????\",\"id\":331024},{\"areaname\":\"?????????\",\"id\":331081},{\"areaname\":\"?????????\",\"id\":331082}],\"id\":331000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":331102},{\"areaname\":\"?????????\",\"id\":331121},{\"areaname\":\"?????????\",\"id\":331122},{\"areaname\":\"?????????\",\"id\":331123},{\"areaname\":\"?????????\",\"id\":331124},{\"areaname\":\"?????????\",\"id\":331125},{\"areaname\":\"?????????\",\"id\":331126},{\"areaname\":\"?????????????????????\",\"id\":331127},{\"areaname\":\"?????????\",\"id\":331181}],\"id\":331100},{\"areaname\":\"??????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":331201},{\"areaname\":\"?????????\",\"id\":331202},{\"areaname\":\"?????????\",\"id\":331203},{\"areaname\":\"?????????????????????\",\"id\":331204},{\"areaname\":\"??????????????????\",\"id\":331205},{\"areaname\":\"?????????\",\"id\":331206},{\"areaname\":\"????????????\",\"id\":331207},{\"areaname\":\"?????????\",\"id\":331208},{\"areaname\":\"?????????\",\"id\":331209},{\"areaname\":\"?????????\",\"id\":331210}],\"id\":331200}],\"id\":330000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":340102},{\"areaname\":\"?????????\",\"id\":340103},{\"areaname\":\"?????????\",\"id\":340104},{\"areaname\":\"?????????\",\"id\":340111},{\"areaname\":\"?????????\",\"id\":340121},{\"areaname\":\"?????????\",\"id\":340122},{\"areaname\":\"?????????\",\"id\":340123},{\"areaname\":\"?????????\",\"id\":340124},{\"areaname\":\"?????????\",\"id\":340181}],\"id\":340100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":340202},{\"areaname\":\"?????????\",\"id\":340203},{\"areaname\":\"?????????\",\"id\":340207},{\"areaname\":\"?????????\",\"id\":340208},{\"areaname\":\"?????????\",\"id\":340221},{\"areaname\":\"?????????\",\"id\":340222},{\"areaname\":\"?????????\",\"id\":340223},{\"areaname\":\"?????????\",\"id\":340225}],\"id\":340200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":340302},{\"areaname\":\"?????????\",\"id\":340303},{\"areaname\":\"?????????\",\"id\":340304},{\"areaname\":\"?????????\",\"id\":340311},{\"areaname\":\"?????????\",\"id\":340321},{\"areaname\":\"?????????\",\"id\":340322},{\"areaname\":\"?????????\",\"id\":340323}],\"id\":340300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":340402},{\"areaname\":\"????????????\",\"id\":340403},{\"areaname\":\"????????????\",\"id\":340404},{\"areaname\":\"????????????\",\"id\":340405},{\"areaname\":\"?????????\",\"id\":340406},{\"areaname\":\"?????????\",\"id\":340421},{\"areaname\":\"??????\",\"id\":340422}],\"id\":340400},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":340503},{\"areaname\":\"?????????\",\"id\":340504},{\"areaname\":\"?????????\",\"id\":340506},{\"areaname\":\"?????????\",\"id\":340521},{\"areaname\":\"?????????\",\"id\":340522},{\"areaname\":\"???  ???\",\"id\":340523}],\"id\":340500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":340602},{\"areaname\":\"?????????\",\"id\":340603},{\"areaname\":\"?????????\",\"id\":340604},{\"areaname\":\"?????????\",\"id\":340621}],\"id\":340600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":340702},{\"areaname\":\"????????????\",\"id\":340703},{\"areaname\":\"?????????\",\"id\":340705},{\"areaname\":\"?????????\",\"id\":340706},{\"areaname\":\"???  ???\",\"id\":340711},{\"areaname\":\"?????????\",\"id\":340721},{\"areaname\":\"?????????\",\"id\":340722}],\"id\":340700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":340802},{\"areaname\":\"?????????\",\"id\":340803},{\"areaname\":\"?????????\",\"id\":340811},{\"areaname\":\"?????????\",\"id\":340822},{\"areaname\":\"?????????\",\"id\":340824},{\"areaname\":\"?????????\",\"id\":340825},{\"areaname\":\"?????????\",\"id\":340826},{\"areaname\":\"?????????\",\"id\":340827},{\"areaname\":\"?????????\",\"id\":340828},{\"areaname\":\"?????????\",\"id\":340881}],\"id\":340800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":341002},{\"areaname\":\"?????????\",\"id\":341003},{\"areaname\":\"?????????\",\"id\":341004},{\"areaname\":\"???  ???\",\"id\":341021},{\"areaname\":\"?????????\",\"id\":341022},{\"areaname\":\"???  ???\",\"id\":341023},{\"areaname\":\"?????????\",\"id\":341024}],\"id\":341000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":341102},{\"areaname\":\"?????????\",\"id\":341103},{\"areaname\":\"?????????\",\"id\":341122},{\"areaname\":\"?????????\",\"id\":341124},{\"areaname\":\"?????????\",\"id\":341125},{\"areaname\":\"?????????\",\"id\":341126},{\"areaname\":\"?????????\",\"id\":341181},{\"areaname\":\"?????????\",\"id\":341182}],\"id\":341100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":341202},{\"areaname\":\"?????????\",\"id\":341203},{\"areaname\":\"?????????\",\"id\":341204},{\"areaname\":\"?????????\",\"id\":341221},{\"areaname\":\"?????????\",\"id\":341222},{\"areaname\":\"?????????\",\"id\":341225},{\"areaname\":\"?????????\",\"id\":341226},{\"areaname\":\"?????????\",\"id\":341282}],\"id\":341200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":341302},{\"areaname\":\"?????????\",\"id\":341321},{\"areaname\":\"???  ???\",\"id\":341322},{\"areaname\":\"?????????\",\"id\":341323},{\"areaname\":\"???  ???\",\"id\":341324}],\"id\":341300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":341502},{\"areaname\":\"?????????\",\"id\":341503},{\"areaname\":\"?????????\",\"id\":341504},{\"areaname\":\"?????????\",\"id\":341522},{\"areaname\":\"?????????\",\"id\":341523},{\"areaname\":\"?????????\",\"id\":341524},{\"areaname\":\"?????????\",\"id\":341525}],\"id\":341500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":341602},{\"areaname\":\"?????????\",\"id\":341621},{\"areaname\":\"?????????\",\"id\":341622},{\"areaname\":\"?????????\",\"id\":341623}],\"id\":341600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":341702},{\"areaname\":\"?????????\",\"id\":341721},{\"areaname\":\"?????????\",\"id\":341722},{\"areaname\":\"?????????\",\"id\":341723}],\"id\":341700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":341802},{\"areaname\":\"?????????\",\"id\":341821},{\"areaname\":\"?????????\",\"id\":341822},{\"areaname\":\"??????\",\"id\":341823},{\"areaname\":\"?????????\",\"id\":341824},{\"areaname\":\"?????????\",\"id\":341825},{\"areaname\":\"?????????\",\"id\":341881}],\"id\":341800}],\"id\":340000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":350102},{\"areaname\":\"?????????\",\"id\":350103},{\"areaname\":\"?????????\",\"id\":350104},{\"areaname\":\"?????????\",\"id\":350105},{\"areaname\":\"?????????\",\"id\":350111},{\"areaname\":\"???????????????\",\"id\":350112},{\"areaname\":\"?????????\",\"id\":350113},{\"areaname\":\"?????????\",\"id\":350121},{\"areaname\":\"?????????\",\"id\":350122},{\"areaname\":\"?????????\",\"id\":350123},{\"areaname\":\"?????????\",\"id\":350124},{\"areaname\":\"?????????\",\"id\":350125},{\"areaname\":\"?????????\",\"id\":350128},{\"areaname\":\"?????????\",\"id\":350181},{\"areaname\":\"?????????\",\"id\":350182}],\"id\":350100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":350203},{\"areaname\":\"?????????\",\"id\":350205},{\"areaname\":\"?????????\",\"id\":350206},{\"areaname\":\"?????????\",\"id\":350211},{\"areaname\":\"?????????\",\"id\":350212},{\"areaname\":\"?????????\",\"id\":350213}],\"id\":350200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":350302},{\"areaname\":\"?????????\",\"id\":350303},{\"areaname\":\"?????????\",\"id\":350304},{\"areaname\":\"?????????\",\"id\":350305},{\"areaname\":\"?????????\",\"id\":350322}],\"id\":350300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":350402},{\"areaname\":\"?????????\",\"id\":350403},{\"areaname\":\"?????????\",\"id\":350421},{\"areaname\":\"?????????\",\"id\":350423},{\"areaname\":\"?????????\",\"id\":350424},{\"areaname\":\"?????????\",\"id\":350425},{\"areaname\":\"?????????\",\"id\":350426},{\"areaname\":\"???  ???\",\"id\":350427},{\"areaname\":\"?????????\",\"id\":350428},{\"areaname\":\"?????????\",\"id\":350429},{\"areaname\":\"?????????\",\"id\":350430},{\"areaname\":\"?????????\",\"id\":350481}],\"id\":350400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":350502},{\"areaname\":\"?????????\",\"id\":350503},{\"areaname\":\"?????????\",\"id\":350504},{\"areaname\":\"?????????\",\"id\":350505},{\"areaname\":\"?????????\",\"id\":350521},{\"areaname\":\"?????????\",\"id\":350524},{\"areaname\":\"?????????\",\"id\":350525},{\"areaname\":\"?????????\",\"id\":350526},{\"areaname\":\"?????????\",\"id\":350527},{\"areaname\":\"?????????\",\"id\":350581},{\"areaname\":\"?????????\",\"id\":350582},{\"areaname\":\"?????????\",\"id\":350583}],\"id\":350500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":350602},{\"areaname\":\"?????????\",\"id\":350603},{\"areaname\":\"?????????\",\"id\":350622},{\"areaname\":\"?????????\",\"id\":350623},{\"areaname\":\"?????????\",\"id\":350624},{\"areaname\":\"?????????\",\"id\":350625},{\"areaname\":\"?????????\",\"id\":350626},{\"areaname\":\"?????????\",\"id\":350627},{\"areaname\":\"?????????\",\"id\":350628},{\"areaname\":\"?????????\",\"id\":350629},{\"areaname\":\"?????????\",\"id\":350681}],\"id\":350600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":350702},{\"areaname\":\"?????????\",\"id\":350703},{\"areaname\":\"?????????\",\"id\":350721},{\"areaname\":\"?????????\",\"id\":350722},{\"areaname\":\"?????????\",\"id\":350723},{\"areaname\":\"?????????\",\"id\":350724},{\"areaname\":\"?????????\",\"id\":350725},{\"areaname\":\"?????????\",\"id\":350781},{\"areaname\":\"????????????\",\"id\":350782},{\"areaname\":\"?????????\",\"id\":350783}],\"id\":350700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":350802},{\"areaname\":\"?????????\",\"id\":350803},{\"areaname\":\"?????????\",\"id\":350821},{\"areaname\":\"?????????\",\"id\":350823},{\"areaname\":\"?????????\",\"id\":350824},{\"areaname\":\"?????????\",\"id\":350825},{\"areaname\":\"?????????\",\"id\":350881}],\"id\":350800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":350902},{\"areaname\":\"?????????\",\"id\":350921},{\"areaname\":\"?????????\",\"id\":350922},{\"areaname\":\"?????????\",\"id\":350923},{\"areaname\":\"?????????\",\"id\":350924},{\"areaname\":\"?????????\",\"id\":350925},{\"areaname\":\"?????????\",\"id\":350926},{\"areaname\":\"?????????\",\"id\":350981},{\"areaname\":\"?????????\",\"id\":350982}],\"id\":350900}],\"id\":350000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":360102},{\"areaname\":\"?????????\",\"id\":360103},{\"areaname\":\"????????????\",\"id\":360104},{\"areaname\":\"?????????\",\"id\":360105},{\"areaname\":\"????????????\",\"id\":360111},{\"areaname\":\"?????????\",\"id\":360112},{\"areaname\":\"?????????\",\"id\":360121},{\"areaname\":\"?????????\",\"id\":360123},{\"areaname\":\"?????????\",\"id\":360124}],\"id\":360100},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":360202},{\"areaname\":\"?????????\",\"id\":360203},{\"areaname\":\"?????????\",\"id\":360222},{\"areaname\":\"?????????\",\"id\":360281}],\"id\":360200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":360302},{\"areaname\":\"?????????\",\"id\":360313},{\"areaname\":\"?????????\",\"id\":360321},{\"areaname\":\"?????????\",\"id\":360322},{\"areaname\":\"?????????\",\"id\":360323}],\"id\":360300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":360402},{\"areaname\":\"?????????\",\"id\":360403},{\"areaname\":\"?????????\",\"id\":360421},{\"areaname\":\"?????????\",\"id\":360423},{\"areaname\":\"?????????\",\"id\":360424},{\"areaname\":\"?????????\",\"id\":360425},{\"areaname\":\"?????????\",\"id\":360426},{\"areaname\":\"?????????\",\"id\":360427},{\"areaname\":\"?????????\",\"id\":360428},{\"areaname\":\"?????????\",\"id\":360429},{\"areaname\":\"?????????\",\"id\":360430},{\"areaname\":\"?????????\",\"id\":360481},{\"areaname\":\"????????????\",\"id\":360482},{\"areaname\":\"?????????\",\"id\":360483}],\"id\":360400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":360502},{\"areaname\":\"?????????\",\"id\":360521}],\"id\":360500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":360602},{\"areaname\":\"?????????\",\"id\":360622},{\"areaname\":\"?????????\",\"id\":360681}],\"id\":360600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":360702},{\"areaname\":\"?????????\",\"id\":360703},{\"areaname\":\"??????\",\"id\":360721},{\"areaname\":\"?????????\",\"id\":360722},{\"areaname\":\"?????????\",\"id\":360723},{\"areaname\":\"?????????\",\"id\":360724},{\"areaname\":\"?????????\",\"id\":360725},{\"areaname\":\"?????????\",\"id\":360726},{\"areaname\":\"?????????\",\"id\":360727},{\"areaname\":\"?????????\",\"id\":360728},{\"areaname\":\"?????????\",\"id\":360729},{\"areaname\":\"?????????\",\"id\":360730},{\"areaname\":\"?????????\",\"id\":360731},{\"areaname\":\"?????????\",\"id\":360732},{\"areaname\":\"?????????\",\"id\":360733},{\"areaname\":\"?????????\",\"id\":360734},{\"areaname\":\"?????????\",\"id\":360735},{\"areaname\":\"?????????\",\"id\":360781}],\"id\":360700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":360802},{\"areaname\":\"?????????\",\"id\":360803},{\"areaname\":\"?????????\",\"id\":360821},{\"areaname\":\"?????????\",\"id\":360822},{\"areaname\":\"?????????\",\"id\":360823},{\"areaname\":\"?????????\",\"id\":360824},{\"areaname\":\"?????????\",\"id\":360825},{\"areaname\":\"?????????\",\"id\":360826},{\"areaname\":\"?????????\",\"id\":360827},{\"areaname\":\"?????????\",\"id\":360828},{\"areaname\":\"?????????\",\"id\":360829},{\"areaname\":\"?????????\",\"id\":360830},{\"areaname\":\"????????????\",\"id\":360881}],\"id\":360800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":360902},{\"areaname\":\"?????????\",\"id\":360921},{\"areaname\":\"?????????\",\"id\":360922},{\"areaname\":\"?????????\",\"id\":360923},{\"areaname\":\"?????????\",\"id\":360924},{\"areaname\":\"?????????\",\"id\":360925},{\"areaname\":\"?????????\",\"id\":360926},{\"areaname\":\"?????????\",\"id\":360981},{\"areaname\":\"?????????\",\"id\":360982},{\"areaname\":\"?????????\",\"id\":360983}],\"id\":360900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":361002},{\"areaname\":\"?????????\",\"id\":361021},{\"areaname\":\"?????????\",\"id\":361022},{\"areaname\":\"?????????\",\"id\":361023},{\"areaname\":\"?????????\",\"id\":361024},{\"areaname\":\"?????????\",\"id\":361025},{\"areaname\":\"?????????\",\"id\":361026},{\"areaname\":\"?????????\",\"id\":361027},{\"areaname\":\"?????????\",\"id\":361028},{\"areaname\":\"?????????\",\"id\":361029},{\"areaname\":\"?????????\",\"id\":361030}],\"id\":361000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":361102},{\"areaname\":\"?????????\",\"id\":361103},{\"areaname\":\"?????????\",\"id\":361121},{\"areaname\":\"?????????\",\"id\":361123},{\"areaname\":\"?????????\",\"id\":361124},{\"areaname\":\"?????????\",\"id\":361125},{\"areaname\":\"?????????\",\"id\":361126},{\"areaname\":\"?????????\",\"id\":361127},{\"areaname\":\"?????????\",\"id\":361128},{\"areaname\":\"?????????\",\"id\":361129},{\"areaname\":\"?????????\",\"id\":361130},{\"areaname\":\"?????????\",\"id\":361181}],\"id\":361100}],\"id\":360000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":370102},{\"areaname\":\"?????????\",\"id\":370103},{\"areaname\":\"?????????\",\"id\":370104},{\"areaname\":\"?????????\",\"id\":370105},{\"areaname\":\"?????????\",\"id\":370112},{\"areaname\":\"?????????\",\"id\":370113},{\"areaname\":\"?????????\",\"id\":370124},{\"areaname\":\"?????????\",\"id\":370125},{\"areaname\":\"?????????\",\"id\":370126},{\"areaname\":\"?????????\",\"id\":370181}],\"id\":370100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":370202},{\"areaname\":\"?????????\",\"id\":370203},{\"areaname\":\"?????????(???????????????\",\"id\":370211},{\"areaname\":\"?????????\",\"id\":370212},{\"areaname\":\"?????????\",\"id\":370213},{\"areaname\":\"?????????\",\"id\":370214},{\"areaname\":\"?????????\",\"id\":370281},{\"areaname\":\"?????????\",\"id\":370282},{\"areaname\":\"?????????\",\"id\":370283},{\"areaname\":\"?????????\",\"id\":370285},{\"areaname\":\"???????????????\",\"id\":370286}],\"id\":370200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":370302},{\"areaname\":\"?????????\",\"id\":370303},{\"areaname\":\"?????????\",\"id\":370304},{\"areaname\":\"?????????\",\"id\":370305},{\"areaname\":\"?????????\",\"id\":370306},{\"areaname\":\"?????????\",\"id\":370321},{\"areaname\":\"?????????\",\"id\":370322},{\"areaname\":\"?????????\",\"id\":370323}],\"id\":370300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":370402},{\"areaname\":\"?????????\",\"id\":370403},{\"areaname\":\"?????????\",\"id\":370404},{\"areaname\":\"????????????\",\"id\":370405},{\"areaname\":\"?????????\",\"id\":370406},{\"areaname\":\"?????????\",\"id\":370481}],\"id\":370400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":370502},{\"areaname\":\"?????????\",\"id\":370503},{\"areaname\":\"?????????\",\"id\":370505},{\"areaname\":\"?????????\",\"id\":370522},{\"areaname\":\"?????????\",\"id\":370523}],\"id\":370500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":370602},{\"areaname\":\"?????????\",\"id\":370611},{\"areaname\":\"?????????\",\"id\":370612},{\"areaname\":\"?????????\",\"id\":370613},{\"areaname\":\"?????????\",\"id\":370634},{\"areaname\":\"?????????\",\"id\":370681},{\"areaname\":\"?????????\",\"id\":370682},{\"areaname\":\"?????????\",\"id\":370683},{\"areaname\":\"?????????\",\"id\":370684},{\"areaname\":\"?????????\",\"id\":370685},{\"areaname\":\"?????????\",\"id\":370686},{\"areaname\":\"?????????\",\"id\":370687}],\"id\":370600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":370702},{\"areaname\":\"?????????\",\"id\":370703},{\"areaname\":\"?????????\",\"id\":370704},{\"areaname\":\"?????????\",\"id\":370705},{\"areaname\":\"?????????\",\"id\":370724},{\"areaname\":\"?????????\",\"id\":370725},{\"areaname\":\"?????????\",\"id\":370781},{\"areaname\":\"?????????\",\"id\":370782},{\"areaname\":\"?????????\",\"id\":370783},{\"areaname\":\"?????????\",\"id\":370784},{\"areaname\":\"?????????\",\"id\":370785},{\"areaname\":\"?????????\",\"id\":370786}],\"id\":370700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":370811},{\"areaname\":\"?????????\",\"id\":370812},{\"areaname\":\"?????????\",\"id\":370826},{\"areaname\":\"?????????\",\"id\":370827},{\"areaname\":\"?????????\",\"id\":370828},{\"areaname\":\"?????????\",\"id\":370829},{\"areaname\":\"?????????\",\"id\":370830},{\"areaname\":\"?????????\",\"id\":370831},{\"areaname\":\"?????????\",\"id\":370832},{\"areaname\":\"?????????\",\"id\":370881},{\"areaname\":\"?????????\",\"id\":370883}],\"id\":370800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":370902},{\"areaname\":\"?????????\",\"id\":370911},{\"areaname\":\"?????????\",\"id\":370921},{\"areaname\":\"?????????\",\"id\":370923},{\"areaname\":\"?????????\",\"id\":370982},{\"areaname\":\"?????????\",\"id\":370983}],\"id\":370900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":371002},{\"areaname\":\"?????????\",\"id\":371003},{\"areaname\":\"?????????\",\"id\":371082},{\"areaname\":\"?????????\",\"id\":371083}],\"id\":371000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":371102},{\"areaname\":\"?????????\",\"id\":371103},{\"areaname\":\"?????????\",\"id\":371121},{\"areaname\":\"???  ???\",\"id\":371122}],\"id\":371100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":371202},{\"areaname\":\"?????????\",\"id\":371203}],\"id\":371200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":371302},{\"areaname\":\"?????????\",\"id\":371311},{\"areaname\":\"?????????\",\"id\":371312},{\"areaname\":\"?????????\",\"id\":371321},{\"areaname\":\"?????????\",\"id\":371322},{\"areaname\":\"?????????\",\"id\":371323},{\"areaname\":\"?????????\",\"id\":371324},{\"areaname\":\"???  ???\",\"id\":371325},{\"areaname\":\"?????????\",\"id\":371326},{\"areaname\":\"?????????\",\"id\":371327},{\"areaname\":\"?????????\",\"id\":371328},{\"areaname\":\"?????????\",\"id\":371329}],\"id\":371300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":371402},{\"areaname\":\"?????????\",\"id\":371403},{\"areaname\":\"?????????\",\"id\":371422},{\"areaname\":\"?????????\",\"id\":371423},{\"areaname\":\"?????????\",\"id\":371424},{\"areaname\":\"?????????\",\"id\":371425},{\"areaname\":\"?????????\",\"id\":371426},{\"areaname\":\"?????????\",\"id\":371427},{\"areaname\":\"?????????\",\"id\":371428},{\"areaname\":\"?????????\",\"id\":371481},{\"areaname\":\"?????????\",\"id\":371482}],\"id\":371400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":371502},{\"areaname\":\"?????????\",\"id\":371521},{\"areaname\":\"???  ???\",\"id\":371522},{\"areaname\":\"?????????\",\"id\":371523},{\"areaname\":\"?????????\",\"id\":371524},{\"areaname\":\"???  ???\",\"id\":371525},{\"areaname\":\"?????????\",\"id\":371526},{\"areaname\":\"?????????\",\"id\":371581}],\"id\":371500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":371602},{\"areaname\":\"?????????\",\"id\":371603},{\"areaname\":\"?????????\",\"id\":371621},{\"areaname\":\"?????????\",\"id\":371622},{\"areaname\":\"?????????\",\"id\":371623},{\"areaname\":\"?????????\",\"id\":371625},{\"areaname\":\"?????????\",\"id\":371626},{\"areaname\":\"????????????\",\"id\":371627},{\"areaname\":\"?????????\",\"id\":371628}],\"id\":371600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":371702},{\"areaname\":\"?????????\",\"id\":371703},{\"areaname\":\"???  ???\",\"id\":371721},{\"areaname\":\"???  ???\",\"id\":371722},{\"areaname\":\"?????????\",\"id\":371723},{\"areaname\":\"?????????\",\"id\":371724},{\"areaname\":\"?????????\",\"id\":371725},{\"areaname\":\"?????????\",\"id\":371726},{\"areaname\":\"?????????\",\"id\":371728}],\"id\":371700}],\"id\":370000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":410102},{\"areaname\":\"?????????\",\"id\":410103},{\"areaname\":\"???????????????\",\"id\":410104},{\"areaname\":\"?????????\",\"id\":410105},{\"areaname\":\"?????????\",\"id\":410106},{\"areaname\":\"?????????\",\"id\":410108},{\"areaname\":\"?????????\",\"id\":410122},{\"areaname\":\"?????????\",\"id\":410181},{\"areaname\":\"?????????\",\"id\":410182},{\"areaname\":\"?????????\",\"id\":410183},{\"areaname\":\"?????????\",\"id\":410184},{\"areaname\":\"?????????\",\"id\":410185}],\"id\":410100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":410202},{\"areaname\":\"???????????????\",\"id\":410203},{\"areaname\":\"?????????\",\"id\":410204},{\"areaname\":\"????????????\",\"id\":410205},{\"areaname\":\"?????????\",\"id\":410212},{\"areaname\":\"???  ???\",\"id\":410221},{\"areaname\":\"?????????\",\"id\":410222},{\"areaname\":\"?????????\",\"id\":410223},{\"areaname\":\"?????????\",\"id\":410225}],\"id\":410200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":410302},{\"areaname\":\"?????????\",\"id\":410303},{\"areaname\":\"???????????????\",\"id\":410304},{\"areaname\":\"?????????\",\"id\":410305},{\"areaname\":\"?????????\",\"id\":410306},{\"areaname\":\"?????????\",\"id\":410311},{\"areaname\":\"?????????\",\"id\":410322},{\"areaname\":\"?????????\",\"id\":410323},{\"areaname\":\"?????????\",\"id\":410324},{\"areaname\":\"???  ???\",\"id\":410325},{\"areaname\":\"?????????\",\"id\":410326},{\"areaname\":\"?????????\",\"id\":410327},{\"areaname\":\"?????????\",\"id\":410328},{\"areaname\":\"?????????\",\"id\":410329},{\"areaname\":\"?????????\",\"id\":410381}],\"id\":410300},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":410402},{\"areaname\":\"?????????\",\"id\":410403},{\"areaname\":\"?????????\",\"id\":410404},{\"areaname\":\"?????????\",\"id\":410411},{\"areaname\":\"?????????\",\"id\":410421},{\"areaname\":\"???  ???\",\"id\":410422},{\"areaname\":\"?????????\",\"id\":410423},{\"areaname\":\"???  ???\",\"id\":410425},{\"areaname\":\"?????????\",\"id\":410481},{\"areaname\":\"?????????\",\"id\":410482}],\"id\":410400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":410502},{\"areaname\":\"?????????\",\"id\":410503},{\"areaname\":\"?????????\",\"id\":410505},{\"areaname\":\"?????????\",\"id\":410506},{\"areaname\":\"?????????\",\"id\":410522},{\"areaname\":\"?????????\",\"id\":410523},{\"areaname\":\"???  ???\",\"id\":410526},{\"areaname\":\"?????????\",\"id\":410527},{\"areaname\":\"?????????\",\"id\":410581}],\"id\":410500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":410602},{\"areaname\":\"?????????\",\"id\":410603},{\"areaname\":\"?????????\",\"id\":410611},{\"areaname\":\"???  ???\",\"id\":410621},{\"areaname\":\"???  ???\",\"id\":410622}],\"id\":410600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":410702},{\"areaname\":\"????????? \",\"id\":410703},{\"areaname\":\"?????????\",\"id\":410704},{\"areaname\":\"?????????\",\"id\":410711},{\"areaname\":\"?????????\",\"id\":410721},{\"areaname\":\"?????????\",\"id\":410724},{\"areaname\":\"?????????\",\"id\":410725},{\"areaname\":\"?????????\",\"id\":410726},{\"areaname\":\"?????????\",\"id\":410727},{\"areaname\":\"?????????\",\"id\":410728},{\"areaname\":\"?????????\",\"id\":410781},{\"areaname\":\"?????????\",\"id\":410782}],\"id\":410700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":410802},{\"areaname\":\"?????????\",\"id\":410803},{\"areaname\":\"?????????\",\"id\":410804},{\"areaname\":\"?????????\",\"id\":410811},{\"areaname\":\"?????????\",\"id\":410821},{\"areaname\":\"?????????\",\"id\":410822},{\"areaname\":\"?????????\",\"id\":410823},{\"areaname\":\"??????\",\"id\":410825},{\"areaname\":\"?????????\",\"id\":410882},{\"areaname\":\"?????????\",\"id\":410883}],\"id\":410800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":410902},{\"areaname\":\"?????????\",\"id\":410922},{\"areaname\":\"?????????\",\"id\":410923},{\"areaname\":\"??????\",\"id\":410926},{\"areaname\":\"?????????\",\"id\":410927},{\"areaname\":\"?????????\",\"id\":410928}],\"id\":410900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":411002},{\"areaname\":\"?????????\",\"id\":411023},{\"areaname\":\"?????????\",\"id\":411024},{\"areaname\":\"?????????\",\"id\":411025},{\"areaname\":\"?????????\",\"id\":411081},{\"areaname\":\"?????????\",\"id\":411082}],\"id\":411000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":411102},{\"areaname\":\"?????????\",\"id\":411103},{\"areaname\":\"?????????\",\"id\":411104},{\"areaname\":\"?????????\",\"id\":411121},{\"areaname\":\"?????????\",\"id\":411122}],\"id\":411100},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":411202},{\"areaname\":\"?????????\",\"id\":411203},{\"areaname\":\"?????????\",\"id\":411221},{\"areaname\":\"??????\",\"id\":411222},{\"areaname\":\"?????????\",\"id\":411224},{\"areaname\":\"?????????\",\"id\":411281},{\"areaname\":\"?????????\",\"id\":411282}],\"id\":411200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":411302},{\"areaname\":\"?????????\",\"id\":411303},{\"areaname\":\"?????????\",\"id\":411321},{\"areaname\":\"?????????\",\"id\":411322},{\"areaname\":\"?????????\",\"id\":411323},{\"areaname\":\"?????????\",\"id\":411324},{\"areaname\":\"?????????\",\"id\":411325},{\"areaname\":\"?????????\",\"id\":411326},{\"areaname\":\"?????????\",\"id\":411327},{\"areaname\":\"?????????\",\"id\":411328},{\"areaname\":\"?????????\",\"id\":411329},{\"areaname\":\"?????????\",\"id\":411330},{\"areaname\":\"?????????\",\"id\":411381}],\"id\":411300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":411402},{\"areaname\":\"?????????\",\"id\":411403},{\"areaname\":\"?????????\",\"id\":411421},{\"areaname\":\"???  ???\",\"id\":411422},{\"areaname\":\"?????????\",\"id\":411423},{\"areaname\":\"?????????\",\"id\":411424},{\"areaname\":\"?????????\",\"id\":411425},{\"areaname\":\"?????????\",\"id\":411426},{\"areaname\":\"?????????\",\"id\":411481}],\"id\":411400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":411502},{\"areaname\":\"?????????\",\"id\":411503},{\"areaname\":\"?????????\",\"id\":411521},{\"areaname\":\"?????????\",\"id\":411522},{\"areaname\":\"???  ???\",\"id\":411523},{\"areaname\":\"?????????\",\"id\":411524},{\"areaname\":\"?????????\",\"id\":411525},{\"areaname\":\"?????????\",\"id\":411526},{\"areaname\":\"?????????\",\"id\":411527},{\"areaname\":\"???  ???\",\"id\":411528}],\"id\":411500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":411602},{\"areaname\":\"?????????\",\"id\":411621},{\"areaname\":\"?????????\",\"id\":411622},{\"areaname\":\"?????????\",\"id\":411623},{\"areaname\":\"?????????\",\"id\":411624},{\"areaname\":\"?????????\",\"id\":411625},{\"areaname\":\"?????????\",\"id\":411626},{\"areaname\":\"?????????\",\"id\":411627},{\"areaname\":\"?????????\",\"id\":411628},{\"areaname\":\"?????????\",\"id\":411681}],\"id\":411600},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":411702},{\"areaname\":\"?????????\",\"id\":411721},{\"areaname\":\"?????????\",\"id\":411722},{\"areaname\":\"?????????\",\"id\":411723},{\"areaname\":\"?????????\",\"id\":411724},{\"areaname\":\"?????????\",\"id\":411725},{\"areaname\":\"?????????\",\"id\":411726},{\"areaname\":\"?????????\",\"id\":411727},{\"areaname\":\"?????????\",\"id\":411728},{\"areaname\":\"?????????\",\"id\":411729}],\"id\":411700},{\"areaname\":\"????????????\",\"childArea\":[],\"id\":419000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":419001001},{\"areaname\":\"????????????\",\"id\":419001002},{\"areaname\":\"????????????\",\"id\":419001003},{\"areaname\":\"????????????\",\"id\":419001004},{\"areaname\":\"????????????\",\"id\":419001005},{\"areaname\":\"?????????\",\"id\":419001100},{\"areaname\":\"????????????\",\"id\":419001101},{\"areaname\":\"?????????\",\"id\":419001102},{\"areaname\":\"?????????\",\"id\":419001103},{\"areaname\":\"?????????\",\"id\":419001104},{\"areaname\":\"?????????\",\"id\":419001105},{\"areaname\":\"?????????\",\"id\":419001106},{\"areaname\":\"?????????\",\"id\":419001107},{\"areaname\":\"?????????\",\"id\":419001201},{\"areaname\":\"?????????\",\"id\":419001202},{\"areaname\":\"?????????\",\"id\":419001203}],\"id\":419001}],\"id\":410000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":420102},{\"areaname\":\"?????????\",\"id\":420103},{\"areaname\":\"?????????\",\"id\":420104},{\"areaname\":\"?????????\",\"id\":420105},{\"areaname\":\"?????????\",\"id\":420106},{\"areaname\":\"?????????\",\"id\":420107},{\"areaname\":\"?????????\",\"id\":420111},{\"areaname\":\"????????????\",\"id\":420112},{\"areaname\":\"?????????\",\"id\":420113},{\"areaname\":\"?????????\",\"id\":420114},{\"areaname\":\"?????????\",\"id\":420115},{\"areaname\":\"?????????\",\"id\":420116},{\"areaname\":\"?????????\",\"id\":420117}],\"id\":420100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":420202},{\"areaname\":\"????????????\",\"id\":420203},{\"areaname\":\"?????????\",\"id\":420204},{\"areaname\":\"?????????\",\"id\":420205},{\"areaname\":\"?????????\",\"id\":420222},{\"areaname\":\"?????????\",\"id\":420281}],\"id\":420200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":420302},{\"areaname\":\"?????????\",\"id\":420303},{\"areaname\":\"?????????\",\"id\":420304},{\"areaname\":\"?????????\",\"id\":420322},{\"areaname\":\"?????????\",\"id\":420323},{\"areaname\":\"?????????\",\"id\":420324},{\"areaname\":\"???  ???\",\"id\":420325},{\"areaname\":\"????????????\",\"id\":420381}],\"id\":420300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":420502},{\"areaname\":\"????????????\",\"id\":420503},{\"areaname\":\"?????????\",\"id\":420504},{\"areaname\":\"?????????\",\"id\":420505},{\"areaname\":\"?????????\",\"id\":420506},{\"areaname\":\"?????????\",\"id\":420525},{\"areaname\":\"?????????\",\"id\":420526},{\"areaname\":\"?????????\",\"id\":420527},{\"areaname\":\"????????????????????????\",\"id\":420528},{\"areaname\":\"????????????????????????\",\"id\":420529},{\"areaname\":\"?????????\",\"id\":420581},{\"areaname\":\"?????????\",\"id\":420582},{\"areaname\":\"?????????\",\"id\":420583}],\"id\":420500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":420602},{\"areaname\":\"?????????\",\"id\":420606},{\"areaname\":\"?????????\",\"id\":420607},{\"areaname\":\"?????????\",\"id\":420624},{\"areaname\":\"?????????\",\"id\":420625},{\"areaname\":\"?????????\",\"id\":420626},{\"areaname\":\"????????????\",\"id\":420682},{\"areaname\":\"?????????\",\"id\":420683},{\"areaname\":\"?????????\",\"id\":420684}],\"id\":420600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":420702},{\"areaname\":\"?????????\",\"id\":420703},{\"areaname\":\"?????????\",\"id\":420704}],\"id\":420700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":420802},{\"areaname\":\"?????????\",\"id\":420804},{\"areaname\":\"?????????\",\"id\":420821},{\"areaname\":\"?????????\",\"id\":420822},{\"areaname\":\"?????????\",\"id\":420881}],\"id\":420800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":420902},{\"areaname\":\"?????????\",\"id\":420921},{\"areaname\":\"?????????\",\"id\":420922},{\"areaname\":\"?????????\",\"id\":420923},{\"areaname\":\"?????????\",\"id\":420981},{\"areaname\":\"?????????\",\"id\":420982},{\"areaname\":\"?????????\",\"id\":420984}],\"id\":420900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":421002},{\"areaname\":\"?????????\",\"id\":421003},{\"areaname\":\"?????????\",\"id\":421022},{\"areaname\":\"?????????\",\"id\":421023},{\"areaname\":\"?????????\",\"id\":421024},{\"areaname\":\"?????????\",\"id\":421081},{\"areaname\":\"?????????\",\"id\":421083},{\"areaname\":\"?????????\",\"id\":421087}],\"id\":421000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":421102},{\"areaname\":\"?????????\",\"id\":421121},{\"areaname\":\"?????????\",\"id\":421122},{\"areaname\":\"?????????\",\"id\":421123},{\"areaname\":\"?????????\",\"id\":421124},{\"areaname\":\"?????????\",\"id\":421125},{\"areaname\":\"?????????\",\"id\":421126},{\"areaname\":\"?????????\",\"id\":421127},{\"areaname\":\"?????????\",\"id\":421181},{\"areaname\":\"?????????\",\"id\":421182}],\"id\":421100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":421202},{\"areaname\":\"?????????\",\"id\":421221},{\"areaname\":\"?????????\",\"id\":421222},{\"areaname\":\"?????????\",\"id\":421223},{\"areaname\":\"?????????\",\"id\":421224},{\"areaname\":\"?????????\",\"id\":421281}],\"id\":421200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":421303},{\"areaname\":\"??????\",\"id\":421321},{\"areaname\":\"?????????\",\"id\":421381}],\"id\":421300},{\"areaname\":\"??????????????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":422801},{\"areaname\":\"?????????\",\"id\":422802},{\"areaname\":\"?????????\",\"id\":422822},{\"areaname\":\"?????????\",\"id\":422823},{\"areaname\":\"?????????\",\"id\":422825},{\"areaname\":\"?????????\",\"id\":422826},{\"areaname\":\"?????????\",\"id\":422827},{\"areaname\":\"?????????\",\"id\":422828}],\"id\":422800},{\"areaname\":\"????????????\",\"childArea\":[],\"id\":429000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":429004001},{\"areaname\":\"???????????????\",\"id\":429004002},{\"areaname\":\"????????????\",\"id\":429004003},{\"areaname\":\"?????????\",\"id\":429004101},{\"areaname\":\"?????????\",\"id\":429004102},{\"areaname\":\"?????????\",\"id\":429004103},{\"areaname\":\"????????????\",\"id\":429004104},{\"areaname\":\"?????????\",\"id\":429004105},{\"areaname\":\"????????????\",\"id\":429004106},{\"areaname\":\"????????????\",\"id\":429004107},{\"areaname\":\"?????????\",\"id\":429004108},{\"areaname\":\"?????????\",\"id\":429004109},{\"areaname\":\"????????????\",\"id\":429004110},{\"areaname\":\"?????????\",\"id\":429004111},{\"areaname\":\"?????????\",\"id\":429004112},{\"areaname\":\"???????????????\",\"id\":429004113},{\"areaname\":\"????????????\",\"id\":429004114},{\"areaname\":\"?????????\",\"id\":429004115},{\"areaname\":\"???????????????????????????\",\"id\":429004201},{\"areaname\":\"???????????????\",\"id\":429004202},{\"areaname\":\"?????????\",\"id\":429004203},{\"areaname\":\"???????????????\",\"id\":429004301},{\"areaname\":\"??????????????????\",\"id\":429004302},{\"areaname\":\"???????????????\",\"id\":429004303}],\"id\":429004},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":429005001},{\"areaname\":\"????????????\",\"id\":429005002},{\"areaname\":\"????????????\",\"id\":429005003},{\"areaname\":\"????????????\",\"id\":429005004},{\"areaname\":\"????????????\",\"id\":429005005},{\"areaname\":\"????????????\",\"id\":429005006},{\"areaname\":\"?????????\",\"id\":429005101},{\"areaname\":\"????????????\",\"id\":429005102},{\"areaname\":\"????????????\",\"id\":429005103},{\"areaname\":\"?????????\",\"id\":429005104},{\"areaname\":\"?????????\",\"id\":429005105},{\"areaname\":\"?????????\",\"id\":429005106},{\"areaname\":\"?????????\",\"id\":429005107},{\"areaname\":\"?????????\",\"id\":429005108},{\"areaname\":\"????????????\",\"id\":429005109},{\"areaname\":\"?????????\",\"id\":429005110},{\"areaname\":\"??????????????????\",\"id\":429005201},{\"areaname\":\"???????????????\",\"id\":429005202},{\"areaname\":\"?????????????????????\",\"id\":429005203},{\"areaname\":\"??????????????????\",\"id\":429005204},{\"areaname\":\"???????????????\",\"id\":429005205},{\"areaname\":\"???????????????\",\"id\":429005206},{\"areaname\":\"???????????????\",\"id\":429005207}],\"id\":429005},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":429006001},{\"areaname\":\"????????????\",\"id\":429006002},{\"areaname\":\"????????????\",\"id\":429006003},{\"areaname\":\"?????????\",\"id\":429006101},{\"areaname\":\"?????????\",\"id\":429006102},{\"areaname\":\"?????????\",\"id\":429006103},{\"areaname\":\"?????????\",\"id\":429006104},{\"areaname\":\"?????????\",\"id\":429006105},{\"areaname\":\"?????????\",\"id\":429006106},{\"areaname\":\"?????????\",\"id\":429006107},{\"areaname\":\"?????????\",\"id\":429006108},{\"areaname\":\"?????????\",\"id\":429006109},{\"areaname\":\"?????????\",\"id\":429006110},{\"areaname\":\"?????????\",\"id\":429006111},{\"areaname\":\"?????????\",\"id\":429006112},{\"areaname\":\"?????????\",\"id\":429006113},{\"areaname\":\"?????????\",\"id\":429006114},{\"areaname\":\"?????????\",\"id\":429006115},{\"areaname\":\"?????????\",\"id\":429006116},{\"areaname\":\"????????????\",\"id\":429006117},{\"areaname\":\"????????????\",\"id\":429006118},{\"areaname\":\"?????????\",\"id\":429006119},{\"areaname\":\"?????????\",\"id\":429006120},{\"areaname\":\"?????????\",\"id\":429006121},{\"areaname\":\"?????????\",\"id\":429006122},{\"areaname\":\"????????????\",\"id\":429006301},{\"areaname\":\"????????????????????????\",\"id\":429006302},{\"areaname\":\"???????????????????????????\",\"id\":429006303}],\"id\":429006},{\"areaname\":\"???????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":429021101},{\"areaname\":\"?????????\",\"id\":429021102},{\"areaname\":\"?????????\",\"id\":429021103},{\"areaname\":\"?????????\",\"id\":429021104},{\"areaname\":\"?????????\",\"id\":429021105},{\"areaname\":\"?????????\",\"id\":429021106},{\"areaname\":\"?????????\",\"id\":429021107},{\"areaname\":\"?????????????????????\",\"id\":429021108}],\"id\":429021}],\"id\":420000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":430102},{\"areaname\":\"?????????\",\"id\":430103},{\"areaname\":\"?????????\",\"id\":430104},{\"areaname\":\"?????????\",\"id\":430105},{\"areaname\":\"?????????\",\"id\":430111},{\"areaname\":\"?????????\",\"id\":430112},{\"areaname\":\"?????????\",\"id\":430121},{\"areaname\":\"?????????\",\"id\":430124},{\"areaname\":\"?????????\",\"id\":430181}],\"id\":430100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":430202},{\"areaname\":\"?????????\",\"id\":430203},{\"areaname\":\"?????????\",\"id\":430204},{\"areaname\":\"?????????\",\"id\":430211},{\"areaname\":\"?????????\",\"id\":430221},{\"areaname\":\"???  ???\",\"id\":430223},{\"areaname\":\"?????????\",\"id\":430224},{\"areaname\":\"?????????\",\"id\":430225},{\"areaname\":\"?????????\",\"id\":430281}],\"id\":430200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":430302},{\"areaname\":\"?????????\",\"id\":430304},{\"areaname\":\"?????????\",\"id\":430321},{\"areaname\":\"?????????\",\"id\":430381},{\"areaname\":\"?????????\",\"id\":430382}],\"id\":430300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":430405},{\"areaname\":\"?????????\",\"id\":430406},{\"areaname\":\"?????????\",\"id\":430407},{\"areaname\":\"?????????\",\"id\":430408},{\"areaname\":\"?????????\",\"id\":430412},{\"areaname\":\"?????????\",\"id\":430421},{\"areaname\":\"?????????\",\"id\":430422},{\"areaname\":\"?????????\",\"id\":430423},{\"areaname\":\"?????????\",\"id\":430424},{\"areaname\":\"?????????\",\"id\":430426},{\"areaname\":\"?????????\",\"id\":430481},{\"areaname\":\"?????????\",\"id\":430482}],\"id\":430400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":430502},{\"areaname\":\"?????????\",\"id\":430503},{\"areaname\":\"?????????\",\"id\":430511},{\"areaname\":\"?????????\",\"id\":430521},{\"areaname\":\"?????????\",\"id\":430522},{\"areaname\":\"?????????\",\"id\":430523},{\"areaname\":\"?????????\",\"id\":430524},{\"areaname\":\"?????????\",\"id\":430525},{\"areaname\":\"?????????\",\"id\":430527},{\"areaname\":\"?????????\",\"id\":430528},{\"areaname\":\"?????????????????????\",\"id\":430529},{\"areaname\":\"?????????\",\"id\":430581}],\"id\":430500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":430602},{\"areaname\":\"?????????\",\"id\":430603},{\"areaname\":\"?????????\",\"id\":430611},{\"areaname\":\"?????????\",\"id\":430621},{\"areaname\":\"?????????\",\"id\":430623},{\"areaname\":\"?????????\",\"id\":430624},{\"areaname\":\"?????????\",\"id\":430626},{\"areaname\":\"?????????\",\"id\":430681},{\"areaname\":\"?????????\",\"id\":430682}],\"id\":430600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":430702},{\"areaname\":\"?????????\",\"id\":430703},{\"areaname\":\"?????????\",\"id\":430721},{\"areaname\":\"?????????\",\"id\":430722},{\"areaname\":\"???  ???\",\"id\":430723},{\"areaname\":\"?????????\",\"id\":430724},{\"areaname\":\"?????????\",\"id\":430725},{\"areaname\":\"?????????\",\"id\":430726},{\"areaname\":\"?????????\",\"id\":430781}],\"id\":430700},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":430802},{\"areaname\":\"????????????\",\"id\":430811},{\"areaname\":\"?????????\",\"id\":430821},{\"areaname\":\"?????????\",\"id\":430822}],\"id\":430800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":430902},{\"areaname\":\"?????????\",\"id\":430903},{\"areaname\":\"???  ???\",\"id\":430921},{\"areaname\":\"?????????\",\"id\":430922},{\"areaname\":\"?????????\",\"id\":430923},{\"areaname\":\"?????????\",\"id\":430981}],\"id\":430900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":431002},{\"areaname\":\"?????????\",\"id\":431003},{\"areaname\":\"?????????\",\"id\":431021},{\"areaname\":\"?????????\",\"id\":431022},{\"areaname\":\"?????????\",\"id\":431023},{\"areaname\":\"?????????\",\"id\":431024},{\"areaname\":\"?????????\",\"id\":431025},{\"areaname\":\"?????????\",\"id\":431026},{\"areaname\":\"?????????\",\"id\":431027},{\"areaname\":\"?????????\",\"id\":431028},{\"areaname\":\"?????????\",\"id\":431081}],\"id\":431000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":431102},{\"areaname\":\"????????????\",\"id\":431103},{\"areaname\":\"?????????\",\"id\":431121},{\"areaname\":\"?????????\",\"id\":431122},{\"areaname\":\"?????????\",\"id\":431123},{\"areaname\":\"???  ???\",\"id\":431124},{\"areaname\":\"?????????\",\"id\":431125},{\"areaname\":\"?????????\",\"id\":431126},{\"areaname\":\"?????????\",\"id\":431127},{\"areaname\":\"?????????\",\"id\":431128},{\"areaname\":\"?????????????????????\",\"id\":431129}],\"id\":431100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":431202},{\"areaname\":\"?????????\",\"id\":431221},{\"areaname\":\"?????????\",\"id\":431222},{\"areaname\":\"?????????\",\"id\":431223},{\"areaname\":\"?????????\",\"id\":431224},{\"areaname\":\"?????????\",\"id\":431225},{\"areaname\":\"?????????????????????\",\"id\":431226},{\"areaname\":\"?????????????????????\",\"id\":431227},{\"areaname\":\"?????????????????????\",\"id\":431228},{\"areaname\":\"???????????????????????????\",\"id\":431229},{\"areaname\":\"?????????????????????\",\"id\":431230},{\"areaname\":\"?????????\",\"id\":431281}],\"id\":431200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":431302},{\"areaname\":\"?????????\",\"id\":431321},{\"areaname\":\"?????????\",\"id\":431322},{\"areaname\":\"????????????\",\"id\":431381},{\"areaname\":\"?????????\",\"id\":431382}],\"id\":431300},{\"areaname\":\"??????????????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":433101},{\"areaname\":\"?????????\",\"id\":433122},{\"areaname\":\"?????????\",\"id\":433123},{\"areaname\":\"?????????\",\"id\":433124},{\"areaname\":\"?????????\",\"id\":433125},{\"areaname\":\"?????????\",\"id\":433126},{\"areaname\":\"?????????\",\"id\":433127},{\"areaname\":\"?????????\",\"id\":433130}],\"id\":433100}],\"id\":430000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????? \",\"id\":440103},{\"areaname\":\"?????????\",\"id\":440104},{\"areaname\":\"?????????\",\"id\":440105},{\"areaname\":\"?????????\",\"id\":440106},{\"areaname\":\"?????????\",\"id\":440111},{\"areaname\":\"?????????\",\"id\":440112},{\"areaname\":\"?????????\",\"id\":440113},{\"areaname\":\"?????????\",\"id\":440114},{\"areaname\":\"?????????\",\"id\":440115},{\"areaname\":\"?????????\",\"id\":440117},{\"areaname\":\"?????????\",\"id\":440118}],\"id\":440100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":440203},{\"areaname\":\"?????????\",\"id\":440204},{\"areaname\":\"?????????\",\"id\":440205},{\"areaname\":\"?????????\",\"id\":440222},{\"areaname\":\"?????????\",\"id\":440224},{\"areaname\":\"?????????\",\"id\":440229},{\"areaname\":\"?????????????????????\",\"id\":440232},{\"areaname\":\"?????????\",\"id\":440233},{\"areaname\":\"?????????\",\"id\":440281},{\"areaname\":\"?????????\",\"id\":440282}],\"id\":440200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":440303},{\"areaname\":\"?????????\",\"id\":440304},{\"areaname\":\"?????????\",\"id\":440305},{\"areaname\":\"?????????\",\"id\":440306},{\"areaname\":\"?????????\",\"id\":440307},{\"areaname\":\"?????????\",\"id\":440308},{\"areaname\":\"????????????\",\"id\":440309},{\"areaname\":\"????????????\",\"id\":440310},{\"areaname\":\"????????????\",\"id\":440311},{\"areaname\":\"????????????\",\"id\":440312}],\"id\":440300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":440402},{\"areaname\":\"?????????\",\"id\":440403},{\"areaname\":\"?????????\",\"id\":440404}],\"id\":440400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":440507},{\"areaname\":\"?????????\",\"id\":440511},{\"areaname\":\"?????????\",\"id\":440512},{\"areaname\":\"?????????\",\"id\":440513},{\"areaname\":\"?????????\",\"id\":440514},{\"areaname\":\"?????????\",\"id\":440515},{\"areaname\":\"?????????\",\"id\":440523}],\"id\":440500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":440604},{\"areaname\":\"?????????\",\"id\":440605},{\"areaname\":\"?????????\",\"id\":440606},{\"areaname\":\"?????????\",\"id\":440607},{\"areaname\":\"?????????\",\"id\":440608}],\"id\":440600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":440703},{\"areaname\":\"?????????\",\"id\":440704},{\"areaname\":\"?????????\",\"id\":440705},{\"areaname\":\"?????????\",\"id\":440781},{\"areaname\":\"?????????\",\"id\":440783},{\"areaname\":\"?????????\",\"id\":440784},{\"areaname\":\"?????????\",\"id\":440785}],\"id\":440700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":440802},{\"areaname\":\"?????????\",\"id\":440803},{\"areaname\":\"?????????\",\"id\":440804},{\"areaname\":\"?????????\",\"id\":440811},{\"areaname\":\"?????????\",\"id\":440823},{\"areaname\":\"?????????\",\"id\":440825},{\"areaname\":\"?????????\",\"id\":440881},{\"areaname\":\"?????????\",\"id\":440882},{\"areaname\":\"?????????\",\"id\":440883}],\"id\":440800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":440902},{\"areaname\":\"?????????\",\"id\":440904},{\"areaname\":\"?????????\",\"id\":440981},{\"areaname\":\"?????????\",\"id\":440982},{\"areaname\":\"?????????\",\"id\":440983}],\"id\":440900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":441202},{\"areaname\":\"?????????\",\"id\":441203},{\"areaname\":\"?????????\",\"id\":441204},{\"areaname\":\"?????????\",\"id\":441223},{\"areaname\":\"?????????\",\"id\":441224},{\"areaname\":\"?????????\",\"id\":441225},{\"areaname\":\"?????????\",\"id\":441226},{\"areaname\":\"?????????\",\"id\":441284}],\"id\":441200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":441302},{\"areaname\":\"?????????\",\"id\":441303},{\"areaname\":\"?????????\",\"id\":441322},{\"areaname\":\"?????????\",\"id\":441323},{\"areaname\":\"?????????\",\"id\":441324}],\"id\":441300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":441402},{\"areaname\":\"?????????\",\"id\":441403},{\"areaname\":\"?????????\",\"id\":441422},{\"areaname\":\"?????????\",\"id\":441423},{\"areaname\":\"?????????\",\"id\":441424},{\"areaname\":\"?????????\",\"id\":441426},{\"areaname\":\"?????????\",\"id\":441427},{\"areaname\":\"?????????\",\"id\":441481}],\"id\":441400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"???  ???\",\"id\":441502},{\"areaname\":\"?????????\",\"id\":441521},{\"areaname\":\"?????????\",\"id\":441523},{\"areaname\":\"?????????\",\"id\":441581}],\"id\":441500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":441602},{\"areaname\":\"?????????\",\"id\":441621},{\"areaname\":\"?????????\",\"id\":441622},{\"areaname\":\"?????????\",\"id\":441623},{\"areaname\":\"?????????\",\"id\":441624},{\"areaname\":\"?????????\",\"id\":441625}],\"id\":441600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":441702},{\"areaname\":\"?????????\",\"id\":441704},{\"areaname\":\"?????????\",\"id\":441721},{\"areaname\":\"?????????\",\"id\":441781}],\"id\":441700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":441802},{\"areaname\":\"?????????\",\"id\":441803},{\"areaname\":\"?????????\",\"id\":441821},{\"areaname\":\"?????????\",\"id\":441823},{\"areaname\":\"???????????????????????????\",\"id\":441825},{\"areaname\":\"?????????????????????\",\"id\":441826},{\"areaname\":\"?????????\",\"id\":441881},{\"areaname\":\"?????????\",\"id\":441882}],\"id\":441800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":441901},{\"areaname\":\"?????????\",\"id\":441902},{\"areaname\":\"?????????\",\"id\":441904},{\"areaname\":\"?????????\",\"id\":441905},{\"areaname\":\"?????????\",\"id\":441906},{\"areaname\":\"?????????\",\"id\":441907},{\"areaname\":\"?????????\",\"id\":441908},{\"areaname\":\"?????????\",\"id\":441909},{\"areaname\":\"?????????\",\"id\":441910},{\"areaname\":\"?????????\",\"id\":441911},{\"areaname\":\"?????????\",\"id\":441912},{\"areaname\":\"?????????\",\"id\":441913},{\"areaname\":\"?????????\",\"id\":441914},{\"areaname\":\"?????????\",\"id\":441915},{\"areaname\":\"?????????\",\"id\":441916},{\"areaname\":\"?????????\",\"id\":441917},{\"areaname\":\"?????????\",\"id\":441918},{\"areaname\":\"?????????\",\"id\":441919},{\"areaname\":\"????????????\",\"id\":441920},{\"areaname\":\"????????????\",\"id\":441921},{\"areaname\":\"????????????\",\"id\":441922},{\"areaname\":\"?????????\",\"id\":441923},{\"areaname\":\"?????????\",\"id\":441924},{\"areaname\":\"?????????\",\"id\":441925},{\"areaname\":\"?????????\",\"id\":441926},{\"areaname\":\"?????????\",\"id\":441927},{\"areaname\":\"?????????\",\"id\":441928},{\"areaname\":\"?????????\",\"id\":441929},{\"areaname\":\"?????????\",\"id\":441930},{\"areaname\":\"?????????\",\"id\":441931},{\"areaname\":\"?????????\",\"id\":441932}],\"id\":441900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":442001},{\"areaname\":\"??????\",\"id\":442004},{\"areaname\":\"????????????\",\"id\":442005},{\"areaname\":\"???????????????\",\"id\":442006},{\"areaname\":\"?????????\",\"id\":442007},{\"areaname\":\"?????????\",\"id\":442008},{\"areaname\":\"?????????\",\"id\":442009},{\"areaname\":\"?????????\",\"id\":442010},{\"areaname\":\"?????????\",\"id\":442011},{\"areaname\":\"?????????\",\"id\":442012},{\"areaname\":\"?????????\",\"id\":442013},{\"areaname\":\"?????????\",\"id\":442014},{\"areaname\":\"?????????\",\"id\":442015},{\"areaname\":\"?????????\",\"id\":442016},{\"areaname\":\"?????????\",\"id\":442017},{\"areaname\":\"?????????\",\"id\":442018},{\"areaname\":\"?????????\",\"id\":442019},{\"areaname\":\"?????????\",\"id\":442020},{\"areaname\":\"?????????\",\"id\":442021},{\"areaname\":\"?????????\",\"id\":442022},{\"areaname\":\"?????????\",\"id\":442023},{\"areaname\":\"?????????\",\"id\":442024}],\"id\":442000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":445102},{\"areaname\":\"?????????\",\"id\":445103},{\"areaname\":\"?????????\",\"id\":445122}],\"id\":445100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":445202},{\"areaname\":\"?????????\",\"id\":445203},{\"areaname\":\"?????????\",\"id\":445222},{\"areaname\":\"?????????\",\"id\":445224},{\"areaname\":\"?????????\",\"id\":445281}],\"id\":445200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":445302},{\"areaname\":\"?????????\",\"id\":445303},{\"areaname\":\"?????????\",\"id\":445321},{\"areaname\":\"?????????\",\"id\":445322},{\"areaname\":\"?????????\",\"id\":445381}],\"id\":445300}],\"id\":440000},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":450102},{\"areaname\":\"?????????\",\"id\":450103},{\"areaname\":\"?????????\",\"id\":450105},{\"areaname\":\"????????????\",\"id\":450107},{\"areaname\":\"?????????\",\"id\":450108},{\"areaname\":\"?????????\",\"id\":450109},{\"areaname\":\"?????????\",\"id\":450110},{\"areaname\":\"?????????\",\"id\":450123},{\"areaname\":\"?????????\",\"id\":450124},{\"areaname\":\"?????????\",\"id\":450125},{\"areaname\":\"?????????\",\"id\":450126},{\"areaname\":\"??????\",\"id\":450127},{\"areaname\":\"????????????\",\"id\":450128}],\"id\":450100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":450202},{\"areaname\":\"?????????\",\"id\":450203},{\"areaname\":\"?????????\",\"id\":450204},{\"areaname\":\"?????????\",\"id\":450205},{\"areaname\":\"?????????\",\"id\":450206},{\"areaname\":\"?????????\",\"id\":450222},{\"areaname\":\"?????????\",\"id\":450223},{\"areaname\":\"?????????\",\"id\":450224},{\"areaname\":\"?????????????????????\",\"id\":450225},{\"areaname\":\"?????????????????????\",\"id\":450226},{\"areaname\":\"????????????\",\"id\":450227}],\"id\":450200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":450302},{\"areaname\":\"?????????\",\"id\":450303},{\"areaname\":\"?????????\",\"id\":450304},{\"areaname\":\"?????????\",\"id\":450305},{\"areaname\":\"?????????\",\"id\":450311},{\"areaname\":\"?????????\",\"id\":450312},{\"areaname\":\"?????????\",\"id\":450321},{\"areaname\":\"?????????\",\"id\":450323},{\"areaname\":\"?????????\",\"id\":450324},{\"areaname\":\"?????????\",\"id\":450325},{\"areaname\":\"?????????\",\"id\":450326},{\"areaname\":\"?????????\",\"id\":450327},{\"areaname\":\"?????????????????????\",\"id\":450328},{\"areaname\":\"?????????\",\"id\":450329},{\"areaname\":\"?????????\",\"id\":450330},{\"areaname\":\"?????????\",\"id\":450331},{\"areaname\":\"?????????????????????\",\"id\":450332}],\"id\":450300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":450403},{\"areaname\":\"?????????\",\"id\":450405},{\"areaname\":\"?????????\",\"id\":450406},{\"areaname\":\"?????????\",\"id\":450421},{\"areaname\":\"??????\",\"id\":450422},{\"areaname\":\"?????????\",\"id\":450423},{\"areaname\":\"?????????\",\"id\":450481}],\"id\":450400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":450502},{\"areaname\":\"?????????\",\"id\":450503},{\"areaname\":\"????????????\",\"id\":450512},{\"areaname\":\"?????????\",\"id\":450521}],\"id\":450500},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":450602},{\"areaname\":\"?????????\",\"id\":450603},{\"areaname\":\"?????????\",\"id\":450621},{\"areaname\":\"?????????\",\"id\":450681}],\"id\":450600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":450702},{\"areaname\":\"?????????\",\"id\":450703},{\"areaname\":\"?????????\",\"id\":450721},{\"areaname\":\"?????????\",\"id\":450722}],\"id\":450700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":450802},{\"areaname\":\"?????????\",\"id\":450803},{\"areaname\":\"?????????\",\"id\":450804},{\"areaname\":\"?????????\",\"id\":450821},{\"areaname\":\"?????????\",\"id\":450881}],\"id\":450800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":450902},{\"areaname\":\"?????????\",\"id\":450903},{\"areaname\":\"????????????\",\"id\":450904},{\"areaname\":\"??????\",\"id\":450921},{\"areaname\":\"?????????\",\"id\":450922},{\"areaname\":\"?????????\",\"id\":450923},{\"areaname\":\"?????????\",\"id\":450924},{\"areaname\":\"?????????\",\"id\":450981}],\"id\":450900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":451002},{\"areaname\":\"?????????\",\"id\":451021},{\"areaname\":\"?????????\",\"id\":451022},{\"areaname\":\"?????????\",\"id\":451023},{\"areaname\":\"?????????\",\"id\":451024},{\"areaname\":\"?????????\",\"id\":451026},{\"areaname\":\"?????????\",\"id\":451027},{\"areaname\":\"?????????\",\"id\":451028},{\"areaname\":\"?????????\",\"id\":451029},{\"areaname\":\"?????????\",\"id\":451030},{\"areaname\":\"?????????????????????\",\"id\":451031},{\"areaname\":\"?????????\",\"id\":451081}],\"id\":451000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":451102},{\"areaname\":\"?????????\",\"id\":451103},{\"areaname\":\"?????????\",\"id\":451121},{\"areaname\":\"?????????\",\"id\":451122},{\"areaname\":\"?????????????????????\",\"id\":451123}],\"id\":451100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":451202},{\"areaname\":\"?????????\",\"id\":451221},{\"areaname\":\"?????????\",\"id\":451222},{\"areaname\":\"?????????\",\"id\":451223},{\"areaname\":\"?????????\",\"id\":451224},{\"areaname\":\"????????????????????????\",\"id\":451225},{\"areaname\":\"????????????????????????\",\"id\":451226},{\"areaname\":\"?????????????????????\",\"id\":451227},{\"areaname\":\"?????????????????????\",\"id\":451228},{\"areaname\":\"?????????????????????\",\"id\":451229},{\"areaname\":\"?????????\",\"id\":451281}],\"id\":451200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":451302},{\"areaname\":\"?????????\",\"id\":451321},{\"areaname\":\"?????????\",\"id\":451322},{\"areaname\":\"?????????\",\"id\":451323},{\"areaname\":\"?????????????????????\",\"id\":451324},{\"areaname\":\"?????????\",\"id\":451381}],\"id\":451300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":451402},{\"areaname\":\"?????????\",\"id\":451421},{\"areaname\":\"?????????\",\"id\":451422},{\"areaname\":\"?????????\",\"id\":451423},{\"areaname\":\"?????????\",\"id\":451424},{\"areaname\":\"?????????\",\"id\":451425},{\"areaname\":\"?????????\",\"id\":451481}],\"id\":451400}],\"id\":450000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":460105},{\"areaname\":\"?????????\",\"id\":460106},{\"areaname\":\"?????????\",\"id\":460107},{\"areaname\":\"?????????\",\"id\":460108}],\"id\":460100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":460202},{\"areaname\":\"?????????\",\"id\":460203},{\"areaname\":\"?????????\",\"id\":460204},{\"areaname\":\"?????????\",\"id\":460205}],\"id\":460200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":460321},{\"areaname\":\"????????????\",\"id\":460322},{\"areaname\":\"????????????\",\"id\":460323}],\"id\":460300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":460400101},{\"areaname\":\"?????????\",\"id\":460400102},{\"areaname\":\"?????????\",\"id\":460400103},{\"areaname\":\"?????????\",\"id\":460400104},{\"areaname\":\"?????????\",\"id\":460400105},{\"areaname\":\"?????????\",\"id\":460400106},{\"areaname\":\"?????????\",\"id\":460400107},{\"areaname\":\"?????????\",\"id\":460400108},{\"areaname\":\"?????????\",\"id\":460400109},{\"areaname\":\"?????????\",\"id\":460400110},{\"areaname\":\"?????????\",\"id\":460400111},{\"areaname\":\"?????????\",\"id\":460400112},{\"areaname\":\"????????????\",\"id\":460400113},{\"areaname\":\"?????????\",\"id\":460400114},{\"areaname\":\"?????????\",\"id\":460400115},{\"areaname\":\"?????????\",\"id\":460400116},{\"areaname\":\"?????????\",\"id\":460400117},{\"areaname\":\"????????????\",\"id\":460400301},{\"areaname\":\"????????????\",\"id\":460400302},{\"areaname\":\"????????????\",\"id\":460400303},{\"areaname\":\"????????????\",\"id\":460400304},{\"areaname\":\"????????????\",\"id\":460400305},{\"areaname\":\"????????????\",\"id\":460400306},{\"areaname\":\"????????????\",\"id\":460400307},{\"areaname\":\"????????????\",\"id\":460400308},{\"areaname\":\"????????????\",\"id\":460400309},{\"areaname\":\"????????????\",\"id\":460400310}],\"id\":460400},{\"areaname\":\"????????????\",\"childArea\":[],\"id\":469000},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":469001101},{\"areaname\":\"?????????\",\"id\":469001102},{\"areaname\":\"?????????\",\"id\":469001103},{\"areaname\":\"?????????\",\"id\":469001104},{\"areaname\":\"?????????\",\"id\":469001105},{\"areaname\":\"?????????\",\"id\":469001106},{\"areaname\":\"?????????\",\"id\":469001107},{\"areaname\":\"????????????\",\"id\":469001301}],\"id\":469001},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":469002101},{\"areaname\":\"?????????\",\"id\":469002102},{\"areaname\":\"?????????\",\"id\":469002103},{\"areaname\":\"?????????\",\"id\":469002104},{\"areaname\":\"?????????\",\"id\":469002105},{\"areaname\":\"?????????\",\"id\":469002106},{\"areaname\":\"?????????\",\"id\":469002107},{\"areaname\":\"?????????\",\"id\":469002108},{\"areaname\":\"?????????\",\"id\":469002109},{\"areaname\":\"?????????\",\"id\":469002110},{\"areaname\":\"?????????\",\"id\":469002111},{\"areaname\":\"?????????\",\"id\":469002112},{\"areaname\":\"?????????????????????\",\"id\":469002301},{\"areaname\":\"????????????\",\"id\":469002302},{\"areaname\":\"????????????\",\"id\":469002303},{\"areaname\":\"????????????\",\"id\":469002304},{\"areaname\":\"????????????\",\"id\":469002305}],\"id\":469002},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":469005101},{\"areaname\":\"?????????\",\"id\":469005102},{\"areaname\":\"?????????\",\"id\":469005103},{\"areaname\":\"?????????\",\"id\":469005104},{\"areaname\":\"?????????\",\"id\":469005105},{\"areaname\":\"?????????\",\"id\":469005106},{\"areaname\":\"?????????\",\"id\":469005107},{\"areaname\":\"?????????\",\"id\":469005108},{\"areaname\":\"?????????\",\"id\":469005109},{\"areaname\":\"?????????\",\"id\":469005110},{\"areaname\":\"?????????\",\"id\":469005111},{\"areaname\":\"?????????\",\"id\":469005112},{\"areaname\":\"?????????\",\"id\":469005113},{\"areaname\":\"?????????\",\"id\":469005114},{\"areaname\":\"?????????\",\"id\":469005115},{\"areaname\":\"?????????\",\"id\":469005116},{\"areaname\":\"?????????\",\"id\":469005117},{\"areaname\":\"?????????\",\"id\":469005118},{\"areaname\":\"?????????\",\"id\":469005119},{\"areaname\":\"?????????\",\"id\":469005120},{\"areaname\":\"?????????\",\"id\":469005121},{\"areaname\":\"?????????\",\"id\":469005122},{\"areaname\":\"?????????\",\"id\":469005123},{\"areaname\":\"?????????\",\"id\":469005124},{\"areaname\":\"?????????\",\"id\":469005125},{\"areaname\":\"????????????\",\"id\":469005301},{\"areaname\":\"????????????\",\"id\":469005302},{\"areaname\":\"????????????\",\"id\":469005303},{\"areaname\":\"???????????????\",\"id\":469005304}],\"id\":469005},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":469006101},{\"areaname\":\"?????????\",\"id\":469006102},{\"areaname\":\"?????????\",\"id\":469006103},{\"areaname\":\"?????????\",\"id\":469006104},{\"areaname\":\"?????????\",\"id\":469006105},{\"areaname\":\"?????????\",\"id\":469006106},{\"areaname\":\"?????????\",\"id\":469006107},{\"areaname\":\"?????????\",\"id\":469006108},{\"areaname\":\"?????????\",\"id\":469006109},{\"areaname\":\"?????????\",\"id\":469006110},{\"areaname\":\"?????????\",\"id\":469006111},{\"areaname\":\"?????????\",\"id\":469006112},{\"areaname\":\"????????????\",\"id\":469006113},{\"areaname\":\"????????????\",\"id\":469006301},{\"areaname\":\"????????????\",\"id\":469006302},{\"areaname\":\"????????????\",\"id\":469006303},{\"areaname\":\"????????????\",\"id\":469006304},{\"areaname\":\"????????????\",\"id\":469006305},{\"areaname\":\"??????????????????\",\"id\":469006306}],\"id\":469006},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":469007101},{\"areaname\":\"?????????\",\"id\":469007102},{\"areaname\":\"?????????\",\"id\":469007103},{\"areaname\":\"?????????\",\"id\":469007104},{\"areaname\":\"?????????\",\"id\":469007105},{\"areaname\":\"?????????\",\"id\":469007106},{\"areaname\":\"?????????\",\"id\":469007107},{\"areaname\":\"?????????\",\"id\":469007108},{\"areaname\":\"?????????\",\"id\":469007109},{\"areaname\":\"?????????\",\"id\":469007110},{\"areaname\":\"????????????\",\"id\":469007301},{\"areaname\":\"??????????????????\",\"id\":469007302}],\"id\":469007},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":469021101},{\"areaname\":\"?????????\",\"id\":469021102},{\"areaname\":\"?????????\",\"id\":469021103},{\"areaname\":\"?????????\",\"id\":469021104},{\"areaname\":\"?????????\",\"id\":469021105},{\"areaname\":\"?????????\",\"id\":469021106},{\"areaname\":\"?????????\",\"id\":469021107},{\"areaname\":\"?????????\",\"id\":469021108},{\"areaname\":\"?????????\",\"id\":469021109},{\"areaname\":\"?????????\",\"id\":469021110},{\"areaname\":\"???????????????\",\"id\":469021301},{\"areaname\":\"????????????\",\"id\":469021302},{\"areaname\":\"????????????\",\"id\":469021303}],\"id\":469021},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":469022101},{\"areaname\":\"?????????\",\"id\":469022102},{\"areaname\":\"?????????\",\"id\":469022103},{\"areaname\":\"?????????\",\"id\":469022104},{\"areaname\":\"?????????\",\"id\":469022105},{\"areaname\":\"?????????\",\"id\":469022106},{\"areaname\":\"?????????\",\"id\":469022107},{\"areaname\":\"?????????\",\"id\":469022108},{\"areaname\":\"????????????\",\"id\":469022301},{\"areaname\":\"????????????\",\"id\":469022302}],\"id\":469022},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":469023101},{\"areaname\":\"?????????\",\"id\":469023102},{\"areaname\":\"?????????\",\"id\":469023103},{\"areaname\":\"?????????\",\"id\":469023104},{\"areaname\":\"?????????\",\"id\":469023105},{\"areaname\":\"?????????\",\"id\":469023106},{\"areaname\":\"?????????\",\"id\":469023107},{\"areaname\":\"?????????\",\"id\":469023108},{\"areaname\":\"?????????\",\"id\":469023109},{\"areaname\":\"?????????\",\"id\":469023110},{\"areaname\":\"?????????\",\"id\":469023111}],\"id\":469023},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":469024101},{\"areaname\":\"?????????\",\"id\":469024102},{\"areaname\":\"?????????\",\"id\":469024103},{\"areaname\":\"?????????\",\"id\":469024104},{\"areaname\":\"?????????\",\"id\":469024105},{\"areaname\":\"?????????\",\"id\":469024106},{\"areaname\":\"?????????\",\"id\":469024107},{\"areaname\":\"?????????\",\"id\":469024108},{\"areaname\":\"?????????\",\"id\":469024109},{\"areaname\":\"?????????\",\"id\":469024110},{\"areaname\":\"?????????\",\"id\":469024111},{\"areaname\":\"????????????\",\"id\":469024301},{\"areaname\":\"????????????\",\"id\":469024302},{\"areaname\":\"????????????\",\"id\":469024303}],\"id\":469024},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":469025101},{\"areaname\":\"?????????\",\"id\":469025102},{\"areaname\":\"?????????\",\"id\":469025103},{\"areaname\":\"?????????\",\"id\":469025104},{\"areaname\":\"?????????\",\"id\":469025105},{\"areaname\":\"?????????\",\"id\":469025106},{\"areaname\":\"?????????\",\"id\":469025107},{\"areaname\":\"?????????\",\"id\":469025108},{\"areaname\":\"?????????\",\"id\":469025109},{\"areaname\":\"?????????\",\"id\":469025110},{\"areaname\":\"?????????\",\"id\":469025111},{\"areaname\":\"????????????\",\"id\":469025301},{\"areaname\":\"????????????\",\"id\":469025302},{\"areaname\":\"????????????\",\"id\":469025303}],\"id\":469025},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":469026101},{\"areaname\":\"?????????\",\"id\":469026102},{\"areaname\":\"????????????\",\"id\":469026103},{\"areaname\":\"?????????\",\"id\":469026104},{\"areaname\":\"?????????\",\"id\":469026105},{\"areaname\":\"?????????\",\"id\":469026106},{\"areaname\":\"?????????\",\"id\":469026107},{\"areaname\":\"?????????\",\"id\":469026108},{\"areaname\":\"????????????\",\"id\":469026301},{\"areaname\":\"??????????????????\",\"id\":469026302},{\"areaname\":\"???????????????\",\"id\":469026303}],\"id\":469026},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":469027101},{\"areaname\":\"?????????\",\"id\":469027102},{\"areaname\":\"?????????\",\"id\":469027103},{\"areaname\":\"?????????\",\"id\":469027104},{\"areaname\":\"?????????\",\"id\":469027105},{\"areaname\":\"?????????\",\"id\":469027106},{\"areaname\":\"?????????\",\"id\":469027107},{\"areaname\":\"?????????\",\"id\":469027108},{\"areaname\":\"?????????\",\"id\":469027109},{\"areaname\":\"?????????\",\"id\":469027110},{\"areaname\":\"????????????\",\"id\":469027111},{\"areaname\":\"????????????\",\"id\":469027302},{\"areaname\":\"????????????\",\"id\":469027303},{\"areaname\":\"????????????\",\"id\":469027306},{\"areaname\":\"?????????????????????\",\"id\":469027308},{\"areaname\":\"???????????????\",\"id\":469027309}],\"id\":469027},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":469028101},{\"areaname\":\"?????????\",\"id\":469028102},{\"areaname\":\"?????????\",\"id\":469028103},{\"areaname\":\"?????????\",\"id\":469028104},{\"areaname\":\"?????????\",\"id\":469028105},{\"areaname\":\"?????????\",\"id\":469028106},{\"areaname\":\"?????????\",\"id\":469028107},{\"areaname\":\"?????????\",\"id\":469028108},{\"areaname\":\"?????????\",\"id\":469028109},{\"areaname\":\"?????????\",\"id\":469028110},{\"areaname\":\"?????????\",\"id\":469028111}],\"id\":469028},{\"areaname\":\"???????????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":469029101},{\"areaname\":\"?????????\",\"id\":469029102},{\"areaname\":\"?????????\",\"id\":469029103},{\"areaname\":\"?????????\",\"id\":469029104},{\"areaname\":\"?????????\",\"id\":469029105},{\"areaname\":\"?????????\",\"id\":469029106},{\"areaname\":\"?????????\",\"id\":469029107},{\"areaname\":\"?????????\",\"id\":469029108},{\"areaname\":\"?????????\",\"id\":469029109},{\"areaname\":\"???????????????\",\"id\":469029301},{\"areaname\":\"????????????\",\"id\":469029302},{\"areaname\":\"????????????\",\"id\":469029303},{\"areaname\":\"????????????\",\"id\":469029304}],\"id\":469029},{\"areaname\":\"???????????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":469030101},{\"areaname\":\"?????????\",\"id\":469030102},{\"areaname\":\"????????????\",\"id\":469030103},{\"areaname\":\"?????????\",\"id\":469030104},{\"areaname\":\"?????????\",\"id\":469030105},{\"areaname\":\"?????????\",\"id\":469030106},{\"areaname\":\"?????????\",\"id\":469030107},{\"areaname\":\"?????????\",\"id\":469030108},{\"areaname\":\"?????????\",\"id\":469030109},{\"areaname\":\"????????????\",\"id\":469030110},{\"areaname\":\"????????????\",\"id\":469030301},{\"areaname\":\"????????????\",\"id\":469030302},{\"areaname\":\"????????????\",\"id\":469030303},{\"areaname\":\"????????????\",\"id\":469030304},{\"areaname\":\"?????????????????????\",\"id\":469030305}],\"id\":469030}],\"id\":460000},{\"areaname\":\"??????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":500101},{\"areaname\":\"?????????\",\"id\":500102},{\"areaname\":\"?????????\",\"id\":500103},{\"areaname\":\"????????????\",\"id\":500104},{\"areaname\":\"?????????\",\"id\":500105},{\"areaname\":\"????????????\",\"id\":500106},{\"areaname\":\"????????????\",\"id\":500107},{\"areaname\":\"?????????\",\"id\":500108},{\"areaname\":\"?????????\",\"id\":500109},{\"areaname\":\"?????????\",\"id\":500110},{\"areaname\":\"?????????\",\"id\":500111},{\"areaname\":\"?????????\",\"id\":500112},{\"areaname\":\"?????????\",\"id\":500113},{\"areaname\":\"?????????\",\"id\":500114},{\"areaname\":\"?????????\",\"id\":500115},{\"areaname\":\"?????????\",\"id\":500116},{\"areaname\":\"?????????\",\"id\":500117},{\"areaname\":\"?????????\",\"id\":500118},{\"areaname\":\"?????????\",\"id\":500119},{\"areaname\":\"?????????\",\"id\":500120},{\"areaname\":\"?????????\",\"id\":500151},{\"areaname\":\"?????????\",\"id\":500152},{\"areaname\":\"?????????\",\"id\":500153},{\"areaname\":\"?????????\",\"id\":500154},{\"areaname\":\"?????????\",\"id\":500228},{\"areaname\":\"?????????\",\"id\":500229},{\"areaname\":\"?????????\",\"id\":500230},{\"areaname\":\"?????????\",\"id\":500231},{\"areaname\":\"?????????\",\"id\":500232},{\"areaname\":\"??????\",\"id\":500233},{\"areaname\":\"??????\",\"id\":500234},{\"areaname\":\"?????????\",\"id\":500235},{\"areaname\":\"?????????\",\"id\":500236},{\"areaname\":\"?????????\",\"id\":500237},{\"areaname\":\"?????????\",\"id\":500238},{\"areaname\":\"????????????????????????\",\"id\":500240},{\"areaname\":\"??????????????????????????????\",\"id\":500241},{\"areaname\":\"??????????????????????????????\",\"id\":500242},{\"areaname\":\"??????????????????????????????\",\"id\":500243}],\"id\":500100},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":500301},{\"areaname\":\"????????????\",\"id\":500302},{\"areaname\":\"????????????\",\"id\":500303}],\"id\":500300}],\"id\":500000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":510104},{\"areaname\":\"?????????\",\"id\":510105},{\"areaname\":\"?????????\",\"id\":510106},{\"areaname\":\"?????????\",\"id\":510107},{\"areaname\":\"?????????\",\"id\":510108},{\"areaname\":\"????????????\",\"id\":510112},{\"areaname\":\"????????????\",\"id\":510113},{\"areaname\":\"?????????\",\"id\":510114},{\"areaname\":\"?????????\",\"id\":510115},{\"areaname\":\"?????????\",\"id\":510116},{\"areaname\":\"?????????\",\"id\":510121},{\"areaname\":\"???  ???\",\"id\":510124},{\"areaname\":\"?????????\",\"id\":510129},{\"areaname\":\"?????????\",\"id\":510131},{\"areaname\":\"?????????\",\"id\":510132},{\"areaname\":\"????????????\",\"id\":510181},{\"areaname\":\"?????????\",\"id\":510182},{\"areaname\":\"?????????\",\"id\":510183},{\"areaname\":\"?????????\",\"id\":510184},{\"areaname\":\"?????????\",\"id\":510185}],\"id\":510100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":510302},{\"areaname\":\"?????????\",\"id\":510303},{\"areaname\":\"?????????\",\"id\":510304},{\"areaname\":\"?????????\",\"id\":510311},{\"areaname\":\"???  ???\",\"id\":510321},{\"areaname\":\"?????????\",\"id\":510322}],\"id\":510300},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"???  ???\",\"id\":510402},{\"areaname\":\"???  ???\",\"id\":510403},{\"areaname\":\"?????????\",\"id\":510411},{\"areaname\":\"?????????\",\"id\":510421},{\"areaname\":\"?????????\",\"id\":510422}],\"id\":510400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":510502},{\"areaname\":\"?????????\",\"id\":510503},{\"areaname\":\"????????????\",\"id\":510504},{\"areaname\":\"???  ???\",\"id\":510521},{\"areaname\":\"?????????\",\"id\":510522},{\"areaname\":\"?????????\",\"id\":510524},{\"areaname\":\"?????????\",\"id\":510525}],\"id\":510500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":510603},{\"areaname\":\"?????????\",\"id\":510623},{\"areaname\":\"?????????\",\"id\":510626},{\"areaname\":\"?????????\",\"id\":510681},{\"areaname\":\"?????????\",\"id\":510682},{\"areaname\":\"?????????\",\"id\":510683}],\"id\":510600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":510703},{\"areaname\":\"?????????\",\"id\":510704},{\"areaname\":\"?????????\",\"id\":510705},{\"areaname\":\"?????????\",\"id\":510722},{\"areaname\":\"?????????\",\"id\":510723},{\"areaname\":\"??????\",\"id\":510724},{\"areaname\":\"?????????\",\"id\":510725},{\"areaname\":\"?????????????????????\",\"id\":510726},{\"areaname\":\"?????????\",\"id\":510727},{\"areaname\":\"?????????\",\"id\":510781}],\"id\":510700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":510802},{\"areaname\":\"?????????\",\"id\":510811},{\"areaname\":\"?????????\",\"id\":510812},{\"areaname\":\"?????????\",\"id\":510821},{\"areaname\":\"?????????\",\"id\":510822},{\"areaname\":\"?????????\",\"id\":510823},{\"areaname\":\"?????????\",\"id\":510824}],\"id\":510800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":510903},{\"areaname\":\"?????????\",\"id\":510904},{\"areaname\":\"?????????\",\"id\":510921},{\"areaname\":\"?????????\",\"id\":510922},{\"areaname\":\"?????????\",\"id\":510923}],\"id\":510900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":511002},{\"areaname\":\"?????????\",\"id\":511011},{\"areaname\":\"?????????\",\"id\":511024},{\"areaname\":\"?????????\",\"id\":511025},{\"areaname\":\"?????????\",\"id\":511028}],\"id\":511000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":511102},{\"areaname\":\"?????????\",\"id\":511111},{\"areaname\":\"????????????\",\"id\":511112},{\"areaname\":\"????????????\",\"id\":511113},{\"areaname\":\"?????????\",\"id\":511123},{\"areaname\":\"?????????\",\"id\":511124},{\"areaname\":\"?????????\",\"id\":511126},{\"areaname\":\"?????????\",\"id\":511129},{\"areaname\":\"?????????????????????\",\"id\":511132},{\"areaname\":\"?????????????????????\",\"id\":511133},{\"areaname\":\"????????????\",\"id\":511181}],\"id\":511100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":511302},{\"areaname\":\"?????????\",\"id\":511303},{\"areaname\":\"?????????\",\"id\":511304},{\"areaname\":\"?????????\",\"id\":511321},{\"areaname\":\"?????????\",\"id\":511322},{\"areaname\":\"?????????\",\"id\":511323},{\"areaname\":\"?????????\",\"id\":511324},{\"areaname\":\"?????????\",\"id\":511325},{\"areaname\":\"?????????\",\"id\":511381}],\"id\":511300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":511402},{\"areaname\":\"?????????\",\"id\":511403},{\"areaname\":\"?????????\",\"id\":511421},{\"areaname\":\"?????????\",\"id\":511423},{\"areaname\":\"?????????\",\"id\":511424},{\"areaname\":\"?????????\",\"id\":511425}],\"id\":511400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":511502},{\"areaname\":\"?????????\",\"id\":511503},{\"areaname\":\"?????????\",\"id\":511521},{\"areaname\":\"?????????\",\"id\":511523},{\"areaname\":\"?????????\",\"id\":511524},{\"areaname\":\"???  ???\",\"id\":511525},{\"areaname\":\"???  ???\",\"id\":511526},{\"areaname\":\"?????????\",\"id\":511527},{\"areaname\":\"?????????\",\"id\":511528},{\"areaname\":\"?????????\",\"id\":511529}],\"id\":511500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":511602},{\"areaname\":\"?????????\",\"id\":511603},{\"areaname\":\"?????????\",\"id\":511621},{\"areaname\":\"?????????\",\"id\":511622},{\"areaname\":\"?????????\",\"id\":511623},{\"areaname\":\"?????????\",\"id\":511681}],\"id\":511600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":511702},{\"areaname\":\"?????????\",\"id\":511703},{\"areaname\":\"?????????\",\"id\":511722},{\"areaname\":\"?????????\",\"id\":511723},{\"areaname\":\"?????????\",\"id\":511724},{\"areaname\":\"???  ???\",\"id\":511725},{\"areaname\":\"?????????\",\"id\":511781}],\"id\":511700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":511802},{\"areaname\":\"?????????\",\"id\":511803},{\"areaname\":\"?????????\",\"id\":511822},{\"areaname\":\"?????????\",\"id\":511823},{\"areaname\":\"?????????\",\"id\":511824},{\"areaname\":\"?????????\",\"id\":511825},{\"areaname\":\"?????????\",\"id\":511826},{\"areaname\":\"?????????\",\"id\":511827}],\"id\":511800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":511902},{\"areaname\":\"?????????\",\"id\":511903},{\"areaname\":\"?????????\",\"id\":511921},{\"areaname\":\"?????????\",\"id\":511922},{\"areaname\":\"?????????\",\"id\":511923}],\"id\":511900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":512002},{\"areaname\":\"?????????\",\"id\":512021},{\"areaname\":\"?????????\",\"id\":512022}],\"id\":512000},{\"areaname\":\"???????????????????????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":513201},{\"areaname\":\"?????????\",\"id\":513221},{\"areaname\":\"???  ???\",\"id\":513222},{\"areaname\":\"???  ???\",\"id\":513223},{\"areaname\":\"?????????\",\"id\":513224},{\"areaname\":\"????????????\",\"id\":513225},{\"areaname\":\"?????????\",\"id\":513226},{\"areaname\":\"?????????\",\"id\":513227},{\"areaname\":\"?????????\",\"id\":513228},{\"areaname\":\"?????????\",\"id\":513230},{\"areaname\":\"?????????\",\"id\":513231},{\"areaname\":\"????????????\",\"id\":513232},{\"areaname\":\"?????????\",\"id\":513233}],\"id\":513200},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":513301},{\"areaname\":\"?????????\",\"id\":513322},{\"areaname\":\"?????????\",\"id\":513323},{\"areaname\":\"?????????\",\"id\":513324},{\"areaname\":\"?????????\",\"id\":513325},{\"areaname\":\"?????????\",\"id\":513326},{\"areaname\":\"?????????\",\"id\":513327},{\"areaname\":\"?????????\",\"id\":513328},{\"areaname\":\"?????????\",\"id\":513329},{\"areaname\":\"?????????\",\"id\":513330},{\"areaname\":\"?????????\",\"id\":513331},{\"areaname\":\"?????????\",\"id\":513332},{\"areaname\":\"?????????\",\"id\":513333},{\"areaname\":\"?????????\",\"id\":513334},{\"areaname\":\"?????????\",\"id\":513335},{\"areaname\":\"?????????\",\"id\":513336},{\"areaname\":\"?????????\",\"id\":513337},{\"areaname\":\"?????????\",\"id\":513338}],\"id\":513300},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":513401},{\"areaname\":\"?????????????????????\",\"id\":513422},{\"areaname\":\"?????????\",\"id\":513423},{\"areaname\":\"?????????\",\"id\":513424},{\"areaname\":\"?????????\",\"id\":513425},{\"areaname\":\"?????????\",\"id\":513426},{\"areaname\":\"?????????\",\"id\":513427},{\"areaname\":\"?????????\",\"id\":513428},{\"areaname\":\"?????????\",\"id\":513429},{\"areaname\":\"?????????\",\"id\":513430},{\"areaname\":\"?????????\",\"id\":513431},{\"areaname\":\"?????????\",\"id\":513432},{\"areaname\":\"?????????\",\"id\":513433},{\"areaname\":\"?????????\",\"id\":513434},{\"areaname\":\"?????????\",\"id\":513435},{\"areaname\":\"?????????\",\"id\":513436},{\"areaname\":\"?????????\",\"id\":513437}],\"id\":513400}],\"id\":510000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":520102},{\"areaname\":\"?????????\",\"id\":520103},{\"areaname\":\"?????????\",\"id\":520111},{\"areaname\":\"?????????\",\"id\":520112},{\"areaname\":\"?????????\",\"id\":520113},{\"areaname\":\"????????????\",\"id\":520115},{\"areaname\":\"?????????\",\"id\":520121},{\"areaname\":\"?????????\",\"id\":520122},{\"areaname\":\"?????????\",\"id\":520123},{\"areaname\":\"?????????\",\"id\":520181}],\"id\":520100},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":520201},{\"areaname\":\"????????????\",\"id\":520203},{\"areaname\":\"?????????\",\"id\":520221},{\"areaname\":\"??????\",\"id\":520222}],\"id\":520200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":520302},{\"areaname\":\"?????????\",\"id\":520303},{\"areaname\":\"?????????\",\"id\":520304},{\"areaname\":\"?????????\",\"id\":520321},{\"areaname\":\"?????????\",\"id\":520322},{\"areaname\":\"?????????\",\"id\":520323},{\"areaname\":\"?????????\",\"id\":520324},{\"areaname\":\"??????????????????????????????\",\"id\":520325},{\"areaname\":\"??????????????????????????????\",\"id\":520326},{\"areaname\":\"?????????\",\"id\":520327},{\"areaname\":\"?????????\",\"id\":520328},{\"areaname\":\"?????????\",\"id\":520329},{\"areaname\":\"?????????\",\"id\":520330},{\"areaname\":\"?????????\",\"id\":520381},{\"areaname\":\"?????????\",\"id\":520382}],\"id\":520300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":520402},{\"areaname\":\"?????????\",\"id\":520403},{\"areaname\":\"?????????\",\"id\":520422},{\"areaname\":\"??????????????????????????????\",\"id\":520423},{\"areaname\":\"??????????????????????????????\",\"id\":520424},{\"areaname\":\"??????????????????????????????\",\"id\":520425}],\"id\":520400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":520502},{\"areaname\":\"?????????\",\"id\":520521},{\"areaname\":\"?????????\",\"id\":520522},{\"areaname\":\"?????????\",\"id\":520523},{\"areaname\":\"?????????\",\"id\":520524},{\"areaname\":\"?????????\",\"id\":520525},{\"areaname\":\"?????????????????????????????????\",\"id\":520526},{\"areaname\":\"?????????\",\"id\":520527}],\"id\":520500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":520602},{\"areaname\":\"?????????\",\"id\":520603},{\"areaname\":\"?????????\",\"id\":520621},{\"areaname\":\"?????????????????????\",\"id\":520622},{\"areaname\":\"?????????\",\"id\":520623},{\"areaname\":\"?????????\",\"id\":520624},{\"areaname\":\"??????????????????????????????\",\"id\":520625},{\"areaname\":\"?????????\",\"id\":520626},{\"areaname\":\"????????????????????????\",\"id\":520627},{\"areaname\":\"?????????????????????\",\"id\":520628}],\"id\":520600},{\"areaname\":\"?????????????????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":522301},{\"areaname\":\"?????????\",\"id\":522322},{\"areaname\":\"?????????\",\"id\":522323},{\"areaname\":\"?????????\",\"id\":522324},{\"areaname\":\"?????????\",\"id\":522325},{\"areaname\":\"?????????\",\"id\":522326},{\"areaname\":\"?????????\",\"id\":522327},{\"areaname\":\"?????????\",\"id\":522328}],\"id\":522300},{\"areaname\":\"??????????????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":522601},{\"areaname\":\"?????????\",\"id\":522622},{\"areaname\":\"?????????\",\"id\":522623},{\"areaname\":\"?????????\",\"id\":522624},{\"areaname\":\"?????????\",\"id\":522625},{\"areaname\":\"?????????\",\"id\":522626},{\"areaname\":\"?????????\",\"id\":522627},{\"areaname\":\"?????????\",\"id\":522628},{\"areaname\":\"?????????\",\"id\":522629},{\"areaname\":\"?????????\",\"id\":522630},{\"areaname\":\"?????????\",\"id\":522631},{\"areaname\":\"?????????\",\"id\":522632},{\"areaname\":\"?????????\",\"id\":522633},{\"areaname\":\"?????????\",\"id\":522634},{\"areaname\":\"?????????\",\"id\":522635},{\"areaname\":\"?????????\",\"id\":522636}],\"id\":522600},{\"areaname\":\"??????????????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":522701},{\"areaname\":\"?????????\",\"id\":522702},{\"areaname\":\"?????????\",\"id\":522722},{\"areaname\":\"?????????\",\"id\":522723},{\"areaname\":\"?????????\",\"id\":522725},{\"areaname\":\"?????????\",\"id\":522726},{\"areaname\":\"?????????\",\"id\":522727},{\"areaname\":\"?????????\",\"id\":522728},{\"areaname\":\"?????????\",\"id\":522729},{\"areaname\":\"?????????\",\"id\":522730},{\"areaname\":\"?????????\",\"id\":522731},{\"areaname\":\"?????????????????????\",\"id\":522732}],\"id\":522700}],\"id\":520000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":530102},{\"areaname\":\"?????????\",\"id\":530103},{\"areaname\":\"?????????\",\"id\":530111},{\"areaname\":\"?????????\",\"id\":530112},{\"areaname\":\"?????????\",\"id\":530113},{\"areaname\":\"?????????\",\"id\":530114},{\"areaname\":\"?????????\",\"id\":530122},{\"areaname\":\"?????????\",\"id\":530124},{\"areaname\":\"?????????\",\"id\":530125},{\"areaname\":\"?????????????????????\",\"id\":530126},{\"areaname\":\"?????????\",\"id\":530127},{\"areaname\":\"???????????????????????????\",\"id\":530128},{\"areaname\":\"???????????????????????????\",\"id\":530129},{\"areaname\":\"?????????\",\"id\":530181}],\"id\":530100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":530302},{\"areaname\":\"?????????\",\"id\":530303},{\"areaname\":\"?????????\",\"id\":530321},{\"areaname\":\"?????????\",\"id\":530322},{\"areaname\":\"?????????\",\"id\":530323},{\"areaname\":\"?????????\",\"id\":530324},{\"areaname\":\"?????????\",\"id\":530325},{\"areaname\":\"?????????\",\"id\":530326},{\"areaname\":\"?????????\",\"id\":530381}],\"id\":530300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":530402},{\"areaname\":\"?????????\",\"id\":530403},{\"areaname\":\"?????????\",\"id\":530422},{\"areaname\":\"?????????\",\"id\":530423},{\"areaname\":\"?????????\",\"id\":530424},{\"areaname\":\"?????????\",\"id\":530425},{\"areaname\":\"?????????????????????\",\"id\":530426},{\"areaname\":\"???????????????????????????\",\"id\":530427},{\"areaname\":\"????????????????????????????????????\",\"id\":530428}],\"id\":530400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":530502},{\"areaname\":\"?????????\",\"id\":530521},{\"areaname\":\"?????????\",\"id\":530523},{\"areaname\":\"?????????\",\"id\":530524},{\"areaname\":\"?????????\",\"id\":530581}],\"id\":530500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":530602},{\"areaname\":\"?????????\",\"id\":530621},{\"areaname\":\"?????????\",\"id\":530622},{\"areaname\":\"?????????\",\"id\":530623},{\"areaname\":\"?????????\",\"id\":530624},{\"areaname\":\"?????????\",\"id\":530625},{\"areaname\":\"?????????\",\"id\":530626},{\"areaname\":\"?????????\",\"id\":530627},{\"areaname\":\"?????????\",\"id\":530628},{\"areaname\":\"?????????\",\"id\":530629},{\"areaname\":\"?????????\",\"id\":530630}],\"id\":530600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":530702},{\"areaname\":\"????????????????????????\",\"id\":530721},{\"areaname\":\"?????????\",\"id\":530722},{\"areaname\":\"?????????\",\"id\":530723},{\"areaname\":\"?????????????????????\",\"id\":530724}],\"id\":530700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":530802},{\"areaname\":\"??????????????????????????????\",\"id\":530821},{\"areaname\":\"????????????????????????\",\"id\":530822},{\"areaname\":\"?????????????????????\",\"id\":530823},{\"areaname\":\"???????????????????????????\",\"id\":530824},{\"areaname\":\"???????????????????????????????????????\",\"id\":530825},{\"areaname\":\"??????????????????????????????\",\"id\":530826},{\"areaname\":\"????????????????????????????????????\",\"id\":530827},{\"areaname\":\"????????????????????????\",\"id\":530828},{\"areaname\":\"?????????????????????\",\"id\":530829}],\"id\":530800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":530902},{\"areaname\":\"?????????\",\"id\":530921},{\"areaname\":\"??????\",\"id\":530922},{\"areaname\":\"?????????\",\"id\":530923},{\"areaname\":\"?????????\",\"id\":530924},{\"areaname\":\"?????????????????????????????????????????????\",\"id\":530925},{\"areaname\":\"???????????????????????????\",\"id\":530926},{\"areaname\":\"?????????????????????\",\"id\":530927}],\"id\":530900},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":532301},{\"areaname\":\"?????????\",\"id\":532322},{\"areaname\":\"?????????\",\"id\":532323},{\"areaname\":\"?????????\",\"id\":532324},{\"areaname\":\"?????????\",\"id\":532325},{\"areaname\":\"?????????\",\"id\":532326},{\"areaname\":\"?????????\",\"id\":532327},{\"areaname\":\"?????????\",\"id\":532328},{\"areaname\":\"?????????\",\"id\":532329},{\"areaname\":\"?????????\",\"id\":532331}],\"id\":532300},{\"areaname\":\"??????????????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":532501},{\"areaname\":\"?????????\",\"id\":532502},{\"areaname\":\"?????????\",\"id\":532503},{\"areaname\":\"?????????\",\"id\":532504},{\"areaname\":\"?????????????????????\",\"id\":532523},{\"areaname\":\"?????????\",\"id\":532524},{\"areaname\":\"?????????\",\"id\":532525},{\"areaname\":\"?????????\",\"id\":532527},{\"areaname\":\"?????????\",\"id\":532528},{\"areaname\":\"?????????\",\"id\":532529},{\"areaname\":\"?????????????????????????????????\",\"id\":532530},{\"areaname\":\"?????????\",\"id\":532531},{\"areaname\":\"?????????????????????\",\"id\":532532}],\"id\":532500},{\"areaname\":\"???????????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":532601},{\"areaname\":\"?????????\",\"id\":532622},{\"areaname\":\"?????????\",\"id\":532623},{\"areaname\":\"????????????\",\"id\":532624},{\"areaname\":\"?????????\",\"id\":532625},{\"areaname\":\"?????????\",\"id\":532626},{\"areaname\":\"?????????\",\"id\":532627},{\"areaname\":\"?????????\",\"id\":532628}],\"id\":532600},{\"areaname\":\"???????????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":532801},{\"areaname\":\"?????????\",\"id\":532822},{\"areaname\":\"?????????\",\"id\":532823}],\"id\":532800},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":532901},{\"areaname\":\"?????????????????????\",\"id\":532922},{\"areaname\":\"?????????\",\"id\":532923},{\"areaname\":\"?????????\",\"id\":532924},{\"areaname\":\"?????????\",\"id\":532925},{\"areaname\":\"?????????????????????\",\"id\":532926},{\"areaname\":\"???????????????????????????\",\"id\":532927},{\"areaname\":\"?????????\",\"id\":532928},{\"areaname\":\"?????????\",\"id\":532929},{\"areaname\":\"?????????\",\"id\":532930},{\"areaname\":\"?????????\",\"id\":532931},{\"areaname\":\"?????????\",\"id\":532932}],\"id\":532900},{\"areaname\":\"??????????????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":533102},{\"areaname\":\"??????\",\"id\":533103},{\"areaname\":\"?????????\",\"id\":533122},{\"areaname\":\"?????????\",\"id\":533123},{\"areaname\":\"?????????\",\"id\":533124}],\"id\":533100},{\"areaname\":\"????????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":533301},{\"areaname\":\"?????????\",\"id\":533323},{\"areaname\":\"??????????????????????????????\",\"id\":533324},{\"areaname\":\"??????????????????????????????\",\"id\":533325}],\"id\":533300},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"???????????????\",\"id\":533401},{\"areaname\":\"?????????\",\"id\":533422},{\"areaname\":\"????????????????????????\",\"id\":533423}],\"id\":533400}],\"id\":530000},{\"areaname\":\"???????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":540102},{\"areaname\":\"???????????????\",\"id\":540103},{\"areaname\":\"?????????\",\"id\":540121},{\"areaname\":\"?????????\",\"id\":540122},{\"areaname\":\"?????????\",\"id\":540123},{\"areaname\":\"?????????\",\"id\":540124},{\"areaname\":\"?????????\",\"id\":540126},{\"areaname\":\"???????????????\",\"id\":540127}],\"id\":540100},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":540202},{\"areaname\":\"????????????\",\"id\":540221},{\"areaname\":\"?????????\",\"id\":540222},{\"areaname\":\"?????????\",\"id\":540223},{\"areaname\":\"?????????\",\"id\":540224},{\"areaname\":\"?????????\",\"id\":540225},{\"areaname\":\"?????????\",\"id\":540226},{\"areaname\":\"????????????\",\"id\":540227},{\"areaname\":\"?????????\",\"id\":540228},{\"areaname\":\"?????????\",\"id\":540229},{\"areaname\":\"?????????\",\"id\":540230},{\"areaname\":\"?????????\",\"id\":540231},{\"areaname\":\"?????????\",\"id\":540232},{\"areaname\":\"?????????\",\"id\":540233},{\"areaname\":\"?????????\",\"id\":540234},{\"areaname\":\"????????????\",\"id\":540235},{\"areaname\":\"?????????\",\"id\":540236},{\"areaname\":\"?????????\",\"id\":540237}],\"id\":540200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":540302},{\"areaname\":\"?????????\",\"id\":540321},{\"areaname\":\"?????????\",\"id\":540322},{\"areaname\":\"????????????\",\"id\":540323},{\"areaname\":\"?????????\",\"id\":540324},{\"areaname\":\"?????????\",\"id\":540325},{\"areaname\":\"?????????\",\"id\":540326},{\"areaname\":\"?????????\",\"id\":540327},{\"areaname\":\"?????????\",\"id\":540328},{\"areaname\":\"?????????\",\"id\":540329},{\"areaname\":\"?????????\",\"id\":540330}],\"id\":540300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":540402},{\"areaname\":\"???????????????\",\"id\":540421},{\"areaname\":\"?????????\",\"id\":540422},{\"areaname\":\"?????????\",\"id\":540423},{\"areaname\":\"?????????\",\"id\":540424},{\"areaname\":\"?????????\",\"id\":540425},{\"areaname\":\"???  ???\",\"id\":540426}],\"id\":540400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":540502},{\"areaname\":\"?????????\",\"id\":540521},{\"areaname\":\"?????????\",\"id\":540522},{\"areaname\":\"?????????\",\"id\":540523},{\"areaname\":\"?????????\",\"id\":540524},{\"areaname\":\"?????????\",\"id\":540525},{\"areaname\":\"?????????\",\"id\":540526},{\"areaname\":\"?????????\",\"id\":540527},{\"areaname\":\"?????????\",\"id\":540528},{\"areaname\":\"?????????\",\"id\":540529},{\"areaname\":\"?????????\",\"id\":540530},{\"areaname\":\"????????????\",\"id\":540531}],\"id\":540500},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":542421},{\"areaname\":\"?????????\",\"id\":542422},{\"areaname\":\"?????????\",\"id\":542423},{\"areaname\":\"?????????\",\"id\":542424},{\"areaname\":\"?????????\",\"id\":542425},{\"areaname\":\"?????????\",\"id\":542426},{\"areaname\":\"???  ???\",\"id\":542427},{\"areaname\":\"?????????\",\"id\":542428},{\"areaname\":\"?????????\",\"id\":542429},{\"areaname\":\"?????????\",\"id\":542430},{\"areaname\":\"?????????\",\"id\":542431}],\"id\":542400},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":542521},{\"areaname\":\"?????????\",\"id\":542522},{\"areaname\":\"?????????\",\"id\":542523},{\"areaname\":\"?????????\",\"id\":542524},{\"areaname\":\"?????????\",\"id\":542525},{\"areaname\":\"?????????\",\"id\":542526},{\"areaname\":\"?????????\",\"id\":542527}],\"id\":542500},{\"areaname\":\"????????????\",\"childArea\":[],\"id\":542600}],\"id\":540000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":610102},{\"areaname\":\"?????????\",\"id\":610103},{\"areaname\":\"?????????\",\"id\":610104},{\"areaname\":\"?????????\",\"id\":610105},{\"areaname\":\"?????????\",\"id\":610111},{\"areaname\":\"?????????\",\"id\":610112},{\"areaname\":\"?????????????????????\",\"id\":610113},{\"areaname\":\"?????????\",\"id\":610114},{\"areaname\":\"?????????\",\"id\":610115},{\"areaname\":\"?????????\",\"id\":610116},{\"areaname\":\"?????????\",\"id\":610117},{\"areaname\":\"?????????\",\"id\":610118},{\"areaname\":\"?????????\",\"id\":610119},{\"areaname\":\"????????????\",\"id\":610120},{\"areaname\":\"?????????\",\"id\":610122},{\"areaname\":\"?????????\",\"id\":610124},{\"areaname\":\"???  ???\",\"id\":610125}],\"id\":610100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":610202},{\"areaname\":\"?????????\",\"id\":610203},{\"areaname\":\"?????????\",\"id\":610204},{\"areaname\":\"?????????\",\"id\":610222}],\"id\":610200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":610302},{\"areaname\":\"?????????\",\"id\":610303},{\"areaname\":\"?????????\",\"id\":610304},{\"areaname\":\"?????????\",\"id\":610322},{\"areaname\":\"?????????\",\"id\":610323},{\"areaname\":\"?????????\",\"id\":610324},{\"areaname\":\"???  ???\",\"id\":610326},{\"areaname\":\"???  ???\",\"id\":610327},{\"areaname\":\"?????????\",\"id\":610328},{\"areaname\":\"?????????\",\"id\":610329},{\"areaname\":\"???  ???\",\"id\":610330},{\"areaname\":\"?????????\",\"id\":610331}],\"id\":610300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":610402},{\"areaname\":\"?????????\",\"id\":610403},{\"areaname\":\"?????????\",\"id\":610404},{\"areaname\":\"?????????\",\"id\":610422},{\"areaname\":\"?????????\",\"id\":610423},{\"areaname\":\"???  ???\",\"id\":610424},{\"areaname\":\"?????????\",\"id\":610425},{\"areaname\":\"?????????\",\"id\":610426},{\"areaname\":\"???  ???\",\"id\":610427},{\"areaname\":\"?????????\",\"id\":610428},{\"areaname\":\"?????????\",\"id\":610429},{\"areaname\":\"?????????\",\"id\":610430},{\"areaname\":\"?????????\",\"id\":610431},{\"areaname\":\"?????????\",\"id\":610481}],\"id\":610400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":610502},{\"areaname\":\"?????????\",\"id\":610503},{\"areaname\":\"??????\",\"id\":610521},{\"areaname\":\"?????????\",\"id\":610522},{\"areaname\":\"?????????\",\"id\":610523},{\"areaname\":\"?????????\",\"id\":610524},{\"areaname\":\"?????????\",\"id\":610525},{\"areaname\":\"?????????\",\"id\":610526},{\"areaname\":\"?????????\",\"id\":610527},{\"areaname\":\"?????????\",\"id\":610528},{\"areaname\":\"?????????\",\"id\":610581},{\"areaname\":\"?????????\",\"id\":610582}],\"id\":610500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":610602},{\"areaname\":\"?????????\",\"id\":610603},{\"areaname\":\"?????????\",\"id\":610621},{\"areaname\":\"?????????\",\"id\":610622},{\"areaname\":\"?????????\",\"id\":610623},{\"areaname\":\"?????????\",\"id\":610625},{\"areaname\":\"?????????\",\"id\":610626},{\"areaname\":\"?????????\",\"id\":610627},{\"areaname\":\"???  ???\",\"id\":610628},{\"areaname\":\"?????????\",\"id\":610629},{\"areaname\":\"?????????\",\"id\":610630},{\"areaname\":\"?????????\",\"id\":610631},{\"areaname\":\"?????????\",\"id\":610632}],\"id\":610600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":610702},{\"areaname\":\"?????????\",\"id\":610721},{\"areaname\":\"?????????\",\"id\":610722},{\"areaname\":\"???  ???\",\"id\":610723},{\"areaname\":\"?????????\",\"id\":610724},{\"areaname\":\"???  ???\",\"id\":610725},{\"areaname\":\"?????????\",\"id\":610726},{\"areaname\":\"?????????\",\"id\":610727},{\"areaname\":\"?????????\",\"id\":610728},{\"areaname\":\"?????????\",\"id\":610729},{\"areaname\":\"?????????\",\"id\":610730}],\"id\":610700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":610802},{\"areaname\":\"?????????\",\"id\":610803},{\"areaname\":\"?????????\",\"id\":610821},{\"areaname\":\"?????????\",\"id\":610822},{\"areaname\":\"?????????\",\"id\":610824},{\"areaname\":\"?????????\",\"id\":610825},{\"areaname\":\"?????????\",\"id\":610826},{\"areaname\":\"?????????\",\"id\":610827},{\"areaname\":\"???  ???\",\"id\":610828},{\"areaname\":\"?????????\",\"id\":610829},{\"areaname\":\"?????????\",\"id\":610830},{\"areaname\":\"?????????\",\"id\":610831}],\"id\":610800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":610902},{\"areaname\":\"?????????\",\"id\":610921},{\"areaname\":\"?????????\",\"id\":610922},{\"areaname\":\"?????????\",\"id\":610923},{\"areaname\":\"?????????\",\"id\":610924},{\"areaname\":\"?????????\",\"id\":610925},{\"areaname\":\"?????????\",\"id\":610926},{\"areaname\":\"?????????\",\"id\":610927},{\"areaname\":\"?????????\",\"id\":610928},{\"areaname\":\"?????????\",\"id\":610929}],\"id\":610900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":611002},{\"areaname\":\"?????????\",\"id\":611021},{\"areaname\":\"?????????\",\"id\":611022},{\"areaname\":\"?????????\",\"id\":611023},{\"areaname\":\"?????????\",\"id\":611024},{\"areaname\":\"?????????\",\"id\":611025},{\"areaname\":\"?????????\",\"id\":611026}],\"id\":611000}],\"id\":610000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":620102},{\"areaname\":\"????????????\",\"id\":620103},{\"areaname\":\"?????????\",\"id\":620104},{\"areaname\":\"?????????\",\"id\":620105},{\"areaname\":\"?????????\",\"id\":620111},{\"areaname\":\"?????????\",\"id\":620121},{\"areaname\":\"?????????\",\"id\":620122},{\"areaname\":\"?????????\",\"id\":620123}],\"id\":620100},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":620201},{\"areaname\":\"?????????\",\"id\":620202},{\"areaname\":\"?????????\",\"id\":620203}],\"id\":620200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":620302},{\"areaname\":\"?????????\",\"id\":620321}],\"id\":620300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":620402},{\"areaname\":\"?????????\",\"id\":620403},{\"areaname\":\"?????????\",\"id\":620421},{\"areaname\":\"?????????\",\"id\":620422},{\"areaname\":\"?????????\",\"id\":620423}],\"id\":620400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":620502},{\"areaname\":\"?????????\",\"id\":620503},{\"areaname\":\"?????????\",\"id\":620521},{\"areaname\":\"?????????\",\"id\":620522},{\"areaname\":\"?????????\",\"id\":620523},{\"areaname\":\"?????????\",\"id\":620524},{\"areaname\":\"????????????????????????\",\"id\":620525}],\"id\":620500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":620602},{\"areaname\":\"?????????\",\"id\":620621},{\"areaname\":\"?????????\",\"id\":620622},{\"areaname\":\"?????????????????????\",\"id\":620623}],\"id\":620600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":620702},{\"areaname\":\"????????????????????????\",\"id\":620721},{\"areaname\":\"?????????\",\"id\":620722},{\"areaname\":\"?????????\",\"id\":620723},{\"areaname\":\"?????????\",\"id\":620724},{\"areaname\":\"?????????\",\"id\":620725}],\"id\":620700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":620802},{\"areaname\":\"?????????\",\"id\":620821},{\"areaname\":\"?????????\",\"id\":620822},{\"areaname\":\"?????????\",\"id\":620823},{\"areaname\":\"?????????\",\"id\":620824},{\"areaname\":\"?????????\",\"id\":620825},{\"areaname\":\"?????????\",\"id\":620826}],\"id\":620800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":620902},{\"areaname\":\"?????????\",\"id\":620921},{\"areaname\":\"?????????\",\"id\":620922},{\"areaname\":\"????????????????????????\",\"id\":620923},{\"areaname\":\"??????????????????????????????\",\"id\":620924},{\"areaname\":\"?????????\",\"id\":620981},{\"areaname\":\"?????????\",\"id\":620982}],\"id\":620900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":621002},{\"areaname\":\"?????????\",\"id\":621021},{\"areaname\":\"???  ???\",\"id\":621022},{\"areaname\":\"?????????\",\"id\":621023},{\"areaname\":\"?????????\",\"id\":621024},{\"areaname\":\"?????????\",\"id\":621025},{\"areaname\":\"??????\",\"id\":621026},{\"areaname\":\"?????????\",\"id\":621027}],\"id\":621000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":621102},{\"areaname\":\"?????????\",\"id\":621121},{\"areaname\":\"?????????\",\"id\":621122},{\"areaname\":\"?????????\",\"id\":621123},{\"areaname\":\"?????????\",\"id\":621124},{\"areaname\":\"??????\",\"id\":621125},{\"areaname\":\"??????\",\"id\":621126}],\"id\":621100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":621202},{\"areaname\":\"??????\",\"id\":621221},{\"areaname\":\"??????\",\"id\":621222},{\"areaname\":\"?????????\",\"id\":621223},{\"areaname\":\"??????\",\"id\":621224},{\"areaname\":\"?????????\",\"id\":621225},{\"areaname\":\"??????\",\"id\":621226},{\"areaname\":\"??????\",\"id\":621227},{\"areaname\":\"?????????\",\"id\":621228}],\"id\":621200},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":622901},{\"areaname\":\"?????????\",\"id\":622921},{\"areaname\":\"?????????\",\"id\":622922},{\"areaname\":\"?????????\",\"id\":622923},{\"areaname\":\"?????????\",\"id\":622924},{\"areaname\":\"?????????\",\"id\":622925},{\"areaname\":\"??????????????????\",\"id\":622926},{\"areaname\":\"?????????????????????????????????????????????\",\"id\":622927}],\"id\":622900},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":623001},{\"areaname\":\"?????????\",\"id\":623021},{\"areaname\":\"?????????\",\"id\":623022},{\"areaname\":\"?????????\",\"id\":623023},{\"areaname\":\"?????????\",\"id\":623024},{\"areaname\":\"?????????\",\"id\":623025},{\"areaname\":\"?????????\",\"id\":623026},{\"areaname\":\"?????????\",\"id\":623027}],\"id\":623000}],\"id\":620000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":630102},{\"areaname\":\"?????????\",\"id\":630103},{\"areaname\":\"?????????\",\"id\":630104},{\"areaname\":\"?????????\",\"id\":630105},{\"areaname\":\"???????????????????????????\",\"id\":630121},{\"areaname\":\"?????????\",\"id\":630122},{\"areaname\":\"?????????\",\"id\":630123}],\"id\":630100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":630202},{\"areaname\":\"?????????\",\"id\":630203},{\"areaname\":\"???????????????????????????\",\"id\":630222},{\"areaname\":\"?????????????????????\",\"id\":630223},{\"areaname\":\"?????????????????????\",\"id\":630224},{\"areaname\":\"????????????????????????\",\"id\":630225}],\"id\":630200},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????????????????\",\"id\":632221},{\"areaname\":\"?????????\",\"id\":632222},{\"areaname\":\"?????????\",\"id\":632223},{\"areaname\":\"?????????\",\"id\":632224}],\"id\":632200},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":632321},{\"areaname\":\"?????????\",\"id\":632322},{\"areaname\":\"?????????\",\"id\":632323},{\"areaname\":\"????????????????????????\",\"id\":632324}],\"id\":632300},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":632521},{\"areaname\":\"?????????\",\"id\":632522},{\"areaname\":\"?????????\",\"id\":632523},{\"areaname\":\"?????????\",\"id\":632524},{\"areaname\":\"?????????\",\"id\":632525}],\"id\":632500},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":632621},{\"areaname\":\"?????????\",\"id\":632622},{\"areaname\":\"?????????\",\"id\":632623},{\"areaname\":\"?????????\",\"id\":632624},{\"areaname\":\"?????????\",\"id\":632625},{\"areaname\":\"?????????\",\"id\":632626}],\"id\":632600},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":632701},{\"areaname\":\"?????????\",\"id\":632722},{\"areaname\":\"?????????\",\"id\":632723},{\"areaname\":\"?????????\",\"id\":632724},{\"areaname\":\"?????????\",\"id\":632725},{\"areaname\":\"????????????\",\"id\":632726}],\"id\":632700},{\"areaname\":\"??????????????????????????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":632801},{\"areaname\":\"????????????\",\"id\":632802},{\"areaname\":\"?????????\",\"id\":632821},{\"areaname\":\"?????????\",\"id\":632822},{\"areaname\":\"?????????\",\"id\":632823}],\"id\":632800}],\"id\":630000},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":640104},{\"areaname\":\"?????????\",\"id\":640105},{\"areaname\":\"?????????\",\"id\":640106},{\"areaname\":\"?????????\",\"id\":640121},{\"areaname\":\"?????????\",\"id\":640122},{\"areaname\":\"?????????\",\"id\":640181}],\"id\":640100},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":640202},{\"areaname\":\"?????????\",\"id\":640205},{\"areaname\":\"?????????\",\"id\":640221}],\"id\":640200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":640302},{\"areaname\":\"????????????\",\"id\":640303},{\"areaname\":\"?????????\",\"id\":640323},{\"areaname\":\"?????????\",\"id\":640324},{\"areaname\":\"????????????\",\"id\":640381}],\"id\":640300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":640402},{\"areaname\":\"?????????\",\"id\":640422},{\"areaname\":\"?????????\",\"id\":640423},{\"areaname\":\"?????????\",\"id\":640424},{\"areaname\":\"?????????\",\"id\":640425}],\"id\":640400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":640502},{\"areaname\":\"?????????\",\"id\":640521},{\"areaname\":\"?????????\",\"id\":640522}],\"id\":640500}],\"id\":640000},{\"areaname\":\"????????????????????????\",\"childArea\":[{\"areaname\":\"???????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":650102},{\"areaname\":\"???????????????\",\"id\":650103},{\"areaname\":\"?????????\",\"id\":650104},{\"areaname\":\"????????????\",\"id\":650105},{\"areaname\":\"????????????\",\"id\":650106},{\"areaname\":\"????????????\",\"id\":650107},{\"areaname\":\"?????????\",\"id\":650109},{\"areaname\":\"???????????????\",\"id\":650121}],\"id\":650100},{\"areaname\":\"???????????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":650202},{\"areaname\":\"???????????????\",\"id\":650203},{\"areaname\":\"????????????\",\"id\":650204},{\"areaname\":\"????????????\",\"id\":650205}],\"id\":650200},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":650402},{\"areaname\":\"?????????\",\"id\":650421},{\"areaname\":\"????????????\",\"id\":650422}],\"id\":650400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":650502},{\"areaname\":\"???????????????????????????\",\"id\":650521},{\"areaname\":\"?????????\",\"id\":650522}],\"id\":650500},{\"areaname\":\"???????????????\",\"childArea\":[],\"id\":652100},{\"areaname\":\"????????????\",\"childArea\":[],\"id\":652200},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":652301},{\"areaname\":\"?????????\",\"id\":652302},{\"areaname\":\"????????????\",\"id\":652323},{\"areaname\":\"????????????\",\"id\":652324},{\"areaname\":\"?????????\",\"id\":652325},{\"areaname\":\"???????????????\",\"id\":652327},{\"areaname\":\"????????????????????????\",\"id\":652328}],\"id\":652300},{\"areaname\":\"???????????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":652701},{\"areaname\":\"???????????????\",\"id\":652702},{\"areaname\":\"?????????\",\"id\":652722},{\"areaname\":\"?????????\",\"id\":652723}],\"id\":652700},{\"areaname\":\"???????????????????????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":652801},{\"areaname\":\"?????????\",\"id\":652822},{\"areaname\":\"?????????\",\"id\":652823},{\"areaname\":\"?????????\",\"id\":652824},{\"areaname\":\"?????????\",\"id\":652825},{\"areaname\":\"?????????????????????\",\"id\":652826},{\"areaname\":\"?????????\",\"id\":652827},{\"areaname\":\"?????????\",\"id\":652828},{\"areaname\":\"?????????\",\"id\":652829}],\"id\":652800},{\"areaname\":\"???????????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":652901},{\"areaname\":\"?????????\",\"id\":652922},{\"areaname\":\"?????????\",\"id\":652923},{\"areaname\":\"?????????\",\"id\":652924},{\"areaname\":\"?????????\",\"id\":652925},{\"areaname\":\"?????????\",\"id\":652926},{\"areaname\":\"?????????\",\"id\":652927},{\"areaname\":\"????????????\",\"id\":652928},{\"areaname\":\"?????????\",\"id\":652929}],\"id\":652900},{\"areaname\":\"?????????????????????????????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":653001},{\"areaname\":\"????????????\",\"id\":653022},{\"areaname\":\"????????????\",\"id\":653023},{\"areaname\":\"?????????\",\"id\":653024}],\"id\":653000},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":653101},{\"areaname\":\"?????????\",\"id\":653121},{\"areaname\":\"?????????\",\"id\":653122},{\"areaname\":\"????????????\",\"id\":653123},{\"areaname\":\"?????????\",\"id\":653124},{\"areaname\":\"?????????\",\"id\":653125},{\"areaname\":\"?????????\",\"id\":653126},{\"areaname\":\"????????????\",\"id\":653127},{\"areaname\":\"????????????\",\"id\":653128},{\"areaname\":\"?????????\",\"id\":653129},{\"areaname\":\"?????????\",\"id\":653130},{\"areaname\":\"?????????????????????????????????\",\"id\":653131}],\"id\":653100},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":653201},{\"areaname\":\"?????????\",\"id\":653221},{\"areaname\":\"?????????\",\"id\":653222},{\"areaname\":\"?????????\",\"id\":653223},{\"areaname\":\"?????????\",\"id\":653224},{\"areaname\":\"?????????\",\"id\":653225},{\"areaname\":\"?????????\",\"id\":653226},{\"areaname\":\"?????????\",\"id\":653227}],\"id\":653200},{\"areaname\":\"????????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":654002},{\"areaname\":\"?????????\",\"id\":654003},{\"areaname\":\"???????????????\",\"id\":654004},{\"areaname\":\"?????????\",\"id\":654021},{\"areaname\":\"???????????????????????????\",\"id\":654022},{\"areaname\":\"?????????\",\"id\":654023},{\"areaname\":\"?????????\",\"id\":654024},{\"areaname\":\"?????????\",\"id\":654025},{\"areaname\":\"?????????\",\"id\":654026},{\"areaname\":\"????????????\",\"id\":654027},{\"areaname\":\"????????????\",\"id\":654028}],\"id\":654000},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":654201},{\"areaname\":\"?????????\",\"id\":654202},{\"areaname\":\"?????????\",\"id\":654221},{\"areaname\":\"?????????\",\"id\":654223},{\"areaname\":\"?????????\",\"id\":654224},{\"areaname\":\"?????????\",\"id\":654225},{\"areaname\":\"??????????????????????????????\",\"id\":654226}],\"id\":654200},{\"areaname\":\"???????????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":654301},{\"areaname\":\"????????????\",\"id\":654321},{\"areaname\":\"?????????\",\"id\":654322},{\"areaname\":\"?????????\",\"id\":654323},{\"areaname\":\"????????????\",\"id\":654324},{\"areaname\":\"?????????\",\"id\":654325},{\"areaname\":\"????????????\",\"id\":654326}],\"id\":654300},{\"areaname\":\"????????????\",\"childArea\":[],\"id\":659000},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":659001001}],\"id\":659001},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":659002001}],\"id\":659002},{\"areaname\":\"???????????????\",\"childArea\":[{\"areaname\":\"???????????????\",\"id\":659003001}],\"id\":659003},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":659004001}],\"id\":659004},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":659005001}],\"id\":659005},{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":659006001}],\"id\":659006},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":659007001}],\"id\":659007},{\"areaname\":\"???????????????\",\"childArea\":[{\"areaname\":\"???????????????\",\"id\":659008001}],\"id\":659008},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":659009001}],\"id\":659009}],\"id\":650000},{\"areaname\":\"??????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":710101},{\"areaname\":\"?????????\",\"id\":710102},{\"areaname\":\"?????????\",\"id\":710103},{\"areaname\":\"?????????\",\"id\":710104},{\"areaname\":\"?????????\",\"id\":710105},{\"areaname\":\"?????????\",\"id\":710106},{\"areaname\":\"?????????\",\"id\":710107},{\"areaname\":\"?????????\",\"id\":710108},{\"areaname\":\"?????????\",\"id\":710109},{\"areaname\":\"?????????\",\"id\":710110},{\"areaname\":\"?????????\",\"id\":710111},{\"areaname\":\"?????????\",\"id\":710112}],\"id\":710100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":710201},{\"areaname\":\"?????????\",\"id\":710202},{\"areaname\":\"?????????\",\"id\":710203},{\"areaname\":\"?????????\",\"id\":710204},{\"areaname\":\"?????????\",\"id\":710205},{\"areaname\":\"?????????\",\"id\":710206},{\"areaname\":\"?????????\",\"id\":710207},{\"areaname\":\"?????????\",\"id\":710208},{\"areaname\":\"?????????\",\"id\":710209},{\"areaname\":\"?????????\",\"id\":710210},{\"areaname\":\"?????????\",\"id\":710211},{\"areaname\":\"?????????\",\"id\":710212},{\"areaname\":\"?????????\",\"id\":710213},{\"areaname\":\"?????????\",\"id\":710214},{\"areaname\":\"?????????\",\"id\":710215},{\"areaname\":\"?????????\",\"id\":710216},{\"areaname\":\"?????????\",\"id\":710217},{\"areaname\":\"?????????\",\"id\":710218},{\"areaname\":\"?????????\",\"id\":710219},{\"areaname\":\"?????????\",\"id\":710220},{\"areaname\":\"?????????\",\"id\":710221},{\"areaname\":\"?????????\",\"id\":710222},{\"areaname\":\"?????????\",\"id\":710223},{\"areaname\":\"?????????\",\"id\":710224},{\"areaname\":\"?????????\",\"id\":710225},{\"areaname\":\"?????????\",\"id\":710226},{\"areaname\":\"?????????\",\"id\":710227},{\"areaname\":\"?????????\",\"id\":710228},{\"areaname\":\"?????????\",\"id\":710229},{\"areaname\":\"?????????\",\"id\":710230},{\"areaname\":\"?????????\",\"id\":710231},{\"areaname\":\"?????????\",\"id\":710232},{\"areaname\":\"?????????\",\"id\":710233},{\"areaname\":\"?????????\",\"id\":710234},{\"areaname\":\"?????????\",\"id\":710235},{\"areaname\":\"?????????\",\"id\":710236},{\"areaname\":\"?????????\",\"id\":710237},{\"areaname\":\"????????????\",\"id\":710238}],\"id\":710200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":710301},{\"areaname\":\"?????????\",\"id\":710302},{\"areaname\":\"?????????\",\"id\":710303},{\"areaname\":\"?????????\",\"id\":710304},{\"areaname\":\"?????????\",\"id\":710305},{\"areaname\":\"?????????\",\"id\":710306},{\"areaname\":\"?????????\",\"id\":710307}],\"id\":710300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"??????\",\"id\":710401},{\"areaname\":\"??????\",\"id\":710402},{\"areaname\":\"??????\",\"id\":710403},{\"areaname\":\"??????\",\"id\":710404},{\"areaname\":\"??????\",\"id\":710405},{\"areaname\":\"?????????\",\"id\":710406},{\"areaname\":\"?????????\",\"id\":710407},{\"areaname\":\"?????????\",\"id\":710408},{\"areaname\":\"?????????\",\"id\":710409},{\"areaname\":\"?????????\",\"id\":710410},{\"areaname\":\"?????????\",\"id\":710411},{\"areaname\":\"?????????\",\"id\":710412},{\"areaname\":\"?????????\",\"id\":710413},{\"areaname\":\"?????????\",\"id\":710414},{\"areaname\":\"?????????\",\"id\":710415},{\"areaname\":\"?????????\",\"id\":710416},{\"areaname\":\"?????????\",\"id\":710417},{\"areaname\":\"?????????\",\"id\":710418},{\"areaname\":\"?????????\",\"id\":710419},{\"areaname\":\"?????????\",\"id\":710420},{\"areaname\":\"?????????\",\"id\":710421},{\"areaname\":\"?????????\",\"id\":710422},{\"areaname\":\"?????????\",\"id\":710423},{\"areaname\":\"?????????\",\"id\":710424},{\"areaname\":\"?????????\",\"id\":710425},{\"areaname\":\"?????????\",\"id\":710426},{\"areaname\":\"?????????\",\"id\":710427},{\"areaname\":\"?????????\",\"id\":710428},{\"areaname\":\"?????????\",\"id\":710429}],\"id\":710400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"??????\",\"id\":710501},{\"areaname\":\"??????\",\"id\":710502},{\"areaname\":\"??????\",\"id\":710504},{\"areaname\":\"?????????\",\"id\":710506},{\"areaname\":\"?????????\",\"id\":710507},{\"areaname\":\"?????????\",\"id\":710508},{\"areaname\":\"?????????\",\"id\":710509},{\"areaname\":\"?????????\",\"id\":710510},{\"areaname\":\"?????????\",\"id\":710511},{\"areaname\":\"?????????\",\"id\":710512},{\"areaname\":\"?????????\",\"id\":710513},{\"areaname\":\"?????????\",\"id\":710514},{\"areaname\":\"?????????\",\"id\":710515},{\"areaname\":\"?????????\",\"id\":710516},{\"areaname\":\"?????????\",\"id\":710517},{\"areaname\":\"?????????\",\"id\":710518},{\"areaname\":\"?????????\",\"id\":710519},{\"areaname\":\"?????????\",\"id\":710520},{\"areaname\":\"?????????\",\"id\":710521},{\"areaname\":\"?????????\",\"id\":710522},{\"areaname\":\"?????????\",\"id\":710523},{\"areaname\":\"?????????\",\"id\":710524},{\"areaname\":\"?????????\",\"id\":710525},{\"areaname\":\"?????????\",\"id\":710526},{\"areaname\":\"?????????\",\"id\":710527},{\"areaname\":\"?????????\",\"id\":710528},{\"areaname\":\"?????????\",\"id\":710529},{\"areaname\":\"?????????\",\"id\":710530},{\"areaname\":\"?????????\",\"id\":710531},{\"areaname\":\"?????????\",\"id\":710532},{\"areaname\":\"?????????\",\"id\":710533},{\"areaname\":\"?????????\",\"id\":710534},{\"areaname\":\"?????????\",\"id\":710535},{\"areaname\":\"?????????\",\"id\":710536},{\"areaname\":\"?????????\",\"id\":710537},{\"areaname\":\"?????????\",\"id\":710538},{\"areaname\":\"?????????\",\"id\":710539}],\"id\":710500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"??????\",\"id\":710601},{\"areaname\":\"??????\",\"id\":710602},{\"areaname\":\"?????????\",\"id\":710603}],\"id\":710600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"??????\",\"id\":710701},{\"areaname\":\"??????\",\"id\":710702}],\"id\":710700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":710801},{\"areaname\":\"?????????\",\"id\":710802},{\"areaname\":\"?????????\",\"id\":710803},{\"areaname\":\"?????????\",\"id\":710804},{\"areaname\":\"?????????\",\"id\":710805},{\"areaname\":\"?????????\",\"id\":710806},{\"areaname\":\"?????????\",\"id\":710807},{\"areaname\":\"?????????\",\"id\":710808},{\"areaname\":\"?????????\",\"id\":710809},{\"areaname\":\"?????????\",\"id\":710810},{\"areaname\":\"?????????\",\"id\":710811},{\"areaname\":\"?????????\",\"id\":710812},{\"areaname\":\"?????????\",\"id\":710813},{\"areaname\":\"?????????\",\"id\":710814},{\"areaname\":\"?????????\",\"id\":710815},{\"areaname\":\"?????????\",\"id\":710816},{\"areaname\":\"?????????\",\"id\":710817},{\"areaname\":\"?????????\",\"id\":710818},{\"areaname\":\"?????????\",\"id\":710819},{\"areaname\":\"?????????\",\"id\":710820},{\"areaname\":\"?????????\",\"id\":710821},{\"areaname\":\"?????????\",\"id\":710822},{\"areaname\":\"?????????\",\"id\":710823},{\"areaname\":\"?????????\",\"id\":710824},{\"areaname\":\"?????????\",\"id\":710825},{\"areaname\":\"?????????\",\"id\":710826},{\"areaname\":\"?????????\",\"id\":710827},{\"areaname\":\"?????????\",\"id\":710828},{\"areaname\":\"?????????\",\"id\":710829}],\"id\":710800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":712201},{\"areaname\":\"?????????\",\"id\":712221},{\"areaname\":\"?????????\",\"id\":712222},{\"areaname\":\"?????????\",\"id\":712223},{\"areaname\":\"?????????\",\"id\":712224},{\"areaname\":\"?????????\",\"id\":712225},{\"areaname\":\"?????????\",\"id\":712226},{\"areaname\":\"?????????\",\"id\":712227},{\"areaname\":\"?????????\",\"id\":712228},{\"areaname\":\"?????????\",\"id\":712229},{\"areaname\":\"?????????\",\"id\":712230},{\"areaname\":\"?????????\",\"id\":712231}],\"id\":712200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":712301},{\"areaname\":\"?????????\",\"id\":712302},{\"areaname\":\"?????????\",\"id\":712303},{\"areaname\":\"?????????\",\"id\":712304},{\"areaname\":\"?????????\",\"id\":712305},{\"areaname\":\"?????????\",\"id\":712306},{\"areaname\":\"?????????\",\"id\":712321},{\"areaname\":\"?????????\",\"id\":712324},{\"areaname\":\"?????????\",\"id\":712325},{\"areaname\":\"?????????\",\"id\":712327},{\"areaname\":\"?????????\",\"id\":712329},{\"areaname\":\"?????????\",\"id\":712330},{\"areaname\":\"?????????\",\"id\":712331}],\"id\":712300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":712401},{\"areaname\":\"?????????\",\"id\":712421},{\"areaname\":\"?????????\",\"id\":712422},{\"areaname\":\"?????????\",\"id\":712423},{\"areaname\":\"?????????\",\"id\":712424},{\"areaname\":\"?????????\",\"id\":712425},{\"areaname\":\"?????????\",\"id\":712426},{\"areaname\":\"?????????\",\"id\":712427},{\"areaname\":\"?????????\",\"id\":712428},{\"areaname\":\"?????????\",\"id\":712429},{\"areaname\":\"?????????\",\"id\":712430},{\"areaname\":\"?????????\",\"id\":712431},{\"areaname\":\"?????????\",\"id\":712432}],\"id\":712400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":712501},{\"areaname\":\"?????????\",\"id\":712521},{\"areaname\":\"?????????\",\"id\":712522},{\"areaname\":\"?????????\",\"id\":712523},{\"areaname\":\"?????????\",\"id\":712524},{\"areaname\":\"?????????\",\"id\":712525},{\"areaname\":\"?????????\",\"id\":712526},{\"areaname\":\"?????????\",\"id\":712527},{\"areaname\":\"?????????\",\"id\":712528},{\"areaname\":\"?????????\",\"id\":712529},{\"areaname\":\"?????????\",\"id\":712530},{\"areaname\":\"?????????\",\"id\":712531},{\"areaname\":\"?????????\",\"id\":712532},{\"areaname\":\"?????????\",\"id\":712533},{\"areaname\":\"?????????\",\"id\":712534},{\"areaname\":\"?????????\",\"id\":712535},{\"areaname\":\"?????????\",\"id\":712536},{\"areaname\":\"?????????\",\"id\":712537}],\"id\":712500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":712701},{\"areaname\":\"?????????\",\"id\":712721},{\"areaname\":\"?????????\",\"id\":712722},{\"areaname\":\"?????????\",\"id\":712723},{\"areaname\":\"?????????\",\"id\":712724},{\"areaname\":\"?????????\",\"id\":712725},{\"areaname\":\"?????????\",\"id\":712726},{\"areaname\":\"?????????\",\"id\":712727},{\"areaname\":\"?????????\",\"id\":712728},{\"areaname\":\"?????????\",\"id\":712729},{\"areaname\":\"?????????\",\"id\":712730},{\"areaname\":\"?????????\",\"id\":712731},{\"areaname\":\"?????????\",\"id\":712732},{\"areaname\":\"?????????\",\"id\":712733},{\"areaname\":\"?????????\",\"id\":712734},{\"areaname\":\"?????????\",\"id\":712735},{\"areaname\":\"?????????\",\"id\":712736},{\"areaname\":\"?????????\",\"id\":712737},{\"areaname\":\"?????????\",\"id\":712738},{\"areaname\":\"?????????\",\"id\":712739},{\"areaname\":\"?????????\",\"id\":712740},{\"areaname\":\"?????????\",\"id\":712741},{\"areaname\":\"?????????\",\"id\":712742},{\"areaname\":\"?????????\",\"id\":712743},{\"areaname\":\"?????????\",\"id\":712744},{\"areaname\":\"?????????\",\"id\":712745}],\"id\":712700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":712801},{\"areaname\":\"?????????\",\"id\":712821},{\"areaname\":\"?????????\",\"id\":712822},{\"areaname\":\"?????????\",\"id\":712823},{\"areaname\":\"?????????\",\"id\":712824},{\"areaname\":\"?????????\",\"id\":712825},{\"areaname\":\"?????????\",\"id\":712826},{\"areaname\":\"?????????\",\"id\":712827},{\"areaname\":\"?????????\",\"id\":712828},{\"areaname\":\"?????????\",\"id\":712829},{\"areaname\":\"?????????\",\"id\":712830},{\"areaname\":\"?????????\",\"id\":712831},{\"areaname\":\"?????????\",\"id\":712832}],\"id\":712800},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":712901},{\"areaname\":\"?????????\",\"id\":712921},{\"areaname\":\"?????????\",\"id\":712922},{\"areaname\":\"?????????\",\"id\":712923},{\"areaname\":\"?????????\",\"id\":712924},{\"areaname\":\"?????????\",\"id\":712925},{\"areaname\":\"?????????\",\"id\":712926},{\"areaname\":\"?????????\",\"id\":712927},{\"areaname\":\"?????????\",\"id\":712928},{\"areaname\":\"?????????\",\"id\":712929},{\"areaname\":\"?????????\",\"id\":712930},{\"areaname\":\"?????????\",\"id\":712931},{\"areaname\":\"?????????\",\"id\":712932},{\"areaname\":\"?????????\",\"id\":712933},{\"areaname\":\"?????????\",\"id\":712934},{\"areaname\":\"?????????\",\"id\":712935},{\"areaname\":\"?????????\",\"id\":712936},{\"areaname\":\"?????????\",\"id\":712937},{\"areaname\":\"?????????\",\"id\":712938},{\"areaname\":\"?????????\",\"id\":712939}],\"id\":712900},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":713001},{\"areaname\":\"?????????\",\"id\":713002},{\"areaname\":\"?????????\",\"id\":713023},{\"areaname\":\"?????????\",\"id\":713024},{\"areaname\":\"?????????\",\"id\":713025},{\"areaname\":\"?????????\",\"id\":713026},{\"areaname\":\"?????????\",\"id\":713027},{\"areaname\":\"?????????\",\"id\":713028},{\"areaname\":\"?????????\",\"id\":713029},{\"areaname\":\"?????????\",\"id\":713030},{\"areaname\":\"?????????\",\"id\":713031},{\"areaname\":\"?????????\",\"id\":713032},{\"areaname\":\"?????????\",\"id\":713033},{\"areaname\":\"?????????\",\"id\":713034},{\"areaname\":\"?????????\",\"id\":713035},{\"areaname\":\"?????????\",\"id\":713036},{\"areaname\":\"?????????\",\"id\":713037},{\"areaname\":\"????????????\",\"id\":713038}],\"id\":713000},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":713301},{\"areaname\":\"?????????\",\"id\":713321},{\"areaname\":\"?????????\",\"id\":713322},{\"areaname\":\"?????????\",\"id\":713323},{\"areaname\":\"?????????\",\"id\":713324},{\"areaname\":\"?????????\",\"id\":713325},{\"areaname\":\"?????????\",\"id\":713326},{\"areaname\":\"?????????\",\"id\":713327},{\"areaname\":\"?????????\",\"id\":713328},{\"areaname\":\"?????????\",\"id\":713329},{\"areaname\":\"?????????\",\"id\":713330},{\"areaname\":\"?????????\",\"id\":713331},{\"areaname\":\"?????????\",\"id\":713332},{\"areaname\":\"?????????\",\"id\":713333},{\"areaname\":\"?????????\",\"id\":713334},{\"areaname\":\"?????????\",\"id\":713335},{\"areaname\":\"?????????\",\"id\":713336},{\"areaname\":\"?????????\",\"id\":713337},{\"areaname\":\"?????????\",\"id\":713338},{\"areaname\":\"?????????\",\"id\":713339},{\"areaname\":\"?????????\",\"id\":713340},{\"areaname\":\"?????????\",\"id\":713341},{\"areaname\":\"?????????\",\"id\":713342},{\"areaname\":\"?????????\",\"id\":713343},{\"areaname\":\"?????????\",\"id\":713344},{\"areaname\":\"????????????\",\"id\":713345},{\"areaname\":\"?????????\",\"id\":713346},{\"areaname\":\"?????????\",\"id\":713347},{\"areaname\":\"?????????\",\"id\":713348},{\"areaname\":\"?????????\",\"id\":713349},{\"areaname\":\"?????????\",\"id\":713350},{\"areaname\":\"?????????\",\"id\":713351},{\"areaname\":\"?????????\",\"id\":713352}],\"id\":713300},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":713401},{\"areaname\":\"?????????\",\"id\":713421},{\"areaname\":\"?????????\",\"id\":713422},{\"areaname\":\"?????????\",\"id\":713423},{\"areaname\":\"?????????\",\"id\":713424},{\"areaname\":\"?????????\",\"id\":713425},{\"areaname\":\"?????????\",\"id\":713426},{\"areaname\":\"?????????\",\"id\":713427},{\"areaname\":\"????????????\",\"id\":713428},{\"areaname\":\"?????????\",\"id\":713429},{\"areaname\":\"?????????\",\"id\":713430},{\"areaname\":\"?????????\",\"id\":713431},{\"areaname\":\"?????????\",\"id\":713432},{\"areaname\":\"?????????\",\"id\":713433},{\"areaname\":\"?????????\",\"id\":713434},{\"areaname\":\"?????????\",\"id\":713435}],\"id\":713400},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":713501},{\"areaname\":\"?????????\",\"id\":713521},{\"areaname\":\"?????????\",\"id\":713522},{\"areaname\":\"?????????\",\"id\":713523},{\"areaname\":\"?????????\",\"id\":713524},{\"areaname\":\"?????????\",\"id\":713525},{\"areaname\":\"?????????\",\"id\":713526},{\"areaname\":\"?????????\",\"id\":713527},{\"areaname\":\"?????????\",\"id\":713528},{\"areaname\":\"?????????\",\"id\":713529},{\"areaname\":\"?????????\",\"id\":713530},{\"areaname\":\"?????????\",\"id\":713531},{\"areaname\":\"?????????\",\"id\":713532}],\"id\":713500},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":713601},{\"areaname\":\"?????????\",\"id\":713621},{\"areaname\":\"?????????\",\"id\":713622},{\"areaname\":\"?????????\",\"id\":713623},{\"areaname\":\"?????????\",\"id\":713624},{\"areaname\":\"?????????\",\"id\":713625}],\"id\":713600},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":713701},{\"areaname\":\"?????????\",\"id\":713702},{\"areaname\":\"?????????\",\"id\":713703},{\"areaname\":\"?????????\",\"id\":713704},{\"areaname\":\"?????????\",\"id\":713705},{\"areaname\":\"?????????\",\"id\":713706}],\"id\":713700},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":713801},{\"areaname\":\"?????????\",\"id\":713802},{\"areaname\":\"?????????\",\"id\":713803},{\"areaname\":\"?????????\",\"id\":713804}],\"id\":713800}],\"id\":710000},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":810101},{\"areaname\":\"?????????\",\"id\":810102},{\"areaname\":\"??????\",\"id\":810103},{\"areaname\":\"??????\",\"id\":810104}],\"id\":810100},{\"areaname\":\"??????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":810201},{\"areaname\":\"????????????\",\"id\":810202},{\"areaname\":\"????????????\",\"id\":810203},{\"areaname\":\"????????????\",\"id\":810204},{\"areaname\":\"?????????\",\"id\":810205}],\"id\":810200},{\"areaname\":\"??????\",\"childArea\":[{\"areaname\":\"?????????\",\"id\":810301},{\"areaname\":\"?????????\",\"id\":810302},{\"areaname\":\"?????????\",\"id\":810303},{\"areaname\":\"??????\",\"id\":810304},{\"areaname\":\"?????????\",\"id\":810305},{\"areaname\":\"?????????\",\"id\":810306},{\"areaname\":\"?????????\",\"id\":810307},{\"areaname\":\"?????????\",\"id\":810308},{\"areaname\":\"?????????\",\"id\":810309}],\"id\":810300}],\"id\":810000},{\"areaname\":\"?????????????????????\",\"childArea\":[{\"areaname\":\"????????????\",\"childArea\":[{\"areaname\":\"???????????????\",\"id\":820101},{\"areaname\":\"??????????????????\",\"id\":820102},{\"areaname\":\"?????????\",\"id\":820103},{\"areaname\":\"????????????\",\"id\":820104},{\"areaname\":\"????????????\",\"id\":820105}],\"id\":820100},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"????????????\",\"id\":820201}],\"id\":820200},{\"areaname\":\"?????????\",\"childArea\":[{\"areaname\":\"??????????????????\",\"id\":820301}],\"id\":820300}],\"id\":820000},{\"areaname\":\"?????????\",\"childArea\":[],\"id\":900000}]");

/***/ }),

/***/ 3:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx ????????????????????? plugins ???????????????????????????????????????????????????????????????????????? copyAugment ??????
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // ?????? externalClass ????????????(????????? externalClass ????????????????????????)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx ?????? hack ??? uni-app ???????????? name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//??????????????? observer ??? setData callback ?????????????????????????????? warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field ????????????
            if(
                key === 'value' &&
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE ????????? != ????????? !==????????????????????????????????????????????????????????????????????????????????????????????????
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"????????????","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick ?????? ??? setData ??? setData ??????????????????
    //2.nextTick ???????????? render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"????????????","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"????????????","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // ???????????? vm ?????????????????????
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO ??????????????????????????????????????? list=>l0 ??? list ??????????????????????????????????????????
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //????????? data ???????????????
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"????????????","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']????????????',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js ?????? new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }

  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay ???????????? selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // ????????????????????????
    Vue.set(target, key, value)
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // ????????????????????????
    Vue.set(target, key, value)
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO ???????????? string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // ??????????????????????????????????????????
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // ???????????????????????????????????????
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // ???????????????????????????
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // ???????????????????????????
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // ???????????? watch ??????????????????????????????
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // ??????????????????uni ??? uni-i18n ????????????????????????????????? uni????????? global ????????? getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // ?????????????????????
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // ????????????????????????uni-i18n ??? uni ????????????????????????????????? uni ????????? undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // ??????$vm????????????????????????????????????????????????????????????????????????props???default????????????t()????????????uni-goods-nav????????????app???????????????
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // ???????????????
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // ???????????????
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // ????????????????????????
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 460:
/*!*******************************************************!*\
  !*** D:/yjy/??????/??????/????????????/components/uni-popup/popup.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _message = _interopRequireDefault(__webpack_require__(/*! ./message.js */ 461));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// ?????? type ??????:???????????????top/bottom/center
var config = {
  // ????????????
  top: 'top',
  // ????????????
  bottom: 'bottom',
  // ????????????
  center: 'center',
  // ????????????
  message: 'top',
  // ?????????
  dialog: 'center',
  // ??????
  share: 'bottom' };var _default =


{
  data: function data() {
    return {
      config: config };

  },
  mixins: [_message.default] };exports.default = _default;

/***/ }),

/***/ 461:
/*!*********************************************************!*\
  !*** D:/yjy/??????/??????/????????????/components/uni-popup/message.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  created: function created() {
    if (this.type === 'message') {
      // ???????????????
      this.maskShow = false;
      // ?????????????????????
      this.childrenMsg = null;
    }
  },
  methods: {
    customOpen: function customOpen() {
      if (this.childrenMsg) {
        this.childrenMsg.open();
      }
    },
    customClose: function customClose() {
      if (this.childrenMsg) {
        this.childrenMsg.close();
      }
    } } };exports.default = _default;

/***/ }),

/***/ 47:
/*!********************************************!*\
  !*** D:/yjy/??????/??????/????????????/js/utils/format.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.formatRichTextImage = exports.decimalFormat = exports.intFormat = exports.hiddenMobile = exports.formatRpxToPx = exports.formatDigitOne = exports.formatDigit = exports.formatDigitFloor = exports.formatNumber = exports.formatDateYMDNonull = exports.formatDateYMDBySplit = exports.formatDateYMD = exports.strToDate = exports.formatTime = void 0; /**???????????????**/
var formatTime = function formatTime(date) {
  if (!date) return '';

  if (typeof date == 'string') {
    date = new Date(date.replace(/\-/g, '/'));
  }

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(
  ':');
};exports.formatTime = formatTime;

var strToDate = function strToDate(dateStr) {
  console.log("strToDate1");
  if (typeof dateStr == 'string') {
    console.log("strToDate2");
    return new Date(dateStr.replace(/\-/g, '/'));
  }
};


/** ??????????????? YYYY-MM-DD */exports.strToDate = strToDate;
var formatDateYMD = function formatDateYMD(value) {
  var date = value;
  if (Object.prototype.toString.call(value) == "[object String]") {
    if (date.indexOf('-') >= 0) {
      date = date.replace(/-/g, '/');
      date = new Date(date);
    }
  }
  if (!date) {
    date = new Date();
  }

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return [year, month, day].map(formatNumber).join('-');
};
/** ??????????????? YYYY-MM-DD ??????????????????*/exports.formatDateYMD = formatDateYMD;
var formatDateYMDBySplit = function formatDateYMDBySplit(date, split) {
  if (!date) {
    date = new Date();
  }

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return [year, month, day].map(formatNumber).join(split);
};exports.formatDateYMDBySplit = formatDateYMDBySplit;
var formatDateYMDNonull = function formatDateYMDNonull(date) {
  if (!date) return '';

  if (typeof date == 'string') {
    date = new Date(date.replace(/\-/g, '/'));
  }

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return [year, month, day].map(formatNumber).join('-');
};
/** */exports.formatDateYMDNonull = formatDateYMDNonull;
var formatNumber = function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
};
/** ??????????????? ??????????????????-???????????????
   	???????????????
    */exports.formatNumber = formatNumber;
var formatDigitFloor = function formatDigitFloor(value) {
  var nv = value * 100;
  nv = Math.floor(nv);
  nv = (nv / 100).toFixed(2);
  return nv;
};

/** ??????????????? ????????????*/exports.formatDigitFloor = formatDigitFloor;
var formatDigit = function formatDigit(value) {
  value = value + '';
  value = value.replace(/[^\d.]/g, ""); //????????????????????????.??????????????????

  value = value.replace(/\.{2,}/g, "."); //??????????????????. ???????????????

  value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //????????????????????????

  if (value.indexOf(".") < 0 && value != "") {
    //??????????????????????????????????????????????????????????????????????????????????????? 01???02?????????
    value = parseFloat(value);
  }

  return value;
};
/** ??????????????? ????????????*/exports.formatDigit = formatDigit;

var formatDigitOne = function formatDigitOne(value) {
  value = value + '';
  value = value.replace(/[^\d.]/g, ""); //????????????????????????.??????????????????

  value = value.replace(/\.{2,}/g, "."); //??????????????????. ???????????????

  value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  value = value.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'); //???????????????????????????

  if (value.indexOf(".") < 0 && value != "") {
    //??????????????????????????????????????????????????????????????????????????????????????? 01???02?????????
    value = parseFloat(value);
  }

  return value;
};exports.formatDigitOne = formatDigitOne;
var formatRpxToPx = function formatRpxToPx(rpx) {
  if (rpx) {
    rpx = Number(rpx);
  } else {
    rpx = 0;
  }

  return rpx / 750 * uni.getSystemInfoSync().windowWidth;
};
/** ?????????????????? */exports.formatRpxToPx = formatRpxToPx;

var hiddenMobile = function hiddenMobile(mobile) {
  if (!mobile) return '';
  var mb = mobile.toString();
  var hidStr = mb.substring(3, mb.length - 4);
  return mb.replace(hidStr, "****"); // return mb.replace( /^(\d{3})\d{4}(\d{4})$/, '$1****$2')
};
// ???????????????
exports.hiddenMobile = hiddenMobile;var intFormat = function intFormat(val) {
  if (val) {
    val = val + '';
    var dval = val.split('.')[0] || '0';
    return dval;
  }
  return '0';
};
// ???????????????
exports.intFormat = intFormat;var decimalFormat = function decimalFormat(val) {
  if (val) {
    val = val + '';
    var dval = val.split('.')[1] || '00';
    return '.' + dval;
  }
  return '.00';
};
// ????????????????????????
exports.decimalFormat = decimalFormat;var formatRichTextImage = function formatRichTextImage(content) {
  return content.replace(/width\s*:\s*[0-9]+px/g, 'width:100%');;
};exports.formatRichTextImage = formatRichTextImage;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 48:
/*!********************************************!*\
  !*** D:/yjy/??????/??????/????????????/js/config/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.response = exports.CLAIM_AUTH_LOGIN_API = exports.CLAIM_AUTH_LOGIN_PAGES = exports.NAVI_LOGIN_PAGE_TIME_SPACE = exports.INDEX_PAGE = exports.LOGIN_PAGE = exports.DOMAIN_STATIC = exports.DOMAIN = exports.QQ_MAP_WX_KEY = exports.VERSION = void 0; // 	 * - 'develop': ????????? ??????????????????;
// 	 * - 'trial': ?????????;
// 	 * - 'release': ?????????; */
// 	envVersion?: 'develop' | 'trial' | 'release';
var VERSION = '3.0.0';exports.VERSION = VERSION;
var domain; // ???????????????

var extConfig = {};


domain = 'https://pp.hoshiibuy.com';
// domain = 'http://192.168.0.145:8202';





domain = 'https://pp.hoshiibuy.com';

/* QQ??????KEY */

var QQ_MAP_WX_KEY = 'TJIBZ-CTY3W-G5ERW-OCRQK-UWUGV-FZBAZ';exports.QQ_MAP_WX_KEY = QQ_MAP_WX_KEY;

var DOMAIN = domain;
// ??????????????????
exports.DOMAIN = DOMAIN;var DOMAIN_STATIC = 'https://pp.hoshiibuy.com/static';exports.DOMAIN_STATIC = DOMAIN_STATIC;

var LOGIN_PAGE = '/pages/login/login';
/*??????????????????*/exports.LOGIN_PAGE = LOGIN_PAGE;

var INDEX_PAGE = '/pages/auction/specialsshow';
/*?????????????????? ???????????? ??????*/exports.INDEX_PAGE = INDEX_PAGE;

var NAVI_LOGIN_PAGE_TIME_SPACE = 500;
/* ???????????????????????????--????????????????????????????????? */exports.NAVI_LOGIN_PAGE_TIME_SPACE = NAVI_LOGIN_PAGE_TIME_SPACE;

var CLAIM_AUTH_LOGIN_PAGES = ['/pages/user/'];
/* ???????????????????????????--????????????????????????????????? */exports.CLAIM_AUTH_LOGIN_PAGES = CLAIM_AUTH_LOGIN_PAGES;

var CLAIM_AUTH_LOGIN_API = ['/rest/v4/user/'];
/**tabbar ??????**/

/*????????????*/exports.CLAIM_AUTH_LOGIN_API = CLAIM_AUTH_LOGIN_API;

var response = {
  code: {
    SUCCESS: 0,

    /*??????token/?????????*/
    INVALID_TOKEN: 20000,

    /*????????????*/
    LOGIN_OUT: 20001 } };exports.response = response;

/***/ }),

/***/ 49:
/*!*******************************************!*\
  !*** D:/yjy/??????/??????/????????????/js/config/data.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  session: {
    //openToken
    token: '',
    //token
    userId: '' } };

/***/ }),

/***/ 5:
/*!************************************!*\
  !*** D:/yjy/??????/??????/????????????/pages.json ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 50:
/*!****************************************!*\
  !*** D:/yjy/??????/??????/????????????/js/ui/toast.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.alert = exports.confirm = exports.showSuccess = exports.showToast = exports.showError = void 0; /*??????????????????*/
var showError = function showError(title) {return uni.showToast({
    title: title,
    icon: 'none',
    duration: 1500 });};

/*????????????*/exports.showError = showError;

var showToast = function showToast(title) {return uni.showToast({
    title: title,
    icon: 'none',
    duration: 1500 });};

/*??????????????????*/exports.showToast = showToast;

var showSuccess = function showSuccess(title) {return uni.showToast({
    title: title,
    duration: 1500 });};

/*?????????????????????*/exports.showSuccess = showSuccess;

var confirm = function confirm(content) {
  return new Promise(function (resolve, reject) {
    uni.showModal({
      title: '??????',
      content: content,

      success: function success(res) {
        if (res.confirm) {
          resolve();
        } else {
          reject();
        }
      } });


  });
};
/*?????????-???????????????*/exports.confirm = confirm;

var alert = function alert(content) {
  return new Promise(function (resolve, reject) {
    uni.showModal({
      title: '??????',
      showCancel: false,
      content: content,

      success: function success(res) {
        resolve();
      } });


  });
};exports.alert = alert;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 51:
/*!***********************************************!*\
  !*** D:/yjy/??????/??????/????????????/js/session/session.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.setIosCkVersion = exports.getIosCkVersion = exports.checkLotId = exports.lockLotId = exports.setLockLotSet = exports.loginOUt = exports.setUserBankCardStatus = exports.getUserBankCardStatus = exports.setUserPeopleStatus = exports.getUserPeopleStatus = exports.setMobile = exports.getMobile = exports.setUserId = exports.getUserId = exports.setToken = exports.getToken = exports.init = void 0;var init = function init() {
  getToken();
  getUserId();
  getMobile();
  getUserPeopleStatus();
  getUserBankCardStatus();
};exports.init = init;
var getToken = function getToken() {
  if (!uni.$data.session.token) {
    uni.$data.session.token = getSession('token');
  }

  return uni.$data.session.token;
};exports.getToken = getToken;
var setToken = function setToken(token) {
  uni.$data.session.token = token;
  setSession('token', token);
};exports.setToken = setToken;
var getUserId = function getUserId() {
  if (!uni.$data.session.userId) {
    uni.$data.session.userId = getSession('userId');
  }

  return uni.$data.session.userId;
};exports.getUserId = getUserId;
var setUserId = function setUserId(userId) {
  uni.$data.session.userId = userId;
  setSession('userId', userId);
};exports.setUserId = setUserId;

var getMobile = function getMobile() {
  if (!uni.$data.session.mobile) {
    uni.$data.session.mobile = getSession('mobile');
  }

  return uni.$data.session.mobile;
};exports.getMobile = getMobile;
var setMobile = function setMobile(mobile) {
  uni.$data.session.mobile = mobile;
  setSession('mobile', mobile);
};exports.setMobile = setMobile;

var getUserPeopleStatus = function getUserPeopleStatus() {
  if (!uni.$data.session.userPeopleStatus) {
    uni.$data.session.userPeopleStatus = getSession('userPeopleStatus');
  }

  return uni.$data.session.userPeopleStatus;
};exports.getUserPeopleStatus = getUserPeopleStatus;
var setUserPeopleStatus = function setUserPeopleStatus(userPeopleStatus) {
  uni.$data.session.userPeopleStatus = userPeopleStatus;
  setSession('userPeopleStatus', userPeopleStatus);
};exports.setUserPeopleStatus = setUserPeopleStatus;

var getUserBankCardStatus = function getUserBankCardStatus() {
  if (!uni.$data.session.userBankCardStatus) {
    uni.$data.session.userBankCardStatus = getSession('userBankCardStatus');
  }

  return uni.$data.session.userBankCardStatus;
};exports.getUserBankCardStatus = getUserBankCardStatus;
var setUserBankCardStatus = function setUserBankCardStatus(userBankCardStatus) {
  uni.$data.session.userBankCardStatus = userBankCardStatus;
  setSession('userBankCardStatus', userBankCardStatus);
};exports.setUserBankCardStatus = setUserBankCardStatus;

var loginOUt = function loginOUt() {
  setToken('');
  setUserId('');
  setUserBankCardStatus('');
  setUserPeopleStatus('');
  setLockLotSet();
};exports.loginOUt = loginOUt;

function setSession(key, value) {
  uni.setStorageSync('m_' + key, value);
}

function getSession(key) {
  return uni.getStorageSync('m_' + key);
}
var setLockLotSet = function setLockLotSet() {
  uni.setStorageSync('lockLotSet', '');
};exports.setLockLotSet = setLockLotSet;
var lockLotId = function lockLotId(auctionId, lotId) {
  var arr = uni.getStorageSync('lockLotSet' + auctionId) || '';
  var lockLotSet = arr.split(',');
  lockLotSet.push(lotId);
  uni.setStorageSync('lockLotSet' + auctionId, lockLotSet.join(','));
};exports.lockLotId = lockLotId;
var checkLotId = function checkLotId(auctionId, lotId) {
  var val = uni.getStorageSync('lockLotSet' + auctionId) || '';
  return val.indexOf(lotId) >= 0;
};exports.checkLotId = checkLotId;


var getIosCkVersion = function getIosCkVersion() {
  if (!uni.$data.session.iosCkVersion) {
    uni.$data.session.iosCkVersion = getSession('iosCkVersion');
  }

  return uni.$data.session.iosCkVersion;
};exports.getIosCkVersion = getIosCkVersion;
var setIosCkVersion = function setIosCkVersion(iosCkVersion) {
  uni.$data.session.iosCkVersion = iosCkVersion;
  setSession('iosCkVersion', iosCkVersion);
};exports.setIosCkVersion = setIosCkVersion;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 52:
/*!*******************************************!*\
  !*** D:/yjy/??????/??????/????????????/js/net/request.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.sendrequest = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /*????????????Options*/
var getReqOptions = function getReqOptions(options) {
  var data = options.data || {};
  data._m_token = uni.$session.getToken();
  data._version = uni.$config.VERSION;
  var header = {
    "content-type": "application/x-www-form-urlencoded",
    'Accept': 'application/json' };

  Object.assign(header, options.header);
  header.m_token = uni.$session.getToken();
  var method = options.method || 'POST';
  var reqOptions = {};
  Object.assign(reqOptions, options);
  reqOptions.data = data;
  reqOptions.header = header;
  reqOptions.url = options.url;
  reqOptions.method = method;
  return reqOptions;
};
/*????????????*/


var sendrequest = function sendrequest(options) {
  var requestOptions = getReqOptions(options);
  var time = new Date().getTime();
  return new Promise(function (resolve, reject) {
    uni.request(_objectSpread(_objectSpread({}, requestOptions), {}, {

      success: function success(res) {
        // console.log('request url:',options.url)
        var retime = new Date().getTime() - time;
        // console.log('request response time:'+retime+'ms')
        // try{
        var
        data =

        res.data,_res$statusCode = res.statusCode,statusCode = _res$statusCode === void 0 ? 200 : _res$statusCode;

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
            message: data.message });

        } // }
        // catch(err){
        //     reject({code:-1000,errmessage:err});
        // }

      },

      fail: function fail(err) {

        // console.log('fail res:',JSON.stringify(err))
        reject({
          code: -999,
          message: err.errMsg });

      } }));


  });
};exports.sendrequest = sendrequest;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 53:
/*!*******************************************!*\
  !*** D:/yjy/??????/??????/????????????/js/service/api.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.receiveAuctionLot = exports.pubAuctionLot = exports.followLot = exports.getAuctionLot = exports.getAuctionLotList = exports.getAuctionLots = exports.getLot = exports.getAuctionLotStock = exports.getLots = exports.pubAuctionInfo = exports.getAuction = exports.getAuctions = exports.getDictList = exports.getCountUseHistory = exports.getCouponCenterList = exports.getWithdrawCouponList = exports.getUserSpreadShareUrl = exports.getWaitPayOrderNum = exports.checkAppVersion = exports.hasNewUserPackage = exports.sendNewUserCoupon = exports.getPhoneLoginMD5Code = exports.loginByLocalMobile = exports.getLateLyAuction = exports.getJsonConfig = exports.getSwiperImage = exports.getSaleMaxGoods = exports.hasNotReadMsg = exports.getCustomerPhone = exports.getOrderAddress = exports.readAllMsg = exports.getMsgList = exports.getMyIndexData = exports.setDefaultAddress = exports.deleteAddress = exports.getAddressDetail = exports.saveAddress = exports.getAllAddress = exports.confirmPackage = exports.getOrderExpressList = exports.getOrderDetail = exports.cancelOrder = exports.getOrderList = exports.getOrderPayPageInfo = exports.addOrderData = exports.getOrderData = exports.getIndexGoodsList = exports.collectGoods = exports.getGoodsDetail = exports.getAllGoodsCategory = exports.payExpress = exports.appPay = exports.getPayChannel = exports.testPay = exports.payRecharge = exports.uploadFileOSS = exports.shelvesLot = exports.getLotsByUser = exports.createGameBoxOrderPayPlan = exports.getOnSaleTopOne = exports.getOnSaleGameBoxCount = exports.getBalanceShareNoteHistoryList = exports.getBalanceShareSendHistoryList = exports.getDataByBalanceShareSendNotHandleList = exports.getBalanceShareSendNotHandleList = exports.confirmBalanceShareApplay = exports.getDataByBalanceShareApply = exports.receviceNewUserActivity = exports.getNewUserActivity = exports.getDataForBonusPool = exports.getSearchFlowType = exports.getListForBalanceFlow = exports.getUserInfoByTeam = exports.getFlopListByTeam = exports.getBuyListByTeam = exports.getUserBesinessInfo = exports.getBalanceBreakList = exports.getFrozenList = exports.getHistoryByWithdraw = exports.applyWithdraw = exports.getDataByApplyWithDraw = exports.getUserMoneyCountInfo = exports.getDataByBankcardCert = exports.bankcardCert = exports.peopleCert = exports.getDataByPeopleCert = exports.bizLicenseOCR = exports.idCardOCR = exports.appRegister = exports.saveUserNickName = exports.loginByBindWx = exports.loginByWxOpenId = exports.loginByMobileWithSmsCode = exports.loginByMobileWithPassword = exports.resetPwdByMobileWithSmsCode = exports.sendBindWxSmsCode = exports.sendResetPasswordSmsCode = exports.getWxOpenToken = exports.sendLoginSmsCode = exports.sendRegisterSmsCode = void 0;exports.getShareUrlByShareInfo = exports.getQRByShareInfo = exports.getShareUrl = exports.getQR = exports.post = exports.payPost = exports.getReqDomain = exports.endBalanceShareNote = exports.refuseBalanceShareApply = exports.acceptBalanceShareApply = exports.getBalanceShareList = exports.getBalanceShareInfoDetail = exports.getBalanceShareInfo = exports.getAgreement = exports.getCollectGoods = exports.saveUserPhoto = exports.getUserInfo = exports.getShopInfo = exports.saveSuggest = exports.getSuggestLabels = exports.getCommonHelp = exports.getCommonHelpList = exports.getCenturyLots = exports.getCenturyAuctions = exports.getCenturyAuction = exports.buyCenturyLot = exports.getCenturyAuctionLotStock = exports.transferToLot = exports.getWelfareGoodsDetail = exports.getWelfareGoods = exports.getExchangeOrderDetail = exports.getLotShopGoodsCouponDetails = exports.getExchangeCouponInfo = exports.getExchangeApplyStatistics = exports.createLotApply = exports.getCanExchangeLotList = exports.getLotExchangeApplyList = exports.getOrderPayStatus = exports.getLotAgreementInfo = exports.getAutoStayLotConfig = exports.getLotByTurn = exports.getAuctionLotDepositMoney = exports.secKillLot = exports.transferAuctionCouponToUser = exports.consumeAuctionCoupon = exports.getAuctionCouponsCount = exports.getAuctionCoupons = exports.getLotsGoodsCategory = exports.getAuctionLotsLog = void 0; /** ?????????????????????-?????? **/
var sendRegisterSmsCode = function sendRegisterSmsCode(data) {return post('/rest/v4/pp/app/sendRegisterSmsCode', data);};
/** ?????????????????????-?????? **/exports.sendRegisterSmsCode = sendRegisterSmsCode;
var sendLoginSmsCode = function sendLoginSmsCode(data) {return post('/rest/v4/pp/app/sendLoginSmsCode', data);};
/** ?????????????????????openid**/exports.sendLoginSmsCode = sendLoginSmsCode;
var getWxOpenToken = function getWxOpenToken(data) {return post('/rest/v4/pp/app/getWxOpenToken', data);};
/** ?????????????????????-?????????????????? **/exports.getWxOpenToken = getWxOpenToken;
var sendResetPasswordSmsCode = function sendResetPasswordSmsCode(data) {return post('/rest/v4/pp/app/sendResetPasswordSmsCode', data);};
/** ?????????????????????-???????????? **/exports.sendResetPasswordSmsCode = sendResetPasswordSmsCode;
var sendBindWxSmsCode = function sendBindWxSmsCode(data) {return post('/rest/v4/pp/app/sendBindWxSmsCode', data);};
/** ??????????????????-???????????? ??? ??????????????? **/exports.sendBindWxSmsCode = sendBindWxSmsCode;
var resetPwdByMobileWithSmsCode = function resetPwdByMobileWithSmsCode(data) {return post('/rest/v4/pp/app/resetPwdByMobileWithSmsCode', data);};

/** ??????-???????????? ??? ?????? **/exports.resetPwdByMobileWithSmsCode = resetPwdByMobileWithSmsCode;
var loginByMobileWithPassword = function loginByMobileWithPassword(data) {return post('/rest/v4/pp/app/loginByMobileWithPassword', data);};

/** ??????-???????????? ??? ??????????????? **/exports.loginByMobileWithPassword = loginByMobileWithPassword;
var loginByMobileWithSmsCode = function loginByMobileWithSmsCode(data) {return post('/rest/v4/pp/app/loginByMobileWithSmsCode', data);};
/** ??????-??????OpenId?????? **/exports.loginByMobileWithSmsCode = loginByMobileWithSmsCode;
var loginByWxOpenId = function loginByWxOpenId(data) {return post('/rest/v4/pp/app/loginByWxOpenId', data);};
/** ??????-???????????? **/exports.loginByWxOpenId = loginByWxOpenId;
var loginByBindWx = function loginByBindWx(data) {return post('/rest/v4/pp/app/loginByBindWx', data);};
/**??????????????????**/exports.loginByBindWx = loginByBindWx;
var saveUserNickName = function saveUserNickName(data) {return post('/rest/v4/pp/app/user/saveUserNickName', data);};


/** ?????? **/exports.saveUserNickName = saveUserNickName;
var appRegister = function appRegister(data) {return post('/rest/v4/pp/app/register', data);};

/** OCR-??????????????? **/exports.appRegister = appRegister;
var idCardOCR = function idCardOCR(data) {return post('/rest/v4/pp/app/user/appIdCardOcr', data);};
/** OCR-?????????????????? **/exports.idCardOCR = idCardOCR;
var bizLicenseOCR = function bizLicenseOCR(data) {return post('/rest/v4/pp/app/user/bizLicenseOCR', data);};
/** ??????????????????-???????????? **/exports.bizLicenseOCR = bizLicenseOCR;
var getDataByPeopleCert = function getDataByPeopleCert(data) {return post('/rest/v4/pp/app/user/peopleCert/getData', data);};
/** ?????????????????? **/exports.getDataByPeopleCert = getDataByPeopleCert;
var peopleCert = function peopleCert(data) {return post('/rest/v4/pp/app/user/peopleCert', data);};
/** ??????????????? **/exports.peopleCert = peopleCert;
var bankcardCert = function bankcardCert(data) {return post('/rest/v4/pp/app/user/bankcardCert', data);};
/** ???????????????-???????????? **/exports.bankcardCert = bankcardCert;
var getDataByBankcardCert = function getDataByBankcardCert(data) {return post('/rest/v4/pp/app/user/bankcardCert/getData', data);};
/** ?????????????????????????????? **/exports.getDataByBankcardCert = getDataByBankcardCert;
var getUserMoneyCountInfo = function getUserMoneyCountInfo(data) {return post('/rest/v4/pp/app/user/getUserMoneyCountInfo', data);};
/** ????????????-???????????? **/exports.getUserMoneyCountInfo = getUserMoneyCountInfo;
var getDataByApplyWithDraw = function getDataByApplyWithDraw(data) {return post('/rest/v4/pp/app/user/withdraw/apply/getData', data);};
/** ???????????? **/exports.getDataByApplyWithDraw = getDataByApplyWithDraw;
var applyWithdraw = function applyWithdraw(data) {return post('/rest/v4/pp/app/user/withdraw/apply', data);};
/** ?????????????????? **/exports.applyWithdraw = applyWithdraw;
var getHistoryByWithdraw = function getHistoryByWithdraw(data) {return post('/rest/v4/pp/app/user/withdraw/history', data);};
/** ?????????????????? **/exports.getHistoryByWithdraw = getHistoryByWithdraw;
var getFrozenList = function getFrozenList(data) {return post('/rest/v4/pp/app/user/money/getFrozenList', data);};
/** ?????????????????? **/exports.getFrozenList = getFrozenList;
var getBalanceBreakList = function getBalanceBreakList(data) {return post('/rest/v4/pp/app/user/money/getBalanceBreakList', data);};
/** ?????????????????? **/exports.getBalanceBreakList = getBalanceBreakList;
var getUserBesinessInfo = function getUserBesinessInfo(data) {return post('/rest/v4/pp/app/user/getUserBesinessInfo', data);};
/** ??????????????????-?????????????????? **/exports.getUserBesinessInfo = getUserBesinessInfo;
var getBuyListByTeam = function getBuyListByTeam(data) {return post('/rest/v4/pp/app/user/team/getBuyList', data);};
/** ??????????????????-?????????????????? **/exports.getBuyListByTeam = getBuyListByTeam;
var getFlopListByTeam = function getFlopListByTeam(data) {return post('/rest/v4/pp/app/user/team/getFlopList', data);};
/** ??????????????????-???????????? **/exports.getFlopListByTeam = getFlopListByTeam;
var getUserInfoByTeam = function getUserInfoByTeam(data) {return post('/rest/v4/pp/app/user/team/getUserInfo', data);};
/** ????????????-?????? **/exports.getUserInfoByTeam = getUserInfoByTeam;
var getListForBalanceFlow = function getListForBalanceFlow(data) {return post('/rest/v4/pp/app/user/balance/flow/getList', data);};
/** ????????????-????????????-???????????? **/exports.getListForBalanceFlow = getListForBalanceFlow;
var getSearchFlowType = function getSearchFlowType(data) {return post('/rest/v4/pp/app/user/balance/flow/getSearchFlowType', data);};
/** ?????????-???????????? **/exports.getSearchFlowType = getSearchFlowType;
var getDataForBonusPool = function getDataForBonusPool(data) {return post('/rest/v4/pp/app/bonuspool/getData', data);};

/** ????????????????????? **/exports.getDataForBonusPool = getDataForBonusPool;
var getNewUserActivity = function getNewUserActivity(data) {return post('/rest/v4/pp/app/getNewUserActivity', data);};
/** ????????????????????? **/exports.getNewUserActivity = getNewUserActivity;
var receviceNewUserActivity = function receviceNewUserActivity(data) {return post('/rest/v4/pp/app/user/receviceNewUserActivity', data);};
/** ????????????????????????--???????????? **/exports.receviceNewUserActivity = receviceNewUserActivity;
var getDataByBalanceShareApply = function getDataByBalanceShareApply(data) {return post('/rest/v4/pp/app/user/balanceShare/getDataByBalanceShareApply', data);};
/** ????????????????????????--???????????? **/exports.getDataByBalanceShareApply = getDataByBalanceShareApply;
var confirmBalanceShareApplay = function confirmBalanceShareApplay(data) {return post('/rest/v4/pp/app/user/balanceShare/confirmBalanceShareApplay', data);};
/** ??????????????????-?????????????????????????????? **/exports.confirmBalanceShareApplay = confirmBalanceShareApplay;
var getBalanceShareSendNotHandleList = function getBalanceShareSendNotHandleList(data) {return post('/rest/v4/pp/app/user/balanceShare/getBalanceShareSendNotHandleList', data);};
/** ??????????????????-??????????????????????????????-???????????? **/exports.getBalanceShareSendNotHandleList = getBalanceShareSendNotHandleList;
var getDataByBalanceShareSendNotHandleList = function getDataByBalanceShareSendNotHandleList(data) {return post('/rest/v4/pp/app/user/balanceShare/getBalanceShareSendNotHandleList/getData', data);};
/** ??????????????????-??????????????????????????????-???????????? **/exports.getDataByBalanceShareSendNotHandleList = getDataByBalanceShareSendNotHandleList;
var getBalanceShareSendHistoryList = function getBalanceShareSendHistoryList(data) {return post('/rest/v4/pp/app/user/balanceShare/getBalanceShareSendHistoryList', data);};
/** ??????????????????-?????????????????? **/exports.getBalanceShareSendHistoryList = getBalanceShareSendHistoryList;
var getBalanceShareNoteHistoryList = function getBalanceShareNoteHistoryList(data) {return post('/rest/v4/pp/app/user/balanceShare/getBalanceShareNoteHistoryList', data);};
/** ????????????????????????????????? **/exports.getBalanceShareNoteHistoryList = getBalanceShareNoteHistoryList;
var getOnSaleGameBoxCount = function getOnSaleGameBoxCount(data) {return post('/rest/v4/pp/app/gamebox/getOnSaleGameBoxCount', data);};
/** ?????????????????????????????????????????? **/exports.getOnSaleGameBoxCount = getOnSaleGameBoxCount;
var getOnSaleTopOne = function getOnSaleTopOne(data) {return post('/rest/v4/pp/app/gamebox/getOnSaleTopOne', data);};
/** ?????????????????????????????? **/exports.getOnSaleTopOne = getOnSaleTopOne;
var createGameBoxOrderPayPlan = function createGameBoxOrderPayPlan(data) {return post('/rest/v4/pp/app/user/createGameBoxOrderPayPlan', data);};
//????????????
exports.createGameBoxOrderPayPlan = createGameBoxOrderPayPlan;var getLotsByUser = function getLotsByUser(data) {return post('/rest/v4/pp/app/auction/getLotsByUser', data);};exports.getLotsByUser = getLotsByUser;

var shelvesLot = function shelvesLot(data) {
  return post('/rest/v4/pp/auction/shelvesLot ', data);
};



/** ??????????????????OSS **/exports.shelvesLot = shelvesLot;
var uploadFileOSS = function uploadFileOSS(filePathOrBase64) {
  return new Promise(function (resolve, reject) {
    var url = '/rest/v4/pp/app/user/file/oss/sysSave';
    var file = '';
    var filePath = '';
    var isH5 = false;



    if (isH5) {
      var arr = filePathOrBase64.split(','),mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),n = bstr.length,u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      file = new File([u8arr], Date.now() + '.png', { type: mime });
    } else
    {
      filePath = filePathOrBase64;
    }
    uni.uploadFile({
      url: getReqDomain(url) + url,
      fileType: 'image',
      filePath: filePath,
      file: file,
      name: 'file',
      header: {
        m_token: uni.$session.getToken() },

      success: function success(res) {var
        data = res.data,_res$statusCode = res.statusCode,statusCode = _res$statusCode === void 0 ? 200 : _res$statusCode;
        if (statusCode == 200) {
          data = JSON.parse(data);
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
            message: data.message });

        }
      },
      fail: function fail(err) {
        reject({ code: -999, message: err.errMsg });
      } });

  });
};


/**??????		??????**/exports.uploadFileOSS = uploadFileOSS;
var payRecharge = function payRecharge(data) {return post('/rest/v4/pay/recharge', data);};exports.payRecharge = payRecharge;
var testPay = function testPay(data) {return post('/rest/v4/paycall/testpay/service/notifyUrl', data);};exports.testPay = testPay;
var getPayChannel = function getPayChannel(data) {return post('/rest/v4/pay/getPayChannel', data);};exports.getPayChannel = getPayChannel;
var appPay = function appPay(data) {return post('/rest/v4/pay/appPay', data);};exports.appPay = appPay;
var payExpress = function payExpress(data) {return post('/rest/v4/pay/payExpress', data);}; //????????????

/**??????		??????**/


/** ===============xjm start=========================== **/
/** ???????????? **/exports.payExpress = payExpress;
var getAllGoodsCategory = function getAllGoodsCategory(data) {return post('/rest/v4/pp/app/goodsCategory/getAllGoodsCategory', data);};exports.getAllGoodsCategory = getAllGoodsCategory;
var getGoodsDetail = function getGoodsDetail(data) {return post('/rest/v4/pp/app/goods/getGoodsDetail', data);};exports.getGoodsDetail = getGoodsDetail;
var collectGoods = function collectGoods(data) {return post('/rest/v4/pp/app/goods/collectGoods', data);};exports.collectGoods = collectGoods;
var getIndexGoodsList = function getIndexGoodsList(data) {return post('/rest/v4/pp/app/goods/getIndexGoodsList', data);};

/** ?????????????????? **/exports.getIndexGoodsList = getIndexGoodsList;
var getOrderData = function getOrderData(data) {return post('/rest/v4/order/getData', data);};exports.getOrderData = getOrderData;
var addOrderData = function addOrderData(data) {return post('/rest/v4/order/addOrder', data);};

/** ??????????????????????????? **/exports.addOrderData = addOrderData;
var getOrderPayPageInfo = function getOrderPayPageInfo(data) {return post('/rest/v4/pp/app/user/order/getOrderPayPageInfo', data);};
/** ???????????? **/exports.getOrderPayPageInfo = getOrderPayPageInfo;
var getOrderList = function getOrderList(data) {return post('/rest/v4/pp/app/user/order/getOrderList', data);};
/** ????????????-???????????? **/exports.getOrderList = getOrderList;
var cancelOrder = function cancelOrder(data) {return post('/rest/v4/pp/app/user/order/cancelOrder', data);};
/** ???????????? **/exports.cancelOrder = cancelOrder;
var getOrderDetail = function getOrderDetail(data) {return post('/rest/v4/pp/app/user/order/getOrderDetail', data);};
/** ?????????????????? **/exports.getOrderDetail = getOrderDetail;
var getOrderExpressList = function getOrderExpressList(data) {return post('/rest/v4/pp/app/user/order/express/getOrderExpressList', data);};
/** ???????????? **/exports.getOrderExpressList = getOrderExpressList;
var confirmPackage = function confirmPackage(data) {return post('/rest/v4/pp/app/user/order/express/confirmPackage', data);};
/** ???????????????????????? **/exports.confirmPackage = confirmPackage;
var getAllAddress = function getAllAddress(data) {return post('/rest/v4/pp/app/user/address/getAllAddress', data);};
/** ?????????????????? **/exports.getAllAddress = getAllAddress;
var saveAddress = function saveAddress(data) {return post('/rest/v4/pp/app/user/address/saveAddress', data);};
/** ???????????????????????? **/exports.saveAddress = saveAddress;
var getAddressDetail = function getAddressDetail(data) {return post('/rest/v4/pp/app/user/address/getAddressDetail', data);};
/** ?????????????????? **/exports.getAddressDetail = getAddressDetail;
var deleteAddress = function deleteAddress(data) {return post('/rest/v4/pp/app/user/address/deleteAddress', data);};
/** ???????????????????????? **/exports.deleteAddress = deleteAddress;
var setDefaultAddress = function setDefaultAddress(data) {return post('/rest/v4/pp/app/user/address/setDefaultAddress', data);};
/** ??????-??????-??????  **/exports.setDefaultAddress = setDefaultAddress;
var getMyIndexData = function getMyIndexData(data) {return post('/rest/v4/pp/app/user/my/getIndexData', data);};
/** ???????????? **/exports.getMyIndexData = getMyIndexData;
var getMsgList = function getMsgList(data) {return post('/rest/v4/pp/app/user/message/getMsgList', data);};
/** ??????????????????  **/exports.getMsgList = getMsgList;
var readAllMsg = function readAllMsg(data) {return post('/rest/v4/pp/app/user/message/readAllMsg', data);};
/** ??????????????????  **/exports.readAllMsg = readAllMsg;
var getOrderAddress = function getOrderAddress(data) {return post('/rest/v4/pp/app/user/order/express/getOrderAddress', data);};
/** ??????????????????  **/exports.getOrderAddress = getOrderAddress;
var getCustomerPhone = function getCustomerPhone(data) {return post('/rest/v4/pp/app/shopinfo/getCustomerPhone', data);};
/** ?????????????????????  **/exports.getCustomerPhone = getCustomerPhone;
var hasNotReadMsg = function hasNotReadMsg(data) {return post('/rest/v4/pp/app/user/message/hasNotReadMsg', data);};
/** ??????-??????????????????????????????  **/exports.hasNotReadMsg = hasNotReadMsg;
var getSaleMaxGoods = function getSaleMaxGoods(data) {return post('/rest/v4/pp/app/index/getSaleMaxGoods', data);};
/** ??????-?????????????????????  **/exports.getSaleMaxGoods = getSaleMaxGoods;
var getSwiperImage = function getSwiperImage(data) {return post('/rest/v4/pp/app/index/getSwiperImage', data);};
/** ??????-????????????json??????  **/exports.getSwiperImage = getSwiperImage;
var getJsonConfig = function getJsonConfig(data) {return post('/rest/v4/pp/app/index/getJsonConfig', data);};
/** ??????-???????????????????????????  **/exports.getJsonConfig = getJsonConfig;
var getLateLyAuction = function getLateLyAuction(data) {return post('/rest/v4/pp/app/index/getLateLyAuction', data);};
/** ????????????-app-????????????????????????  **/exports.getLateLyAuction = getLateLyAuction;
var loginByLocalMobile = function loginByLocalMobile(data) {return post('/rest/v4/pp/app/loginByLocalMobile', data);};
/** ????????????-app-???????????????????????????????????????  **/exports.loginByLocalMobile = loginByLocalMobile;
var getPhoneLoginMD5Code = function getPhoneLoginMD5Code(data) {return post('/rest/v4/pp/app/getPhoneLoginMD5Code', data);};
/** ??????-???????????????  **/exports.getPhoneLoginMD5Code = getPhoneLoginMD5Code;
var sendNewUserCoupon = function sendNewUserCoupon(data) {return post('/rest/v4/pp/app/user/index/sendNewUserCoupon', data);};
/** ??????-????????????????????????????????????????????????  **/exports.sendNewUserCoupon = sendNewUserCoupon;
var hasNewUserPackage = function hasNewUserPackage(data) {return post('/rest/v4/pp/app/user/index/hasNewUserPackage', data);};
/** ?????????????????? **/exports.hasNewUserPackage = hasNewUserPackage;
var checkAppVersion = function checkAppVersion(data) {return post('/rest/v4/pp/app/shopinfo/checkAppVersion', data);};
/** ??????????????????????????? **/exports.checkAppVersion = checkAppVersion;
var getWaitPayOrderNum = function getWaitPayOrderNum(data) {return post('/rest/v4/pp/app/order/getWaitPayOrderNum', data);};
/** ??????????????????????????? **/exports.getWaitPayOrderNum = getWaitPayOrderNum;
var getUserSpreadShareUrl = function getUserSpreadShareUrl(data) {return post('/rest/v4/pp/app/user/my/getShareUrl', data);};
/** ??????????????????????????? **/exports.getUserSpreadShareUrl = getUserSpreadShareUrl;
var getWithdrawCouponList = function getWithdrawCouponList(data) {return post('/rest/v4/pp/app/user/coupon/getWithdrawCouponList', data);};
/** ??????????????????????????????????????? **/exports.getWithdrawCouponList = getWithdrawCouponList;
var getCouponCenterList = function getCouponCenterList(data) {return post('/rest/v4/pp/app/user/coupon/getCouponCenterList', data);};
/** ??????????????????????????? **/exports.getCouponCenterList = getCouponCenterList;
var getCountUseHistory = function getCountUseHistory(data) {return post('/rest/v4/pp/app/user/coupon/getCountUseHistory', data);};
/** ???????????????????????? **/exports.getCountUseHistory = getCountUseHistory;
var getDictList = function getDictList(data) {return post('/rest/v4/pp/app/sys/dict/getDictList', data);};
/** ===============xjm end============================ **/


/* ================styang begin ======================= */

/* ??????????????????????????? */exports.getDictList = getDictList;
var getAuctions = function getAuctions(data) {
  return post('/rest/v4/pp/app/auction/getAuctions', data);
};
/* ?????????????????? */exports.getAuctions = getAuctions;
var getAuction = function getAuction(data) {
  return post('/rest/v4/pp/app/auction/getAuction', data);
};
/* ?????????????????? */exports.getAuction = getAuction;
var pubAuctionInfo = function pubAuctionInfo(data) {
  return post('/rest/v4/pp/app/auction/pubAuctionInfo', data);
};

/*???????????? */exports.pubAuctionInfo = pubAuctionInfo;
var getLots = function getLots(data) {
  return post('/rest/v4/pp/app/auction/getLots', data);
};
/*???????????? */exports.getLots = getLots;
var getAuctionLotStock = function getAuctionLotStock(data) {
  return post('/rest/v4/pp/app/auction/getAuctionLotStock', data);
};
/*?????????-???????????? */exports.getAuctionLotStock = getAuctionLotStock;
var getLot = function getLot(data) {
  return post('/rest/v4/pp/app/auction/getLot', data);
};
/* ???????????? */exports.getLot = getLot;
var getAuctionLots = function getAuctionLots(data) {
  return post('/rest/v4/pp/app/auction/getAuctionLots', data);
};
/* ???????????????????????? */exports.getAuctionLots = getAuctionLots;
var getAuctionLotList = function getAuctionLotList(data) {
  return post('/rest/v4/pp/app/auction/getAuctionLotList', data);
};
/* ???????????? */exports.getAuctionLotList = getAuctionLotList;
var getAuctionLot = function getAuctionLot(data) {
  return post('/rest/v4/pp/app/auction/getAuctionLot', data);
};
/* ??????-?????? */exports.getAuctionLot = getAuctionLot;
var followLot = function followLot(data) {
  return post('/rest/v4/pp/app/user/auction/followLot', data);
};
/* ??????-?????? */exports.followLot = followLot;
var pubAuctionLot = function pubAuctionLot(data) {
  return post('/rest/v4/pp/app/user/auction/pubAuctionLot', data);
};
/* ??????-???????????? */exports.pubAuctionLot = pubAuctionLot;
var receiveAuctionLot = function receiveAuctionLot(data) {
  return post('/rest/v4/pp/app/auction/receiveAuctionLot', data);
};
/* ??????-???????????? */exports.receiveAuctionLot = receiveAuctionLot;
var getAuctionLotsLog = function getAuctionLotsLog(data) {
  return post('/rest/v4/pp/app/user/auction/getAuctionLotsLog', data);
};
/* ??????-?????????????????? */exports.getAuctionLotsLog = getAuctionLotsLog;
var getLotsGoodsCategory = function getLotsGoodsCategory(data) {
  return post('/rest/v4/pp/app/auction/getLotsGoodsCategory', data);
};
/* VIP???-?????? */exports.getLotsGoodsCategory = getLotsGoodsCategory;
var getAuctionCoupons = function getAuctionCoupons(data) {
  return post('/rest/v4/pp/app/user/auction/getAuctionCoupons', data);
};
/* VIP???-?????? */exports.getAuctionCoupons = getAuctionCoupons;
var getAuctionCouponsCount = function getAuctionCouponsCount(data) {
  return post('/rest/v4/pp/app/user/auction/getAuctionCouponsCount', data);
};
/* VIP???-?????? */exports.getAuctionCouponsCount = getAuctionCouponsCount;
var consumeAuctionCoupon = function consumeAuctionCoupon(data) {
  return post('/rest/v4/pp/app/user/auction/consumeAuctionCoupon', data);
};
/* VIP???-?????? */exports.consumeAuctionCoupon = consumeAuctionCoupon;
var transferAuctionCouponToUser = function transferAuctionCouponToUser(data) {
  return post('/rest/v4/pp/app/user/auction/transferAuctionCouponToUser', data);
};
/* ????????????-?????? */exports.transferAuctionCouponToUser = transferAuctionCouponToUser;
var secKillLot = function secKillLot(data) {
  return post('/rest/v4/pp/app/user/auction/secKillLot', data);
};
/* ????????????-?????????????????? */exports.secKillLot = secKillLot;
var getAuctionLotDepositMoney = function getAuctionLotDepositMoney(data) {
  return post('/rest/v4/pp/app/user/auction/getAuctionLotDepositMoney', data);
};
/**???????????? ??????**/exports.getAuctionLotDepositMoney = getAuctionLotDepositMoney;
var getLotByTurn = function getLotByTurn(data) {
  return post('/rest/v4/pp/app/user/auction/getLotByTurn', data);
};
/**??????-??????????????????**/exports.getLotByTurn = getLotByTurn;
var getAutoStayLotConfig = function getAutoStayLotConfig(data) {
  return post('/rest/v4/pp/app/user/auction/getAutoStayLotConfig', data);
};

/**???????????? ??????????????????**/exports.getAutoStayLotConfig = getAutoStayLotConfig;
var getLotAgreementInfo = function getLotAgreementInfo(data) {
  return post('/rest/v4/pp/app/commonAgreement/getLotAgreementInfo', data);
};
/**?????? ????????????**/exports.getLotAgreementInfo = getLotAgreementInfo;
var getOrderPayStatus = function getOrderPayStatus(data) {
  return post('/rest/v4/pp/app/order/getOrderPayStatus', data);
};

/**????????????-??????????????????**/exports.getOrderPayStatus = getOrderPayStatus;
var getLotExchangeApplyList = function getLotExchangeApplyList(data) {
  return post('/rest/v4/pp/app/user/auction/getLotExchangeApplyList', data);
};

/**????????????-???????????????**/exports.getLotExchangeApplyList = getLotExchangeApplyList;
var getCanExchangeLotList = function getCanExchangeLotList(data) {
  return post('/rest/v4/pp/app/user/auction/getCanExchangeLotList', data);
};

/**????????????-????????????**/exports.getCanExchangeLotList = getCanExchangeLotList;
var createLotApply = function createLotApply(data) {
  return post('/rest/v4/pp/app/user/auction/createLotApply', data);
};

/**????????????-??????**/exports.createLotApply = createLotApply;
var getExchangeApplyStatistics = function getExchangeApplyStatistics(data) {
  return post('/rest/v4/pp/app/user/auction/getExchangeApplyStatistics', data);
};
/**????????????-???????????????**/exports.getExchangeApplyStatistics = getExchangeApplyStatistics;
var getExchangeCouponInfo = function getExchangeCouponInfo(data) {
  return post('/rest/v4/pp/app/user/auction/getExchangeCouponInfo', data);
};

/**??????-?????????????????????**/exports.getExchangeCouponInfo = getExchangeCouponInfo;
var getLotShopGoodsCouponDetails = function getLotShopGoodsCouponDetails(data) {
  return post('/rest/v4/pp/app/user/auction/getLotShopGoodsCouponDetails', data);
};
/* ?????????????????? */exports.getLotShopGoodsCouponDetails = getLotShopGoodsCouponDetails;
var getExchangeOrderDetail = function getExchangeOrderDetail(data) {
  return post('/rest/v4/pp/app/user/auction/getExchangeOrderDetail', data);
};
/* ?????????-?????????????????? */exports.getExchangeOrderDetail = getExchangeOrderDetail;
var getWelfareGoods = function getWelfareGoods(data) {
  return post('/rest/v4/pp/app/gamebox/getWelfareGoods', data);
};

/* ?????????-???????????? */exports.getWelfareGoods = getWelfareGoods;
var getWelfareGoodsDetail = function getWelfareGoodsDetail(data) {
  return post('/rest/v4/pp/app/gamebox/getWelfareGoodsDetail', data);
};

/* ?????????-???????????? */exports.getWelfareGoodsDetail = getWelfareGoodsDetail;
var transferToLot = function transferToLot(data) {
  return post('/rest/v4/pp/app/gamebox/transferToLot', data);
};

/* ?????????-?????? */exports.transferToLot = transferToLot;
var getCenturyAuctionLotStock = function getCenturyAuctionLotStock(data) {
  return post('/rest/v4/pp/app/auction/getCenturyAuctionLotStock', data);
};
/* ?????????-???????????? */exports.getCenturyAuctionLotStock = getCenturyAuctionLotStock;
var buyCenturyLot = function buyCenturyLot(data) {
  return post('/rest/v4/pp/app/auction/buyCenturyLot', data);
};
/* ?????????-???????????? */exports.buyCenturyLot = buyCenturyLot;
var getCenturyAuction = function getCenturyAuction(data) {
  return post('/rest/v4/pp/app/auction/getCenturyAuction', data);
};
/* ?????????-???????????? */exports.getCenturyAuction = getCenturyAuction;
var getCenturyAuctions = function getCenturyAuctions(data) {
  return post('/rest/v4/pp/app/auction/getCenturyAuctions', data);
};
/* ?????????-???????????? */exports.getCenturyAuctions = getCenturyAuctions;
var getCenturyLots = function getCenturyLots(data) {
  return post('/rest/v4/pp/app/auction/getCenturyLots', data);
};



/* ================styang end   ======================= */

/* ================chenjun begin ======================= */

/* ???????????? */exports.getCenturyLots = getCenturyLots;
var getCommonHelpList = function getCommonHelpList(data) {
  return post('/rest/v4/pp/app/common/getCommonHelpList', data);
};
/* ?????????????????? */exports.getCommonHelpList = getCommonHelpList;
var getCommonHelp = function getCommonHelp(data) {
  return post('/rest/v4/pp/app/common/getCommonHelp', data);
};
/* ?????????????????? */exports.getCommonHelp = getCommonHelp;
var getSuggestLabels = function getSuggestLabels(data) {
  return post('/rest/v4/pp/commonSuggestLabel/getCommonSuggestLabelList', data);
};
/* ?????????????????? */exports.getSuggestLabels = getSuggestLabels;
var saveSuggest = function saveSuggest(data) {
  return post('/rest/v4/pp/app/user/commonSuggest/saveSuggest', data);
};
/* ???????????? */exports.saveSuggest = saveSuggest;
var getShopInfo = function getShopInfo(data) {
  return post('/rest/v4/pp/app/shopInfo/getShopInfo', data);
};

/* ???????????? */exports.getShopInfo = getShopInfo;
var getUserInfo = function getUserInfo(data) {
  return post('/rest/v4/pp/app/user/getUserInfo', data);
};
/* ?????????????????? */exports.getUserInfo = getUserInfo;
var saveUserPhoto = function saveUserPhoto(data) {
  return post('/rest/v4/pp/app/user/saveUserPhoto', data);
};

/* ??????????????? */exports.saveUserPhoto = saveUserPhoto;
var getCollectGoods = function getCollectGoods(data) {
  return post('/rest/v4/pp/app/goods/getCollectGoods', data);
};

/* ???????????? */exports.getCollectGoods = getCollectGoods;
var getAgreement = function getAgreement(data) {
  return post('/rest/v4/pp/app/commonAgreement/getCommonAgreement', data);
};

/* ?????????????????? */exports.getAgreement = getAgreement;
var getBalanceShareInfo = function getBalanceShareInfo(data) {
  return post('/rest/v4/pp/app/user/balanceShare/getBalanceShareInfo', data);
};

/* ??????????????????-?????? */exports.getBalanceShareInfo = getBalanceShareInfo;
var getBalanceShareInfoDetail = function getBalanceShareInfoDetail(data) {
  return post('/rest/v4/pp/app/user/balanceShare/getBalanceShareInfoDetail', data);
};

/* ??????-???????????? */exports.getBalanceShareInfoDetail = getBalanceShareInfoDetail;
var getBalanceShareList = function getBalanceShareList(data) {
  return post('/rest/v4/pp/app/user/balanceShare/getBalanceShareList', data);
};

/* ??????-????????????-?????? */exports.getBalanceShareList = getBalanceShareList;
var acceptBalanceShareApply = function acceptBalanceShareApply(data) {
  return post('/rest/v4/pp/app/user/balanceShare/acceptBalanceShareApply', data);
};

/* ??????-????????????-?????? */exports.acceptBalanceShareApply = acceptBalanceShareApply;
var refuseBalanceShareApply = function refuseBalanceShareApply(data) {
  return post('/rest/v4/pp/app/user/balanceShare/refuseBalanceShareApply', data);
};

/* ??????-????????????-???????????? */exports.refuseBalanceShareApply = refuseBalanceShareApply;
var endBalanceShareNote = function endBalanceShareNote(data) {
  return post('/rest/v4/pp/app/user/balanceShare/endBalanceShareNote', data);
};

/* ================chenjun end   ======================= */

/*????????????Domain*/exports.endBalanceShareNote = endBalanceShareNote;
var getReqDomain = function getReqDomain(url) {
  return uni.$config.DOMAIN;
};

/* ??????????????????POST */exports.getReqDomain = getReqDomain;
var payPost = function payPost(url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  data.payChannel = uni.$config.PAY_CHANNEL;
  data.isPayPost = true;
  return post(url, data);
};

/*??????post??????*/exports.payPost = payPost;
var post = function post(url) {var dataSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  /*??????????????? */
  for (var index in uni.$config.CLAIM_AUTH_LOGIN_API) {
    var claim = uni.$config.CLAIM_AUTH_LOGIN_API[index];

    if (url.startsWith(claim) && uni.$config.CLAIM_AUTH_LOGIN_API_EXCLUDE.indexOf(url) < 0) {
      if (!uni.$auth.isLogin()) {
        uni.selfNavigateTo({
          url: uni.$config.LOGIN_PAGE });

        return;
      }
    }
  }

  var data = Object.assign({}, dataSource);





  data.deviceId = uni.$deviceId || '';
  data.clientId = uni.$deviceId || '';
  data.deviceType = uni.$deviceType || '';
  var autoShowErrMsg = data.autoShowErrMsg;
  if (autoShowErrMsg !== undefined) delete data.autoShowErrMsg;
  var callBackExtData = data.callBackExtData;
  if (callBackExtData) delete data.callBackExtData;
  var isPayPost = data.isPayPost;
  if (isPayPost !== undefined) delete data.isPayPost;
  return uni.$request.sendrequest({
    url: getReqDomain(url) + url,
    data: data }).
  then(function (res) {
    if (isPayPost) {
      return payDeal(res);
    }

    return res;
  }).then(function (res) {
    //????????????????????????
    if (callBackExtData) {
      res.callBackExtData = callBackExtData;
    }

    return res;
  }).catch(function (err) {var

    code =

    err.code,message = err.message;var _uni$$config$response =



    uni.$config.response.code,INVALID_TOKEN = _uni$$config$response.INVALID_TOKEN,LOGIN_OUT = _uni$$config$response.LOGIN_OUT;

    if (code == -999) {
      //??????fail
      if (message.indexOf('request:fail time') >= 0) {
        message = '????????????';
        uni.$toast.showError(message);
      } else if (message.indexOf('request:fail') >= 0) {
        message = '?????????';
        uni.$toast.showError(message);
      } else {
        uni.$toast.showError(message);
      } // let pages = getCurrentPages()
      // let lastPage =pages[pages.length -1]
      // lastPage.setData({
      //     network:false
      // })

    } else if (code == INVALID_TOKEN) {
      //?????????
      uni.$auth.loginOut();

      uni.reLaunch({
        url: "/pages/login/login",
        success: function success() {
          setTimeout(function () {
            uni.$toast.showToast('????????????');
          }, 100);
        } });

    } else if (code == LOGIN_OUT) {
      //????????????
      uni.$auth.loginOut();
      // uni.$toast.alert('???????????????');
      uni.switchTab({
        url: "/pages/index/main",
        success: function success() {
          setTimeout(function () {
            uni.$toast.showToast('???????????????');
          }, 100);
        } });


    } else if (code >= 10000) {
      //????????? ??????false
      if (message.length > 30) {
        message = '??????????????????';
        uni.$toast.showError(message);
      } else {
        if (autoShowErrMsg !== false) uni.$toast.showError(message);
      }
    }

    return Promise.reject(err);
  });
};
/* ???????????? */exports.post = post;
var payDeal = function payDeal(res) {
  if (res.isPayed) {
    return res;
  }

  var data = res.data;

  if (data.package.indexOf("test_") >= 0) {
    return uni.$api.testPay({
      'timeStamp': res.data.timeStamp,
      'nonceStr': res.data.nonceStr,
      'package': res.data.package,
      'paySign': res.data.paySign }).
    then(function (notifyres) {
      if (notifyres.success) {
        uni.$toast.showToast('??????????????????');
        return res;
      } else {
        return Promise.reject(notifyres);
      }
    });
  } else {
    return new Promise(function (resolve, reject) {
      uni.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: 'MD5',
        paySign: data.paySign,

        success: function success(notifyres) {
          console.log('requestPayment', notifyres);
          resolve(res);
        },

        fail: function fail(err) {
          console.log('requestPayment err', err);

          if (err.errMsg.indexOf('fail cancel')) {
            reject({
              code: -800,
              message: '????????????' });

          } else {
            reject({
              code: -999,
              message: err.errMsg });

          }
        } });


    });
  }
}; //////////////////////////////????????? start////////////////////////////////////////////
// *   1?????????       1??????    1????????????             ????????????-????????????                u_1_1_userId_goodsId
// *   1?????????       1??????    2.??????????????????        ????????????_????????????                u_1_2_userId_orderId
// *   1?????????       1??????    3.??????????????????       ????????????_??????????????????             u_1_3_userId_posterId  //??????
// *   1?????????       1??????    4.??????????????????       ????????????_??????????????????             u_1_4_userId_posterId  //??????
// *   1?????????       1??????    5.??????????????????        ????????????_????????????               u_1_5_userId_shopId
// *   1?????????       2??????    1.????????????           ????????????_????????????                 u_2_1_shopId_shopId
// *   1?????????       2??????    2.????????????           ????????????_????????????                 u_2_2_shopId_shopId
// *   1?????????       2??????    3.??????               ????????????_????????????                 u_2_3_shopId_shopId
// *   1?????????       2??????    4.??????????????????        ????????????_????????????                 u_2_4_shopId_shopId
// *   1?????????       2??????    5.????????????           ????????????_????????????                 u_2_5_shopId_tableId
// *   1?????????       2??????    6.???????????????          ????????????_???????????????               u_2_6_shopId_couponId


var getQR = function getQR(key) {return "".concat(
  uni.$config.IMAGE_DOMAIN, "/upload/qrcode/").concat(key, ".png?_current_shop=").concat(uni.$config.CURRENT_SHOP);};exports.getQR = getQR;
var getShareUrl = function getShareUrl(key) {
  switch (key.substring(0, 1)) {
    case 'u':
      return "/pages/inmini/share/share?scene=".concat(key, "&card=1");}

};exports.getShareUrl = getShareUrl;
var getQRByShareInfo = function getQRByShareInfo(posterInfo) {var _ref =





  posterInfo || {},mode = _ref.mode,userInfo = _ref.userInfo,goods = _ref.goods,shopInfo = _ref.shopInfo;
  var key = '';

  switch (mode) {
    case 1:
    case 11:
      key = "u_1_5_".concat(userInfo.userId, "_").concat(shopInfo.userId) || false;
      break;

    case 2:
      key = "u_1_1_".concat(userInfo.userId, "_").concat(goods.goodsId) || false;
      break;}


  if (key) {
    return getQR(key);
  }

  return '';
};exports.getQRByShareInfo = getQRByShareInfo;
var getShareUrlByShareInfo = function getShareUrlByShareInfo(posterInfo) {var _ref2 =








  posterInfo || {},mode = _ref2.mode,userInfo = _ref2.userInfo,goods = _ref2.goods,shopInfo = _ref2.shopInfo,rechargeCard = _ref2.rechargeCard,_ref2$shopPosters = _ref2.shopPosters,shopPosters = _ref2$shopPosters === void 0 ? [] : _ref2$shopPosters,selectPosterIndex = _ref2.selectPosterIndex;
  var key = '';

  switch (mode) {
    case 1:
    case 11:
    case 3:
      key = "u_1_5_".concat(userInfo.userId, "_").concat(shopPosters[selectPosterIndex].userShopPosterId) || false;
      break;

    case 2:
      key = "u_1_1_".concat(userInfo.userId, "_").concat(goods.goodsId) || false;
      break;}


  if (key) {
    return getShareUrl(key);
  }

  return '';
};exports.getShareUrlByShareInfo = getShareUrlByShareInfo;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 54:
/*!********************************************!*\
  !*** D:/yjy/??????/??????/????????????/js/session/auth.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.isLoginAndCheckPeopleStatus = exports.getMobileAuthWithShopId = exports.getMobileAuthWithRecUserId = exports.validateMobileAuth = exports.getMobileAuth = exports.userClientCodeLoginWithRecUserId = exports.userClientCodeLogin = exports.getOpenTokenAuth = exports.promiseOpenToken = exports.promiseWxSession = exports.toLogin = exports.checkLogin = exports.isLogin = exports.loginOut = exports.loginSuccess = void 0;var _session_key;


/*???????????? */
var loginSuccess = function loginSuccess(e) {var _ref =






  e || {},_ref$token = _ref.token,token = _ref$token === void 0 ? '' : _ref$token,_ref$userId = _ref.userId,userId = _ref$userId === void 0 ? '' : _ref$userId,_ref$mobile = _ref.mobile,mobile = _ref$mobile === void 0 ? '' : _ref$mobile,_ref$userPeopleStatus = _ref.userPeopleStatus,userPeopleStatus = _ref$userPeopleStatus === void 0 ? '' : _ref$userPeopleStatus,_ref$userBankCardStat = _ref.userBankCardStatus,userBankCardStatus = _ref$userBankCardStat === void 0 ? '' : _ref$userBankCardStat;
  uni.$session.setToken(token);
  uni.$session.setUserId(userId);
  uni.$session.setMobile(mobile);
  uni.$session.setUserPeopleStatus(userPeopleStatus);
  uni.$session.setUserBankCardStatus(userBankCardStatus);
};


/*???????????? */exports.loginSuccess = loginSuccess;
var loginOut = function loginOut() {
  uni.$session.setToken('');
  uni.$session.setUserId('');
  uni.$session.setMobile('');
  uni.$session.setUserPeopleStatus('');
  uni.$session.setUserBankCardStatus('');
};

/* ???????????? */exports.loginOut = loginOut;
var isLogin = function isLogin() {
  return uni.$session.getToken() ? true : false;
};
/**
    * ??????????????????-?????????-????????????
    * @param e {autoGoLoginPage=true}
    */exports.isLogin = isLogin;

var checkLogin = function checkLogin()


{var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref2$autoGoLoginPage = _ref2.autoGoLoginPage,autoGoLoginPage = _ref2$autoGoLoginPage === void 0 ? true : _ref2$autoGoLoginPage,_ref2$loginQuery = _ref2.loginQuery,loginQuery = _ref2$loginQuery === void 0 ? '' : _ref2$loginQuery;
  return new Promise(function (resolve, reject) {
    if (isLogin()) {
      resolve();
    } else {
      if (autoGoLoginPage) toLogin(loginQuery);
      reject();
    }
  });
};
/* ??????????????? */exports.checkLogin = checkLogin;

var toLogin = function toLogin(query) {
  return uni.selfNavigateTo({
    url: uni.$config.LOGIN_PAGE + '?' + query });

};
/* ????????????session?????? */exports.toLogin = toLogin;

var promiseWxSession = function promiseWxSession() {
  return new Promise(function (resolve, reject) {
    uni.checkSession({
      success: function success() {
        resolve();
      },

      fail: function fail() {
        getOpenTokenAuth().then(function () {
          resolve();
        }).catch(function () {
          reject();
        });
      } });


  });
};
/* ??????openToken?????? */exports.promiseWxSession = promiseWxSession;

var promiseOpenToken = function promiseOpenToken() {
  return new Promise(function (resolve, reject) {
    if (uni.$session.getOpenToken()) {
      resolve();
    } else {
      getOpenTokenAuth().then(function () {
        resolve();
      }).catch(function () {
        reject();
      });
    }
  });
};
/*??????code????????????openToken */exports.promiseOpenToken = promiseOpenToken;

var getOpenTokenAuth = function getOpenTokenAuth() {
  return new Promise(function (resolve, reject) {
    if (typeof uni.login === 'function') {
      uni.login({
        success: function success(res) {
          console.log("res", res);
          uni.$api.getWxCode({
            "code": res.code,
            'clientType': uni.$config.CLIENT_TYPE }).
          then(function (json) {var

            session_key =

            json.session_key,_json$openToken = json.openToken,openToken = _json$openToken === void 0 ? '' : _json$openToken;
            _session_key = session_key;
            uni.$session.setOpenToken(openToken);
            resolve(json);
          }).catch(function (err) {
            reject(err);
          });
        } });

    } else {
      resolve();
    }

  });
};
/* openToken?????? */
// export const openTokenLogin = ({recUserId=''}) =>{
exports.getOpenTokenAuth = getOpenTokenAuth;
var userClientCodeLogin = function userClientCodeLogin()

{var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref3$recUserId = _ref3.recUserId,recUserId = _ref3$recUserId === void 0 ? '' : _ref3$recUserId;
  return new Promise(function (resolve, reject) {
    uni.login({
      success: function success(res) {
        console.log("res", res);
        uni.$api.userClientCodeLogin({
          "code": res.code,
          'recUserId': recUserId }).
        then(function (json) {var

          session_key =


          json.session_key,_json$openToken2 = json.openToken,openToken = _json$openToken2 === void 0 ? '' : _json$openToken2,_json$token = json.token,token = _json$token === void 0 ? '' : _json$token;
          _session_key = session_key;
          uni.$session.setOpenToken(openToken);

          if (token) {
            loginSuccess(json);
          }

          resolve(json);
        }).catch(function (err) {
          reject(err);
        });
      } });

  });
};
/* openToken?????? - ???????????????ID */
// export const openTokenLoginWithRecUserId = () =>{
exports.userClientCodeLogin = userClientCodeLogin;
var userClientCodeLoginWithRecUserId = function userClientCodeLoginWithRecUserId() {
  return userClientCodeLogin({
    recUserId: uni.$data.share.recUserId });

};
/* ?????????????????? */exports.userClientCodeLoginWithRecUserId = userClientCodeLoginWithRecUserId;

var getMobileAuth = function getMobileAuth(e) {var _e$saveToken =


  e.saveToken,saveToken = _e$saveToken === void 0 ? true : _e$saveToken;
  return new Promise(function (resolve, reject) {
    uni.checkSession({
      success: function success() {
        var ency = e.detail.encryptedData;
        var iv = e.detail.iv;
        var sessionkey = _session_key;

        if (e.detail.errMsg.indexOf('getPhoneNumber:fail') >= 0) {
          console.log("??????????????????");
          reject('??????????????????');
        } else {
          //????????????
          uni.$api.wxLoginRegister({
            'clientType': uni.$config.CLIENT_TYPE,
            'encryptedData': ency,
            'sessionkey': sessionkey,
            'iv': iv,
            nickName: e.nickName || '',
            avatarUrl: e.avatarUrl || '' }).
          then(function (res) {
            console.log("????????????~~~~~~~?????????????????????????????????~~~~~~~~");
            if (saveToken) loginSuccess(res);
            resolve(res);
          }).catch(function (err) {
            reject('??????????????????');
          });
        }
      },
      fail: function fail() {
        console.log("session_key ?????????????????????????????????????????????");
        getOpenTokenAuth();
        reject('session_key ????????????');
      } });

  });
};
/* ?????????????????? */exports.getMobileAuth = getMobileAuth;

var validateMobileAuth = function validateMobileAuth(e) {var _e$saveToken2 =


  e.saveToken,saveToken = _e$saveToken2 === void 0 ? true : _e$saveToken2;
  return new Promise(function (resolve, reject) {
    uni.checkSession({
      success: function success() {
        var ency = e.detail.encryptedData;
        var iv = e.detail.iv;
        var sessionkey = _session_key;

        if (e.detail.errMsg.indexOf('getPhoneNumber:fail') >= 0) {
          console.log("??????????????????");
          reject('??????????????????');
        } else {
          //????????????
          uni.$api.wxValidateMobile({
            'clientType': uni.$config.CLIENT_TYPE,
            'encryptedData': ency,
            'sessionkey': sessionkey,
            'iv': iv }).
          then(function (res) {
            resolve(res);
          }).catch(function (err) {
            reject(err);
          });
        }
      },
      fail: function fail() {
        console.log("session_key ?????????????????????????????????????????????");
        getOpenTokenAuth();
        reject('session_key ????????????');
      } });

  });
};
/* ??????????????????-??????-????????? */exports.validateMobileAuth = validateMobileAuth;

var getMobileAuthWithRecUserId = function getMobileAuthWithRecUserId(e) {var _e$saveToken3 =


  e.saveToken,saveToken = _e$saveToken3 === void 0 ? true : _e$saveToken3;
  return new Promise(function (resolve, reject) {
    uni.checkSession({
      success: function success() {
        var ency = e.detail.encryptedData;
        var iv = e.detail.iv;
        var sessionkey = _session_key;

        if (e.detail.errMsg.indexOf('getPhoneNumber:fail') >= 0) {
          console.log("??????????????????");
          reject('??????????????????');
        } else {
          //????????????
          uni.$api.wxLoginRegister({
            'clientType': uni.$config.CLIENT_TYPE,
            'encryptedData': ency,
            'sessionkey': sessionkey,
            'iv': iv,
            'recUserId': uni.$data.share.recUserId || '',
            nickName: e.nickName || '',
            avatarUrl: e.avatarUrl || '' }).
          then(function (res) {
            console.log("????????????~~~~~~~?????????????????????????????????~~~~~~~~");
            if (saveToken) loginSuccess(res);
            resolve(res);
          }).catch(function (err) {
            reject('??????????????????');
          });
        }
      },
      fail: function fail() {
        console.log("session_key ?????????????????????????????????????????????");
        getOpenTokenAuth();
        reject('session_key ????????????');
      } });

  });
};
/* ??????????????????-??????-???????????? */exports.getMobileAuthWithRecUserId = getMobileAuthWithRecUserId;

var getMobileAuthWithShopId = function getMobileAuthWithShopId(e) {var _e$saveToken4 =


  e.saveToken,saveToken = _e$saveToken4 === void 0 ? true : _e$saveToken4;
  return new Promise(function (resolve, reject) {
    uni.checkSession({
      success: function success() {
        var ency = e.detail.encryptedData;
        var iv = e.detail.iv;
        var sessionkey = _session_key;

        if (e.detail.errMsg.indexOf('getPhoneNumber:fail') >= 0) {
          console.log("??????????????????");
          reject('??????????????????');
        } else {
          //????????????
          uni.$api.wxLoginRegister({
            'clientType': uni.$config.CLIENT_TYPE,
            'encryptedData': ency,
            'sessionkey': sessionkey,
            'iv': iv,
            'recShopId': uni.$data.share.recShopId || '',
            nickName: e.nickName || '',
            avatarUrl: e.avatarUrl || '' }).
          then(function (res) {
            console.log("????????????~~~~~~~?????????????????????????????????~~~~~~~~");
            if (saveToken) loginSuccess(res);
            resolve(res);
          }).catch(function (err) {
            reject('??????????????????');
          });
        }
      },
      fail: function fail() {
        console.log("session_key ?????????????????????????????????????????????");
        getOpenTokenAuth();
        reject('session_key ????????????');
      } });

  });
};exports.getMobileAuthWithShopId = getMobileAuthWithShopId;
var isLoginAndCheckPeopleStatus = function isLoginAndCheckPeopleStatus(e) {
  var token = uni.$session.getToken();
  if (!token) {
    uni.redirectTo({
      url: "/pages/login/login" });

    return false;
  }
  var userPeopleStatus = uni.$session.getUserPeopleStatus();

  if (userPeopleStatus != 1) {
    uni.redirectTo({
      url: "/pages/login/realname" });

    return false;
  }
  return true;
};
// /* ????????????-??????token*/
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
exports.isLoginAndCheckPeopleStatus = isLoginAndCheckPeopleStatus;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 55:
/*!*******************************************!*\
  !*** D:/yjy/??????/??????/????????????/js/utils/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var onShareAppMessage = _interopRequireWildcard(__webpack_require__(/*! ./onShareAppMessage */ 56));
var socket = _interopRequireWildcard(__webpack_require__(/*! ./socket */ 57));
var format = _interopRequireWildcard(__webpack_require__(/*! ./format */ 47));
var cache = _interopRequireWildcard(__webpack_require__(/*! ./cache */ 58));
var dir = _interopRequireWildcard(__webpack_require__(/*! ./localDir */ 59));
var md5 = _interopRequireWildcard(__webpack_require__(/*! ./md5 */ 60));
var au = _interopRequireWildcard(__webpack_require__(/*! ./au */ 61));
var mathUtil = _interopRequireWildcard(__webpack_require__(/*! ./mathUtil */ 62));
var date = _interopRequireWildcard(__webpack_require__(/*! ./date */ 63));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _statusHeight;

module.exports = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, onShareAppMessage),
socket),
format),
cache),
dir),
md5),
au),
mathUtil), {}, {
  date: date,
  blobToDataURI: function blobToDataURI(blob, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function (e) {
      var img = e.target.result.replace(/^data:image\/\w+;base64,/, ""); //??????base64?????????
      callback(img);
    };
  },
  /** ???????????? ???????????????????????? **/
  blankScreenWatchAndRelunch: function blankScreenWatchAndRelunch(pageObj, containerId, relunchPath) {
    // ???????????????ios?????????????????????
    uni.getSystemInfo({
      success: function success(res) {
        if (res.platform == 'ios') {
          var query = uni.createSelectorQuery().in(pageObj);
          var isRecovery = true;
          query.
          select(containerId).
          boundingClientRect(function (data) {
            isRecovery = false;
          }).
          exec();
          var timer = setTimeout(function () {
            if (isRecovery) {
              uni.reLaunch({
                url: relunchPath });

              clearTimeout(timer);
              timer = null;
            }
          }, 500);

        }
      } });

  },
  /**????????????navi**/
  setSystemNavi: function setSystemNavi(pageObj) {
    var info = uni.getMenuButtonBoundingClientRect();

    if (!_statusHeight) {
      uni.getSystemInfo({
        success: function success(res) {
          var info = uni.getMenuButtonBoundingClientRect();
          _statusHeight = res.statusBarHeight;
          var navBottom = info.bottom - info.height - res.statusBarHeight;
          pageObj.setData({
            navHeight: info.height,
            navTop: info.top,
            navBottom: navBottom,
            statusHeight: _statusHeight });

        },

        fail: function fail(err) {
          console.log(err);
        } });


    } else {
      var navBottom = info.bottom - info.height - _statusHeight;
      pageObj.setData({
        navHeight: info.height,
        navTop: info.top,
        navBottom: navBottom,
        statusHeight: _statusHeight });

    }
  },

  /* ??????????????? */
  toPlatform: function toPlatform() {var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'pages/user/index';var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    uni.$auth.checkLogin().then(function () {
      var token, openToken;
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
        path: path,
        envVersion: uni.$config.ENV,
        extraData: data,

        success: function success(res) {// ????????????
        } });


    });
  },

  /*????????????*/
  defaultAvatar: function defaultAvatar(url) {var isShop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (url && url.indexOf('http') === 0) {
      return url;
    }

    return url ? "".concat(uni.$config.IMAGE_DOMAIN + url) : "/img/".concat(isShop ? 'sj' : '', "touxiang@3x.png");
  },

  /* ????????? */
  getRandom: function getRandom() {return Date.now().toString(16);},

  /* ??????????????? */
  isNumber: function isNumber(v) {return /^[0-9]+$/.test(v);},

  /* ???????????? */
  inputBind: function inputBind(e, pageObj) {
    var key = e.currentTarget.dataset.keyname;
    var value = e.detail.value;
    pageObj.setData(_defineProperty({},
    key, value));

  },

  /* ???????????? */
  callTel: function callTel(phoneNumber) {
    uni.makePhoneCall({
      phoneNumber: phoneNumber });

  },

  /* ??????????????? */
  scanQr: function scanQr() {
    return new Promise(function (resolve, reject) {
      uni.scanCode({
        onlyFromCamera: true,

        success: function success(res) {
          console.log('scanQr', res);
          resolve(res);
        },

        fail: function fail(err) {
          reject();
        } });


    });
  },

  /* ???????????? */
  saveImageToPhoto: function saveImageToPhoto(filePath) {
    uni.getSetting({
      success: function success(info) {
        if (info.authSetting && info.authSetting['scope.writePhotosAlbum']) {
          uni.showLoading({
            title: '?????????' });

          uni.saveImageToPhotosAlbum({
            filePath: filePath,

            success: function success(res) {
              uni.$toast.showError('?????????????????????????????????????????????~');
            },

            fail: function fail() {
              uni.hideLoading();
            } });


        } else {
          uni.authorize({
            scope: 'scope.writePhotosAlbum',

            success: function success() {
              uni.showLoading({
                title: '?????????' });

              uni.saveImageToPhotosAlbum({
                filePath: filePath,

                success: function success(res) {
                  uni.$toast.showError('?????????????????????????????????????????????~');
                },

                fail: function fail() {
                  uni.hideLoading();
                } });


            },

            fail: function fail() {
              uni.showModal({
                title: '???????????????????????????',
                showCancel: false,

                success: function success() {
                  uni.openSetting();
                } });


            } });


        }
      } });


  },

  /* ?????????????????? */
  getLocation: function getLocation()

  {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$authTipMsg = _ref.authTipMsg,authTipMsg = _ref$authTipMsg === void 0 ? '????????????????????????????????????????????????????????????????????????????????????' : _ref$authTipMsg;
    return new Promise(function (resolve, reject) {
      uni.getLocation({
        type: 'gcj02',

        success: function success(res) {
          resolve(res);
        },

        fail: function fail(err) {
          uni.getSetting({
            success: function success(res) {
              var statu = res.authSetting;

              if (!statu['scope.userLocation']) {
                uni.showModal({
                  title: '????????????????????????',
                  content: authTipMsg,
                  success: function success(tip) {
                    if (tip.confirm) {
                      uni.openSetting({
                        success: function success(data) {
                          if (data.authSetting["scope.userLocation"] === true) {
                            //??????????????????????????????chooseLocation????????????
                            uni.getLocation({
                              type: 'gcj02',

                              success: function success(res) {
                                resolve(res);
                              },

                              fail: function fail(err) {
                                reject(err);
                              } });


                          } else {
                            uni.$toast.showError('????????????'); // reject('????????????')
                          }
                        },

                        fail: function fail(err) {
                          // reject(err)
                          uni.$toast.alert('??????????????????,??????????????????????????????????????????');
                        } });


                    }
                  } });

              } else {
                uni.getLocation({
                  type: 'gcj02',

                  success: function success(res) {
                    resolve(res);
                  },

                  fail: function fail(err) {
                    reject(err);
                  } });


              }
            },
            fail: function fail(err) {
              uni.$toast.showError('????????????????????????');
              reject(err);
            } });

        } });


    });
  },

  /** ??????????????????????????????(??????) */
  getDistance: function getDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // EARTH_RADIUS;

    s = Math.round(s * 10000) / 10000;
    return s;
  },

  /** ???????????? */
  checkNet: function checkNet() {
    return new Promise(function (resolve, reject) {
      uni.getNetworkType({
        success: function success(res) {
          console.log('getNetworkType', res);

          if (res.networkType == 'none') {
            reject();
          } else {
            resolve();
          }
        },

        fail: function fail() {
          reject();
        } });


    });
  },

  /** ???????????? */
  onNetStatusChange: function onNetStatusChange() {
    return new Promise(function (resolve, reject) {
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

  /*???????????????RGB*/
  colorRgb: function colorRgb(sColor) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/; // ?????????16????????????

    if (sColor && reg.test(sColor)) {
      //????????????????????????
      var sColorChange = [];

      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }

      return {
        r: sColorChange[0],
        g: sColorChange[1],
        b: sColorChange[2] };

    }

    return;
  },
  //???????????????????????????
  setTabBarOrderNum: function setTabBarOrderNum() {
    if (uni.$auth.isLogin()) {
      uni.$api.getWaitPayOrderNum().then(function (res) {
        if (res.success && res.num > 0) {
          var text = "";
          if (res.num > 99) {
            text = "99+";
          } else {
            text = res.num + "";
          }
          uni.setTabBarBadge({
            index: 3,
            text: text });

        } else {
          uni.removeTabBarBadge({
            index: 3 });

        }
      });
    }
  },
  getByteLen: function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
      var a = val.charAt(i);
      if (a.match(/[^\x00-\xff]/ig) != null) {
        len += 2;
      } else
      {
        len += 1;
      }
    }
    return len;
  } });
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 56:
/*!*******************************************************!*\
  !*** D:/yjy/??????/??????/????????????/js/utils/onShareAppMessage.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.onShareMessage = exports.onShareAppMessage = void 0; /**
                                                                                                                                         * ????????????- TODO ??????
                                                                                                                                         * @param e
                                                                                                                                         */
var onShareAppMessage = function onShareAppMessage(e) {// let pages =getCurrentPages()
  // let page = pages[pages.length - 1]
  // let {route, data} = page
  // console.log('onShareAppMessage',e ,route, data)
  // var type = e.target.dataset.type
  // if (type == 'scroll-poster'){
  //     var index = e.target.dataset.index
  //     var content = e.target.dataset.content
  //     return onShareMessage({content,index})
  // }
  // else if (type == 'goods-friend')  {
  //     // var goods = e.target.dataset.goods
  //     var index = e.target.dataset.index
  //     var content = e.target.dataset.content
  //     return onShareMessage({content,index})
  // }
  // else if (type == 'shop-friend')  {
  //     // var goods = e.target.dataset.goods
  //     var index = e.target.dataset.index
  //     var content = e.target.dataset.content
  //     return onShareMessage({content,index})
  // }
};exports.onShareAppMessage = onShareAppMessage;
var onShareMessage = function onShareMessage(_ref)


{// let item = content[index] || {}
  //
  // return {
  //     title:  item.title || '',
  //     path: item.url || '',
  //     imageUrl: item.cardUrl || item.posterUrl || ''
  // }
  var content = _ref.content,index = _ref.index;};exports.onShareMessage = onShareMessage;

/***/ }),

/***/ 57:
/*!********************************************!*\
  !*** D:/yjy/??????/??????/????????????/js/utils/socket.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.setTableEatNumber = exports.getTableEatNumber = exports.sendSocketMessage = exports.unWatchMealOnMessage = exports.initMealSocket = void 0;var SOCKET_MEAL_TASK = '';
var SOCKET_TABLE_ID = '';
var onMessage_Listeners = [];
/* ????????? */

var initMealSocket = function initMealSocket()


{var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$tableId = _ref.tableId,tableId = _ref$tableId === void 0 ? '' : _ref$tableId,_ref$onMessage = _ref.onMessage,onMessage = _ref$onMessage === void 0 ? '' : _ref$onMessage;
  SOCKET_MEAL_TASK = uni._socket_meal_task || SOCKET_MEAL_TASK || '';

  if (SOCKET_TABLE_ID != tableId) {
    //??????????????????????????????????????????
    if (SOCKET_MEAL_TASK) {
      SOCKET_MEAL_TASK.close();
    }
  }

  SOCKET_TABLE_ID = tableId || SOCKET_TABLE_ID;

  if (!SOCKET_MEAL_TASK) {
    //??????
    SOCKET_MEAL_TASK = uni.connectSocket({
      url: uni.$config.WEB_SOCKET_DOMAIN + '/addorder/' + SOCKET_TABLE_ID + '/0',

      success: function success() {
        console.log('connect success');
      },

      fail: function fail(res) {
        console.log(res);
      } });


    uni._socket_meal_task = SOCKET_MEAL_TASK; //?????? ??????????????????

    SOCKET_MEAL_TASK.onOpen(function (res) {
      console.log(SOCKET_MEAL_TASK, 'onOpen', res);
    }); //?????? ??????????????????

    SOCKET_MEAL_TASK.onClose(function (res) {
      console.log(SOCKET_MEAL_TASK, 'onClose', res);
      SOCKET_MEAL_TASK = '';
      uni._socket_meal_task = '';
    }); //?????? ????????????

    SOCKET_MEAL_TASK.onError(function (err) {
      console.log(SOCKET_MEAL_TASK, 'onError', err);
      SOCKET_MEAL_TASK = '';
      uni._socket_meal_task = '';
    });
  }

  if (onMessage) {
    //?????? ?????????????????????????????????
    SOCKET_MEAL_TASK.onMessage(function (res) {
      var resObj = JSON.parse(JSON.parse(res.data));
      console.log('onMessage', resObj);
      onMessage(resObj);
    });
  }
};exports.initMealSocket = initMealSocket;
var unWatchMealOnMessage = function unWatchMealOnMessage(listener) {
  var index = onMessage_Listeners.indexOf(listener);

  if (index > -1) {
    onMessage_Listeners.splice(index, 1);
  }
};exports.unWatchMealOnMessage = unWatchMealOnMessage;
var sendSocketMessage = function sendSocketMessage(data) {
  if (SOCKET_MEAL_TASK) {
    SOCKET_MEAL_TASK.send({
      data: JSON.stringify(data),

      success: function success() {// SOCKET_MEAL_TASK.send({
        //     data:'[]'
        // })
      },

      fail: function fail(res) {
        SOCKET_MEAL_TASK = '';
      } });


  }
};
/**
    * ??????????????????
    */exports.sendSocketMessage = sendSocketMessage;

var getTableEatNumber = function getTableEatNumber() {
  sendSocketMessage([{
    operation: 'getNumber' }]);

};
/**
    * ??????????????????
    * @param eatNumber
    */exports.getTableEatNumber = getTableEatNumber;

var setTableEatNumber = function setTableEatNumber(eatNumber) {
  uni.$data.shopCar.diannei.eatNumber = eatNumber;
  sendSocketMessage([{
    operation: 'modifyNumber',
    eatNumber: eatNumber }]);

};exports.setTableEatNumber = setTableEatNumber;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 58:
/*!*******************************************!*\
  !*** D:/yjy/??????/??????/????????????/js/utils/cache.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.getImageInfo = exports.getCacheImg = exports.getImgCacheKey = exports.addCacheSync = exports.getCacheDataSync = exports.clear = void 0;var cacheData = {};
var clear = function clear() {
  cacheData = {};
};exports.clear = clear;
var getCacheDataSync = function getCacheDataSync(key) {
  if (key) {
    return cacheData[key];
  }

  return cacheData;
};exports.getCacheDataSync = getCacheDataSync;
var addCacheSync = function addCacheSync(key, value) {
  cacheData[key] = value;
};exports.addCacheSync = addCacheSync;
var getImgCacheKey = function getImgCacheKey(imgUrl) {
  // let key = imgUrl.replace(/\//g,"__").replace(/:/g,"$")
  var key = 'CITY_TP' + uni.$utils.strMd5(imgUrl);
  return key;
}; // export const addCacheImgSync = (imgUrl) =>{
//     let key = getImgCacheKey(imgUrl)
//     addCacheSync(key, imgUrl)
// }
exports.getImgCacheKey = getImgCacheKey;
var getCacheImg = function getCacheImg(_ref)



{var imgUrl = _ref.imgUrl,key = _ref.key,_ref$isFindLocalDir = _ref.isFindLocalDir,isFindLocalDir = _ref$isFindLocalDir === void 0 ? false : _ref$isFindLocalDir;
  if (!key) {
    if (!imgUrl) {
      return Promise.reject('imgUrl ??????');
    }

    key = getImgCacheKey(imgUrl);
  }

  var filePath = cacheData[key];
  return uni.$utils.getDataFileInfo({
    filePath: filePath }).
  catch(function (err) {
    if (isFindLocalDir) {
      var fileName = key;
      return uni.$utils.getDataFileInfo({
        fileName: fileName }).
      then(function (res) {
        var filePath = res.filePath;
        addCacheSync(key, filePath);
        return Promise.resolve(res);
      });
    } else {
      return Promise.reject(err);
    }
  });
};exports.getCacheImg = getCacheImg;
var getImageInfo = function getImageInfo(_ref2)


{var imgUrl = _ref2.imgUrl,_ref2$isAddCache = _ref2.isAddCache,isAddCache = _ref2$isAddCache === void 0 ? false : _ref2$isAddCache;
  var key = getImgCacheKey(imgUrl);
  return new Promise(function (resolve, reject) {
    uni.getImageInfo({
      src: imgUrl,

      success: function success(res) {
        var filePath = res.path;

        if (isAddCache) {
          addCacheSync(key, filePath);
        }

        res.filePath = filePath;
        resolve(res);
      },

      fail: function fail(err) {
        reject(err);
      } });


  });
};exports.getImageInfo = getImageInfo;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 59:
/*!**********************************************!*\
  !*** D:/yjy/??????/??????/????????????/js/utils/localDir.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.mkDataImg = exports.getDataFileInfo = exports.existDataFile = exports.readDataDir = exports.readDir = exports.delDir = exports.mkDirSync = exports.existDir = exports.getDataDirRoot = exports.getDirRoot = exports.getImgFileName = exports.setDirVersion = void 0;var DIR_VERSION = 0;
var setDirVersion = function setDirVersion(version) {
  DIR_VERSION = version; // DIR_DATA_PATH  = wx.env.USER_DATA_PATH +'/'+ version

  for (var i = 0; i < DIR_VERSION; i++) {
    var _dir = getDirRoot() + '/' + i;
    var exist = existDir(_dir);

    if (exist) {
      delDir({
        dir: _dir });

    }
  }

  var dir = getDirRoot() + '/' + version;

  if (!existDir(dir)) {
    mkDirSync(dir);
  }
};exports.setDirVersion = setDirVersion;
var getImgFileName = function getImgFileName(imgUrl) {
  // let key = imgUrl.replace(/\//g,"__").replace(/:/g,"$")
  var key = 'CITY_TP' + uni.$utils.strMd5(imgUrl);
  console.log('getImgFileName', key);
  return key;
};exports.getImgFileName = getImgFileName;
var getDirRoot = function getDirRoot() {
  return uni.env.USER_DATA_PATH;
};exports.getDirRoot = getDirRoot;
var getDataDirRoot = function getDataDirRoot() {
  return uni.env.USER_DATA_PATH + '/' + DIR_VERSION;
};exports.getDataDirRoot = getDataDirRoot;
var existDir = function existDir(dir) {
  try {
    return uni.getFileSystemManager().readdirSync(dir) ? true : false;
  } catch (e) {
    return false;
  }
};exports.existDir = existDir;
var mkDirSync = function mkDirSync(dir) {
  return uni.getFileSystemManager().mkdirSync(dir, true);
};exports.mkDirSync = mkDirSync;
var delDir = function delDir(_ref)

{var dir = _ref.dir;
  return new Promise(function (resolve, reject) {
    uni.getFileSystemManager().rmdir({
      dirPath: dir,
      recursive: true,

      success: function success(res) {
        resolve(res);
      },

      fail: function fail(err) {
        reject(err);
      } });


  });
};exports.delDir = delDir;
var readDir = function readDir(_ref2)

{var dir = _ref2.dir;
  return new Promise(function (resolve, reject) {
    uni.getFileSystemManager().readdir({
      dirPath: dir,

      success: function success(res) {
        resolve(res);
      },

      fail: function fail(err) {
        reject(err);
      } });


  });
};exports.readDir = readDir;
var readDataDir = function readDataDir() {
  return readDir({
    dir: getDataDirRoot() });

};exports.readDataDir = readDataDir;
var existDataFile = function existDataFile(_ref3)

{var fileName = _ref3.fileName;};exports.existDataFile = existDataFile;
var getDataFileInfo = function getDataFileInfo(_ref4) {var _ref4$fileName = _ref4.
  fileName,fileName = _ref4$fileName === void 0 ? '' : _ref4$fileName,_ref4$filePath = _ref4.
  filePath,filePath = _ref4$filePath === void 0 ? '' : _ref4$filePath;return function (filePath)
  {
    if (filePath) {
      return new Promise(function (resolve, reject) {
        uni.getFileSystemManager().getFileInfo({
          filePath: filePath,

          success: function success(res) {
            res.filePath = filePath;
            resolve(res);
          },

          fail: function fail(err) {
            reject(err);
          } });


      });
    } else {
      var filePath = getDataDirRoot() + '/' + fileName;
      return new Promise(function (resolve, reject) {
        uni.getFileSystemManager().getFileInfo({
          filePath: filePath,

          success: function success(res) {
            res.filePath = filePath;
            resolve(res);
          },

          fail: function fail(err) {
            reject(err);
          } });


      });
    }
  }(filePath);};exports.getDataFileInfo = getDataFileInfo;
var mkDataImg = function mkDataImg(_ref5)


{var _ref5$imgUrl = _ref5.imgUrl,imgUrl = _ref5$imgUrl === void 0 ? '' : _ref5$imgUrl,_ref5$isOver = _ref5.isOver,isOver = _ref5$isOver === void 0 ? false : _ref5$isOver;
  return new Promise(function (resolve, reject) {
    var fileName = getImgFileName(imgUrl);

    if (!isOver) {
      getDataFileInfo({
        fileName: fileName }).
      then(function (res) {
        resolve({
          filePath: res.filePath,
          fileName: fileName });

      }).catch(function (err) {
        uni.getImageInfo({
          src: imgUrl,

          success: function success(res) {
            var tempFilePath = res.path;
            var filePath = getDataDirRoot() + '/' + fileName;
            uni.getFileSystemManager().saveFile({
              tempFilePath: tempFilePath,
              filePath: filePath,

              success: function success() {
                resolve({
                  filePath: filePath,
                  fileName: fileName });

              },

              fail: function fail() {
                reject('');
              } });


          },

          fail: function fail(err) {
            reject('');
          } });


      });
    } else {
      uni.getImageInfo({
        src: imgUrl,

        success: function success(res) {
          var tempFilePath = res.path;
          var filePath = getDataDirRoot() + '/' + fileName;
          uni.getFileSystemManager().saveFile({
            tempFilePath: tempFilePath,
            filePath: filePath,

            success: function success() {
              resolve({
                filePath: filePath,
                fileName: fileName });

            },

            fail: function fail() {
              reject('');
            } });


        },

        fail: function fail(err) {
          reject('');
        } });


    }
  });
};exports.mkDataImg = mkDataImg;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 60:
/*!*****************************************!*\
  !*** D:/yjy/??????/??????/????????????/js/utils/md5.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.strMd5 = void 0; /*
                                                                                                     * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
                                                                                                     * Digest Algorithm, as defined in RFC 1321.
                                                                                                     * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
                                                                                                     * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
                                                                                                     * Distributed under the BSD License
                                                                                                     * See http://pajhome.org.uk/crypt/md5 for more info.
                                                                                                     */

/*
                                                                                                         * Configurable variables. You may need to tweak these to be compatible with
                                                                                                         * the server-side, but the defaults work in most cases.
                                                                                                         */
var hexcase = 0;
/* hex output format. 0 - lowercase; 1 - uppercase        */

var b64pad = "";
/* base-64 pad character. "=" for strict RFC compliance   */

var chrsz = 8;
/* bits per input character. 8 - ASCII; 16 - Unicode      */

var strMd5 = function strMd5(str) {
  return hex_md5(str);
};
/*
    * These are the functions you'll usually want to call
    * They take string arguments and return either hex or base-64 encoded strings
    */exports.strMd5 = strMd5;

function hex_md5(s) {
  return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}

function b64_md5(s) {
  return binl2b64(core_md5(str2binl(s), s.length * chrsz));
}

function str_md5(s) {
  return binl2str(core_md5(str2binl(s), s.length * chrsz));
}

function hex_hmac_md5(key, data) {
  return binl2hex(core_hmac_md5(key, data));
}

function b64_hmac_md5(key, data) {
  return binl2b64(core_hmac_md5(key, data));
}

function str_hmac_md5(key, data) {
  return binl2str(core_hmac_md5(key, data));
}
/*
   * Perform a simple self-test to see if the VM is working
   */


function md5_vm_test() {
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}
/*
   * Calculate the MD5 of an array of little-endian words, and a bit length
   */


function core_md5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }

  return Array(a, b, c, d);
}
/*
   * These functions implement the four basic operations the algorithm uses.
   */


function md5_cmn(q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}

function md5_ff(a, b, c, d, x, s, t) {
  return md5_cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5_gg(a, b, c, d, x, s, t) {
  return md5_cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5_hh(a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5_ii(a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
}
/*
   * Calculate the HMAC-MD5, of a key and some data
   */


function core_hmac_md5(key, data) {
  var bkey = str2binl(key);
  if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
  var ipad = Array(16),
  opad = Array(16);

  for (var i = 0; i < 16; i++) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}
/*
   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
   * to work around bugs in some JS interpreters.
   */


function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xFFFF;
}
/*
   * Bitwise rotate a 32-bit number to the left.
   */


function bit_rol(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
   * Convert a string to an array of little-endian words
   * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
   */


function str2binl(str) {
  var bin = Array();
  var mask = (1 << chrsz) - 1;

  for (var i = 0; i < str.length * chrsz; i += chrsz) {bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;}

  return bin;
}
/*
   * Convert an array of little-endian words to a string
   */


function binl2str(bin) {
  var str = "";
  var mask = (1 << chrsz) - 1;

  for (var i = 0; i < bin.length * 32; i += chrsz) {str += String.fromCharCode(bin[i >> 5] >>> i % 32 & mask);}

  return str;
}
/*
   * Convert an array of little-endian words to a hex string.
   */


function binl2hex(binarray) {
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";

  for (var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
  }

  return str;
}
/*
   * Convert an array of little-endian words to a base-64 string
   */


function binl2b64(binarray) {
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";

  for (var i = 0; i < binarray.length * 4; i += 3) {
    var triplet = (binarray[i >> 2] >> 8 * (i % 4) & 0xFF) << 16 | (binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4) & 0xFF) << 8 | binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4) & 0xFF;

    for (var j = 0; j < 4; j++) {
      if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;else str += tab.charAt(triplet >> 6 * (3 - j) & 0x3F);
    }
  }

  return str;
}

/***/ }),

/***/ 61:
/*!****************************************!*\
  !*** D:/yjy/??????/??????/????????????/js/utils/au.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.au = void 0; /**
                                                                                                 * au.js - Calculate the mathematical expression.
                                                                                                 */
function interpreter() {
  'use strict';

  var _slice = Array.prototype.slice;
  var operations = {
    '+': {
      // Operator priority level
      priority: 10,
      // The greater the value, the higher the priority
      comput: function comput(o1, o2) {
        return o1 + o2;
      } },

    '-': {
      priority: 10,
      comput: function comput(o1, o2) {
        return o1 - o2;
      } },

    '*': {
      priority: 100,
      comput: function comput(o1, o2) {
        return o1 * o2;
      } },

    '/': {
      priority: 100,
      comput: function comput(o1, o2) {
        if (o2 !== 0) {
          return o1 / o2;
        }

        error('Zero as the denominator is not allowed.');
      } },

    '%': {
      priority: 100,
      comput: function comput(o1, o2) {
        return o1 % o2;
      } },

    '^': {
      priority: 100,
      comput: function comput(o1, o2) {
        return Math.pow(o1, o2);
      } } };


  var parsers = [];
  var api = {
    operator: function operator(_operator, priority, handler) {
      operations[_operator] = {
        priority: priority,
        comput: handler };

      operatorKeys = Object.keys(operations);
    },
    parser: function parser(predict, token, pos) {
      if (typeof predict === 'function' && typeof token === 'function') {
        parsers.splice(typeof pos !== 'number' ? parsers.length : pos, 0, {
          predict: predict,
          token: token });

      }
    } };

  var operatorKeys = Object.keys(operations);

  function each(obj, callback) {
    var i;
    var len;

    for (i = 0, len = obj.length; i < len; i++) {
      callback(obj[i], i);
    }

    return obj;
  }

  function marge(src) {
    if (arguments.length > 1) {
      each(_slice.call(arguments, 1), function (e) {
        var prop;

        for (prop in e) {
          src[prop] = e[prop];
        }
      });
    }

    return src;
  }

  function error(msg, pos) {
    throw new Error((pos == null || pos === -1 ? '' : '[pos->' + pos + '] ') + msg);
  }

  function isNumber(char) {
    return char != null && /\d|\.|e/.test(char);
  } // Matches the position of the parentheses on the right parenthes


  function matchClosePoint(input, pos, openSymbol, closeSymbol) {
    var open = -1;
    var close = -1;

    while (pos.stack > 0) {
      pos.index += 1;
      open = input.indexOf(openSymbol, pos.index);
      close = input.indexOf(closeSymbol, pos.index);

      if (open !== -1 && open < close) {
        pos.stack += 1;
        pos.index = open + 1;
      }

      if (close !== -1) {
        pos.stack -= 1;
        pos.index = close;
      } else {
        error('Not found \'' + closeSymbol + '\'', pos.index);
      }
    }

    return close;
  } // match a number


  function numberToken(input, pos) {
    var n;
    pos.buffer += input[pos.index];
    pos.index += 1;

    if (!isNumber(input[pos.index])) {
      n = parseFloat(pos.buffer);

      if (Number.isNaN(n)) {
        error('Invalid number: ' + pos.buffer, pos.index);
      }

      pos.buffer = '';
      return {
        type: 'operation',
        content: n };

    } else {
      return next(input, pos);
    }
  } // match an operator


  function operatorToken(input, pos) {
    var operator = input[pos.index];
    pos.index += 1;
    return {
      type: 'operator',
      content: operator };

  }

  function cleanUp(tkns) {
    if (tkns[0].type === 'operator') {
      var o = tkns[0].content;

      if (tkns.length > 1 && (o === '-' || o === '+')) {
        if (o === '-') {
          tkns[1].content = -1 * tkns[1].content;
        }

        tkns.shift();
      } else {
        error('[computing] Illegal expression.');
      }
    }

    if (tkns.length === 1) {
      return tkns[0];
    } else {
      return {
        type: 'group',
        content: tkns };

    }
  } // The content enclosed in each parenthesis is a group


  function groupToken(input, pos, openSymbol, closeSymbol) {
    var start = pos.index + 1;
    var end;
    pos.stack = 1;
    end = matchClosePoint(input, pos, openSymbol, closeSymbol);
    pos.index = end + 1;
    return tokens(input.substring(start, end));
  } // Get next token


  function next(input, pos) {
    var char = input[pos.index];

    if (typeof char === 'undefined') {
      return;
    } else if (/\s/.test(char)) {
      pos.index += 1;
      return next(input, pos);
    } else if (isNumber(char)) {
      return numberToken(input, pos);
    } else if (operatorKeys.indexOf(char) !== -1) {
      return operatorToken(input, pos);
    } else if (char === '(') {
      return groupToken(input, pos, '(', ')');
    }

    error('Illegal expression.', pos.index);
  } // Generating token


  function tokens(input) {
    var pos = {
      index: 0,
      buffer: '' };

    var tkns = [];
    var tkn;

    while (tkn = next(input, pos)) {
      tkns.push(tkn);
    }

    return cleanUp(tkns);
  }

  function operation(tkns) {
    var op = tkns.shift();

    if (op) {
      if (op.type === 'group' || op.type === 'operation') {
        return op.type === 'group' ? comput(op.content) : op.content;
      }

      error('Except operation.');
    }
  }

  function operator(tkns) {
    var op = tkns.shift();

    if (op) {
      if (op.type === 'operator') {
        return op.content;
      }

      error('Except operator.');
    }
  }

  function figure(left, op, right) {
    var current;
    var next;
    var nextOp;

    if (op) {
      if (right == null) {
        error('Except right operation.');
      }

      current = operations[op];

      if (current) {
        nextOp = operator(this);

        if (nextOp == null) {
          return current.comput(left, right);
        }

        next = operations[nextOp];

        if (next.priority > current.priority) {
          return current.comput(left, figure.call(this, right, nextOp, operation(this)));
        } else {
          return figure.call(this, current.comput(left, right), nextOp, operation(this));
        }
      } else {
        error('The \'' + op + '\' operator was not found');
      }
    }

    return left;
  }

  function comput(tkns) {
    if (Array.isArray(tkns)) {
      return figure.call(tkns, operation(tkns), operator(tkns), operation(tkns));
    } else {
      return figure.call([tkns], operation([tkns]));
    }
  }

  function parse(input, variables) {
    if (input && typeof input === 'string' && input.length > 0) {
      return comput(tokens(input.replace(/\$([\w\d]+)/g, function (m, name) {
        var val = variables[name];

        if (val == null) {
          error('Not found variable \'' + name + '\'');
        }

        return val;
      })));
    }

    return 0;
  }

  return marge(parse, api);
}

var au = interpreter();exports.au = au;

/***/ }),

/***/ 62:
/*!**********************************************!*\
  !*** D:/yjy/??????/??????/????????????/js/utils/mathUtil.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.accDivCoupon = exports.accMul = exports.accSubtr = exports.accAdd = void 0; /**
                                                                                                                                                                * ??????
                                                                                                                                                                * @param arg1
                                                                                                                                                                * @param arg2
                                                                                                                                                                * @returns
                                                                                                                                                                */
var accAdd = function accAdd(arg1, arg2) {
  arg1 = arg1 ? arg1 : 0;
  arg2 = arg2 ? arg2 : 0;
  var r1, r2, m, n;

  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }

  ;

  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }

  ;
  m = Math.pow(10, Math.max(r1, r2)); //????????????????????????

  n = r1 >= r2 ? r1 : r2;

  if (n > 0) {
    return ((arg1 * m + arg2 * m) / m).toFixed(2);
  } else {
    return (arg1 * m + arg2 * m) / m;
  }
};
/**
    * ??????
    * @param arg1
    * @param arg2
    * @returns
    */exports.accAdd = accAdd;

var accSubtr = function accSubtr(arg1, arg2) {
  arg1 = arg1 ? arg1 : 0;
  arg2 = arg2 ? arg2 : 0;
  var r1, r2, m, n;

  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }

  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }

  m = Math.pow(10, Math.max(r1, r2)); //????????????????????????

  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
};
/***
    * ???????????????????????????????????????
    * @param arg1
    * @param arg2
    * @returns
    */exports.accSubtr = accSubtr;

var accMul = function accMul(arg1, arg2) {
  arg1 = arg1 ? arg1 : 0;
  arg2 = arg2 ? arg2 : 0;
  var m = 0,
  s1 = arg1.toString(),
  s2 = arg2.toString();

  try {
    m += s1.split(".")[1].length;
  } catch (e) {}

  try {
    m += s2.split(".")[1].length;
  } catch (e) {}

  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};
/***
    * ???????????????????????????????????????
    * @param arg1
    * @param arg2
    * @returns
    */exports.accMul = accMul;

var accDivCoupon = function accDivCoupon(arg1, arg2) {
  arg1 = arg1 ? arg1 : 0;
  arg2 = arg2 ? arg2 : 0;
  var t1 = 0,
  t2 = 0,
  r1,
  r2;

  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {}

  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {}

  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return r1 / r2 * Math.pow(10, t2 - t1);
};exports.accDivCoupon = accDivCoupon;

/***/ }),

/***/ 63:
/*!******************************************!*\
  !*** D:/yjy/??????/??????/????????????/js/utils/date.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.formatSecond = exports.countDown = void 0; /**
                                                                                                                               * get different
                                                                                                                               */
var countDown = function countDown(curTime, targetTime) {var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'HH:mm:ss';
  if (curTime instanceof Date) {
    curTime = curTime.getTime();
  }
  if (targetTime instanceof Date) {
    targetTime = targetTime.getTime();
  }
  var countDownSecond = parseInt((targetTime - curTime) / 1000);
  return formatSecond(countDownSecond, format);
};

/**
    * format second to given format 
    */exports.countDown = countDown;
var formatSecond = function formatSecond(seconds) {var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'HH:mm:ss';
  var resstring = '';
  var resarr = format.split(':');
  if (seconds >= 0) {
    var hourIndex = resarr.indexOf('HH');
    if (hourIndex >= 0) {
      resarr[hourIndex] = Math.floor(seconds / 3600);
      seconds = seconds % 3600;
    }
    var minuteIndex = resarr.indexOf('mm');
    if (minuteIndex >= 0) {
      resarr[minuteIndex] = Math.floor(seconds / 60);
      seconds = seconds % 60;
    }
    if (resarr.indexOf('ss') >= 0) {
      resarr[resarr.indexOf('ss')] = seconds;
    }
    resarr = resarr.map(function (e) {
      if (e <= 9) {
        e = '0' + e;
      }
      return e;
    });
    resstring = resarr.join(':');
  }
  return resstring;
};exports.formatSecond = formatSecond;

/***/ }),

/***/ 86:
/*!************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 87));var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e23) {throw _e23;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e24) {didErr = true;err = _e24;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;function t(e) {return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;}function s(e, t, s) {return e(s = { path: t, exports: {}, require: function require(e, t) {return function () {throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");}(null == t && s.path);} }, s.exports), s.exports;}var n = s(function (e, t) {var s;e.exports = (s = s || function (e, t) {var s = Object.create || function () {function e() {}return function (t) {var s;return e.prototype = t, s = new e(), e.prototype = null, s;};}(),n = {},r = n.lib = {},o = r.Base = { extend: function extend(e) {var t = s(this);return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {t.$super.init.apply(this, arguments);}), t.init.prototype = t, t.$super = this, t;}, create: function create() {var e = this.extend();return e.init.apply(e, arguments), e;}, init: function init() {}, mixIn: function mixIn(e) {for (var t in e) {e.hasOwnProperty(t) && (this[t] = e[t]);}e.hasOwnProperty("toString") && (this.toString = e.toString);}, clone: function clone() {return this.init.prototype.extend(this);} },i = r.WordArray = o.extend({ init: function init(e, s) {e = this.words = e || [], this.sigBytes = s != t ? s : 4 * e.length;}, toString: function toString(e) {return (e || c).stringify(this);}, concat: function concat(e) {var t = this.words,s = e.words,n = this.sigBytes,r = e.sigBytes;if (this.clamp(), n % 4) for (var o = 0; o < r; o++) {var i = s[o >>> 2] >>> 24 - o % 4 * 8 & 255;t[n + o >>> 2] |= i << 24 - (n + o) % 4 * 8;} else for (o = 0; o < r; o += 4) {t[n + o >>> 2] = s[o >>> 2];}return this.sigBytes += r, this;}, clamp: function clamp() {var t = this.words,s = this.sigBytes;t[s >>> 2] &= 4294967295 << 32 - s % 4 * 8, t.length = e.ceil(s / 4);}, clone: function clone() {var e = o.clone.call(this);return e.words = this.words.slice(0), e;}, random: function random(t) {for (var s, n = [], r = function r(t) {t = t;var s = 987654321,n = 4294967295;return function () {var r = ((s = 36969 * (65535 & s) + (s >> 16) & n) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & n) & n;return r /= 4294967296, (r += .5) * (e.random() > .5 ? 1 : -1);};}, o = 0; o < t; o += 4) {var a = r(4294967296 * (s || e.random()));s = 987654071 * a(), n.push(4294967296 * a() | 0);}return new i.init(n, t);} }),a = n.enc = {},c = a.Hex = { stringify: function stringify(e) {for (var t = e.words, s = e.sigBytes, n = [], r = 0; r < s; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16));}return n.join("");}, parse: function parse(e) {for (var t = e.length, s = [], n = 0; n < t; n += 2) {s[n >>> 3] |= parseInt(e.substr(n, 2), 16) << 24 - n % 8 * 4;}return new i.init(s, t / 2);} },u = a.Latin1 = { stringify: function stringify(e) {for (var t = e.words, s = e.sigBytes, n = [], r = 0; r < s; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;n.push(String.fromCharCode(o));}return n.join("");}, parse: function parse(e) {for (var t = e.length, s = [], n = 0; n < t; n++) {s[n >>> 2] |= (255 & e.charCodeAt(n)) << 24 - n % 4 * 8;}return new i.init(s, t);} },h = a.Utf8 = { stringify: function stringify(e) {try {return decodeURIComponent(escape(u.stringify(e)));} catch (e) {throw new Error("Malformed UTF-8 data");}}, parse: function parse(e) {return u.parse(unescape(encodeURIComponent(e)));} },l = r.BufferedBlockAlgorithm = o.extend({ reset: function reset() {this._data = new i.init(), this._nDataBytes = 0;}, _append: function _append(e) {"string" == typeof e && (e = h.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;}, _process: function _process(t) {var s = this._data,n = s.words,r = s.sigBytes,o = this.blockSize,a = r / (4 * o),c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * o,u = e.min(4 * c, r);if (c) {for (var h = 0; h < c; h += o) {this._doProcessBlock(n, h);}var l = n.splice(0, c);s.sigBytes -= u;}return new i.init(l, u);}, clone: function clone() {var e = o.clone.call(this);return e._data = this._data.clone(), e;}, _minBufferSize: 0 });r.Hasher = l.extend({ cfg: o.extend(), init: function init(e) {this.cfg = this.cfg.extend(e), this.reset();}, reset: function reset() {l.reset.call(this), this._doReset();}, update: function update(e) {return this._append(e), this._process(), this;}, finalize: function finalize(e) {return e && this._append(e), this._doFinalize();}, blockSize: 16, _createHelper: function _createHelper(e) {return function (t, s) {return new e.init(s).finalize(t);};}, _createHmacHelper: function _createHmacHelper(e) {return function (t, s) {return new d.HMAC.init(e, s).finalize(t);};} });var d = n.algo = {};return n;}(Math), s);}),r = (s(function (e, t) {var s;e.exports = (s = n, function (e) {var t = s,n = t.lib,r = n.WordArray,o = n.Hasher,i = t.algo,a = [];!function () {for (var t = 0; t < 64; t++) {a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;}}();var c = i.MD5 = o.extend({ _doReset: function _doReset() {this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878]);}, _doProcessBlock: function _doProcessBlock(e, t) {for (var s = 0; s < 16; s++) {var n = t + s,r = e[n];e[n] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8);}var o = this._hash.words,i = e[t + 0],c = e[t + 1],f = e[t + 2],p = e[t + 3],g = e[t + 4],m = e[t + 5],y = e[t + 6],_ = e[t + 7],w = e[t + 8],k = e[t + 9],S = e[t + 10],v = e[t + 11],T = e[t + 12],A = e[t + 13],P = e[t + 14],I = e[t + 15],b = o[0],E = o[1],O = o[2],C = o[3];b = u(b, E, O, C, i, 7, a[0]), C = u(C, b, E, O, c, 12, a[1]), O = u(O, C, b, E, f, 17, a[2]), E = u(E, O, C, b, p, 22, a[3]), b = u(b, E, O, C, g, 7, a[4]), C = u(C, b, E, O, m, 12, a[5]), O = u(O, C, b, E, y, 17, a[6]), E = u(E, O, C, b, _, 22, a[7]), b = u(b, E, O, C, w, 7, a[8]), C = u(C, b, E, O, k, 12, a[9]), O = u(O, C, b, E, S, 17, a[10]), E = u(E, O, C, b, v, 22, a[11]), b = u(b, E, O, C, T, 7, a[12]), C = u(C, b, E, O, A, 12, a[13]), O = u(O, C, b, E, P, 17, a[14]), b = h(b, E = u(E, O, C, b, I, 22, a[15]), O, C, c, 5, a[16]), C = h(C, b, E, O, y, 9, a[17]), O = h(O, C, b, E, v, 14, a[18]), E = h(E, O, C, b, i, 20, a[19]), b = h(b, E, O, C, m, 5, a[20]), C = h(C, b, E, O, S, 9, a[21]), O = h(O, C, b, E, I, 14, a[22]), E = h(E, O, C, b, g, 20, a[23]), b = h(b, E, O, C, k, 5, a[24]), C = h(C, b, E, O, P, 9, a[25]), O = h(O, C, b, E, p, 14, a[26]), E = h(E, O, C, b, w, 20, a[27]), b = h(b, E, O, C, A, 5, a[28]), C = h(C, b, E, O, f, 9, a[29]), O = h(O, C, b, E, _, 14, a[30]), b = l(b, E = h(E, O, C, b, T, 20, a[31]), O, C, m, 4, a[32]), C = l(C, b, E, O, w, 11, a[33]), O = l(O, C, b, E, v, 16, a[34]), E = l(E, O, C, b, P, 23, a[35]), b = l(b, E, O, C, c, 4, a[36]), C = l(C, b, E, O, g, 11, a[37]), O = l(O, C, b, E, _, 16, a[38]), E = l(E, O, C, b, S, 23, a[39]), b = l(b, E, O, C, A, 4, a[40]), C = l(C, b, E, O, i, 11, a[41]), O = l(O, C, b, E, p, 16, a[42]), E = l(E, O, C, b, y, 23, a[43]), b = l(b, E, O, C, k, 4, a[44]), C = l(C, b, E, O, T, 11, a[45]), O = l(O, C, b, E, I, 16, a[46]), b = d(b, E = l(E, O, C, b, f, 23, a[47]), O, C, i, 6, a[48]), C = d(C, b, E, O, _, 10, a[49]), O = d(O, C, b, E, P, 15, a[50]), E = d(E, O, C, b, m, 21, a[51]), b = d(b, E, O, C, T, 6, a[52]), C = d(C, b, E, O, p, 10, a[53]), O = d(O, C, b, E, S, 15, a[54]), E = d(E, O, C, b, c, 21, a[55]), b = d(b, E, O, C, w, 6, a[56]), C = d(C, b, E, O, I, 10, a[57]), O = d(O, C, b, E, y, 15, a[58]), E = d(E, O, C, b, A, 21, a[59]), b = d(b, E, O, C, g, 6, a[60]), C = d(C, b, E, O, v, 10, a[61]), O = d(O, C, b, E, f, 15, a[62]), E = d(E, O, C, b, k, 21, a[63]), o[0] = o[0] + b | 0, o[1] = o[1] + E | 0, o[2] = o[2] + O | 0, o[3] = o[3] + C | 0;}, _doFinalize: function _doFinalize() {var t = this._data,s = t.words,n = 8 * this._nDataBytes,r = 8 * t.sigBytes;s[r >>> 5] |= 128 << 24 - r % 32;var o = e.floor(n / 4294967296),i = n;s[15 + (r + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), s[14 + (r + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (s.length + 1), this._process();for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {var h = c[u];c[u] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8);}return a;}, clone: function clone() {var e = o.clone.call(this);return e._hash = this._hash.clone(), e;} });function u(e, t, s, n, r, o, i) {var a = e + (t & s | ~t & n) + r + i;return (a << o | a >>> 32 - o) + t;}function h(e, t, s, n, r, o, i) {var a = e + (t & n | s & ~n) + r + i;return (a << o | a >>> 32 - o) + t;}function l(e, t, s, n, r, o, i) {var a = e + (t ^ s ^ n) + r + i;return (a << o | a >>> 32 - o) + t;}function d(e, t, s, n, r, o, i) {var a = e + (s ^ (t | ~n)) + r + i;return (a << o | a >>> 32 - o) + t;}t.MD5 = o._createHelper(c), t.HmacMD5 = o._createHmacHelper(c);}(Math), s.MD5);}), s(function (e, t) {var s, r, o;e.exports = (r = (s = n).lib.Base, o = s.enc.Utf8, void (s.algo.HMAC = r.extend({ init: function init(e, t) {e = this._hasher = new e.init(), "string" == typeof t && (t = o.parse(t));var s = e.blockSize,n = 4 * s;t.sigBytes > n && (t = e.finalize(t)), t.clamp();for (var r = this._oKey = t.clone(), i = this._iKey = t.clone(), a = r.words, c = i.words, u = 0; u < s; u++) {a[u] ^= 1549556828, c[u] ^= 909522486;}r.sigBytes = i.sigBytes = n, this.reset();}, reset: function reset() {var e = this._hasher;e.reset(), e.update(this._iKey);}, update: function update(e) {return this._hasher.update(e), this;}, finalize: function finalize(e) {var t = this._hasher,s = t.finalize(e);return t.reset(), t.finalize(this._oKey.clone().concat(s));} })));}), s(function (e, t) {e.exports = n.HmacMD5;}));function o(e) {return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();}function i(e) {return "object" === o(e);}var a = /*#__PURE__*/function (_Error) {_inherits(a, _Error);var _super = _createSuper(a);function a(e, t) {var _this;_classCallCheck(this, a);_this = _super.call(this, e), _this.code = t;return _this;}return a;}( /*#__PURE__*/_wrapNativeSuper(Error));function c(e) {return e && "string" == typeof e ? JSON.parse(e) : e;}var u = "development" === "development",h = "mp-weixin",l = c({
    "address": [
        "127.0.0.1",
        "192.168.0.118"
    ],
    "debugPort": 62904,
    "initialLaunchType": "remote",
    "servePort": 62905,
    "skipFiles": [
        "<node_internals>/**/*.js",
        "C:/Program Files/HBuilderX/HBuilderX/plugins/unicloud/**/*.js"
    ]
}
),d = c([{"provider":"aliyun","spaceName":"paipai","spaceId":"62cda193-434e-4fb9-9334-bd57583c3b9e","clientSecret":"BaGUu28gJleulk6A1Gki2A==","endpoint":"https://api.bspapp.com"}]),f = true;var p = "";try {{var _e2 = __webpack_require__(/*! uni-stat-config */ 90).default || __webpack_require__(/*! uni-stat-config */ 90);p = _e2.appid;}} catch (e) {}var g = {};function m(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var s, n;return s = g, n = e, Object.prototype.hasOwnProperty.call(s, n) || (g[e] = t), g[e];}"app-plus" === h && (g = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {});var y = ["invoke", "success", "fail", "complete"],_ = m("_globalUniCloudInterceptor");function w(e, t) {_[e] || (_[e] = {}), i(t) && Object.keys(t).forEach(function (s) {y.indexOf(s) > -1 && function (e, t, s) {var n = _[e][t];n || (n = _[e][t] = []), -1 === n.indexOf(s) && "function" == typeof s && n.push(s);}(e, s, t[s]);});}function k(e, t) {_[e] || (_[e] = {}), i(t) ? Object.keys(t).forEach(function (s) {y.indexOf(s) > -1 && function (e, t, s) {var n = _[e][t];if (!n) return;var r = n.indexOf(s);r > -1 && n.splice(r, 1);}(e, s, t[s]);}) : delete _[e];}function S(e, t) {return e && 0 !== e.length ? e.reduce(function (e, s) {return e.then(function () {return s(t);});}, Promise.resolve()) : Promise.resolve();}function v(e, t) {return _[e] && _[e][t] || [];}function T(e, t) {return t ? function (s) {var _this2 = this;var n = "callFunction" === t && "DCloud-clientDB" === (s && s.name);var r;r = this.isReady ? Promise.resolve() : this.initUniCloud, s = s || {};var o = r.then(function () {return n ? Promise.resolve() : S(v(t, "invoke"), s);}).then(function () {return e.call(_this2, s);}).then(function (e) {return n ? Promise.resolve(e) : S(v(t, "success"), e).then(function () {return S(v(t, "complete"), e);}).then(function () {return Promise.resolve(e);});}, function (e) {return n ? Promise.reject(e) : S(v(t, "fail"), e).then(function () {return S(v(t, "complete"), e);}).then(function () {return Promise.reject(e);});});if (!(s.success || s.fail || s.complete)) return o;o.then(function (e) {s.success && s.success(e), s.complete && s.complete(e);}, function (e) {s.fail && s.fail(e), s.complete && s.complete(e);});} : function (t) {if (!((t = t || {}).success || t.fail || t.complete)) return e.call(this, t);e.call(this, t).then(function (e) {t.success && t.success(e), t.complete && t.complete(e);}, function (e) {t.fail && t.fail(e), t.complete && t.complete(e);});};}var A = /*#__PURE__*/function (_Error2) {_inherits(A, _Error2);var _super2 = _createSuper(A);function A(e) {var _this3;_classCallCheck(this, A);_this3 = _super2.call(this, e.message), _this3.errMsg = e.message || "", Object.defineProperties(_assertThisInitialized(_this3), { code: { get: function get() {return e.code;} }, requestId: { get: function get() {return e.requestId;} }, message: { get: function get() {return this.errMsg;}, set: function set(e) {this.errMsg = e;} } });return _this3;}return A;}( /*#__PURE__*/_wrapNativeSuper(Error));var P;function I() {var e = uni.getLocale && uni.getLocale() || "en";if (P) return _objectSpread(_objectSpread({}, P), {}, { LOCALE: e });var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),t = _uni$getSystemInfoSyn.deviceId,s = _uni$getSystemInfoSyn.platform;return P = { PLATFORM: h, OS: s, APPID: p, DEVICEID: t, CLIENT_SDK_VERSION: "1.0.17" }, _objectSpread(_objectSpread({}, P), {}, { LOCALE: e });}var b = { sign: function sign(e, t) {var s = "";return Object.keys(e).sort().forEach(function (t) {e[t] && (s = s + "&" + t + "=" + e[t]);}), s = s.slice(1), r(s, t).toString();}, wrappedRequest: function wrappedRequest(e, t) {return new Promise(function (s, n) {t(Object.assign(e, { complete: function complete(e) {e || (e = {}), u && "h5" === h && e.errMsg && 0 === e.errMsg.indexOf("request:fail") && console.warn("??????H5????????????uniCloud????????????????????????????????????????????????????????????????????????????????????????????????https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5");var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];if (!e.statusCode || e.statusCode >= 400) return n(new A({ code: "SYS_ERR", message: e.errMsg || "request:fail", requestId: t }));var r = e.data;if (r.error) return n(new A({ code: r.error.code, message: r.error.message, requestId: t }));r.result = r.data, r.requestId = t, delete r.data, s(r);} }));});} };var E = { request: function request(e) {return uni.request(e);}, uploadFile: function uploadFile(e) {return uni.uploadFile(e);}, setStorageSync: function setStorageSync(e, t) {return uni.setStorageSync(e, t);}, getStorageSync: function getStorageSync(e) {return uni.getStorageSync(e);}, removeStorageSync: function removeStorageSync(e) {return uni.removeStorageSync(e);}, clearStorageSync: function clearStorageSync() {return uni.clearStorageSync();} },O = { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" };var _e3 = (0, _uniI18n.initVueI18n)({ "zh-Hans": { "uniCloud.init.paramRequired": "???????????????{param}", "uniCloud.uploadFile.fileError": "filePath??????File??????" }, "zh-Hant": { "uniCloud.init.paramRequired": "???????????????{param}", "uniCloud.uploadFile.fileError": "filePath??????File??????" }, en: O, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, ja: O }, "zh-Hans"),C = _e3.t;var U = /*#__PURE__*/function () {function U(e) {_classCallCheck(this, U);["spaceId", "clientSecret"].forEach(function (t) {if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error(C("uniCloud.init.paramRequired", { param: t }));}), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = E, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;}_createClass(U, [{ key: "setAccessToken", value: function setAccessToken(e) {this.accessToken = e;} }, { key: "requestWrapped", value: function requestWrapped(e) {return b.wrappedRequest(e, this.adapter.request);} }, { key: "requestAuth", value: function requestAuth(e) {return this.requestWrapped(e);} }, { key: "request", value: function request(e, t) {var _this4 = this;return Promise.resolve().then(function () {return _this4.hasAccessToken ? t ? _this4.requestWrapped(e) : _this4.requestWrapped(e).catch(function (t) {return new Promise(function (e, s) {!t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? s(t) : e();}).then(function () {return _this4.getAccessToken();}).then(function () {var t = _this4.rebuildRequest(e);return _this4.request(t, !0);});}) : _this4.getAccessToken().then(function () {var t = _this4.rebuildRequest(e);return _this4.request(t, !0);});});} }, { key: "rebuildRequest", value: function rebuildRequest(e) {var t = Object.assign({}, e);return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = b.sign(t.data, this.config.clientSecret), t;} }, { key: "setupRequest", value: function setupRequest(e, t) {var s = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),n = { "Content-Type": "application/json" };return "auth" !== t && (s.token = this.accessToken, n["x-basement-token"] = this.accessToken), n["x-serverless-sign"] = b.sign(s, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: s, dataType: "json", header: n };} }, { key: "getAccessToken", value: function getAccessToken() {var _this5 = this;if ("pending" === this._getAccessTokenPromiseStatus) return this._getAccessTokenPromise;this._getAccessTokenPromiseStatus = "pending";return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then(function (e) {return new Promise(function (t, s) {e.result && e.result.accessToken ? (_this5.setAccessToken(e.result.accessToken), _this5._getAccessTokenPromiseStatus = "fulfilled", t(_this5.accessToken)) : (_this5._getAccessTokenPromiseStatus = "rejected", s(new A({ code: "AUTH_FAILED", message: "??????accessToken??????" })));});}, function (e) {return _this5._getAccessTokenPromiseStatus = "rejected", Promise.reject(e);}), this._getAccessTokenPromise;} }, { key: "authorize", value: function authorize() {this.getAccessToken();} }, { key: "callFunction", value: function callFunction(e) {var t = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };return this.request(this.setupRequest(t));} }, { key: "getOSSUploadOptionsFromPath", value: function getOSSUploadOptionsFromPath(e) {var t = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref) {var _this6 = this;var e = _ref.url,t = _ref.formData,s = _ref.name,n = _ref.filePath,r = _ref.fileType,o = _ref.onUploadProgress;return new Promise(function (i, a) {var c = _this6.adapter.uploadFile({ url: e, formData: t, name: s, filePath: n, fileType: r, header: { "X-OSS-server-side-encrpytion": "AES256" }, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new A({ code: "UPLOAD_FAILED", message: "??????????????????" }));}, fail: function fail(e) {a(new A({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "??????????????????" }));} });"function" == typeof o && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "reportOSSUpload", value: function reportOSSUpload(e) {var t = { method: "serverless.file.resource.report", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFile", value: function uploadFile(_ref2) {var _this7 = this;var e = _ref2.filePath,t = _ref2.cloudPath,_ref2$fileType = _ref2.fileType,s = _ref2$fileType === void 0 ? "image" : _ref2$fileType,n = _ref2.onUploadProgress,r = _ref2.config;if ("string" !== o(t)) throw new A({ code: "INVALID_PARAM", message: "cloudPath????????????????????????" });if (!(t = t.trim())) throw new A({ code: "CLOUDPATH_REQUIRED", message: "cloudPath????????????" });if (/:\/\//.test(t)) throw new A({ code: "INVALID_PARAM", message: "cloudPath?????????" });var i = r && r.envType || this.config.envType;var a, c;return this.getOSSUploadOptionsFromPath({ env: i, filename: t }).then(function (t) {var r = t.result;a = r.id, c = "https://" + r.cdnDomain + "/" + r.ossPath;var o = { url: "https://" + r.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: r.accessKeyId, Signature: r.signature, host: r.host, id: a, key: r.ossPath, policy: r.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e, fileType: s };return _this7.uploadFileToOSS(Object.assign({}, o, { onUploadProgress: n }));}).then(function () {return _this7.reportOSSUpload({ id: a });}).then(function (t) {return new Promise(function (s, n) {t.success ? s({ success: !0, filePath: e, fileID: c }) : n(new A({ code: "UPLOAD_FAILED", message: "??????????????????" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref3) {var e = _ref3.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e[0] }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref4.fileList;return new Promise(function (t, s) {Array.isArray(e) && 0 !== e.length || s(new A({ code: "INVALID_PARAM", message: "fileList????????????????????????????????????" })), t({ fileList: e.map(function (e) {return { fileID: e, tempFileURL: e };}) });});} }, { key: "hasAccessToken", get: function get() {return !!this.accessToken;} }]);return U;}();var x = { init: function init(e) {var t = new U(e),s = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return s;}, t.customAuth = t.auth, t;} };var D = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";var R;!function (e) {e.local = "local", e.none = "none", e.session = "session";}(R || (R = {}));var q = function q() {};var F = function F() {var e;if (!Promise) {e = function e() {}, e.promise = {};var _t2 = function _t2() {throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.');};return Object.defineProperty(e.promise, "then", { get: _t2 }), Object.defineProperty(e.promise, "catch", { get: _t2 }), e;}var t = new Promise(function (t, s) {e = function e(_e4, n) {return _e4 ? s(_e4) : t(n);};});return e.promise = t, e;};function L(e) {return void 0 === e;}function N(e) {return "[object Null]" === Object.prototype.toString.call(e);}var M;function $(e) {var t = (s = e, "[object Array]" === Object.prototype.toString.call(s) ? e : [e]);var s;var _iterator = _createForOfIteratorHelper(t),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _e5 = _step.value;var _t3 = _e5.isMatch,_s = _e5.genAdapter,_n = _e5.runtime;if (_t3()) return { adapter: _s(), runtime: _n };}} catch (err) {_iterator.e(err);} finally {_iterator.f();}}!function (e) {e.WEB = "web", e.WX_MP = "wx_mp";}(M || (M = {}));var j = { adapter: null, runtime: void 0 },B = ["anonymousUuidKey"];var K = /*#__PURE__*/function (_q) {_inherits(K, _q);var _super3 = _createSuper(K);function K() {var _this8;_classCallCheck(this, K);_this8 = _super3.call(this), j.adapter.root.tcbObject || (j.adapter.root.tcbObject = {});return _this8;}_createClass(K, [{ key: "setItem", value: function setItem(e, t) {j.adapter.root.tcbObject[e] = t;} }, { key: "getItem", value: function getItem(e) {return j.adapter.root.tcbObject[e];} }, { key: "removeItem", value: function removeItem(e) {delete j.adapter.root.tcbObject[e];} }, { key: "clear", value: function clear() {delete j.adapter.root.tcbObject;} }]);return K;}(q);function H(e, t) {switch (e) {case "local":return t.localStorage || new K();case "none":return new K();default:return t.sessionStorage || new K();}}var W = /*#__PURE__*/function () {function W(e) {_classCallCheck(this, W);if (!this._storage) {this._persistence = j.adapter.primaryStorage || e.persistence, this._storage = H(this._persistence, j.adapter);var _t4 = "access_token_".concat(e.env),_s2 = "access_token_expire_".concat(e.env),_n2 = "refresh_token_".concat(e.env),_r = "anonymous_uuid_".concat(e.env),_o = "login_type_".concat(e.env),_i = "user_info_".concat(e.env);this.keys = { accessTokenKey: _t4, accessTokenExpireKey: _s2, refreshTokenKey: _n2, anonymousUuidKey: _r, loginTypeKey: _o, userInfoKey: _i };}}_createClass(W, [{ key: "updatePersistence", value: function updatePersistence(e) {if (e === this._persistence) return;var t = "local" === this._persistence;this._persistence = e;var s = H(e, j.adapter);for (var _e6 in this.keys) {var _n3 = this.keys[_e6];if (t && B.includes(_e6)) continue;var _r2 = this._storage.getItem(_n3);L(_r2) || N(_r2) || (s.setItem(_n3, _r2), this._storage.removeItem(_n3));}this._storage = s;} }, { key: "setStore", value: function setStore(e, t, s) {if (!this._storage) return;var n = { version: s || "localCachev1", content: t },r = JSON.stringify(n);try {this._storage.setItem(e, r);} catch (e) {throw e;}} }, { key: "getStore", value: function getStore(e, t) {try {if (!this._storage) return;} catch (e) {return "";}t = t || "localCachev1";var s = this._storage.getItem(e);if (!s) return "";if (s.indexOf(t) >= 0) {return JSON.parse(s).content;}return "";} }, { key: "removeStore", value: function removeStore(e) {this._storage.removeItem(e);} }]);return W;}();var z = {},J = {};function V(e) {return z[e];}var Y = function Y(e, t) {_classCallCheck(this, Y);this.data = t || null, this.name = e;};var X = /*#__PURE__*/function (_Y) {_inherits(X, _Y);var _super4 = _createSuper(X);function X(e, t) {var _this9;_classCallCheck(this, X);_this9 = _super4.call(this, "error", { error: e, data: t }), _this9.error = e;return _this9;}return X;}(Y);var G = new ( /*#__PURE__*/function () {function _class() {_classCallCheck(this, _class);this._listeners = {};}_createClass(_class, [{ key: "on", value: function on(e, t) {return function (e, t, s) {s[e] = s[e] || [], s[e].push(t);}(e, t, this._listeners), this;} }, { key: "off", value: function off(e, t) {return function (e, t, s) {if (s && s[e]) {var _n4 = s[e].indexOf(t);-1 !== _n4 && s[e].splice(_n4, 1);}}(e, t, this._listeners), this;} }, { key: "fire", value: function fire(e, t) {if (e instanceof X) return console.error(e.error), this;var s = "string" == typeof e ? new Y(e, t || {}) : e;var n = s.name;if (this._listens(n)) {s.target = this;var _e7 = this._listeners[n] ? _toConsumableArray(this._listeners[n]) : [];var _iterator2 = _createForOfIteratorHelper(_e7),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _t5 = _step2.value;_t5.call(this, s);}} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}}return this;} }, { key: "_listens", value: function _listens(e) {return this._listeners[e] && this._listeners[e].length > 0;} }]);return _class;}())();function Q(e, t) {G.on(e, t);}function Z(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};G.fire(e, t);}function ee(e, t) {G.off(e, t);}var te = "loginStateChanged",se = "loginStateExpire",ne = "loginTypeChanged",re = "anonymousConverted",oe = "refreshAccessToken";var ie;!function (e) {e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";}(ie || (ie = {}));var ae = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],ce = { "X-SDK-Version": "1.3.5" };function ue(e, t, s) {var n = e[t];e[t] = function (t) {var r = {},o = {};s.forEach(function (s) {var _s$call = s.call(e, t),n = _s$call.data,i = _s$call.headers;Object.assign(r, n), Object.assign(o, i);});var i = t.data;return i && function () {var e;if (e = i, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = _objectSpread(_objectSpread({}, i), r);else for (var _e8 in r) {i.append(_e8, r[_e8]);}}(), t.headers = _objectSpread(_objectSpread({}, t.headers || {}), o), n.call(e, t);};}function he() {var e = Math.random().toString(16).slice(2);return { data: { seqId: e }, headers: _objectSpread(_objectSpread({}, ce), {}, { "x-seqid": e }) };}var le = /*#__PURE__*/function () {function le() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, le);var t;this.config = e, this._reqClass = new j.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: "\u8BF7\u6C42\u5728".concat(this.config.timeout / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"), restrictedMethods: ["post"] }), this._cache = V(this.config.env), this._localCache = (t = this.config.env, J[t]), ue(this._reqClass, "post", [he]), ue(this._reqClass, "upload", [he]), ue(this._reqClass, "download", [he]);}_createClass(le, [{ key: "post", value: function () {var _post = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return this._reqClass.post(e);case 2:return _context.abrupt("return", _context.sent);case 3:case "end":return _context.stop();}}}, _callee, this);}));function post(_x) {return _post.apply(this, arguments);}return post;}() }, { key: "upload", value: function () {var _upload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this._reqClass.upload(e);case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2, this);}));function upload(_x2) {return _upload.apply(this, arguments);}return upload;}() }, { key: "download", value: function () {var _download = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(e) {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return this._reqClass.download(e);case 2:return _context3.abrupt("return", _context3.sent);case 3:case "end":return _context3.stop();}}}, _callee3, this);}));function download(_x3) {return _download.apply(this, arguments);}return download;}() }, { key: "refreshAccessToken", value: function () {var _refreshAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var e, t;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());_context4.prev = 1;_context4.next = 4;return this._refreshAccessTokenPromise;case 4:e = _context4.sent;_context4.next = 10;break;case 7:_context4.prev = 7;_context4.t0 = _context4["catch"](1);t = _context4.t0;case 10:if (!(this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t)) {_context4.next = 12;break;}throw t;case 12:return _context4.abrupt("return", e);case 13:case "end":return _context4.stop();}}}, _callee4, this, [[1, 7]]);}));function refreshAccessToken() {return _refreshAccessToken2.apply(this, arguments);}return refreshAccessToken;}() }, { key: "_refreshAccessToken", value: function () {var _refreshAccessToken3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var _this$_cache$keys, e, t, s, n, r, o, i, a, _e9, _e10, _t6, _n5;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_this$_cache$keys = this._cache.keys, e = _this$_cache$keys.accessTokenKey, t = _this$_cache$keys.accessTokenExpireKey, s = _this$_cache$keys.refreshTokenKey, n = _this$_cache$keys.loginTypeKey, r = _this$_cache$keys.anonymousUuidKey;this._cache.removeStore(e), this._cache.removeStore(t);o = this._cache.getStore(s);if (o) {_context5.next = 5;break;}throw new Error("?????????CloudBase");case 5:i = { refresh_token: o };_context5.next = 8;return this.request("auth.fetchAccessTokenWithRefreshToken", i);case 8:a = _context5.sent;if (!a.data.code) {_context5.next = 21;break;}_e9 = a.data.code;if (!("SIGN_PARAM_INVALID" === _e9 || "REFRESH_TOKEN_EXPIRED" === _e9 || "INVALID_REFRESH_TOKEN" === _e9)) {_context5.next = 20;break;}if (!(this._cache.getStore(n) === ie.ANONYMOUS && "INVALID_REFRESH_TOKEN" === _e9)) {_context5.next = 19;break;}_e10 = this._cache.getStore(r);_t6 = this._cache.getStore(s);_context5.next = 17;return this.send("auth.signInAnonymously", { anonymous_uuid: _e10, refresh_token: _t6 });case 17:_n5 = _context5.sent;return _context5.abrupt("return", (this.setRefreshToken(_n5.refresh_token), this._refreshAccessToken()));case 19:Z(se), this._cache.removeStore(s);case 20:throw new Error("\u5237\u65B0access token\u5931\u8D25\uFF1A".concat(a.data.code));case 21:if (!a.data.access_token) {_context5.next = 23;break;}return _context5.abrupt("return", (Z(oe), this._cache.setStore(e, a.data.access_token), this._cache.setStore(t, a.data.access_token_expire + Date.now()), { accessToken: a.data.access_token, accessTokenExpire: a.data.access_token_expire }));case 23:a.data.refresh_token && (this._cache.removeStore(s), this._cache.setStore(s, a.data.refresh_token), this._refreshAccessToken());case 24:case "end":return _context5.stop();}}}, _callee5, this);}));function _refreshAccessToken() {return _refreshAccessToken3.apply(this, arguments);}return _refreshAccessToken;}() }, { key: "getAccessToken", value: function () {var _getAccessToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var _this$_cache$keys2, e, t, s, n, r, o;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_this$_cache$keys2 = this._cache.keys, e = _this$_cache$keys2.accessTokenKey, t = _this$_cache$keys2.accessTokenExpireKey, s = _this$_cache$keys2.refreshTokenKey;if (this._cache.getStore(s)) {_context6.next = 3;break;}throw new Error("refresh token??????????????????????????????");case 3:n = this._cache.getStore(e), r = this._cache.getStore(t), o = !0;_context6.t0 = this._shouldRefreshAccessTokenHook;if (!_context6.t0) {_context6.next = 9;break;}_context6.next = 8;return this._shouldRefreshAccessTokenHook(n, r);case 8:_context6.t0 = !_context6.sent;case 9:_context6.t1 = _context6.t0;if (!_context6.t1) {_context6.next = 12;break;}o = !1;case 12:return _context6.abrupt("return", (!n || !r || r < Date.now()) && o ? this.refreshAccessToken() : { accessToken: n, accessTokenExpire: r });case 13:case "end":return _context6.stop();}}}, _callee6, this);}));function getAccessToken() {return _getAccessToken.apply(this, arguments);}return getAccessToken;}() }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(e, t, s) {var n, r, o, _e11, i, _e12, _e13, a, c, u, h, l, d, f, p, g;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:n = "x-tcb-trace_".concat(this.config.env);r = "application/x-www-form-urlencoded";o = _objectSpread({ action: e, env: this.config.env, dataVersion: "2019-08-16" }, t);if (!(-1 === ae.indexOf(e))) {_context7.next = 10;break;}_e11 = this._cache.keys.refreshTokenKey;_context7.t0 = this._cache.getStore(_e11);if (!_context7.t0) {_context7.next = 10;break;}_context7.next = 9;return this.getAccessToken();case 9:o.access_token = _context7.sent.accessToken;case 10:if ("storage.uploadFile" === e) {i = new FormData();for (_e12 in i) {i.hasOwnProperty(_e12) && void 0 !== i[_e12] && i.append(_e12, o[_e12]);}r = "multipart/form-data";} else {r = "application/json", i = {};for (_e13 in o) {void 0 !== o[_e13] && (i[_e13] = o[_e13]);}}a = { headers: { "content-type": r } };s && s.onUploadProgress && (a.onUploadProgress = s.onUploadProgress);c = this._localCache.getStore(n);c && (a.headers["X-TCB-Trace"] = c);u = t.parse, h = t.inQuery, l = t.search;d = { env: this.config.env };u && (d.parse = !0), h && (d = _objectSpread(_objectSpread({}, h), d));f = function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var n = /\?/.test(t);var r = "";for (var _e14 in s) {"" === r ? !n && (t += "?") : r += "&", r += "".concat(_e14, "=").concat(encodeURIComponent(s[_e14]));}return /^http(s)?\:\/\//.test(t += r) ? t : "".concat(e).concat(t);}(D, "//tcb-api.tencentcloudapi.com/web", d);l && (f += l);_context7.next = 22;return this.post(_objectSpread({ url: f, data: i }, a));case 22:p = _context7.sent;g = p.header && p.header["x-tcb-trace"];if (!(g && this._localCache.setStore(n, g), 200 !== Number(p.status) && 200 !== Number(p.statusCode) || !p.data)) {_context7.next = 26;break;}throw new Error("network request error");case 26:return _context7.abrupt("return", p);case 27:case "end":return _context7.stop();}}}, _callee7, this);}));function request(_x4, _x5, _x6) {return _request.apply(this, arguments);}return request;}() }, { key: "send", value: function () {var _send = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8(e) {var t,s,_s3,_args8 = arguments;return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:t = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};_context8.next = 3;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 3:s = _context8.sent;if (!("ACCESS_TOKEN_EXPIRED" === s.data.code && -1 === ae.indexOf(e))) {_context8.next = 13;break;}_context8.next = 7;return this.refreshAccessToken();case 7:_context8.next = 9;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 9:_s3 = _context8.sent;if (!_s3.data.code) {_context8.next = 12;break;}throw new Error("[".concat(_s3.data.code, "] ").concat(_s3.data.message));case 12:return _context8.abrupt("return", _s3.data);case 13:if (!s.data.code) {_context8.next = 15;break;}throw new Error("[".concat(s.data.code, "] ").concat(s.data.message));case 15:return _context8.abrupt("return", s.data);case 16:case "end":return _context8.stop();}}}, _callee8, this);}));function send(_x7) {return _send.apply(this, arguments);}return send;}() }, { key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys3 = this._cache.keys,t = _this$_cache$keys3.accessTokenKey,s = _this$_cache$keys3.accessTokenExpireKey,n = _this$_cache$keys3.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(s), this._cache.setStore(n, e);} }]);return le;}();var de = {};function fe(e) {return de[e];}var pe = /*#__PURE__*/function () {function pe(e) {_classCallCheck(this, pe);this.config = e, this._cache = V(e.env), this._request = fe(e.env);}_createClass(pe, [{ key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys4 = this._cache.keys,t = _this$_cache$keys4.accessTokenKey,s = _this$_cache$keys4.accessTokenExpireKey,n = _this$_cache$keys4.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(s), this._cache.setStore(n, e);} }, { key: "setAccessToken", value: function setAccessToken(e, t) {var _this$_cache$keys5 = this._cache.keys,s = _this$_cache$keys5.accessTokenKey,n = _this$_cache$keys5.accessTokenExpireKey;this._cache.setStore(s, e), this._cache.setStore(n, t);} }, { key: "refreshUserInfo", value: function () {var _refreshUserInfo = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {var _yield$this$_request$, e;return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$ = _context9.sent;e = _yield$this$_request$.data;return _context9.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context9.stop();}}}, _callee9, this);}));function refreshUserInfo() {return _refreshUserInfo.apply(this, arguments);}return refreshUserInfo;}() }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e);} }]);return pe;}();var ge = /*#__PURE__*/function () {function ge(e) {_classCallCheck(this, ge);if (!e) throw new Error("envId is not defined");this._envId = e, this._cache = V(this._envId), this._request = fe(this._envId), this.setUserInfo();}_createClass(ge, [{ key: "linkWithTicket", value: function linkWithTicket(e) {if ("string" != typeof e) throw new Error("ticket must be string");return this._request.send("auth.linkWithTicket", { ticket: e });} }, { key: "linkWithRedirect", value: function linkWithRedirect(e) {e.signInWithRedirect();} }, { key: "updatePassword", value: function updatePassword(e, t) {return this._request.send("auth.updatePassword", { oldPassword: t, newPassword: e });} }, { key: "updateEmail", value: function updateEmail(e) {return this._request.send("auth.updateEmail", { newEmail: e });} }, { key: "updateUsername", value: function updateUsername(e) {if ("string" != typeof e) throw new Error("username must be a string");return this._request.send("auth.updateUsername", { username: e });} }, { key: "getLinkedUidList", value: function () {var _getLinkedUidList = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {var _yield$this$_request$2, e, t, s;return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return this._request.send("auth.getLinkedUidList", {});case 2:_yield$this$_request$2 = _context10.sent;e = _yield$this$_request$2.data;t = !1;s = e.users;return _context10.abrupt("return", (s.forEach(function (e) {e.wxOpenId && e.wxPublicId && (t = !0);}), { users: s, hasPrimaryUid: t }));case 7:case "end":return _context10.stop();}}}, _callee10, this);}));function getLinkedUidList() {return _getLinkedUidList.apply(this, arguments);}return getLinkedUidList;}() }, { key: "setPrimaryUid", value: function setPrimaryUid(e) {return this._request.send("auth.setPrimaryUid", { uid: e });} }, { key: "unlink", value: function unlink(e) {return this._request.send("auth.unlink", { platform: e });} }, { key: "update", value: function () {var _update = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11(e) {var t, s, n, r, o, i, _yield$this$_request$3, a;return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:t = e.nickName;s = e.gender;n = e.avatarUrl;r = e.province;o = e.country;i = e.city;_context11.next = 8;return this._request.send("auth.updateUserInfo", { nickName: t, gender: s, avatarUrl: n, province: r, country: o, city: i });case 8:_yield$this$_request$3 = _context11.sent;a = _yield$this$_request$3.data;this.setLocalUserInfo(a);case 11:case "end":return _context11.stop();}}}, _callee11, this);}));function update(_x8) {return _update.apply(this, arguments);}return update;}() }, { key: "refresh", value: function () {var _refresh = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {var _yield$this$_request$4, e;return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$4 = _context12.sent;e = _yield$this$_request$4.data;return _context12.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context12.stop();}}}, _callee12, this);}));function refresh() {return _refresh.apply(this, arguments);}return refresh;}() }, { key: "setUserInfo", value: function setUserInfo() {var _this10 = this;var e = this._cache.keys.userInfoKey,t = this._cache.getStore(e);["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach(function (e) {_this10[e] = t[e];}), this.location = { country: t.country, province: t.province, city: t.city };} }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e), this.setUserInfo();} }]);return ge;}();var me = /*#__PURE__*/function () {function me(e) {_classCallCheck(this, me);if (!e) throw new Error("envId is not defined");this._cache = V(e);var _this$_cache$keys6 = this._cache.keys,t = _this$_cache$keys6.refreshTokenKey,s = _this$_cache$keys6.accessTokenKey,n = _this$_cache$keys6.accessTokenExpireKey,r = this._cache.getStore(t),o = this._cache.getStore(s),i = this._cache.getStore(n);this.credential = { refreshToken: r, accessToken: o, accessTokenExpire: i }, this.user = new ge(e);}_createClass(me, [{ key: "isAnonymousAuth", get: function get() {return this.loginType === ie.ANONYMOUS;} }, { key: "isCustomAuth", get: function get() {return this.loginType === ie.CUSTOM;} }, { key: "isWeixinAuth", get: function get() {return this.loginType === ie.WECHAT || this.loginType === ie.WECHAT_OPEN || this.loginType === ie.WECHAT_PUBLIC;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return me;}();var ye = /*#__PURE__*/function (_pe) {_inherits(ye, _pe);var _super5 = _createSuper(ye);function ye() {_classCallCheck(this, ye);return _super5.apply(this, arguments);}_createClass(ye, [{ key: "signIn", value: function () {var _signIn = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13() {var _this$_cache$keys7, e, t, s, n, r, _e15;return _regenerator.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:this._cache.updatePersistence("local");_this$_cache$keys7 = this._cache.keys;e = _this$_cache$keys7.anonymousUuidKey;t = _this$_cache$keys7.refreshTokenKey;s = this._cache.getStore(e) || void 0;n = this._cache.getStore(t) || void 0;_context13.next = 8;return this._request.send("auth.signInAnonymously", { anonymous_uuid: s, refresh_token: n });case 8:r = _context13.sent;if (!(r.uuid && r.refresh_token)) {_context13.next = 20;break;}this._setAnonymousUUID(r.uuid);this.setRefreshToken(r.refresh_token);_context13.next = 14;return this._request.refreshAccessToken();case 14:Z(te);Z(ne, { env: this.config.env, loginType: ie.ANONYMOUS, persistence: "local" });_e15 = new me(this.config.env);_context13.next = 19;return _e15.user.refresh();case 19:return _context13.abrupt("return", _e15);case 20:throw new Error("??????????????????");case 21:case "end":return _context13.stop();}}}, _callee13, this);}));function signIn() {return _signIn.apply(this, arguments);}return signIn;}() }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14(e) {var _this$_cache$keys8, t, s, n, r, o;return _regenerator.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_this$_cache$keys8 = this._cache.keys;t = _this$_cache$keys8.anonymousUuidKey;s = _this$_cache$keys8.refreshTokenKey;n = this._cache.getStore(t);r = this._cache.getStore(s);_context14.next = 7;return this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: n, refresh_token: r, ticket: e });case 7:o = _context14.sent;if (!o.refresh_token) {_context14.next = 16;break;}this._clearAnonymousUUID();this.setRefreshToken(o.refresh_token);_context14.next = 13;return this._request.refreshAccessToken();case 13:Z(re, { env: this.config.env });Z(ne, { loginType: ie.CUSTOM, persistence: "local" });return _context14.abrupt("return", { credential: { refreshToken: o.refresh_token } });case 16:throw new Error("??????????????????");case 17:case "end":return _context14.stop();}}}, _callee14, this);}));function linkAndRetrieveDataWithTicket(_x9) {return _linkAndRetrieveDataWithTicket.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "_setAnonymousUUID", value: function _setAnonymousUUID(e) {var _this$_cache$keys9 = this._cache.keys,t = _this$_cache$keys9.anonymousUuidKey,s = _this$_cache$keys9.loginTypeKey;this._cache.removeStore(t), this._cache.setStore(t, e), this._cache.setStore(s, ie.ANONYMOUS);} }, { key: "_clearAnonymousUUID", value: function _clearAnonymousUUID() {this._cache.removeStore(this._cache.keys.anonymousUuidKey);} }]);return ye;}(pe);var _e = /*#__PURE__*/function (_pe2) {_inherits(_e, _pe2);var _super6 = _createSuper(_e);function _e() {_classCallCheck(this, _e);return _super6.apply(this, arguments);}_createClass(_e, [{ key: "signIn", value: function () {var _signIn2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15(e) {var t, s;return _regenerator.default.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:if (!("string" != typeof e)) {_context15.next = 2;break;}throw new Error("ticket must be a string");case 2:t = this._cache.keys.refreshTokenKey;_context15.next = 5;return this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t) || "" });case 5:s = _context15.sent;if (!s.refresh_token) {_context15.next = 15;break;}this.setRefreshToken(s.refresh_token);_context15.next = 10;return this._request.refreshAccessToken();case 10:Z(te);Z(ne, { env: this.config.env, loginType: ie.CUSTOM, persistence: this.config.persistence });_context15.next = 14;return this.refreshUserInfo();case 14:return _context15.abrupt("return", new me(this.config.env));case 15:throw new Error("?????????????????????");case 16:case "end":return _context15.stop();}}}, _callee15, this);}));function signIn(_x10) {return _signIn2.apply(this, arguments);}return signIn;}() }]);return _e;}(pe);var we = /*#__PURE__*/function (_pe3) {_inherits(we, _pe3);var _super7 = _createSuper(we);function we() {_classCallCheck(this, we);return _super7.apply(this, arguments);}_createClass(we, [{ key: "signIn", value: function () {var _signIn3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee16(e, t) {var s, n, r, o, i;return _regenerator.default.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:if (!("string" != typeof e)) {_context16.next = 2;break;}throw new Error("email must be a string");case 2:s = this._cache.keys.refreshTokenKey;_context16.next = 5;return this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t, refresh_token: this._cache.getStore(s) || "" });case 5:n = _context16.sent;r = n.refresh_token;o = n.access_token;i = n.access_token_expire;if (!r) {_context16.next = 22;break;}this.setRefreshToken(r);if (!(o && i)) {_context16.next = 15;break;}this.setAccessToken(o, i);_context16.next = 17;break;case 15:_context16.next = 17;return this._request.refreshAccessToken();case 17:_context16.next = 19;return this.refreshUserInfo();case 19:Z(te);Z(ne, { env: this.config.env, loginType: ie.EMAIL, persistence: this.config.persistence });return _context16.abrupt("return", new me(this.config.env));case 22:throw n.code ? new Error("\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: [".concat(n.code, "] ").concat(n.message)) : new Error("??????????????????");case 23:case "end":return _context16.stop();}}}, _callee16, this);}));function signIn(_x11, _x12) {return _signIn3.apply(this, arguments);}return signIn;}() }, { key: "activate", value: function () {var _activate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee17(e) {return _regenerator.default.wrap(function _callee17$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:return _context17.abrupt("return", this._request.send("auth.activateEndUserMail", { token: e }));case 1:case "end":return _context17.stop();}}}, _callee17, this);}));function activate(_x13) {return _activate.apply(this, arguments);}return activate;}() }, { key: "resetPasswordWithToken", value: function () {var _resetPasswordWithToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee18(e, t) {return _regenerator.default.wrap(function _callee18$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:return _context18.abrupt("return", this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t }));case 1:case "end":return _context18.stop();}}}, _callee18, this);}));function resetPasswordWithToken(_x14, _x15) {return _resetPasswordWithToken.apply(this, arguments);}return resetPasswordWithToken;}() }]);return we;}(pe);var ke = /*#__PURE__*/function (_pe4) {_inherits(ke, _pe4);var _super8 = _createSuper(ke);function ke() {_classCallCheck(this, ke);return _super8.apply(this, arguments);}_createClass(ke, [{ key: "signIn", value: function () {var _signIn4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee19(e, t) {var s, n, r, o, i;return _regenerator.default.wrap(function _callee19$(_context19) {while (1) {switch (_context19.prev = _context19.next) {case 0:if (!("string" != typeof e)) {_context19.next = 2;break;}throw new Error("username must be a string");case 2:"string" != typeof t && (t = "", console.warn("password is empty"));s = this._cache.keys.refreshTokenKey;_context19.next = 6;return this._request.send("auth.signIn", { loginType: ie.USERNAME, username: e, password: t, refresh_token: this._cache.getStore(s) || "" });case 6:n = _context19.sent;r = n.refresh_token;o = n.access_token_expire;i = n.access_token;if (!r) {_context19.next = 23;break;}this.setRefreshToken(r);if (!(i && o)) {_context19.next = 16;break;}this.setAccessToken(i, o);_context19.next = 18;break;case 16:_context19.next = 18;return this._request.refreshAccessToken();case 18:_context19.next = 20;return this.refreshUserInfo();case 20:Z(te);Z(ne, { env: this.config.env, loginType: ie.USERNAME, persistence: this.config.persistence });return _context19.abrupt("return", new me(this.config.env));case 23:throw n.code ? new Error("\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: [".concat(n.code, "] ").concat(n.message)) : new Error("???????????????????????????");case 24:case "end":return _context19.stop();}}}, _callee19, this);}));function signIn(_x16, _x17) {return _signIn4.apply(this, arguments);}return signIn;}() }]);return ke;}(pe);var Se = /*#__PURE__*/function () {function Se(e) {_classCallCheck(this, Se);this.config = e, this._cache = V(e.env), this._request = fe(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), Q(ne, this._onLoginTypeChanged);}_createClass(Se, [{ key: "anonymousAuthProvider", value: function anonymousAuthProvider() {return new ye(this.config);} }, { key: "customAuthProvider", value: function customAuthProvider() {return new _e(this.config);} }, { key: "emailAuthProvider", value: function emailAuthProvider() {return new we(this.config);} }, { key: "usernameAuthProvider", value: function usernameAuthProvider() {return new ke(this.config);} }, { key: "signInAnonymously", value: function () {var _signInAnonymously = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee20() {return _regenerator.default.wrap(function _callee20$(_context20) {while (1) {switch (_context20.prev = _context20.next) {case 0:return _context20.abrupt("return", new ye(this.config).signIn());case 1:case "end":return _context20.stop();}}}, _callee20, this);}));function signInAnonymously() {return _signInAnonymously.apply(this, arguments);}return signInAnonymously;}() }, { key: "signInWithEmailAndPassword", value: function () {var _signInWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee21(e, t) {return _regenerator.default.wrap(function _callee21$(_context21) {while (1) {switch (_context21.prev = _context21.next) {case 0:return _context21.abrupt("return", new we(this.config).signIn(e, t));case 1:case "end":return _context21.stop();}}}, _callee21, this);}));function signInWithEmailAndPassword(_x18, _x19) {return _signInWithEmailAndPassword.apply(this, arguments);}return signInWithEmailAndPassword;}() }, { key: "signInWithUsernameAndPassword", value: function signInWithUsernameAndPassword(e, t) {return new ke(this.config).signIn(e, t);} }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee22(e) {return _regenerator.default.wrap(function _callee22$(_context22) {while (1) {switch (_context22.prev = _context22.next) {case 0:this._anonymousAuthProvider || (this._anonymousAuthProvider = new ye(this.config)), Q(re, this._onAnonymousConverted);_context22.next = 3;return this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);case 3:return _context22.abrupt("return", _context22.sent);case 4:case "end":return _context22.stop();}}}, _callee22, this);}));function linkAndRetrieveDataWithTicket(_x20) {return _linkAndRetrieveDataWithTicket2.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "signOut", value: function () {var _signOut = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee23() {var _this$_cache$keys10, e, t, s, n, r;return _regenerator.default.wrap(function _callee23$(_context23) {while (1) {switch (_context23.prev = _context23.next) {case 0:if (!(this.loginType === ie.ANONYMOUS)) {_context23.next = 2;break;}throw new Error("?????????????????????????????????");case 2:_this$_cache$keys10 = this._cache.keys, e = _this$_cache$keys10.refreshTokenKey, t = _this$_cache$keys10.accessTokenKey, s = _this$_cache$keys10.accessTokenExpireKey, n = this._cache.getStore(e);if (n) {_context23.next = 5;break;}return _context23.abrupt("return");case 5:_context23.next = 7;return this._request.send("auth.logout", { refresh_token: n });case 7:r = _context23.sent;return _context23.abrupt("return", (this._cache.removeStore(e), this._cache.removeStore(t), this._cache.removeStore(s), Z(te), Z(ne, { env: this.config.env, loginType: ie.NULL, persistence: this.config.persistence }), r));case 9:case "end":return _context23.stop();}}}, _callee23, this);}));function signOut() {return _signOut.apply(this, arguments);}return signOut;}() }, { key: "signUpWithEmailAndPassword", value: function () {var _signUpWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee24(e, t) {return _regenerator.default.wrap(function _callee24$(_context24) {while (1) {switch (_context24.prev = _context24.next) {case 0:return _context24.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t }));case 1:case "end":return _context24.stop();}}}, _callee24, this);}));function signUpWithEmailAndPassword(_x21, _x22) {return _signUpWithEmailAndPassword.apply(this, arguments);}return signUpWithEmailAndPassword;}() }, { key: "sendPasswordResetEmail", value: function () {var _sendPasswordResetEmail = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee25(e) {return _regenerator.default.wrap(function _callee25$(_context25) {while (1) {switch (_context25.prev = _context25.next) {case 0:return _context25.abrupt("return", this._request.send("auth.sendPasswordResetEmail", { email: e }));case 1:case "end":return _context25.stop();}}}, _callee25, this);}));function sendPasswordResetEmail(_x23) {return _sendPasswordResetEmail.apply(this, arguments);}return sendPasswordResetEmail;}() }, { key: "onLoginStateChanged", value: function onLoginStateChanged(e) {var _this11 = this;Q(te, function () {var t = _this11.hasLoginState();e.call(_this11, t);});var t = this.hasLoginState();e.call(this, t);} }, { key: "onLoginStateExpired", value: function onLoginStateExpired(e) {Q(se, e.bind(this));} }, { key: "onAccessTokenRefreshed", value: function onAccessTokenRefreshed(e) {Q(oe, e.bind(this));} }, { key: "onAnonymousConverted", value: function onAnonymousConverted(e) {Q(re, e.bind(this));} }, { key: "onLoginTypeChanged", value: function onLoginTypeChanged(e) {var _this12 = this;Q(ne, function () {var t = _this12.hasLoginState();e.call(_this12, t);});} }, { key: "getAccessToken", value: function () {var _getAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee26() {return _regenerator.default.wrap(function _callee26$(_context26) {while (1) {switch (_context26.prev = _context26.next) {case 0:_context26.next = 2;return this._request.getAccessToken();case 2:_context26.t0 = _context26.sent.accessToken;_context26.t1 = this.config.env;return _context26.abrupt("return", { accessToken: _context26.t0, env: _context26.t1 });case 5:case "end":return _context26.stop();}}}, _callee26, this);}));function getAccessToken() {return _getAccessToken2.apply(this, arguments);}return getAccessToken;}() }, { key: "hasLoginState", value: function hasLoginState() {var e = this._cache.keys.refreshTokenKey;return this._cache.getStore(e) ? new me(this.config.env) : null;} }, { key: "isUsernameRegistered", value: function () {var _isUsernameRegistered = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee27(e) {var _yield$this$_request$5, t;return _regenerator.default.wrap(function _callee27$(_context27) {while (1) {switch (_context27.prev = _context27.next) {case 0:if (!("string" != typeof e)) {_context27.next = 2;break;}throw new Error("username must be a string");case 2:_context27.next = 4;return this._request.send("auth.isUsernameRegistered", { username: e });case 4:_yield$this$_request$5 = _context27.sent;t = _yield$this$_request$5.data;return _context27.abrupt("return", t && t.isRegistered);case 7:case "end":return _context27.stop();}}}, _callee27, this);}));function isUsernameRegistered(_x24) {return _isUsernameRegistered.apply(this, arguments);}return isUsernameRegistered;}() }, { key: "getLoginState", value: function getLoginState() {return Promise.resolve(this.hasLoginState());} }, { key: "signInWithTicket", value: function () {var _signInWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee28(e) {return _regenerator.default.wrap(function _callee28$(_context28) {while (1) {switch (_context28.prev = _context28.next) {case 0:return _context28.abrupt("return", new _e(this.config).signIn(e));case 1:case "end":return _context28.stop();}}}, _callee28, this);}));function signInWithTicket(_x25) {return _signInWithTicket.apply(this, arguments);}return signInWithTicket;}() }, { key: "shouldRefreshAccessToken", value: function shouldRefreshAccessToken(e) {this._request._shouldRefreshAccessTokenHook = e.bind(this);} }, { key: "getUserInfo", value: function getUserInfo() {return this._request.send("auth.getUserInfo", {}).then(function (e) {return e.code ? e : _objectSpread(_objectSpread({}, e.data), {}, { requestId: e.seqId });});} }, { key: "getAuthHeader", value: function getAuthHeader() {var _this$_cache$keys11 = this._cache.keys,e = _this$_cache$keys11.refreshTokenKey,t = _this$_cache$keys11.accessTokenKey,s = this._cache.getStore(e);return { "x-cloudbase-credentials": this._cache.getStore(t) + "/@@/" + s };} }, { key: "_onAnonymousConverted", value: function _onAnonymousConverted(e) {var t = e.data.env;t === this.config.env && this._cache.updatePersistence(this.config.persistence);} }, { key: "_onLoginTypeChanged", value: function _onLoginTypeChanged(e) {var _e$data = e.data,t = _e$data.loginType,s = _e$data.persistence,n = _e$data.env;n === this.config.env && (this._cache.updatePersistence(s), this._cache.setStore(this._cache.keys.loginTypeKey, t));} }, { key: "currentUser", get: function get() {var e = this.hasLoginState();return e && e.user || null;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return Se;}();var ve = function ve(e, t) {t = t || F();var s = fe(this.config.env),n = e.cloudPath,r = e.filePath,o = e.onUploadProgress,_e$fileType = e.fileType,i = _e$fileType === void 0 ? "image" : _e$fileType;return s.send("storage.getUploadMetadata", { path: n }).then(function (e) {var _e$data2 = e.data,a = _e$data2.url,c = _e$data2.authorization,u = _e$data2.token,h = _e$data2.fileId,l = _e$data2.cosFileId,d = e.requestId,f = { key: n, signature: c, "x-cos-meta-fileid": l, success_action_status: "201", "x-cos-security-token": u };s.upload({ url: a, data: f, file: r, name: n, fileType: i, onUploadProgress: o }).then(function (e) {201 === e.statusCode ? t(null, { fileID: h, requestId: d }) : t(new Error("STORAGE_REQUEST_FAIL: ".concat(e.data)));}).catch(function (e) {t(e);});}).catch(function (e) {t(e);}), t.promise;},Te = function Te(e, t) {t = t || F();var s = fe(this.config.env),n = e.cloudPath;return s.send("storage.getUploadMetadata", { path: n }).then(function (e) {t(null, e);}).catch(function (e) {t(e);}), t.promise;},Ae = function Ae(_ref5, t) {var e = _ref5.fileList;if (t = t || F(), !e || !Array.isArray(e)) return { code: "INVALID_PARAM", message: "fileList????????????????????????" };var _iterator3 = _createForOfIteratorHelper(e),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _t7 = _step3.value;if (!_t7 || "string" != typeof _t7) return { code: "INVALID_PARAM", message: "fileList????????????????????????????????????" };}} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}var s = { fileid_list: e };return fe(this.config.env).send("storage.batchDeleteFile", s).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.delete_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},Pe = function Pe(_ref6, t) {var e = _ref6.fileList;t = t || F(), e && Array.isArray(e) || t(null, { code: "INVALID_PARAM", message: "fileList????????????????????????" });var s = [];var _iterator4 = _createForOfIteratorHelper(e),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _n6 = _step4.value;"object" == typeof _n6 ? (_n6.hasOwnProperty("fileID") && _n6.hasOwnProperty("maxAge") || t(null, { code: "INVALID_PARAM", message: "fileList????????????????????????fileID???maxAge?????????" }), s.push({ fileid: _n6.fileID, max_age: _n6.maxAge })) : "string" == typeof _n6 ? s.push({ fileid: _n6 }) : t(null, { code: "INVALID_PARAM", message: "fileList???????????????????????????" });}} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}var n = { file_list: s };return fe(this.config.env).send("storage.batchGetDownloadUrl", n).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.download_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},Ie = /*#__PURE__*/function () {var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee29(_ref7, t) {var e, s, n, r;return _regenerator.default.wrap(function _callee29$(_context29) {while (1) {switch (_context29.prev = _context29.next) {case 0:e = _ref7.fileID;_context29.next = 3;return Pe.call(this, { fileList: [{ fileID: e, maxAge: 600 }] });case 3:s = _context29.sent.fileList[0];if (!("SUCCESS" !== s.code)) {_context29.next = 6;break;}return _context29.abrupt("return", t ? t(s) : new Promise(function (e) {e(s);}));case 6:n = fe(this.config.env);r = s.download_url;if (!(r = encodeURI(r), !t)) {_context29.next = 10;break;}return _context29.abrupt("return", n.download({ url: r }));case 10:_context29.t0 = t;_context29.next = 13;return n.download({ url: r });case 13:_context29.t1 = _context29.sent;(0, _context29.t0)(_context29.t1);case 15:case "end":return _context29.stop();}}}, _callee29, this);}));return function Ie(_x26, _x27) {return _ref8.apply(this, arguments);};}(),be = function be(_ref9, o) {var e = _ref9.name,t = _ref9.data,s = _ref9.query,n = _ref9.parse,r = _ref9.search;var i = o || F();var a;try {a = t ? JSON.stringify(t) : "";} catch (e) {return Promise.reject(e);}if (!e) return Promise.reject(new Error("?????????????????????"));var c = { inQuery: s, parse: n, search: r, function_name: e, request_data: a };return fe(this.config.env).send("functions.invokeFunction", c).then(function (e) {if (e.code) i(null, e);else {var _t8 = e.data.response_data;if (n) i(null, { result: _t8, requestId: e.requestId });else try {_t8 = JSON.parse(e.data.response_data), i(null, { result: _t8, requestId: e.requestId });} catch (e) {i(new Error("response data must be json"));}}return i.promise;}).catch(function (e) {i(e);}), i.promise;},Ee = { timeout: 15e3, persistence: "session" },Oe = {};var Ce = /*#__PURE__*/function () {function Ce(e) {_classCallCheck(this, Ce);this.config = e || this.config, this.authObj = void 0;}_createClass(Ce, [{ key: "init", value: function init(e) {switch (j.adapter || (this.requestClient = new j.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: "\u8BF7\u6C42\u5728".concat((e.timeout || 5e3) / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD") })), this.config = _objectSpread(_objectSpread({}, Ee), e), !0) {case this.config.timeout > 6e5:console.warn("timeout?????????????????????[10??????]???????????????????????????"), this.config.timeout = 6e5;break;case this.config.timeout < 100:console.warn("timeout?????????????????????[100ms]???????????????????????????"), this.config.timeout = 100;}return new Ce(this.config);} }, { key: "auth", value: function auth() {var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref10.persistence;if (this.authObj) return this.authObj;var t = e || j.adapter.primaryStorage || Ee.persistence;var s;return t !== this.config.persistence && (this.config.persistence = t), function (e) {var t = e.env;z[t] = new W(e), J[t] = new W(_objectSpread(_objectSpread({}, e), {}, { persistence: "local" }));}(this.config), s = this.config, de[s.env] = new le(s), this.authObj = new Se(this.config), this.authObj;} }, { key: "on", value: function on(e, t) {return Q.apply(this, [e, t]);} }, { key: "off", value: function off(e, t) {return ee.apply(this, [e, t]);} }, { key: "callFunction", value: function callFunction(e, t) {return be.apply(this, [e, t]);} }, { key: "deleteFile", value: function deleteFile(e, t) {return Ae.apply(this, [e, t]);} }, { key: "getTempFileURL", value: function getTempFileURL(e, t) {return Pe.apply(this, [e, t]);} }, { key: "downloadFile", value: function downloadFile(e, t) {return Ie.apply(this, [e, t]);} }, { key: "uploadFile", value: function uploadFile(e, t) {return ve.apply(this, [e, t]);} }, { key: "getUploadMetadata", value: function getUploadMetadata(e, t) {return Te.apply(this, [e, t]);} }, { key: "registerExtension", value: function registerExtension(e) {Oe[e.name] = e;} }, { key: "invokeExtension", value: function () {var _invokeExtension = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee30(e, t) {var s;return _regenerator.default.wrap(function _callee30$(_context30) {while (1) {switch (_context30.prev = _context30.next) {case 0:s = Oe[e];if (s) {_context30.next = 3;break;}throw Error("\u6269\u5C55".concat(e, " \u5FC5\u987B\u5148\u6CE8\u518C"));case 3:_context30.next = 5;return s.invoke(t, this);case 5:return _context30.abrupt("return", _context30.sent);case 6:case "end":return _context30.stop();}}}, _callee30, this);}));function invokeExtension(_x28, _x29) {return _invokeExtension.apply(this, arguments);}return invokeExtension;}() }, { key: "useAdapters", value: function useAdapters(e) {var _ref11 = $(e) || {},t = _ref11.adapter,s = _ref11.runtime;t && (j.adapter = t), s && (j.runtime = s);} }]);return Ce;}();var Ue = new Ce();function xe(e, t, s) {void 0 === s && (s = {});var n = /\?/.test(t),r = "";for (var o in s) {"" === r ? !n && (t += "?") : r += "&", r += o + "=" + encodeURIComponent(s[o]);}return /^http(s)?:\/\//.test(t += r) ? t : "" + e + t;}var De = /*#__PURE__*/function () {function De() {_classCallCheck(this, De);}_createClass(De, [{ key: "post", value: function post(e) {var t = e.url,s = e.data,n = e.headers;return new Promise(function (e, r) {E.request({ url: xe("https:", t), data: s, method: "POST", header: n, success: function success(t) {e(t);}, fail: function fail(e) {r(e);} });});} }, { key: "upload", value: function upload(e) {return new Promise(function (t, s) {var n = e.url,r = e.file,o = e.data,i = e.headers,a = e.fileType,c = E.uploadFile({ url: xe("https:", n), name: "file", formData: Object.assign({}, o), filePath: r, fileType: a, header: i, success: function success(e) {var s = { statusCode: e.statusCode, data: e.data || {} };200 === e.statusCode && o.success_action_status && (s.statusCode = parseInt(o.success_action_status, 10)), t(s);}, fail: function fail(e) {u && "mp-alipay" === h && console.warn("????????????????????????????????????????????????????????????????????????????????????????????????????????????"), s(new Error(e.errMsg || "uploadFile:fail"));} });"function" == typeof e.onUploadProgress && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (t) {e.onUploadProgress({ loaded: t.totalBytesSent, total: t.totalBytesExpectedToSend });});});} }]);return De;}();var Re = { setItem: function setItem(e, t) {E.setStorageSync(e, t);}, getItem: function getItem(e) {return E.getStorageSync(e);}, removeItem: function removeItem(e) {E.removeStorageSync(e);}, clear: function clear() {E.clearStorageSync();} };var qe = { genAdapter: function genAdapter() {return { root: {}, reqClass: De, localStorage: Re, primaryStorage: "local" };}, isMatch: function isMatch() {return !0;}, runtime: "uni_app" };Ue.useAdapters(qe);var Fe = Ue,Le = Fe.init;Fe.init = function (e) {e.env = e.spaceId;var t = Le.call(this, e);t.config.provider = "tencent", t.config.spaceId = e.spaceId;var s = t.auth;return t.auth = function (e) {var t = s.call(this, e);return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach(function (e) {t[e] = T(t[e]).bind(t);}), t;}, t.customAuth = t.auth, t;};var Ne = Fe;function Me() {return { token: E.getStorageSync("uni_id_token") || E.getStorageSync("uniIdToken"), tokenExpired: E.getStorageSync("uni_id_token_expired") };}function $e() {if (!u || "h5" !== h) return;uni.getStorageSync("__LAST_DCLOUD_APPID") !== p && (uni.setStorageSync("__LAST_DCLOUD_APPID", p), console.warn("?????????????????????????????????????????????????????????????????????????????????uni-id?????????token????????????????????????????????????"), E.removeStorageSync("uni_id_token"), E.removeStorageSync("uniIdToken"), E.removeStorageSync("uni_id_token_expired"));}var je = /*#__PURE__*/function (_U) {_inherits(je, _U);var _super9 = _createSuper(je);function je() {_classCallCheck(this, je);return _super9.apply(this, arguments);}_createClass(je, [{ key: "getAccessToken", value: function getAccessToken() {var _this13 = this;return new Promise(function (e, t) {var s = "Anonymous_Access_token";_this13.setAccessToken(s), e(s);});} }, { key: "setupRequest", value: function setupRequest(e, t) {var s = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),n = { "Content-Type": "application/json" };"auth" !== t && (s.token = this.accessToken, n["x-basement-token"] = this.accessToken), n["x-serverless-sign"] = b.sign(s, this.config.clientSecret);var r = I();n["x-client-info"] = JSON.stringify(r);var _Me = Me(),o = _Me.token;return n["x-client-token"] = o, { url: this.config.requestUrl, method: "POST", data: s, dataType: "json", header: JSON.parse(JSON.stringify(n)) };} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref12) {var _this14 = this;var e = _ref12.url,t = _ref12.formData,s = _ref12.name,n = _ref12.filePath,r = _ref12.fileType,o = _ref12.onUploadProgress;return new Promise(function (i, a) {var c = _this14.adapter.uploadFile({ url: e, formData: t, name: s, filePath: n, fileType: r, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new A({ code: "UPLOAD_FAILED", message: "??????????????????" }));}, fail: function fail(e) {a(new A({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "??????????????????" }));} });"function" == typeof o && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "uploadFile", value: function uploadFile(_ref13) {var _this15 = this;var e = _ref13.filePath,t = _ref13.cloudPath,_ref13$fileType = _ref13.fileType,s = _ref13$fileType === void 0 ? "image" : _ref13$fileType,n = _ref13.onUploadProgress;if (!t) throw new A({ code: "CLOUDPATH_REQUIRED", message: "cloudPath????????????" });var r;return this.getOSSUploadOptionsFromPath({ cloudPath: t }).then(function (t) {var _t$result = t.result,o = _t$result.url,i = _t$result.formData,a = _t$result.name;r = t.result.fileUrl;var c = { url: o, formData: i, name: a, filePath: e, fileType: s };return _this15.uploadFileToOSS(Object.assign({}, c, { onUploadProgress: n }));}).then(function () {return _this15.reportOSSUpload({ cloudPath: t });}).then(function (t) {return new Promise(function (s, n) {t.success ? s({ success: !0, filePath: e, fileID: r }) : n(new A({ code: "UPLOAD_FAILED", message: "??????????????????" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref14) {var e = _ref14.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref15.fileList;var t = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e }) };return this.request(this.setupRequest(t));} }]);return je;}(U);var Be = { init: function init(e) {var t = new je(e),s = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return s;}, t.customAuth = t.auth, t;} };function Ke(_ref16) {var e = _ref16.data;var t;t = I();var s = JSON.parse(JSON.stringify(e || {}));if (Object.assign(s, { clientInfo: t }), !s.uniIdToken) {var _Me2 = Me(),_e16 = _Me2.token;_e16 && (s.uniIdToken = _e16);}return s;}function He(_ref17) {var _this16 = this;var e = _ref17.name,t = _ref17.data;var s = this.localAddress,n = this.localPort,r = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider],o = this.config.spaceId,i = "http://".concat(s, ":").concat(n, "/system/check-function"),a = "http://".concat(s, ":").concat(n, "/cloudfunctions/").concat(e);return new Promise(function (t, s) {E.request({ method: "POST", url: i, data: { name: e, platform: h, provider: r, spaceId: o }, timeout: 3e3, success: function success(e) {t(e);}, fail: function fail() {t({ data: { code: "NETWORK_ERROR", message: "?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????" } });} });}).then(function () {var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref18.data;var _ref19 = e || {},t = _ref19.code,s = _ref19.message;return { code: 0 === t ? 0 : t || "SYS_ERR", message: s || "SYS_ERR" };}).then(function (_ref20) {var s = _ref20.code,n = _ref20.message;if (0 !== s) {switch (s) {case "MODULE_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "FUNCTION_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "ACTION_ENCRYPTED":console.error(n || "?????????????????????uni-clientDB-action??????????????????????????????");break;case "NETWORK_ERROR":{var _e17 = "???????????????????????????????????????????????????????????????????????????????????????";throw console.error(_e17), new Error(_e17);}case "SWITCH_TO_CLOUD":break;default:{var _e18 = "\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(n, "\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5");throw console.error(_e18), new Error(_e18);}}return _this16._originCallFunction({ name: e, data: t });}return new Promise(function (e, s) {var n = Ke.call(_this16, { data: t });E.request({ method: "POST", url: a, data: { provider: r, platform: h, param: n }, success: function success() {var _ref21 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},t = _ref21.statusCode,n = _ref21.data;return !t || t >= 400 ? s(new A({ code: n.code || "SYS_ERR", message: n.message || "request:fail" })) : e({ result: n });}, fail: function fail(e) {s(new A({ code: e.code || e.errCode || "SYS_ERR", message: e.message || e.errMsg || "request:fail" }));} });});});}var We = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "????????????[{functionName}]????????????????????????????????????????????????????????????????????????????????????????????????????????????", mode: "append" }];var ze = /[\\^$.*+?()[\]{}|]/g,Je = RegExp(ze.source);function Ve(e, t, s) {return e.replace(new RegExp((n = t) && Je.test(n) ? n.replace(ze, "\\$&") : n, "g"), s);var n;}function Ye(_ref22) {var e = _ref22.functionName,t = _ref22.result,s = _ref22.logPvd;if (this.config.useDebugFunction && t && t.requestId) {var _n7 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e, requestId: t.requestId });console.log("[".concat(s, "-request]").concat(_n7, "[/").concat(s, "-request]"));}}function Xe(e) {var t = e.callFunction,s = function s(_s4) {var _this17 = this;var n = _s4.name;_s4.data = Ke.call(e, { data: _s4.data });var r = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider];return t.call(this, _s4).then(function (e) {return Ye.call(_this17, { functionName: n, result: e, logPvd: r }), Promise.resolve(e);}, function (e) {return Ye.call(_this17, { functionName: n, result: e, logPvd: r }), e && e.message && (e.message = function () {var _ref23 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref23$message = _ref23.message,e = _ref23$message === void 0 ? "" : _ref23$message,_ref23$extraInfo = _ref23.extraInfo,t = _ref23$extraInfo === void 0 ? {} : _ref23$extraInfo,_ref23$formatter = _ref23.formatter,s = _ref23$formatter === void 0 ? [] : _ref23$formatter;for (var _n8 = 0; _n8 < s.length; _n8++) {var _s$_n = s[_n8],_r3 = _s$_n.rule,_o2 = _s$_n.content,i = _s$_n.mode,_a = e.match(_r3);if (!_a) continue;var _c = _o2;for (var _e19 = 1; _e19 < _a.length; _e19++) {_c = Ve(_c, "{$".concat(_e19, "}"), _a[_e19]);}for (var _e20 in t) {_c = Ve(_c, "{".concat(_e20, "}"), t[_e20]);}return "replace" === i ? _c : e + _c;}return e;}({ message: "[".concat(_s4.name, "]: ").concat(e.message), formatter: We, extraInfo: { functionName: n } })), Promise.reject(e);});};e.callFunction = function (t) {var n;return u && e.debugInfo && !e.debugInfo.forceRemote && d ? (e._originCallFunction || (e._originCallFunction = s), n = He.call(this, t)) : n = s.call(this, t), Object.defineProperty(n, "result", { get: function get() {return console.warn("?????????????????????Promise??????????????????????????????result???????????????????????????https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {};} }), n;};}var Ge = Symbol("CLIENT_DB_INTERNAL");function Qe(e, t) {return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = Ge, e.__ob__ = void 0, new Proxy(e, { get: function get(e, s, n) {return s in e || "string" != typeof s ? e[s] : t.get(e, s, n);} });}function Ze(e) {return { on: function on(t, s) {e[t] = e[t] || [], e[t].indexOf(s) > -1 || e[t].push(s);}, off: function off(t, s) {e[t] = e[t] || [];var n = e[t].indexOf(s);-1 !== n && e[t].splice(n, 1);} };}var et = ["db.Geo", "db.command", "command.aggregate"];function tt(e, t) {return et.indexOf("".concat(e, ".").concat(t)) > -1;}function st(e) {switch (o(e)) {case "array":return e.map(function (e) {return st(e);});case "object":return e._internalType === Ge || Object.keys(e).forEach(function (t) {e[t] = st(e[t]);}), e;case "regexp":return { $regexp: { source: e.source, flags: e.flags } };case "date":return { $date: e.toISOString() };default:return e;}}var nt = /*#__PURE__*/function () {function nt(e, t, s) {_classCallCheck(this, nt);this.content = e, this.prevStage = t || null, this.udb = null, this._database = s;}_createClass(nt, [{ key: "toJSON", value: function toJSON() {var e = this;var t = [e.content];for (; e.prevStage;) {e = e.prevStage, t.push(e.content);}return { $db: t.reverse().map(function (e) {return { $method: e.$method, $param: st(e.$param) };}) };} }, { key: "getAction", value: function getAction() {var e = this.toJSON().$db.find(function (e) {return "action" === e.$method;});return e && e.$param && e.$param[0];} }, { key: "getCommand", value: function getCommand() {return { $db: this.toJSON().$db.filter(function (e) {return "action" !== e.$method;}) };} }, { key: "get", value: function get() {return this._send("get", Array.from(arguments));} }, { key: "add", value: function add() {return this._send("add", Array.from(arguments));} }, { key: "remove", value: function remove() {return this._send("remove", Array.from(arguments));} }, { key: "update", value: function update() {return this._send("update", Array.from(arguments));} }, { key: "end", value: function end() {return this._send("end", Array.from(arguments));} }, { key: "set", value: function set() {throw new Error("clientDB????????????set??????");} }, { key: "_send", value: function _send(e, t) {var s = this.getAction(),n = this.getCommand();return n.$db.push({ $method: e, $param: st(t) }), this._database._callCloudFunction({ action: s, command: n });} }, { key: "useAggregate", get: function get() {var e = this,t = !1;for (; e.prevStage;) {e = e.prevStage;var _s5 = e.content.$method;if ("aggregate" === _s5 || "pipeline" === _s5) {t = !0;break;}}return t;} }, { key: "count", get: function get() {if (!this.useAggregate) return function () {return this._send("count", Array.from(arguments));};var e = this;return function () {return rt({ $method: "count", $param: st(Array.from(arguments)) }, e, this._database);};} }]);return nt;}();function rt(e, t, s) {return Qe(new nt(e, t, s), { get: function get(e, t) {var n = "db";return e && e.content && (n = e.content.$method), tt(n, t) ? rt({ $method: t }, e, s) : function () {return rt({ $method: t, $param: st(Array.from(arguments)) }, e, s);};} });}function ot(_ref24) {var e = _ref24.path,t = _ref24.method;return /*#__PURE__*/function () {function _class2() {_classCallCheck(this, _class2);this.param = Array.from(arguments);}_createClass(_class2, [{ key: "toJSON", value: function toJSON() {return { $newDb: [].concat(_toConsumableArray(e.map(function (e) {return { $method: e };})), [{ $method: t, $param: this.param }]) };} }]);return _class2;}();}var it = /*#__PURE__*/function (_ref25) {_inherits(it, _ref25);var _super10 = _createSuper(it);function it() {_classCallCheck(this, it);return _super10.apply(this, arguments);}_createClass(it, [{ key: "_callCloudFunction", value: function _callCloudFunction(_ref26) {var _this18 = this;var e = _ref26.action,t = _ref26.command,s = _ref26.multiCommand,n = _ref26.queryList;function r(e) {if (s && n) for (var _t9 = 0; _t9 < n.length; _t9++) {var _s6 = n[_t9];_s6.udb && "function" == typeof _s6.udb.setResult && _s6.udb.setResult(e);}}var o = S(v("database", "invoke")),i = this._uniClient;return o.then(function () {return i.callFunction({ name: "DCloud-clientDB", data: { action: e, command: t, multiCommand: s } });}).then(function (e) {var _e$result = e.result,t = _e$result.code,s = _e$result.message,n = _e$result.token,o = _e$result.tokenExpired,_e$result$systemInfo = _e$result.systemInfo,i = _e$result$systemInfo === void 0 ? [] : _e$result$systemInfo;if (i) for (var _e21 = 0; _e21 < i.length; _e21++) {var _i$_e = i[_e21],_t10 = _i$_e.level,_s7 = _i$_e.message,_n9 = _i$_e.detail,_r4 = console["app-plus" === h && "warn" === _t10 ? "error" : _t10] || console.log;var _o3 = "[System Info]" + _s7;_n9 && (_o3 = "".concat(_o3, "\n\u8BE6\u7EC6\u4FE1\u606F\uFF1A").concat(_n9)), _r4(_o3);}if (t) {var _e22 = new a(s, t);return _this18._callback("error", [_e22]), Promise.reject(_e22);}n && o && (!function () {var _ref27 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref27.token,t = _ref27.tokenExpired;e && E.setStorageSync("uni_id_token", e), t && E.setStorageSync("uni_id_token_expired", t);}({ token: n, tokenExpired: o }), _this18._callbackAuth("refreshToken", [{ token: n, tokenExpired: o }]), _this18._callback("refreshToken", [{ token: n, tokenExpired: o }]));var c = e.result.affectedDocs;return "number" == typeof c && Object.defineProperty(e.result, "affectedDocs", { get: function get() {return console.warn("affectedDocs??????????????????????????????inserted/deleted/updated/data.length??????"), c;} }), S(v("database", "success"), e).then(function () {return S(v("database", "complete"), e);}).then(function () {return r(e), Promise.resolve(e);});}, function (e) {var t = new a(e.message, e.code || "SYSTEM_ERROR");return _this18._callback("error", [t]), /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB?????????????????????web?????????????????????schema?????????clientDB"), S(v("database", "fail"), e).then(function () {return S(v("database", "complete"), e);}).then(function () {return r(e), Promise.reject(e);});});} }]);return it;}( /*#__PURE__*/function () {function _class3() {var _ref28 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref28$uniClient = _ref28.uniClient,e = _ref28$uniClient === void 0 ? {} : _ref28$uniClient;_classCallCheck(this, _class3);this._uniClient = e, this._authCallBacks = {}, this._dbCallBacks = {}, e.isDefault && (this._dbCallBacks = m("_globalUniCloudDatabaseCallback")), this.auth = Ze(this._authCallBacks), Object.assign(this, Ze(this._dbCallBacks)), this.env = Qe({}, { get: function get(e, t) {return { $env: t };} }), this.Geo = Qe({}, { get: function get(e, t) {return ot({ path: ["Geo"], method: t });} }), this.serverDate = ot({ path: [], method: "serverDate" }), this.RegExp = ot({ path: [], method: "RegExp" });}_createClass(_class3, [{ key: "getCloudEnv", value: function getCloudEnv(e) {if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv????????????");return { $env: e.replace("$cloudEnv_", "") };} }, { key: "_callback", value: function _callback(e, t) {var s = this._dbCallBacks;s[e] && s[e].forEach(function (e) {e.apply(void 0, _toConsumableArray(t));});} }, { key: "_callbackAuth", value: function _callbackAuth(e, t) {var s = this._authCallBacks;s[e] && s[e].forEach(function (e) {e.apply(void 0, _toConsumableArray(t));});} }, { key: "multiSend", value: function multiSend() {var e = Array.from(arguments),t = e.map(function (e) {var t = e.getAction(),s = e.getCommand();if ("getTemp" !== s.$db[s.$db.length - 1].$method) throw new Error("multiSend???????????????????????????getTemp");return { action: t, command: s };});return this._callCloudFunction({ multiCommand: t, queryList: e });} }]);return _class3;}());function at(e) {e.database = function (t) {if (t && Object.keys(t).length > 0) return e.init(t).database();if (this._database) return this._database;var s = function (e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return Qe(new e(t), { get: function get(e, t) {return tt("db", t) ? rt({ $method: t }, null, e) : function () {return rt({ $method: t, $param: st(Array.from(arguments)) }, null, e);};} });}(it, { uniClient: e });return this._database = s, s;};}var ct;var ut = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",ht = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;function lt() {var e = Me().token || "",t = e.split(".");if (!e || 3 !== t.length) return { uid: null, role: [], permission: [], tokenExpired: 0 };var s;try {s = JSON.parse((n = t[1], decodeURIComponent(ct(n).split("").map(function (e) {return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);}).join(""))));} catch (e) {throw new Error("?????????????????????????????????????????????????????????" + e.message);}var n;return s.tokenExpired = 1e3 * s.exp, delete s.exp, delete s.iat, s;}ct = "function" != typeof atob ? function (e) {if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !ht.test(e)) throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");var t;e += "==".slice(2 - (3 & e.length));for (var s, n, r = "", o = 0; o < e.length;) {t = ut.indexOf(e.charAt(o++)) << 18 | ut.indexOf(e.charAt(o++)) << 12 | (s = ut.indexOf(e.charAt(o++))) << 6 | (n = ut.indexOf(e.charAt(o++))), r += 64 === s ? String.fromCharCode(t >> 16 & 255) : 64 === n ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);}return r;} : atob;var dt = t(s(function (e, t) {Object.defineProperty(t, "__esModule", { value: !0 });var s = "chooseAndUploadFile:ok",n = "chooseAndUploadFile:fail";function r(e, t) {return e.tempFiles.forEach(function (e, s) {e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + s + e.name.substring(e.name.lastIndexOf("."));}), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map(function (e) {return e.path;})), e;}function o(e, t, _ref29) {var n = _ref29.onChooseFile,r = _ref29.onUploadProgress;return t.then(function (e) {if (n) {var _t11 = n(e);if (void 0 !== _t11) return Promise.resolve(_t11).then(function (t) {return void 0 === t ? e : t;});}return e;}).then(function (t) {return !1 === t ? { errMsg: s, tempFilePaths: [], tempFiles: [] } : function (e, t) {var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;var r = arguments.length > 3 ? arguments[3] : undefined;(t = Object.assign({}, t)).errMsg = s;var o = t.tempFiles,i = o.length;var a = 0;return new Promise(function (s) {for (; a < n;) {c();}function c() {var n = a++;if (n >= i) return void (!o.find(function (e) {return !e.url && !e.errMsg;}) && s(t));var u = o[n];e.uploadFile({ filePath: u.path, cloudPath: u.cloudPath, fileType: u.fileType, onUploadProgress: function onUploadProgress(e) {e.index = n, e.tempFile = u, e.tempFilePath = u.path, r && r(e);} }).then(function (e) {u.url = e.fileID, n < i && c();}).catch(function (e) {u.errMsg = e.errMsg || e.message, n < i && c();});}});}(e, t, 5, r);});}t.initChooseAndUploadFile = function (e) {return function () {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: "all" };return "image" === t.type ? o(e, function (e) {var t = e.count,s = e.sizeType,_e$sourceType = e.sourceType,o = _e$sourceType === void 0 ? ["album", "camera"] : _e$sourceType,i = e.extension;return new Promise(function (e, a) {uni.chooseImage({ count: t, sizeType: s, sourceType: o, extension: i, success: function success(t) {e(r(t, "image"));}, fail: function fail(e) {a({ errMsg: e.errMsg.replace("chooseImage:fail", n) });} });});}(t), t) : "video" === t.type ? o(e, function (e) {var t = e.camera,s = e.compressed,o = e.maxDuration,_e$sourceType2 = e.sourceType,i = _e$sourceType2 === void 0 ? ["album", "camera"] : _e$sourceType2,a = e.extension;return new Promise(function (e, c) {uni.chooseVideo({ camera: t, compressed: s, maxDuration: o, sourceType: i, extension: a, success: function success(t) {var s = t.tempFilePath,n = t.duration,o = t.size,i = t.height,a = t.width;e(r({ errMsg: "chooseVideo:ok", tempFilePaths: [s], tempFiles: [{ name: t.tempFile && t.tempFile.name || "", path: s, size: o, type: t.tempFile && t.tempFile.type || "", width: a, height: i, duration: n, fileType: "video", cloudPath: "" }] }, "video"));}, fail: function fail(e) {c({ errMsg: e.errMsg.replace("chooseVideo:fail", n) });} });});}(t), t) : o(e, function (e) {var t = e.count,s = e.extension;return new Promise(function (e, o) {var i = uni.chooseFile;if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (i = wx.chooseMessageFile), "function" != typeof i) return o({ errMsg: n + " ????????? type ????????????????????????????????? image ??? video???" });i({ type: "all", count: t, extension: s, success: function success(t) {e(r(t));}, fail: function fail(e) {o({ errMsg: e.errMsg.replace("chooseFile:fail", n) });} });});}(t), t);};};}));var ft = "manual";function pt(e) {return { props: { localdata: { type: Array, default: function _default() {return [];} }, options: { type: [Object, Array], default: function _default() {return {};} }, spaceInfo: { type: Object, default: function _default() {return {};} }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: !1 }, gettree: { type: [Boolean, String], default: !1 }, gettreepath: { type: [Boolean, String], default: !1 }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: !1 }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: !1 } }, data: function data() {return { mixinDatacomLoading: !1, mixinDatacomHasMore: !1, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} };}, created: function created() {var _this19 = this;this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(function () {var e = [];return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach(function (t) {e.push(_this19[t]);}), e;}, function (e, t) {if (_this19.loadtime === ft) return;var s = !1;var n = [];for (var _r5 = 2; _r5 < e.length; _r5++) {e[_r5] !== t[_r5] && (n.push(e[_r5]), s = !0);}e[0] !== t[0] && (_this19.mixinDatacomPage.current = _this19.pageCurrent), _this19.mixinDatacomPage.size = _this19.pageSize, _this19.onMixinDatacomPropsChange(s, n);});}, methods: { onMixinDatacomPropsChange: function onMixinDatacomPropsChange(e, t) {}, mixinDatacomEasyGet: function mixinDatacomEasyGet() {var _this20 = this;var _ref30 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref30$getone = _ref30.getone,e = _ref30$getone === void 0 ? !1 : _ref30$getone,t = _ref30.success,s = _ref30.fail;this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then(function (s) {_this20.mixinDatacomLoading = !1;var _s$result = s.result,n = _s$result.data,r = _s$result.count;_this20.getcount && (_this20.mixinDatacomPage.count = r), _this20.mixinDatacomHasMore = n.length < _this20.pageSize;var o = e ? n.length ? n[0] : void 0 : n;_this20.mixinDatacomResData = o, t && t(o);}).catch(function (e) {_this20.mixinDatacomLoading = !1, _this20.mixinDatacomErrorMessage = e, s && s(e);}));}, mixinDatacomGet: function mixinDatacomGet() {var _s8;var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var s = e.database(this.spaceInfo);var n = t.action || this.action;n && (s = s.action(n));var r = t.collection || this.collection;s = Array.isArray(r) ? (_s8 = s).collection.apply(_s8, _toConsumableArray(r)) : s.collection(r);var o = t.where || this.where;o && Object.keys(o).length && (s = s.where(o));var i = t.field || this.field;i && (s = s.field(i));var a = t.foreignKey || this.foreignKey;a && (s = s.foreignKey(a));var c = t.groupby || this.groupby;c && (s = s.groupBy(c));var u = t.groupField || this.groupField;u && (s = s.groupField(u));!0 === (void 0 !== t.distinct ? t.distinct : this.distinct) && (s = s.distinct());var h = t.orderby || this.orderby;h && (s = s.orderBy(h));var l = void 0 !== t.pageCurrent ? t.pageCurrent : this.mixinDatacomPage.current,d = void 0 !== t.pageSize ? t.pageSize : this.mixinDatacomPage.size,f = void 0 !== t.getcount ? t.getcount : this.getcount,p = void 0 !== t.gettree ? t.gettree : this.gettree,g = void 0 !== t.gettreepath ? t.gettreepath : this.gettreepath,m = { getCount: f },y = { limitLevel: void 0 !== t.limitlevel ? t.limitlevel : this.limitlevel, startWith: void 0 !== t.startwith ? t.startwith : this.startwith };return p && (m.getTree = y), g && (m.getTreePath = y), s = s.skip(d * (l - 1)).limit(d).get(m), s;} } };}function gt(_x30, _x31) {return _gt.apply(this, arguments);}function _gt() {_gt = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee32(e, t) {var s, _e25, n;return _regenerator.default.wrap(function _callee32$(_context32) {while (1) {switch (_context32.prev = _context32.next) {case 0:s = "http://".concat(e, ":").concat(t, "/system/ping");_context32.prev = 1;_context32.next = 4;return n = { url: s, timeout: 500 }, new Promise(function (e, t) {E.request(_objectSpread(_objectSpread({}, n), {}, { success: function success(t) {e(t);}, fail: function fail(e) {t(e);} }));});case 4:_e25 = _context32.sent;return _context32.abrupt("return", !(!_e25.data || 0 !== _e25.data.code));case 8:_context32.prev = 8;_context32.t0 = _context32["catch"](1);return _context32.abrupt("return", !1);case 11:case "end":return _context32.stop();}}}, _callee32, null, [[1, 8]]);}));return _gt.apply(this, arguments);}function mt(e) {if (e.initUniCloudStatus && "rejected" !== e.initUniCloudStatus) return;var t = Promise.resolve();var s;s = 1, t = new Promise(function (e, t) {setTimeout(function () {e();}, s);}), e.isReady = !1, e.isDefault = !1;var n = e.auth();e.initUniCloudStatus = "pending", e.initUniCloud = t.then(function () {return n.getLoginState();}).then(function (e) {return e ? Promise.resolve() : n.signInAnonymously();}).then(function () {if (!u) return Promise.resolve();if (u && e.debugInfo) {var _e$debugInfo = e.debugInfo,_t12 = _e$debugInfo.address,_s9 = _e$debugInfo.servePort;return function () {var _ref31 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee31(e, t) {var s, _n10, _r6;return _regenerator.default.wrap(function _callee31$(_context31) {while (1) {switch (_context31.prev = _context31.next) {case 0:_n10 = 0;case 1:if (!(_n10 < e.length)) {_context31.next = 11;break;}_r6 = e[_n10];_context31.next = 5;return gt(_r6, t);case 5:if (!_context31.sent) {_context31.next = 8;break;}s = _r6;return _context31.abrupt("break", 11);case 8:_n10++;_context31.next = 1;break;case 11:return _context31.abrupt("return", { address: s, port: t });case 12:case "end":return _context31.stop();}}}, _callee31);}));return function (_x32, _x33) {return _ref31.apply(this, arguments);};}()(_t12, _s9);}}).then(function () {var _ref32 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},t = _ref32.address,s = _ref32.port;if (!u) return Promise.resolve();if (t) e.localAddress = t, e.localPort = s;else if (e.debugInfo) {var _t13 = console["app-plus" === h ? "error" : "warn"];var _s10 = "";"remote" === e.debugInfo.initialLaunchType ? (e.debugInfo.forceRemote = !0, _s10 = "??????????????????HBuilderX????????????????????????????????????????????????????????????HBuilderX??????uniCloud????????????????????????????????????????????????\n- ???????????????uniCloud????????????????????????????????????????????????\n- ????????????uniCloud??????????????????????????????????????????????????????????????????????????????????????????????????????\n- ?????????HBuilderX???????????????????????????????????????????????????HBuilderX?????????\n- ????????????????????????????????????HBuilderX?????????nodejs") : _s10 = "????????????uniCloud????????????????????????????????????????????????????????????????????????????????????\n- ????????????uniCloud??????????????????????????????????????????????????????????????????????????????????????????????????????\n- ?????????HBuilderX???????????????????????????????????????????????????HBuilderX?????????\n- ????????????????????????????????????HBuilderX?????????nodejs", "h5" === h && (_s10 += "\n- ??????????????????????????????????????????????????????????????????????????????????????????????????????"), _t13(_s10);}}).then(function () {$e(), e.isReady = !0, e.initUniCloudStatus = "fulfilled";}).catch(function (t) {console.error(t), e.initUniCloudStatus = "rejected";});}var yt = new ( /*#__PURE__*/function () {function _class4() {_classCallCheck(this, _class4);}_createClass(_class4, [{ key: "init", value: function init(e) {var t = {};var s = !1 !== e.debugFunction && u && ("h5" === h && navigator.userAgent.indexOf("HBuilderX") > 0 || "app-plus" === h);switch (e.provider) {case "tencent":t = Ne.init(Object.assign(e, { useDebugFunction: s }));break;case "aliyun":t = x.init(Object.assign(e, { useDebugFunction: s }));break;case "private":t = Be.init(Object.assign(e, { useDebugFunction: s }));break;default:throw new Error("??????????????????provider??????");}var n = l;u && n && !n.code && (t.debugInfo = n), mt(t), t.reInit = function () {mt(this);}, Xe(t), function (e) {var t = e.uploadFile;e.uploadFile = function (e) {return t.call(this, e);};}(t), at(t), function (e) {e.getCurrentUserInfo = lt, e.chooseAndUploadFile = dt.initChooseAndUploadFile(e), Object.assign(e, { get mixinDatacom() {return pt(e);} });}(t);return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach(function (e) {if (!t[e]) return;var s = t[e];t[e] = function () {return t.reInit(), s.apply(t, Array.from(arguments));}, t[e] = T(t[e], e).bind(t);}), t.init = this.init, t;} }]);return _class4;}())();(function () {{var e = d;var t = {};if (1 === e.length) t = e[0], yt = yt.init(t), yt.isDefault = !0;else {var _t14 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo"];var _s11;_s11 = e && e.length > 0 ? "???????????????????????????????????????uniCloud.init????????????????????????????????????" : f ? "????????????????????????????????????uniCloud??????????????????????????????" : "uni-app cli???????????????uniCloud????????????HBuilderX??????????????????????????????????????????uniCloud????????????????????????", _t14.forEach(function (e) {yt[e] = function () {return console.error(_s11), Promise.reject(new A({ code: "SYS_ERR", message: _s11 }));};});}Object.assign(yt, { get mixinDatacom() {return pt(yt);} }), yt.addInterceptor = w, yt.removeInterceptor = k, u && "h5" === h && (window.uniCloud = yt);}})();var _t = yt;exports.default = _t;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 87:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 88);

/***/ }),

/***/ 88:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 89);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 89:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 90:
/*!****************************************************!*\
  !*** D:/yjy/??????/??????/????????????/pages.json?{"type":"stat"} ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__C740F77" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map