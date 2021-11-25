module.exports = {
  data: {
    IMAGE_DOMAIN: uni.$config.IMAGE_DOMAIN || '',
    themeMainColor: '',
    themeMainColorRGB: {
      r: 255,
      g: 255,
      b: 255
    },
    styleThemeFirstBt: '',
    distanceTop: 0 //页面滚动 与顶部距离

  },

  themeMainColorChanged(themeMainColor) {
    let themeMainColorRGB = uni.$utils.colorRgb(themeMainColor);
    this.setData({
      themeMainColor,
      themeMainColorRGB
    });
  },

  styleThemeFirstBtChanged(styleThemeFirstBt) {
    this.setData({
      styleThemeFirstBt
    });
  },

  changeTheme(theme) {
    this.themeMainColorChanged(uni.$theme.getThemeMainColor());
    this.styleThemeFirstBtChanged(uni.$theme.getStyleThemeFirstBt());
  },

  onPageScroll: function (e) {
    var scrollTop = e.scrollTop;
    this.setData({
      distanceTop: scrollTop
    });
  },

  onShow() {
    if (uni.$config.IS_CHAIN && uni.$config.getCurrentShop()) {
      uni.$config.initApp();
    } else if (!uni.$config.IS_CHAIN) {
      uni.$config.initApp();
    }
  },

  onLoad() {
    uni.$utils.setSystemNavi(this);
    uni.hideShareMenu(); //判断是否是tabbar页面，并获取tabbar参数值

    this.options.aaa = 111;
    console.log('this', this);
    this.themeMainColorChanged(uni.$theme.getThemeMainColor());
    this.styleThemeFirstBtChanged(uni.$theme.getStyleThemeFirstBt());
    uni.$theme.watchThemeChange(this.changeTheme);
  },

  onUnload() {
    uni.$theme.unWatchThemeChange(this.changeTheme);
  },

  onShareAppMessage(e) {
    console.log('mixins onShareAppMessage', e);
    let type = e.target.dataset.type;

    if (type == 'mixin-shop-friend') {
      let posterInfo = e.target.dataset.posterInfo || {};
      let {
        shopInfo,
        goods
      } = posterInfo;
      let index = Number(e.target.dataset.index || 0);
      posterInfo.selectPosterIndex = index;
      let shareUrl = uni.$api.getShareUrlByShareInfo(posterInfo);
      let message = e.target.dataset.message || ''; //模式 1 店铺海报  2 商品海报 3储蓄卡分享  11支付前分享店铺

      let wxShareObj = {};
      shareUrl += '&shopId=' + shopInfo.userId;

      if (posterInfo.mode == 1) {
        wxShareObj = {
          title: message || '',
          path: shareUrl || '',
          imageUrl: uni.$config.IMAGE_DOMAIN + (posterInfo.shopPosters[index] && posterInfo.shopPosters[index].shopPosterSmallCard)
        };
        uni.$api.shopPosterShareSuccess({
          userShopPosterId: posterInfo.shopPosters[index].userShopPosterId
        });
      } else if (posterInfo.mode == 2) {
        wxShareObj = {
          title: message,
          path: shareUrl || '',
          imageUrl: goods.posterCardMergeUrl || ''
        };
      } else if (posterInfo.mode == 3) {
        wxShareObj = {
          title: message || '',
          path: shareUrl || '',
          imageUrl: uni.$config.IMAGE_DOMAIN + (posterInfo.shopPosters[index] && posterInfo.shopPosters[index].shopPosterSmallCard)
        };
        uni.$api.shopPosterShareSuccess({
          userShopPosterId: posterInfo.shopPosters[index].userShopPosterId
        });
      } else {
        wxShareObj = {
          title: message || '',
          path: shareUrl || '',
          imageUrl: uni.$config.IMAGE_DOMAIN + (posterInfo.shopPosters[index] && posterInfo.shopPosters[index].shopPosterSmallCard)
        };
        uni.$api.shopPosterShareSuccess({
          userShopPosterId: posterInfo.shopPosters[index].userShopPosterId
        });
      }

      console.log('wxShareObj', wxShareObj);
      return wxShareObj;
    }
  }

};