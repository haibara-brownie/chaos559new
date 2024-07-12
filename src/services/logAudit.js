import { fetchPost, fetchGet } from "@/utils/request";

const API = window.CHAOSWISE_PUREWISE5_CONFIG.apiPrefix + "/gateway/douc/api/v1";

export function getLoginLogList(params = {}) {
  return fetchPost(`${API}/logAudit/login/list`, {
    body: params,
  });
}
