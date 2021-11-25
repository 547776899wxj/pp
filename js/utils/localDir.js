var DIR_VERSION = 0;
export const setDirVersion = version => {
  DIR_VERSION = version; // DIR_DATA_PATH  = wx.env.USER_DATA_PATH +'/'+ version

  for (let i = 0; i < DIR_VERSION; i++) {
    let dir = getDirRoot() + '/' + i;
    let exist = existDir(dir);

    if (exist) {
      delDir({
        dir
      });
    }
  }

  let dir = getDirRoot() + '/' + version;

  if (!existDir(dir)) {
    mkDirSync(dir);
  }
};
export const getImgFileName = imgUrl => {
  // let key = imgUrl.replace(/\//g,"__").replace(/:/g,"$")
  let key = 'CITY_TP' + uni.$utils.strMd5(imgUrl);
  console.log('getImgFileName', key);
  return key;
};
export const getDirRoot = () => {
  return uni.env.USER_DATA_PATH;
};
export const getDataDirRoot = () => {
  return uni.env.USER_DATA_PATH + '/' + DIR_VERSION;
};
export const existDir = dir => {
  try {
    return uni.getFileSystemManager().readdirSync(dir) ? true : false;
  } catch (e) {
    return false;
  }
};
export const mkDirSync = dir => {
  return uni.getFileSystemManager().mkdirSync(dir, true);
};
export const delDir = ({
  dir
}) => {
  return new Promise((resolve, reject) => {
    uni.getFileSystemManager().rmdir({
      dirPath: dir,
      recursive: true,

      success(res) {
        resolve(res);
      },

      fail(err) {
        reject(err);
      }

    });
  });
};
export const readDir = ({
  dir
}) => {
  return new Promise((resolve, reject) => {
    uni.getFileSystemManager().readdir({
      dirPath: dir,

      success(res) {
        resolve(res);
      },

      fail(err) {
        reject(err);
      }

    });
  });
};
export const readDataDir = () => {
  return readDir({
    dir: getDataDirRoot()
  });
};
export const existDataFile = ({
  fileName
}) => {};
export const getDataFileInfo = ({
  fileName = '',
  filePath = ''
}) => {
  if (filePath) {
    return new Promise((resolve, reject) => {
      uni.getFileSystemManager().getFileInfo({
        filePath,

        success(res) {
          res.filePath = filePath;
          resolve(res);
        },

        fail(err) {
          reject(err);
        }

      });
    });
  } else {
    var filePath = getDataDirRoot() + '/' + fileName;
    return new Promise((resolve, reject) => {
      uni.getFileSystemManager().getFileInfo({
        filePath,

        success(res) {
          res.filePath = filePath;
          resolve(res);
        },

        fail(err) {
          reject(err);
        }

      });
    });
  }
};
export const mkDataImg = ({
  imgUrl = '',
  isOver = false
}) => {
  return new Promise((resolve, reject) => {
    let fileName = getImgFileName(imgUrl);

    if (!isOver) {
      getDataFileInfo({
        fileName
      }).then(res => {
        resolve({
          filePath: res.filePath,
          fileName
        });
      }).catch(err => {
        uni.getImageInfo({
          src: imgUrl,

          success(res) {
            let tempFilePath = res.path;
            let filePath = getDataDirRoot() + '/' + fileName;
            uni.getFileSystemManager().saveFile({
              tempFilePath,
              filePath,

              success() {
                resolve({
                  filePath,
                  fileName
                });
              },

              fail() {
                reject('');
              }

            });
          },

          fail(err) {
            reject('');
          }

        });
      });
    } else {
      uni.getImageInfo({
        src: imgUrl,

        success(res) {
          let tempFilePath = res.path;
          let filePath = getDataDirRoot() + '/' + fileName;
          uni.getFileSystemManager().saveFile({
            tempFilePath,
            filePath,

            success() {
              resolve({
                filePath,
                fileName
              });
            },

            fail() {
              reject('');
            }

          });
        },

        fail(err) {
          reject('');
        }

      });
    }
  });
};