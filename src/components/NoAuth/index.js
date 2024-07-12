import React from "react";
import { originHandler } from "@/utils/tool";
import { judgeIsIframe } from "@/utils/tool";
import styles from "./index.less";

function NoAuth() {
  const isIframe = judgeIsIframe();
  if (!isIframe && window.appSign === "") {
    return (window.location.href =
      originHandler() +
      window.location.pathname +
      "#" +
      (window.appSign || "") +
      window.CHAOSWISE_PUREWISE5_CONFIG.basename);
  } else {
    return (
      <div className={styles["douc-nosearch-content"]}>
        <div className={styles["douc-no-search-content"]}></div>
      </div>
    );
  }
}

export default NoAuth;
