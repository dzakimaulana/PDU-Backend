# build stage
FROM node:20 AS node-builder
RUN mkdir /build
WORKDIR /build
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# runtime stage
FROM node:20-alpine AS runtime
RUN apk add --update nodejs
USER node
RUN mkdir /home/node/
RUN mkdir /home/node/logs
WORKDIR /home/node/src
COPY --from=node-builder --chown=node:node /build /home/node
CMD ["node", "app.js"]