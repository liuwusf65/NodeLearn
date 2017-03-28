/**
 * http://usejsdoc.org/
 */
var mysqlUtil = require('../utils/MysqlUtil');
var showResult = function(rows) {
	console.log(rows);
}

// 查询示例
mysqlUtil.query("SELECT 1 as test", [],showResult);

// 新规示例
var randNum = new Number(Math.random() * 100).toFixed(0);
var log = [];
log.push("TEST"+randNum);
log.push("ERROR");
log.push("20170328");
log.push("d:\\log\\20170328_ERROR_TEST"+ randNum+ ".log");
log.push(new Date());
mysqlUtil.insert("insert into log set log_name=?, log_type=?, log_time=?,log_path=?, create_time=? ", log, showResult);

// 更新示例
randNum = new Number(Math.random() * 100).toFixed(0);
var upCondition = ["TEST"+randNum,1];
mysqlUtil.insert("update log set log_name=? where id=?", upCondition, showResult);