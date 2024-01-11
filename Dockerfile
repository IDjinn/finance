FROM node as react-native-image

RUN mkdir /app
WORKDIR /app

RUN npm i -g --force yarn
RUN yarn global add typescript react-native expo --force

COPY ./ ./

RUN yarn