import React, {Component} from "react";
import { Link } from 'react-router-dom';
import { adminApi } from '../../../api';
import _ from 'lodash';

class RestaurantsPage extends Component {
  constructor(props){
    super(props)

    this.state = {
      loading: true,
      restaurants: {}
    }

    this.renderRestaurant = this.renderRestaurant.bind(this);
  }

  componentDidMount() {
    const self = this;
    adminApi.request({
      method: 'get',
      url: '/restaurants'
    }).then(function (resp) {
      console.log(resp);
      self.setState({
        restaurants: resp.data
      })
    })
    .catch(function (error) {
      // const error_message = error.response.data.error.message;
      console.log(error);
    });
  }

  renderRestaurant(restaurant, index){
    return (
      <tr key={index}>
        <td className='border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>{restaurant.name}</td>
        <td className='border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>{restaurant.name_en}</td>
        <td className='border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>{restaurant.restaurant_type.type_name}</td>
        <td className='border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>Edit</td>
      </tr>
    )
  }

  render() {
    return (
      <div>
        <div className='mb-4'>
          <h1 className="text-3xl font-bold underline">Restaurants</h1>
        </div>

        <div className='text-right'>
          <Link to='/setup/create_restaurant' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            + Create new restaurant
          </Link>
        </div>

        <div className='mt-6'>
          <table className="border-collapse table-auto w-full">
            <thead className='text-left'>
              <tr>
                <th className='border-b dark:border-slate-600 font-medium pt-0 pb-3 text-slate-600 dark:text-slate-200'>Restaurant Name</th>
                <th className='border-b dark:border-slate-600 font-medium pt-0 pb-3 text-slate-600 dark:text-slate-200'>Restaurant Name (EN)</th>
                <th className='border-b dark:border-slate-600 font-medium pt-0 pb-3 text-slate-600 dark:text-slate-200'>Restaurant Type</th>
                <th className='border-b dark:border-slate-600 font-medium pt-0 pb-3 text-slate-600 dark:text-slate-200'>Action</th>
              </tr>
            </thead>
            <tbody>
            {(!_.isEmpty(this.state.restaurants)) && _.map(this.state.restaurants, this.renderRestaurant)}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
};

export default RestaurantsPage;
