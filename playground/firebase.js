import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC46aZNw1Fpvl9R7S5aOAG3pte3oMo-Qos",
    authDomain: "wall-street-e47d8.firebaseapp.com",
    databaseURL: "https://wall-street-e47d8.firebaseio.com",
    projectId: "wall-street-e47d8",
    storageBucket: "wall-street-e47d8.appspot.com",
    messagingSenderId: "179677723225"
};

firebase.initializeApp(config);

const database = firebase.database();

database.ref("portfolio").push({
    company: "HDFC",
    quantity: 10,
    buyPrice: 1070,
    currPrice: 1090,
    shareWorth: 10900,
    profitLoss: 200
}).then(() => {
    console.log("Done addding data");
})

database.ref("portfolio").push({
    company: "Infosys",
    quantity: 102,
    buyPrice: 17,
    currPrice: 12,
    shareWorth: 132,
    profitLoss: 32
}).then(() => {
    console.log("Done addding data");
})

database.ref("portfolio").push({
    company: "Reliance",
    quantity: 21,
    buyPrice: 192,
    currPrice: 2183,
    shareWorth: 203,
    profitLoss: -278
}).then(() => {
    console.log("Done addding data");
})

// const id = "-LFaNjPY0ld0BUCgYqcs";

database.ref('portfolio').child("-LFaOjAWXQR7lnEt5EGh").remove().then(() => {
    console.log("Done Adding Data");
})