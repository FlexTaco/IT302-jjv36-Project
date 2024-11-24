//joffre villacis
//nov 23, 2024
//it302, section 451
//phase 5
//jjv36@njit.edu
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Col, Row, Container, Image } from "react-bootstrap";
import JobsDataService from "../service/jobsDataService";
import Button from "react-bootstrap/Button";

const Jobs = (props) => {
  const [job, setJob] = useState({
    id: null,
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    companyLogo: "",
    jobExcerpt: "",
    annualSalaryMin: "",
    annualSalaryMax: "",
    jobGeo: "",
    jobIndustry: [],
    jobType: [],
    pubDate: "",
    comments: [],
  });

  const { id } = useParams();

  const getJob = (id) => {
    JobsDataService.get(id)
      .then((response) => {
        setJob(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getJob(id);
  }, [id]);

  const deleteComment = (commentId, index) => {
    JobsDataService.deleteComment(commentId, props.user.id)
      .then((response) => {
        setJob((prevState) => {
          prevState.comments.splice(index, 1);
          return {
            ...prevState,
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="p-4">
      <Container>
        <Row className="mb-4">
          <Col md={4}>
            {job.companyLogo && (
              <Image
                src={job.companyLogo}
                alt={`${job.companyName} logo`}
                className="w-full mb-4 rounded shadow-sm"
              />
            )}
          </Col>
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="text-2xl font-bold mb-2">
                  {job.jobTitle}
                </Card.Title>
                <Card.Subtitle className="mb-3 text-gray-600">
                  {job.companyName}
                </Card.Subtitle>

                {job.annualSalaryMin && job.annualSalaryMax && (
                  <div className="mb-3">
                    <strong>Salary Range: </strong>${job.annualSalaryMin} - $
                    {job.annualSalaryMax}
                  </div>
                )}

                {job.jobGeo && (
                  <div className="mb-3">
                    <strong>Location: </strong>
                    {job.jobGeo}
                  </div>
                )}

                {job.jobType && job.jobType.length > 0 && (
                  <div className="mb-3">
                    <strong>Job Type: </strong>
                    {job.jobType.join(", ")}
                  </div>
                )}

                {job.jobIndustry && job.jobIndustry.length > 0 && (
                  <div className="mb-3">
                    <strong>Industry: </strong>
                    {job.jobIndustry.join(", ")}
                  </div>
                )}

                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Job Description
                  </h3>
                  <div
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: job.jobDescription }}
                  ></div>
                </div>

                {job.pubDate && (
                  <div className="mt-4 text-sm text-gray-500">
                    Posted: {new Date(job.pubDate).toLocaleDateString()}
                  </div>
                )}
              </Card.Body>
            </Card>
            <br></br>
            <h2>Comments</h2>
            <br></br>
            <Card>
              <Card.Header as="h5">{job.title}</Card.Header>
              <Card.Body>
                <Card.Text>{job.jobType}</Card.Text>
                {props.user && (
                  <Link to={"/jjv36_jobs/" + id + "/comment"}>Add Review</Link>
                )}
              </Card.Body>
            </Card>

            {job.comments.map((comment, index) => {
              return (
                <Card key={index}>
                  <Card.Body>
                    <h5>
                      {comment.name +
                        " commented on " +
                        new Date(Date.parse(comment.date)).toDateString()}
                    </h5>
                    <p>{comment.comment}</p>
                    {props.user && props.user.id === comment.user_id && (
                      <Row>
                        <Col>
                          <Link
                            to={"/jjv36_jobs/" + id + "/comment"}
                            state={{ currentComment: comment }}
                          >
                            Edit
                          </Link>
                        </Col>
                        <Col>
                          <Button
                            variant="link"
                            onClick={() => deleteComment(comment._id, index)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Jobs;
