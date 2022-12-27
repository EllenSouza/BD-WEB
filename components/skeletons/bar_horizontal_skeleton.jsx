import { Skeleton } from 'primereact/skeleton';

export function BarHorizontalSkeleton() {
    return (
        <div className="flex flex-column mt-7 gap-4 px-2">
            <div className="flex justify-content-center gap-1">
                <Skeleton height="29.5rem" width="12rem" />
                <div className="flex flex-column gap-2 justify-content-center align-items-start">
                    <Skeleton width="35rem" height="2.5rem" />
                    <Skeleton width="20rem" height="2.5rem" />
                    <Skeleton width="40rem" height="2.5rem" />
                    <Skeleton width="55rem" height="2.5rem" />
                    <Skeleton width="65rem" height="2.5rem" />
                    <Skeleton width="25rem" height="2.5rem" />
                    <Skeleton width="70rem" height="2.5rem" />
                    <Skeleton width="50rem" height="2.5rem" />
                    <Skeleton width="20rem" height="2.5rem" />
                    <Skeleton width="65rem" height="2.5rem" />
                </div>
            </div>
            <div className="flex gap-2 justify-content-center align-items-center">
                <Skeleton height="0.7rem" width="50%" />
                <Skeleton height="0.7rem" width="50%" />
            </div>
        </div>
    );
}
