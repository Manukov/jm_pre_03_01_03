$(document).ready(function () {
    loadAuthenticadedUser();
    loadUserTable();
});

function loadAuthenticadedUser() {
    const url = 'http://localhost:8080/user/api/authUser';
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(data => {
            const roles = data.authorities;
            let roleStr = " ";
            for (let role of roles) {
                roleStr += role.role + " ";
            }
            let user = `<label class="fw-bold">${data.email}</label>
                <label>with roles:</label>
                <label/>${roleStr}</label>`;

            $('#UserAuth').html(user);
        })
}

function loadUserTable () {
    const url = 'http://localhost:8080/user/api/authUser';
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(user => {
            let table = '';
            const roles = user.authorities;
            let roleStr = " ";
            for (let role of roles) {
                roleStr += role.role + " ";
            }
            let str = `<tr>
                    <td>${user.id}</td>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${roleStr}</td>                                   
                </tr>`;
            table += str;
            $('#tableUser').html(table);
        })
}