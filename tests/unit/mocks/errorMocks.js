const notFoundError = {
  status: 404,
  body: { message: "Produto não encontrado" },
};

module.exports = { notFoundError };
