const eventSource = new EventSource("http://localhost:3000/sse") // Ligne permettant de connecter le client au serveur SSE

eventSource.addEventListener("connect", (e) => { // En suite on écoutera les évenements du serveur comme pour des évenements du DOM.
    document.getElementById('status').textContent = "connected";
})

eventSource.addEventListener("refresh", (e) => {
    data = JSON.parse(e.data)
    document.getElementById('users').textContent = JSON.stringify(data.users);
})