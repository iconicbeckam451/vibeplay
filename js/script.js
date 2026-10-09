const folders = [
  {
    id: "Nida",
    name: "Nida",
    cover: "media/images/nida11.jpg",
    items: [
      { id: 1, type: "video", title: "Nida.mp4", image: "media/images/nida11.jpg", video: "media/videos/nida.mp4", description: "Video lokal dari folder media/videos." },
      { id: 2, type: "video", title: "Nida 2.mp4", image: "media/images/nida2.jpg", video: "media/videos/nida2.mp4", description: "Video lokal dari folder media/videos." },
      { id: 3, type: "image", title: "Nida 1.jpg", image: "media/images/nida1.jpg", description: "Gambar lokal dari folder media/images." },
      { id: 4, type: "image", title: "Nida 2.jpg", image: "media/images/nida2.jpg", description: "Gambar lokal dari folder media/images." },
      { id: 5, type: "image", title: "Nida 3.jpg", image: "media/images/nida3.jpg", description: "Gambar lokal dari folder media/images." },
      { id: 6, type: "image", title: "Nida 4.jpg", image: "media/images/nida4.jpg", description: "Gambar lokal dari folder media/images." },
      { id: 7, type: "image", title: "Nida 5.jpg", image: "media/images/nida5.jpg", description: "Gambar lokal dari folder media/images." },
      { id: 8, type: "image", title: "Nida 6.jpg", image: "media/images/nida6.jpg", description: "Gambar lokal dari folder media/images." },
      { id: 9, type: "image", title: "Nida 7.jpg", image: "media/images/nida7.jpg", description: "Gambar lokal dari folder media/images." },
      { id: 10, type: "image", title: "Nida 8.jpg", image: "media/images/nida8.jpg", description: "Gambar lokal dari folder media/images." },
      { id: 11, type: "image", title: "Nida 9.jpg", image: "media/images/nida9.jpg", description: "Gambar lokal dari folder media/images." },
      { id: 12, type: "image", title: "Nida 10.jpg", image: "media/images/nida10.jpg", description: "Gambar lokal dari folder media/images." },
      { id: 13, type: "image", title: "Nida 11.jpg", image: "media/images/nida11.jpg", description: "Gambar lokal dari folder media/images." },
      { id: 14, type: "image", title: "Nida 12.jpg", image: "media/images/nida12.jpg", description: "Gambar lokal dari folder media/images." },
      { id: 15, type: "image", title: "Nida 13.jpg", image: "media/images/nida13.jpg", description: "Gambar lokal dari folder media/images." },
      { id: 16, type: "image", title: "Nida 14.jpg", image: "media/images/nida14.jpg", description: "Gambar lokal dari folder media/images." },
      { id: 17, type: "image", title: "Nida 15.jpg", image: "media/images/nida15.jpg", description: "Gambar lokal dari folder media/images." }
    ]
  },
    {
    id: "Anis",
    name: "Anis",
    cover: "media/images/anis.jpg",
    items: [
      { id: 1, type: "video", title: "Anis.mp4", image: "media/images/anis.jpg", video: "media/videos/anis.mp4", description: "Video lokal dari folder media/videos." }
    ]
  }
];
const grid = document.getElementById("videoGrid");
const folderGrid = document.getElementById("folderGrid");
const breadcrumbs = document.getElementById("breadcrumbs");
const backFolder = document.getElementById("backFolder");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const toastEl = document.getElementById("toast");
let currentFolder = null;
let searchTerm = "";
let toastTimer;
let liked = new Set();
function imageUrl(path) { return path; }
function showToast(message) {
  toastEl.textContent = message; toastEl.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
}
function renderVideos() {
  const term = searchTerm.toLowerCase();
  breadcrumbs.innerHTML = currentFolder
    ? `<button class="crumb-home" id="crumbHome">Galeri Saya</button><span> / </span><strong>${currentFolder.name}</strong>`
    : `<strong>Galeri Saya</strong>`;
  backFolder.classList.toggle("hidden", !currentFolder);
  if (!currentFolder) {
    const list = folders.filter(f => f.name.toLowerCase().includes(term) || f.items.some(i => i.title.toLowerCase().includes(term)));
    folderGrid.innerHTML = list.map(f => `<button class="folder-card" data-folder-id="${f.id}">
      <div class="folder-cover"><img src="${f.cover}" alt=""><span class="folder-symbol">📁</span></div>
      <div class="folder-card-info"><strong>${f.name}</strong><span>${f.items.filter(i=>i.type==='image').length} gambar · ${f.items.filter(i=>i.type==='video').length} video</span></div><span class="folder-arrow">↗</span>
    </button>`).join("");
    folderGrid.classList.toggle("hidden", list.length === 0); grid.classList.add("hidden");
    emptyState.classList.toggle("hidden", list.length > 0); return;
  }
  folderGrid.classList.add("hidden");
  const items = currentFolder.items.filter(i => i.title.toLowerCase().includes(term));
  grid.innerHTML = items.map(i => `<article class="video-card" tabindex="0" role="button" data-media-id="${i.id}">
    <div class="thumb-wrap"><img src="${i.image}" alt="${i.title}" loading="lazy"><span class="thumb-tag">${i.type==='video'?'▶ VIDEO':'▧ GAMBAR'}</span>${i.type==='video'?'<span class="duration">MP4</span>':''}</div>
    <div class="card-bottom"><div class="creator-avatar">${i.type==='video'?'▶':'▧'}</div><div class="card-copy"><h3>${i.title}</h3><p class="creator-name">Galeri Saya</p><p class="video-meta">${i.type==='video'?'Video':'Gambar'} · File lokal</p></div></div>
  </article>`).join("");
  grid.classList.toggle("hidden", items.length === 0); emptyState.classList.toggle("hidden", items.length > 0);
}
folderGrid.addEventListener("click", e => { const card=e.target.closest("[data-folder-id]"); if(!card)return; currentFolder=folders.find(f=>f.id===card.dataset.folderId); renderVideos(); });
backFolder.addEventListener("click",()=>{currentFolder=null;renderVideos();});
breadcrumbs.addEventListener("click",e=>{if(e.target.closest("#crumbHome")){currentFolder=null;renderVideos();}});
function openVideo(item) {
  document.getElementById("modalCategory").textContent = item.type === "image" ? "GAMBAR · GALERI VIBEPLAY" : "VIDEO · GALERI VIBEPLAY";
  document.getElementById("modalTitle").textContent = item.title;
  document.getElementById("modalDescription").textContent = item.description;
  const frame=document.getElementById("playerFrame");
  frame.innerHTML = item.type === "image" ? `<img class="preview-image" src="${item.image}" alt="${item.title}">` : `<video controls autoplay playsinline poster="${item.image}"><source src="${item.video}" type="video/mp4">Browser kamu tidak mendukung pemutar video.</video>`;
  const likeBtn=document.getElementById("modalLike"); likeBtn.dataset.videoId=item.id;
  likeBtn.classList.toggle("liked",liked.has(item.id)); likeBtn.innerHTML=`${liked.has(item.id)?'♥':'♡'} <span>${liked.has(item.id)?'Disukai':'Sukai'}</span>`;
  document.getElementById("videoModal").classList.remove("hidden"); document.body.style.overflow="hidden";
}
function closeVideoModal(){document.getElementById("videoModal").classList.add("hidden");document.getElementById("playerFrame").innerHTML="";document.body.style.overflow="";}
function closeUploadModal(){document.getElementById("uploadModal").classList.add("hidden");document.body.style.overflow="";}
grid.addEventListener("click",e=>{const card=e.target.closest("[data-media-id]");if(!card||!currentFolder)return;const item=currentFolder.items.find(i=>i.id===Number(card.dataset.mediaId));if(item)openVideo(item);});
grid.addEventListener("keydown",e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('.video-card')){e.preventDefault();const item=currentFolder?.items.find(i=>i.id===Number(e.target.dataset.mediaId));if(item)openVideo(item);}});
document.getElementById("searchForm").addEventListener("submit",e=>{e.preventDefault();searchTerm=searchInput.value.trim();renderVideos();});
searchInput.addEventListener("input",()=>{searchTerm=searchInput.value.trim();renderVideos();});
document.getElementById("resetBtn").addEventListener("click",()=>{searchInput.value="";searchTerm="";currentFolder=null;renderVideos();});
document.getElementById("viewAllBtn").addEventListener("click",()=>{searchInput.value="";searchTerm="";currentFolder=null;renderVideos();folderGrid.scrollIntoView({behavior:"smooth",block:"center"});});
document.getElementById("exploreBtn")?.addEventListener("click",()=>{document.querySelector(".video-section")?.scrollIntoView({behavior:"smooth"});showToast("Buka folder untuk melihat gambar dan video.");});
function showUploadDemo(){document.getElementById("uploadModal").classList.remove("hidden");document.body.style.overflow="hidden";}
document.getElementById("creatorBtn")?.addEventListener("click",showUploadDemo);document.getElementById("uploadBtn")?.addEventListener("click",showUploadDemo);
document.getElementById("uploadClose")?.addEventListener("click",closeUploadModal);document.querySelector("[data-close-upload]")?.addEventListener("click",closeUploadModal);
document.getElementById("demoUpload")?.addEventListener("click",()=>{const title=document.getElementById("demoTitle")?.value.trim();if(!title){showToast("Isi judul video demo terlebih dahulu.");return;}closeUploadModal();const titleInput=document.getElementById("demoTitle");if(titleInput) titleInput.value="";showToast("Ini hanya demo; tambahkan file melalui folder project dan daftar JavaScript.");});
document.getElementById("modalClose").addEventListener("click",closeVideoModal);document.querySelector("[data-close]").addEventListener("click",closeVideoModal);
document.getElementById("modalLike").addEventListener("click",e=>{const id=Number(e.currentTarget.dataset.videoId);if(liked.has(id))liked.delete(id);else liked.add(id);e.currentTarget.classList.toggle("liked",liked.has(id));e.currentTarget.innerHTML=`${liked.has(id)?'♥':'♡'} <span>${liked.has(id)?'Disukai':'Sukai'}</span>`;showToast(liked.has(id)?"Ditambahkan ke video disukai.":"Dihapus dari video disukai.");});
document.getElementById("mobileMenu")?.addEventListener("click",()=>document.getElementById("sidebar")?.classList.toggle("open"));
document.getElementById("profileBtn")?.addEventListener("click",()=>showToast("Profil pengguna masih versi demo."));
document.querySelectorAll("[data-nav]").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll("[data-nav]").forEach(n=>n.classList.toggle("active",n===btn));const nav=btn.dataset.nav;document.getElementById("sidebar").classList.remove("open");if(nav==="Beranda"||nav==="Jelajahi"){showToast(nav==="Jelajahi"?"Pilih folder untuk menjelajah.":"Kamu berada di beranda.");document.querySelector(".content").scrollIntoView({behavior:"smooth"});}else showToast(`${nav} masih versi demo.`);}));
// Slider banner: setiap slide menggunakan gambar dan video yang berbeda.
const featuredSlides = [
  {
    label: "✦ PILIHAN EDITOR",
    title: "Momen yang selalu berarti.",
    subtitle: "Simpan cerita favoritmu dalam satu tempat.",
    image: "media/images/nida14.jpg",
    video: "media/videos/nida.mp4",
    videoTitle: "Nida.mp4",
    description: "Video Nida dari koleksi lokal."
  },
  {
    label: "✦ KOLEKSI PILIHAN",
    title: "Cerita dari sudut berbeda.",
    subtitle: "Temukan momen lain yang ingin kamu simpan.",
    image: "media/images/anis.jpg",
    video: "media/videos/anis.mp4",
    videoTitle: "Anis.mp4",
    description: "Video Anis dari koleksi lokal."
  },
  {
    label: "✦ MOMEN FAVORIT",
    title: "Putar kembali kenanganmu.",
    subtitle: "Setiap gambar dan video punya ceritanya sendiri.",
    image: "media/images/nida2.jpg",
    video: "media/videos/nida2.mp4",
    videoTitle: "Nida 2.mp4",
    description: "Video Nida 2 dari koleksi lokal."
  }
];
let featuredIndex = 0;

function renderFeaturedSlide() {
  const slide = featuredSlides[featuredIndex];
  const image = document.getElementById("featuredImage");
  image.src = slide.image;
  image.alt = slide.title;
  document.getElementById("featuredLabel").textContent = slide.label;
  document.getElementById("featuredTitle").textContent = slide.title;
  document.getElementById("featuredSubtitle").textContent = slide.subtitle;
  document.getElementById("featuredCurrent").textContent = String(featuredIndex + 1).padStart(2, "0");
  document.getElementById("featuredTotal").textContent = String(featuredSlides.length).padStart(2, "0");
}

document.getElementById("featuredPrev")?.addEventListener("click", () => {
  featuredIndex = (featuredIndex - 1 + featuredSlides.length) % featuredSlides.length;
  renderFeaturedSlide();
});
document.getElementById("featuredNext")?.addEventListener("click", () => {
  featuredIndex = (featuredIndex + 1) % featuredSlides.length;
  renderFeaturedSlide();
});
document.getElementById("featuredPlay")?.addEventListener("click", () => {
  const slide = featuredSlides[featuredIndex];
  openVideo({
    id: 100 + featuredIndex,
    type: "video",
    title: slide.videoTitle,
    description: slide.description,
    image: slide.image,
    video: slide.video
  });
});
renderFeaturedSlide();
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeVideoModal();closeUploadModal();document.getElementById("sidebar").classList.remove("open");}});
renderVideos();
