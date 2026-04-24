This is a file containing HTML, CSS, and JavaScript to create the flame animation.

HTML

<div class="fire-row" id="fire-row"></div>

CSS

body {
margin: 0;
background-color: #000;
display: flex;
justify-content: center;
align-items: flex-end;
min-height: 100vh;
overflow: hidden;
}

.fire-row {
display: flex;
justify-content: center;
align-items: flex-end;
width: 100%;
/_ Add padding at the top so flames and glow have room to move up _/
padding-top: 200px;
padding-bottom: 20px;
}

.mo-fire {
width: 120px;
margin: 0 -45px; /_ Keep the overlap _/
filter: drop-shadow(0px -15px 30px rgba(243, 110, 33, 0.8));
position: relative;
/_ CRITICAL: Ensure the container doesn't cut off the SVG _/
overflow: visible !important;
}

.mo-fire svg {
width: 100%;
height: auto;
/_ Ensure the SVG itself doesn't clip _/
overflow: visible !important;
}

.flame-main {
animation: flameWobble var(--speed) ease-in-out infinite;
animation-delay: var(--delay);
transform-origin: bottom center;
}

.flame {
animation: flamefly 1.5s ease-out infinite;
animation-delay: var(--delay);
opacity: 0;
}

@keyframes flameWobble {
0%, 100% { transform: scale(1) rotate(0deg); }
/_ Reduced height slightly to prevent extreme clipping,
added a slight downward shift to keep base anchored _/
50% { transform: scale(1.1, var(--height)) translateY(-5px) rotate(var(--rotate)); }
}

@keyframes flamefly {
0% { transform: translateY(0) scale(1); opacity: 0; }
20% { opacity: 1; }
100% { transform: translate(15px, -150px) scale(0.3); opacity: 0; }
}

JS

const fireRow = document.getElementById('fire-row');
const flameCount = 12; // Increased slightly for a wider hero

const svgContent = `
<svg viewBox="0 0 125 189.864" style="overflow:visible">
    <path class="flame-main" fill="#F36E21" d="M76.553,186.09c0,0-10.178-2.976-15.325-8.226s-9.278-16.82-9.278-16.82s-0.241-6.647-4.136-18.465c0,0,3.357,4.969,5.103,9.938c0,0-5.305-21.086,1.712-30.418c7.017-9.333,0.571-35.654-2.25-37.534c0,0,13.07,5.64,19.875,47.54c6.806,41.899,16.831,45.301,6.088,53.985"/>
    <path class="flame-main one" fill="#F6891F" d="M61.693,122.257c4.117-15.4,12.097-14.487-11.589-60.872c0,0,32.016,10.223,52.601,63.123c20.585,52.899-19.848,61.045-19.643,61.582c0.206,0.537-19.401-0.269-14.835-18.532S57.576,137.656,61.693,122.257z"/>
    <path class="flame-main two" fill="#FFD04A" d="M81.657,79.192c0,0,11.549,24.845,3.626,40.02c-7.924,15.175-21.126,41.899-0.425,64.998C84.858,184.21,125.705,150.905,81.657,79.192z"/>
    <path class="flame" fill="#F36E21" d="M101.011,112.926c0,0,8.973,10.519,4.556,16.543C99.37,129.735,106.752,117.406,101.011,112.926z"/>
    <path class="flame one" fill="#F36E21" d="M55.592,126.854c0,0-3.819,13.29,2.699,16.945C64.038,141.48,55.907,132.263,55.592,126.854z"/>
</svg>`;

for (let i = 0; i < flameCount; i++) {
const flameDiv = document.createElement('div');
flameDiv.className = 'mo-fire';
flameDiv.innerHTML = svgContent;

const speed = (Math.random() _ 0.3 + 0.4) + 's';
const delay = (Math.random() _ 2) + 's';
const height = (Math.random() _ 0.3 + 1.1); // Slightly lower max height
const rotate = (Math.random() _ 8 - 4) + 'deg';

flameDiv.style.setProperty('--speed', speed);
flameDiv.style.setProperty('--delay', delay);
flameDiv.style.setProperty('--height', height);
flameDiv.style.setProperty('--rotate', rotate);

fireRow.appendChild(flameDiv);
}
