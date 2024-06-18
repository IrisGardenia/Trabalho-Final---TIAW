function formatarNomeCamelCase(camelCase) {
    return camelCase
        .replace(/([A-Z])/g, ' $1') // Adiciona um espaço antes de cada letra maiúscula
        .replace(/^./, function(str){ return str.toUpperCase(); }); // Coloca a primeira letra em maiúscula
}
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        filtrarProdutos(query);
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

    // Renderizar os produtos filtrados por categoria
    const container = document.getElementById('categorias-container');
    container.innerHTML = ''; // Limpa as categorias existentes
    Object.keys(produtosFiltradosPorCategoria).forEach(categoria => {
        renderizarCategoria(categoria, produtosFiltradosPorCategoria[categoria]);
    });
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
            <div class="card product-card" style="background-color: #1e1f20;">
                ${produto.imagem ? `<img src="${produto.imagem}" class="card-img-top" alt="${produto.titulo}">` : ''}
                <div class="card-body">
                    <h5 class="card-title" style="color: #ffffff;">${produto.titulo}</h5>
                    <p class="card-text" style="color: #ffffff;">${produto.descricao}</p>
                    <p class="card-text" style="color: #ffffff;">Preço: ${produto.preco}</p>
                </div>
            </div>
        `;

        if (produto.imagem) {
            const img = card.querySelector('.card-img-top');
            img.addEventListener('mouseenter', () => {
                img.classList.add('img-hovered');
            });
            img.addEventListener('mouseleave', () => {
                img.classList.remove('img-hovered');
            });
        }

        produtosContainer.appendChild(card);
    });

    // Adicionar a categoria ao contêiner principal
    container.appendChild(categoriaDiv);
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

