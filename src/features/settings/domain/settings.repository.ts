import { Settings } from './settings.entity';

export interface SettingsRepository {
    getSettings(): Promise<Settings>;
    updateSettings(data: Partial<Settings>): Promise<Settings>;
}
