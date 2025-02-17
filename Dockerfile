FROM node:18-slim

WORKDIR /app
EXPOSE 5173

COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the development server port (default is 3000 for NextJS)
EXPOSE 3000

# Run the development server
CMD ["npm", "run", "dev", "--", "--host"]
