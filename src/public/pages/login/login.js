const formularioLogin = document.querySelector("#loginForm");
const campoCnpj = document.querySelector("#cnpj");
const campoSenha = document.querySelector("#password");
const botaoMostrarSenha = document.querySelector("#togglePassword");
const mensagemFormulario = document.querySelector("#formMessage");

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
    mostrarMensagem("Preencha e-mail e senha para continuar.");
    return false;
  }

  if (!cnpj.includes("@")) {
    mostrarMensagem("Digite um e-mail valido.");
    return false;
  }

  return true;
}

function enviarLogin(evento) {
  evento.preventDefault();
  if (!campoCnpj || !campoSenha) return;

  const cnpj = campoCnpj.value.trim();
  const senha = campoSenha.value.trim();
  const loginValido = validarLogin(cnpj, senha);
  if (!loginValido) return;
  mostrarMensagem("");

}

botaoMostrarSenha?.addEventListener("click", alternarVisibilidadeDaSenha);
formularioLogin?.addEventListener("submit", enviarLogin);
