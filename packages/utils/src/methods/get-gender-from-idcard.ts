/**
 * @name 读取身份证上的性别
 *
 * @param {string} idcard 身份证号
 * @returns {number} -1 异常 1男 2女
 */
function getGenderFromIdcard(idcard: string): number {
  if(!idcard || typeof idcard !== 'string') return -1;
  let sex: string;
  if (idcard.length > 16) {
    sex = idcard.charAt(16); // 取第十七位
  } else if (idcard.length > 14) {
    sex = idcard.charAt(14); // 取第十五位
  } else {
    return -1
  }
  return Number(sex) % 2 === 0 ? 2 : 1
}

export default getGenderFromIdcard
