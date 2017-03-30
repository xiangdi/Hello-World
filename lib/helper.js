/**
 * jade ui helper
 */
var url = require('url');

var accounting = require('accounting');

var util = require('./util');
var statics = require('./static')(util.setting);
var moment = util.moment;
var _ = util.lodash;
//var cache = {};

//var STATIC_HOST = util.setting.avatar.host;
//var STATIC_AVATAR = util.setting.avatar.def;

exports.CATEGORY_WIN = util.CATEGORY_WIN; // 稳盈宝
exports.CATEGORY_FOLLOW = util.CATEGORY_FOLLOW; // 跟投乐
exports.CATEGORY_WINPLUS = util.CATEGORY_WINPLUS; // 稳盈宝
exports.CATEGORY_FOLLOWPLUS = util.CATEGORY_FOLLOWPLUS; // 跟投乐
exports.FOLLOWPLUS_INVEST_TYPE = ['股票', '期货', '量化'];
exports.SUBCATEGORY = ['多多益善', '一触即多', '进取', '无忧', '不可多得'];
exports.SUBCATEGORY_FOLLOWPLUS = util.SUBCATEGORY_FOLLOWPLUS; // 跟投乐-进取型
exports.SUBCATEGORY_FOLLOWPLUS_FEAR = util.SUBCATEGORY_FOLLOWPLUS_FEAR; // 跟投乐-无忧型
// format money
accounting.settings.currency.format = '%v';
exports.accounting = accounting;
exports.toFixed = accounting.toFixed;
exports.formatNumber = accounting.formatNumber;
exports.formatMoney = accounting.formatMoney;
// safe
exports.safeMobile = util.safeMobile;
exports.safeIdentity = util.safeIdentity;
exports.safeBank = util.safeBank;
exports.safeRealname = util.safeRealname;
//exports.STATIC_HOST = STATIC_HOST;
exports.pageCount = util.pageCount
// bank
exports.getBank = util.getbank;
// static url
exports.static_url = statics;
// fund Status
exports.fundStatus = function(id){
  return util.FUND_STATUS[id] || '';
};
exports.parseStatus = util.parseStatus;
exports.heroLever = util.heroLever;
exports.followplusType = util.followplusType;
// status
exports.showStatus = function(id){
  return util.STATUS[id] || '';
};
// Sub Category
exports.parseSubCategory = function(id){
  return exports.SUBCATEGORY[id] || '';
}
// followplus invest type
exports.parseInvestType = function(id){
  return exports.FOLLOWPLUS_INVEST_TYPE[id] || '';
}
// format date
exports.moment = moment;
// format date
exports.formatdate = function (format, date) {
  format = format || 'YYYY-MM-DD';
  var time = date || new Date();
  return moment(time).format(format);
};
// diff date
exports.diffDate = function(start, end){
  var _end = end || Date.now();
  var diff = Math.abs(_end - start);
  var floor = Math.floor;
  var data = {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0
  };
  data.day = floor( diff / 864e5 ); // 1000 * 60 * 60 * 24, negate dst
  diff -= data.day * 864e5;
  data.hour = floor( diff / 36e5 ); // 1000 * 60 * 60
  diff -= data.hour * 36e5;
  data.minute = floor(diff / 6e4); // 1000 * 60
  diff -= data.minute * 6e4;
  data.second = floor(diff / 1e3); // 1000
  return data;
};
// gen avatar url
// exports.gen_avatar_url = function(uri){
//   if ( !uri || uri.length < 2 ) {
//     uri = STATIC_AVATAR;
//   }
//   return url.resolve(STATIC_HOST, uri);
// };

// gen static
// exports.gen_static_url = function(uri){
//   if( uri ){
//     return url.resolve(STATIC_HOST, uri);
//   }
// };
// cut string
exports.cutStr = function(val, len, ellipsis){
  len = (len - 0) || 10;
  ellipsis = ellipsis ? ellipsis : '...';
  if ( !val ) {
    return '';
  }
  var _len = val.length;
  var max = len + 2;
  if ( _len < max ) {
    return val;
  }
  return val.slice(0, len) + ellipsis;
};
// random
exports.random = function(max, min) {
  if (!isNaN(max)) {
    if (!isNaN(min)) {
      return Math.round(Math.random() * (max - min) + min);
    } else {
      return Math.round(Math.random() * max);
    }
  }

  return max;
};
// follow hero lever
exports.followHeroLever = function(id){
  return util.FOLLOW_HERO_LEVER[id] || '';
};

// follow list release
exports.releaseTime = function(startTime, endTime){
  var countUpTime = accounting.formatNumber((endTime - startTime) / (1000 * 60 * 60 * 24));
  if(countUpTime >= 1){
    return countUpTime + '<span>天</span>';
  }else{
    return '<span>不足</span>1<span>天</span>';
  }
};

exports.matureEndTime = function(startTime, endTime){
  var countUpTime = accounting.formatNumber(((endTime - startTime) / (1000 * 60 * 60 * 24)) + 1);
  if(countUpTime >= 1){
    return countUpTime + '<span>天</span>';
  }else{
    return '<span>不足</span>1<span>天</span>';
  }
};

// parse update strategy
exports.parseUpdateStrategy = function(opt){
  var map = ['实时更新', '延时更新', '盘末更新'];
  var list = [{
      'key': 'disclosegeneraldataschedule',
      'list': [
        {
          'k': 'disclosevalue',
          'v': '产品单位净值'
        },
        {
          'k': 'disclosepositionpct',
          'v': '产品仓位'
        }
      ]
    },
    {
      'key': 'disclosedetaildataschedule',
      'list': [
        {
          'k': 'disclosetrades',
          'v': '交易记录'
        },
        {
          'k': 'disclosepositions',
          'v': '持仓'
        }
      ]
    }
  ];
  var ret = [];

  list.forEach(function(obj){
    var _ret = [];
    var val = ~~_.get(opt, obj['key'], 3);
    if(3 !== val){
      obj['list'].forEach(function(kv){
        var flag = ~~_.get(opt, kv['k'], 0) || 0;
        if ( flag ) {
          _ret.push(kv['v']);
        }
      });
    }
    if(_ret.length){
      ret.push(_ret.join('、')+map[val]);
    }
  });

  return ret.join('，') || '无';
};
/*
 * followplus type
 */
exports.followplusType = function(id){
  var ret = {};
  var keys = ['stocks', 'futures', 'quantitative'];
  keys.forEach(function(k){
    if ( keys[id] == k ) {
      ret[k] = true;
    }else {
      ret[k] = false;
    }
  });
  return ret;
};
