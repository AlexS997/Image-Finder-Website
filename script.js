
const accessKey = 'Z9DkwvEHl4ftukfJ4riVwdqsdYX_E3gdM8f-NoHU914'

const formEl = document.querySelector("form")
const inputEl = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-button")

let inputData = ""
let pageNumber = 1

async function searchImages()
{
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results

    if(pageNumber === 1)
    {
        searchResults.innerHTML = ""
    }

    results.map((result) => {
        const divImage = document.createElement('div')
        divImage.classList.add('search-result')
        
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description

        const imageLink = document.createElement('a')
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        divImage.appendChild(image)
        divImage.appendChild(imageLink)
        searchResults.appendChild(divImage)
    })

    pageNumber++

    if(pageNumber > 1)
    {
        showMore.style.display = 'block'
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault()
    pageNumber = 1;
    searchImages()
})

showMore.addEventListener("click", () => {
    searchImages()
})