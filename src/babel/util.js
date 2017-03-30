// @see https://babeljs.io/docs/learn-es2015/
import accounting from 'accounting';

import ErrMsg from '../../lib/errormsg';
import webviewBridge from './bridge';

let reAmount = /^(?:[1-9][0-9]*)0{3}$/;
let reMobile = /^1[3|4|5|8|7][0-9]{9}$/;
let reNickName = /^[\u4E00-\u9FA5A-Za-z0-9_]{2,12}$/;

accounting.settings.currency.format = '%v';

export default {
  accounting,
  toFixed: accounting.toFixed,
  formatNumber: accounting.formatNumber,
  formatMoney: accounting.formatMoney,
  ErrMsg,
  webviewBridge,
  reAmount,
  reMobile,
  reNickName
}
