import * as React from 'react';
import axios from 'axios';

const url = 'https://5bcce576cf2e850013874767.mockapi.io/task/categories';

export default class CategoryApi {
   static getCategoriesData(){
    return axios.get(url);
   } 
}


