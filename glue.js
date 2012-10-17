function dispQ() {
    makeQuestion(function (html) {
        $("#quiz").html(html);
        $(".antwoord").click(function (e) {
            e.preventDefault();
            var corr = $(e.target).attr('data-correct');
            if (corr == "true") {
                score++;
            }
            q++;
            if (q < 10) {
                dispQ();
            } else {
                alert(score);
            }
        });
    })
}

var score = 0;
var q = 0;

document.ready = function () {

    $("#btnGo").hide();

    initAnimals(function () {


        $("#loading").hide();
        $("#btnGo").show();

        $("#btnGo").click(function (evt) {
            evt.preventDefault();

            $("#intro").hide();
            $("#quiz").show();

            dispQ();
            //for(var i = 0; i < 10; ++i){

            //}

        });

    

        //for(var i = 0; i < 5; ++i){
        //    var animal = getAnimal("bedreigd");
        //    alert(animal.name);
        //}

        //var dier = getAllBooks("aap", function (book) {
        //    // alert(book.title);
        //});
        //// alert("Helloooooo");
    });

};