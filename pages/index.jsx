import { useRouter } from 'next/router';
import { Button } from 'primereact/button';

export default function Home() {
    const router = useRouter();
    return (
        <div className="p-5">
            <header>
                <h1 className="text-center">
                    CECAD/DATARIO - FAVELAS E ATIVIDADES ECONÔMICAS
                </h1>
            </header>
            <main>
                <p className="text-2xl mt-3 text-center line-height-3">
                    Esta aplicação tem como objetivo analisar dados sobre
                    favelas e atividades econômicas nos bairros da cidade do Rio
                    de Janeiro.
                </p>
                <div className="flex gap-3 justify-content-center mt-7">
                    <Button
                        icon="pi pi-chevron-right"
                        iconPos="right"
                        label="Consultas Bairro"
                        onClick={() => router.push('/bairro')}
                        />
                    <Button
                        icon="pi pi-chevron-right"
                        iconPos="right"
                        label="Consultas Favelas"
                        onClick={() => router.push('/favela')}
                    />
                </div>
            </main>
        </div>
    );
}
