(async () => {
    const container = document.getElementById('events-container')
    if (!container) return

    try {
        const response = await fetch('data/events.json')
        const events = await response.json()

        if (!events.length) {
            container.textContent = "No upcoming events."
            return
        }

        container.innerHTML = events.map(event => `
            <div class="event-card">
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Time:</strong> ${event.time}</p>
                <p><strong>Location:</strong> ${event.location}</p>
            </div>
        `).join('')
    } catch (err) {
        container.textContent = "Unable to load events."
        console.error(err)
    }
})()

document.addEventListener("DOMContentLoaded", async () => {
    const menuContainer = document.getElementById("menu-container");
    if (!menuContainer) return; // not on menu.html

    try {
        const response = await fetch("/data/menu.json"); // FIXED PATH
        if (!response.ok) throw new Error("Failed to fetch JSON");

        const menuItems = await response.json();

        menuContainer.innerHTML = menuItems.map(item => `
            <div class="menu-item" data-id="${item.id}">
                <h3>${item.name} <span class="heat-tag">${item.heat}</span></h3>
                <p class="price">$${item.price.toFixed(2)}</p>
                <div class="details" style="display:none;">
                    <p>${item.description}</p>
                </div>
            </div>
        `).join("");

        // CLICK TO EXPAND
        document.querySelectorAll(".menu-item").forEach(item => {
            item.addEventListener("click", () => {
                const details = item.querySelector(".details");
                details.style.display = details.style.display === "block" ? "none" : "block";
            });
        });

    } catch (err) {
        console.error("Menu failed to load:", err);
        menuContainer.innerHTML = "<p>Unable to load menu.</p>";
    }
});