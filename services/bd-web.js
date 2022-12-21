import { BASE_URL } from '../utils/config';

export class BDWebService {
    async getComplexo() {
        const res = await (await fetch(BASE_URL + '/complexo')).json();
        return res.data;
    }
    async getQtdFavelasPorBairro() {
        const res = await (await fetch(BASE_URL + '/fav-bairro')).json();
        return res.Quantidade_de_favelas_por_bairro;
    }
    async getQtdFavelasPorAP(){
        const res = await (await fetch(BASE_URL + '/fav-bairro')).json();
        return res.Quantidade_de_favelas_por_área_de_planejamento;
    }
}
