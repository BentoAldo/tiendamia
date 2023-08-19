# Base image
FROM node:alpine

# Set working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Run migrations
RUN npx prisma migrate dev

# Expose the port the app runs on
EXPOSE 3001

# Command to run the app
CMD [ "node", "dist/src/app.js" ]
