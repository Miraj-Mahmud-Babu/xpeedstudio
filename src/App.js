import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import {Tabs} from 'antd';


import List from './components/list'
import Create from './components/create'
import Update from './components/update'

function App() {
    const {TabPane} = Tabs;
    function callback(key) {
        console.log(key);
      }
    return (
        <div className="App">
            <Tabs defaultActiveKey="1"
                onChange={callback}>
                <TabPane tab="List" key="1">
                <List/>
                </TabPane>
                <TabPane tab="Create Form" key="2">
                  <Create/>
                </TabPane>
                <TabPane tab="Update form" key="3">
                   <Update/>
                </TabPane>
            </Tabs>
           
        </div>
    );
}

export default App;
