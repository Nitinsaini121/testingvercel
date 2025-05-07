import * as Yup from 'yup'
export const ProductValidationSchema = Yup.object().shape({
  //   title: Yup.string()
  //     .required("Project Title is required")

  //     .min(5, "Minimum 5 characters are required")
  //     .max(100, "Maximum 100 characters are required"),
  //   client: Yup.string()
  //     .required("Project Client Name is required")

  //     .min(4, "Minimum 4 characters are required")
  //     .max(25, "Maximum 25 characters are required"),
  //   pm_id: Yup.object().required("Project Assign is required"),
  //   description: Yup.string()
  //     .required("Project Description is required")

  //     .min(5, "Minimum 5 characters are required")
  //     .max(5000, "Maximum 5000 characters are required"),
  //   start_date: Yup.date().required("Project Start Date is required"),

  productName: Yup.string().required('Product Name is required'),
  variations: Yup.array().of(
    Yup.object().shape({
      // price: Yup.string().required('Price is required'),
      sku: Yup.string().required('Sku is required & must be unique')
    })
  )
})
