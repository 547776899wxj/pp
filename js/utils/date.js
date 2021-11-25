/**
 * get different
 */
export const countDown = (curTime, targetTime, format = 'HH:mm:ss') => {
	if (curTime instanceof Date) {
		curTime = curTime.getTime()
	}
	if (targetTime instanceof Date) {
		targetTime = targetTime.getTime()
	}
	let countDownSecond = parseInt((targetTime - curTime) / 1000)
	return formatSecond(countDownSecond, format)
}

/**
 * format second to given format 
 */
export const formatSecond = (seconds, format = 'HH:mm:ss') => {
	let resstring = ''
	let resarr = format.split(':')
	if (seconds >= 0) {
		const hourIndex = resarr.indexOf('HH')
		if (hourIndex >= 0) {
			resarr[hourIndex] = Math.floor(seconds / 3600)
			seconds = seconds % 3600
		}
		const minuteIndex = resarr.indexOf('mm')
		if (minuteIndex >= 0) {
			resarr[minuteIndex] = Math.floor(seconds / 60)
			seconds = seconds % 60
		}
		if (resarr.indexOf('ss') >= 0) {
			resarr[resarr.indexOf('ss')] = seconds
		}
		resarr = resarr.map(e => {
			if (e <= 9) {
				e = '0' + e
			}
			return e
		})
		resstring = resarr.join(':')
	}
	return resstring
}
