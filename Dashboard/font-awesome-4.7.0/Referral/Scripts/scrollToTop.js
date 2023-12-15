window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        $("#scrolltoTopBtn").fadeIn();
    } else {
        $("#scrolltoTopBtn").fadeOut();
    }
}

function topFunction() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    $('html, body').animate({ scrollTop: 0 }, 'slow');
}