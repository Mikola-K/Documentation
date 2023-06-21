import { CommentDto } from './comment.dto';
import { VisitorDto } from './visitor.dto';

export interface ReviewDto {
  id: number;
  text: string;
  rating: number;
  visitor: VisitorDto;
  comments?: CommentDto[];
}
