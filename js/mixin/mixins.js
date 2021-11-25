/**
 * 给Page 增加 mixin 功能
 * @type {Page}
 */
const originPage = Page;
const originProperties = ['data', 'properties', 'options'];
const originMethods = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll', 'onTabItemTap'];
if (!Object.entries) Object.entries = function (obj) {
  var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array

  while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

  return resArray;
};

function merge(mixins, options) {
  mixins.forEach(mixin => {
    if (Object.prototype.toString.call(mixin) !== '[object Object]') {
      throw new Error('mixin 类型必须为对象！');
    }

    for (let [key, value] of Object.entries(mixin)) {
      if (originProperties.includes(key)) {
        options[key] = { ...value,
          ...options[key]
        };
      } else if (originMethods.includes(key)) {
        const originFunc = options[key];

        options[key] = function (...args) {
          if (key == 'onShareAppMessage') {
            //分享单独处理
            let type = args[0].target.dataset.type || '';

            if (type.startsWith('mixin')) {
              //mixin页处理
              return value.call(this, ...args);
            } else {
              //源page页处理
              return originFunc && originFunc.call(this, ...args);
            }
          } else {
            value.call(this, ...args);
            return originFunc && originFunc.call(this, ...args);
          }
        };
      } else {
        options = { ...mixin,
          ...options
        };
      }
    }
  });
  return options;
}

Page = options => {
  let mixins = options.mixins || [];

  if (Array.isArray(mixins)) {
    mixins = mixins.concat([require("./pageMixin.js")]);
    delete options.mixins;
    options = merge(mixins, options);
  }

  originPage(options);
}; // const originComponent = Component;
// const originComponentProperties = ['data', 'properties', 'options'];
// const originComponentMethods = ['observers', 'methods', 'behaviors', 'created', 'attached', 'ready', 'moved', 'detached', 'relations', 'lifetimes','pageLifetimes','definitionFilter'];
// function mergeComponent (mixins, options) {
//     mixins.forEach((mixin) => {
//         if (Object.prototype.toString.call(mixin) !== '[object Object]') {
//             throw new Error('mixin 类型必须为对象！')
//         }
//         for (let [key, value] of Object.entries(mixin)) {
//             if (originComponentProperties.includes(key)) {
//                 options[key] = { ...value, ...options[key] }
//             } else if (originComponentMethods.includes(key)) {
//                 const originFunc = options[key];
//                 options[key] = function (...args) {
//                     value.call(this, ...args);
//                     return originFunc && originFunc.call(this, ...args)
//                 }
//             } else {
//                 options = { ...mixin, ...options }
//             }
//         }
//     });
//     return options
// }
// Component = (options) => {
//     let mixins = options.mixins || [];
//     if (Array.isArray(mixins)) {
//         mixins = mixins.concat([require('./pageMixin')])
//         delete options.mixins;
//         options = mergeComponent(mixins, options)
//     }
//     originComponent(options)
// };