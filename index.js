// Make the fetch request with the provided options
var global_remaining = 0;
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const movies = await fetchFilms();
        if (movies) {
            const movieList = document.querySelector('.movieList');
            movieList.innerHTML = ''; // Clear existing items
            movies.forEach(movie => {
                const li = document.createElement('li');
                li.className = 'movieItem';
                li.textContent = movie.title; // Assuming the movie object has a 'title' property
                
                li.id = `movie-${movie.id}`; 
                li.addEventListener('click', () => singleMovie(movie.id));
                movieList.appendChild(li);
            });
        }

        singleMovie(1)
    } catch (error) {
        console.error('Error during document load:', error);
    }

});


async function singleMovie(id) {
    // fetch movie detail
    // console.log(id);
    const particularMovie = await fetchFilms(id);

    const poster = document.getElementById('poster');
    poster.src  = particularMovie.poster
    //
    const title = document.getElementById('title');
    title.textContent = particularMovie.title
    
    const runtime = document.getElementById('runtime');
    runtime.textContent =  particularMovie.runtime
    
    const capacity = document.getElementById('capacity');
    capacity.textContent =  particularMovie.capacity
    
    const showtime = document.getElementById('showtime');
    showtime.textContent = particularMovie.showtime
    
    const tickets_sold = document.getElementById('tickets_sold');
    tickets_sold.textContent = particularMovie.runtime
    
    const description = document.getElementById('description');
    description.textContent = particularMovie.description
    
    const sellTicket = document.getElementById('movieDetailBtn')
    sellTicket.addEventListener('click', () => sellAticket());

    // display remaining tickets
    const remaining_tickets = document.getElementById('remaining_tickets');
    global_remaining = remainingTicket(particularMovie.capacity, particularMovie.tickets_sold);
    remaining_tickets.textContent = global_remaining;
    
}

function remainingTicket(capacity, tickets_sold){
    return (capacity - tickets_sold);
}

function sellAticket() {
    // console.log(global_remaining);
    remaining = 10 - 1;
    // console.log(remaining);  
    // display remaining tickets
    const remaining_tickets = document.getElementById('remaining_tickets');
    remaining_tickets.textContent = remaining;
    return;
}


async function fetchFilms(id) {
    //ternary operator
    url = id ?  `http://localhost:8000/films/${id}` : 'http://localhost:8000/films';
    const response = await fetch(url);
    const films = response.json();
    return films;
}



