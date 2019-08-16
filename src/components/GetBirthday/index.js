import React from 'react';
import { withFirebase } from '../Firebase';
import DatePicker from "react-date-picker";
import {withRouter} from 'react-router-dom';
import {Segment} from 'semantic-ui-react';

// a form
class GetBirthdayFormBase extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            birthday: null,
            newBirthday: null,
            uid: this.props.firebase.currentUser().uid,
            error: null
        }
    }

    componentDidMount(){
        // Grab birthday if it exists
        this.props.firebase.getBirthday(this.state.uid).on('value', snapshot => {

            if (this.isUnmounted) {
                return;
            }
            
            const birthday = snapshot.val();
            console.log(birthday);
            if (birthday){
                this.setState({ birthday})
            }
            
        });
  
    }

    onChange = (date) => {
        this.setState({
            newBirthday: date
        });
        //console.log(this.state.newBirthday)
    }

    onSubmit = (event) =>{
        event.preventDefault(); 
        // update birthday
        this.props.firebase.updateBirthday(this.state.uid, this.state.newBirthday)

        // otherwise, display error
        .catch(error => {
            this.setState({error});
        });
    }

    componentWillUnmount() {
        this.props.firebase.getBirthday().off();
        this.isUnmounted = true;
      }

    render() {
        const {newBirthday, error} = this.state;


        return(
            <div style = {{width: '100%', marginTop: '10px'}}>
                
                
                {this.state.birthday !== null ?
                    <div style = {{margin: '5px'}}><h5>My Birthday:</h5> {this.state.birthday.substring(0,10)}</div>
                    :
                    null
                }
                <div>
                    <DatePicker
                        
                            onChange={this.onChange}
                            value = {this.state.newBirthday}
                        />
                    <button className = "ui button " style = {{marginTop: '10px'}} onClick = {this.onSubmit}>Update Birthday</button>
                    {error && <p>{error.message}</p>} 
                </div>
                


            </div>
        )
    }


}

const GetBirthdayForm = withRouter(withFirebase(GetBirthdayFormBase));

export default withFirebase(GetBirthdayForm);

