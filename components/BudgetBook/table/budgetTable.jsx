export const budgetTableHeader = [
  'SILL PLATE',
  'TIEDOWNS',
  'SW MISC',
  'UPLIFT',
  'ROOF',
  'CORRIDORS',
  'DECKS',
  'STAIRWELLS',
  'BEAMS',
  'POSTS',
  'CMU',
  'STL',
  'MISC',
  'RTU',
  'TOTALS',
  'SW TIEDOWNS',
  'UPLIFT',
  'SILL PLATE',
  'MISC HARDWARE',
  'SW TIEDOWNS',
  'UPLIFT',
  'SILL PLATE',
  'MISC HARDWARE',
  'TOTAL'
]

export const budgetTableKeys = [
  'sill_plate',
  'tie_down',
  'sw_misc',
  'up_lift',
  'roof',
  'coridor',
  'deck',
  'stair_wells',
  'beam',
  'posts',
  'smu',
  'stl',
  'misc',
  'rtu',
  'budget_total',
  'sqft_sw_tiedown',
  'sqft_up_lift',
  'sqft_sill_plate',
  'sqft_misc_hardware',
  'cost_sw_tiedown',
  'cost_up_lift',
  'cost_sill_plate',
  'cost_misc_hardware',
  'total'
]
export const sumFields = [
  'sill_plate',
  'tie_down',
  'sw_misc',
  'up_lift',
  'roof',
  'coridor',
  'deck',
  'stair_wells',
  'beam',
  'posts',
  'smu',
  'stl',
  'misc',
  'rtu'
]
export const fixedFields = [
  'cost_sw_tiedown',
  'cost_up_lift',
  'cost_sill_plate',
  'cost_misc_hardware',
  'total'
]

export const mirrorMap = {
  sill_plate: 'sqft_sill_plate',
  tie_down: 'sqft_sw_tiedown',
  up_lift: 'sqft_up_lift'
}

export const bldgDataTable = [
  { label: 'BLDG COUNT', name: 'bldg_count' },
  { label: 'TSQFT', name: 'bldg_gsqft' },
  { label: 'COST/SQFT', name: 'bldg_sqft' },
  { label: 'COST', name: 'bldg_cost' },
  { label: 'PRICE/SQFT', name: 'bldg_price' },
  { label: 'PRICE', name: 'price' }
]

export const pricingDataTable = [
  {
    name: 'sw_tiedown',
    label: 'SW TIEDOWNS'
  },
  {
    name: 'up_lift',
    label: 'UPLIFT RESTRAINT'
  },
  {
    name: 'misc',
    label: 'MISC HARDWARE'
  },
  {
    name: 'anchorage',
    label: 'ANCHORAGE'
  },
  {
    name: 'total',
    label: 'TOTAL'
  }
]
export const addersDesignField = [
  { name: 'design', label: 'DESIGN' },
  { name: 'engineering', label: 'ENGINEERING' },
  { name: 'budget', label: 'BUDGET' },
  { name: 'shipping', label: 'SHIPPING' }
]

export const hrSealfieldData = [
  { name: 'design_hr', label: 'HR' },
  { name: 'engineering_seal', label: 'SEAL' },
  { name: 'budget_hr', label: 'HR' },
  { name: 'shipping_ship', label: 'SHIP' }
]
export const hrsSealsfieldData = [
  { name: 'design_hrs', label: 'HRS' },
  { name: 'engineering_seals', label: 'SEALS' },
  { name: 'budget_hrs', label: 'HRS' },
  { name: 'shipping_shipment', label: 'SHIPMENT' }
]
export const totalFields = [
  { name: 'design_total' },
  { name: 'engineering_total' },
  { name: 'budget_total' },
  { name: 'shipping_total' },
  { name: 'total_calculate' }
]
export const commissionFields = [
  {
    label: 'COMMISSION',
    name: 'commission'
  },
  {
    label: 'COMMISSIONS',
    name: 'commission_rate'
  }
]
export const sumOfDebs = [
  { name: 'sumOfDesign' },
  { name: 'sumOfEngineering' },
  { name: 'sumOfBudget' },
  { name: 'sumOfShipping' },
  { name: 'sumOfShippingNext' },
  { name: 'totalSum' }
]
export const multipliedDebs = [
  { name: 'multipliedDesign' },
  { name: 'multipliedEngineer' },
  { name: 'multipliedBudget' },
  { name: 'multipliedShipping' },
  { name: 'multipliedShippingNext' },
  { name: 'totalMultiplied' }
]
export const limitsArray = [
  { label: 'SHIPMENT LIMIT', name: 'shipment_limit' },
  { label: 'FILL IN LIMIT', name: 'fill_in_limit' },
  { label: 'SEALS LIMIT', name: 'seal_limit' },
  { label: 'LIMIT NOTES', name: 'limit_notes' }
]
