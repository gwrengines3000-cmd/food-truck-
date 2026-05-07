
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