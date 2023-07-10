FROM node:latest

# Create app directory
RUN mkdir -p /app
RUN git clone https://github.com/stevenlafl/threads-web-client.git /app
WORKDIR /app

# Install dependencies
RUN yarn install
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]