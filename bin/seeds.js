// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require('dotenv').config();


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
const Offer6Id = new mongoose.mongo.ObjectId();
const Offer7Id = new mongoose.mongo.ObjectId();
const Offer8Id = new mongoose.mongo.ObjectId();
const Offer9Id = new mongoose.mongo.ObjectId();
const Offer10Id = new mongoose.mongo.ObjectId();

const bcryptSalt = 10;

mongoose
  .connect(`${process.env.DBURL}`, { useNewUrlParser: true })
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
    username: "Pedro",
    email: "pcramos19@gmail.com",
    password: bcrypt.hashSync("pedro", bcrypt.genSaltSync(bcryptSalt)),
    rol: "Admin"
  },
  {
    username: "Alejandro",
    email: "alejandrosz@gmail.com",
    password: bcrypt.hashSync("alejandro", bcrypt.genSaltSync(bcryptSalt)),
    rol: "Customer",
    punctuation: 4100,
    level: 5,
    events: [Event3Id, Event4Id, Event1Id, Offer3Id, Offer1Id]
  },
  {
    username: "Julio",
    email: "julio@gmail.com",
    password: bcrypt.hashSync("julio", bcrypt.genSaltSync(bcryptSalt)),
    rol: "Customer",
    punctuation: 2500,
    level: 3,
    events: [Offer5Id, Offer2Id]
  },
  {
    username: "Sara",
    email: "sara@gmail.com",
    password: bcrypt.hashSync("sara", bcrypt.genSaltSync(bcryptSalt)),
    rol: "Customer",
    punctuation: 1800,
    level: 2,
    events: [Event5Id, Event2Id, Event3Id, Offer4Id]
  },
  {
    username: "Carlos",
    email: "carlos@gmail.com",
    password: bcrypt.hashSync("carlos", bcrypt.genSaltSync(bcryptSalt)),
    rol: "Customer",
    punctuation: 1500,
    level: 2,
    events: [Offer2Id, Event4Id]
  },
  {
    username: "Pedro Sanchez",
    email: "psanchez@gmail.com",
    password: bcrypt.hashSync("psanchez", bcrypt.genSaltSync(bcryptSalt)),
    rol: "Customer",
    punctuation: 800,
    level: 1,
    events: [Event5Id, Event2Id]
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
      coordinates: [40.4080326, -3.693607]
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
      coordinates: [40.4137859, -3.6943158]
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
      coordinates: [40.411114, -3.6957623]
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
      coordinates: [40.4267107, -3.7062943]
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
      coordinates: [40.4074259, -3.6958381]
    },
    punctuationReward: 300,
    image: "",
    qrCode: ""
  },
  {
    _id: Offer1Id,
    name: "Restaurante DiverXO",
    type: "Offers",
    description: "Descuento 50% menu degustacion 2 personas",
    tag: "restoration",
    discount: 50,
    start: new Date(2020, 02, 20, 15, 0, 0),
    duration: 60,
    location: {
      type: "Point",
      coordinates: [40.4581532, -3.6881661]
    },
    levelRequiered: 4,
    punctuationReward: 150,
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
      coordinates: [40.4238036, -3.6836985]
    },
    levelRequiered: 2,
    punctuationReward: 30,
    image: "",
    qrCode: ""
  },
  {
    _id: Offer3Id,
    name: "Tierra Burrito",
    type: "Offers",
    description: "Descuento 40%",
    tag: "restoration",
    discount: 40,
    start: new Date(2020, 02, 20, 21, 0, 0),
    duration: 30,
    location: {
      type: "Point",
      coordinates: [40.4360673, -3.7151283]
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
      coordinates: [40.423084, -3.7025196]
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
      coordinates: [40.416796, -3.7038842]
    },
    levelRequiered: 2,
    punctuationReward: 50,
    image: "",
    qrCode: ""
  },
  {
    _id: Offer6Id,
    name: "Tour Wanda Metropolitano",
    type: "Offers",
    description: "Descuento 30%",
    tag: "shopping",
    discount: 30,
    start: new Date(2020, 02, 22, 11, 0, 0),
    duration: 180,
    location: {
      type: "Point",
      coordinates: [40.4361939, -3.5994674]
    },
    levelRequiered: 2,
    punctuationReward: 100,
    image: "",
    qrCode: ""
  },
  {
    _id: Offer7Id,
    name: "Teatro Flamenco",
    type: "Offers",
    description: "Descuento 48%",
    tag: "culture",
    discount: 48,
    start: new Date(2020, 02, 23, 20, 0, 0),
    duration: 120,
    location: {
      type: "Point",
      coordinates: [40.4232417, -3.7045222]
    },
    levelRequiered: 1,
    punctuationReward: 80,
    image: "",
    qrCode: ""
  },
  {
    _id: Offer8Id,
    name: "Social Dental Studio",
    type: "Offers",
    description: "Descuento 80%",
    tag: "shopping",
    discount: 80,
    start: new Date(2020, 02, 21, 09, 0, 0),
    duration: 180,
    location: {
      type: "Point",
      coordinates: [40.4337335, -3.69915]
    },
    levelRequiered: 1,
    punctuationReward: 50,
    image: "",
    qrCode: ""
  },
  {
    _id: Offer9Id,
    name: "Museo de Cera",
    type: "Offers",
    description: "Descuento 50%",
    tag: "culture",
    discount: 50,
    start: new Date(2020, 02, 21, 12, 0, 0),
    duration: 240,
    location: {
      type: "Point",
      coordinates: [40.4250731, -3.6935499]
    },
    levelRequiered: 2,
    punctuationReward: 80,
    image: "",
    qrCode: ""
  },
  {
    _id: Offer10Id,
    name: "La Belleza Del Masaje",
    type: "Offers",
    description: "Descuento 50%",
    tag: "shopping",
    discount: 50,
    start: new Date(2020, 02, 21, 12, 0, 0),
    duration: 180,
    location: {
      type: "Point",
      coordinates: [40.4299443, -3.7100101]
    },
    levelRequiered: 1,
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
    console.log(
      `${eventsCreated.length} events created with the following id:`
    );
    console.log(eventsCreated.map(u => u._id));
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
