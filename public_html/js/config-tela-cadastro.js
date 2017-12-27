var settings = null;
(function ($) {
    $.fn.gwTelaCadastro = function (opt) {
        //Caso nao envie nenhuma configuracao existe a default
        var config_padrao = {
            //Nome da tela
            "nome_tela": "Cadastro",
            "identificacao_bt_abas": ".btn-aba",
            "section_geral": ".section-geral",
            "section_bt": ".section-bt",
            //Abas
            abas: {
                1: {
                    "identificacao_aba": "[col-ajuda]",
                    "bt_aba": ".btn-aba-ajuda",
                    "texto_aba": "Ajuda",
                    "texto_aba_oculta": "Abrir Auditoria",
                    "texto_aba_visivel": "Ocultar Auditoria",
                    "largura_max_aba": "25%",
                    "largura_min_aba": "-4%",
                    "cor_aba": "rgb(55, 84, 113)",
                    "velocidade": 200,
                    "is_ativa": false,
                    "ativa": true
                },
                2: {
                    "identificacao_aba": "[col-auditoria]",
                    "bt_aba": ".btn-aba-auditoria",
                    "texto_aba": "Auditoria",
                    "texto_aba_oculta": "Abrir Auditoria",
                    "texto_aba_visivel": "Ocultar Auditoria",
                    "largura_max_aba": "40%",
                    "largura_min_aba": "-4%",
                    "cor_aba": "rgb(4,43,80)",
                    "velocidade": 200,
                    "is_ativa": false,
                    "ativa": true
                }
            }
        };

        settings = $.extend({}, config_padrao, opt);

        //Abas
        jQuery.each(settings.abas, function (count, aba) {
            if (aba.ativa && !$(aba.identificacao_aba)[0]) {
                alert('A aba de "' + aba.texto_aba + '" não foi encontrada. \nA funcionalidade da aba está comprometida.');
            } else {
                if (aba.is_ativa === false) {
                    $(aba.identificacao_aba).hide();
                }
                $(aba.identificacao_aba).css('background', aba.cor_aba);

                adicionarOuvinteClick(aba);
            }
        });

    };

})(jQuery);

function adicionarOuvinteClick(aba) {
    $(aba.bt_aba).click(function () {
        if (qs['modulo'] === 'consulta' && aba.texto_aba === 'Auditoria') {
            alert('Não é possivel acessar a aba de auditoria no modo consulta.')
            return false;
        }
        
        if (aba.is_ativa) {
            ocultarAba(aba, true);
        } else {
            var ocultandoAba = false;
            jQuery.each(settings.abas, function (count, valida_aba) {
                if (aba !== valida_aba && valida_aba.is_ativa === true) {
                    ocultandoAba = true;
                    ocultarAba(valida_aba);
                }
            });
            if (ocultandoAba) {
                setTimeout(function () {
                    abrirAba(aba);
                }, aba.velocidade + 20);
            } else {
                abrirAba(aba);
            }
        }
    });
}

function abrirAba(aba) {
    if (aba.is_ativa === false) {
        $(aba.identificacao_aba).show();
        aba.is_ativa = true;

        $(aba.identificacao_aba).animate({
            'width': aba.largura_max_aba
        }, aba.velocidade);

        let w_section = 'calc(75% - 70px)';
        if (parseInt(aba.largura_max_aba.replace('%', '')) > 25) {
            w_section = 'calc(60% - 70px)';
        }
        $(settings.section_geral).css('width', w_section);
        $(settings.section_bt).css('width', w_section);
    }
}

function ocultarAba(aba, redimensionarSection) {
    if (aba.is_ativa === true) {
        aba.is_ativa = false;
        $(aba.identificacao_aba).animate({
            'width': aba.largura_min_aba
        }, aba.velocidade, function () {
            $(aba.identificacao_aba).hide();
        });
        if (redimensionarSection) {
            let w_section = 'calc(100% - 70px)';
            $(settings.section_geral).css('width', w_section);
            $(settings.section_bt).css('width', w_section);
        }
    }
}


function GetQueryString(a) {
    a = a || window.location.search.substr(1).split('&').concat(window.location.hash.substr(1).split("&"));

    if (typeof a === "string")
        a = a.split("#").join("&").split("&");

    // se não há valores, retorna um objeto vazio
    if (!a)
        return {};

    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        // obtem array com chave/valor
        var p = a[i].split('=');

        // se não houver valor, ignora o parametro
        if (p.length != 2)
            continue;

        // adiciona a propriedade chave ao objeto de retorno
        // com o valor decodificado, substituindo `+` por ` `
        // para aceitar URLs codificadas com `+` ao invés de `%20`
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    // retorna o objeto criado
    return b;
}

var qs = GetQueryString();