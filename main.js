var startButton = document.querySelector('.start_button'); // wybieram elment HTML po klasie
var gameContainer = document.querySelector('.game_container');
var ITEMS_COUNT = 16; // Liczba elementow gry = wielkosc tablicy
var imagesIds = []; // Tablica przetrzumujaca wylosowane ID wykorzystane w grze
var prevSelectedElem; // Poprzednio wybrany element DOM
var selectedImagesIds = []; // Tabliac wybranych elementow

function onClickCard(event) {
    var imageId = event.target.dataset.image; // pobierz id wybranego obrazka
    event.target.classList.remove('unresolved'); // usun classe unresolved
    
    //jezeli jest to pierwszy wybrany obrazek
    if (selectedImagesIds.length === 0) {
        prevSelectedElem = event.target; // pobierz klikniety element i zapisujemy go
        return selectedImagesIds.push(imageId); // dodaj id obrazka do listy obrazow wybranych(do naszej tablicy wybranoch elementow)
    } else if (selectedImagesIds[0] && selectedImagesIds[0] === imageId) {
        // Jezeli wczesniej byl wybrany juz obraz ( selectedImagesIds[0] )
        // I id obrazka poprzedniego i aktualnie wybranego są rowne

        setTimeout(function() { alert("Match"); }, 2000);//wyswietl komunikat o poprawnym wyborze 

        setTimeout(function () {
            event.target.classList.add('resolved'); // dodaj klase do aktualnie wybranego
            prevSelectedElem.classList.add('resolved'); // dodaj klase do poprzednio wybranego
        }, 1000)
    } else if (selectedImagesIds[0] && selectedImagesIds[0] !== imageId) {
        // Jezeli wczesniej byl wybrany juz obraz ( selectedImagesIds[0] )
        // I id obrazka poprzedniego i aktualnie wybranego są rozne
        selectedImagesIds = []; // wyzeruj liste poprzednio wybranych obrazkow
        setTimeout(function () {
            event.target.classList.add('unresolved'); // dodaj klase do aktualnie wybranego
            prevSelectedElem.classList.add('unresolved');// dodaj klase do poprzednio wybranego
        }, 1000)
    }
}

/**
 * Funkcja generuje jedna karte
 * wraz z klasami
 * oraz event listenerem
 * @param {Integer} index 
 */
function addCard(index) {
    var containerCard = document.createElement('div'); // utworz kontener dla karty
    var image = document.createElement('img'); // utworz element DOM dla obrazka
    containerCard.classList.add('card'); // dodaj odpowiednie klasy
    containerCard.classList.add('unresolved'); // od poczatku karta jest w stanie 'unresolved'

    // dodajemy obrazek z wylosowanym id
    image.src = 'https://unsplash.it/150/150?image=' + imagesIds[index]; 

    containerCard.dataset.image = imagesIds[index]; // dodaj id do data set
    containerCard.appendChild(image); // dodaj DOM img do kontenera
    gameContainer.appendChild(containerCard); // dodaj kontener do pola gry

    containerCard.addEventListener('click', onClickCard);  // dodaj listener na klikniecie w karte ????
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
 * Losowanie wartosci Id dla obrazka
 * w przedziale od 1 do 500
 */
function randomImageId() {
    // Math.random() - zwraca wartosc od 0...1
    // Math.floor() - zaokragla wartosc w dol do najblizszej liczby calkowitej
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
    return arr.concat(arr.slice()); // polacz tablice (concat) arr z kopia samej siebie (slice)
}

function randomImages() {
    /**
     * Losujemy ID dla 8 obrazków (ITEMS_COUNT / 2)
     */    
    for (var i = 0; i < ITEMS_COUNT / 2; i++) {
        var id;
        
        do {
            id = randomImageId(); // losuj ID dla jednego obrazu
        } while (imagesIds.indexOf(id) >= 0); // sprawdz czy wczesniej nie zostal wylosowany ????

        imagesIds.push(id); // dodaj wylosowany id do listy
    }

    imagesIds = duplicateArray(imagesIds); // powielamy liste
    shuffle(imagesIds); // mieszamy kolejnoscia elementy w zduplikowanej liscie
}

/**
 * Start button on click handler
 */
startButton.addEventListener('click', function () {
    randomImages(); // Wylosuj obrazki do gry
    createCards(); // generuj karty
})


/*DODAC 
1. Zabezpieczenie kodu aby nie było możliwe wielokrotnie naciśnięcie przycisku "Start".
2. Zabezpieczenie aby nie można było wybrać innej karty w czasie 1 sek, podczas odliczania timer-a 
(setTimeout).
3. Zliczanie punktów (ruchów).
4. Możliwość zmiany wielkości tablicy do gry.
5. Odpowiednia wiadomość po odgadnięciu wszystkich kart.
*/
