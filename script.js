const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let isInitialLoad = true;
let Initialcount = 5;
const apiKey = '26XT1fz8wzO8OcsOU2BVlwYjnL56LUnF2fgOCjJwJZE';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${Initialcount}`;

function updateAPIUrlWithNewCount(picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

function imageLoaded(params) {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;

    }
}

function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Display Photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        img.addEventListener('load', imageLoaded)

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos from Unsplach API

async function getPhotos() {
    try {
        
        const response = await fetch(apiUrl);
        photosArray = await response.json();
       
        displayPhotos();
        if (isInitialLoad) {
            updateAPIUrlWithNewCount(30);
            isInitialLoad = false;
        }
    } catch (error) {
        
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();  
    }
})
getPhotos();
