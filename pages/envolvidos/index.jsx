import { Card } from 'primereact/card';

export default function envolvidos() {
    return (
        <>
            <Card
                title="Desenvolvedores da Aplicação WEB"
                className="flex justify-content-center"
            >
                <div className="flex justify-content-around">
                    <a target="_blank" href="https://github.com/EllenSouza">
                        <img
                            src="https://github.com/EllenSouza.png"
                            height="80px"
                            width="80px"
                            alt="ellen-avatar"
                        />
                        <br />
                        Ellen Almeida
                    </a>

                    <a target="_blank" href="https://github.com/keviinsna">
                        <img
                            src="https://github.com/keviinsna.png"
                            height="80px"
                            width="80px"
                            alt="kevin-avatar"
                        />
                        <br />
                        Kevin Sena
                    </a>
                </div>
            </Card>

            <Card
                title="Equipe de Banco de Dados e Documentação"
                className="flex justify-content-center"
            >
                <div className='flex justify-content-around '>

                
                <div >
                    <img
                        src="https://github.com/GabrielTC9.png"
                        height="80px"
                        width="80px"
                        alt="gabriel-avatar"
                    />
                    <p>Gabriel Trindade</p>
                </div>
                <div>
                    <img
                        src="https://github.com/GabrielTC9.png"
                        height="80px"
                        width="80px"
                        alt="jefferson-avatar"
                    />
                    <p>Jefferson Maxwell</p>
                </div>
                <div>
                    <img
                        src="https://github.com/riquelmegomes.png"
                        height="80px"
                        width="80px"
                        alt="riquelme-avatar"
                    />
                    <p>Riquelme Gomes</p>
                </div>
                </div>
            </Card>
        </>
    );
}
