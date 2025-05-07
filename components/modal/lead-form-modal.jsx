import AddCompanyForm from '../leads-module/AddCompanyForm'
import AddContactForm from '../leads-module/AddContactForm'
import AddEngineerForm from '../leads-module/AddEngineerForm'
import AddProjectForm from '../leads-module/AddProjectForm'
import SearchProjects from '../leads-module/SearchProjects'
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'

export function LeadFormDialog({
  open,
  onOpenChange,
  formType,
  handleCloseDialog,
  getBudgetBooks,
  getCompanies,
  fetchContactsByCompany,
  getEngineer,
  handleProjectSelect,
  id
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[625px]'>
        <DialogHeader>{/* <DialogTitle>{label}</DialogTitle> */}</DialogHeader>
        <div>
          {formType === 'project' && (
            <AddProjectForm
            id={id}
              handleCloseDialog={handleCloseDialog}
              getBudgetBooks={getBudgetBooks}
            />
          )}
          {formType === 'company' && (
            <AddCompanyForm
            id={id}
              handleCloseDialog={handleCloseDialog}
              getCompanies={getCompanies}
            />
          )}
          {formType === 'contact' && (
            <AddContactForm
            id={id}
              handleCloseDialog={handleCloseDialog}
              fetchContactsByCompany={fetchContactsByCompany}
            />
          )}
          {formType === 'engineer' && (
            <AddEngineerForm
            id={id}
              handleCloseDialog={handleCloseDialog}
              getEngineer={getEngineer}
            />
          )}
          {formType === 'search' && (
            <SearchProjects
            id={id}
              handleCloseDialog={handleCloseDialog}
              handleProjectSelect={handleProjectSelect}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
