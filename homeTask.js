const root = document.querySelector('#root')

const showEachProduct = (arrayOfProducts) => {
  arrayOfProducts.forEach((product) => {
    const productCard = document.createElement('div')
    const title = document.createElement('h2')
    title.innerText = product.title
    const description = document.createElement('p')
    description.innerText = product.description

    const image = document.createElement('img')
    image.src = product.images[0] // url картинки добавляем в src
    productCard.append(title, description, image)
    productCard.classList.add('.product-card')
    root.append(productCard)
  })
}

const fetchProducts = (callback) => {
  fetch('https://dummyjson.com/products')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      const arrayOfProducts = data.products
      callback(arrayOfProducts)
    })
}

fetchProducts((arrayOfProducts) => showEachProduct(arrayOfProducts))
