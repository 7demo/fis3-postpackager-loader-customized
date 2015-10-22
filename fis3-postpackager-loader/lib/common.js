var rToken = /\$\{(.*)?\}/g;
var rTokenfilename = /\/?\w+\_/g; //匹配最后最后下划线后到.html的值

exports.search = function(obj, predicate) {
  var list = Object(obj);
  var length = list.length >>> 0;

  for (var i = 0; i < length; i++) {
    if (predicate.call(list, list[i], i, list)) {
      return i;
    }
  }

  return -1;
};

//去掉_
function reduceFuc (str) {
  var _reg = /\_/;
  if (_reg.test(str)) {
    str = str.replace(/\w*\_/g, '');
    return reduceFuc(str);
  } else {
    return str;
  }
}

exports.tokenizePath = function(tpl, tokens) {
  tokens = tokens || {};
  return tpl
    .replace(rToken, function(_, key) {
      if (tokens[key]) {

        var _cururlObj = tokens[key].match(rTokenfilename),
          _url = undefined,
          _cururl = '';
        if (_cururlObj) {
          _url = _cururlObj[0];
          _cururl = _url.substring(1, _url.length-1);
          return _cururl || '';
        } else {
          return '';
        }
      } else {
        return '';
      }
      // return tokens[key] || '';
    })
    .replace(/[\/\\]+/g, '/')
    .replace(/[:*?"<>|]/g, '_');

  // return tpl
  //   .replace(rToken, function(_, key) {
  //     return tokens[key] || '';
  //   })
  //   .replace(/[\/\\]+/g, '/')
  //   .replace(/[:*?"<>|]/g, '_');
};
