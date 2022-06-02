import * as httpRequest from './requests.js';
if (!sessionStorage.getItem('user') && !localStorage.getItem('user'))
    window.location.href = 'login.html';
$(document).ready(function () {

    // toggle mobile menu
    $('[data-toggle="toggle-nav"]').on('click', function () {
        $(this).closest('nav').find($(this).attr('data-target')).toggleClass('hidden');
        return false;
    });

    // feather icons
    feather.replace();

    // smooth scroll
    var scroll = new SmoothScroll('a[href*="#"]');

    // tiny slider
    $('#slider-1').slick({
        infinite: true,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
    });

    $('#slider-2').slick({
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        customPaging: function (slider, i) {
            return '<div class="bg-white br-round w-1 h-1 opacity-50 mt-5" id=' + i + '> </div>'
        },
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }
        },]
    });

    document.getElementById('logOut').addEventListener('click', function () {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = './index.html';
    });
});

let genre = document.getElementById('slcGenre');
let type = document.getElementById('slcType');
let btnGetRec = document.getElementById('btnGetRec');
let recName = document.getElementById('recName');

btnGetRec.addEventListener('click', async () => {
    if (genre.value === 'Gênero' || type.value === 'Estilo') {
        recFormAlert('recMsg', 'Opção Inválida', '#ff0000', 3000);
        return;
    }
    let query = 'recommendation?genre=' + genre.value + '&type=' + type.value;
    let res = await httpRequest.get(query, '');
    handleRecommendation(res);
});

function handleRecommendation(res) {
    recName.innerText = res.data;
}

function recFormAlert(divId, msg, color, time) {
    let div = document.getElementById(divId);
    div.style = `
    text-align: center;
    margin-top: 25px;
    color: #000000;`;
    div.style.color = color;
    div.innerText = msg;
    if (time != -1) setTimeout(() => {
        div.innerText = '';
        div.style.margin = '0';
    }, time);
}