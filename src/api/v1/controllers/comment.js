import createController from '../../../utils/controller';
import commentService from '../services/commentService';

const commentController = createController(commentService);
export default commentController;
