For development, set the env DOCKER_IP, then

`npm run build
NODE_ENV=development npm start`

and 

`npm stop`

For test before commit :

`NODE_ENV=test npm start
NODE_ENV=syntax npm start`