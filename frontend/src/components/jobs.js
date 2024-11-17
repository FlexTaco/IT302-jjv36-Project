import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Row, Container, Image } from "react-bootstrap";
import JobsDataService from "../service/jobsDataService";

const Jobs = () => {
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
  });

  const { id } = useParams();

  useEffect(() => {
    const retrieveJob = async () => {
      try {
        const response = await JobsDataService.get(id);
        const jobData = response.data[0];
        setJob(jobData);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    if (id) {
      retrieveJob();
    }
  }, [id]);

  console.log(job);

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
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Jobs;
