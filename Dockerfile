FROM node:18-slim

WORKDIR /app

COPY package.json ./

RUN npm config set registry https://registry.npmjs.org/
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
