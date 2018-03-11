window.onload = loadScript; //pobierz api google maps po wczytaniu zawartosci strony

var errInfo = document.querySelector('.err-info');
var mapBtn = document.querySelector('.pick-map ');
var target;
var map;

mapBtn.addEventListener('click', function(event) { //gdy wystąpiło zdarzenie click na przycisku
  target = event.target;                            //to pobierz element docelowy dla zdarzenia
  if (target.nodeName && target.nodeName.toLowerCase() !== 'button') { //jeżeli nie kliknięto przycisku
    return;                                               //to wyjdź z funkcji i zwróć undefined
  }
  if (Modernizr.geolocation) { //jeżeli istnieje obsługa obiektu geolokalizacji
    navigator.geolocation.getCurrentPosition(success, fail); //to zapytaj o dane lokalizacyjne
  } else { //jeżeli nie to
    errInfo.className = errInfo.className.replace(' hidden', ''); //usunięcie klasy hidden aby wyświetlić informacje
    errInfo.textContent = 'Unfortunately, your browser doesn\'t support geolocation'; //wyświetl informacje o braku obsługi
  }
}, false);

function success(position) { //wykryto obsługę geolokalizacji
  var mapCanv = document.querySelector('.map-canvas');
  var clickBait = document.querySelector('p[class*=click-info]');
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

  if(clickBait.className !== 'click-info hidden') { //Ukryj informacje pomocniczą tylko gdy nie jest jeszcze ukryta
    clickBait.className +=  ' hidden';
  }
  if(errInfo.className !== 'err-info hidden'){ //gdy udało się wyświetlić mapę ukryj poprzednią informację o błędzie
    errInfo.className += ' hidden';
  }

  initMap(lat, long, zoom);
}

function fail(err) { // Użytkownik odmówił dostępu do lokalizacji
  errInfo.className = errInfo.className.replace(' hidden', ''); //usunięcie klasy hidden aby wyświetlić informacje
  errInfo.textContent = 'Unfortunately, we were not able to acces your location';
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

  map = new google.maps.Map(document.querySelector('.map'), mapOptions); //stworzenie obiektu mapy
}


function loadScript() { //dodanie api map google do strony
  var script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA_cShYR1RcO64hvOY8PBUHrFSbY-ssWT4';
  script.setAttribute('defer', '');
  script.setAttribute('async', '');
  document.body.appendChild(script);
}


//FIXME: Zastosować geolokalizację z google api albo wykupić certyfikat ssl na https
//TODO: Dodać opcję zmiany koloru mapy
//TODO: Ustawić znacznik na mapie w miejscu wskazanym przez geolokalizację
