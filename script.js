
const images = [
 
  { src: "images/flower1.jpg", cat: "flowers", title: "flower1" },
  { src: "images/flower2.jpg", cat: "flowers", title: "flower2" },
  { src: "images/flower3.jpg", cat: "flowers", title: "flower3" },
  { src: "images/flower4.jpg", cat: "flowers", title: "flower4" },


  { src: "images/car1.jpg", cat: "cars", title: "car1" },
  { src: "images/car2.jpg", cat: "cars", title: "car2" },
  { src: "images/car3.jpg", cat: "cars", title: "car3" },
  { src: "images/car4.jpg", cat: "cars", title: "car4" },

 
  { src: "images/sunset1.jpg", cat: "sunsets", title: "sunset1" },
  { src: "images/sunset2.jpg", cat: "sunsets", title: "sunset2" },
  { src: "images/sunset3.jpg", cat: "sunsets", title: "sunset3" },
  { src: "images/sunset4.jpg", cat: "sunsets", title: "sunset4" },

  
  { src: "images/cartoon1.jpg", cat: "cartoons", title: "cartoon1" },
  { src: "images/cartoon2.jpg", cat: "cartoons", title: "cartoon2" },
  { src: "images/cartoon3.jpg", cat: "cartoons", title: "cartoon3" },
  { src: "images/cartoon4.jpg", cat: "cartoons", title: "cartoon4" },


  { src: "images/animal1.jpg", cat: "animals", title: "animal1" },
  { src: "images/animal2.jpg", cat: "animals", title: "animal2" },
  { src: "images/animal3.jpg", cat: "animals", title: "animal3" },
  { src: "images/animal4.jpg", cat: "animals", title: "animal4" },


  { src: "images/anime1.jpg", cat: "anime", title: "anime1" },
  { src: "images/anime2.jpg", cat: "anime", title: "anime2" },
  { src: "images/anime3.jpg", cat: "anime", title: "anime3" },
  { src: "images/anime4.jpg", cat: "anime", title: "anime4" },


  { src: "images/fashion1.jpg", cat: "fashion", title: "fashion1" },
  { src: "images/fashion2.jpg", cat: "fashion", title: "fashion2" },
  { src: "images/fashion3.jpg", cat: "fashion", title: "fashion3" },
  { src: "images/fashion4.jpg", cat: "fashion", title: "fashion4" },

  { src: "images/bike1.jpg", cat: "motorbikes", title: "bike1" },
  { src: "images/bike2.jpg", cat: "motorbikes", title: "bike2" },
  { src: "images/bike3.jpg", cat: "motorbikes", title: "bike3" },
  { src: "images/bike4.jpg", cat: "motorbikes", title: "bike4" },


  { src: "images/coding1.jpg", cat: "coding", title: "code1" },
  { src: "images/coding2.jpg", cat: "coding", title: "code2" },
  { src: "images/coding3.jpg", cat: "coding", title: "code3" },
  { src: "images/coding4.jpg", cat: "coding", title: "code4" },
];


//   render gallery
const gallery = document.getElementById('gallery');

function renderGallery(filter = 'all') {
  gallery.innerHTML = '';
  const list = filter === 'all' ? images : images.filter(i => i.cat === filter);

  list.forEach((img, idx) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = images.indexOf(img);
    card.style.animationDelay = `${Math.min(idx * 0.05, 0.6)}s`;
    
    
    const imgElement = document.createElement('img');
    imgElement.src = img.src;
    imgElement.alt = img.title;
    imgElement.loading = 'lazy';
    imgElement.decoding = 'async';
    
    card.innerHTML = `
      <div class="card-badge">${getCategoryLabel(img.cat)}</div>
      <div class="card-overlay">
        <div class="card-title">${img.title}</div>
        <div class="card-action">View Image 🔍</div>
      </div>
    `;
    
    card.insertBefore(imgElement, card.firstChild);
    card.addEventListener('click', () => openLightbox(parseInt(card.dataset.index)));
    gallery.appendChild(card);
  });

  currentList = list.map(i => images.indexOf(i));
}

function getCategoryLabel(cat) {
  const map = {
    flowers: '🌸 Flowers',
    cars: '🚗 Cars',
    sunsets: '🌅 Sunsets',
    cartoons: '🎨 Cartoons',
    animals: '🐾 Animals',
    anime: '✨ Anime',
    fashion: '👗 Fashion',
    motorbikes: '🏍️ Motorbikes',
    coding: '💻 Coding'
  };
  return map[cat] || cat;
}


let currentFilter = 'all';
let currentList = images.map((_, i) => i);

document.getElementById('filters').addEventListener('click', (e) => {
  if (!e.target.classList.contains('filter-btn')) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  currentFilter = e.target.dataset.filter;
  renderGallery(currentFilter);
});


const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lbImg');
const lbCounter = document.getElementById('lbCounter');
const lbCaption = document.getElementById('lbCaption');
let currentIdx  = 0;

function openLightbox(globalIndex) {
  currentIdx = currentList.indexOf(globalIndex);
  if (currentIdx === -1) currentIdx = 0;
  updateLightbox();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const globalIdx = currentList[currentIdx];
  const img = images[globalIdx];
  lbImg.src = img.src;
  lbImg.alt = img.title;
  lbCounter.textContent = `${currentIdx + 1} / ${currentList.length}`;
  lbCaption.textContent = `${getCategoryLabel(img.cat)} · ${img.title}`;
}

function nextImage() {
  currentIdx = (currentIdx + 1) % currentList.length;
  updateLightbox();
}

function prevImage() {
  currentIdx = (currentIdx - 1 + currentList.length) % currentList.length;
  updateLightbox();
}

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbNext').addEventListener('click', nextImage);
document.getElementById('lbPrev').addEventListener('click', prevImage);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});


document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowRight') nextImage();
  else if (e.key === 'ArrowLeft') prevImage();
  else if (e.key === 'Escape') closeLightbox();
});


let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });
lightbox.addEventListener('touchend', (e) => {
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(diff) > 50) diff < 0 ? nextImage() : prevImage();
}, { passive: true });


renderGallery('all');
