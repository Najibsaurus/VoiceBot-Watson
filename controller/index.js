
var watson = require('../util/watson');

exports.getSynthesize = async (req, res, next) => {
  try {
  const { result } = await watson.synthesize(req.query.text);
  const transcript = result;
  transcript.on('response', response => {
    console.log('query : ' + req.query);
    if (req.query.download) {
      response.headers[
        'content-disposition'
      ] = `attachment; filename=transcript.${getFileExtension(
        req.query.accept
      )}`;
    }
  });
  transcript.on('error', next);
  transcript.pipe(res);
} catch (error) {
  console.log('error : ', error);
}
}
