import Link from 'next/link';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { BDWebService } from '../services/bd-web';

export default function Home() {
    const [consulta, setConsulta] = useState('');
    const [data, setData] = useState([]);
    const service = new BDWebService();
    const consultaOptions = [
        { label: 'Quantidade de favelas por Bairro', value: '1' },
        {
            label: 'Quantidade de famílias em extrema pobreza por Bairro',
            value: '2',
        },
    ];
    useEffect(() => {
        const getData = async () => {
            const qtdFavPorBairro = await getQtdFavBairro();
            setData(qtdFavPorBairro);
        };
        if (consulta == 1) {
            getData();
        }
    }, [consulta]);

    const getQtdFavBairro = async () => {
        const resp = await service.getQtdFavelasPorBairro();
        return resp;
    };

    return (
        <>
            <header className="flex flex-column align-items-center">
                <h1 className="text-green-400">
                    CECAD/DATARIO - FAVELAS E ATIVIDADES ECONÔMICAS
                </h1>
            </header>

            <main>
                <p className="text-xl text-justify line-height-3">
                    Esta aplicação tem como objetivo analisar dados sobre
                    favelas e atividades econômicas nos bairros da cidade do Rio
                    de Janeiro.
                </p>
                <Dropdown
                    value={consulta}
                    options={consultaOptions}
                    onChange={(e) => setConsulta(e.value)}
                    placeholder="Selecione uma consulta"
                />
                <DataTable
                    value={data}
                    paginator
                    rows={5}
                    removableSort
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                >
                    <Column field="Nome_Bairro" header="Nome Bairro" sortable />
                    <Column
                        field="Qtd_Favelas"
                        header="Quatidade de favelas"
                        sortable
                    />
                </DataTable>
            </main>
            <footer className=" mt-5 grid line-height-3 bg-green-900 text-white">
                <section className="text-xl col-6 px-6 py-3 flex flex-column align-items-center">
                    <p className="text-justify">
                        As informações são resultados de combinações de dados
                        provenientes das seguintes fontes:
                    </p>
                    <section>
                        <ul>
                            <li>
                                CECAD
                                <ol>
                                    <li>
                                        <Link
                                            href="https://cecad.cidadania.gov.br/cras_local.php?schema=tab_cad_13082022&p_ibge=33&mu_ibge=3304557&p_variavel=nom_localidade_fam&p_variavel_filtro=6#"
                                            legacyBehavior
                                        >
                                            <a
                                                className="text-white"
                                                target="_blank"
                                            >
                                                Faixa de Renda Familiar Per
                                                Capita
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="https://cecad.cidadania.gov.br/cras_local.php?schema=tab_cad_13082022&p_ibge=33&mu_ibge=3304557&p_variavel=nom_localidade_fam&p_variavel_filtro=23#"
                                            legacyBehavior
                                        >
                                            <a
                                                className="text-white"
                                                target="_blank"
                                            >
                                                Famílias em Extrema Pobreza
                                                com/sem PBF
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="https://cecad.cidadania.gov.br/cras_local.php?schema=tab_cad_13082022&p_ibge=33&mu_ibge=3304557&p_variavel=nom_localidade_fam&p_variavel_filtro=28#"
                                            legacyBehavior
                                        >
                                            <a
                                                className="text-white"
                                                target="_blank"
                                            >
                                                Quantidade de Famílias
                                                Beneficiárias do Programa Bolsa
                                                Família
                                            </a>
                                        </Link>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                DATARIO
                                <ol>
                                    <li>
                                        <Link
                                            href="https://www.data.rio/datasets/PCRJ::limites-de-favelas-e-urbaniza%C3%A7%C3%A3o/explore?location=-22.893227%2C-43.418274%2C11.73&showTable=true"
                                            legacyBehavior
                                        >
                                            <a
                                                className="text-white"
                                                target="_blank"
                                            >
                                                Favelas
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="https://www.data.rio/documents/n%C3%BAmero-de-empregados-por-atividade-econ%C3%B4mica-segundo-as-%C3%A1reas-de-planejamento-ap-regi%C3%B5es-administrativas-ra-e-bairros-no-munic%C3%ADpio-do-rio-de-janeiro-em-2005-2020/about"
                                            legacyBehavior
                                        >
                                            <a
                                                className="text-white"
                                                target="_blank"
                                            >
                                                Atividades Econômicas
                                            </a>
                                        </Link>
                                    </li>
                                </ol>
                            </li>
                        </ul>
                    </section>
                </section>
                <section className="text-xl col-6 px-6 py-3 flex flex-column align-items-center">
                    <h4 className="">Integrantes</h4>
                    <ul>
                        <li>Ellen Almeida</li>
                        <li>Gabriel Trindade</li>
                        <li>Jefferson Maxwell</li>
                        <li>Kevin Sena</li>
                        <li>Riquelme Gomes</li>
                    </ul>
                </section>
            </footer>
        </>
    );
}
