import { Skeleton } from 'primereact/skeleton';

export function BarSkeleton() {
    return (
        <div className="flex flex-column mt-7 gap-4 px-6">
            <div className="flex justify-content-center">
                <Skeleton height="0.7rem" width="16rem" />
            </div>
            <div className="flex gap-2 justify-content-center align-items-end">
                <Skeleton height="4rem" width="3.8rem" />
                <Skeleton height="9rem" width="3.8rem" />
                <Skeleton height="4rem" width="3.8rem" />
                <Skeleton height="3rem" width="3.8rem" />
                <Skeleton height="6rem" width="3.8rem" />
                <Skeleton height="4rem" width="3.8rem" />
                <Skeleton height="10rem" width="3.8rem" />
                <Skeleton height="2rem" width="3.8rem" />
                <Skeleton height="7rem" width="3.8rem" />
                <Skeleton height="9rem" width="3.8rem" />
                <Skeleton height="8rem" width="3.8rem" />
                <Skeleton height="10rem" width="3.8rem" />
                <Skeleton height="15rem" width="3.8rem" />
                <Skeleton height="6rem" width="3.8rem" />
                <Skeleton height="12rem" width="3.8rem" />
                <Skeleton height="8rem" width="3.8rem" />
                <Skeleton height="2rem" width="3.8rem" />
                <Skeleton height="5rem" width="3.8rem" />
            </div>
            <div className="flex gap-2 justify-content-center align-items-center">
                <Skeleton height="0.7rem" width="50%" />
                <Skeleton height="0.7rem" width="50%" />
            </div>
        </div>
    );
}
