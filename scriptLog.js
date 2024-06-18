
function Entrar() {
    let usuario = document.querySelector('#usuario')
    let userLabel = document.querySelector('#userLabel')

    let senha = document.querySelector('#senha')
    let userSenha = document.querySelector('#userSenha')

    let msgError = document.querySelector('#msgError')
    let listaUser = []

    let userValid = {
        nome: '',
        user: '',
        senha: ''
    }

    listaUser = JSON.parse(localStorage.getItem('listaUser'))
    
    listaUser.forEach((item) => {
        if(usuario.value == item.userCad && senha.value == item.senhaCad){
            userValid = {
                nome: item.nomeCad,
                user: item.userCad,
                senha: item.senhaCad
            }
        }
    })

    if (usuario.value == userValid.user && senha.value == userValid.senha) {
        /* Aqui ele abre o site do Hermes */
        window.location.href = ''

        let token = Math.random().toString(16).substring(2)
        localStorage.setItem('token', token)

    } else {
        userLabel.setAttribute('style', 'color: red')
        usuario.setAttribute('style', 'border-color: red')
        userSenha.setAttribute('style', 'color: red')
        senha.setAttribute('style', 'border-color: red')

        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = 'Usuário ou senha incorretos!'

        usuario.focus()
    }
}