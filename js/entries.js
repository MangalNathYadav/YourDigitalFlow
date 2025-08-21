// Format timestamp with detailed information (IST)
function formatTimestampIST(timestamp) {
    const date = new Date(timestamp);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata'
    };
    return date.toLocaleDateString('en-IN', options);
}

// Format time details for entry card (IST)
function formatTimeDetailsIST(timestamp) {
    const date = new Date(timestamp);
    const options = { timeZone: 'Asia/Kolkata' };
    const timeString = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', ...options});
    const dayOfWeek = date.toLocaleDateString([], {weekday: 'long', ...options});
    const dateString = date.toLocaleDateString([], {month: 'short', day: 'numeric', year: 'numeric', ...options});
    
    return {
        time: timeString,
        date: dateString,
        weekday: dayOfWeek,
        fullDate: formatTimestampIST(timestamp)
    };
}

// Create entry card
function createEntryCard(entry) {
    const card = document.createElement('div');
    card.className = 'entry-card glass';
    card.setAttribute('data-timestamp', entry.timestamp);
    
    const timeDetails = formatTimeDetailsIST(entry.timestamp);
    
    const time = document.createElement('div');
    time.className = 'entry-time';
    time.innerHTML = `
        <div class="time-detail"><i class="far fa-calendar"></i> ${timeDetails.date}</div>
        <div class="time-detail"><i class="far fa-clock"></i> ${timeDetails.time}</div>
        <div class="time-detail"><i class="far fa-calendar-check"></i> ${timeDetails.weekday}</div>
    `;
    
    const meta = document.createElement('div');
    meta.className = 'entry-meta';
    
    if (entry.mood) {
        meta.innerHTML += `<div class="meta-item">${entry.mood}</div>`;
    }
    
    if (entry.weather) {
        meta.innerHTML += `<div class="meta-item">${entry.weather}</div>`;
    }
    
    const content = document.createElement('div');
    content.className = 'entry-content';
    content.textContent = entry.content;
    
    card.appendChild(time);
    card.appendChild(meta);
    card.appendChild(content);
    
    if (entry.tags) {
        const tags = document.createElement('div');
        tags.className = 'entry-tags';
        
        entry.tags.split(',').forEach(tag => {
            if (tag.trim()) {
                tags.innerHTML += `<div class="tag">#${tag.trim()}</div>`;
            }
        });
        
        card.appendChild(tags);
    }
    
    return card;
}

// Render entries to timeline
function renderEntries(entries) {
    if (!timeline) return;
    
    timeline.innerHTML = '';
    
    if (!entries || Object.keys(entries).length === 0) {
        noEntries.style.display = 'block';
        timeline.appendChild(noEntries);
        if (entriesCount) entriesCount.textContent = "0";
        if (streakCount) streakCount.textContent = "0";
        if (sinceCount) sinceCount.textContent = "0";
        return;
    }
    
    noEntries.style.display = 'none';
    
    // Sort entries by timestamp (newest first)
    const sortedEntries = Object.entries(entries)
        .map(([key, value]) => ({ id: key, ...value }))
        .sort((a, b) => b.timestamp - a.timestamp);
    
    userEntries = sortedEntries;
    
    sortedEntries.forEach(entry => {
        const card = createEntryCard(entry);
        timeline.appendChild(card);
    });
    
    // Update stats
    if (entriesCount) entriesCount.textContent = sortedEntries.length;
    
    // Calculate streak and days since first entry
    if (sortedEntries.length > 0) {
        // Calculate streak
        let streak = 0;
        let currentDate = new Date();
        const entryDates = new Set();
        
        sortedEntries.forEach(entry => {
            const entryDate = new Date(entry.timestamp);
            const dateKey = formatDateForInputIST(entryDate);
            entryDates.add(dateKey);
        });
        
        // Check consecutive days
        while (entryDates.has(formatDateForInputIST(currentDate))) {
            streak++;
            const prevDate = new Date(currentDate);
            prevDate.setDate(prevDate.getDate() - 1);
            currentDate = prevDate;
        }
        
        if (streakCount) streakCount.textContent = streak;
        
        // Calculate days since first entry
        const firstEntryDate = new Date(sortedEntries[sortedEntries.length - 1].timestamp);
        const today = new Date();
        const diffTime = Math.abs(today - firstEntryDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        if (sinceCount) sinceCount.textContent = diffDays;
    } else {
        if (streakCount) streakCount.textContent = "0";
        if (sinceCount) sinceCount.textContent = "0";
    }
    
    // Filter for current date
    filterEntriesByDate(currentViewDate);
}

// Add new diary entry
if (addEntryBtn) {
    addEntryBtn.addEventListener('click', async () => {
        const content = newEntryInput.value.trim();
        const date = entryDateInput.value;
        const time = entryTimeInput.value;
        const mood = entryMoodInput.value;
        const weather = entryWeatherInput.value;
        const tags = entryTagsInput.value;
        
        if (!content) {
            showToast('Please write something in your diary entry', true);
            return;
        }
        
        if (!date || !time) {
            showToast('Please select date and time', true);
            return;
        }
        
        toggleButtonLoading(addEntryBtn, true);
        
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('User not authenticated');
            
            // Create date in local time
            const dateTimeLocal = new Date(`${date}T${time}:00`);
            const timestamp = dateTimeLocal.getTime();
            
            const entryData = {
                content: content,
                timestamp: timestamp
            };
            
            if (mood) entryData.mood = mood;
            if (weather) entryData.weather = weather;
            if (tags) entryData.tags = tags;
            
            const newEntryRef = database.ref(`diaryEntries/${user.uid}`).push();
            await newEntryRef.set(entryData);
            
            // Reset form
            newEntryInput.value = '';
            entryMoodInput.value = '';
            entryWeatherInput.value = '';
            entryTagsInput.value = '';
            
            showToast('Entry added successfully!');
        } catch (error) {
            showToast(`Failed to add entry: ${error.message}`, true);
        } finally {
            toggleButtonLoading(addEntryBtn, false);
        }
    });
}

// Press Enter to submit new entry
if (newEntryInput) {
    newEntryInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addEntryBtn.click();
        }
    });
}
