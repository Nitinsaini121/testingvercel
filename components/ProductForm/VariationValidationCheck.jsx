

// export function hasValidationIssues(data) {
//   console.log('data', data);

//   if (!Array.isArray(data)) {
//     return {
//       duplicate: false,
//       skuDuplicate: false,
//       missingPrice: false,
//       missingSku: false
//     };
//   }

//   const excludeKeys = [
//     'cost',
//     'featureImage',
//     'name',
//     'price',
//     'sku',
//     'thumbnail',
//     'variationId',
//     'coverageAreaSqft',
//     'eaPerUnit',
//     'lf',
//     'rollLengthFt',
//     'rollSqft',
//     'rollWidthIn',
//     'unitsPerSq'
//   ];

//   const seenValueSet = new Set();
//   const seenSkus = new Set();

//   let hasDuplicate = false;
//   let hasDuplicateSku = false;
//   let hasMissingPrice = false;
//   let hasMissingSku = false;

//   for (const obj of data) {
//     if (!obj || typeof obj !== 'object') continue; 

//     // --- 1. Check for duplicate variation values (excluding skipped keys)
//     const values = Object.entries(obj)
//       .filter(([key, value]) =>
//         value !== '' &&
//         value !== null &&
//         value !== undefined &&
//         !excludeKeys.includes(key)
//       )
//       .map(([_, value]) => value)
//       .sort();

//     const valueKey = values.join('|');

//     if (seenValueSet.has(valueKey)) {
//       hasDuplicate = true;
//     } else {
//       seenValueSet.add(valueKey);
//     }

//     // --- 2. Check for SKU: required and must be unique
//     const sku = obj['sku'];
//     if (!sku && sku !== 0) {
//       hasMissingSku = true;
//     } else {
//       if (seenSkus.has(sku)) {
//         hasDuplicateSku = true;
//       } else {
//         seenSkus.add(sku);
//       }
//     }

//     // --- 3. Check for missing price
//     const price = obj['price'];
//     if (price === '' || price === null || price === undefined) {
//       hasMissingPrice = true;
//     }
//   }

//   return {
//     duplicate: hasDuplicate,
//     skuDuplicate: hasDuplicateSku,
//     missingPrice: hasMissingPrice,
//     missingSku: hasMissingSku,

//     //only keys also :-
//     duplicateKeys: {},
//     skuDuplicateKeys: {},
//     missingPriceKeys: {},
//     missingSkuKeys: {}
//   };
// }









export function hasValidationIssues(data) {

  if (!Array.isArray(data)) {
    return {
      duplicate: false,
      skuDuplicate: false,
      missingPrice: false,
      missingSku: false,
      duplicateKeys: {},
      skuDuplicateKeys: {},
      missingPriceKeys: {},
      missingSkuKeys: {}
    };
  }

  const excludeKeys = [
    'cost',
    'featureImage',
    'name',
    // 'price',
    'sku',
    'thumbnail',
    'variationId',
    'coverageAreaSqft',
    'eaPerUnit',
    'lf',
    'rollLengthFt',
    'rollSqft',
    'rollWidthIn',
    'unitsPerSq'
  ];

  const seenValueSet = new Map(); // use Map to track indexes
  const seenSkus = new Map();

  let hasDuplicate = false;
  let hasDuplicateSku = false;
  let hasMissingPrice = false;
  let hasMissingSku = false;

  const duplicateKeys = {};
  const skuDuplicateKeys = {};
  const missingPriceKeys = {};
  const missingSkuKeys = {};

  data.forEach((obj, index) => {
    if (!obj || typeof obj !== 'object') return;

    // 1. Duplicate variation values
    const values = Object.entries(obj)
      .filter(([key, value]) =>
        value !== '' &&
        value !== null &&
        value !== undefined &&
        !excludeKeys.includes(key)
      )
      .map(([_, value]) => value)
      .sort();

    const valueKey = values.join('|');
    if (seenValueSet.has(valueKey)) {
      hasDuplicate = true;
      const prevIndex = seenValueSet.get(valueKey);
      duplicateKeys[prevIndex] = true;
      duplicateKeys[index] = true;
    } else {
      seenValueSet.set(valueKey, index);
    }

    // 2. SKU checks
    const sku = obj['sku'];
    if (!sku && sku !== 0) {
      hasMissingSku = true;
      missingSkuKeys[index] = true;
    } else {
      if (seenSkus.has(sku)) {
        hasDuplicateSku = true;
        const prevIndex = seenSkus.get(sku);
        skuDuplicateKeys[prevIndex] = true;
        skuDuplicateKeys[index] = true;
      } else {
        seenSkus.set(sku, index);
      }
    }

    // 3. Price check
    // const price = obj['price'];
    // if (price === '' || price === null || price === undefined) {
    //   hasMissingPrice = true;
    //   missingPriceKeys[index] = true;
    // }
  });

  return {
    duplicate: hasDuplicate,
    skuDuplicate: hasDuplicateSku,
    missingPrice: hasMissingPrice,
    missingSku: hasMissingSku,
    duplicateKeys,
    skuDuplicateKeys,
    missingPriceKeys,
    missingSkuKeys
  };
}











