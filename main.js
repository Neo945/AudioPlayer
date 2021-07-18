import './style.css'

const previous = document.querySelector('#pre');
const play = document.querySelector('#play');
const next = document.querySelector('#next');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const duration_slider = document.querySelector('#duration_slider');
const auto = document.querySelector('#auto');
const present = document.querySelector('#present');
const total = document.querySelector('#total');
const duration = document.querySelector('.duration');
const volume_up = document.querySelector('#volume_up');
const volume_slider = document.querySelector('#volume_slider');
const tract_image = document.querySelector('#tract_image');
let timer;
let autoplay = 0;
let index_no = 0;
let playing_song = false;
let track = document.createElement('audio');
let cvolume = 0;
let allsongs = [
    {
        name: 'AOT',
        artist: 'AOT artists',
        file: 'static/aot.wav',
        img: 'static/image.jpg'
    }
]
total.innerHTML = allsongs.length;
function load_track(index) {
    track.src = allsongs[index].file;
    title.innerText = allsongs[index].name;
    artist.innerText = allsongs[index].artist;
    tract_image.src = allsongs[index].img;
    track.load();
    present.innerHTML = index_no + 1;
    setInterval(update_slider,1000);
}
load_track(index_no);
play.addEventListener('click',justplay);
function justplay() {
    if (playing_song==false){
        playsong();
    }else{
        pausesong();
    }
}
function playsong() {
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="fa fa-pause"></i>';
    tract_image.style.animation = 'rotate 4s linear infinite';
}
function pausesong() {
    track.pause();
    playing_song = false;
    tract_image.style.animation = '';
    play.innerHTML = '<i class="fa fa-play"></i>';
}
next.addEventListener('click',next_song);
function next_song() {
    if (index_no < allsongs.length - 1){
        index_no++;
        load_track(index_no);
        playsong();
    }else{
        index_no = 0;
        load_track(index_no);
        playsong();
    }
    autoplay = 0;
}
volume_up.addEventListener('click',()=>{
    if (!track.muted){
        cvolume = volume_slider.value;
        volume_slider.value = document.querySelector('#volume_show').innerHTML = 0;
        volume_up.innerHTML = '<i class="fa fa-volume-mute" aria-hidden="true"></i>';
        track.muted = true;
    }else{
        volume_slider.value = document.querySelector('#volume_show').innerHTML = cvolume;
        volume_up.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true"></i>';
        track.muted = false;
    }
});
previous.addEventListener('click',previous_song);
function previous_song() {
    if (index_no > 0){
        index_no--;
        load_track(index_no);
        playsong();
        // tract_image.style.animation = '';
        // tract_image.style.animation = 'rotate 4s linear infinite';
    }else{
        index_no = 0;
        // tract_image.style.animation = '';
        // tract_image.style.animation = 'rotate 4s linear infinite';
        load_track(index_no);
        playsong();
    }
}
volume_slider.addEventListener('mousemove',volume_change);
function volume_change() {
    document.querySelector('#volume_show').innerHTML = volume_slider.value;
    track.volume = volume_slider.value / 100;
}
duration_slider.addEventListener('change',function(){
    let duration = track.duration * (duration_slider.value / 100);
    track.currentTime = duration;
});
function update_slider() {
    duration_slider.value = track.currentTime * (100 / track.duration);
    if (track.ended){
        play.innerHTML = '<i class="fa fa-play"></i>';
        if (autoplay===1){
            load_track(index_no);
            playsong();
        }
    }
}
auto.addEventListener('click',()=>{
    if (autoplay===1){
        autoplay = 0;
        auto.style.background = '';
    }else{
        auto.style.background = 'gray';
        autoplay = 1;
    }
})