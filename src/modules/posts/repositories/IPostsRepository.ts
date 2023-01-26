import { CreatePostDto } from '../dtos/createPostDto';
import { DeletePostDto } from '../dtos/deletePostDto';
import { FindManyPostsDto } from '../dtos/findManyPostsDto';
import { FindOnePostDto } from '../dtos/findOnePostDto';
import { Post } from '../entities/Post';

export interface IPostsRepository {
  create: (createPostDto: CreatePostDto) => Promise<void>;
  delete: (deletePostDto: DeletePostDto) => Promise<void>;
  findOne: (findOnePostDto: FindOnePostDto) => Promise<Post | null>;
  findMany: (findManyPostsDto: FindManyPostsDto) => Promise<Post[]>;
}
