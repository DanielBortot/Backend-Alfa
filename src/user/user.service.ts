import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { UserFF } from './entities/userFF.entity';
import { Followers } from './entities/followers.entity';
import { CreateFollowerDto } from './dto/create-follower.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository( UserFF )
    private readonly userRepository: Repository<UserFF>,

    @InjectRepository( Followers )
    private readonly followersRepository: Repository<Followers>,

    private readonly dataSource: DataSource
  ){}


  async create(createUserDto: CreateUserDto) {

    const user = this.userRepository.create( createUserDto );

    await this.userRepository.save( user );

    return user;
  }

  async followUser(id: string, createFollowerDto: CreateFollowerDto){
    const follower = this.followersRepository.create( );

    follower.userByIdFollower = createFollowerDto.idFollower;
    follower.userByIdUser = id;

    await this.followersRepository.save(follower);
  }

  async unfollowUser(idUser: string, idFollower){

    const follower = await this.followersRepository.findOne({ 
      where: { 
          userByIdUser: idUser,
          userByIdFollower: idFollower
      } 
  });

    await this.followersRepository.save(follower);
  }



  async findOne(id: string) {
    let user: UserFF


    const queryBuilder = this.userRepository.createQueryBuilder('user');

    

    queryBuilder.leftJoinAndSelect('user.IdUser', 'followers');
    queryBuilder.leftJoinAndSelect('user.IdFollower', 'followings');


    queryBuilder.where('user.id = :id', { id: id });

    user = await queryBuilder.getOne()

  
    user = await this.userRepository.findOneBy({ id: id });
    

    let followersCount = user.IdUser.length;
    let followingsCount = user.IdFollower.length;
    
    return [user, followersCount, followingsCount];

    

  }

  async update(id: string, updateUserDto: UpdateUserDto) {
  
    const { followers, followings , ...toupdate} = updateUserDto
    
    let user = await this.userRepository.preload({ id, ...toupdate });

    if( !user ) throw new NotFoundException(`User with id: ${ id } not found`);

    await this.userRepository.save( user );

    return `This action updates a #${id} user`;
  }

  
}
