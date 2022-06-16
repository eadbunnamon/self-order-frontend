import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { adminApi } from '../../../api';
import _ from 'lodash';

function CategoriesPage() {
  let params = useParams();
  console.log('params =>', params);
  const restaurant_id = params['restaurant_id'];
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch restaurant
    // adminApi.request({
    //   method: 'get',
    //   url: '/restaurants/' + restaurant_id
    // }).then(function (resp) {
    //   setCategories(resp.data);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }, []);

  return (
    <div>
      Restaurant name/Categories
    </div>
  );
};

export default CategoriesPage;
