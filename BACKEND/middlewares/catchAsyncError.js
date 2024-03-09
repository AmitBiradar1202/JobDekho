export const catchAsyncErrors = (UserERRORS) => {
    return (req, res, next) => {
      Promise.resolve(UserERRORS(req, res, next)).catch(next);
    };
  };