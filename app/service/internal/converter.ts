function convertArrayOfObjects(
  objectsToConvert: Array<Record<string, unknown>>,
  mapper: Record<string, string>,
  converterFn: (singleObject: Record<string, unknown>, mapper: Record<string, string>) => Record<string, unknown>,
): Array<Record<string, unknown>> {
  const result = [];
  for (const objectToConvert of objectsToConvert) {
    result.push(converterFn(objectToConvert, mapper));
  }
  return result;
}

export function convertModelToDTO(model: Record<string, unknown>, mapping: Record<string, string>): Record<string, unknown> {
  const dto = {};
  for (const [key, value] of Object.entries(mapping)) {
    dto[value] = model[key];
  }
  return dto;
}

export function convertModelsToDTOs(
  modelArr: Array<Record<string, unknown>>,
  mapper: Record<string, string>,
): Array<Record<string, unknown>> {
  return convertArrayOfObjects(modelArr, mapper, convertModelToDTO);
}

export function convertDTOtoModel(dto: Record<string, unknown>, mapping: Record<string, string>): Record<string, unknown> {
  const model = {};
  for (const [key, value] of Object.entries(mapping)) {
    model[key] = dto[value];
  }
  return model;
}

export function convertDTOsToModels(
  modelArr: Array<Record<string, unknown>>,
  mapper: Record<string, string>,
): Array<Record<string, unknown>> {
  return convertArrayOfObjects(modelArr, mapper, convertDTOtoModel);
}
