
const url = 'https://cors-anywhere.herokuapp.com/https://openaccess-api.clevelandart.org/api/artworks/?q=dog&has_image=1&limit=300'

const requestArt = (url) => {
    return fetch( url , {mode: 'cors', headers: {'Access-Control-Allow-Origin': 'https://openaccess-api.clevelandart.org'}})
    .then(response => response.json())
    .catch(function(error) {
        console.log('fetch failed: ', error.message)
    })
}

const loadJson = (url) =>{
    requestArt(url)
    .then(json => json.data.map(data => displayImage(data.images.web.url)))
}

const displayImage = (data) => {
    const artDiv = document.getElementById('art')
    const node = document.createElement('div')
    node.innerHTML = '<img id=artImg src="' + data + '"/>'
    artDiv.appendChild(node)
    return artDiv
}

loadJson(url)
