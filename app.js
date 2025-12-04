// Simple static playlist demo in vanilla JS

const playlists = [
  {
    id: 'barulho',
    title: 'Barulho',
    tracks: [
      {title: 'Barulho Escada', artist: 'Pamela Berti', src: './assets/audios/barulho/barulho_escada.m4a', duration: '0:11'},
      {title: 'Barulho Porta', artist: 'Pamela Berti', src: './assets/audios/barulho/barulho_porta.m4a', duration: '0:03'},
      {title: 'Barulho (ontem mesmo)', artist: 'Pamela Berti', src: './assets/audios/barulho/barulho_(ontem_mesmo).m4a', duration: '0:16'}
    ]
  },
  {
    id: 'cantoria',
    title: 'Cantoria',
    tracks: [
      {title: 'Tá Namorando e Me Querendo', artist: 'Pamela Berti', src: './assets/audios/cantoria/cantora.m4a', duration: '0:09'},
      {title: 'Numa Ilha', artist: 'Pamela Berti', src: './assets/audios/cantoria/cantora_marina_sena.m4a', duration: '0:07'}
    ]
  },
  {
    id: 'diccao',
    title: 'Dicção',
    tracks: [
      {title: 'Dicção Parte 45', artist: 'Pamela Berti', src: './assets/audios/diccao/diccao_parte_45.m4a', duration: '0:16'},
      {title: 'Dicção Parte 88', artist: 'Pamela Berti', src: './assets/audios/diccao/diccao_parte_88.m4a', duration: '0:12'},
      {title: 'Dicção Parte 99', artist: 'Pamela Berti', src: './assets/audios/diccao/diccao_parte_99.m4a', duration: '0:08'}
    ]
  },
  {
    id: 'efeito',
    title: 'Frases de Efeito',
    tracks: [
      {title: 'DOIS MESES', artist: 'Pamela Berti', src: './assets/audios/efeito/engracado_DOIS_MESES.m4a', duration: '0:05'},
      {title: 'Foooooooda-se', artist: 'Pamela Berti', src: './assets/audios/efeito/engracado_Fooooooda-se.m4a', duration: '0:01'},
      {title: 'Lobisomem', artist: 'Pamela Berti', src: './assets/audios/efeito/engracado_lobisomem.m4a', duration: '0:07'},
      {title: 'O QUE', artist: 'Pamela Berti', src: './assets/audios/efeito/engracado_O_QUE.m4a', duration: '0:01'},
      {title: 'não sei descrever, esse áudio é apenas o maioral.', artist: 'Pamela Berti', src: './assets/audios/efeito/engracado.m4a', duration: '0:36'}
    ]
  }
];

let currentPlaylist = playlists[0];
let currentIndex = -1;

const playlistListEl = document.getElementById('playlist-list');
const tracksTableBody = document.querySelector('#tracks-table tbody');
const playlistTitle = document.getElementById('playlist-title');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const nowTitle = document.getElementById('now-title');
const nowArtist = document.getElementById('now-artist');
const progress = document.getElementById('progress');

function renderPlaylists(){
  playlistListEl.innerHTML = '';
  playlists.forEach((p, idx) => {
    const li = document.createElement('li');
    li.textContent = p.title;
    li.onclick = () => {
      currentPlaylist = p;
      currentIndex = -1;
      renderTracks();
      playlistTitle.textContent = 'Playlist: ' + p.title;
    };
    playlistListEl.appendChild(li);
  });
}

function renderTracks(){
  tracksTableBody.innerHTML = '';
  currentPlaylist.tracks.forEach((t, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i+1}</td><td class="title">${t.title}</td><td class="artist">${t.artist}</td><td class="duration">${t.duration}</td>`;
    tr.onclick = () => playIndex(i);
    tracksTableBody.appendChild(tr);
  });
}

function playIndex(i){
  const track = currentPlaylist.tracks[i];
  if(!track) return;
  currentIndex = i;
  audio.src = track.src;
  audio.play();
  nowTitle.textContent = track.title;
  nowArtist.textContent = track.artist;
  playBtn.textContent = '⏸';
}

playBtn.onclick = () => {
  if(audio.paused){
    if(!audio.src){
      playIndex(0);
    } else {
      audio.play();
      playBtn.textContent = '⏸';
    }
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
  }
};

prevBtn.onclick = () => {
  if(currentIndex > 0) playIndex(currentIndex - 1);
};

nextBtn.onclick = () => {
  if(currentIndex < currentPlaylist.tracks.length - 1) playIndex(currentIndex + 1);
};

audio.ontimeupdate = () => {
  if(audio.duration){
    progress.value = Math.floor((audio.currentTime / audio.duration) * 100);
  }
};
progress.oninput = (e) => {
  if(audio.duration){
    audio.currentTime = (e.target.value / 100) * audio.duration;
  }
};

audio.onended = () => {
  if(currentIndex < currentPlaylist.tracks.length - 1) nextBtn.click();
  else { audio.currentTime = 0; playBtn.textContent='▶️'; }
};

// init
renderPlaylists();
renderTracks();
