import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from'./componentes/Formulario';
import Cotizacion from'./componentes/Cotizacion';
import Spinner from './componentes/Spinner';


const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;

  @media (max-width: 992px) {
    height: 300px;
    display: block;
    margin: 0px auto;
  }
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  
  &::after {
    content:'';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {

    const cotizarCriptomoneda = async () => {
      // evitamos la ejecución la primera vez
      if (moneda === '') return;

      // consultar la api para obtener la cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      // mostrar el spiner
      guardarCargando(true);

      // ocultar el spinner y mostrar el resultado
      setTimeout(() => {

        // cambiar el estado de cargando
        guardarCargando(false);

        // guardar cotización
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda] );

      }, 3000);

    }
    cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  // Mostrar spinner o reultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="imagen cripto"
        />
      </div>

      <div>
        <Heading>
          Cotiza Criptomonedas al Instante
        </Heading>

        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        {componente}

      </div>
    </Contenedor>
  );
}

export default App;
