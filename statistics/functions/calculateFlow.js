exports = async function(event){
  function parse(str) {
    var y = str.substr(0,4),
        m = str.substr(4,2) - 1,
        d = str.substr(6,2);
    var D = new Date(y,m,d);
    return (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) ? D : 'invalid date';
  }
  
  // INTs
  event.fullDocument["NUMERO"] = parseInt(event.fullDocument["NUMERO"]);
  event.fullDocument["RUT_ADMINISTRADORA"] = parseInt(event.fullDocument["RUT_ADMINISTRADORA"]);
  event.fullDocument["RUN_FONDO"] = parseInt(event.fullDocument["RUN_FONDO"]);
  event.fullDocument["TIPO_FONDO"] = parseInt(event.fullDocument["TIPO_FONDO"]);
  event.fullDocument["NUMERO_PARTICIPES"] = parseInt(event.fullDocument["NUMERO_PARTICIPES"]);
  event.fullDocument["NUMERO_PARTICIPES_INST"] = parseInt(event.fullDocument["NUMERO_PARTICIPES_INST"]);
  
  // FLOATs
  event.fullDocument["ACTIVO_TOTAL"] = parseFloat(event.fullDocument["ACTIVO_TOTAL"]);
  event.fullDocument["INVERSION_FONDOS"] = parseFloat(event.fullDocument["INVERSION_FONDOS"]);
  event.fullDocument["CUOTAS_APORTADAS"] = parseFloat(event.fullDocument["CUOTAS_APORTADAS"]);
  event.fullDocument["CUOTAS_RESCATADAS"] = parseFloat(event.fullDocument["CUOTAS_RESCATADAS"]);
  event.fullDocument["CUOTAS_CIRCULACION"] = parseFloat(event.fullDocument["CUOTAS_CIRCULACION"]);
  event.fullDocument["VALOR_CUOTA"] = parseFloat(event.fullDocument["VALOR_CUOTA"]);
  event.fullDocument["PATRIMONIO_NETO"] = parseFloat(event.fullDocument["PATRIMONIO_NETO"]);
  event.fullDocument["REM_FIJA_SA"] = parseFloat(event.fullDocument["REM_FIJA_SA"]);
  event.fullDocument["REM_VARIABLE_SA"] = parseFloat(event.fullDocument["REM_VARIABLE_SA"]);
  event.fullDocument["GASTOS_AFECTOS"] = parseFloat(event.fullDocument["GASTOS_AFECTOS"]);
  event.fullDocument["GASTOS_NO_AFECTOS"] = parseFloat(event.fullDocument["GASTOS_NO_AFECTOS"]);
  event.fullDocument["COMISION_INVERSION"] = parseFloat(event.fullDocument["COMISION_INVERSION"]);
  event.fullDocument["COMISION_RESCATE"] = parseFloat(event.fullDocument["COMISION_RESCATE"]);
  
  // DATE
  event.fullDocument["FECHA_CARTOLA_DATE"] = parse(event.fullDocument.FECHA_CARTOLA);
  
  const params = {
    RUN_FONDO: event.fullDocument["RUN_FONDO"],
    SERIE: event.fullDocument["SERIE"],
    FECHA_CARTOLA_DATE: { $lt : event.fullDocument["FECHA_CARTOLA_DATE"] }
  }
  
  const lastStatement = await context.services.get("mongodb-atlas").db("cmf").collection("statement").find(params).sort({ FECHA_CARTOLA_DATE: -1 }).toArray();
  
  let flow = 0;
  
  if (lastStatement.length > 0) {
    flow = event.fullDocument["CUOTAS_APORTADAS"] - lastStatement[0]["CUOTAS_RESCATADAS"];
  }
  
  event.fullDocument["FLUJO_DIARIO"] = flow;
  
  const result = await context.services.get("mongodb-atlas").db("cmf").collection("statement").updateOne({ _id: event.fullDocument._id }, event.fullDocument);
  
  return {result};
};