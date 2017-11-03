# 美信云文档系统后端服务

## 项目结构说明

- bin/ _Node Server启动程序_
- config/ _配置目录, 如api, db配置项_
- controllers/ _Controller层, 实现业务逻辑_
- models/ _Model层, 实现数据库映射_
- proxy/ _数据代理中间层_
- public/ _静态文件目录_
- routes/ _路由表_
- test/ _测试相关目录_
- app.js _应用入口文件_

## Debug

非Windows平台:

```
npm run debug
```

Windows平台:

```
npm run debug:win
```

## API接口文档

参考[wiki](http://mobilegit.midea.com/h5-dev-mx-framework/h5-dev-mx-framework-services-temp/wikis/home)

## API接口测试

参考[Postman](https://www.getpostman.com/docs/)用法

## 参考

[Express Tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)