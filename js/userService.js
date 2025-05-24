document.querySelector('#usuarios').addEventListener('click', () => usuarios());

function usuarios() {
    document.getElementById('cardHeader').innerHTML = '<h5>Listado de usuarios</h5>'
    const URL = 'https://dummyjson.com/users';
    fetch(URL, { 
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then(res => res.json().then(data => ({status: res.status, info: data})))
    .then(resultado => {
        if(resultado.status === 200){
            let listUsers = `
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
            `
            resultado.info.users.forEach(user => {
                listUsers = listUsers + `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td><img src="${user.image}" class="img-thumbnail" alt="avatar del usuario"></td>
                        <td><button type="button" class="btn btn-outline-info" onclick="getUser('${user.id}')"><i class="bi bi-eye"></i></button></td>
                    </tr>
                `  
            });
            listUsers = listUsers + `
                </tbody>
            </table>
            `
            document.getElementById('info').innerHTML = listUsers;
        }
        else{
            document.getElementById('info').innerHTML = 'No existen usuarios en la BD'
        }
    })
    .catch(error => {
        document.getElementById('info').innerHTML = '<h3>No se encontro el usuario en la api';
    })
}

function getUser(id){ 
    const REQRES_ENDPOINT = 'https://dummyjson.com/users/' + id
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then((response) =>response.json().then(data => ({status: response.status, info: data})))
    .then(result => {
        if (result.status === 200) {
            showModalUser(result.info);
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontro el usuario en la api';
        }
    })
    .catch(error => {
        document.getElementById('info').innerHTML = '<h3>No se encontro el usuario en la api';
    })
}

function showModalUser(user) {
    const modalUser = `
        <div class="modal fade" id="showModalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Usuario</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <img src="${user.image}" class="card-img-top" alt="Avatar del usuario">
                    <div class="card-body">
                        <h5 class="card-title">Información del Usuario</h5>
                        <p class="card-text">Username: ${user.username}</p>
                        <p class="card-text">Nombre: ${user.firstName}</p>
                        <p class="card-text">Apellido: ${user.lastName}</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
            </div>
        </div>
        </div>
    `;
    document.getElementById('modalUser').innerHTML = modalUser;
    const modal = new bootstrap.Modal(document.getElementById('showModalUser'));
    modal.show();
}