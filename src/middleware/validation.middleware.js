export const validation = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.params, ...req.query };
    let validationResults = schema.validate(data);
    if (validationResults.error) {
      let errors = validationResults.error.details.map(
        (error) => error.message
      );
      return next(new Error(errors));
    }
    return next();
  };
};
