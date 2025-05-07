// export  const generateCombinations = attributes => {
//     const result = []
//     const getCombinations = (index, current) => {
//       if (index === attributes.length) {
//         result.push([...current])
//         return
//       }

//       if (
//         !attributes[index] ||
//         !attributes[index].name ||
//         !Array.isArray(attributes[index].value)
//       ) {
//         console.error('errrror', index, attributes[index])
//         return
//       }

//       attributes[index].value.forEach(val => {
//         const newCurrent = [...current]

//         if (
//           !newCurrent.some(item => item.fieldName === attributes[index].name)
//         ) {
//           newCurrent.push({
//             fieldName: attributes[index].name,
//             defaultValue : attributes[index].defaultValue, // this must be fom the options and deffren in every
//             options: attributes[index].value.map(v => ({ label: v, value: v }))
//           })
//         }

//         getCombinations(index + 1, newCurrent)
//       })
//     }

//     getCombinations(0, [])
//     return result
//   }

export const generateCombinations = (attributes, type) => {
  if (type === 'allgen') {
    const result = []

    const getCombinations = (index, currentFields) => {
      if (index === attributes.length) {
        result.push({
          mainId: Math.floor(Math.random() * 100000), // or use a better unique ID if needed
          fieldData: [...currentFields]
        })
        return
      }

      const attr = attributes[index]

      if (!attr || !attr.name || !Array.isArray(attr.value)) {
        console.error('Invalid attribute at index', index, attr)
        return
      }

      attr.value.forEach(val => {
        const newField = {
          fieldName: attr.name,
          defaultValue: val,
          options: attr.value.map(v => ({ label: v, value: v }))
        }

        getCombinations(index + 1, [...currentFields, newField])
      })
    }

    getCombinations(0, [])
    return result
  } else {
    const result = []

    const getCombinations = (index, currentFields) => {
      if (index === attributes.length) {
        result.push({
          mainId: Math.floor(Math.random() * 100000), // or use a better unique ID if needed
          fieldData: [...currentFields]
        })
        return
      }

      const attr = attributes[index]

      if (!attr || !attr.name || !Array.isArray(attr.value)) {
        console.error('Invalid attribute at index', index, attr)
        return
      }

      attr.value.forEach(val => {
        const newField = {
          fieldName: attr.name,
          defaultValue: "",
          options: attr.value.map(v => ({ label: v, value: v }))
        }

        getCombinations(index + 1, [...currentFields, newField])
      })
    }

    getCombinations(0, [])
    return result
  }
}
