document.addEventListener("DOMContentLoaded", () => {
  const dadosUsuarios = JSON.parse(document.getElementById("dados-usuarios").textContent);
  let usuarios = [...dadosUsuarios];
  const usuariosPorPagina = 10;
  let paginaAtual = 1;

  const container = document.getElementById("usuarioCards");
  const modal = document.getElementById("modal");
  const detalhesUsuario = document.getElementById("detalhesUsuario");
  const paginaAtualSpan = document.getElementById("paginaAtual");

  const filtroSangue = document.getElementById("filtro-sangue");
  const filtroSexo = document.getElementById("filtro-sexo");
  const filtroRegiao = document.getElementById("filtro-regiao");

  function filtrarUsuarios() {
    usuarios = dadosUsuarios.filter(usuario => {
      const sangueMatch = !filtroSangue.value || usuario.tp_sang_usuario === filtroSangue.value;
      const sexoMatch = !filtroSexo.value || usuario.sx_usuario === filtroSexo.value;
      const regiaoMatch = !filtroRegiao.value || usuario.regiao_cidade_usuario === filtroRegiao.value;
      return sangueMatch && sexoMatch && regiaoMatch;
    });
    paginaAtual = 1;
    renderizarPagina();
  }

  function renderizarPagina() {
    container.innerHTML = "";
    const inicio = (paginaAtual - 1) * usuariosPorPagina;
    const fim = inicio + usuariosPorPagina;
    const paginados = usuarios.slice(inicio, fim);

    if (paginados.length === 0) {
      container.innerHTML = "<p>Nenhum usuário encontrado.</p>";
      return;
    }

    paginados.forEach(usuario => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <strong>ID:</strong> ${usuario.id_usuario}<br>
        <strong>Nome:</strong> ${usuario.nm_usuario}<br>
        <strong>Tipo Sanguíneo:</strong> ${usuario.tp_sang_usuario}<br>
        <strong>Idade:</strong> ${usuario.idade_usuario}<br>
        <strong>Sexo:</strong> ${usuario.sx_usuario === 'M' ? 'Masculino' : 'Feminino'}<br>
        <strong>Região:</strong> ${usuario.regiao_cidade_usuario}
      `;
      card.onclick = () => abrirDetalhes(usuario);
      container.appendChild(card);
    });

    paginaAtualSpan.textContent = `Página ${paginaAtual}`;
    document.getElementById("anterior").disabled = paginaAtual === 1;
    document.getElementById("proxima").disabled = fim >= usuarios.length;
  }

  function abrirDetalhes(usuario) {
    detalhesUsuario.innerHTML = `
      <h2>${usuario.nm_usuario}</h2>
      <p><strong>ID:</strong> ${usuario.id_usuario}</p>
      <p><strong>Tipo Sanguíneo:</strong> ${usuario.tp_sang_usuario}</p>
      <p><strong>Idade:</strong> ${usuario.idade_usuario}</p>
      <p><strong>Data de Nascimento:</strong> ${usuario.dt_ns_usuario}</p>
      <p><strong>Sexo:</strong> ${usuario.sx_usuario === 'M' ? 'Masculino' : 'Feminino'}</p>
      <p><strong>Observação:</strong> ${usuario.obs_usuario || 'Nenhuma'}</p>
      <p><strong>Descrição:</strong> ${usuario.desc_usuario}</p>
      <p><strong>CPF:</strong> ${usuario.cpf_usuario}</p>
      <p><strong>Endereço:</strong> ${usuario.end_usuario}</p>
      <p><strong>CEP:</strong> ${usuario.cep_usuario}</p>
      <p><strong>Telefone:</strong> ${usuario.tel_usuario}</p>
      <p><strong>Profissão:</strong> ${usuario.prof_usuario}</p>
    `;
    modal.style.display = "block";
  }

  document.getElementById("fecharModal").onclick = () => {
    modal.style.display = "none";
  };

  document.getElementById("anterior").onclick = () => {
    if (paginaAtual > 1) {
      paginaAtual--;
      renderizarPagina();
    }
  };

  document.getElementById("proxima").onclick = () => {
    const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);
    if (paginaAtual < totalPaginas) {
      paginaAtual++;
      renderizarPagina();
    }
  };

  filtroSangue.addEventListener("change", filtrarUsuarios);
  filtroSexo.addEventListener("change", filtrarUsuarios);
  filtroRegiao.addEventListener("change", filtrarUsuarios);

  // Inicialização
  renderizarPagina();
});