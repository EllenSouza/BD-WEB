import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';
import { FavelaService } from '../../services/favela-service';

export default function Favela() {
    const service = new FavelaService();

    const getQtdFavBairro = async () => {
        const resp = await service.getQtdFavelasPorBairro();
        return resp;
    };

    const [labels, setLabels] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const label = [];
            const result = [];
            // const qtdFavPorBairro = await getQtdFavBairro();
            // console.log(qtdFavPorBairro);
            // qtdFavPorBairro.map((registro) => {
            //     label.push(registro.Nome_Bairro);
            //     result.push(registro.Qtd_Favelas);
            // });
            // setLabels(label);
            // setResults(result);
        };
        getData();
    }, []);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Quantidade de favelas',
                data: results,
                fill: false,
                backgroundColor: '#4cd07c',
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Quantidade de favelas por Bairro (RJ)',
                font: {
                    size: 16,
                },
            },
            legend: {
                position: 'bottom',
            },
        },
    };

    return (
        <>
            <div className="flex justify-content-center">
                <Chart
                    id="FavPorBairro"
                    type="bar"
                    data={data}
                    options={options}
                    style={{ width: 1200 }}
                />
            </div>
        </>
    );
}
