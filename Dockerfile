FROM node:12.2.0-alpine

ARG API_URL=http://localhost:3001
ENV API_URL=${API_URL}

# set working directory
WORKDIR /usr/src/app
COPY . .
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

# start app
CMD ["npm", "start"]
