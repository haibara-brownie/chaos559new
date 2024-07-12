import React, { useEffect, useState } from "react";
// 引入统一国际化工具
import { useIntl } from "@chaoswise/intl";
import loadable from "@loadable/component";
import Loading from "@/components/Loading";
import { obtainCurrentLanguageState } from "@/utils/language";
import globalStore from "@/stores/globalStore";
import { fetchGet } from "@/utils/request";

const Root = loadable(() => import("./Root"), {
  fallback: <Loading />,
});

const LangRegister = (props) => {
  const { registerLocales, setLocale, loading } = useIntl();

  useEffect(() => {
    registerLanguage();
  }, []);

  const registerLanguage = () => {
    let currentLocale = obtainCurrentLanguageState();
    globalStore.updateLanguage(currentLocale);
    fetchGet(`${process.env.PUBLIC_PATH}/locales/${currentLocale}.json`).then(
      (locales) => {
        // 注册语言
        registerLocales({
          [currentLocale]: locales || {},
        });
        // 设置当前语言
        setLocale(currentLocale);
      }
    );
  };

  // 国际化初始化未完成
  if (loading) {
    return null;
  }
  return <Root {...props} />;
};

export default LangRegister;
