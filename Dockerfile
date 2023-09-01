FROM node:14.16.1-alpine

# Set up directories
WORKDIR /home/node/microservice

# Copy dependencies (this will change often)
COPY ./package.json /home/node/microservice
RUN npm install
RUN npm install pm2 -g
RUN pm2 install typescript

# Copy app
COPY app/ /home/node/microservice/app/
COPY config/ /home/node/microservice/config/
COPY ./tsconfig.json /home/node/microservice/
COPY ./process.yml /home/node/microservice/

EXPOSE 5405

ENTRYPOINT [ "npm", "run", "start" ]
