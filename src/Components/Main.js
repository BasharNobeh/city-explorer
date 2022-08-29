import react from "react";
import axios from "axios";


class Main extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lat: "",
      lon: "",

      errorFlag: false,
      quoteFlag: false,
      appear: false,
      WeatherDays: "",
    };
  }

  DataCollector = async (e) => {
    e.preventDefault();

    try {
      const myKey = "pk.52ffa2b140346333af8917296b40c4cb";
      const city = e.target.city.value;
      const link = `https://us1.locationiq.com/v1/search?key=${myKey}&q=${city}&format=json`;
      let Mydata = await axios.get(link);

      this.setState({
        name: e.target.city.value,
        lat: Mydata.data[0].lat,
        lon: Mydata.data[0].lon,

        quoteFlag: true,
        mapFlag: true,
        Day1Date: "",
        Day2Date: "",
        Day3Date: "",
        Day1Des: "",
        Day2Des: "",
        Day3Des: "",
      });
      // http://localhost:3100/weather?name=${e.target.city.value}&lon=${Mydata.data[0].lon}&lat=${Mydata.data[0].lat}`
      const server = `${process.env.REACT_APP_URL}${process.env.REACT_APP_PORT}/weather?name=${e.target.city.value}&lon=${Mydata.data[0].lon}&lat=${Mydata.data[0].lat}`;
      
      let CityData = await axios.get(server);

      CityData = CityData.data;
      

      this.setState({
        appear: true,

        Day1Date: CityData[0].date,
        Day2Date: CityData[1].date,
        Day3Date: CityData[2].date,
        Day1Des: CityData[0].description,
        Day2Des: CityData[1].description,
        Day3Des: CityData[2].description,
      });
      if (CityData[0].date == null) {
        this.setState({
          appear: false,
        });
      }
    } catch {
      this.setState({
        errorFlag: true,
      });
    }
  };

  render() {
    return (
      <>
        <form onSubmit={this.DataCollector}>
          <input
            name="city"
            placeholder="Enter The City"
            style={{
              color: "black",
              backgroundColor: "Silver",
              width: "200px",
              height: "50px",
              padding: "20px 0",
              border: "3px solid black",
              borderRadius: "20px",
              marginLeft: "20px",
            }}
          ></input>
          <button type="submit" style={{ color: "black" }}>
            Explore !{" "}
          </button>
        </form>

        {this.state.quoteFlag && (
          <h3>Here is some information about The requested Location</h3>
        )}

        <h3>
          Name : {this.state.name} <br></br>
        </h3>

        <h3> Lat : {this.state.lat} </h3>

        <h3> Lon : {this.state.lon} </h3>
        <img
          src={`https://maps.locationiq.com/v3/staticmap?key=pk.7aedc85ff3620b0d3b6865ccab5efd25&center=${this.state.lat},${this.state.lon}`}
          style={{
            backgroundcolor: "silver",
            width: "700px",
            height: "350px",
            padding: "3px 0px",
            border: "3px solid black",
            borderradius: "2px",
            marginleft: "20px",
          }}
        />
        <div>
          {this.state.appear && <h3> Weather for the Next 3 days : </h3>}
          {this.state.appear && (
            <p>
              {" "}
              Description : {this.state.Day1Des} Date :{this.state.Day1Date}
            </p>
          )}
          {this.state.appear && (
            <p>
              {" "}
              Description : {this.state.Day2Des} Date :{this.state.Day2Date}
            </p>
          )}
          {this.state.appear && (
            <p>
              {" "}
              Description : {this.state.Day3Des} Date :{this.state.Day3Date}
            </p>
          )}
        </div>

        {this.state.errorFlag && (
          <h3> Sorry ! Something Wrong Happened. Try Again please .</h3>
        )}
      </>
    );
  }
}
export default Main;
