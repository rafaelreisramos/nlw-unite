FROM node:20 AS base
WORKDIR /usr/src/app
RUN npm install turbo --global

FROM base AS dependencies
WORKDIR /usr/src/app
COPY . .
RUN turbo prune pass.in-api --docker

FROM base AS install
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/out/json/ .
COPY --from=dependencies /usr/src/app/package-lock.json .
RUN npm install

FROM base AS build
WORKDIR /usr/src/app
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY --from=dependencies /usr/src/app/out/full/ .
COPY turbo.json turbo.json
RUN npm run build -- --filter=pass.in-api
RUN npm prune --prod

FROM node:20-alpine3.19 AS deploy
WORKDIR /usr/src/app
RUN npm install -g prisma
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/apps/api/package.json ./package.json
COPY --from=build /usr/src/app/apps/api/dist ./dist
COPY --from=build /usr/src/app/apps/api/prisma ./prisma
RUN npx prisma generate
EXPOSE 3333

CMD ["npm", "start"]