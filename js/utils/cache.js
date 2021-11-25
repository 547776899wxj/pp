var cacheData = {};
export const clear = () => {
  cacheData = {};
};
export const getCacheDataSync = key => {
  if (key) {
    return cacheData[key];
  }

  return cacheData;
};
export const addCacheSync = (key, value) => {
  cacheData[key] = value;
};
export const getImgCacheKey = imgUrl => {
  // let key = imgUrl.replace(/\//g,"__").replace(/:/g,"$")
  let key = 'CITY_TP' + uni.$utils.strMd5(imgUrl);
  return key;
}; // export const addCacheImgSync = (imgUrl) =>{
//     let key = getImgCacheKey(imgUrl)
//     addCacheSync(key, imgUrl)
// }

export const getCacheImg = ({
  imgUrl,
  key,
  isFindLocalDir = false
}) => {
  if (!key) {
    if (!imgUrl) {
      return Promise.reject('imgUrl 为空');
    }

    key = getImgCacheKey(imgUrl);
  }

  let filePath = cacheData[key];
  return uni.$utils.getDataFileInfo({
    filePath
  }).catch(err => {
    if (isFindLocalDir) {
      let fileName = key;
      return uni.$utils.getDataFileInfo({
        fileName
      }).then(res => {
        let filePath = res.filePath;
        addCacheSync(key, filePath);
        return Promise.resolve(res);
      });
    } else {
      return Promise.reject(err);
    }
  });
};
export const getImageInfo = ({
  imgUrl,
  isAddCache = false
}) => {
  let key = getImgCacheKey(imgUrl);
  return new Promise((resolve, reject) => {
    uni.getImageInfo({
      src: imgUrl,

      success(res) {
        let filePath = res.path;

        if (isAddCache) {
          addCacheSync(key, filePath);
        }

        res.filePath = filePath;
        resolve(res);
      },

      fail(err) {
        reject(err);
      }

    });
  });
};