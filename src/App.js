import IndexPage from './pages/index/IndexPage'
import React from 'react';
import { connect } from 'react-redux';
import { setPage } from './store/actions/navigation';
import './App.css';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';

function App(props) {
  return (
    <div className="App">
      { props.pageName === "index" ? <IndexPage /> : 
          props.pageName === "login" ? <LoginPage /> :
            props.pageName === "register" ? <RegisterPage /> :
            ""
      }
    </div>
  );
}

const mapStateToProps = state => {
  const { navigation } = state;
  return {
      pageName: navigation.pageName,
  }
}

const mapDispatchToProps = dispatch => ({
  goToPage: (pageName) => dispatch(setPage(pageName))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);