const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const Events = require("../models/Events");
const uploadCloud = require("../configs/cloudinary.js");
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
//Ruta extra para ir a la vista de maps solamente
router.get("/results-map", (req, res, next) => {
  let info = {};
  if (req.user) {
    info.rol = req.user.rol;
    info.id = req.user.id;
  }
  console.log(info);
  res.render("results-map", info);
});
//scaner de qr con permiso de la camara. tambien tiene un boton de back.
// router.get("/scan", checkAuthenticated(), (req, res, next) => {
//   res.render("scan");
// });
router.get("/scanqr", checkAuthenticated(), (requ, res, next) => {
  res.render("readqr");
});
// router.get("/qr", (req, res, next) => {
//   res.render("qr");
// });
// router.get('/qr/:id', (req, res, next) => {
//   id = req.params.id;
//   res.render('qr', id)
// })
//esta url es a la que redirige el scan del QR, el ID es el de la base de datos de cada uno en MONGO. coge la informacion del usuario de la session y le hace un find and update con la info del evento. la vista scanResult te da la enhorabuena y te ofrece volver a los resultaods de ofertas y tal
router.get("/scanresult/:id", checkAuthenticated(), (req, res, next) => {
  let userId = req.user.id;
  let eventId = req.params.id;
  let newEvent = {};
  let addEvent = {};
  let oldpunctuation;
  let oldevents;
  Users.findById(userId)
    .then(userFound => {
      console.log("userFound", userFound);
      oldpunctuation = userFound.punctuation;
      oldevents = userFound.events;
    })
    .then(
      Events.findById(eventId)
        .then(eventFound => {
          console.log("eventfound", eventFound);
          newEvent = eventFound;
          oldevents.push(eventId);
          addEvent = {
            punctuation: oldpunctuation + eventFound.punctuationReward,
            events: oldevents
          };
        })
        .then(() => Users.findByIdAndUpdate(userId, addEvent))
        .then(() => res.render("scanResult", newEvent))
        .catch(err => {
          console.error("Error connecting to mongo");
          next(err);
        })
    );
});
//FALTARIA ORDENAR POR CERCANIA. EL ADMIN DEBERIA PODER VER BOTONES DE EDITAR Y BORRAR
router.get("/results", (req, res, next) => {
  Events.find()
    .then(eventsFound => {
      let info = {
        events: eventsFound
      };
      if (req.user) {
        info.rol = req.user.rol;
        info.id = req.user.id;
      }
      res.render("results", info);
    })
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});
router.get("/results/:id", (req, res, next) => {
  Events.findById(req.params.id)
    .then(eventFound => {
      let info = {
        event: eventFound
      };
      if (req.user) {
        info.rol = req.user.rol;
        info.id = req.user.id;
      }
      res.render("results-detail", info);
    })
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});
//FUNCIONA renderiza solo el resultado de un evento cuando haces click, si eres admin te sale el codigo QR
router.get("/scangenerated/:id", (req, res, next) => {
  Events.findById(req.params.id)
    .then(eventFound => {
      let url = `${process.env.URL}scanresult/${req.params.id}`;
      res.render("scangenerated", {
        event: eventFound,
        id: req.user.id,
        rol: req.user ? req.user.rol : "Customer",
        url
      });
    })
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});
// router.get("/scanresult/:id", (req, res, next) => {
//   Events.findById(req.params.id)
//     .then(eventFound => {
//       res.render("scanResult", {
//         event: eventFound,
//         rol: req.user.rol
//       });
//     })
//     .catch(err => {
//       console.error("Error connecting to mongo");
//       next(err);
//     });
// });
//recibe lo que has puesto en el campo search de /results y cambia los resultados,
// el modo lista tiene un buscador para filtrar , si el buscador se queda en blanco muestra todos
// si pinchas en un resultado te lleva al modo detalle
//FUNCIONA
router.post("/results", (req, res, next) => {
  let filter = req.body.filter;
  Events.find({
    $or: [
      { name: { $regex: filter, $options: "i" } },
      { description: { $regex: filter, $options: "i" } },
      { type: { $regex: filter, $options: "i" } }
    ]
  })
    .then(eventsFound =>
      res.render("results", {
        events: eventsFound,
        rol: req.user ? req.user.role : "Customer"
      })
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
    .populate("events")
    .then(userFound =>
      res.render("profile", {
        user: userFound,
        rol: req.user ? req.user.rol : "Customer",
        id: req.user.id
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
        rol: req.user ? req.user.rol : "Customer",
        id: req.user.id
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
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    image: req.body.url // meter el multer
  };
  Users.findByIdAndUpdate(req.params.id, newUser).then(userFound =>
    res.redirect("/all-users")
  );
});
//muestra el formulario de crear eventos
//FUNCIONA
router.get("/admin", checkRoles("Admin"), (req, res, next) => {
  res.render("new-event");
});
//FUNCIONAmuestra el formulario de editar evento
router.get("/edit-event/:id", checkRoles("Admin"), (req, res, next) => {
  Events.findById(req.params.id)
    .then(eventFound => {
      let info = {
        event: eventFound
      };
      if (req.user) {
        info.rol = req.user.rol;
        info.id = req.user.id
      }
      res.render("edit-event", info);
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
router.post(
  "/new-event",
  checkRoles("Admin"),
  uploadCloud.single("image"),
  (req, res, next) => {
    let lat, lng;
    geocoder
      .geocode(req.body.location, function(err, res) {
        lat = res[0].latitude;
        lng = res[0].longitude;
      })
      .then(() => {
        let location = { type: "Point", coordinates: [lat, lng] };
        let event = {
          name: req.body.name,
          type: req.body.type,
          description: req.body.description,
          start: req.body.start,
          tag: req.body.tag,
          duration: req.body.duration,
          location: location,
          punctuationReward: req.body.punctuationReward,
          levelRequiered: req.body.levelRequiered,
          discount: req.body.discount
        };
        if (req.file) {
          event.image = req.file.url;
        }
        Events.create(event).then(() => {
          res.redirect("/admin");
        });
      });
  }
);
router.post("/edit-event/:id", checkRoles("Admin"), (req, res, next) => {
  let lat, lng;
  geocoder
    .geocode(req.body.location, function(err, res) {
      lat = res[0].latitude;
      lng = res[0].longitude;
    })
    .then(() => {
      let location = { type: "Point", coordinates: [lat, lng] };
      let newEvent = {
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        start: req.body.start,
        tag: req.body.tag,
        duration: req.body.duration,
        location: location,
        punctuationReward: req.body.punctuationReward,
        levelRequiered: req.body.levelRequiered,
        discount: req.body.discount
      };
      if (req.file) {
        newEvent.image = req.file.url;
      }
      Events.findByIdAndUpdate(req.params.id, newEvent).then(() => {
        res.redirect("/results");
      });
    });
});
//FUNCIONA
router.get("/all-users", checkRoles("Admin"), (req, res, next) => {
  Users.find()
    .populate("events")
    .then(usersFound => {
      res.render("all-users", { usersFound });
    })
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});
//FUNCIONA
router.get("/delete-user/:id", checkRoles("Admin"), (req, res, next) => {
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