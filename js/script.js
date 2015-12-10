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
        //set our current cat to the first one in the list
        model.currentCat = model.bigList[0];
        viewP1.init();
        viewP2.init();
    },

    catTicker: function(i) {
        return model.bigList[i];

    },

    score: function() {
        model.currentCat.score += 1;
        return model.currentCat.score;

    },

    load: function(catObject) {
        model.currentCat = catObject;
        viewP2.render(model.currentCat);

    },

    currentCat: function() {
        return model.currentCat;
    }
};


var viewP1 = {

    init: function() {
        this.listHTML = document.getElementById('list');
        this.render();
    },

    render: function() {
        for (i = 0; i < 5; i++) {
            var catListItem = document.createElement('li');
            var cat = octopus.catTicker(i);
            catListItem.textContent = cat.name;
            this.listHTML.appendChild(catListItem);
            var currentListItem = this.listHTML.lastChild;
            currentListItem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.load(catCopy);
                }
            })(cat));
        }
    }
};


var viewP2 = {

    init: function() {
        this.nameHTML = document.getElementById('name');
        this.scoreHTML = document.getElementById('score');
        this.imageURLHTML = document.getElementById('imageURL');

        this.imageURLHTML.addEventListener('click', function(e) {
            var newScore = octopus.score();
            //console.log(this);
            viewP2.scoreHTML.textContent = 'Number of Clicks: ' + newScore;
        });

        this.render(octopus.currentCat());
    },

    render: function(currentCat) {
        this.nameHTML.textContent = currentCat.name;
        this.scoreHTML.textContent = 'Number of Clicks: ' + currentCat.score;
        this.imageURLHTML.src = currentCat.imageURL;

    }
};


octopus.init();
