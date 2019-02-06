
const requestArt = () => {
    const header = new Headers({
        'Access-Control-Allow-Origin': 'https://openaccess-api.clevelandart.org',
    });

    fetch('https://cors-anywhere.herokuapp.com/https://openaccess-api.clevelandart.org/api/artworks/?q=china&has_image=1&limit=1&indent=1'
    , {mode: 'cors', headers: header})
        .then(response => response.json())
        .then(response => response.data)
        .then(response => response.map(piece => ({
            img: piece.images.web.url,
            desc: piece.wall_description
        }))).then(resource => resource.map(render))
        .catch(function(error) {
            console.log('fetch failed: ', error.message)
        })
        
        const art = document.getElementById('art')

        const render = piece => {
            const desc = piece.desc
            const node = document.createElement('div')
            node.innerHTML = '<img src="' + piece.img + '"/>' + '<p>' + desc + '</p>'
            art.appendChild(node)
          return piece
        }
    }

requestArt();