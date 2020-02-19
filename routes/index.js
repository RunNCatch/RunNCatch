const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const Events = require("../models/Events");
const uploadCloud = require('../configs/cloudinary.js');
var NodeGeocoder = require("node-geocoder");
var options = {
  provider: "google",
  // Optional depending on the providers

  httpAdapter: "https", // Default
  apiKey: "AIzaSyD_62uCU28_3t0RlV0WVDdrGSg0xG0v4j4", // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);
function checkRoles(rol) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.rol === rol) {
      return next();
    } else {
      res.redirect("/auth/login");
    }
  };
}
function checkAuthenticated() {
  return function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/auth/login");
    }
  };
}
//boton superior para abrir el scaner de QR y boton central para geolocalizacion y redireccion a resultados y modo mapa

//FUNCIONAboton superior para abrir el scaner de QR y boton central para geolocalizacion y redireccion a resultados y modo mapa
router.get("/", (req, res, next) => {
  res.render("index");
});
//scaner de qr con permiso de la camara. tambien tiene un boton de back.
router.get("/scan", checkAuthenticated(), (req, res, next) => {
  res.render("scan");
});

router.get("/scanqr", (requ, res, next) => {
  res.render('readqr');
})
router.get('/qr', (req, res, next) => {
  res.render('qr')
})

//esta url es a la que redirige el scan del QR, el ID es el de la base de datos de cada uno en MONGO. coge la informacion del usuario de la session y le hace un find and update con la info del evento. la vista scanResult te da la enhorabuena y te ofrece volver a los resultaods de ofertas y tal
router.post("/scan/:id", checkAuthenticated(), (req, res, next) => {
  let userId = req.user.id;
  let eventId = req.params.id;
  let newEvent = {};
  let addEvent = {};
  Events.findById(eventId)
    .then(eventFound => {
      newEvent = eventFound;
      addEvent = {
        punctuation: punctuation + eventFound.punctuationReward,
        events: events.push(eventFound)
      };
    })
    .then(user.findByIDandUpdate(userId, addEvent))
    .then(res.render("scanResult", { newEvent }))
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});
//muestra los eventos en dos vistas, modo mapa (aparece tu geolocalizacion en el centro del mapa y los resultados con markers) y modo lista (ordenados del mas cercano al mas lejano) es la misma pagina con dos divs que se activan o no segun los botones de MAP y LIST
// en el modo mapa tiene un boton de update para actualizar la posicion
// si pinchas en un resultado te lleva al modo vista de detale de ese evento
// tiene un condicional, si eres admin te salen los botones de eliminar y editar eventos
//FALTARIA ORDENAR POR CERCANIA. EL ADMIN DEBERIA PODER VER BOTONES DE EDITAR Y BORRAR
router.get("/results", (req, res, next) => {
  Events.find()
    .then(eventsFound => {
      res.render("results", {
        events: eventsFound,
        rol: req.user.rol ? req.user.rol : "Customer"
      });
    })
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});

//FUNCIONA renderiza solo el resultado de un evento cuando haces click, si eres admin te sale el codigo QR
router.get("/results/:id", (req, res, next) => {
  Events.findById(req.params.id)
    .then(eventFound => {
      res.render("results-detail", {
        event: eventFound,
        rol: req.user.rol
      });
    })
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});
//recibe lo que has puesto en el campo search de /results y cambia los resultados,
// el modo lista tiene un buscador para filtrar , si el buscador se queda en blanco muestra todos
// si pinchas en un resultado te lleva al modo detalle
router.post("/results", (req, res, next) => {
  let filter = req.body.filter;
  Events.find({
    $or: [{ name: filter }, { description: filter }, { type: filter }]
  })
    .then(eventsFound =>
      res.render("results", { events: eventsFound, rol: req.user.rol })
    )
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});
//sirve para actualizar con la geolocalizacoin
// router.post("/resultsnewposition", (req, res, next) => {
//   // events.find()
//   res.redirect("results");
// });
//te muestra tu usuario con tus datos, cogidos del id de la sesion
//tambien aparece el historial de eventos que has hecho
router.get("/profile/:id", checkAuthenticated(), (req, res, next) => {
  Users.findById(req.params.id)
    .then(userFound =>
      res.render("profile", {
        user: userFound,
        rol: req.user.rol
      })
    )
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});
//aparece el formulario de edicion interna del usuario
router.get("/profile/edit/:id", (req, res, next) => {
  Users.findById(req.params.id)
    .then(userFound =>
      res.render("profile-edit", {
        user: userFound,
        rol: req.user.rol
      })
    )
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});
//hace los cambios mediante el formulario de /profile/edit y te redirige a /profile
router.post("/profile/edit/:id", (req, res, next) => {
  let newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    image: req.body.url // meter el multer
  };
  Users.findByIdAndUpdate(req.params.id, { newUser }).then(userFound =>
    res.render("profile", userFound)
  );
});
//muestra el formulario de crear eventos
router.get("/admin", checkRoles("Admin"), (req, res, next) => {
  res.render("new-event");
});
let lat, lng
//recibe la info del formulario y crea nuevo evento
router.post("/new-event", checkRoles("Admin"), (req, res, next) => {
  console.log(req.body);
  geocoder.geocode(req.body.location, function(err, res) {
    lat = res[0].latitude;
    lng = res[0].longitude;
  });
  let location = { type: "Point", coordinates: [lat, lng] };
  console.log(location);
  Events.create({
    name: req.body.name,
    description: req.body.description,
    duration: req.body.duration,
    start: req.body.start,
    type: req.body.type,
    punctuacionReward: req.body.punctuationReward,
    image: req.body.url, // meter el multer
    location: location
  }).then(() => {
    res.redirect("/admin");
  });
});

//FUNCIONAmuestra el formulario de editar evento
router.get("/edit-event/:id", checkRoles("Admin"), (req, res, next) => {
  Events.findById(req.params.id)
    .then(eventFound => {
      res.render("edit-event", {
        event: eventFound,
        rol: req.user.rol
      });
    })
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});

//FUNCIONAelimina eventos
router.get("/delete-event/:id", checkRoles("Admin"), (req, res, next) => {
  Events.findByIdAndDelete(req.params.id).then(() => {
    res.redirect("/results");
  });
});

//FUNCIONArecibe los cambios del evento
router.post("/edit-event/:id", checkRoles("Admin"), (req, res, next) => {
  let newEvent = {
    name: req.body.name,
    description: req.body.description,
    duration: req.body.duration,
    start: req.body.start,
    type: req.body.type,
    punctuacionReward: req.body.punctuationReward,
    image: req.body.url, // meter el multer
    positionlat: req.body.positionlat,
    positionlng: req.body.positionlng
  };
  Events.findByIdAndUpdate(req.params.id, newEvent).then(() => {
    res.redirect("/results");
  });
});
router.get("/all-users", checkRoles("Admin"), (req, res, next) => {
  Users.find()
    .then(usersFound => {
      res.render("all-users", { usersFound });
    })
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});
router.post("/delete-user/:id", checkRoles("Admin"), (req, res, next) => {
  Users.findByIdAndDelete(req.params.id).then(() => {
    res.redirect("/all-users");
  });
});

//FUNCIONA
router.get("/eventsForAxios", (req, res, next) => {
  Events.find()
    .then(eventsFound => res.json(eventsFound))
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});
module.exports = router;