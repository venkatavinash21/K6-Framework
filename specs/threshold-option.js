import http from 'k6/http';
import { check } from 'k6';


export const options = {
    vus: 10,
    duration: '30s',
    thresholds: {
        http_req_duration: ['p(90) < 800', 'p(95) < 900', 'p(99.9) < 1100'],
        http_req_failed: ['rate<0.01'],
        checks: ['rate>0.9'],
    }
};

export default function () {
    const url = 'http://pa.cert.local.dtrts.com/paolrs-api/rest/users/logon';
    const payload = JSON.stringify({
        "userID":"REDDAV00",
        "password":"Welcome2023",
        "termToken":"noTerminalTokenRequired",
    });

    const params = {
        headers: {
            'Content-Type' : 'application/json',
        },
    };

    const res = http.post(url, payload, params);
    check(res, {
        'is status 200': (statusCode) => statusCode.status == 200,
        'is response body has username': (res) => res.body.includes('REDDAV00'),
    });
}