const startButton = document.querySelector('.start_button');
const gameContainer = document.getElementById('gameContainer')
const ITEMS_COUNT = 16;
let imagesIds = [];
let prevSelectedElem;
let selectedImagesIds = [];

function onClickCard(event) {
    let imageId = event.target.dataset.image;
    event.target.classList.remove('unresolved');
    
    if (selectedImagesIds.length === 0) {
        prevSelectedElem = event.target;
        return selectedImagesIds.push(imageId);
    } else if (selectedImagesIds[0] && selectedImagesIds[0] === imageId) {
        setTimeout(function() { alert("Match!"); }, 2000);

        setTimeout(function () {
            event.target.classList.add('resolved');
            prevSelectedElem.classList.add('resolved');
        }, 1000)
    } else if (selectedImagesIds[0] && selectedImagesIds[0] !== imageId) {
        selectedImagesIds = [];
        setTimeout(function () {
            event.target.classList.add('unresolved');
            prevSelectedElem.classList.add('unresolved');
        }, 1000)
    }
}

/**
 * Funkcja generuje jedna karte wraz z klasami oraz event listenerem
 * @param {Integer} index 
 */
function addCard(index) {
    var containerCard = document.createElement('div');
    var image = document.createElement('img');
    containerCard.classList.add('card');
    containerCard.classList.add('unresolved');

    image.src = 'https://unsplash.it/150/150?image=' + imagesIds[index];

    containerCard.dataset.image = imagesIds[index];
    containerCard.appendChild(image);
    gameContainer.appendChild(containerCard);

    containerCard.addEventListener('click', onClickCard)
}

/**
 * Funkcja generuje i osadza w DOM zadana liczbe kart do gry
 */
function createCards() {
    for(var i = 0; i < ITEMS_COUNT; i++) {
        addCard(i);
    }
}

/**
 * Losowanie wartosci Id dla obrazka w przedziale od 1 do 500
 */
function randomImageId() {
    return Math.floor(1 + (Math.random() * 1000) % 499);
}

/**
 * Funkcja mieszajaca kolejnoscia elementy w tablicy
 * @param {Array} a
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function duplicateArray(arr) {
    return arr.concat(arr.slice());
}

function randomImages() {
    for (var i = 0; i < ITEMS_COUNT / 2; i++) {
        var id;
        
        do {
            id = randomImageId();
        } while (imagesIds.indexOf(id) >= 0)

        imagesIds.push(id);
    }

    imagesIds = duplicateArray(imagesIds);
    shuffle(imagesIds);
}

startButton.addEventListener('click', function () {
    randomImages();
    createCards();
})