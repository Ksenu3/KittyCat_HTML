
const homeView = document.getElementById("homeView");
const gameView = document.getElementById("gameView");
const tripsView = document.getElementById("tripsView");

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");

const buttonEasy = document.getElementById("buttonEasy");
const buttonHard = document.getElementById("buttonHard");

const questionPanel = document.getElementById("questionPanel");

const categoryTitle = document.getElementById("categoryTitle");
const difficultyTitle = document.getElementById("difficultyTitle");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");

const answerInput = document.getElementById("answerInput");
const checkButton = document.getElementById("checkButton");
const nextButton = document.getElementById("nextButton");
const feedback = document.getElementById("feedback");

const tripList = document.getElementById("tripList");

let selectedCategory = "";
let selectedDifficulty = "";
let currentQuestion = 0;
let score = 0;
let answered = false;


// TIETOVISAKYSYMYKSET

const questions = {

    catcoin: {

        helppo: [
            { question: "Mikä on Suomen pääkaupunki?", answer: ["helsinki"] },
            { question: "Kuinka monta päivää viikossa on?", answer: ["7", "seitsemän"] },
            { question: "Mikä eläin sanoo miau?", answer: ["kissa"] },
            { question: "Mikä on 5 + 5?", answer: ["10", "kymmenen"] },
            { question: "Mikä on Suomen kansalliseläin?", answer: ["karhu"] },
            { question: "Minkä värinen banaani yleensä on?", answer: ["keltainen"] },
            { question: "Mikä planeetta on kotiplaneettamme?", answer: ["maa"] },
            { question: "Kuinka monta jalkaa hämähäkillä on?", answer: ["8", "kahdeksan"] },
            { question: "Mikä on maailman suurin maa pinta-alaltaan?", answer: ["venäjä"] },
            { question: "Mikä on joulukuun viimeinen päivä?", answer: ["31.12.", "31.12", "31 joulukuuta"] },
            { question: "Mikä on veden kemiallinen kaava?", answer: ["h2o"] },
            { question: "Mikä eläin on tunnettu pitkästä kaulastaan?", answer: ["kirahvi"] },
            { question: "Kuinka monta vuodenaikaa Suomessa on?", answer: ["4", "neljä"] },
            { question: "Mikä on Suomen valuutta?", answer: ["euro", "euroa"] },
            { question: "Millä aistilla kuuntelemme musiikkia?", answer: ["kuulo", "korvilla"] },
            { question: "Mikä on punaisen ja sinisen sekoitusväri?", answer: ["violetti", "liila"] },
            { question: "Mikä lintu ei osaa lentää ja elää Etelämantereella?", answer: ["pingviini"] },
            { question: "Mikä on 12 - 5?", answer: ["7", "seitsemän"] },
            { question: "Mikä hedelmä tunnetaan oranssista väristään?", answer: ["appelsiini"] },
            { question: "Kuinka monta kuukautta vuodessa on?", answer: ["12", "kaksitoista"] }
        ],

        vaikea: [
            { question: "Mikä on Australian pääkaupunki?", answer: ["canberra"] },
            { question: "Mikä on maailman suurin valtameri?", answer: ["tyyni valtameri", "tyyni"] },
            { question: "Missä maassa sijaitsee Machu Picchu?", answer: ["peru"] },
            { question: "Mikä on Japanin valuutta?", answer: ["jeni", "jen"] },
            { question: "Mikä on maailman korkein vuori?", answer: ["mount everest", "everest"] },
            { question: "Mikä on Kanadan pääkaupunki?", answer: ["ottawa"] },
            { question: "Missä maassa pyramideja sijaitsee Gizassa?", answer: ["egypti"] },
            { question: "Mikä planeetta tunnetaan punaisena planeettana?", answer: ["mars"] },
            { question: "Mikä on maailman suurin aavikko?", answer: ["antarktis", "antarktinen aavikko"] },
            { question: "Kuinka monta sydäntä mustekalalla on?", answer: ["3", "kolme"] },
            { question: "Mikä on Italian pääkaupunki?", answer: ["rooma"] },
            { question: "Mikä on kemiallinen merkki kullalle?", answer: ["au"] },
            { question: "Mikä on maailman pienin valtio?", answer: ["vatikaani"] },
            { question: "Mikä on Brasilian virallinen kieli?", answer: ["portugali"] },
            { question: "Mikä on Egyptin pääkaupunki?", answer: ["kairo"] },
            { question: "Mikä on aurinkokuntamme suurin planeetta?", answer: ["jupiter"] },
            { question: "Mikä on Sveitsin pääkaupunki?", answer: ["bern"] },
            { question: "Mikä on maailman pisin joki perinteisen yleiskäsityksen mukaan?", answer: ["niili"] },
            { question: "Missä kaupungissa sijaitsee Eiffel-torni?", answer: ["pariisi"] },
            { question: "Mikä on Etelä-Korean pääkaupunki?", answer: ["seoul", "soul"] }
        ]
    },

    matkat: {

        helppo: [
            { question: "Mikä on Suomen pääkaupunki?", answer: ["helsinki"] },
            { question: "Missä maassa sijaitsee Pariisi?", answer: ["ranska"] },
            { question: "Mikä on Ruotsin pääkaupunki?", answer: ["tukholma"] },
            { question: "Missä maassa sijaitsee Rooma?", answer: ["italia"] },
            { question: "Mikä on Espanjan pääkaupunki?", answer: ["madrid"] },
            { question: "Missä maassa sijaitsee Lontoo?", answer: ["englanti", "iso-britannia", "yhdistynyt kuningaskunta"] },
            { question: "Mikä on Saksan pääkaupunki?", answer: ["berliini"] },
            { question: "Missä maassa sijaitsee Tokio?", answer: ["japani"] },
            { question: "Mikä on Norjan pääkaupunki?", answer: ["oslo"] },
            { question: "Missä maassa sijaitsee Barcelona?", answer: ["espanja"] },
            { question: "Mikä valuutta on käytössä Suomessa?", answer: ["euro", "euroa"] },
            { question: "Mikä on Tanskan pääkaupunki?", answer: ["kööpenhamina"] },
            { question: "Missä maassa sijaitsee New York?", answer: ["yhdysvallat", "usa", "yhdysvallat"] },
            { question: "Mikä on Kreikan pääkaupunki?", answer: ["ateena"] },
            { question: "Mikä on Islannin pääkaupunki?", answer: ["reykjavik", "reykjavík"] },
            { question: "Missä maassa sijaitsee Amsterdam?", answer: ["hollanti", "alankomaat"] },
            { question: "Mikä on Portugalin pääkaupunki?", answer: ["lissabon"] },
            { question: "Missä maassa sijaitsee Berliini?", answer: ["saksa"] },
            { question: "Mikä on Viron pääkaupunki?", answer: ["tallinna"] },
            { question: "Missä maassa sijaitsee Wien?", answer: ["itävalta"] }
        ],

        vaikea: [
            { question: "Mikä on Australian pääkaupunki?", answer: ["canberra"] },
            { question: "Mikä on maailman suurin valtameri?", answer: ["tyyni valtameri", "tyyni"] },
            { question: "Missä maassa sijaitsee Machu Picchu?", answer: ["peru"] },
            { question: "Mikä on Uuden-Seelannin pääkaupunki?", answer: ["wellington"] },
            { question: "Mikä on Etelä-Afrikan hallinnollinen pääkaupunki?", answer: ["pretoria"] },
            { question: "Mikä on Argentiinan pääkaupunki?", answer: ["buenos aires"] },
            { question: "Missä maassa sijaitsee Petra?", answer: ["jordania"] },
            { question: "Mikä on Marokon pääkaupunki?", answer: ["rabat"] },
            { question: "Mikä on Thaimaan pääkaupunki?", answer: ["bangkok"] },
            { question: "Missä maassa sijaitsee Angkor Wat?", answer: ["kambodža", "kambodza"] },
            { question: "Mikä on Meksikon pääkaupunki?", answer: ["méxico", "mexico", "mexico city"] },
            { question: "Mikä on Chilen pääkaupunki?", answer: ["santiago"] },
            { question: "Missä maassa sijaitsee Istanbul?", answer: ["turkki"] },
            { question: "Mikä on Intian pääkaupunki?", answer: ["new delhi", "delhi"] },
            { question: "Mikä on Kenian pääkaupunki?", answer: ["nairobi"] },
            { question: "Missä maassa sijaitsee Dubrovnik?", answer: ["kroatia"] },
            { question: "Mikä on Irlannin pääkaupunki?", answer: ["dublin"] },
            { question: "Mikä on Perun pääkaupunki?", answer: ["lima"] },
            { question: "Missä maassa sijaitsee Kilimanjaro?", answer: ["tansania"] },
            { question: "Mikä on Vietnamin pääkaupunki?", answer: ["hanoi"] }
        ]
    }
};


// MENNEET MATKAT

const trips = [
    {
        destination: "Pariisi",
        country: "Ranska 🇫",
        date: "12.5.2025",
        status: "Matkustettu"
    },
    {
        destination: "Lontoo",
        country: "Iso-Britannia 🇧",
        date: "20.7.2025",
        status: "Matkustettu"
    },
    {
        destination: "Rooma",
        country: "Italia 🇮",
        date: "5.9.2025",
        status: "Matkustettu"
    },
    {
        destination: "Tokio",
        country: "Japani 🇯",
        date: "10.10.2025",
        status: "Matkustettu"
    }
];


// NÄYTETÄÄN MENNEET MATKAT

function showTrips() {

    tripList.innerHTML = "";

    trips.forEach(function(trip) {

        const card = document.createElement("div");
        card.className = "trip-card";

        card.innerHTML = `
            <div class="trip-icon">️</div>

            <div class="trip-info">
                <h3>${trip.destination}</h3>
                <p>${trip.country}</p>
                <p> ${trip.date}</p>
            </div>

            <div class="trip-status">
                ${trip.status}
            </div>
        `;

        tripList.appendChild(card);

    });

}


// ETUSIVU

function showHome() {

    homeView.classList.remove("hidden");
    gameView.classList.add("hidden");
    tripsView.classList.add("hidden");
    questionPanel.classList.add("hidden");

}


// CATCOIN

button1.addEventListener("click", function() {

    selectedCategory = "catcoin";

    homeView.classList.add("hidden");
    tripsView.classList.add("hidden");
    gameView.classList.remove("hidden");

    questionPanel.classList.add("hidden");

});


// MATKAT

button2.addEventListener("click", function() {

    homeView.classList.add("hidden");
    gameView.classList.add("hidden");
    tripsView.classList.remove("hidden");

    showTrips();

});


// TAKAISIN

button3.addEventListener("click", function() {

    showHome();

});


// HELPPO

buttonEasy.addEventListener("click", function() {

    startQuiz("helppo");

});


// VAIKEA

buttonHard.addEventListener("click", function() {

    startQuiz("vaikea");

});


// ALOITETAAN TIETOVISA

function startQuiz(difficulty) {

    selectedDifficulty = difficulty;
    currentQuestion = 0;
    score = 0;

    questionPanel.classList.remove("hidden");

    categoryTitle.textContent = " Catcoin";

    difficultyTitle.textContent =
        difficulty === "helppo" ? "Helppo" : "Vaikea";

    showQuestion();

}


// NÄYTETÄÄN KYSYMYS

function showQuestion() {

    const questionList =
        questions[selectedCategory][selectedDifficulty];

    const question = questionList[currentQuestion];

    questionNumber.textContent =
        "Kysymys " + (currentQuestion + 1) +
        " / " + questionList.length;

    questionText.textContent = question.question;

    answerInput.value = "";
    answerInput.disabled = false;
    answerInput.classList.remove("hidden");

    feedback.textContent = "";

    checkButton.classList.remove("hidden");
    nextButton.classList.add("hidden");

    answered = false;

}


// TARKISTETAAN VASTAUS

function checkAnswer() {

    if (answered) return;

    const questionList =
        questions[selectedCategory][selectedDifficulty];

    const question = questionList[currentQuestion];

    const userAnswer =
        answerInput.value.trim().toLowerCase();

    if (userAnswer === "") {

        feedback.textContent = "Kirjoita ensin vastaus!";
        feedback.style.color = "white";

        return;
    }

    const correct = question.answer.some(function(answer) {

        return answer.toLowerCase() === userAnswer;

    });

    answered = true;

    if (correct) {

        score++;

        feedback.textContent = " Oikein! Hienosti tehty!";
        feedback.style.color = "#baffba";

    } else {

        feedback.textContent =
            "Väärin! Oikea vastaus: " +
            question.answer[0];

        feedback.style.color = "#ffe0e0";

    }

    answerInput.disabled = true;

    checkButton.classList.add("hidden");
    nextButton.classList.remove("hidden");

    nextButton.textContent =
        currentQuestion === questionList.length - 1
            ? "Lopeta kysymykset"
            : "Seuraava kysymys →";

}


// TARKISTA-NAPPI

checkButton.addEventListener("click", checkAnswer);


// ENTER TARKISTAA

answerInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        checkAnswer();
    }

});


// SEURAAVA KYSYMYS

nextButton.addEventListener("click", function() {

    const questionList =
        questions[selectedCategory][selectedDifficulty];

    currentQuestion++;

    if (currentQuestion < questionList.length) {

        showQuestion();

    } else {

        questionNumber.textContent = "Peli suoritettu!";

        questionText.textContent =
            " Onneksi olkoon!";

        answerInput.classList.add("hidden");
        checkButton.classList.add("hidden");
        nextButton.classList.add("hidden");

        feedback.textContent =
            "Sait " + score + " / " + questionList.length +
            " pistettä! Hienosti pelattu! ";

        feedback.style.color = "#baffba";

    }

});
