# 前端说明

## 安装依赖

安装 npm 淘宝镜像

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
```
cnpm install
```

## 命令

### 启动本地前端开发与 mock 服务
```bash
npm run start
```

### 本地前端开发服务
```bash
# 端口 3000
npm run dev
```

### 启动本地 mock 服务
```bash
# 端口 9091
npm run mock
```

### 打包编译
```bash
npm run build
```

## 目录
```js
+ mockServer // 前端 mock 服务

+ src // 前端项目代码
  + api // 接口
  + assets // 静态文件
  + axios // 请求封装
  + components // 通用组件
  + constant // 常量
  + pages // 页面
  + router // 路由 --- react-router 4
  + store // redux
  + styles // 全局样式
    - constatnt.less // less 变量
    - scaffold.less // 通用类
  + tool // 工具函数
...
...
...
- antd.themes.js // ant-design 主题定值

```