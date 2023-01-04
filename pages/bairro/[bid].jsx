// React & Next
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// Primereact
import { Chart } from 'primereact/chart';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Divider } from 'primereact/divider';
import { DataTable } from 'primereact/datatable';

// Services
import { BairroService } from '../../services/bairro-service';
// Components
import { PieSkeleton } from '../../components/skeletons/pie_skeleton';
import { BarSkeleton } from '../../components/skeletons/bar_skeleton';
// Utils
import {
    newDataset,
    newChartData,
    separateData,
    newChartOptions,
} from '../../utils/utils';
import C from '../../utils/constants';
import { TableSkeleton } from '../../components/skeletons/table_skeleton';

export default function Bairro({ loading, query }) {
    const service = new BairroService();
    const router = useRouter();
    const [loadingPage, setLoadingPage] = useState(false);
    const [chartAtivEco, setChartAtivEco] = useState(C.INITCHAT);
    const [chartFaixaRenda, setChartFaixaRenda] = useState(C.INITCHAT);
    const [bairro, setBairro] = useState({ Nome_Bairro: '', Cod_Bairro: -1 });
    const [favelasBairro, setFavelasBairro] = useState([]);

    useEffect(() => {
        const initScreen = async () => {
            try {
                loading(true);
                setLoadingPage(true);
                const [
                    [bairro],
                    ativEcoPorBairro,
                    [faixaRendaPorBairro],
                    favelasBairro,
                ] = await Promise.all([
                    getBairro(),
                    getAtivEcoBairro(),
                    getFaixaRendaBairro(),
                    getFavelasBairro(),
                ]);

                if (!bairro) return;

                setBairro(bairro);

                const chartAtivEco = createChartAtivEco(ativEcoPorBairro);
                setChartAtivEco(chartAtivEco);

                const chartFaixaRenda =
                    createChartFaixaRenda(faixaRendaPorBairro);
                setChartFaixaRenda(chartFaixaRenda);
                setFavelasBairro(favelasBairro);
            } catch (error) {
            } finally {
                loading(false);
                setLoadingPage(false);
            }
        };
        initScreen();
    }, []);

    const getBairro = async () => service.getBairro(query.bid);
    const getFaixaRendaBairro = async () =>
        service.getFaixaRendaBairro(query.bid);
    const getAtivEcoBairro = async () => service.getAtivEcoBairro(query.bid);
    const getFavelasBairro = async () => service.getFavelasBairro(query.bid);

    const createChartAtivEco = (ativEcoPorBairro) => {
        const [labels, data] = separateData(ativEcoPorBairro, [
            'Nome_Ativ',
            'Quantidade_Empregos',
        ]);
        const dataset = newDataset('Quantidade de empregos', data);
        return newChartData(labels, [dataset]);
    };

    const createChartFaixaRenda = (faixaRendaPorBairro) => {
        const data = Object.values(faixaRendaPorBairro);
        const labels = [
            'Acima Meio SM',
            'Baixa Renda',
            'Pobreza',
            'Extrema Pobreza',
        ];

        const dataset = newDataset('Quantidade de famílias', data, [
            '#3778C2',
            '#4BAC35',
            '#A0B335',
            '#F5B935',
        ]);
        return newChartData(labels, [dataset]);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <Button
                className="p-button-rounded p-button-outlined"
                icon="pi pi-chevron-right"
                onClick={() => router.push(`/favela/${rowData.Cod_Fav}`)}
            />
        );
    };

    return (
        <>
            {loadingPage ? (
                <div className="flex flex-column gap-5 px-3">
                    <BarSkeleton />
                    <Divider />
                    <PieSkeleton />
                    <Divider />
                    <TableSkeleton />
                    <Divider />
                </div>
            ) : (
                <div className="flex flex-column align-items-center p-3">
                    <Chart
                        type="bar"
                        data={chartAtivEco}
                        width="80rem"
                        height="40rem"
                        options={newChartOptions(
                            `Atividades econômicas mais presentes em ${bairro.Nome_Bairro}`,
                            'y'
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
                    <Divider />
                    <DataTable
                        value={favelasBairro}
                        header={`Favelas de ${bairro.Nome_Bairro}`}
                        stripedRows
                        removableSort
                        emptyMessage="Este bairro não possui favelas"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        responsiveLayout="stack"
                        style={{ width: '100%' }}
                    >
                        <Column
                            field="Nome_Fav"
                            header="Nome Favela"
                            sortable
                        />
                        <Column
                            header="Visitar"
                            alignHeader="right"
                            align="right"
                            body={(rowData) => actionBodyTemplate(rowData)}
                        />
                    </DataTable>
                </div>
            )}
        </>
    );
}
export async function getServerSideProps({ query }) {
    return { props: { query } };
}
