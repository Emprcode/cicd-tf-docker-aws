# Base image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose backend port
EXPOSE 8000

# Start app
CMD ["npm", "start"]