var fullpage_api = new fullpage('#fullpage', {
	//options here
	autoScrolling: true,
	loopHorizontal: false,
	controlArrows: false,
	lockAnchors: true,
	normalScrollElements: '.library',
	onLeave: function(origin, destination, direction){
		var leavingSection = this;

		if (direction == 'down') {
			var rightbtn_text = ((destination.item.children[2].children[0].children[1].getAttribute('id')).split(' ')).map((word) => { 
				return word[0].toUpperCase() + word.substring(1); 
			}).join(" ");
			document.getElementsByClassName('right-button')[0].setAttribute('data-goto', rightbtn_text);
		}
	},
	onSlideLeave: function(section, origin, destination, direction){
		var leftbtn = document.getElementsByClassName('left-button')[0];
		var rightbtn = document.getElementsByClassName('right-button')[0];
		var sections = document.getElementsByClassName('slide');

		// make buttons appear
		if (destination.isFirst) {
			leftbtn.className += ' hidden';
		} else if ((leftbtn.classList).contains('hidden')) {
			leftbtn.className = 'left-button';
		}
		if (destination.isLast) {
			rightbtn.className += ' hidden';
		} else if ((rightbtn.classList).contains('hidden')) {
			rightbtn.className = 'right-button';
		}

		// change button text
		// left
		if (destination.index > 0)
			var leftbtn_text = ((sections[destination.index-1].getAttribute('id')).split(' ')).map((word) => { 
				return word[0].toUpperCase() + word.substring(1); 
			}).join(" ");
		else var leftbtn_text = "";
		leftbtn.setAttribute('data-goto', leftbtn_text);
		if (destination.index < 2)
			var rightbtn_text = ((sections[destination.index+1].getAttribute('id')).split(' ')).map((word) => { 
				return word[0].toUpperCase() + word.substring(1); 
			}).join(" ");
		else var rightbtn_text = "";
		rightbtn.setAttribute('data-goto', rightbtn_text);
	}
});

fullpage_api.setAllowScrolling(false);

// Detect button click on page
function movewindow(direction) {
	switch (direction) {
		case 'down':
			fullpage_api.moveSectionDown();
			break;
		case 'up':
			fullpage_api.moveSectionUp();
			break;
		case 'left':
			fullpage_api.moveSlideLeft();
			break;
		case 'right':
			fullpage_api.moveSlideRight();
			break;
		default:
			break;
	}
}

var sideMenu_options = [].slice.call(document.querySelectorAll('.menu-list > #option'), 0);
sideMenu_options.forEach(element => {
	element.addEventListener('click', function(event){
		goto(element.dataset.linktype)
	});
});

function goto(location) {
	switch (location) {
		case 'work':
			fullpage_api.moveTo('content', 0);
			break;
		case 'about':
			fullpage_api.moveTo('content', 1);
			break;
		case 'contact':
			fullpage_api.moveTo('content', 2);
			break;
		default:
			break;
	}
}

function check_navbtns(direction=null) {
	console.log(fullpage_api.getActiveSlide().index)
}