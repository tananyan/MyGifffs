"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const AK = "Nz64mFZuMh2k2MtqmSPFJJki75cv0Vr5";
  let q = "";
  let limit = 15;
  let rating = "g"; // g, pg, pg-13 and r
  let lang = "ru"; // en, ru

  const search = document.querySelector("#search");
  const number = document.querySelector("#number");
  // const btnSearch = document.querySelector("#btnSearch");
  const formSearching = document.querySelector("#formSearching");

  formSearching.addEventListener("submit", (e) => {
    e.preventDefault();

    // inputs
    q = search.value.trim().replace(/ /g, "+");
    limit = number.value;

    // search
    searchGif(q, limit, rating, lang);

    // clean
    // formSearching.reset();
  });

  function searchGif(str, count, rait, lng) {
    let myUrl = `https://api.giphy.com/v1/gifs/search?api_key=${AK}&q=${str}&limit=${count}&offset=0&rating=${rait}&lang=${lng}`;

    fetch(myUrl)
      .then((response) => response.json())
      .then((content) => {
        // Делаем запрос, передавая данные
        createSearchGif(content.data);

        console.log(content.data);
        console.log("meta:", content.meta);
      })
      .catch((err) => console.error(err));

    return myUrl;
  }

  // Функуия отрисовки картинок
  function createSearchGif(data) {
    // 5 колонок по умолчанию
    let numberOfColumns = 5;
    // Получение ширины окна
    let widthCurrent = document.documentElement.clientWidth;
    // Адаптивность
    if (widthCurrent < 992) {
      numberOfColumns = 3;
    }

    const columns = document.querySelectorAll(".gifs__column");
    columns.forEach((column) => (column.innerHTML = ""));

    for (let i = 0; i < data.length; i++) {
      // let fig = document.createElement("figure");
      let img = document.createElement("img");
      // let fc = document.createElement("figcaption");

      img.src = data[i].images.downsized.url;
      img.alt = data[i].title;
      // fc.textContent = data[i].title;

      // fig.appendChild(img);
      // fig.appendChild(fc);

      // Индекс
      let k = i % numberOfColumns;
      columns[k].insertAdjacentElement("beforeend", img);
    }
  }
});
