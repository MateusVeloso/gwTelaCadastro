window.onbeforeunload = function () {
    teste();
    return '';
};

function teste() {
    $('input').each(function (e) {
        localStorage.setIntem('oi', '123123')
    });
}