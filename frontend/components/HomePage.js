import React from 'react';
import EnhancedTable from "./Table";
import ApolloClient from 'apollo-boost';
import {gql} from 'apollo-boost';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        nameIs: '',
        nameLike: '',
        typeIn: '',
        amountGte: '',
        amountLte: ''
      },
      loading: null,
      error: null,
      data: {}
    }
  }

  loadQuery(nextState) {
    client.query({
      query: gql`
          query documentDetails(
              $nameIs: String,
              $nameLike:String,
              $typeIn:Type,
              $amountGte:Int,
              $amountLte:Int
          ) {
              documents(
                  nameIs: $nameIs,
                  nameLike: $nameLike
                  typeIn: $typeIn
                  amountGte: $amountGte
                  amountLte: $amountLte
              ) {
                  id
                  name
                  type
                  amount
              }
          }
      `,
      variables: {
        nameIs: nextState && nextState.input && nextState.input.nameIs || '',
        nameLike: nextState && nextState.input && nextState.input.nameLike || '',
        typeIn: nextState && nextState.input && nextState.input.typeIn || undefined,
        amountGte: nextState && nextState.input && parseInt(nextState.input.amountGte) || null,
        amountLte: nextState && nextState.input && parseInt(nextState.input.amountLte) || null
      }
    })
    .then(response => this.setState(response));
  }

  componentDidMount() {
    this.loadQuery()
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (nextState.input !== this.state.input) {
      this.loadQuery(nextState)
    }
  }

  render() {
    return (
      <React.Fragment>
        <div style={{margin: '20px 50px', display: 'table'}}>
          <TextField style={{display: "table-cell", margin: '5px'}}
                     id="standard-name"
                     label="Name is"
                     value={this.state.input.nameIs}
                     onChange={(e) => this.setState({input: {...this.state.input, nameIs: e.target.value}})}
                     margin="normal"
          />

          <TextField style={{display: "table-cell", margin: '5px'}}
                     id="standard-name"
                     label="Name consists"
                     value={this.state.input.nameLike}
                     onChange={(e) => this.setState({input: {...this.state.input, nameLike: e.target.value}})}
                     margin="normal"
          />

          <FormControl style={{minWidth: 120, display: "table-cell", margin: '5px'}}>
            <InputLabel htmlFor="age-helper">Type</InputLabel>
            <Select
              value={this.state.input.typeIn}
              onChange={(e) => this.setState({input: {...this.state.input, typeIn: e.target.value}})}
            >
              <MenuItem value={''}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={"invoice"}>Invoice</MenuItem>
              <MenuItem value={"offer"}>Offer</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </FormControl>

          <TextField style={{minWidth: 230, display: "table-cell", margin: '5px'}}
                     id="standard-name"
                     label="Amount greater than or equal"
                     value={this.state.input.amountGte}
                     onChange={(e) => this.setState({input: {...this.state.input, amountGte: e.target.value}})}
                     margin="normal"
                     type={'number'}
          />

          <TextField style={{minWidth: 230, display: "table-cell", margin: '5px'}}
                     id="standard-name"
                     label="Amount less than or equal"
                     value={this.state.input.amountLte}
                     onChange={(e) => this.setState({input: {...this.state.input, amountLte: e.target.value}})}
                     margin="normal"
                     type={'number'}
          />
        </div>

        <EnhancedTable data={this.state}/>
      </React.Fragment>
    );
  }
}

export default HomePage;
