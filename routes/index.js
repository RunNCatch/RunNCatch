const express = require("express");
const router = express.Router();
const Events = require("../models/Events");

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
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
router.get("/", (req, res, next) => {
  res.render("index");
});

//ruta qr

router.get('/qr', (req, res, next) => {
  res.render('qr')
});
//si no estas logged te reenvia a login
//scaner de qr con permiso de la camara. tambien tiene un boton de back.
router.get("/scan", checkAuthenticated(), (req, res, next) => {
  res.render("scan");
});

//esta url es a la que redirige el scan del QR, el ID es el de la base de datos de cada uno en MONGO. coge la informacion del usuario de la session y le hace un find and update con la info del evento. la vista scanResult te da la enhorabuena y te ofrece volver a los resultaods de ofertas y tal
router.post("/scan/:id", (req, res, next) => {
  let userId = req.user.id
  let eventId = req.params.id
  // user.findByIDandUpdate.then
  res.render("scanResult");
});

//busca todos los eventos y los muestra en dos vistas, modo mapa (aparece tu geolocalizacion en el centro del mapa y los resultados con markers) y modo lista (ordenados del mas cercano al mas lejano) es la misma pagina con dos divs que se activan o no segun los botones de MAP y LIST
// en el modo mapa tiene un boton de update para actualizar la posicion
// si pinchas en un resultado te lleva al modo vista de detale de ese evento
// el modo lista tiene un buscador para filtrar , si el buscador se queda en blanco muestra todos
// si pinchas en un resultado te lleva al modo detalle
// tiene un condicional, si eres admin te salen los botones de eliminar y editar eventos
router.get("/results", (req, res, next) => {
  // events.find()
  res.render("results");
});

//renderiza solo el resultado de un evento cuando haces click
router.get("/results/:id", (req, res, next) => {
  // events.findById()
  res.render("results-detail");
});

//recibe lo que has puesto en el campo search de /results y cambia los resultados, para cambiar y que salgan todos dejar en blanco la busqueda

router.post("/results", (req, res, next) => {
  // events.find()
  res.render("results");
});

//sirve para actualizar con la geolocalizacoin
router.post("/resultsnewposition", (req, res, next) => {
  // events.find()
  res.redirect("results");
});

//te muestra tu usuario con tus datos, cogidos del id de la sesion
//tambien aparece el historial de eventos que has hecho
router.get("/profile/:id", (req, res, next) => {
  // user.findById()
  res.render("profile");
});

//aparece el formulario de edicion interna del usuario
router.get("/profile/edit/:id", (req, res, next) => {
  // user.findById()
  res.render("profile-edit");
});

//hace los cambios mediante el formulario de /profile/edit y te redirige a /profile
router.post("/profile/:id", (req, res, next) => {
  // user.findById()
  res.render("profile");
});

//muestra el formulario de admin para crear nuevo evento
router.get("/admin", (req, res, next) => {
  res.render("admin");
});

//recibe la info del formulario y crea nuevo evento
router.post("/admin", (req, res, next) => {
  res.render("admin");
});

//elimina eventos
router.post("/results-delete/:id", (req, res, next) => {
  res.render("results");
});

//abre ventana de edicion de eventos
router.get("/results-edit/:id", (req, res, next) => {
  res.render("admin-edit");
});

//recibe los cambios del evento
router.post("/results-edit/:id", (req, res, next) => {
  res.render("admin");
});
router.post("/results-edit/:id", (req, res, next) => {
  res.render("admin");
});

router.get("/eventsForAxios", (req, res, next) => {
  Events.find()
    .then(eventsFound => res.json(eventsFound))
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});

module.exports = router;
