import { BASE_URL } from '../utils/config';

export class BairroService {
    async getBairros() {
        const res = await (await fetch(BASE_URL + '/bairro')).json();
        return res.data;
    }

    async getBairro(cod_bairro) {
        const res = await (
            await fetch(BASE_URL + `/bairro/${cod_bairro}`)
        ).json();
        return res.data;
    }

    // Métodos para os gráficos
    async getDadosBairro(cod_bairro) {
        const res = await (
            await fetch(BASE_URL + `/bairro/${cod_bairro}`)
        ).json();
        return res.data;
    }
}
