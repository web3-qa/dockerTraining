FROM nginx:alpine
RUN apk update && apk add --no-cache make git
WORKDIR /app
COPY package.json package-lock.json /app/
COPY . /app
RUN npm install && \
    npm i -g protractor && \
    npm run build




# FROM node:alpine as builder
# RUN apk update && apk add --no-cache make git
# WORKDIR /app
# COPY package.json package-lock.json /app/
# COPY . /app
# RUN npm install && \
# npm run build

# FROM nginx:alpine
# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=builder /app/dist/* /usr/share/nginx/html/
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]