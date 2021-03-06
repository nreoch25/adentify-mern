FROM node:6.9.0

RUN npm install -g yarn
RUN npm install -g gulp

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app
RUN yarn install --pure-lockfile
COPY . /usr/src/app

EXPOSE 3000
CMD ["npm", "run", "bs"]
