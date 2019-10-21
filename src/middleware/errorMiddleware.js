import { handleError } from '../utils/error';

export default function errorMiddlware(error, req, resp, next) {
  handleError(error, resp);
}
