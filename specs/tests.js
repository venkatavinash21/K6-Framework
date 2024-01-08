import http from 'k6/http';
import { sleep } from 'k6';


//SMOKE TEST - Will test whether the api is up and running and test the API for minimal load
export const smoketest_options = {
  vus: 10,
  duration: '30s',
};

//LOAD TEST/PERFORMAnCE TEST - Will test the current performance of the system and typical or peak load
export const loadtest_options = {
    stages: [
        { duration: "20s", target: 100 }, // typical load
        { duration: "1m", target: 1000 }, // peak load
        { duration: "20s", target: 5 }, //Recover stage
    ],
};

//STRESS TEST
//stress test is to make sure the system is stable under extreme conditions
//To find maximum capacity in the form of users and throughput
//To find the breaking point of the system
// and the last one is whether the system recover without any manual intervention if something goes wrong
export const stresstest_options = {
    stages: [
        { duration: "2m", target: 100 }, // below normal load
        { duration: "5m", target: 100 },
        { duration: "2m", target: 200 }, // normal load
        { duration: "5m", target: 200 },
        { duration: "2m", target: 300 }, // around the breaking point
        { duration: "5m", target: 300 },
        { duration: "2m", target: 400 }, // beyond the breaking point
        { duration: "5m", target: 400 },
        { duration: "10m", target: 0 }, // scale down, recovery stage
    ],
};

//SOAK TEST - is nothing nut reliability of the system for the long period
//To check whether the system is suffering from bugs, memory leaks or even crashes
//Example problems - DB exhaust, Expect application restart, Disk issues if we log something for the API's
export const soaktest_options = {
    stages: [
        { duration: "2m", target: 350 }, //ramp-up the system to 400 users (~ around breaking point)
        { duration: "3h56m", target: 400 }, //stay at 400(~breaking point) for ~4 hours
        { duration: "2m", target: 0 }, // scale down
    ],
};

export default function () {
  http.get('http://test.k6.io');
  sleep(1);
}