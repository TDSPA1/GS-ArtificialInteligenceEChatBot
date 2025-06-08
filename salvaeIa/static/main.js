document.addEventListener("DOMContentLoaded", function () {
    const chamados = JSON.parse(document.getElementById('dados-chamados').textContent);

    // === Lógica dos gráficos ===
    const regioes = {};
    const niveis = {};
    const horarios = {};
    const status = {};

    chamados.forEach(c => {
        regioes[c.regiao_chamado] = (regioes[c.regiao_chamado] || 0) + 1;
        niveis[c.nivel_chamado] = (niveis[c.nivel_chamado] || 0) + 1;
        const hora = new Date(c.hr_chamado).getHours();
        horarios[hora] = (horarios[hora] || 0) + 1;
        status[c.status_chamado] = (status[c.status_chamado] || 0) + 1;
    });

    const horas = Object.keys(horarios).sort();
    const dadosHorario = horas.map(h => horarios[h]);

    // Gráfico Região - Barras
    if (document.getElementById('graficoRegiao')) {
        new Chart(document.getElementById('graficoRegiao'), {
            type: 'bar',
            data: {
                labels: Object.keys(regioes),
                datasets: [{ label: 'Chamados por Região', data: Object.values(regioes), backgroundColor: ['#0073e6', '#003399', '#FFD700', '#9E1A1A', '#2c3e50'] }]
            },
            options: { responsive: true, plugins: { legend: { display: false } } }
        });

        const legendaRegiao = document.createElement('p');
        legendaRegiao.textContent = 'Gráfico que exibe o número de chamados por região';
        legendaRegiao.style.fontSize = '14px';
        legendaRegiao.style.color = '#333';
        legendaRegiao.style.marginTop = '10px';
        legendaRegiao.style.textAlign = 'center';
        legendaRegiao.id = 'legenda-regiao';

        document.getElementById('graficoRegiao').parentElement.appendChild(legendaRegiao);
    }

    // Gráfico Nível - Donut
    if (document.getElementById('graficoNivel')) {
        new Chart(document.getElementById('graficoNivel'), {
            type: 'doughnut',
            data: {
                labels: Object.keys(niveis),
                datasets: [{ data: Object.values(niveis), backgroundColor: ['#003399', '#FFD700', '#9E1A1A'] }]
            },
            options: { responsive: true }
        });

        const legendaNivel = document.createElement('p');
        legendaNivel.textContent = 'Gráfico que exibe o nível de dificuldade dos chamados';
        legendaNivel.style.fontSize = '14px';
        legendaNivel.style.color = '#333';
        legendaNivel.style.marginTop = '10px';
        legendaNivel.style.textAlign = 'center';
        legendaNivel.id = 'legenda-nivel';

        document.getElementById('graficoNivel').parentElement.appendChild(legendaNivel);
    }

    // Gráfico Horário - Linha
    if (document.getElementById('graficoHorario')) {
        new Chart(document.getElementById('graficoHorario'), {
            type: 'line',
            data: {
                labels: horas,
                datasets: [{ label: 'Chamados por Hora', data: dadosHorario, borderColor: '#003399', fill: false }]
            },
            options: { responsive: true }
        });

        const legendaHorario = document.createElement('p');
        legendaHorario.textContent = 'Gráfico que exibe o número de chamados abertos por horário';
        legendaHorario.style.fontSize = '14px';
        legendaHorario.style.color = '#333';
        legendaHorario.style.marginTop = '10px';
        legendaHorario.style.textAlign = 'center';
        legendaHorario.id = 'legenda-horario';

        document.getElementById('graficoHorario').parentElement.appendChild(legendaHorario);
    }

    // Gráfico Status - Pizza
    if (document.getElementById('graficoStatus')) {
        new Chart(document.getElementById('graficoStatus'), {
            type: 'pie',
            data: {
                labels: Object.keys(status),
                datasets: [{ data: Object.values(status), backgroundColor: ['#0073e6', '#003399', '#FFD700', '#9E1A1A'] }]
            },
            options: { responsive: true }
        });

        const legendaStatus = document.createElement('p');
        legendaStatus.textContent = 'Gráfico que exibe os status dos chamados';
        legendaStatus.style.fontSize = '14px';
        legendaStatus.style.color = '#333';
        legendaStatus.style.marginTop = '10px';
        legendaStatus.style.textAlign = 'center';
        legendaStatus.id = 'legenda-status';

        document.getElementById('graficoStatus').parentElement.appendChild(legendaStatus);
    }

    // === Lógica de Paginação e Filtros ===
    const container = document.getElementById("chamadoCards");
    const btnAnterior = document.getElementById("anterior");
    const btnProxima = document.getElementById("proxima");
    const spanPagina = document.getElementById("paginaAtual");

    const filtroNivel = document.getElementById("filtro-nivel");
    const filtroStatus = document.getElementById("filtro-status");
    const filtroRegiao = document.getElementById("filtro-regiao");

    let paginaAtual = 1;
    const chamadosPorPagina = 6;

    function aplicarFiltros() {
        let filtrados = [...chamados];

        if (filtroNivel && filtroNivel.value) {
            filtrados = filtrados.filter(c => c.nivel_chamado === filtroNivel.value);
        }

        if (filtroStatus && filtroStatus.value) {
            filtrados = filtrados.filter(c => c.status_chamado === filtroStatus.value);
        }

        if (filtroRegiao && filtroRegiao.value) {
            filtrados = filtrados.filter(c => c.regiao_chamado === filtroRegiao.value);
        }

        return filtrados;
    }

    function renderizarPagina() {
        const filtrados = aplicarFiltros();

        if (!container) return;
        container.innerHTML = "";

        const inicio = (paginaAtual - 1) * chamadosPorPagina;
        const fim = inicio + chamadosPorPagina;
        const paginados = filtrados.slice(inicio, fim);

        if (paginados.length === 0) {
            container.innerHTML = "<p>Nenhum chamado encontrado.</p>";
            btnAnterior.disabled = true;
            btnProxima.disabled = true;
            return;
        }

        paginados.forEach((chamado) => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <strong>ID:</strong> ${chamado.id_chamado}<br>
                <strong>Nível:</strong> ${chamado.nivel_chamado}<br>
                <strong>Status:</strong> ${chamado.status_chamado}<br>
                <strong>Hora:</strong> ${chamado.hr_chamado}<br>
                <strong>Tipo:</strong> ${chamado.tipo_chamado}<br>
                <strong>Descrição:</strong> ${chamado.descricao}<br>
                <strong>Região:</strong> ${chamado.regiao_chamado}<br>
                <strong>Endereço:</strong> ${chamado.endereco_chamado}<br>
                <strong>Contato:</strong><br>
                  Nome: ${chamado.nm_abriu_chamado}<br>
                  ID: ${chamado.id_usuario}<br>
                  Tel: ${chamado.tel_contato}
            `;
            container.appendChild(card);
        });

        spanPagina.textContent = `Página ${paginaAtual}`;
        btnAnterior.disabled = paginaAtual === 1;
        btnProxima.disabled = fim >= filtrados.length;
    }

    function resetarPagina() {
        paginaAtual = 1;
        renderizarPagina();
    }

    // Eventos dos filtros
    if (filtroNivel) filtroNivel.addEventListener("change", resetarPagina);
    if (filtroStatus) filtroStatus.addEventListener("change", resetarPagina);
    if (filtroRegiao) filtroRegiao.addEventListener("change", resetarPagina);

    // Botões de navegação
    if (btnAnterior) {
        btnAnterior.addEventListener("click", () => {
            if (paginaAtual > 1) {
                paginaAtual--;
                renderizarPagina();
            }
        });
    }

    if (btnProxima) {
        btnProxima.addEventListener("click", () => {
            const totalPaginas = Math.ceil(aplicarFiltros().length / chamadosPorPagina);
            if (paginaAtual < totalPaginas) {
                paginaAtual++;
                renderizarPagina();
            }
        });
    }

    // Inicialização
    renderizarPagina();
});