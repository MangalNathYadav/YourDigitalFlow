// --- Export Diary Feature ---

// Area to render export content (hidden)
let exportArea = document.getElementById('export-area');
if (!exportArea) {
    exportArea = document.createElement('div');
    exportArea.id = 'export-area';
    exportArea.style.position = 'fixed';
    exportArea.style.left = '-9999px';
    exportArea.style.top = '0';
    exportArea.style.background = 'white';
    exportArea.style.color = 'black';
    exportArea.style.padding = '30px';
    exportArea.style.width = '700px';
    exportArea.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
    document.body.appendChild(exportArea);
}

const exportDiaryBtn = document.getElementById('export-diary-btn');
const exportModal = document.getElementById('export-modal');
const closeExportModal = document.getElementById('close-export-modal');
const exportMonthBtn = document.getElementById('export-month-btn');
const exportMonthInput = document.getElementById('export-month');

// Open modal
if (exportDiaryBtn && exportModal) {
    exportDiaryBtn.addEventListener('click', () => {
        exportModal.style.display = 'flex';
    });
}

// Close modal
if (closeExportModal && exportModal) {
    closeExportModal.addEventListener('click', () => {
        exportModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === exportModal) exportModal.style.display = 'none';
    });
}

// Export logic
if (exportMonthBtn && exportMonthInput) {
    exportMonthBtn.addEventListener('click', async () => {
        const monthVal = exportMonthInput.value;
        if (!monthVal) {
            showToast('Please select a month to export.', true);
            return;
        }
        const [year, month] = monthVal.split('-');
        const user = auth.currentUser;
        if (!user) {
            showToast('You must be logged in to export.', true);
            return;
        }
        showToast('Preparing export...', false);
        // Fetch entries for the month
        const entries = await fetchMonthlyEntries(user.uid, year, month);
        if (!entries.length) {
            showToast('No entries found for this month.', true);
            return;
        }
        // Render export content
        renderExportContent(user.displayName || 'User', year, month, entries);
        // Use html2canvas to export as image
        html2canvas(exportArea).then(canvas => {
            const link = document.createElement('a');
            link.download = `Diary_${year}_${month}.png`;
            link.href = canvas.toDataURL();
            link.click();
            showToast('Diary exported as image!', false);
        });
        exportModal.style.display = 'none';
    });
}

// Fetch entries for a given month
async function fetchMonthlyEntries(uid, year, month) {
    // Assumes entries are stored under /diaryEntries/{uid}/
    // and each entry has a timestamp and content
    const ref = database.ref(`diaryEntries/${uid}`);
    const snapshot = await ref.once('value');
    const allEntries = snapshot.val() || {};
    const result = [];
    for (const key in allEntries) {
        const entry = allEntries[key];
        if (!entry.timestamp) continue;
        const entryDate = new Date(entry.timestamp);
        const entryYear = entryDate.getFullYear();
        const entryMonth = (entryDate.getMonth() + 1).toString().padStart(2, '0');
        if (parseInt(year) === entryYear && month === entryMonth) {
            result.push({
                date: entryDate.toISOString().slice(0, 10),
                text: entry.content || '',
                mood: entry.mood || '',
                weather: entry.weather || '',
                tags: entry.tags || ''
            });
        }
    }
    // Sort by date
    result.sort((a, b) => a.date.localeCompare(b.date));
    return result;
}

// Render export content in exportArea
function renderExportContent(userName, year, month, entries) {
    const monthName = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'long' });
    let html = `
    <div style="text-align:center;padding:24px 0 12px 0;border-bottom:3px solid var(--primary);margin-bottom:30px;color:var(--main-text);background:transparent;">
        <div style="font-size:2.1em;font-weight:800;letter-spacing:1px;">${userName}'s Diary</div>
        <div style="font-size:1.2em;font-weight:500;margin-top:8px;">${monthName} ${year}</div>
        <div style="font-size:1em;margin-top:4px;">Entries from <b>${entries[0].date}</b> to <b>${entries[entries.length-1].date}</b></div>
    </div>
    <div style="padding:0 10px;">
    `;
    entries.forEach(entry => {
        html += `
        <div style="margin-bottom:32px;padding:18px 22px 18px 22px;background:var(--card-bg);border-radius:14px;box-shadow:0 2px 8px var(--shadow);border:1.5px solid var(--card-border-color);color:var(--card-text);">
            <div style="font-size:1.08em;font-weight:600;color:var(--primary);margin-bottom:8px;letter-spacing:0.5px;">${entry.date}</div>
            <div style="font-size:1.08em;white-space:pre-line;line-height:1.7;color:var(--card-text);">${entry.text ? entry.text : '<span style=\"color:var(--gray);\">(No content)</span>'}</div>
        </div>
    `;
    });
    html += `</div>
    <div style="text-align:center;padding:18px 0 8px 0;border-top:3px solid var(--primary);margin-top:40px;color:var(--main-text);background:transparent;">
        <div style="font-size:1.1em;font-weight:600;color:var(--primary);">--------- End of Diary Entries ---------</div>
        <div style="font-size:0.95em;color:var(--gray);margin-top:6px;">Exported from Modern Diary App | YourDigitalFlow</div>
    </div>
    `;
    exportArea.innerHTML = html;
}
