import { BASE_URL } from '../utils/config';

export class BairroService {
    /**
     * Busca todos os bairros da base
     * @returns {Array<Object>} Array com todos os bairros
     */
    async getBairros() {
        const res = await (await fetch(`${BASE_URL}/bairro`)).json();
        return res.data;
    }

    /**
     * Busca os bairros com maiores índices por faixa de renda
     * @returns {Array<Object>} Array com os bairros e sua respectiva faixa de renda
     */
    async getMaxFaixaRenda() {
        const res = await (
            await fetch(`${BASE_URL}/bairro/faixa_renda/max`)
        ).json();
        return res.data;
    }

    /**
     * Busca a quantidade de famílias em cada faixa de renda por
     * área de planejamento
     * @returns {Array<Object>} Array com o total de famiílias em cada faixa de renda por AP
     */
    async getFaixaRendaPorAP() {
        const res = await (
            await fetch(`${BASE_URL}/bairro/faixa_renda/area_planejamento`)
        ).json();
        return res.data;
    }

    /**
     * Busca top 3 bairros com maiores números de favelas
     * @returns {Array<Object>} Array com os bairros e o total de favelas
     */
    async getBairrosMaisFavelas() {
        const res = await (await fetch(`${BASE_URL}/bairro/favela/max`)).json();
        return res.data;
    }

    /**
     * Busca todos os bairros e suas respectivas favelas,
     * até mesmo os bairros que não possuem favelas.
     * @returns {Array<Object>} Array com os bairros e suas favelas
     */
    async getBairrosFavelas() {
        const res = await (await fetch(`${BASE_URL}/bairro/favela`)).json();
        return res.data;
    }

    /**
     * Busca todos os bairros, suas respectivas atividades econômicas e a
     * quantidade de empregos, até mesmo os bairros que não possuem atividades
     * econômicas (daquelas cadastradas na base)
     * @returns {Array<Object>} Array com os bairros e suas atividades econômicas
     */
    async getBairrosAtivEco() {
        const res = await (await fetch(`${BASE_URL}/bairro/ativ_eco`)).json();
        return res.data;
    }

    /**
     * Busca top 3 bairros com maior número de empregos
     * @returns {Array<Object>} Array com os bairros e o total de empregos
     */
    async getBairrosMaisAtivEco() {
        const res = await (
            await fetch(`${BASE_URL}/bairro/ativ_eco/max`)
        ).json();
        return res.data;
    }

    /**
     * Busca as informações de um bairro específico
     * @param {int} cod_bairro
     * @returns {Object} Dados de um bairro
     */
    async getBairro(cod_bairro) {
        const res = await (
            await fetch(`${BASE_URL}/bairro/${cod_bairro}`)
        ).json();
        return res.data;
    }

    /**
     * Busca as atividades econômicas e seus respectivas quantidades
     * dentro de um bairro dado.
     * @param {int} cod_bairro
     * @returns {Array<Object>} Array com as atividades econômicas em um bairro.
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
     * @returns {Object} Quantidade de famílias em cada faixas de renda do bairro
     */
    async getFaixaRendaBairro(cod_bairro) {
        const res = await (
            await fetch(`${BASE_URL}/bairro/faixa_renda/${cod_bairro}`)
        ).json();
        return res.data;
    }
}
