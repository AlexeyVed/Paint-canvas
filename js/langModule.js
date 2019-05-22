// model

const englishTranslation = {
    languageCaption: 'language',
    languageEng: 'english',
    languageRus: 'russian',
    themeCaption: 'theme',
    themeDefault: 'default',
    themeRed: 'red',
    themeGreen: 'green',
    themeBlue: 'blue',
    themeDark: 'dark',
    brush: ` brush`,
    blur: ' blur',
    color: ' color',
    figures: ' figures',
    rectangle: ' rectangle',
    polygon: ' polygon',
    circle: ' circle',
    layers: ' layers',
    add: ' add',
    layer: ' layer',
    
};

const russianTranslation = {
    languageCaption: 'язык',
    languageEng: 'английский',
    languageRus: 'русский',
    themeCaption: 'тема',
    themeDefault: 'основная',
    themeRed: 'красная',
    themeGreen: 'зеленая',
    themeBlue: 'голубая',
    themeDark: 'темная',
    brush: ` кисть`,
    blur: ' размытие',
    color: ' цвет',
    figures: ' фигуры',
    rectangle: ' прямоугольник',
    polygon: ' многоугольник',
    circle: ' круг',
    layers: ' слои',
    add: ' добавить',
    layer: ' слой',
    
};

const language = {
    english: englishTranslation,
    russian: russianTranslation,
};


// veiw

function applyLanguage() {
    let currentLang = language[settings.language];
    
    for (let key in currentLang) {
        try {
            
            if (key !== 'layer') {
                document.querySelector('#' + key).innerHTML = currentLang[key];
            }
        } catch (error) {
            
            console.error(error);
        }
    }
}