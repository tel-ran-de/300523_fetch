const userContainer = document.createElement('ul')
root.append(userContainer)

let currentUserId = 1

const showUserAndPosts = (userName, userEmail, posts) => {
  userContainer.innerHTML = ''
  const user = document.createElement('li')
  const name = document.createElement('h1')
  name.innerText = userName
  const email = document.createElement('h2')
  email.innerText = userEmail
  user.append(name, email)
  userContainer.append(user)

  posts.forEach((product) => {
    const post = document.createElement('li')
    const title = document.createElement('h4')
    title.innerText = product.title
    const body = document.createElement('p')
    body.innerText = product.body
    post.append(title, body)
    userContainer.append(post)
  })

  root.append(userContainer)
}

const getUserAndPosts = async (userId) => {
  try {
    const [userResponse, postResponse] = await Promise.all([
      fetch(`https://dummyjson.com/users/${userId}`),
      fetch(`https://dummyjson.com/posts/user/${userId}`),
    ])
    if (!userResponse.ok) {
      throw Error('User not found')
    }

    if (!postResponse.ok) {
      throw Error('no posts found for user')
    }
    const userData = await userResponse.json()
    const postData = await postResponse.json()
    console.log(userData)
    showUserAndPosts(userData.firstName, userData.email, postData.posts)
  } catch (error) {
    userContainer.innerHTML = `<h1>${error.message}</h1>`
  }
}
getUserAndPosts(currentUserId)

// КНОПКИ
const getNextUser = async () => {
  console.log('next')
}
const getPreviousUser = async () => {
  console.log('previous')
}

const appendNextUserButton = () => {
  const button = document.createElement('button')
  button.textContent = 'Next User'
  button.id = 'next-user-button'
  button.addEventListener('click', getNextUser)
  root.appendChild(button)
}

const appendPreviousUserButton = () => {
  const button = document.createElement('button')
  button.textContent = 'Previous User'
  button.addEventListener('click', getPreviousUser)
  root.appendChild(button)
}

appendPreviousUserButton()
appendNextUserButton()
