const EACH_SECONDS = 1000

const fetchAndDisplayUsers = async () => {
    try {
        const response = await fetch("/api/users")
        const users = await response.json()
        const usersElement = document.getElementById("users")

        usersElement.innerHTML = ""

        users.forEach(user => {
            const userElement = document.createElement("li")
            userElement.innerText = `[#${user.identifier}] ${user.email}`
            usersElement.appendChild(userElement)
        })
    } catch (error) {
        console.error(error)
    }
}

setInterval(fetchAndDisplayUsers, EACH_SECONDS)