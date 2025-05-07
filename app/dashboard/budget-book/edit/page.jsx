'use client'
import FormBugetBook from '@/components/BudgetBook/FormBugetBook'
import BudgetBookService from '@/services/budget-book-api'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import {
  fixedFields,
  mirrorMap,
  sumFields
} from '@/components/BudgetBook/table/budgetTable'
import UpdateDialogBox from '@/components/Update confirmation'
import { formatDateForMySQL } from '@/components/utils/dateFormat'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const EditBudgetBook = () => {
  const searchParams = useSearchParams() // get budget id
  const budgetId = searchParams.get('id')
  const [getBudgetById, setBudgetById] = useState()
  const [openUpdateModal, setUpdateOpenModal] = useState(false)
  const [budgetData, setBudgetData] = useState()

  const defaultValues = {
    engineer_id: '',
    zip_id: '',
    site_plans: '',
    budget_book_id: 6,
    address: '',
    city: '',
    state: '',
    customer_id: 3,
    contact_id: 2,
    tax: '',
    quote_date: new Date(),
    job_no: '',
    is_pricing: false,
    is_budget_only: false,
    up_margin: '',
    sp_margin: '',
    mc_margin: '',
    sw_margin: '',
    plan_date: new Date(),
    plan_status: '',
    plan_info: '',
    plan_note: '',
    terms: '',
    zip: '',
    design: '',
    design_total: '0',
    design_hr: '',
    design_hrs: '0',
    engineering: '',
    engineering_total: '0',
    engineering_seal: '',
    engineering_seals: '0',
    budget: '',
    budget_total: '0',
    budget_hr: '',
    budget_hrs: '0',
    shipping: '',
    shipping_total: '0',
    shipping_ship: '',
    shipping_shipment: '0',
    total_adders: '',
    total_calculate: '',
    per_sqft: '0',
    bldg_count: '0',
    bldg_gsqft: '0',
    bldg_cost: '',
    bldg_sqft: '0',
    bldg_price: '0',
    price: '',
    sw_tiedown: '',
    up_lift: '',
    misc: '',
    anchorage: '',

    total: '0.00',
    commission: '',
    commission_rate: '',
    shipment_limit: '',
    fill_in_limit: '',
    seal_limit: '',
    limit_notes: '',
    projectScopeIncludes: [
      { scope_id: 41 },
      { scope_id: 40 },
      { scope_id: 32 }
    ],
    projectSubmittals: [
      { submittal_id: 1, is_include: 0 },
      { submittal_id: 2, is_include: 0 },
      { submittal_id: 3, is_include: 0 },
      { submittal_id: 4, is_include: 0 },
      { submittal_id: 5, is_include: 0 }
    ],
    projectKeyAreas: [
      { key_area_id: 1, is_include: 0 },
      { key_area_id: 2, is_include: 0 },
      { key_area_id: 3, is_include: 0 },
      { key_area_id: 4, is_include: 0 },
      { key_area_id: 5, is_include: 0 }
    ],
    projectContracts: [
      { contract_component_id: 1, is_include: 0 },
      { contract_component_id: 2, is_include: 0 },
      { contract_component_id: 3, is_include: 0 },
      { contract_component_id: 4, is_include: 0 },
      { contract_component_id: 5, is_include: 0 }
    ],
    sites: [
      {
        name: '',
        qty: '',
        gs_qft: '',
        ts_qft: '',
        cs_qft: '0.0000',
        ps_qft: '0.00',
        cost: '0.00',
        c_total: '0.00',
        c_sw: '0.00',
        c_up: '0.00',
        c_sp: '0.00',
        c_mc: '0.00',
        pb_sw: '0.00',
        pb_up: '0.00',
        pb_sp: '0.00',
        pb_mc: '0.00',
        pb_tot: '0.00',
        p_tot: '0.00',
        p_sw: '0.00',
        p_up: '0.00',
        p_sp: '0.00',
        p_mc: '0.00'
      }
    ],
    budgets: [
      {
        site_name: '',
        misc: '',
        posts: '',
        sill_plate: '',
        tie_down: '',
        sw_misc: '',
        up_lift: '',
        roof: '',
        coridor: '',
        deck: '',
        stair_wells: '',
        beam: '',
        smu: '',
        stl: '',
        rtu: '',
        budget_total: '0.0000',
        sqft_sw_tiedown: '',
        sqft_up_lift: '',
        sqft_sill_plate: '',
        sqft_misc_hardware: '0.0000',
        cost_sw_tiedown: '0.00',
        cost_up_lift: '0.00',
        cost_sill_plate: '0.00',
        cost_misc_hardware: '0.00',
        total: '0.00'
      }
    ],
    projectScopes: [],
    covers: [
      {
        rev: '',
        date: '',
        plan_date: '',
        description: '',
        scope: '',
        quote: ''
      }
    ],
    veOptions: [
      {
        subject: '',
        amount: '',
        description: ''
      }
    ],
    optionPackages: [
      {
        subject: '',
        amount: '',
        description: ''
      }
    ]
  }

  const methods = useForm({ defaultValues })
  const router = useRouter()
  const { control, setValue, watch, getValues } = methods
  // Fetch the inventory by Id To update the Id
  const fetchBudgetById = async () => {
    try {
      const response = await BudgetBookService.getBudgetById(budgetId)

      if (response?.status === 200) {
        const budgetData = response.data.data

        const scopeValues = {}
        budgetData?.projectScopes?.forEach(item => {
          scopeValues[`scope[${item.scope_id}]`] = true
        })

        // Pre-fill form values
        const formattedData = {
          ...budgetData,
          ...scopeValues,
          budget_book_id: budgetData.budgetBook?.id?.toString() || '',
          customer_id: budgetData.customer?.id?.toString() || '',
          contact_id: budgetData.contact?.id?.toString() || '',
          job_no: budgetData.job_no?.toString() || '',
          date_record: new Date(budgetData.quote_date),
          zip_id: budgetData?.zip?.id?.toString() || '',
          engineer_id: budgetData?.engineer?.id?.toString() || ''
        }

        console.log("formattedData",formattedData )
        methods.reset(formattedData)
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    if (budgetId) {
      fetchBudgetById()
    }
  }, [budgetId])

  const watchedSites = useWatch({
    control,
    name: 'sites'
  })

  const budgetFields = useWatch({
    control,
    name: 'budgets'
  })
  const design = useWatch({
    control,
    name: 'design'
  })
  const total = useWatch({
    control,
    name: 'total'
  })
  const engineering = useWatch({
    control,
    name: 'engineering'
  })
  const budget = useWatch({
    control,
    name: 'budget'
  })

  const shipping = useWatch({
    control,
    name: 'shipping'
  })
  const engineering_total = useWatch({
    control,
    name: 'engineering_total'
  })
  const engineering_seal = useWatch({
    control,
    name: 'engineering_seal'
  })
  const design_total = useWatch({
    control,
    name: 'design_total'
  })
  const budget_total = useWatch({
    control,
    name: 'budget_total'
  })
  const design_hr = useWatch({
    control,
    name: 'design_hr'
  })
  const budget_hr = useWatch({
    control,
    name: 'budget_hr'
  })

  const shipping_total = useWatch({
    control,
    name: 'shipping_total'
  })
  const shipping_ship = useWatch({
    control,
    name: 'shipping_ship'
  })
  const commission = useWatch({
    control,
    name: 'commission'
  })
  const commission_rate = useWatch({
    control,
    name: 'commission_rate'
  })
  const projectContracts = useWatch({
    control,
    name: 'projectContracts'
  })
  const bldg_gsqft = useWatch({
    control,
    name: 'bldg_gsqft'
  })
  const siteName = watch('sites')

  const watchedswMargin = useWatch({ control, name: 'sw_margin' })
  const watchedUpMargin = useWatch({ control, name: 'up_margin' })
  const watchedSpMargin = useWatch({ control, name: 'sp_margin' })
  const watchedMcMargin = useWatch({ control, name: 'mc_margin' })

  //GENERAL TABS
  // Update bldg_count
  useEffect(() => {
    const totalQty = watchedSites.reduce(
      (acc, site) => acc + Number(site.qty || 0),
      0
    )
    setValue('bldg_count', totalQty.toFixed(0))
  }, [watchedSites, setValue])

  // Update bldg_gsqft
  useEffect(() => {
    const totalSqft = watchedSites.reduce(
      (acc, site) => acc + parseFloat(site.ts_qft || '0'),
      0
    )
    setValue('bldg_gsqft', totalSqft.toFixed(0))
  }, [watchedSites, setValue])

  // Update bldg_cost
  useEffect(() => {
    const totalCost = watchedSites.reduce(
      (acc, site) => acc + parseFloat(site.c_total || '0'),
      0
    )
    setValue('bldg_cost', totalCost.toFixed(2))
  }, [watchedSites, setValue])

  // Calculate bldg_sqft (cost per sqft)
  useEffect(() => {
    const price = parseFloat(getValues('bldg_cost'))
    const sqft = parseFloat(getValues('bldg_gsqft'))

    if (!isNaN(price) && !isNaN(sqft) && sqft !== 0) {
      const costPerSqft = (price / sqft).toFixed(5)
      setValue('bldg_sqft', costPerSqft)
    } else {
      setValue('bldg_sqft', '0')
    }
  }, [watchedSites, setValue, getValues])

  // Pricing data
  useEffect(() => {
    const sw_tiedown = watchedSites.reduce(
      (acc, site) => acc + parseFloat(site.p_sw.toString() || '0'),
      0
    )
    const up_lift = watchedSites.reduce(
      (acc, site) => acc + parseFloat(site.p_up.toString() || '0'),
      0
    )
    const misc = watchedSites.reduce(
      (acc, site) => acc + parseFloat(site.p_mc.toString() || '0'),
      0
    )
    const anchorage = watchedSites.reduce(
      (acc, site) => acc + parseFloat(site.p_sp.toString() || '0'),
      0
    )

    const total = [
      parseFloat(sw_tiedown || '0'),
      parseFloat(up_lift || '0'),
      parseFloat(misc || '0'),
      parseFloat(anchorage || '0')
    ].reduce((acc, val) => acc + val, 0)
    if (
      isNaN(sw_tiedown) ||
      isNaN(up_lift) ||
      isNaN(misc) ||
      isNaN(anchorage)
    ) {
      setValue('sw_tiedown', '')
      setValue('up_lift', '')
      setValue('misc', '')
      setValue('anchorage', '')
    } else {
      setValue('sw_tiedown', sw_tiedown.toFixed(2))
      setValue('up_lift', up_lift.toFixed(2))
      setValue('misc', misc.toFixed(2))
      setValue('anchorage', anchorage.toFixed(2))
      setValue('total', total.toFixed(2))
    }
  }, [JSON.stringify(watchedSites), setValue])

  //budget & site tab tab
  // SET site_name, total, mirrored fields, misc hardware, and reset fixed fields
  useEffect(() => {
    if (!budgetFields?.length || !siteName?.length) return

    budgetFields.forEach((row, index) => {
      const nameFromSite = siteName[index]?.name || ''
      const currentSiteName = watch(`budgets.${index}.site_name`)
      if (currentSiteName !== nameFromSite) {
        setValue(`budgets.${index}.site_name`, nameFromSite, {
          shouldValidate: false,
          shouldDirty: false
        })
      }

      // 1. Calculate budget_total
      const total = sumFields.reduce((acc, field) => {
        const val = parseFloat(row?.[field] || '0')
        return acc + (isNaN(val) ? 0 : val)
      }, 0)
      const currentTotal = parseFloat(
        watch(`budgets.${index}.budget_total`) || '0'
      )
      if (currentTotal !== total) {
        setValue(`budgets.${index}.budget_total`, total.toFixed(4), {
          shouldValidate: false,
          shouldDirty: false
        })
      }

      // 2. Mirror fields
      Object.entries(mirrorMap).forEach(([src, target]) => {
        const value = row?.[src] || ''
        const currentValue = watch(`budgets.${index}.${target}`)
        if (currentValue !== value) {
          setValue(`budgets.${index}.${target}`, value, {
            shouldValidate: false,
            shouldDirty: false
          })
        }
      })

      // 3. Calculate sqft_misc_hardware
      const tieDown = parseFloat(row?.tie_down || '0')
      const uplift = parseFloat(row?.up_lift || '0')
      const sill = parseFloat(row?.sill_plate || '0')
      const miscHardware = total - (tieDown + uplift + sill)
      const currentMiscHardware = parseFloat(
        watch(`budgets.${index}.sqft_misc_hardware`) || '0'
      )
      if (currentMiscHardware !== miscHardware) {
        setValue(
          `budgets.${index}.sqft_misc_hardware`,
          miscHardware >= 0 ? miscHardware.toFixed(4) : '0.0000',
          {
            shouldValidate: false,
            shouldDirty: false
          }
        )
      }

      // 4. Reset fixed fields
      fixedFields.forEach(field => {
        const currentValue = watch(`budgets.${index}.${field}`)
        if (currentValue !== '0.00') {
          setValue(`budgets.${index}.${field}`, '0.00', {
            shouldValidate: false,
            shouldDirty: false
          })
        }
      })
    })
  }, [JSON.stringify(budgetFields), JSON.stringify(siteName)])

  //site budget calculation
  useEffect(() => {
    if (!budgetFields?.length || !watchedSites?.length) return

    budgetFields.forEach((budget, index) => {
      const site = watchedSites[index]
      if (!site) return
      const tie_down = parseFloat(budget.tie_down || '0')
      const gs_qft = parseFloat(site.gs_qft || '0')
      const budgetTotal = parseFloat(budget.budget_total || '0')
      const sill_plate = parseFloat(budget.sill_plate || '0')
      const up_lift = parseFloat(budget.up_lift || '0')
      const sqft_misc_hardware = parseFloat(budget.sqft_misc_hardware || '0')
      const c_sw = tie_down * gs_qft
      const c_sp = sill_plate * gs_qft
      const c_up = up_lift * gs_qft
      const c_mc = sqft_misc_hardware * gs_qft
      const total = (c_sp + c_sw + c_up + c_mc).toFixed(2)
      const qty = parseFloat(site.qty || '0')
      const cost = (c_sp + c_sw + c_up + c_mc).toFixed(2)
      const c_total = (qty * parseFloat(cost)).toFixed(2)
      const cs_qft = budgetTotal
      const ts_qft = Math.round(qty * gs_qft)
      let pb_sw = 0
      let p_sw = 0
      const swMarginDivide = Number(watchedswMargin) / 100
      const swMarginMinus = 1 - swMarginDivide
      if (c_sw !== 0 && swMarginMinus !== 0) {
        pb_sw = parseFloat((c_sw / swMarginMinus).toFixed(2))
        p_sw = parseFloat((pb_sw * qty).toFixed(2))
      }

      let p_up = 0
      let pb_up = 0
      const upMarginDivide = Number(watchedUpMargin) / 100
      const upMarginMinus = 1 - upMarginDivide
      if (c_up !== 0 && upMarginMinus !== 0) {
        pb_up = parseFloat((c_up / upMarginMinus).toFixed(2))
        p_up = parseFloat((pb_up * qty).toFixed(2))
      }

      let p_sp = 0
      let pb_sp = 0
      const spMarginDivide = Number(watchedSpMargin) / 100
      const spMarginMinus = 1 - spMarginDivide
      if (c_sp !== 0 && spMarginMinus !== 0) {
        pb_sp = parseFloat((c_sp / spMarginMinus).toFixed(2))
        p_sp = parseFloat((pb_sp * qty).toFixed(2))
      }

      let p_mc = 0
      let pb_mc = 0
      const mcMarginDivide = Number(watchedMcMargin) / 100
      const mcMarginMinus = 1 - mcMarginDivide
      if (c_mc !== 0 && mcMarginMinus !== 0) {
        pb_mc = parseFloat((c_mc / mcMarginMinus).toFixed(2))
        p_mc = parseFloat((pb_mc * qty).toFixed(2))
      }
      const pb_tot = (
        Number(pb_sw) +
        Number(pb_up) +
        Number(pb_sp) +
        Number(pb_mc)
      ).toFixed(2)

      let ps_qft = ''
      if (!isNaN(pb_tot) && !isNaN(gs_qft) && gs_qft !== 0) {
        ps_qft = (pb_tot / gs_qft).toFixed(4)
      }
      const p_tot = (parseFloat(pb_tot) * qty).toFixed(2)

      setValue(`sites.${index}.ts_qft`, ts_qft, { shouldValidate: false })

      setValue(`budgets.${index}.cost_sw_tiedown`, c_sw.toFixed(2), {
        shouldValidate: false
      })
      setValue(`budgets.${index}.cost_sill_plate`, c_sp.toFixed(2), {
        shouldValidate: false
      })
      setValue(`budgets.${index}.cost_up_lift`, c_up.toFixed(2), {
        shouldValidate: false
      })
      setValue(`budgets.${index}.cost_misc_hardware`, c_mc.toFixed(2), {
        shouldValidate: false
      })
      setValue(`budgets.${index}.total`, total, { shouldValidate: false })

      setValue(`sites.${index}.cs_qft`, cs_qft.toFixed(4), {
        shouldValidate: false
      })
      setValue(`sites.${index}.ps_qft`, ps_qft, { shouldValidate: false })

      setValue(`sites.${index}.cost`, cost, { shouldValidate: false })
      setValue(`sites.${index}.c_total`, c_total, { shouldValidate: false })
      setValue(`sites.${index}.c_sw`, c_sw.toFixed(2), {
        shouldValidate: false
      })
      setValue(`sites.${index}.c_sp`, c_sp.toFixed(2), {
        shouldValidate: false
      })
      setValue(`sites.${index}.c_up`, c_up.toFixed(2), {
        shouldValidate: false
      })
      setValue(`sites.${index}.c_mc`, c_mc.toFixed(2), {
        shouldValidate: false
      })
      setValue(`sites.${index}.pb_sw`, pb_sw.toFixed(2), {
        shouldValidate: false
      })
      setValue(`sites.${index}.pb_sp`, pb_sp.toFixed(2), {
        shouldValidate: false
      })
      setValue(`sites.${index}.pb_up`, pb_up.toFixed(2), {
        shouldValidate: false
      })
      setValue(`sites.${index}.pb_mc`, pb_mc.toFixed(2), {
        shouldValidate: false
      })
      setValue(`sites.${index}.pb_tot`, pb_tot, { shouldValidate: false })
      setValue(`sites.${index}.p_tot`, p_tot, { shouldValidate: false })
      setValue(`sites.${index}.p_sw`, p_sw.toFixed(2), {
        shouldValidate: false
      })
      setValue(`sites.${index}.p_up`, p_up.toFixed(2), {
        shouldValidate: false
      })
      setValue(`sites.${index}.p_sp`, p_sp.toFixed(2), {
        shouldValidate: false
      })
      setValue(`sites.${index}.p_mc`, p_mc.toFixed(2), {
        shouldValidate: false
      })
    })
  }, [
    JSON.stringify(budgetFields),
    JSON.stringify(watchedSites),
    watchedswMargin,
    watchedUpMargin,
    watchedSpMargin,
    watchedMcMargin
  ])

  //ADDERS PER COMPONENT calculation
  const firstTwoContracts = projectContracts.slice(0, 2)

  const yourDesignvalue = (() => {
    const value = parseFloat(design) || 0
    const count = firstTwoContracts.length || 1
    return value / count
  })()

  const yourEngineeringvalue = (() => {
    const value = parseFloat(engineering) || 0
    const count = firstTwoContracts.length || 1
    return value / count
  })()

  const yourBudgetvalue = (() => {
    const value = parseFloat(budget) || 0
    const count = projectContracts.length || 1
    return value / count
  })()

  const yourShippingvalue = (() => {
    const value = parseFloat(shipping) || 0
    const count = projectContracts.length || 1
    return value / count
  })()

  const sumOfDesign = (() => {
    const sum =
      yourDesignvalue +
      yourEngineeringvalue +
      yourBudgetvalue +
      yourShippingvalue
    return sum.toFixed(2)
  })()

  const multipliedDesign = (() => {
    const result = (Number(sumOfDesign) / 100) * (parseFloat(total) || 0)
    return result.toFixed(2)
  })()

  const sumOfEngineering = (() => {
    const sum =
      yourDesignvalue +
      yourEngineeringvalue +
      yourBudgetvalue +
      yourShippingvalue
    return sum.toFixed(2)
  })()

  const multipliedEngineer = (() => {
    const result = (Number(sumOfEngineering) / 100) * (parseFloat(total) || 0)
    return result.toFixed(2)
  })()

  const sumOfBudget = (() => {
    const budgetValue = isFinite(yourBudgetvalue) ? yourBudgetvalue : 0
    const shippingValue = isFinite(yourShippingvalue) ? yourShippingvalue : 0
    return (budgetValue + shippingValue).toFixed(2)
  })()

  const multipliedBudget = (() => {
    const result = (Number(sumOfBudget) / 100) * (parseFloat(total) || 0)
    return result.toFixed(2)
  })()

  const sumOfShipping = (() => {
    const budgetValue = isFinite(yourBudgetvalue) ? yourBudgetvalue : 0
    const shippingValue = isFinite(yourShippingvalue) ? yourShippingvalue : 0
    return (budgetValue + shippingValue).toFixed(2)
  })()

  const multipliedShipping = (() => {
    const result = (Number(sumOfShipping) / 100) * (parseFloat(total) || 0)
    return result.toFixed(2)
  })()

  const sumOfShippingNext = (() => {
    const budgetValue = isFinite(yourBudgetvalue) ? yourBudgetvalue : 0
    const shippingValue = isFinite(yourShippingvalue) ? yourShippingvalue : 0
    return (budgetValue + shippingValue).toFixed(2)
  })()

  const multipliedShippingNext = (() => {
    const result = (Number(sumOfShippingNext) / 100) * (parseFloat(total) || 0)
    return result.toFixed(2)
  })()

  const totalSum = (() => {
    const sum =
      Number(sumOfDesign) +
      Number(sumOfEngineering) +
      Number(sumOfBudget) +
      Number(sumOfShipping) +
      Number(sumOfShippingNext)
    return sum.toFixed(2)
  })()

  const totalMultiplied = (() => {
    const sum =
      Number(multipliedDesign) +
      Number(multipliedEngineer) +
      Number(multipliedBudget) +
      Number(multipliedShipping) +
      Number(multipliedShippingNext)
    return sum.toFixed(2)
  })()

  // Total BLDG Calculation
  const totalBLDG = (() => {
    const sum =
      (Number(total) || 0) +
      (Number(totalMultiplied) || 0) +
      (Number(commission_rate) || 0)
    return isNaN(sum) ? '0.00' : sum.toFixed(2)
  })()

  //commission_Rate
  const totalCOMMISION = (() => {
    const sumValue = (Number(total) || 0) + (Number(totalMultiplied) || 0)
    const discount = Number(commission) / 100 || 0
    const computedValue = sumValue * discount
    return isNaN(computedValue) ? '0.00' : computedValue.toFixed(2)
  })()

  //Adders component
  useEffect(() => {
    const sqft = total
    const designcost = design / 100
    const engineeringcost = engineering / 100
    const budgetcost = budget / 100
    const shippingcost = shipping / 100
    const design_total = (designcost * sqft).toFixed(2)
    const engineering_total = (engineeringcost * sqft).toFixed(2)
    const budget_total = (budgetcost * sqft).toFixed(2)
    const shipping_total = (shippingcost * sqft).toFixed(2)
    setValue(`design_total`, design_total, {
      shouldValidate: false
    })
    setValue(`shipping_total`, shipping_total, {
      shouldValidate: false
    })
    setValue(`budget_total`, budget_total, {
      shouldValidate: false
    })

    setValue(`engineering_total`, engineering_total, {
      shouldValidate: false
    })

    const design1 = Number(design)
    const engineering1 = Number(engineering)
    const budget1 = Number(budget)
    const shipping1 = Number(shipping)
    const total_adders = design1 + engineering1 + budget1 + shipping1

    const design_total1 = Number(design_total)
    const engineering_total1 = Number(engineering_total)
    const budget_total1 = Number(budget_total)
    const shipping_total1 = Number(shipping_total)
    const total_calculate = (
      design_total1 +
      engineering_total1 +
      budget_total1 +
      shipping_total1
    ).toFixed(2)

    setValue(`total_calculate`, total_calculate, {
      shouldValidate: false
    })
    const totalSqft = watchedSites.reduce(
      (acc, site) => acc + parseFloat(site.ts_qft || '0'),
      0
    )
    const total_calculate1 = total_calculate
    const totalSqft1 = totalSqft

    if (!isNaN(total_calculate1) && !isNaN(totalSqft1) && totalSqft1 !== 0) {
      const per_sqft = (total_calculate1 / totalSqft1).toFixed(4)
      setValue(`per_sqft`, per_sqft, {
        shouldValidate: false
      })
    }

    const budgettotal = budget_total
    const budgetsqft = budget_hr
    const designtotal = design_total
    const designsqft = design_hr
    const engineeringtotal = engineering_total
    const engineeringsqft = engineering_seal
    const shippingtotal = shipping_total
    const shippingsqft = shipping_ship

    const shipping_shipment = (shippingtotal / shippingsqft).toFixed(2)
    const design_hrs = (designtotal / designsqft).toFixed(2)
    const engineering_seals = (engineeringtotal / engineeringsqft).toFixed(2)
    const budget_hrs = (budgettotal / budgetsqft).toFixed(2)
    const price = totalBLDG
    const bldggsqft = bldg_gsqft
    const bldg_price = (price / bldggsqft).toFixed(4)

    setValue(`bldg_price`, bldg_price, {
      shouldValidate: false
    })
    setValue(`design_hrs`, design_hrs, {
      shouldValidate: false
    })
    setValue(`shipping_shipment`, shipping_shipment, {
      shouldValidate: false
    })
    setValue(`budget_hrs`, budget_hrs, {
      shouldValidate: false
    })
    setValue(`engineering_seals`, engineering_seals, {
      shouldValidate: false
    })
    setValue(`total_adders`, total_adders.toFixed(2), {
      shouldValidate: false
    })
    setValue(`price`, totalBLDG, {
      shouldValidate: false
    })
    setValue(`commission_rate`, totalCOMMISION, {
      shouldValidate: false
    })
    setValue(`sumOfDesign`, sumOfDesign, {
      shouldValidate: false
    })
    setValue(`multipliedDesign`, multipliedDesign, {
      shouldValidate: false
    })
    setValue(`sumOfEngineering`, sumOfEngineering, {
      shouldValidate: false
    })
    setValue(`multipliedEngineer`, multipliedEngineer, {
      shouldValidate: false
    })
    setValue(`sumOfBudget`, sumOfBudget, {
      shouldValidate: false
    })
    setValue(`multipliedBudget`, multipliedBudget, {
      shouldValidate: false
    })
    setValue(`sumOfShipping`, sumOfShipping, {
      shouldValidate: false
    })
    setValue(`multipliedShipping`, multipliedShipping, {
      shouldValidate: false
    })
    setValue(`sumOfShippingNext`, sumOfShippingNext, {
      shouldValidate: false
    })
    setValue(`multipliedShippingNext`, multipliedShippingNext, {
      shouldValidate: false
    })
    setValue(`totalSum`, totalSum, {
      shouldValidate: false
    })

    setValue(`totalMultiplied`, totalMultiplied, {
      shouldValidate: false
    })
  })

  // Submit handler
  const onSubmit = async data => {
    setUpdateOpenModal(true)
    setBudgetData(data)
  }

  const onUpdate = async () => {
    const updateType = methods.getValues('update')
    const configData = {
      _method: 'PUT',
      engineer_id: 3,
      ...budgetData,
      updateType: updateType,
      quote_date: formatDateForMySQL(budgetData.quote_date),
      plan_date: formatDateForMySQL(budgetData.plan_date)
    }
    try {
      const response = await BudgetBookService.updateBudgetById(
        budgetId,
        configData
      )
      if (response.status === 200) {
        successMessage({ description: response?.data?.message })
        router.push(`/dashboard/budget-book`)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const updateModalDialogBox = () => {
    setUpdateOpenModal(false)
  }
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-4'>
          <FormBugetBook form={methods} pageTitle='Update Budget Book' />
        </form>
      </FormProvider>
      <UpdateDialogBox
        onUpdate={onUpdate}
        form={methods}
        description='Do you want to overwrite the existing data or create a new version?'
        openUpdateModal={openUpdateModal}
        updateModalDialogBox={updateModalDialogBox}
      />
    </>
  )
}

export default EditBudgetBook
