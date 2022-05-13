import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Wrapper from '../assets/wrappers/RegisterPage'
import { FormRow, Logo } from '../components'
import { loginUser, registerUser } from '../features/user/userSlice'


const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
}


const Register = () => {

  const [values, setValues] = useState(initialState)
  const { user, isLoading } = useSelector(store => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all the fields")
      return
    }
    if (isMember) {
      dispatch(loginUser({ email, password }))
      return
    }
    dispatch(registerUser({ name, email, password }))
    console.log(values)
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/")
      }, 3000)
    }
  }, [user])

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {
          !values.isMember &&
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        }
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button
        type='submit'
        className='btn btn-block btn-hipster'
        disabled={isLoading}
        >
          {isLoading ? "Loading..." : "submit"}
          </button>
        <button
          type='button'
          className='btn btn-block btn-hipster'
          disabled={isLoading}
          onClick={()=>dispatch(loginUser({email:"testUser@test.com",password:"secret"}))}
        >
          {isLoading ? "Loading..." : "demo"}
        </button>

        <p>
          {values.isMember ? "Not a member yet" : "Already a member?"}
          <button type='button'
            onClick={toggleMember}
            className="member-btn"
          >
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register