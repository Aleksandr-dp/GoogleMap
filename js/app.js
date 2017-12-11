var dano = {
    map: document.querySelector("#map"),                    //Карта
    inpLat: document.querySelector("#lat"),                 //Координата lat
    inpLng: document.querySelector("#lng"),                 //Координата lng
    inpName: document.querySelector("#placeName"),          //Имя места рус.
    inpDiscription: document.querySelector("#discription"), //Описание
    divDiscription: document.querySelector(".info"),        //Блок с описанием
    btnSend: document.querySelector("#btnSend"),            //Кнопка отправки метки
    btnDiscr: document.querySelector("#info"),              //Кнопка описания
    arrCoords: [],                                          //Массив с координатами
    arrName: [],                                            //Массив с именами
    arrNameEn: [],                                          //Массив с именами англ.
    discription: [],                                        //Описание места
    MAX_MARKS: 20
};

//Инициализация карты
function initMap() {
    var arrMark = [];           //Массив с метками
    
    var map = new google.maps.Map(dano.map, {
        zoom: 8,
        center: {lat: 48.46, lng: 35.06}
    });
    
    //Создаем метки
    for (var i = 0; i < dano.arrCoords.length; i++) {
        var info = (i + 1) + ". " + dano.arrName[i] + " (" + dano.arrNameEn[i] + ")";
        
        arrMark[i] = new google.maps.Marker({
            position: dano.arrCoords[i],
            map: map,
            label: info
        });
    }
}

//Очистка полей
function clearInput() {
    dano.inpLat.value = "";
    dano.inpLng.value = "";
    dano.inpName.value = "";
    dano.inpDiscription.value = "";
    borderColor();
}

//Возвращаем цвет border после исправления ошибки
function borderColor() {
    dano.inpLat.style.borderColor = "rgb(238, 238, 238)";
    dano.inpLng.style.borderColor = "rgb(238, 238, 238)";
    dano.inpName.style.borderColor = "rgb(238, 238, 238)";
}

//Проверка значений
function checkValue() {
    var reg1 = /[А-Яа-яЁё]/g,
        reg2 = /\d/g,
        lat = dano.inpLat.value * 1,
        lng = dano.inpLng.value * 1,
        nameVal = dano.inpName.value;
    
    //Ограничиваем колличество меток на карте
    if (dano.arrCoords.length > dano.MAX_MARKS) {
        alert("Максимальное число меток 20!");
        return;
    }
    
    //Проверяем координаты
    if (reg2.test(lat) && reg2.test(lng) && lat <= 90 && lng <= 180) {
        
        //Проверяем имя на русском
        if (reg1.test(nameVal)) {
            takeValue(lat,lng,nameVal);    //Если все ОК
        } else {
            alert("Наименование места должно быть кирилицей!");
            dano.inpName.style.borderColor = "red";
            return;
        }
        
    } else {
        alert("Долгота и широта должны быть цифры. Широта не должна превышать 90; долгота - 180!");
        dano.inpLat.style.borderColor = "red";
        dano.inpLng.style.borderColor = "red";
        return;
    }
}

//Создаем объект с координатами
function GetCoords(lat,lng) {
    this.lat = lat;
    this.lng = lng;
}

//Заносим данные в переменные
function takeValue(lat,lng,nameVal) {
    dano.arrCoords.push(new GetCoords(lat,lng));        //Заносим объект с координатами
    dano.discription.push(dano.inpDiscription.value);   //Заносим описание в массив
    dano.arrName.push(nameVal);                         //Заносим имя на русском в массив
    dano.arrNameEn.push(translateName(nameVal));        //Преводим имя на английский
    clearInput();                                       //Очищаем поля ввода
    initMap();                                          //Перегружаем карту
}

//Переводчик на английский
function translateName(nameVal) {
    var rus = "абвгдеёжзийклмнопрстуфхцчшщъыэюя1234567890_- ",
        eng = ["a","b","v","g","d","e","yo","g","z","i","j","k","l","m","n","o","p",
              "r","s","t","u","f","h","c","ch","sh","sch","'","y","a:","yu","ya","1",
              "2","3","4","5","6","7","8","9","0","_","-"," "],
        nameEn = "";
    
    
    for (var i = 0; i < nameVal.length; i++) {
        var index = rus.indexOf(nameVal[i].toLowerCase());
        nameEn += eng[index];
    }
    
    return nameEn;
}

//Вывод описания метки
function discription() {
    var inputPlace = document.querySelector("#numberMark"),
        i = inputPlace.value * 1;
        
    dano.divDiscription.style.display = "block";
    dano.divDiscription.innerHTML = dano.discription[i - 1];
    inputPlace.value = "";
}

dano.btnSend.addEventListener("click", checkValue);
dano.btnDiscr.addEventListener("click", discription);
