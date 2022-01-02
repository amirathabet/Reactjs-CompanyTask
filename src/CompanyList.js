import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class CompanyList extends Component {

  constructor(props) {
    super(props);
    this.state = {customers: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/companies')
      .then(response => response.json())
      .then(data => this.setState({companies: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/company/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedCompanies = [...this.state.companies].filter(i => i.id !== id);
      this.setState({companies: updatedCompanies});
      console.log(updatedCompanies);
    });
  }

  render() {
    const {companies, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const companyList = companies.map(company => {
      return <tr key={company.id}>
        <td style={{whiteSpace: 'nowrap'}}>{company.name}</td>
        <td>{company.description}</td>
        <td>{company.isActive.toString()}</td>
        <td>{company.address}</td>
        <td>{company.countryname}</td>
        <td>{company.cityname}</td>
        <td>{company.industryTypename}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/companies/" + company.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(company.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        {/* <AppNavbar/> */}
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/companies/new">Add Company</Button>
          </div>
          <h3>Company List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="20%">Description</th>
                <th width="10%">isActive</th>
                <th>Address</th>
                <th>Country</th>
                <th>City</th>
                <th>IndustryType</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
            {companyList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default CompanyList;