/**
 * http://usejsdoc.org/
 */
var mysql = require('mysql');
var async = require('async');

var pool = mysql.createPool({
	connectionLimit : 10,
	host : '192.170.12.106',
	user : 'test1',
	password : 'test1',
	database : 'gwdb'
});

var myModuleUtil = {
	query : function(sql, values, callback) {
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			} else {
				connection.query(sql, function(err, rows, fields) {
					if (err) {
						throw err;
					} else {
						console.log('Query Successly SQL: ' + sql);
						result = JSON.parse(JSON.stringify(rows));
						callback(result);
					}
				});
			}
			connection.release();

		});
	},
	insert : function(sql, values, callback) {
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			} else {
				connection.query(sql, values, function(err, rows, fields) {
					if (err) {
						throw err;
					} else {
						console.log('Query Successly SQL: ' + sql);
						result = JSON.parse(JSON.stringify(rows));
						callback(result.affectedRows);
					}
				});
			}
			connection.release();

		});
	},
	update : function(sql, values, callback) {
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			} else {
				connection.query(sql, values, function(err, rows, fields) {
					if (err) {
						throw err;
					} else {
						console.log('Query Successly SQL: ' + sql);
						result = JSON.parse(JSON.stringify(rows));
						callback(result.affectedRows);
					}
				});
			}
			connection.release();

		});
	},
	queryAysnc : function(sql, callback) {
		var tasks = [ function(callback) {
			pool.getConnection(function(err, connection) {
				if (err) {
					console.error('error connecting: ' + err.stack);
					return;
				} else {
					connection.query(sql, function(err, rows, fields) {
						if (err) {
							throw err;
						} else {
							console.log('Query Successly SQL: ' + sql);
							result = JSON.stringify(rows);
							callback(err, result);
						}
					});
				}
				connection.release();

			});
		} ];
		async.series(tasks, function(err, results) {
			if (err) {
				console.error('error async: ' + err);
			} else {
				callback(results);
			}
		})
	}
}

module.exports = myModuleUtil;