import FormDatePicker from '@/components/share/form/datePicker'
import FormInputField from '@/components/share/form/FormInputField'
import FormInputSwitch from '@/components/share/form/FormInputSwitch'
import FormInputSwitchGroup from '@/components/share/form/FormInputSwitchGroup'
import FormScopeToggle from '@/components/share/form/FormInputSwitchMultipleScop'
import FormSelectField from '@/components/share/form/FormSelect'
import FormTextArea from '@/components/share/form/TextArea'
import { Label } from '@/components/ui/label'
import api from '@/lib/api'
import BudgetBookService from '@/services/budget-book-api'
import BudgetBooksServices from '@/services/budgetBook'
import ContactServices from '@/services/contact'
import CustomerService from '@/services/customer-api'
import { useEffect, useState } from 'react'
import { useWatch } from 'react-hook-form'
import {
  addersDesignField,
  bldgDataTable,
  commissionFields,
  hrSealfieldData,
  hrsSealsfieldData,
  limitsArray,
  pricingDataTable,
  totalFields
} from '../../table/budgetTable'

function BudgetGeneralTab({ form }) {
  const [allProject, setAllProject] = useState([])
  const [allContacts, setAllContacts] = useState([])
  const [allScop, setAllScop] = useState([])

  const [customer, setCustomer] = useState([])
  const [enginer, setEnginer] = useState([])
  const [contractor, setContractor] = useState([])
  const [drawing, setDarwing] = useState([])
  const [keyArea, setKeyArea] = useState([])
  const [zipCode, setZipCode] = useState([])
  const { control, setValue, getValues } = form

  const sites = useWatch({
    control,
    name: 'sites'
  })
  console.log('mysite', sites)

  /// get project
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          zipCodeRes,
          areaRes,
          submRes,
          contractorRes,
          engRes,
          customerRes,
          budgetScopeRes,
          contactRes,
          budgetRes
        ] = await Promise.all([
          api.get('taxes?limit=100'),
          api.get('/key-areas?limit=100'),
          api.get('/submittals?limit=100'),
          ContactServices.ContractorComponents(),
          CustomerService.GetEngineers(),
          CustomerService.GetCustomer(),
          BudgetBookService.GetBudgetScop(),
          BudgetBookService.GetContacts(),
          BudgetBooksServices.budgetBooks()
        ])
        if (zipCodeRes.status === 200) {
          const modifyProjectData = zipCodeRes?.data?.data.map(item => {
            return {
              label: `${item.zipcode} ${item.name}`,
              value: String(item.id)
            }
          })
          setZipCode(modifyProjectData)
        }
        if (areaRes.status === 200) setKeyArea(areaRes.data.data)
        if (submRes.status === 200) setDarwing(submRes.data.data)
        if (contractorRes.status === 200) setContractor(contractorRes.data.data)
        if (engRes.status === 200) {
          const modifyProjectData = engRes?.data?.data.map(item => {
            return {
              label: item.name,
              value: String(item.id)
            }
          })
          setEnginer(modifyProjectData)
        }
        if (customerRes.status === 200) {
          const modifyProjectData = customerRes?.data?.data.map(item => {
            return {
              label: item.name,
              value: String(item.id)
            }
          })
          setCustomer(modifyProjectData)
        }

        // Get the budget Scope
        if (budgetScopeRes.status === 200)
          setAllScop(budgetScopeRes?.data?.data)

        // Get the all contact to sent in the fields
        if (contactRes.status === 200) {
          const modifyProjectData = contactRes?.data?.data.map(item => {
            return {
              label: item.name,
              value: String(item.id)
            }
          })
          setAllContacts(modifyProjectData)
        }

        // Set The Price field data
        if (budgetRes.status === 200) {
          const modifyProjectData = budgetRes?.data?.data.map(item => {
            return {
              label: item.name,
              value: String(item.id)
            }
          })
          setAllProject(modifyProjectData)
        }
      } catch (error) {
        console.log('Fetch error', error)
      }
    }

    fetchAllData()
  }, [])

  return (
    <div className='general-tab'>
      <div className='mt-4 grid grid-cols-3 gap-4'>
        <FormSelectField
          name='budget_book_id'
          form={form}
          placeholder='Project'
          label='Enter the project'
          options={allProject}
        />

        <FormSelectField
          name='customer_id'
          form={form}
          placeholder=''
          label='Customer'
          options={customer}
        />

        <FormSelectField
          name='contact_id'
          form={form}
          placeholder=''
          label='Contact'
          options={allContacts}
        />
      </div>

      <div className='mt-4 grid grid-cols-2 gap-4'>
        <FormDatePicker form={form} name='quote_date' label='Quote Date' />

        <FormInputField
          placeholder=''
          form={form}
          name='job_no'
          label='Job #'
          type='number'
        />
      </div>

      <fieldset className='border-color-grey mt-2 rounded border border-solid border-gray-300 py-4 pe-4 ps-4'>
        <legend>Address Details:</legend>
        <div className='mt-4 grid grid-cols-4 gap-4'>
          <FormInputField
            placeholder='Address'
            form={form}
            name='address'
            label='Address'
            type='text'
          />

          <FormInputField
            placeholder='City'
            form={form}
            name='city'
            label='City'
            type='text'
          />
          <FormInputField
            placeholder='State'
            form={form}
            name='state'
            label='State'
            type='text'
          />

          <FormSelectField
            name='zip_id'
            form={form}
            placeholder=''
            label='Zip Code'
            options={zipCode}
          />
        </div>
      </fieldset>

      <div className='pricing-data mt-8'>
        <h5 className='text-dark-color text-lg font-semibold'>Pricing Data</h5>
        <div className='mt-4 grid grid-cols-5 gap-4'>
          <div className='relative flex'>
            <span className='symbol absolute self-center text-sm font-semibold'>
              %
            </span>
            <FormInputField
              name='sw_margin'
              form={form}
              placeholder='SW Margin'
              label='SW Margin'
              type='number'
            />
          </div>
          <div className='relative flex'>
            <span className='symbol absolute self-center text-sm font-semibold'>
              %
            </span>
            <FormInputField
              placeholder='UP Margin'
              form={form}
              name='up_margin'
              label='UP Margin'
              type='number'
            />
          </div>
          <div className='relative flex'>
            <span className='symbol absolute self-center text-sm font-semibold'>
              %
            </span>
            <FormInputField
              placeholder='SP Margin'
              form={form}
              name='sp_margin'
              label='SP Margin'
              type='number'
            />
          </div>
          <div className='relative flex'>
            <span className='symbol absolute self-center text-sm font-semibold'>
              %
            </span>
            <FormInputField
              placeholder='MC Margin'
              form={form}
              name='mc_margin'
              label='MC Margin'
              type='number'
            />
          </div>
          <div className='mt-5 flex gap-5'>
            <FormInputSwitch name='is_pricing' label='Budget Only' />
            <FormInputSwitch name='is_budget_only' label='Pricing' />
          </div>
        </div>
      </div>

      <div className='mt-8 flex items-center justify-between'>
        <h5 className='text-dark-color text-lg font-semibold'>Plan Info</h5>
      </div>

      <div className='mt-4 grid grid-cols-3 gap-4'>
        <FormSelectField
          name='engineer_id'
          form={form}
          placeholder=''
          label='Engineer'
          options={enginer}
        />

        <FormDatePicker form={form} name='plan_date' label='Plan Date' />

        <FormInputField
          placeholder='Plan Status'
          form={form}
          name='plan_status'
          label='Plan Status'
          type='text'
        />
      </div>

      <div className='mt-4 grid grid-cols-3 gap-4'>
        <FormInputField
          placeholder=''
          form={form}
          name='plan_info'
          label='Plan Info'
          type='text'
        />

        <FormInputField
          placeholder=''
          form={form}
          name='Tax'
          label='Tax'
          type='text'
          disable
        />
      </div>

      {/* address component start */}

      <div className='space-y-6 py-6'>
        {/* ADDERS */}
        <div>
          <h2 className='mb-2 text-lg font-medium'>Adders </h2>
          <div className='grid grid-cols-4 gap-4'>
            <div className='address-collunm'>
              {addersDesignField.map((field, index) => (
                <>
                  <div className='relative flex'>
                    <span className='symbol absolute mr-2 self-center text-sm font-semibold'>
                      %
                    </span>
                    <FormInputField
                      placeholder=''
                      form={form}
                      name={field.name}
                      type='number'
                    />
                    <Label className='absolute ms-2'>{field.label}</Label>
                  </div>
                </>
              ))}
              <div className='relative flex'>
                <span className='symbol absolute mr-2 self-center text-sm font-semibold'>
                  %
                </span>
                <FormInputField
                  className='total-calculate'
                  placeholder=''
                  form={form}
                  name='total_adders'
                  type='number'
                />
              </div>
            </div>

            <div className='address-collunm'>
              <div className='relative flex flex-wrap'>
                <div className='per-sqft-main w-full'>
                  {totalFields.map(field => (
                    <div className='relative mt-1 flex' key={field.name}>
                      <span className='symbol absolute mr-2 self-center text-sm font-semibold'>
                        $
                      </span>
                      <FormInputField
                        placeholder='0'
                        form={form}
                        name={field.name}
                        type='number'
                        className={
                          field.name == 'total_calculate' && 'total-calculate'
                        }
                        readOnly={true}
                      />
                    </div>
                  ))}
                </div>

                <div className='per-sqft relative mt-1 flex'>
                  <span className='symbol absolute mr-2 self-center text-sm font-semibold'>
                    $
                  </span>
                  <span className='text absolute font-semibold'> PER SQFT</span>
                  <FormInputField
                    placeholder='0'
                    form={form}
                    name='per_sqft'
                    type='number'
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
            {/* hr seal */}
            <div className='address-collunm padding-left'>
              {hrSealfieldData.map((field, index) => (
                <div
                  className={`relative ${index !== 0 ? 'mt-1' : ''} flex`}
                  key={field.name}
                >
                  <FormInputField
                    placeholder=''
                    form={form}
                    name={field.name}
                    type='number'
                  />
                  <Label className='absolute ms-2'>{field.label}</Label>
                </div>
              ))}
            </div>

            <div className='address-collunm padding-left'>
              {hrsSealsfieldData.map((field, index) => (
                <div
                  className={`relative ${index !== 0 ? 'mt-1' : ''} flex`}
                  key={field.name}
                >
                  <FormInputField
                    placeholder=''
                    form={form}
                    name={field.name}
                    type='number'
                    readOnly={true}
                  />
                  <Label className='absolute ms-2'>{field.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* BLDG Data & Pricing */}
      <div className='grid grid-cols-3 gap-4'>
        {/* BLDG Data */}
        <div className='blog-collunm'>
          <h2 className='mb-2 font-semibold'>BLDG Data</h2>
          {bldgDataTable.map(({ label, name }) => (
            <div key={name} className='flex items-center'>
              <Label className='w-full'>{label}</Label>
              <FormInputField
                placeholder=''
                form={form}
                name={name}
                type='number'
                readOnly={true}
              />
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className='blog-collunm'>
          <h2 className='mb-2 font-semibold'>Pricing</h2>
          {pricingDataTable.map(({ name, label }) => (
            <div key={name} className='flex items-center justify-between'>
              <Label className='w-1/2'>{label}</Label>
              <FormInputField
                placeholder=''
                form={form}
                name={name}
                type='number'
                readOnly={true}
              />
            </div>
          ))}
        </div>

        {/* ADDERS PER COMPONENT */}
        {/* <div>
          <h2 className='mb-2 font-semibold'>ADDERS PER COMPONENT</h2>
          <div className='grid grid-cols-2'>
            <div className='address-collunm'>
              {sumOfDebs.map(({ name }) => (
                <div className='component-left relative flex' key={name}>
                  <span className='symbol absolute mr-2 self-center text-sm font-semibold'>
                    %
                  </span>
                  <FormInputField
                    placeholder=''
                    form={form}
                    name={name}
                    readOnly={true}
                    type='number'
                  />
                </div>
              ))}
            </div>
            <div className='address-collunm'>
              {multipliedDebs.map(({ name }) => (
                <div key={name} className='componet-collunm'>
                  <FormInputField
                    placeholder=''
                    form={form}
                    name={name}
                    readOnly={true}
                    type='number'
                  />
                  <Label>$</Label>
                </div>
              ))}
            </div>
          </div> */}
        {/* ADDERS PER COMPONENT  end*/}
        {/* </div> */}
        <div>
          <h2 className='mb-2 font-semibold'>&nbsp;</h2>
          <div className='blog-collunm'>
            <div className='!w-full space-y-2'>
              {limitsArray.map(({ label, name }) => (
                <div
                  key={name}
                  className={`${name === 'limit_notes' ? 'limit-notes' : ''} !mt-0 flex items-center`}
                >
                  <Label className='w-full'>{label}</Label>
                  <FormInputField
                    placeholder=''
                    form={form}
                    name={name}
                    type={name == 'limit_notes' ? 'text' : 'number'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LIMITS */}

      {/* Commission Info */}

      <div className='mt-4 grid grid-cols-2 gap-4'>
        <div>
          <h2 className='font-semibold'>Commission Info</h2>
          <div className='commission-info blog-collunm mt-2 flex flex-wrap gap-3'>
            {commissionFields.map(({ label, name }) => (
              <div key={name} className='flex w-full'>
                <Label className='w-full'>{label}</Label>
                <FormInputField
                  placeholder=''
                  form={form}
                  readOnly={name === 'commission_rate'}
                  name={name}
                  type='number'
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mt-6 grid grid-cols-2 gap-6 rounded py-4'>
        {/* INC / EXC Scope */}
        <div>
          <h4 className='mb-2 text-sm font-semibold'>INC / EXC Scope</h4>
          <div className='space-y-2'>
            {allScop.map((item, index) => (
              <div
                key={item.id}
                className='scope-radio flex items-center space-x-2'
              >
                <FormScopeToggle name={`scope[${item.id}]`} scopeItem={item} />
                <span className='text-sm font-medium'>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Contract Components */}
        <div className='scope-radio'>
          <FormInputSwitchGroup
            label='Contract Components'
            items={contractor}
            formKey='projectContracts'
            idKey='contract_component_id'
          />
        </div>
      </div>

      <div className='scope-radio mt-6 grid grid-cols-2 gap-6 rounded'>
        {/* Drawings Submittals */}

        <FormInputSwitchGroup
          label='Drawings Submittals'
          items={drawing}
          formKey='projectSubmittals'
          idKey='submittal_id'
        />

        {/* Key Areas */}
        <FormInputSwitchGroup
          label='Key Areas'
          items={keyArea}
          formKey='projectKeyAreas'
          idKey='key_area_id'
        />
      </div>
      <br />

      <FormTextArea
        form={form}
        name='plan_note'
        label='Plan Notes'
        type='text'
        className='rounded-6 mt-8 !min-h-32 bg-white !pr-7 pt-3 shadow-none'
        errors={form?.formState?.errors}
      />
      <br />
      <FormTextArea
        form={form}
        name='terms'
        label='Terms'
        type='text'
        className='rounded-6 mt- !min-h-32 bg-white !pr-7 pt-3 shadow-none'
        errors={form?.formState?.errors}
      />
    </div>
  )
}

export default BudgetGeneralTab
