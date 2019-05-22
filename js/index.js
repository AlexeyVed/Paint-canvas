// model
const btnCollapse = document.querySelector('#btnCollapse');
const brushPanel = document.querySelector('#brushPanel');
const leftSidebar = document.querySelector('#leftSidebar');
const layersPanel = document.querySelector('#layersPanel');
const paintBodyCanvas = document.querySelector('#paintBodyCanvas');
const inputColor = document.getElementById('inputColor');
const layer0 = document.querySelector('#layer0');
const changeSize = document.querySelector('#paintBody__size');
const changeSizeRange = document.querySelector('#changeSize');
const figurePanel = document.getElementById('figuresPanel');
const brushBtn = document.querySelector('#brush');
const blurButt = document.querySelector('#blur');
const divBlur = document.querySelector('#paintBody__blur');
const changeBlure = document.querySelector('#changeBlur');
const serviceLayer = document.querySelector('#layer0');
const numberOfSides = document.querySelector('#numberOfSides');
let view,
    serviceView;


var settings = {
    language: 'english', //rus
    theme: 'defaultTheme', // red, green, blue, dark
    tool: 'brush', //rectangle, polygon, circle
    size: 7,
    blur: '10px',
    color: '#000000',
    layer: layer0,
    layersCount: 0,
    zInd: 2,
    numberOfSides: 5,
    currentX: null,
    currentY: null,
};

//controller


// btnCollapse
btnCollapse.addEventListener('click', showSidebar);

//brushPanel

brushPanel.addEventListener('click', function(event) {
    let target = event.target;
    
    if (target.tagName != 'BUTTON') {
        return;
    }
    if (target.id === 'color') {
        inputColor.click();
    }
    if (target.id === 'brush') {
        settings.tool = 'brush';
        renderBrush();
        changeSize.classList.toggle('showSize');
        brushBtn.classList.add('active');
        inactiveFigures();
    }
});

changeSize.addEventListener('focusout', (event) => {
    changeSize.classList.toggle('showSize');
});

changeSizeRange.addEventListener('change', (event) => {
    settings.size = changeSizeRange.value;
    renderBrush();
});

changeBlure.addEventListener('change', function() {
    settings.layer.style.webkitFilter = `blur(${changeBlure.value}px)`;
    document.getElementById('canvasBrush').style.webkitFilter = `blur(${changeBlure.value}px)`;
});

blurButt.addEventListener('click', function(event) {
    divBlur.classList.toggle('showBlur');
});


inputColor.addEventListener('change', function(event) {
    settings.color = inputColor.value;
    showCurrentColor();
    renderBrush();
});

// left Sidebar

leftSidebar.addEventListener('click', function(event) {
    let target = event.target;
    if (target.tagName != 'BUTTON') {
        return;
    }
    if (target.hasAttribute('data-src')) {
        
        settings.theme = target.getAttribute('data-src');
        applyTheme();
    }
    if (target.hasAttribute('data-lang')) {
        
        settings.language = target.getAttribute('data-lang');
        applyLanguage();
    }
});

figurePanel.addEventListener('click', function(event) {
    let target = event.target;
    let buttons = figurePanel.querySelectorAll('button');
    if (target.tagName != 'BUTTON') {
        return;
    }
    
    if (target.id === 'figures') {
        return;
    }
    switch (target.id) {
        case 'rectangle':
            settings.tool = 'rectangle';
            break;
        case 'polygon':
            settings.tool = 'polygon';
            document.getElementById('numberOfSidesCont').classList.toggle('showSize');
            break;
        case 'circle':
            settings.tool = 'circle';
            break;
    }
    for (let i = 1; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    target.classList.add('active');
    brushBtn.classList.remove('active');
    
});

numberOfSides.addEventListener('change', (event) => {
    settings.numberOfSides = numberOfSides.value;
    document.getElementById('qtyOfSides').innerText = numberOfSides.value;
    
});

numberOfSides.addEventListener('focusout', (event) => {
    document.getElementById('numberOfSidesCont').classList.toggle('showSize');
});


// right Sidebar
layersPanel.addEventListener('click', function(event) {
    const target = event.target;
    
    if (target.tagName != 'BUTTON') {
        return;
    }

// add new Layer
    
    if (target.hasAttribute('data-add')) {
        inactiveClass();
        settings.layersCount++;
        let newLayer = addNewLayer();
        settings.layer = newLayer;
    }

// make the layer active
    
    if (target.hasAttribute('data-layer')) {
        let selectedLayerID = target.getAttribute('data-layer');
        
        try {
            settings.layer = document.getElementById(selectedLayerID);
            inactiveClass();
            setActiveLayer(selectedLayerID);
        } catch (error) {
            console.error(error);
        }
        settings.layer.style.zIndex = settings.zInd++;
    }

// delete layer
    
    if (target.hasAttribute('data-del')) {
        let delLayerId = target.getAttribute('data-del');
        try {
            deleteLayerById(delLayerId);
            if (settings.layer.id === delLayerId) {
                let activeLayer = chekFirstLayer();
                settings.layer = activeLayer;
                if (activeLayer) {
                    inactiveClass();
                    setActiveLayer(activeLayer.id);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
});

// Paint Controller

paintBodyCanvas.addEventListener('mousedown', function(event) {
    
    if (!settings.layer) {
        return;
    }
    serviceView = new PaintView();
    serviceView.canvas = serviceLayer;
    serviceView.ctx = serviceLayer.getContext('2d');
    view = new PaintView();
    view.isMouseDown = true;
    serviceView.isMouseDown = true;
    settings.currentX = event.offsetX;
    settings.currentY = event.offsetY;
    
    switch (settings.tool) {
        case 'brush':
            break;
        case 'rectangle':
            if (view && view.isMouseDown) {
                serviceView.startFigure(settings.currentX, settings.currentY);
                view.startFigure(settings.currentX, settings.currentY);
            }
            break;
        case 'polygon':
            if (view && view.isMouseDown) {
                serviceView.startFigure(settings.currentX, settings.currentY);
                view.startFigure(settings.currentX, settings.currentY);
            }
            break;
        case 'circle':
            if (view && view.isMouseDown) {
                serviceView.startFigure(settings.currentX, settings.currentY);
                view.startFigure(settings.currentX, settings.currentY);
            }
            break;
    }
    
});

paintBodyCanvas.addEventListener('mousemove', function(event) {
    settings.currentX = event.offsetX;
    settings.currentY = event.offsetY;
    
    switch (settings.tool) {
        case 'brush':
            if (view && view.isMouseDown) {
                view.renderLine(settings.currentX, settings.currentY);
            }
            break;
        case 'rectangle':
            if (view) {
                serviceView.clear();
                serviceView.mouseUpRect(settings.currentX, settings.currentY);
            }
            break;
        case 'polygon':
            if (view) {
                serviceView.clear();
                serviceView.mouseUpPolygon(settings.currentX, settings.currentY);
            }
            break;
        case 'circle':
            if (view) {
                serviceView.clear();
                serviceView.mouseUpCircus(settings.currentX, settings.currentY);
            }
            break;
        
    }
});


document.addEventListener('mouseup', function(event) {
    
    switch (settings.tool) {
        case 'brush':
            if (view) {
                view.renderLine(null);
                view.ctx.beginPath();
                view = null;
                
            }
            break;
        case 'rectangle':
            if (view) {
                serviceView.clear();
                serviceView = null;
                view.mouseUpRect(settings.currentX, settings.currentY);
                view = null;
            }
            break;
        case 'polygon':
            if (view) {
                serviceView.clear();
                serviceView = null;
                view.mouseUpPolygon(settings.currentX, settings.currentY);
                view = null;
            }
            break;
        case 'circle':
            if (view) {
                serviceView.clear();
                serviceView = null;
                view.mouseUpCircus(settings.currentX, settings.currentY);
                view = null;
            }
            break;
    }
});

// veiw
function showSidebar() {
    leftSidebar.classList.toggle('showSidebar');
}


window.onload = function() {
    settings.layersCount++;
    settings.layer = addNewLayer();
    settings.tool = 'brush';
    renderBrush();
};
