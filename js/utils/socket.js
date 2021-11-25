let SOCKET_MEAL_TASK = '';
let SOCKET_TABLE_ID = '';
const onMessage_Listeners = [];
/* 初始化 */

export const initMealSocket = ({
  tableId = '',
  onMessage = ''
} = {}) => {
  SOCKET_MEAL_TASK = uni._socket_meal_task || SOCKET_MEAL_TASK || '';

  if (SOCKET_TABLE_ID != tableId) {
    //桌面不一致，需要关闭之前连接
    if (SOCKET_MEAL_TASK) {
      SOCKET_MEAL_TASK.close();
    }
  }

  SOCKET_TABLE_ID = tableId || SOCKET_TABLE_ID;

  if (!SOCKET_MEAL_TASK) {
    //链接
    SOCKET_MEAL_TASK = uni.connectSocket({
      url: uni.$config.WEB_SOCKET_DOMAIN + '/addorder/' + SOCKET_TABLE_ID + '/0',

      success() {
        console.log('connect success');
      },

      fail(res) {
        console.log(res);
      }

    });
    uni._socket_meal_task = SOCKET_MEAL_TASK; //监听 连接打开事件

    SOCKET_MEAL_TASK.onOpen(res => {
      console.log(SOCKET_MEAL_TASK, 'onOpen', res);
    }); //监听 连接关闭事件

    SOCKET_MEAL_TASK.onClose(res => {
      console.log(SOCKET_MEAL_TASK, 'onClose', res);
      SOCKET_MEAL_TASK = '';
      uni._socket_meal_task = '';
    }); //监听 错误事件

    SOCKET_MEAL_TASK.onError(err => {
      console.log(SOCKET_MEAL_TASK, 'onError', err);
      SOCKET_MEAL_TASK = '';
      uni._socket_meal_task = '';
    });
  }

  if (onMessage) {
    //监听 接受到服务器的消息事件
    SOCKET_MEAL_TASK.onMessage(res => {
      const resObj = JSON.parse(JSON.parse(res.data));
      console.log('onMessage', resObj);
      onMessage(resObj);
    });
  }
};
export const unWatchMealOnMessage = listener => {
  const index = onMessage_Listeners.indexOf(listener);

  if (index > -1) {
    onMessage_Listeners.splice(index, 1);
  }
};
export const sendSocketMessage = data => {
  if (SOCKET_MEAL_TASK) {
    SOCKET_MEAL_TASK.send({
      data: JSON.stringify(data),

      success() {// SOCKET_MEAL_TASK.send({
        //     data:'[]'
        // })
      },

      fail(res) {
        SOCKET_MEAL_TASK = '';
      }

    });
  }
};
/**
 * 获取桌位人数
 */

export const getTableEatNumber = () => {
  sendSocketMessage([{
    operation: 'getNumber'
  }]);
};
/**
 * 设置桌位人数
 * @param eatNumber
 */

export const setTableEatNumber = eatNumber => {
  uni.$data.shopCar.diannei.eatNumber = eatNumber;
  sendSocketMessage([{
    operation: 'modifyNumber',
    eatNumber: eatNumber
  }]);
};