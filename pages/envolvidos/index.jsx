import { Card } from 'primereact/card';

export default function envolvidos() {
    return (
        <>
            <Card
                title="Desenvolvedores da Aplicação WEB"
                className="flex justify-content-center"
            >
                <div className="flex justify-content-around">
                    <a
                        target="_blank"
                        href="https://github.com/EllenSouza"
                        className="flex flex-column align-items-center"
                    >
                        <img
                            src="https://github.com/EllenSouza.png"
                            height="80px"
                            width="80px"
                            alt="ellen-avatar"
                        />
                        <p>Ellen Almeida</p>
                    </a>
                    <a target="_blank" href="https://github.com/keviinsna">
                        <img
                            src="https://github.com/keviinsna.png"
                            height="80px"
                            width="80px"
                            alt="kevin-avatar"
                        />
                        <p>Kevin Sena</p>
                    </a>
                </div>
            </Card>

            <Card>
                <h2 className="text-center mb-6">
                    Equipe de Banco de Dados e Documentação
                </h2>
                <div className="flex justify-content-around gap-4">
                    <a
                        target="_blank"
                        href="https://github.com/EllenSouza"
                        className="flex flex-column align-items-center"
                    >
                        <img
                            src="https://github.com/EllenSouza.png"
                            height="80px"
                            width="80px"
                            alt="ellen-avatar"
                        />
                        <p>Ellen Almeida</p>
                    </a>
                    <a
                        target="_blank"
                        href="https://github.com/GabrielTC9"
                        className="flex flex-column align-items-center"
                    >
                        <img
                            src="https://github.com/GabrielTC9.png"
                            height="80px"
                            width="80px"
                            alt="gabriel-avatar"
                        />
                        <p>Gabriel Trindade</p>
                    </a>
                    <a
                        target="_blank"
                        href="https://github.com/Jeffiemax"
                        className="flex flex-column align-items-center"
                    >
                        <img
                            src="https://github.com/Jeffiemax.png"
                            height="80px"
                            width="80px"
                            alt="jefferson-avatar"
                        />
                        <p>Jefferson Maxwell</p>
                    </a>
                    <a
                        target="_blank"
                        href="https://github.com/keviinsna"
                        className="flex flex-column align-items-center"
                    >
                        <img
                            src="https://github.com/keviinsna.png"
                            height="80px"
                            width="80px"
                            alt="kevin-avatar"
                        />
                        <p>Kevin Sena</p>
                    </a>
                    <a
                        target="_blank"
                        href="https://github.com/riquelmegomes"
                        className="flex flex-column align-items-center"
                    >
                        <img
                            src="https://github.com/riquelmegomes.png"
                            height="80px"
                            width="80px"
                            alt="riquelme-avatar"
                        />
                        <p>Riquelme Gomes</p>
                    </a>
                </div>
            </Card>
        </>
    );
}
