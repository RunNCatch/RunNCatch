document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

//Prueba Maps Geolocalizacion

function startMap() {
  const ironhackBCN = {
    lat: 41.3977381,
    lng: -3.790471916
  };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: ironhackBCN
  });
  const IronhackBCNMarker = new google.maps.Marker({
    position: {
      lat: ironhackBCN.lat,
      lng: ironhackBCN.lng
    },
    map: map,
    title: "I'm here"
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const user_location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // Center map with user location
        map.setCenter(user_location);

        // Add a marker for your user location
        const ironhackBCNMarker = new google.maps.Marker({
          position: {
            lat: user_location.lat,
            lng: user_location.lng
          },
          map: map,
          title: "You are here."
        });
      },
      function() {
        console.log("Error in the geolocation service.");
      }
    );
  } else {
    console.log("Browser does not support geolocation.");
  }
}

startMap();

// Inicio sesion Google

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: "your Google client id here",
      clientSecret: "your Google client secret here",
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // to see the structure of the data in received response:
      console.log("Google account details:", profile);

      User.findOne({ googleID: profile.id })
        .then(user => {
          if (user) {
            done(null, user);
            return;
          }

          User.create({ googleID: profile.id })
            .then(newUser => {
              done(null, newUser);
            })
            .catch(err => done(err)); // closes User.create()
        })
        .catch(err => done(err)); // closes User.findOne()
    }
  )
);
