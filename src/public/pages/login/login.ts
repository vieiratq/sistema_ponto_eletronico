const formularioLogin = document.querySelector<HTMLFormElement>("#loginForm");
const campoEmail = document.querySelector<HTMLInputElement>("#email");
const campoSenha = document.querySelector<HTMLInputElement>("#password");
const botaoMostrarSenha = document.querySelector<HTMLButtonElement>("#togglePassword");
const mensagemFormulario = document.querySelector<HTMLParagraphElement>("#formMessage");
const campoCnpj = document.querySelector<HTMLInputElement>("#cnpj");
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

function validarLogin(cnpj:string, senha:string) {
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


async function enviarLogin(evento:Event) {
  evento.preventDefault();
  if (!campoCnpj || !campoSenha) return;

  const cnpj = campoCnpj.value.trim();
  const senha = campoSenha.value.trim();
  const loginValido = validarLogin(cnpj, senha);

  if (!loginValido) return;
  mostrarMensagem("");

  const resposta = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cnpj, senha }),
  })
  const dados = await resposta.json();
  if (resposta.status === 200) {
}}


botaoMostrarSenha?.addEventListener("click", alternarVisibilidadeDaSenha);
formularioLogin?.addEventListener("submit", enviarLogin);
