# @agility-artifact/utils

> 工具库

## 使用

yarn add @agility-artifact/utils

```JavaScript
// 按需引入
// 如果为ts环境提示类型文件不存在 可在tsconfig内设置"noImplicitAny": false,即可
import getOs from '@agility-artifact/utils/lib/get-os'
getOs()

// 全量引入
import all from '@agility-artifact/utils'
all.getOs()
```

## 使用文档

[Getting Started](./docs/index.html)

## 更新记录

[Getting History](./CHANGELOG.md)

## 提交规范

* 新增的内容在test对应路径下需要有指定的test文件
* 新增的内容单元测试尽量做到100%覆盖
* 新增的内容在doc文档内应有详细的说明
* 每一版的发布都应生成完成的测试覆盖报告

## 发布npm库

1. 确认当前npm源正确`https://registry.npmjs.org/`
2. 确认登录该源的账号正确,并具备发布库的权限
3. `yarn run build`及`yarn run docs` 打包生产代码及组件文档
4. 执行`git add -A`及`yarn run commit`提交更改
5. 发布命令为`yarn run release -- --release-as [major/minor/patch]` 根据更新程度决定采用的的release as值, 如果为内测或公测版本则补充prerelease参数 `yarn run release -- --release-as [major/minor/patch] --prerelease [alpha/beta]`
6. `git push --follow-tags origin dev` 推送到远程分支
7. `yarn publish`正式发布 or `yarn publish --tag [alpha/beta]`内测或公测发布
8. 切换至master, `git merge dev` 拉取更改
9. `git push origin master` 更新远程仓库

## cli 命令

* `yarn run clean`移除build文件目录
* `yarn run test`进行单元测试
* `yarn run docs`生成使用文档 HTML
* `yarn run build`执行打包构建
* `yarn run dev`执行打包构建并监听后需改动,同步build
* `yarn run commit`代码commit
* `yarn run release`发布release changelog

## TODO

* 为指定md文件生成目录: `doctoc [filename]`
