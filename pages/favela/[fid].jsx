export default function Favela({ loading, query }) {
    return <h1>olá</h1>;
}
export async function getServerSideProps({ query }) {
    return { props: { query } };
}
