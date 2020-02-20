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
const Event6Id = new mongoose.mongo.ObjectId();
const Event7Id = new mongoose.mongo.ObjectId();
const Event8Id = new mongoose.mongo.ObjectId();
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
const Offer11Id = new mongoose.mongo.ObjectId();
const Offer12Id = new mongoose.mongo.ObjectId();
const Offer13Id = new mongoose.mongo.ObjectId();
const Offer14Id = new mongoose.mongo.ObjectId();
const Offer15Id = new mongoose.mongo.ObjectId();

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
    image: "../images/pedro.jpeg",
    rol: "Admin",
    events: [Offer1Id, Offer14Id, Offer5Id, Event6Id, Offer2Id, Event4Id, Offer9Id, Offer7Id]
  },
  {
    username: "Alejandro",
    email: "alejandrosz@gmail.com",
    password: bcrypt.hashSync("alejandro", bcrypt.genSaltSync(bcryptSalt)),
    image: "../images/alejandro.jpeg",
    rol: "Customer",
    punctuation: 4100,
    level: 5,
    events: [Offer1Id, Offer9Id, Offer3Id, Event1Id, Offer11Id, Offer8Id, Event4Id, Event7Id]
  },
  {
    username: "Fernando",
    email: "fernando@gmail.com",
    password: bcrypt.hashSync("fernando", bcrypt.genSaltSync(bcryptSalt)),
    image: "../images/comet.jpeg",
    rol: "Customer",
    punctuation: 2500,
    level: 3,
    events: [Offer5Id, Offer2Id, Offer13Id, Event2Id, Offer13Id, Offer15Id, Event8Id]
  },
  {
    username: "Laura",
    email: "laura@gmail.com",
    password: bcrypt.hashSync("laura", bcrypt.genSaltSync(bcryptSalt)),
    image: "../images/laura.png",
    rol: "Customer",
    punctuation: 1800,
    level: 2,
    events: [Offer9Id, Event5Id, Offer5Id, Offer12Id, Offer15Id, Event3Id, Offer4Id, Event7Id]
  },
  {
    username: "Maria",
    email: "msimo@gmail.com",
    password: bcrypt.hashSync("maria", bcrypt.genSaltSync(bcryptSalt)),
    image: "../images/maria.jpeg",
    rol: "Customer",
    punctuation: 1500,
    level: 2,
    events: [Offer2Id, Event4Id, Offer8Id, Offer11Id, Offer3Id, Offer7Id, Event8Id, Offer12Id]
  },
  {
    username: "Pedro Sanchez",
    email: "psanchez@gmail.com",
    password: bcrypt.hashSync("psanchez", bcrypt.genSaltSync(bcryptSalt)),
    image: "../images/psanchez.jpeg",
    rol: "Customer",
    punctuation: 800,
    level: 1,
    events: [Offer4Id, Offer14Id, Offer5Id, Event5Id, Offer2Id, Event2Id, Offer9Id, Offer7Id]
  }
];

let events = [
  {
    _id: Event1Id,
    name: "Parque del Retiro",
    type: "Missions",
    description: "Paseo por el Retiro hasta encontrar el Cógido QR por los alrededores del Palacio de Cristal, acompañado de al menos 4 personas que tengan Run`NCatch y escanear el código todos en un intervalo de 2 minutos",
    tag: "relax",
    start: new Date(2020, 02, 19, 16, 45, 0),
    duration: 120,
    location: {
      type: "Point",
      coordinates: [40.4080326, -3.693607]
    },
    punctuationReward: 300,
    image: "../images/missions6.png",
    qrCode: ""
  },
  {
    _id: Event2Id,
    name: "Visita Museo del Prado",
    type: "Missions",
    description: "Visitar Museo Prado y encontrar el código en la Sala 3",
    tag: "culture",
    start: new Date(2020, 02, 23, 08, 0, 0),
    duration: 180,
    location: {
      type: "Point",
      coordinates: [40.4137859, -3.6943158]
    },
    punctuationReward: 450,
    image: "../images/missions4.svg",
    qrCode: ""
  },
  {
    _id: Event3Id,
    name: "Visita Caixa Forum",
    type: "Missions",
    description: "Encontrar el QR en los bajos del Caixa Forum",
    tag: "culture",
    start: new Date(2020, 02, 21, 10, 0, 0),
    duration: 120,
    location: {
      type: "Point",
      coordinates: [40.411114, -3.6957623]
    },
    punctuationReward: 150,
    image: "../images/missions5.svg",
    qrCode: ""
  },
  {
    _id: Event4Id,
    name: "Plaza 2 Mayo",
    type: "Missions",
    description: "En Plaza 2 Mayo ir con un compañero y encontrar al vendedor de latas de cerveza que lleva el código Qr",
    tag: "relax",
    start: new Date(2020, 02, 21, 16, 0, 0),
    duration: 60,
    location: {
      type: "Point",
      coordinates: [40.4267107, -3.7062943]
    },
    punctuationReward: 200,
    image: "../images/missions6.png",
    qrCode: ""
  },
  {
    _id: Event5Id,
    name: "Museo Reina Sofia",
    type: "Missions",
    description: "Encontrar el Código QR en la biblioteca del Museo Reina Sofia y posteriormente seguir las instrucciones del siguiente paso a realizar para completar la misión",
    tag: "culture",
    start: new Date(2020, 02, 22, 11, 0, 0),
    duration: 180,
    location: {
      type: "Point",
      coordinates: [40.4074259, -3.6958381]
    },
    punctuationReward: 300,
    image: "../images/missions2.jpg",
    qrCode: ""
  },
  {
    _id: Event6Id,
    name: "Rastro de Madrid",
    type: "Missions",
    description: "Encontrar el puesto de venta de Vinilos en el Rastro y buscar el vinilo que contiene el codígo QR",
    tag: "culture",
    start: new Date(2020, 02, 23, 09, 0, 0),
    duration: 150,
    location: {
      type: "Point",
      coordinates: [40.4082021, -3.7072981]
    },
    punctuationReward: 350,
    image: "../images/missions7.png",
    qrCode: ""
  },
  {
    _id: Event7Id,
    name: "Búsqueda de amigos Run`NCatch",
    type: "Missions",
    description: "Conseguir al menos 4 nuevos usuarios de Run`NCatch que escaneen el código QR de la misión",
    tag: "culture",
    start: new Date(2020, 02, 21, 12, 0, 0),
    duration: 240,
    location: {
      type: "Point",
      coordinates: [40.5082021, -3.7972981]
    },
    punctuationReward: 400,
    image: "../images/missions5.svg",
    qrCode: ""
  },
  {
    _id: Event8Id,
    name: "Reunión Catchers",
    type: "Missions",
    description: "Conseguir reunirse 6 usuarios de Run`NCatch y subir al Parque de las Siete Tetas y escanear el código situado cerce de La Terraza El Mirador a las 19h todos los usuarios en un plazo de 5 min",
    tag: "culture",
    start: new Date(2020, 02, 21, 13, 0, 0),
    duration: 180,
    location: {
      type: "Point",
      coordinates: [40.3967111, -3.6541353]
    },
    punctuationReward: 600,
    image: "../images/missions4.svg",
    qrCode: ""
  },
  {
    _id: Offer1Id,
    name: "Restaurante DiverXO",
    type: "Offers",
    description: "Descuento 50% en Menú Degustacion para 2 personas",
    tag: "restoration",
    discount: 50,
    start: new Date(2020, 02, 21, 15, 0, 0),
    duration: 60,
    location: {
      type: "Point",
      coordinates: [40.4581532, -3.6881661]
    },
    levelRequiered: 7,
    punctuationReward: 350,
    image: "../images/diverxo.jpg",
    qrCode: ""
  },
  {
    _id: Offer2Id,
    name: "Cinesa",
    type: "Offers",
    description: "42% de descuento en entrada de cine para una persona en los Cines Cinesa",
    tag: "shopping",
    discount: 42,
    start: new Date(2020, 02, 21, 15, 0, 0),
    duration: 240,
    location: {
      type: "Point",
      coordinates: [40.4238036, -3.6836985]
    },
    levelRequiered: 1,
    punctuationReward: 50,
    image: "../images/cinesa.jpg",
    qrCode: ""
  },
  {
    _id: Offer3Id,
    name: "Tierra Burrito",
    type: "Offers",
    description: "Descuento 40% en Menu Burrito con bebida incluida",
    tag: "restoration",
    discount: 40,
    start: new Date(2020, 02, 20, 21, 0, 0),
    duration: 120,
    location: {
      type: "Point",
      coordinates: [40.4360673, -3.7151283]
    },
    levelRequiered: 1,
    punctuationReward: 50,
    image: "../images/tierra_burrito.jpeg",
    qrCode: ""
  },
  {
    _id: Offer4Id,
    name: "Carhatt Fuencarral",
    type: "Offers",
    description: "Descuento 50% en todas las camisetas y camisas",
    tag: "shopping",
    discount: 50,
    start: new Date(2020, 02, 17, 18, 0, 0),
    duration: 60,
    location: {
      type: "Point",
      coordinates: [40.423084, -3.7025196]
    },
    levelRequiered: 3,
    punctuationReward: 150,
    image: "../images/carhartt.jpeg",
    qrCode: ""
  },
  {
    _id: Offer5Id,
    name: "Aguai+",
    type: "Offers",
    description: "Descuento 30% Circuito hidrotermal para dos con opción a envoltura, masaje o reflexoterapia en Aguai+",
    tag: "beauty",
    discount: 30,
    start: new Date(2020, 02, 21, 10, 0, 0),
    duration: 180,
    location: {
      type: "Point",
      coordinates: [40.416796, -3.7038842]
    },
    levelRequiered: 2,
    punctuationReward: 100,
    image: "../images/aguai+.jpg",
    qrCode: ""
  },
  {
    _id: Offer6Id,
    name: "Tour Wanda Metropolitano",
    type: "Offers",
    description: "Consigue un 30% de descuento en entradas para el Tour Wanda Metropolitano",
    tag: "shopping",
    discount: 30,
    start: new Date(2020, 02, 22, 11, 0, 0),
    duration: 120,
    location: {
      type: "Point",
      coordinates: [40.4361939, -3.5994674]
    },
    levelRequiered: 3,
    punctuationReward: 150,
    image: "../images/tour-wanda.jpg",
    qrCode: ""
  },
  {
    _id: Offer7Id,
    name: "Teatro Flamenco",
    type: "Offers",
    description: "1, 2 o 4 entradas para el espectáculo `Emociones` en Teatro Flamenco Madrid (48% de descuento)",
    tag: "culture",
    discount: 48,
    start: new Date(2020, 02, 23, 20, 0, 0),
    duration: 120,
    location: {
      type: "Point",
      coordinates: [40.4232417, -3.7045222]
    },
    levelRequiered: 1,
    punctuationReward: 50,
    image: "../images/teatro-flamenco.jpg",
    qrCode: ""
  },
  {
    _id: Offer8Id,
    name: "Social Dental Studio",
    type: "Offers",
    description: "Descuento del 80% en limpieza dental completa con opción a curetaje de una o dos arcadas en Social Dental Studio",
    tag: "beauty",
    discount: 80,
    start: new Date(2020, 02, 21, 09, 0, 0),
    duration: 600,
    location: {
      type: "Point",
      coordinates: [40.4337335, -3.69915]
    },
    levelRequiered: 2,
    punctuationReward: 100,
    image: "../images/social-dental.jpg",
    qrCode: ""
  },
  {
    _id: Offer9Id,
    name: "Museo de Cera",
    type: "Offers",
    description: "Una o dos entradas al Museo de Cera de Madrid con 50% de descuento",
    tag: "culture",
    discount: 50,
    start: new Date(2020, 02, 21, 12, 0, 0),
    duration: 240,
    location: {
      type: "Point",
      coordinates: [40.4250731, -3.6935499]
    },
    levelRequiered: 1,
    punctuationReward: 50,
    image: "../images/museo-cera.jpg",
    qrCode: ""
  },
  {
    _id: Offer10Id,
    name: "La Belleza Del Masaje",
    type: "Offers",
    description: "Un masaje a elegir de 50 u 80 minutos de duración en La Belleza Del Masaje con 50% de descuento",
    tag: "beauty",
    discount: 50,
    start: new Date(2020, 02, 21, 13, 0, 0),
    duration: 180,
    location: {
      type: "Point",
      coordinates: [40.4299443, -3.7100101]
    },
    levelRequiered: 3,
    punctuationReward: 150,
    image: "../images/belleza-masaje.jpg",
    qrCode: ""
  },
  {
    _id: Offer11Id,
    name: "Citywave Madrid",
    type: "Offers",
    description: "Surf para 1, 2 o 4 personas en Citywave Madrid (26% de descuento)",
    tag: "relax",
    discount: 26,
    start: new Date(2020, 02, 21, 16, 0, 0),
    duration: 90,
    location: {
      type: "Point",
      coordinates: [40.338895, -3.8482226]
    },
    levelRequiered: 1,
    punctuationReward: 50,
    image: "../images/citywave.jpg",
    qrCode: ""
  },
  {
    _id: Offer12Id,
    name: "Igo Waffle",
    type: "Offers",
    description: "Dos bubble waffles con helado y dos batidos para dos personas en Igo Waffle con 48% de descuento",
    tag: "restoration",
    discount: 48,
    start: new Date(2020, 02, 21, 17, 0, 0),
    duration: 60,
    location: {
      type: "Point",
      coordinates: [40.432920, -3.7081999]
    },
    levelRequiered: 1,
    punctuationReward: 50,
    image: "../images/igo-waffle.jpg",
    qrCode: ""
  },
  {
    _id: Offer13Id,
    name: "DEEP-8 Diving and Fun",
    type: "Offers",
    description: "Bautismo de buceo para 1, 2 o 4 personas con descuento del 60% € en Deep-8",
    tag: "relax",
    discount: 60,
    start: new Date(2020, 02, 21, 11, 0, 0),
    duration: 180,
    location: {
      type: "Point",
      coordinates: [40.304359, -3.8253771]
    },
    levelRequiered: 4,
    punctuationReward: 200,
    image: "../images/diving.jpg",
    qrCode: ""
  },
  {
    _id: Offer14Id,
    name: "Hayama Sushi & Ramen",
    type: "Offers",
    description: "Menú japonés para 2 o 4 con entrante, piezas de sushi y bebida con 70% de descuento en Hayama Sushi & Ramen",
    tag: "restoration",
    discount: 70,
    start: new Date(2020, 02, 21, 18, 0, 0),
    duration: 120,
    location: {
      type: "Point",
      coordinates: [40.4351619, -3.7076162]
    },
    levelRequiered: 3,
    punctuationReward: 150,
    image: "../images/sushi.jpg",
    qrCode: ""
  },
  {
    _id: Offer15Id,
    name: "La Chocita del Loro",
    type: "Offers",
    description: "Descuento del 30% en entradas para Monólogos del Humor en La Chocita del Loro",
    tag: "restoration",
    discount: 30,
    start: new Date(2020, 02, 21, 19, 0, 0),
    duration: 120,
    location: {
      type: "Point",
      coordinates: [40.3855131, 3.7464273]
    },
    levelRequiered: 2,
    punctuationReward: 100,
    image: "../images/chocita.jpg",
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
