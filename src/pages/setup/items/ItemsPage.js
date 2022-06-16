import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { adminApi } from '../../../api';
import _ from 'lodash';

function ItemsPage() {
  let params = useParams();
  const id = params['id'];
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch restaurant
    adminApi.request({
      method: 'get',
      url: '/restaurants/' + id
    }).then(function (resp) {
      setItems(resp.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  return (
    <div>
      Items
    </div>
  );
};

export default ItemsPage;
