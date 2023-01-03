import { FavelaService } from '../../services/favela-service';
import { useEffect } from 'react';
export default function Favela({ loading, query }) {
    const service = new FavelaService();
    const getFavela = async () => await service.getFavela(query.fid);

    useEffect(() => {
        const initScreen = async () => {
            try {
                const getFavelaInfo = await getFavela();
                console.log(getFavelaInfo);
            } catch (error) {}
        };
        initScreen();
    }, []);
    return <>
        <div>
            
        </div>
    </>;
}
export async function getServerSideProps({ query }) {
    return { props: { query } };
}
