# Use the official Node.js LTS image as a parent image
FROM node:18-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies in the container
RUN npm install

# Copy the content of the local src directory to the working directory
COPY . .

# Inform Docker that the container listens on the specified network ports at runtime
EXPOSE 8081

# Define environment variables (You can override these in deployment)
ENV MONGO_URI=mongodb://localhost:27017
ENV PORT=8081

# Specify the command to run on container start
CMD [ "npm", "start" ]