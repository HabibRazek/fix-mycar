"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    // Configure Crisp with your website ID
    Crisp.configure("372f2518-fb94-450d-82ff-84d5ed4646cb");
  }, []);

  return null;
};

export default CrispChat;

