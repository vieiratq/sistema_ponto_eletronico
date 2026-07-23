const registrarBtn = document.getElementById("registrar");
const registroForm = document.getElementById("form-registro");
const senhaInput = document.getElementById("senha-funcionario");
const feedback = document.getElementById("registro-feedback");
const spanMenuSenha = document.querySelector("#registro-ponto .section-label");
const horario = () => new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
});

function mudarSpanSenha(senha) {
    const spanMenuSenha = document.querySelector("#registro-ponto .section-label");
    spanMenuSenha.textContent = senha ? `Senha: ${senha}` : "Senha do funcionário";
}
function prepararFormulario() {
    registroForm?.reset();

    if (feedback) {
        feedback.textContent = "";
        feedback.classList.remove("error");
    }

    senhaInput?.focus();
}

async function registrarPonto(event) {
    event.preventDefault();
    const senha = senhaInput?.value.trim();
    if (!senha){
        mudarSpanSenha("Digite a sua senha!");
    }
    const data = await fetch("/api/registro-ponto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ senha }),
    });
    const res = await data.json();
    
}

registrarBtn?.addEventListener("click", prepararFormulario);
registroForm?.addEventListener("submit", ()=>{
    registrarPonto(event);
});
