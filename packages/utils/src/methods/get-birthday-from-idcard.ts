/**
 * @name 获取身份证上的生日信息
 *
 * @param {string} idcard 身份证
 * @returns datetime 生日时间戳
 */
function getBirthdayFromIdcard(idcard: string) {
  if (typeof idcard !== 'string' || idcard.length < 14) return null;
  const birthday = idcard.substring(6, 10) + "-" + idcard.substring(10, 12) + "-" + idcard.substring(12, 14);
  return new Date(birthday).getTime()
}

export default getBirthdayFromIdcard
