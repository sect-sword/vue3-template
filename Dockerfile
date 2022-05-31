FROM 10.122.163.225:5000/nginx:1.19.8
MAINTAINER hzqing
# 创建根目录
WORKDIR /usr/share/nginx/ui
WORKDIR /ssl
# nginx日志文件
WORKDIR /etc/nginx/logs
# 拷贝构建文件
COPY ./dist/ /usr/share/nginx/ui/
# 修改权限
RUN  chmod -R 777 /usr/share/nginx/ui
# 删除默认的config位置文件
RUN rm -rf /etc/nginx/conf.d/*

# nginx配置文件
COPY nginx.template /etc/nginx/nginx.template

COPY rootCA.pem /ssl/
COPY rootCA.key /ssl/
COPY server.key /ssl/
COPY server.crt /ssl/

# 修改权限
RUN  chmod -R 777 /ssl/rootCA.pem
# 修改权限
RUN  chmod -R 777 /ssl/rootCA.key
RUN  chmod -R 777 /ssl/server.key
RUN  chmod -R 777 /ssl/server.crt

ENV APIIP  10.28.89.10:8765
ENV XIAOIIP  10.28.89.13:8040
CMD envsubst '$APIIP,$XIAOIIP' < /etc/nginx/nginx.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'

# 拷贝配置文件到容器
# COPY nginx.conf /etc/nginx/nginx.conf
# 镜像导出端口
EXPOSE 80
