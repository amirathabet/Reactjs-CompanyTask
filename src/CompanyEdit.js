import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { withRouter } from 'react-router'
//import { useHistory } from "react-router";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import {
  useLocation,
  useNavigate,
  useParams,
  useHistory,
} from "react-router-dom";

// function withRouter(Component) {
//   function ComponentWithRouterProp(props) {
//     let location = useLocation();
//     let navigate = useNavigate();
//     let params = useParams();

//     return (
//       <Component
//         {...props}
//         router={{ location, navigate, params }}
//       />
//     );
//   }

//   return ComponentWithRouterProp;
// }
// const countries = [
//   { label: "Albania", value: 355 },
//   { label: "Argentina", value: 54 },
//   { label: "Austria", value: 43 },
//   { label: "Cocos Islands", value: 61 },
//   { label: "Kuwait", value: 965 },
//   { label: "Sweden", value: 46 },
//   { label: "Venezuela", value: 58 }
// ];
class CompanyEdit extends Component {

  emptyCompany = {
    name: '',
    description: '',
    isActive: '',
    address: '',
    countryId: '',
    cityId: '',
    industryTypeId:''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyCompany,
      countries:[],
      cities:[],
      industryTypes:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCitySelectChange = this.handleCitySelectChange.bind(this);
    this.handleIndustrySelectChange = this.handleIndustrySelectChange.bind(this);
    
  }

  async componentDidMount() {
    
    const countries = await (await fetch(`/api/countries`)).json();
    var SelctCountryList=[];
    countries.forEach((co) => {
      let country={};
      country.label=co.name;
      country.value=co.id;
      SelctCountryList.push(country);
    })
    this.setState({countries: SelctCountryList});

    const industryTypes = await (await fetch(`/api/industryTypes`)).json();
    var SelctIndustryTypesList=[];
    industryTypes.forEach((co) => {
      let industryType={};
      industryType.label=co.name;
      industryType.value=co.id;
      SelctIndustryTypesList.push(industryType);
    })
    this.setState({industryTypes: SelctIndustryTypesList});
    if (this.props.match.params.id !== 'new') {
      const company = await (await fetch(`/api/company/${this.props.match.params.id}`)).json();
      console.log(company);
      this.setState({item: company});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/company', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    //console.log(this.props.router.location);
    this.props.history.push('/companies');
  }
  handleCitySelectChange(event) {
    this.setState((state) => {
      state.item.cityId =event.value;
     
   });
      
   }
   handleIndustrySelectChange(event) {
     console.log("event",event);
    this.setState((state) => {
      state.item.industryTypeId =event.value;
   });

      
   }
  async handleSelectChange(event) { 
    console.log("event.target.value",event);
    const cities = await (await fetch(`/api/cities/`+event.value)).json();
    console.log(cities);
    let SelectCityList=[];
    cities.forEach((co) => {
      let city={};
      city.label=co.name;
      city.value=co.id;
      SelectCityList.push(city);
    });
    this.setState({cities: SelectCityList});
    
   // this.setState({: event.value}); 
   this.setState((state) => {
     state.item.countryId =event.value;
    
  });
     }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Company' : 'Add Company'}</h2>;
    
    return (<div>
      {/* <AppNavbar/> */}
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">name</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="text" name="description" id="description" value={item.description || ''}
                   onChange={this.handleChange} autoComplete="description"/>
          </FormGroup>          
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" name="address" id="address" value={item.address || ''}
                   onChange={this.handleChange} autoComplete="address"/>
          </FormGroup>
          <FormGroup>
            <Label for="countryId">Country</Label>
            {/* <Input type="text" name="countryId" id="countryId" value={item.countryId || ''}
                   onChange={this.handleChange} autoComplete="countryId"/> */}
                   {item.countryId}
            <Select options={this.state.countries} onChange={this.handleSelectChange} defaultValue={item.countryId}/>
          
          </FormGroup>
          <FormGroup>
            <Label for="cityId">City</Label>
            {/* <Input type="text" name="cityId" id="cityId" value={item.cityId || ''}
                   onChange={this.handleChange} autoComplete="cityId"/> */}
           <Select options={this.state.cities}  onChange={this.handleCitySelectChange} value={item.cityId || ''}/>
          </FormGroup>

          <FormGroup>
            <Label for="industryTypeId">IndustryType</Label>
           <Select options={this.state.industryTypes}  onChange={this.handleIndustrySelectChange} />
          </FormGroup>
          <FormGroup>
            
            <Label for="isActive">isActive</Label>
            {/* <input type="checkbox" defaultChecked={this.state.isChecked}onChange={this.toggleChange}/> */}

            <Input type="text" name="isActive" id="isActive" value={item.isActive || ''}
                   onChange={this.handleChange} autoComplete="isActive" placeholder='true or false'/>
            
            
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/companies">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>);
  }
}
// const EditComponent = withRouter(CompanyEdit);
// export default CompanyEdit;
export default withRouter(CompanyEdit);