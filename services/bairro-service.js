import { BASE_URL } from '../utils/config';

export class BairroService {
    /**
     * Busca todos os bairros da base.
     * @returns Array com todos os bairros
     */
    async getBairros() {
        const res = await (await fetch(`${BASE_URL}/bairro`)).json();
        return res.data;
    }

    /**
     * Busca as informações de um bairro específico
     * @param {int} cod_bairro
     * @returns Dados de um bairro
     */
    async getBairro(cod_bairro) {
        const res = await (
            await fetch(`${BASE_URL}/bairro/${cod_bairro}`)
        ).json();
        return res.data;
    }

    //------------------------->>
    // Métodos para os gráficos
    //------------------------->>

    /**
     * Busca as atividades econômicas e seus respectivas quantidades
     * dentro de um bairro dado.
     * @param {int} cod_bairro
     * @returns Array com as atividades econômicas em um bairro.
     */
    async getAtivEcoBairro(cod_bairro) {
        const res = await (
            await fetch(`${BASE_URL}/bairro/ativ_eco/${cod_bairro}`)
        ).json();
        return res.data;
    }
    /**
     * Busca as quantidades de famílias em cada faixa de renda de um
     * um bairro dado.
     * @param {int} cod_bairro
     * @returns Array com as faixas de renda
     */
    async getFaixaRendaBairro(cod_bairro) {
        const res = await (
            await fetch(`${BASE_URL}/bairro/faixa_renda/${cod_bairro}`)
        ).json();
        return res.data;
    }
}
