import { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { Divider } from 'primereact/divider';
import { BairroService } from '../../services/bairro-service';
import { BarSkeleton } from '../../components/skeletons/bar_skeleton';
import { PieSkeleton } from '../../components/skeletons/pie_skeleton';

export default function Bairro({ loading, query }) {
    const service = new BairroService();
    const [charts, setCharts] = useState([]);
    const [loadingPage, setLoadingPage] = useState(false);

    const TYPE_CHARTS = ['bar', 'pie'];
    const TITLE_CHARTS = [
        'Atividades econômicas por bairro',
        'Faixa de renda por bairro',
    ];

    useEffect(() => {
        const initScreen = async () => {
            try {
                loading(true);
                setLoadingPage(true);
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
                setLoadingPage(false);
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

    const renderCharts = () => {
        return charts.map((chart, index) => (
            <>
                <Chart
                    key={index}
                    type={TYPE_CHARTS[index]}
                    data={newChartData(chart.labels, chart.data)}
                    width="35rem"
                    height="35rem"
                    options={newChartOptions(TITLE_CHARTS[index])}
                />
                <Divider />
            </>
        ));
    };

    return (
        <>
            {loadingPage ? (
                <div className="flex flex-column gap-5">
                    <BarSkeleton />
                    <Divider />
                    <PieSkeleton />
                </div>
            ) : (
                <div className="flex flex-column align-items-center p-3">
                    {renderCharts()}
                </div>
            )}
        </>
    );
}
export async function getServerSideProps({ query }) {
    return { props: { query } };
}
