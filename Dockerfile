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
RUN addgroup -S node && adduser -S node -G node
USER node
RUN mkdir /home/node/src
RUN mkdir /home/node/logs
WORKDIR /home/node/src
COPY --from=node-builder --chown=node:node /build /home/node/src
CMD ["node", "app.js"]