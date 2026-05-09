
(async () => {

    const h2 = document.querySelector('h2')

    const {pathname} = window.location
    const [, menuItem, id] = pathname.split('/')
    
    const url = (() => {
        if (menuItem === 'random-menu') return `/api/v1/menu/${id}`
        if (menuItem === 'menu') return `/api/v1/menu/${id}`
        return '/api/v1/menu/random'
    })()

    const result = await fetch(url)
    const {name} = await result.json()

    h2.textContent = name 
})()

// ------------------------------
// DAILY LOCATION FEATURE
// ------------------------------
(() => {
    const locationOutput = document.getElementById('location-output')
    if (!locationOutput) return

    const locations = {
        0: "Closed today — resting up for a spicy week!",
        1: "Downtown Oshkosh — Main Street by the courthouse",
        2: "UW Oshkosh Campus — Reeve Union parking lot",
        3: "FVTC Oshkosh — South parking lot",
        4: "Menominee Park — near the playground",
        5: "Oshkosh Farmers Market — center row",
        6: "Special Events — check our Facebook for details"
    }

    const today = new Date().getDay()
    locationOutput.textContent = locations[today]
})()