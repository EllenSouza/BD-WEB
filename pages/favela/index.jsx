import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';
import { FavelaService } from '../../services/favela-service';

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

    const getQtdFavBairro = async () => {
        const resp = await service.getQtdFavelasPorBairro();
        return resp;
    };
    const getQtdFavAP = async () => {
        const resp = await service.getQtdFavelasPorAP();
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
                const [qtdFavPorBairro, qtdFavPorAP] = await Promise.all([
                    getQtdFavBairro(),
                    getQtdFavAP(),
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
            <div className="flex justify-content-center mt-7">
                <Chart
                    id="FavPorAP"
                    type="doughnut"
                    data={newData(
                        favPorAP.labels,
                        'Quantidade de favelas',
                        favPorAP.results,
                        [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#4cd07c",
                            "#9400d3",
                        ]
                        
                    )}
                    options={options(
                        'Quantidade de favelas por área de planejamento (RJ)'
                    )}
                    style={{ position: 'relative', width: '40%' }}
                />
            </div>
        </>
    );
}
