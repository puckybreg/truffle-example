import React, { Component } from 'react'
import agPayContract from '../build/contracts/AgPay.json'
import getWeb3 from './utils/getWeb3'
 

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: '',
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(agPayContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance;
        
        let _accounts = accounts;
        // Stores a given value, 5 by default.
        return simpleStorageInstance.record("0x31527f0452b07b3217b349e6942298142490fcb5", "0x31527f0452b07b3217b349e6942298142490fcb5", 1, 1, "fine", "ok", 5, 5, 5, {from: _accounts[0] })
      }).then((result) => {
        // Update state with the result.
        console.log(result);
        return simpleStorageInstance.getAddresses()
        // return this.setState({ storageValue: result.c[0] })
      }).then((res) => {
        res.forEach((address) => {
          return simpleStorageInstance.getPieceEntry(address);
        })
      });
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <p>The stored value is: {this.state.storageValue}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
