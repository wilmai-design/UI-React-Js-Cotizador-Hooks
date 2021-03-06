import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Error from './Error';
import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomonedas';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: .5s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Fomulario = ({guardarMoneda, guardarCriptomoneda}) => {

    // state del listado de criptomoneda
    const [ listacripto, guardarCriptomonedas ] = useState([]);
    const [ error, guardarError ] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', nombre: 'Peso Mexicano'},
        { codigo: 'EUR', nombre: 'Euro'},
        { codigo: 'GBP', nombre: 'Libra Esterlina'} 
    ]

    // Utilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda('Elije tu moneda', '', MONEDAS);

    // Utilizar useCriptomoneda
    const [ criptomoneda, SelectCriptomoneda ] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

    // Ejecutar llamado a la API
    useEffect(() => {
        const consultartAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            // console.log(resultado.data.Data);
            guardarCriptomonedas(resultado.data.Data)
        }
        consultartAPI();
    }, []);

    // Cuando el susuario haga submit
    const cotizarMoneda = e => {
        e.preventDefault();

        // validar si ambos campos estan llenos
        if(moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }

        // pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }


    return ( 
        <form
            onSubmit={cotizarMoneda}
        >

            {error ? <Error mensaje="Todos los campos son obligatorios" />: null }

            <SelectMonedas />

            <SelectCriptomoneda />

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    );
}

export default Fomulario;