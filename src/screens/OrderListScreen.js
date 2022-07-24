import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders } from '../actions/orderActions'

function OrderListScreen() {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList
    console.log(orders)

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
        dispatch(listOrders())
        }else{
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo])

  return (
    <div>
        <h1>Orders</h1>
        {loading 
        ? <Loader />
        : error
        ? <Message variant='danger'>{error}</Message>
        :(
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>$ {order.totalPrice}</td>
                            <td>{order.isPaid ? (
                                order.paidAt.substring(0, 10)
                            ) : (
                                <i className='fas fa-check' style={{color:'red'}}></i>
                            )}</td>

                            <td>{order.isDelivered ? (
                                order.deliveredAt.substring(0, 10)
                            ) : (
                                <i className='fas fa-check' style={{color:'red'}}></i>
                            )}</td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='light' className='btn-sm'>
                                    Details
                                    </Button>
                                </LinkContainer>

                                <Button variant='danger' className='btn-sm'>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
        )}
    </div>
  )
}

export default OrderListScreen