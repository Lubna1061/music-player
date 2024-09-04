var imgel = document.getElementById("bg-img");
var imgcover = document.getElementById("cover");
var title = document.getElementById("music_title");
var playprog = document.getElementById("player_progress");
var prog = document.getElementById("progress");
var time = document.getElementById("currtime");
var dura = document.getElementById("dura");

var prebtn = document.getElementById("prev");
var playbtn = document.getElementById("play");
var nextbtn = document.getElementById("next");

const songs = [
  {
    path: "project/songs/Stay With Me Goblin-(PagalWorld).mp3",
    displayName: "Goblin",
    cover: "project/musicimg/goblin.jpg",
  },
  {
    path: "project/songs/hate story.mpeg",
    displayName: "Hate Story",
    cover: "project/musicimg/hate-story-2.jpg",
  },
  {
    path: "project/songs/tere nishaaa.mpeg",
    displayName: "Tere Nisha",
    cover: "project/musicimg/mus.jpg",
  },
  {
    path: "project/songs/matak.mpeg",
    displayName: "Badsha song",
    cover: "project/musicimg/matk.jpg",
  },
  {
    path: "project/songs/mohabat.mpeg",
    displayName: "Mohabat",
    cover: "project/musicimg/mus1.jpg",
  },
];

const music = new Audio();

let musicIndex = 0;
let playing = false;

function toggleplay() {
  if (playing) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  playing = true;
  playbtn.classList.replace("fa-play", "fa-pause");
  playbtn.setAttribute("title", "pause");
  music.play();
}

function pauseMusic() {
  playing = false;
  playbtn.classList.replace("fa-pause", "fa-play");
  playbtn.setAttribute("title", "play");
  music.pause();
}

function loadmusic(song) {
  music.src = song.path;
  title.textContent = song.displayname;
  imgcover.src = song.cover;
  imgel.src = song.cover;
}

function change(direction) {
    musicIndex = (musicIndex + direction) % songs.length;
    if (musicIndex < 0) {
      musicIndex = songs.length - 1;
    }
    loadmusic(songs[musicIndex]);
    time.textContent = "0:00"; 
    dura.textContent = "0:00"; 
    prog.style.width = "0%";
    music.play();
  }

function setProgressBar(e) {
  const width = playprog.clientWidth;
  const Xvalue = e.offsetX;
  console.log(width, Xvalue);
  music.currentTime = (Xvalue / width) * music.duration;
}

function updateprogressBar() {
    if (music.duration && music.currentTime) {
      const progressPercent = (music.currentTime / music.duration) * 100;
      prog.style.width = `${progressPercent}%`;
  
      const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      };
      dura.textContent = formatTime(music.duration);
      time.textContent = formatTime(music.currentTime);
    }
  }

playbtn.addEventListener("click", toggleplay);
nextbtn.addEventListener("click", () => change(1));
prebtn.addEventListener("click", () => change(-1));

playprog.addEventListener("click", setProgressBar);
music.addEventListener("ended", () => change(1));
music.addEventListener("timeupdate", updateprogressBar);

document.addEventListener("DOMContentLoaded", function () {
  loadmusic(songs[musicIndex]);
});