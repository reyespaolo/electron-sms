import React, { Component } from 'react';
import { connect } from 'react-redux';

import PhoneBook from '../../components/PhoneBook/PhoneBook';
import SMSSending from '../../components/SMSSending/SMSSending';

class SendSMS extends Component {
  render() {
    return (
        <div>
          <div className="ui-g">
              <div className="ui-g-6"><PhoneBook phoneBook={this.props.phoneBook}/></div>
              <div className="ui-g-6"><SMSSending contacts={this.props.phoneBook}/></div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    phoneBook: state.phoneBook.phoneBook
  };
}


export default connect(mapStateToProps)(SendSMS);
