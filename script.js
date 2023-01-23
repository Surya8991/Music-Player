//To change music image and names
let image=document.querySelector('img')
let title=document.querySelector('#title')
let author=document.querySelector('#author')
//Audio Controlls
let music=document.querySelector('audio');
let prevBtn=document.getElementById('prev');
let playBtn=document.getElementById('play');
let nextBtn=document.getElementById('next');
//Progress Bar
let progressContainer=document.getElementById('progress-container');
let progress=document.getElementById('progress')
let currentPlayTime=document.getElementById('current-time')
let durationTime=document.getElementById('duration')
//Music
const songs=[
    {
        name:'jacinto-1',
        displayName:"Electric Chill Machine",
        artist:'Jacinto Design'
    },
    {
        name:'jacinto-2',
        displayName:"Seven Nation Army (Remix)",
        artist:'Jacinto Design'
    },
    {
        name:'jacinto-3',
        displayName:"GoodNight Disco Queen",
        artist:'Jacinto Design'
    },
    {
        name:'metric-1',
        displayName:"Front Row ",
        artist:'Metric/Jacinto Design'
    }
]

//Controls
let isPlaying=false;

function playMusic(){
    music.play();
    isPlaying=true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute("title",'Pause')
}

function pauseMusic(){
    music.pause();
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute("title",'Play')
}

// Update DOM
function loadSong(song){
    title.textContent=song.displayName;
    artist.textContent=song.artist;
    music.src=`music/${song.name}.mp3`;
    image.src=`img/${song.name}.jpg`;
}

//Song Index
let songIndex=0;

loadSong(songs[songIndex])

function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex=0;
    }
    loadSong(songs[songIndex])
    playMusic();
}

function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex])
    playMusic()
}

//Update Progress Bar
function updateProgressBar(e){
   if(isPlaying){
    const {currentTime,duration}=e.srcElement
    progress.style.width=`${(currentTime/duration)*100}%`
    //Update current Time and duration
    const durationMinutes=Math.floor(duration/60);
    let durationSec=Math.floor(duration%60)
    if(durationSec<10){
       durationSec= `0${durationSec}`
    }
    if(durationSec){
        durationTime.textContent= `${durationMinutes}:${durationSec}`
    }
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentPlayTime.textContent = `${currentMinutes}:${currentSeconds}`;
   }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
  }
  
//Event Listeners
playBtn.addEventListener('click',()=>{
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
})
// Previous
prevBtn.addEventListener('click',prevSong);
//Next
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',updateProgressBar)
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);

