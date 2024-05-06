import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from '../application/post.service';
import { OrmPostRepository } from './repositories/ormPost.repository';
import { DatabaseSingleton } from 'src/database/database.singleton';

@ApiTags('Post')
@Controller('post')
export class PostController {
    private postService: PostService;

    constructor(){
        this.postService = new PostService( new OrmPostRepository(DatabaseSingleton.getInstance()))
    }

    @Get("/")
    async findAllPosts(){
        return this.postService.findAllPosts()
    }

    @Get("/:id")
    async findOnePost(@Param('id', ParseUUIDPipe) id: string){
        return this.postService.findOnePost(id)
    };
    
    
  }

