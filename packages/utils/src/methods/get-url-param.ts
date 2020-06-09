/**
 * @name 获取url指定参数值方法
 * @param {String} locationSearch 传入目标location的search参数
 * @param {String} key 需要获取的参数名
 * @returns {String}  返回获取的参数值
 */
function getUrlParam(locationSearch: string, key: string) {
	if(!locationSearch || !key) return '';
	const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
	const r = locationSearch.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	return '';
}

export default getUrlParam
