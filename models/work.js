let query = require('./utils/query').query

let workTable =
`create table if not exists work(
  id VARCHAR(32) NOT NULL,
  isProblem TINYINT(1),
  problem VARCHAR(50),
  result VARCHAR(30),
  checkDate timestamp,
  state TINYINT(1),
  spotCheckId VARCHAR(32) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (spotCheckId) REFERENCES spot_check(id)
)character set = utf8;`

// 创建用户表
query(workTable)

// 注册用户
let insertData = function( value ) {
  let _sql = "insert into work(id, name,password,sex,account,factory, plant) values(UUID_SHORT(),?,?,?,?,?,?);"
  return query( _sql, value )
}



// 初始化数据
// findNumber().then((result) => {
//   if (result[0].number == 0) {

//   }
// })

module.exports={

}


