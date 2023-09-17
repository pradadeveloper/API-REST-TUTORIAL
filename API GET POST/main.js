// Primera forma de llamar una API
// const Url = ('https://api.thecatapi.com/v1/images/search?api_key=YOUR_API_KEYhttps://api.thecatapi.com/v1/images/search')

// fetch (Url)
//     .then(res => res.json())
//     .then(data =>{
//         const img = document.querySelector('img')
//         img.src = data[0].url
//     })


// Segunda forma de llamar una API Usando async y await 

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';
const API_URL_FAVOTITES = 'https://api.thecatapi.com/v1/favourites?api_key=c08d415f-dea7-4a38-bb28-7b2188202e46';
const API_URL_FAVOTITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=c08d415f-dea7-4a38-bb28-7b2188202e46`;

const spanError = document.getElementById('error')

// Se aplica una lógica para utilizar un botón que recargue la página cada que se le dá click PRACTICA METODO GET
async function loadRandomMichis(){
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log('Random')
    console.log(data)

    if(res.status !==200){
        spanError.innerHTML="Hubo un error"+res.status;
    }else{
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');

        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () =>saveFavouriteMichi(data[0].id);
        btn2.onclick = () => saveFavouriteMichi(data[1].id);
    }
}

// FUNCION PARA MOSTRAR UN FAVORITO PRACTICA METODO RES
async function loadMichisFavoritos(){
    const res = await fetch(API_URL_FAVOTITES);
    const data = await res.json();
    console.log('Favoritos')
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML="Hubo un error: "+res.status+data.message;
    }else{
        const section = document.getElementById('favoritiesMichies');
        section.innerHTML = "";

        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Michis Favoritos Prada');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(michi => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar al michi de favoritas');

            img.src = michi.image.url;
            img.width = 150;
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavouiriteMichi(michi.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
}

// FUNCION PARA GUARDAR UN FAVORITO PRACTICA METODO POST
async function saveFavouriteMichi(id){
    const res = await fetch (API_URL_FAVOTITES,
        {
            method: 'POST',
    // Forma en la que me voy a comunicar con el back-end
        headers:{
        'Content-Type': 'application/json'
        },
    // La información que voy a enviar al back-end
        body: JSON.stringify({
            image_id: id
        })
    });

    const data =await res.json();

    console.log('Save')
    console.log(res)

    if(res.status !==200){
        spanError.innerHTML="Hubo un error: "+res.status+data.message;
    }else{
        console.log('Michi guardado en favoritos')
    }
    loadMichisFavoritos();
}

// FUNCION PARA ELIMINAR MICHI---DELETE
async function deleteFavouiriteMichi(id){
    const res = await fetch(API_URL_FAVOTITES_DELETE(id),{
        method:'DELETE',
    });
    const data = await res.json();

    if(res.status !==200){
        spanError.innerHTML="Hubo un error: "+res.status+data.message;
    } else {
        console.log('Michi eliminado de favoritos')
        loadMichisFavoritos();
    }
}


// Se deja la función por fuera para que siempre que se recargue la página se ejecute:
loadRandomMichis();
loadMichisFavoritos();