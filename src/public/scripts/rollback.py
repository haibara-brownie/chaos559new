#!/usr/bin/env python
# -*- coding: utf-8 -*-
from datetime import datetime
import os
import secrets
import sys

from Core import Core

PYTHON_VERSION = sys.version_info.major

if PYTHON_VERSION == 2:
    reload(sys)
    sys.setdefaultencoding('utf-8')

# 服务名称，按需修改（需要修改）
SERVICE_NAME = "chaoswisePurewise5"


class RollbackdoucWeb(Core):

    def __init__(self):
        """
        初始化json数据 及 基础方法
        """
        Core.__init__(self)
        self.SERVICE_NAME = SERVICE_NAME
        self.para = self.parameters()  # 脚本接收到的参数
        self.format_para(self.para)  # 解析脚本接收到的参数， 并初始化参数

    def run(self):
        self.out('\n *** {}回滚进度 *** \n'.format(SERVICE_NAME))
        self.check_dir(['base_dir'])

        # 拼接安装目录
        app_path = self.install_args.get("base_dir")
        # 拼接备份文件及目录
        rollback_backup_path = os.path.join(
            os.path.dirname(app_path),
            'rollback_backup/{}'.format(datetime.today().strftime("%Y%m%d"))
        )
        time_str = datetime.now().strftime("%Y%m%d%H%M")
        name = "{}.back-{}-{}".format(
            SERVICE_NAME, time_str, secrets.randbelow(120) + 1 
        )
        backup_file = os.path.join(rollback_backup_path, name)
        # 移动目录
        cmd_str = "mkdir -p {} && mv {} {} && mv {} {} && echo {}回滚成功, 备份路径:{}".format(
            rollback_backup_path,
            app_path,
            backup_file,
            self.para.backup_path,
            app_path,
            SERVICE_NAME,
            backup_file
        )

        # 执行命令（输出备份服务路径）
        self.sys_cmd(cmd_str,ignore_exception=False)




if __name__ == '__main__':
    _ = RollbackdoucWeb()
    _.run()