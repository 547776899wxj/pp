import * as GOODS_DICT from './goods-dict';
import * as DISCOUNT_CONST from './discount-const';
import * as ORDER_TYPE_CONST from './order-type-const';
const SHARE_DEFAULT_GOODS_MESSAGE = '强烈推荐！我在{{某店}}消费的{{某产品}}真是太棒啦！一般人我不告诉ta，快来试试吧！'; // const SHARE_DEFAULT_SHOP_MESSAGE = '我发现了这家好店{{某店}}，更多惊喜等你亲自来探店哦！'  //在数据库-海报编号1

module.exports = {
  GOODS_DICT,
  DISCOUNT_CONST,
  ORDER_TYPE_CONST,
  SHARE_DEFAULT_MESSAGE: {
    SHARE_DEFAULT_GOODS_MESSAGE
  }
};