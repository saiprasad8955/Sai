let axios = require("axios");

let getStates = async function (req, res) {
  try {
    let options = {
      method: "get",
      url: "https://cdn-api.co-vin.in/api/v2/admin/location/states",
    };
    let result = await axios(options);
    // console.log(result);
    let data = result.data;
    res.status(200).send({ msg: data, status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

let getDistricts = async function (req, res) {
  try {
    let id = req.params.stateId;
    let options = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`,
    };
    let result = await axios(options);
    // console.log(result);
    let data = result.data;
    res.status(200).send({ msg: data, status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

let getByPin = async function (req, res) {
  try {
    let pin = req.query.pincode;
    let date = req.query.date;
    console.log(`query params are: ${pin} ${date}`);
    var options = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`,
    };
    let result = await axios(options);
    // console.log(result.data);
    res.status(200).send({ msg: result.data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

let getOtp = async function (req, res) {
  try {
    let blahhh = req.body;

    console.log(`body is : ${blahhh} `);
    var options = {
      method: "post",
      url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
      data: blahhh,
    };

    let result = await axios(options);
    console.log(result.data);
    res.status(200).send({ msg: result.data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

module.exports.getByDistrictId = async function (req, res) {
  try {
    let districtId = req.query.district_id;
    let date = req.query.date;
    let options = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date}`,
    };
    let result = await axios(options);
    // console.log(result);
    res.status(200).send({ Status: true, msg: result.data });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

module.exports.CityAndTemperature = async function (req, res) {
  try {
    cityOfObjects = [];
    cities = [
      "Bengaluru",
      "Mumbai",
      "Delhi",
      "Kolkata",
      "Chennai",
      "London",
      "Moscow",
    ];

    for (const element of cities) {
      cityTemp = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${element}&appid=1b26e875f45d7594e445a31a73860306`
      );
      // console.log(ele);
      let obj = { city: element, temp: cityTemp.data.main.temp };
      cityOfObjects.push(obj);
    }
    // console.log(cityOfObjects);
    let sorted = cityOfObjects.sort((fstEle, secEle) => {
      return fstEle.temp - secEle.temp;
    });

    res.status(200).send({ status: true, data: sorted });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, msg: "server error" });
  }
};

module.exports.getMemes = async (req, res) => {
  try {
    let queryData = req.query;
    let options = {
      method: "post",
      url: `https://api.imgflip.com/caption_image?template_id=${queryData.template_id}&text0=${queryData.text0}&text1=${queryData.text1}&username=${queryData.username}&password=${queryData.password}`,
      data: queryData,
    };
    let result = await axios(options);
    // console.log(result.data);
    res.status(200).send({ status: true, msg: result.data });
  } catch (err) {
    console.log(err);
    res.send({ message: err.message });
  }
};

module.exports.getStates = getStates;
module.exports.getDistricts = getDistricts;
module.exports.getByPin = getByPin;
module.exports.getOtp = getOtp;
