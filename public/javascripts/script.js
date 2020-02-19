document.addEventListener("DOMContentLoaded", () => {
    console.log("IronGenerator JS imported successfully!");
  },false);


//Prueba Maps Geolocalizacion

function startMap() {
  const yourPosition = {
    lat: 40.3925046,
    lng: -3.6982763
  };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: yourPosition,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: false,
    fullscreenControl: false,
    styles: [
      {
        featureType: "all",
        elementType: "geometry",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "all",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [
          {
            gamma: 0.01
          },
          {
            lightness: 20
          }
        ]
      },
      {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [
          {
            saturation: -31
          },
          {
            lightness: -33
          },
          {
            weight: 2
          },
          {
            gamma: 0.8
          }
        ]
      },
      {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "administrative.country",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "administrative.province",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "administrative.locality",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "administrative.neighborhood",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
          {
            lightness: 30
          },
          {
            saturation: 30
          },
          {
            color: "#000000"
          }
        ]
      },
      {
        featureType: "landscape",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            saturation: 20
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          {
            color: "#000000"
          },
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            lightness: 20
          },
          {
            saturation: -20
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            lightness: 10
          },
          {
            saturation: -30
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
          {
            visibility: "on"
          },
          {
            color: "#e7ff00"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
          {
            saturation: 25
          },
          {
            lightness: 25
          },
          {
            color: "#000000"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          {
            lightness: -20
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      }
    ]
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

        let image = {
          url: "../images/marker.png"
        };


        // Add a marker for your user location
        const yourPositionMarker = new google.maps.Marker({
          position: {
            lat: user_location.lat,
            lng: user_location.lng
          },
          map: map,
          title: "You are here.",
          animation: google.maps.Animation.BOUNCE,
          // icon: image
        });
      },
      function() {
        console.log("Error in the geolocation service.");
      }
    );
  } else {
    console.log("Browser does not support geolocation.");
  }

  axios.get("/eventsForAxios").then(events => {
    events.data.forEach(event => {
      // if (event.start == Date.now){
      let marker = new google.maps.Marker({
        position:{
          lat: event.location.coordinates[0],
          lng: event.location.coordinates[1]
        },
        map: map,
        title: event.name,
        animation: google.maps.Animation.DROP,
      });
    // }
    });
});
}

let center = {
  lat: undefined,
  lng: undefined
}; 

const markers = []

startMap();

//QuerySelector para onclick actualizar la localizacion sin necesidad de recargar
document.querySelector("#update-pos").onclick = function (event) {
  startMap();
};

