import React from 'react';
import './home.scss';

class Home extends React.Component {
  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  }

  render() {
    return (
      <div className='Home mx-auto'>
      <div className="card-deck mt-5">
        <div className="card border-dark" id="messages" onClick={this.changeView}>
          <div className="card-body text-center">
            <h4 className="card-title"><i className="fas fa-comments fa-7x"></i></h4>
            <h6 className="card-subtitle mb-2 text-muted">Messages</h6>
            <p className="card-text">Newer better AOL</p>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Home;
