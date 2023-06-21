import { VisitorDto } from './visitor.dto';

export interface CommentDto {
  id: number;
  text: string;
  visitor: VisitorDto;
}
