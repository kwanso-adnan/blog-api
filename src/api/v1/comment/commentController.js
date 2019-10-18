import createController from '../../../utils/controller';
import commentService from './commentService';

const commentController = createController(commentService);
export default commentController;
