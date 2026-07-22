const formularioLogin = document.querySelector("#loginForm");
const campoEmail = document.querySelector("#email");
const campoSenha = document.querySelector("#password");
const botaoMostrarSenha = document.querySelector("#togglePassword");
const mensagemFormulario = document.querySelector("#formMessage");
const campoCnpj = document.querySelector("#cnpj");
function mostrarMensagem(texto) {
  if (!mensagemFormulario) return;

  mensagemFormulario.textContent = texto;
}

function alternarVisibilidadeDaSenha() {
  if (!campoSenha || !botaoMostrarSenha) return;

  const senhaEstaEscondida = campoSenha.type === "password";

  if (senhaEstaEscondida) {
    campoSenha.type = "text";
    botaoMostrarSenha.textContent = "Ocultar";
    botaoMostrarSenha.setAttribute("aria-label", "Ocultar senha");
    return;
  }

  campoSenha.type = "password";
  botaoMostrarSenha.textContent = "Mostrar";
  botaoMostrarSenha.setAttribute("aria-label", "Mostrar senha");
}

function validarLogin(cnpj, senha) {
  if (!cnpj || !senha) {
    mostrarMensagem("Preencha cnpj e senha para continuar.");
    return false;
  }
  const cnpjStrip = cnpj.replace(/\D/g, "");
  if (!(cnpjStrip.length === 14)) {
    mostrarMensagem("Digite um Cnpj valido.");
    return false;
  }

  return true;
}


async function enviarLogin(evento) {
  evento.preventDefault();
  if (!campoCnpj || !campoSenha) return;

  const cnpj = campoCnpj.value.trim();
  const password = campoSenha.value.trim();
  const loginValido = validarLogin(cnpj, password);

  if (!loginValido) return;

  mostrarMensagem("");

  const resposta = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cnpj, password }),
  })
  const dados = await resposta.json();
  if (!(dados.success)){
    mostrarMensagem(dados.message);
  }
  if (dados.success) {
    window.location.href = "/dashboard";
  }
}


botaoMostrarSenha.addEventListener("click", () => {
  if (!campoSenha || !botaoMostrarSenha) return;

  const senhaEstaEscondida = campoSenha.type === "password";

  if (senhaEstaEscondida) {
    campoSenha.type = "text";
    botaoMostrarSenha.textContent = "Ocultar";
    botaoMostrarSenha.setAttribute("aria-label", "Ocultar senha");
    return;
  }

  campoSenha.type = "password";
  botaoMostrarSenha.textContent = "Mostrar";
  botaoMostrarSenha.setAttribute("aria-label", "Mostrar senha");
});

formularioLogin.addEventListener("submit", enviarLogin);
