import { connect } from "@chaoswise/cw-mobx";
import { checkAuthorized } from "@/utils/auth";

const GetAuth = ({ menuAuth, code, render = () => {} }) => {
  const hasAuth = checkAuthorized(code, menuAuth);
  if (!hasAuth) {
    return null;
  }

  return render(hasAuth);
};

export default connect(({ globalStore }) => {
  return {
    menuAuth: globalStore.menuAuth,
  };
})(GetAuth);
