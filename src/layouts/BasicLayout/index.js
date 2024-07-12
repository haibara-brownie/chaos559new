import { intl } from "@chaoswise/intl";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { observer, toJS } from "@chaoswise/cw-mobx";
import {
  BasicLayout as Layout,
  portalNoticeManager,
  Icon,
  LayoutWrapper,
} from "@chaoswise/ui";
import styles from "./index.less";
import classnames from "classnames";

import globalStore from "@/stores/globalStore";
import logo from "./assets/logo.svg";

const BasicLayout = ({ children, route }) => {
  const history = useHistory();

  const { menuAuth } = globalStore;

  const routeMap = useRef({});
  const [openKeyList, setOpenKeyList] = useState([]);

  /**
   * 通过路由配置文件生成menuData
   * @param {Arrary} routeData 路由配置
   * @param {Arrary} menuAuth 菜单权限
   */

  const getMenuData = (routeData, menuAuth = []) => {
    let arr = [];

    function hasChilden(item) {
      let info = {
        ...item,
        name: item.name || "",
        hasAuth: checkHasAuth(item, menuAuth),
        icon: item.icon ? <Icon type={item.icon} /> : null,
      };
      if (item.routes) {
        info = {
          ...item,
          name: item.name || "",
          icon: item.icon ? <Icon type={item.icon} /> : null,
          hasAuth: item.parentPath
            ? item.routes.some((child) => checkHasAuth(child, menuAuth))
              ? true
              : false
            : true,
          children: getMenuData(item.routes, menuAuth),
          routes: undefined,
        };
      }
      arr.push(info);
      if (item.children && item.children.length !== 0) {
        loopData(item.children);
      }
    }

    function loopData(data) {
      data.forEach((item) => {
        routeMap.current[item.path] = item;
        hasChilden(item);
      });
    }

    loopData(routeData);
    return arr;
  };
  //检查菜单权限
  const checkHasAuth = (menuItem, menuAuth) => {
    return true;
    // const authItem = menuAuth.find((item) => {
    //   return item.code === menuItem.code;
    // });
    // if (!authItem || !authItem.selected) {
    //   return false;
    // } else {
    //   return true;
    // }
  };

  const onPathChange = (e) => {
    if (e.key === history.location.pathname) {
      return;
    }

    history.push(e.key);
  };

  //判断父级菜单是否显隐
  const isParentMenuHide = (data) => {
    const isNotAuth = (currentValue) => {
      return currentValue.hasAuth == false;
    };
    data.forEach((item) => {
      if (item.children && item.children.every(isNotAuth)) {
        item.hideInMenu = true;
      }
    });
    return data;
  };

  const data = getMenuData(route.routes || [], toJS(menuAuth));

  let menuData = [];

  menuData = isParentMenuHide(data).filter(
    (item) => item.hasAuth || !item.code
  );

  const isInPortal = !!document.querySelector("#singlespa-container");

  /**
   * 获取高亮菜单
   */
  const getActiveMenuKey = useMemo(() => {
    const currentRoute = routeMap.current[history.location.pathname];
    // 映射高亮菜单
    if (currentRoute && currentRoute.activeMenuKey) {
      return currentRoute.activeMenuKey;
    }
    // 默认
    return history.location.pathname;
  }, [history.location.pathname]);

  //上级菜单title
  const backTitle = () => {
    const pathname = history.location.pathname.split("?")[0];
    const currentRoute = routeMap.current[pathname];
    // 映射高亮菜单
    if (currentRoute && currentRoute.activeMenuKey) {
      return routeMap.current[currentRoute.activeMenuKey].name;
    }
    // 默认
    return "";
  };

  /**
   * 获取默认展开菜单
   */
  const getDefaultOpenKeys = useMemo(() => {
    const currentRoute = routeMap.current[history.location.pathname];
    // 映射高亮菜单
    if (currentRoute && currentRoute.parentPath) {
      return currentRoute.parentPath;
    }
    // 默认
    return "";
  }, [history.location.pathname]);

  useEffect(() => {
    setOpenKeyList([getDefaultOpenKeys]);
  }, [getDefaultOpenKeys]);

  const currentRoute =
    routeMap.current[history.location.pathname] || history.location.pathname;

  const juedgeIsShowSider = (menuData) => {
    // 根据portal是否显示侧边栏进行判断
    if (window?.PORTALAPP?.isUseSiderMenu) {
      return false;
    }
  };

  const isShowHead = () => {
    if (isInPortal) {
      return false;
    }
    return true;
  };

  return (
    <Layout
      logo={<img src={logo} alt="" />}
      headerTitle={intl
        .get("596eee78-4152-41d8-9ca8-76bc14d5aa43")
        .d("用户中心")}
      showSider={juedgeIsShowSider(menuData)}
      showHead={isShowHead()}
      showTopNavigation={false}
      showBreadcrumb={true}
      backNavigationTitle={backTitle()}
      className={classnames("douc-layout-wrapper", {
        [styles["layout-without-sider"]]: !juedgeIsShowSider(),
      })}
      menuOptions={{
        menuData,
        selectedKeys: [getActiveMenuKey],
        onClick: onPathChange,
        openKeys: openKeyList,
        onOpenChange: (data) => setOpenKeyList(data),
      }}
    >
      <LayoutWrapper contentStyle={currentRoute.contentStyle || {}}>
        {children}
      </LayoutWrapper>
    </Layout>
  );
};

export default observer(
  portalNoticeManager.withPortalDispatchNotice(BasicLayout)
);
