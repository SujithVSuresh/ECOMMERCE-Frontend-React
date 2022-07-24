import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'

function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products} = productList
  
  const [searchParms] = useSearchParams();
 

  let keyword = searchParms.get('keyword')
  console.log(keyword)

  let page = searchParms.get('page')
  console.log(page)

  


  useEffect(()=>{

    dispatch(listProducts(keyword, page))

  }, [dispatch, keyword])


  return (
    <div>
        <h1>Latest Product</h1>

        {loading ? <Loader />
            : error ? <Message variant="danger">{error}</Message>
            : 
            <Row>
            {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
            ))}
          </Row>
        }

    </div>
  )
}

export default HomeScreen