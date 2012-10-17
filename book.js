function Book(title, author) {
	this.title = title;
	this.author = author;
}

function getBook(name, callback) {
	getRelevantBooks(name, function(books) {
		if(books != undefined) {
			callback(books[0]);
		} else {
			getAllBooks(name, function(books2) {
				if(books2 != undefined) {
					callback(books2[0]);
				} else {
					callback(undefined);
				}
			});
		}
	});
}

// JSON query naar relevante NURS
function getRelevantBooks(name, callback) {
	$.getJSON("http://data.appsforflanders.be/boek/search.jsonp?zoektitel=%22" + name + "%22&nurs=223,253,430-436,886,942,949&callback=?", null, function(data) {
		if(data.search.total.total != 0) {
			callback($.map(data.search.products.product, function(item, index) {
					return new Book(item.titel.titel, item.auteur.auteur);
				}));
		} else {
			callback(undefined);
		}	
	});
}

// JSON query naar alle NURS
function getAllBooks(name, callback) {
	$.getJSON("http://data.appsforflanders.be/boek/search.jsonp?zoektitel=%22" + name + "%22&callback=?", null, function(data) {
		if(data.search.total.total != 0) {
			callback($.map(data.search.products.product, function(item, index) {
					return new Book(item.titel.titel, item.auteur.auteur);
				}));
		} else {
			callback(undefined);
		}	
	});
}