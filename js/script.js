$(function() {
            var model = {

                init: function() {

                    var Cat = function(name, imageURL) {
                        var obj = Object.create(Cat.prototype);
                        obj.name = name;
                        obj.imageURL = imageURL;
                        obj.score = 0;
                        return obj;
                    };

                    Cat.prototype.clicker = function() {
                        this.score += 1;
                    }

                    var catNames = ['Shelly', 'Kelly', 'Bob', 'Joe', 'Sweet'];

                    for (i = 0; i < 5; i++) {
                        var catImageURL = 'images/cat' + (i + 1) + '.jpg';
                        var nextCat = Cat(catNames[i], catImageURL);
                        this.bigList.push(nextCat);
                    }
                },

                currentCat: {},
                bigList: []
            };


            var octopus = {

                init: function() {
                    model.init();
                    view.init();
                },

                catTicker: function(i) {
                    return model.bigList[i].name;

                },

                score: function() {
                    model.currentCat.score += 1;
                    return model.currentCat.score;

                },

            load: function(arrayPosition) {
                model.currentCat = model.bigList[arrayPosition];
                view.load(model.currentCat);

            }
        };


        var view = {
            nameHTML: document.getElementById('name'),
            scoreHTML: document.getElementById('score'),
            imageURLHTML: document.getElementById('imageURL'),

            init: function() {
                var listHTML = document.getElementById('list');

                for (i = 0; i < 5; i++) {
                    var catListItem = document.createElement('li');
                    catListItem.textContent = octopus.catTicker(i);
                    listHTML.appendChild(catListItem);
                    var currentListItem = listHTML.lastChild;
                    currentListItem.addEventListener('click', (function(icopy) {
                        return function() {
                            octopus.load(icopy);
                        };
                    })(i));
                }

                this.imageURLHTML.addEventListener('click', function(e) {
                    var newScore = octopus.score();
                    //console.log(this);
                    view.scoreHTML.textContent = 'Number of Clicks: ' + newScore;
                });
            },

            load: function(currentCat) {
                //MIGRTE TO VIEW
                this.nameHTML.textContent = currentCat.name;

                this.scoreHTML.textContent = 'Number of Clicks: ' + currentCat.score;

                this.imageURLHTML.src = currentCat.imageURL;

            }

        };

        octopus.init();
    });
