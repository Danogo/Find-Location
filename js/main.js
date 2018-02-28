window.onload = loadScript;                                 //pobierz api google maps po wczytaniu zawartosci strony

var mapBtn = document.getElementById('btn');
mapBtn.addEventListener('click', function() {
  if (Modernizr.geolocation) {                               //jeżeli istenieje obsługa obiektu geolokalizacji
    navigator.geolocation.getCurrentPosition(success, fail); //to zapytaj o dane lokalizacyjne
  } else {                                                  //brak obsługi geolokalizacji
    document.querySelector('.info').textContent = 'Niestety, przeglądarka nie obsługuje funkcji geolokalizacji'; //wyświetl informacje o braku obsługi
  }
}, false);

function success(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  initMap(lat, long);
}

function fail(err) {
document.querySelector('.info').textContent = 'Niestety, nie udało się pobrać danych o położeniu..';
console.log('Error('+ err.code + '): ' + err.message);
}


function initMap(lat, long) {
  var mapOptions;
  if(lat && long) {
      mapOptions = {
      center: {lat: lat, lng: long},
      zoom: 18
    };
  } else {
    mapOptions = {
      center: {lat:48.858093,lng:2.294694},
      zoom: 8
    };
  }

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

}

function loadScript() {                                         //dodanie api map google do strony
  var script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA_cShYR1RcO64hvOY8PBUHrFSbY-ssWT4&callback=initMap';
  script.setAttribute('defer', '');
  script.setAttribute('async', '');
  document.body.appendChild(script);
}
