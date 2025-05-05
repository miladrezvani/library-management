FROM node:23

WORKDIR /usr/src/app/backend

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./ .

EXPOSE 5000

CMD ["npm","run","start"]
