

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        filtrarProdutos(query);
    });

    // Renderiza todos os produtos inicialmente
    renderizarTodosProdutos();
});

function renderizarTodosProdutos() {
    const container = document.getElementById('produtos-container');
    container.innerHTML = ''; // Limpa os produtos existentes

    const todosProdutos = [];

    // Agregar todos os produtos de todas as categorias em um único array
    Object.keys(produtosPorCategoria).forEach(categoria => {
        todosProdutos.push(...produtosPorCategoria[categoria]);
    });

    // Renderizar todos os produtos
    renderizarProdutos(todosProdutos);
}

function filtrarProdutos(termo) {
    termo = termo.toLowerCase().trim();
    const produtosFiltrados = [];

    // Iterar sobre cada categoria e seus produtos para encontrar correspondências
    Object.keys(produtosPorCategoria).forEach(categoria => {
        produtosPorCategoria[categoria].forEach(produto => {
            if (produto.titulo.toLowerCase().includes(termo) || produto.descricao.toLowerCase().includes(termo)) {
                produtosFiltrados.push(produto);
            }
        });
    });

    // Renderizar os produtos filtrados
    renderizarProdutos(produtosFiltrados);
}

function renderizarProdutos(produtos) {
    const container = document.getElementById('produtos-container');
    container.innerHTML = '';

    produtos.forEach(produto => {
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card product-card" style="background-color: #1e1f20;">
                    ${produto.imagem ? `<img src="${produto.imagem}" class="card-img-top" alt="${produto.titulo}">` : ''}
                    <div class="card-body">
                        <h5 class="card-title" style="color: #ffffff;">${produto.titulo}</h5>
                        <p class="card-text" style="color: #ffffff;">${produto.descricao}</p>
                        <p class="card-text" style="color: #ffffff;">Preço: ${produto.preco}</p>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Função para alternar a visibilidade do menu lateral
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
}

// Evento para fechar o menu ao clicar fora dele
document.addEventListener('click', function(event) {
    const menu = document.getElementById('menu');
    const menuIcon = document.querySelector('.menu-icon');

    // Verifica se o clique foi fora do menu e do ícone do menu
    if (!menu.contains(event.target) && event.target !== menuIcon) {
        menu.classList.remove('open');
    }
});

// Evento para fechar o menu ao clicar no ícone de fechar
document.querySelector('.close-icon').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.classList.remove('open');
});
