#!/usr/bin/env python
# -*- coding: utf-8 -*-


from Core import Core
import os

# 服务名称 根据自己包需求修改
SERVICE_NAME = "chaoswisePurewise5"


class InstalldoucWeb(Core):
  def __init__(self):
    """
    初始化json数据 及 基础方法
    """
    Core.__init__(self)
    self.SERVICE_NAME = SERVICE_NAME
    self.para = self.parameters()  # 脚本接收到的参数
    self.format_para(self.para)  # 解析脚本接收到的参数， 并初始化参数

  def run(self):
    """
    移动安装包
    :return:
    """
    self.out('\n *** chaoswisePurewise5安装进度 *** \n')
    self.out("1 {} 开始安装")
    # 查看本地部署是否在portalWeb和tengine里
    portal_ip = self.pub_para("ip", "tengine")
    portal_ip = portal_ip if isinstance(portal_ip, list) else [portal_ip]
    if self.local_ip in portal_ip:
      run_user = self.pub_para_install("run_user", "tengine")
      self.sys_cmd('chown -R {} {}'.format(run_user, self.install_args.get("base_dir")))
      self.sys_cmd('chmod -R 777 {}'.format(self.install_args.get("base_dir")))
      self.out("2 {} chaoswisePurewise5安装成功")
    else:
      self.out("2 {} chaoswisePurewise5和portalWeb和tengine不在同一节点上")


if __name__ == '__main__':
  _ = InstalldoucWeb()
  _.run()
