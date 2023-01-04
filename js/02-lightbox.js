import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryContainer = document.querySelector(".gallery");

galleryContainer.insertAdjacentHTML(
  "beforeend",
  createGalleryItemsMarkup(galleryItems)
);

function createGalleryItemsMarkup(galleryItems) {
  return [...galleryItems]
    .map(
      (item) => `
      <li>
        <a class="gallery__item" href="${item.original}">
            <img
                class="gallery__image"
                src="${item.preview}"
                data-source="${item.original}"
                alt="${item.description}"
            />
        </a>
    </li>
    `
    )
    .join("");
}

new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
  overlayOpacity: 0.5,
  showCounter: false,
});
