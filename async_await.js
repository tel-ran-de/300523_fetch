const root = document.querySelector('#root')
const form = document.querySelector('form')
const titleValue = document.querySelector('#title')
const descriptionValue = document.querySelector('#description')

const showProduct = (product) => {
  const productCard = document.createElement('div')
  const title = document.createElement('h2')
  title.innerText = product.title
  const description = document.createElement('p')
  description.innerText = product.description
  productCard.append(title, description)
  root.append(productCard)
}

const addNewPost = async (product) => {
  const response = await fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(product),
  })
  const data = await response.json()
  showProduct(data)
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const newProduct = {
    title: titleValue.value,
    description: descriptionValue.value,
  }
  addNewPost(newProduct)

  titleValue.value = ''
  descriptionValue.value = ''
})
