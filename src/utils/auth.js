export function checkAuthorized(code, menuAuth, parentCode) {
  // 没有code不需要判断权限
  if (!code) {
    return true;
  }

  // 数组返回数组
  if (typeof code === "object") {
    return code.map((co) => {
      const authItem = menuAuth.find((item) => item.code === co);
      return authItem && authItem.selected;
    });
  }

  // 有parentCode需要先判断parentCode
  if (parentCode) {
    const authItem = menuAuth.find((item) => item.code === parentCode);
    if (!authItem || !authItem.selected) {
      return false;
    }
  }
  // 有code需要判断权限
  const authItem = menuAuth.find((item) => item.code === code);
  if (authItem && authItem.selected) {
    return true;
  }
  return false;
}
