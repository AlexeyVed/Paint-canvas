// veiw

function showCurrentColor() {
    document.getElementById('paintBody__color').style.background = settings.color;
}


function renderBrush() {
    const view = document.getElementById('canvasBrush');
    const ctx = view.getContext('2d');
    
    ctx.clearRect(0, 0, view.width, view.height);
    ctx.beginPath();
    ctx.arc(view.width / 2, view.height / 2, settings.size, 0, Math.PI * 2);
    ctx.fillStyle = settings.color;
    ctx.fill();
    return true;
}

function inactiveFigures() {
    let currentActive = figurePanel.getElementsByClassName('active');
    if (currentActive[0]) {
        currentActive[0].classList.toggle('active');
    }
    return true;
}