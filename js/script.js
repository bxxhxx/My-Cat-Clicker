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
    bigList: [],
    admin: false
};


var octopus = {

    init: function() {
        model.init();
        //set our current cat to the first one in the list
        model.currentCat = model.bigList[0];
        viewP1.init();
        viewP2.init();
        viewP3.init();
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
        viewP3.render();

    },

    currentCat: function() {
        return model.currentCat;
    },

    getAdmin: function() {
        return model.admin;
    },

    setAdmin: function(boolean) {
        model.admin = boolean;
        console.log(boolean);
    },

    update: function() {
        //console.log(viewP3.formNameHTML.value);
        model.currentCat.name = viewP3.formNameHTML.value;
        model.currentCat.imageURL = viewP3.formImgURLHTML.value;
        model.currentCat.score = parseInt(viewP3.formClicksHTML.value, 10);
    }
};


var viewP1 = {

    init: function() {
        this.listHTML = document.getElementById('list');
        this.render();
    },

    render: function() {
        this.listHTML.innerHTML = '';
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
            viewP3.render();
        });

        this.render(octopus.currentCat());
    },

    render: function(currentCat) {

        var currentCat = octopus.currentCat();
        this.nameHTML.textContent = currentCat.name;
        this.scoreHTML.textContent = 'Number of Clicks: ' + currentCat.score;
        this.imageURLHTML.src = currentCat.imageURL;


    }
};

var viewP3 = {

    init: function() {
        this.adminHTML = document.getElementById('admin');
        this.adminFormHTML = document.getElementById('adminForm');
        this.formNameHTML = document.getElementById('formName');
        this.formImgURLHTML = document.getElementById('formImgURL');
        this.formClicksHTML = document.getElementById('formClicks');
        this.cancelHTML = document.getElementById('cancel');
        this.saveHTML = document.getElementById('save');
        this.adminHTML.addEventListener('click', function(e) {
            octopus.setAdmin(true);
            viewP3.render();

        });
        this.cancelHTML.addEventListener('click', function(e) {
            octopus.setAdmin(false);
            viewP3.render();
            e.preventDefault();

        });
        this.saveHTML.addEventListener('click', function(e) {

            octopus.update();
            octopus.setAdmin(false);
            viewP3.render();
            viewP2.render();
            viewP1.render();
            //preventDefault();
            //stopPropagation();
            //console.log("help");
            e.preventDefault();
        }, false);


        this.render();

    },

    render: function() {
        this.formNameHTML.value = octopus.currentCat().name;
        this.formImgURLHTML.value = octopus.currentCat().imageURL;
        this.formClicksHTML.value = octopus.currentCat().score;
        if (octopus.getAdmin() === true) {
            this.adminFormHTML.style.display = "block";

        } else {
            this.adminFormHTML.style.display = "none";

        }
    }
};


octopus.init();
