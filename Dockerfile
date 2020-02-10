FROM node:13-buster-slim
WORKDIR /app
COPY package.json /app/
RUN npm install --verbose
RUN apt-get -y update && apt-get -y install make
COPY . /app/
RUN make build_all
