const sql=require('mssql')
const config = require('../config/connect')

const Create=async(body)=>{
    const {name,cedula,adress,telefono,userId} =body
    const pool = await sql.connect(config)
    const result= await pool.request()
        .input('name',sql.VarChar(50),name)
        .input('cedula',sql.VarChar(50),cedula)
        .input('adress',sql.VarChar(50),adress)
        .input('telefono',sql.VarChar(50),telefono)
        .input('userId',sql.Int,userId).execute('CreateVendor')
        return result.rowsAffected
}




const List=async(from,limite)=>{
    const pool= await sql.connect(config)
    const result= await pool.request()
        .input('from',sql.Int,from)
        .input('limit',sql.Int,limite)
        .execute('ShowVendor')
        return result.recordset
}
const CreateVendorAndRoute= async(body)=>{
    const  {VendorId,RutaId}=body
    const pool = await sql.connect(config)
    const result= await pool.request()
        .input('VendorId',sql.Int,VendorId)
        .input('RutaId',sql.Int,RutaId)
        .execute('CreateRutaAndVendor')

        return result.rowsAffected
}
const VendorId=async()=>{
    const pool= await sql.connect(config)
    const result= await pool.request().execute('VendorId')
    return result.recordset
}

module.exports={
    Create,
    VendorId,
    CreateVendorAndRoute,
    List
}