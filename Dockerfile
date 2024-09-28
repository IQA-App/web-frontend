FROM nginx:alpine

COPY dist/ /usr/share/nginx/html

ENV BASE_URL=https://app.westus2.cloudapp.azure.com/api

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]