import { useState } from 'react';
import Axios from 'axios';

import './index.css';

function App() {
  const [dataCep, setDataCep] = useState({});
  const [cep, setCep] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (cep.length >= 8) {
      const response = await Axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      console.log(response)
      setDataCep(response.data)

      return;
    }

    if (cep.length > 0) {
      setDataCep({erro: true});  

      return;
    }

    setDataCep({empty: true});
  }
  
  return (
    <div className="container">
      <header className="header">
        <img src="https://www.correios.com.br/++theme++tema-do-portal-correios/static/imagens/correios.svg" alt="Logo correios" />
      </header>
      <main>
        <div className="content">
          <h2>Busca CEP correios</h2>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Informe o seu CEP"
              value={cep}
              onChange={event => setCep(event.target.value)}
            />
            <button type="submit">Buscar</button>
          </form>

          {dataCep.empty && (
            <div className="content-data-cep">
              <strong>Campo de Cep vazio</strong>
            </div>
          )}

          {dataCep.erro && (
            <div className="content-data-cep">
              <strong>O Cep informado é inválido</strong>
            </div>
          )}

          {(Object.keys(dataCep).length !== 0 && !dataCep.erro && !dataCep.empty) && (
            <div className="content-data-cep">
              <p><strong>Cidade:</strong> {dataCep.localidade}</p>
              <p><strong>Estado:</strong> {dataCep.uf}</p>
              <p><strong>Rua:</strong> {dataCep.logradouro}</p>
              <p><strong>Bairro:</strong> {dataCep.bairro}</p>
            </div>
          )}
        </div>
      </main>
      <footer>
        <span>Jonas Cardoso - Atividade 7</span>
      </footer>
    </div>
  );
}

export default App;
