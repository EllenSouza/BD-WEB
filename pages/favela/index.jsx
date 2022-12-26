// React & Next
import { useEffect, useState } from 'react';
// Primereact
import { Chart } from 'primereact/chart';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { TabView, TabPanel } from 'primereact/tabview';
// Services
import { FavelaService } from '../../services/favela-service';
// Components
import { TabViewSkeleton } from '../../components/skeletons/tabview_skeleton';
// Utils
import C from '../../utils/constants';
// Templates
import { template } from '../../components/templates/template';
import {
    newChartData,
    newChartOptions,
    newDataset,
    separateData,
} from '../../utils/utils';

export default function Favelas({ loading, favelas }) {
    const favelaService = new FavelaService();
    const [selectedFavela, setSelectedFavela] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const [loadingPage, setLoadingPage] = useState(false);

    const [chartFavBairro, setChartFavBairro] = useState(C.INITCHAT);
    const [chartFavAP, setChartFavAP] = useState(C.INITCHAT);
    const [chartFavUrb, setChartFavUrb] = useState(C.INITCHAT);
    const [chartFavPop, setChartFavPop] = useState(C.INITCHAT);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        const initScreen = async () => {
            try {
                loading(true);
                setLoadingPage(true);

                const [qtdFavelasPorBairro, qtdFavelasPorAP, qtdFavelasPorUrb, qtdFavelasPorPop] =
                    await Promise.all([
                        getFavelasPorBairro(),
                        getQtdFavAP(),
                        getQtdFavUrb(),
                        getQtdFavPop(),
                    ]);

                const _chartFavBairro =
                    createChartFavBairro(qtdFavelasPorBairro);
                setChartFavBairro(_chartFavBairro);

                const _chartFavPorAP = createChartFavAP(qtdFavelasPorAP);
                setChartFavAP(_chartFavPorAP);

                const _chartFavPorUrb = createChartFavUrb(qtdFavelasPorUrb);
                setChartFavUrb(_chartFavPorUrb);

                const _chartFavPop = createChartFavPop(qtdFavelasPorPop);
                setChartFavPop(_chartFavPop);

            } catch (error) {
            } finally {
                loading(false);
                setLoadingPage(false);
            }
        };
        initScreen();
    }, []);

    const getFavelasPorBairro = async () => {
        return favelaService.getQtdFavelasPorBairro();
    };

    const getQtdFavAP = async () => {
        const resp = favelaService.getQtdFavelasPorAP();
        return resp;
    };

    const getQtdFavUrb = async () => {
        return favelaService.getQtdFavelaPorUrbanizacao();
    };

    const getQtdFavPop = async () => {
        return favelaService.getQtdFavelasPorPopulacao();
    }

    const createChartFavBairro = (qtdFavelasPorBairro) => {
        const [labels, data] = separateData(qtdFavelasPorBairro, [
            'Nome_Bairro',
            'Qtd_Favelas',
        ]);

        const dataset = newDataset(['Quantidade de favelas'], data, [
            '#4CD07C',
        ]);
        return newChartData(labels, [dataset]);
    };

    const createChartFavAP = (qtdFavelasPorAP) => {
        const [labels, data] = separateData(qtdFavelasPorAP, [
            'Nome_AP',
            'Qtd_Favelas',
        ]);

        const dataset = newDataset(['Quantidade de favelas'], data, [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4cd07c',
            '#9400d3',
        ]);
        return newChartData(labels, [dataset]);
    };

    const createChartFavUrb = (qtdFavelasPorUrb) => {
        const [labels, data] = separateData(qtdFavelasPorUrb, [
            'Grau_de_urbanizacao',
            'Qtd_Favelas',
        ]);

        const dataset = newDataset(['Quantidade de favelas'], data, [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4cd07c',
        ]);
        return newChartData(labels, [dataset]);
    };
    const createChartFavPop = (qtdFavelasPorPop) => {
        const [labels, data] = separateData(qtdFavelasPorPop, [
            'Qtd_de_domicilios',
            'Qtd_Favelas',
        ]);

        const dataset = newDataset(['Quantidade de favelas'], data, [
            '#66BB6A',
            '#FFA726',
            '#26C6DA',
            '#7E57C2',
        ]);
        return newChartData(labels, [dataset]);
    };
    const tabPanoramaGeral = (
        <div className="flex flex-column justify-content-center alingn-items-center">
            <Chart
                id="FavPorBairro"
                type="bar"
                data={chartFavBairro}
                options={newChartOptions(
                    'Top 30 quantidade de favelas por Bairro (RJ)'
                )}
            />
            <Divider />
            <div className="flex justify-content-center">
                <Chart
                    id="FavPorAP"
                    type="doughnut"
                    width="35rem"
                    height="35rem"
                    data={chartFavAP}
                    options={newChartOptions(
                        'Quantidade de favelas por área de planejamento (RJ)'
                    )}
                />
            </div>
        </div>
    );
    const tabGrauUrbanizacao = (
        <div className="flex justify-content-center">
            <Chart
                id="FavPorGrauUrbanizacao"
                type="pie"
                width="35rem"
                height="35rem"
                data={chartFavUrb}
                options={newChartOptions(
                    'Quantidade de favelas em cada grau de urbanização'
                )}
            />
        </div>
    );
    const tabPopulacao = (
        <div className="flex justify-content-center">
            <Chart
                id="FavPorPopulacao"
                type="polarArea"
                width="35rem"
                height="35rem"
                data={chartFavPop}
                opitions={newChartOptions(
                    'Quantidade de favelas em cada faixa de domicíios'
                )}
            />
        </div>
    );

    return (
        <>
            <div className="flex flex-column gap-4 p-3">
                <Panel
                    headerTemplate={(opt) =>
                        template(opt, 'Selecione uma favela')
                    }
                    toggleable
                >
                    <form className="flex fluid" onSubmit={handleSearch}>
                        <div className="field p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-search" />
                            </span>
                            <Dropdown
                                value={selectedFavela}
                                options={favelas}
                                filter
                                required
                                filterBy="Nome_Fav"
                                optionLabel="Nome_Fav"
                                placeholder="Selecione uma favela"
                                style={{ borderRadius: '0px' }}
                                onChange={(e) =>
                                    setSelectedFavela(e.target.value)
                                }
                            />
                        </div>
                        <div className="field">
                            <Button
                                className="p-button-outlined"
                                style={{ borderRadius: '0 3px 3px 0' }}
                                label="Buscar"
                                iconPos="right"
                                icon="pi pi-search"
                                type="submit"
                            />
                        </div>
                    </form>
                </Panel>
                {loadingPage ? (
                    <div className="flex flex-column gap-5">
                        <TabViewSkeleton />
                    </div>
                ) : (
                    <TabView
                        renderActiveOnly
                        activeIndex={activeTab}
                        onTabChange={(e) => setActiveTab(e.index)}
                    >
                        <TabPanel header="Panorama Geral">
                            {tabPanoramaGeral}
                        </TabPanel>
                        <TabPanel header="Grau de Urbanização">
                            {tabGrauUrbanizacao}
                        </TabPanel>
                        <TabPanel header="População">
                            {tabPopulacao}    
                        </TabPanel>
                    </TabView>
                )}
            </div>
        </>
    );
}
export async function getServerSideProps(context) {
    try {
        // Fetch data from external API
        const favelaService = new FavelaService();
        const favelas = await favelaService.getFavelas();
        return { props: { favelas } };
        // Pass data to the page via props
    } catch (error) {
        return { props: {} };
    }
}
