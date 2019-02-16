
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
        if (randomize == true) array = randomizeArt(array) //randomize data if triggered by randomize button
        for(let data of array){
            data = {
                image: data.images.web.url,
                title: data.title,
                culture: data.culture[0],
                description: data.wall_description ? data.wall_description : '' //replace null description with empty string
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
    labelOverlay.innerHTML = '<div class=artInfo>' + title + '<br>' + culture + '<br><br>' + description
    container.appendChild(artDiv).appendChild(labelOverlay)
    return container
}

const removeArt = () => {
    let container = document.getElementById('container')
    while (container.firstChild) container.removeChild(container.firstChild)
}

const randomizeArt = (a) =>{
    removeArt() //first remove previous art on page
    //Fisher-Yates shuffle algorithm 
    let j, x, i
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = a[i]
        a[i] = a[j]
        a[j] = x
    }
    return a
}

//Button to randomize art
document.getElementById('randomize').onclick = () => requestArt(url,true)

//Populate art
requestArt(url,false)