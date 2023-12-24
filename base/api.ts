import type { FileInfo } from '@type/nas.ts';
import { API_URL } from '@constants/env.ts';

export const uploadFile = async (body: FormData) => await fetch(`${API_URL}/resources/hpc/upload`, { method: 'POST', body });
export const listFiles = async () => await (await fetch(`${API_URL}/resources/hpc`)).json() as FileInfo[];
export const deleteFile = async (url: string) => await fetch(url, { method: 'DELETE' });
