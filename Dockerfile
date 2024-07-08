FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY ~/frontend_files/.env ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
