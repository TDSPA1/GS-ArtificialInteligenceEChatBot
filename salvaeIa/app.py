from flask import Flask, render_template
import pandas as pd

app = Flask(__name__)

# Carregar os dados do CSV
def carregar_chamados():
    df = pd.read_csv('chamados.csv')
    return df.to_dict(orient='records')

@app.route('/')
def index():
    chamados = carregar_chamados()
    return render_template('index.html', chamados=chamados)

@app.route('/chamados')
def todos_chamados():
    chamados = carregar_chamados()
    return render_template('chamados.html', chamados=chamados)

@app.route('/graficos')
def graficos():
    chamados = carregar_chamados()
    return render_template('graficos.html', chamados=chamados)

@app.route('/usuarios')
def usuarios():
    df = pd.read_csv('1000usuarios.csv')
    usuarios = df.to_dict(orient='records')
    return render_template('usuarios.html', usuarios=usuarios)

if __name__ == '__main__':
    app.run(debug=True)