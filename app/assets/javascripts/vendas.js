$(function(){

    reajusta();

    function reajusta(){
        var heightLeftAndContent = $(window).height() * 0.8;
        var heightFooter = $(window).height() * 0.2;

        var widthLeft = $(window).width() * 0.2;
        var widthContent = $(window).width() * 0.8;

        $('#left').css('height', heightLeftAndContent + 'px');
        $('#left').css('width', widthLeft + 'px');

        $('#content').css('height', heightLeftAndContent + 'px');
        $('#content').css('width', widthContent + 'px');

        $('#grid').css('height', heightLeftAndContent + 'px');
        $('#grid').css('width', widthContent + 'px');

        $('#footer').css('height', heightFooter + 'px');
    }

    $(window).resize(function(){
        reajusta();
    });
});