import { Skeleton } from 'primereact/skeleton';

export function SearchSkeleton() {
    return (
        <div className="p-3">
            <Skeleton width="100%" height="10rem" />
        </div>
    );
}
