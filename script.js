// Wait until DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    // ==========================
    // Hamburger Menu Toggle
    // ==========================
    const menu = document.querySelector('.menu'),
        menuItem = document.querySelectorAll('.menu_item'),
        hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('hamburger_active');
            menu.classList.remove('menu_active');
        });
    });

    // ==========================
    // Ride Booking System
    // ==========================
    const bookBtn = document.getElementById('bookRide');
    const cancelBtn = document.getElementById('cancelRide');
    const pickupInput = document.getElementById('pickup');
    const dropInput = document.getElementById('drop');
    const rideStatus = document.getElementById('rideStatus');
    const map = document.getElementById('map');

    let rideBooked = false;

    // Initialize map placeholder
    if (map) {
        map.textContent = "🗺️ Map will be displayed here (Google Maps / Leaflet)";
        map.style.textAlign = "center";
        map.style.padding = "20px";
        map.style.border = "2px dashed #999";
        map.style.borderRadius = "10px";
        map.style.minHeight = "200px";
    }

    // Function to show a marker on the placeholder
    const showMarker = (pickup, drop) => {
        const markerDiv = document.createElement('div');
        markerDiv.style.marginTop = "10px";
        markerDiv.style.fontSize = "16px";
        markerDiv.textContent = `📍 Pickup: ${pickup} | 📍 Drop: ${drop}`;
        map.appendChild(markerDiv);
    };

    // Check all elements exist
    if (bookBtn && cancelBtn && pickupInput && dropInput && rideStatus) {
        // Book Ride
        bookBtn.addEventListener('click', () => {
            const pickup = pickupInput.value.trim();
            const drop = dropInput.value.trim();

            if (pickup === '' || drop === '') {
                alert('Please enter both Pickup and Drop locations!');
                return;
            }

            rideBooked = true;
            rideStatus.textContent = `🚖 Ride booked from "${pickup}" to "${drop}"`;
            rideStatus.style.color = "green";

            // Show marker on the map
            showMarker(pickup, drop);

            // Clear inputs
            pickupInput.value = '';
            dropInput.value = '';
        });

        // Cancel Ride
        cancelBtn.addEventListener('click', () => {
            if (!rideBooked) {
                alert('No ride booked yet!');
                return;
            }
            rideBooked = false;
            rideStatus.textContent = "❌ Ride cancelled";
            rideStatus.style.color = "red";

            // Reset map placeholder
            if (map) {
                map.innerHTML = "🗺️ Map will be displayed here (Google Maps / Leaflet)";
            }
        });
    }
});