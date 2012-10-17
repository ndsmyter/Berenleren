function FotoVraag(vraagText, foto1, foto2, foto3, info, book, answer) {
    this.vraagText = vraagText;
    this.foto1 = foto1;
    this.foto2 = foto2;
    this.foto3 = foto3;
    if (info != undefined) {
        this.info = info;
    } else {
        this.info = "";
    }
    if (book != undefined) {
        this.book = book;
    } else {
        this.book = new Book("", "");
    }
    this.answer = answer;
}

function TextVraag(vraagText, vraagFoto, antwoord1, antwoord2, antwoord3, info, book, antwoord) {
    this.vraagText = vraagText;
    this.vraagFoto = vraagFoto;
    this.antwoord1 = antwoord1;
    this.antwoord2 = antwoord2;
    this.antwoord3 = antwoord3;

    if (info != undefined) {
        this.info = info;
    } else {
        this.info = "";
    }
    if (book != undefined) {
        this.book = book;
    } else {
        this.book = new Book("", "");
    }
    this.answer = antwoord;
}

FotoVraag.prototype.getHTML = function () {
    var correct1 = "data-correct=false";
    var correct2 = "data-correct=false";
    var correct3 = "data-correct=false";

    if (this.answer == 1) {
        correct1 = "data-correct=true";
    } else if (this.answer == 2) {
        correct2 = "data-correct=true";
    } else if (this.answer == 3) {
        correct3 = "data-correct=true";
    }

    return '<div id="fotovraag">\
	<div id="vraag">' +
	this.vraagText +
	'</div>\
	<div id="antwoorden">\
		<div id="antwoord1" class="antwoord"' + correct1 + '><img class="antwoordFoto" src="' +
		this.foto1.image +
		'" alt="Afbeelding niet beschikbaar"><br/>' + this.foto1.animal.name + '</div>\
		<div id="antwoord2" class="antwoord"' + correct2 + '><img class="antwoordFoto" src="' +
		this.foto2.image +
		'" alt="Afbeelding niet beschikbaar"><br/>' + this.foto2.animal.name + '</div>\
		<div id="antwoord3" class="antwoord"' + correct3 + '><img class="antwoordFoto" src="' +
		this.foto3.image +
		'" alt="Afbeelding niet beschikbaar"><br/>' + this.foto3.animal.name + '</div>\
	</div>\
	<div class="info" id="wiki">' +
	this.info +
	'</div>\
	<div class="info" id="book">Boek: ' +
	this.book.title + ' door ' + this.book.author + '</div>\
	</div>';
}

TextVraag.prototype.getHTML = function () {

    var correct1 = "data-correct=false";
    var correct2 = "data-correct=false";
    var correct3 = "data-correct=false";

    if (this.answer == 1) {
        correct1 = "data-correct=true";
    } else if (this.answer == 2) {
        correct2 = "data-correct=true";
    } else if (this.answer == 3) {
        correct3 = "data-correct=true";
    }

    return
    '<div id="tekstvraag">\
	<div id="vraagZelf">\
		<div id="foto"><img src="' +
			this.vraagFoto +
		'" alt="Afbeelding niet beschikbaar" ></div>\
		<div id="vraag">' +
			this.vraagText +
		'</div>\
	</div>\
	<div id="antwoorden">\
		<div id="antwoord1" class="antwoord"' + correct1 + '>' +
			this.antwoord1 +
		'</div>\
		<div id="antwoord2" class="antwoord"' + correct2 + '>' +
			this.antwoord2 +
		'</div>\
		<div id="antwoord3" class="antwoord"' + correct3 + '>' +
			this.antwoord3 +
		'</div>\
	</div>\
	<div class="info" class="hidden" id="wiki">' +
		this.info +
	'</div>\
	<div class="info" class="hidden" id="book">Boek: ' +
	this.book.title + ' door ' + this.book.author + '</div>\
	</div>';
}

function makeQuestion(callback) {
    var animalInfo1, animalInfo2, animalInfo3;
    getAnimalInfo(getAnimal("bedreigd"), function (data1) {
        animalInfo1 = data1;
        getAnimalInfo(getAnimal("geen van beide"), function (data2) {
            animalInfo2 = data2;
            getAnimalInfo(getAnimal("geen van beide"), function (data3) {
                animalInfo3 = data3;
                getBook(animalInfo1.animal.name, function (book) {
                    // if (Math.random() < 0.5) {
                    console.log(new FotoVraag("vraagText", animalInfo1, animalInfo2, animalInfo3, "info", book, 1).getHTML());
                    callback(new FotoVraag("Selecteer de bedreigde diersoort?", animalInfo1, animalInfo2, animalInfo3, animalInfo1.description, book, 1).getHTML());
                    // }
                    // callback(new TextVraag("Selecteer de bedreigde diersoort?", animalInfo1.image, animalInfo1, animalInfo2, animalInfo3, animalInfo1.description, book, 1).getHTML());
                });
            });
        });
    });
}