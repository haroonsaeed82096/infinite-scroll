const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = '26XT1fz8wzO8OcsOU2BVlwYjnL56LUnF2fgOCjJwJZE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Display Photos
function displayPhotos() {
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

        console.log("Image", img);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos from Unsplach API

async function getPhotos() {
    try {
        
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log("pHOTO ARRAY", photosArray);
        displayPhotos();
    } catch (error) {
        
    }
}

getPhotos();