// Creator: k6 Browser Recorder 0.6.2

import { sleep, group, check } from 'k6'
import http from 'k6/http'

export const options = { vus: 10, duration: '10s' }

export default function main() {
  let response
  let authtoken

  group('page_1 - http://nc.qaa.local.dtrts.com/#/public/auth/notloggedin', function () {
    response = http.post(
      'http://nc.qaa.local.dtrts.com/ncolrs-api/rest/users/logon',
      '{"userID":"ANNAAV02","password":"Welcome23","termToken":"noTerminalTokenRequired"}',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'content-type': 'application/json;charset=UTF-8',
          origin: 'http://nc.qaa.local.dtrts.com',
          'accept-encoding': 'gzip, deflate',
          'accept-language': 'en-US,en;q=0.9',
        },
      }
    );
    authtoken = response.json().authToken;
    check(response, {
        'is login successful': (res) => res.status == 200,
    });

    response = http.post(
      'http://nc.qaa.local.dtrts.com/ncolrs-api/rest/logbook/query/',
      '{"dealerId":55112, "logbookViewType":"SUMMARY","fieldsRequested":["logbook.batchname","logbook.batchnextstepnumber","logbook.dealalertduedate","logbook.datecreated","logbook.dateprocessed","logbook.dealerid","logbook.dmsdealid","logbook.dmsdealidstocknumber","logbook.featureid","logbook.featuredescription","logbook.hasnotes","logbook.id","logbook.lienholdername","logbook.inquiryreportslegend","logbook.logbookstatus","logbook.isarchived","logbook.ismodified","logbook.owner1name","logbook.ownerdisplayname","logbook.ownerdmvid","logbook.platenumber","logbook.notes","logbook.stocknumber","logbook.transstate","logbook.version","logbook.vin","logbook.vinsuffix","logbook.titlenumber","logbook.titlesuffix","logbook.stickernumber"],"pagination": {"startIndex": 0, "count": 50},"namedFilterGroups":[], "globalSearch":"3N1CN7APXHL833597","sortFields":[{"name":"logbook.dealalertduedate","sortAsc":false}]}',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          authorization: authtoken,
          origin: 'http://nc.qaa.local.dtrts.com',
          'accept-encoding': 'gzip, deflate',
          'accept-language': 'en-US,en;q=0.9',
        },
      }
    );
    check(response, {
        'is logbook search successful': (res) => res.status == 200,
        'is VIN validation successful': (res) => res.body.includes('3N1CN7APXHL833597'),
    })
    sleep(2.3)

    response = http.get('http://nc.qaa.local.dtrts.com/ncolrs-api/rest/users/logout', {
      headers: {
        accept: 'application/json, text/plain, */*',
        'cache-control': 'no-cache',
        'if-modified-since': 'Mon, 26 Jul 1997 05:00:00 GMT',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    check(response, {
        'is logout successful': (res) => res.status == 401,
    })

  })
}