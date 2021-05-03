import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Layout,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
} from 'antd';
 import refinecrawler from '../../src/refinecrawler'
 import readjson from '../../src/readjson'


const {
  Header,
  Content,
} = Layout;
const { Item: FormItem } = Form;
const { Option } = Select;

function Home() {
  let a = readjson.toString()
  
  let b = refinecrawler()
  let c = JSON.parse(a)
 
  console.log(b)
  function onoff(e){
    e ? refinecrawler() : console.log(a)
  }
  
  return (
    <React.Fragment>
      <Head>
        <title>Boorawler 2.0.1</title>
      </Head>

      <Header>
          <a>부롤러 2.0.1</a>  
      </Header>
      <br></br>
      <Switch checkedChildren="작동중" unCheckedChildren="정지" onChange={onoff}/>
      <br></br>
      {/* <div>{a}</div>  */}
      <div>{c[0].number}</div>
      <div>{c[0].title}</div>
      <div>{c[0].name}</div>
      <br></br>
      <div>{c[1].number}</div>
      <div>{c[1].title}</div>
      <div>{c[1].name}</div>


      <Content style={{ padding: 48 }}>
        
      </Content>
    </React.Fragment>
  );
};

export default Home;
