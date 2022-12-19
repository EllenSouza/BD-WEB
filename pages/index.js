import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
    const [complexos, setComplexos] = useState([]);

    useEffect(() => {
        getComplexos();
    }, []);

    useEffect(() => {
        console.log(complexos), [complexos];
    });

    const getComplexos = async () => {
        fetch('http://localhost:3000/api/db')
            .then((res) => res.json())
            .then((complexos) => {
                console.log(complexos);
                setComplexos(complexos.data);
            });
    };

    return (
        <>
            <Head>
                <title>Trabalho Final - BD</title>
            </Head>
            <main>
                <table>
                    <thead>
                        <tr>
                            <td>Código Complexo</td>
                            <td>Nome Complexo</td>
                        </tr>
                    </thead>
                    <tbody>
                        {complexos.map((comp) => {
                            return (
                                <tr key={comp.Cod_Comp}>
                                    <td>{comp.Cod_Comp}</td>
                                    <td>{comp.Nome_Comp}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </main>
        </>
    );
}
