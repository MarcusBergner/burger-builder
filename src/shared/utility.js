/**
 * is a named export, if you w'll import that you need curley braces!
 * this utility-function expect an object
 * @param {*} oldObject
 * @param {*} updatedProperties
 *
 */
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
