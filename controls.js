(()=>{'use strict';
const body=document.body,game=document.querySelector('#game'),menu=document.querySelector('#menu'),help=document.querySelector('#help');
let mode='';
function choose(next){mode=next;body.classList.add('playing');body.classList.toggle('mobile',next==='mobile');help.style.display='none';document.querySelector('#helpText').textContent=next==='mobile'?'Use touch gestures directly on the golf game. Touch actions are handled by the original game engine. Double-tap page zoom is disabled in the wrapper.':'Use the original game mouse and keyboard controls.';
// The original game already has native touch event handling; do not fake mouse events.
if(!game.getAttribute('src'))game.src='golf.html';game.focus();}
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.mode)));
document.querySelector('#controlsBtn').addEventListener('click',()=>help.style.display=help.style.display==='block'?'none':'block');
document.querySelector('#closeBtn').addEventListener('click',()=>help.style.display='none');
document.querySelector('#switchBtn').addEventListener('click',()=>{body.classList.remove('playing','mobile');help.style.display='none';game.blur();});
document.querySelector('#fullBtn').addEventListener('click',()=>{if(!document.fullscreenElement&&document.documentElement.requestFullscreen)document.documentElement.requestFullscreen().catch(()=>{});else if(document.exitFullscreen)document.exitFullscreen().catch(()=>{});});
// Avoid double-tap zoom on outer wrapper; the game iframe uses its own viewport and touch-action.
let last=0;document.addEventListener('touchend',e=>{if(e.target.closest('button'))return;let now=Date.now();if(now-last<300)e.preventDefault();last=now;},{passive:false});
// The original game uses its own COI service worker; avoid a conflicting second worker.
})();
