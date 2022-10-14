const EACH_SECONDS = 1000

const waitForSeconds = seconds => new Promise(resolve => {
    setTimeout(resolve, seconds * 1000)
})

const fetchAndDisplayUsers = async () => {
    try {
        const [response] = await Promise.all([fetch("/api/users"), waitForSeconds(1)])
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
    } finally {
        await fetchAndDisplayUsers()
    }
}

fetchAndDisplayUsers()