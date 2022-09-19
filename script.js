const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selected'));
    const movieIndex = localStorage.getItem('movieIndex');
    const moviePrice = localStorage.getItem('moviePrice');
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }
    if(movieIndex !== null){
        movieSelect.selectedIndex = movieIndex;
    }
}

populateUI();

function setMovieData(index,price){
    localStorage.setItem('movieIndex',index);
    localStorage.setItem('moviePrice',price);
}

function updateSelectedCount(){
    let selected = document.querySelectorAll('.row .seat.selected');
    const selectedCount = selected.length;
    
    count.innerText = selectedCount;
    total.innerText = ticketPrice * selected.length;
    
    const seatsIndex = [...selected].map(item => [...seats].indexOf(item));
    localStorage.setItem('selected',JSON.stringify(seatsIndex));
    
    
}

updateSelectedCount();

container.addEventListener('click', function(e){
    let target = e.target;
    if(target.classList.contains('seat') && !target.classList.contains('occupied')){
        target.classList.toggle('selected');
        updateSelectedCount();
    }
});

movieSelect.addEventListener('change', function(e){
    ticketPrice = +e.target.value;
    updateSelectedCount();
    setMovieData(e.target.selectedIndex,ticketPrice);
});