window.onload = getMyLocation;

function getMyLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayLocation, displayError);
	} else {
		alert('Oops, no geolocation support');
	}
}

function displayLocation(position) {
	console.log('This is displayLocation function');
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	var div = document.getElementById('location');

	div.setAttribute('class', 'navigation_true');
	div.innerHTML = 'You are at Latitude: ' + latitude + ', Longitude: ' + longitude;

	var hfCoords = {
		latitude: 47.624851,
		longitude: -122.52099
	};

	var km = computeDistance(position.coords, hfCoords);
	var distance = document.getElementById('distance');
	distance.innerHTML = 'You are ' + km + ' km from the WickedlySmart HQ';
}

function displayError(error) {
	console.log('This is displayError function');
	var errorTypes = {
		0: 'Unknown error',
		1: 'Permission denied by user',
		2: 'Position is not available',
		3: 'Request timed out'
	};

	console.log(error.code);

	var errorMessage = errorTypes[error.code];
	if (error.code == 0 || error.code == 2) {
		errorMessage = errorMessage + '' + error.message;
	}
	var div = document.getElementById('location');

	div.setAttribute('class', 'navigation_false');
	div.innerHTML = errorMessage;
	
}

function degreesToRadians(degrees) {
	var radians = (degrees * Math.PI)/180;
	return radians;
}

function computeDistance(startCoords, destCoords) {

	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);

	var Radius = 6371; // radius of the Earth in km

	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
					Math.cos(startLatRads) * Math.cos(destLatRads) *
					Math.cos(startLongRads - destLongRads)) * Radius;

	return distance;
}