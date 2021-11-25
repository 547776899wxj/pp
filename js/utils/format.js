/**时间格式化**/
export const formatTime = date => {
	if (!date) return '';

	if (typeof date == 'string') {
		date = new Date(date.replace(/\-/g, '/'));
	}

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(
		':');
};

export const strToDate = dateStr => {
	console.log("strToDate1")
	if (typeof dateStr == 'string') {
		console.log("strToDate2")
		return new Date(dateStr.replace(/\-/g, '/'));
	}
}


/** 时间格式化 YYYY-MM-DD */
export const formatDateYMD = value => {
	var date = value
	if (Object.prototype.toString.call(value) == "[object String]") {
		if (date.indexOf('-') >= 0) {
			date = date.replace(/-/g, '/')
			date = new Date(date)
		}
	}
	if (!date) {
		date = new Date();
	}

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return [year, month, day].map(formatNumber).join('-');
};
/** 时间格式化 YYYY-MM-DD 自定义分隔符*/
export const formatDateYMDBySplit = (date, split) => {
	if (!date) {
		date = new Date();
	}

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return [year, month, day].map(formatNumber).join(split);
};
export const formatDateYMDNonull = date => {
	if (!date) return '';

	if (typeof date == 'string') {
		date = new Date(date.replace(/\-/g, '/'));
	}

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return [year, month, day].map(formatNumber).join('-');
};
/** */
export const formatNumber = n => {
	n = n.toString();
	return n[1] ? n : '0' + n;
};
/** 格式化数字 截取两位小数-不四舍五入
	返回字符串
 */
export const formatDigitFloor = value => {
	let nv = value * 100
	nv = Math.floor(nv)
	nv = (nv / 100).toFixed(2)
	return nv
}

/** 格式化数字 两位小数*/
export const formatDigit = value => {
	value = value + '';
	value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符

	value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的

	value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数

	if (value.indexOf(".") < 0 && value != "") {
		//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
		value = parseFloat(value);
	}

	return value;
};
/** 格式化数字 一位小数*/

export const formatDigitOne = value => {
	value = value + '';
	value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符

	value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的

	value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	value = value.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'); //只能输入一个个小数

	if (value.indexOf(".") < 0 && value != "") {
		//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
		value = parseFloat(value);
	}

	return value;
};
export const formatRpxToPx = rpx => {
	if (rpx) {
		rpx = Number(rpx);
	} else {
		rpx = 0;
	}

	return rpx / 750 * uni.getSystemInfoSync().windowWidth;
};
/** 隐藏手机号码 */

export const hiddenMobile = mobile => {
	if (!mobile) return '';
	var mb = mobile.toString();
	var hidStr = mb.substring(3, mb.length - 4);
	return mb.replace(hidStr, "****"); // return mb.replace( /^(\d{3})\d{4}(\d{4})$/, '$1****$2')
};
// 格式化整数
export const intFormat = val => {
	if (val) {
		val = val + ''
		let dval = val.split('.')[0] || '0'
		return dval
	}
	return '0'
}
// 格式化小数
export const decimalFormat = val => {
	if (val) {
		val = val + ''
		let dval = val.split('.')[1] || '00'
		return '.' + dval
	}
	return '.00'
}
// 格式化富文本图片
export const formatRichTextImage = content => {
	return content.replace(/width\s*:\s*[0-9]+px/g, 'width:100%');;
};
