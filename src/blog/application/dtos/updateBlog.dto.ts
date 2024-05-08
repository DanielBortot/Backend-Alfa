import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from '../dtos/createBlog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}
