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
      mapFlag :false,
    };
  }

  DataCollector = async (e) => {
    e.preventDefault();

    try {
      const myKey = "pk.52ffa2b140346333af8917296b40c4cb";
      const city = e.target.city.value;
      const link = `https://us1.locationiq.com/v1/search?key=${myKey}&q=${city}&format=json`;
      let Mydata = await axios.get(link);
      console.log(myKey);
      console.log(city);
      console.log(link);
      console.log(Mydata);
      this.setState({
        name: Mydata.data[0].display_name,
        lat: Mydata.data[0].lat,
        lon: Mydata.data[0].lon,
        
        quoteFlag: true,
        mapFlag :true,
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
        <h3 style={{backgroundColor:"Silver", width:"400px" , height:"50px", padding: "30px 0" ,border: "3px solid black" , borderRadius:"20px" , marginLeft:"20px"}}>Name : {this.state.name} <br></br></h3>

        <h3 style={{backgroundColor:"Silver", width:"400px" , height:"50px", padding: "30px 0" ,border: "3px solid black" , borderRadius:"20px" , marginLeft:"20px"}}> Lat : {this.state.lat} </h3>

        <h3 style={{backgroundColor:"Silver", width:"400px" , height:"50px", padding: "30px 0" ,border: "3px solid black" , borderRadius:"20px" , marginLeft:"20px"}}> Lon : {this.state.lon} </h3>

        {this.state.mapFlag && <img style={{backgroundColor:"Silver", width:"700px" , height:"350px", padding: "3px 0" ,border: "3px solid black" , borderRadius:"2px" , marginLeft:"20px"}} src = {`https://maps.locationiq.com/v3/staticmap?key=pk.52ffa2b140346333af8917296b40c4cb&center=${this.state.lat},${this.state.lon}`}/>}
     
        

        {this.state.errorFlag && (
          <h3> Sorry ! Something Wrong Happened. Try Again please .</h3>
        )}
      </>
    );
  }
}
export default Main;
