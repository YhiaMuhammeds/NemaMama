fetch('products.json')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById("product-details");
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get("id"));
    const product = products.find(p => p.id === id);

    if (product) {
      let thumbnails = product.images.map(img => `
        <img src="${img}" onclick="document.getElementById('main-img').src='${img}'">
      `).join('');

      let colorFilters = product.colors.map(color => `<span class="color-filter">${color}</span>`).join('');

      container.innerHTML = `
        <div class="product-page">
          <h2>${product.name}</h2>
          <img id="main-img" src="${product.images[0]}" onclick="showPopup(this.src)">
          <div class="preview-thumbs">${thumbnails}</div>
          <p>${product.description}</p>
          <div class="colors">ألوان متاحة: ${colorFilters}</div>
          <br>
          <button onclick="location.href='order.html?product=${encodeURIComponent(product.name)}'">اطلب الآن</button>
        </div>
      `;
      
    }
    
  });
  

function showPopup(src) {
  document.getElementById("popup-img").src = src;
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
