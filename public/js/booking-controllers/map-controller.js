// Get the button and input field
var openMapButton = document.getElementById('open-map-button');
var openMapButtonDrop = document.getElementById('open-map-button-drop');
var addressInput = document.getElementById('address-input');
var addressInputPick = document.getElementById('address-pick');
var addressInputDrop = document.getElementById('address-drop');
var bookingToggler = document.getElementById('map-toggler');
var mapToggler = document.getElementById('map-container');
var selectAdressBtn = document.getElementById('select-adress');

  
  
openMapButton.addEventListener('click', function (e) {
    e.preventDefault()
    bookingToggler.style.display = 'none'
    // Open the map
    openMap();

});

openMapButtonDrop.addEventListener('click', function (e) {
    e.preventDefault()
    bookingToggler.style.display = 'none'
    // Open the map
    openMapDrop();

});
// Create a variable to hold the map object

var clientLat;
var clientLng;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        clientLat = position.coords.latitude;
        clientLng = position.coords.longitude;;
    })
}


function openMap() {
    var map;
    map = '';
    addressInput.value = '';
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: clientLat || 42.6975, lng: clientLng || 23.3241 },
        zoom: 16,
        gestureHandling: 'greedy',
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU, // set map type control style to dropdown menu
            mapTypeIds: ['roadmap', 'satellite'], // specify which map types to show
        },
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false
    });

    var marker;
    marker = new google.maps.Marker({
        position: { lat: clientLat || 42.6975, lng: clientLng || 23.3241 },
        map: map,
        title: 'Marker Title',
    });

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat: clientLat || 42.6975, lng: clientLng || 23.3241 } }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                addressInput.value = results[0].formatted_address;
                addressInputPick.value = results[0].formatted_address;
            } else {
                addressInput.value = 'No adress found';
            }
        } else {
            alert('Geocoder failed due to: ' + status);
        }
    });

    var options = {
        types: ['address'],
        componentRestrictions: { country: 'bg' }
    };
    var autocomplete = new google.maps.places.Autocomplete(addressInput, options);

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (place.geometry) {
            map.setCenter(place.geometry.location);
            if (marker) {
                marker.setMap(null);
                marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });
            } else {
                marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                })
            }
            addressInput.value = place.formatted_address;
            addressInputPick.value = place.formatted_address;
        } else {
            alert("The selected place doesn't have a geometry.");
        }
    });

    map.addListener('click', function (event) {
        var clickedLat = event.latLng.lat(); // get the latitude of the clicked location
        var clickedLng = event.latLng.lng(); // get the longitude of the clicked location

        if (marker) {
            marker.setMap(null);
            marker = new google.maps.Marker({
                position: { lat: clickedLat, lng: clickedLng },
                map: map
            });
        } else {
            marker = new google.maps.Marker({
                position: { lat: clickedLat, lng: clickedLng },
                map: map
            });
        }

        map.panTo(event.latLng);

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'location': event.latLng }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    addressInput.value = results[0].formatted_address;
                    addressInputPick.value = results[0].formatted_address;

                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
    });
    // Show the map and search bar
    mapToggler.style.display = 'block';

}
////////////////////////////////////////////////////////////////////////////////////////////////////

function openMapDrop() {
    var map;
    map = '';
    addressInput.value = '';
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: clientLat || 42.6975, lng: clientLng || 23.3241 },
        zoom: 16,
        gestureHandling: 'greedy',
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU, // set map type control style to dropdown menu
            mapTypeIds: ['roadmap', 'satellite'], // specify which map types to show
        },
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false
    });
    var marker;
    marker = new google.maps.Marker({
        position: { lat: clientLat || 42.6975, lng: clientLng || 23.3241 },
        map: map,
        title: 'Marker Title'
    });

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat: clientLat || 42.6975, lng: clientLng || 23.3241 } }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                addressInput.value = results[0].formatted_address;
                addressInputDrop.value = results[0].formatted_address;
            } else {
                addressInput.value = 'No adress found';
            }
        } else {
            alert('Geocoder failed due to: ' + status);
        }
    });

    var options = {
        types: ['address'],
        componentRestrictions: { country: 'bg' }
    };
    var autocomplete = new google.maps.places.Autocomplete(addressInput, options);

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (place.geometry) {
            map.setCenter(place.geometry.location);
            if (marker) {
                marker.setMap(null);
                marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });
            } else {
                marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                })
            }
            addressInput.value = place.formatted_address;
            addressInputDrop.value = place.formatted_address;
        } else {
            alert("The selected place doesn't have a geometry.");
        }
    });

    map.addListener('click', function (event) {
        var clickedLat = event.latLng.lat();
        var clickedLng = event.latLng.lng();

        if (marker) {
            marker.setMap(null);
            marker = new google.maps.Marker({
                position: { lat: clickedLat, lng: clickedLng },
                map: map
            });
        } else {
            marker = new google.maps.Marker({
                position: { lat: clickedLat, lng: clickedLng },
                map: map
            });
        }

        map.panTo(event.latLng);

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'location': event.latLng }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    addressInput.value = results[0].formatted_address;
                    addressInputDrop.value = results[0].formatted_address;
                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
    });
    // Show the map and search bar
    mapToggler.style.display = 'block';
}


selectAdressBtn.addEventListener('click', (e) => {
    e.preventDefault()
    mapToggler.style.display = 'none'
    bookingToggler.style.display = 'block'
})


