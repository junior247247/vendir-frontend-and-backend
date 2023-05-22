const sql=require('mssql')
const config = require('../config/connect')


const Create= async(UserId,ProductId,Stock)=>{
    let pool = await sql.connect(config)
    let result= await pool.request()
    .input('UserId',sql.Int,UserId)
    .input('ProductId',sql.Int,ProductId)
    .input('Stock',sql.Int,Stock)
    .execute('CrearStock')

    return result.recordset;
}

module.exports={
    Create
}