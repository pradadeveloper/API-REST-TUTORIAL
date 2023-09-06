// Primera forma de llamar una API
// const Url = ('https://api.thecatapi.com/v1/images/search?api_key=YOUR_API_KEYhttps://api.thecatapi.com/v1/images/search')

// fetch (Url)
//     .then(res => res.json())
//     .then(data =>{
//         const img = document.querySelector('img')
//         img.src = data[0].url
//     })


// Segunda forma de llamar una API Usando async y await 

const API_URL = ('https://api.thecatapi.com/v1/images/search?api_key=YOUR_API_KEYhttps://api.thecatapi.com/v1/images/search')

// Se aplica una lógica para utilizar un botón que recargue la página cada que se le dá click
async function reload(){
    const res = await fetch(API_URL);
    const data = await res.json();

    const img = document.querySelector('img');
    img.src = data[0].url;
}

// Se deja la función por fuera para que siempre que se recargue la página se ejecute:
reload()