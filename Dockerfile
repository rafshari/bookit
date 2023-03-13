FROM node:16-alpine AS development

WORKDIR /bookit

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

 WORKDIR /bookit

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /bookit/dist ./dist

CMD [ "noe", "dist/main" ]
