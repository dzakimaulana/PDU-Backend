FROM node:20.5-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN mkdir -p /app/logs && chmod -R 755 /app/logs
ENV NODE_ENV=production
EXPOSE 3000
USER node
CMD ["node", "src/app.js"]
