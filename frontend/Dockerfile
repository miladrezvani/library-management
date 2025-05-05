FROM node:23

WORKDIR /usr/src/app/frontend

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./ .

EXPOSE 8080

CMD ["npm","run","serve"]