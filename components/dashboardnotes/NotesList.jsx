'use client'

import React from 'react'
import { CardContent, CardDescription } from '../ui/card'
import { Button } from '../ui/button'
import { formatDistanceToNow } from 'date-fns'

const NotesList = ({notesData}) => {
    console.log("notesData",notesData)
  return (
   <>
   
       {notesData?.map(notes => {
              console.log("notesnotesnotes",notes?.created_at)
                  return (
                    <CardContent className='pb-3 pl-0 pr-2' key={notes?.id}>
                      <div className='theme-bg-light-rgba relative flex items-center gap-3 rounded p-4'>
                        <div className='h-9 min-h-9 w-9 min-w-9 overflow-hidden rounded-full'>
                          <img
                            src='/images/user-avatar-male-5.png'
                            alt='User Avatar'
                          />
                        </div>
                        <div>
                          <h6 className='text-sm font-semibold'>
                         {notes?.user?.name}
                          </h6>
                          <CardDescription className='w-fit break-all rounded-l-md rounded-t-md text-sm text-muted-foreground'>
                            {notes.notes}
                          </CardDescription>
                          <span className='absolute right-2 top-2 text-xs font-medium text-gray-400'>
                            {formatDistanceToNow(new Date(notes?.created_at), {
                              addSuffix: true
                            })}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  )
                })}
   
   
   </>
  )
}

export default NotesList
