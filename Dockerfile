# Single stage build and runtime
FROM node:20

# Set up working directory
WORKDIR /home/node

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the rest of the application files
COPY . .

# Create logs directory and set permissions
RUN mkdir -p /home/node/logs && chown -R node:node /home/node/logs

# Set the user to node for security
USER node

# Command to start the application
CMD ["node", "src/app.js"]
