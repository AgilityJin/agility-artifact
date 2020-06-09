import CryptoJS from 'crypto-js'

/**
 * @name 解码Base64 url
 * @param {any} contents 需要被解密的内容
 * @param {Boolean} isNeedParse 是否需要JSON.parse进行二次处理
 */
function decodeBase64(contents: string, isNeedParse = false) {
	try {
		if (!contents) {
			return isNeedParse ? null : '';
		}
		const base64 = CryptoJS.enc.Base64.parse(contents);
		const str = base64.toString(CryptoJS.enc.Utf8);
		return isNeedParse ? JSON.parse(str) : str;
	} catch (error) {
		return isNeedParse ? null : '';
	}
};

export default decodeBase64
