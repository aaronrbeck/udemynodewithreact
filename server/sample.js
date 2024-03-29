//make ajax request, user the fetch function
//https://rallycoding.herokuapp.com/api/music_albums

// function fetchAlbums(){
//     fetch('https://rallycoding.herokuapp.com/api/music_albums')
//     .then(res => res.json())
//     .then(json => console.log(json))
// }
// fetchAlbums()

//es2017 syntax: async await

// async function fetchAlbums() {
//     const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
//         const json = await res.json()
//     console.log(json)
//     }

//with arrow functions:
const fetchAlbums = async () => {
    const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
    const json = await res.json()
    console.log(json)
}

fetchAlbums()
