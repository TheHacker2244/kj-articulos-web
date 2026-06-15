document.addEventListener("DOMContentLoaded", function() {
    // VERIFICACIÓN DE IMAGEN DE FONDO (CORREGIDA)
    const bgUrl = 'img/fondo-login.jpg';
    const imgChecker = new Image();
    
    imgChecker.onload = function() {
        document.body.classList.add('has-bg-image');
        console.log("✅ Imagen de fondo encontrada. ¡Efecto cristal activado!");
    };
    
    imgChecker.onerror = function() {
        console.log("ℹ️ Imagen de fondo no encontrada. Usando estilo sólido.");
    };
    
    imgChecker.src = bgUrl;

    // LÓGICA DE LOGIN/REGISTRO
    let users = JSON.parse(localStorage.getItem('kj_users')) || [];
    const form = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    const toggleMode = document.getElementById('toggleMode');
    const toggleText = document.getElementById('toggle-text');
    const mensaje = document.getElementById('mensaje');
    let isRegisterMode = false;

    toggleMode.addEventListener('click', (e) => {
        e.preventDefault();
        isRegisterMode = !isRegisterMode;
        if (isRegisterMode) {
            submitBtn.textContent = "Registrarme";
            toggleText.innerHTML = `¿Ya tienes cuenta? <a href="#" id="toggleMode">Inicia sesión aquí</a>`;
            document.querySelector('h2').textContent = "Crear cuenta";
            document.querySelector('.subtitulo').textContent = "Regístrate para dejar reseñas";
        } else {
            submitBtn.textContent = "Iniciar Sesión";
            toggleText.innerHTML = `¿No tienes cuenta? <a href="#" id="toggleMode">Regístrate aquí</a>`;
            document.querySelector('h2').textContent = "¡Únete a la comunidad K&J!";
            document.querySelector('.subtitulo').textContent = "Regístrate para calificar y dejar reseñas";
        }
        mensaje.textContent = "";
        document.getElementById('toggleMode').addEventListener('click', arguments.callee);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            mensaje.textContent = "Completa todos los campos";
            mensaje.style.color = "red";
            return;
        }

        const userExists = users.find(u => u.email === email);

        if (isRegisterMode) {
            if (userExists) {
                mensaje.textContent = "Este correo ya está registrado";
                mensaje.style.color = "red";
                return;
            }
            users.push({ email, password });
            localStorage.setItem('kj_users', JSON.stringify(users));
            mensaje.textContent = "Usuario registrado con éxito. Ahora inicia sesión.";
            mensaje.style.color = "green";
            toggleMode.click();
        } else {
            if (userExists && userExists.password === password) {
                localStorage.setItem('kj_session', JSON.stringify({ email }));
                mensaje.textContent = "¡Bienvenido/a de vuelta! Redirigiendo...";
                mensaje.style.color = "green";
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1500);
            } else {
                mensaje.textContent = "Correo o contraseña incorrectos";
                mensaje.style.color = "red";
            }
        }
    });
});