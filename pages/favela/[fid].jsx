//service
import { FavelaService } from '../../services/favela-service';

// React & Next
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//primereact
import { Skeleton } from 'primereact/skeleton';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function Favela({ loading, query }) {
    const service = new FavelaService();
    const router = useRouter();

    const getFavela = async () => await service.getFavela(query.fid);
    const [loadingPage, setLoadingPage] = useState(false);
    const [favelaInfo, setFavelaInfo] = useState({
        Nome_Fav: '',
        Nome_UPP: '',
        Qtd_de_familias: -1,
        Grau_de_urbanizacao: '',
        Nome_Bairro: '',
        Nome_Comp: '',
    });

    useEffect(() => {
        const initScreen = async () => {
            try {
                loading(true);
                setLoadingPage(true);
                const getFavelaInfo = await getFavela();
                console.log(getFavelaInfo);
                setFavelaInfo(getFavelaInfo);
            } catch (error) {
            } finally {
                loading(false);
                setLoadingPage(false);
            }
        };
        initScreen();
        console.log(favelaInfo);
    }, []);
    const template = () => {
        return (
            <>
                <Button
                    className="p-button-rounded p-button-outlined m-2"
                    icon="pi pi-chevron-left"
                    onClick={() => router.push(`/favela`)}
                />
                <Card title={`Favela ${favelaInfo.Nome_Fav}`}>
                    <h3 className="mt-2">
                        Nome da UPP:{' '}
                        {`${favelaInfo.Nome_UPP}` == 'N'
                            ? 'não há'
                            : `${favelaInfo.Nome_UPP}`}
                    </h3>
                    <h3 className="mt-2">
                        Quantidade de domicílios:{' '}
                        {`${favelaInfo.Qtd_de_familias}`}
                    </h3>
                    <h3 className="mt-2">
                        Grau de urbanização:{' '}
                        {`${favelaInfo.Grau_de_urbanizacao}`}
                    </h3>
                    <h3 className="mt-2">
                        Bairro: {`${favelaInfo.Nome_Bairro}`}
                    </h3>
                    <h3 className="mt-2">
                        Complexo:{' '}
                        {`${favelaInfo.Nome_Comp}` == 'null'
                            ? 'Favela Isolada'
                            : `${favelaInfo.Nome_Comp}`}
                    </h3>
                </Card>
            </>
        );
    };

    return (
        <>
            {loadingPage ? (
                <div>
                    <Skeleton
                        className="mb-2"
                        shape="circle"
                        size="3rem"
                    ></Skeleton>
                   
                    <Skeleton
                        width="50rem"
                        height="4rem"
                        className="m-2"
                    ></Skeleton>
                    <Skeleton
                        width="50rem"
                        height="2rem"
                        className="m-2"
                    ></Skeleton>
                    <Skeleton
                        width="50rem"
                        height="2rem"
                        className="m-2"
                    ></Skeleton>
                    <Skeleton
                        width="50rem"
                        height="2rem"
                        className="m-2"
                    ></Skeleton>
                    <Skeleton
                        width="50rem"
                        height="2rem"
                        className="m-2"
                    ></Skeleton>
                </div>
            ) : (
                <div>{template()}</div>
            )}
        </>
    );
}
export async function getServerSideProps({ query }) {
    return { props: { query } };
}
