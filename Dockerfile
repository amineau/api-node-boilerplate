FROM node:latest

ENV TARGET /api

RUN mkdir -p $TARGET/src

ADD package.json $TARGET

WORKDIR $TARGET

RUN npm install

ADD script/docker-entrypoint.sh $TARGET
ADD script/wait-for $TARGET
ADD pm2.config.js $TARGET

RUN chmod 755 docker-entrypoint.sh
RUN chmod 755 wait-for

EXPOSE 4242

ENTRYPOINT ["./docker-entrypoint.sh"]