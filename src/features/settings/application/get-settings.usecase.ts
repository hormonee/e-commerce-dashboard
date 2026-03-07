import { SettingsRepository } from '../domain/settings.repository';
import { Settings } from '../domain/settings.entity';

export async function getSettingsUseCase(repository: SettingsRepository): Promise<Settings> {
    return await repository.getSettings();
}
