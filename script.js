// --- TIME TRAVERSAL BACKGROUND ---
const canvas = document.getElementById('warp-canvas');
const ctx = canvas.getContext('2d');
let w, h, stars = [];
function initStars() {
  stars = [];
  for(let i=0; i<600; i++) stars.push({x: Math.random()*2-1, y: Math.random()*2-1, z: Math.random()});
}
function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; initStars(); }
window.addEventListener('resize', resize); resize();

function draw() {
  ctx.fillStyle = 'rgba(3, 3, 5, 0.4)'; // Trail effect
  ctx.fillRect(0, 0, w, h);
  const cx = w/2, cy = h/2;
  ctx.fillStyle = '#ffffff';
  for(let i=0; i<stars.length; i++) {
    const s = stars[i];
    s.z -= 0.003; // Warp speed
    if(s.z <= 0) { s.x = Math.random()*2-1; s.y = Math.random()*2-1; s.z = 1; }
    const x = cx + s.x * (cx/s.z);
    const y = cy + s.y * (cy/s.z);
    const r = (1 - s.z) * 2;
    if(x>0 && x<w && y>0 && y<h) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill(); }
  }
  requestAnimationFrame(draw);
}
draw();

// --- PARALLAX EFFECT ---
const parallax = document.getElementById('parallax-content');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30; // 30px swing
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  parallax.style.transform = `translate(${-x}px, ${-y}px)`;
});

// --- TOOL GENERATOR FACTORY ---
// Helper functions to generate functional UIs
const textF = (fn, phIn="Input", phOut="Output") => (el) => {
   el.innerHTML = `<textarea id="in" class="form-control" placeholder="${phIn}" style="height:120px; resize:none;"></textarea><button class="btn-primary" id="b" style="width:100%">Process</button><textarea id="out" class="form-control" placeholder="${phOut}" style="height:120px; resize:none; margin-top:1.5rem;" readonly></textarea>`;
   document.getElementById('b').onclick = () => { try{ document.getElementById('out').value = fn(document.getElementById('in').value); }catch(e){ document.getElementById('out').value='Error'; } };
};
const mathF = (fn, phIn="Input", phOut="Result") => (el) => {
   el.innerHTML = `<input id="in" class="form-control" placeholder="${phIn}"><button class="btn-primary" id="b" style="width:100%; margin: 1rem 0;">Calculate</button><input id="out" class="form-control" placeholder="${phOut}" readonly>`;
   document.getElementById('b').onclick = () => { try{ document.getElementById('out').value = fn(document.getElementById('in').value); }catch(e){ document.getElementById('out').value='Error'; } };
};
const apiF = (url, pathFn) => (el) => {
  el.innerHTML = `<button class="btn-primary" id="ab" style="width:100%">Fetch Remote API Data</button><textarea id="ao" class="form-control" style="margin-top:1.5rem; height:150px; resize:none;" readonly placeholder="Awaiting API response..."></textarea>`;
  document.getElementById('ab').onclick = async () => {
    const o = document.getElementById('ao');
    o.value = "Connecting to Free API...";
    try { let r = await fetch(url); let d = await r.json(); o.value = pathFn(d); } 
    catch(e) { o.value = "API Error: Could not connect."; }
  };
};

// --- 100 FULLY WORKING TOOLS ---
const tData = [
  // TEXT & STRING (text)
  { n: 'Uppercase', c: 'text', f: textF(t=>t.toUpperCase()) },
  { n: 'Lowercase', c: 'text', f: textF(t=>t.toLowerCase()) },
  { n: 'Title Case', c: 'text', f: textF(t=>t.replace(/\w\S*/g, w=>w.charAt(0).toUpperCase()+w.substr(1).toLowerCase())) },
  { n: 'Reverse String', c: 'text', f: textF(t=>t.split('').reverse().join('')) },
  { n: 'Reverse Words', c: 'text', f: textF(t=>t.split(' ').reverse().join(' ')) },
  { n: 'Reverse Lines', c: 'text', f: textF(t=>t.split('\n').reverse().join('\n')) },
  { n: 'Remove Spaces', c: 'text', f: textF(t=>t.replace(/\s/g, '')) },
  { n: 'Remove Newlines', c: 'text', f: textF(t=>t.replace(/\n/g, '')) },
  { n: 'Sort Lines', c: 'text', f: textF(t=>t.split('\n').sort().join('\n')) },
  { n: 'Shuffle Lines', c: 'text', f: textF(t=>t.split('\n').sort(()=>Math.random()-0.5).join('\n')) },
  { n: 'Dedupe Lines', c: 'text', f: textF(t=>[...new Set(t.split('\n'))].join('\n')) },
  { n: 'Character Count', c: 'text', f: textF(t=>t.length.toString()) },
  { n: 'Word Count', c: 'text', f: textF(t=>(t.trim()?t.trim().split(/\s+/).length:0).toString()) },
  { n: 'Line Count', c: 'text', f: textF(t=>(t===''?0:t.split('\n').length).toString()) },
  { n: 'Vowel Count', c: 'text', f: textF(t=>(t.match(/[aeiou]/gi)||[]).length.toString()) },
  { n: 'Consonant Count', c: 'text', f: textF(t=>(t.match(/[bcdfghjklmnpqrstvwxyz]/gi)||[]).length.toString()) },
  { n: 'Base64 Encode', c: 'text', f: textF(t=>btoa(t)) },
  { n: 'Base64 Decode', c: 'text', f: textF(t=>atob(t)) },
  { n: 'URL Encode', c: 'text', f: textF(t=>encodeURIComponent(t)) },
  { n: 'URL Decode', c: 'text', f: textF(t=>decodeURIComponent(t)) },
  { n: 'ROT13', c: 'text', f: textF(t=>t.replace(/[a-zA-Z]/g, c=>String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26))) },
  { n: 'Snake Case', c: 'text', f: textF(t=>(t.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)||[]).map(x=>x.toLowerCase()).join('_')) },
  { n: 'Kebab Case', c: 'text', f: textF(t=>(t.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)||[]).map(x=>x.toLowerCase()).join('-')) },
  { n: 'Pascal Case', c: 'text', f: textF(t=>(t.match(/[a-zA-Z0-9]+/g)||[]).map(w=>w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join('')) },
  { n: 'Camel Case', c: 'text', f: textF(t=>(t.match(/[a-zA-Z0-9]+/g)||[]).map((w,i)=>i===0?w.toLowerCase():w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join('')) },

  // MATH & LOGIC (math)
  { n: 'Eval Calculator', c: 'math', f: mathF(t=>eval(t.replace(/[^0-9+*/.() -]/g,'')), "e.g. 5 + 5 * 2") },
  { n: 'Random Number', c: 'math', f: mathF(t=>Math.floor(Math.random()*(parseInt(t)||100)), "Max number") },
  { n: 'Prime Checker', c: 'math', f: mathF(t=>{let n=parseInt(t);if(n<2)return false;for(let i=2;i<n;i++)if(n%i===0)return false;return true;}, "Number") },
  { n: 'Factorial', c: 'math', f: mathF(t=>{let f=1;for(let i=1;i<=parseInt(t);i++)f*=i;return f;}, "Number") },
  { n: 'GCD', c: 'math', f: mathF(t=>{let [a,b]=t.split(',').map(Number);while(b)[a,b]=[b,a%b];return Math.abs(a);}, "A,B") },
  { n: 'LCM', c: 'math', f: mathF(t=>{let [a,b]=t.split(',').map(Number);let g=a,y=b;while(y)[g,y]=[y,g%y];return Math.abs((a*b)/g);}, "A,B") },
  { n: 'Average', c: 'math', f: mathF(t=>{let n=t.split(',').map(Number);return n.reduce((a,b)=>a+b)/n.length;}, "1,2,3...") },
  { n: 'Median', c: 'math', f: mathF(t=>{let n=t.split(',').map(Number).sort((a,b)=>a-b);return n.length%2!==0?n[Math.floor(n.length/2)]:(n[n.length/2-1]+n[n.length/2])/2;}, "1,2,3...") },
  { n: 'Power', c: 'math', f: mathF(t=>Math.pow(...t.split(',').map(Number)), "Base,Exponent") },
  { n: 'Square Root', c: 'math', f: mathF(t=>Math.sqrt(Number(t))) },
  { n: 'Logarithm (10)', c: 'math', f: mathF(t=>Math.log10(Number(t))) },
  { n: 'Logarithm (ln)', c: 'math', f: mathF(t=>Math.log(Number(t))) },
  { n: 'Radians to Degrees', c: 'math', f: mathF(t=>Number(t)*(180/Math.PI)) },
  { n: 'Degrees to Radians', c: 'math', f: mathF(t=>Number(t)*(Math.PI/180)) },
  { n: 'Sine', c: 'math', f: mathF(t=>Math.sin(Number(t))) },
  { n: 'Cosine', c: 'math', f: mathF(t=>Math.cos(Number(t))) },
  { n: 'Tangent', c: 'math', f: mathF(t=>Math.tan(Number(t))) },
  { n: 'Absolute Value', c: 'math', f: mathF(t=>Math.abs(Number(t))) },
  { n: 'Round Number', c: 'math', f: mathF(t=>Math.round(Number(t))) },
  { n: 'Percentage Calc', c: 'math', f: mathF(t=>{let [a,b]=t.split(',');return (Number(a)/100)*Number(b);}, "A% of B (A,B)") },
  { n: 'Tip Calculator', c: 'math', f: mathF(t=>{let [a,b]=t.split(',');return Number(a)*(1+Number(b)/100);}, "Bill,Tip% (e.g. 100,15)") },
  { n: 'Discount Calc', c: 'math', f: mathF(t=>{let [a,b]=t.split(',');return Number(a)*(1-Number(b)/100);}, "Price,Discount% (e.g. 100,20)") },
  { n: 'VAT Calculator', c: 'math', f: mathF(t=>{let [a,b]=t.split(',');return Number(a)*(Number(b)/100);}, "Amount,VAT% (e.g. 100,20)") },
  { n: 'Pythagorean (Hypot)', c: 'math', f: mathF(t=>{let [a,b]=t.split(',');return Math.hypot(Number(a),Number(b));}, "a,b") },
  { n: 'Circle Area', c: 'math', f: mathF(t=>Math.PI*Math.pow(Number(t),2), "Radius") },

  // CONVERTERS (convert)
  { n: 'Celsius to Fahrenheit', c: 'convert', f: mathF(t=>(Number(t)*9/5)+32, "Degrees Celsius", "Degrees Fahrenheit") },
  { n: 'Fahrenheit to Celsius', c: 'convert', f: mathF(t=>(Number(t)-32)*5/9, "Degrees Fahrenheit", "Degrees Celsius") },
  { n: 'Miles to Km', c: 'convert', f: mathF(t=>Number(t)*1.60934, "Miles", "Kilometers") },
  { n: 'Km to Miles', c: 'convert', f: mathF(t=>Number(t)/1.60934, "Kilometers", "Miles") },
  { n: 'Lbs to Kg', c: 'convert', f: mathF(t=>Number(t)*0.453592, "Pounds (lbs)", "Kilograms (kg)") },
  { n: 'Kg to Lbs', c: 'convert', f: mathF(t=>Number(t)/0.453592, "Kilograms (kg)", "Pounds (lbs)") },
  { n: 'Feet to Meters', c: 'convert', f: mathF(t=>Number(t)*0.3048, "Feet", "Meters") },
  { n: 'Meters to Feet', c: 'convert', f: mathF(t=>Number(t)/0.3048, "Meters", "Feet") },
  { n: 'Inches to CM', c: 'convert', f: mathF(t=>Number(t)*2.54, "Inches", "Centimeters") },
  { n: 'CM to Inches', c: 'convert', f: mathF(t=>Number(t)/2.54, "Centimeters", "Inches") },
  { n: 'Gallons to Liters', c: 'convert', f: mathF(t=>Number(t)*3.78541, "Gallons", "Liters") },
  { n: 'Liters to Gallons', c: 'convert', f: mathF(t=>Number(t)/3.78541, "Liters", "Gallons") },
  { n: 'Hex to Decimal', c: 'convert', f: mathF(t=>parseInt(t,16), "Hexadecimal", "Decimal") },
  { n: 'Decimal to Hex', c: 'convert', f: mathF(t=>Number(t).toString(16).toUpperCase(), "Decimal", "Hexadecimal") },
  { n: 'Binary to Decimal', c: 'convert', f: mathF(t=>parseInt(t,2), "Binary", "Decimal") },
  { n: 'Decimal to Binary', c: 'convert', f: mathF(t=>Number(t).toString(2), "Decimal", "Binary") },
  { n: 'String to Hex', c: 'convert', f: textF(t=>t.split('').map(c=>c.charCodeAt(0).toString(16).padStart(2,'0')).join(' '), "String", "Hexadecimal Output") },
  { n: 'Hex to String', c: 'convert', f: textF(t=>t.split(' ').map(h=>String.fromCharCode(parseInt(h,16))).join(''), "Hexadecimal Input", "String") },
  { n: 'String to Binary', c: 'convert', f: textF(t=>t.split('').map(c=>c.charCodeAt(0).toString(2).padStart(8,'0')).join(' '), "String", "Binary Output") },
  { n: 'Binary to String', c: 'convert', f: textF(t=>t.split(' ').map(b=>String.fromCharCode(parseInt(b,2))).join(''), "Binary Input", "String") },
  { n: 'Bytes to KB', c: 'convert', f: mathF(t=>Number(t)/1024, "Bytes", "Kilobytes") },
  { n: 'KB to MB', c: 'convert', f: mathF(t=>Number(t)/1024, "Kilobytes", "Megabytes") },
  { n: 'MB to GB', c: 'convert', f: mathF(t=>Number(t)/1024, "Megabytes", "Gigabytes") },
  { n: 'Unix to Date', c: 'convert', f: mathF(t=>new Date(Number(t)*1000).toLocaleString(), "Epoch Seconds", "Human Readable Date") },
  { n: 'Date to Unix', c: 'convert', f: mathF(t=>Math.floor(new Date(t).getTime()/1000), "YYYY-MM-DD", "Epoch Seconds") },

  // DEV & WEB (dev)
  { n: 'UUID v4', c: 'dev', f: (el)=>el.innerHTML=`<button class="btn-primary" style="width:100%" onclick="this.nextElementSibling.value=crypto.randomUUID()">Generate</button><input class="form-control" style="margin-top:1.5rem" readonly>` },
  { n: 'Lorem Ipsum', c: 'dev', f: mathF(t=>Array(Number(t)||3).fill("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.").join('\n\n'), "Paragraphs") },
  { n: 'JSON Formatter', c: 'dev', f: textF(t=>JSON.stringify(JSON.parse(t),null,2)) },
  { n: 'JSON Minifier', c: 'dev', f: textF(t=>JSON.stringify(JSON.parse(t))) },
  { n: 'HTML Entity Encode', c: 'dev', f: textF(t=>t.replace(/[\u00A0-\u9999<>\&]/g, i=>'&#'+i.charCodeAt(0)+';')) },
  { n: 'HTML Entity Decode', c: 'dev', f: textF(t=>{let x=document.createElement('textarea');x.innerHTML=t;return x.value;}) },
  { n: 'URL Hostname', c: 'dev', f: textF(t=>new URL(t).hostname) },
  { n: 'URL Pathname', c: 'dev', f: textF(t=>new URL(t).pathname) },
  { n: 'Query String to JSON', c: 'dev', f: textF(t=>JSON.stringify(Object.fromEntries(new URLSearchParams(t)),null,2)) },
  { n: 'CSS Minifier', c: 'dev', f: textF(t=>t.replace(/\/\*[\s\S]*?\*\/|[\r\n\t]+/g,'').replace(/ {2,}/g,' ').replace(/ ([{:}]) /g,'$1')) },
  { n: 'Password Gen (16)', c: 'dev', f: (el)=>el.innerHTML=`<button class="btn-primary" style="width:100%" onclick="let c='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%'; this.nextElementSibling.value=Array.from({length:16},()=>c[Math.floor(Math.random()*c.length)]).join('')">Generate</button><input class="form-control" style="margin-top:1.5rem" readonly>` },
  { n: 'RGB to HEX', c: 'dev', f: mathF(t=>{let [r,g,b]=t.split(',').map(Number);return '#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('');}, "R,G,B") },
  { n: 'HEX to RGB', c: 'dev', f: mathF(t=>{let h=t.replace('#','');return `rgb(${parseInt(h.substr(0,2),16)}, ${parseInt(h.substr(2,2),16)}, ${parseInt(h.substr(4,2),16)})`;}, "#HEX") },
  { n: 'Color Picker', c: 'dev', f: (el)=>el.innerHTML=`<input type="color" oninput="this.nextElementSibling.innerText=this.value" style="width:100%;height:150px;background:none;border:none;cursor:pointer"><div class="form-control" style="text-align:center;font-size:2rem;margin-top:1.5rem">#000000</div>` },
  { n: 'Markdown to HTML', c: 'dev', f: textF(t=>t.replace(/^# (.*$)/gim, '<h1>$1</h1>').replace(/^## (.*$)/gim, '<h2>$1</h2>').replace(/\*\*(.*)\*\*/gim, '<b>$1</b>').replace(/\*(.*)\*/gim, '<i>$1</i>')) },
  { n: 'JWT Payload Decoder', c: 'dev', f: textF(t=>JSON.stringify(JSON.parse(atob(t.split('.')[1])),null,2)) },
  { n: 'CSS Box-Shadow', c: 'dev', f: mathF(t=>`box-shadow: ${t}px ${t}px ${t*2}px rgba(0,0,0,0.5);`, "Base size px") },
  { n: 'Base64 to Image', c: 'dev', f: (el)=>{ el.innerHTML=`<textarea id="i" class="form-control" style="height:100px" placeholder="Base64 Data URI"></textarea><button id="b" class="btn-primary" style="width:100%;margin-bottom:1.5rem">View Image</button><img id="o" style="max-width:100%;border-radius:12px;display:none">`; document.getElementById('b').onclick=()=>{let im=document.getElementById('o'); im.src=document.getElementById('i').value; im.style.display='block';} } },
  { n: 'Javascript Eval', c: 'dev', f: textF(t=>{let l=[];const c=console.log;console.log=(...a)=>l.push(a.join(' '));try{eval(t);}catch(e){l.push(e);}console.log=c;return l.join('\n');}) },
  { n: 'Keycode Tester', c: 'dev', f: (el)=>{ el.innerHTML=`<div class="form-control" style="text-align:center;font-size:3rem" id="kc">Press Key</div>`; const h=(e)=>{e.preventDefault();document.getElementById('kc').innerText=e.keyCode;}; window.addEventListener('keydown',h); el.dataset.clean=()=>window.removeEventListener('keydown',h); } },

  // TIME & MISC (misc)
  { n: 'Stopwatch', c: 'misc', f: (el)=>{ el.innerHTML=`<div class="form-control" style="font-size:4rem;text-align:center;margin-bottom:1.5rem" id="sw">0</div><button class="btn-primary" style="width:100%" id="swb">Start/Stop</button>`; let t,s=0,r=0; document.getElementById('swb').onclick=()=>{if(r){clearInterval(t);r=0;}else{r=1;t=setInterval(()=>{document.getElementById('sw').innerText=++s;},1000);}} } },
  { n: 'Timer (sec)', c: 'misc', f: (el)=>{ el.innerHTML=`<input id="ti" class="form-control" placeholder="Seconds"><button id="tb" class="btn-primary" style="width:100%;margin-bottom:1.5rem">Start</button><div class="form-control" style="font-size:4rem;text-align:center" id="to">0</div>`; document.getElementById('tb').onclick=()=>{let s=Number(document.getElementById('ti').value);let t=setInterval(()=>{document.getElementById('to').innerText=s;if(s--<=0)clearInterval(t);},1000);} } },
  { n: 'Coin Flipper', c: 'misc', f: (el)=>el.innerHTML=`<button class="btn-primary" style="width:100%" onclick="this.nextElementSibling.innerText=Math.random()>0.5?'HEADS':'TAILS'">Flip Coin</button><div class="form-control" style="font-size:3rem;text-align:center;margin-top:1.5rem">...</div>` },
  { n: 'Dice Roller (1-6)', c: 'misc', f: (el)=>el.innerHTML=`<button class="btn-primary" style="width:100%" onclick="this.nextElementSibling.innerText=Math.floor(Math.random()*6)+1">Roll Dice</button><div class="form-control" style="font-size:3rem;text-align:center;margin-top:1.5rem">...</div>` },
  { n: 'Magic 8 Ball', c: 'misc', f: (el)=>el.innerHTML=`<input class="form-control" placeholder="Ask a question"><button class="btn-primary" style="width:100%" onclick="let a=['Yes','No','Maybe','Ask again later']; this.nextElementSibling.innerText=a[Math.floor(Math.random()*4)]">Shake</button><div class="form-control" style="font-size:2rem;text-align:center;margin-top:1.5rem">...</div>` },
  { n: 'Random Joke API', c: 'misc', f: apiF('https://official-joke-api.appspot.com/random_joke', d=>d.setup+'\n\n'+d.punchline) },
  { n: 'Random Fact API', c: 'misc', f: apiF('https://uselessfacts.jsph.pl/random.json?language=en', d=>d.text) },
  { n: 'Public IP Info API', c: 'dev', f: apiF('https://ipapi.co/json/', d=>`IP: ${d.ip}\nCity: ${d.city}\nCountry: ${d.country_name}\nISP: ${d.org}`) },
  { n: 'Cat Fact API', c: 'misc', f: apiF('https://catfact.ninja/fact', d=>d.fact) },
  { n: 'Exchange Rates API', c: 'convert', f: apiF('https://open.er-api.com/v6/latest/USD', d=>`1 USD = \nEUR: ${d.rates.EUR}\nGBP: ${d.rates.GBP}\nJPY: ${d.rates.JPY}\nINR: ${d.rates.INR}\nCAD: ${d.rates.CAD}`) }
];

// --- DYNAMIC PREVIEW & ICON GENERATOR ---
tData.forEach(tool => {
  let pIn = 'In', pOut = 'Out', icon = 'zap';
  let n = tool.n.toLowerCase();
  
  if (n.includes(' to ')) {
    let pts = tool.n.split(' to ');
    pIn = pts[0].length > 8 ? pts[0].substring(0,6)+'..' : pts[0];
    pOut = pts[1].length > 8 ? pts[1].substring(0,6)+'..' : pts[1];
    icon = 'arrow-right-left';
  } else if (n.includes('encode')) { pIn = 'Text'; pOut = 'Hash'; icon = 'lock'; }
  else if (n.includes('decode')) { pIn = 'Hash'; pOut = 'Text'; icon = 'unlock'; }
  else if (n.includes('count')) { pIn = 'Text'; pOut = '123'; icon = 'bar-chart'; }
  else if (n.includes('reverse')) { pIn = 'ABC'; pOut = 'CBA'; icon = 'refresh-cw'; }
  else if (n.includes('case')) { pIn = 'abc'; pOut = 'ABC'; icon = 'type'; }
  else if (tool.c === 'math') { pIn = 'X'; pOut = 'Y'; icon = 'calculator'; }
  else if (tool.c === 'dev') { pIn = '{code}'; pOut = 'Run'; icon = 'terminal'; }
  else { pIn = 'Run'; pOut = 'Done'; icon = 'cpu'; }
  
  // Specific Overrides for Maximum Legibility
  if(n.includes('celsius')) { pIn = '°C'; pOut = '°F'; icon='thermometer'; }
  if(n.includes('fahrenheit')) { pIn = '°F'; pOut = '°C'; icon='thermometer'; }
  if(n.includes('miles') || n.includes('km')) { icon='map'; }
  if(n.includes('color') || n.includes('rgb') || n.includes('hex')) { icon='palette'; }
  if(n.includes('password')) { pIn='Gen'; pOut='***'; icon='key'; }
  if(n.includes('dice')) { pIn='Roll'; pOut='6'; icon='dices'; }
  if(n.includes('coin')) { pIn='Flip'; pOut='Heads'; icon='circle'; }
  if(n.includes('epoch') || n.includes('date')) { pIn='Time'; pOut='Date'; icon='calendar'; }
  if(n.includes('api')) { pIn='Fetch'; pOut='Data'; icon='cloud'; }

  tool.i = icon;
  tool.pIn = pIn;
  tool.pOut = pOut;
});

// --- RENDER BENTO GRID ---
const grid = document.getElementById('bento-grid');
const themes = { text: { i: 'type', c: '#00d4ff' }, math: { i: 'calculator', c: '#b100ff' }, convert: { i: 'refresh-cw', c: '#ffaa00' }, dev: { i: 'code', c: '#00ff88' }, misc: { i: 'clock', c: '#ff007f' } };

function renderGrid(filter) {
  grid.innerHTML = '';
  let displayIndex = 0;
  tData.forEach((tool, index) => {
    if (filter !== 'all' && tool.c !== filter) return;
    const card = document.createElement('div');
    card.className = 'bento-card';
    card.style.setProperty('--theme-color', themes[tool.c].c);
    card.setAttribute('data-theme', tool.c);
    
    // Flythrough entrance animation delay
    card.style.animation = `scaleIn 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards ${displayIndex * 0.02}s`;
    displayIndex++;
    card.style.opacity = '0';
    
    card.innerHTML = `
      <div class="card-icon"><i data-lucide="${tool.i}"></i></div>
      <div class="card-preview">
         <div class="p-in">${tool.pIn}</div>
         <div class="p-arrow"><i data-lucide="arrow-right"></i></div>
         <div class="p-out">${tool.pOut}</div>
      </div>
      <h3 class="card-title">${tool.n}</h3>
      <div class="card-theme">${tool.c}</div>
    `;
    card.onclick = (e) => triggerFlythrough(card, tool);
    grid.appendChild(card);
  });
  lucide.createIcons();
}

// Add animation keyframe to document
const style = document.createElement('style');
style.innerHTML = `@keyframes scaleIn { from { opacity: 0; transform: scale(0.8) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }`;
document.head.appendChild(style);

renderGrid('all');

// --- THEME FILTERS ---
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGrid(btn.getAttribute('data-theme'));
  };
});

// --- FLYTHROUGH & MODAL LOGIC ---
const modal = document.getElementById('tool-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
let currentCleanup = null;

function triggerFlythrough(cardElement, tool) {
  // Flythrough zoom effect on grid (not parallax-content to avoid mousemove conflict)
  grid.style.transform = `scale(1.2)`;
  grid.style.opacity = '0.3';
  grid.style.filter = 'blur(10px)';
  
  setTimeout(() => {
    modalTitle.innerHTML = `<i data-lucide="${themes[tool.c].i}"></i> ${tool.n}`;
    modalTitle.style.color = themes[tool.c].c;
    modal.style.setProperty('--theme-color', themes[tool.c].c);
    
    if(currentCleanup) { currentCleanup(); currentCleanup = null; }
    modalBody.innerHTML = '';
    
    // Render functional UI
    tool.f(modalBody);
    if(modalBody.dataset.clean) { currentCleanup = modalBody.dataset.clean; delete modalBody.dataset.clean; }
    
    lucide.createIcons();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  }, 400); // Wait for zoom
}

document.getElementById('modal-close').onclick = () => {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Restore background scrolling
  if(currentCleanup) { currentCleanup(); currentCleanup = null; }
  
  // Restore grid
  grid.style.transform = `scale(1)`;
  grid.style.opacity = '1';
  grid.style.filter = 'none';
  
  setTimeout(() => { modalBody.innerHTML = ''; }, 600);
};
