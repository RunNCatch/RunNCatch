// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Event = require("../models/Events");
const Offer = require("../models/Offers");
const Event1Id = new mongoose.mongo.ObjectId();
const Event2Id = new mongoose.mongo.ObjectId();
const Event3Id = new mongoose.mongo.ObjectId();
const Event4Id = new mongoose.mongo.ObjectId();
const Event5Id = new mongoose.mongo.ObjectId();
const Offer1Id = new mongoose.mongo.ObjectId();
const Offer2Id = new mongoose.mongo.ObjectId();
const Offer3Id = new mongoose.mongo.ObjectId();
const Offer4Id = new mongoose.mongo.ObjectId();
const Offer5Id = new mongoose.mongo.ObjectId();

const bcryptSalt = 10;

mongoose
  .connect("mongodb://localhost/Run-Catch", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let users = [
  {
    username: "pedro",
    email: "pcramos19@gmail.com",
    password: bcrypt.hashSync("pedro", bcrypt.genSaltSync(bcryptSalt)),
    rol: "Admin"
  },
  {
    username: "alejandro",
    email: "alejandrosz@gmail.com",
    password: bcrypt.hashSync("alejandro", bcrypt.genSaltSync(bcryptSalt)),
    rol: "Customer",
    punctuation: 1000,
    level: 1,
    events: [Event3Id, Event4Id],
    offers: [Offer1Id]
  },
    {
    username: "julio",
    email: "julio@gmail.com",
    password: bcrypt.hashSync("julio", bcrypt.genSaltSync(bcryptSalt)),
    rol: "Customer",
    punctuation: 2500,
    level: 3,
    events: [],
    offers: []
  },
  {
    username: "sara",
    email: "sara@gmail.com",
    password: bcrypt.hashSync("sara", bcrypt.genSaltSync(bcryptSalt)),
    rol: "Customer",
    punctuation: 800,
    level: 1,
    events: [],
    offers: []
  },
  {
    username: "carlos",
    email: "carlos@gmail.com",
    password: bcrypt.hashSync("carlos", bcrypt.genSaltSync(bcryptSalt)),
    rol: "Customer",
    punctuation: 1500,
    level: 2,
    events: [],
    offers: []
  }
];

let events = [
  {
    _id: Event1Id,
    name: "Retiro",
    description: "Ir a pasear por Retiro",
    start: new Date(2020, 02, 15, 20, 30, 0),
    duration: 120,
    positionlat: 41,
    positionlng: -3.79,
    type: "relax",
    punctuationReward: 100,
    image: "",
    qrCode: ""
  },
  {
    _id: Event2Id,
    name: "Visita Prado",
    description: "Ir a visitar Museo Prado",
    start: new Date(2020, 02, 15, 12, 0, 0),
    duration: 180,
    positionlat: 41,
    positionlng: -3.79,
    type: "culture",
    punctuationReward: 300,
    image: "",
    qrCode: ""
  },
  {
    _id: Event3Id,
    name: "Visita Caixa Forum",
    description: "Ir a visitar Caixa Forum",
    start: new Date(2020, 02, 17, 10, 0, 0),
    duration: 90,
    positionlat: 41,
    positionlng: -3.79,
    type: "culture",
    punctuationReward: 250,
    image: "",
    qrCode: ""
  },
  {
    _id: Event4Id,
    name: "Encontrar Plaza 2 Mayo",
    description: "Ir a Plaza 2 Mayo",
    start: new Date(2020, 02, 18, 16, 0, 0),
    duration: 50,
    positionlat: 41,
    positionlng: -3.89,
    type: "relax",
    punctuationReward: 100,
    image: "",
    qrCode: ""
  },
  {
    _id: Event5Id,
    name: "Visita Reina Sofia",
    description: "Ir a visitar Museo Reina Sofia",
    start: new Date(2020, 02, 19, 11, 0, 0),
    duration: 180,
    positionlat: 41,
    positionlng: -3.77,
    type: "culture",
    punctuationReward: 300,
    image: "",
    qrCode: ""
  }
];

let offers = [
  {
    _id: Offer1Id,
    name: "Restaurante Migueli",
    description: "Descuento 50% menu degustacion 2 personas",
    discount: 50,
    start: new Date(2020, 02, 20, 15, 0, 0),
    duration: 60,
    positionlat: 41,
    positionlng: -3.77,
    type: "restoration",
    levelRequiered: 1,
    punctuationReward: 50,
    image: "",
    qrCode: ""
  },
  {
    _id: Offer2Id,
    name: "Tienda Manoli",
    description: "Descuento 70% en todas las prendas",
    discount: 70,
    start: new Date(2020, 02, 20, 15, 0, 0),
    duration: 30,
    positionlat: 41,
    positionlng: -3.78,
    type: "shopping",
    levelRequiered: 2,
    punctuationReward: 30,
    image: "",
    qrCode: ""
  },
  {
    _id: Offer3Id,
    name: "Tierra Burrita",
    description: "Descuento 40%",
    discount: 40,
    start: new Date(2020, 02, 20, 21, 0, 0),
    duration: 30,
    positionlat: 41,
    positionlng: -3.77,
    type: "restoration",
    levelRequiered: 1,
    punctuationReward: 40,
    image: "",
    qrCode: ""
  },
  {
    _id: Offer4Id,
    name: "Carhatt Fuencarral",
    description: "Descuento 50% en todas las camisetas",
    discount: 50,
    start: new Date(2020, 02, 17, 18, 0, 0),
    duration: 60,
    positionlat: 41,
    positionlng: -3.793,
    type: "shopping",
    levelRequiered: 3,
    punctuationReward: 70,
    image: "",
    qrCode: ""
  },
  {
    _id: Offer5Id,
    name: "Bacoa",
    description: "Descuento 50%",
    discount: 50,
    start: new Date(2020, 02, 21, 20, 0, 0),
    duration: 120,
    positionlat: 41.1,
    positionlng: -3.72,
    type: "shopping",
    levelRequiered: 2,
    punctuationReward: 50,
    image: "",
    qrCode: ""
  }
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  });

Event.deleteMany()
  .then(() => {
    return Event.create(events);
  })
  .then(eventsCreated => {
    console.log(`${eventsCreated.length} events created with the following id:`);
    console.log(eventsCreated.map(u => u._id));
  });

Offer.deleteMany()
  .then(() => {
    return Offer.create(offers);
  })
  .then(offersCreated => {
    console.log(`${offersCreated.length} offers created with the following id:`);
    console.log(offersCreated.map(u => u._id));
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
