var generalResponse = {
  responseBody: function () {
    return {
      message: 'invalid data',
      error: true
    }
  },
  responseStatus: {
    success: 200,
    notFound: 404,
    exception: 500,
    notAuth: 401
  },
  responseHeaders: {
    contentType: 'application/json'
  }
};

module.exports = generalResponse;