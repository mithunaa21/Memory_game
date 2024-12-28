let theme="emojis";
let soundon=true;
let score=0;
let selectedindex=0;
let cardelments=[];
let firstcard=null;
let secondcard=null;
let time_interval,elapsedtime=0;
const carddata={emojis:["😀","🤣","😎","😋","😱","😭","🥰","😡","😴","🤯"],
animals:["🐵","🐶","🐼","🦁","🐯","🐪","🐷","🦍","🐇","🐱‍🐉"],
profession:["👮‍♀️","🕵️‍♀️","👩‍⚕️","👩‍🏫","👩‍🌾","👩‍🍳","👩‍🔧","👩‍🎓","👩‍⚖️","👷‍♀️"],
flowers:["🌷","🌻","🌼","💐","🌹","🏵","🥀","🍁","🌾","🌸"]};
const gameboard=document.getElementById("game-board")
const themechange=document.getElementById("theme");
const soundchange=document.getElementById("sound");
const scoreincree=document.getElementById("score");
const restarter=document.getElementById("restart");
const timercount=document.getElementById("timer");
const myst=document.getElementById("story");
function initgame()
{
   score=0;
  updatescore();
  stoptimer();
  starttimer();
  myst.classList.remove("hidden");
  generatecards();
}
function generatecards() {
  gameboard.innerHTML = "";
  const selectedtheme = carddata[theme];

  if (!selectedtheme) {
    console.error(`Invalid theme: ${theme}`);
    return;
  }

  const cards = [...selectedtheme, ...selectedtheme].sort(() => Math.random() - 0.5);
   cardelments = [];

  cards.forEach((symbol, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.innerHTML = "?";
    card.tabIndex = 0;
    card.addEventListener("click", cardclick);
    gameboard.append(card);
    cardelments.push(card);
  });
}
function cardclick(e)
{
  const card=e.target;
  if(card.classList.contains("flipped")||(firstcard&&secondcard)){
    return;
  }
  card.classList.add("flipped");
  card.innerHTML=card.dataset.symbol;
  if(!firstcard)
    firstcard=card;
  else{
  secondcard=card;
  checkmatch();
  }
}
function checkmatch()
{
  if(firstcard.dataset.symbol==secondcard.dataset.symbol)
  {
    score+=10;
    updatescore();
    firstcard=null;
    secondcard=null;
    checkcompletion();
  }
  else
  {
    setTimeout(()=>{
      firstcard.classList.remove("flipped");
      secondcard.classList.remove("flipped");
      firstcard.innerHTML="?";
      secondcard.innerHTML="?";
      firstcard=null;
      secondcard=null;
    },1000);
  }
}
function updatescore(){
  scoreincree.textContent = `Score: ${score}`;
}
function handlekeyboard(event,index){
  const key=event.key;
  cardelments[selectedindex]?.classList.remove("highlight");
  if(key==="ArrowRight")
    selectedindex=(selectedindex+1)%cardelments.length;
  else if(key==="ArrowLeft")
  selectedindex=(selectedindex-1+cardelments.length)%cardelments.length;
else if(key==="Enter"||key===" ")
  cardelments[selectedindex].click();
cardelments[selectedindex]?.classList.add("highlight");
}
soundchange.addEventListener("click",()=>{
  soundon=!soundon;
  soundchange.textContent=`sound:${soundon?"on":"off"}`;
});
themechange.addEventListener("click",()=>{
  const themes=Object.keys(carddata);
  const currtheme=themes.indexOf(theme);
  theme=themes[(currtheme+1)%themes.length];
  initgame();
});
restarter.addEventListener("click",initgame);
function starttimer(){
  elapsedtime=0;
  const timedisplay=document.getElementById("timer");
  timedisplay.textContent=`Time:${elapsedtime}s`;
  time_interval=setInterval(()=>{
    elapsedtime++;
    timedisplay.textContent=`Time:${elapsedtime}s`;
  },1000);
}
function stoptimer(){
  clearInterval(time_interval);
}
function checkcompletion(){
  const flippedCards = document.querySelectorAll(".card.flipped");
  if(flippedCards.length===cardelments.length)
  {
    stoptimer();
    setTimeout(()=>{
      alert(`🎊Hurray! You completed the game in ${elapsedtime} seconds!🎉`);
      initgame();
    },500);
  }
}
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .highlight {
    outline: 2px solid #ffcc00; 
  }
`;
document.head.appendChild(styleSheet);
initgame();



