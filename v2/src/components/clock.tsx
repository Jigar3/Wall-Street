import React  from 'react';
import Clock from 'react-live-clock';
 
export default class MyComponent extends React.Component<any> {
    render() {
      return(
        <div>
          IST &nbsp;
          <Clock format={'HH:mm'} ticking={true} timezone={'Asia/Calcutta'} />
        </div>
      )
    }
}
