const messages = [
  {
    
  }
];

window.addEventListener("load", () => {
  const a = document.getElementById("slide"),
    b = document.getElementsByClassName("carousel-image"),
    c = -b[0].clientWidth,
    d = b.length - 1;
  let e = 0;

  function f() {
    if(e !== d) {
      a.classList.add("smooth-slide");
      a.style.transform = `translateX(${c*++e}px)`;
    }
  }

  f();

  a.addEventListener("transitionend", () => {
    if(e === d) {
      e = 0;
      a.classList.remove("smooth-slide"), a.style.transform = `translateX(${c*e}px)`;
    }
    setTimeout(() => requestAnimationFrame(f), 2000);
  });
});


const canvas = document.getElementById("points-canvas"),
clientRect = canvas.getBoundingClientRect(),
width = canvas.width = clientRect.width,
height = canvas.height = clientRect.height,
ctx = canvas.getContext("2d"),
_random = Math.random;
function sqrt(a) {
  if(!a || a < 0) return 0;
  let x,  x1 = a;
  while(x !== x1) {
    x = x1, x1 = (x + (a / x)) / 2;
  }
  return x;
}
const ellipse = function(x, y, w, h) {
  ctx.beginPath();
  ctx.ellipse(x, y, w, h, 0, 0, Math.PI * 2);
  ctx.fill();
};
const line = function(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};
const random = function(min, max) {
  return _random() * (max - min) + min;
};
const dist = function(x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1;
  return sqrt(dx * dx + dy * dy);
};
const stroke = function(r, g, b, a = 255) {
  ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
};
const amt = 40,
nodes = Array.from(Array(amt), () => {
    return {
      x: random(0, width),
      y: random(0, height),
      xv: random(-1, 1),
      yv: random(-1, 1)
    }
  });
const nearestNode = function (node, ignore) {
  var startDist = Infinity, idx = 0;
  for(var i = amt; i--;) {
    if(i !== ignore) {
      const testNode = nodes[i], newDist = dist(testNode.x, testNode.y, node.x, node.y);
      if(newDist < startDist) {
        startDist = newDist, idx = i;
      }
    }
  }
  return {index: idx, distance: startDist};
};
const runNodes = function() {
  for(var i = amt; i--;) {
    const node = nodes[i],
      id = nearestNode(node, i),
      closestNode = nodes[id.index];
    stroke(255, 255, 255, 1 / id.distance * 5);
    line(node.x, node.y, closestNode.x, closestNode.y);
    stroke(0, 0, 0, 0);

    ctx.fillStyle = "#066abf";
    ellipse(node.x, node.y, 3, 3);

    node.x += node.xv;
    node.y += node.yv;

    if(node.x > width) node.x = 0;
    if(node.x < 0) node.x = width;
    if(node.y > height) node.y = 0;
    if(node.y < 0) node.y = height;
  }
};
const draw = function() {
  ctx.clearRect(0, 0, width, height);
  runNodes();
  window.requestAnimationFrame(draw);
};
for(let i = window.requestAnimationFrame(() => {}); i--;) {
  window.cancelAnimationFrame(i);
}
draw();