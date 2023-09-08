// Primera forma de llamar una API
// const Url = ('https://api.thecatapi.com/v1/images/search?api_key=YOUR_API_KEYhttps://api.thecatapi.com/v1/images/search')

// fetch (Url)
//     .then(res => res.json())
//     .then(data =>{
//         const img = document.querySelector('img')
//         img.src = data[0].url
//     })


// Segunda forma de llamar una API Usando async y await 

const API_URL = ('https://api.thecatapi.com/v1/images/search?limit=9&api_key=live_YxBoC39XVelSY8iP9Gxo5yY6Z9UfUXK5qNj9IDUs6YyKtY13zxe8yxMDqyquPoz7')

// Se aplica una lógica para utilizar un botón que recargue la página cada que se le dá click
async function reload(){
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log(data)

    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;


}

// Se deja la función por fuera para que siempre que se recargue la página se ejecute:
reload();