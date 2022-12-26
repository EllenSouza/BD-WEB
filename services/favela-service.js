import { BASE_URL } from '../utils/config';
export class FavelaService {
    async getFavelas() {
        const res = await (await fetch(BASE_URL + '/favela')).json();
        return res.data;
    }

    async getQtdFavelasPorBairro() {
        const res = await (await fetch(BASE_URL + '/favela/bairro')).json();
        return res.data;
    }

    async getQtdFavelasPorAP() {
        const res = await (
            await fetch(BASE_URL + '/favela/area_planejamento')
        ).json();
        return res.data;
    }

    async getQtdFavelaPorUrbanizacao() {
        const res = await (
            await fetch(BASE_URL + '/favela/urbanizacao')
        ).json();
        return res.data;
    }
}
