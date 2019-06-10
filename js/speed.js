// DOM Elements
const wordInput = document.querySelector('#wordInput');
const currentWord = document.querySelector('#text');
const scoreDisplay = document.querySelector('#score');
const timer = document.querySelector('#timer');
const msg = document.querySelector('#msg');
const seconds = document.querySelector('#seconds');
const checkedLevel = document.querySelectorAll('#level');
const bestScore = document.querySelector('#bestScore');

// Init SpeechSynth API
const synth = window.speechSynthesis;

// On load function
window.addEventListener('load', ()=>{

    // show level
    seconds.innerHTML = currentLevel;

    // Load word from Array
    showWord(words);
    
    // StartMatch
    wordInput.addEventListener('input', startMatch);

    // Timmer
    setInterval(countDown, 1000);

    // Check progress
    setInterval(checkStatus, 50);

    // set High Score
    setInterval(setBestScore, 50)

});


// ====== GLOBAL VARIABLES ============

// Best Score;
window.localStorage.setItem('highScore', 0);

// Init voices Array
let voices= [];

// get voice ONE
const getVoiceA = (speakTextA) => {
      
    voices = synth.getVoices();
    
      // Loop throught voices
    voices.forEach( voice => {
        
    if(voice.name === "Microsoft David Desktop - English (United States)"){
        speakTextA.voice = voice;
    }

    });

};

// Get voice TWO
const getVoiceB = (speakTextB) => {
      
    voices = synth.getVoices();
    
    // Loop throught voices
    voices.forEach( voice => {
    
    if(voice.name === "Microsoft Zira Desktop - English (United States)"){
        speakTextB.voice = voice;
    }

    });

};

// To cjange level
let currentLevel = 5;
let time = currentLevel;
let score = 0;
let isPlaying = false;

// set Level
function setLevel(){
       
   checkedLevel.forEach(radio=>{
       if(radio.checked){

           currentLevel = Number(radio.value);
           time = currentLevel;
           seconds.innerHTML = currentLevel;
       }
   })
}

// start match
function startMatch(){
    if (matchWords()){
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }

    // is score is -1, display 0
    if(score === -1){
        scoreDisplay.innerHTML = 0;
    }
    else{
        scoreDisplay.innerHTML = score;
    }
}

// Match words
function matchWords(){
    if (wordInput.value === currentWord.innerHTML){

        msg.className = 'correct';
        msg.value = 'Correct!!!';

        if(score === -1){
             // Get Speak Text
            const speakTextB = new SpeechSynthesisUtterance('Start');
            
            getVoiceB(speakTextB);
            // Speak
            synth.speak(speakTextB);
        }
        else{
            let say = score + 1
            // Get Speak Text
            const speakTextB = new SpeechSynthesisUtterance(say);

            getVoiceB(speakTextB);
            // Speak
            synth.speak(speakTextB);
        }
    
        isPlaying = true;
        return true;
    }
    
    else{
        msg.value = '';
        return false;
    }
}

// pick and show random word
const showWord = (words) => {
   
    const randIndex = Math.floor(Math.random() * words.length);
   
    currentWord.innerHTML = words[randIndex];
}

// Counter down timer
const countDown = () =>{

    if(time > 0){
        time--
    }
    timer.innerHTML = time;
}

// checkStatus
const checkStatus = () =>{

    if ( isPlaying && time === 0 ) {
        msg.className = 'gameOver';
        msg.value = 'Game Over!!';
        
        // Get Speak Text
        const speakTextA = new SpeechSynthesisUtterance(msg.value);      
        
        // Get voice
        getVoiceA(speakTextA);

        // Speak
        synth.speak(speakTextA);

        score = -1;

        isPlaying = false;
    }
}

// Set Best Score
const setBestScore = () =>{

    let highScore = window.localStorage.getItem('highScore');
    
    if (score > highScore){
        window.localStorage.setItem('highScore', score);
        bestScore.innerHTML = window.localStorage.getItem('highScore');
    }
}




// =========== END ==========
