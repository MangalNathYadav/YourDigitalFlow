// Calendar functions
if (openCalendarBtn) {
    openCalendarBtn.addEventListener('click', () => {
        calendarModal.style.display = 'flex';
        renderCalendar();
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        calendarModal.style.display = 'none';
    });
}

if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
        currentCalendarMonth--;
        if (currentCalendarMonth < 0) {
            currentCalendarMonth = 11;
            currentCalendarYear--;
        }
        renderCalendar();
    });
}

if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
        currentCalendarMonth++;
        if (currentCalendarMonth > 11) {
            currentCalendarMonth = 0;
            currentCalendarYear++;
        }
        renderCalendar();
    });
}

function renderCalendar() {
    if (!calendarGrid || !calendarMonthEl) return;
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    
    calendarMonthEl.textContent = `${monthNames[currentCalendarMonth]} ${currentCalendarYear}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(currentCalendarYear, currentCalendarMonth, 1);
    const lastDay = new Date(currentCalendarYear, currentCalendarMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Get day of week for first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay();
    
    calendarGrid.innerHTML = '';
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;
        
        // Check if this day has entries
        const cellDate = new Date(currentCalendarYear, currentCalendarMonth, day);
        const start = getStartOfDayIST(cellDate);
        const end = getEndOfDayIST(cellDate);
        
        if (userEntries.some(entry => entry.timestamp >= start && entry.timestamp <= end)) {
            dayCell.classList.add('has-entry');
        }
        
        // Highlight current day
        if (currentCalendarYear === nowIST.getFullYear() && 
            currentCalendarMonth === nowIST.getMonth() && 
            day === nowIST.getDate()) {
            dayCell.classList.add('active');
        }
        
        dayCell.addEventListener('click', () => {
            currentViewDate = new Date(currentCalendarYear, currentCalendarMonth, day);
            currentDateText.textContent = formatDateIST(currentViewDate);
            filterEntriesByDate(currentViewDate);
            calendarModal.style.display = 'none';
        });
        
        calendarGrid.appendChild(dayCell);
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === calendarModal) {
        calendarModal.style.display = 'none';
    }
});
