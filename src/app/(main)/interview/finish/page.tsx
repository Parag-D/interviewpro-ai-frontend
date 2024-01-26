import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Finish = () => {
  return (
    <div className="max-w-[500px] flex justify-center flex-col my-10 mx-auto">
      <h1 className="text-center text-2xl text-green-500">
        <strong className="text-3xl">Congratulations!</strong>
        <br />
        You&apos;ve Completed Your AI Interview
      </h1>

      <p className="mt-5">
        <strong>Well Done!</strong> You&apos;ve successfully navigated through
        the innovative AI-driven interview process. Your responses have been
        analyzed, and we appreciate the effort you&apos;ve put into showcasing
        your skills and experiences.
      </p>
      <p className="mt-5">
        <strong>What&apos;s Next?</strong> Our team will carefully review your
        interview results, considering not just the answers but also your
        problem-solving approach and thought process. We aim to provide a fair
        and thorough evaluation.
      </p>

      <div className="flex justify-center items-center mt-20">
        <Link href="/interview/report">
          <Button>Get your Interview Report</Button>
        </Link>
      </div>
    </div>
  );
};

export default Finish;
