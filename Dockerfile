FROM node:16.8.0

WORKDIR /usr/chishikiBotDiscord
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build

CMD [ "yarn", "start" ]