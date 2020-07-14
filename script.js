// select the elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shake = document.querySelector('.shake');
const MOVE_AMOUNT = 20;

// setup our canvas for drawing
const { width, height } = canvas; // object destructuring (ES6)

// random x and y between 0 and width / height
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

ctx.beginPath(); // start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// write a draw function
// ES6 parameter destructuring
const draw = ({ key }) => {
  hue = hue + 10;
  ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;

	console.log(key);
	ctx.beginPath();
  ctx.moveTo(x, y);
  

	switch (key) {
		case 'ArrowUp':
			y = y - MOVE_AMOUNT;
			break;
		case 'ArrowDown':
			y = y + MOVE_AMOUNT;
			break;
		case 'ArrowLeft':
			x = x - MOVE_AMOUNT;
			break;
		case 'ArrowRight':
			x = x + MOVE_AMOUNT;
			break;
		default:
			break;
	}
	ctx.lineTo(x, y);
	ctx.stroke();
};

// write a handler for the keys (switch statement)
const handleKey = e => {
	if (e.key.includes('Arrow')) {
		e.preventDefault();
		draw({ key: e.key });
	}
};
// clear / shake function
const clearCanvas = () => {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener('animationend', () => {
    console.log("Done the shake");
    canvas.classList.remove('shake');
  },
  {once: true}
  );
};


// listen for arrow keys
window.addEventListener('keydown', handleKey);
shake.addEventListener('click', clearCanvas);