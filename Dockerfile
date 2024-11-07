FROM node:18

WORKDIR /usr/src/

COPY package*.json ./

RUN npm ci --only=production

COPY ./src ./src

RUN chown -R node:node /usr/src/
USER node

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]