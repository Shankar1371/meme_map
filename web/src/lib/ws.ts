let socket: WebSocket | null = null;

export function connectWS() {
  socket = new WebSocket(import.meta.env.VITE_WS_URL || 'ws://localhost:4000/ws');
}

export function onMessage(cb: (data: any) => void) {
  socket?.addEventListener('message', (e) => cb(JSON.parse(e.data)));
}
