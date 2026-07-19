const formularioLogin = document.querySelector("#loginForm");
const campoEmail = document.querySelector("#email");
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

function validarLogin(email, senha) {
  if (!email || !senha) {
    mostrarMensagem("Preencha e-mail e senha para continuar.");
    return false;
  }

  if (!email.includes("@")) {
    mostrarMensagem("Digite um e-mail valido.");
    return false;
  }

  return true;
}

function enviarLogin(evento) {
  evento.preventDefault();
  if (!campoEmail || !campoSenha) return;

  const email = campoEmail.value.trim();
  const senha = campoSenha.value.trim();
  const loginValido = validarLogin(email, senha);
  if (!loginValido) return;
  mostrarMensagem("");

}

botaoMostrarSenha?.addEventListener("click", alternarVisibilidadeDaSenha);
formularioLogin?.addEventListener("submit", enviarLogin);
