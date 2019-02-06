
const url = 'https://cors-anywhere.herokuapp.com/https://openaccess-api.clevelandart.org/api/artworks/?q=china&has_image=1&limit=1&indent=1'

const requestArt = (url) => {
    fetch( url , {mode: 'cors', headers: {'Access-Control-Allow-Origin': 'https://openaccess-api.clevelandart.org'}})
    .then(response => response.json())
    .then(json => json.data)
    .then(data => data.map(data => ({
        image: data.images.web.url,
        description: data.wall_description
    }))).then(output => output.map(render))
    .catch(function(error) {
        console.log('fetch failed: ', error.message)
    })
    
    const artDiv = document.getElementById('art')

    const render = art => {
        const node = document.createElement('div')
        node.innerHTML = '<img src="' + art.image + '"/>' + '<p>' + art.description + '</p>'
        artDiv.appendChild(node)
        return artDiv
    }
}

requestArt(url);