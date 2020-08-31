const API_URL = 'http://localhost:3333/api';

function generateHeaders() {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  return headers;
}

async function post(endpoint, body) {
  const request = new Request(`${API_URL}/${endpoint}`, {
    method: 'POST',
    headers: generateHeaders(),
    body: JSON.stringify(body)
  });

  const response = await fetch(request);

  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    const responseBody = await response.json();
    return [response, responseBody];
  }

  return [response, null];
}

async function get(endpoint, params = {}) {
  const url = `${API_URL}/${endpoint}`;
  const searchParams = new URLSearchParams();

  for (const key in params) {
    searchParams.append(key, params[key]);
  }

  const request = new Request(`${url}?${searchParams.toString()}`, {
    method: 'GET',
    headers: generateHeaders()
  });

  const response = await fetch(request);

  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    const responseBody = await response.json();
    return [response, responseBody];
  }

  return [response, null];
}

export default {
  post,
  get
};
