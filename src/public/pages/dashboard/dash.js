const registrarBtn = document.getElementById("registrar");
const registroForm = document.getElementById("form-registro");
const senhaInput = document.getElementById("senha-funcionario");
const feedback = document.getElementById("registro-feedback");
const EmpresaTittle = document.querySelector("#company-title");
const cnpjTittle = document.querySelector("#cnpjTittle");
const usuarioNome = document.querySelector(".sidebar-user strong");
const usuarioEmail = document.querySelector(".sidebar-user small");
const usuarioAvatar = document.querySelector(".user-avatar");
let empresaLogada = "loading";
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
async function atualizarMenu(){
    const resposta = await fetch("/api/empresa-logada");
    const empresa = await resposta.json();

    if (!empresa.success) {
        console.log(empresa.message);
        return;
    }

    empresaLogada = empresa;

    if (EmpresaTittle) {
        EmpresaTittle.textContent = empresa.nome;
    }

    if (cnpjTittle) {
        cnpjTittle.textContent = `CNPJ ${empresa.cnpj}`;
    }

    if (usuarioNome) {
        usuarioNome.textContent = empresa.nome;
    }

    if (usuarioEmail) {
        usuarioEmail.textContent = empresa.email;
    }

    if (usuarioAvatar) {
        usuarioAvatar.textContent = empresa.nome.slice(0, 2).toUpperCase();
    }

    document.body.dataset.empresaId = empresa.id;
}
registrarBtn?.addEventListener("click", prepararFormulario);
registroForm?.addEventListener("submit", (event) => {
    registrarPonto(event);
});

function init() {
    atualizarMenu();
}
init();
