import { useSearchParams } from "react-router";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "./ui/pagination"

type ProductPaginationProps = {
  totalPages: number;
};

export default function ProductPagination({
  totalPages,
}: ProductPaginationProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page") ?? "1");
    const onClick = (page: number) => {
        searchParams.set("page", page.toString());
        setSearchParams(searchParams, { preventScrollReset: true });
    }

    const getPageUrl = (pageNum: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", pageNum.toString());
        return `?${newParams.toString()}`;
    }

    if (isNaN(page) || page < 1 || page > totalPages) {
        return null;
    }
    return (
        <Pagination>
            <PaginationContent>
                {page === 1 ? null : 
                <>
                    <PaginationItem>
                        <PaginationPrevious
                            to={getPageUrl(page - 1)}
                            onClick={(event) => {
                                event.preventDefault(); // 기본 동작 방지
                                onClick(page - 1);
                            }}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink to={getPageUrl(page - 1)}>{page - 1}</PaginationLink>
                    </PaginationItem>
                </>
                }
                <PaginationItem>
                    <PaginationLink to={getPageUrl(page)} isActive>
                    {page}
                    </PaginationLink>
                </PaginationItem>
                {page === totalPages ? null :
                <>
                    <PaginationItem>
                        <PaginationLink to={getPageUrl(page + 1)}>{page + 1}</PaginationLink>
                    </PaginationItem>
                    {page + 1 === totalPages ? null :
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    </>
                    }
                    <PaginationItem>
                        <PaginationNext to={getPageUrl(page + 1)} />
                    </PaginationItem>
                </>
                }
            </PaginationContent>
        </Pagination>
    )
}
