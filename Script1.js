//// JavaScript source code
//let xhr = new XMLHttpRequest();
//let url = "https://api.nasa.gov/planetary/apod?api_key=nKyS2XOABwbtJTEtgYHHynZ8dgwidv9MGAtPnVga&date=2018-11-05"
//xhr.open("GET",url);
//xhr.onreadystatechange = function () {
//    if (xhr.readyState === 4 && xhr.status === 200) {
//        let responseObject = JSON.parse(xhr.response);
//        showData(responseObject.date, responseObject.title, responseObject.explanation, responseObject.url)
//    } //if else (buscar los errores al meter una fecha incorrecta)
//    //    {
//    //        document.getElementById("apod").innerHTML = "Fecha incorrecta";
//    //    }
//};
//xhr.send();
//function showData(date, title, explanation, image_url) {
//    let result = "<h1>" + title + "</h1>";
//    result += "<p>" + explanation + "</p>";
//    result += "<img src='" + image_url + "'>";
//    result += "<p>" + date + "</p>";
//    document.getElementById("apod").innerHTML = result;
//}

////Pedir año, mes y dia al usuario y mostar el apod correspondiente
//function insertarFecha() {
//    let fecha=new Date();
//    let xhr = new XMLHttpRequest();
//    let url = "https://api.nasa.gov/planetary/apod?api_key=nKyS2XOABwbtJTEtgYHHynZ8dgwidv9MGAtPnVga&date="
//    let anio = document.getElementById("anio").value, mes = document.getElementById("mes").value, dia = document.getElementById("dia").value
//    url += anio + "-";
//    url += mes + "-";
//    url += dia;
//    if (anio === "" || mes==="" || dia=== "") {
//        url = "https://api.nasa.gov/planetary/apod?api_key=nKyS2XOABwbtJTEtgYHHynZ8dgwidv9MGAtPnVga&date=" + fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();//Poniendo fecha a secas??
//    }
//    xhr.open("GET",url);
//    xhr.send();
//    xhr.onreadystatechange = function () {
//        if (xhr.readyState === 4 && xhr.status === 200) {
//            let responseObject = JSON.parse(xhr.response);
//            //showData(responseObject.date, responseObject.title, responseObject.explanation, responseObject.url);   ////ESTE NO LO USAS PERO GUARDALO PARA SABER 
//            (function () {
//                let result = "<h1>" + responseObject.title + "</h1>";
//                result += "<p>" + responseObject.explanation + "</p>";
//                result += "<img src='" + responseObject.url + "'>";
//                result += "<p>" + responseObject.date + "</p>";
//                document.getElementById("apod").innerHTML = result;
//            }())
//        }
//        else if (xhr.readyState === 4 && xhr.status === 400) {
//            document.getElementById("apod").innerHTML = "Fecha incorrecta";
//        }
//    };
//}

////function showData(date, title, explanation, image_url) {////ESTE NO LO USAS PERO GUARDALO PARA MIRAR
////    let result = "<h1>" + title + "</h1>";
////    result += "<p>" + explanation + "</p>";
////    result += "<img src='" + image_url + "'>";
////    result += "<p>" + date + "</p>";
////    document.getElementById("apod").innerHTML = result;
////}

//Pedir una fecha y mostrar la descripcion de las últimas dos semanas

function retroFecha() {
    let retroceso = 14;
    let explanations = "";
    let url0 = "https://api.nasa.gov/planetary/apod?api_key=nKyS2XOABwbtJTEtgYHHynZ8dgwidv9MGAtPnVga&date=";
    let url = "https://api.nasa.gov/planetary/apod?api_key=nKyS2XOABwbtJTEtgYHHynZ8dgwidv9MGAtPnVga&date=";
    let xhr = new XMLHttpRequest();
    let fecha = new Date(document.getElementById("fecha").value);
    (function getApod() {
        url += formatDate(fecha);
        xhr.open("GET", url);
        xhr.send();
        xhr.onreadystatechange = function () {
            console.log(xhr.readyState + xhr.status);
            if (xhr.readyState === 4 && xhr.status === 200) {
                let responseObject = JSON.parse(xhr.response);//Convertimos lo que cogemos de la API en string a objeto
                explanations += responseObject.explanation + " ";//Introducir salto de línea
                url = url0;
                fecha = new Date(fecha.setDate(fecha.getDate() - 1));
                if (retroceso > 0) {
                    retroceso--;
                    getApod();
                }
                else if (retroceso == 0) {
                    document.getElementById("apod").innerHTML = "<p>" + explanations + "</p>";
                }
            }
        }
    }())
}
document.getElementById("boton").addEventListener("click", retroFecha);//sirve aunque sea parrafo.No poner parentesis en la funcion para que no se ejecute hasta el click
function formatDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return [year, month, day].join('-');
}
//addEventlistener() mirar en apuntes e internet, se puede usar para hacer el onclick en los botones y en errores en las conexiones de la APi