// Função para exibir mensagem de sucesso no envio dos formulários
document.addEventListener("DOMContentLoaded", function () {
    const forms = document.querySelectorAll("form");
  
    forms.forEach(form => {
      form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita envio real
        alert("Formulário enviado com sucesso!");
        form.reset(); // Limpa o formulário
      });
    });
  
    // Simular ranking dinâmico
    const rankingData = [
      { equipe: "Equipe A", pontos: 120 },
      { equipe: "Equipe B", pontos: 95 },
      { equipe: "Equipe C", pontos: 80 }
    ];
  
    const rankingTable = document.querySelector("table tbody");
    if (rankingTable) {
      rankingTable.innerHTML = ""; // Limpa ranking atual
  
      rankingData.sort((a, b) => b.pontos - a.pontos);
  
      rankingData.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}º</td>
          <td>${item.equipe}</td>
          <td>${item.pontos}</td>
        `;
        rankingTable.appendChild(row);
      });
    }
  });  