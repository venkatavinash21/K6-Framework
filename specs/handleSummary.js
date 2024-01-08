import http from 'k6/http';

export default function () {
  http.get('https://test.k6.io');
}

export function handleSummary(data) {
  return {
    'summary.json': JSON.stringify(data), //the default data object
  };
}
