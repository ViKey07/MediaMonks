window.onload = function() {
    let nextArrow = document.getElementById('next'), 
	backArrow = document.getElementById('back'), 
	backImg = document.getElementById('back-img'),
    rotation = document.getElementById('rotation'),
    newLocations = 0,
	currentId = 0,
	prevId;

    let locations = [0, 125, 225, 350, 495, 625, 780, 900, 950, 1060];
	let lengthUnit = "vh";

    function getCoordinates(locations, pageId) {
		return "-" + locations[pageId];
	};

    nextArrow.addEventListener( "click", function(){
		checkArrowVisibility()
		currentId ++;
		let nextPageCoordinates = getCoordinates(locations, currentId);
		renderPage(nextPageCoordinates);
	});

    backArrow.addEventListener( "click", function(){
		checkArrowVisibility()
		currentId --;
		let nextPageCoordinates = getCoordinates(locations, currentId);
		renderPage(nextPageCoordinates);
	});

    rotation.addEventListener("click", function(event){
		console.log(newLocations);

		let coordinates = getCoordinates(locations, event.target.id);
		currentId = event.target.id;
		renderPage(coordinates);
	});

    function checkArrowVisibility() {
		if (currentId == 9) {
		console.log('if');

			nextArrow.style.visibility = "hidden";
		} else if (newLocations == 0) {
		console.log('elif');

			backArrow.style.visibility = "hidden";
		} else {
		console.log('else');

			nextArrow.style.visibility = "visible";
			backArrow.style.visibility = "visible";
		}
	}

    function renderPage(coordinates) {
		newLocations = coordinates;
		backImg.style["transform"] = "translate(" + newLocations + lengthUnit + ", 0)";

		if (prevId != null) {
			let prevSecId = "sec-" + prevId,
					prevSec = document.getElementById(prevSecId),
					prevNavButton = document.getElementById(prevId);

			if (prevId != 9) {
				prevSec.style.opacity = 0;
			}
			prevNavButton.className = "";
		}

		let newNavButton = document.getElementById(currentId);
		newNavButton.className = "li-click"; 

		setTimeout(function(){
			let secId = "sec-" + currentId, 
					currentSec = document.getElementById(secId);

			currentSec.style.opacity = 1;
		}, 1500);

		checkArrowVisibility();
		prevId = currentId;
	}

	checkArrowVisibility();
	renderPage(0);
}