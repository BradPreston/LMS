FROM node:20 as base

WORKDIR /home/node/app

COPY package*.json ./
# RUN mkdir -p /home/node/app/prisma
COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build