import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const galleryInstance = basicLightbox.create(`<img>`, {
  onShow: () => window.addEventListener("keydown", closeModalByEscapePress),
  onClose: () => window.removeEventListener("keydown", closeModalByEscapePress),
});
const galleryInstanceImage = galleryInstance.element().querySelector("img");

galleryContainer.insertAdjacentHTML(
  "beforeend",
  createGalleryItemsMarkup(galleryItems)
);
galleryContainer.addEventListener("click", showModalImage);

function createGalleryItemsMarkup(galleryItems) {
  return [...galleryItems]
    .map(
      (item) => `<div class="gallery__item">
    <a class="gallery__link" href="${item.original}">
      <img
        class="gallery__image"
        src="${item.preview}"
        data-source="${item.original}"
        alt="${item.description}"
      />
    </a>
  </div>`
    )
    .join("");
}

function getUrlFromImageItem(event) {
  event.preventDefault();
  const { nodeName, dataset } = event.target;
  if (nodeName !== "IMG") {
    return;
  }
  return dataset.source;
}

function showModalImage(event) {
  if (!getUrlFromImageItem(event)) {
    return;
  }

  // v1
  // galleryInstance.element().lastElementChild.innerHTML = `<img
  // src="${getUrlFromImageItem(event)}"
  // alt="${event.target.alt}">`;

  // v2
  galleryInstanceImage.src = `${getUrlFromImageItem(event)}`;
  galleryInstanceImage.alt = `${event.target.alt}`;

  galleryInstance.show();
}

function closeModalByEscapePress(event) {
  if (event.code !== "Escape") {
    return;
  }
  galleryInstance.close();
}

console.log(galleryItems);