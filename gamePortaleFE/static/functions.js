//Matrix fuctionality
import { matrix } from './cmatrix.js';

const darkTheme = {
  bgColor: 'rgba(0,0,0, 0.05)',
  color: '#22b455',
  chars: undefined,
  fontSize: 14
};
const lightTheme = {
  bgColor: 'rgba(255,255,255,0.05)',
  color: '#000',
  chars: ['0', '1'],
  fontSize: 16
};

let backgroundColor = darkTheme.bgColor;
let color = darkTheme.color;
let chars = darkTheme.chars;
let fontSize = darkTheme.fontSize;

const canvas = document.getElementById('canvas');
let matrixCanvas = matrix(canvas, {
  chars: chars,
  color: color,
  background: backgroundColor,
  font_size: fontSize
});

//Internationalization fuctionality
let languageConfig;
//Load language json data
fetch("./assets/langs/lang.json").then(response => {
   return response.json();
}).then(jsondata => {
  languageConfig = jsondata;
});

const replaceText = (element, lang) => {
  const key = element.getAttribute('data-i18n');
  element.innerHTML = languageConfig[key][lang] || element.innerHTML;
};

const changeLanguage = (event) => {
  const option = event.target.value;

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => replaceText(el, option));
};

const languageFilter = document.getElementById("language");
languageFilter.addEventListener('change', changeLanguage);

//Theming fuctionality
const updateCanvas = () => {
  //Stop matrix canvas
  window.dispatchEvent(new KeyboardEvent('keydown', {
    'key': 'q'
  }));
  //Change matrix canvas
  matrixCanvas.then(() =>{
    matrixCanvas = matrix(canvas, {
      chars: chars,
      color: color,
      background: backgroundColor,
      font_size: fontSize
    });
  });
};

const changeTheme = (event) => {
  const option = event.target.value;
  backgroundColor = option === 'light' ? lightTheme.bgColor : darkTheme.bgColor;
  color = option === 'light' ? lightTheme.color : darkTheme.color;
  chars = option === 'light' ? lightTheme.chars : darkTheme.chars;
  fontSize = option === 'light' ? lightTheme.fontSize : darkTheme.fontSize;
  if (!document.body.classList.contains(option)) {
    document.body.classList = [];
    document.body.classList.add(option);
    updateCanvas();
  }
};

const themeFilter = document.getElementById("theme");
themeFilter.addEventListener('change', changeTheme);

//Menu fuctionality
const menuBtn = document.getElementById("menuBtn");
menuBtn.addEventListener('click', function() {
  this.classList.toggle("change");
  document.getElementById("menu").classList.toggle("change");
});

const menuLinks = document.querySelectorAll('header nav ul li a');
menuLinks.forEach((menuLink) => {
  menuLink.addEventListener('click', function() {
    document.getElementById("menu").classList.toggle("change");
  });
});

//R key functionality to restart the canvas
window.addEventListener('keydown', function(event) {
  if (event.key.toLowerCase() === 'r') {
    updateCanvas();
  }
});