import md5 = require('md5');
import cloneDeep = require('lodash/cloneDeep');
import { APP_KEY } from '@common/configure';

export { default as asyncTask } from './async-task';

export const encodeContent = (content: any, key: string = APP_KEY) =>
  md5(md5(content) + key);

export const totalPage = (totalCount: number, pagesize: number) => {
  if (totalCount % pagesize === 0) {
    return parseInt(String(totalCount / pagesize), 10);
  } else {
    return parseInt(String(totalCount / pagesize + 1), 10);
  }
};

export const createPaginationResp = ({ content, page, size, count }) => {
  return {
    content,
    page,
    size,
    totalPage: totalPage(count, size),
    totalElements: count,
  };
};

export const removeFalsity = <T = any>(obj: T, falsity: any | any[] = [null, undefined]): Partial<T> => {
  const value = cloneDeep(obj);
  const falsityValue = Array.isArray(falsity) ? falsity : [falsity]
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      if (falsityValue.includes(value[key])) delete value[key];
    }
  }
  return value;
};
