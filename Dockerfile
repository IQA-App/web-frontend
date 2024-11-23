FROM nginx:alpine

COPY dist/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

ENV BASE_URL='https://app.westus2.cloudapp.azure.com/api/'

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
