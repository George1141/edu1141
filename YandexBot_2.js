// ==UserScript==
// @name         YandexBot_2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match       https://yandex.ru/*
// @match       https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match       https://crushdrummers.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let sites = {
    "crushdrummers.ru": ["Барабанное шоу", "Заказать барабанное шоу в москве crushDrummers", "Барабанщики на корпоратив"],
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Как звучит гобой","Флейта","Скрипка","Гобой","Фагот","Тромбон","Кларнет"]
}
let btnK = document.getElementsByClassName("mini-suggest__button-fill")[0];
// Если(if) кнопка(btnK) не(!) является(=) неопределенной(undefined), (т.е. кнопка сущетствует)
if (btnK != undefined){ // Если находимся на главной странице гугл
    let site = Object.keys(sites)[getIntRandom(0, Object.keys(sites).length)];
    let words = sites[site];
    let word = words[getIntRandom(0, words.length)];
    document.getElementsByName("text")[0].value = word;
    document.cookie = "site="+site;
    document.querySelector(".search2").submit();

}else if(location.hostname == 'yandex.ru'){ // Если не на главной (страница поисковой выдачи)
    let site = getCookie("site");
    let links = document.links;

    let pnnext = document.querySelector("body > div.main.serp.i-bem > div.main__center > div.main__content > div.content.i-bem > div.content__left >div.pager.i-bem > div > a.link.link_theme_none.link_target_serp.pager__item.pager__item_kind_next.i-bem");

    let goToTheNextPage = true;

    let pageNumber = +document.getElementsByClassName("pager__item pager__item_current_yes pager__item_kind_page")[0].innerText;

    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf(site) != -1){
            goToTheNextPage = false;
            setTimeout(function(){link.target = "_self"; link.click()}, 4000);
            break;
        }
    }
    if(goToTheNextPage && pageNumber<10) setTimeout(function(){pnnext.click();}, 2000);
    else if(goToTheNextPage) location.href = "https://yandex.ru/";
    } else { // Находимся не на Яндексе
    let links = document.links;
    setInterval(function(){
        if(getIntRandom(0,100)<30){
            location.href = "https://yandex.ru/";
        }else{
            let index = getIntRandom(0, links.length);
            let link = links[index];
            if(link.href.indexOf(location.hostname) != -1){
                link.target = "_self"; link.click();
            }
        }
    }, 4000);
}
    function getIntRandom(min,max){
        return Math.floor(Math.random()*(max-min)+min)
    }

    function getCookie(name) {
       let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
