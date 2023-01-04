import Head from 'next/head';
import { useRouter } from 'next/router';
import { Rubik } from '@next/font/google';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { SearchSkeleton } from './skeletons/search_skeleton';

const rubik = Rubik({ subsets: ['normal'] });

export default function Layout({ children }) {
    const [loadingSkeleton, setLoadingSkeleton] = useState(false);
    const router = useRouter();
    const items = [
        {
            label: 'Início',
            icon: 'pi pi-home',
            command: () => router.push('/'),
        },
        {
            label: 'Bairro',
            icon: 'pi pi-map',
            command: () => startSkeleton('/bairro'),
        },
        {
            label: 'Favela',
            icon: 'pi pi-map-marker',
            command: () => startSkeleton('/favela'),
        },
    ];

    const end = (
        <Button
            icon="pi pi-users"
            label="Envolvidos"
            className="p-button-outlined p-button-sm"
            onClick={() => router.push(`/envolvidos`)}

        />
    );

    useEffect(() => {
        setLoadingSkeleton(false);
    }, [router.asPath]);

    const startSkeleton = (url) => {
        if (router.asPath != url) setLoadingSkeleton(true);
        else setLoadingSkeleton(false);

        router.push(url);
    };
    return (
        <div className={rubik.className}>
            <Head>
                <title>Favelas RJ</title>
                <link rel="icon" href="/database.png" />
            </Head>
            <Menubar model={items} end={end} />
            {loadingSkeleton ? (
                <>
                    <SearchSkeleton />
                </>
            ) : (
                <main>{children}</main>
            )}
        </div>
    );
}
