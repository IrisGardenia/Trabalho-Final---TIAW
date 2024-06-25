
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const message = document.getElementById('message');

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase().trim();
        filtrarProdutos(query);

        if (!query) {
            message.style.display = 'none';
        }
    });

    // Renderiza todos os produtos inicialmente
    renderizarTodasCategorias();
});

function renderizarTodasCategorias() {
    const container = document.getElementById('categorias-container');
    container.innerHTML = ''; // Limpa as categorias existentes

    // Renderizar todas as categorias e seus produtos
    Object.keys(produtosPorCategoria).forEach(categoria => {
        renderizarCategoria(categoria, produtosPorCategoria[categoria]);
    });
}

function filtrarProdutos(termo) {
    termo = termo.toLowerCase().trim();
    const produtosFiltradosPorCategoria = {};

    // Iterar sobre cada categoria e seus produtos para encontrar correspondências
    Object.keys(produtosPorCategoria).forEach(categoria => {
        produtosPorCategoria[categoria].forEach(produto => {
            if (produto.titulo.toLowerCase().includes(termo) || produto.descricao.toLowerCase().includes(termo)) {
                if (!produtosFiltradosPorCategoria[categoria]) {
                    produtosFiltradosPorCategoria[categoria] = [];
                }
                produtosFiltradosPorCategoria[categoria].push(produto);
            }
        });
    });

    const container = document.getElementById('categorias-container');
    container.innerHTML = ''; // Limpa as categorias existentes

    if (Object.keys(produtosFiltradosPorCategoria).length > 0) {
        message.style.display = 'none';
        Object.keys(produtosFiltradosPorCategoria).forEach(categoria => {
            renderizarCategoria(categoria, produtosFiltradosPorCategoria[categoria]);
        });

        // Scroll suave para o contêiner de produtos
        const produtosContainer = document.getElementById('categorias-container');
        const offset = produtosContainer.offsetTop - document.querySelector('header').offsetHeight;
        window.scrollTo({ top: offset, behavior: 'smooth' });
    } else {
        message.style.display = 'block';
    }
}

function renderizarCategoria(nomeCategoria, produtos) {
    const container = document.getElementById('categorias-container');

    // Criar uma div para a categoria
    const categoriaDiv = document.createElement('div');
    categoriaDiv.className = 'col-12 categoria';
    categoriaDiv.id = nomeCategoria.toLowerCase();

    // Adicionar o título da categoria com formatação
    const tituloCategoria = document.createElement('h4');
    tituloCategoria.textContent = formatarNomeCamelCase(nomeCategoria);
    tituloCategoria.style.color = '#ffffff';
    categoriaDiv.appendChild(tituloCategoria);

    // Criar uma div para os produtos da categoria
    const produtosContainer = document.createElement('div');
    produtosContainer.className = 'row produtos-categoria';
    categoriaDiv.appendChild(produtosContainer);

    // Adicionar os produtos à div da categoria
    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <a href="detalhes-produto.html?id=${produto.id}&categoria=${nomeCategoria}" class="card-link">
                <div class="card product-card" style="background-color: #303030;">
                    <img src="${produto.imagem}" class="card-img-top" alt="${produto.titulo}">
                    <div class="card-body">
                        <h5 class="card-title" style="color: #1e88e5;">${produto.titulo}</h5>
                        <p class="card-text" style="color: #ffffff;">${produto.descricao}</p>
                        <p class="card-text produto-preco" style="color: #28a745;">${produto.preco}</p>
                    </div>
                </div>
            </a>
        `;
    
        produtosContainer.appendChild(card);
    });


    document.addEventListener('DOMContentLoaded', function() {
        const cards = document.querySelectorAll('.product-card');
    
        cards.forEach(card => {
            card.addEventListener('click', function() {
                card.classList.toggle('clicked');
            });
        });
    });
    

    // Adicionar a categoria ao contêiner principal
    container.appendChild(categoriaDiv);
}

function formatarNomeCamelCase(nome) {
    return nome.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/^./, function(str){ return str.toUpperCase(); });
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


// program.js

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
}



