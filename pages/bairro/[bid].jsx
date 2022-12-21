import { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { BairroService } from '../../services/bairro-service';

export default function Bairro({ loading, query }) {
    const service = new BairroService();
    const [charts, setCharts] = useState([]);

    const TYPE_CHARTS = ['bar', 'pie'];
    const TITLE_CHARTS = [
        'Atividades econômicas por bairro',
        'Faixa de renda por bairro',
    ];

    useEffect(() => {
        const initScreen = async () => {
            try {
                loading(true);
                const _charts = [];
                const [ativEcoPorBairro, faixaRendaPorBairro] =
                    await service.getDadosBairro(query.bid);
                let labels = getField(ativEcoPorBairro, 'Nome_Ativ');
                let data = getField(ativEcoPorBairro, 'Quantidade_Empregos');
                _charts.push({ labels, data });

                labels = [
                    'Acima_Meio_SM',
                    'Baixa_Renda',
                    'Extrema_Pobreza',
                    'Pobreza',
                ];
                const faixa = faixaRendaPorBairro.shift();
                data = [
                    faixa.Acima_Meio_SM,
                    faixa.Baixa_Renda,
                    faixa.Extrema_Pobreza,
                    faixa.Pobreza,
                ];
                _charts.push({ labels, data });
                setCharts(_charts);
            } catch (error) {
            } finally {
                loading(false);
            }
        };
        initScreen();
    }, []);

    const getField = (data, field) => {
        const array = data.map((reg) => {
            return reg[field];
        });
        return array;
    };

    const newChartData = (labels, data, title = '') => {
        return {
            labels: labels,
            datasets: [
                {
                    label: title,
                    data: data,
                    backgroundColor: [
                        '#42A5F5',
                        '#66BB6A',
                        '#FFA726',
                        '#FFCE56',
                    ],
                    hoverBackgroundColor: [
                        '#64B5F6',
                        '#81C784',
                        '#FFB74D',
                        '#FFCE56',
                    ],
                    fill: false,
                    borderColor: '#42A5F5',
                },
            ],
        };
    };

    const newChartOptions = (title) => {
        return {
            plugins: {
                title: {
                    display: true,
                    text: title,
                    font: {
                        size: 16,
                    },
                },
                legend: {
                    position: 'top',
                },
            },
        };
    };

    return (
        <div style={{ height: '100%' }}>
            {charts.map((chart, index) =>
                index == 1 ? (
                    <Chart
                        key={index}
                        style={{ width: '45rem', height: '45rem' }}
                        type={TYPE_CHARTS[index]}
                        data={newChartData(chart.labels, chart.data)}
                        options={newChartOptions(TITLE_CHARTS[index])}
                    />
                ) : (
                    <Chart
                        key={index}
                        type={TYPE_CHARTS[index]}
                        data={newChartData(chart.labels, chart.data)}
                        options={newChartOptions(TITLE_CHARTS[index])}
                    />
                )
            )}
        </div>
    );
}
export async function getServerSideProps({ query }) {
    return { props: { query } };
}
