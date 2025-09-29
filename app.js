// Scroll to section
function scrollToSection(id){
    document.getElementById(id).scrollIntoView({behavior:'smooth'});
}

// Hotel Data
const hotels = [
    { destination:"Lucknow", hotel:"Hyatt Regency", price:8000, rating:4.8, img:"https://tse4.mm.bing.net/th/id/OIP._AAAFZB1Fo_D1mke-CnsygHaEK?pid=Api" },
    { destination:"Lucknow", hotel:"Novotel Gomti Nagar", price:9500, rating:4.5, img:"https://tse1.mm.bing.net/th/id/OIP.I0NPWC2VblEMHcCyYtItrgHaFj?pid=Api" },
    { destination:"Lucknow", hotel:"Holiday Inn Airport", price:7200, rating:4.7, img:"https://tse2.mm.bing.net/th/id/OIP.bTPWUWHyvHMj8fut8V261wHaFj?pid=Api" },
    { destination:"Lucknow", hotel:"Renaissance Hotel", price:6800, rating:4.6, img:"https://tse1.mm.bing.net/th/id/OIP.15XYekm6r91rgngexaMgOAHaE8?pid=Api" }
];

// Flight Data (Working direct image URLs)
// Flight Data (Working direct image URLs)
const flights = [
    {
        from: "Delhi",
        to: "Lucknow",
        airline: "Air India",
        price: 12000,
        img:"airindia.jpg",
    },
    {
        from: "Delhi",
        to: "Lucknow",
        airline: "IndiGo",
        price: 8000,
         img:"indigo.jpg",
    },
    {
        from: "Delhi",
        to: "Lucknow",
        airline: "SpiceJet",
        price: 9000,
         img:"spicejet.jpg",
    }
];










// Render hotel carousel
function renderHotelCarousel(list){
    const carousel = document.getElementById('hotelCarousel');
    carousel.innerHTML='';
    list.forEach(h=>{
        const card = document.createElement('div');
        card.className='card';
        card.innerHTML=`
            <img src="${h.img}" alt="${h.destination}">
            <div class="card-content">
                <h3>${h.hotel}</h3>
                <p>Destination: ${h.destination}</p>
                <p>Price: ₹${h.price}/night</p>
                <p class="stars">${'★'.repeat(Math.round(h.rating))}</p>
                <button class="book-btn" onclick="openBookingModal('hotel','${h.hotel}','${h.destination}',${h.price})">Book Now</button>
            </div>
        `;
        carousel.appendChild(card);
    });
}
renderHotelCarousel(hotels);

// Scroll carousel
function scrollCarousel(direction){
    document.getElementById('hotelCarousel').scrollBy({ left: direction*300, behavior: 'smooth' });
}

// Render flights
function renderFlights(list){
    const flightResults = document.getElementById('flightResults');
    flightResults.innerHTML='';
    list.forEach(f=>{
        const card=document.createElement('div');
        card.className='flight-card';
        card.innerHTML=`
            <img src="${f.img}" alt="${f.from}-${f.to}">
            <div class="flight-content">
                <h3>${f.airline}</h3>
                <p>From: ${f.from}</p>
                <p>To: ${f.to}</p>
                <p>Price: ₹${f.price}</p>
                <button class="book-btn" onclick="openBookingModal('flight','${f.airline}','${f.from} → ${f.to}',${f.price})">Book Now</button>
            </div>
        `;
        flightResults.appendChild(card);
    });
}
renderFlights(flights);

// Booking modal
const modal = document.getElementById('bookingModal');
const modalTitle = document.getElementById('modalTitle');
const bookingForm = document.getElementById('bookingForm');

function openBookingModal(type, name, location, price){
    modal.style.display='block';
    modalTitle.innerText = `Booking ${type.toUpperCase()}: ${name} (${location}) - ₹${price}`;
    document.getElementById('checkinModal').value = '';
    document.getElementById('checkoutModal').value = '';
}
function closeBookingModal(){ modal.style.display='none'; }

bookingForm.addEventListener('submit', e=>{
    e.preventDefault();
    alert('Booking Confirmed! Thank you.');
    modal.style.display='none';
    bookingForm.reset();
});
window.onclick = function(event){
    if(event.target == modal){ modal.style.display='none'; }
}

// Search filter
document.getElementById('searchForm').addEventListener('submit', e=>{
    e.preventDefault();
    const dest = document.getElementById('destination').value.toLowerCase();
    const maxHotel = document.getElementById('maxPriceHotel').value;
    const maxFlight = document.getElementById('maxPriceFlight').value;

    const filteredHotels = hotels.filter(h=>{
        return h.destination.toLowerCase().includes(dest) && (maxHotel ? h.price<=maxHotel : true);
    });
    const filteredFlights = flights.filter(f=>{
        return (f.from.toLowerCase().includes(dest) || f.to.toLowerCase().includes(dest)) && (maxFlight ? f.price<=maxFlight : true);
    });

    renderHotelCarousel(filteredHotels);
    renderFlights(filteredFlights);
});

