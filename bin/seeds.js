// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Event = require("../models/Events");
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
    events: [Event3Id, Event4Id, Offer1Id]
  },
    {
    username: "julio",
    email: "julio@gmail.com",
    password: bcrypt.hashSync("julio", bcrypt.genSaltSync(bcryptSalt)),
    rol: "Customer",
    punctuation: 2500,
    level: 3,
    events: []
  },
  {
    username: "sara",
    email: "sara@gmail.com",
    password: bcrypt.hashSync("sara", bcrypt.genSaltSync(bcryptSalt)),
    rol: "Customer",
    punctuation: 800,
    level: 1,
    events: []
  },
  {
    username: "carlos",
    email: "carlos@gmail.com",
    password: bcrypt.hashSync("carlos", bcrypt.genSaltSync(bcryptSalt)),
    rol: "Customer",
    punctuation: 1500,
    level: 2,
    events: []
  }
];

let events = [
  {
    _id: Event1Id,
    name: "Retiro",
    type: "Missions",
    description: "Ir a pasear por Retiro",
    tag: "relax",
    start: new Date(2020, 02, 15, 20, 30, 0),
    duration: 120,
    location: {
      type: "Point",
      coordinates: [40.1925026, -3.7982764]
      },
    punctuationReward: 100,
    image: "",
    qrCode: ""
  },
  {
    _id: Event2Id,
    name: "Visita Prado",
    type: "Missions",
    description: "Ir a visitar Museo Prado",
    tag: "culture",
    start: new Date(2020, 02, 15, 12, 0, 0),
    duration: 180,
    location: {
      type: "Point",
      coordinates: [40.8935047, -3.8082863]
      },
    punctuationReward: 300,
    image: "",
    qrCode: ""
  },
  {
    _id: Event3Id,
    name: "Visita Caixa Forum",
    type: "Missions",
    description: "Ir a visitar Caixa Forum",
    tag: "culture",
    start: new Date(2020, 02, 17, 10, 0, 0),
    duration: 90,
    location: {
      type: "Point",
      coordinates: [40.3965646, -3.7062863]
      },
    punctuationReward: 250,
    image: "",
    qrCode: ""
  },
  {
    _id: Event4Id,
    name: "Encontrar Plaza 2 Mayo",
    type: "Missions",
    description: "Ir a Plaza 2 Mayo",
    tag: "relax",
    start: new Date(2020, 02, 18, 16, 0, 0),
    duration: 50,
    location: {
      type: "Point",
      coordinates: [40.6478046, -3.6942763]
      },
    punctuationReward: 100,
    image: "",
    qrCode: ""
  },
  {
    _id: Event5Id,
    name: "Visita Reina Sofia",
    type: "Missions",
    description: "Ir a visitar Museo Reina Sofia",
    tag: "culture",
    start: new Date(2020, 02, 19, 11, 0, 0),
    duration: 180,
    location: {
      type: "Point",
      coordinates: [40.4225046, -3.7742763]
      },
    punctuationReward: 300,
    image: "",
    qrCode: ""
  },
  {
    _id: Offer1Id,
    name: "Restaurante Migueli",
    type: "Offers",
    description: "Descuento 50% menu degustacion 2 personas",
    tag: "restoration",
    discount: 50,
    start: new Date(2020, 02, 20, 15, 0, 0),
    duration: 60,
    location: {
      type: "Point",
      coordinates: [40.5525026, -3.7982743]
      },
    levelRequiered: 1,
    punctuationReward: 50,
    image: "",
    qrCode: ""
  },
  {
    _id: Offer2Id,
    name: "Tienda Manoli",
    type: "Offers",
    description: "Descuento 70% en todas las prendas",
    tag: "shopping",
    discount: 70,
    start: new Date(2020, 02, 20, 15, 0, 0),
    duration: 30,
    location: {
      type: "Point",
      coordinates: [40.4825043, -3.7882763]
      },
    levelRequiered: 2,
    punctuationReward: 30,
    image: "",
    qrCode: ""
  },
  {
    _id: Offer3Id,
    name: "Tierra Burrita",
    type: "Offers",
    description: "Descuento 40%",
    tag: "restoration",
    discount: 40,
    start: new Date(2020, 02, 20, 21, 0, 0),
    duration: 30,
    location: {
      type: "Point",
      coordinates: [40.5725046, -3.4882759]
      },
    levelRequiered: 1,
    punctuationReward: 40,
    image: "",
    qrCode: ""
  },
  {
    _id: Offer4Id,
    name: "Carhatt Fuencarral",
    type: "Offers",
    description: "Descuento 50% en todas las camisetas",
    tag: "shopping",
    discount: 50,
    start: new Date(2020, 02, 17, 18, 0, 0),
    duration: 60,
    location: {
      type: "Point",
      coordinates: [40.4825096, -3.6782763]
      },
    levelRequiered: 3,
    punctuationReward: 70,
    image: "",
    qrCode: ""
  },
  {
    _id: Offer5Id,
    name: "Bacoa",
    type: "Offers",
    description: "Descuento 50%",
    tag: "shopping",
    discount: 50,
    start: new Date(2020, 02, 21, 20, 0, 0),
    duration: 120,
    location: {
      type: "Point",
      coordinates: [40.3929040, -3.7682762]
      },
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
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
