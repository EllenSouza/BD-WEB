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
import {
    newDataset,
    newChartData,
    separateData,
    newChartOptions,
} from '../../utils/utils';
import C from '../../utils/constants';

export default function Bairro({ loading, query }) {
    const service = new BairroService();
    const [loadingPage, setLoadingPage] = useState(false);
    const [chartAtivEco, setChartAtivEco] = useState(C.INITCHAT);
    const [chartFaixaRenda, setChartFaixaRenda] = useState(C.INITCHAT);
    const [bairro, setBairro] = useState({ Nome_Bairro: '', Cod_Bairro: -1 });

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
                setBairro(bairro);

                const chartAtivEco = createChartAtivEco(ativEcoPorBairro);
                setChartAtivEco(chartAtivEco);

                const chartFaixaRenda = createChartFaixaRenda(
                    faixaRendaPorBairro,
                    bairro
                );
                setChartFaixaRenda(chartFaixaRenda);
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

    const createChartAtivEco = (ativEcoPorBairro) => {
        const [labels, data] = separateData(ativEcoPorBairro, [
            'Nome_Ativ',
            'Quantidade_Empregos',
        ]);
        const dataset = newDataset(`Atividades Econômicas`, data);
        return newChartData(labels, [dataset]);
    };

    const createChartFaixaRenda = (faixaRendaPorBairro, bairro) => {
        const data = Object.values(faixaRendaPorBairro);
        const labels = [
            'Acima Meio SM',
            'Baixa Renda',
            'Pobreza',
            'Extrema Pobreza',
        ];

        const dataset = newDataset(
            `Quantidade de famílias em cada faixa de renda em ${bairro.Nome_Bairro}`,
            data,
            ['#3778C2', '#4BAC35', '#A0B335', '#F5B935']
        );
        return newChartData(labels, [dataset]);
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
                        data={chartAtivEco}
                        width="80rem"
                        height="40rem"
                        options={newChartOptions(
                            `15 Atividades econômicas mais presentes em ${bairro.Nome_Bairro}`
                        )}
                    />
                    <Divider />
                    <Chart
                        type="pie"
                        data={chartFaixaRenda}
                        width="35rem"
                        height="35rem"
                        options={newChartOptions(
                            `Quantidade de famílias em cada faixa de renda em ${bairro.Nome_Bairro}`
                        )}
                    />
                </div>
            )}
        </>
    );
}
export async function getServerSideProps({ query }) {
    return { props: { query } };
}
