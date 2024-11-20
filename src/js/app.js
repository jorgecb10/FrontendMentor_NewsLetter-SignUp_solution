document.addEventListener('DOMContentLoaded', () => {
    const pathname = window.location.pathname

    if(pathname === '/' || pathname.includes('index')) {
        const emailInput = document.getElementById('email')
        const emailLabel = document.getElementById('label-email')
        const formulario = document.getElementById('formulario')

        emailInput.addEventListener('input', validar)
        formulario.addEventListener('submit', e => {
            e.preventDefault()

            if(emailInput.value === '') {
                mostrarAlerta('Please, enter an email', emailLabel)
                return
            } 
            if(!validarEmail(emailInput.value)) {
                mostrarAlerta('the email is not valid', emailLabel)
                return
            }

            const email = emailInput.value
            window.name = email
            window.location.href = 'mensaje.html'
        })

        function validar(e) {
            if(e.target.value === '') {
                mostrarAlerta('email cannot be empty', emailLabel)
                return
            }
            if(!validarEmail(e.target.value)) {
                mostrarAlerta('Valid email required', emailLabel)
                return
            }
            eliminarAlerta(emailLabel)
        }

        function mostrarAlerta(mensaje, referencia) {
            eliminarAlerta(referencia)

            const alerta = document.createElement('div')
            alerta.classList.add('alerta')
            alerta.textContent = mensaje
            referencia.appendChild(alerta)

            emailInput.classList.remove('border-grey-hsl')
            emailInput.classList.add('border-[rgb(255,96,62)]', 'text-[rgb(255,96,62)]', 'bg-[#ffe8e6]')
        }

        function eliminarAlerta(referencia) {
            const alerta = referencia.querySelector('.alerta')
            if(alerta) {
                emailInput.classList.remove('border-[rgb(255,96,62)]', 'text-[rgb(255,96,62)]', 'bg-[#ffe8e6]')
                emailInput.classList.add('border-grey-hsl')
                alerta.remove()
            }
        }

        function validarEmail(email) {
            const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
            const resultado = regex.test(email);
            return resultado;
        }
    } else if(pathname.includes('mensaje')) { 
        const email = window.name
        const emaiSpan = document.getElementById('email-span')

        emaiSpan.textContent = email
    }
})