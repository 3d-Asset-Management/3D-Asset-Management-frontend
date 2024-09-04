FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

FROM nginx:latest AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/build /usr/share/nginx/html

# # COPY package*.json ./
# # RUN npm install

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]