import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProfileUseCase } from '../use-cases/CreateProfile';
import { DeleteProfileUseCase } from '../use-cases/DeleteProfile';
import { FindOneProfileUseCase } from '../use-cases/FindOneProfile';
import { UpdateProfileUseCase } from '../use-cases/UpdateProfile';

export class ProfilesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { name, avatar, bio, link } = request.body;

    const createProfileUseCase = container.resolve(CreateProfileUseCase);

    await createProfileUseCase.execute({
      user_id,
      name,
      avatar,
      bio,
      link,
    });

    return response.status(201).send();
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { name, avatar, bio, link } = request.body;

    const updateProfileUseCase = container.resolve(UpdateProfileUseCase);

    await updateProfileUseCase.execute({
      user_id,
      name,
      avatar,
      bio,
      link,
    });

    return response.status(201).send();
  }

  async findOne(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const findOneProfileUseCase = container.resolve(FindOneProfileUseCase);

    const profile = await findOneProfileUseCase.execute({
      username,
    });

    return response.send(profile);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const deleteProfileUseCase = container.resolve(DeleteProfileUseCase);

    await deleteProfileUseCase.execute({ user_id });

    return response.status(204).send();
  }
}
