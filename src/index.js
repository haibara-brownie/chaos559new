import React from "react";
import ReactDOM from "react-dom";
import Loading from "@/components/Loading";
import loadable from "@loadable/component";

// 引入 singleSpaReact
import singleSpaReact from "single-spa-react";

const Root = loadable(() => import("./LangRegister"), {
  fallback: <Loading />,
});

const rootEle = document.getElementById("chaoswise-purewise5-root"); // 根据产品名称进行修改
if (rootEle) {
  ReactDOM.render(<Root />, rootEle);
}

/**
 * 加入以下微服务挂载所需要的的生命周期钩子（非微服务集成，以下代码不会执行）
 */
// 集成到portal后挂载节点，此id为portal承载子应用约定好的节点
function domElementGetter() {
  return document.getElementById("singlespa-container");
}

// 生产环境 - 打包成amd规范的文件，由Portal作为微服务引入应用
const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: (singlespa) => {
    return <Root {...singlespa} />;
  },
  domElementGetter,
});

// 应用启动的钩子
export const bootstrap = [reactLifecycles.bootstrap];

// 应用启动后的钩子
export function mount(props) {
  return reactLifecycles.mount(props);
}

// 应用卸载的钩子
export const unmount = [reactLifecycles.unmount];
