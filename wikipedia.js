function AnimalInfo(image, description, animal) {
    this.image = image;
    this.description = description;
    this.animal = animal;
}

function testMethod() {
    getAnimalInfo(new Animal("", "", "ursus arctos", ""), function (animalInfo) {
        console.log("Image: " + animalInfo.image);
        console.log("Description: " + animalInfo.description);
    });
}

function getAnimalInfo(animal, callback) {
    $.getJSON("http://en.wikipedia.org/w/api.php?format=json&action=query&titles=" + animal.latinname + "&list=allimages&export&callback=?", function (data) {
        var xml = $.parseXML(data.query.export["*"]);
        try {
            var content = xml.getElementsByTagName("text")[0].textContent;
            var redirect = "\#REDIRECT";
            if (content.substring(0, redirect.length) === redirect) {
                getAnimalInfo(
                new Animal(
                    animal.UID,
                    animal.name,
                    content.replace("]]", "").replace("#REDIRECT [[", ""),
                    animal.category
                )
            , callback);
            } else {
                var first = content.indexOf("\n\n") + 2;
                var description = content.substring(first, content.indexOf("\n\n", first + 1));
                var first = content.indexOf("| image=") + 8;
                var second = content.indexOf("| image = ") + 10;
                if (second > first)
                    first = second;

                var image = content.substring(first, content.indexOf("\n", first + 1));

                // Parse the content: remove wikipedia links etc
                description = description.replace(/\[\[/g, "").replace(/\]\]/g, "").replace(/\'\'\'/g, "\"").replace(/\'\'/g, "\'");
                description = description.replace(/\<ref name \=.*\/\>/g, "").replace(/\<ref name \=.*\>.*\<\/ref\>/g, "");
                //content = content.replace(/\{\{convert\|(.*)\|(.*)\|.*\}\}/g, "%1%2");

                $.getJSON("http://en.wikipedia.org/w/api.php?format=json&action=query&titles=Image:" + image + "&prop=imageinfo&iiprop=url&callback=?", {}, function (data) {
                    if (typeof data.query.pages[-1].imageinfo !== "undefined")
                        callback(new AnimalInfo(data.query.pages[-1].imageinfo[0].url, description, animal));
                    else
                        callback(new AnimalInfo("", description, animal));
                });
            }
        } catch (err) {
            callback(new AnimalInfo("", "", animal));
        }
    });
}