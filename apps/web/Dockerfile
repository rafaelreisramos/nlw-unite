FROM node:20 AS base

FROM base AS source
WORKDIR /usr/src/app
RUN npm install turbo --global
COPY . .
RUN turbo prune pass.in-web --docker -vvv

FROM base AS dependencies
WORKDIR /usr/src/app
COPY --from=source /usr/src/app/out/json/ .
COPY --from=source /usr/src/app/package-lock.json .
RUN npm install

FROM base AS build
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=source /usr/src/app/out/full/ .
COPY --from=source /usr/src/app/turbo.json turbo.json
RUN npm run build -- --filter=pass.in-web
RUN npm prune --prod

FROM nginx:1.25.5-alpine AS deploy
COPY --from=build /usr/src/app/apps/web/dist /usr/share/nginx/html
COPY --from=build /usr/src/app/apps/web/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

