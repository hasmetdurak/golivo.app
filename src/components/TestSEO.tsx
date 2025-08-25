import React from "react";
import SEO from "./SEO";

const TestSEO: React.FC = () => {
  return (
    <div>
      <SEO 
        title="Test Page for SEO"
        description="This is a test page to verify hreflang and canonical implementation"
        path="test-page"
      />
      <h1>Test Page for SEO</h1>
      <p>This page is used to test the SEO implementation with hreflang and canonical tags.</p>
    </div>
  );
};

export default TestSEO;