var score = 0;

document.getElementById('score').textContent = score;

var cat = document.getElementById('cat');

cat.addEventListener('click', function() {

    score = score + 1;
    document.getElementById('score').textContent = score;


}, false);
