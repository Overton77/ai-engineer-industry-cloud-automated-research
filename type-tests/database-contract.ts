import type { Database as ContractDatabase } from "@aiengineer/database-contract";
import type { Database as CloudDatabase } from "../database.types";

type Assert<T extends true> = T;
type ContractCoversCloud = Assert<ContractDatabase extends CloudDatabase ? true : false>;
type CloudCoversContract = Assert<CloudDatabase extends ContractDatabase ? true : false>;

export type MetricObservationRow = CloudDatabase["ranking"]["Tables"]["metric_observation"]["Row"];
export type ResearchStarterVideoRow = CloudDatabase["public"]["Tables"]["research_starter_videos"]["Row"];
export type ContractParity = ContractCoversCloud & CloudCoversContract;
