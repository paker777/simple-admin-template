# simple-admin-template

```bash
# 克隆项目
git clone https://github.com/paker777/simple-admin-template.git

# 进入项目目录
cd simple-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

进行的改动：

1.对项目所有英文注释进行了翻译

2.引入了lodash工具函数库 https://www.lodashjs.com/

3.加入了历史导航

4.添加了vscode工作区建议的插件

5.二次封装了部分element ui组件 如分页器，对话框等

6.写好了登录获取token和用户信息的vuex逻辑，用异步进行模拟请求，只需将请求写上即可

7.写好了路由权限处理逻辑
