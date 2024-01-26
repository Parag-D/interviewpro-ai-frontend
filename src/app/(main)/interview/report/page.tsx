"use client";

import Feedback from "@/components/interview/feedback";
import useInterviewStore from "@/store/interview";
import React from "react";

const ReportPage = () => {
  const { feedback } = useInterviewStore();

  return <Feedback feedback={feedback} />;
};

export default ReportPage;
