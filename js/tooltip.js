let tool = document.createElement('div');
tool.classList.add('tooltip');
tool.innerHTML = 
  `Tooltip is now at: 
    X: <span id="spanX">0</span>, 
    Y: <span id="spanY">0</span>`
document.body.appendChild(tool);

function throttle(func, ms) {
  let isBusy = false;
  let lastMove;
  return function wrapper() {
    lastMove = [event.clientX, event.clientY];
    
    if (isBusy) {
      lastMove = [event.clientX, event.clientY];
      return;
    }
    
    func.call(this);
    isBusy = true;
    
    setTimeout(() => {
      let moveX = lastMove[0]-tool.offsetWidth/2;
      let moveY = lastMove[1]-tool.offsetHeight-6;
      if (moveX < 0) {
        moveX = 0;
      }
      if (moveY < 0) {
        moveY = 0;
      }
      if (moveX > document.body.offsetWidth-tool.offsetWidth) {
        moveX = document.body.offsetWidth-tool.offsetWidth;
      }
      tool.style.left = `${moveX}px`
      tool.style.top = `${moveY}px`
      spanX.textContent = lastMove[0];
      spanY.textContent = lastMove[1];
      isBusy = false;
    }, ms);
  }
}

function onMoveThrottled() {
  let moveX = event.clientX-tool.offsetWidth/2;
  let moveY = event.clientY-tool.offsetHeight-6;
  
  if (moveX < 0) {
    moveX = 0;
  }
  if (moveY < 0) {
    moveY = 0;
  }
  if (moveX > document.body.offsetWidth-tool.offsetWidth) {
    moveX = document.body.offsetWidth-tool.offsetWidth;
  }

  tool.style.left = `${moveX}px`
  tool.style.top = `${moveY}px`
  spanX.textContent = event.clientX;
  spanY.textContent = event.clientY;
}

let moveThrottled = throttle(onMoveThrottled, 200);

document.addEventListener('mousemove', moveThrottled);