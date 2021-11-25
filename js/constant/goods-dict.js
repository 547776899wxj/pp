/**
 * goods常量类
 * @type {{GoodsTypeDeliveryFood: number, GoodsTypeMeal: number}}
 */
export const GOODS_TYPE = {
  GoodsTypeMeal: 111,
  //店内
  GoodsTypeDeliveryFood: 121 //外送

};
export const DELIVERY_TYPE = {
  Takeaway: 21,
  //自取
  Send: 11 //外卖

};
export const SHOP_CAR_STORAGE_KEY = {
  WAIMAI: "waimai_order_car",
  DIANNEI: "diannei_order_car"
};