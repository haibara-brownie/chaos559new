// 判断是否再iframe内显示
export const judgeIsIframe = () => {
  if (window.frames.length != window.parent.frames.length) {
    return true;
  }
  return false;
};

export const UrlFilter = (str) => {
  var reg = /<[^<>]+>/g;
  var _str = str.replace(reg, "");
  return _str;
};

export const originHandler = () => {
  return (
    encodeURI(UrlFilter(window.location.protocol)) +
    "//" +
    encodeURI(UrlFilter(window.location.hostname)) +
    ":" +
    encodeURI(UrlFilter(window.location.port))
  );
};
