import { Card } from 'primereact/card';
import Image from 'next/image';
import Link from 'next/link';
export default function envolvidos() {
    return (
        <>
            <Card
                title="Desenvolvedores da Aplicação WEB"
                className="flex justify-content-center"
            >
                <div className="flex justify-content-around">
                    <Link href="https://github.com/EllenSouza" legacyBehavior>
                        <a
                            target="_blank"
                            className="flex flex-column align-items-center"
                        >
                            <Image
                                src="/ellen.jpg"
                                height={110}
                                width={110}
                                quality={100}
                                priority
                                alt="ellen-avatar"
                            />
                            <p>Ellen Almeida</p>
                        </a>
                    </Link>
                    <Link href="https://github.com/keviinsna" legacyBehavior>
                        <a target="_blank">
                            <Image
                                src="/kevin.jpg"
                                height={110}
                                width={110}
                                quality={100}
                                priority
                                alt="kevin-avatar"
                            />
                            <p>Kevin Sena</p>
                        </a>
                    </Link>
                </div>
            </Card>

            <Card>
                <h2 className="text-center mb-6">
                    Equipe de Banco de Dados e Documentação
                </h2>
                <div className="flex justify-content-around gap-4">
                    <Link href="https://github.com/EllenSouza" legacyBehavior>
                        <a
                            target="_blank"
                            className="flex flex-column align-items-center"
                        >
                            <Image
                                src="/ellen.jpg"
                                height={110}
                                width={110}
                                quality={100}
                                priority
                                alt="ellen-avatar"
                            />
                            <p>Ellen Almeida</p>
                        </a>
                    </Link>
                    <Link href="https://github.com/GabrielTC9" legacyBehavior>
                        <a
                            target="_blank"
                            className="flex flex-column align-items-center"
                        >
                            <Image
                                src="/gabriel.jpg"
                                height={110}
                                width={110}
                                quality={100}
                                priority
                                alt="gabriel-avatar"
                            />
                            <p>Gabriel Trindade</p>
                        </a>
                    </Link>
                    <Link href="https://github.com/Jeffiemax" legacyBehavior>
                        <a
                            target="_blank"
                            className="flex flex-column align-items-center"
                        >
                            <Image
                                src="/jefferson.png"
                                height={110}
                                width={110}
                                quality={100}
                                priority
                                alt="jefferson-avatar"
                            />
                            <p>Jefferson Maxwell</p>
                        </a>
                    </Link>
                    <Link href="https://github.com/keviinsna" legacyBehavior>
                        <a
                            target="_blank"
                            className="flex flex-column align-items-center"
                        >
                            <Image
                                src="/kevin.jpg"
                                height={110}
                                width={110}
                                quality={100}
                                priority
                                alt="kevin-avatar"
                            />
                            <p>Kevin Sena</p>
                        </a>
                    </Link>
                    <Link
                        href="https://github.com/riquelmegomes"
                        legacyBehavior
                    >
                        <a
                            target="_blank"
                            className="flex flex-column align-items-center"
                        >
                            <Image
                                src="/riquelme.jpg"
                                height={110}
                                width={110}
                                quality={100}
                                priority
                                alt="riquelme-avatar"
                            />
                            <p>Riquelme Gomes</p>
                        </a>
                    </Link>
                </div>
            </Card>
        </>
    );
}
