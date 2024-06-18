let nome = document.querySelector('#nome');
let labelNome = document.querySelector('#labelNome');

let usuario = document.querySelector('#usuario');
let labelUsuario = document.querySelector('#labelUsuario');

let senha = document.querySelector('#senha');
let labelSenha = document.querySelector('#labelSenha');

let confirmSenha = document.querySelector('#confirmSenha');
let labelConfirmSenha = document.querySelector('#labelConfirmSenha');

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

nome.addEventListener('keyup', () => {
    if (nome.value.length <= 2) {
        labelNome.setAttribute('style', 'color: red');
        labelNome.innerHTML = 'Nome *Insira no mínimo 3 caracteres!';
    } else {
        labelNome.setAttribute('style', 'color: green');
        labelNome.innerHTML = 'Nome';
    }
});

usuario.addEventListener('keyup', () => {
    if (usuario.value.length <= 4) {
        labelUsuario.setAttribute('style', 'color: red');
        labelUsuario.innerHTML = 'Usuário *Insira no mínimo 5 caracteres!';
    } else {
        labelUsuario.setAttribute('style', 'color: green');
        labelUsuario.innerHTML = 'Usuário';
    }
});

senha.addEventListener('keyup', () => {
    if (senha.value.length <= 5) {
        labelSenha.setAttribute('style', 'color: red');
        labelSenha.innerHTML = 'Senha *Insira no mínimo 6 caracteres!';
    } else {
        labelSenha.setAttribute('style', 'color: green');
        labelSenha.innerHTML = 'Senha';
    }
});

confirmSenha.addEventListener('keyup', () => {
    if (senha.value !== confirmSenha.value) {
        labelConfirmSenha.setAttribute('style', 'color: red');
        labelConfirmSenha.innerHTML = 'Confirmar senha *As senhas não conferem!*';
    } else {
        labelConfirmSenha.setAttribute('style', 'color: green');
        labelConfirmSenha.innerHTML = 'Confirmar senha';
    }
});

function Cadastrar() {
    if (nome.value.length > 2 && usuario.value.length > 4 && senha.value.length > 5 && senha.value === confirmSenha.value) {

        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')

        listaUser.push(
            {
                nomeCad: nome.value,
                userCad: usuario.value,
                senhaCad: senha.value
            }
        )

        localStorage.setItem('listaUser', JSON.stringify(listaUser))

        msgSuccess.setAttribute('style', 'display: block')
        msgSuccess.innerHTML = '<strong>Cadastrado com sucesso!</strong>'
        msgError.setAttribute('style', 'display: none')
        msgError.innerHTML = ''

        setTimeout(()=>{
            window.location.href = 'telaLogin.html'
        }, 2000)

    } else {
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar!</strong>'
        msgSuccess.setAttribute('style', 'display: none')
        msgSuccess.innerHTML = ''
    }
}


