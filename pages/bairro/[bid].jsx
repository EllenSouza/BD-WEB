// React & Next
import { useEffect, useState } from 'react';
// Primereact
import { Chart } from 'primereact/chart';
import { Divider } from 'primereact/divider';
// Services
import { BairroService } from '../../services/bairro-service';
// Components
import { BarSkeleton } from '../../components/skeletons/bar_skeleton';
import { PieSkeleton } from '../../components/skeletons/pie_skeleton';
// Utils
import { separateData } from '../../utils/utils';

const initChart = {
    labels: [],
    data: [],
    title: '',
};

export default function Bairro({ loading, query }) {
    const service = new BairroService();
    const [chartFaixaRenda, setChartFaixaRenda] = useState(initChart);
    const [chartAtivEco, setChartAtivEco] = useState(initChart);
    const [loadingPage, setLoadingPage] = useState(false);

    useEffect(() => {
        const initScreen = async () => {
            try {
                loading(true);
                setLoadingPage(true);
                const [[bairro], ativEcoPorBairro, [faixaRendaPorBairro]] =
                    await Promise.all([
                        getBairro(),
                        getAtivEcoBairro(),
                        getFaixaRendaBairro(),
                    ]);
                let [labels, data] = separateData(
                    ativEcoPorBairro,
                    'Nome_Ativ',
                    'Quantidade_Empregos'
                );
                setChartAtivEco({
                    labels,
                    data,
                    title: `15 Atividades econômicas mais presentes em ${bairro.Nome_Bairro}`,
                });

                labels = Object.keys(faixaRendaPorBairro);
                data = Object.values(faixaRendaPorBairro);
                setChartFaixaRenda({
                    labels,
                    data,
                    title: `Quantidade de famílias em cada faixa de renda em ${bairro.Nome_Bairro}`,
                });
            } catch (error) {
            } finally {
                loading(false);
                setLoadingPage(false);
            }
        };
        initScreen();
    }, []);

    const getBairro = async () => {
        return await service.getBairro(query.bid);
    };
    const getFaixaRendaBairro = async () => {
        return await service.getFaixaRendaBairro(query.bid);
    };

    const getAtivEcoBairro = async () => {
        return await service.getAtivEcoBairro(query.bid);
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
        <>
            {loadingPage ? (
                <div className="flex flex-column gap-5">
                    <BarSkeleton />
                    <Divider />
                    <PieSkeleton />
                </div>
            ) : (
                <div className="flex flex-column align-items-center p-3">
                    <Chart
                        type="bar"
                        data={newChartData(
                            chartAtivEco.labels,
                            chartAtivEco.data
                        )}
                        width="80rem"
                        height="40rem"
                        options={newChartOptions(chartAtivEco.title)}
                    />
                    <Divider />
                    <Chart
                        type="pie"
                        data={newChartData(
                            chartFaixaRenda.labels,
                            chartFaixaRenda.data
                        )}
                        width="35rem"
                        height="35rem"
                        options={newChartOptions(chartFaixaRenda.title)}
                    />
                </div>
            )}
        </>
    );
}
export async function getServerSideProps({ query }) {
    return { props: { query } };
}
