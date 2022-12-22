import { Skeleton } from 'primereact/skeleton';
export function PieSkeleton() {
    return (
        <div className="flex flex-column gap-2 my-5 align-items-center">
            <Skeleton height="0.7rem" width="16rem" />
            <Skeleton shape="circle" width="25rem" height="25rem" />
            <div className="flex">
                <Skeleton className="mx-1" width="6rem" height="0.7rem" />
                <Skeleton className="mx-1" width="6rem" height="0.7rem" />
                <Skeleton className="mx-1" width="6rem" height="0.7rem" />
            </div>
            <div className="flex">
                <Skeleton className="mx-1" width="6rem" height="0.7rem" />
                <Skeleton className="mx-1" width="6rem" height="0.7rem" />
            </div>
        </div>
    );
}
