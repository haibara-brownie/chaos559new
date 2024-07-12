import { intl } from "@chaoswise/intl";
import React from "react";
function NoAuth() {
  return (
    <div>
      {intl.get("556175e9-235e-4c59-8669-33e1a1839e5e").d("您没有权限")}
    </div>
  );
}

export default NoAuth;
