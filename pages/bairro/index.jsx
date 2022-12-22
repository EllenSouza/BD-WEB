import { useState } from 'react';
import { useRouter } from 'next/router';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { Dropdown } from 'primereact/dropdown';
import { BairroService } from '../../services/bairro-service';

export default function PesquisaBairro({ bairros }) {
    const router = useRouter();
    const [selectedBairro, setSelectedBairro] = useState('');
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
            <Panel
                headerTemplate={(opt) => template(opt, 'Selecione um bairro')}
                toggleable
                className="p-3"
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
                            onChange={(e) => setSelectedBairro(e.target.value)}
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
