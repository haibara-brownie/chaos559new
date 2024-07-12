import { toMobx } from "@chaoswise/cw-mobx";
import { message } from "@chaoswise/ui";
import { getLoginLogList } from "@/services/logAudit";
import { intl } from "@chaoswise/intl";

const model = {
  // 唯一命名空间
  namespace: "loginLog",
  // 状态
  state: {
    listData: {}, // 列表数据
  },
  // 副作用actins，处理异步请求 (函数生成器)
  effects: {
    *getList(params = {}) {
      // 请求数据
      const res = yield getLoginLogList({ logType: "loginLog", ...params });
      if (res?.code === 100000) {
        this.listData = res?.data;
      } else {
        message.error(
          (res && res.msg) ||
            intl
              .get("6f3724ed-7da0-4852-8d1e-85bcfda5ad61")
              .d("获取日志列表失败")
        );
      }

      return res;
    },
  },
};

export default toMobx(model);
