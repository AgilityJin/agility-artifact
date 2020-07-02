# Nest_base_template

> Nest 基础开发模板

## 功能支持

- [x] [Typescript](https://www.tslang.cn/index.html)
- [x] [Nest](https://docs.nestjs.cn/)
- [x] Swagger
- [x] Env Config
- [x] [nestjs-session](https://github.com/iamolegga/nestjs-session)
- [x] global response interceptor
- [x] [class-validator](https://github.com/typestack/class-validator)
- [x] OSS lib
- [x] Sms lib
- [x] [date-fns](https://github.com/date-fns/date-fns#readme)
- [x] [lodash](https://lodash.com/)
- [x] Jwt
- [x] [TypeORM](https://github.com/typeorm/typeorm#readme)
- [x] monorepo

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
# npm install -g pm2
# or
# yarn global add pm2
$ npm run pm2
# or
$ npm run prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

  Nest is [MIT licensed](LICENSE).

## DB迁移

> 开发环境自动同步数据库架构,生产数据库则在实体变更后生成迁移脚本

### 创建新迁移

`yarn typeorm migration:create -n [entitiesName]`

### 从现有表结构迁移

`yarn typeorm migration:generate -n [entitiesName]`

### 运行迁移

`yarn typeorm migration:run`

### 撤销上次迁移

`yarn typeorm migration:revert`

### 同步数据库架构

`yarn typeorm schema:sync`

### 删除数据库架构

`yarn typeorm schema:drop`
