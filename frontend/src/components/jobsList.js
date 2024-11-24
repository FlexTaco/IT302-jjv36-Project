//joffre villacis
//nov 18, 2024
//it302, section 451
//phase 4
//jjv36@njit.edu
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import JobsDataService from "../service/jobsDataService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const JobsList = () => {
  const [jobs, setjobs] = useState([]);
  const [searchCompanyName, setSearchCompanyName] = useState("");
  const [searchLocation, setsearchLocation] = useState("");
  const [location, setlocation] = useState(["All location"]);
  useEffect(() => {
    retrieveJobs();
    retrieveLocation();
  }, []);

  const retrieveJobs = () => {
    JobsDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setjobs(response.data.jobs);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveLocation = () => {
    JobsDataService.getLocation()
      .then((response) => {
        console.log(response.data);
        setlocation(["All location"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangesearchCompanyName = (e) => {
    const searchCompanyName = e.target.value;
    setSearchCompanyName(searchCompanyName);
  };

  const onChangesearchLocation = (e) => {
    const searchLocation = e.target.value;
    setsearchLocation(searchLocation);
  };

  const find = (query, by) => {
    JobsDataService.find(query, by)
      .then((response) => {
        console.log(response.data);
        setjobs(response.data.jobs);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByCompanyName = () => {
    setsearchLocation("");
    find(searchCompanyName, "companyName");
  };

  const findByLocation = () => {
    setSearchCompanyName("");
    if (searchLocation === "All locations") {
      retrieveJobs();
    } else {
      console.log(searchLocation);
      find(searchLocation, "jobGeo");
    }
  };

  return (
    <div className="App">
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by company name"
                  value={searchCompanyName}
                  onChange={onChangesearchCompanyName}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByCompanyName}
              >
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control as="select" onChange={onChangesearchLocation}>
                  {location.map((local) => {
                    return (
                      <option value={local} selected={local === searchLocation}>
                        {local}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByLocation}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          {jobs.map((job) => {
            return (
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Card.Img src={job.companyLogo} />
                  <Card.Body>
                    <Card.Title>{job.companyName}</Card.Title>
                    <Card.Text>location: {job.jobGeo}</Card.Text>
                    <Card.Text>{job.jobTitle}</Card.Text>
                    <Link to={"/jjv36_jobs/" + job._id}>View Job</Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default JobsList;
