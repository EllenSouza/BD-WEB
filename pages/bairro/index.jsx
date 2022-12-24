// React & Next
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// Primreact
import { Chip } from 'primereact/chip';
import { Panel } from 'primereact/panel';
import { Chart } from 'primereact/chart';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
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
    const [selectedBairro, setSelectedBairro] = useState('');

    useEffect(() => {
        const initScreen = async () => {
            try {
                loading(true);
                setLoadingPage(true);
                const [maxFaixaRenda, faixaRendaPorAP] = await Promise.all([
                    getMaxFaixaRenda(),
                    getFaixaRendaPorAP(),
                ]);
                setMaxFaixaRenda(maxFaixaRenda);
                const chartFaixaRendaAP =
                    createChartFaixaRendaAP(faixaRendaPorAP);
                setChartFaixaRendaAP(chartFaixaRendaAP);
            } catch (error) {
            } finally {
                loading(false);
                setLoadingPage(false);
            }
        };
        initScreen();
    }, []);

    const getMaxFaixaRenda = async () => {
        return await service.getMaxFaixaRenda();
    };

    const getFaixaRendaPorAP = async () => {
        return await service.getFaixaRendaPorAP();
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

    const handleSearch = async (e) => {
        e.preventDefault();
        if (selectedBairro == '') return;

        router.push(`/bairro/${selectedBairro.Cod_Bairro}`);
    };

    const template = (options, textTittle) => {
        const toggleIcon = options.collapsed
            ? 'pi pi-chevron-down'
            : 'pi pi-chevron-up';
        const className = `${options.className} justify-content-start`;
        const titleClassName = `${options.titleClassName} pl-1`;

        return (
            <div className={className}>
                <button
                    className={options.togglerClassName}
                    onClick={options.onTogglerClick}
                >
                    <span className={toggleIcon}></span>
                    <Ripple />
                </button>
                <span className={titleClassName}>{textTittle}</span>
            </div>
        );
    };

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
                        activeIndex={activeTab}
                        onTabChange={(e) => setActiveTab(e.index)}
                    >
                        <TabPanel header="Faixa de Renda">
                            <div className="flex flex-column align-items-center">
                                <header>
                                    <h2 className="primary">
                                        Bairros com maiores índices de cada
                                        faixa de renda
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
                        </TabPanel>
                        <TabPanel header="Atividades Econômicas">
                            Content II
                        </TabPanel>
                        <TabPanel header="Favelas">Content III</TabPanel>
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
