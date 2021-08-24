// This function is the webhook's request handler.
exports = async function(payload) {
    const dateURI = decodeURIComponent(payload.query.date);
    const axios = require('axios');
    
    let options = {
      auth: {
        username: "USR_AAFM",
        password: "W6H.kYM_5w"
      },
      
      headers: {
        "Accept": "application/json"
      }
    }
    
    const res = await axios.get(`https://www.cmfchile.cl/sitio/api/fmcfm/consulta_cartola/${dateURI}/json`, options);
    
    if (res.status == 200) {
      await context.services.get("base-dte").db(database).collection("boleta-exenta").insertOne(res.data[0]);
      
      return "ok";
    }
    
    return  "No Data";
};