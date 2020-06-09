/**
 * @name 创建枚举数据
 * @param {Array} arr 原数组
 * @param {String} key 被指定为key值得属性名称
 * @param {Any} value 值
 * @example
 * createEnum([{
 *   id: 1,
 *   name: 'test'
 * }], 'id', 'name')
 */
function createEnum(data: Record<string, string>[] | Record<string, string>, key: string, value: string) {
	if (!data || typeof key !== 'string' || typeof value !== 'string') return data
	if (data instanceof Array && data.length < 1) return
	const obj:Record<string, string> = {};
	if (data instanceof Array) {
		data.forEach((item: any) => {
			obj[item[key]] = item[value];
			obj[item[value]] = item[key];
		});
	} else {
		obj[key] = data[value];
		obj[value] = data[key];
	}
	
	return obj;
};

export default createEnum
