import { BASE_URL } from '../utils/config';
export class FavelaService {
    /**
     * Busca todas as favelas da base
     * @returns {Array<Object>} Array com todas as favelas
     */
    async getFavelas() {
        const res = await (await fetch(BASE_URL + '/favela')).json();
        return res.data;
    }

    /**
     * Busca um favela
     * @returns {Object} Dados da favela
     */
    async getFavela(codFavela) {
        const res = await (
            await fetch(BASE_URL + `/favela/${codFavela}`)
        ).json();
        return res.data;
    }

    /**
     * Busca top 30 quantidade de favelas em cada bairro
     * @returns {Array<Object>} Array com os bairros e a quantidade de favelas
     */
    async getQtdFavelasPorBairro() {
        const res = await (await fetch(BASE_URL + '/favela/bairro')).json();
        return res.data;
    }

    /**
     * Busca a quantidade de favelas por área de planejamento
     * @returns {Array<Object>} Array com as AP e a quantidade de favelas
     */
    async getQtdFavelasPorAP() {
        const res = await (
            await fetch(BASE_URL + '/favela/area_planejamento')
        ).json();
        return res.data;
    }

    /**
     * Busca a quantidade de favelas por índice de urbanização
     * @returns {Array<Object>} Array com os índices de urbanização e a quantidade de favelas
     */
    async getQtdFavelaPorUrbanizacao() {
        const res = await (
            await fetch(BASE_URL + '/favela/urbanizacao')
        ).json();
        return res.data;
    }
    /**
     * Busca a quantidade de favelas por faixa de população
     * @returns {Array<Object>} Array com as faixas de população e a quantidade de favelas
     */
    async getQtdFavelasPorPopulacao() {
        const res = await (await fetch(BASE_URL + '/favela/populacao')).json();
        return res.data;
    }

    /**
     * Busca as favelas e os complexos ao qual pertence
     * @returns {Array<Object>} Array com as favelas e os complexos
     */
    async getFavComplexo() {
        const res = await (await fetch(BASE_URL + '/favela/complexo')).json();
        return res.data;
    }
}
