import PortalChoiceBackground from './portalChoiceBackground';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getShop } from '../../apis/api';
import {  Text, View  } from 'react-native';
import { dispMessage } from '../Common/flashMessages';

const NotApproved = ({navigation, route}) => {
    console.log("---route",route.params)
    const {user} = route.params
    const [shop,setshopData] = useState(
        {
            id: 1,
            name: 'kariyana',
            web_url: 'www.google.com',
            is_verified: 1,
            gst_no: '123456',
            description: 'Starting new in ezyfroceries'
          })
    useEffect(()=>{
        dispMessage('danger','Error',route.params.message)
        axios.post(getShop,{
            shop_id:user.shop_id
        },{
            headers:{
                'Content-Type': 'application/json',
            }
        }).then((res)=>{
            setshopData(res.data)
        })

    },[])
  return <PortalChoiceBackground hide={true} >
    <View style={{display:'flex',flexDirection:'column'}}>
        <View style={{display:'flex',flexDirection:'row'}}>
            <Text>Shop name</Text>
            <Text>{shop.name}</Text>
        </View>
        <View  style={{display:'flex',flexDirection:'row'}}>
            <Text>
                Description
            </Text>
            <Text>
                {shop.description}
            </Text>
        </View>
        <View  style={{display:'flex',flexDirection:'row'}}>
            <Text>
                {`shop website`}
            </Text>
            <Text>
                {shop.web_url}
            </Text>
        </View>

    </View>
  </PortalChoiceBackground>;
};


export default NotApproved;
