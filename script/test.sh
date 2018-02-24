#!/bin/sh

if [ -z $DOCKER_IP ]
then 
    DOCKER_IP = "0.0.0.0"
fi
curl http://$DOCKER_IP:4242/test
if curl http://$DOCKER_IP:4242/test | grep -q 'test ok'
then
  echo "Tests passed!"
  exit 0
else
  echo "Tests failed!"
  exit 1
fi
