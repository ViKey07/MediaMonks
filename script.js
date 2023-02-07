window.onload = function() {
    var nextArrow = document.getElementById('next'),
    backArrow = document.getElementById('back'),
    backImg = document.getElementById('back-img'),
    rotation = document.getElementById('rotation'),
    newPosition = 0,
	currentId = 0,
	prevId;

    var coordinatesArray = [ 0, 125, 225, 350, 495, 625, 780, 900, 950, 1060 ];
	var lengthUnit = "vh";

    function getCoordinates(coordinatesArray, pageId) {
		return "-" + coordinatesArray[pageId];
	};

    nextArrow.addEventListener( "click", function(){
		currentId ++;
		var nextPageCoordinates = getCoordinates(coordinatesArray, currentId);
		renderPage(nextPageCoordinates);
	});

    backArrow.addEventListener( "click", function(){
		currentId --;
		var nextPageCoordinates = getCoordinates(coordinatesArray, currentId);
		renderPage(nextPageCoordinates);
	});

    rotation.addEventListener("click", function(event){
		var coordinates = getCoordinates(coordinatesArray, event.target.id);
		currentId = event.target.id;
		renderPage(coordinates);
	});

    function checkArrowVisibility() {
		if (currentId == 9) {
			nextArrow.style.visibility = "hidden";
		} else if (currentId == 0) {
			backArrow.style.visibility = "hidden";
		} else {
			nextArrow.style.visibility = "visible";
			backArrow.style.visibility = "visible";
		}
	}

    function renderPage(coordinates) {
		// set new bg position
		newPosition = coordinates;
		backImg.style["transform"] = "translate(" + newPosition + lengthUnit + ", 0)";

		// hide previous content
		if (prevId != null) {
			var prevArticleId = "article--" + prevId,
					prevArticle = document.getElementById(prevArticleId),
					prevNavButton = document.getElementById(prevId);

			if (prevId != 9) {
				prevArticle.style.opacity = 0;
			}
			prevNavButton.className = "";
		}

		// display current page on navigation
		var newNavButton = document.getElementById(currentId);
		newNavButton.className = "listitem--clicked"; 

		// display current page contents
		setTimeout(function(){
			var articleId = "article--" + currentId, 
					currentArticle = document.getElementById(articleId);

			currentArticle.style.opacity = 1;
		}, 1500);

		checkArrowVisibility();
		// set previous page id to the current one 
		prevId = currentId;
	}

	checkArrowVisibility();
	renderPage(0);
}