const createError = require('./createError');

function validateName(name) {
  if (!name) return createError('badRequest', '"name" is required');
  if (name.length < 5) {
    return createError(
      'unprocessableEntity',
      '"name" length must be at least 5 characters long',
    );
  }

  return { error: null };
}

module.exports = validateName;