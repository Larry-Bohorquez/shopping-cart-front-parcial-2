document.querySelector('#banderas').addEventListener('click', () => carts());

function carts() {
    document.getElementById('cardHeader').innerHTML = '<h5>Listado de Carritos de Compras</h5>'
    const URL ='https://dummyjson.com/carts';
    fetch('https://dummyjson.com/carts', {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then(res => res.json().then(data => ({status: res.status, info: data})))
    .then(result => {
        if(result.status === 200){
            let listCarts = `
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Total</th>
                        <th scope="col">Cantidad de Productos</th>
                        <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
            `
            result.info.carts.forEach(cart => {
                listCarts = listCarts + `
                    <tr>
                        <td>${cart.id}</td>
                        <td>${cart.userId}</td>
                        <td>${cart.total}</td>
                        <td>${cart.totalProducts}</td>
                        <td><button type="button" class="btn btn-outline-info" onclick="getCart('${cart.id}')"><i class="bi bi-eye"></i></button></td>
                    </tr>
                `  
            });
            listCarts = listCarts + `
                </tbody>
            </table>
            `
            document.getElementById('info').innerHTML = listCarts;
        }
        else{
            document.getElementById('info').innerHTML = 'No existen carritos en la BD'
        }
    })
    .catch(error => {
        document.getElementById('info').innerHTML = '<h3>No se encontro el carrito en la api</h3>';
    })
}

function getCart(id){ 
    const REQRES_ENDPOINT = 'https://dummyjson.com/carts/' + id
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then(res => res.json().then(data => ({status: res.status, info: data})))
    .then(result => {
        if (result.status === 200) {
            showModalCart(result.info);
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontro el usuario en la api';
        }
    })
}

function showModalCart(cart) {
    const modalCart = `
        <div class="modal fade" id="showModalCart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Carrito de Compras</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">ID: ${cart.id}</h5>
                        <p class="card-text">Usuario: ${cart.userId}</p>
                        <p class="card-text">Total: ${cart.total}</p>
                        <p class="card-text">Cantidad de Productos: ${cart.totalProducts}</p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
    `;
    document.getElementById('modalUser').innerHTML = modalCart;
    const modal = new bootstrap.Modal(document.getElementById('showModalCart'));
    modal.show();
}


