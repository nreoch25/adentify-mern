FROM node:6.0.0

RUN npm install -g yarn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app
RUN yarn install --pure-lockfile
COPY . /usr/src/app

ENV NODE_ENV production

EXPOSE 8000
CMD ["npm", "run", "bs"]
