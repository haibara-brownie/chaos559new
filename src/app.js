import React from "react";
import { ConfigProvider, ThemeProvider, Empty } from "@chaoswise/ui";

import Router from "@/config/router.config";
import { obtainCurrentLanguageState } from "@/utils/language";

// 国际化
import zh_antd from "antd/es/locale/zh_CN";
import en_antd from "antd/es/locale/en_US";

import darkTheme from "../config/themes/dark";

// 鉴权
import authWrapper from "@/components/authWrapper";
import "moment/locale/zh-cn";

const publicpath = process.env.publicPath;
const themes = {
  light: `${publicpath}index-light.css`,
  dark: `${publicpath}index-dark.css`,
};

const defaultTheme = "dark";

const App = ({ getAuth, noticeManager }) => {
  const basename =
    (window.appSign || "") + window.CHAOSWISE_PUREWISE5_CONFIG.basename;
  const currentLocale = obtainCurrentLanguageState();
  return (
    <ThemeProvider
      defaultTheme={defaultTheme}
      themeMap={themes}
      useMultipleTheme={false}
      themeVars={{
        ...darkTheme,
      }}
    >
      <ConfigProvider
        defaultLocale={currentLocale}
        renderEmpty={() => <Empty />}
      >
        <Router
          basename={basename}
          getAuth={getAuth}
          useCache={true}
          noticeManager={noticeManager}
          getUserConfirmation={(message, callback) => {
            setTimeout(() => {
              callback(true);
            });
          }}
        />
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default authWrapper(App);
