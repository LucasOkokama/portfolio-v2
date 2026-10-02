import { hasLocale } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { defaultLocale, routing } from '@/i18n/routing';
import type { ILocalizedText } from '@/types/profile.type';
import { getAppLocale, localize, localizeAll } from './localize';

vi.mock('next-intl/server', () => ({
  getLocale: vi.fn(),
}));

vi.mock('next-intl', () => ({
  hasLocale: vi.fn(),
}));

describe('localize', () => {
  const value: ILocalizedText = {
    en: 'Hello',
    pt: 'Olá',
  };

  it('returns the text for the requested locale', () => {
    expect(localize(value, 'pt')).toBe('Olá');
    expect(localize(value, 'en')).toBe('Hello');
  });

  it('falls back to the default locale when the requested locale is unavailable', () => {
    const valueWithoutPt = {
      en: 'Hello',
    } as ILocalizedText;

    expect(localize(valueWithoutPt, 'pt')).toBe(valueWithoutPt[defaultLocale]);
  });

  it('returns the default locale when the requested value is empty', () => {
    const valueWithEmptyPt: ILocalizedText = {
      en: 'Hello',
      pt: '',
    };

    expect(localize(valueWithEmptyPt, 'pt')).toBe('Hello');
  });
});

describe('localizeAll', () => {
  const values: ILocalizedText[] = [
    {
      en: 'Hello',
      pt: 'Olá',
    },
    {
      en: 'Welcome',
      pt: 'Bem-vindo',
    },
  ];

  it('localizes all values using the provided locale', () => {
    expect(localizeAll(values, 'pt')).toEqual(['Olá', 'Bem-vindo']);

    expect(localizeAll(values, 'en')).toEqual(['Hello', 'Welcome']);
  });

  it('returns an empty array when given an empty array', () => {
    expect(localizeAll([], 'pt')).toEqual([]);
  });
});

describe('getAppLocale', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns the current locale when it is valid', async () => {
    vi.mocked(getLocale).mockResolvedValue('pt');
    vi.mocked(hasLocale).mockReturnValue(true);

    await expect(getAppLocale()).resolves.toBe('pt');

    expect(getLocale).toHaveBeenCalledOnce();
    expect(hasLocale).toHaveBeenCalledWith(routing.locales, 'pt');
  });

  it('throws an error when the current locale is invalid', async () => {
    vi.mocked(getLocale).mockResolvedValue('invalid');
    vi.mocked(hasLocale).mockReturnValue(false);

    await expect(getAppLocale()).rejects.toThrow('Invalid locale: invalid');

    expect(getLocale).toHaveBeenCalledOnce();
    expect(hasLocale).toHaveBeenCalledWith(routing.locales, 'invalid');
  });
});
