
const url = 'https://cors-anywhere.herokuapp.com/https://openaccess-api.clevelandart.org/api/artworks/' +
            '?q=dog&has_image=1&limit=3' //data query

//fetchs and returns json promise from api
const requestArt = (url) => {
    return fetch( url , {mode: 'cors', headers: {'Access-Control-Allow-Origin': 'https://openaccess-api.clevelandart.org'}})
    .then(response => response.json())
    .catch(function(error) {
        console.log('fetch failed: ', error.message)
    })
}

//parse json to create an object instead of an array
//sends object properties to container functions
const parseJson = (url) => {
    requestArt(url)
    .then(json => {
        for(let data of json.data){
            data = {
                image: data.images.web.url,
                title: data.title,
                culture: data.culture[0],
                description: data.wall_description
            }
            displayArt(data.image,data.title,data.culture,data.description)
        }
    })
}

parseJson(url)

const displayArt = (image,title,culture,description) => {
    const container = document.getElementById('container')
    const artDiv = document.createElement('div')
    artDiv.className = "artDiv"
    const artImage = document.createElement('div')
    artImage.className = "artImage"
    const artInfo = document.createElement('div')
    artInfo.className = "artInfo"
    artImage.innerHTML = '<img id=artImg src="' + image + '"/>'
    artInfo.innerHTML = '<p>' + title + '<br>' + culture + '<br>' + description + '</p>'
    container.appendChild(artDiv).appendChild(artImage).appendChild(artInfo)
    return container
}