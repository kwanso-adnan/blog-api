import { Comment } from '../../../db/models';
import createController from '../../../utils/controller';

const commentController = createController(Comment);
export default commentController;
