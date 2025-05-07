import { toast } from '@/hooks/use-toast'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ContractorService from '../services/contractor'
import FileUpload from '../share/form/FileUpload'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Spinner } from '../ui/spinner'
import { errorMessage, successMessage } from '../ToasterMessage'

const ContractorValidateProof = () => {
  const [formFieldCheck, setFormFieldCheck] = useState([])
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const form = useForm()
  const router = useRouter()
  // function for form submit :-
  const validationProof = async data => {
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      if (data[key] instanceof FileList) {
        Array.from(data[key]).forEach(file => {
          formData.append(key, file)
        })
      }
    })

    formData.append('doc1Name', 'Business License Proof')
    formData.append('doc2Name', 'Certificate Of Insurance')
    formData.append('doc3Name', 'Change Order Process Acknoweledgement')
    formData.append('doc4Name', 'Direct Deposit Authorization')
    formData.append('doc5Name', 'Drug Free Work Place')
    formData.append('doc6Name', 'I-9 Employment Verification')
    formData.append('doc7Name', 'Lien Waivers & Releases')
    formData.append('doc8Name', 'Material Procurement Agreement')
    formData.append('doc9Name', 'Non Compete Agreement')
    formData.append('doc10Name', 'OSHA Certification')
    formData.append('doc11Name', 'Job Expectation')

    try {
      const response = await ContractorService.documentUpload(formData, token)
      if (response.data.status === true) {
        router.push('/contractor-kyc/thankspage')
      }
      successMessage({
        description: response?.data?.message
      })
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
    setButtonLoading(true)
  }

  // document fields verify :-
  const formFieldVerify = async () => {
    setLoading(true)
    try {
      const doc = await ContractorService.formFieldVerify(token)
      if(doc?.status===200){
        setFormFieldCheck(doc?.data?.data)
        setLoading(false)
      }
      
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    formFieldVerify()
  }, [])
  const getImage = formFieldCheck.map(item => item?.doc1File)
  const getImage2 = formFieldCheck.map(item => item?.doc2File)
  const getImage3 = formFieldCheck.map(item => item?.doc3File)
  const getImage4 = formFieldCheck.map(item => item?.doc4File)
  const getImage5 = formFieldCheck.map(item => item?.doc5File)
  const getImage6 = formFieldCheck.map(item => item?.doc6File)
  const getImage7 = formFieldCheck.map(item => item?.doc7File)
  const getImage8 = formFieldCheck.map(item => item?.doc8File)
  const getImage9 = formFieldCheck.map(item => item?.doc9File)
  const getImage10 = formFieldCheck.map(item => item?.doc10File)
  const getImage11 = formFieldCheck.map(item => item?.doc11File)
  return (
    <>
      {loading ? (
        <Spinner size='lg' className='m-auto bg-black dark:bg-white' />
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(validationProof)}>
              <div className='main-form'>
                {/* Legal and Licensing Information */}
                <Separator />

                <>
                  <div className='mb-3 mt-5 grid grid-cols-2 gap-5 px-5'>
                    <div className='sub-contractor-fields flex items-end'>
                      <FileUpload
                        form={form}
                        name='doc1File'
                        label='Business License Proof'
                        disable={formFieldCheck?.some(
                          item => item.doc1Status === 'approved'
                        )}
                        className={
                          formFieldCheck?.some(
                            item => item.doc1Status === 'approved'
                          )
                            ? 'h-12 bg-green-100 py-3 text-green-500'
                            : formFieldCheck?.some(
                                  item => item.doc1Status === 'rejected'
                                )
                              ? 'h-12 bg-red-300 py-3 text-red-600'
                              : 'h-12 py-3'
                        }
                      />
                      {getImage?.length !== 0 && (
                        <img
                          src={getImage[0]}
                          alt='Form Preview'
                          className='ml-2 h-14 w-14 object-cover'
                        />
                      )}
                    </div>
                    <div className='sub-contractor-fields flex items-end'>
                      <FileUpload
                        form={form}
                        name='doc2File'
                        label='Certificate Of Insurance '
                        disable={formFieldCheck?.some(
                          item => item.doc2Status === 'approved'
                        )}
                        className={
                          formFieldCheck?.some(
                            item => item.doc2Status === 'approved'
                          )
                            ? 'h-12 bg-green-100 py-3 text-green-500'
                            : formFieldCheck?.some(
                                  item => item.doc2Status === 'rejected'
                                )
                              ? 'h-12 bg-red-300 py-3 text-red-600'
                              : 'h-12 py-3'
                        }
                      />
                      {getImage2?.length !== 0 && (
                        <img
                          src={getImage2[1]}
                          alt='Form Preview'
                          className='ml-2 h-14 w-14 object-cover'
                        />
                      )}
                    </div>
                    <div>
                      {/* Label with download link */}
                      <Label className='mb-3 block text-sm font-medium text-gray-700'>
                        Change Order Process Acknowledgement
                        <Link
                          href='#' // Replace with actual file path
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-blue-1000 ml-2 hover:underline'
                        >
                          (Download document)
                        </Link>
                      </Label>

                      <div className='sub-contractor-fields flex items-end'>
                        {' '}
                        <FileUpload
                          form={form}
                          name='doc3File'
                          label=''
                          disable={formFieldCheck?.some(
                            item => item.doc3Status === 'approved'
                          )}
                          className={
                            formFieldCheck?.some(
                              item => item.doc3Status === 'approved'
                            )
                              ? 'h-12 bg-green-100 py-3 text-green-500'
                              : formFieldCheck?.some(
                                    item => item.doc3Status === 'rejected'
                                  )
                                ? 'h-12 bg-red-300 py-3 text-red-600'
                                : 'h-12 py-3'
                          }
                        />
                        {getImage3.length !== 0 && (
                          <img
                            src={getImage3[2]}
                            alt='Form Preview'
                            className='ml-2 h-14 w-14 object-cover'
                          />
                        )}
                      </div>
                    </div>
                    <div className='sub-contractor-fields flex items-end'>
                      {' '}
                      <FileUpload
                        form={form}
                        name='doc4File'
                        label=' Direct Deposit Authorization'
                        disable={formFieldCheck?.some(
                          item => item.doc4Status === 'approved'
                        )}
                        className={
                          formFieldCheck?.some(
                            item => item.doc4Status === 'approved'
                          )
                            ? 'h-12 bg-green-100 py-3 text-green-500'
                            : formFieldCheck?.some(
                                  item => item.doc4Status === 'rejected'
                                )
                              ? 'h-12 bg-red-300 py-3 text-red-600'
                              : 'h-12 py-3'
                        }
                      />
                      {getImage4.length !== 0 && (
                        <img
                          src={getImage4[3]}
                          alt='Form Preview'
                          className='ml-2 h-14 w-14 object-cover'
                        />
                      )}
                    </div>
                    <div className='sub-contractor-fields flex items-end'>
                      <FileUpload
                        form={form}
                        name='doc5File'
                        label='Drug Free Work Place'
                        disable={formFieldCheck?.some(
                          item => item.doc5Status === 'approved'
                        )}
                        className={
                          formFieldCheck?.some(
                            item => item.doc5Status === 'approved'
                          )
                            ? 'h-12 bg-green-100 py-3 text-green-500'
                            : formFieldCheck?.some(
                                  item => item.doc5Status === 'rejected'
                                )
                              ? 'h-12 bg-red-300 py-3 text-red-600'
                              : 'h-12 py-3'
                        }
                      />
                      {getImage5.length !== 0 && (
                        <img
                          src={getImage5[4]}
                          alt='Form Preview'
                          className='ml-2 h-14 w-14 object-cover'
                        />
                      )}
                    </div>
                    <div className='sub-contractor-fields flex items-end'>
                      {' '}
                      <FileUpload
                        form={form}
                        name='doc6File'
                        label='I-9 Employment Verification'
                        disable={formFieldCheck?.some(
                          item => item.doc6Status === 'approved'
                        )}
                        className={
                          formFieldCheck?.some(
                            item => item.doc6Status === 'approved'
                          )
                            ? 'h-12 bg-green-100 py-3 text-green-500'
                            : formFieldCheck?.some(
                                  item => item.doc6Status === 'rejected'
                                )
                              ? 'h-12 bg-red-300 py-3 text-red-600'
                              : 'h-12 py-3'
                        }
                      />
                      {getImage6.length !== 0 && (
                        <img
                          src={getImage6[5]}
                          alt='Form Preview'
                          className='ml-2 h-14 w-14 object-cover'
                        />
                      )}
                    </div>
                    <div className='sub-contractor-fields flex items-end'>
                      <FileUpload
                        form={form}
                        name='doc7File'
                        label='Lien Waivers & Releases'
                        disable={formFieldCheck?.some(
                          item => item.doc7Status === 'approved'
                        )}
                        className={
                          formFieldCheck?.some(
                            item => item.doc7Status === 'approved'
                          )
                            ? 'h-12 bg-green-100 py-3 text-green-500'
                            : formFieldCheck?.some(
                                  item => item.doc7Status === 'rejected'
                                )
                              ? 'h-12 bg-red-300 py-3 text-red-600'
                              : 'h-12 py-3'
                        }
                      />
                      {getImage7.length !== 0 && (
                        <img
                          src={getImage7[6]}
                          alt='Form Preview'
                          className='ml-2 h-14 w-14 object-cover'
                        />
                      )}
                    </div>
                    <div className='sub-contractor-fields flex items-end'>
                      <FileUpload
                        form={form}
                        name='doc8File'
                        label=' Material Procurement Agreement '
                        disable={formFieldCheck?.some(
                          item => item.doc8Status === 'approved'
                        )}
                        className={
                          formFieldCheck?.some(
                            item => item.doc8Status === 'approved'
                          )
                            ? 'h-12 bg-green-100 py-3 text-green-500'
                            : formFieldCheck?.some(
                                  item => item.doc8Status === 'rejected'
                                )
                              ? 'h-12 bg-red-300 py-3 text-red-600'
                              : 'h-12 py-3'
                        }
                      />
                      {getImage8.length !== 0 && (
                        <img
                          src={getImage8[7]}
                          alt='Form Preview'
                          className='ml-2 h-14 w-14 object-cover'
                        />
                      )}
                    </div>
                    <div className='sub-contractor-fields flex items-end'>
                      {' '}
                      <FileUpload
                        form={form}
                        name='doc9File'
                        label='Non Compete Agreement'
                        disable={formFieldCheck?.some(
                          item => item.doc9Status === 'approved'
                        )}
                        className={
                          formFieldCheck?.some(
                            item => item.doc9Status === 'approved'
                          )
                            ? 'h-12 bg-green-100 py-3 text-green-500'
                            : formFieldCheck?.some(
                                  item => item.doc9Status === 'rejected'
                                )
                              ? 'h-12 bg-red-300 py-3 text-red-600'
                              : 'h-12 py-3'
                        }
                      />
                      {getImage9.length !== 0 && (
                        <img
                          src={getImage9[8]}
                          alt='Form Preview'
                          className='ml-2 h-14 w-14 object-cover'
                        />
                      )}
                    </div>
                    <div className='sub-contractor-fields flex items-end'>
                      <FileUpload
                        form={form}
                        name='doc10File'
                        label='OSHA Certification'
                        disable={formFieldCheck?.some(
                          item => item.doc10Status === 'approved'
                        )}
                        className={
                          formFieldCheck?.some(
                            item => item.doc10Status === 'approved'
                          )
                            ? 'h-12 bg-green-100 py-3 text-green-500'
                            : formFieldCheck?.some(
                                  item => item.doc10Status === 'rejected'
                                )
                              ? 'h-12 bg-red-300 py-3 text-red-600'
                              : 'h-12 py-3'
                        }
                      />
                      {getImage10.length !== 0 && (
                        <img
                          src={getImage10[9]}
                          alt='Form Preview'
                          className='ml-2 h-14 w-14 object-cover'
                        />
                      )}
                    </div>
                    {/* & SCOPE OF WORK (ROOFING) */}
                  </div>

                  <div className='px-5 pb-4 pt-2'>
                    <FileUpload
                      form={form}
                      name='doc11File'
                      label='Job Expectation'
                      disable={formFieldCheck?.some(
                        item => item.doc11Status === 'approved'
                      )}
                      className={
                        formFieldCheck?.some(
                          item => item.doc11Status === 'approved'
                        )
                          ? 'h-12 bg-green-100 py-3 text-green-500'
                          : formFieldCheck?.some(
                                item => item.doc11Status === 'rejected'
                              )
                            ? 'h-12 bg-red-300 py-3 text-red-600'
                            : 'h-12 py-3'
                      }
                    />
                    {getImage11.length !== 0 && (
                      <img
                        src={getImage11[10]}
                        alt='Form Preview'
                        className='ml-2 mt-2 h-14 w-14 object-cover'
                      />
                    )}
                  </div>
                </>
              </div>
              <div className='px-5 pb-4 text-end'>
               
                  {buttonLoading === false ? (
                   <Button type='submit' className='site-button'>  <>Submit</></Button>
                  ) : (
                    <>
                     <Button type='button' className='site-button'>
                      <Spinner
                        size='sm'
                        className='m-auto bg-black dark:bg-white'
                      /></Button>
                    </>
                  )}
                
              </div>
            </form>
          </Form>
        </>
      )}
    </>
  )
}
export default ContractorValidateProof

// import { toast } from '@/hooks/use-toast';
// import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import ContractorService from '../services/contractor';
// import FileUpload from '../share/form/FileUpload';
// import { Button } from '../ui/button';
// import { Form } from '../ui/form';
// import { Separator } from '../ui/separator';
// import { Spinner } from '../ui/spinner';

// const ContractorValidateProof = () => {
//   const [formFieldCheck, setFormFieldCheck] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [buttonLoading, setButtonLoading] = useState(false);
//   const searchParams = useSearchParams();
//   const token = searchParams.get('token');
//   const form = useForm();

//   // Function for form submit:
//   const validationProof = async (data) => {
//     const formData = new FormData();
//     Object.keys(data).forEach((key) => {
//       if (data[key] instanceof FileList) {
//         Array.from(data[key]).forEach((file) => {
//           formData.append(key, file);
//         });
//       }
//     });

//     // Append predefined document names to formData
//     for (let i = 1; i <= 11; i++) {
//       formData.append(`doc${i}Name`, `Document ${i}`);
//     }

//     try {
//       await ContractorService.documentUpload(formData, token);
//       toast({
//         title: 'Document Upload',
//         description: 'Document Uploaded Successfully',
//       });
//     } catch (err) {
//       if (err instanceof Error) {
//         toast({
//           variant: 'destructive',
//           title: 'Error',
//           description: err.message,
//         });
//       }
//     }
//     setButtonLoading(true);
//   };

//   // Document fields verify:
//   const formFieldVerify = async () => {
//     setLoading(true);
//     try {
//       const doc = await ContractorService.formFieldVerify(token);
//       setFormFieldCheck(doc?.data?.data);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     formFieldVerify();
//   }, []);

//   // Dynamically render file upload fields
//   const documents = [
//     { name: 'doc1File', label: 'Business License Proof', statusKey: 'doc1Status', imageKey: 'doc1File' },
//     { name: 'doc2File', label: 'Certificate Of Insurance', statusKey: 'doc2Status', imageKey: 'doc2File' },
//     { name: 'doc3File', label: 'Change Order Process Acknowledgement', statusKey: 'doc3Status', imageKey: 'doc3File' },
//     { name: 'doc4File', label: 'Direct Deposit Authorization', statusKey: 'doc4Status', imageKey: 'doc4File' },
//     { name: 'doc5File', label: 'Drug Free Work Place', statusKey: 'doc5Status', imageKey: 'doc5File' },
//     { name: 'doc6File', label: 'I-9 Employment Verification', statusKey: 'doc6Status', imageKey: 'doc6File' },
//     { name: 'doc7File', label: 'Lien Waivers & Releases', statusKey: 'doc7Status', imageKey: 'doc7File' },
//     { name: 'doc8File', label: 'Material Procurement Agreement', statusKey: 'doc8Status', imageKey: 'doc8File' },
//     { name: 'doc9File', label: 'Non Compete Agreement', statusKey: 'doc9Status', imageKey: 'doc9File' },
//     { name: 'doc10File', label: 'OSHA Certification', statusKey: 'doc10Status', imageKey: 'doc10File' },
//     { name: 'doc11File', label: 'Job Expectation', statusKey: 'doc11Status', imageKey: 'doc11File' },
//   ];

//   return (
//     <>
//       {loading ? (
//         <Spinner size="lg" className="m-auto bg-black dark:bg-white" />
//       ) : (
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(validationProof)}>
//             <div className="main-form">
//               {/* Legal and Licensing Information */}
//               <Separator />

//               <div className="mb-3 mt-5 grid grid-cols-2 gap-5 px-5">
//                 {documents.map((doc, index) => (
//                   <div key={doc.name}>
//                     <FileUploadField
//                       name={doc.name}
//                       label={doc.label}
//                       form={form}
//                       formFieldCheck={formFieldCheck}
//                       index={index}
//                       statusKey={doc.statusKey}
//                       imageKey={doc.imageKey}
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* Submit Button */}
//               <div className="px-5 pb-4 text-end">
//                 <Button
//                   type="submit"
//                   className="rounded-6 button-bg my-3 h-10 w-40 py-3 text-base font-semibold !text-white transition-transform duration-100 hover:scale-105"
//                 >
//                   {buttonLoading ? (
//                     <Spinner size="sm" className="m-auto bg-black dark:bg-white" />
//                   ) : (
//                     'Submit'
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </form>
//         </Form>
//       )}
//     </>
//   );
// };

// export default ContractorValidateProof;

// const FileUploadField = ({
//   name,
//   label,
//   form,
//   formFieldCheck,
//   index,
//   statusKey,
//   imageKey
// }) => {
//   const status = formFieldCheck?.[index]?.[statusKey];
//   const fileUrl = formFieldCheck?.[index]?.[imageKey];
//   const fileClass = status === 'approved'
//     ? 'h-12 bg-green-100 py-3 text-green-500'
//     : status === 'rejected'
//     ? 'h-12 bg-red-400 py-3'
//     : 'h-12 py-3';

//   return (
//     <div>
//       <FileUpload
//         form={form}
//         name={name}
//         label={label}
//         disable={status === 'approved'}
//         className={fileClass}
//       />
//       {fileUrl && (
//         <img
//           src={`https://crm-roofing-973d4725fb82.herokuapp.com${fileUrl}`}
//           alt={`${label} Preview`}
//           className="m-3 max-w-44"
//         />
//       )}
//     </div>
//   );
// };
