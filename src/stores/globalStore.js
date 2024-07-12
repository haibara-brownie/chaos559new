import { getAuthApi } from "@/services/demo";
import { toMobx } from "@chaoswise/cw-mobx";

const globalStore = {
  namespace: "globalStore",

  state: {
    auth: {},
    menuAuth: [],
    currentLanguage: "",
  },

  effects: {
    *getMenuAhtu() {
      const res = yield getAuthApi();
      if (res && res.code === 100000) {
        this.menuAuth = res.data;
      }
    },
  },

  reducers: {
    updateAuth(auth, authMenu) {
      this.menuAuth = authMenu;
      this.auth = auth;
    },
    updateLanguage(lang) {
      this.currentLanguage = lang;
    },
  },

  computeds: {},
};

export default toMobx(globalStore);
