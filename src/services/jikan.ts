import axios from 'axios';
import { JIKAN_BASE } from '../constants/api';

const client = axios.create({ baseURL: JIKAN_BASE });

export type Cancelable<T> = { promise: Promise<T>; cancel: () => void };

export function searchAnime(q: string, page: number): Cancelable<any> {
  const controller = new AbortController();
  const promise = client
    .get('/anime', { params: { q, page }, signal: controller.signal })
    .then(res => res.data);
  return { promise, cancel: () => controller.abort() };
}

export function getAnimeById(id: string, abortSignal?: AbortSignal) {
  return client.get(`/anime/${id}`, { signal: abortSignal }).then(res => res.data);
}
