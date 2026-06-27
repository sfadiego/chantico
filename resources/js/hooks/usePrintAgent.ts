import { useContext } from "react";
import { PrintAgentContext } from "@/contexts/PrintAgentContext";

export const usePrintAgent = () => useContext(PrintAgentContext);
