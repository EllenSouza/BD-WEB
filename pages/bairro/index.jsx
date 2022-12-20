import { useState } from 'react';

import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

import { BairroService } from '../../services/bairro-service';

export default function Bairro({ bairros }) {
    const service = new BairroService();
    const [selectedBairro, setSelectedBairro] = useState('');
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const bairro = await service.getBairro(selectedBairro.Cod_Bairro);
            console.log(bairro);
        } catch (error) {}
        return;
    };

    return (
        <>
            <Panel className="p-3" header="Selecione um bairro">
                <form className="flex fluid" onSubmit={handleSearch}>
                    <div className="field p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-search" />
                        </span>
                        <Dropdown
                            value={selectedBairro}
                            options={bairros}
                            filter
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
                            label="Bucar"
                            iconPos="right"
                            icon="pi pi-search"
                            type="submit"
                            // loading={isTreeLoading}
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
        console.log(bairros);
        return { props: { bairros } };
        // Pass data to the page via props
    } catch (error) {
        return { props: [] };
    }
}
