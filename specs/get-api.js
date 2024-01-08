import http from 'k6/http';
import { sleep } from 'k6';

// init
export const options = {
    executor: 'per-vu-iterations', // we can have two use-cases 1.shared-iterations 2.per-vu-iterations
    vus: 10,
    iterations: 100,
    duration: '30s',
};

// script (bussiness logic)
export default function () {
    http.get('https://k6.io');
    sleep(1);
}
