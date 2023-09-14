# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json .

# Install client and server dependencies
RUN npm ci

# Copy the client and server code into the container
COPY . .

RUN npm run build

# Expose the client and server ports (adjust these as needed)
EXPOSE 8080

# Define environment variables if necessary
# ENV NODE_ENV production

# Define a command to start both the client and server
CMD ["npm", "start"]
