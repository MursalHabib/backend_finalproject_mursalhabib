# Use the official Node.js LTS version with Alpine as the base image
FROM node:lts-alpine

# Set environment variables
ENV PORT = 3000

ENV PROD_PG_USERNAME = postgres
ENV PROD_PG_PASSWORD = uljcvKNwUUbYLcBzQGAptiGHFUAYbblM
ENV PROD_PG_DATABASE = railway
ENV PROD_PG_HOST = autorack.proxy.rlwy.net
ENV PROD_PORT = 11619
ENV PROD_PG_DIALECT = postgres

ENV JWT_SECRET = secret
ENV JWT_EXPIRE = 24h

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code into the container
COPY . .

# Expose the app port
EXPOSE 3000

# Start the Node.js app
CMD ["node", "src/app.js"]
