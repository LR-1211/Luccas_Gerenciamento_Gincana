document.addEventListener("DOMContentLoaded", () => {
  /* ---------- STATE & STORAGE ---------- */
  const state = {
    equipes: JSON.parse(localStorage.getItem("equipes")) || [],
    provas: JSON.parse(localStorage.getItem("provas")) || [],
    pontuacoes: JSON.parse(localStorage.getItem("pontuacoes")) || []
  };

  const salvarNoStorage = chave =>
    localStorage.setItem(chave, JSON.stringify(state[chave]));

  /* ---------- MANIPULAÇÃO DE ABAS ---------- */
  document.querySelectorAll(".tab").forEach((tab, idx) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab, .tab-content")
        .forEach(el => el.classList.remove("active"));
      tab.classList.add("active");
      document.querySelectorAll(".tab-content")[idx].classList.add("active");
    });
  });

  /* ---------- FORM: EQUIPE ---------- */
  const formEquipe = document.getElementById("formEquipe");
  formEquipe.addEventListener("submit", e => {
    e.preventDefault();
    const fd = new FormData(formEquipe);
    const equipe = {
      nome: fd.get("nomeEquipe").trim(),
      responsavel: fd.get("responsavel").trim(),
      email: fd.get("email").trim(),
      integrantes: fd
        .get("integrantes")
        .split(",")
        .map(i => i.trim())
        .filter(Boolean)
    };

    state.equipes.push(equipe);
    salvarNoStorage("equipes");
    inserirOpcoesSelects();
    showAlert("Equipe cadastrada com sucesso!", "success");
    formEquipe.reset();
  });

  /* ---------- FORM: PROVA ---------- */
  const formProva = document.getElementById("formProva");
  formProva.addEventListener("submit", e => {
    e.preventDefault();
    const fd = new FormData(formProva);
    const prova = {
      nome: fd.get("nomeProva").trim(),
      responsavel: fd.get("responsavel").trim(),
      descricao: fd.get("descricao").trim(),
      pontuacaoMaxima: Number(fd.get("pontuacaoMaxima"))
    };

    state.provas.push(prova);
    salvarNoStorage("provas");
    inserirOpcoesSelects();
    showAlert("Prova cadastrada com sucesso!", "success");
    formProva.reset();
  });

  /* ---------- FORM: PONTUAÇÃO ---------- */
  const selEquipe = document.getElementById("equipePontuacao");
  const selProva  = document.getElementById("provaPontuacao");
  const formPontuacao = document.getElementById("formPontuacao");

  formPontuacao.addEventListener("submit", e => {
    e.preventDefault();
    const fd = new FormData(formPontuacao);
    const equipe = fd.get("equipe");
    const prova  = fd.get("prova");
    const pontos = Number(fd.get("pontuacao"));

    // validação: equipe & prova existem?
    if (!state.equipes.find(eq => eq.nome === equipe)) {
      return showAlert("Equipe não encontrada!", "error");
    }
    if (!state.provas.find(pr => pr.nome === prova)) {
      return showAlert("Prova não encontrada!", "error");
    }

    state.pontuacoes.push({ equipe, prova, pontuacao: pontos });
    salvarNoStorage("pontuacoes");
    showAlert("Pontuação registrada!", "success");
    formPontuacao.reset();
    atualizarRanking();
  });

  /* ---------- RANKING ---------- */
  const tbodyRanking = document.getElementById("rankingBody");

  function atualizarRanking() {
    // soma pontos
    const soma = {};
    state.pontuacoes.forEach(p => {
      soma[p.equipe] = (soma[p.equipe] || 0) + p.pontuacao;
    });

    // ordena
    const ranking = Object.entries(soma)
      .map(([equipe, pontos]) => ({ equipe, pontos }))
      .sort((a, b) => b.pontos - a.pontos);

    // renderiza
    tbodyRanking.innerHTML = "";
    ranking.forEach((r, i) => {
      tbodyRanking.insertAdjacentHTML(
        "beforeend",
        `<tr><td>${i + 1}º</td><td>${r.equipe}</td><td>${r.pontos}</td></tr>`
      );
    });
  }

  /* ---------- SELECTS DINÂMICOS ---------- */
  function inserirOpcoesSelects() {
    const makeOptions = arr =>
      arr.map(({ nome }) => `<option value="${nome}">${nome}</option>`).join("");

    selEquipe.innerHTML = makeOptions(state.equipes);
    selProva.innerHTML  = makeOptions(state.provas);
  }

  /* ---------- ALERTA REUTILIZÁVEL ---------- */
  function showAlert(msg, tipo = "success") {
    const box = document.createElement("div");
    box.textContent = msg;
    box.style.cssText = `
      position:fixed;bottom:30px;left:50%;transform:translateX(-50%);
      background:${tipo === "success" ? "#28a745" : "#dc3545"};
      color:#fff;padding:10px 20px;border-radius:6px;box-shadow:0 2px 10px rgba(0,0,0,.15);
      z-index:999;font-weight:600;`;
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 3000);
  }

  /* ---------- INICIALIZAÇÃO ---------- */
  inserirOpcoesSelects();
  atualizarRanking();
});