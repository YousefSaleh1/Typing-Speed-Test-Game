//Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Setting Levels
const lvls = {
    'Easy': 6,
    'Normal': 4,
    'Hard': 2,
};

// Defult Level
let defultLevelName = 'Normal'; // Change Level From Here
let defultLevelSeconds = lvls[defultLevelName];

// Catch Selectors
let startButton   = document.querySelector('.start');
let lvlNameSpan   = document.querySelector('.message .lvl');
let secondsSpan   = document.querySelector('.message .secounds');
let theWord       = document.querySelector('.the-word');
let upcomingWords = document.querySelector('.upcoming-words');
let input         = document.querySelector('.input');
let timeLeftSpan  = document.querySelector('.time span');
let scoreGot      = document.querySelector('.score .got');
let scoreTotal    = document.querySelector('.score .total');
let finishMessage = document.querySelector('.finish');

// Setting Level Name + Secounds + Score
lvlNameSpan.innerHTML  = defultLevelName;
secondsSpan.innerHTML  = defultLevelSeconds;
timeLeftSpan.innerHTML = defultLevelSeconds;
scoreTotal.innerHTML   = words.length;

// Disable Paste Event
input.onpaste = function() {
    return false;
}

// Start Game
startButton.onclick = function () {
    this.remove();
    input.focus();
    // Generate Word Function
    generateWords();
}

function generateWords() {
    // Get Random Word From Array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    // Get Word Index
    let wordIndex = words.indexOf(randomWord);
    // Remove Word From Array
    words.splice(wordIndex, 1);
    // Show The Random Word
    theWord.innerHTML = randomWord;
    // Empty Upcomming Words
    upcomingWords.innerHTML = '';
    // Upcoming Words
    for (let i = 0; i < words.length; i++){
        // Create Div Element
        let div = document.createElement("div");
        let text = document.createTextNode(words[i]);
        div.appendChild(text);
        upcomingWords.appendChild(div);
    }
    // Call Start Play Function
    startPlay();
}

function startPlay() {
    timeLeftSpan.innerHTML = defultLevelSeconds;
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === '0') {
            // Stop Time
            clearInterval(start);
            // Compare Words
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                // Empty Input Field
                input.value = '';
                // Increase Score
                scoreGot.innerHTML++;
                if (words.length > 0){
                    // Call Generate Word Function
                    generateWords();
                }else{
                    let span = document.createElement('span');
                    span.className = 'good';
                    let spanText = document.createTextNode('');
                    span.appendChild(spanText);
                    finishMessage.appendChild(span);
                    // Remove Upcoming Words Box
                    upcomingWords.remove();
                }
            }else{
                let span = document.createElement('span');
                span.className = 'bad';
                let spanText = document.createTextNode('Game Over');
                span.appendChild(spanText);
                finishMessage.appendChild(span);
            }
        }
    }, 1000);
}