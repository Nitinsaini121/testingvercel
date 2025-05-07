import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

interface TablePaginationProps {
  totalRecord: number
  page: number
  setPage: (page: number) => void
  length: number
}

export const TablePagination = ({
  totalRecord,
  page,
  setPage,
  length
}: TablePaginationProps) => {
  const totalPages = Math.ceil(totalRecord / length) || 1

  return (
    <Pagination className='mt-5 main-pagination'>
      <PaginationContent className='gap-2 cursor-pointer'>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={page > 1 ? () => setPage(page - 1) : undefined}
            className={
              page === 1
                ? 'pointer-events-none !rounded border border-gray-300 opacity-50'
                : ''
            }
          />
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
         <PaginationItem key={index}>
         <PaginationLink
           className={`!rounded border border-color-grey shadow-none 
             hover:!text-black hover:bg-gray-200
             ${index + 1 === page ? "bg-primary text-dark-color" : ""}`}
           isActive={index + 1 === page}
           onClick={() => setPage(index + 1)}
         >
           {index + 1}
         </PaginationLink>
       </PaginationItem>
       
        ))}

        {/* Next Button */}
        <PaginationItem  >
          <PaginationNext
            onClick={page < totalPages ? () => setPage(page + 1) : undefined}
            className={
              page === totalPages
                ? 'pointer-events-none cursor-pointer !rounded !border border-gray-300 opacity-50 '
                : '!rounded !border border-gray-300'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
