import React from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomonedas';

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

const Fomulario = () => {

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', nombre: 'Peso Mexicano'},
        { codigo: 'EUR', nombre: 'Euro'},
        { codigo: 'GBP', nombre: 'Libra Esterlina'} 
    ]

    // Utilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda('Elije tu moneda', '', MONEDAS);

    // Utilizar useCriptomoneda
    const [ criptomoneda, SelectCriptomoneda ] = useCriptomoneda('Elige tu Criptomoneda', '');

    return ( 
        <form>
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