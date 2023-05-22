const sql = require('mssql')
const config = require('../config/connect')



const CloseOrden=async(id)=>{
    const pool = await sql.connect(config)
    const result= await pool.request()
        .input('OrdenId',sql.Int,id)
        .execute('closeOrden')
    return result.rowsAffected
}


const CreateTotalOrden=async(body)=>{
    const {OrdenId,VendorId,SubTotal,itbis,Total,Date,Condition,day,descuento,pendiente,pagado,forma_de_pago}=body
    const pool= await sql.connect(config)
    const result= await pool.request()
        .input('OrdenId',sql.Int,OrdenId)
        .input('VendorId',sql.Int,VendorId)
        .input('SubTotal',sql.Decimal(18,2),SubTotal)
        .input('itbis',sql.Decimal(18,2),itbis)
        .input('total',sql.Decimal(18,2),Total)
        .input('date',sql.Date,Date)
        .input('condition',sql.VarChar(50),Condition)
        .input('day',sql.Int,day)
        .input('descuento',sql.Decimal(18,2),descuento)
        .input('pendiente',sql.Decimal(18,2),pendiente)
        .input('pagado',sql.Decimal(18,2),pagado)
        .input('forma_de_pago',sql.VarChar(50),forma_de_pago)
        .execute('CreateTotalOrden')

        return result.rowsAffected
}

const CreateOrdenDetails = async (obj) => {
    const { OrdenId, flag, ProductId, Cant, Total,Itbis } = obj
    const pool = await sql.connect(config)
    const result = await pool.request()
        .input('OrdenId', sql.Int, OrdenId)
        .input('flag', sql.VarChar(50), flag)
        .input('ProductId', sql.Int, ProductId)
        .input('Cant', sql.Int, Cant)
        .input('total', sql.Decimal(18, 2), Total)
        .input('itbis',sql.Decimal(18,2),Itbis)
        .execute('CreateOrdenDetail')

    return result.rowsAffected
}

const UpdateOrdenDetail = async (obj) => {
    const { OrdenId, ProductId, Cant, Total,Itbis,flag } = obj
    const pool = await sql.connect(config)
    const result = await pool.request()
        .input('OrdenId', sql.Int, OrdenId)
        .input('ProductId', sql.Int, ProductId)
        .input('Cant', sql.Int, Cant)
        .input('total', sql.Decimal(18, 2), Total)
        .input('itbis',sql.Decimal(18,2,),Itbis)
        .input('flag',sql.VarChar(50),flag)
        .execute('UpdateOrdenDetail')
    return result.rowsAffected
}


const ShwoOrdenDetail=async(OrdenId)=>{
    const pool = await sql.connect(config)
    const result= await pool.request()
        .input('OrdenId',sql.Int,OrdenId)
        .execute('showOrdenDetail')
        return result.recordset
}


const CheckProductInOrden=async(ordenid,productid)=>{
    
    const pool= await sql.connect(config)
    const result= await pool.request()
    .input('OrdenId',sql.Int,ordenid)
    .input('ProductId',sql.Int,productid)
    .execute('CheckProductInOrden')

    return result.recordset
}



const DeleteOrden= async(id)=>{
    const pool= await sql.connect(config)
    const result= await pool.request()
        .input('id',sql.Int,id)
        .execute('deleteItemOrdenDetail')

        return result.rowsAffected
}

const CreateOrden = async () => {
    const pool = await sql.connect(config)
    const result = await pool.request().execute('InsertOrden')
    return result.rowsAffected;
}
const OrdenId = async () => {
    const pool = await sql.connect(config)
    const result = await pool.request().execute('OrdenId')
    return result.recordset
}
const SelectOrdenNoClose=async()=>{
    const pool = await sql.connect(config)
    const result= await pool.request('').execute('SelectOrdenNoClose')
    return result.recordset
}


module.exports = {
    CreateOrden,
    OrdenId,
    CreateOrdenDetails,
    CheckProductInOrden,
    UpdateOrdenDetail,
    ShwoOrdenDetail,
    DeleteOrden,
    SelectOrdenNoClose,
    CreateTotalOrden,
    CloseOrden
}