FROM nginx:alpine

COPY .docker/conf/default.conf /etc/nginx/conf.d/
COPY build /usr/share/nginx/html

EXPOSE 80
