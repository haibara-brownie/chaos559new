/**
 * 获取当前语言状态
 * @param {String} language
 */

export function obtainCurrentLanguageState(isSetLanguage = true) {
  return window.localStorage.getItem("cw_locale") || "zh_CN";
}
