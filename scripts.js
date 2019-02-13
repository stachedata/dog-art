
const url = 'https://cors-anywhere.herokuapp.com/https://openaccess-api.clevelandart.org/api/artworks/' +
            '?q=dog&has_image=1&limit=10' //data query

//fetchs and returns json promise from api
const requestArt = (url, randomize) => {
    return fetch( url , {mode: 'cors', headers: {'Access-Control-Allow-Origin': 'https://openaccess-api.clevelandart.org'}})
    .then(response => parseJson(response.json(), randomize))
    .catch(error => console.log('fetch failed: ', error.message))  
}

//parse json to create an object instead of an array
//sends object properties to container functions
const parseJson = (json, randomize) => {
    json.then(json => {
        let array = json.data
        if (randomize == true) array = randomizeArt(array) //randomize data if trigger by randomize button
        for(let data of array){
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

const displayArt = (image,title,culture,description) => {
    const container = document.getElementById('container')
    const artDiv = document.createElement('div')
    artDiv.className = "artDiv"
    const labelOverlay = document.createElement('div')
    labelOverlay.className = "labelOverlay"
    artDiv.innerHTML = '<img class=artImage src="' + image + '"/>'
    labelOverlay.innerHTML = '<div class=artInfo>' + title + '<br>' + culture + '<br>' + description
    container.appendChild(artDiv).appendChild(labelOverlay)
    return container
}

const randomizeArt = (a) =>{
    //Fisher-Yates shuffle algorithm 
    //location.reload(true)
    let j, x, i
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = a[i]
        a[i] = a[j]
        a[j] = x
    }
    return a
}

document.getElementById('randomize').onclick = requestArt(url,true)