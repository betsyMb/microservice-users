// Nest
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Services
import { UserService } from './user.service';

// DTO
import { UserDTO } from './dto/user.dto';

// Constants
import { UserMSG } from 'src/common/constants';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMSG.CREATE)
  create(@Payload() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

  @MessagePattern(UserMSG.FIND_ALL)
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern(UserMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.userService.findOne(id);
  }

  @MessagePattern(UserMSG.UPDATE)
  update(@Payload('id') payload: any) {
    return this.userService.update(payload.id, payload.userDTO);
  }

  @MessagePattern(UserMSG.DELETE)
  delete(@Payload() id: string) {
    return this.userService.delete(id);
  }

  @MessagePattern(UserMSG.VALID_USER)
  async validateUser(@Payload() payload: any) {
    const user = await this.userService.findByUsername(payload.username);

    const isValidaPassword = await this.userService.checkPassword(
      payload.password,
      user.password,
    );

    if (user && isValidaPassword) return user;

    return null;
  }
}
