import { Skeleton } from 'primereact/skeleton';
import { Divider } from 'primereact/divider';

export function TabViewSkeleton() {
    return (
        <div className="p-3">
            <div className="flex gap-1">
                <Skeleton width="6rem" height="3rem" />
                <Skeleton width="6rem" height="3rem" />
                <Skeleton width="6rem" height="3rem" />
                <Skeleton width="6rem" height="3rem" />
                <Skeleton width="6rem" height="3rem" />
                <Skeleton width="6rem" height="3rem" />
                <Skeleton width="6rem" height="3rem" />
                <Skeleton width="6rem" height="3rem" />
                <Skeleton width="6rem" height="3rem" />
                <Skeleton width="6rem" height="3rem" />
                <Skeleton width="6rem" height="3rem" />
                <Skeleton width="6rem" height="3rem" />
                <Skeleton width="6rem" height="3rem" />
            </div>
            <Divider />
            <Skeleton width="100%" height="15rem" />
        </div>
    );
}
