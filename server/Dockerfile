# Use an official Node.js base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if you have it)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your app runs on (adjust if different)
EXPOSE 3000

# Run the app
CMD ["node", "dist/server.js"]
