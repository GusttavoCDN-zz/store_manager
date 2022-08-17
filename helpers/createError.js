function createError(code, message) {
  return {
    error: {
      code,
      message,
    },
  };
}

module.exports = createError;
