$(document).ready(function () {
    loadAuthenticadedUser();
    loadUsersTable();
});

//--------------------- Load authUser, loadTable

function loadAuthenticadedUser() {
    const url = 'http://localhost:8080/admin/api/authUser';

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

function loadUsersTable() {

    const url = 'http://localhost:8080/admin/api/users';
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(users => {
            let table = '';

            for (user of users) {
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
                                         
                    <td> <button 
                            type="button" 
                            class="btn btn-info btn-sm" 
                            data-bs-toggle="modal" 
                            data-bs-target="#updateModal" 
                            id=${user.id}
                            onclick="UpdateUserModalHandler(this.id)">Edit</button> 
                    </td>
                      <td> <button 
                            type="button" 
                            class="btn btn-danger btn-sm" 
                            data-bs-toggle="modal" 
                            data-bs-target="#deleteModal" 
                            id=${user.id}
                            onclick="DeleteUserModalHandler(this.id)">Delete</button> 
                    </td>                                      
                </tr>`;
                table += str;
            }
            $('#tableUsers').html(table);
        })
}

function loadRoles(selectId) {
    const url = 'http://localhost:8080/admin/api/roles';
    fetch(url)
        .then(response => {
            return response.json();
        }).then(roles => {
        let optionList = ``;
        for (let role of roles) {
            let str = `<option value=${role.id} label=${role.role}>`;
            optionList += str;
        }
        $('#' + selectId).html(optionList);
    })
}


//--------------------- Add User
const addUserForm = document.getElementById('AddUserForm');
addUserForm.addEventListener('submit', buttonAddUserHandler);

// получение данных из формы
async function buttonAddUserHandler(event) {
    event.preventDefault();
    let user = await GetFormData(event);
    await postRequest(user);
    loadUsersTable();
    addUserForm.reset();
    $('#home-tab').click();
};

async function GetFormData() {

    const firstname = addUserForm.querySelector('[name="firstname"]');
    const lastname = addUserForm.querySelector('[name="lastname"]');
    const age = addUserForm.querySelector('[name="age"]');
    const email = addUserForm.querySelector('[name="email"]');
    const password = addUserForm.querySelector('[name="password"]');

    let user = {};
    user.firstname = firstname.value;
    user.lastname = lastname.value;
    user.age = age.value;
    user.email = email.value;
    user.password = password.value;
    user.roles = getRolesFromSelect("#selectedRoles");

    return await user;
}

async function postRequest(data) {
    const response = await fetch('http://localhost:8080/admin/api/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, код ошибки ${response.ok}`);
    }
};


function getRolesFromSelect(event) {
    let roles = [];
    let selectedRole = document.querySelector(event);

    for (let i = 0; i < selectedRole.options.length; i++) {
        if (selectedRole.options[i].selected) {
            roles.push(selectedRole.options[i].value)
        }
    }
    return roles;       //массив id role
}

//------------------------------- Update User

async function UpdateUserModalHandler(id) {

    let user = await getRequest(id);

    const updateUserForm = document.getElementById('UpdateUserForm');

    const updateUserId = updateUserForm.querySelector('[name="updateUserId"]');
    const updateUserFirstname = updateUserForm.querySelector('[name="updateUserFirstname"]');
    const updateUserLastname = updateUserForm.querySelector('[name="updateUserLastname"]');
    const updateUserAge = updateUserForm.querySelector('[name="updateUserAge"]');
    const updateUserEmail = updateUserForm.querySelector('[name="updateUserEmail"]');
    const updateUserPassword = updateUserForm.querySelector('[name="updateUserPassword"]');
    const updateUserRoles = updateUserForm.querySelector('[name="selectedUpdateUserRoles"]');

    updateUserId.value = user.id;
    updateUserFirstname.value = user.firstname;
    updateUserLastname.value = user.lastname;
    updateUserAge.value = user.age;
    updateUserEmail.value = user.email;
    updateUserPassword.value = user.password;
    updateUserRoles.value = loadRoles("selectedUpdateUserRoles");
}

async function getRequest(id) {
    const url = 'http://localhost:8080/admin/api/users/' + id;
    let response = await fetch(url);
    return await response.json();
}

const updateUserForm = document.getElementById('UpdateUserForm');
updateUserForm.addEventListener('submit', buttonUpdateUserHandler);

async function buttonUpdateUserHandler(event) {
    event.preventDefault();
    let user = await GetUpdateUser();

    await putRequest(user);
    loadUsersTable();
    updateUserForm.reset();

    let button = document.getElementById('clodeUpdateModalButton');
    button.click();
}

async function putRequest(data) {
    const response = await fetch('http://localhost:8080/admin/api/updateUser', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, код ошибки ${response.ok}`);
    }
};


async function GetUpdateUser() {
    //получаем поля формы и извлекаем из них значения. Значения получаем относительно формыв
    const id = updateUserForm.querySelector('[name="updateUserId"]');
    const firstname = updateUserForm.querySelector('[name="updateUserFirstname"]');
    const lastname = updateUserForm.querySelector('[name="updateUserLastname"]');
    const age = updateUserForm.querySelector('[name="updateUserAge"]');
    const email = updateUserForm.querySelector('[name="updateUserEmail"]');
    const password = updateUserForm.querySelector('[name="updateUserPassword"]');

    let user = {};
    user.id = id.value;
    user.firstname = firstname.value;
    user.lastname = lastname.value;
    user.age = age.value;
    user.email = email.value;
    user.password = password.value;
    user.roles = getRolesFromSelect("#selectedUpdateUserRoles");

    return await user;
}


//---------------------------------- Delete User

async function DeleteUserModalHandler(id) {

    let user = await getRequest(id);

    const deleteUserForm = document.getElementById('DeleteUserForm');

    const deleteUserId = deleteUserForm.querySelector('[name="deleteUserId"]');
    const deleteUserFirstname = deleteUserForm.querySelector('[name="deleteUserFirstname"]');
    const deleteUserLastname = deleteUserForm.querySelector('[name="deleteUserLastname"]');
    const deleteUserAge = deleteUserForm.querySelector('[name="deleteUserAge"]');
    const deleteUserEmail = deleteUserForm.querySelector('[name="deleteUserEmail"]');
    const deleteUserPassword = deleteUserForm.querySelector('[name="deleteUserPassword"]');
    const deleteUserRoles = deleteUserForm.querySelector('[name="selectedDeleteUserRoles"]');

    deleteUserId.value = user.id;
    deleteUserFirstname.value = user.firstname;
    deleteUserLastname.value = user.lastname;
    deleteUserAge.value = user.age;
    deleteUserEmail.value = user.email;
    deleteUserPassword.value = user.password;
    deleteUserRoles.value = loadRoles("selectedDeleteUserRoles");
}

async function deleteRequest(id) {
    const response = await fetch('http://localhost:8080/admin/api/deleteUser/' + id, {
        method: 'DELETE'
    })
    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, код ошибки ${response.ok}`);
    }
};

const deleteUserForm = document.getElementById('DeleteUserForm');
deleteUserForm.addEventListener('submit', buttonDeleteUserHandler);

async function buttonDeleteUserHandler(event) {
    event.preventDefault();
    const id = deleteUserForm.querySelector('[name="deleteUserId"]').value;
    await deleteRequest(id);
    loadUsersTable();
    deleteUserForm.reset();
    let button = document.getElementById('closeDeleteModal');
    button.click();
}


//Вкладка User
async function loadUser () {

    const url = 'http://localhost:8080/admin/api/authUser';
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















