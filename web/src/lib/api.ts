const API_BASE = import.meta.env.VITE_API_URL || '';

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(API_BASE + url, options);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export function fetchMemes() {
  return fetchJSON<any[]>('/memes?bbox=-180,-90,180,90&mode=new');
}

export function fetchMeme(id: string) {
  return fetchJSON(`/memes/${id}`);
}

export function uploadMeme(data: { file: File; text_top: string; text_bottom: string; lat: number; lng: number }) {
  const form = new FormData();
  form.append('image', data.file);
  form.append('text_top', data.text_top);
  form.append('text_bottom', data.text_bottom);
  form.append('lat', String(data.lat));
  form.append('lng', String(data.lng));
  return fetchJSON('/memes', { method: 'POST', body: form });
}

export function voteMeme(id: string, value: number) {
  return fetchJSON(`/memes/${id}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value }),
  });
}

export function fetchComments(id: string) {
  return fetchJSON(`/memes/${id}/comments`);
}

export function postComment(id: string, body: string) {
  return fetchJSON(`/memes/${id}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ body }),
  });
}

export function reportMeme(id: string, reason: string) {
  return fetchJSON(`/memes/${id}/report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reason }),
  });
}
