const formularioLogin = document.querySelector<HTMLFormElement>("#loginForm");
const campoEmail = document.querySelector<HTMLInputElement>("#email");
const campoSenha = document.querySelector<HTMLInputElement>("#password");
const botaoMostrarSenha = document.querySelector<HTMLButtonElement>("#togglePassword");
const mensagemFormulario = document.querySelector<HTMLParagraphElement>("#formMessage");

function mostrarMensagem(texto: string): void {
  if (!mensagemFormulario) return;

  mensagemFormulario.textContent = texto;
}

function alternarVisibilidadeDaSenha(): void {
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

function validarLogin(email: string, senha: string): boolean {
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

function enviarLogin(evento: SubmitEvent): void {
  evento.preventDefault();

  if (!campoEmail || !campoSenha) return;

  const email = campoEmail.value.trim();
  const senha = campoSenha.value.trim();
  const loginValido = validarLogin(email, senha);

  if (!loginValido) return;

  mostrarMensagem("");
  console.log("Login enviado", { email });
}

botaoMostrarSenha?.addEventListener("click", alternarVisibilidadeDaSenha);
formularioLogin?.addEventListener("submit", enviarLogin);
