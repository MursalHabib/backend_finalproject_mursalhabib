# Use the official Node.js LTS version with Alpine as the base image
FROM node:lts-alpine

# Set environment variables
PORT = 3000

PROD_PG_USERNAME = postgres
PROD_PG_PASSWORD = uljcvKNwUUbYLcBzQGAptiGHFUAYbblM
PROD_PG_DATABASE = railway
PROD_PG_HOST = autorack.proxy.rlwy.net
PROD_PORT = 11619
PROD_PG_DIALECT = postgres

JWT_SECRET = secret
JWT_EXPIRE = 24h

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code into the container
COPY . .

# Expose the app port
EXPOSE $PORT

# Start the Node.js app
CMD ["node", "src/app.js"]
