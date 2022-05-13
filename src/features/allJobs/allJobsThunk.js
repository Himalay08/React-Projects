import { customFetch,checkForUnauthorizationResponse } from "../../utils/axios";


export const getAllJobsThunk =async(_,thunkAPI)=>{
    const {page,search,searchStatus,searchType,sort}=thunkAPI.getState().allJobs
    let url=`/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
    if(search){
      url=url+`&search=${search}`
    }
    try {
      const res=await customFetch.get(url)
      console.log(res.data)
      return res.data
    } catch (error) {
      return checkForUnauthorizationResponse(error, thunkAPI);
    }
  }

  export const showStatsThunk = async (_,thunkAPI)=>{
    try {
      const res=await customFetch.get("/jobs/stats")
  
      return res.data
    } catch (error) {
      return checkForUnauthorizationResponse(error, thunkAPI);    }
  }

