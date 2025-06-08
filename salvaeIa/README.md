# 🌧️ Salvaê - Chamados Temporais

**Sistema web para visualização de chamados registrados em eventos climáticos**

---

## 📌 Descrição

O **Salvaê** é um sistema web interativo que permite visualizar chamados registrados durante eventos climáticos extremos. Os chamados são exibidos em forma de cards com paginação, enquanto os dados estatísticos são apresentados em gráficos dinâmicos e interativos.

Os dados são carregados a partir do arquivo `chamados.csv`, e o sistema também integra informações de usuários a partir do `1000usuarios.csv`.

---

## 📁 Estrutura do Projeto

salvaeia/
│
├── static/
│ ├── main.js
│ ├── usuários.js
│ └── style.css
│
├── templates/
│ ├── chamados.html # Visualização dos chamados
│ ├── gráficos.html # Visualização dos gráficos
│ ├── index.html # Página inicial com 2 gráficos e 6 chamados (paginável)
│ └── usuários.html # Visualização dos usuários
│
├── app.py # Servidor Flask
├── chamados.ipynb # Pré-processamento e análise dos chamados
├── usuários.ipynb # Pré-processamento e análise dos usuários
├── chamados.csv # Base de dados dos chamados
└── 1000usuarios.csv # Base de dados dos usuários

---

## 🛠️ Tecnologias Utilizadas

| Ferramenta     | Finalidade                              |
| -------------- | --------------------------------------- |
| **Python**     | Linguagem principal                     |
| **Flask**      | Framework backend                       |
| **Pandas**     | Manipulação e análise de dados          |
| **Chart.js**   | Geração de gráficos interativos         |
| **HTML/CSS**   | Estrutura e estilização da interface    |
| **JavaScript** | Funcionalidades interativas no frontend |



---

## 🧾 Dicionário de Dados (chamados.csv)
| Campo              | Descrição                                                                        |
| ------------------ | -------------------------------------------------------------------------------- |
| `id_chamado`       | Número único do chamado                                                          |
| `nivel_chamado`    | Complexidade: `Simples`, `Moderado`, `Difícil`                                   |
| `status_chamado`   | Situação atual: `pendente`, `equipe no local`, `solucionado`, `equipe a caminho` |
| `hr_chamado`       | Data e hora do registro do chamado                                               |
| `tipo_chamado`     | Tipo da ocorrência (ex: `Árvore caída`, `Alagamento`)                            |
| `endereco_chamado` | Endereço onde ocorreu o problema                                                 |
| `id_usuario`       | ID do usuário que abriu o chamado                                                |
| `nm_abriu_chamado` | Nome do responsável pelo chamado                                                 |
| `tel_contato`      | Telefone do responsável                                                          |
| `descricao`        | Detalhes da situação                                                             |
| `regiao_chamado`   | Região da cidade afetada (`Zona Sul`, `Norte`, etc.)                             |

---

## 🧾 Dicionário de Dados (1000usuarios.csv)
| Campo                   | Nome de Campo       | Tipo    | Descrição                                                                 |
| ----------------------- | ------------------- | ------- | ------------------------------------------------------------------------- |
| `id_usuario`            | ID do usuário       | Inteiro | Identificador único do usuário                                            |
| `nm_usuario`            | Nome do usuário     | Texto   | Nome completo do usuário                                                  |
| `cpf_usuario`           | CPF                 | Texto   | CPF do usuário (formato: 000.000.000-00)                                  |
| `cep_usuario`           | CEP                 | Texto   | Código postal do endereço do usuário (formato: 00000-000 ou 00000000)     |
| `end_usuario`           | Endereço            | Texto   | Endereço completo (logradouro, número, bairro, cidade e estado)           |
| `tel_usuario`           | Telefone            | Texto   | Número de telefone do usuário (ex: (11) 99876-5432)                       |
| `tp_sang_usuario`       | Tipo Sanguíneo      | Texto   | Tipo sanguíneo (ex: A+, O-, AB)                                           |
| `dt_ns_usuario`         | Data de Nascimento  | Data    | Data de nascimento (formato: YYYY-MM-DD)                                  |
| `idade_usuario`         | Idade               | Inteiro | Idade calculada a partir da data de nascimento                            |
| `sx_usuario`            | Sexo                | Texto   | Sexo do usuário (M para masculino, F para feminino, outros se aplicável)  |
| `desc_usuario`          | Descrição Física    | Texto   | Características físicas (ex: cor dos cabelos, tipo físico, uso de óculos) |
| `prof_usuario`          | Profissão           | Texto   | Profissão ou ocupação principal                                           |
| `obs_usuario`           | Observações Médicas | Texto   | Informações médicas (ex: alergias, doenças crônicas, deficiências)        |
| `regiao_cidade_usuario` | Região da Cidade    | Texto   | Região em que o usuário reside (ex: Zona Sul, Centro, Zona Leste)         |

---

## 🚀 Funcionalidades

- 🔍 Visualização de chamados com filtros por status, tipo e região
- 📊 Gráficos interativos sobre a distribuição e frequência dos chamados
- 👤 Consulta aos dados dos usuários envolvidos nos chamados
- 📅 Paginação para navegação eficiente por grandes volumes de dados

---

## ▶️ Como Executar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/salvae.git
cd salvaeia
```

2. Instale as dependências:
```bash
pip install -r requirements.txt
```

3. Execute a aplicação:
```bash
python app.py
```

4. Acesse via navegador:
```bash
http://localhost:5000 
```

---

🧪 Pré-Requisitos
Python 3.9+

Pip

Navegador moderno (Google Chrome, Firefox, etc.)

---

## Desenvolvido por Salvaê.
- **Turma**: 1TDSPA
- **Integrantes**:
	- Fábio Henrique de Souza Eduardo - RM: 560416
	- Gabriel Wu Castro - RM: 560210
	- Renato Kenji Sugaki - RM: 559810

---

📄 Licença
Este projeto está licenciado sob a MIT License.