
import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register }  from '../actions/userActions'
import FormContainer from '../components/FormContainer'

function RegisterScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [searchParms] = useSearchParams();
    const redirect = searchParms.get("redirect") ? searchParms.get("redirect") : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
      console.log(userInfo)
        if(userInfo !== undefined){
            navigate(redirect)
        }
    }, [userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        
        if(password != confirmPassword){
          setMessage('Password do not match')
        }else{
          dispatch(register(name, email, password))
        }
    }
  return (
    <FormContainer>
        <h1>Register</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading  && <Loader />}
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control required type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>

            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control required type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>

            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control required type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>

            </Form.Group>
            <Form.Group controlId='passwordConfirm'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control required type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Register</Button>

        </Form>
        <Row className='py-3'>
            <Col>
              Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
            </Col>

        </Row>
    </FormContainer>
  )
}

export default RegisterScreen