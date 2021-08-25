exports = async function (fondo, serie, fechaInicio, fechaFin) {
	
	const paramsFirstStatement = {
    RUN_FONDO: fondo,
    SERIE: serie,
    FECHA_CARTOLA_DATE: { $lt : fechaInicio }
  };
  
	const paramsSecondStatement = {
    RUN_FONDO: fondo,
    SERIE: serie,
    FECHA_CARTOLA_DATE: { $lt : fechaFin }
  };

  const firstStatement = await context.services.get("mongodb-atlas").db("cmf").collection("statement").findOne(paramsFirstStatement);
	const secondStatement = await context.services.get("mongodb-atlas").db("cmf").collection("statement").findOne(paramsSecondStatement);
  
	return { firstStatement, secondStatement }

  // let flow = 0;
  
  // if (lastStatement.length > 0) {
  //   flow = event.fullDocument["CUOTAS_APORTADAS"] - lastStatement[0]["CUOTAS_RESCATADAS"];
  // }
  
  // event.fullDocument["FLUJO_DIARIO"] = flow;
  
  // const result = await context.services.get("mongodb-atlas").db("cmf").collection("statement").updateOne({ _id: event.fullDocument._id }, event.fullDocument);
  
  // return {result};
	

	// SECOND QUERY
	// const params = [
	// 	{
	// 		$match: {
	// 			FECHA_CARTOLA_DATE: {
	// 				$and: [
	// 					{ $gte: ISODate('2021-07-25') },
	// 					{ $lt: ISODate('2021-07-26') }
	// 				]
	// 			}
	// 		}
	// 	},
	// 	{
	// 		$limit: 1
	// 	}
	// ];

	// const statements = await context.services.get("mongodb-atlas").db("cmf").collection("statement")
	// 	.aggregate(params)
	// 	.toArray();

	// console.log(statements);

	// return
}