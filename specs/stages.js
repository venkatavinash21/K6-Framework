import http from 'k6/http';
import { check } from 'k6';


export const options = {
    stages: [
        { duration: "30s", target: 25 },
        { duration: "1m", target: 50 },
        { duration: "20s", target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(90) < 2400', 'p(95) < 3000', 'p(99.9) < 3500'],
        'http_req_duration{type:login}' : ['p(95) < 300'],
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

    const pa_response = http.get("http://pa.cert.local.dtrts.com/", {tags: {type: 'login'}});
    check(pa_response, {
        'is status 200': (statusCode) => statusCode.status ==200,
    })

    const res = http.post(url, payload, params);
    check(res, {
        'is status 200': (statusCode) => statusCode.status == 200,
        'is response body has username': (res) => res.body.includes('REDDAV00'),
    });
}