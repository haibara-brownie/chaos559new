import { fetchGet, fetchPost } from "@/utils/request";

const API = window.CHAOSWISE_PUREWISE5_CONFIG.apiPrefix+"/gateway/douc/api/v1";

// 获取权限
export const getAuthApi = () => {
  return fetchGet(`${API}/auth/menuAuth`);
};
