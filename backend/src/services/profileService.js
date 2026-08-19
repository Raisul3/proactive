import { userRepository } from '../repositories/userRepository.js'
import { authService } from './authService.js'

export const profileService = {
  async update(userId, { name, avatarUrl }) {
    const user = await userRepository.update(userId, {
      ...(name && { name }),
      ...(avatarUrl && { avatarUrl }),
    })
    return authService.toPublicUser(user)
  },
}
