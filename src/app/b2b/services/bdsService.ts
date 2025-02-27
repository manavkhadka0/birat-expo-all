import { BDSServiceCategoryResponse } from "@/app/b2b/types/bds-services";
import { BDSServiceResponse } from "@/app/b2b/types/bds-services";
import axios from "axios";

export const fetchBDSData = async () => {
  const response = await axios.get<BDSServiceResponse>(
    `https://cim.baliyoventures.com/api/bds/services/`
  );
  return response.data;
};

export const fetchBDSCategory = async () => {
  const response = await axios.get<BDSServiceCategoryResponse>(
    `https://cim.baliyoventures.com/api/bds/categories/`
  );
  return response.data;
};
