//////////******** REGULAR POLLING ********//////////

// const getUsers = () => {
//     fetch("http://localhost:3000/users")
//         .then(res => res.json())
//         .then(res => {
//             document.getElementById('users').textContent = JSON.stringify(res)
//         })
//         .catch(console.error)
// }
// setInterval(getUsers, 1000);

//////////******** LONG POLLING ********//////////

async function getUsers (){
    const res = await fetch("http://localhost:3000/users_sub");
    const data = await res.json();
    document.getElementById('users').textContent = JSON.stringify(data);
    getUsers();
}
getUsers()