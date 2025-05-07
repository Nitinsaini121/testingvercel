'use client'
import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React, { useEffect, useState } from 'react'
function DroppableSectionHeader({ type }) {
  const { setNodeRef } = useDroppable({ id: type })

  return (
    <TableRow>
      <TableCell
        colSpan={10}
        ref={setNodeRef}
        id={type}
        className='status-collunm px-0 pb-0 pt-5 text-base font-semibold'
      >
        <span>{type}</span>
      </TableCell>
    </TableRow>
  )
}

function DraggableTableRow({ opp }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({
      id: String(opp.id),
      data: opp // Pass the entire opportunity object
    })

  const style = { transform: CSS.Transform.toString(transform), transition }
  const getStatusColor = type => {
    switch (type) {
      case 'Proposal':
        return '#24a01f'
      case 'Qualification':
        return '#CA8A04'
      case 'Closed':
        return '#f02828'
      default:
        return '#458fee'
    }
  }
  const getStatusBgColor = type => {
    switch (type) {
      case 'Proposal':
        return '#c5ffc3'
      case 'Qualification':
        return '#efdebb'
      case 'Closed':
        return '#ffb8b8'
      default:
        return '#dbe7f7'
    }
  }

  const getNextStepColor = type => {
    switch (type) {
      case 'Follow up call':
        return '#24a01f'
      case 'Finalize Proposal':
        return '#CA8A04'
      default:
        return '#f02828'
    }
  }

  const getTagsColor = type => {
    switch (type) {
      case 'Assigned':
        return '#24a01f'
      case 'On Hold':
        return '#CA8A04'
      case 'Hot':
        return '#f02828'
      default:
        return '#458fee'
    }
  }
  const getTagsBgColor = type => {
    switch (type) {
      case 'Assigned':
        return '#c5ffc3'
      case 'On Hold':
        return '#efdebb'
      case 'Hot':
        return '#ffb8b8'
      default:
        return '#dbe7f7'
    }
  }

  return (
    <TableRow
      key={opp.id}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className='staus-row'
      data-row-id={opp.id}
      id={`row-${opp.id}`}
    >
      <TableCell className='border-color-grey border-b px-2 py-3'>
        {opp.id}
      </TableCell>
      <TableCell className='border-color-grey border-b px-2 py-3'>
        {opp.assign}
      </TableCell>
      <TableCell className='border-color-grey border-b px-2 py-3'>
        {opp.projectId}
      </TableCell>
      <TableCell className='border-color-grey border-b px-2 py-3'>
        <span
          className='px-2'
          style={{
            color: getStatusColor(opp.status),
            backgroundColor: getStatusBgColor(opp.status),
            borderRadius: '20px'
          }}
        >
          {opp.status}
        </span>
      </TableCell>
      <TableCell className='border-color-grey border-b px-2 py-3'>
        {opp.estimatedValue}
      </TableCell>
      <TableCell className='border-color-grey border-b px-2 py-3'>
        {opp.company}
      </TableCell>
      <TableCell className='border-color-grey border-b px-2 py-3'>
        {opp.tags?.map(tag => (
          <span
            className='!px-2'
            key={tag}
            style={{
              color: getTagsColor(tag),
              backgroundColor: getTagsBgColor(tag),
              padding: '2px 6px',
              borderRadius: '20px',
              marginRight: '4px',
              display: 'inline-block'
            }}
          >
            {tag}
          </span>
        ))}
      </TableCell>
      <TableCell className='border-color-grey border-b px-2 py-3'>
        {opp.priority}
      </TableCell>
      <TableCell
        style={{
          color: getNextStepColor(opp.nextAction)
        }}
        className='border-color-grey border-b px-2 py-3 font-semibold'
      >
        {opp.nextAction}
      </TableCell>
    </TableRow>
  )
}

export function SalePipelineDataTable({ columns, apiData, loading }) {
  const [data, setApiData] = useState([])

  useEffect(() => {
    setApiData(apiData)
  }, [apiData])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
      <div className='rounded-6 custom-tabels bg-white'>
        <Table>
          <TableHeader className='theme-bg-light-rgba'>
            {table.getHeaderGroups()?.map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers?.map(header => (
                  <TableHead
                    key={header.id}
                    className='border-color-grey text-dark-color theme-bg-light-rgba rounded-s border px-3 py-4 text-sm'
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className='h-16 px-2 py-3 text-center'
                >
                  <Spinner
                    size='lg'
                    className='m-auto bg-black dark:bg-white'
                  />
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className='h-24 px-2 py-3 text-center text-gray-500'
                >
                  No result found
                </TableCell>
              </TableRow>
            ) : (
              <SortableContext
                items={data}
                strategy={verticalListSortingStrategy}
              >
                {data?.map(section => (
                  <React.Fragment key={section.type}>
                    <DroppableSectionHeader
                      droppableId={section.type}
                      type={section.type}
                    />

                    {section.opportunities?.map(opp => (
                      <DraggableTableRow
                        id={opp.id}
                        type={section.type}
                        key={opp.id}
                        opp={opp}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </SortableContext>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
