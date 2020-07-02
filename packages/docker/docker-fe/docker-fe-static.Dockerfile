FROM node:13.10.1

LABEL author=agility_jin@outlook.com

RUN apt update \
    && apt install nginx -y \
    && nginx -v \
    && node -v \
    && yarn -v \
    && yarn config set registry http://r.cnpmjs.org/

EXPOSE 443
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
