import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {innercomp:<textarea rows="4" cols="50" id="textinput"/>,
            mode: "text",
          sentimentOutput:[],
          sentiment:true
        }
  
  renderTextArea = ()=>{
    document.getElementById("textinput").value = "";
    if(this.state.mode === "url") {
      this.setState({innercomp:<textarea rows="4" cols="50" id="textinput"/>,
      mode: "text",
      sentimentOutput:[],
      sentiment:true
    })
    } 
  }

  renderTextBox = ()=>{
    document.getElementById("textinput").value = "";
    if(this.state.mode === "text") {
      this.setState({innercomp:<textarea rows="1" cols="50" id="textinput"/>,
      mode: "url",
      sentimentOutput:[],
      sentiment:true
    })
    }
  }

  sendForSentimentAnalysis = () => {
    this.setState({sentiment:true});
    let ret = "";
    let url = ".";

    if(this.state.mode === "url") {
      url = url+"/url/sentiment?url="+document.getElementById("textinput").value;
    } else {
      url = url+"/text/sentiment?text="+document.getElementById("textinput").value;
    }
    ret = axios.get(url);
    ret.then((response)=>{

      //Include code here to check the sentiment and fomrat the data accordingly

      this.setState({sentimentOutput:response.data});
      let output = response.data;
      if(response.data === "positive") {
        output = <div style={{color:"green",fontSize:20}}>{response.data}</div>
      } else if (response.data === "negative"){
        output = <div style={{color:"red",fontSize:20}}>{response.data}</div>
      } else {
        output = <div style={{color:"orange",fontSize:20}}>{response.data}</div>
      }
      this.setState({sentimentOutput:output});
    });
  }

  sendForEmotionAnalysis = () => {
    this.setState({sentiment:false});
    let ret = "";
    let url = ".";
    if(this.state.mode === "url") {
      url = url+"/url/emotion?url="+document.getElementById("textinput").value;
    } else {
      url = url+"/text/emotion/?text="+document.getElementById("textinput").value;
    }
    ret = axios.get(url);

    ret.then((response)=>{
      this.setState({sentimentOutput:<EmotionTable emotions={response.data}/>});
  });
  }
  

  render() {
    return (  
      <div className="App">
      <button className="btn btn-info" onClick={this.renderTextArea}>Text</button>
        <button className="btn btn-dark"  onClick={this.renderTextBox}>URL</button>
        <br/><br/>
        {this.state.innercomp}
        <br/>
        <button className="btn-primary" onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</button>
        <button className="btn-primary" onClick={this.sendForEmotionAnalysis}>Analyze Emotion</button>
        <br/>
            {this.state.sentimentOutput}
      </div>
    );
    }
}

export default App;

// import './bootstrap.min.css';
// import './App.css';
// import EmotionTable from './EmotionTable.js';
// import React from 'react';

// class App extends React.Component {
//   /*
//   We are setting the component as a state named innercomp.
//   When this state is accessed, the HTML that is set as the 
//   value of the state, will be returned. The initial input mode
//   is set to text
//   */
//   state = {innercomp:<textarea rows="4" cols="50" id="textinput"/>,
//             mode: "text",
//           sentimentOutput:[],
//           sentiment:true
//         }
  
//   /*
//   This method returns the component based on what the input mode is.
//   If the requested input mode is "text" it returns a textbox with 4 rows.
//   If the requested input mode is "url" it returns a textbox with 1 row.
//   */
 
//   renderOutput = (input_mode)=>{
//     let rows = 1
//     let mode = "url"
//     //If the input mode is text make it 4 lines
//     if(input_mode === "text"){
//       mode = "text"
//       rows = 4
//     }
//       this.setState({innercomp:<textarea rows={rows} cols="50" id="textinput"/>,
//       mode: mode,
//       sentimentOutput:[],
//       sentiment:true
//       });
//   } 
  
//   sendForSentimentAnalysis = () => {
//     this.setState({sentiment:true});
//     let url = ".";
//     let mode = this.state.mode
//     url = url+"/" + mode + "/sentiment?"+ mode + "="+document.getElementById("textinput").value;

//     fetch(url).then((response)=>{
//         response.json().then((data)=>{
//         this.setState({sentimentOutput:data.label});
//         let output = data.label;
//         let color = "white"
//         switch(output) {
//           case "positive": color = "green";break;
//           case "negative": color = "red";break;
//           default: color = "black";
//         }
//         output = <div style={{color:color,fontSize:20}}>{output}</div>
//         this.setState({sentimentOutput:output});
//       })});
//   }

//   sendForEmotionAnalysis = () => {

//     this.setState({sentiment:false});
//     let url = ".";
//     let mode = this.state.mode
//     url = url+"/" + mode + "/emotion?"+ mode + "="+document.getElementById("textinput").value;

//     fetch(url).then((response)=>{
//       response.json().then((data)=>{
//       this.setState({sentimentOutput:<EmotionTable emotions={data}/>});
//   })})  ;
//   }
  

//   render() {
//     return (  
//       <div className="App">
//       <button className="btn btn-info" onClick={()=>{this.renderOutput('text')}}>Text</button>
//         <button className="btn btn-dark"  onClick={()=>{this.renderOutput('url')}}>URL</button>
//         <br/><br/>
//         {this.state.innercomp}
//         <br/>
//         <button className="btn-primary" onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</button>
//         <button className="btn-primary" onClick={this.sendForEmotionAnalysis}>Analyze Emotion</button>
//         <br/>
//             {this.state.sentimentOutput}
//       </div>
//     );
//     }
// }

// export default App;
