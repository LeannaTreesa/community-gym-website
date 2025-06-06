document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu (Hamburger) ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- Check-In/Out Simulation ---
    const checkinBtn = document.getElementById('checkin-btn');
    const occupancyNumber = document.getElementById('occupancy-number');
    const occupancyLevel = document.getElementById('occupancy-level');
    let isCheckedIn = false;
    const maxCapacity = 20;

    checkinBtn.addEventListener('click', () => {
        let currentOccupancy = parseInt(occupancyNumber.textContent);
        
        if (!isCheckedIn) {
            // Check In
            if (currentOccupancy < maxCapacity) {
                currentOccupancy++;
                checkinBtn.innerHTML = '<i class="fas fa-right-from-bracket"></i> Check Out';
                checkinBtn.classList.add('checked-in');
                isCheckedIn = true;
            } else {
                alert('Gym is at full capacity!');
            }
        } else {
            // Check Out
            if (currentOccupancy > 0) {
                currentOccupancy--;
            }
            checkinBtn.innerHTML = '<i class="fas fa-right-to-bracket"></i> Check In';
            checkinBtn.classList.remove('checked-in');
            isCheckedIn = false;
        }

        // Update occupancy display
        occupancyNumber.textContent = currentOccupancy;
        const percentage = (currentOccupancy / maxCapacity) * 100;
        occupancyLevel.style.width = `${percentage}%`;
    });

    // --- Equipment Tutorial Modal ---
    const modal = document.getElementById('tutorial-modal');
    const closeBtn = document.querySelector('.close-btn');
    const equipmentCards = document.querySelectorAll('.equipment-card');
    const modalTitle = document.getElementById('modal-title');
    const modalVideo = document.getElementById('modal-video');

    equipmentCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoId = card.dataset.videoId;
            const title = card.dataset.title;

            modalTitle.textContent = title + ' Tutorial';
            modalVideo.src = `https://www.youtube.com/embed/${videoId}`;
            modal.style.display = 'block';
        });
    });

    // Function to close the modal
    const closeModal = () => {
        modal.style.display = 'none';
        modalVideo.src = ''; // Stop video playback
    }

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
});