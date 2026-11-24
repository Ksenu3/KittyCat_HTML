
// Pelaajan aloitusrahat

let catCoins = 100;
let isTraveling = false;


// =======================
//      CATCOIN-NAPPI
// =======================

function showBalance() {

    if (isTraveling) return;

    const balance = document.getElementById("balance");
    const coinButton = document.getElementById("coinButton");

    balance.textContent = "CatCoinit: " + catCoins;

    balance.hidden = !balance.hidden;

    coinButton.setAttribute(
        "aria-expanded",
        String(!balance.hidden)
    );
}


// =======================
//      MAAN VALINTA
// =======================

function chooseCountry(country, button) {

    if (isTraveling) return;

    isTraveling = true;

    document.body.classList.add("traveling");

    document.querySelectorAll(".answer").forEach(btn => {

        btn.classList.remove("selected");
        btn.setAttribute("aria-pressed", "false");

    });

    button.classList.add("selected");
    button.setAttribute("aria-pressed", "true");

    document.getElementById("destination").textContent =
        "Matkustetaan: " + country;

    document.getElementById("balance").hidden = true;

    document.getElementById("coinButton")
        .setAttribute("aria-expanded", "false");

    startCloudAnimation(country);
}


// =======================
//    ANIMAATION ODOTUS
// =======================

function waitForAnimation(element) {

    return new Promise(resolve => {

        element.addEventListener(
            "animationend",
            resolve,
            { once: true }
        );

    });
}


// =======================
//      PILVIANIMAATIO
// =======================


async function startCloudAnimation(country) {

    const clouds = document.getElementById("cloudTransition");
    const flyer = document.getElementById("cloudFlyer");

    // Kopioidaan alkuperäinen Kitty
    const originalKitty = document.querySelector(".plane-svg");
    const flyingKitty = originalKitty.cloneNode(true);

    flyingKitty.innerHTML = flyingKitty.innerHTML.replace(
        /(id="|url\(#)(metal|wing|eye)/g,
        "$1flight-$2"
    );

    flyer.replaceChildren(flyingKitty);

    // Poistetaan vanhat animaatioluokat
    clouds.classList.remove("active", "exit");
    flyer.classList.remove("fly");

    clouds.style.animation = "none";
    flyer.style.animation = "none";

    clouds.style.visibility = "visible";
    clouds.style.pointerEvents = "auto";

    flyer.style.visibility = "hidden";

    // 1. Pilvet nousevat alhaalta
    await moveElement(
        clouds,
        "translateY(140%)",
        "translateY(0%)",
        1800,
        "ease-in-out"
    );

    // 2. Kitty lentää vaakasuoraan
    flyer.style.visibility = "visible";

    await moveElement(
        flyer,
        "translate(-100%, -50%)",
        "translate(100vw, -50%)",
        2800,
        "linear"
    );

    flyer.style.visibility = "hidden";

    // Päivitetään matkakohde
    document.getElementById("destination").textContent =
        "Valittu matkakohde: " + country;

    // 3. Pilvet jatkavat ylöspäin
    await moveElement(
        clouds,
        "translateY(0%)",
        "translateY(-160%)",
        2200,
        "ease-in-out"
    );

    // 4. Piilotetaan pilvet vasta liikkeen päätyttyä
    clouds.style.visibility = "hidden";
    clouds.style.pointerEvents = "none";
    clouds.style.transform = "translateY(140%)";

    document.body.classList.remove("traveling");

    isTraveling = false;
}


// Apufunktio animaatioiden liikuttamiseen
async function moveElement(element, from, to, duration, easing) {

    element.style.transform = from;

    const animation = element.animate(
        [
            { transform: from },
            { transform: to }
        ],
        {
            duration: duration,
            easing: easing,
            fill: "forwards"
        }
    );

    await animation.finished;

    element.style.transform = to;

    animation.cancel();
}

