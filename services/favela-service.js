import {BASE_URL} from '../utils/config'
export class FavelaService {
    async getQtdFavelasPorBairro() {
        console.log( process.env.BASE_URL+ '/favela');
        const res = await (await fetch(BASE_URL + '/favela')).json();
        return res.Quantidade_de_favelas_por_bairro;
    }
    async getQtdFavelasPorAP() {
        const res = await (await fetch(BASE_URL + '/favela')).json();
        return res.Quantidade_de_favelas_por_área_de_planejamento;
    }
    async getBairrosMaiorExtremaPobreza(){
        const res = await (await fetch(BASE_URL + '/favela')).json();
        return res.Bairros_com_mais_extrema_pobreza;
    }
}
