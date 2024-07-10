FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY .env ./

RUN npm install -g npm@10.8.1

RUN npm install react-app-rewired --save-dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
