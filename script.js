// DOM Elements
const inputText = document.getElementById('inputText');
const transformBtn = document.getElementById('transformBtn');
const exampleBtn = document.getElementById('exampleBtn');
const resultSection = document.getElementById('result');
const resultText = document.getElementById('resultText');
const listenBtn = document.getElementById('listenBtn');
const explainBtn = document.getElementById('explainBtn');
const storyBtn = document.getElementById('storyBtn');
const explanationSection = document.getElementById('explanation');
const explanationText = document.getElementById('explanationText');
const storySection = document.getElementById('story');
const storyText = document.getElementById('storyText');

// Wechselpräpositionen mapping (Accusative -> Dative)
const prepositionMappings = {
    'an den': 'an dem',
    'an die': 'an der',
    'an das': 'an dem',
    'auf den': 'auf dem',
    'auf die': 'auf der',
    'auf das': 'auf dem',
    'hinter den': 'hinter dem',
    'hinter die': 'hinter der',
    'hinter das': 'hinter dem',
    'in den': 'in dem',
    'in die': 'in der',
    'in das': 'in dem',
    'neben den': 'neben dem',
    'neben die': 'neben der',
    'neben das': 'neben dem',
    'über den': 'über dem',
    'über die': 'über der',
    'über das': 'über dem',
    'unter den': 'unter dem',
    'unter die': 'unter der',
    'unter das': 'unter dem',
    'vor den': 'vor dem',
    'vor die': 'vor der',
    'vor das': 'vor dem',
    'zwischen den': 'zwischen dem',
    'zwischen die': 'zwischen der',
    'zwischen das': 'zwischen dem'
};

// Verb transformations (motion -> state)
const verbTransformations = {
    'stelle': 'steht',
    'stellst': 'stehst',
    'stellt': 'steht',
    'stellen': 'stehen',
    'lege': 'liegt',
    'legst': 'liegst',
    'legt': 'liegt',
    'legen': 'liegen',
    'setze': 'sitzt',
    'setzt': 'sitzt',
    'setzen': 'sitzen',
    'hänge': 'hängt',
    'hängst': 'hängst',
    'hängt': 'hängt',
    'hängen': 'hängen',
    'tue': 'ist',
    'tust': 'bist',
    'tut': 'ist',
    'tun': 'sind'
};

// Example sentences
const exampleSentences = [
    'Ich stelle den Stuhl an den Tisch.',
    'Er legt das Buch auf den Tisch.',
    'Sie setzt das Kind in den Stuhl.',
    'Wir hängen das Bild an die Wand.',
    'Du stellst die Vase neben die Lampe.',
    'Ich lege den Schlüssel unter das Kissen.',
    'Er stellt das Auto vor das Haus.',
    'Sie legt die Decke über das Bett.',
    'Wir stellen den Schrank zwischen die Fenster.'
];

// Event Listeners
transformBtn.addEventListener('click', transformSentence);
exampleBtn.addEventListener('click', getRandomExample);
listenBtn.addEventListener('click', speakSentence);
explainBtn.addEventListener('click', showExplanation);
storyBtn.addEventListener('click', generateStory);

// Main transformation function
function transformSentence() {
    const sentence = inputText.value.trim();
    
    if (!sentence) {
        alert('Kérlek, írj be egy mondatot!');
        return;
    }
    
    let transformedSentence = sentence;
    
    // Transform prepositions + articles
    for (const [accusative, dative] of Object.entries(prepositionMappings)) {
        const regex = new RegExp(accusative, 'gi');
        transformedSentence = transformedSentence.replace(regex, dative);
    }
    
    // Transform verbs
    for (const [motionVerb, stateVerb] of Object.entries(verbTransformations)) {
        const regex = new RegExp(`\\b${motionVerb}\\b`, 'gi');
        transformedSentence = transformedSentence.replace(regex, stateVerb);
    }
    
    // Transform accusative articles to nominative
    transformedSentence = transformedSentence.replace(/\bden\b/gi, 'der');
    transformedSentence = transformedSentence.replace(/\bdie\b/gi, 'die');
    transformedSentence = transformedSentence.replace(/\bdas\b/gi, 'das');
    
    // Show result
    resultText.textContent = transformedSentence;
    resultSection.style.display = 'block';
    
    // Hide previous explanations/stories
    explanationSection.style.display = 'none';
    storySection.style.display = 'none';
}

// Get random example sentence
function getRandomExample() {
    const randomIndex = Math.floor(Math.random() * exampleSentences.length);
    inputText.value = exampleSentences[randomIndex];
}

// Text-to-speech functionality
function speakSentence() {
    const text = resultText.textContent;
    
    if (!text) {
        alert('Először alakítsd át a mondatot!');
        return;
    }
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    } else {
        alert('A böngésző nem támogatja a hangleirás funkciót.');
    }
}

// Show explanation
function showExplanation() {
    const explanation = `
        <strong>Wechselpräpositionen magyarázat:</strong><br><br>
        
        A német nyelvben a wechselpräpositionen (váltóragos előljárószók) akkuzatívuszt használnak, 
        amikor mozgást fejeznek ki (hová?), és datívuszt, amikor helyzetet vagy állapotot írnak le (hol?).<br><br>
        
        <strong>Példa:</strong><br>
        • "Ich <em>stelle</em> das Buch <em>auf den Tisch</em>" (mozgás - AKK)<br>
        • "Das Buch <em>liegt</em> <em>auf dem Tisch</em>" (állapot - DAT)<br><br>
        
        <strong>Főbb igék:</strong><br>
        • stellen/stehen (helyez/áll)<br>
        • legen/liegen (fektet/fekszik)<br>
        • setzen/sitzen (ültet/ül)<br>
        • hängen/hängen (akaszt/lóg)
    `;
    
    explanationText.innerHTML = explanation;
    explanationSection.style.display = 'block';
}

// Generate story
function generateStory() {
    const stories = [
        `
        <strong>A takarítás napja</strong><br><br>
        
        Anna ma takarít. Először a könyveket teszi a polcra. "Ich stelle die Bücher in das Regal," 
        mondja magának. Aztán megnézi: "Die Bücher stehen im Regal."<br><br>
        
        Ezután a vázát teszi az asztalra: "Ich stelle die Vase auf den Tisch." 
        Most a váza szépen áll az asztalon: "Die Vase steht auf dem Tisch."<br><br>
        
        Végül a képet akasztja a falra: "Ich hänge das Bild an die Wand." 
        A kép most ott lóg a falon: "Das Bild hängt an der Wand."
        `,
        `
        <strong>Az új lakás</strong><br><br>
        
        Péter költözik. "Wohin stelle ich den Schrank?" kérdezi. "In die Ecke!" válaszol a barátja. 
        "Ich stelle den Schrank in die Ecke."<br><br>
        
        Egy óra múlva: "Der Schrank steht in der Ecke." Péter elégedett.<br><br>
        
        "Und wohin lege ich den Teppich?" "Unter den Tisch!" 
        "Ich lege den Teppich unter den Tisch." Készen is van: "Der Teppich liegt unter dem Tisch."
        `,
        `
        <strong>A múzeumban</strong><br><br>
        
        A múzeumban egy gondnok dolgozik. "Ich hänge das neue Gemälde an die Wand," 
        mondja, miközben dolgozik.<br><br>
        
        Délután a látogatók megnézik: "Das schöne Gemälde hängt an der Wand."<br><br>
        
        A szobor is új helyre kerül: "Wir stellen die Statue zwischen die Säulen." 
        Most ott áll: "Die Statue steht zwischen den Säulen."
        `
    ];
    
    const randomStory = stories[Math.floor(Math.random() * stories.length)];
    storyText.innerHTML = randomStory;
    storySection.style.display = 'block';
}

// Initialize with example
window.addEventListener('load', () => {
    inputText.focus();
});
