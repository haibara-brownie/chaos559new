import { intl } from "@chaoswise/intl";
import React, { useEffect, useState, useCallback } from "react";
import { CWTable as Table, Input, Button, Tooltip } from "@chaoswise/ui";
import GetAuth from "@/components/GetAuth";
import { observer, toJS } from "@chaoswise/cw-mobx";
import store from "@/stores/loginLog";

import style from "./index.less";

const LoginLog = observer(() => {
  const { getList, listData } = store;
  const { currentPage = 1, total = 0, records = [], pageSize = 10 } = listData;

  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: intl.get("42a27333-186d-4c61-9724-511815cc2239").d("用户名"),
      sorter: true,
      sortDirections: ["descend", "ascend", undefined],
      dataIndex: "userName",
      key: "userName",
      render: (text) => {
        return (
          <Tooltip title={text} placement="topLeft">
            <div className={style["table-content"]}>{text}</div>
          </Tooltip>
        );
      },
    },
    {
      title: intl.get("5b412c79-b099-47cd-8745-21264d9212c4").d("姓名"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: intl.get("3190d9a0-41bf-42b3-adf9-9d22a337f65d").d("部门"),
      dataIndex: "department",
      key: "department",
      render: (text) => {
        return (
          <Tooltip title={text} placement="topLeft">
            <div className={style["table-content"]}>{text}</div>
          </Tooltip>
        );
      },
    },
    {
      title: intl.get("5577f4e7-433e-4b3d-8ff6-3b786d3d0e46").d("登录状态"),
      dataIndex: "loginStatus",
      key: "loginStatus",
      render: (text) =>
        text
          ? intl.get("c5992df7-b9cd-4330-b997-58acabe7632e").d("成功")
          : intl.get("85a9801c-d49c-45fa-8e1d-d3fc5f7d62fb").d("失败"),
    },
  ];

  const getLogList = useCallback(
    async (params = {}) => {
      setLoading(true);

      await getList(params);
      setLoading(false);
    },
    [getList]
  );

  useEffect(() => {
    getLogList({
      currentPage,
      pageSize,
    });
  }, [getLogList, currentPage, pageSize]);

  const onSearch = (searchParams, currentPage, pageSize) => {
    getLogList({
      currentPage,
      pageSize,
      ...searchParams,
    });
  };

  const changePage = (currentPage, pageSize, searchParams) => {
    getLogList({
      currentPage,
      pageSize: pageSize,
      ...searchParams,
    });
  };

  const searchContent = (intl) => {
    return [
      {
        components: (
          <Input
            id="loginUser"
            key="loginUser"
            placeholder={intl
              .get("42a27333-186d-4c61-9724-511815cc2239")
              .d("用户名")}
            name={intl.get("42a27333-186d-4c61-9724-511815cc2239").d("用户名")}
            allowClear
          />
        ),
        showLabel: true,
      },
    ];
  };

  return (
    <div className={style["handle-log"]}>
      <Table
        autoHeight={true}
        loading={loading}
        columns={columns}
        scroll={{ x: 1300 }}
        dataSource={toJS(records)}
        pagination={{
          pageSize: pageSize,
          currentPage: currentPage,
          total: total,
          onChange: changePage,
          onShowSizeChange: changePage,
          showSizeChanger: true,
        }}
        searchBar={{
          onSearch: onSearch,
          extra: () => {
            return [
              <GetAuth
                key="Export"
                code="1054102401"
                render={(hasAuth) => (
                  <Button type="primary" disabled={!hasAuth}>
                    {/* 导出 */}
                    {intl.get("72d79e31-d6c8-4852-a43c-85a3ad2a45f0").d("导出")}
                  </Button>
                )}
              />,
            ];
          },
          searchContent: searchContent(intl),
        }}
      />
    </div>
  );
});

export default LoginLog;
