import { mocks } from './mock';

interface Events {
  [key: string]: Function[];
}

declare function GetParentResourceName(): string;

const events: Events = {};

async function fetchWithTimeout(resource: string, options: any = {}): Promise<Response> {
  const { timeout = 15000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
}

async function fetchWithRetries(resource: string, options: any = {}, retries: number = 1): Promise<Response> {
  try {
    return await fetchWithTimeout(resource, options);
  } catch (error: any) {
    if (error.name === 'AbortError' && retries > 0) {
      console.log(`Request Failed due to timeout: ${resource}`);
      return fetchWithRetries(resource, options, retries - 1);
    }
  }

  return new Response(null, {
    status: 408,
    statusText: 'Request Timeout',
    headers: {
      'Content-Length': '0',
    },
  });
}

async function post(event: string, data = {}): Promise<any> {
  if (!import.meta.env.PROD) {
    if (!mocks[event]) return;

    return mocks[event](data);
  }

  const url = `https://${GetParentResourceName()}/${event}`;

  const response = await fetchWithRetries(
    url,
    {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
    },
    5,
  );

  return response.json();
}

function onEvent(type: string, func: any): void {
  if (!events[type]) {
    events[type] = [];
  }

  // Evitar múltiplos registros do mesmo callback
  if (!events[type].includes(func)) {
    events[type].push(func);
  } else {
    console.log(`[Nui] Event ${type} is already registered with this callback.`);
  }
}

function offEvent(type: string, func: any): void {
  if (!events[type]) return;

  // Remove o callback específico
  events[type] = events[type].filter((callback) => callback !== func);

  // Remove o evento completamente se não houver mais callbacks
  if (events[type].length === 0) {
    delete events[type];
  }
}

function emitEvent(type: string, payload: any): void {
  window.dispatchEvent(
    new MessageEvent('message', {
      data: { type, payload },
    }),
  );
}

const Nui = { post, onEvent, offEvent, emitEvent };

export default Nui;

export const EventListener = () => {
  window.addEventListener('message', (e: MessageEvent) => {
    const eventCallbacks = events[e.data.type];
    if (!eventCallbacks) return;

    // Chama todos os callbacks registrados para o evento
    eventCallbacks.forEach((callback) => callback(e.data.payload));
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'd') {
      Nui.post('rotate_right');
    } else if (e.key === 'a') {
      Nui.post('rotate_left');
    }
  });

  return null;
};
