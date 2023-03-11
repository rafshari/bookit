FROM node:16-alpine
WORKDIR /bookit


COPY . .

RUN npm install --production
RUN npm run build

CMD [ "npm", "start" ]
