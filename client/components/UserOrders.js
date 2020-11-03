// LIBRARIES
import React from 'react';
import dayjs from 'dayjs';
import axios from 'axios'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// FILES
import { getArtworks } from '../redux/artworks';

class UserOrders extends React.Component {
  constructor(){
    super()
    this.state = {
      reviews: null
    }
  }
  componentDidMount() {
    this.props.getArtworks();
  }

  //get user's reviews so that user can not re-review
  async componentDidUpdate() {
    if(this.props.user.id && !this.state.reviews) {
      const reviews = (await axios.get(`/api/reviews/user/${this.props.user.id}`)).data
      this.setState({...this.state, reviews})
    }
  }

  render () {
    const { user, artworks } = this.props;
    const { reviews } = this.state

    return (
      <div className="order-history-section">
        <h3>Past Orders</h3>
        <div className="order-list">
          { user.orders ?
            user.orders.length > 0 ?
              user.orders.map(order => {
                // calculate total price of each order
                const orderTotal = order.orderItems
                  .map(item => item.orderedPrice * item.orderedQuantity)
                  .reduce((total, order) => total + order)

                // get artworks in order
                const orderItemArt = order.orderItems.map(oi => oi.artworkId);

                return (
                  <div className="order-info" key={ order.id }>
                    <div className="order-details">
                      <div className="order-subinfo">
                        <h4>ORDER PLACED</h4>
                        <p>{ dayjs(order.date).format('MMM D, YYYY h:mm A') }</p>
                      </div>
                      <div className="order-subinfo">
                        <h4>STATUS</h4>
                        <p>{ order.status }</p>
                      </div>
                      <div className="order-subinfo">
                        <h4>DELIVER TO</h4>
                        <p>{ order.address }</p>
                      </div>
                      <div className="order-subinfo">
                        <h4>ORDER TOTAL</h4>
                        <p>${ orderTotal.toFixed(2) }</p>
                      </div>
                      <div className="order-subinfo">
                        <h4>ORDER #</h4>
                        <p>{ order.id }</p>
                      </div>
                    </div>
                    <h4>ORDER ITEMS</h4>
                    <div className="order-art">
                      { artworks
                        .filter(art => orderItemArt.includes(art.id))
                        .sort((a, b) => a.date - b.date)
                        .map(oi => {
                          const artLink = `/artworks/${oi.id}`;
                          return (
                            <div key={ oi.id }>
                              <Link to={ artLink }><img className="order-item-img" src={oi.shopImages[0].imageURL} /></Link>
                              <span className='rev'>
                                {/* this below is to remove review link if you've already reviewed */}
                                { reviews ?
                                    reviews.map(r=>r.artworkId).includes(oi.id) ?
                                    null :
                                    <Link to={`/review/${oi.id}`}>Leave a review.</Link>
                                    :
                                  null
                                }
                              </span>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              }) :
            <p>No past orders. Begin your first order!</p> :
            <p>No past orders. Begin your first order!</p>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    artworks: state.artworks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArtworks: () => dispatch(getArtworks())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);
