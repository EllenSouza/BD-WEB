import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';
import { FavelaService } from '../../services/favela-service';
import { Divider } from 'primereact/divider';

export default function Favela({ loading }) {
    const service = new FavelaService();
    const [favPorBairro, setFavPorBairro] = useState({
        labels: [],
        results: [],
    });
    const [favPorAP, setFavPorAP] = useState({
        labels: [],
        results: [],
    });
    const [bairrosEP, setBairrosEP] = useState({
        labels: [],
        results: [],
    });

    const getQtdFavBairro = async () => {
        const resp = await service.getQtdFavelasPorBairro();
        return resp;
    };
    const getQtdFavAP = async () => {
        const resp = await service.getQtdFavelasPorAP();
        return resp;
    };
    const getQtdEPBairro = async () => {
        const resp = await service.getBairrosMaiorExtremaPobreza();
        return resp;
    };

    useEffect(() => {
        const getData = async () => {
            try {
                loading(true);
                const favPorBairro = {
                    labels: [],
                    results: [],
                };
                const favPorAP = {
                    labels: [],
                    results: [],
                };
                const bairrosEP = {
                    labels: [],
                    results: [],
                };
                const [qtdFavPorBairro, qtdFavPorAP, qtdEPPorBairro] =
                    await Promise.all([
                        getQtdFavBairro(),
                        getQtdFavAP(),
                        getQtdEPBairro(),
                    ]);
                qtdFavPorBairro.map((registro) => {
                    favPorBairro.labels.push(registro.Nome_Bairro);
                    favPorBairro.results.push(registro.Qtd_Favelas);
                });
                setFavPorBairro(favPorBairro);
                qtdFavPorAP.map((registro) => {
                    favPorAP.labels.push(registro.Nome_AP);
                    favPorAP.results.push(registro.Qtd_Favelas);
                });
                setFavPorAP(favPorAP);
                qtdEPPorBairro.map((registro) => {
                    bairrosEP.labels.push(registro.nome_bairro);
                    bairrosEP.results.push(registro.total_extrema_pobreza);
                });
                setBairrosEP(bairrosEP);
            } catch (error) {
            } finally {
                loading(false);
            }
        };
        getData();
    }, []);

    const newData = (labels, textLabel, results, color) => {
        return {
            labels: labels,
            datasets: [
                {
                    label: textLabel,
                    data: results,
                    fill: false,
                    backgroundColor: color,
                },
            ],
        };
    };
    const options = (text) => {
        return {
            plugins: {
                title: {
                    display: true,
                    text: text,
                    font: {
                        size: 16,
                    },
                },
                legend: {
                    position: 'bottom',
                },
            },
        };
    };

    let horizontalOptions = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            title: {
                display: true,
                text: 'Bairros com maiores números de Extrema Pobreza',
                font: {
                    size: 16,
                },
            },
            legend: {
                position: 'bottom',
                color: '#000000'
            },
        },
    };

    return (
        <>
            <div className="flex justify-content-center">
                <Chart
                    id="FavPorBairro"
                    type="bar"
                    data={newData(
                        favPorBairro.labels,
                        'Quantidade de favelas',
                        favPorBairro.results,
                        '#4cd07c'
                    )}
                    options={options('Quantidade de favelas por Bairro (RJ)')}
                    style={{ width: 1200 }}
                />
            </div>
            <Divider />
            <div className="flex justify-content-center mt-7 mb-7">
                <Chart
                    id="FavPorAP"
                    type="doughnut"
                    data={newData(
                        favPorAP.labels,
                        'Quantidade de favelas',
                        favPorAP.results,
                        ['#FF6384', '#36A2EB', '#FFCE56', '#4cd07c', '#9400d3']
                    )}
                    options={options(
                        'Quantidade de favelas por área de planejamento (RJ)'
                    )}
                    style={{ position: 'relative', width: '40%' }}
                />
            </div>
            <Divider />
            <div className="flex justify-content-center mt-7 mb-7">
                <Chart
                    id="BairrosMaiorExtremaPobreza"
                    type="bar"
                    data={newData(
                        bairrosEP.labels,
                        'Quantidade de famílias em Extrema Pobreza',
                        bairrosEP.results,
                        [
                            `var(--red-900)`,
                            `var(--red-900)`,
                            `var(--red-900)`,
                            `var(--red-900)`,
                            `var(--red-900)`,
                            `var(--red-900)`,
                            `var(--red-900)`,
                            `var(--red-800)`,
                            `var(--red-700)`,
                            `var(--red-600)`,
                            `var(--red-500)`,
                            `var(--red-400)`,
                            `var(--red-300)`,
                            `var(--red-200)`,
                            `var(--red-100)`,
                        ]
                    )}
                    options={horizontalOptions}
                    style={{ width: 1200 }}
                />
            </div>
            <Divider />
        </>
    );
}
