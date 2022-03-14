ARG DBHOST
ARG DBNAME
ARG DBUSER
ARG DBPASSWORD
ARG GCP_PROJECT
ARG APPLICATION_PORT

FROM node:16
RUN npm install -g pm2

RUN echo "$DBHOST"

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

RUN node dbinit.js

EXPOSE 8080
CMD [ "node", "app.js" ]