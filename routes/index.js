const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const Events = require("../models/Events");
const uploadCloud = require("../configs/cloudinary.js");

var NodeGeocoder = require("node-geocoder");
var options = {
  provider: "google",
  httpAdapter: "https", 
  apiKey: "AIzaSyD_62uCU28_3t0RlV0WVDdrGSg0xG0v4j4", 
  formatter: null 
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

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/results-map", (req, res, next) => {
  let info = {};
  if (req.user) {
    info.rol = req.user.rol;
    info.id = req.user.id;
  }
  console.log(info);
  res.render("results-map", info);
});


router.get("/scanqr", checkAuthenticated(), (requ, res, next) => {
  res.render("readqr");
});

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

router.post("/profile/edit/:id", (req, res, next) => {
  let newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    image: req.body.url 
  };
  Users.findByIdAndUpdate(req.params.id, newUser).then(userFound =>
    res.redirect("/all-users")
  );
});

router.get("/admin", checkRoles("Admin"), (req, res, next) => {
  res.render("new-event");
});

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

router.get("/delete-user/:id", checkRoles("Admin"), (req, res, next) => {
  Users.findByIdAndDelete(req.params.id).then(() => {
    res.redirect("/all-users");
  });
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
