# Use a specific tag for reproducibility
FROM node:20.5-slim

# Set working directory
WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application source code
COPY . .

# Create logs directory with proper permissions
RUN mkdir -p /app/logs && chmod -R 755 /app/logs

# Set environment variables
ENV NODE_ENV=production

# Expose the default application port (if applicable, e.g., 3000)
EXPOSE 3000

# Run the application using a non-root user for security
USER node

# Start the application
CMD ["node", "src/app.js"]
