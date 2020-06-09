# agility-artifact

## 安装依赖

yarn install

## 代码提交

yarn commit // 如果发生异常,可全局安装commitizen依赖包再次尝试

1. 本次提交的类型(必填)
    * feat 新特性
    * fix 问题修复
    * docs 文档相关
    * style 不影响代码含义的更改(空白、格式、缺少分号等）
    * refactor 既不修复bug也不添加特性的代码更改 例如重构
    * perf 改进性能的代码更改
    * test 添加缺失的测试或修改现有的测试
    * chore 影响构建系统或外部依赖项的更改(如docker, npm等)
    * revert 回滚commit
    * WIP 正在进行的工程
2. 本次改动范围说明(必填)
3. 简要的改动描述(必填)
4. 详细的说明,用'|'换行(可选)
5. 列出被终止的更改,一般是问题的链接(可选)
6. 列出此更改所关闭的ISSUES问题, 如 #31, #34(可选)
7. 选择本次更改所影响的package名称(可空)

## 发布npm库

1. 确认当前npm源正确`https://registry.npmjs.org/`
2. 确认登录该源的账号正确,并具备发布库的权限
3. 待发布项目build完成
4. 执行`git add -A`及`yarn run commit`提交更改
5. yarn lerna publish
