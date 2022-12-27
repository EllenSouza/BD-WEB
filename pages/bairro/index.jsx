// React & Next
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// Primreact
import { Chip } from 'primereact/chip';
import { Tree } from 'primereact/tree';
import { Panel } from 'primereact/panel';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { TreeTable } from 'primereact/treetable';
import { TabView, TabPanel } from 'primereact/tabview';
// Services
import { BairroService } from '../../services/bairro-service';
// Components
import { TabViewSkeleton } from '../../components/skeletons/tabview_skeleton';
// Utils
import C from '../../utils/constants';
import {
    separateData,
    newDataset,
    newChartData,
    newChartOptions,
} from '../../utils/utils';
// Templates
import { template } from '../../components/templates/template';

export default function PesquisaBairro({ loading, bairros }) {
    const router = useRouter();
    const service = new BairroService();
    const [activeTab, setActiveTab] = useState(0);
    const [loadingPage, setLoadingPage] = useState(false);
    const [chartFaixaRendaAP, setChartFaixaRendaAP] = useState(C.INITCHAT);
    const [maxFaixaRenda, setMaxFaixaRenda] = useState({
        acima_meio_sm: { Nome_Bairro: '', Acima_Meio_SM: -1 },
        baixa_renda: { Nome_Bairro: '', Baixa_Renda: -1 },
        pobreza: { Nome_Bairro: '', Pobreza: -1 },
        extrema_pobreza: { Nome_Bairro: '', Extrema_Pobreza: -1 },
    });
    const [bairrosMaisFavelas, setBairrosMaisFavelas] = useState([]);
    const [bairrosMaisAtivEco, setBairrosMaisAtivEco] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [nodesAtivEco, setNodesAtivEco] = useState([]);
    const [selectedBairro, setSelectedBairro] = useState('');

    useEffect(() => console.log(nodesAtivEco), [nodesAtivEco]);

    useEffect(() => {
        const initScreen = async () => {
            try {
                loading(true);
                setLoadingPage(true);
                const [
                    maxFaixaRenda,
                    faixaRendaPorAP,
                    bairrosMaisFavelas,
                    bairrosFavelas,
                    bairrosMaisAtivEco,
                    bairrosAtivEco,
                ] = await Promise.all([
                    getMaxFaixaRenda(),
                    getFaixaRendaPorAP(),
                    getBairrosMaisFavelas(),
                    getBairrosFavelas(),
                    getBairrosMaisAtivEco(),
                    getBairrosAtivEco(),
                ]);

                setMaxFaixaRenda(maxFaixaRenda);
                setBairrosMaisFavelas(bairrosMaisFavelas);

                const chartFaixaRendaAP =
                    createChartFaixaRendaAP(faixaRendaPorAP);
                setChartFaixaRendaAP(chartFaixaRendaAP);

                const _nodes = createTreeBairroFavela(bairrosFavelas);
                setNodes(_nodes);

                setBairrosMaisAtivEco(bairrosMaisAtivEco);

                const _nodesAtivEco = createTreeBairroAtivEco(bairrosAtivEco);
                setNodesAtivEco(_nodesAtivEco);
            } catch (error) {
            } finally {
                loading(false);
                setLoadingPage(false);
            }
        };
        initScreen();
    }, []);

    const getMaxFaixaRenda = async () => {
        return service.getMaxFaixaRenda();
    };

    const getFaixaRendaPorAP = async () => {
        return service.getFaixaRendaPorAP();
    };

    const getBairrosMaisFavelas = async () => {
        return service.getBairrosMaisFavelas();
    };

    const getBairrosFavelas = async () => {
        return service.getBairrosFavelas();
    };

    const getBairrosAtivEco = async () => {
        return service.getBairrosAtivEco();
    };

    const getBairrosMaisAtivEco = async () => {
        return service.getBairrosMaisAtivEco();
    };

    const createChartFaixaRendaAP = (faixaRendaPorAP) => {
        const [labels, pobreza, extremaPobreza, baixaRenda, acimaMeioSM] =
            separateData(faixaRendaPorAP, [
                'Nome_AP',
                'Pobreza',
                'Extrema_Pobreza',
                'Baixa_Renda',
                'Acima_Meio_SM',
            ]);

        const labelsDataset = [
            'Extrema Pobreza',
            'Pobreza',
            'Baixa Renda',
            'Acima Meio SM',
        ];

        const colorDataset = [
            '#2057D4',
            '#7E57C2',
            '#FFCA28',
            '#EC407A',
            '#26A69A',
        ];

        const datasets = [extremaPobreza, pobreza, baixaRenda, acimaMeioSM].map(
            (faixa, index) => {
                return newDataset(
                    labelsDataset[index],
                    faixa,
                    colorDataset[index]
                );
            }
        );
        return newChartData(labels, datasets);
    };

    const createTreeBairroFavela = (bairrosFavelas) => {
        const bairros = [
            ...new Set(
                bairrosFavelas.map((reg) => {
                    return reg.Nome_Bairro;
                })
            ),
        ];

        const tree = bairros.map((bairro, index) => {
            const children = bairrosFavelas
                .filter(
                    (reg) => reg.Nome_Bairro == bairro && reg.Nome_Fav != null
                )
                .map((reg, ind) => {
                    return {
                        key: `${index}-${ind}`,
                        label: reg.Nome_Fav,
                        data: reg.Nome_Fav,
                        icon: 'pi pi-map-marker',
                        draggable: true,
                    };
                });
            return {
                key: index.toString(),
                label: bairro,
                data: bairro,
                icon: 'pi pi-sitemap',
                children,
            };
        });
        return tree;
    };

    const createTreeBairroAtivEco = (bairrosAtivEco) => {
        const bairros = [
            ...new Set(
                bairrosAtivEco.map((reg) => {
                    return reg.Nome_Bairro;
                })
            ),
        ];

        const tree = bairros.map((bairro, index) => {
            const children = bairrosAtivEco
                .filter(
                    (reg) => reg.Nome_Bairro == bairro && reg.Nome_Ativ != null
                )
                .map((reg, ind) => {
                    return {
                        key: `${index}-${ind}`,
                        data: {
                            name: reg.Nome_Ativ,
                            quantity: reg.Quantidade_Empregos,
                        },
                    };
                });
            const sum = children.reduce(
                (acc, ativEco) => acc + ativEco.data.quantity,
                0
            );
            return {
                key: `${index}`,
                data: {
                    name: bairro,
                    quantity: sum,
                },
                children,
            };
        });
        // console.log(tree);
        return tree;
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (selectedBairro == '') return;

        router.push(`/bairro/${selectedBairro.Cod_Bairro}`);
    };

    const rowClassName = (node) => {
        return { 'font-bold': node.children };
    };

    const tabFaixaRenda = (
        <>
            <div className="flex flex-column align-items-center">
                <header>
                    <h2 className="primary">
                        Bairros com maiores índices de cada faixa de renda
                    </h2>
                </header>
                <main className="flex m-3 gap-8 flex-wrapper">
                    <section className="flex flex-column align-items-center">
                        <h4>Extrema Pobreza</h4>
                        <Chip
                            className="bg-primary"
                            label={`${maxFaixaRenda.extrema_pobreza.Nome_Bairro}: 
                                            ${maxFaixaRenda.extrema_pobreza.Extrema_Pobreza}`}
                        />
                    </section>
                    <section className="flex flex-column align-items-center">
                        <h4>Pobreza</h4>
                        <Chip
                            className="bg-primary"
                            label={`${maxFaixaRenda.pobreza.Nome_Bairro}: ${maxFaixaRenda.pobreza.Pobreza}`}
                        />
                    </section>
                    <section className="flex flex-column align-items-center">
                        <h4>Baixa Renda</h4>
                        <Chip
                            className="bg-primary"
                            label={`${maxFaixaRenda.baixa_renda.Nome_Bairro}: 
                                            ${maxFaixaRenda.baixa_renda.Baixa_Renda}`}
                        />
                    </section>
                    <section className="flex flex-column align-items-center">
                        <h4>Acima 1/2 S.M</h4>
                        <Chip
                            className="bg-primary"
                            label={`${maxFaixaRenda.acima_meio_sm.Nome_Bairro}: 
                                        ${maxFaixaRenda.acima_meio_sm.Acima_Meio_SM}`}
                        />
                    </section>
                </main>
            </div>
            <Divider />
            <Chart
                type="bar"
                data={chartFaixaRendaAP}
                options={newChartOptions(
                    'Quantidade de famílias em cada faixa de renda por área de planejamento'
                )}
            />
        </>
    );

    const tabAtivEco = (
        <>
            <div className="flex flex-column align-items-center">
                <header>
                    <h2 className="primary">
                        Top 3 Bairros com maior número de empregados
                    </h2>
                </header>
                <main className="flex m-3 gap-8 flex-wrapper">
                    {bairrosMaisAtivEco.map((bairro) => {
                        return (
                            <section
                                key={bairro.Nome_Bairro}
                                className="flex flex-column align-items-center"
                            >
                                <Chip
                                    className="bg-primary"
                                    label={`${bairro.Nome_Bairro}: 
                                            ${bairro.Qtd_Empregos}`}
                                />
                            </section>
                        );
                    })}
                </main>
            </div>
            <Divider />
            <TreeTable
                value={nodesAtivEco}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 20]}
                removableSort
                stripedRows
                rowClassName={rowClassName}
                header="Bairros e suas respectivas atividades econômicas"
            >
                <Column field="name" header="Nome" expander sortable />
                <Column
                    field="quantity"
                    header="Quantidade de empregos"
                    sortable
                />
            </TreeTable>
        </>
    );

    const tabFavela = (
        <>
            <div className="flex flex-column align-items-center">
                <header>
                    <h2 className="primary">
                        Top 3 Bairros com maior número de favelas
                    </h2>
                </header>
                <main className="flex m-3 gap-8 flex-wrapper">
                    {bairrosMaisFavelas.map((bairro) => {
                        return (
                            <section
                                key={bairro.Nome_Bairro}
                                className="flex flex-column align-items-center"
                            >
                                <Chip
                                    className="bg-primary"
                                    label={`${bairro.Nome_Bairro}: 
                                            ${bairro.Quant_Favelas}`}
                                />
                            </section>
                        );
                    })}
                </main>
            </div>
            <Divider />
            <h2 className="text-center">Bairros e suas respectivas favelas</h2>
            <Tree value={nodes} filter filterMode="lenient" />
        </>
    );

    return (
        <>
            <div className="flex flex-column gap-4 p-3">
                <Panel
                    headerTemplate={(opt) =>
                        template(opt, 'Selecione um bairro')
                    }
                    toggleable
                >
                    <form className="flex fluid" onSubmit={handleSearch}>
                        <div className="field p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-search" />
                            </span>
                            <Dropdown
                                value={selectedBairro}
                                options={bairros}
                                filter
                                required
                                filterBy="Nome_Bairro"
                                optionLabel="Nome_Bairro"
                                placeholder="Selecione um bairro"
                                style={{ borderRadius: '0px' }}
                                onChange={(e) =>
                                    setSelectedBairro(e.target.value)
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
                        <TabPanel header="Faixa de Renda">
                            {tabFaixaRenda}
                        </TabPanel>
                        <TabPanel header="Atividades Econômicas">
                            {tabAtivEco}
                        </TabPanel>
                        <TabPanel header="Favelas">{tabFavela}</TabPanel>
                    </TabView>
                )}
            </div>
        </>
    );
}
export async function getServerSideProps(context) {
    try {
        // Fetch data from external API
        const bairroService = new BairroService();
        const bairros = await bairroService.getBairros();
        return { props: { bairros } };
        // Pass data to the page via props
    } catch (error) {
        return { props: {} };
    }
}
