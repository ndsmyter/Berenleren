var animals;

function Animal(UID, name, latinname, category){
	this.UID = UID;
	this.name = name;
	this.latinname = latinname;
	this.category = category;
}

function initAnimals(callback){
    $.getJSON("http://data.appsforflanders.be/biodiversity/endangered_species.jsonp?callback=?", null, function (data) {
	    animals = $.map(data.endangered_species, function(item, index){
			var category = null;
			if (item.belgium == 10){
				category = "uitgestorven";
			}else if (item.belgium >= 3 && item.belgium <= 7){
				category = "bedreigd";
			}else if (item.belgium == 1 || item.belgium == 0){
				category = "geen van beide";
			}
			if (category == null){
				return null;
			}else{
				return new Animal(index, item.name_nl, item.name, category);
			}
		});
		callback();
	});
}

var used = new Array();

function getAnimal(category){
	var animals_by_category = new Array();
	//$.each(animals, function(index, value){
	//	if (value.category == value){
	//		animals_by_category.push(value);
	//	}
    //});
	for (var i = 0; i < animals.length; ++i) {
	    var value = animals[i];
	    if (value.category == category){
	        animals_by_category.push(value);
	    }
	}
	var found = false;
	while (!found){
		var i = Math.floor((Math.random()*animals_by_category.length)+1);
		if (animals_by_category[i] != undefined && animals_by_category[i] != null &&
          $.inArray(animals_by_category[i].UID, used) == -1 &&
          animals_by_category[i].name != undefined && animals_by_category[i].latinname != undefined &&
          animals_by_category[i].name != "" && animals_by_category[i].latinname != "") {
			found = true;
			used.push(animals_by_category[i].UID);
			return animals_by_category[i];
		}
	}
}