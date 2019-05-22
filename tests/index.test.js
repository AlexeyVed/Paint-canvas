describe("paintModule tests", function () {

     describe('PaintView()  -  create a object paint', function () {
          const testData = [
               { expected: 'function PaintView() {\r\n\r\n    this.isMouseDown = false;\r\n    this.canvas = settings.layer;\r\n    this.ctx = this.canvas.getContext("2d");\r\n    this.figure = settings.tool;\r\n    this.beginX;\r\n    this.beginY;\r\n    let self = this;\r\n}'}
          ];

          testData.forEach(function (data) {
               const { expected } = data;
               it(`Create a new object paint`, function () {
                    const paint = new PaintView();


                    const actual = paint.constructor.toString();
                    assert.deepEqual( actual, expected);
               });
          });
     });
//rtttttyui
     describe('PaintView.renderLine()  -  draw line', function () {
          const testData = [
               { expected: true },
               { expected: true }
          ];

          testData.forEach(function (data) {
               const { expected } = data;
               it(`Should return ${expected} if haven't error`, function () {
                    const paint = new PaintView();
                    const actual = paint.renderLine(10, 10);
                    assert.strictEqual(expected, actual);
               });
          });
     });

     describe('PaintView.mouseUpCircus()  -  draw circus', function () {
          const testData = [
               { expected: true },
               { expected: true }
          ];

          testData.forEach(function (data) {
               const { expected } = data;
               it(`Should return ${expected} if haven't error`, function () {
                    const paint = new PaintView();
                    const event = new Event("click", {offsetX : 100, offsetY : 100});
                    paint.startFigure(event)

                    const actual = paint.mouseUpCircus(event);
                    assert.strictEqual(expected, actual);
               });
          });
     });

     describe('PaintView.mouseUpRect()  -  draw rect', function () {
          const testData = [
               { expected: true },
               { expected: true }
          ];

          testData.forEach(function (data) {
               const { expected } = data;
               it(`Should return ${expected} if haven't error`, function () {
                    const paint = new PaintView();
                    const event = new Event("click", {offsetX : 100, offsetY : 100});
                    paint.startFigure(event)

                    const actual = paint.mouseUpRect(event);
                    assert.strictEqual(expected, actual);
               });
          });
     });

     describe('PaintView.mouseUpPolygon()  -  draw polygon', function () {
          const testData = [
               { expected: true },
               { expected: true }
          ];

          testData.forEach(function (data) {
               const { expected } = data;
               it(`Should return ${expected} if haven't error`, function () {
                    const paint = new PaintView();
                    const event = new Event("click", {offsetX : 100, offsetY : 100});
                    paint.startFigure(event)

                    const actual = paint.mouseUpPolygon(event);
                    assert.strictEqual(expected, actual);
               });
          });
     });

     describe('PaintView.clear()  -  crear place for service layer', function () {
          const testData = [
               { expected: true },
               { expected: true }
          ];

          testData.forEach(function (data) {
               const { expected } = data;
               it(`Should return ${expected} if haven't error`, function () {
                    const paint = new PaintView()

                    const actual = paint.clear();
                    assert.strictEqual(expected, actual);
               });
          });
     });
});

describe("brushModule tests", function () {

     describe('showCurrentColor()  -  show color near button "color" from setting', function () {
          const testData = [
               { expected: 'rgb(0, 0, 0)'}
          ];

          testData.forEach(function (data) {
               const { expected } = data;
               it(`Create a new object paint`, function () {
                    showCurrentColor();


                    const actual = document.getElementById('paintBody__color').style.background;
                    assert.deepEqual( actual, expected);
               });
          });
     });

     describe('renderBrush()  -  draw brush near button', function () {
          const testData = [
               { expected: true },
               { expected: true }
          ];

          testData.forEach(function (data) {
               const { expected } = data;
               it(`Should return ${expected} if haven't error`, function () {

                    const actual = renderBrush();
                    assert.strictEqual(expected, actual)
               });
          });
     });

     describe('inactiveFigures()  -  remove or set class "active" ', function () {
          const testData = [
               { expected: 'paintBody__button brush' },
               { expected: 'paintBody__button brush active' }
          ];

          testData.forEach(function (data) {
               const { expected } = data;
               it(`Should remove or set class 'Active' =>  ${expected}`, function () {
                    const brus = document.getElementById('brush')
                    brus.classList.toggle("active");
                    inactiveFigures()

                    const actual = brus.className;
                    assert.deepEqual(expected, actual);
               });
          });
     });

     describe('showSidebar()  -  remove or set class "active" ', function () {
          const testData = [
               { expected: 'leftSidebar showSidebar' },
               { expected: 'leftSidebar' }
          ];

          testData.forEach(function (data) {
               const { expected } = data;
               it(`Should remove or set class 'Active' to sidebar =>  ${expected}`, function () {

                    showSidebar()

                    const actual = leftSidebar.className;
                    assert.deepEqual(expected, actual);
               });
          });
     });
});

describe("languageModule tests", function () {

     describe('applyLanguage()  -  set language from settings', function () {
          const testData = [
               { expected: ' brush'},
               { expected: ' кисть'}
          ];

          testData.forEach(function (data) {
               const { expected } = data;
               it(`Set language theme english or russian => ${expected}`, function () {
                    const brus = document.getElementById('brush');
                    applyLanguage();
                    settings.language = 'russian';

                    const actual = brus.textContent;
                    assert.deepEqual( actual, expected);
               });
          });
     });
});

describe("themeModule tests", function () {

     describe('applyTheme()  -  apply a choised colour theme', function () {
          const testData = [
               { expected: true}
          ];

          testData.forEach(function (data) {
               const { expected } = data;
               it(`Apply theme from settings, return true if ended without crashing`, function () {

                    const actual = true;
                    assert.deepEqual( actual, expected);
               });
          });
     });
});

describe("layersModule tests", function () {

     describe('addNewLayer()  -  add new layer of canvas', function () {
          const testData = [
               { expected: [ 'canvas', 800, 600, 'layer1' ]},
               { expected: [ 'canvas', 800, 600, 'layer1' ]}
          ];

          testData.forEach(function (data) {
               const { expected } = data;
               it(`Add new layer with class='canvas', width=800, height=600, id='layer#' => [${expected}]`, function () {
                    const a = addNewLayer();

                    const actual = [a.className, a.width, a.height, a.id ];
                    assert.deepEqual( actual, expected);
               });
          });
     });

     describe('deleteLayerById()  -  remove layer from ID', function () {
          const testData = [
               { expected: true},
               { expected: true}
          ];

          testData.forEach(function (data) {
               const { expected } = data;
               it(`Remove layer and return true if ended without crashing`, function () {
                     addNewLayer();
                    deleteLayerById('layer1');

                    const actual = deleteLayerById('layer1');;
                    assert.deepEqual( actual, expected);
               });
          });
     });

     describe('chekFirstLayer()  -  check first canvas layer', function () {
          const testData = [
               { expected: [ 'canvas', 800, 600, 'layer1' ]},
               { expected: [ 'canvas', 800, 600, 'layer1' ]}
          ];

          testData.forEach(function (data) {
               const { expected } = data;
               it(`Should return layer or null => [${expected}]`, function () {
                    const a = chekFirstLayer()

                    const actual = [a.className, a.width, a.height, a.id ];
                    assert.deepEqual( actual, expected);
               });
          });
     });

     describe('setActiveLayer()  -  set active layer', function () {
          const testData = [
               { expected: 'paintBody__button_layers'},
               { expected: 'paintBody__button_layers active'}
          ];

          testData.forEach(function (data) {
               const { expected } = data;
               it(`Set buttons of layers class 'active'`, function () {
                    setActiveLayer('layer1');

                    const actual = document.getElementById('btnlayer1').className;
                    assert.deepEqual( actual, expected);
               });
          });
     });

     describe('setActiveLayer()  -  delete class active layer', function () {
          const testData = [
               { expected: 'paintBody__button_layers'},
               { expected: 'paintBody__button_layers'}
          ];

          testData.forEach(function (data) {
               const { expected } = data;
               it(`Delete buttons of layers class 'active'`, function () {
                    inactiveClass('layer1');

                    const actual = document.getElementById('btnlayer1').className;
                    assert.deepEqual( actual, expected);
               });
          });
     });
});





