'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function SidebarFilters() {
  const [filters, setFilters] = useState({
    availableForInstall: false,
    type: {
      asphalt: false,
      wood: false,
      tile: false,
      metal: false,
      synthetic: false
    },
    features: {
      DesignerStyle: false,
      StormResistance: false,
      QuickInstall: false,
      TopSelling: false,
      ExtendedWarranty: false,
      AlgaeProtection: false,
      EnergyStarCertified: false,
      MostPopular: false
    },
    manufacturer: {
      GAF: false,
      OwensCorning: false,
      Certainteed: false,
      IKO: false,
      Malarkey: false,
      Atlas: false,
      Tamko: false,
      Boral: false,
      Decra: false,
      EDCO: false,
      FWave: false,
      WatkinsSawmillsLtd: false,
      Euroshield: false,
      DaVinciRoofscapes: false,
      Brava: false,
      Tilcor: false
    },
    grade: {
      Architectural: false,
      Designer: false,
      Specialty: false,
      ThreeTab: false
    },
    price: null
  })

  const [openSections, setOpenSections] = useState({
    availability: true,
    type: true,
    features: true,
    manufacturer: true,
    price: true,
    grade: true
  })

  const toggleFilter = (category, key) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category]?.[key]
      }
    }))
  }

  const toggleSection = (section, isOpen) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: isOpen
    }))
  }

  const Type = ['asphalt', 'wood', 'tile', 'metal', 'synthetic']
  const Features = [
    'DesignerStyle',
    'StormResistance',
    'QuickInstall',
    'TopSelling',
    'ExtendedWarranty',
    'AlgaeProtection',
    'EnergyStarCertified',
    'MostPopular'
  ]
  const Manufacturer = [
    'GAF',
    'OwensCorning',
    'Certainteed',
    'IKO',
    'Malarkey',
    'Atlas',
    'Tamko',
    'Boral',
    'Decra',
    'EDCO',
    'FWave',
    'WatkinsSawmillsLtd',
    'Euroshield',
    'DaVinciRoofscapes',
    'Brava',
    'Tilcor'
  ]
  const Grade = ['Architectural', 'Designer', 'Specialty', 'ThreeTab']

  return (
    <div className="w-full space-y-4">
      {/* Availability */}
      <Collapsible className='shadow-lg p-4 rounded-lg border'
        open={openSections.availability}
        onOpenChange={isOpen => toggleSection('availability', isOpen)}
      >
        <CollapsibleTrigger className="flex w-full justify-between font-medium text-xl items-center pt-1">
          Availability{' '}
          {openSections.availability ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className='mt-2 gap-3 flex flex-col'>
          <label className="flex cursor-pointer items-center gap-2">
            <Checkbox
              checked={filters.availableForInstall}
              onCheckedChange={() =>
                setFilters(prev => ({
                  ...prev,
                  availableForInstall: !prev.availableForInstall
                }))
              }
            />
            <span>Available For Install</span>
          </label>
        </CollapsibleContent>
      </Collapsible>

      {/* Type */}
      <Collapsible className='shadow-lg p-4 rounded-lg border '
        open={openSections.type}
        onOpenChange={isOpen => toggleSection('type', isOpen)}
      >
        <CollapsibleTrigger className="flex w-full justify-between font-medium text-xl items-center pt-1">
          Type{' '}
          {openSections.type ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className='mt-2 gap-3 flex flex-col'>
          {Type.map(key => (
            <label key={key} className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={filters.type[key]}
                onCheckedChange={() => toggleFilter('type', key)}
              />
              <span>{key}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Features */}
      <Collapsible className='shadow-lg p-4 rounded-lg border'
        open={openSections.features}
        onOpenChange={isOpen => toggleSection('features', isOpen)}
      >
        <CollapsibleTrigger className="flex w-full justify-between font-medium text-xl items-center pt-1">
          Features{' '}
          {openSections.features ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className='mt-2 gap-3 flex flex-col'>
          {Features.map(key => (
            <label key={key} className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={filters.features[key]}
                onCheckedChange={() => toggleFilter('features', key)}
              />
              <span>{key}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Manufacturer */}
      <Collapsible className='shadow-lg p-4 rounded-lg border'
        open={openSections.manufacturer}
        onOpenChange={isOpen => toggleSection('manufacturer', isOpen)}
      >
        <CollapsibleTrigger className="flex w-full justify-between font-medium text-xl items-center pt-1">
          Manufacturer{' '}
          {openSections.manufacturer ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className='mt-2 gap-3 flex flex-col'>
          {Manufacturer.map(key => (
            <label key={key} className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={filters.manufacturer[key]}
                onCheckedChange={() => toggleFilter('manufacturer', key)}
              />
              <span>{key}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Grade */}
      <Collapsible className='shadow-lg p-4 rounded-lg border'
        open={openSections.grade}
        onOpenChange={isOpen => toggleSection('grade', isOpen)}
      >
        <CollapsibleTrigger className="flex w-full justify-between font-medium text-xl items-center pt-1">
          Grade{' '}
          {openSections.grade ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className='mt-2 gap-3 flex flex-col'>
          {Grade.map(key => (
            <label key={key} className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={filters.grade[key]}
                onCheckedChange={() => toggleFilter('grade', key)}
              />
              <span>{key}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}