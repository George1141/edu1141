// ==UserScript==
// @name         GoogleBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let btnK = document.getElementsByName("btnK")[1];
if (btnK != undefined){ // Если находимся на главной странице гугл
    document.getElementsByName("q")[0].value = "Как звучит гобой";
    btnK.click();
}else if(location.hostname == 'www.google.com'){ // Если не на главной
    let links = document.links;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
            setTimeout(function(){link.click()}, 3000);
            break;
        }
    }
}else{ // Находимся не на гугле
    let links = document.links;
    setInterval(function(){
        if(getIntRandom(0,100)<30){
            location.href = "https://www.google.com/";
        }else{
            let index = getIntRandom(0, links.length);
            let link = links[index];
            if(link.href.indexOf(location.hostname) != -1){
                link.click();
            }
        }
    }, 3000);
}

function getIntRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min)
}
