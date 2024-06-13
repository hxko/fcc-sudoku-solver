const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  // #1
  test('Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
    chai
      .request(server)
      .post('/api/solve')
      .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.solution, '769235418851496372432178956174569283395842761628713549283657194516924837947381625');
        done();
      });
  });

  // #2
  test('Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
    chai
      .request(server)
      .post('/api/solve')
      .send({ puzzle: '' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field missing');
        done();
      });
  });

  // #3
  test('Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
    chai
      .request(server)
      .post('/api/solve')
      .send({ puzzle: 'xxxxx2.4.6...7.9.3.5..5.9.6..6..5.3..9.7...8.7.1...9.5..1.9.3....8.6.2..5.2.4.8..5' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid characters in puzzle');
        done();
      });
  });

  // #4
  test('Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
    chai
      .request(server)
      .post('/api/solve')
      .send({ puzzle: '123456789' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
        done();
      });
  });

  // #5
  test('Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
    chai
      .request(server)
      .post('/api/solve')
      .send({ puzzle: '119..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Puzzle cannot be solved');
        done();
      });
  });

  // #6
  test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {
    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle: '769235418851496372432178956174569283395842761628713549283657194516924837947381625', coordinate: 'A1', value: '7' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isTrue(res.body.valid); // Assert that valid is true (boolean)
        done();
      });
  });


  // #7
  test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle: '769235418851496372432178956174569283395842761628713549283657194516924837947381625', coordinate: 'A1', value: '2' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isArray(res.body.conflict); // Assert that conflict is an array
        assert.include(res.body.conflict, 'row'); // Assert that conflict includes row
        done();
      });
  });

  // #8
  test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {
    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle: '769235418851496372432178956174569283395842761628713549283657194516924837947381625', coordinate: 'A1', value: '5' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isArray(res.body.conflict); // Assert that conflict is an array
        assert.include(res.body.conflict, 'row'); // Assert that conflict includes row
        assert.include(res.body.conflict, 'column'); // Assert that conflict includes column
        done();
      });
  });

  // #9
  test('Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {
    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle: '769235418851496372432178956174569283395842761628713549283657194516924837947381625', coordinate: 'A1', value: '3' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isArray(res.body.conflict); // Assert that conflict is an array
        assert.include(res.body.conflict, 'row'); // Assert that conflict includes row
        assert.include(res.body.conflict, 'column'); // Assert that conflict includes column
        assert.include(res.body.conflict, 'region'); // Assert that conflict includes region
        done();
      });
  });

  // #10
  test('Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {
    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle: '119..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      })
  });

  // #11
  test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle: 'xxx..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', coordinate: 'A1', value: '7' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid characters in puzzle');
        done();
      })
  })

  // #12
  test('Check a puzzle placement with incorrect length: POST request to /api/check', (done) => {
    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle: '123456789', coordinate: 'A1', value: '7' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
        done();
      })
  });

  // #13
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {
    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle: '119..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', coordinate: 'Z1', value: '7' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid coordinate');
        done();
      })
  });

  // #14
  test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle: '119..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', coordinate: 'A1', value: 'A' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid value');
        done();
      })
  });
});
