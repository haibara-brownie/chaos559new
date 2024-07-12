import { mockInstance, fetchGet } from "@chaoswise/request";

mockInstance
  .onPost(
    `${window.CHAOSWISE_PUREWISE5_CONFIG.apiPrefix}/gateway/douc/api/v1/logAudit/login/list`
  )
  .reply(async (config) => {
    console.log(
      "%c [ 请求参数： ]-8",
      "font-size:13px; background:pink; color:#bf2c9f;",
      config.body
    );
    const data = await fetchGet(`${process.env.PUBLIC_PATH}/mock/data.json`);
    data.data.currentPage = config.body.currentPage;
    data.data.pageSize = config.body.pageSize;
    return [200, data, {}];
  });
