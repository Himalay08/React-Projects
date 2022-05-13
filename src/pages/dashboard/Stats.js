import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { ChartsContainer, StatsContainer } from '../../components'
import Loading from '../../components/Loading'
import { showStats } from '../../features/allJobs/allJobsSlice'

const Stats = () => {
  const {isLoading,monthlyApplications}=useSelector((store)=>store.allJobs)

  const dispatch =useDispatch()
  useEffect(()=>{
    dispatch(showStats())
  },[])
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
  
    <StatsContainer/>
    <ChartsContainer/>
    </>
  )
}

export default Stats