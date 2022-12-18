import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
galleryContainer.insertAdjacentHTML(
  "beforeend",
  createGallaryItemsMarkup(galleryItems)
);

galleryContainer.addEventListener("click", createModalMarkup);

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

function createModalMarkup(event) {
  if (!getUrlFromImageItem(event)) {
    return;
  }

  const instance = basicLightbox.create(
    `
  <img src="${getUrlFromImageItem(event)}" alt="${event.target.alt}">
`
  );

  instance.show(() => {
    window.addEventListener("keydown", escapeHandler);
  });
  console.log(instance);

  function escapeHandler(event) {
    if (event.code === "Escape") {
      instance.close(window.removeEventListener("keydown", escapeHandler));
    }
  }
}

