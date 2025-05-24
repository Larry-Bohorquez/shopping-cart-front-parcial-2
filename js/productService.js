document.querySelector('#productos').addEventListener('click', () => productos('1'));

function productos() {
    document.getElementById('cardHeader').innerHTML = '<h5>Listado de productos</h5>'
    const URL = 'https://dummyjson.com/products';
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        },
    })
    .then(res => res.json().then(data => ({status: res.status, info: data})))
    .then(resultado => {

        if (resultado.status === 200) {
            let table = `
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Titulo</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Imagen</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
            `
            resultado.info.products.forEach(product => {
                table = table + `
                        <tr>
                            <td>${product.id}</td>
                            <td>${product.title}</td>
                            <td>${product.description}</td>
                            <td>${product.price}</td>
                            <td>${product.stock}</td>
                            <td><img src="${product.images}" class="img-thumbnail"></td>
                            <td><button type="button" class="btn btn-outline-info" onclick="getProducts('${product.id}')" ><i class="bi bi-eye"></i></button></td>
                        </tr>
                `
            });
            document.getElementById('info').innerHTML = table;
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontro el usuario en la api</h3>';
        }
    })
}

function getProducts(id){ 
    const REQRES_ENDPOINT = 'https://dummyjson.com/products/' + id
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
            showModalProducts(result.info);
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontro el producto en la api';
        }
    })
}

function showModalProducts(product) {
    const modalProduct = `
        <div class="modal fade" id="showModalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Producto</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <img src="${product.images}" class="card-img-top" alt="Avatar del Producto">
                    <div class="card-body">
                        <h5 class="card-title">Información del Producto</h5>
                        <p class="card-text">Id: ${product.id}</p>
                        <p class="card-text">Titulo: ${product.title}</p>
                        <p class="card-text">Descripcion: ${product.description}</p>
                        <p class="card-text">Precio: ${product.price}</p>
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
    document.getElementById('modalUser').innerHTML = modalProduct;
    const modal = new bootstrap.Modal(document.getElementById('showModalProduct'));
    modal.show();
}