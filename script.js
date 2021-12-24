const API_KEY = 'api_key=c77e81799fee2b1fcc8df1b816c76629'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const mainEl = document.getElementById('main')
const formEL = document.getElementById('form')
const searchEl = document.getElementById('search')
const search_URL = BASE_URL +  '/search/movie?' + API_KEY

getmovies(API_URL)

function getmovies(url){
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results)
    })
}

function showMovies(data){
    mainEl.innerHTML = ''

    data.forEach(movie => {
        const {poster_path,title,overview,vote_average} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">
                    ${vote_average}
                </span>
            </div>
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview}
                </div>
        
        `
        mainEl.appendChild(movieEl)
    });
}

function getColor(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}

formEL.addEventListener('submit', (e) =>{
    e.preventDefault()

    const searchParam = searchEl.value

    if(searchParam){
        getmovies(search_URL +'&query='+ searchParam)
    }else{
        getmovies(API_URL)
    }
})
