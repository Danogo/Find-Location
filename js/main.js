window.onload = loadScript; //pobierz api google maps po wczytaniu zawartosci strony

var errInfo = document.querySelector('.info');
var mapBtn = document.querySelector('.pick-map ');
var target;
mapBtn.addEventListener('click', function(event) { //gdy wystąpiło zdarzenie click na przycisku
  target = event.target;                            //to pobierz element docelowy dla zdarzenia
  if (target.nodeName && target.nodeName.toLowerCase() !== 'button') { //jeżeli nie kliknięto przycisku
    return;                                               //to wyjdź z funkcji i zwróć undefined
  }
  if (Modernizr.geolocation) { //jeżeli istnieje obsługa obiektu geolokalizacji
    navigator.geolocation.getCurrentPosition(success, fail); //to zapytaj o dane lokalizacyjne
  } else { //jeżeli nie to
    errInfo.textContent = 'Niestety, przeglądarka nie obsługuje funkcji geolokalizacji'; //wyświetl informacje o braku obsługi
  }
}, false);

function success(position) { //wykryto obsługę geolokalizacji
  var mapCanv = document.querySelector('.map-canvas');
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  var zoom;
  switch (target.className) {
    case 'btn btn-street':
      zoom = 18;
      break;
    case 'btn btn-city':
      zoom = 10;
      break;
    case 'btn btn-country':
      zoom = 5;
      break;
    default:
      return;
      break;
  }

  errInfo.textContent = '';
  initMap(lat, long, zoom);
}

function fail(err) { // Nie wykryto obsługi geolokalizacji
  errInfo.className = errInfo.className.replace(' hidden', '');;
  errInfo.textContent = 'Niestety, nie udało się pobrać danych o położeniu..';
  console.log('Error(' + err.code + '): ' + err.message);
}

/*---- Stworzenie obiektu mapy o określonych parametrach------*/
function initMap(lat, long, zoom) {
  var mapOptions = {
      center: {
        lat: lat,
        lng: long
      },
      zoom: zoom
    };

  var map = new google.maps.Map(document.querySelector('.map'), mapOptions); //stworzenie obiektu mapy
}


function loadScript() { //dodanie api map google do strony
  var script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA_cShYR1RcO64hvOY8PBUHrFSbY-ssWT4';
  script.setAttribute('defer', '');
  script.setAttribute('async', '');
  document.body.appendChild(script);
}
