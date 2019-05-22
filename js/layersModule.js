// veiw

function addNewLayer() {
    let leyerId = 'layer' + settings.layersCount;
    let newLayer = document.createElement('CANVAS');
    newLayer.setAttribute('class', 'canvas');
    newLayer.setAttribute('width', '800');
    newLayer.setAttribute('height', '600');
    newLayer.setAttribute('id', leyerId);
    paintBodyCanvas.appendChild(newLayer);
    let newLayerRowHtml = ` <div class="row">
                        <button class="paintBody__button_layers active" data-layer="${leyerId}" id="btn${leyerId}">${leyerId}</button>
                        <button class="paintBody__delBtn del" data-del="${leyerId}" id="btnDelLayer${settings.layersCount}"></button>
                    </div>`;
    layersPanel.innerHTML += newLayerRowHtml;
    return newLayer;
}

function deleteLayerById(delLayerId) {
    let child = document.getElementById(delLayerId);
    paintBodyCanvas.removeChild(child);
    child = document.getElementById('btn' + delLayerId).parentElement;
    layersPanel.removeChild(child);
    return true;
}

function chekFirstLayer() {
    let layers = paintBodyCanvas.querySelectorAll('.canvas');
    if (layers[1]) {
        return layers[1];
    } else {
        return null;
    }
}

function setActiveLayer(layerID) {
    document.getElementById('btn' + layerID).classList.toggle('active');
    
}


function inactiveClass() {
    let currentActive = layersPanel.getElementsByClassName('active');
    if (currentActive[0]) {
        currentActive[0].classList.toggle('active');
    }
}



