const container = document.querySelector('.container'),
wIcon = container.querySelector('img'),
locationInputPart = container.querySelector('.location-input'),
infoText = locationInputPart.querySelector('.info-text'),
inputField = locationInputPart.querySelector('input'),
locationBtn = locationInputPart.querySelector('button'),
backArrow = container.querySelector('header i');

let api;

locationBtn.addEventListener('click', ()=>{
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(onSuccess,onError)
}else{
    alert('Browser Does not support Geolocation');
}
})

function onSuccess(position) {
    const {latitude,longitude} = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=532f19cdeeac5832540478ccf6d15e44`;
    fetchData();
}
function onError(error) {
    infoText.innerText = error.message;
    infoText.classList.add('error');
}

inputField.addEventListener('keyup', e => {
    if(e.key == 'Enter' && inputField.value != ''){
        reqestApi(inputField.value);
    }
});
function reqestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=532f19cdeeac5832540478ccf6d15e44`;
    fetchData();
    
}
function fetchData() {
    infoText.innerText = 'Getting Details...'
    infoText.classList.add('pending')
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
    if(info.cod == '404'){
        infoText.innerText = 'Invaild city name';
    infoText.classList.replace('pending','error');
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description,id} = info.weather[0];
        const {feels_like,humidity,temp} = info.main;

        if(id == 800){
            wIcon.src = '/Icons/clear.SVG';
        }
        else if(id >= 200 && id <= 232){
            wIcon.src = '/Icons/strom.SVG';
        }
        else if(id >= 600 && id <= 622){
            wIcon.src = '/Icons/snow.SVG';
        }
        else if(id >= 701 && id <= 781){
            wIcon.src = '/Icons/haze.SVG';
        }
        else if(id >= 801 && id <= 804){
            wIcon.src = '/Icons/cloud.SVG';
        }
        else if(id >= 300 && id <= 321 || id >= 500 && id <= 531){
            wIcon.src = '/Icons/rain.SVG';
        }

        container.querySelector('.temp .numb').innerText = Math.round(temp);
        container.querySelector('.weather').innerText = description;
        container.querySelector('.location span').innerText = `${city}, ${country}`;
        container.querySelector('.temp .numb-2').innerText = Math.round(feels_like);
        container.querySelector('.humidity span').innerText = `${humidity}%`;
        infoText.classList.remove('pending','error');
        container.classList.add('active') 
    }
}
backArrow.addEventListener('click',()=>{
    container.classList.remove('active');
    inputField.value = '';
})