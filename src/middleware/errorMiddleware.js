import handleError from '../utils/errorHandler';

export default function errorMiddlware(error, req, resp, next) {
  handleError(error, resp);
}
