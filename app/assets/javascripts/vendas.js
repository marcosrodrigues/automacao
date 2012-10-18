$(function(){

    reajusta();

    function reajusta(){
        var heightLeftAndContent = $(window).height() * 0.8;
        var heightFooter = $(window).height() * 0.2;

        var widthLeft = $(window).width() * 0.2;
        var widthContent = $(window).width() * 0.8;

        var heightHeader = $('#header').height();

        $('#left').css('height', (heightLeftAndContent - heightHeader) + 'px');
        $('#left').css('width', widthLeft + 'px');

        $('#content').css('height', (heightLeftAndContent - heightHeader) + 'px');
        $('#content').css('width', widthContent + 'px');

        $('#grid').css('height', heightLeftAndContent + 'px');
        $('#grid').css('width', widthContent + 'px');

        $('#footer').css('height', heightFooter + 'px');
    }

    $(window).resize(function(){
        reajusta();
    });

    $('#pesquisa').autocomplete({
        minLength: 2,
        delay: 1000,
        source: '/produtos/pesquisa',
        select: function(event, ui) {

        }
    });
});