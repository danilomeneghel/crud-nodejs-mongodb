$(document).ready(function () {
    $("#contents div:nth-child(1)").show();

    $(".tabs div:first").addClass("selected");
    
    $(".tab").click(function () {
        $(".tab").removeClass("selected");
        $(this).addClass("selected");
        var indice = $(this).index();
        indice++;
        $("#contents .content").hide();
        $("#contents .content:nth-child(" + indice + ")").show();
    });

    $(".tab").hover(
        function () { $(this).addClass("active") },
        function () { $(this).removeClass("active") }
    );
});