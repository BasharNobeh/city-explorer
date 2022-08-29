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
      appear:false,
      
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
          
        name: Mydata.data[0].display_name,
        lat: Mydata.data[0].lat,
        lon: Mydata.data[0].lon,
        
        quoteFlag: true,
        mapFlag :true,
      });
      

      const server = `http://localhost:3100/weather?name=${e.target.city.value}&lon=${Mydata.data[3].lon}&lat=${Mydata.data[3].lat}`;
      let CityData = await axios.get(server);
    
      
      CityData = CityData.data;
      console.log(CityData);  
      this.setState({
          
        name: CityData[0],
        lat : CityData[1],
        lon: CityData[2],
        appear:true,
        
      });



    } catch {
      this.setState({
        errorFlag: true,
      });
    }
  };

  render() {
    return (
      <>
        <form onSubmit={this.DataCollector} >
          <input name="city" placeholder="Enter The City" style={{color : "black",backgroundColor:"Silver", width:"200px" , height:"50px", padding: "20px 0" ,border: "3px solid black" , borderRadius:"20px" , marginLeft:"20px"}}></input>
          <button type="submit" style={{color : "black"}}>Explore ! </button>
        </form>

        {this.state.quoteFlag && (
          <h3 >
             Here is some
            information about The requested Location
          </h3>
        )}

<h3 >Name : {this.state.name} <br></br></h3>

<h3 > Lat : {this.state.lat} </h3>

<h3 > Lon : {this.state.lon} </h3>

         
    

      
     
        

        {this.state.errorFlag && (
          <h3> Sorry ! Something Wrong Happened. Try Again please .</h3>
        )}
      </>
    );
  }
}
export default Main;
