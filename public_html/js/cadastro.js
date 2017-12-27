/* 
 Created on : 09/11/2017, 21:11:34
 Author     : Mateus
 */
$(document).ready(function () {
    $(document).gwTelaCadastro();

    $('.aba').click(function () {
        $('.aba-selecionada').removeClass('aba-selecionada');
        $(this).addClass('aba-selecionada');
    });

    $('.header-dom > img').click(function () {
        var bodyDom = $('<div class="body-dom celula-zebra-2">');
        $('.container-dom').append(bodyDom);
        $(bodyDom).load('./html-dom/tabela-tde.html');
    });
    
    $('.limpar-pagina').click(function(){
        if(confirm('Deseja limpar todos os dados da tela ? ')){
            $('input').val('');
        }
    });


//    $('.container-dom').load('./html-dom/tabela-tde.html');
//    $.post('./html-dom/tabela-tde.html', function (html) {
//        //Essa é a função success
//        //O parâmetro é o retorno da requisição 
//        $('#idSuaDiv').html(html);
//    });
});

