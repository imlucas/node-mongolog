var assert = require('assert'),
    log    = require('./..');

describe('parse', function() {
  // query operation
  it('should match parse the query operation fields', function() {
    var lines = [
      '2014-06-02T14:26:48.300-0400 [initandlisten] command admin.system ' +
        'planSummary: EOF ntoreturn:0 ntoskip:0 nscanned:0 nscannedObjects:0 ' + 
        'keyUpdates:0 numYields:0 locks(micros) W:2347 r:243 nreturned:30000 ' +
        'reslen:20 nmoved:11 ninserted:100 900000ms',
      '2014-06-02T14:27:48.300-0400 [TTLMonitor] query admin.system.indexes ' +
        'query: { expireAfterSeconds: { $exists: true } } planSummary: EOF ' +
        'ntoreturn:9 ntoskip:9 nscanned:99 nscannedObjects:0 keyUpdates:9001 ' + 
        'numYields:9999 locks(micros) w:1111 R:568 nreturned:0 reslen:20 ' + 
        'nmoved:11 ndeleted:100 nupdated:1000 0ms'
    ],
    expected = [
      {
        W: 2347,
        collection: 'system',
        database: 'admin',
        duration: 900000,
        keyUpdates: 0,
        namespace: 'admin.system',
        ninserted: 100,
        nmoved: 11,
        nreturned: 30000,
        nscanned: 0,
        nscannedObjects: 0,
        ntoskip: 0,
        ntoreturn: 0,
        numYields: 0,
        operation: 'command',
        r: 243,
        reslen: 20
      },
      {
        R: 568,
        collection: 'system.indexes',
        database: 'admin',
        duration: 0,
        keyUpdates: 9001,
        namespace: 'admin.system.indexes',
        ndeleted: 100,
        nmoved: 11,
        nreturned: 0,
        nscanned: 99,
        nscannedObjects: 0,
        ntoskip: 9,
        ntoreturn: 9,
        nupdated: 1000,
        numYields: 9999,
        operation: 'query',
        reslen: 20,
        w: 1111
      }
    ];
    res = log.parse(lines);

    for (var i = 0; i < lines.length; i++)
      for (key in expected[i])
        assert.equal(res[i][key], expected[i][key]);
  });
});