import { SettingsRepository } from '../domain/settings.repository';
import { Settings } from '../domain/settings.entity';
import { UpdateSettingsDto } from './settings.dto';

export async function updateSettingsUseCase(
    repository: SettingsRepository,
    dto: UpdateSettingsDto
): Promise<Settings> {
    return await repository.updateSettings(dto);
}
