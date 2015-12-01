//create prototype
var Cat = function(name, imageURL) {
    var obj = Object.create(Cat.prototype);
    obj.name = name;
    obj.imageURL = imageURL;
    obj.score = 0;
    return obj;
};

Cat.prototype.clicker = function () {
        this.score += 1;
        //document.getElementById(this.name + "Score").textContent = this.score;
    }

var cat1 = Cat("Shelly", "images/cat1.jpg");

var cat1NameHTML = document.getElementById('cat1Name');
cat1NameHTML.textContent = cat1.name;

var cat1ScoreHTML = document.getElementById('cat1Score');
cat1ScoreHTML.textContent = 'Number of Clicks: ' + cat1.score;

var cat1URLHTML = document.getElementById('cat1URL');
cat1URLHTML.src = cat1.imageURL;

cat1URLHTML.addEventListener('click', function(e) {
	cat1.clicker();
	cat1ScoreHTML.textContent = 'Number of Clicks: ' + cat1.score;
}, false);


var cat2 = Cat("Kelly", "images/cat2.jpg");

var cat2NameHTML = document.getElementById('cat2Name');
cat2NameHTML.textContent = cat2.name;

var cat2ScoreHTML = document.getElementById('cat2Score');
cat2ScoreHTML.textContent = 'Number of Clicks: ' + cat2.score;

var cat2URLHTML = document.getElementById('cat2URL');
cat2URLHTML.src = cat2.imageURL;

cat2URLHTML.addEventListener('click', function(e) {
	cat2.clicker();
	cat2ScoreHTML.textContent = 'Number of Clicks: ' + cat2.score;
}, false);




/*var catDivMaker = function(catItem) {
    var catCode;
    var divOpen = '<div id="' + catItem.name + '">';
    var nameHeader = '<h3>' + catItem.name + '</h3>';
    var score = '<h3 id="' + catItem.name + 'Score">0</h3>';
    var image = '< a href = "#" >
        < img id = "'cat1'"
    src = "images/cat1.jpg" / >
        < /a>

}*/



/*var score = 0;

document.getElementById('score').textContent = score;

var cat = document.getElementById('cat');

cat.addEventListener('click', function() {

    score = score + 1;
    document.getElementById('score').textContent = score;


}, false);*/
