#!/bin/bash
echo "NODE_ENV: " $NODE_ENV
if [ -n $NODE_ENV ]
then
    if [ "$NODE_ENV" == "production" ]
    then
        npm run start-prod
    elif [ "$NODE_ENV" == "development" ]
    then
        npm run start-dev
    elif [ "$NODE_ENV" == "test" ]
    then
        echo "test"
        npm test
    elif [ "$NODE_ENV" == "coverage" ]
    then
        echo "coverage"
        npm run coverage
    elif [ "$NODE_ENV" == "syntax" ]
    then
        npm run check-syntax
    fi
else
    echo -e "NODE_ENV is not set\n"
fi