
const db = [
    {
        id: 1,
        name: "Bomberman",
        image: "url(../images/games/bomberman.png)"
    },
    {
        id: 2,
        name: "Championship Manager",
        image: "url(../images/games/championship-manager.png)"
    },
    {
        id: 3,
        name: "FIFA",
        image: "url(../images/games/fifa.png)"
    },
    {
        id: 4,
        name: "Final Fantasy",
        image: "url(../images/games/final-fantasy.png)"
    },
    {
        id: 5,
        name: "Galaga",
        image: "url(../images/games/galaga.png)"
    },
    {
        id: 6,
        name: "Counter Strike",
        image: "url(../images/games/counter-strike.png)"
    },
    {
        id: 7,
        name: "League of Legends",
        image: "url(../images/games/league.png)"
    },
    {
        id: 8,
        name: "Metal gear Solid",
        image: "url(../images/games/metal-gear-solid.png)"
    },
    {
        id: 9,
        name: "MineSweeper",
        image: "url(../images/games/minesweeper.png)"
    },
    {
        id: 10,
        name: "Mortal Kombat",
        image: "url(../images/games/mortal-kombat.png)"
    },
    {
        id: 11,
        name: "Pokemon",
        image: "url(../images/games/pokemon.png)"
    },
    {
        id: 12,
        name: "Snake",
        image: "url(../images/games/snake.png)"
    },
    {
        id: 13,
        name: "Solitaire",
        image: "url(../images/games/solitaire.png)"
    },
    {
        id: 14,
        name: "Space Cadet",
        image: "url(../images/games/space-cadet.png)"
    },
    {
        id: 15,
        name: "Star Wars",
        image: "url(../images/games/star-wars.png)"
    },
    {
        id: 16,
        name: "Street Fighter",
        image: "url(../images/games/street-fighter.png)"
    },
    {
        id: 17,
        name: "Super Hang On",
        image: "url(../images/games/super-hang-on.png)"
    },
    {
        id: 18,
        name: "Super Mario 64",
        image: "url(../images/games/super-mario-64.png)"
    },
    {
        id: 19,
        name: "Tekken",
        image: "url(../images/games/tekken-3.png)"
    },
    {
        id: 20,
        name: "Tetris",
        image: "url(../images/games/tetris.png)"
    },
    {
        id: 21,
        name: "The Last of Us",
        image: "url(../images/games/the-last-of-us.png)"
    },
    {
        id: 22,
        name: "Tomb Raider",
        image: "url(../images/games/tomb-raider.png)"
    },
    {
        id: 23,
        name: "The Legend of Zelda",
        image: "url(../images/games/zelda.png)"
    }
]
// StackOverflow image preloader
function preloadImages(urls, allImagesLoadedCallback) {
    console.log('Loading');
    var loadedCounter = 0;
    var toBeLoadedNumber = urls.length;
    urls.forEach(function (url) {
        preloadImage(url, function () {
            loadedCounter++;
            console.log('Number of loaded images: ' + loadedCounter);
            if (loadedCounter == toBeLoadedNumber) {
                allImagesLoadedCallback();
            }
        });
    });
    function preloadImage(url, anImageLoadedCallback) {
        var img = new Image();
        img.onload = anImageLoadedCallback;
        img.src = url;
    }
}
//My part
const imgArr = (db) => {
    let imgArr = []
    db.forEach((element) => {
        imgArr.push(element.image.substring(7, element.image.length - 1))
    })
    imgArr.push("images/chest_close.png");
    imgArr.push("images/chest_open.png");
    return imgArr
}

// Let's call it:
preloadImages(imgArr(db), function () {
    console.log('All images were loaded');
});

const replay = () => {
    location.reload();
}

window.addEventListener("DOMContentLoaded", () => {
    const gameArea = document.getElementsByClassName("game__container")[0];
    const sideA = document.getElementById("sideA");
    const sideB = document.getElementById("sideB");
    const sideAM = document.getElementsByClassName("game__area")[0];
    const sideBM = document.getElementsByClassName("game__area")[1];
    const choiceCont = document.getElementById("choice_container");
    const coin = document.getElementById("coin__container")
    const bodyC = document.getElementsByTagName("body")[0];

    const dbGame1 = db.slice()
    let coinSound = new Audio("../sounds/coin-sound.mp3");
    let damageSound = new Audio("../sounds/damage.mp3");
    damageSound.volume = 0.1
    let choice = 0;



    const width = () => {
        let a = gameArea.clientWidth
        let b = 4;

        if (window.screen.width > 767) {
            b = 3.9
        }
        return a / b + "px";
    }

    const height = () => {
        let a = gameArea.clientHeight
        let b = 4;
        if (window.screen.width < window.screen.height) {
            b = 8
        }
        if (window.screen.width > 767) {
            b = 3.9
        }
        return a / b + "px";
    }

    const game = (dbGame) => {
        console.log(dbGame);
        let vs = [0, 0]
        const init = () => {
            console.log("init");
            choice = 0;
            modA();
            modB();
            fillChoices();
        }

        const randomGame = (dbarr) => {
            return Math.floor(Math.random() * dbarr.length);
        }

        const modA = () => {
            const indexArr = randomGame(dbGame)
            sideAM.style.backgroundImage = dbGame[indexArr].image
            vs[0] = dbGame[indexArr]
            dbGame.splice(indexArr, 1);
        }

        const modB = () => {
            const indexArr = randomGame(dbGame)
            sideBM.style.backgroundImage = dbGame[indexArr].image
            vs[1] = dbGame[indexArr]
            dbGame.splice(indexArr, 1);
        }

        const fillChoices = () => {
            for (i = 0; i < db.length - 1; i++) {
                choiceCont.insertAdjacentHTML('beforeend',
                    `<div id="choice_${i}" class="choice_frame">
                        <div class="white_circle"></div>
                </div>`)
            }
        }

        const modChoice = (choice) => {
            const temp = document.getElementById(`choice_${choice}`)
            const temp2 = document.getElementsByClassName("game__vs")[0]
            html2canvas(document.querySelector("#capture"), { backgroundColor: null }).then(canvas => {

                canvas.style.width = width()
                canvas.style.height = height()
                temp2.appendChild(canvas)
            });
            temp.childNodes[1].classList.add("white_circle_ani")
            temp.style.backgroundImage = "url(../images/chest_open.png)";
            temp.addEventListener("mouseover", () => {
                document.getElementsByTagName("canvas")[choice].style.display = "block"
            })
            temp.addEventListener("mouseout", () => {
                document.getElementsByTagName("canvas")[choice].style.display = "none"
            })
            if (choice > 5 && screen.width < 768) {
                choiceCont.scrollBy({
                    top: 0,
                    left: 20,
                    behavior: 'smooth'
                });
            }
            if (choice > 5 && screen.width < 768 && screen.height > 700) {
                choiceCont.scrollBy({
                    top: 0,
                    left: 35,
                    behavior: 'smooth'
                });
            }
            if (choice > 5 && screen.width > 768) {
                choiceCont.scrollBy({
                    top: 0,
                    left: 100,
                    behavior: 'smooth'
                });
            }
        }


        const tempOpa1 = (side) => {
            side.style.backgroundColor = "black"
            side.style.opacity = 0.4
        }

        const tempOpa2 = (side) => {
            side.style.backgroundColor = "transparent"
            side.style.opacity = 1

        }


        const winner = (vs) => {
            console.log("im in")
            document.getElementsByTagName("body")[0].insertAdjacentHTML('beforeend',
                `<div id="game__win__container">
                <div class="game__win">
                    <div class="game__win__title noselect">
                        <h2 class="main_h2">THE CHOSEN ONE </h2>
                        <h2 class="shadow_h2">THE CHOSEN ONE </h2>
                    </div>
                    <div class="option_frame">
                        <div class="game__winner"></div>
                    </div>
                    <p class="game__win__message"> ${vs.name}</p>
                    <div class="game__win__options">
                        <div class="game__win__options__gameover">
                            <div class="game__win__options__gameover_front">
                                <img src=".//images/box_gameover.png" alt="gameover" srcset="">
                            </div>
                            <div class="game__win__options__gameover_back">
                                <img onClick="replay()" src=".//images/box_playagain.png" alt="gameover" srcset="">
                            </div>
                        </div>
                        <div class="game__win__options__share">
                            <img src=".//images/box_share.png" alt="share" srcset="">
                        </div>
                    </div>
                </div>
            </div>`)
            document.getElementsByClassName("game__winner")[0].style.backgroundImage = vs.image

            sideB.removeEventListener('click', sideBEvent, true)
            sideA.removeEventListener('click', sideAEvent, true)

        }

        const toggleCoin = (side) => {
            coin.classList.toggle("movecoin");
            bodyC.classList.toggle("no-clicks");
            side.classList.toggle("damage");
            if (coin.classList.contains("movecoin")) {
                coinSound.play();
                setTimeout(() => damageSound.play(), 400);
            }
        }

        const sideAEvent = () => {
            console.log(dbGame.length);
            if (dbGame.length < 1) {
                toggleCoin(sideBM)
                tempOpa1(sideB);
                modChoice(choice);
                tempOpa2(sideB);
                setTimeout(() => toggleCoin(sideBM), 900);
                winner(vs[0]);
            }
            else {
                toggleCoin(sideBM);
                tempOpa1(sideB);
                modChoice(choice)
                tempOpa2(sideB);
                setTimeout(() => toggleCoin(sideBM), 900);
                setTimeout(() => modB(), 900);

                choice++;
            }
        }

        const sideBEvent = () => {
            if (dbGame.length < 1) {
                toggleCoin(sideAM)
                tempOpa1(sideA)
                modChoice(choice);
                tempOpa2(sideA)
                setTimeout(() => toggleCoin(sideAM), 900);
                winner(vs[1]);
            }
            else {
                toggleCoin(sideAM)
                tempOpa1(sideA)
                modChoice(choice);
                tempOpa2(sideA)
                setTimeout(() => toggleCoin(sideAM), 900);
                setTimeout(() => modA(), 1200);
                choice++;
            }
        }

        init();
        console.log(dbGame);
        sideA.addEventListener("click", sideAEvent);
        sideB.addEventListener("click", sideBEvent);



    }
    game(dbGame1);
})