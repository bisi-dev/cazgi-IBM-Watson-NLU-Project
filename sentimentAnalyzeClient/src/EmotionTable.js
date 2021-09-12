import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        let resObject = Object.entries(this.props.emotions);
        return (
            <div>
                {/* {this.props.emotions[0]} */}
                <table className="table table-bordered">
                    <tbody>
                        {
                            resObject.map((mapentry) => {
                                return <tr><td>{mapentry[0]}</td><td>{mapentry[1]}</td></tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

}

// class EmotionTable extends React.Component {
//     render() {
//       //Returns the emotions as an HTML table
//       return (  
//         <div>
//           <table className="table table-bordered">
//             <tbody>
//             {
//               /*Write code to use the .map method that you worked on in the 
//               Hands-on React lab to extract the emotions. If you are stuck,
//               please click the instructions to see how to implement a map*/
//             }
//             </tbody>
//           </table>
//           </div>
//           );
//         }
    
// }
export default EmotionTable;