import PasswordPolicy from '@rocket.chat/account-utils';
import type { SettingValue } from '@rocket.chat/core-typings';

import { settings } from '../../../settings/server';

export const passwordPolicy = new PasswordPolicy.PasswordPolicy({
	enabled: false,
	minLength: -1,
	maxLength: -1,
	forbidRepeatingCharacters: false,
	forbidRepeatingCharactersCount: 3, // the regex is this number minus one
	mustContainAtLeastOneLowercase: false, // /[A-Z]{3,}/ could do this instead of at least one
	mustContainAtLeastOneUppercase: false,
	mustContainAtLeastOneNumber: false,
	mustContainAtLeastOneSpecialCharacter: false,
	throwError: true,
});

settings.watch('Accounts_Password_Policy_Enabled', (value: SettingValue) => {
	passwordPolicy.enabled = Boolean(value);
});
settings.watch('Accounts_Password_Policy_MinLength', (value: SettingValue) => {
	passwordPolicy.minLength = Number(value);
});
settings.watch('Accounts_Password_Policy_MaxLength', (value: SettingValue) => {
	passwordPolicy.maxLength = Number(value);
});
settings.watch('Accounts_Password_Policy_ForbidRepeatingCharacters', (value: SettingValue) => {
	passwordPolicy.forbidRepeatingCharacters = Boolean(value);
});
settings.watch('Accounts_Password_Policy_ForbidRepeatingCharactersCount', (value: SettingValue) => {
	passwordPolicy.forbidRepeatingCharactersCount = Number(value);
});
settings.watch('Accounts_Password_Policy_AtLeastOneLowercase', (value: SettingValue) => {
	passwordPolicy.mustContainAtLeastOneLowercase = Boolean(value);
});
settings.watch('Accounts_Password_Policy_AtLeastOneUppercase', (value: SettingValue) => {
	passwordPolicy.mustContainAtLeastOneUppercase = Boolean(value);
});
settings.watch('Accounts_Password_Policy_AtLeastOneNumber', (value: SettingValue) => {
	passwordPolicy.mustContainAtLeastOneNumber = Boolean(value);
});
settings.watch('Accounts_Password_Policy_AtLeastOneSpecialCharacter', (value: SettingValue) => {
	passwordPolicy.mustContainAtLeastOneSpecialCharacter = Boolean(value);
});