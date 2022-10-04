export const formDataToJSON = (formData: FormData) => {
  const json: any = {};
  formData.forEach((value, key) => (json[key] = value));
  return json;
};
