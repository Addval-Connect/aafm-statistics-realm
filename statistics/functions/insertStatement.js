exports = async function(statement){
  function parse(str) {
    var y = str.substr(0,4),
        m = str.substr(4,2) - 1,
        d = str.substr(6,2);
    var D = new Date(y,m,d);
    return (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) ? D : 'invalid date';
  }
  
  // INTs
  statement["NUMERO"] = parseInt(statement["NUMERO"]);
  statement["RUT_ADMINISTRADORA"] = parseInt(statement["RUT_ADMINISTRADORA"]);
  statement["RUN_FONDO"] = parseInt(statement["RUN_FONDO"]);
  statement["TIPO_FONDO"] = parseInt(statement["TIPO_FONDO"]);
  statement["NUMERO_PARTICIPES"] = parseInt(statement["NUMERO_PARTICIPES"]);
  statement["NUMERO_PARTICIPES_INST"] = parseInt(statement["NUMERO_PARTICIPES_INST"]);
  
  // FLOATs
  statement["ACTIVO_TOTAL"] = parseFloat(statement["ACTIVO_TOTAL"]);
  statement["INVERSION_FONDOS"] = parseFloat(statement["INVERSION_FONDOS"]);
  statement["CUOTAS_APORTADAS"] = parseFloat(statement["CUOTAS_APORTADAS"]);
  statement["CUOTAS_RESCATADAS"] = parseFloat(statement["CUOTAS_RESCATADAS"]);
  statement["CUOTAS_CIRCULACION"] = parseFloat(statement["CUOTAS_CIRCULACION"]);
  statement["VALOR_CUOTA"] = parseFloat(statement["VALOR_CUOTA"]);
  statement["PATRIMONIO_NETO"] = parseFloat(statement["PATRIMONIO_NETO"]);
  statement["REM_FIJA_SA"] = parseFloat(statement["REM_FIJA_SA"]);
  statement["REM_VARIABLE_SA"] = parseFloat(statement["REM_VARIABLE_SA"]);
  statement["GASTOS_AFECTOS"] = parseFloat(statement["GASTOS_AFECTOS"]);
  statement["GASTOS_NO_AFECTOS"] = parseFloat(statement["GASTOS_NO_AFECTOS"]);
  statement["COMISION_INVERSION"] = parseFloat(statement["COMISION_INVERSION"]);
  statement["COMISION_RESCATE"] = parseFloat(statement["COMISION_RESCATE"]);
  
  // DATE
  statement["FECHA_CARTOLA_DATE"] = parse(statement.FECHA_CARTOLA);
  
  res = await context.services.get("mongodb-atlas").db("cmf").collection("statement").updateOne(
    { 
      RUT_ADMINISTRADORA: statement["RUT_ADMINISTRADORA"],
      RUN_FONDO: statement["RUN_FONDO"],
      SERIE: statement["SERIE"],
      FECHA_CARTOLA: statement["FECHA_CARTOLA"]
    }, 
    statement, 
    { 
      upsert: true 
    });
  
  return {res};
};