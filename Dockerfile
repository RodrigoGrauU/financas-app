FROM  node:18.20-alpine AS build

#DEFINE VARIAVEL PARA BUILD DO PROJETO
ARG TYPE_ENV=production
RUN echo "tipo de ambiente definido: ${TYPE_ENV}"

WORKDIR /dist/src/app

RUN npm install -g @angular/cli

COPY package.json /dist/src/app
COPY package-lock.json /dist/src/app

RUN npm ci

COPY . /dist/src/app

RUN ng build --configuration=${TYPE_ENV}
# CMD [ "ng", "build", "--$TYPE_ENV" ]

#NGINX Server
FROM nginx:alpine

COPY --from=build /dist/src/app/dist/financas-app /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80
