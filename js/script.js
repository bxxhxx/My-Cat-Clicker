var model = {

    init: function() {
        //This is a Class constructor that will make a unique cat object
        //from a name and an imageURL
        var Cat = function(name, imageURL) {
            var obj = Object.create(Cat.prototype);
            obj.name = name;
            obj.imageURL = imageURL;
            obj.score = 0;
            return obj;
        };

        //This is a method that advances the score when it's called
        Cat.prototype.clicker = function() {
            this.score += 1;
        }

        //Arrays of names to creat our cat list
        var catNames = ['Shelly', 'Kelly', 'Bob', 'Joe', 'Sweet'];

        //This loop generates cat objects and pushes them to the cat array
        //called bigList
        for (i = 0; i < 5; i++) {
            //this line of code generates a unique string that describes
            //the file path for the picture
            var catImageURL = 'images/cat' + (i + 1) + '.jpg';
            //Creates each new cat using a cat name and a new imageURL
            var nextCat = Cat(catNames[i], catImageURL);
            //Pushes in the newly created nextCat in to the array of the bigList
            this.bigList.push(nextCat);
        }
    },

    //This is an object that will be used later to activate a clickable
    //current cat
    currentCat: {},
    //biglist is an array that holds all of our cat objects
    bigList: [],
    //This is a boolean that is used to show or hide the admin form
    admin: false
};


var octopus = {
    //starts the whole application
    init: function() {
        model.init();
        //set our current cat to the first one in the list
        model.currentCat = model.bigList[0];
        viewP1.init();
        viewP2.init();
        viewP3.init();
    },

    //this method grabs a cat object from a specific position from the
    //bigList array
    catTicker: function(i) {
        return model.bigList[i];

    },

    //this method advances the score by one in the current cat and
    //returns that value
    score: function() {
        model.currentCat.score += 1;
        return model.currentCat.score;

    },

    //it takes a given cat and makes it to current cat and rereders P2
    //and P3 with the current cat
    load: function(catObject) {
        model.currentCat = catObject;
        viewP2.render(model.currentCat);
        viewP3.render();

    },

    //current cat is a function that returns the current cat from the model
    currentCat: function() {
        return model.currentCat;
    },

    //it returns the current value of the admin
    getAdmin: function() {
        return model.admin;
    },

    //sets the admin to whatever the value (true or false)
    setAdmin: function(boolean) {
        model.admin = boolean;
        //console.log(boolean);
    },

    update: function() {
        //it updates the current cat to the value of the currently corresponding
        //form input
        model.currentCat.name = viewP3.formNameHTML.value;
        model.currentCat.imageURL = viewP3.formImgURLHTML.value;
        //parseInt converts numeral to JS number. ten(10) tells parseInt
        //to use human numbers
        model.currentCat.score = parseInt(viewP3.formClicksHTML.value, 10);
    }
};

//viewP1 is for the cat list
var viewP1 = {

    init: function() {
        //This code grabs the unordered list from the html
        this.listHTML = document.getElementById('list');
        this.render();
    },

    render: function() {
        //this line clears the visible list so we can refresh it
        this.listHTML.innerHTML = '';
        for (i = 0; i < 5; i++) {
            //creates new list element
            var catListItem = document.createElement('li');
            //this line request the next cat for the list
            var cat = octopus.catTicker(i);
            //inserts the cats name into the cat listItem
            catListItem.textContent = cat.name;
            //it attaches the new list item to the unordered list
            this.listHTML.appendChild(catListItem);
            //creates a connector to the last item attached
            var currentListItem = this.listHTML.lastChild;
            //And adds an event listener to that last item
            //This IIFE code attaches specific cat object to the click
            currentListItem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.load(catCopy);
                }
            })(cat));
        }
    }
};


//viewP2 contains the image section
var viewP2 = {

    init: function() {
        //this creates hooks to html and grabs various id's
        this.nameHTML = document.getElementById('name');
        this.scoreHTML = document.getElementById('score');
        this.imageURLHTML = document.getElementById('imageURL');

        //This event listener advances the click score for the current cat
        this.imageURLHTML.addEventListener('click', function(e) {
            //creates a new score by running the method score in octopus
            var newScore = octopus.score();
            //inserts a new score as a string into the score line of the html
            viewP2.scoreHTML.textContent = 'Number of Clicks: ' + newScore;
            //making the P3 current after a new score
            viewP3.render();
        });

        //request a render
        this.render();
    },

    render: function() {
        //requests the current cat
        var currentCat = octopus.currentCat();
        //inserts the right name into the dom
        this.nameHTML.textContent = currentCat.name;
        //inserts the right score into the dom
        this.scoreHTML.textContent = 'Number of Clicks: ' + currentCat.score;
        //inserts the right image path into the dom
        this.imageURLHTML.src = currentCat.imageURL;


    }
};

//viewP3 deals with admin section
var viewP3 = {

    init: function() {
        //this creates hooks to html and grabs various id's
        this.adminHTML = document.getElementById('admin');
        this.adminFormHTML = document.getElementById('adminForm');
        this.formNameHTML = document.getElementById('formName');
        this.formImgURLHTML = document.getElementById('formImgURL');
        this.formClicksHTML = document.getElementById('formClicks');
        this.cancelHTML = document.getElementById('cancel');
        this.saveHTML = document.getElementById('save');
        //It adds an event listener to admin so once it's clicked
        //it reveals the form
        this.adminHTML.addEventListener('click', function(e) {
            //request that admin set to true meaning to show
            octopus.setAdmin(true);
            //request a new render with the new setting
            viewP3.render();

        });
        //it adds an event listener to the cancel button so once it's clicked
        //it hides or cancel the form
        this.cancelHTML.addEventListener('click', function(e) {
            //request that admin set to hide
            octopus.setAdmin(false);
            viewP3.render();
            //blocks further action by the browser to reload on button click
            e.preventDefault();

        });
        //it adds an event listener to the save button, os once it's clicked
        this.saveHTML.addEventListener('click', function(e) {

            //this requests the octopus to push form data to model
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

        //the final step of initialization is to render
        this.render();

    },

    render: function() {
        //it puts the current cat data into the form (value)
        this.formNameHTML.value = octopus.currentCat().name;
        this.formImgURLHTML.value = octopus.currentCat().imageURL;
        this.formClicksHTML.value = octopus.currentCat().score;
        //hides or displayes the form based on admin value. if it's true
        //show(block), if not, don't
        if (octopus.getAdmin() === true) {
            this.adminFormHTML.style.display = "block";

        } else {
            this.adminFormHTML.style.display = "none";

        }
    }
};


//calls the initialization
octopus.init();
