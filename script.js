let allImages = [];
let currentIndex = 0;

function populateGallery(folderPath, elementId, imageCount) {
    const container = document.getElementById(elementId);
    if (!container) return;

    for (let i = 1; i <= imageCount; i++) {
        const imgSrc = `gallery/${folderPath}/foto${i}.png`;
        allImages.push(imgSrc);
        
        const wrapper = document.createElement('div');
        wrapper.className = 'img-wrapper';

        const img = document.createElement('img');
        img.src = imgSrc;
        const thisIndex = allImages.length - 1;

        img.onclick = function() {
            currentIndex = thisIndex;
            openLightbox(this.src);
        };

        wrapper.appendChild(img);

        if (folderPath === '2025' && i === 5) {
            const caption = document.createElement('p');
            caption.className = 'custom-caption';
            caption.innerText = "I radioamatori della CRI Puglia";
            wrapper.appendChild(caption);
        }

        img.onerror = function() { wrapper.style.display = 'none'; };
        container.appendChild(wrapper);
    }
}
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
    lightbox.style.display = 'flex';
    lightboxImg.src = src;
}

function showNext() {
    currentIndex = (currentIndex + 1) % allImages.length;
    lightboxImg.src = allImages[currentIndex];
}

function showPrev() {
    currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    lightboxImg.src = allImages[currentIndex];
}

document.querySelector('.next').onclick = (e) => { e.stopPropagation(); showNext(); };
document.querySelector('.prev').onclick = (e) => { e.stopPropagation(); showPrev(); };
document.querySelector('.close-lightbox').onclick = () => lightbox.style.display = 'none';

lightbox.onclick = (e) => { if (e.target !== lightboxImg) lightbox.style.display = 'none'; };

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "Escape") lightbox.style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    populateGallery('2025', 'gallery-2025', 5);
    populateGallery('2023', 'gallery-2023', 7);
});