import axios from "axios";

var weatherService = {endpoint: "https://meteostat.p.rapidapi.com" }


weatherService.getByDate = (lat, long, startDate, endDate) => 
{
    const config = 
    {
      method: "GET",
      url: `${weatherService.endpoint}${"/point/daily"}`,
      params: {
        lat: lat,
        lon: long,
        start: startDate,
        end: endDate,
      },
      crossdomain: true,
      headers: {
        "Content-Type": "application/json",
        'X-RapidAPI-Key': 'a3b61823bfmsh4063c87eb310f40p1a5bfcjsna55fb638a60a',
        'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
      }
    };
  
    return axios(config)
      .then((response) => 
      {
        return response;
      });
}
    

export default weatherService;