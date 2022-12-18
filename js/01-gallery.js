import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const instance = basicLightbox.create(`<img>`, {
  onShow: () => window.addEventListener("keydown", closeModalByEscapePress),
  onClose: () => window.removeEventListener("keydown", closeModalByEscapePress),
});

galleryContainer.insertAdjacentHTML(
  "beforeend",
  createGallaryItemsMarkup(galleryItems)
);

galleryContainer.addEventListener("click", showModalImage);

function createGallaryItemsMarkup(galleryItems) {
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
  instance.element().lastElementChild.innerHTML = `<img src="${getUrlFromImageItem(
    event
  )}" alt="${event.target.alt}">`;

  instance.show();
}

function closeModalByEscapePress(event) {
  if (event.code === "Escape") {
    instance.close();
  }
}
