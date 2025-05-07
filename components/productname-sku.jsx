export const createProductNameSku = (productItems = []) => {
    return productItems?.flatMap(product =>
      product?.variations?.map(variation => {
        // const sku = variation?.data?.sku?.trim()
        const sku = variation?.data?.sku

        return {
          label: sku ? `${product?.productName} (${sku})` : product?.productName,
          value: variation?.id
        }
      })
    )
  }
  