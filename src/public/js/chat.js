const socketIO = io();

let userEmail, userRole;

const fetchUserData = async () => {
    try {
        const response = await fetch('/api/users/current');
        if (response.ok) {
            const data = await response.json();
            userEmail = data.payload.email;
            userRole = data.payload.role;

            if (userRole.toUpperCase() === 'ADMIN') {
                input.disabled = true;
                input.placeholder = "Admins cannot send messages";
            }
        } else {
            throw new Error('Error fetching user data');
        }
    } catch (error) {
        throw error;
    }
};

const input = document.getElementById('text');
const log = document.getElementById('messages');
const date = new Date();
const formattedDate = `${date.getHours()}:${date.getMinutes()}/${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

fetchUserData();

input.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
        socketIO.emit('message', { email: userEmail, message: input.value, createdAt: formattedDate });
        input.value = "";
    }
});

socketIO.on('log', data => {
    let logsHtml = '';
    data.logs.forEach(log => {
        logsHtml += `<li class="w-100 bg-gray-200 py-2 px-1 rounded my-2 flex justify-between items-center">
            <p class="block">${log.email} says: ${log.content}</p>
            <span class="block text-sm text-gray-400">${log.createdAt}</span>
        </li>`;
    });
    log.innerHTML = logsHtml;
});