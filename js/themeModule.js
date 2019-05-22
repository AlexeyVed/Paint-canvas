const currentTheme = document.querySelector('#theme');

// veiw

function applyTheme() {
    let newTheme = `css/${settings.theme}.css`;
    currentTheme.setAttribute('href', newTheme);
    return true;
}