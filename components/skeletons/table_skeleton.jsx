import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
export function TableSkeleton() {
    const bodyTemplate = <Skeleton />;
    const products = Array.from({ length: 5 });
    return (
        <DataTable value={products} className="p-datatable-striped">
            <Column style={{ width: '25%' }} body={bodyTemplate} />
            <Column style={{ width: '25%' }} body={bodyTemplate} />
            <Column style={{ width: '25%' }} body={bodyTemplate} />
            <Column style={{ width: '25%' }} body={bodyTemplate} />
        </DataTable>
    );
}
