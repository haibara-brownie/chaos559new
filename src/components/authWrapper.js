import { intl } from "@chaoswise/intl";
import React from "react";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/Loading";

const authWrapper = (WrappedComponent) => {
  const Component = (props) => {
    const { getAuth, status } = useAuth();
    console.log(status);
    if (status === "loading") {
      return <Loading />;
    }
    if (status === "error") {
      return intl
        .get("d613f2e4-4cf3-44ea-a61d-2e2a56484cd9")
        .d("权限获取失败，请检查网络");
    }
    return <WrappedComponent getAuth={getAuth} {...props} />;
  };

  return Component;
};

export default authWrapper;
