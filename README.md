Wall Street is a virtual stock trading web application made using React

The v1 of this project was made when I just started out learning React, so it has lots of bugs and some core features didn't work properly(blame decimal alegbra in JavaScript)

To improve on all of it, I have made a v2 which is just more stable and better and with good practices. I have used TypeScript in React for the first time and really liked it, having static checking goes a long way in development process.

To run the project use

```
cd v2/
yarn install
yarn start
```

The above command will start the frontend

To start the backend
```
cd v2/backend
yarn install
yarn start
```

The App uses a Mongo database so you will need to start a mongo service first on your local machine or if you don't want local mongo instance you can use mLab. Replace your mLabURI with the local one in model.js and put your username and password in a .env file. Sample env file is given.

Enjoy!!

Its still a WIP.
