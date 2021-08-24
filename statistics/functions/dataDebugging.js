exports = async function(event){

    const params = [
        {
            $match: {
                FECHA_CARTOLA_DATE: {
                    $and: [
                        { $gte: ISODate('2021-07-25')},
                        { $lt: ISODate('2021-07-26')}
                    ]
                }
            }
        },
        {
            $limit: 1
        }
    ];

    const statements = await context.services.get("mongodb-atlas").db("cmf").collection("statement")
        .aggregate(params)
        .toArray();

    console.log(statements);

    return
}