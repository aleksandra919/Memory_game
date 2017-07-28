document.addEventListener("DOMContentLoaded", function() {
var startButton = document.querySelector('.start_button');
var gameContainer = document.querySelector('.game_container');
var item_count = 16; 
var imagesIds = [];
var selectImagesIds = []; 


//    <!--<div class="card unresolved">
//         <img src="https://unsplash.it/200/200?image=123" alt="karta">
//       </div>-->

function onClickCard(event) {
    event.target.classList.remove('unresolved');

    if (selectImagesIds.length === 0) {
        return selectImagesIds.push(imageId);
    } else if (selectImagesIds[0] && selectImagesIds[0] === imageId) {
        alert('match');
        setTimeout(function ( {
            
        })
        event.target.classList.add('resolved');

    }
}


function addCard (index) {
    var containerCard = document.createElement('div');
    var image = document.createElement('img');

    containerCard.classList.add('card');
    containerCard.classList.add('unresolved');

    //add src to img 
    image.src = "https://unsplash.it/200/200?image=" + imagesIds[index];

    //dodaje data imges 
    containerCard.dataset.image = imagesIds[index];
    containerCard.appendChild(image);
    gameContainer.appendChild(containerCard);
    containerCard.addEventListener('clik', onClickCard);
}

function createCards() {
    for (var i=0; i < item_count; i++) {
            addCard(i);
    }
}

function randomImageId() {
    return Math.floor(1 + (Math.random() * 1000) % 499);
}


function shuffle(a) {
    var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
}

// dupikujemy tablice zeby miec po dwa id 
function duplicateArray(arr){
    return arr.concat(arr.slice());
}

function randomImages() {
    for (var i = 0; i < item_count / 2; i++) {
        var id;
        
        do {
            id = randomImageId();
        } while (imagesIds.indexOf(id) >= 0);

        imagesIds.push(id);
    }

    imagesIds = duplicateArray(imagesIds);
    shuffle(imagesIds);
}


    startButton.addEventListener('click', function () {
        randomImages();
        createCards();
    })
});

