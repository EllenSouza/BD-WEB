import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Menubar } from 'primereact/menubar';

import { Rubik } from '@next/font/google';

// If loading a variable font, you don't need to specify the font weight
const rubik = Rubik({ subsets: ['italic'] });

export default function Layout({ children }) {
    const router = useRouter();
    const items = [
        {
            label: 'Início',
            command: () => router.push('/'),
        },
        {
            label: 'Bairro',
            command: () => router.push('/bairro'),
        },
        {
            label: 'Favela',
            command: () => router.push('/favela'),
        },
    ];

    const start = (
        <Link href="/">
            <i
                className="pi pi-database"
                style={{ fontSize: '2em', color: `var(--surface-900)` }}
            />
        </Link>
    );

    return (
        <div className={rubik.className}>
            <Head>
                <title>Favelas RJ</title>
                <link rel="icon" href="/database.png"/>
            </Head>
            <Menubar model={items} start={start} />
            <main>{children}</main>
            {/* <footer className="flex">
                
                <section className="text-xl col-6 px-6 py-3 flex flex-column align-items-center">
                    <h4 className="">Integrantes</h4>
                    <ul>
                        <li>Ellen Almeida</li>
                        <li>Gabriel Trindade</li>
                        <li>Jefferson Maxwell</li>
                        <li>Kevin Sena</li>
                        <li>Riquelme Gomes</li>
                    </ul>
                </section>
            </footer> */}
        </div>
    );
}
