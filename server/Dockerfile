FROM node:18

WORKDIR /recipebox-server
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD npm start