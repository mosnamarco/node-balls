const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');

// Set canvas size
CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;

let mouseX = 0;
let mouseY = 0;

let dots = []

CANVAS.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
})

function createDots(count) {
  for (let i = 0; i < count; i++) {
    dots.push({
      x: Math.random() * CANVAS.width,
      y: Math.random() * CANVAS.height,
      radius: Math.random() * 9,
      color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
      speedX: (Math.random() - 0.7) * 2, 
      speedY: (Math.random() - 0.7) * 2,
    });
  }
}

function draw() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  dots.forEach(dot => {
    CTX.beginPath();
    CTX.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    CTX.fillStyle = dot.color;
    CTX.fill();

    // connect to each dots
    dots.forEach(dot2 => {
      let distance = Math.sqrt(((dot2.x - dot.x) * (dot2.x - dot.x)) + ((dot2.y - dot.y) * (dot2.y - dot.y)))  
      if (distance < 100) {
        CTX.beginPath()
        CTX.moveTo(dot.x, dot.y)
        CTX.lineTo(dot2.x, dot2.y)
        CTX.lineWidth = 1;
        CTX.strokeStyle = dot.color
        CTX.stroke()
      }
    })

    // connect to cursor
    dots.forEach(dot2 => {
      let distance = Math.sqrt(((dot2.x - mouseX) * (dot2.x - mouseX)) + ((dot2.y - mouseY) * (dot2.y - mouseY)))  
      if (distance < 100) {
        CTX.beginPath()
        CTX.moveTo(dot2.x, dot2.y)
        CTX.lineTo(mouseX, mouseY)
        CTX.strokeStyle = dot2.color;
        CTX.stroke()
      }
    })
    
  })
}

function update() {
  dots.forEach(dot => {
    dot.x += dot.speedX;
    dot.y += dot.speedY;

    if ((dot.x + dot.radius) > CANVAS.width || (dot.x - dot.radius) < 0)
      dot.speedX *= -1;
    if ((dot.y + dot.radius) > CANVAS.height || (dot.y - dot.radius) < 0)
      dot.speedY *= -1;
  })
}

function animate() {
  requestAnimationFrame(animate);
  draw();
  update();
}

createDots(150);
animate();