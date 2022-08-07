const container = document.querySelector('.container'),
locationInputPart = container.querySelector('.location-input'),
infoText = locationInputPart.querySelector('.info-text'),
inputField = locationInputPart.querySelector('input');


inputField.addEventListener('keyup', e => {
    if(e.key == 'Enter' && inputField.value != ''){
        reqestApi(inputField.value);
    }
});
function reqestApi(city) {
    console.log(city);
}
