import 'primereact/resources/themes/lara-light-teal/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; //flex

import '../styles/globals.css';
import Layout from '../components/layout';

import { useState } from 'react';
import { BlockUI } from 'primereact/blockui';

export default function App({ Component, pageProps }) {
    const [loading, setLoading] = useState();
    return (
        <BlockUI
            blocked={loading}
            template={
                <i
                    className="pi pi-spin pi-spinner"
                    style={{ fontSize: '3rem' }}
                />
            }
        >
            <Layout>
                <Component {...pageProps} loading={setLoading} />
            </Layout>
        </BlockUI>
    );
}
