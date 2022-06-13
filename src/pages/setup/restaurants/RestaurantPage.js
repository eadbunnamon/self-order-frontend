import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { adminApi } from '../../../api';
import _ from 'lodash';

function RestaurantPage() {
  let params = useParams();
  const id = params['id'];
  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    adminApi.request({
      method: 'get',
      url: '/restaurants/' + id
    }).then(function (resp) {
      setRestaurant(resp.data);
    })
    .catch(function (error) {
      // const error_message = error.response.data.error.message;
      console.log(error);
    });
  }, []);

  return (
    <div>
      {restaurant.name}
    </div>
  );
};

export default RestaurantPage;
