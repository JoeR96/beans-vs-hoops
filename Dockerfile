FROM node:18-slim

WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build the Next.js app (Required for production mode)
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the app in production mode
CMD ["npm", "run", "start"]
