const createPics = (function () {
	const container = document.getElementById('container');
	const checkPointContainer = document.getElementById('checkpoints');
	const imgsURLS = [
		'https://picsum.photos/id/100/600/400',
		'https://picsum.photos/id/20/600/400',
		'https://picsum.photos/id/15/600/400',
		'https://picsum.photos/id/32/600/400',
		'https://picsum.photos/id/132/600/400',
		'https://picsum.photos/id/112/600/400',
		'https://picsum.photos/id/21/600/400',
		'https://picsum.photos/id/52/600/400',
		'https://picsum.photos/id/99/600/400',
		'https://picsum.photos/id/68/600/400',
		'https://picsum.photos/id/98/600/400',
	];

	const displayImgs = function () {
		imgsURLS.forEach((url) => {
			let pic = document.createElement('img');
			pic.setAttribute('src', url);
			container.appendChild(pic);
		});
	};

	const displayCheckPoints = function () {
		imgsURLS.forEach((url) => {
			let checkPoint = document.createElement('div');
			checkPoint.classList.add('checkPoint');
			checkPoint.textContent = imgsURLS.indexOf(url) + 1;
			checkPointContainer.appendChild(checkPoint);
		});
	};

	return { displayImgs, displayCheckPoints };
})();

createPics.displayImgs();
createPics.displayCheckPoints();

const imageSlider = (function () {
	const next = document.getElementById('next');
	const previous = document.getElementById('previous');
	const imgs = document.querySelectorAll('img');
	const checkPoints = document.querySelectorAll('.checkPoint');
	const autoSwitch = document.getElementById('autoSwitch');
	let num = 0;

	const colorCheckPoint = function () {
		checkPoints.forEach((point) => {
			point.classList.remove('opacityFull');
			if (point.textContent - 1 === num) {
				point.classList.add('opacityFull');
			}
		});
	};

	const checkPointLogic = function () {
		checkPoints.forEach((point) => {
			point.addEventListener('click', () => {
				imgs[num].style.cssText = 'opacity: 0%';
				num = point.innerText - 1;
				imgs[num].style.cssText = 'opacity: 100%';
				colorCheckPoint();
			});
		});
	};

	const nextPic = function () {
		next.addEventListener('click', () => {
			num += 1;
			if (num === imgs.length) {
				num = 0;
			}
			imgs[num].style.cssText = 'opacity: 100%';
			if (num === 0) {
				imgs[imgs.length - 1].style.cssText = 'opacity: 0%';
			} else {
				imgs[num - 1].style.cssText = 'opacity: 0%';
			}
			colorCheckPoint();
		});
	};

	const previousPic = function () {
		previous.addEventListener('click', () => {
			num -= 1;
			console.log(num);
			if (num === -1) {
				console.log(imgs.length);
				imgs[0].style.cssText = 'opacity: 0%';
				num = imgs.length - 1;
				imgs[num].style.cssText = 'opacity: 100%';
			} else {
				imgs[num].style.cssText = 'opacity: 100%';
				imgs[num + 1].style.cssText = 'opacity: 0%';
			}
			colorCheckPoint();
		});
	};

	const autoMove = function () {
		move = setInterval(function () {
			console.log(1);
			imgs[num].style.cssText = 'opacity: 0%';
			num += 1;
			if (num === imgs.length) {
				num = 0;
			}
			imgs[num].style.cssText = 'opacity: 100%';
			colorCheckPoint();
		}, 3000);
	};

	const startAutoMove = function () {
		autoSwitch.addEventListener('change', () => {
			if (autoSwitch.checked) {
				autoMove();
			} else {
				clearInterval(move);
				console.log('test');
			}
		});
	};

	const start = function () {
		imgs[num].style.cssText = 'opacity: 100%';
		nextPic();
		previousPic();
		checkPointLogic();
		colorCheckPoint();
	};
	return { start, startAutoMove };
})();

imageSlider.start();
imageSlider.startAutoMove();
